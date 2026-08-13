// @ts-nocheck
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Consolida os relatórios do Lighthouse CI (desktop + mobile) em
 * reports/lighthouse-summary.{md,html} para virar artifact do CI e facilitar
 * identificar a regressão exata quando o gate de performance falha.
 */
const SOURCES = [
  { dir: ".lighthouseci", label: "desktop" },
  { dir: ".lighthouseci-mobile", label: "mobile" },
];

const ms = (a) => (a?.numericValue == null ? null : Math.round(a.numericValue));
const rows = [];

for (const { dir, label } of SOURCES) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    let report;
    try {
      report = JSON.parse(readFileSync(join(dir, file), "utf8"));
    } catch {
      continue;
    }
    if (!report.audits) continue;
    rows.push({
      formFactor: label,
      url: report.finalUrl || report.requestedUrl || file,
      performance: report.categories?.performance?.score ?? null,
      accessibility: report.categories?.accessibility?.score ?? null,
      seo: report.categories?.seo?.score ?? null,
      lcp: ms(report.audits["largest-contentful-paint"]),
      cls: report.audits["cumulative-layout-shift"]?.numericValue ?? null,
      ttfb: ms(report.audits["server-response-time"]),
      fcp: ms(report.audits["first-contentful-paint"]),
      tbt: ms(report.audits["total-blocking-time"]),
    });
  }
}

if (!rows.length) {
  console.log("Lighthouse summary: nenhum relatório encontrado — nada a consolidar.");
  process.exit(0);
}

const score = (v) => (v == null ? "—" : `${Math.round(v * 100)}`);
const num = (v, suffix = "ms") => (v == null ? "—" : `${v}${suffix}`);
const cls = (v) => (v == null ? "—" : v.toFixed(3));

const header =
  "| Form factor | URL | Perf | A11y | SEO | LCP | CLS | TTFB | FCP | TBT |\n" +
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |";
const body = rows
  .map(
    (r) =>
      `| ${r.formFactor} | ${r.url} | ${score(r.performance)} | ${score(r.accessibility)} | ${score(r.seo)} | ${num(r.lcp)} | ${cls(r.cls)} | ${num(r.ttfb)} | ${num(r.fcp)} | ${num(r.tbt)} |`,
  )
  .join("\n");

const md = `# Lighthouse — resumo (${rows.length} relatórios)\n\nGerado em ${new Date().toISOString()}\n\n${header}\n${body}\n`;

const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8">
<title>Lighthouse — resumo</title>
<style>
 body{font:14px/1.5 system-ui,sans-serif;margin:24px;color:#0f172a}
 table{border-collapse:collapse;width:100%} th,td{border:1px solid #cbd5e1;padding:6px 10px;text-align:left}
 th{background:#0f172a;color:#fff} tr:nth-child(even){background:#f1f5f9}
</style>
<h1>Lighthouse — resumo (${rows.length} relatórios)</h1>
<p>Gerado em ${new Date().toISOString()}</p>
<table><tr><th>Form factor</th><th>URL</th><th>Perf</th><th>A11y</th><th>SEO</th><th>LCP</th><th>CLS</th><th>TTFB</th><th>FCP</th><th>TBT</th></tr>
${rows
  .map(
    (r) =>
      `<tr><td>${r.formFactor}</td><td>${r.url}</td><td>${score(r.performance)}</td><td>${score(r.accessibility)}</td><td>${score(r.seo)}</td><td>${num(r.lcp)}</td><td>${cls(r.cls)}</td><td>${num(r.ttfb)}</td><td>${num(r.fcp)}</td><td>${num(r.tbt)}</td></tr>`,
  )
  .join("\n")}
</table></html>`;

mkdirSync("reports", { recursive: true });
writeFileSync("reports/lighthouse-summary.md", md);
writeFileSync("reports/lighthouse-summary.html", html);

if (process.env.GITHUB_STEP_SUMMARY) {
  writeFileSync(process.env.GITHUB_STEP_SUMMARY, md, { flag: "a" });
}

console.log(`Lighthouse summary gerado (${rows.length} relatórios) em reports/lighthouse-summary.{md,html}`);
