import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { HERO_SLIDES, shuffleSlides } from "./heroSlides";
import { HeroTrustBanner } from "@/components/HeroTrustBanner";

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

// Links diretos para os 8 serviços + hub — distribui a navegação a partir da home.
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

const AUTOPLAY_MS = 6500;

/**
 * Hero da identidade "Centro técnico local premium".
 * Slideshow de pontos turísticos de Curitiba (ordem aleatória, cross-fade),
 * com controles acessíveis (pausar/retomar, anterior/próximo), imagens nítidas
 * em AVIF/WebP responsivos e scrim forte para leitura do texto.
 * Respeita prefers-reduced-motion (sem autoplay; controles manuais seguem ativos).
 */
export const HeroPremium = () => {
  const slides = useMemo(() => shuffleSlides(HERO_SLIDES), []);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + slides.length) % slides.length),
    [slides.length],
  );
  const goTo = useCallback((i: number) => setActive(i), []);

  // Detecta prefers-reduced-motion (reativo).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Autoplay — desligado quando pausado, com reduced-motion, ou 1 slide só.
  const autoplayOn = !paused && !reduceMotion && slides.length > 1;
  useEffect(() => {
    if (!autoplayOn) return;
    timerRef.current = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoplayOn, slides.length, active]);

  const activeCaption = slides[active]?.caption;
  const canToggle = !reduceMotion && slides.length > 1;

  return (
    <section
      className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white"
      aria-label="Técnico em Curitiba para notebook, PC e informática"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(205_55%_16%)] to-[hsl(var(--hero-bg-end))]" />

      {/* Slideshow de fundo — pontos turísticos de Curitiba, nítidos em AVIF/WebP. */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
        role="group"
        aria-roledescription="carrossel"
        aria-label="Pontos turísticos de Curitiba"
      >
        {slides.map((slide, i) => (
          <picture key={slide.place}>
            <source type="image/avif" srcSet={slide.avif} sizes="100vw" />
            <source type="image/webp" srcSet={slide.webp} sizes="100vw" />
            <img
              src={slide.fallback}
              srcSet={slide.jpg}
              sizes="100vw"
              alt=""
              width={1920}
              height={1088}
              loading={i === 0 ? "eager" : "lazy"}
              // @ts-ignore - fetchpriority é atributo HTML válido
              fetchpriority={i === 0 ? "high" : "low"}
              decoding="async"
              className={`hero-photo absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              } ${i === active && autoplayOn ? "hero-photo--pan" : ""}`}
            />
          </picture>
        ))}
      </div>

      {/* Scrim de legibilidade — gradiente lateral forte + véu inferior. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-bg))]/95 via-[hsl(var(--hero-bg))]/80 to-[hsl(var(--hero-bg))]/45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(var(--hero-bg))]/85 to-transparent"
        aria-hidden="true"
      />

      {/* Grid técnico sutil — estático */}
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
        <div className="hero-reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
            Assistência técnica em {siteConfig.primaryCity}
          </span>

          <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_2px_12px_hsl(var(--hero-bg)/0.6)] sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            Técnico em Curitiba para
            <span className="text-[hsl(var(--accent))]"> Notebook, PC e Informática</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-[0_1px_8px_hsl(var(--hero-bg)/0.7)] md:text-lg">
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
              data-wa-source="whatsapp_cta"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--hero-bg))]"
            >
              Iniciar atendimento
            </a>
            <a
              href="/servicos"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--hero-bg))]"
            >
              Ver serviços
            </a>
          </div>

          <p className="mt-5 text-sm text-white/80">
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

          <div className="mt-7 max-w-lg">
            <HeroTrustBanner />
          </div>
        </div>
      </div>

      {/* Controles e legenda do slideshow */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 pb-4">
          {activeCaption && (
            <span
              key={activeCaption}
              aria-live="polite"
              className="hero-caption inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:text-[13px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
              {activeCaption}
            </span>
          )}

          <div className="ml-auto flex items-center gap-1.5">
            {/* Pausar / retomar (oculto sob reduced-motion) */}
            {canToggle && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Retomar apresentação de slides" : "Pausar apresentação de slides"}
                aria-pressed={paused}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
              </button>
            )}

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Slide anterior"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Indicadores clicáveis */}
                <span className="mx-1 flex items-center gap-1.5" role="tablist" aria-label="Selecionar ponto turístico">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.place}
                      type="button"
                      role="tab"
                      aria-label={`Ver ${slide.place}`}
                      aria-selected={i === active}
                      onClick={() => goTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        i === active ? "w-6 bg-[hsl(var(--accent))]" : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </span>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próximo slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
