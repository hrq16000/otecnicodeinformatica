/**
 * RODADA 8G — OBSERVAÇÃO ATIVA DO CLUSTER 1
 * -----------------------------------------
 * Esta rodada não produz conteúdo. Ela produz *julgamento com regra*.
 *
 * Fonte única das decisões sobre a coorte `content_cluster_formatacao_v1`:
 * estados, milestones, reason codes, saúde técnica e qual é a próxima ação.
 *
 * Três invariantes que o código precisa garantir sozinho:
 *
 *   1. Ausência de dado é UNKNOWN — nunca NOT_INDEXED, nunca "falhou".
 *   2. Baixo volume é dado, não incidente. Só regressão técnica concreta
 *      (noindex, canonical trocado, 404, órfã, fora do sitemap) vira TECHNICAL_FIX.
 *   3. Tempo é contexto, não gatilho. Nenhuma função aqui recebe "dias"
 *      como critério suficiente para expandir.
 */
import { CONTENT_COHORT, ageBucket, ctrEvidence, type AgeBucket, type CtrEvidence, type DiscoveryState } from "@/lib/contentCohort";
import type { ContentIntent } from "@/lib/contentIntentMap";

/* ─────────────────────────── Estados da coorte ─────────────────────────── */

export const COHORT_STATES = [
  "UNKNOWN",
  "DISCOVERED",
  "CRAWLED",
  "INDEXED",
  "IMPRESSIONS",
  "CLICKS",
  "SESSIONS",
  "ENGAGED",
  "COMMERCIAL_ASSIST",
] as const;
export type CohortState = (typeof COHORT_STATES)[number];

/** Saúde técnica exigida da coorte (Fase 22). Qualquer `false` é regressão. */
export type TechnicalSignals = {
  rota200: boolean;
  noSitemap: boolean;
  selfCanonical: boolean;
  indexavel: boolean;
  linksInternos: number;
  /** null quando o relatório não mediu profundidade. */
  clickDepth: number | null;
};

/**
 * Sinais medidos de uma URL. `null` significa "fonte não conectada" e é
 * tratado como desconhecido; `0` significa medido e igual a zero.
 */
export type UrlSignals = {
  url: string;
  intent: ContentIntent;
  publishedAt: string;
  ageDays: number;
  discovery: DiscoveryState;
  impressions: number | null;
  clicks: number | null;
  sessions: number | null;
  ctaClicks: number | null;
  whatsapp: number | null;
  assists: number | null;
  tecnico: TechnicalSignals;
};

export const MAX_CLICK_DEPTH = 3;
export const MIN_INBOUND_LINKS = 2;

/** Lista de regressões técnicas concretas. Vazia = saudável. */
export function technicalRegressions(t: TechnicalSignals): string[] {
  const out: string[] = [];
  if (!t.rota200) out.push("404_OR_5XX");
  if (!t.indexavel) out.push("NOINDEX");
  if (!t.selfCanonical) out.push("BAD_CANONICAL");
  if (!t.noSitemap) out.push("SITEMAP_MISSING");
  if (t.linksInternos < MIN_INBOUND_LINKS) out.push("ORPHAN");
  if (t.clickDepth !== null && t.clickDepth > MAX_CLICK_DEPTH) out.push("DEPTH_REGRESSION");
  return out;
}

/**
 * Estado observado da URL — sobe apenas até onde existe evidência.
 * `null` em qualquer métrica trava a subida naquele degrau.
 */
export function cohortState(s: UrlSignals): CohortState {
  if ((s.assists ?? 0) > 0) return "COMMERCIAL_ASSIST";
  if ((s.ctaClicks ?? 0) > 0 || (s.whatsapp ?? 0) > 0) return "ENGAGED";
  if ((s.sessions ?? 0) > 0) return "SESSIONS";
  if ((s.clicks ?? 0) > 0) return "CLICKS";
  if ((s.impressions ?? 0) > 0) return "IMPRESSIONS";
  return s.discovery;
}

/* ────────────────────────────── Reason codes ───────────────────────────── */

export const REASON_CODES = [
  "TECHNICAL_REGRESSION",
  "NEW_CONTENT",
  "UNKNOWN_TO_GOOGLE",
  "DISCOVERED_NOT_INDEXED",
  "INDEXED_NO_IMPRESSIONS",
  "IMPRESSIONS_NO_CLICKS",
  "CLICKS_LOW_SAMPLE",
  "TRAFFIC_LOW_SAMPLE",
  "COMMERCIAL_SIGNAL_LOW_SAMPLE",
] as const;
export type ReasonCode = (typeof REASON_CODES)[number];

export const REASON_LABEL: Record<ReasonCode, string> = {
  TECHNICAL_REGRESSION: "Regressão técnica concreta — corrigir antes de qualquer análise",
  NEW_CONTENT: "Conteúdo recém-publicado: janela normal de descoberta",
  UNKNOWN_TO_GOOGLE: "Google ainda não conhece a URL",
  DISCOVERED_NOT_INDEXED: "Descoberta/rastreada, ainda não indexada",
  INDEXED_NO_IMPRESSIONS: "Indexada sem impressões — pode ser demanda, posição ou autoridade",
  IMPRESSIONS_NO_CLICKS: "Aparece na busca e ainda não recebe clique",
  CLICKS_LOW_SAMPLE: "Já tem clique, amostra pequena demais para concluir",
  TRAFFIC_LOW_SAMPLE: "Já tem sessão, amostra pequena demais para concluir",
  COMMERCIAL_SIGNAL_LOW_SAMPLE: "Já houve sinal comercial, amostra ainda baixa",
};

/** Faixa de idade em que "ainda não aconteceu nada" é o esperado. */
const NEW_CONTENT_MAX_DAYS = 14;

export function reasonCode(s: UrlSignals): ReasonCode {
  if (technicalRegressions(s.tecnico).length > 0) return "TECHNICAL_REGRESSION";
  const estado = cohortState(s);
  if (estado === "COMMERCIAL_ASSIST") return "COMMERCIAL_SIGNAL_LOW_SAMPLE";
  if (estado === "ENGAGED" || estado === "SESSIONS") return "TRAFFIC_LOW_SAMPLE";
  if (estado === "CLICKS") return "CLICKS_LOW_SAMPLE";
  if (estado === "IMPRESSIONS") return "IMPRESSIONS_NO_CLICKS";
  if (estado === "INDEXED") return "INDEXED_NO_IMPRESSIONS";
  // Sem indexação: idade decide se isso é "normal" ou já merece atenção.
  if (s.ageDays <= NEW_CONTENT_MAX_DAYS) return "NEW_CONTENT";
  if (estado === "UNKNOWN") return "UNKNOWN_TO_GOOGLE";
  return "DISCOVERED_NOT_INDEXED";
}

/* ─────────────────────────── Status do cluster ─────────────────────────── */

export const CLUSTER_STATUSES = [
  "OBSERVING",
  "DISCOVERY_IN_PROGRESS",
  "INDEXATION_IN_PROGRESS",
  "GETTING_IMPRESSIONS",
  "GETTING_TRAFFIC",
  "SHOWING_COMMERCIAL_SIGNAL",
  "ACTIONABLE",
] as const;
export type ClusterStatus = (typeof CLUSTER_STATUSES)[number];

/** Amostra mínima para o cluster deixar de ser "aprendizado". */
export const SAMPLE_THRESHOLDS = {
  /** Impressões agregadas para avaliar snippet (espelha CTR_MIN_IMPRESSIONS). */
  ctrActionable: 300,
  /** Consultas distintas mínimas para julgar intenção. */
  queriesParaIntencao: 20,
  /** Sessões orgânicas agregadas para o cluster virar acionável. */
  sessoesAcionavel: 30,
} as const;

export function clusterStatus(urls: UrlSignals[]): ClusterStatus {
  if (urls.length === 0) return "OBSERVING";
  const soma = (f: (u: UrlSignals) => number | null) => urls.reduce((a, u) => a + (f(u) ?? 0), 0);
  const assists = soma((u) => u.assists);
  const sessoes = soma((u) => u.sessions);
  const cliques = soma((u) => u.clicks);
  const impressoes = soma((u) => u.impressions);
  const indexadas = urls.filter((u) => u.discovery === "INDEXED").length;
  const conhecidas = urls.filter((u) => u.discovery !== "UNKNOWN").length;

  if (assists > 0 && sessoes >= SAMPLE_THRESHOLDS.sessoesAcionavel) return "ACTIONABLE";
  if (assists > 0) return "SHOWING_COMMERCIAL_SIGNAL";
  if (cliques > 0 || sessoes > 0) return "GETTING_TRAFFIC";
  if (impressoes > 0) return "GETTING_IMPRESSIONS";
  if (indexadas > 0) return "INDEXATION_IN_PROGRESS";
  if (conhecidas > 0) return "DISCOVERY_IN_PROGRESS";
  return "OBSERVING";
}

/* ────────────────────────── Intenção observada ─────────────────────────── */

export type IntentMatch = "MATCH" | "PARTIAL_MATCH" | "OFF_INTENT" | "UNKNOWN";

/** Intenções vizinhas: divergência aqui é parcial, não erro de página. */
const VIZINHAS: Record<ContentIntent, ContentIntent[]> = {
  informational: ["diagnostic"],
  diagnostic: ["informational"],
  commercial: ["local_commercial"],
  local_commercial: ["commercial"],
};

export function intentMatch(expected: ContentIntent, observed?: string | null): IntentMatch {
  if (!observed || observed === "indefinida" || observed === "UNKNOWN") return "UNKNOWN";
  if (observed === expected) return "MATCH";
  if ((VIZINHAS[expected] ?? []).includes(observed as ContentIntent)) return "PARTIAL_MATCH";
  return "OFF_INTENT";
}

/**
 * Veredito de intenção da URL. Exige massa de consultas — uma query
 * isolada nunca move o veredito (Fase 8).
 */
export function intentVerdict(
  expected: ContentIntent,
  queries: { intencaoObservada?: string | null }[],
): { veredito: IntentMatch; amostra: number; alinhadas: number } {
  const amostra = queries.length;
  if (amostra < SAMPLE_THRESHOLDS.queriesParaIntencao) return { veredito: "UNKNOWN", amostra, alinhadas: 0 };
  const classes = queries.map((q) => intentMatch(expected, q.intencaoObservada));
  const alinhadas = classes.filter((c) => c === "MATCH").length;
  const parciais = classes.filter((c) => c === "PARTIAL_MATCH").length;
  const taxa = (alinhadas + parciais * 0.5) / amostra;
  return { veredito: taxa >= 0.6 ? "MATCH" : taxa >= 0.35 ? "PARTIAL_MATCH" : "OFF_INTENT", amostra, alinhadas };
}

/* ──────────────────────────────── Milestones ───────────────────────────── */

export const MILESTONES = [
  "FIRST_DISCOVERY",
  "FIRST_INDEXATION",
  "FIRST_IMPRESSION",
  "FIRST_CLICK",
  "FIRST_ORGANIC_SESSION",
  "FIRST_CTA",
  "FIRST_WHATSAPP",
  "FIRST_COMMERCIAL_ASSIST",
] as const;
export type Milestone = (typeof MILESTONES)[number];

/** Datas reais. Campo ausente = ainda não ocorreu. Jamais preencher "hoje" por conveniência. */
export type MilestoneTimeline = Partial<Record<Milestone, string>>;

/** Milestones atingidos agora, a partir dos sinais medidos. */
export function reachedMilestones(urls: UrlSignals[]): Milestone[] {
  const any = (f: (u: UrlSignals) => boolean) => urls.some(f);
  const out: Milestone[] = [];
  if (any((u) => u.discovery !== "UNKNOWN")) out.push("FIRST_DISCOVERY");
  if (any((u) => u.discovery === "INDEXED")) out.push("FIRST_INDEXATION");
  if (any((u) => (u.impressions ?? 0) > 0)) out.push("FIRST_IMPRESSION");
  if (any((u) => (u.clicks ?? 0) > 0)) out.push("FIRST_CLICK");
  if (any((u) => (u.sessions ?? 0) > 0)) out.push("FIRST_ORGANIC_SESSION");
  if (any((u) => (u.ctaClicks ?? 0) > 0)) out.push("FIRST_CTA");
  if (any((u) => (u.whatsapp ?? 0) > 0)) out.push("FIRST_WHATSAPP");
  if (any((u) => (u.assists ?? 0) > 0)) out.push("FIRST_COMMERCIAL_ASSIST");
  return out;
}

/** Emite apenas o que ainda não estava registrado — milestone não repete. */
export function newMilestones(timeline: MilestoneTimeline, urls: UrlSignals[]): Milestone[] {
  return reachedMilestones(urls).filter((m) => !timeline[m]);
}

/* ─────────────────────────── Decisão do cluster ────────────────────────── */

export const DECISIONS = [
  "OBSERVE",
  "TECHNICAL_FIX",
  "CTR_OPTIMIZATION",
  "CONTENT_INTENT_REVIEW",
  "CRO_ELIGIBLE",
  "EXPANSION_CANDIDATE",
] as const;
export type Decision = (typeof DECISIONS)[number];

export type DecisionInput = {
  urls: UrlSignals[];
  /** Veredito agregado de intenção, quando houver consultas suficientes. */
  intent?: { veredito: IntentMatch; amostra: number };
  /** Resultado da policy de readiness já existente (Rodada 7B). */
  croReady?: boolean;
};

export type DecisionResult = { decision: Decision; motivo: string; evidencia: Record<string, number | string> };

/**
 * Uma decisão por rodada, sempre justificada pelos números observados.
 * A ordem das checagens é a própria política: técnica antes de tudo,
 * expansão só depois de sinal de busca real.
 */
export function decideCluster({ urls, intent, croReady }: DecisionInput): DecisionResult {
  const soma = (f: (u: UrlSignals) => number | null) => urls.reduce((a, u) => a + (f(u) ?? 0), 0);
  const regressoes = urls.flatMap((u) => technicalRegressions(u.tecnico).map((r) => `${u.url}:${r}`));
  const indexadas = urls.filter((u) => u.discovery === "INDEXED").length;
  const impressoes = soma((u) => u.impressions);
  const cliques = soma((u) => u.clicks);
  const sessoes = soma((u) => u.sessions);
  const assists = soma((u) => u.assists);
  const evidencia = {
    urls: urls.length,
    indexadas,
    impressoes,
    cliques,
    sessoes,
    assists,
    regressoes: regressoes.length,
  };

  if (regressoes.length > 0) {
    return { decision: "TECHNICAL_FIX", motivo: `Regressão técnica: ${regressoes.join(", ")}.`, evidencia };
  }
  if (intent && intent.amostra >= SAMPLE_THRESHOLDS.queriesParaIntencao && intent.veredito === "OFF_INTENT") {
    return {
      decision: "CONTENT_INTENT_REVIEW",
      motivo: `${intent.amostra} consultas reais divergem da intenção declarada.`,
      evidencia,
    };
  }
  if (croReady && sessoes >= SAMPLE_THRESHOLDS.sessoesAcionavel) {
    return { decision: "CRO_ELIGIBLE", motivo: "Readiness aprovada com volume de sessões suficiente.", evidencia };
  }
  if (impressoes >= SAMPLE_THRESHOLDS.ctrActionable && cliques === 0) {
    return {
      decision: "CTR_OPTIMIZATION",
      motivo: `${impressoes} impressões sem clique: amostra suficiente para avaliar snippet.`,
      evidencia,
    };
  }
  if (indexadas === urls.length && urls.length > 0 && impressoes > 0 && cliques > 0) {
    return {
      decision: "EXPANSION_CANDIDATE",
      motivo: "Cluster inteiro indexado, com impressões e cliques reais, sem regressão.",
      evidencia,
    };
  }
  return {
    decision: "OBSERVE",
    motivo:
      indexadas === 0
        ? "Sem indexação confirmada: o gargalo é descoberta, não conteúdo."
        : "Amostra ainda baixa. Baixo volume é dado, não falha técnica.",
    evidencia,
  };
}

/** Idade em dias a partir da data de publicação declarada na coorte. */
export function ageDays(publishedAt: string, hoje = new Date()): number {
  return Math.max(0, Math.floor((hoje.getTime() - new Date(`${publishedAt}T12:00:00Z`).getTime()) / 86_400_000));
}

/** Linha pronta para o painel/relatório, sem inventar métrica ausente. */
export type CohortRow = UrlSignals & {
  estado: CohortState;
  reason: ReasonCode;
  faixaIdade: AgeBucket;
  evidenciaCtr: CtrEvidence;
  regressoes: string[];
};

export function buildCohortRow(s: UrlSignals): CohortRow {
  return {
    ...s,
    estado: cohortState(s),
    reason: reasonCode(s),
    faixaIdade: ageBucket(s.publishedAt),
    evidenciaCtr: ctrEvidence(s.impressions ?? 0),
    regressoes: technicalRegressions(s.tecnico),
  };
}

/** Membros congelados da coorte, com idade calculada. Não aceita URL extra. */
export function frozenCohort(hoje = new Date()) {
  return CONTENT_COHORT.map((m) => ({ ...m, ageDays: ageDays(m.publishedAt, hoje), faixaIdade: ageBucket(m.publishedAt, hoje) }));
}
