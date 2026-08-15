/**
 * RODADA 7B — GOVERNANÇA DE PRONTIDÃO DE EXPERIMENTO
 * ---------------------------------------------------
 * Transforma "parece que já temos tráfego" em uma decisão determinística
 * derivada de dados de produção. Este módulo NÃO ativa experimento algum:
 * ele apenas responde se o Experimento 1 está tecnicamente apto a começar.
 *
 * Regras:
 *  • unidade experimental = SESSÃO ELEGÍVEL (nunca pageview/evento bruto);
 *  • sessões de QA, pré-baseline e fora do escopo não entram no denominador;
 *  • qualquer gate crítico vermelho bloqueia a prontidão (fail-closed);
 *  • READY significa "apto a iniciar", nunca "iniciado".
 */
import { EXPERIMENTOS_CRO, type ExperimentoCro } from "./croRodada7";
import { isQaEvent, type QaCheckable } from "./qaExclusion";

/** Estados possíveis, derivados exclusivamente dos dados. */
export type ReadinessStatus =
  | "NOT_READY"
  | "ACCUMULATING"
  | "READY"
  | "BLOCKED_DATA_QUALITY"
  | "BLOCKED_GUARDRAIL"
  | "RUNNING";

export type ReasonCode =
  | "INSUFFICIENT_SESSIONS"
  | "INSUFFICIENT_CONVERSIONS"
  | "OBSERVATION_WINDOW_INCOMPLETE"
  | "DATA_QUALITY_FAILURE"
  | "EXPERIMENT_CONTRACT_FAILURE"
  | "CONTEXT_COMPLETENESS_FAILURE";

export interface PrimaryMetric {
  id: string;
  /** Eventos que contam como conversão primária (por sessão, deduplicado). */
  numerador: string[];
  /** Descrição do denominador (sessões elegíveis). */
  denominador: "sessoes_elegiveis";
}

export interface ReadinessPolicy {
  experimentId: string;
  /** Versão da hipótese. Mudou hipótese/métrica/escopo ⇒ nova versão. */
  experimentVersion: string;
  unidadeExperimental: "sessao_elegivel";
  primaryMetric: PrimaryMetric;
  /** Sessões elegíveis mínimas por variação. */
  minEligibleSessionsPerVariant: number;
  /** Conversões primárias mínimas no total do escopo. */
  minPrimaryConversions: number;
  /** Dias completos de observação contínua. */
  minObservationDays: number;
  /** Percentual mínimo de sessões com contexto completo (journey_id + rota). */
  minContextCompleteness: number;
  /** Gates de qualidade que precisam estar verdes. */
  gatesObrigatorios: string[];
  guardrails: string[];
  /** Efeito relativo mínimo com utilidade comercial (não escolhido para "caber"). */
  mdeAlvo: number;
}

/**
 * Política do Experimento 1. Fonte única dos thresholds — a UI nunca
 * define número próprio.
 *
 * Justificativa dos números:
 *  • 200 sessões/variação: piso já declarado na 7A (`amostraMinima`), abaixo
 *    disso qualquer diferença observada é ruído de amostragem;
 *  • 30 conversões primárias: piso clássico para que a proporção observada
 *    tenha erro padrão utilizável (abaixo disso 1 conversão move a taxa vários
 *    pontos percentuais);
 *  • 7 dias completos: cobre o ciclo semanal inteiro da operação (a demanda de
 *    assistência técnica cai no fim de semana), evitando baseline formado só
 *    por dias úteis;
 *  • MDE de 20% relativo: abaixo disso o ganho não paga a operação do teste.
 */
export const EXPERIMENT_READINESS_POLICY: ReadinessPolicy = {
  experimentId: "cro7-cta-servico-curitiba",
  experimentVersion: "experiment-001-v1",
  unidadeExperimental: "sessao_elegivel",
  primaryMetric: {
    id: "whatsapp_open",
    numerador: ["whatsapp_open", "wa_click"],
    denominador: "sessoes_elegiveis",
  },
  minEligibleSessionsPerVariant: 200,
  minPrimaryConversions: 30,
  minObservationDays: 7,
  minContextCompleteness: 0.9,
  gatesObrigatorios: [
    "analytics-event-contract",
    "analytics-pii",
    "analytics-local-context",
    "analytics-journey-integrity",
    "cro-experiment",
  ],
  guardrails: [
    "sem variação de preço, prazo, escopo ou garantia",
    "sem variação de title/canonical/H1",
    "assignment sem PII",
  ],
  mdeAlvo: 0.2,
};

export interface EventoReadiness extends QaCheckable {
  event_type?: string | null;
  path?: string | null;
  journey_id?: string | null;
}

export interface BaselineReadiness {
  sessoesElegiveis: number;
  sessoesExcluidasQa: number;
  percentualQa: number;
  conversoesPrimarias: number;
  taxaPrimaria: number;
  diasObservados: number;
  primeiroEvento: string | null;
  ultimoEvento: string | null;
  completudeContexto: number;
  eventosDuplicados: number;
  sessoesPorDiaDaSemana: Record<string, number>;
  sessoesPorDia: number;
}

export interface Estimativa {
  /** Sessões por variação necessárias para detectar `mdeAlvo` (95%/80%). */
  sessoesNecessariasPorVariacao: number | null;
  /** Efeito relativo detectável com a amostra atual. */
  mdeAtual: number | null;
  /** Projeção em dias — estimativa, nunca promessa. */
  diasEstimados: number | null;
}

export interface ProgressoItem {
  id: string;
  rotulo: string;
  atual: number;
  alvo: number;
  percentual: number;
}

export interface ResultadoReadiness {
  experimentId: string;
  experimentVersion: string;
  status: ReadinessStatus;
  motivos: ReasonCode[];
  baseline: BaselineReadiness;
  estimativa: Estimativa;
  progresso: ProgressoItem[];
  gatesVermelhos: string[];
}

const norm = (p?: string | null) => (p ?? "").replace(/\/+$/, "") || "/";
const dia = (iso: string) => iso.slice(0, 10);
const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

/** Sessão elegível: produção, fora de QA e dentro do escopo declarado. */
export function eventoElegivel(ev: EventoReadiness, exp: ExperimentoCro): boolean {
  if (!ev.session_id) return false;
  if (isQaEvent(ev)) return false;
  return exp.rotas.map(norm).includes(norm(ev.path));
}

/**
 * Tamanho de amostra por variação para proporções (bicaudal, α = 0,05,
 * power = 80%): n ≈ 16·p(1−p)/Δ², com Δ = p · mde.
 */
export function amostraNecessaria(baselineRate: number, mde: number): number | null {
  if (baselineRate <= 0 || baselineRate >= 1 || mde <= 0) return null;
  const delta = baselineRate * mde;
  return Math.ceil((16 * baselineRate * (1 - baselineRate)) / (delta * delta));
}

/** Efeito relativo detectável com `n` sessões por variação. */
export function mdeDetectavel(baselineRate: number, n: number): number | null {
  if (baselineRate <= 0 || baselineRate >= 1 || n <= 0) return null;
  return Math.sqrt((16 * baselineRate * (1 - baselineRate)) / n) / baselineRate;
}

export function calcularReadiness(params: {
  eventos: EventoReadiness[];
  experimento?: ExperimentoCro;
  politica?: ReadinessPolicy;
  gatesVermelhos?: string[];
}): ResultadoReadiness {
  const politica = params.politica ?? EXPERIMENT_READINESS_POLICY;
  const exp =
    params.experimento ?? EXPERIMENTOS_CRO.find((e) => e.id === politica.experimentId) ?? EXPERIMENTOS_CRO[0];
  const gatesVermelhos = (params.gatesVermelhos ?? []).filter((g) => politica.gatesObrigatorios.includes(g));

  const noEscopo = params.eventos.filter((e) => e.session_id && exp && exp.rotas.map(norm).includes(norm(e.path)));
  const elegiveis = noEscopo.filter((e) => !isQaEvent(e));
  const sessoes = new Set(elegiveis.map((e) => e.session_id as string));
  const sessoesQa = new Set(noEscopo.filter((e) => isQaEvent(e)).map((e) => e.session_id as string));

  const converteu = new Set(
    elegiveis
      .filter((e) => politica.primaryMetric.numerador.includes(e.event_type ?? ""))
      .map((e) => e.session_id as string),
  );

  const datas = elegiveis.map((e) => e.created_at).filter(Boolean) as string[];
  datas.sort();
  const diasUnicos = new Set(datas.map(dia));
  const diasObservados = diasUnicos.size;

  const comContexto = new Set(
    elegiveis.filter((e) => Boolean(e.journey_id) && Boolean(e.path)).map((e) => e.session_id as string),
  );

  const chaves = elegiveis.map((e) => `${e.session_id}|${e.event_type}|${e.created_at}`);
  const duplicados = chaves.length - new Set(chaves).size;

  const porDiaSemana: Record<string, number> = {};
  for (const d of diasUnicos) {
    const wd = SEMANA[new Date(`${d}T12:00:00Z`).getUTCDay()];
    porDiaSemana[wd] = (porDiaSemana[wd] ?? 0) + 1;
  }

  const totalSessoes = sessoes.size;
  const taxa = totalSessoes > 0 ? converteu.size / totalSessoes : 0;
  const completude = totalSessoes > 0 ? comContexto.size / totalSessoes : 0;
  const sessoesPorDia = diasObservados > 0 ? totalSessoes / diasObservados : 0;

  const baseline: BaselineReadiness = {
    sessoesElegiveis: totalSessoes,
    sessoesExcluidasQa: sessoesQa.size,
    percentualQa:
      totalSessoes + sessoesQa.size > 0 ? sessoesQa.size / (totalSessoes + sessoesQa.size) : 0,
    conversoesPrimarias: converteu.size,
    taxaPrimaria: taxa,
    diasObservados,
    primeiroEvento: datas[0] ?? null,
    ultimoEvento: datas[datas.length - 1] ?? null,
    completudeContexto: completude,
    eventosDuplicados: duplicados,
    sessoesPorDiaDaSemana: porDiaSemana,
    sessoesPorDia,
  };

  const variacoes = Math.max(exp?.variantes.length ?? 2, 2);
  const alvoSessoes = politica.minEligibleSessionsPerVariant * variacoes;
  const necessarias = amostraNecessaria(taxa, politica.mdeAlvo);
  const estimativa: Estimativa = {
    sessoesNecessariasPorVariacao: necessarias,
    mdeAtual: mdeDetectavel(taxa, Math.floor(totalSessoes / variacoes)),
    diasEstimados:
      necessarias && sessoesPorDia > 0
        ? Math.ceil((necessarias * variacoes - totalSessoes) / sessoesPorDia)
        : null,
  };

  const motivos: ReasonCode[] = [];
  if (gatesVermelhos.length > 0) motivos.push("DATA_QUALITY_FAILURE");
  if (totalSessoes < alvoSessoes) motivos.push("INSUFFICIENT_SESSIONS");
  if (converteu.size < politica.minPrimaryConversions) motivos.push("INSUFFICIENT_CONVERSIONS");
  if (diasObservados < politica.minObservationDays) motivos.push("OBSERVATION_WINDOW_INCOMPLETE");
  if (totalSessoes > 0 && completude < politica.minContextCompleteness) {
    motivos.push("CONTEXT_COMPLETENESS_FAILURE");
  }
  if (!exp || exp.variantes.length < 2) motivos.push("EXPERIMENT_CONTRACT_FAILURE");

  let status: ReadinessStatus;
  if (exp?.ativo) status = "RUNNING";
  else if (gatesVermelhos.length > 0 || motivos.includes("CONTEXT_COMPLETENESS_FAILURE")) {
    status = "BLOCKED_DATA_QUALITY";
  } else if (motivos.includes("EXPERIMENT_CONTRACT_FAILURE")) status = "BLOCKED_GUARDRAIL";
  else if (motivos.length === 0) status = "READY";
  else if (totalSessoes === 0) status = "NOT_READY";
  else status = "ACCUMULATING";

  const item = (id: string, rotulo: string, atual: number, alvo: number): ProgressoItem => ({
    id,
    rotulo,
    atual,
    alvo,
    percentual: alvo > 0 ? Math.min(100, Math.round((atual / alvo) * 100)) : 100,
  });

  return {
    experimentId: politica.experimentId,
    experimentVersion: politica.experimentVersion,
    status,
    motivos,
    baseline,
    estimativa,
    progresso: [
      item("sessoes", "Sessões elegíveis", totalSessoes, alvoSessoes),
      item("conversoes", "Conversões primárias", converteu.size, politica.minPrimaryConversions),
      item("janela", "Janela de observação (dias)", diasObservados, politica.minObservationDays),
      item("qualidade", "Qualidade dos dados", gatesVermelhos.length === 0 ? 1 : 0, 1),
    ],
    gatesVermelhos,
  };
}

/** Regra de ativação: só é permitido ligar quando o status for READY. */
export function podeAtivar(resultado: ResultadoReadiness): boolean {
  return resultado.status === "READY";
}
