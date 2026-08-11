// ── E-E-A-T ──────────────────────────────────────────────────
// REGRA ABSOLUTA: SEM EVIDÊNCIA = NÃO PUBLICAR.
// Nenhuma prova, história, avaliação ou responsável da marca de origem
// é transferível. Os campos abaixo nascem vazios e só são preenchidos
// com dado verificável da nova operação.
import { envStr } from "./env";

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  proofUrl?: string;
}

export interface RealCase {
  id: string;
  title: string;
  summary: string;
  date: string;
}

/** Ano de fundação REAL da nova operação. `undefined` = nenhum claim de tempo de mercado. */
export const FOUNDING_YEAR = envStr("VITE_BRAND_FOUNDED_YEAR");

export const eeatConfig = {
  foundingYear: FOUNDING_YEAR,
  /** História empresarial — só com fato verificável da nova marca. */
  businessHistory: undefined as string | undefined,
  /** Responsável técnico identificado. Não herdado. */
  responsiblePerson: envStr("VITE_RESPONSIBLE_PERSON"),
  /** Avaliações reais (banco novo começa vazio — isso é correto). */
  realReviews: [] as Array<{ author: string; rating: number; text: string; date: string }>,
  /** Casos técnicos com evidência própria. */
  realCases: [] as RealCase[],
  certifications: [] as Certification[],
  /** Garantias declaradas — texto vem da política comercial central. */
  guaranteesConfirmed: false,
} as const;

/** Helper de publicação: só renderiza claim quando há evidência. */
export function claimIfProven<T>(value: T | undefined | null, hasProof = true): T | undefined {
  if (!hasProof || value === undefined || value === null) return undefined;
  return value;
}

export const HAS_EXPERIENCE_CLAIM = Boolean(FOUNDING_YEAR);
export const HAS_REVIEWS = eeatConfig.realReviews.length > 0;
export const HAS_CASES = eeatConfig.realCases.length > 0;

export default eeatConfig;
