import { useEffect, useState } from "react";
import { Check, Link2, List } from "lucide-react";
import { toast } from "sonner";
import type { TocHeading } from "@/lib/articleToc";

/**
 * ÍNDICE DO ARTIGO (Rodada 9B.1 + 9B.2).
 *
 * • `<nav aria-label="Índice do artigo">` com links reais (âncoras),
 *   navegáveis por teclado e por leitor de tela;
 * • mobile: recolhível via `<details>` nativo; desktop: sempre visível (CSS);
 * • scroll spy: destaque do heading atual via IntersectionObserver montado
 *   apenas no cliente — o primeiro render é idêntico ao SSR (sem estado
 *   inicial derivado do DOM), logo não há hidratação divergente;
 * • botão "copiar link da seção": não altera a URL, apenas copia;
 * • movimento: smooth scroll e transições vêm do CSS global, já
 *   neutralizados por `prefers-reduced-motion`.
 */

/** Observa os headings e devolve o id ativo. Client-only por construção. */
const useScrollSpy = (ids: string[]): string | null => {
  const [ativo, setAtivo] = useState<string | null>(null);
  const chave = ids.join(",");

  useEffect(() => {
    const ids = chave ? chave.split(",") : [];
    if (!ids.length || typeof IntersectionObserver === "undefined") return;
    const visiveis = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visiveis.set(e.target.id, e.boundingClientRect.top);
          else visiveis.delete(e.target.id);
        }
        if (visiveis.size) {
          // O heading visível mais alto na tela é o que está sendo lido.
          const topo = [...visiveis.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setAtivo(topo);
        }
      },
      // Faixa de leitura: abaixo do header fixo, acima do rodapé da tela.
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
    );

    const alvos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chave]);

  return ativo;
};

const CopiarLinkSecao = ({ id, texto }: { id: string; texto: string }) => {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      toast.error("Não foi possível copiar o link.");
      return;
    }
    setCopiado(true);
    toast.success("Link da seção copiado.");
    window.setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar link da seção ${texto}`}
      className="article-toc__copy inline-flex h-11 w-11 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {copiado ? (
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  );
};

export const ArticleToc = ({ headings }: { headings: TocHeading[] }) => {
  const ativo = useScrollSpy(headings.map((h) => h.id));

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
        <ol className="article-toc__list mt-3 space-y-0.5 text-sm">
          {headings.map((h) => {
            const atual = ativo === h.id;
            return (
              <li
                key={h.id}
                className={`group flex items-center gap-1 ${h.level === 3 ? "ml-4" : ""}`}
              >
                <a
                  href={`#${h.id}`}
                  data-toc-link={h.id}
                  aria-current={atual ? "location" : undefined}
                  className={`flex-1 rounded border-l-2 py-1 pl-2 underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    atual
                      ? "border-accent font-medium text-foreground"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  {h.text}
                </a>
                <CopiarLinkSecao id={h.id} texto={h.text} />
              </li>
            );
          })}
        </ol>
      </details>
    </nav>
  );
};

export default ArticleToc;
