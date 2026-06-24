import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const dirs = [".lighthouseci", ".lighthouseci-mobile"];
const maxFcp = Number(process.env.PERF_BUDGET_FCP_MS || 2200);
const maxLcp = Number(process.env.PERF_BUDGET_LCP_MS || 3500);

const numeric = (audit) => Math.round(audit?.numericValue || 0);
let checked = 0;
const failures = [];

for (const dir of dirs) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const report = JSON.parse(readFileSync(join(dir, file), "utf8"));
    const fcp = numeric(report.audits?.["first-contentful-paint"]);
    const lcp = numeric(report.audits?.["largest-contentful-paint"]);
    checked++;
    if (fcp > maxFcp) failures.push(`${file}: FCP ${fcp}ms > ${maxFcp}ms`);
    if (lcp > maxLcp) failures.push(`${file}: LCP ${lcp}ms > ${maxLcp}ms`);
  }
}

if (!checked) {
  console.log("Performance budgets: no Lighthouse reports found; run lh:all first.");
  process.exit(0);
}

if (failures.length) {
  console.error("Performance budget failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Performance budgets passed (${checked} reports): FCP ≤ ${maxFcp}ms, LCP ≤ ${maxLcp}ms.`);