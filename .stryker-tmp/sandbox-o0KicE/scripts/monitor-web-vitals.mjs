#!/usr/bin/env node
// @ts-nocheck
/**
 * MONITORAMENTO DE CORE WEB VITALS — URLs PRIORITÁRIAS
 *
 * Lê os dados de campo (CrUX) e de laboratório (Lighthouse) das URLs
 * prioritárias via PageSpeed Insights e compara com o baseline anterior.
 * Alerta (exit 1 com --alert) quando LCP/INP/CLS pioram acima da tolerância
 * ou quando uma métrica ultrapassa o orçamento de performance.
 *
 * Uso:
 *   node scripts/monitor-web-vitals.mjs                 # relatório
 *   node scripts/monitor-web-vitals.mjs --alert         # falha em regressão
 *   node scripts/monitor-web-vitals.mjs --save          # grava novo baseline
 *   PSI_API_KEY=... (opcional, aumenta a cota da API)
 *
 * Saídas: reports/web-vitals.json · reports/web-vitals.md
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { priorityUrls } from "./lib/priority-urls.mjs";

const ALERT = process.argv.includes("--alert");
const SAVE = process.argv.includes("--save");
const BASELINE = "reports/web-vitals-baseline.json";
const STRATEGY = process.argv.includes("--desktop") ? "desktop" : "mobile";

/** Orçamentos absolutos (mobile) — piora acima disso é falha. */
const BUDGET = { LCP: 2500, INP: 200, CLS: 0.1 };
/** Tolerância de regressão contra o baseline (%). */
const TOLERANCE = 0.15;

const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

async function measure(url) {
  const params = new URLSearchParams({ url, strategy: STRATEGY, category: "performance" });
  if (process.env.PSI_API_KEY) params.set("key", process.env.PSI_API_KEY);
  const res = await fetch(`${PSI}?${params}`);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`PSI [${res.status}] ${body?.error?.message ?? "erro desconhecido"}`);

  const audits = body?.lighthouseResult?.audits ?? {};
  const field = body?.loadingExperience?.metrics ?? {};
  const num = (v) => (typeof v === "number" ? Number(v.toFixed(3)) : null);

  return {
    lab: {
      LCP: num(audits["largest-contentful-paint"]?.numericValue),
      TBT: num(audits["total-blocking-time"]?.numericValue),
      CLS: num(audits["cumulative-layout-shift"]?.numericValue),
      score: num((body?.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
    },
    field: {
      LCP: field.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
      INP: field.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
      CLS:
        field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null
          ? field.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
          : null,
    },
  };
}

mkdirSync("reports", { recursive: true });
const urls = priorityUrls();
const previous = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")) : null;
const prevByPath = new Map((previous?.results ?? []).map((r) => [r.path, r]));

const results = [];
for (const item of urls) {
  try {
    const m = await measure(item.url);
    results.push({ ...item, ...m, error: null });
  } catch (e) {
    results.push({ ...item, lab: {}, field: {}, error: e.message });
  }
}

const alerts = [];
for (const r of results) {
  if (r.error) continue;
  const before = prevByPath.get(r.path);
  for (const metric of ["LCP", "INP", "CLS"]) {
    const now = r.field?.[metric] ?? (metric === "INP" ? null : r.lab?.[metric]);
    if (now == null) continue;
    if (now > BUDGET[metric]) {
      alerts.push(`${r.path} · ${metric}=${now} acima do orçamento (${BUDGET[metric]})`);
      continue;
    }
    const past = before?.field?.[metric] ?? before?.lab?.[metric];
    if (past != null && past > 0 && now > past * (1 + TOLERANCE)) {
      alerts.push(`${r.path} · ${metric} piorou ${past} → ${now} (> ${TOLERANCE * 100}%)`);
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  strategy: STRATEGY,
  budget: BUDGET,
  tolerance: TOLERANCE,
  alerts,
  results,
};
writeFileSync("reports/web-vitals.json", JSON.stringify(report, null, 2));
writeFileSync(
  "reports/web-vitals.md",
  [
    `# Core Web Vitals — URLs prioritárias (${STRATEGY})`,
    ``,
    `Gerado em ${report.generatedAt}. Campo = CrUX (usuários reais); Lab = Lighthouse.`,
    ``,
    `| Grupo | URL | LCP campo | INP campo | CLS campo | LCP lab | CLS lab | Score |`,
    `| --- | --- | --- | --- | --- | --- | --- | --- |`,
    ...results.map(
      (r) =>
        `| ${r.group} | ${r.path} | ${r.field?.LCP ?? "—"} | ${r.field?.INP ?? "—"} | ${r.field?.CLS ?? "—"} | ${r.lab?.LCP ?? "—"} | ${r.lab?.CLS ?? "—"} | ${r.lab?.score ?? (r.error ? "erro" : "—")} |`,
    ),
    ``,
    alerts.length
      ? `## ⚠️ Alertas\n\n${alerts.map((a) => `- ${a}`).join("\n")}`
      : `Sem regressões de Web Vitals acima da tolerância.`,
  ].join("\n"),
);

console.log(`Web Vitals (${STRATEGY}): ${results.length} URLs · ${alerts.length} alerta(s)`);
alerts.forEach((a) => console.log(`  ⚠ ${a}`));

if (SAVE || !previous) {
  writeFileSync(BASELINE, JSON.stringify(report, null, 2));
  console.log(`Baseline gravado em ${BASELINE}.`);
}

if (alerts.length && ALERT) {
  console.error(`\n✖ ALERTA: ${alerts.length} regressão(ões) de Core Web Vitals.`);
  process.exit(1);
}
console.log("✔ Monitoramento de Core Web Vitals concluído.");
