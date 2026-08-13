import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Search, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandConfig } from "@/lib/config";
import { CAMINHOS_ENTRADA, filtrarSintomas } from "@/lib/homeContextos";

/**
 * Navegação interna não é lead: registramos apenas engajamento, sem tocar
 * em `generate_lead` nem nas conversões do Ads (isso é do funil WhatsApp).
 */
const track = (loc: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "home_navegacao", {
    event_category: "engagement",
    click_location: loc,
    page_path: window.location.pathname,
  });
};


/**
 * REDESIGN — primeira dobra orientada a problema.
 *
 * Em vez de "Técnico de Informática em Curitiba" seguido de uma grade de
 * serviços, a Home abre com a única pergunta que o visitante sabe responder:
 * o que está acontecendo. O catálogo aparece depois, como consequência.
 */
export const HeroTriagem = () => {
  const [consulta, setConsulta] = useState("");
  const sugestoes = useMemo(() => filtrarSintomas(consulta), [consulta]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const destino = sugestoes[0]?.href ?? "/diagnostico-tecnico";
    void track("hero_triagem_busca");
    window.location.assign(destino);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-background"
      aria-label={`${brandConfig.brandName} — comece pelo problema`}
    >
      {/* Textura de bancada: linhas discretas, sem custo de imagem. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground) / 0.09) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto py-10 md:py-16">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--categoria)/0.12)] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-[hsl(var(--categoria))]">
            <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
            Central de soluções técnicas
          </p>

          <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Qual problema de tecnologia precisamos resolver hoje?
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Computadores, notebooks, redes, Wi-Fi, sistemas, dados e suporte para pessoas e
            empresas. Conte o que aconteceu com suas palavras — a parte técnica fica com a gente.
          </p>
        </div>

        {/* Campo principal: "O que está acontecendo?" */}
        <form
          onSubmit={enviar}
          role="search"
          aria-label="Descreva o que está acontecendo"
          className="mt-8 max-w-3xl"
        >
          <label
            htmlFor="triagem-sintoma"
            className="block font-heading text-sm font-semibold text-foreground"
          >
            O que está acontecendo?
          </label>
          <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-lg)] sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                id="triagem-sintoma"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Ex.: liga e desliga sozinho, Wi-Fi cai, perdi arquivos…"
                autoComplete="off"
                className="min-h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/80"
              />
            </div>
            <button
              type="submit"
              data-cta-location="hero_triagem_busca"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 font-heading text-base font-bold text-accent-foreground motion-surface hover:shadow-[0_18px_40px_-12px_hsl(var(--accent)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Diagnosticar meu problema
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Sintomas mais frequentes">
            {sugestoes.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  onClick={() => track("hero_sintoma_chip")}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </form>

        {/* Quatro caminhos de entrada, cada um com CTA contextual. */}
        <nav
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Por onde você quer começar"
        >
          {CAMINHOS_ENTRADA.map((c) => (
            <a
              key={c.id}
              href={c.href}
              onClick={() => track(`hero_caminho_${c.id}`)}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">{c.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.descricao}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
                {c.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </nav>

        <p className="mt-6 text-sm text-muted-foreground">
          {siteConfig.primaryCity} e São José dos Pinhais • demais municípios da Região
          Metropolitana conforme a modalidade • atendimentos a partir de {siteConfig.minPriceLabel}
        </p>
      </div>
    </section>
  );
};

export default HeroTriagem;
