#!/usr/bin/env node
/**
 * ============================================================================
 * LINKS INTERNOS + INTEGRIDADE DO SITEMAP — stack TanStack Start (SSR)
 * ============================================================================
 * O universo de rotas vem de `scripts/lib/tanstack-routes.mjs`, derivado dos
 * arquivos em `src/routes/**` (roteamento por arquivo). A versão anterior lia
 * `path="..."` de `<Route>` em `src/App.tsx` / `src/LegacyApp.tsx`, que deixaram
 * de ser a fonte de verdade na migração — daí 775 falsos "URL sem rota".
 *
 * Verifica:
 *  1. URL do sitemap sem rota correspondente   → FAIL_SITEMAP_WITHOUT_ROUTE
 *  2. <loc> fora do domínio canônico           → FAIL_NON_CANONICAL_DOMAIN
 *  3. link interno para rota inexistente       → FAIL_BROKEN_LINK
 *  4. arquivo estático referenciado e ausente  → FAIL_MISSING_STATIC_FILE
 *  5. URL indexável sem link interno           → WARN_ORPHAN_INDEXABLE
 *
 * Classificações que NÃO são defeito (contabilizadas, nunca silenciosas):
 *  SKIPPED_ASSET (assets/uploads/arquivos), SKIPPED_PRIVATE (/admin, /ads, /api).
 *
 * Fail-closed: se `src/routes` não existir, o gate falha com
 * UNKNOWN_ROUTES_DIR_MISSING em vez de aprovar em silêncio.
 *
 * Uso: node scripts/check-internal-links.mjs [--strict] [--json]
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { BASE_URL as SITE_BASE_URL } from "./lib/site-env.mjs";
import {
  readRouteUniverse,
  isPrivatePath,
  isAssetPath,
  normalizePath,
  STATIC_FILE_RE,
  REASONS,
} from "./lib/tanstack-routes.mjs";

const ROOT = process.cwd();
const CANONICAL = SITE_BASE_URL;
const STRICT = process.argv.includes("--strict");
const AS_JSON = process.argv.includes("--json");

// ── 1. Universo de rotas real ────────────────────────────────────────────────
const universe = readRouteUniverse(ROOT);
if (!universe.ok) {
  console.error(`✖ [${universe.reason}] src/routes não encontrado — gate não pode concluir.`);
  process.exit(1);
}
const isKnownRoute = universe.isKnownRoute;

// ── 2. URLs do sitemap ───────────────────────────────────────────────────────
const sitemapFiles = readdirSync(join(ROOT, "public")).filter(
  (f) => f.startsWith("sitemap") && f.endsWith(".xml") && f !== "sitemap-index.xml",
);

const sitemapUrls = [];
for (const f of sitemapFiles) {
  const xml = readFileSync(join(ROOT, "public", f), "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.push({ file: f, url: m[1].trim() });
}

// ── 3. Links internos no código ──────────────────────────────────────────────
const SRC_EXT = new Set([".ts", ".tsx"]);
const internalLinks = new Map(); // path → Set(arquivos de origem)
const add = (path, rel) => {
  if (!internalLinks.has(path)) internalLinks.set(path, new Set());
  internalLinks.get(path).add(rel);
};

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
      continue;
    }
    if (!SRC_EXT.has(extname(entry))) continue;
    if (/\.(test|spec)\.tsx?$/.test(entry)) continue;
    // routeTree.gen.ts é gerado: seus caminhos já vêm do universo de rotas.
    if (entry === "routeTree.gen.ts") continue;
    const code = readFileSync(full, "utf8");
    const rel = full.replace(`${ROOT}/`, "");
    for (const m of code.matchAll(/(?:to|href)=["'](\/[^"'`{}\s]*)["']/g))
      add(normalizePath(m[1]), rel);
    for (const m of code.matchAll(/(?:to|href)=\{`(\/[^`$]*)\$\{/g)) {
      const prefix = m[1].replace(/\/$/, "");
      if (prefix) add(`${prefix}/*`, rel);
    }
    for (const m of code.matchAll(/(?:to|url|path|href)\s*:\s*["'](\/[^"'`\s]*)["']/g))
      add(normalizePath(m[1]), rel);
  }
};
walk(join(ROOT, "src"));

const isLinked = (path) => {
  if (internalLinks.has(path)) return true;
  for (const key of internalLinks.keys()) {
    if (key.endsWith("/*") && path.startsWith(key.slice(0, -1))) return true;
  }
  return false;
};

// ── 4. Diagnóstico ───────────────────────────────────────────────────────────
const errors = [];
const warnings = [];
const skipped = { [REASONS.ASSET]: 0, [REASONS.PRIVATE]: 0 };

for (const { file, url } of sitemapUrls) {
  if (url.endsWith(".xml")) continue;
  if (!url.startsWith(CANONICAL)) {
    errors.push({ reason: REASONS.NON_CANONICAL_DOMAIN, detalhe: `[${file}] ${url}` });
    continue;
  }
  const path = normalizePath(url.slice(CANONICAL.length) || "/");
  if (!isKnownRoute(path)) {
    errors.push({ reason: REASONS.SITEMAP_WITHOUT_ROUTE, detalhe: `[${file}] ${path}` });
    continue;
  }
  if (!isLinked(path) && path !== "/") {
    warnings.push({ reason: REASONS.ORPHAN_INDEXABLE, detalhe: `[${file}] ${path}` });
  }
}

const fileExists = (p) => existsSync(join(ROOT, "public", p)) || existsSync(join(ROOT, "dist", p));

for (const [path, sources] of internalLinks) {
  if (path.endsWith("/*")) continue;
  const origem = [...sources].slice(0, 3).join(", ");
  if (isPrivatePath(path)) {
    skipped[REASONS.PRIVATE] += 1;
    continue;
  }
  if (isAssetPath(path)) {
    skipped[REASONS.ASSET] += 1;
    // Arquivo com extensão precisa existir de fato em public/ ou dist/.
    if (STATIC_FILE_RE.test(path) && !fileExists(path)) {
      errors.push({ reason: REASONS.MISSING_STATIC_FILE, detalhe: `${path} (em ${origem})` });
    }
    continue;
  }
  if (!isKnownRoute(path)) {
    errors.push({ reason: REASONS.BROKEN_LINK, detalhe: `${path} (em ${origem})` });
  }
}

// ── 5. Saída ─────────────────────────────────────────────────────────────────
const resumo = {
  rotasArquivo: universe.patterns.length,
  rotasEstaticas: universe.staticPaths.size,
  rotasDinamicas: universe.dynamicPatterns.length,
  urlsSitemap: sitemapUrls.length,
  destinosInternos: internalLinks.size,
  erros: errors.length,
  avisos: warnings.length,
  skipped,
};

if (AS_JSON) {
  console.log(JSON.stringify({ resumo, errors, warnings }, null, 2));
} else {
  console.log("── Links internos e sitemap (universo TanStack) ──");
  console.log(
    `Rotas por arquivo: ${resumo.rotasArquivo} (${resumo.rotasEstaticas} estáticas, ${resumo.rotasDinamicas} dinâmicas)`,
  );
  console.log(`URLs no sitemap: ${resumo.urlsSitemap} | destinos internos: ${resumo.destinosInternos}`);
  console.log(`Ignorados: ${skipped[REASONS.ASSET]} asset(s), ${skipped[REASONS.PRIVATE]} rota(s) privada(s)`);
  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} aviso(s):`);
    warnings.forEach((w) => console.log(`  - [${w.reason}] ${w.detalhe}`));
  }
  if (errors.length) {
    console.log(`\n✖ ${errors.length} erro(s):`);
    errors.forEach((e) => console.log(`  - [${e.reason}] ${e.detalhe}`));
  }
}

if (errors.length) process.exit(1);
if (STRICT && warnings.length) {
  console.log("\n✖ modo --strict: avisos tratados como erro.");
  process.exit(1);
}
if (!AS_JSON) console.log("\n✔ Nenhum link quebrado nem URL de sitemap inválida.");
