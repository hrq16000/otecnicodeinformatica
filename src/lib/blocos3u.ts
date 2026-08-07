import BLOCOS_3U_DATA, {
  BLOCOS_3U_PATHS as PATHS_DATA,
  CTA_3U as CTA_DATA,
  CONTEXTO_3U as CONTEXTO_DATA,
} from "../../scripts/lib/blocos-3u.mjs";
import type { Secao3T } from "./blocos3t";

/**
 * Rodada 3U — blocos editoriais das três páginas do escopo
 * (atendimento remoto, segurança dos dados e montagem de PC).
 * Fonte única compartilhada com o HTML estático — paridade garantida
 * por scripts/check-visual-wave-3u.mjs.
 */
export interface Blocos3UConfig {
  eyebrow: string;
  resumo: { label: string; value: string }[];
  tocExtra: { id: string; label: string }[];
  secoes: Secao3T[];
}

export const BLOCOS_3U_PATHS = PATHS_DATA as string[];
export const BLOCOS_3U = BLOCOS_3U_DATA as Record<string, Blocos3UConfig>;
export const CTA_3U = CTA_DATA as Record<
  string,
  { titulo: string; texto: string; label: string }
>;
export const CONTEXTO_3U = CONTEXTO_DATA as Record<string, Record<string, string>>;

export const blocos3U = (path: string): Blocos3UConfig | undefined => BLOCOS_3U[path];
export const cta3U = (path: string) => CTA_3U[path];

/** Mensagem de triagem com o contexto esperado da página (sem campo novo). */
export const contexto3U = (path: string) => CONTEXTO_3U[path];
