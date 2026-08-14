/**
 * RODADA 8H — CAMADA OPERACIONAL DE DISTRIBUIÇÃO DO CLUSTER 1
 * -----------------------------------------------------------
 * Não cria conteúdo, rota, cluster nem infraestrutura analítica nova.
 * Só declara, de forma auditável, o estado de cada par (pauta × canal)
 * já preparado na 8F.
 *
 * Regra dura: "link pronto" ≠ "publicado". PUBLISHED exige
 * `published_at` real; sem isso, o registro cai para READY e a razão
 * fica visível. Ninguém melhora relatório mudando string.
 */
import registro from "../../config/distribuicao-cluster-1.json";
import { PAUTAS_8F, matrizDistribuicao, type CanalDistribuicao, type LinkPauta } from "@/lib/contentDistribution";

export const STATUS_DISTRIBUICAO = ["READY", "SCHEDULED", "PUBLISHED", "BLOCKED"] as const;
export type StatusDistribuicao = (typeof STATUS_DISTRIBUICAO)[number];

export type RegistroDistribuicao = {
  pauta: string;
  canal: CanalDistribuicao;
  status: string;
  published_at?: string | null;
  campaign?: string | null;
  prova?: string | null;
};

export type LinhaDistribuicao = {
  canal: CanalDistribuicao;
  pautaId: string;
  tema: string;
  landing: string;
  intent: string;
  url: string | null;
  status: StatusDistribuicao;
  publishedAt: string | null;
  motivo: string | null;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/;

/** Normaliza um status declarado, rebaixando PUBLISHED sem evidência. */
export function normalizarStatus(r: Pick<RegistroDistribuicao, "status" | "published_at">): {
  status: StatusDistribuicao;
  motivo: string | null;
} {
  const bruto = String(r.status || "").toUpperCase();
  if (!(STATUS_DISTRIBUICAO as readonly string[]).includes(bruto)) {
    return { status: "BLOCKED", motivo: `Status "${r.status}" fora do contrato.` };
  }
  if (bruto === "PUBLISHED" && !(r.published_at && ISO_DATE.test(r.published_at))) {
    return { status: "READY", motivo: "PUBLISHED sem published_at válido — rebaixado para READY." };
  }
  return { status: bruto as StatusDistribuicao, motivo: null };
}

const registros = (registro.registros ?? []) as RegistroDistribuicao[];

/** Matriz operacional: link rastreável da 8F + status declarado. */
export function matrizOperacional(base?: string): LinhaDistribuicao[] {
  return matrizDistribuicao(base).map((l: LinkPauta) => {
    const reg = registros.find((r) => r.pauta === l.pauta.id && r.canal === l.canal);
    const { status, motivo } = reg
      ? normalizarStatus(reg)
      : { status: "BLOCKED" as StatusDistribuicao, motivo: "Sem registro operacional declarado." };
    return {
      canal: l.canal,
      pautaId: l.pauta.id,
      tema: l.pauta.tema,
      landing: l.pauta.landing,
      intent: l.pauta.intent,
      url: l.ok ? l.url : null,
      status: l.ok ? status : "BLOCKED",
      publishedAt: reg?.published_at ?? null,
      motivo: l.ok ? motivo : (l.erro ?? "Link inválido."),
    };
  });
}

/** Contagem de publicações realmente comprovadas por canal. */
export function publicacoesPorCanal(linhas = matrizOperacional()): Record<CanalDistribuicao, number> {
  const out = { gbp: 0, facebook: 0, instagram: 0 } as Record<CanalDistribuicao, number>;
  for (const l of linhas) if (l.status === "PUBLISHED") out[l.canal] += 1;
  return out;
}

/** Estado agregado da distribuição externa. */
export function estadoDistribuicao(linhas = matrizOperacional()): "PUBLICADO" | "PARCIAL" | "PRONTO_PARA_PUBLICAR" {
  const pub = linhas.filter((l) => l.status === "PUBLISHED").length;
  if (pub === 0) return "PRONTO_PARA_PUBLICAR";
  return pub === linhas.length ? "PUBLICADO" : "PARCIAL";
}

export const OFFLINE_QR = registro.offline as { status: string; nota: string };
export const TOTAL_PAUTAS = PAUTAS_8F.length;
