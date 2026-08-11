/**
 * ============================================================================
 * RELATÓRIO SEO POR PÁGINA (Rodada 4K)
 * ============================================================================
 * Lê o HTML servido em dist/ e gera docs/relatorio-seo-por-pagina.md com
 * title, H1, description, robots, canonical, tipos de JSON-LD, links internos
 * curados e presença no sitemap — mais o checklist de gates do build.
 *
 * Uso: node scripts/report-seo-por-pagina.mjs [dist]
 */
import { readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";
import { BASE_URL } from "./lib/site-env.mjs";

const DIST = process.argv[2] ?? "dist";
const OUT = "docs/relatorio-seo-por-pagina.md";

const sitemapUrls = new Set();
for (const f of readdirSync(DIST).filter((n) => /^sitemap.*\.xml$/.test(n))) {
  const xml = readFileSync(`${DIST}/${f}`, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(m[1].replace(/\/$/, ""));
}

const CURATED = new Set(CURATED_PATHS);
const pick = (re, html) => (html.match(re)?.[1] ?? "").trim();
const esc = (v) => String(v).replace(/\|/g, "\\|");

const rows = [];
const alertas = [];

for (const path of CURATED_PATHS) {
  const file = path === "/" ? `${DIST}/index.html` : `${DIST}${path}/index.html`;
  if (!existsSync(file)) {
    alertas.push(`HTML ausente: ${path}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const title = pick(/<title>([\s\S]*?)<\/title>/, html);
  const desc = pick(/<meta name="description" content="([^"]*)"/, html);
  const robots = pick(/<meta name="robots" content="([^"]*)"/, html) || "(ausente)";
  const canonical = pick(/<link rel="canonical" href="([^"]*)"/, html) || "(ausente)";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim(),
  );
  const types = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const walk = (node) => {
        if (Array.isArray(node)) return node.forEach(walk);
        if (node && typeof node === "object") {
          if (node["@type"]) [].concat(node["@type"]).forEach((t) => types.add(t));
          if (node["@graph"]) walk(node["@graph"]);
        }
      };
      walk(JSON.parse(m[1]));
    } catch {
      alertas.push(`JSON-LD inválido em ${path}`);
    }
  }
  const links = new Set();
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (href !== path && CURATED.has(href)) links.add(href);
  }
  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  const noSitemap = !sitemapUrls.has(url);
  const indexavel = /index/.test(robots) && !/noindex/.test(robots);

  if (h1s.length !== 1) alertas.push(`${path} → ${h1s.length} H1`);
  if (!desc) alertas.push(`${path} → sem meta description`);
  if (indexavel && noSitemap) alertas.push(`${path} → indexável fora do sitemap`);
  if (!indexavel && !noSitemap) alertas.push(`${path} → noindex presente no sitemap`);
  if (canonical !== url && canonical !== `${url}/`) alertas.push(`${path} → canonical divergente (${canonical})`);

  rows.push({
    path,
    title,
    titleLen: title.length,
    descLen: desc.length,
    h1: h1s[0] ?? "—",
    robots,
    schemas: [...types].sort().join(", ") || "—",
    links: links.size,
    sitemap: noSitemap ? "não" : "sim",
  });
}

const md = [
  "# Relatório SEO por página — rotas curadas",
  "",
  `Gerado automaticamente por \`scripts/report-seo-por-pagina.mjs\` a partir do HTML servido em \`${DIST}/\`.`,
  `Base: ${BASE_URL || "(domínio não configurado)"} — ${rows.length} rotas curadas.`,
  "",
  "## Checklist de gates",
  "",
  "| Gate | Comando |",
  "| --- | --- |",
  "| SEO básico das rotas curadas | `bun scripts/check-seo-basics.ts --curated dist` |",
  "| Referências e unicidade de JSON-LD | `node scripts/check-jsonld-references.mjs dist` |",
  "| Malha semântica de links internos | `node scripts/check-malha-interna.mjs` |",
  "| Links internos e sitemap | `node scripts/check-internal-links.mjs` |",
  "| Canibalização P0 | `node scripts/check-cannibalization.mjs` |",
  "| Similaridade programática | `node scripts/check-programmatic-similarity.mjs` |",
  "| Ficha comercial dos serviços | `node scripts/check-ficha-comercial.mjs` |",
  "| Soft-404 e aliases | `node scripts/check-soft-404.mjs` |",
  "| Sitemap de imagens | `node scripts/check-image-sitemap.mjs dist` |",
  "| Isolamento de marca | `npm run check:brand-isolation` |",
  "",
  "## Páginas",
  "",
  "| Rota | Title (nº car.) | H1 | Desc. | Robots | Schemas | Links curados | Sitemap |",
  "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map(
    (r) =>
      `| \`${r.path}\` | ${esc(r.title)} (${r.titleLen}) | ${esc(r.h1)} | ${r.descLen} | ${r.robots} | ${esc(r.schemas)} | ${r.links} | ${r.sitemap} |`,
  ),
  "",
  "## Alertas",
  "",
  ...(alertas.length ? alertas.map((a) => `- ${a}`) : ["- Nenhum alerta: todas as rotas curadas passaram nas verificações do relatório."]),
  "",
].join("\n");

writeFileSync(OUT, md);
console.log(`[report-seo-paginas] ${OUT} — ${rows.length} rotas, ${alertas.length} alerta(s).`);
if (alertas.length) alertas.forEach((a) => console.log(`  • ${a}`));
