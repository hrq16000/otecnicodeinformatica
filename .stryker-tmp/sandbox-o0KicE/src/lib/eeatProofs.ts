/**
 * ============================================================================
 * PROVAS DE E-E-A-T — dados verificáveis
 * ============================================================================
 * GOVERNANÇA (não negociável neste projeto):
 *  - Nada aqui pode ser inventado. Todo item precisa ser verificável por
 *    documento, registro público, foto real ou registro interno do atendimento.
 *  - Campos vazios NÃO são renderizados. É melhor mostrar menos do que
 *    publicar prova falsa.
 *  - Proibido: avaliação/nota, depoimento, número de clientes, SLA em horas,
 *    "melhor/nº 1", certificação sem emissor, prazo garantido.
 *
 * Para publicar um bloco novo, preencha o array correspondente com dados reais.
 */
// @ts-nocheck

import { siteConfig } from "@/lib/siteConfig";
import { GESTOR } from "@/lib/gestorResponsavel";

export interface ProvaVerificavel {
  /** Rótulo curto do dado. */
  label: string;
  /** Valor exibido (já formatado). */
  value: string;
  /** De onde o dado vem — reforça verificabilidade. */
  fonte?: string;
  /** Link público de verificação, quando existir. */
  url?: string;
}

export interface EquipamentoBancada {
  nome: string;
  finalidade: string;
}

export interface MembroEquipe {
  nome: string;
  funcao: string;
  escopo: string;
}

export interface CasoReal {
  /** Ex.: "Notebook Dell Inspiron não ligava". */
  titulo: string;
  contexto: string;
  diagnostico: string;
  desfecho: string;
  /** Bairro/cidade — sem identificar o cliente. */
  local?: string;
}

/**
 * Dados institucionais verificáveis. Todos derivados de siteConfig — que é a
 * fonte única de verdade preenchida com dados reais fornecidos pelo cliente.
 */
export const dadosVerificaveis: ProvaVerificavel[] = [
  // "Atuação desde" só entra quando houver ano verdadeiro da nova marca.
  ...(siteConfig.foundedYear
    ? [{ label: "Atuação desde", value: siteConfig.foundedYear, fonte: "Histórico da operação" }]
    : []),
  ...(siteConfig.serviceArea.length
    ? [{ label: "Área de atendimento", value: siteConfig.serviceArea.join(" · "), fonte: "Operação declarada" }]
    : []),
  { label: "Modalidades", value: "A domicílio · coleta e entrega · remoto", fonte: "Operação declarada" },
  { label: "Diagnóstico a partir de", value: siteConfig.minPriceLabel, fonte: "Política de preços publicada" },
  { label: "Garantia do serviço", value: "90 dias sobre a mão de obra", fonte: "Política publicada" },
];


/** Compromissos operacionais — só entram itens que a operação cumpre sempre. */
export const compromissosOperacionais: string[] = [
  "Diagnóstico antes de informar qualquer valor — nada é executado sem aprovação.",
  "Valor registrado por escrito no WhatsApp, com escopo e valor.",
  "Garantia formal do serviço executado, registrada no mesmo canal.",
  "Critério explícito de quando o reparo não compensa — indicamos a substituição.",
  "Peças e materiais informados à parte, nunca embutidos sem aviso.",
];

/**
 * Equipamentos de bancada. VAZIO até haver inventário conferido (com foto).
 * Preencher habilita o bloco automaticamente.
 */
export const equipamentosBancada: EquipamentoBancada[] = [];

/** Equipe técnica. VAZIO até haver autorização de publicação dos nomes. */
export const equipeTecnica: MembroEquipe[] = [];

/** Casos reais anonimizados. VAZIO até haver registro de atendimento conferido. */
export const casosReais: CasoReal[] = [];

/** Escopo técnico reaproveitado da responsabilidade técnica institucional. */
export const escopoTecnico = GESTOR.escopoTecnico;

export const hasEquipamentos = () => equipamentosBancada.length > 0;
export const hasEquipe = () => equipeTecnica.length > 0;
export const hasCasos = () => casosReais.length > 0;

/** Quantidade de blocos de prova efetivamente publicáveis. */
export const provasDisponiveis = () =>
  [dadosVerificaveis.length > 0, compromissosOperacionais.length > 0, hasEquipamentos(), hasEquipe(), hasCasos()].filter(
    Boolean,
  ).length;
