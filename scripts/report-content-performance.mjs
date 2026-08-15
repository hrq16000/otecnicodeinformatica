#!/usr/bin/env node
/**
 * RODADA 8F — PERFORMANCE E JORNADA ASSISTIDA DO CLUSTER
 * ------------------------------------------------------
 * Junta descoberta (content-discovery) + consultas reais
 * (content-query-intent) e emite um veredito por URL usando regras
 * explícitas de evidência:
 *
 *   SEM_DESCOBERTA   → Google não conhece a URL. Nada a otimizar ainda.
 *   DESCOBERTA_SEM_IMPRESSAO → conhecida, sem aparecer. Observar.
 *   IMPRESSAO_SEM_CLIQUE → tem impressão suficiente; aí sim snippet.
 *   TRAFEGO_SEM_CONVERSAO → tem clique; olhar ponte para o serviço.
 *   CONVERTENDO      → clique + conversão atribuída.
 *
 * Conversão atribuída vem do banco somente quando as credenciais
 * existem; caso contrário o campo é `null` e o veredito nunca sobe para
 * CONVERTENDO. É proibido inventar denominador.
 *
 * Saída: reports/content-performance.json e .md
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "reports");

const ler = (f) => {
  const p = path.join(OUT, f);
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;
};

const discovery = ler("content-discovery.json");
const queryIntent = ler("content-query-intent.json");

if (!discovery) {
  console.error("BLOQUEADO: rode `npm run report:content-discovery` antes de report:content-performance.");
  process.exit(1);
}

const CTR_MIN = { learning: 50, actionable: 300 };
const evidenciaCtr = (imp) => (imp < CTR_MIN.learning ? "NO_DATA" : imp < CTR_MIN.actionable ? "LEARNING" : "ACTIONABLE");

/** Conversões atribuídas por rota de entrada — só com credenciais reais. */
async function conversoes() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const desde = new Date(Date.now() - 30 * 86_400_000).toISOString();
    const r = await fetch(
      `${url}/rest/v1/click_events?select=route,event_name,journey_id&created_at=gte.${desde}&limit=10000`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

const eventos = await conversoes();

const porUrl = discovery.urls.map((d) => {
  const q = queryIntent?.urls?.find((u) => u.url === d.url);
  const impressoes = q?.impressoes ?? 0;
  const cliques = q?.cliques ?? 0;

  let sessoes = null;
  let whatsapp = null;
  let assistidas = null;
  if (eventos) {
    const daRota = eventos.filter((e) => (e.route || "").replace(/\/+$/, "") === d.url);
    sessoes = new Set(daRota.map((e) => e.journey_id).filter(Boolean)).size;
    const jornadasWa = new Set(
      eventos.filter((e) => e.event_name === "whatsapp_open").map((e) => e.journey_id).filter(Boolean),
    );
    const minhasJornadas = new Set(daRota.map((e) => e.journey_id).filter(Boolean));
    whatsapp = [...minhasJornadas].filter((j) => jornadasWa.has(j)).length;
    // assistida = jornada que passou por esta URL e converteu em OUTRA rota
    assistidas = [...minhasJornadas].filter((j) => {
      const conv = eventos.find((e) => e.journey_id === j && e.event_name === "whatsapp_open");
      return conv && (conv.route || "").replace(/\/+$/, "") !== d.url;
    }).length;
  }

  const veredito =
    d.discovery === "UNKNOWN"
      ? "SEM_DESCOBERTA"
      : impressoes === 0
        ? "DESCOBERTA_SEM_IMPRESSAO"
        : cliques === 0
          ? "IMPRESSAO_SEM_CLIQUE"
          : whatsapp && whatsapp > 0
            ? "CONVERTENDO"
            : "TRAFEGO_SEM_CONVERSAO";

  const acao =
    veredito === "SEM_DESCOBERTA"
      ? "Reforçar links internos e sitemap. Não mexer em title/description."
      : veredito === "DESCOBERTA_SEM_IMPRESSAO"
        ? "Aguardar rastreamento. Nenhuma reescrita justificada ainda."
        : veredito === "IMPRESSAO_SEM_CLIQUE"
          ? evidenciaCtr(impressoes) === "ACTIONABLE"
            ? "Amostra suficiente: avaliar snippet (title/description)."
            : "Amostra insuficiente para concluir sobre CTR. Continuar observando."
          : veredito === "TRAFEGO_SEM_CONVERSAO"
            ? "Revisar a ponte conteúdo → serviço → CTA na página."
            : "Manter. Cluster cumprindo a função de aquisição.";

  return {
    url: d.url,
    intent: d.intent,
    discovery: d.discovery,
    idadeDias: d.idadeDias,
    faixaIdade: d.faixaIdade,
    linksInternos: d.linksInternos,
    impressoes,
    cliques,
    evidenciaCtr: evidenciaCtr(impressoes),
    sessoes,
    whatsapp,
    jornadasAssistidas: assistidas,
    veredito,
    acao,
  };
});

const resumo = {
  geradoEm: new Date().toISOString(),
  cohort: discovery.resumo.cohort,
  fonteConversao: eventos ? "click_events (30d)" : "sem credenciais nesta execução",
  fonteBusca: queryIntent?.resumo?.fonte ?? "não executado",
  vereditos: porUrl.reduce((a, u) => ({ ...a, [u.veredito]: (a[u.veredito] || 0) + 1 }), {}),
};

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, "content-performance.json"), JSON.stringify({ resumo, urls: porUrl }, null, 2));

const md = [
  "# Performance do cluster editorial — Rodada 8F",
  "",
  `Coorte \`${resumo.cohort}\`. Busca: ${resumo.fonteBusca}. Conversão: ${resumo.fonteConversao}.`,
  "",
  "| URL | Descoberta | Impressões | Cliques | Evidência CTR | Sessões | WhatsApp | Assistidas | Veredito |",
  "| --- | --- | --: | --: | --- | --: | --: | --: | --- |",
  ...porUrl.map(
    (u) =>
      `| \`${u.url}\` | ${u.discovery} | ${u.impressoes} | ${u.cliques} | ${u.evidenciaCtr} | ${u.sessoes ?? "—"} | ${u.whatsapp ?? "—"} | ${u.jornadasAssistidas ?? "—"} | ${u.veredito} |`,
  ),
  "",
  "## Ação recomendada por URL",
  "",
  ...porUrl.map((u) => `- \`${u.url}\` (${u.idadeDias}d): ${u.acao}`),
  "",
  "## Nota de método",
  "",
  "“—” significa ausência de fonte conectada nesta execução, não zero medido.",
  "Nenhum veredito de CTR é emitido abaixo de 300 impressões; abaixo de 50 o",
  "relatório declara explicitamente que não há dado.",
  "",
].join("\n");

writeFileSync(path.join(OUT, "content-performance.md"), md);

console.log("── report:content-performance ──");
for (const [k, v] of Object.entries(resumo.vereditos)) console.log(`  ${k}: ${v}`);
console.log("  → reports/content-performance.md");
