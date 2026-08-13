/**
 * A/B do CTA do funil mobile por serviço (Rodada 4L).
 *
 * Regras herdadas do experimento 4B e mantidas aqui:
 *  • varia SOMENTE texto de apresentação — rótulo do CTA (sempre dentro das
 *    famílias aprovadas em `ctaLabels.ts`) e a linha de apoio da barra mobile;
 *  • NUNCA altera escopo, preço, prazo, garantia, triagem ou destino;
 *  • atribuição determinística por sessão + rota (o mesmo visitante vê sempre
 *    a mesma variação, inclusive após recarregar);
 *  • a variação viaja em `click_events.variant` e no `utm_term` do deep link,
 *    permitindo comparar cliques em WhatsApp por variação no painel.
 */
// @ts-nocheck

import { CTA_PRIMARY } from "./ctaLabels";
import { hashSemente } from "./experimentos4b";

export type CtaMobileVariantId = "controle" | "clareza" | "urgencia";

export interface CtaMobileCopy {
  id: CtaMobileVariantId;
  /** Rótulo do botão — obrigatoriamente uma das famílias primárias. */
  ctaLabel: string;
  /** Linha curta de apoio exibida acima do botão no mobile. */
  apoio: string;
}

export const CTA_MOBILE_VARIANTES: CtaMobileVariantId[] = ["controle", "clareza", "urgencia"];

/**
 * Copy por variação. `servico` entra na frase para manter a barra específica
 * do serviço (a mesma barra nunca fala de outro equipamento).
 */
const COPY: Record<CtaMobileVariantId, (servico: string) => CtaMobileCopy> = {
  controle: (servico) => ({
    id: "controle",
    ctaLabel: CTA_PRIMARY.atendimento,
    apoio: `${servico}: descreva o problema e seguimos pela triagem.`,
  }),
  clareza: (servico) => ({
    id: "clareza",
    ctaLabel: CTA_PRIMARY.diagnostico,
    apoio: `${servico}: você descreve o sintoma, respondemos o que será verificado antes de qualquer execução.`,
  }),
  urgencia: (servico) => ({
    id: "urgencia",
    ctaLabel: CTA_PRIMARY.atendimento,
    apoio: `${servico}: a triagem leva menos de um minuto e já organiza o próximo passo.`,
  }),
};

/** Atribuição determinística por sessão e rota. */
export function varianteCtaMobile(path: string, sessionId: string): CtaMobileVariantId {
  if (!sessionId) return "controle";
  return CTA_MOBILE_VARIANTES[hashSemente(`cta-mobile:${path}:${sessionId}`) % CTA_MOBILE_VARIANTES.length];
}

/** Copy da variação atribuída para a rota/sessão. */
export function copyCtaMobile(path: string, sessionId: string, servico: string): CtaMobileCopy {
  return COPY[varianteCtaMobile(path, sessionId)](servico);
}

export default copyCtaMobile;
