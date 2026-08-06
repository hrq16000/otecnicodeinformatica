// ─────────────────────────────────────────────────────────────
// MANIFESTO DE ROTAS — fonte derivada, nunca lista manual nova.
//
// Consolida, em tempo de build, as quatro categorias de URL do portal:
//   A. rotas públicas válidas  → HTTP 200
//   B. redirects legítimos     → HTTP 301
//   C. rotas administrativas   → HTTP 200 (comportamento preservado)
//   D. qualquer outra coisa    → HTTP 404
//
// Fontes (todas já existentes no projeto):
//   • src/LegacyApp.tsx + src/App.tsx  → paths declarados no React Router
//   • src/lib/redirectMatrix.ts        → matriz única de aliases 301
//   • scripts/lib/curated-urls.mjs     → URLs indexáveis do sitemap
//   • dist/**/index.html               → páginas estáticas realmente emitidas
//
// Nenhuma dessas listas é duplicada aqui: tudo é lido/derivado.
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import path from "node:path";
import { CURATED_PATHS } from "./curated-urls.mjs";

const ROUTER_FILES = ["src/LegacyApp.tsx", "src/App.tsx"];
const REDIRECT_MATRIX_FILE = "src/lib/redirectMatrix.ts";

/** Prefixos privados/administrativos: comportamento atual preservado (200 no SPA). */
export const PRIVATE_PREFIXES = ["/admin", "/ads"];

/** Prefixos/arquivos servidos diretamente do disco (nunca passam pelo SPA). */
export const ASSET_PREFIXES = ["/assets/", "/lovable-uploads/", "/images/", "/fonts/", "/css/", "/blog/"];

/** Lê os `path="..."` declarados nos arquivos de rota do React Router. */
export async function readRouterPaths(root = process.cwd()) {
  const found = new Set();
  for (const file of ROUTER_FILES) {
    let src;
    try {
      src = await fs.readFile(path.resolve(root, file), "utf8");
    } catch {
      continue;
    }
    // Só considera atributos `path` dentro de elementos <Route ...>
    for (const m of src.matchAll(/<Route\b[^>]*?\bpath=["']([^"']+)["']/g)) {
      const p = m[1];
      if (!p || p === "*") continue;
      found.add(p.startsWith("/") ? p : `/${p}`);
    }
  }
  return [...found].sort();
}

/** Lê a matriz única de redirects (src/lib/redirectMatrix.ts) sem duplicá-la. */
export async function readRedirectMatrix(root = process.cwd()) {
  const src = await fs.readFile(path.resolve(root, REDIRECT_MATRIX_FILE), "utf8");
  const rules = [];
  for (const m of src.matchAll(
    /\{\s*from:\s*["']([^"']+)["']\s*,\s*to:\s*["']([^"']+)["']\s*,\s*motivo:\s*["']([^"']+)["']\s*\}/g,
  )) {
    rules.push({ from: m[1], to: m[2], motivo: m[3] });
  }
  return rules;
}

/** Lista as páginas estáticas efetivamente emitidas no dist (`dist/<rota>/index.html`). */
export async function readPrerenderedPaths(distDir) {
  const out = new Set();
  async function walk(dir, prefix) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        await walk(path.join(dir, e.name), `${prefix}/${e.name}`);
      } else if (e.name === "index.html") {
        out.add(prefix === "" ? "/" : prefix);
      }
    }
  }
  await walk(distDir, "");
  return [...out].sort();
}

/** Converte um path do React Router em RegExp (suporta `:param` e `*`). */
export function pathToRegex(routePath) {
  const source = routePath
    .split("/")
    .filter(Boolean)
    .map((seg) => {
      if (seg === "*") return "[^/]+";
      if (seg.startsWith(":")) return "[^/]+";
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return new RegExp(`^/${source}/?$`);
}

/**
 * Constrói o manifesto consolidado.
 * @param {{root?: string, distDir?: string}} opts
 */
export async function buildRouteManifest({ root = process.cwd(), distDir = path.resolve("dist") } = {}) {
  const routerPaths = await readRouterPaths(root);
  const redirects = await readRedirectMatrix(root);
  const prerendered = await readPrerenderedPaths(distDir);
  // Slugs dinâmicos não pré-renderizados, extraídos das fontes reais de dados
  // (scripts/dump-dynamic-slugs.ts). Fecham /marcas/:slug, /problemas/:slug e
  // /procedimentos/:slug contra soft-404.
  let dynamicSlugs = [];
  try {
    dynamicSlugs = JSON.parse(await fs.readFile(path.join(distDir, "dynamic-slugs.json"), "utf8")).paths || [];
  } catch {
    dynamicSlugs = [];
  }
  const redirectFrom = new Set(redirects.map((r) => r.from));

  const validExact = new Set(["/"]);
  const validPatterns = [];

  for (const p of [...routerPaths, ...prerendered, ...CURATED_PATHS, ...dynamicSlugs]) {
    if (redirectFrom.has(p)) continue; // alias nunca é rota válida
    if (p.includes(":") || p.includes("*")) validPatterns.push(p);
    else validExact.add(p);
  }

  const isPrivate = (p) => PRIVATE_PREFIXES.some((pre) => p === pre || p.startsWith(`${pre}/`));

  const exactList = [...validExact].sort();
  const patternList = validPatterns.sort();
  // Um padrão dinâmico só aceita valores conhecidos quando existe ao menos uma
  // instância pré-renderizada (ex.: /blog/:slug). Sem cobertura estática, o
  // padrão permanece "aberto" para não regredir rotas legítimas do SPA.
  const patternInfo = patternList.map((pattern) => {
    const re = pathToRegex(pattern);
    const known = exactList.filter((p) => re.test(p));
    return { pattern, closed: known.length > 0, knownCount: known.length };
  });

  return {
    generatedAt: new Date().toISOString(),
    source: "scripts/lib/route-manifest.mjs (derivado — não editar à mão)",
    counts: {
      validExact: validExact.size,
      validPatterns: validPatterns.length,
      redirects: redirects.length,
      prerendered: prerendered.length,
      dynamicSlugs: dynamicSlugs.length,
      curated: CURATED_PATHS.length,
      private: [...validExact].filter(isPrivate).length,
    },
    validExact: exactList,
    validPatterns: patternList,
    patternInfo,
    redirects,
    privatePrefixes: PRIVATE_PREFIXES,
    assetPrefixes: ASSET_PREFIXES,
    curated: [...CURATED_PATHS].sort(),
  };
}

/** Resolve o destino de um pathname segundo o manifesto. */
export function resolvePath(manifest, pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : "/";
  const redirect = manifest.redirects.find((r) => r.from === clean);
  if (redirect) return { kind: "redirect", status: 301, location: redirect.to };
  if (manifest.validExact.includes(clean)) return { kind: "spa", status: 200 };
  // Padrões fechados já foram cobertos por validExact; só padrões abertos
  // (sem nenhuma instância pré-renderizada) liberam 200 genérico.
  const open = (manifest.patternInfo || manifest.validPatterns.map((pattern) => ({ pattern, closed: false })))
    .filter((p) => !p.closed)
    .map((p) => pathToRegex(p.pattern));
  if (open.some((re) => re.test(clean))) return { kind: "spa", status: 200 };
  return { kind: "notfound", status: 404 };
}
