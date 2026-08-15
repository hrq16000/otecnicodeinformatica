import { List } from "lucide-react";
import type { TocHeading } from "@/lib/articleToc";

/**
 * ÍNDICE DO ARTIGO (Rodada 9B.1).
 *
 * • `<nav aria-label="Índice do artigo">` com links reais (âncoras),
 *   navegáveis por teclado e por leitor de tela;
 * • mobile: recolhível via `<details>` nativo (sem JS, sem estado, sem
 *   divergência SSR/cliente); desktop: bloco sempre visível via CSS;
 * • sem alteração de URL no carregamento — o hash só muda no clique;
 * • smooth scroll e offset do header ficam no CSS global
 *   (`scroll-behavior` + `scroll-mt-28`), respeitando reduced motion.
 */
export const ArticleToc = ({ headings }: { headings: TocHeading[] }) => {
  if (!headings.length) return null;

  return (
    <nav aria-label="Índice do artigo" className="not-prose my-8">
      <details className="article-toc rounded-xl border border-border bg-muted/40 p-4" open>
        <summary className="article-toc__summary flex cursor-pointer list-none items-center gap-2 font-heading text-sm font-semibold text-foreground">
          <List className="h-4 w-4 text-accent" aria-hidden="true" />
          Índice do artigo
        </summary>
        <p className="article-toc__title hidden items-center gap-2 font-heading text-sm font-semibold text-foreground md:flex">
          <List className="h-4 w-4 text-accent" aria-hidden="true" />
          Índice do artigo
        </p>
        <ol className="article-toc__list mt-3 space-y-1.5 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "ml-4" : undefined}>
              <a
                href={`#${h.id}`}
                className="rounded text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
};

export default ArticleToc;
