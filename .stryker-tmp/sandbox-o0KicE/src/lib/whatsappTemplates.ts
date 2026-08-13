/**
 * ============================================================================
 * TEMPLATES DE MENSAGEM DO WHATSAPP POR CATEGORIA / SERVIÇO
 * ============================================================================
 * Cada template gera uma abertura profissional + uma linha de rastreio com os
 * campos `cat` (categoria), `sym` (sintoma), `cidade` e `bairro`. Isso melhora
 * a conversão (a mensagem já chega contextualizada) e permite entender a
 * intenção de busca sem depender só de analytics.
 */
// @ts-nocheck

import { siteConfig } from "@/lib/siteConfig";

export type TemplateCategory =
  | "pc"
  | "tv"
  | "celular"
  | "surface"
  | "som"
  | "videogame"
  | "rede"
  | "empresa"
  | "dados"
  | "outro";

export interface TemplateContext {
  cat: TemplateCategory | string;
  /** Sintoma/objetivo em texto legível. */
  sym?: string;
  cidade?: string;
  bairro?: string;
  /** Nome informado na qualificação. */
  nome?: string;
  servico?: string;
}

const OPENINGS: Record<TemplateCategory, (c: TemplateContext) => string> = {
  pc: (c) =>
    `Preciso de atendimento técnico para computador/notebook${c.sym ? `: ${c.sym}` : ""}.`,
  tv: (c) => `Preciso de avaliação técnica de TV${c.sym ? `: ${c.sym}` : ""}.`,
  celular: (c) => `Preciso de avaliação técnica de celular${c.sym ? `: ${c.sym}` : ""}.`,
  surface: (c) =>
    `Preciso de atendimento para Surface / tablet${c.sym ? `: ${c.sym}` : ""}.`,
  som: (c) => `Preciso de avaliação de equipamento de som${c.sym ? `: ${c.sym}` : ""}.`,
  videogame: (c) => `Preciso de avaliação de videogame${c.sym ? `: ${c.sym}` : ""}.`,
  rede: (c) =>
    `Preciso de suporte em rede e Wi-Fi${c.sym ? `: ${c.sym}` : ""} (instalação, sinal ou instabilidade).`,
  empresa: (c) =>
    `Preciso de suporte técnico para empresa${c.sym ? `: ${c.sym}` : ""} (estações, rede e continuidade).`,
  dados: (c) =>
    `Preciso de avaliação para recuperação de dados${c.sym ? `: ${c.sym}` : ""}.`,
  outro: (c) => `Preciso de avaliação técnica${c.sym ? `: ${c.sym}` : ""}.`,
};

const isCategory = (v: string): v is TemplateCategory => v in OPENINGS;

/** Linha de rastreio padronizada (curta, legível e parseável). */
export function buildTrackingLine(c: TemplateContext): string {
  const parts = [
    `cat=${c.cat || "outro"}`,
    `sym=${slug(c.sym) || "nao-informado"}`,
    `cidade=${slug(c.cidade) || slug(siteConfig.primaryCity)}`,
    `bairro=${slug(c.bairro) || "nao-informado"}`,
  ];
  if (c.servico) parts.push(`servico=${slug(c.servico)}`);
  return `_[${parts.join(" · ")}]_`;
}

function slug(v?: string): string {
  if (!v) return "";
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

/** Abertura profissional da mensagem, por categoria. */
export function buildTemplateOpening(c: TemplateContext): string {
  const cat = isCategory(String(c.cat)) ? (c.cat as TemplateCategory) : "outro";
  const saudacao = c.nome ? `Olá, aqui é ${c.nome}.` : "Olá!";
  const local = [c.bairro, c.cidade].filter(Boolean).join(" — ");
  const linhaLocal = local ? ` Estou em ${local}.` : "";
  return `${saudacao} ${OPENINGS[cat](c)}${linhaLocal}`;
}

/** Mensagem completa por categoria (abertura + corpo + rastreio). */
export function buildCategoryMessage(c: TemplateContext, corpo?: string): string {
  return [buildTemplateOpening(c), corpo?.trim(), buildTrackingLine(c)]
    .filter(Boolean)
    .join("\n\n");
}
