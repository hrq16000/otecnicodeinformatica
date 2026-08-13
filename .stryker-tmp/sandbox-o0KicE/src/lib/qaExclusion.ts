/**
 * Regime de observação comercial pós-4D.1
 * ---------------------------------------
 * T1 (marco oficial de mensuração) = 2026-08-08T00:05:45Z.
 *
 * Todos os eventos anteriores ao fim dos smoke tests de cutover (4C/4D/4D.1)
 * são QA e NÃO podem alimentar taxas comerciais. Nada é apagado do banco:
 * a exclusão acontece apenas na camada de análise (painéis/relatórios).
 */
// @ts-nocheck


/** Marco oficial T1 — início do baseline. */
export const T1_ISO = "2026-08-08T00:05:45Z";

/**
 * Fim comprovado dos smoke tests de produção (último evento do walker).
 * Somente eventos posteriores a este instante são considerados comerciais.
 */
export const BASELINE_COMERCIAL_ISO = "2026-08-08T00:10:00Z";

/** UTMs usadas exclusivamente nos testes de mensuração. */
const QA_UTM_SOURCES = ["teste_4d1", "teste_4d", "teste_4c", "qa"];
const QA_UTM_MEDIUMS = ["qa"];
const QA_UTM_CAMPAIGNS = ["measurement_final", "measurement_cutover"];

/** Sessões identificadas documentalmente como teste (extensível). */
export const QA_SESSION_IDS: string[] = [];

export type QaCheckable = {
  created_at?: string | null;
  session_id?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

/** Rótulo aplicado às sessões de teste nas análises. */
export const QA_LABEL = "QA / NÃO COMERCIAL";

/** true quando o evento é de teste e deve ficar fora das taxas comerciais. */
export function isQaEvent(row: QaCheckable): boolean {
  const src = (row.utm_source || "").toLowerCase();
  const med = (row.utm_medium || "").toLowerCase();
  const camp = (row.utm_campaign || "").toLowerCase();
  if (QA_UTM_SOURCES.includes(src)) return true;
  if (QA_UTM_MEDIUMS.includes(med)) return true;
  if (QA_UTM_CAMPAIGNS.includes(camp)) return true;
  if (row.session_id && QA_SESSION_IDS.includes(row.session_id)) return true;
  if (row.created_at && new Date(row.created_at) < new Date(BASELINE_COMERCIAL_ISO)) return true;
  return false;
}

/** Mantém apenas eventos comerciais (pós-baseline, sem QA). */
export function filtrarComerciais<T extends QaCheckable>(rows: T[]): T[] {
  return rows.filter((r) => !isQaEvent(r));
}

export type Maturidade = "SEM DADOS" | "SINAL INICIAL" | "AMOSTRA ÚTIL" | "SINAL CONSISTENTE";

/**
 * Classificação de maturidade por vertical — evita decisão com poucas sessões.
 * Baseada em sessões comerciais distintas que abriram o funil.
 */
export function classificarMaturidade(sessoesComerciais: number): Maturidade {
  if (sessoesComerciais <= 0) return "SEM DADOS";
  if (sessoesComerciais < 15) return "SINAL INICIAL";
  if (sessoesComerciais < 50) return "AMOSTRA ÚTIL";
  return "SINAL CONSISTENTE";
}
