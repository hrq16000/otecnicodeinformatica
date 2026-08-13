// @ts-nocheck
import { ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { brandConfig } from "@/lib/config";
import { HeroTrustBanner } from "@/components/HeroTrustBanner";

const WA_HERO = whatsappLink(
  "Olá! Quero um orçamento. Vou descrever o equipamento e o que está acontecendo com ele.",
);

const trackHero = () =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", "hero_primary"));

const trustChips = [
  "Você descreve o sintoma, não o serviço",
  "Nada é executado sem orçamento aprovado",
  "Casa, home office e empresa",
];

// Links diretos para os serviços núcleo — distribui a navegação a partir da home.
const SERVICE_LINKS: Array<{ label: string; to: string }> = [
  { label: "Formatação", to: "/servicos/formatacao" },
  { label: "Manutenção de PC", to: "/servicos/manutencao-de-computador" },
  { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
  { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
  { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
  { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
  { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
  { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial" },
];

/**
 * RODADA 2 — Hero da nova marca.
 * Linguagem técnica (não turística): o visitante entende em segundos o que
 * fazemos, para quem, onde e como inicia o atendimento. Sem slideshow,
 * sem partículas, sem claim não comprovado.
 */
export const HeroPremium = () => (
  <section
    className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white"
    aria-label={`${brandConfig.brandName} — assistência técnica em informática`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(205_55%_16%)] to-[hsl(var(--hero-bg-end))]" />

    {/* Grid técnico sutil — estático, sem custo de imagem. */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.18),transparent_55%)]"
      aria-hidden="true"
    />

    <div className="container relative z-10 mx-auto py-10 md:py-20">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-[hsl(var(--accent))]" aria-hidden="true" />
          Assistência técnica em informática
        </p>

        <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
          Seu computador precisa funcionar.
          <span className="text-[hsl(var(--accent))]"> Nós cuidamos da parte técnica.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          Notebook, PC, All in One, upgrade de peça, sistema travado ou rede instável — em casa,
          no home office ou na empresa. Você conta o que está acontecendo; a parte de descobrir a
          causa é nossa.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={WA_HERO}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackHero}
            data-cta-location="hero_primary"
            data-wa-source="whatsapp_cta"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--hero-bg))]"
          >
            Solicitar diagnóstico
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="/servicos"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--hero-bg))]"
          >
            Ver serviços
          </a>
        </div>

        <p className="mt-4 text-sm text-white/80">
          {siteConfig.primaryCity} e São José dos Pinhais • demais municípios da Região
          Metropolitana conforme a modalidade • atendimentos a partir de {siteConfig.minPriceLabel}
        </p>

        <nav className="mt-6" aria-label="Serviços de informática">
          <ul className="flex flex-wrap gap-2">
            {SERVICE_LINKS.map((s, i) => (
              <li key={s.to} className={i >= 4 ? "hidden sm:block" : undefined}>
                <a
                  href={s.to}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/90 transition-colors hover:border-[hsl(var(--accent))] hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/tecnico-informatica-curitiba"
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/90 transition-colors hover:border-[hsl(var(--accent))] hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Técnico em Curitiba
              </a>
            </li>
            <li>
              <a
                href="/servicos"
                className="inline-flex min-h-11 items-center rounded-full border border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/15 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[hsl(var(--accent))]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Ver todos os serviços →
              </a>
            </li>
          </ul>
        </nav>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Compromissos do atendimento">
          {trustChips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[13px] font-medium text-white/90"
            >
              <span className="text-[hsl(var(--accent))]" aria-hidden="true">▸</span>
              {chip}
            </li>
          ))}
        </ul>

        <div className="mt-6 max-w-lg">
          <HeroTrustBanner />
        </div>
      </div>
    </div>
  </section>
);

export default HeroPremium;
