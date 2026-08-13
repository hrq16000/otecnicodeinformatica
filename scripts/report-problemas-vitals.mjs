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
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
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

// ── Comparação com o baseline (regressão entre deploys) ────────────────────
const BASELINE = "reports/problemas-vitals-baseline.json";
const TOLERANCIA = { LCP: 0.1, INP: 0.1, CLS: 0.02 }; // 10% de piora ou +0.02 CLS
const baseline = existsSync(BASELINE)
  ? JSON.parse(readFileSync(BASELINE, "utf8"))
  : null;
const regressoes = [];
if (baseline?.rotas) {
  const antes = new Map(baseline.rotas.map((r) => [r.path, r.resumo ?? {}]));
  for (const l of linhas) {
    const a = antes.get(l.path);
    if (!a) continue;
    for (const m of ["LCP", "INP"]) {
      if (typeof a[m] === "number" && typeof l.resumo[m] === "number" && a[m] > 0) {
        const delta = (l.resumo[m] - a[m]) / a[m];
        if (delta > TOLERANCIA[m])
          regressoes.push(`${l.path}: ${m} ${a[m]} → ${l.resumo[m]} (+${(delta * 100).toFixed(0)}%)`);
      }
    }
    if (typeof a.CLS === "number" && typeof l.resumo.CLS === "number" && l.resumo.CLS - a.CLS > TOLERANCIA.CLS)
      regressoes.push(`${l.path}: CLS ${a.CLS} → ${l.resumo.CLS}`);
  }
}

// ── Envio opcional para o coletor OTLP (mesma env do runtime) ──────────────
const OTLP = process.env.OTLP_ENDPOINT || process.env.VITE_OTLP_ENDPOINT;
if (OTLP) {
  const agora = String(Date.now() * 1e6);
  const metricas = linhas.flatMap((l) =>
    ["LCP", "INP", "CLS"]
      .filter((m) => typeof l.resumo[m] === "number")
      .map((m) => ({
        name: `web_vitals.${m.toLowerCase()}`,
        unit: m === "CLS" ? "1" : "ms",
        gauge: {
          dataPoints: [
            {
              asDouble: l.resumo[m],
              timeUnixNano: agora,
              attributes: [
                { key: "url.path", value: { stringValue: l.path } },
                { key: "strategy", value: { stringValue: STRATEGY } },
              ],
            },
          ],
        },
      })),
  );
  try {
    const res = await fetch(`${OTLP.replace(/\/$/, "")}/v1/metrics`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        resourceMetrics: [
          {
            resource: {
              attributes: [{ key: "service.name", value: { stringValue: "otecnicodeinformatica" } }],
            },
            scopeMetrics: [{ scope: { name: "post-deploy-vitals" }, metrics: metricas }],
          },
        ],
      }),
    });
    console.log(`OTLP: ${metricas.length} métricas enviadas [${res.status}]`);
  } catch (e) {
    console.log(`OTLP indisponível (${e.message}) — relatório local gerado mesmo assim.`);
  }
}

const relatorio = {
  generatedAt: new Date().toISOString(),
  strategy: STRATEGY,
  budget: BUDGET,
  total: linhas.length,
  violacoes,
  regressoes,
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
    ``,
    baseline
      ? regressoes.length
        ? `## Regressão vs. baseline (${baseline.generatedAt})\n\n${regressoes.map((r) => `- ${r}`).join("\n")}`
        : `Sem regressão em relação ao baseline (${baseline.generatedAt}).`
      : `Sem baseline salvo. Grave \`reports/problemas-vitals-baseline.json\` a partir deste relatório para comparar os próximos deploys.`,
  ].join("\n"),
);

console.log(
  `Web Vitals /problemas: ${linhas.length} rotas · ${violacoes.length} fora do orçamento · ${regressoes.length} regressão(ões)`,
);
for (const v of violacoes) console.log(`  · ${v}`);
for (const r of regressoes) console.log(`  ↓ ${r}`);
if (process.argv.includes("--save-baseline")) {
  writeFileSync(BASELINE, `${JSON.stringify(relatorio, null, 2)}\n`);
  console.log(`Baseline gravado em ${BASELINE}`);
}
if ((violacoes.length || regressoes.length) && ALERT) process.exit(1);
