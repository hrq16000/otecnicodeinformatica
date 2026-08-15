import BLOCOS_3T_DATA, {
  BLOCOS_3T_SLUGS as SLUGS_DATA,
  CTA_3T as CTA_DATA,
} from "../../scripts/lib/blocos-3t.mjs";

/**
 * Rodada 3T — blocos editoriais das três páginas do escopo.
 * Fonte única compartilhada com o HTML estático (paridade garantida
 * por scripts/check-visual-wave-3t.mjs).
 */
export type Secao3T =
  | {
      kind: "pilares";
      id: string;
      titulo: string;
      intro?: string;
      cards: { titulo: string; texto: string }[];
    }
  | { kind: "conceitos"; id: string; titulo: string; cards: { titulo: string; texto: string }[] }
  | { kind: "fluxo"; id: string; titulo: string; passos: string[]; nota?: string }
  | {
      kind: "matriz";
      id: string;
      titulo: string;
      colunas: string[];
      linhas: string[][];
      nota?: string;
    }
  | {
      kind: "limites";
      id: string;
      titulo: string;
      destaque?: string;
      listas: { titulo: string; itens: string[] }[];
    }
  | {
      kind: "responsabilidades";
      id: string;
      titulo: string;
      cards: { titulo: string; itens: string[] }[];
    }
  | {
      kind: "contextos";
      id: string;
      titulo: string;
      intro?: string;
      cards: { titulo: string; itens: string[]; link: { label: string; to: string } }[];
    }
  | {
      kind: "duas-colunas";
      id: string;
      titulo: string;
      destaque?: string;
      colunas: { titulo: string; itens: string[] }[];
      nota?: string;
    };


export interface Blocos3TConfig {
  tocExtra: { id: string; label: string }[];
  secoes: Secao3T[];
}

export const BLOCOS_3T_SLUGS = SLUGS_DATA as string[];
export const BLOCOS_3T = BLOCOS_3T_DATA as Record<string, Blocos3TConfig>;
export const CTA_3T = CTA_DATA as Record<
  string,
  { titulo: string; texto: string; label: string }
>;

export const blocos3T = (slug: string): Blocos3TConfig | undefined => BLOCOS_3T[slug];
export const cta3T = (slug: string) => CTA_3T[slug];
