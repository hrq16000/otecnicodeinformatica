/**
 * GATE DE REGRESSÃO DE PERFORMANCE (LCP/CLS).
 *
 * Os budgets absolutos vivem em check-performance-budgets.mjs. Aqui olhamos
 * a variação contra o baseline versionado (`perf-baseline.json`): mesmo dentro
 * do teto, uma piora relevante em LCP ou CLS reprova o CI — é assim que
 * regressão silenciosa é barrada antes de chegar em produção.
 *
 * Uso:
 *   node scripts/check-perf-regression.mjs            # valida
 *   node scripts/check-perf-regression.mjs --update   # regrava o baseline
 *
 * Tolerâncias (env sobrescreve):
 *   PERF_REGRESSION_LCP_PCT  (padrão 0.15 = 15%)
 *   PERF_REGRESSION_LCP_MS   (padrão 250ms — folga fixa para ruído de runner)
 *   PERF_REGRESSION_CLS_ABS  (padrão 0.02)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BASELINE = "perf-baseline.json";
const dirs = [".lighthouseci", ".lighthouseci-mobile"];
const atualizar = process.argv.includes("--update");

const tolPct = Number(process.env.PERF_REGRESSION_LCP_PCT || 0.15);
const tolMs = Number(process.env.PERF_REGRESSION_LCP_MS || 250);
const tolCls = Number(process.env.PERF_REGRESSION_CLS_ABS || 0.02);

/** Chave estável por rota + form factor (o nome do arquivo muda a cada run). */
const chaveDoRelatorio = (report, dir) => {
  const url = report.finalDisplayedUrl || report.finalUrl || report.requestedUrl || "";
  let rota = "/";
  try {
    rota = new URL(url).pathname || "/";
  } catch {
    rota = url || "/";
  }
  const perfil = dir.includes("mobile") ? "mobile" : "desktop";
  return `${perfil} ${rota}`;
};

const atual = {};
for (const dir of dirs) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    let report;
    try {
      report = JSON.parse(readFileSync(join(dir, file), "utf8"));
    } catch {
      continue;
    }
    if (!report.audits) continue;
    const chave = chaveDoRelatorio(report, dir);
    const lcp = Math.round(report.audits["largest-contentful-paint"]?.numericValue || 0);
    const cls = Number((report.audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3));
    // Com mais de um run por rota, o pior caso é o que vale.
    const anterior = atual[chave];
    atual[chave] = {
      lcp: Math.max(lcp, anterior?.lcp ?? 0),
      cls: Math.max(cls, anterior?.cls ?? 0),
    };
  }
}

if (!Object.keys(atual).length) {
  console.error("Regressão de performance: nenhum relatório Lighthouse encontrado (rode lh:all antes).");
  process.exit(1);
}

if (atualizar) {
  writeFileSync(BASELINE, `${JSON.stringify({ atualizadoEm: new Date().toISOString(), rotas: atual }, null, 2)}\n`);
  console.log(`Baseline de performance regravado (${Object.keys(atual).length} rotas) em ${BASELINE}.`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error(
    `Regressão de performance: ${BASELINE} ausente. Gere com "npm run perf:baseline" e versione o arquivo.`,
  );
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE, "utf8")).rotas || {};
const falhas = [];
const novas = [];
let comparadas = 0;

for (const [chave, medida] of Object.entries(atual)) {
  const base = baseline[chave];
  if (!base) {
    novas.push(chave);
    continue;
  }
  comparadas++;
  const limiteLcp = Math.round(base.lcp * (1 + tolPct)) + tolMs;
  if (medida.lcp > limiteLcp) {
    falhas.push(`${chave}: LCP ${medida.lcp}ms > ${limiteLcp}ms (baseline ${base.lcp}ms)`);
  }
  const limiteCls = Number((base.cls + tolCls).toFixed(3));
  if (medida.cls > limiteCls) {
    falhas.push(`${chave}: CLS ${medida.cls} > ${limiteCls} (baseline ${base.cls})`);
  }
}

console.log("── Gate check:perf-regression ──");
console.log(`  rotas comparadas: ${comparadas}`);
for (const nova of novas) console.log(`  • rota sem baseline (ignorada): ${nova}`);

if (falhas.length) {
  console.error(`\nRegressão de performance detectada:\n${falhas.map((f) => `  ✗ ${f}`).join("\n")}`);
  console.error(
    "\nSe a piora for intencional e aceita, rode `npm run perf:baseline` e versione o novo perf-baseline.json.",
  );
  process.exit(1);
}

console.log(`✔ sem regressão de LCP (±${Math.round(tolPct * 100)}% + ${tolMs}ms) nem de CLS (+${tolCls}).`);
