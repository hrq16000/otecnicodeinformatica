// @ts-nocheck
import BLOCOS_4A_DATA, {
  BLOCOS_4A_PATHS as PATHS_DATA,
  CTA_4A as CTA_DATA,
  CONTEXTO_4A as CONTEXTO_DATA,
} from "../../scripts/lib/blocos-4a.mjs";
import type { Secao3T } from "./blocos3t";

/**
 * Rodada 4A — blocos editoriais das duas verticais multieletrônicos já
 * auditadas (TV/Smart TV e reparo de placas eletrônicas). Fonte única
 * compartilhada com o HTML estático; paridade validada por
 * scripts/check-premium-tv-board-4a.mjs.
 *
 * Nenhuma rota nova é criada aqui — apenas apresentação e conteúdo das
 * duas páginas existentes.
 */
export interface Blocos4AConfig {
  eyebrow: string;
  resumo: { label: string; value: string }[];
  tocExtra: { id: string; label: string }[];
  secoes: Secao3T[];
}

export const BLOCOS_4A_PATHS = PATHS_DATA as string[];
export const BLOCOS_4A = BLOCOS_4A_DATA as unknown as Record<string, Blocos4AConfig>;
export const CTA_4A = CTA_DATA as Record<
  string,
  { titulo: string; texto: string; label: string }
>;
export const CONTEXTO_4A = CONTEXTO_DATA as Record<string, Record<string, string>>;

export const blocos4A = (path: string): Blocos4AConfig | undefined => BLOCOS_4A[path];
export const cta4A = (path: string) => CTA_4A[path];
export const contexto4A = (path: string) => CONTEXTO_4A[path];
