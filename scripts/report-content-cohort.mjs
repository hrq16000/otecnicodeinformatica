#!/usr/bin/env node
/**
 * RODADA 8G — RELATÓRIO DE OBSERVAÇÃO DA COORTE (CLUSTER 1)
 * ---------------------------------------------------------
 * Consolida, em uma única visão, o que os relatórios da 8F medem
 * separadamente: descoberta, consultas reais e performance/jornada.
 *
 * Regras (espelham src/lib/cohortObservation.ts, que é a fonte de verdade
 * usada pelo painel e pelos testes):
 *   • ausência de fonte → UNKNOWN, nunca NOT_INDEXED;
 *   • baixo volume → dado, não incidente;
 *   • milestone é emitido uma única vez (timeline persistida);
 *   • uma decisão por rodada, sempre com evidência numérica.
 *
 * Saídas: reports/content-cohort.json e reports/content-cohort.md
 *         reports/content-cohort-timeline.json (histórico de milestones)
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "reports");
const HOJE = new Date();

const ler = (f) => {
  const p = path.join(OUT, f);
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;
};

/* ── coorte congelada (fonte única em src/lib/contentCohort.ts) ── */
const cohortSrc = readFileSync(path.join(ROOT, "src/lib/contentCohort.ts"), "utf8");
const COHORT_ID = cohortSrc.match(/CONTENT_COHORT_ID = "([^"]+)"/)?.[1] ?? "desconhecida";
const MEMBROS = [
  ...cohortSrc.matchAll(
    /url:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)",\s*\n\s*publishedAt:\s*"([^"]+)",\s*\n\s*updatedAt:\s*"([^"]+)"/g,
  ),
].map((m) => ({ url: m[1], intent: m[2], publishedAt: m[3], updatedAt: m[4] }));

if (MEMBROS.length === 0) {
  console.error("BLOQUEADO: não foi possível ler a coorte de src/lib/contentCohort.ts.");
  process.exit(1);
}

const discovery = ler("content-discovery.json");
const queryIntent = ler("content-query-intent.json");
const performance = ler("content-performance.json");

const idadeDias = (d) => Math.max(0, Math.floor((HOJE - new Date(`${d}T12:00:00Z`)) / 86_400_000));
const faixa = (n) => (n <= 7 ? "0-7" : n <= 14 ? "8-14" : n <= 30 ? "15-30" : n <= 60 ? "31-60" : "60+");
const CTR_MIN = { learning: 50, actionable: 300 };
const evidenciaCtr = (i) => (i < CTR_MIN.learning ? "NO_DATA" : i < CTR_MIN.actionable ? "LEARNING" : "ACTIONABLE");
const AMOSTRA = { ctrActionable: 300, queriesParaIntencao: 20, sessoesAcionavel: 30 };

const regressoesDe = (t) => {
  const out = [];
  if (t.rota200 === false) out.push("404_OR_5XX");
  if (t.indexavel === false) out.push("NOINDEX");
  if (t.selfCanonical === false) out.push("BAD_CANONICAL");
  if (t.noSitemap === false) out.push("SITEMAP_MISSING");
  if ((t.linksInternos ?? 0) < 2) out.push("ORPHAN");
  if (t.clickDepth != null && t.clickDepth > 3) out.push("DEPTH_REGRESSION");
  return out;
};

const estadoDe = (s) =>
  (s.assists ?? 0) > 0
    ? "COMMERCIAL_ASSIST"
    : (s.ctaClicks ?? 0) > 0 || (s.whatsapp ?? 0) > 0
      ? "ENGAGED"
      : (s.sessions ?? 0) > 0
        ? "SESSIONS"
        : (s.clicks ?? 0) > 0
          ? "CLICKS"
          : (s.impressions ?? 0) > 0
            ? "IMPRESSIONS"
            : s.discovery;

const reasonDe = (s, regressoes) => {
  if (regressoes.length) return "TECHNICAL_REGRESSION";
  const e = estadoDe(s);
  if (e === "COMMERCIAL_ASSIST") return "COMMERCIAL_SIGNAL_LOW_SAMPLE";
  if (e === "ENGAGED" || e === "SESSIONS") return "TRAFFIC_LOW_SAMPLE";
  if (e === "CLICKS") return "CLICKS_LOW_SAMPLE";
  if (e === "IMPRESSIONS") return "IMPRESSIONS_NO_CLICKS";
  if (e === "INDEXED") return "INDEXED_NO_IMPRESSIONS";
  if (s.ageDays <= 14) return "NEW_CONTENT";
  return e === "UNKNOWN" ? "UNKNOWN_TO_GOOGLE" : "DISCOVERED_NOT_INDEXED";
};

const linhas = MEMBROS.map((m) => {
  const d = discovery?.urls?.find((x) => x.url === m.url);
  const q = queryIntent?.urls?.find((x) => x.url === m.url);
  const p = performance?.urls?.find((x) => x.url === m.url);
  const dias = idadeDias(m.publishedAt);
  const tecnico = {
    rota200: d?.rota200 ?? null,
    noSitemap: d?.noSitemap ?? null,
    selfCanonical: d?.selfCanonical ?? null,
    indexavel: d?.indexavel ?? null,
    linksInternos: d?.linksInternos ?? null,
    clickDepth: d?.clickDepth ?? null,
  };
  const sinais = {
    ...m,
    ageDays: dias,
    faixaIdade: faixa(dias),
    discovery: d?.discovery ?? "UNKNOWN",
    impressions: q ? q.impressoes : null,
    clicks: q ? q.cliques : null,
    sessions: p?.sessoes ?? null,
    ctaClicks: null,
    whatsapp: p?.whatsapp ?? null,
    assists: p?.jornadasAssistidas ?? null,
    queries: q?.queries?.length ?? 0,
    tecnico,
  };
  // Só há regressão a apontar quando o relatório mediu o campo (não-null).
  const regressoes = discovery ? regressoesDe(tecnico) : [];
  return {
    ...sinais,
    estado: estadoDe(sinais),
    reason: reasonDe(sinais, regressoes),
    evidenciaCtr: evidenciaCtr(sinais.impressions ?? 0),
    regressoes,
  };
});

/* ── status global e decisão ── */
const soma = (k) => linhas.reduce((a, l) => a + (l[k] ?? 0), 0);
const indexadas = linhas.filter((l) => l.discovery === "INDEXED").length;
const conhecidas = linhas.filter((l) => l.discovery !== "UNKNOWN").length;
const impressoes = soma("impressions");
const cliques = soma("clicks");
const sessoes = soma("sessions");
const assists = soma("assists");
const totalQueries = soma("queries");
const regressoesTotais = linhas.flatMap((l) => l.regressoes.map((r) => `${l.url}:${r}`));

const status =
  assists > 0 && sessoes >= AMOSTRA.sessoesAcionavel
    ? "ACTIONABLE"
    : assists > 0
      ? "SHOWING_COMMERCIAL_SIGNAL"
      : cliques > 0 || sessoes > 0
        ? "GETTING_TRAFFIC"
        : impressoes > 0
          ? "GETTING_IMPRESSIONS"
          : indexadas > 0
            ? "INDEXATION_IN_PROGRESS"
            : conhecidas > 0
              ? "DISCOVERY_IN_PROGRESS"
              : "OBSERVING";

const decisao = (() => {
  if (regressoesTotais.length)
    return { decision: "TECHNICAL_FIX", motivo: `Regressão técnica: ${regressoesTotais.join(", ")}.` };
  if (impressoes >= AMOSTRA.ctrActionable && cliques === 0)
    return { decision: "CTR_OPTIMIZATION", motivo: `${impressoes} impressões sem clique.` };
  if (indexadas === linhas.length && impressoes > 0 && cliques > 0)
    return { decision: "EXPANSION_CANDIDATE", motivo: "Cluster indexado com impressões e cliques reais." };
  return {
    decision: "OBSERVE",
    motivo:
      indexadas === 0
        ? "Sem indexação confirmada: o gargalo é descoberta, não conteúdo."
        : "Amostra ainda baixa. Baixo volume é dado, não falha técnica.",
  };
})();

/* ── milestones: emitidos uma única vez ── */
const TIMELINE_FILE = path.join(OUT, "content-cohort-timeline.json");
const timeline = existsSync(TIMELINE_FILE) ? JSON.parse(readFileSync(TIMELINE_FILE, "utf8")) : {};
const alcancados = [];
const algum = (f) => linhas.some(f);
if (algum((l) => l.discovery !== "UNKNOWN")) alcancados.push("FIRST_DISCOVERY");
if (algum((l) => l.discovery === "INDEXED")) alcancados.push("FIRST_INDEXATION");
if (algum((l) => (l.impressions ?? 0) > 0)) alcancados.push("FIRST_IMPRESSION");
if (algum((l) => (l.clicks ?? 0) > 0)) alcancados.push("FIRST_CLICK");
if (algum((l) => (l.sessions ?? 0) > 0)) alcancados.push("FIRST_ORGANIC_SESSION");
if (algum((l) => (l.whatsapp ?? 0) > 0)) alcancados.push("FIRST_WHATSAPP");
if (algum((l) => (l.assists ?? 0) > 0)) alcancados.push("FIRST_COMMERCIAL_ASSIST");
const novos = alcancados.filter((m) => !timeline[m]);
for (const m of novos) timeline[m] = HOJE.toISOString();

const resumo = {
  geradoEm: HOJE.toISOString(),
  cohort: COHORT_ID,
  urls: linhas.length,
  fonteBusca: queryIntent?.resumo?.fonte ?? "não executado",
  fonteConversao: performance?.resumo?.fonteConversao ?? "não executado",
  discovered: `${conhecidas}/${linhas.length}`,
  indexed: `${indexadas}/${linhas.length}`,
  impressoes,
  cliques,
  sessoes,
  assists,
  queries: totalQueries,
  evidenciaIntencao: totalQueries >= AMOSTRA.queriesParaIntencao ? "SUFICIENTE" : "INSUFICIENTE",
  status,
  decisao: decisao.decision,
  motivo: decisao.motivo,
  milestonesNovos: novos,
};

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, "content-cohort.json"), JSON.stringify({ resumo, linhas, timeline }, null, 2));
writeFileSync(TIMELINE_FILE, JSON.stringify(timeline, null, 2));

const md = [
  "# Coorte do Cluster 1 — observação (Rodada 8G)",
  "",
  `Coorte \`${COHORT_ID}\` · ${linhas.length} URLs congeladas.`,
  `Fonte de busca: ${resumo.fonteBusca}. Fonte de conversão: ${resumo.fonteConversao}.`,
  "",
  `**Status do cluster: ${status}** · próxima ação: **${decisao.decision}** — ${decisao.motivo}`,
  "",
  "| URL | Idade | Estado | Reason | Impr. | Cliques | Sessões | WhatsApp | Assist |",
  "| --- | --- | --- | --- | --: | --: | --: | --: | --: |",
  ...linhas.map(
    (l) =>
      `| \`${l.url}\` | ${l.ageDays}d (${l.faixaIdade}) | ${l.estado} | ${l.reason} | ${l.impressions ?? "—"} | ${l.clicks ?? "—"} | ${l.sessions ?? "—"} | ${l.whatsapp ?? "—"} | ${l.assists ?? "—"} |`,
  ),
  "",
  `Discovered ${resumo.discovered} · Indexed ${resumo.indexed} · consultas reais ${totalQueries} (${resumo.evidenciaIntencao} para julgar intenção).`,
  "",
  "## Milestones",
  "",
  Object.keys(timeline).length
    ? Object.entries(timeline)
        .map(([m, d]) => `- ${m}: ${d}`)
        .join("\n")
    : "Nenhum milestone atingido até agora. Ausência de dado é UNKNOWN, não fracasso.",
  "",
  "## Saúde técnica",
  "",
  regressoesTotais.length
    ? regressoesTotais.map((r) => `- ${r}`).join("\n")
    : discovery
      ? "Nenhuma regressão: 200, self-canonical, index, sitemap, ≥2 links internos e profundidade ≤3."
      : "Sem relatório de descoberta nesta execução — saúde técnica não avaliada (não é o mesmo que saudável).",
  "",
  "## Leitura",
  "",
  "- Baixo volume não gera incidente. Só regressão técnica concreta vira TECHNICAL_FIX.",
  "- CTR só é avaliável a partir de 300 impressões; intenção, a partir de 20 consultas reais.",
  "- Tempo é contexto: nenhuma regra aqui autoriza expandir por prazo cumprido.",
  "",
].join("\n");

writeFileSync(path.join(OUT, "content-cohort.md"), md);

console.log("── report:content-cohort ──");
console.log(`  ${linhas.length} URLs · discovered ${resumo.discovered} · indexed ${resumo.indexed}`);
console.log(`  status ${status} · decisão ${decisao.decision}`);
if (novos.length) console.log(`  milestones novos: ${novos.join(", ")}`);
console.log("  → reports/content-cohort.md");
