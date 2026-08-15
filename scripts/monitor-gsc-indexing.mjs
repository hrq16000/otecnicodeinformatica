#!/usr/bin/env node
/**
 * MONITORAMENTO AUTOMÁTICO DE INDEXAÇÃO (Google Search Console)
 *
 * Para cada URL prioritária liberada (P0, preços, pilares e artigos da onda 1):
 *   - lê o estado da URL no índice do Google (URL Inspection — somente leitura)
 *   - compara com o baseline anterior (reports/gsc-indexing-baseline.json)
 *   - alerta em queda de cobertura (URL indexada → não indexada / bloqueada)
 *
 * Uso:
 *   node scripts/monitor-gsc-indexing.mjs            # relatório + comparação
 *   node scripts/monitor-gsc-indexing.mjs --alert    # sai 1 se houver queda
 *   node scripts/monitor-gsc-indexing.mjs --save     # grava novo baseline
 *
 * Saídas: reports/gsc-indexing.json · reports/gsc-indexing.md
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { priorityUrls } from "./lib/priority-urls.mjs";
import { resolveSite, inspectUrl } from "./lib/gsc-client.mjs";

const ALERT = process.argv.includes("--alert");
const SAVE = process.argv.includes("--save");
const BASELINE = "reports/gsc-indexing-baseline.json";
const INDEXED = new Set(["PASS"]);

const urls = priorityUrls();
mkdirSync("reports", { recursive: true });

const site = await resolveSite(urls[0].url);
console.log(`Propriedade: ${site} · ${urls.length} URLs prioritárias`);

const results = [];
for (const item of urls) {
  try {
    const state = await inspectUrl(site, item.url);
    results.push({ ...item, ...state, indexed: INDEXED.has(state.verdict), error: null });
  } catch (e) {
    results.push({ ...item, verdict: "ERROR", indexed: false, error: e.message });
  }
}

const previous = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")) : null;
const prevById = new Map((previous?.results ?? []).map((r) => [r.path, r]));

const regressions = results.filter((r) => {
  const before = prevById.get(r.path);
  return before?.indexed && !r.indexed;
});
const notIndexed = results.filter((r) => !r.indexed);
const coverage = results.length ? (results.filter((r) => r.indexed).length / results.length) * 100 : 0;
const prevCoverage = previous?.coverage ?? null;

const report = {
  generatedAt: new Date().toISOString(),
  site,
  coverage: Number(coverage.toFixed(1)),
  previousCoverage: prevCoverage,
  total: results.length,
  indexed: results.filter((r) => r.indexed).length,
  regressions: regressions.map((r) => r.path),
  results,
};

writeFileSync("reports/gsc-indexing.json", JSON.stringify(report, null, 2));
writeFileSync(
  "reports/gsc-indexing.md",
  [
    `# Indexação — URLs prioritárias`,
    ``,
    `- Propriedade: \`${site}\``,
    `- Gerado em: ${report.generatedAt}`,
    `- Cobertura: **${report.coverage}%** (${report.indexed}/${report.total})` +
      (prevCoverage === null ? "" : ` · anterior: ${prevCoverage}%`),
    ``,
    `| Grupo | URL | Verdict | Cobertura | Canônico Google | Último rastreio |`,
    `| --- | --- | --- | --- | --- | --- |`,
    ...results.map(
      (r) =>
        `| ${r.group} | ${r.path} | ${r.verdict} | ${r.coverageState} | ${r.googleCanonical ?? "—"} | ${r.lastCrawlTime ?? "—"} |`,
    ),
    ``,
    regressions.length
      ? `## ⚠️ Quedas de cobertura\n\n${regressions.map((r) => `- ${r.path} → ${r.coverageState}`).join("\n")}`
      : `Sem quedas de cobertura em relação ao baseline.`,
  ].join("\n"),
);

/**
 * Espelho público e enxuto para o painel /admin (Rodada 8B).
 * Sem token, sem PII: apenas path, família de URL, verdict e cobertura.
 * Famílias acompanhadas: service_city · neighborhood · problem · other.
 */
function familia(path) {
  if (/^\/problemas\//.test(path)) return "problem";
  if (/^\/servicos\/[^/]+\/[^/]+/.test(path)) return "service_city";
  if (/^\/bairros\//.test(path) || /-(bairro|batel|portao|boqueirao)\b/.test(path)) return "neighborhood";
  return "other";
}

writeFileSync(
  "public/indexing-status.json",
  `${JSON.stringify(
    {
      generatedAt: report.generatedAt,
      coverage: report.coverage,
      previousCoverage: report.previousCoverage,
      regressions: report.regressions,
      urls: results.map((r) => ({
        path: r.path,
        family: familia(r.path),
        verdict: r.verdict,
        coverageState: r.coverageState ?? null,
        indexed: r.indexed,
        lastCrawlTime: r.lastCrawlTime ?? null,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(`Cobertura: ${report.coverage}% (${report.indexed}/${report.total})`);
if (notIndexed.length) {
  console.log("Não indexadas:");
  for (const r of notIndexed) console.log(`  · ${r.path} → ${r.error ?? r.coverageState}`);
}

if (SAVE || !previous) {
  writeFileSync(BASELINE, JSON.stringify(report, null, 2));
  console.log(`Baseline gravado em ${BASELINE}.`);
}

if (regressions.length && ALERT) {
  console.error(`\n✖ ALERTA: ${regressions.length} URL(s) prioritária(s) perderam indexação.`);
  process.exit(1);
}
console.log("✔ Monitoramento de indexação concluído.");
