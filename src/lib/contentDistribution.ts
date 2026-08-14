/**
 * RODADA 8F — MATRIZ DE DISTRIBUIÇÃO DO CLUSTER PILOTO
 * ----------------------------------------------------
 * Um conteúdo pode ser distribuído em vários canais com atribuição
 * diferente. O que NÃO pode é nascer uma URL nova só para virar post.
 *
 * Aqui ficam as pautas prontas (lote pequeno: 3 GBP + os mesmos temas
 * em Facebook e Instagram). Os links são montados por
 * `construirLinkAquisicao`, nunca à mão — assim o gate
 * `check:utm-governance` continua valendo.
 *
 * Publicação externa NÃO é automática: sem integração autorizada, a
 * entrega desta rodada é o link pronto e a pauta, não o post publicado.
 */
import { construirLinkAquisicao, type SaidaLink } from "@/lib/utmLinkBuilder";
import { contentNode, type ContentIntent } from "@/lib/contentIntentMap";
import { isCohortUrl } from "@/lib/contentCohort";

export type CanalDistribuicao = "gbp" | "facebook" | "instagram";

export type Pauta = {
  id: string;
  tema: string;
  /** Rota interna real do cluster — resolvida pelo mapa de intenção. */
  landing: string;
  intent: ContentIntent;
  /** Texto-base do post (o operador ajusta o tom no canal). */
  resumo: string;
  cta: string;
  /** Identificador curto do tema em utm_content. */
  utmContent: string;
  canais: CanalDistribuicao[];
};

export const PAUTAS_8F: Pauta[] = [
  {
    id: "custo-formatacao",
    tema: "Quanto custa formatar um computador?",
    landing: "/blog/quanto-custa-formatar-um-computador",
    intent: "commercial",
    resumo:
      "O que realmente entra no valor de uma formatação: tempo técnico, modalidade de atendimento, backup dos arquivos, licença do sistema e peças. Explicamos o que está incluso e o que é cobrado à parte, antes de qualquer execução.",
    cta: "Ver o que entra no valor",
    utmContent: "custo-formatacao",
    canais: ["gbp", "facebook", "instagram"],
  },
  {
    id: "formatar-resolve-lentidao",
    tema: "Formatar resolve computador lento?",
    landing: "/problemas/computador-lento",
    intent: "diagnostic",
    resumo:
      "Nem sempre. Lentidão tem causas diferentes — disco, memória, temperatura, software — e formatar sem diagnóstico pode apagar o sintoma sem resolver a causa. O caminho é descobrir o que está travando antes de decidir.",
    cta: "Descobrir a causa da lentidão",
    utmContent: "formatar-resolve-lentidao",
    canais: ["gbp", "facebook", "instagram"],
  },
  {
    id: "antes-de-formatar-backup",
    tema: "Antes de formatar: faça o backup certo",
    landing: "/blog/como-formatar-pc-sem-perder-arquivos",
    intent: "informational",
    resumo:
      "A formatação apaga o disco do sistema. O passo que evita perda é separar antes o que precisa sobreviver: documentos, fotos, e-mails, licenças e senhas do navegador. O guia mostra a ordem correta.",
    cta: "Ler o guia de formatação sem perder arquivos",
    utmContent: "antes-de-formatar-backup",
    canais: ["gbp", "facebook", "instagram"],
  },
];

const PRESET_POR_CANAL: Record<CanalDistribuicao, { source: string; medium: string; campaign: string }> = {
  gbp: { source: "google", medium: "organic_gbp", campaign: "gbp_post" },
  facebook: { source: "facebook", medium: "organic", campaign: "facebook_organic" },
  instagram: { source: "instagram", medium: "organic", campaign: "instagram_organic" },
};

export type LinkPauta = { pauta: Pauta; canal: CanalDistribuicao } & SaidaLink;

/** Monta o link rastreável de uma pauta em um canal. Fail-closed. */
export function linkDaPauta(pauta: Pauta, canal: CanalDistribuicao, base?: string): LinkPauta {
  if (!isCohortUrl(pauta.landing) || !contentNode(pauta.landing)) {
    return { pauta, canal, ok: false, erro: "Landing fora da coorte/mapa de intenção da 8E." };
  }
  const preset = PRESET_POR_CANAL[canal];
  const saida = construirLinkAquisicao(
    {
      destino: pauta.landing,
      utm_source: preset.source,
      utm_medium: preset.medium,
      utm_campaign: preset.campaign,
      utm_content: pauta.utmContent,
    },
    base,
  );
  return { pauta, canal, ...saida };
}

/** Todos os links do lote, por pauta × canal. */
export function matrizDistribuicao(base?: string): LinkPauta[] {
  return PAUTAS_8F.flatMap((p) => p.canais.map((c) => linkDaPauta(p, c, base)));
}

/**
 * Estado de publicação externa. Enquanto não houver integração
 * autorizada, permanece PRONTO_PARA_PUBLICAR — jamais "publicado".
 */
export const ESTADO_PUBLICACAO_EXTERNA = "PRONTO_PARA_PUBLICAR" as const;
