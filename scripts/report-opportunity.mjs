#!/usr/bin/env node
/**
 * RODADA 6B — RELATÓRIO PERIÓDICO DE OPORTUNIDADE
 * -----------------------------------------------
 * Gera `docs/relatorio-oportunidade.md` com os recortes classificados em
 * Expand candidate · Improve page · Low evidence por rota, cidade, bairro,
 * serviço e canal. Envia o resumo ao Slack quando houver webhook.
 *
 * Fail-closed:
 *   • sem SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY → não inventa dado, sai 0;
 *   • sem SLACK_WEBHOOK_URL → apenas grava o arquivo;
 *   • recorte com amostra insuficiente nunca é destacado como vencedor.
 *
 * Uso: node scripts/report-opportunity.mjs [--dias 30]
 */
import { writeFileSync, mkdirSync } from "node:fs";

const arg = (nome, padrao) => {
  const i = process.argv.indexOf(`--${nome}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
};

const DIAS = Number(arg("dias", 30));
const AMOSTRA_MINIMA = 30;
const ALVO_WA = 0.1;

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.log("[oportunidade] credenciais ausentes — relatório não gerado (fail-closed).");
  process.exit(0);
}

const campos = [
  "created_at",
  "event_type",
  "path",
  "session_id",
  "servico",
  "neighborhood_slug",
  "utm_source",
  "utm_medium",
  "attribution_channel",
].join(",");

const desde = new Date(Date.now() - DIAS * 86400000).toISOString();
const res = await fetch(
  `${url}/rest/v1/click_events?select=${campos}&created_at=gte.${desde}&order=created_at.desc&limit=50000`,
  { headers: { apikey: key, Authorization: `Bearer ${key}` } },
);
if (!res.ok) {
  console.error(`[oportunidade] leitura falhou [${res.status}]: ${await res.text()}`);
  process.exit(1);
}

const BASELINE = new Date("2026-08-08T00:10:00Z");
const QA_SOURCES = ["teste_4d1", "teste_4d", "teste_4c", "qa"];
const eventos = (await res.json()).filter((e) => {
  const s = (e.utm_source || "").toLowerCase();
  const m = (e.utm_medium || "").toLowerCase();
  if (QA_SOURCES.includes(s) || m === "qa") return false;
  return new Date(e.created_at) >= BASELINE;
});

const CTA = new Set(["cta_click", "wa_funnel_open", "funnel_open"]);
const TRIAGEM = new Set(["triage_start", "funnel_open", "wa_funnel_step"]);
const WA = new Set(["whatsapp_open", "wa_click", "wa_funnel_submit"]);

const cidadeDaRota = (p) => {
  if (!p) return undefined;
  return (
    p.match(/^\/servicos\/[^/]+\/([a-z0-9-]+)$/)?.[1] ??
    p.match(/^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/)?.[1]
  );
};

const canalDoEvento = (e) => {
  const s = (e.utm_source || "").toLowerCase();
  const m = (e.utm_medium || "").toLowerCase();
  if (["cpc", "ppc", "paid", "paidsearch", "paid_search", "cpm", "display"].includes(m))
    return ["google", "googleads", "google_ads", "adwords"].includes(s) ? "google_ads" : "paid_other";
  if (["organic", "seo", "organic_search"].includes(m)) return "organic";
  if (m === "referral") return "referral";
  if (s === "site" || m === "direct") return "direct";
  return "unknown";
};

const dims = { rota: new Map(), cidade: new Map(), bairro: new Map(), servico: new Map(), canal: new Map() };
const pega = (d, k) => {
  const m = dims[d];
  const a = m.get(k) ?? { sessoes: new Set(), cta: new Set(), triagem: new Set(), wa: new Set() };
  m.set(k, a);
  return a;
};

for (const e of eventos) {
  const sid = e.session_id || e.created_at;
  const alvos = [];
  if (e.path) alvos.push(pega("rota", e.path));
  const cid = cidadeDaRota(e.path);
  if (cid) alvos.push(pega("cidade", cid));
  if (e.neighborhood_slug) alvos.push(pega("bairro", e.neighborhood_slug));
  if (e.servico) alvos.push(pega("servico", e.servico));
  alvos.push(pega("canal", canalDoEvento(e)));
  for (const a of alvos) {
    a.sessoes.add(sid);
    if (CTA.has(e.event_type)) a.cta.add(sid);
    if (TRIAGEM.has(e.event_type)) a.triagem.add(sid);
    if (WA.has(e.event_type)) a.wa.add(sid);
  }
}

const classificar = (a) => {
  if (a.sessoes.size < AMOSTRA_MINIMA) return "Low evidence";
  return a.wa.size / a.sessoes.size >= ALVO_WA ? "Expand candidate" : "Improve page";
};

const linhas = [];
for (const [dim, mapa] of Object.entries(dims)) {
  for (const [chave, a] of mapa) {
    linhas.push({
      dim,
      chave,
      sessoes: a.sessoes.size,
      cta: a.cta.size,
      triagem: a.triagem.size,
      wa: a.wa.size,
      taxa: a.sessoes.size ? a.wa.size / a.sessoes.size : null,
      classe: classificar(a),
    });
  }
}
linhas.sort((x, y) => y.sessoes - x.sessoes);

const pct = (t) => (t === null ? "—" : `${(t * 100).toFixed(1)}%`);
const tabela = (dim) => {
  const l = linhas.filter((x) => x.dim === dim).slice(0, 40);
  if (!l.length) return "_Sem dados no período._\n";
  return [
    "| Chave | Sessões | CTA | Triagem | WhatsApp | WA/sessão | Classificação |",
    "| --- | ---: | ---: | ---: | ---: | ---: | --- |",
    ...l.map((x) => `| \`${x.chave}\` | ${x.sessoes} | ${x.cta} | ${x.triagem} | ${x.wa} | ${pct(x.taxa)} | ${x.classe} |`),
  ].join("\n");
};

const conta = (c) => linhas.filter((l) => l.classe === c).length;

const md = `# Relatório de oportunidade — últimos ${DIAS} dias

Gerado em ${new Date().toISOString()} · fonte: \`click_events\` · tráfego de QA excluído (baseline comercial ${BASELINE.toISOString()}).
Sem dados pessoais. Métricas por **sessão distinta** — duplo clique não infla conversão.

## Critérios

| Classificação | Regra |
| --- | --- |
| Expand candidate | ≥ ${AMOSTRA_MINIMA} sessões **e** WhatsApp/sessão ≥ ${(ALVO_WA * 100).toFixed(0)}% |
| Improve page | ≥ ${AMOSTRA_MINIMA} sessões **e** WhatsApp/sessão < ${(ALVO_WA * 100).toFixed(0)}% |
| Low evidence | < ${AMOSTRA_MINIMA} sessões (sem base para decidir) |

Resumo: **${conta("Expand candidate")}** expandir · **${conta("Improve page")}** melhorar · **${conta("Low evidence")}** evidência baixa.

## Por rota

${tabela("rota")}

## Por cidade

${tabela("cidade")}

## Por bairro

${tabela("bairro")}

## Por serviço

${tabela("servico")}

## Por canal

${tabela("canal")}

## Limitações

- Lead e OS não entram nesta tabela: a fonte de lead é \`funnel_submissions\` e a OS ainda não tem vínculo técnico com \`journey_id\`.
- \`whatsapp_open\` é microconversão, não venda.
`;

mkdirSync("docs", { recursive: true });
writeFileSync("docs/relatorio-oportunidade.md", md);
console.log(`[oportunidade] docs/relatorio-oportunidade.md gerado — ${linhas.length} recortes, ${eventos.length} eventos comerciais.`);

const hook = process.env.SLACK_WEBHOOK_URL;
if (hook) {
  const texto = `*Oportunidades (${DIAS}d)* — ${conta("Expand candidate")} expandir · ${conta("Improve page")} melhorar · ${conta("Low evidence")} evidência baixa.`;
  const r = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: texto }),
  });
  if (!r.ok) console.error(`[oportunidade] Slack falhou [${r.status}]: ${await r.text()}`);
}
