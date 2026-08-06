// ─────────────────────────────────────────────────────────────
// RODADA 3R — PADRÃO VISUAL DAS PÁGINAS EMPRESARIAIS DE SERVIÇO
//
// Propaga apenas apresentação (resumo objetivo abaixo do hero,
// sumário navegável e faixa de confiança) para as páginas de
// serviço com intenção empresarial que ainda não tinham recebido
// o padrão das Rodadas 3P/3Q.
//
// Nada aqui cria conteúdo novo: os itens de resumo apenas
// reafirmam informação já publicada em src/lib/servicosCore.ts
// (escopo, região, política de aprovação prévia). Sem preço novo,
// sem promessa de prazo, sem avaliação e sem alterar H1, título,
// canônico, JSON-LD ou regras comerciais.
// ─────────────────────────────────────────────────────────────

export interface ServicoVisual3R {
  resumo: { label: string; value: string }[];
  toc: { id: string; label: string }[];
}

/** Escopo fechado da Rodada 3R (serviços empresariais). */
export const VISUAL_3R_SLUGS = [
  "suporte-tecnico-empresarial",
  "manutencao-preventiva-empresas",
  "backup-para-empresas",
  "suporte-home-office",
] as const;

const TOC_PADRAO = [
  { id: "incluso", label: "O que está incluso" },
  { id: "quando-chamar", label: "Quando acionar o suporte" },
  { id: "como-funciona", label: "Como funciona o atendimento" },
  { id: "fatores-valor", label: "O que influencia o valor" },
  { id: "faq", label: "Perguntas frequentes" },
];

export const SERVICO_VISUAL_3R: Record<string, ServicoVisual3R> = {
  "suporte-tecnico-empresarial": {
    resumo: [
      { label: "Escopo", value: "Estações, rede interna, impressoras e rotinas de backup" },
      { label: "Formato", value: "Atendimento avulso ou recorrente, definido antes de começar" },
      { label: "Região", value: "Curitiba e Região Metropolitana" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: TOC_PADRAO,
  },
  "manutencao-preventiva-empresas": {
    resumo: [
      { label: "Objetivo", value: "Reduzir paradas com revisão periódica dos equipamentos" },
      { label: "Formato", value: "Periodicidade e itens acompanhados definidos no escopo" },
      { label: "Região", value: "Curitiba e Região Metropolitana" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Quando a preventiva se justifica" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "fatores-valor", label: "O que influencia o valor" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
  },
  "backup-para-empresas": {
    resumo: [
      { label: "Escopo", value: "Estruturação e verificação de rotinas de backup" },
      { label: "Responsabilidade", value: "Acesso mínimo necessário, autorizado pela empresa" },
      { label: "Região", value: "Curitiba e Região Metropolitana" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Quando revisar o backup" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "fatores-valor", label: "O que influencia o valor" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
  },
  "suporte-home-office": {
    resumo: [
      { label: "Público", value: "Profissionais e equipes que trabalham de casa" },
      { label: "Atendimento", value: "Remoto quando possível, presencial quando necessário" },
      { label: "Região", value: "Curitiba e Região Metropolitana" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: TOC_PADRAO,
  },
};

export const visualEmpresarial = (slug: string): ServicoVisual3R | undefined =>
  SERVICO_VISUAL_3R[slug];
