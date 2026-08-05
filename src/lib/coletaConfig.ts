/**
 * Configuração centralizada de Coleta e Entrega
 * 
 * ATUALIZE SOMENTE ESTE ARQUIVO para propagar mudanças em todo o site:
 * - PrecoVisitaTecnica.tsx
 * - PrecosEPoliticas.tsx
 * - ColetaEntrega.tsx
 * - HomePricingBlock.tsx
 * - Todas as páginas de serviços (ConsertoCelular, ConsertoTV, ManutencaoTV, ConsertoPlaca, etc.)
 */

// === VALORES ===
export const COLETA_TAXA_MINIMA = 300;
export const COLETA_TAXA_MINIMA_LABEL = `R$ ${COLETA_TAXA_MINIMA}`;
export const DIAGNOSTICO_VALOR = 90;
export const DIAGNOSTICO_VALOR_LABEL = `R$ ${DIAGNOSTICO_VALOR}`;

// === PRAZOS ===
export const PRAZO_RAPIDO = "2 a 3 dias úteis"; // Celular, Rádio, Caixa de Som
export const PRAZO_LONGO = "15 a 60 dias úteis"; // TV, Monitor, Notebook, PC

export const PRAZOS = [
  { equipamentos: "Celular / Rádio / Caixa de Som", prazo: PRAZO_RAPIDO },
  { equipamentos: "TV / Monitor / Notebook / PC", prazo: PRAZO_LONGO },
] as const;

// === EQUIPAMENTOS COM COLETA ===
export const EQUIPAMENTOS_COLETA = [
  "TV (LED, LCD, Smart)",
  "Notebook (reparo de placa)",
  "PC (reparo complexo)",
  "Monitor",
  "Rádio",
  "Caixa de Som",
  "Celular",
] as const;

// Slugs para detecção automática (usado por isColetaCategory)
export const CATEGORIAS_COLETA_SLUGS = [
  "tv", "notebook", "pc", "rádio", "radio", "caixa de som",
  "monitor", "celular", "manutencao-tv", "conserto-placa", "conserto-celular",
];

export const isColetaCategory = (slug: string): boolean => {
  const lower = slug.toLowerCase();
  return CATEGORIAS_COLETA_SLUGS.some(cat => lower.includes(cat));
};

// === REGRAS DE VALOR ===
export const REGRA_ESTIMATIVA_GRATIS = "Estimativa gratuita somente via WhatsApp";
export const REGRA_VALOR_PRECISO = `Valor preciso somente com compromisso — taxa mínima ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada`;
export const REGRA_COLETA_SEM_VISITA = "Sem visita técnica a domicílio. Serviço realizado em laboratório com coleta e entrega.";

// === VISITA TÉCNICA (serviços rápidos) ===
export const VISITA_MINIMA = 99.99;
export const VISITA_MINIMA_LABEL = "R$ 99,99";

// === MENSAGENS PADRONIZADAS ===
export const MSG_COLETA_RESUMO = `Sem visita técnica. Coleta e entrega inclusa — taxa mínima ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada.`;
export const MSG_VALOR_APOS_COLETA = "Valor do atendimento somente após coleta";
export const MSG_DIAGNOSTICO_DESISTENCIA = `Em caso de desistência, o diagnóstico custa ${DIAGNOSTICO_VALOR_LABEL}.`;
