#!/usr/bin/env node
// @ts-nocheck
/**
 * PIPELINE DE PERFORMANCE — páginas de bairro e cidade.
 *
 * Compara LCP/CLS/FCP/TBT das rotas locais auditadas pelo Lighthouse com a
 * baseline versionada em .lighthouse-local-baseline.json e alerta quando há
 * regressão após mudanças de imagem ou layout.
 *
 *   node scripts/check-local-perf.mjs            # compara com a baseline
 *   node scripts/check-local-perf.mjs --update   # regrava a baseline
 *
 * Tolerância padrão: 15% de piora ou estouro de budget absoluto.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASELINE = path.resolve(".lighthouse-local-baseline.json");
const DIRS = [".lighthouseci", ".lighthouseci-mobile"];
const UPDATE = process.argv.includes("--update");
const TOL = Number(process.env.PERF_LOCAL_TOLERANCE || 0.15);
const BUDGET = { lcp: 3500, cls: 0.1, fcp: 2200, tbt: 350 };
const LOCAL_RE = /\/(conserto-(tv|som|videogame|celular))\/[a-z0-9-]+/;

const reports = [];
for (const dir of DIRS) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    let r;
    try { r = JSON.parse(readFileSync(path.join(dir, f), "utf8")); } catch { continue; }
    if (!r.audits || !r.finalUrl) continue;
    if (!LOCAL_RE.test(r.finalUrl)) continue;
    const route = new URL(r.finalUrl).pathname;
    reports.push({
      key: `${dir.includes("mobile") ? "mobile" : "desktop"}::${route}`,
      lcp: Math.round(r.audits["largest-contentful-paint"]?.numericValue || 0),
      cls: Number((r.audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(3)),
      fcp: Math.round(r.audits["first-contentful-paint"]?.numericValue || 0),
      tbt: Math.round(r.audits["total-blocking-time"]?.numericValue || 0),
    });
  }
}

if (!reports.length) {
  console.error(
    "Performance local: nenhum relatório Lighthouse de rota bairro/cidade encontrado.\n" +
      "Rode `npm run lh:all` com as rotas locais no lighthouserc antes deste gate.",
  );
  process.exit(1);
}

// Média por rota (numberOfRuns > 1).
const byKey = new Map();
for (const r of reports) {
  const acc = byKey.get(r.key) || { n: 0, lcp: 0, cls: 0, fcp: 0, tbt: 0 };
  acc.n++; acc.lcp += r.lcp; acc.cls += r.cls; acc.fcp += r.fcp; acc.tbt += r.tbt;
  byKey.set(r.key, acc);
}
const current = {};
for (const [k, a] of byKey)
  current[k] = {
    lcp: Math.round(a.lcp / a.n),
    cls: Number((a.cls / a.n).toFixed(3)),
    fcp: Math.round(a.fcp / a.n),
    tbt: Math.round(a.tbt / a.n),
  };

if (UPDATE || !existsSync(BASELINE)) {
  writeFileSync(BASELINE, JSON.stringify({ updatedAt: new Date().toISOString(), metrics: current }, null, 2) + "\n");
  console.log(`Baseline local gravada com ${Object.keys(current).length} rota(s) → ${path.basename(BASELINE)}`);
  process.exit(0);
}

const base = JSON.parse(readFileSync(BASELINE, "utf8")).metrics || {};
const alerts = [];
const novos = [];

for (const [key, m] of Object.entries(current)) {
  for (const [metric, limit] of Object.entries(BUDGET)) {
    if (m[metric] > limit) alerts.push(`${key}: ${metric.toUpperCase()} ${m[metric]} acima do budget (${limit})`);
  }
  const b = base[key];
  if (!b) { novos.push(key); continue; }
  for (const metric of Object.keys(BUDGET)) {
    const antes = b[metric] || 0;
    const agora = m[metric] || 0;
    if (antes > 0 && agora > antes * (1 + TOL))
      alerts.push(
        `${key}: regressão de ${metric.toUpperCase()} — ${antes} → ${agora} (+${Math.round(((agora - antes) / antes) * 100)}%)`,
      );
  }
}

if (novos.length) console.log(`Rotas novas sem baseline (use --update): ${novos.join(", ")}`);

if (alerts.length) {
  console.error(`ALERTA DE PERFORMANCE — ${alerts.length} regressão(ões) em páginas de bairro/cidade:`);
  alerts.forEach((a) => console.error(`  • ${a}`));
  process.exit(1);
}

console.log(`OK — ${Object.keys(current).length} rota(s) local(is) sem regressão (tolerância ${Math.round(TOL * 100)}%).`);
