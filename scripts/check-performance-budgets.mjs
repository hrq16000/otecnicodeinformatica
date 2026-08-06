import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// Gate de Core Web Vitals + acessibilidade sobre os relatórios do Lighthouse CI.
// Falha o build quando qualquer rota auditada ficar fora do alvo.
const dirs = [".lighthouseci", ".lighthouseci-mobile"];
const maxFcp = Number(process.env.PERF_BUDGET_FCP_MS || 2200);
const maxLcp = Number(process.env.PERF_BUDGET_LCP_MS || 3500);
const maxCls = Number(process.env.PERF_BUDGET_CLS || 0.1);
const maxTtfb = Number(process.env.PERF_BUDGET_TTFB_MS || 800);
const minA11y = Number(process.env.PERF_BUDGET_A11Y || 0.9);

const numeric = (audit) => Math.round(audit?.numericValue || 0);
let checked = 0;
const failures = [];

for (const dir of dirs) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const report = JSON.parse(readFileSync(join(dir, file), "utf8"));
    if (!report.audits) continue;
    const fcp = numeric(report.audits["first-contentful-paint"]);
    const lcp = numeric(report.audits["largest-contentful-paint"]);
    const cls = report.audits["cumulative-layout-shift"]?.numericValue ?? 0;
    const ttfb = numeric(report.audits["server-response-time"]);
    const a11y = report.categories?.accessibility?.score;
    checked++;
    if (fcp > maxFcp) failures.push(`${file}: FCP ${fcp}ms > ${maxFcp}ms`);
    if (lcp > maxLcp) failures.push(`${file}: LCP ${lcp}ms > ${maxLcp}ms`);
    if (cls > maxCls) failures.push(`${file}: CLS ${cls.toFixed(3)} > ${maxCls}`);
    if (ttfb > maxTtfb) failures.push(`${file}: TTFB ${ttfb}ms > ${maxTtfb}ms`);
    if (typeof a11y === "number" && a11y < minA11y)
      failures.push(`${file}: acessibilidade ${a11y.toFixed(2)} < ${minA11y}`);
  }
}

if (!checked) {
  console.error("Performance budgets: nenhum relatório Lighthouse encontrado (rode lh:all antes).");
  process.exit(1);
}

if (failures.length) {
  console.error("Performance budget falhou:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(
  `Performance budgets OK (${checked} relatórios): FCP ≤ ${maxFcp}ms, LCP ≤ ${maxLcp}ms, CLS ≤ ${maxCls}, TTFB ≤ ${maxTtfb}ms, A11y ≥ ${minA11y}.`,
);
