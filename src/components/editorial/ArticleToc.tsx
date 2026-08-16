import { useEffect, useRef, useState } from "react";
import { Check, Link2, List } from "lucide-react";
import { toast } from "sonner";
import type { TocHeading } from "@/lib/articleToc";
import { trackTocInteraction } from "@/lib/analytics";

/**
 * ÍNDICE DO ARTIGO (Rodada 9B.1 → 9B.3).
 *
 * • `<nav aria-label="Índice do artigo">` com links reais (âncoras),
 *   navegáveis por teclado e por leitor de tela;
 * • mobile: recolhido por padrão via `<details>` nativo (não empurra o texto);
 *   desktop: sempre aberto por CSS;
 * • scroll spy client-only — o primeiro render é idêntico ao SSR;
 * • "copiar link da seção": feedback anunciado por `aria-live="polite"`,
 *   foco permanece no botão e o anel de foco continua visível;
 * • analytics: clique no item do índice e cópia de seção.
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
          const topo = [...visiveis.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setAtivo(topo);
        }
      },
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

const CopiarLinkSecao = ({
  id,
  texto,
  posicao,
  anunciar,
}: {
  id: string;
  texto: string;
  posicao: number;
  anunciar: (mensagem: string) => void;
}) => {
  const [copiado, setCopiado] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);

  const copiar = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      anunciar(`Não foi possível copiar o link da seção ${texto}.`);
      toast.error("Não foi possível copiar o link.");
      botaoRef.current?.focus();
      return;
    }
    setCopiado(true);
    anunciar(`Link da seção ${texto} copiado.`);
    toast.success("Link da seção copiado.");
    trackTocInteraction("copy_link", id, texto, posicao);
    // O foco permanece no próprio botão: nada é removido do DOM.
    botaoRef.current?.focus();
    window.setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button
      ref={botaoRef}
      type="button"
      onClick={copiar}
      aria-label={copiado ? `Link da seção ${texto} copiado` : `Copiar link da seção ${texto}`}
      className="article-toc__copy inline-flex h-11 w-11 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
  const [aviso, setAviso] = useState("");

  if (!headings.length) return null;

  return (
    <nav aria-label="Índice do artigo" className="not-prose my-8">
      {/* Mobile: recolhido por padrão (CSS reabre em md+ via .article-toc). */}
      <details className="article-toc rounded-xl border border-border bg-muted/40 p-4">
        <summary className="article-toc__summary flex cursor-pointer list-none items-center gap-2 font-heading text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <List className="h-4 w-4 text-accent" aria-hidden="true" />
          Índice do artigo
          <span className="ml-auto text-xs font-normal text-muted-foreground">{headings.length} seções</span>
        </summary>
        <p className="article-toc__title hidden items-center gap-2 font-heading text-sm font-semibold text-foreground md:flex">
          <List className="h-4 w-4 text-accent" aria-hidden="true" />
          Índice do artigo
        </p>
        <ol className="article-toc__list mt-3 space-y-0.5 text-sm">
          {headings.map((h, i) => {
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
                  onClick={() => trackTocInteraction("navigate", h.id, h.text, i + 1)}
                  className={`flex-1 rounded border-l-2 py-1 pl-2 underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    atual
                      ? "border-accent font-medium text-foreground"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  {h.text}
                </a>
                <CopiarLinkSecao id={h.id} texto={h.text} posicao={i + 1} anunciar={setAviso} />
              </li>
            );
          })}
        </ol>
      </details>
      <p aria-live="polite" role="status" className="sr-only">
        {aviso}
      </p>
    </nav>
  );
};

export default ArticleToc;
