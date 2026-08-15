import SERVICO_VISUAL_3Q_DATA, {
  VISUAL_3Q_SLUGS as VISUAL_3Q_SLUGS_DATA,
} from "../../scripts/lib/servico-visual-3q.mjs";

/**
 * Rodada 3Q — padrão visual das páginas comerciais de serviço.
 *
 * Fonte única: scripts/lib/servico-visual-3q.mjs (compartilhada com o
 * HTML estático das rotas curadas), o que garante paridade entre o que
 * é servido antes da hidratação e o que o React renderiza.
 *
 * Nada aqui altera conteúdo editorial, título, H1, canônico, preço,
 * garantia ou triagem: resumo, sumário e caixas apenas reorganizam copy
 * já aprovada em src/lib/servicosCore.ts.
 */
export type ServicoCaixaIcone =
  | "checklist"
  | "alerta"
  | "limite"
  | "backup"
  | "bancada"
  | "seguranca";

export interface ServicoCaixa {
  icone: ServicoCaixaIcone;
  titulo: string;
  itens: string[];
  nota?: string;
}

export interface ServicoVisual {
  resumo: { label: string; value: string }[];
  toc: { id: string; label: string }[];
  caixasTitulo: string;
  caixasPosicao: "antes-incluso" | "apos-sinais";
  caixas: ServicoCaixa[];
  ctaIntermediario: { titulo: string; texto: string; label: string };
}

export const VISUAL_3Q_SLUGS = VISUAL_3Q_SLUGS_DATA as string[];

export const SERVICO_VISUAL_3Q = SERVICO_VISUAL_3Q_DATA as Record<string, ServicoVisual>;

export const visualDoServico = (slug: string): ServicoVisual | undefined =>
  SERVICO_VISUAL_3Q[slug];
