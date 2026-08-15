/**
 * RODADA 8F — COORTE EDITORIAL DE DISTRIBUIÇÃO
 * --------------------------------------------
 * A Rodada 8E criou o ativo. Esta rodada só observa se ele respira.
 *
 * Aqui vive a coorte `content_cluster_formatacao_v1`: exatamente as URLs
 * reais publicadas/reaproveitadas na 8E, com a data em que isso de fato
 * aconteceu. Regras não negociáveis:
 *
 *   1. Nenhuma URL entra nesta coorte sem estar declarada em
 *      `src/lib/contentIntentMap.ts` (fonte única de intenção).
 *   2. `publishedAt`/`updatedAt` só mudam quando houve publicação ou
 *      revisão material de verdade. Não são regeneradas no build.
 *   3. Estado de descoberta nunca é inferido. Sem evidência da fonte
 *      (Search Console), o estado é UNKNOWN — e UNKNOWN não é falha.
 */
import { CONTENT_INTENT_MAP, type ContentIntent, contentNode } from "@/lib/contentIntentMap";

export const CONTENT_COHORT_ID = "content_cluster_formatacao_v1";

/**
 * Estados de descoberta. Nomenclatura equivalente à das fontes reais
 * (Search Console: "URL is unknown to Google", "Discovered - currently
 * not indexed", "Crawled - currently not indexed", "Submitted and indexed").
 */
export const DISCOVERY_STATES = ["UNKNOWN", "DISCOVERED", "CRAWLED", "INDEXED"] as const;
export type DiscoveryState = (typeof DISCOVERY_STATES)[number];

export const DISCOVERY_LABEL: Record<DiscoveryState, string> = {
  UNKNOWN: "Google ainda não conhece a URL",
  DISCOVERED: "Descoberta, ainda não indexada",
  CRAWLED: "Rastreada, ainda não indexada",
  INDEXED: "Indexada",
};

/** Traduz o `coverageState` do Search Console para o estado da coorte. */
export function discoveryFromCoverage(coverageState?: string | null): DiscoveryState {
  const s = (coverageState || "").toLowerCase();
  if (!s) return "UNKNOWN";
  if (s.includes("unknown")) return "UNKNOWN";
  if (s.includes("indexed") && !s.includes("not indexed")) return "INDEXED";
  if (s.includes("crawled")) return "CRAWLED";
  if (s.includes("discovered")) return "DISCOVERED";
  return "UNKNOWN";
}

export type CohortMember = {
  url: string;
  intent: ContentIntent;
  /** Data real da publicação (ou da reescrita que criou o conteúdo atual). */
  publishedAt: string;
  /** Última revisão material registrada. */
  updatedAt: string;
  /** true quando a URL nasceu na 8E; false quando é rota reaproveitada. */
  novaNaRodada: boolean;
  papel: "guia" | "servico" | "problema";
};

/**
 * Membros da coorte. Somente as quatro URLs reais da 8E — nada é
 * adicionado silenciosamente. Datas conferidas em
 * `src/lib/blogEditorialRegistry.ts` e `src/data/blogPostsContent.tsx`.
 */
export const CONTENT_COHORT: CohortMember[] = [
  {
    url: "/blog/como-formatar-pc-sem-perder-arquivos",
    intent: "informational",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    novaNaRodada: false,
    papel: "guia",
  },
  {
    url: "/blog/quanto-custa-formatar-um-computador",
    intent: "commercial",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    novaNaRodada: true,
    papel: "guia",
  },
  {
    url: "/servicos/formatacao",
    intent: "local_commercial",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    novaNaRodada: false,
    papel: "servico",
  },
  {
    url: "/problemas/computador-lento",
    intent: "diagnostic",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-14",
    novaNaRodada: false,
    papel: "problema",
  },
];

/** Fail-closed: a coorte não pode conter URL fora do mapa de intenção. */
export const COHORT_URLS = CONTENT_COHORT.map((m) => m.url);

export function isCohortUrl(pathname: string): boolean {
  const p = (pathname || "").replace(/\/+$/, "") || "/";
  return COHORT_URLS.includes(p);
}

export function cohortMember(pathname: string): CohortMember | undefined {
  const p = (pathname || "").replace(/\/+$/, "") || "/";
  return CONTENT_COHORT.find((m) => m.url === p);
}

/** URLs declaradas no mapa de intenção mas ausentes da coorte (deve ser vazio). */
export function cohortDrift(): { faltando: string[]; extras: string[] } {
  const mapa = CONTENT_INTENT_MAP.map((n) => n.url);
  return {
    faltando: mapa.filter((u) => !COHORT_URLS.includes(u)),
    extras: COHORT_URLS.filter((u) => !contentNode(u)),
  };
}

/** Faixas de idade — impede chamar de "fracasso" uma página de 3 dias. */
export const AGE_BUCKETS = ["0-7", "8-14", "15-30", "30+"] as const;
export type AgeBucket = (typeof AGE_BUCKETS)[number];

export function ageBucket(publishedAt: string, hoje = new Date()): AgeBucket {
  const dias = Math.floor((hoje.getTime() - new Date(`${publishedAt}T12:00:00Z`).getTime()) / 86_400_000);
  if (dias <= 7) return "0-7";
  if (dias <= 14) return "8-14";
  if (dias <= 30) return "15-30";
  return "30+";
}

/**
 * Classificação de evidência de CTR. Antes de impressão real, o problema
 * NUNCA é o título — é descoberta. Isso está codificado aqui de propósito.
 */
export type CtrEvidence = "NO_DATA" | "LEARNING" | "ACTIONABLE";

export const CTR_MIN_IMPRESSIONS = { learning: 50, actionable: 300 } as const;

export function ctrEvidence(impressions: number): CtrEvidence {
  if (!impressions || impressions < 1) return "NO_DATA";
  if (impressions < CTR_MIN_IMPRESSIONS.learning) return "NO_DATA";
  if (impressions < CTR_MIN_IMPRESSIONS.actionable) return "LEARNING";
  return "ACTIONABLE";
}

export const CTR_EVIDENCE_LABEL: Record<CtrEvidence, string> = {
  NO_DATA: "Sem impressões suficientes — não mexer em title/description",
  LEARNING: "Amostra em formação — observar, ainda não concluir",
  ACTIONABLE: "Amostra suficiente para avaliar snippet",
};
