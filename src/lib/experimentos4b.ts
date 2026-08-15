/**
 * Experimentos controlados de clareza acima da dobra (Rodada 4B).
 *
 * Regras:
 *  • variam APENAS texto de apresentação — resumo do hero, rótulo do CTA e
 *    a chamada dos blocos de coleta e de teste final;
 *  • NUNCA alteram escopo de serviço, preço, prazo, garantia ou triagem;
 *  • atribuição determinística por sessão (mesmo visitante vê sempre a
 *    mesma variação) e estável entre recarregamentos;
 *  • a variação viaja em `click_events.variant`, permitindo comparar
 *    conversão por CTA no painel.
 */

export type VariantId = "controle" | "processo" | "decisao";

export interface VariacaoCopy {
  id: VariantId;
  /** Frase curta abaixo do H1. */
  resumoHero: string;
  /** Rótulo do CTA principal. */
  ctaLabel: string;
  /** Chamada do bloco de coleta e entrega. */
  chamadaColeta: string;
  /** Chamada do bloco de teste final. */
  chamadaTesteFinal: string;
}

export const EXPERIMENTO_PATHS = ["/servicos/conserto-tv", "/servicos/conserto-placa"] as const;

const TV: Record<VariantId, VariacaoCopy> = {
  controle: {
    id: "controle",
    resumoHero:
      "Diagnóstico eletrônico de TV e Smart TV em bancada, com autorização antes de qualquer execução.",
    ctaLabel: "Descrever o problema da TV",
    chamadaColeta: "Coleta e entrega conforme avaliação logística.",
    chamadaTesteFinal: "Verificação das funções relacionadas ao defeito tratado.",
  },
  processo: {
    id: "processo",
    resumoHero:
      "Sua TV é registrada, coletada, aberta em bancada e testada — e nada é executado antes de você autorizar o escopo encontrado.",
    ctaLabel: "Descrever o problema da TV",
    chamadaColeta: "Retirada registrada no seu endereço e devolução com o serviço documentado.",
    chamadaTesteFinal: "Antes de devolver, o aparelho volta a ligar e ficar em teste na bancada.",
  },
  decisao: {
    id: "decisao",
    resumoHero:
      "Descubra se a sua TV tem reparo viável: avaliamos placa e painel separadamente e dizemos com clareza quando não compensa.",
    ctaLabel: "Descrever o problema da TV",
    chamadaColeta: "Buscamos o aparelho; você acompanha cada etapa até a devolução.",
    chamadaTesteFinal: "Você recebe o registro do que foi reparado e do que foi testado.",
  },
};

const PLACA: Record<VariantId, VariacaoCopy> = {
  controle: {
    id: "controle",
    resumoHero:
      "Diagnóstico e reparo de placas eletrônicas em nível de componente, com critérios claros de aceite.",
    ctaLabel: "Descrever a placa e o defeito",
    chamadaColeta: "Coleta e entrega conforme avaliação logística.",
    chamadaTesteFinal: "Validação dentro do escopo possível para a placa recebida.",
  },
  processo: {
    id: "processo",
    resumoHero:
      "Placa recebida, identificada, medida ponto a ponto e validada em bancada — com o escopo autorizado antes do retrabalho.",
    ctaLabel: "Descrever a placa e o defeito",
    chamadaColeta: "Você envia a placa ou o equipamento completo; a logística é combinada na triagem.",
    chamadaTesteFinal: "A validação declara exatamente o que foi possível testar fora do equipamento de origem.",
  },
  decisao: {
    id: "decisao",
    resumoHero:
      "Nem toda placa é recuperável: dizemos antes se ela é candidata a diagnóstico, se a avaliação será limitada ou se deve ser recusada.",
    ctaLabel: "Descrever a placa e o defeito",
    chamadaColeta: "Combinamos o envio da placa avulsa ou a coleta do equipamento completo.",
    chamadaTesteFinal: "Ao final, você sabe o que foi reparado e o que ficou fora do teste.",
  },
};

const CATALOGO: Record<string, Record<VariantId, VariacaoCopy>> = {
  "/servicos/conserto-tv": TV,
  "/servicos/conserto-placa": PLACA,
};

export const VARIANTES: VariantId[] = ["controle", "processo", "decisao"];

/** Hash estável (FNV-1a) para atribuição determinística por sessão. */
export function hashSemente(semente: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < semente.length; i += 1) {
    h ^= semente.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** Atribui a variação de forma determinística para a sessão e a rota. */
export function variantePara(path: string, sessionId: string): VariantId {
  if (!CATALOGO[path]) return "controle";
  return VARIANTES[hashSemente(`${path}:${sessionId}`) % VARIANTES.length];
}

/** Copy da variação atribuída — sempre cai em `controle` se a rota não participa. */
export function copyVariacao(path: string, sessionId: string): VariacaoCopy | null {
  const tabela = CATALOGO[path];
  if (!tabela) return null;
  return tabela[variantePara(path, sessionId)];
}
