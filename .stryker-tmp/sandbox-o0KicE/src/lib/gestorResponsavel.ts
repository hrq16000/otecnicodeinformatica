/**
 * ============================================================================
 * GESTOR / RESPONSÁVEL TÉCNICO — dados institucionais
 * ============================================================================
 * IMPORTANTE (governança E-E-A-T deste projeto):
 *  - NÃO inventamos nome, formação, certificações ou anos de experiência.
 *  - Enquanto `nome` estiver vazio, a página publica apenas autoria
 *    institucional (Organization) — o schema Person NÃO é gerado.
 *  - Para publicar a autoria pessoal, preencha `nome`, `cargo`, `bio` e
 *    `certificacoes` com dados REAIS e verificáveis.
 */
// @ts-nocheck

import { siteConfig } from "@/lib/siteConfig";

export interface CertificacaoItem {
  nome: string;
  emissor: string;
  /** Ano de emissão (opcional). */
  ano?: string;
  /** URL de verificação pública (opcional, reforça E-E-A-T). */
  url?: string;
}

export interface GestorResponsavel {
  /** Deixe vazio até ter o dado real. Vazio = autoria institucional. */
  nome: string;
  cargo: string;
  /** Bio em parágrafos. */
  bio: string[];
  certificacoes: CertificacaoItem[];
  /** Área de atuação (cidades/regiões). */
  areaAtuacao: string[];
  /** Escopo técnico de responsabilidade. */
  escopoTecnico: string[];
  /** Perfis públicos verificáveis (LinkedIn etc.). */
  sameAs: string[];
}

export const GESTOR: GestorResponsavel = {
  nome: "",
  cargo: "Responsável técnico",
  bio: [
    `O ${siteConfig.brandName} atua com manutenção e suporte em informática${siteConfig.foundedYear ? ` desde ${siteConfig.foundedYear}` : ""}, atendendo residências, profissionais autônomos e empresas em ${siteConfig.primaryCity} e região metropolitana.`,
    "A responsabilidade técnica é institucional: todo atendimento passa por triagem documentada, diagnóstico antes de valor do atendimento e registro do que foi executado. Nenhum serviço é aprovado sem o cliente entender o problema, o escopo e o valor mínimo aplicável.",
    "O escopo cobre desde manutenção preventiva e formatação até reparos de bancada, recuperação de dados, redes Wi-Fi e suporte contínuo para pequenas empresas — sempre com critério explícito de quando o reparo não compensa.",
  ],
  certificacoes: [],
  areaAtuacao: [...siteConfig.serviceArea],
  escopoTecnico: [
    "Diagnóstico de computadores, notebooks e all-in-one",
    "Manutenção preventiva, formatação e recuperação de sistema",
    "Upgrade de SSD, memória e otimização de desempenho",
    "Backup, recuperação de dados e segurança básica",
    "Redes Wi-Fi, cabeamento e roteamento residencial e corporativo",
    "Suporte técnico contínuo para pequenas e médias empresas",
  ],
  sameAs: [],
};

/** True quando há autoria pessoal REAL cadastrada. */
export const hasPersonAuthority = (g: GestorResponsavel = GESTOR) =>
  g.nome.trim().length > 0;
