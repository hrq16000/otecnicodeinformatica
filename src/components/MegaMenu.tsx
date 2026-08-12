import { useEffect, useRef, useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

/**
 * MEGA-MENU CONTEXTUAL (desktop).
 *
 * A navegação não lista "serviços" em ordem alfabética: ela abre pelo modo
 * como a pessoa chega — pelo problema, pelo equipamento, pela empresa ou
 * procurando um profissional. Cada coluna termina em um destino real que já
 * existe no portal.
 */

export type MegaLink = { label: string; href: string; hint?: string };

export type MegaGrupo = {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Link direto quando o grupo não tem submenu. */
  href?: string;
  colunas?: { titulo: string; links: MegaLink[] }[];
  destaque?: { titulo: string; texto: string; cta: string; href: string };
};

export const MegaMenu = ({ grupos }: { grupos: MegaGrupo[] }) => {
  const [aberto, setAberto] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const fecharTimer = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(null);
    };
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setAberto(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  const agendarFechamento = () => {
    if (fecharTimer.current) window.clearTimeout(fecharTimer.current);
    fecharTimer.current = window.setTimeout(() => setAberto(null), 120);
  };
  const cancelarFechamento = () => {
    if (fecharTimer.current) window.clearTimeout(fecharTimer.current);
  };

  return (
    <div
      ref={wrapRef}
      className="hidden items-center gap-0.5 text-sm font-semibold lg:flex"
      onMouseLeave={agendarFechamento}
      onMouseEnter={cancelarFechamento}
    >
      {grupos.map((g) => {
        const temPainel = Boolean(g.colunas?.length);
        const ativo = aberto === g.id;

        if (!temPainel) {
          return (
            <a
              key={g.id}
              href={g.href}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {g.icon ? <g.icon className="h-4 w-4 text-accent/70" aria-hidden="true" /> : null}
              {g.label}
            </a>
          );
        }

        return (
          <div key={g.id} className="relative">
            <button
              type="button"
              aria-expanded={ativo}
              aria-haspopup="true"
              onClick={() => setAberto(ativo ? null : g.id)}
              onMouseEnter={() => {
                cancelarFechamento();
                // Hover só troca de coluna quando algum painel já está aberto:
                // assim o clique continua sendo um toggle previsível.
                setAberto((atual) => (atual ? g.id : atual));
              }}
              onFocus={() => setAberto(g.id)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                ativo ? "bg-accent/10 text-accent" : "text-foreground/80 hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {g.icon ? <g.icon className="h-4 w-4 text-accent/70" aria-hidden="true" /> : null}
              {g.label}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${ativo ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {ativo && (
              <div
                role="group"
                aria-label={g.label}
                className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-[min(92vw,860px)] -translate-x-1/2 rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-xl)]"
              >
                <div className="grid gap-8 md:grid-cols-[2fr_2fr_1.4fr]">
                  {g.colunas?.map((col) => (
                    <div key={col.titulo}>
                      <p className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {col.titulo}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {col.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              onClick={() => setAberto(null)}
                              className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground/85 transition-colors hover:bg-accent/10 hover:text-accent"
                            >
                              {l.label}
                              {l.hint ? (
                                <span className="block text-xs font-normal text-muted-foreground">
                                  {l.hint}
                                </span>
                              ) : null}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {g.destaque && (
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="font-heading text-sm font-bold text-foreground">
                        {g.destaque.titulo}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {g.destaque.texto}
                      </p>
                      <a
                        href={g.destaque.href}
                        onClick={() => setAberto(null)}
                        className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-accent px-4 text-xs font-bold text-accent-foreground"
                      >
                        {g.destaque.cta}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MegaMenu;
