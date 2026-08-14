#!/usr/bin/env node
/**
 * RELATÓRIO — BASELINE DE AQUISIÇÃO (Rodada 8C)
 *
 * Lê `click_events` e separa, sem inventar dado:
 *   • aquisição real (canais externos identificáveis)
 *   • interno / QA (CTA do próprio site, automações, e2e)
 *   • desconhecido (sem sinal suficiente → UNKNOWN, com reason code)
 *
 * Fail-closed: sem credenciais ou sem dados, o relatório registra "sem
 * evidência" em vez de estimar. Saída: docs/relatorios/aquisicao-baseline.md
 */
import { mkdirSync, writeFileSync } from "node:fs";

const URL_BASE = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const DIAS = Number(process.env.JANELA_DIAS || 30);
const SAIDA = "docs/relatorios/aquisicao-baseline.md";

const desde = new Date(Date.now() - DIAS * 86400000).toISOString();

const INTERNO = /^(site|interno|internal|ci|ga4ci|qa|test|e2e|localhost)$/i;
const PAGO = /^(cpc|ppc|paid|paidsearch|paid_search|cpm|display|retargeting)$/i;
const BOT = /(bot|crawler|spider|headless|lighthouse|playwright)/i;

function classificar(ev) {
  const source = (ev.utm_source || "").trim().toLowerCase();
  const medium = (ev.utm_medium || "").trim().toLowerCase();
  const ua = (ev.user_agent || "").toLowerCase();
  if (BOT.test(ua)) return { grupo: "bot", reason: "USER_AGENT_AUTOMATIZADO" };
  if (INTERNO.test(source) || medium === "cta" || medium === "cta_interno")
    return { grupo: "interno", reason: "UTM_INTERNA_OU_CTA_PROPRIO" };
  if (PAGO.test(medium)) return { grupo: "aquisicao", reason: "MIDIA_PAGA" };
  if (source && medium) return { grupo: "aquisicao", reason: `CAMPANHA_${source.toUpperCase()}` };
  if (ev.referrer) return { grupo: "aquisicao", reason: "REFERRER_EXTERNO" };
  return { grupo: "desconhecido", reason: "SEM_UTM_E_SEM_REFERRER" };
}

async function buscar() {
  if (!URL_BASE || !KEY) return null;
  const url =
    `${URL_BASE}/rest/v1/click_events` +
    `?select=created_at,event_type,path,session_id,utm_source,utm_medium,utm_campaign,referrer,user_agent` +
    `&created_at=gte.${desde}&limit=50000`;
  const res = await fetch(url, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!res.ok) {
    console.error(`Falha ao ler click_events [${res.status}]: ${await res.text()}`);
    return null;
  }
  return res.json();
}

const linhas = [];
const eventos = await buscar();
linhas.push("# Baseline de aquisição — Rodada 8C", "");
linhas.push(`- Janela: últimos ${DIAS} dias (desde ${desde.slice(0, 10)})`);
linhas.push(`- Gerado em: ${new Date().toISOString()}`, "");

if (!eventos) {
  linhas.push("> **Sem evidência.** Credenciais ausentes ou consulta recusada.");
  linhas.push("> Nenhum número é estimado: o baseline permanece vazio (fail-closed).");
} else if (eventos.length === 0) {
  linhas.push("> **Baseline zero limpo.** Nenhum evento na janela — nada de tráfego artificial.");
} else {
  const grupos = new Map();
  const reasons = new Map();
  const sessoes = new Map();
  for (const ev of eventos) {
    const { grupo, reason } = classificar(ev);
    grupos.set(grupo, (grupos.get(grupo) || 0) + 1);
    reasons.set(`${grupo} · ${reason}`, (reasons.get(`${grupo} · ${reason}`) || 0) + 1);
    if (ev.session_id) sessoes.set(ev.session_id, grupo);
  }
  const total = eventos.length;
  const pct = (n) => `${Math.round((n / total) * 1000) / 10}%`;
  linhas.push("## Eventos por grupo", "", "| Grupo | Eventos | % |", "| --- | ---: | ---: |");
  for (const [g, n] of [...grupos].sort((a, b) => b[1] - a[1]))
    linhas.push(`| ${g} | ${n} | ${pct(n)} |`);
  linhas.push("", "## Reason codes", "", "| Grupo · motivo | Eventos |", "| --- | ---: |");
  for (const [r, n] of [...reasons].sort((a, b) => b[1] - a[1]).slice(0, 20))
    linhas.push(`| ${r} | ${n} |`);
  const sessoesAquisicao = [...sessoes.values()].filter((g) => g === "aquisicao").length;
  linhas.push(
    "",
    `- Sessões distintas: ${sessoes.size}`,
    `- Sessões de aquisição real: ${sessoesAquisicao}`,
    sessoesAquisicao === 0
      ? "- **Veredito:** sem aquisição externa mensurável nesta janela."
      : "- **Veredito:** há aquisição externa mensurável; comparar com a próxima janela antes de concluir tendência.",
  );
}

mkdirSync("docs/relatorios", { recursive: true });
writeFileSync(SAIDA, `${linhas.join("\n")}\n`);
console.log(`✔ Relatório gerado em ${SAIDA}`);
