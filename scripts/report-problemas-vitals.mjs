#!/usr/bin/env node
/**
 * WEB VITALS POR ROTA DE /problemas (LCP · CLS · INP).
 *
 * Lê campo (CrUX) e laboratório (Lighthouse) via PageSpeed Insights para cada
 * rota do cluster de sintomas e grava um relatório que é anexado ao relatório
 * de deploy (reports/post-deploy-vitals.md).
 *
 * Uso:
 *   node scripts/report-problemas-vitals.mjs            # mobile
 *   node scripts/report-problemas-vitals.mjs --desktop
 *   node scripts/report-problemas-vitals.mjs --alert    # exit 1 fora do orçamento
 *   PSI_API_KEY=... (opcional)
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { PROBLEMAS, BASE_URL } from "./lib/curated-urls.mjs";

const ALERT = process.argv.includes("--alert");
const STRATEGY = process.argv.includes("--desktop") ? "desktop" : "mobile";
const BUDGET = { LCP: 2500, INP: 200, CLS: 0.1 };
const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const num = (v) => (typeof v === "number" ? Number(v.toFixed(3)) : null);

async function medir(url) {
  const params = new URLSearchParams({ url, strategy: STRATEGY, category: "performance" });
  if (process.env.PSI_API_KEY) params.set("key", process.env.PSI_API_KEY);
  const res = await fetch(`${PSI}?${params}`);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`PSI [${res.status}] ${body?.error?.message ?? "erro"}`);
  const audits = body?.lighthouseResult?.audits ?? {};
  const campo = body?.loadingExperience?.metrics ?? {};
  return {
    lab: {
      LCP: num(audits["largest-contentful-paint"]?.numericValue),
      CLS: num(audits["cumulative-layout-shift"]?.numericValue),
      TBT: num(audits["total-blocking-time"]?.numericValue),
      score: num((body?.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
    },
    campo: {
      LCP: campo.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
      INP: campo.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
      CLS:
        typeof campo.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile === "number"
          ? campo.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
          : null,
    },
  };
}

const rotas = PROBLEMAS.map((p) => p.path);
const linhas = [];
const violacoes = [];

for (const path of rotas) {
  const url = `${BASE_URL}${path}`;
  try {
    const m = await medir(url);
    const lcp = m.campo.LCP ?? m.lab.LCP;
    const cls = m.campo.CLS ?? m.lab.CLS;
    const inp = m.campo.INP;
    linhas.push({ path, ...m, resumo: { LCP: lcp, INP: inp, CLS: cls } });
    if (lcp && lcp > BUDGET.LCP) violacoes.push(`${path}: LCP ${lcp}ms > ${BUDGET.LCP}ms`);
    if (inp && inp > BUDGET.INP) violacoes.push(`${path}: INP ${inp}ms > ${BUDGET.INP}ms`);
    if (cls && cls > BUDGET.CLS) violacoes.push(`${path}: CLS ${cls} > ${BUDGET.CLS}`);
  } catch (e) {
    linhas.push({ path, erro: e.message, resumo: { LCP: null, INP: null, CLS: null } });
  }
}

const relatorio = {
  generatedAt: new Date().toISOString(),
  strategy: STRATEGY,
  budget: BUDGET,
  total: linhas.length,
  violacoes,
  rotas: linhas,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/problemas-vitals.json", `${JSON.stringify(relatorio, null, 2)}\n`);
writeFileSync(
  "reports/post-deploy-vitals.md",
  [
    `# Web Vitals — cluster /problemas (${STRATEGY})`,
    ``,
    `Gerado em ${relatorio.generatedAt} · orçamento LCP ${BUDGET.LCP}ms · INP ${BUDGET.INP}ms · CLS ${BUDGET.CLS}`,
    ``,
    `| Rota | LCP | INP | CLS | Lighthouse |`,
    `| --- | --- | --- | --- | --- |`,
    ...linhas.map(
      (l) =>
        `| ${l.path} | ${l.resumo.LCP ?? "—"} | ${l.resumo.INP ?? "—"} | ${l.resumo.CLS ?? "—"} | ${l.lab?.score ?? (l.erro ? "erro" : "—")} |`,
    ),
    ``,
    violacoes.length
      ? `## Fora do orçamento\n\n${violacoes.map((v) => `- ${v}`).join("\n")}`
      : `Todas as rotas medidas dentro do orçamento.`,
  ].join("\n"),
);

console.log(`Web Vitals /problemas: ${linhas.length} rotas · ${violacoes.length} fora do orçamento`);
for (const v of violacoes) console.log(`  · ${v}`);
if (violacoes.length && ALERT) process.exit(1);
