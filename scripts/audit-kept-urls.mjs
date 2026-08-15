// RODADA 4B.2 — Auditoria das 10 URLs mantidas no domínio antigo.
// Prova que o número legado 5541997452053 não aparece em HTML, JSON-LD,
// links wa.me, links tel: ou assets, e registra canonical/robots/title de cada
// URL mantida.
//
// Uso:
//   node scripts/audit-kept-urls.mjs
//   node scripts/audit-kept-urls.mjs --confirm=5541997452053   # exige nº oficial presente
//
// Saídas: reports/kept-urls-audit.json · reports/kept-urls-audit.md
import { writeFileSync, mkdirSync } from "node:fs";
import { loadMap, scanLegacySurfaces, containsNumber, LEGACY_WA, OFFICIAL_WA } from "./lib/migration-critical.mjs";

const map = loadMap();
const args = process.argv.slice(2);
const confirm = args.find((a) => a.startsWith("--confirm="))?.split("=")[1] ?? null;
if (confirm && confirm !== OFFICIAL_WA) {
  console.error(`BLOQUEADO: número confirmado (${confirm}) difere do oficial (${OFFICIAL_WA}).`);
  process.exit(1);
}

const kept = map.kept_urls ?? [];
const ruleFrom = new Set(map.rules.map((r) => r.from));
const rows = [];

for (const path of kept) {
  const url = `${map.source_domain}${path}`;
  const row = {
    url,
    inRedirectMatrix: ruleFrom.has(path),
    status: null,
    finalUrl: "",
    canonical: "",
    robots: "",
    title: "",
    inOldSitemap: null,
    legacyHits: [],
    officialPresent: false,
    violations: [],
  };
  try {
    const res = await fetch(url, { redirect: "follow" });
    row.status = res.status;
    row.finalUrl = res.url;
    const html = await res.text();
    row.canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
    row.robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "";
    row.title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
    row.legacyHits = scanLegacySurfaces(html, LEGACY_WA);
    row.officialPresent = containsNumber(html, OFFICIAL_WA);
  } catch (err) {
    row.violations.push(`erro de rede: ${err.message}`);
  }

  if (row.inRedirectMatrix) row.violations.push("URL mantida também aparece na matriz de redirects");
  if (row.legacyHits.length)
    row.violations.push(
      `número legado presente em: ${[...new Set(row.legacyHits.map((h) => h.surface))].join(", ")}`,
    );
  if (confirm && row.status === 200 && !row.officialPresent)
    row.violations.push("número oficial ausente na página mantida");
  if (row.canonical && row.canonical.startsWith(map.target_domain))
    row.violations.push("canonical cross-domain usado no lugar de redirect");
  rows.push(row);
}

// Sitemap antigo: URLs mantidas devem continuar anunciadas; redirecionadas, não.
let sitemapPaths = [];
try {
  const sm = await fetch(`${map.source_domain}/sitemap.xml`);
  if (sm.ok) {
    const xml = await sm.text();
    sitemapPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try {
        return new URL(m[1]).pathname;
      } catch {
        return m[1];
      }
    });
  }
} catch {
  /* sitemap indisponível */
}
for (const row of rows) {
  const p = new URL(row.url).pathname;
  row.inOldSitemap = sitemapPaths.length ? sitemapPaths.includes(p) : null;
}
const redirectedStillInSitemap = sitemapPaths.filter((p) => ruleFrom.has(p));

const violations = rows.flatMap((r) => r.violations.map((v) => `${r.url}: ${v}`));
const summary = {
  generated_at: new Date().toISOString(),
  source_domain: map.source_domain,
  official_whatsapp: OFFICIAL_WA,
  legacy_whatsapp: LEGACY_WA,
  kept_total: kept.length,
  clean: rows.filter((r) => !r.violations.length).length,
  violations,
  old_sitemap_entries: sitemapPaths.length,
  redirected_still_in_old_sitemap: redirectedStillInSitemap,
  results: rows,
};
mkdirSync("reports", { recursive: true });
writeFileSync("reports/kept-urls-audit.json", JSON.stringify(summary, null, 2) + "\n");

const md = [
  "# Auditoria das URLs mantidas no domínio antigo",
  "",
  `- Gerado em: ${summary.generated_at}`,
  `- URLs mantidas: ${kept.length} · limpas: ${summary.clean} · violações: ${violations.length}`,
  `- Número oficial: ${OFFICIAL_WA} · legado proibido: ${LEGACY_WA}`,
  "",
  "| URL | Status | Canonical | Robots | Nº oficial | Nº legado (superfícies) | No sitemap antigo |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map(
    (r) =>
      `| ${r.url} | ${r.status ?? "-"} | ${r.canonical || "-"} | ${r.robots || "-"} | ${
        r.officialPresent ? "sim" : "não"
      } | ${r.legacyHits.length ? [...new Set(r.legacyHits.map((h) => h.surface))].join(", ") : "ausente"} | ${
        r.inOldSitemap === null ? "-" : r.inOldSitemap ? "sim" : "não"
      } |`,
  ),
  "",
  "## Sitemap antigo",
  "",
  `- Entradas lidas: ${sitemapPaths.length}`,
  `- URLs já redirecionadas ainda anunciadas: ${redirectedStillInSitemap.length}`,
  ...redirectedStillInSitemap.slice(0, 20).map((p) => `  - ${p}`),
  "",
  "## Violações",
  "",
  violations.length ? violations.map((v) => `- ${v}`).join("\n") : "_nenhuma_",
  "",
].join("\n");
writeFileSync("reports/kept-urls-audit.md", md);

console.log(`URLs mantidas: ${kept.length} · limpas ${summary.clean} · violações ${violations.length}`);
for (const v of violations) console.log(`  FAIL ${v}`);
console.log("relatórios: reports/kept-urls-audit.json · reports/kept-urls-audit.md");
if (violations.length) process.exit(1);
