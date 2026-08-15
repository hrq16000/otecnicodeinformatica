/**
 * RELATÓRIO DIÁRIO DE PERFORMANCE DE INTERFACE.
 *
 * Resume, por rota, o que ficou ACIMA dos budgets do CI (LCP, CLS, INP, TBT)
 * e aponta regressões comparando com:
 *   • `perf-baseline.json` (baseline versionado do gate de regressão);
 *   • o relatório diário anterior (`reports/daily-ui-performance.json`),
 *     que revela piora gradual dentro da tolerância.
 *
 * Fontes: relatórios do Lighthouse CI (`.lighthouseci`, `.lighthouseci-mobile`).
 * Sem relatórios, o script sai em estado INDISPONÍVEL — nunca inventa número
 * nem finge que está tudo bem.
 *
 * Saídas:
 *   reports/daily-ui-performance.json  (série usada na próxima comparação)
 *   reports/daily-ui-performance.md    (resumo legível para o time)
 *   Sentry  → evento `ui.daily_report` (warning quando há violação/regressão),
 *             se SENTRY_DSN/VITE_SENTRY_DSN estiver definido;
 *   GA4     → evento `ui_daily_report` via Measurement Protocol,
 *             se GA4_MEASUREMENT_ID + GA4_API_SECRET estiverem definidos.
 *
 * Uso: node scripts/report-daily-ui-performance.mjs [--strict]
 *      (--strict devolve exit 1 quando há violação de budget)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DIRS = [".lighthouseci", ".lighthouseci-mobile"];
const SAIDA_JSON = "reports/daily-ui-performance.json";
const SAIDA_MD = "reports/daily-ui-performance.md";
const BASELINE = "perf-baseline.json";
const estrito = process.argv.includes("--strict");

// Espelham src/lib/uiPerformanceBudgets.ts e check-performance-budgets.mjs.
const BUDGETS = {
  LCP: Number(process.env.PERF_BUDGET_LCP_MS || 3500),
  CLS: Number(process.env.PERF_BUDGET_CLS || 0.1),
  INP: Number(process.env.PERF_BUDGET_INP_MS || 200),
  TBT: Number(process.env.PERF_BUDGET_TBT_MS || 350),
};
// Piora relevante frente ao dia anterior / baseline (mesma régua do gate).
const TOL = {
  LCP_PCT: Number(process.env.PERF_REGRESSION_LCP_PCT || 0.15),
  LCP_MS: Number(process.env.PERF_REGRESSION_LCP_MS || 250),
  CLS_ABS: Number(process.env.PERF_REGRESSION_CLS_ABS || 0.02),
};

const num = (audit) => (typeof audit?.numericValue === "number" ? audit.numericValue : null);

/** Lê cada relatório do Lighthouse e agrega por "perfil rota". */
const coletar = () => {
  const linhas = {};
  for (const dir of DIRS) {
    if (!existsSync(dir)) continue;
    for (const arquivo of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
      let relatorio;
      try {
        relatorio = JSON.parse(readFileSync(join(dir, arquivo), "utf8"));
      } catch {
        continue;
      }
      if (!relatorio.audits) continue;
      const url = relatorio.finalDisplayedUrl || relatorio.finalUrl || relatorio.requestedUrl || "/";
      let rota = url;
      try {
        rota = new URL(url).pathname || "/";
      } catch {
        /* url relativa */
      }
      const perfil = dir.includes("mobile") ? "mobile" : "desktop";
      const chave = `${perfil} ${rota}`;
      const inp =
        num(relatorio.audits["interaction-to-next-paint"]) ??
        num(relatorio.audits["experimental-interaction-to-next-paint"]);
      linhas[chave] = {
        perfil,
        rota,
        LCP: Math.round(num(relatorio.audits["largest-contentful-paint"]) ?? 0),
        CLS: Number((num(relatorio.audits["cumulative-layout-shift"]) ?? 0).toFixed(3)),
        INP: inp === null ? null : Math.round(inp),
        TBT: Math.round(num(relatorio.audits["total-blocking-time"]) ?? 0),
      };
    }
  }
  return linhas;
};

const lerJson = (arquivo) => {
  try {
    return JSON.parse(readFileSync(arquivo, "utf8"));
  } catch {
    return null;
  }
};

const atual = coletar();
const chaves = Object.keys(atual).sort();

if (chaves.length === 0) {
  console.log(
    "⏭️  Relatório diário INDISPONÍVEL: nenhum relatório do Lighthouse encontrado em .lighthouseci/.lighthouseci-mobile.",
  );
  process.exit(0);
}

const baseline = lerJson(BASELINE) || {};
const anterior = lerJson(SAIDA_JSON);
const rotasAnteriores = anterior?.rotas || {};

const violacoes = [];
const regressoes = [];

for (const chave of chaves) {
  const l = atual[chave];
  if (l.LCP > BUDGETS.LCP) violacoes.push({ chave, metrica: "LCP", valor: l.LCP, budget: BUDGETS.LCP });
  if (l.CLS > BUDGETS.CLS) violacoes.push({ chave, metrica: "CLS", valor: l.CLS, budget: BUDGETS.CLS });
  if (l.INP !== null && l.INP > BUDGETS.INP)
    violacoes.push({ chave, metrica: "INP", valor: l.INP, budget: BUDGETS.INP });
  if (l.TBT > BUDGETS.TBT) violacoes.push({ chave, metrica: "TBT", valor: l.TBT, budget: BUDGETS.TBT });

  // Comparação com quem tiver referência: baseline versionado e dia anterior.
  for (const [origem, ref] of [
    ["baseline", baseline[chave]],
    ["ontem", rotasAnteriores[chave]],
  ]) {
    if (!ref) continue;
    const refLcp = ref.lcp ?? ref.LCP;
    const refCls = ref.cls ?? ref.CLS;
    if (typeof refLcp === "number" && l.LCP > refLcp * (1 + TOL.LCP_PCT) + TOL.LCP_MS) {
      regressoes.push({
        chave,
        metrica: "LCP",
        origem,
        de: Math.round(refLcp),
        para: l.LCP,
      });
    }
    if (typeof refCls === "number" && l.CLS > refCls + TOL.CLS_ABS) {
      regressoes.push({ chave, metrica: "CLS", origem, de: refCls, para: l.CLS });
    }
  }
}

const data = new Date().toISOString();
const resumo = {
  gerado_em: data,
  rotas_auditadas: chaves.length,
  violacoes,
  regressoes,
  budgets: BUDGETS,
  rotas: atual,
};

mkdirSync("reports", { recursive: true });
writeFileSync(SAIDA_JSON, `${JSON.stringify(resumo, null, 2)}\n`);

const tabela = [
  "| Rota | LCP | CLS | INP | TBT |",
  "| --- | --- | --- | --- | --- |",
  ...chaves.map((c) => {
    const l = atual[c];
    const marca = (v, budget) => (v !== null && v > budget ? `**${v}** ⚠` : v === null ? "—" : `${v}`);
    return `| ${c} | ${marca(l.LCP, BUDGETS.LCP)}ms | ${marca(l.CLS, BUDGETS.CLS)} | ${marca(l.INP, BUDGETS.INP)} | ${marca(l.TBT, BUDGETS.TBT)}ms |`;
  }),
].join("\n");

const md = `# Relatório diário — performance de interface

Gerado em ${data} · ${chaves.length} rota(s) auditada(s).
Budgets: LCP ${BUDGETS.LCP}ms · CLS ${BUDGETS.CLS} · INP ${BUDGETS.INP}ms · TBT ${BUDGETS.TBT}ms.

## Acima do budget (${violacoes.length})

${violacoes.length === 0 ? "Nenhuma métrica acima do budget." : violacoes.map((v) => `- ${v.chave} — ${v.metrica} ${v.valor} (budget ${v.budget})`).join("\n")}

## Possíveis regressões (${regressoes.length})

${regressoes.length === 0 ? "Nenhuma regressão relevante frente ao baseline nem ao relatório anterior." : regressoes.map((r) => `- ${r.chave} — ${r.metrica} piorou de ${r.de} para ${r.para} (referência: ${r.origem})`).join("\n")}

## Medições

${tabela}
`;
writeFileSync(SAIDA_MD, md);

/** Envia o resumo ao Sentry (Store API — sem SDK, igual ao cliente). */
const enviarSentry = async () => {
  const dsn = process.env.SENTRY_DSN || process.env.VITE_SENTRY_DSN;
  if (!dsn) return "sentry: não configurado";
  let alvo;
  try {
    const u = new URL(dsn);
    const projeto = u.pathname.replace(/^\//, "");
    alvo = {
      url: `${u.protocol}//${u.host}/api/${projeto}/store/`,
      auth: `Sentry sentry_version=7, sentry_key=${u.username}, sentry_client=daily-report/1.0`,
    };
  } catch {
    return "sentry: DSN inválido";
  }
  const nivel = violacoes.length || regressoes.length ? "warning" : "info";
  const resposta = await fetch(alvo.url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-sentry-auth": alvo.auth },
    body: JSON.stringify({
      timestamp: data,
      platform: "node",
      level: nivel,
      logger: "ui.daily_report",
      message: {
        formatted: `Relatório diário: ${violacoes.length} violação(ões) de budget e ${regressoes.length} regressão(ões) em ${chaves.length} rota(s)`,
      },
      tags: { kind: "ui.daily_report", violations: String(violacoes.length) },
      extra: { violacoes, regressoes },
    }),
  }).catch((e) => ({ ok: false, status: String(e) }));
  return `sentry: ${resposta.ok ? "enviado" : `falhou (${resposta.status})`}`;
};

/** Envia o mesmo resumo ao GA4 via Measurement Protocol. */
const enviarGa4 = async () => {
  const id = process.env.GA4_MEASUREMENT_ID;
  const secret = process.env.GA4_API_SECRET;
  if (!id || !secret) return "ga4: não configurado";
  const resposta = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${id}&api_secret=${secret}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: "ci.daily-report",
        events: [
          {
            name: "ui_daily_report",
            params: {
              routes_audited: chaves.length,
              budget_violations: violacoes.length,
              regressions: regressoes.length,
              worst_route: violacoes[0]?.chave || "",
            },
          },
        ],
      }),
    },
  ).catch((e) => ({ ok: false, status: String(e) }));
  return `ga4: ${resposta.ok ? "enviado" : `falhou (${resposta.status})`}`;
};

const sinks = await Promise.all([enviarSentry(), enviarGa4()]);

console.log(`📊 Relatório diário: ${chaves.length} rota(s)`);
console.log(`   ⚠ ${violacoes.length} acima do budget · ${regressoes.length} regressão(ões)`);
for (const v of violacoes) console.log(`   • ${v.chave} ${v.metrica} ${v.valor} > ${v.budget}`);
for (const r of regressoes) console.log(`   ↘ ${r.chave} ${r.metrica} ${r.de} → ${r.para} (${r.origem})`);
console.log(`   ${sinks.join(" · ")}`);
console.log(`   → ${SAIDA_MD}`);

if (estrito && violacoes.length) process.exit(1);
