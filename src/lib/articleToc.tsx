import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * ÍNDICE DE ARTIGO (Rodada 9B.1) — extração determinística de headings.
 *
 * O conteúdo editorial é JSX (ReactNode), não HTML string. Em vez de
 * fazer parsing tardio do DOM (que causaria hydration mismatch e CLS),
 * percorremos a árvore React DURANTE o render — o mesmo resultado no
 * servidor e no cliente, sem efeito colateral e sem biblioteca extra.
 *
 * Regras:
 *  • ids determinísticos: slug ASCII do texto do heading, sem acentos;
 *  • colisões resolvidas por sufixo numérico estável (ordem de leitura);
 *  • H2 é o nível principal; H3 entra apenas como sub-item;
 *  • nenhuma alteração de URL no carregamento (âncora só ao clicar).
 */

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocResult {
  /** Conteúdo com `id` e `scroll-mt` aplicados nos headings. */
  content: ReactNode;
  headings: TocHeading[];
}

/** Slug ASCII determinístico (sem acentos, sem colisão de espaços). */
export const slugifyHeading = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/** Texto plano de um ReactNode (ignora ícones e elementos sem texto). */
export const nodeText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return nodeText(props.children);
  }
  return "";
};

/**
 * Percorre o conteúdo, injeta ids estáveis em H2/H3 e devolve o índice.
 * Puro: mesma entrada → mesma saída (SSR e cliente idênticos).
 */
export const buildArticleToc = (content: ReactNode): TocResult => {
  const headings: TocHeading[] = [];
  const usados = new Map<string, number>();

  const idFor = (text: string): string => {
    const base = slugifyHeading(text) || "secao";
    const n = usados.get(base) ?? 0;
    usados.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  };

  const walk = (node: ReactNode): ReactNode => {
    if (Array.isArray(node)) {
      return Children.map(node, (child) => walk(child));
    }
    if (!isValidElement(node)) return node;

    const el = node as ReactElement<{ children?: ReactNode; id?: string; className?: string }>;
    const tipo = el.type;

    if (tipo === "h2" || tipo === "h3") {
      const text = nodeText(el.props.children).trim();
      if (!text) return el;
      const id = el.props.id ?? idFor(text);
      headings.push({ id, text, level: tipo === "h2" ? 2 : 3 });
      return cloneElement(el, {
        id,
        className: [el.props.className, "scroll-mt-28"].filter(Boolean).join(" "),
      });
    }

    if (el.props?.children) {
      return cloneElement(el, undefined, walk(el.props.children));
    }
    return el;
  };

  const content2 = walk(content);
  return { content: content2, headings };
};

/** Artigos curtos não recebem índice — o TOC só existe onde ajuda. */
export const TOC_MIN_H2 = 6;

export const shouldRenderToc = (headings: TocHeading[]): boolean =>
  headings.filter((h) => h.level === 2).length >= TOC_MIN_H2;
