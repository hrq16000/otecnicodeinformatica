import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import heroBg1 from "@/assets/hero-curitiba-1.webp";
import heroBg2 from "@/assets/hero-curitiba-2.webp";

const WA_HERO = whatsappLink(
  "Olá! Preciso de um técnico em Curitiba. Pode me ajudar com meu equipamento?",
);

const trackHero = () =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", "hero_primary"));

const trustChips = [
  "Diagnóstico honesto",
  "Preço aprovado antes do reparo",
  "Atendimento local e direto",
];

/**
 * Hero da nova identidade "Centro técnico local premium".
 * Fundo grafite/petróleo, acento ciano controlado, sem partículas,
 * sem cursor trail, sem glow decorativo, sem nota/rating inventado.
 */
export const HeroPremium = () => {
  return (
    <section
      className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white"
      aria-label="Técnico em Curitiba para notebook, PC e informática"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(205_55%_16%)] to-[hsl(var(--hero-bg-end))]" />

      {/* Slideshow de fundo — pontos de Curitiba desfocados, cross-fade lento.
          Fica atrás do overlay para não interferir na leitura do texto. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="hero-slide hero-slide--a absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg1})` }}
        />
        <div
          className="hero-slide hero-slide--b absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg2})` }}
        />
      </div>

      {/* Overlay de legibilidade sobre o slideshow */}
      <div
        className="absolute inset-0 bg-[hsl(var(--hero-bg))]/72"
        aria-hidden="true"
      />

      {/* Grid técnico sutil — estático, sem animação/glow */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto py-14 md:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
            Assistência técnica em {siteConfig.primaryCity}
          </span>

          <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            Técnico em Curitiba para
            <span className="text-[hsl(var(--accent))]"> Notebook, PC e Informática</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Formatação, manutenção, upgrade, backup, recuperação de dados, redes e suporte
            empresarial com atendimento direto, diagnóstico honesto e agendamento via WhatsApp.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackHero}
              data-cta-location="hero_primary"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02]"
            >
              Iniciar atendimento
            </a>
            <a
              href="/servicos"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:bg-white/12"
            >
              Ver serviços
            </a>
          </div>

          <p className="mt-5 text-sm text-white/70">
            Atendimento em Curitiba e região • Diagnóstico a partir de {siteConfig.minPriceLabel} • Sem promessa falsa
          </p>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Compromissos do atendimento">
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
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
