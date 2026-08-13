// @ts-nocheck
// ── POLÍTICA COMERCIAL ───────────────────────────────────────
// SOURCE OF TRUTH das regras comerciais. Outros módulos (politicaComercial,
// PDFs de OS, páginas de preços) devem consumir daqui em vez de redeclarar.
// Nenhum preço foi alterado nesta rodada — apenas centralizado.

export const commercialConfig = {
  /** Prefixo oficial das ordens de serviço da nova marca. */
  osPrefix: "OS-OTI",
  /** Formato do protocolo exibido ao cliente. */
  osFormatLabel: "OS-OTI-AAAAMMDD-0000",

  currency: "BRL",
  minPriceLabel: "R$ 99,99",
  diagnosticoLabel: "R$ 99,99",
  pricingDisclaimer:
    "O valor final pode variar conforme equipamento, urgência, deslocamento, complexidade, peças e condição real do problema.",

  /** Regras operacionais — texto curto, sem claim não comprovável. */
  policies: {
    preAprovacao: "Nenhum serviço é executado sem aprovação prévia do valor.",
    visita: "A visita técnica é cobrada e informada antes do deslocamento.",
    coleta: "Coleta e entrega disponíveis conforme região e tipo de equipamento.",
    cancelamento: "Cancelamento sem custo até a confirmação do agendamento.",
    garantia: "Garantia sobre a mão de obra do serviço executado, registrada no orçamento aprovado. Peças seguem a garantia do fornecedor.",
    prazos: "O prazo é informado no diagnóstico, conforme peça e complexidade.",
    faturamento: "Atendimento empresarial com emissão de nota fiscal de serviço.",
    pagamentos: "PIX, cartão de crédito, cartão de débito e dinheiro.",
  },

  paymentMethods: ["PIX", "Cartão de crédito", "Cartão de débito", "Dinheiro"],
} as const;

export const OS_PREFIX = commercialConfig.osPrefix;
export const OS_FORMAT_LABEL = commercialConfig.osFormatLabel;

export default commercialConfig;
