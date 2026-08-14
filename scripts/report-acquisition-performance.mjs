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
const SAIDA_MD = "reports/acquisition-performance.md";
const SAIDA_JSON = "reports/acquisition-performance.json";


const desde = new Date(Date.now() - DIAS * 86400000).toISOString();

const INTERNO = /^(site|interno|internal|ci|ga4ci|qa|test|e2e|localhost)$/i;
const PAGO = /^(cpc|ppc|paid|paidsearch|paid_search|cpm|display|retargeting)$/i;
const BOT = /(bot|crawler|spider|headless|lighthouse|playwright)/i;

function classificar(ev) {
  const source = (ev.utm_source || "").trim().toLowerCase();
  const medium = (ev.utm_medium || "").trim().toLowerCase();
  const canal = (ev.attribution_channel || "").trim().toLowerCase();
  if (BOT.test(source) || BOT.test(canal)) return { grupo: "bot", reason: "ORIGEM_AUTOMATIZADA" };
  if (canal === "internal" || INTERNO.test(source) || medium === "cta" || medium === "cta_interno")
    return { grupo: "interno", reason: "UTM_INTERNA_OU_CTA_PROPRIO" };
  if (PAGO.test(medium)) return { grupo: "aquisicao", reason: "MIDIA_PAGA" };
  if (source && medium) return { grupo: "aquisicao", reason: `CAMPANHA_${source.toUpperCase()}` };
  if (canal && canal !== "direto") return { grupo: "aquisicao", reason: `CANAL_${canal.toUpperCase()}` };
  return { grupo: "desconhecido", reason: "SEM_UTM_E_SEM_CANAL" };
}

async function buscar() {
  if (!URL_BASE || !KEY) return null;
  const url =
    `${URL_BASE}/rest/v1/click_events` +
    `?select=created_at,event_type,path,session_id,utm_source,utm_medium,utm_campaign,attribution_channel,landing_route` +
    `&created_at=gte.${desde}&limit=50000`;
  const res = await fetch(url, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!res.ok) {
    console.error(`Falha ao ler click_events [${res.status}]: ${await res.text()}`);
    return null;
  }
  return res.json();
}

/** RODADA 8D — funil por canal e por landing (só aquisição; internal fica fora). */
const ETAPA = {
  cta_click: "cta",
  funnel_open: "triagem",
  triage_start: "triagem",
  triage_complete: "triagem",
  wa_click: "whatsapp",
  whatsapp_open: "whatsapp",
  n: "whatsapp",
  lead_submitted: "lead",
  wa_funnel_submit: "lead",
};
const novoBucket = () => ({ sessoes: new Set(), cta: new Set(), triagem: new Set(), whatsapp: new Set(), lead: new Set() });
const tamanhos = (b) => ({
  sessions: b.sessoes.size,
  cta: b.cta.size,
  triage: b.triagem.size,
  whatsapp: b.whatsapp.size,
  lead: b.lead.size,
});

const linhas = [];
const eventos = await buscar();
const resumo = {
  gerado_em: new Date().toISOString(),
  janela_dias: DIAS,
  desde,
  evidencia: eventos ? "ok" : "sem_evidencia",
  eventos: eventos?.length ?? 0,
  sessoes: { total: 0, aquisicao: 0, internal: 0, desconhecido: 0, bot: 0 },
  reason_codes: {},
  por_canal: [],
  por_landing: [],
  veredito: "LOW_EVIDENCE",
};

linhas.push("# Baseline de aquisição — Rodadas 8C/8D", "");
linhas.push(`- Janela: últimos ${DIAS} dias (desde ${desde.slice(0, 10)})`);
linhas.push(`- Gerado em: ${resumo.gerado_em}`, "");

if (!eventos) {
  linhas.push("> **Sem evidência.** Credenciais ausentes ou consulta recusada.");
  linhas.push("> Nenhum número é estimado: o baseline permanece vazio (fail-closed).");
} else if (eventos.length === 0) {
  linhas.push("> **Baseline zero limpo.** Nenhum evento na janela — nada de tráfego artificial.");
} else {
  const grupos = new Map();
  const reasons = new Map();
  const sessoes = new Map();
  const canais = new Map();
  const landings = new Map();

  for (const ev of eventos) {
    const { grupo, reason } = classificar(ev);
    grupos.set(grupo, (grupos.get(grupo) || 0) + 1);
    const chaveReason = `${grupo} · ${reason}`;
    reasons.set(chaveReason, (reasons.get(chaveReason) || 0) + 1);
    const sid = ev.session_id || ev.created_at || "sessao-desconhecida";
    sessoes.set(sid, grupo);
    if (grupo !== "aquisicao") continue;

    const canal = (ev.utm_source || ev.attribution_channel || "unknown").toLowerCase();
    const landing = ev.landing_route || ev.path || "(sem rota)";
    for (const [mapa, chave] of [
      [canais, canal],
      [landings, landing],
    ]) {
      const b = mapa.get(chave) ?? novoBucket();
      b.sessoes.add(sid);
      const etapa = ETAPA[ev.event_type];
      if (etapa) b[etapa].add(sid);
      mapa.set(chave, b);
    }
  }

  const total = eventos.length;
  const pct = (n) => `${Math.round((n / total) * 1000) / 10}%`;
  linhas.push("## Eventos por grupo", "", "| Grupo | Eventos | % |", "| --- | ---: | ---: |");
  for (const [g, n] of [...grupos].sort((a, b) => b[1] - a[1])) linhas.push(`| ${g} | ${n} | ${pct(n)} |`);

  linhas.push("", "## Reason codes", "", "| Grupo · motivo | Eventos |", "| --- | ---: |");
  for (const [r, n] of [...reasons].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    linhas.push(`| ${r} | ${n} |`);
    resumo.reason_codes[r] = n;
  }

  const contarGrupo = (g) => [...sessoes.values()].filter((v) => v === g).length;
  resumo.sessoes = {
    total: sessoes.size,
    aquisicao: contarGrupo("aquisicao"),
    internal: contarGrupo("interno"),
    desconhecido: contarGrupo("desconhecido"),
    bot: contarGrupo("bot"),
  };

  const tabela = (titulo, rotulo, mapa) => {
    linhas.push(
      "",
      `## ${titulo}`,
      "",
      `| ${rotulo} | Sessões | CTA | Triagem | WhatsApp | Lead |`,
      "| --- | ---: | ---: | ---: | ---: | ---: |",
    );
    const itens = [...mapa.entries()].sort((a, b) => b[1].sessoes.size - a[1].sessoes.size);
    if (itens.length === 0) linhas.push("| (sem aquisição na janela) | 0 | 0 | 0 | 0 | 0 |");
    for (const [chave, b] of itens) {
      const t = tamanhos(b);
      linhas.push(`| ${chave} | ${t.sessions} | ${t.cta} | ${t.triage} | ${t.whatsapp} | ${t.lead} |`);
    }
    return itens.map(([chave, b]) => ({ chave, ...tamanhos(b) }));
  };

  resumo.por_canal = tabela("Funil por canal (somente aquisição)", "Canal", canais);
  resumo.por_landing = tabela("Funil por landing (somente aquisição)", "Landing", landings);

  resumo.veredito = resumo.sessoes.aquisicao >= 25 ? "AMOSTRA_INICIAL" : "LOW_EVIDENCE";
  linhas.push(
    "",
    `- Sessões distintas: ${resumo.sessoes.total}`,
    `- Sessões de aquisição real: ${resumo.sessoes.aquisicao}`,
    `- Sessões internas/QA (fora da soma): ${resumo.sessoes.internal}`,
    `- Veredito de amostra: **${resumo.veredito}**`,
    resumo.sessoes.aquisicao === 0
      ? "- **Veredito:** sem aquisição externa mensurável nesta janela."
      : "- **Veredito:** há aquisição externa mensurável; comparar com a próxima janela antes de concluir tendência.",
  );
}

const markdown = `${linhas.join("\n")}\n`;
mkdirSync("docs/relatorios", { recursive: true });
mkdirSync("reports", { recursive: true });
writeFileSync(SAIDA, markdown);
writeFileSync(SAIDA_MD, markdown);
writeFileSync(SAIDA_JSON, `${JSON.stringify(resumo, null, 2)}\n`);
console.log(`✔ Relatório gerado em ${SAIDA}, ${SAIDA_MD} e ${SAIDA_JSON}`);

