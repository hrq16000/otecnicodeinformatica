/**
 * RODADA 8E — MAPA DE INTENÇÃO EDITORIAL (fonte única do cluster piloto)
 * ---------------------------------------------------------------------
 * Volume de busca ≠ intenção comercial. Cada URL do cluster declara aqui:
 *   • a intenção que ela serve (e só ela);
 *   • o pai de serviço, de problema e local quando existirem;
 *   • as URLs com as quais NÃO pode disputar a mesma consulta.
 *
 * Regras:
 *   1. Uma intenção por URL. "como formatar notebook" (informacional),
 *      "quanto custa formatar" (comercial) e "/servicos/formatacao"
 *      (comercial local) nunca compartilham página.
 *   2. Nenhuma rota aqui pode ser gerada de forma combinatória — esta
 *      rodada é editorial, não programática.
 *   3. O gate `check:content-intent` lê este arquivo; ele é a verdade.
 */

export const CONTENT_INTENTS = [
  "informational",
  "diagnostic",
  "commercial",
  "local_commercial",
] as const;
export type ContentIntent = (typeof CONTENT_INTENTS)[number];

export const CONTENT_INTENT_LABEL: Record<ContentIntent, string> = {
  informational: "Informacional (aprender a fazer / entender)",
  diagnostic: "Diagnóstica (descobrir a causa)",
  commercial: "Comercial (avaliar contratação, preço e escopo)",
  local_commercial: "Comercial local (contratar aqui)",
};

export type ContentNode = {
  /** Caminho canônico interno, sem query e sem barra final. */
  url: string;
  intent: ContentIntent;
  /** Tema principal — usado para detectar sobreposição. */
  topic: string;
  /** Consultas-alvo declaradas (referência humana, não usadas em runtime). */
  queries: string[];
  serviceParent?: string;
  problemParent?: string;
  localParent?: string;
  /** URLs que este nó deve linkar (ponte de intenção). */
  bridgesTo: string[];
  /** URLs próximas que NÃO podem virar cópia desta. */
  doNotDuplicate: string[];
  /** true quando a rota é nova nesta rodada; false quando é reaproveitada. */
  novaNestaRodada: boolean;
  justificativa: string;
};

/**
 * CLUSTER PILOTO — FORMATAÇÃO / LENTIDÃO / DIAGNÓSTICO.
 * Quatro URLs: duas editoriais (uma reaproveitada, uma nova) e duas já
 * existentes reaproveitadas como destino comercial e diagnóstico.
 */
export const PILOT_CLUSTER_ID = "formatacao-lentidao-diagnostico";

export const CONTENT_INTENT_MAP: ContentNode[] = [
  // ── Rodada 8E — cluster piloto formatação / lentidão / diagnóstico.
  {
    url: "/blog/como-formatar-pc-sem-perder-arquivos",
    intent: "informational",
    topic: "formatacao-diy",
    queries: ["como formatar notebook", "como formatar o pc", "formatar notebook"],
    serviceParent: "/servicos/formatacao",
    problemParent: "/problemas/computador-lento",
    bridgesTo: [
      "/blog/quanto-custa-formatar-um-computador",
      "/problemas/computador-lento",
      "/diagnostico-tecnico",
      "/servicos/formatacao",
    ],
    doNotDuplicate: ["/servicos/formatacao", "/blog/como-instalar-windows-11-do-zero"],
    novaNestaRodada: false,
    justificativa:
      "Rota já existente, reescrita como guia autoral. Concentra a demanda informacional de maior volume sem prometer contratação e sem repetir cidade.",
  },
  {
    url: "/blog/quanto-custa-formatar-um-computador",
    intent: "commercial",
    topic: "formatacao-custo",
    queries: ["quanto custa formatar um computador", "preço formatação de notebook"],
    serviceParent: "/servicos/formatacao",
    bridgesTo: ["/servicos/formatacao", "/precos-e-politicas", "/diagnostico-tecnico"],
    doNotDuplicate: ["/blog/como-formatar-pc-sem-perder-arquivos", "/precos-e-politicas"],
    novaNestaRodada: true,
    justificativa:
      "Intenção de avaliação de custo, próxima da contratação, sem passo a passo de instalação. Usa exclusivamente a tabela comercial do projeto.",
  },
  {
    url: "/servicos/formatacao",
    intent: "local_commercial",
    topic: "formatacao-servico",
    queries: ["formatação de computador", "serviço de formatação"],
    localParent: "/tecnico-informatica-curitiba",
    bridgesTo: [
      "/blog/como-formatar-pc-sem-perder-arquivos",
      "/blog/quanto-custa-formatar-um-computador",
      "/diagnostico-tecnico",
    ],
    doNotDuplicate: ["/blog/como-formatar-pc-sem-perder-arquivos"],
    novaNestaRodada: false,
    justificativa:
      "Página de serviço já existente e canônica para contratação. Nesta rodada apenas recebe links de saída para os guias.",
  },
  {
    url: "/problemas/computador-lento",
    intent: "diagnostic",
    topic: "lentidao-diagnostico",
    queries: ["computador lento", "formatar resolve lentidão"],
    serviceParent: "/servicos/formatacao",
    bridgesTo: ["/blog/como-formatar-pc-sem-perder-arquivos", "/diagnostico-tecnico"],
    doNotDuplicate: ["/blog/windows-11-lento-como-resolver"],
    novaNestaRodada: false,
    justificativa:
      "Permanece diagnóstica (política de intenção inalterada). Ganha apenas um link explicativo para o guia de formatação.",
  },

  // ── Rodada 9B — pilares nacionais de autoridade editorial em informática.
  {
    url: "/blog/o-que-e-informatica",
    intent: "informational",
    topic: "informatica-definicao",
    queries: [
      "o que é informática",
      "o que significa informática",
      "o que informática faz",
      "informática é ciência",
    ],
    serviceParent: "/servicos",
    bridgesTo: ["/blog/informatica-basica", "/blog/como-aprender-informatica", "/blog"],
    doNotDuplicate: ["/blog/informatica-basica", "/blog/como-aprender-informatica"],
    novaNestaRodada: true,
    justificativa:
      "Pilar nacional DEFINITION. Responde de forma completa o que é informática, sem promessa de atendimento nacional e sem localização forçada.",
  },
  {
    url: "/blog/informatica-basica",
    intent: "informational",
    topic: "informatica-basica",
    queries: [
      "informática básica",
      "informática básica o que é",
      "informática básica curso",
      "informática básica para concurso",
    ],
    serviceParent: "/servicos",
    bridgesTo: ["/blog/o-que-e-informatica", "/blog/como-aprender-informatica", "/blog"],
    doNotDuplicate: ["/blog/o-que-e-informatica", "/blog/como-aprender-informatica"],
    novaNestaRodada: true,
    justificativa:
      "Pilar nacional DEFINITION/LEARNING. Explica o que se aprende em informática básica e para quem serve, sem competir com páginas de serviço local.",
  },
  {
    url: "/blog/como-aprender-informatica",
    intent: "informational",
    topic: "aprender-informatica",
    queries: [
      "como aprender informática",
      "como estudar informática",
      "informática para iniciantes",
      "qual curso de informática fazer",
    ],
    serviceParent: "/servicos",
    bridgesTo: ["/blog/o-que-e-informatica", "/blog/informatica-basica", "/blog"],
    doNotDuplicate: ["/blog/o-que-e-informatica", "/blog/informatica-basica"],
    novaNestaRodada: true,
    justificativa:
      "Pilar nacional LEARNING/COURSE. Oferece roteiro prático para aprender informática do zero, mantendo separação entre conteúdo educacional nacional e comercial local.",
  },
];

/** Nó do mapa por URL canônica (sem barra final). */
export function contentNode(url: string): ContentNode | undefined {
  const p = (url || "").replace(/\/+$/, "") || "/";
  return CONTENT_INTENT_MAP.find((n) => n.url === p);
}

/** URLs editoriais do cluster piloto (as que vivem em /blog). */
export const PILOT_EDITORIAL_URLS = CONTENT_INTENT_MAP.filter((n) => n.url.startsWith("/blog/")).map(
  (n) => n.url,
);

/**
 * Intenção declarada de uma rota editorial. Sem declaração, devolve
 * `undefined` — nunca chuta "commercial" para inflar relatório.
 */
export function declaredIntent(url: string): ContentIntent | undefined {
  return contentNode(url)?.intent;
}
