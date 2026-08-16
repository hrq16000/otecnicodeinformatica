// ─────────────────────────────────────────────────────────────
// UNIVERSO DE ROTAS — TANSTACK START (fonte única dos gates)
//
// Depois da migração, o roteamento é baseado em ARQUIVOS (`src/routes/**`).
// Os gates antigos ainda liam `path="..."` de `<Route>` em `src/App.tsx` /
// `src/LegacyApp.tsx`, que não existem mais como fonte de verdade — daí a
// enxurrada de falsos "404" e "componente órfão".
//
// Este módulo deriva o universo real de rotas a partir dos nomes de arquivo,
// segundo as regras do TanStack Router:
//   • `.` no nome = `/` na URL            (servicos.formatacao.tsx → /servicos/formatacao)
//   • sufixo `_` = opt-out de layout      (blog_.$slug.tsx        → /blog/$slug)
//   • `index`    = folha do pai           (servicos.index.tsx     → /servicos)
//   • `$param`   = segmento dinâmico      (bairros_.$slug.tsx     → /bairros/$slug)
//   • `$`        = splat / catch-all
//   • `__root`   = layout raiz (não é URL)
//
// NENHUMA lista manual: qualquer rota nova aparece aqui automaticamente.
// ─────────────────────────────────────────────────────────────
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROUTES_DIR = "src/routes";

/** Prefixos privados/administrativos (rotas reais, fora do universo indexável). */
export const PRIVATE_PREFIXES = ["/admin", "/ads", "/api"];

/** Prefixos servidos do disco: nunca são rota do app. */
export const ASSET_PREFIXES = ["/assets/", "/lovable-uploads/", "/images/", "/fonts/", "/css/", "/icons/"];

/** Extensões de arquivo estático referenciado no código (validado em public/ ou dist/). */
export const STATIC_FILE_RE = /\.(xml|txt|json|pdf|webmanifest|png|jpe?g|svg|webp|avif|ico|css|js|mp4|woff2?)$/i;

export const REASONS = {
  OK: "OK",
  BROKEN_LINK: "FAIL_BROKEN_LINK",
  MISSING_STATIC_FILE: "FAIL_MISSING_STATIC_FILE",
  SITEMAP_WITHOUT_ROUTE: "FAIL_SITEMAP_WITHOUT_ROUTE",
  NON_CANONICAL_DOMAIN: "FAIL_NON_CANONICAL_DOMAIN",
  ORPHAN_INDEXABLE: "WARN_ORPHAN_INDEXABLE",
  ASSET: "SKIPPED_ASSET",
  PRIVATE: "SKIPPED_PRIVATE",
  GENERATED: "SKIPPED_GENERATED",
  NON_ROUTE_COMPONENT: "SKIPPED_NON_ROUTE_COMPONENT",
  ROUTES_DIR_MISSING: "UNKNOWN_ROUTES_DIR_MISSING",
};

function listFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full));
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

/** Converte o caminho de um arquivo de rota no padrão de URL do TanStack. */
export function filenameToRoutePattern(file, root = ROUTES_DIR) {
  const rel = relative(root, file).split(sep).join("/").replace(/\.tsx?$/, "");
  if (rel === "__root" || rel.endsWith("/__root")) return null;

  const segments = rel
    .split("/")
    .flatMap((part) => part.split("."))
    .map((s) => s.replace(/_$/, ""))
    .filter((s) => s.length > 0 && s !== "route");

  while (segments.length && segments[segments.length - 1] === "index") segments.pop();
  if (!segments.length) return "/";
  return `/${segments.join("/")}`;
}

/** Converte um padrão (`/blog/$slug`, `/docs/$`) em RegExp. */
export function patternToRegex(pattern) {
  const body = pattern
    .split("/")
    .filter(Boolean)
    .map((seg) => {
      if (seg === "$") return ".+";
      if (seg.startsWith("$")) return "[^/]+";
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return new RegExp(`^/${body}/?$`);
}

export function normalizePath(p) {
  const clean = String(p || "/").split("#")[0].split("?")[0];
  const trimmed = clean.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/**
 * Lê o universo de rotas do stack atual.
 * @returns {{ok: boolean, reason: string, files: string[], patterns: string[],
 *   staticPaths: Set<string>, dynamicPatterns: string[], isKnownRoute: (p: string) => boolean,
 *   routeFileFor: (p: string) => string | undefined}}
 */
export function readRouteUniverse(root = process.cwd()) {
  const dir = join(root, ROUTES_DIR);
  if (!existsSync(dir)) {
    return {
      ok: false,
      reason: REASONS.ROUTES_DIR_MISSING,
      files: [],
      patterns: [],
      staticPaths: new Set(),
      dynamicPatterns: [],
      isKnownRoute: () => false,
      routeFileFor: () => undefined,
    };
  }

  const files = listFiles(dir);
  const byPattern = new Map();
  for (const file of files) {
    const pattern = filenameToRoutePattern(file, dir);
    if (pattern === null) continue;
    if (!byPattern.has(pattern)) byPattern.set(pattern, relative(root, file).split(sep).join("/"));
  }

  const patterns = [...byPattern.keys()].sort();
  const staticPaths = new Set(patterns.filter((p) => !p.includes("$")));
  const dynamicPatterns = patterns.filter((p) => p.includes("$"));
  const dynamicRegex = dynamicPatterns.map((p) => ({ pattern: p, re: patternToRegex(p) }));

  const isKnownRoute = (p) => {
    const clean = normalizePath(p);
    if (staticPaths.has(clean)) return true;
    return dynamicRegex.some(({ re }) => re.test(clean));
  };

  const routeFileFor = (p) => {
    const clean = normalizePath(p);
    if (byPattern.has(clean)) return byPattern.get(clean);
    const hit = dynamicRegex.find(({ re }) => re.test(clean));
    return hit ? byPattern.get(hit.pattern) : undefined;
  };

  return { ok: true, reason: REASONS.OK, files, patterns, staticPaths, dynamicPatterns, isKnownRoute, routeFileFor };
}

/** Componentes de página realmente montados por algum arquivo de rota. */
export function readMountedPageModules(root = process.cwd()) {
  const dir = join(root, ROUTES_DIR);
  if (!existsSync(dir)) return new Set();
  const mounted = new Set();
  for (const file of listFiles(dir)) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/from\s+["'](@\/pages\/[^"']+)["']/g)) mounted.add(m[1].replace(/^@\//, "src/"));
    for (const m of src.matchAll(/import\(\s*["'](@\/pages\/[^"']+)["']\s*\)/g))
      mounted.add(m[1].replace(/^@\//, "src/"));
  }
  return mounted;
}

export function isPrivatePath(p) {
  const clean = normalizePath(p);
  return PRIVATE_PREFIXES.some((pre) => clean === pre || clean.startsWith(`${pre}/`));
}

export function isAssetPath(p) {
  const clean = String(p || "");
  return ASSET_PREFIXES.some((pre) => clean.startsWith(pre)) || STATIC_FILE_RE.test(clean.split("?")[0]);
}
