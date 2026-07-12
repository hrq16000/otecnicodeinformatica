// ─────────────────────────────────────────────────────────────
// REGISTRO EDITORIAL FAIL-CLOSED — fonte única de aprovação de conteúdo.
//
// Regra inegociável: um artigo só é indexável / publicável se possuir
// um registro EXPLÍCITO e TIPADO de aprovação. Sem registro válido, o
// artigo é tratado como rascunho (draft): noindex, fora do sitemap,
// fora da listagem pública e sem schema de autoria pessoal.
//
// A aprovação NÃO pode depender de: categoria, data, presença de
// conteúdo, presença de imagem, slug, origem (manual/programática)
// ou tema. Depende exclusivamente deste registro.
//
// Estado inicial: ZERO artigos aprovados.
// ─────────────────────────────────────────────────────────────

import { siteConfig } from "@/lib/siteConfig";

export type EditorialStatus = "draft" | "in_review" | "approved" | "archived";

export type EditorialAuthorType = "organization" | "person";

export type EditorialImageOrigin = "owned" | "licensed" | "generated" | "unknown";

export interface EditorialApproval {
  slug: string;
  status: EditorialStatus;
  authorType: EditorialAuthorType;
  /** Identificador do autor aprovado (ex.: "org:tecnico-em-curitiba"). */
  authorId: string;
  /** Data ISO da revisão editorial (opcional até revisão material). */
  reviewedAt?: string;
  /** Data ISO real da aprovação — obrigatória para status approved. */
  approvedAt?: string;
  imageOrigin: EditorialImageOrigin;
  imageLicense?: string;
  imageAttribution?: string;
  notes?: string;
}

// Autoria institucional temporária. Enquanto não houver autor pessoal
// real e verificado, a autoria é a própria entidade oficial.
// Todos os dados vêm de siteConfig — nunca duplicar manualmente.
export const INSTITUTIONAL_AUTHOR = {
  id: "org:tecnico-em-curitiba",
  type: "organization" as EditorialAuthorType,
  name: siteConfig.brandName,
  url: siteConfig.baseUrl,
} as const;

// Publisher institucional oficial (alinhado à entidade da marca).
export const EDITORIAL_PUBLISHER = {
  name: siteConfig.brandName,
  url: siteConfig.baseUrl,
  logo: `${siteConfig.baseUrl}/logo.png`,
} as const;

// ─────────────────────────────────────────────────────────────
// ESTADO INICIAL OBRIGATÓRIO: registro de aprovados VAZIO.
// Não cadastrar nenhum dos artigos existentes como aprovado.
// ─────────────────────────────────────────────────────────────
export const APPROVED_EDITORIAL_CONTENT = new Map<string, EditorialApproval>();

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(?:[T ].*)?$/;

/**
 * Validação fail-closed. Retorna true SOMENTE quando todos os
 * requisitos explícitos estão presentes e coerentes.
 */
function isValidApproval(a: EditorialApproval | undefined): a is EditorialApproval {
  if (!a) return false;
  if (a.status !== "approved") return false;
  if (a.authorType !== "organization" && a.authorType !== "person") return false;
  if (!a.authorId || a.authorId.trim() === "") return false;
  if (!a.imageOrigin || a.imageOrigin === "unknown") return false;
  if (!a.approvedAt || !ISO_DATE.test(a.approvedAt)) return false;
  // Rejeita datas de aprovação no futuro (proteção anti-build-date).
  const ts = new Date(a.approvedAt).getTime();
  if (Number.isNaN(ts) || ts > Date.now()) return false;
  return true;
}

/** Status editorial de um slug. Padrão fail-closed: "draft". */
export function getEditorialStatus(slug: string): EditorialStatus {
  const entry = APPROVED_EDITORIAL_CONTENT.get(slug);
  return entry?.status ?? "draft";
}

/** Registro editorial bruto de um slug (se existir). */
export function getEditorialApproval(slug: string): EditorialApproval | undefined {
  return APPROVED_EDITORIAL_CONTENT.get(slug);
}

/** Verdadeiro apenas se o slug tem aprovação editorial válida e completa. */
export function isEditorialApproved(slug: string): boolean {
  return isValidApproval(APPROVED_EDITORIAL_CONTENT.get(slug));
}

/** Lista de slugs efetivamente aprovados (validados). Vazia nesta fase. */
export function getApprovedSlugs(): string[] {
  return [...APPROVED_EDITORIAL_CONTENT.values()]
    .filter(isValidApproval)
    .map((a) => a.slug);
}

export default APPROVED_EDITORIAL_CONTENT;
