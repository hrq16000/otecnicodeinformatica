/**
 * RODADA 9B — COORTE DE FUNDAÇÃO NACIONAL
 * ---------------------------------------
 * Observação dos três pilares nacionais de fundamentos de informática.
 *
 * Mesmas invariantes da coorte local (8F/8G):
 *   1. Ausência de dado é UNKNOWN — nunca "não indexado", nunca "falhou".
 *   2. Baixo volume é dado, não incidente.
 *   3. Tempo é contexto, não gatilho para expandir a onda editorial.
 */
import type { DiscoveryState } from "@/lib/contentCohort";

export const NATIONAL_FOUNDATION_COHORT_ID = "national_foundations_9b";

export type NationalFoundationMember = {
  url: string;
  slug: string;
  /** Intenção principal declarada no briefing da 9B. */
  intencao: "DEFINITION" | "LEARNING" | "COURSE";
  publishedAt: string;
  updatedAt: string;
  /** Consulta-semente de referência (nacional, informacional). */
  consultaSeed: string;
};

export const NATIONAL_FOUNDATION_COHORT: NationalFoundationMember[] = [
  {
    url: "/blog/o-que-e-informatica",
    slug: "o-que-e-informatica",
    intencao: "DEFINITION",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    consultaSeed: "o que é informática",
  },
  {
    url: "/blog/informatica-basica",
    slug: "informatica-basica",
    intencao: "LEARNING",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    consultaSeed: "informática básica",
  },
  {
    url: "/blog/como-aprender-informatica",
    slug: "como-aprender-informatica",
    intencao: "COURSE",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-15",
    consultaSeed: "como aprender informática",
  },
];

export const NATIONAL_FOUNDATION_SLUGS = NATIONAL_FOUNDATION_COHORT.map((m) => m.slug);

/** Estado observado por URL; `null` = fonte não conectada (UNKNOWN). */
export type NationalFoundationSignal = {
  url: string;
  discovery: DiscoveryState;
  impressions: number | null;
  clicks: number | null;
  position: number | null;
};

export type NationalFoundationVerdict =
  | "UNKNOWN"
  | "AGUARDANDO_DESCOBERTA"
  | "AGUARDANDO_INDEXACAO"
  | "COLETANDO_IMPRESSOES"
  | "COM_CLIQUES";

/**
 * Veredito por URL. Nunca converte ausência de dado em falha e nunca
 * recomenda expansão editorial — expansão exige evidência de cliques.
 */
export function verdictFor(signal: NationalFoundationSignal): NationalFoundationVerdict {
  if (signal.discovery === "UNKNOWN") return "UNKNOWN";
  if (signal.discovery === "DISCOVERED") return "AGUARDANDO_INDEXACAO";
  if (signal.discovery === "CRAWLED") return "AGUARDANDO_INDEXACAO";
  if ((signal.clicks ?? 0) > 0) return "COM_CLIQUES";
  if ((signal.impressions ?? 0) > 0) return "COLETANDO_IMPRESSOES";
  return "AGUARDANDO_DESCOBERTA";
}

/** Só libera nova onda editorial quando houver clique real na coorte. */
export function podeExpandirOndaEditorial(signals: NationalFoundationSignal[]): boolean {
  return signals.some((s) => (s.clicks ?? 0) > 0);
}
