#!/usr/bin/env node
/**
 * GUARD DE URLs PRIORITÁRIAS
 *
 * Alerta (falha do build/job) quando qualquer URL prioritária:
 *   1. sumir do sitemap curado emitido em public/
 *   2. aparecer com meta robots noindex no HTML estático (dist/)
 *   3. perder o canonical self-referente no HTML estático
 *
 * Uso:
 *   node scripts/check-priority-urls-guard.mjs           # só sitemap
 *   node scripts/check-priority-urls-guard.mjs dist      # sitemap + HTML
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { priorityUrls, BASE_URL } from "./lib/priority-urls.mjs";

const DIST = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : null;
const errors = [];

// 1. Sitemap curado
const sitemapLocs = new Set();
for (const file of readdirSync("public").filter(
  (f) => /^sitemap.*\.xml$/.test(f) && !["sitemap.xml", "sitemap-index.xml"].includes(f),
)) {
  const xml = readFileSync(join("public", file), "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapLocs.add(m[1].trim());
}
if (sitemapLocs.size === 0) errors.push("sitemap curado vazio — nada a monitorar");

for (const { path, url } of priorityUrls()) {
  const withSlash = path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
  if (!sitemapLocs.has(withSlash) && !sitemapLocs.has(url)) {
    errors.push(`FORA DO SITEMAP: ${path}`);
  }
}

// 2 e 3. HTML estático servido
if (DIST) {
  if (!existsSync(DIST)) {
    errors.push(`${DIST}/ ausente — rode "npm run build" antes do guard`);
  } else {
    for (const { path, url } of priorityUrls()) {
      const file = join(DIST, path === "/" ? "" : path.replace(/^\//, ""), "index.html");
      if (!existsSync(file)) {
        errors.push(`HTML ESTÁTICO AUSENTE: ${path}`);
        continue;
      }
      const html = readFileSync(file, "utf8");
      const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1];
      if (robots && /noindex/i.test(robots)) errors.push(`NOINDEX: ${path} → "${robots}"`);
      const canonical = html.match(
        /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
      )?.[1];
      if (!canonical) errors.push(`SEM CANONICAL: ${path}`);
      else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, ""))
        errors.push(`CANONICAL DIVERGENTE: ${path} → ${canonical}`);
    }
  }
}

console.log(`── Guard de URLs prioritárias (${priorityUrls().length} URLs) ──`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} alerta(s):\n${errors.map((e) => `  · ${e}`).join("\n")}`);
  process.exit(1);
}
console.log("✔ Todas as URLs prioritárias estão no sitemap, indexáveis e com canonical correto.");
