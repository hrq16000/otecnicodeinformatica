/**
 * RODADA 3 — FASE 18: famílias de CTA (fonte única).
 *
 * O portal usava rótulos diferentes para a mesma ação ("Solicitar orçamento",
 * "Quero um orçamento", "Iniciar atendimento no WhatsApp"...). Isso confunde o
 * visitante e polui a leitura dos eventos de conversão.
 *
 * Regra: todo CTA primário usa um dos três rótulos abaixo; todo CTA
 * secundário usa um dos rótulos de navegação. A palavra "orçamento"
 * continua permitida no texto editorial (é vocabulário real do serviço),
 * mas não como rótulo de botão.
 */
// @ts-nocheck

export const CTA_PRIMARY = {
  /** Entrada de funil quando a intenção é entender a causa do problema. */
  diagnostico: "Solicitar diagnóstico",
  /** Entrada de funil genérica (home, contato, faixas de conversão). */
  atendimento: "Iniciar atendimento",
  /** Continuação de um fluxo já iniciado (modal, triagem, wizard). */
  whatsapp: "Continuar no WhatsApp",
} as const;

export const CTA_SECONDARY = {
  servicos: "Ver serviços",
  comoFunciona: "Entender como funciona",
  precos: "Ver preços",
} as const;

export type CtaPrimaryKey = keyof typeof CTA_PRIMARY;
export type CtaSecondaryKey = keyof typeof CTA_SECONDARY;
