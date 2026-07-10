import { useEffect, useMemo, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import heroJardimBotanico from "@/assets/hero-jardim-botanico.jpg";
import heroOscarNiemeyer from "@/assets/hero-oscar-niemeyer.jpg";
import heroOperaDeArame from "@/assets/hero-opera-de-arame.jpg";
import heroParqueTangua from "@/assets/hero-parque-tangua.jpg";

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

/** Pontos turísticos de Curitiba usados como pano de fundo do hero. */
const HERO_SLIDES = [
  {
    src: heroJardimBotanico,
    place: "Jardim Botânico",
    caption: "Jardim Botânico — o cartão-postal de Curitiba",
  },
  {
    src: heroOscarNiemeyer,
    place: "Museu Oscar Niemeyer",
    caption: "Museu Oscar Niemeyer — o Olho de Curitiba",
  },
  {
    src: heroOperaDeArame,
    place: "Ópera de Arame",
    caption: "Ópera de Arame — no coração do parque",
  },
  {
    src: heroParqueTangua,
    place: "Parque Tanguá",
    caption: "Parque Tanguá — mirante e cascata",
  },
] as const;

/** Embaralha uma cópia do array (Fisher–Yates). */
function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Hero da identidade "Centro técnico local premium".
 * Fundo grafite/petróleo com slideshow de pontos turísticos de Curitiba
 * (ordem aleatória, cross-fade lento, levemente desfocado para manter a
 * leitura do texto). Sem partículas, sem cursor trail, sem glow decorativo,
 * sem nota/rating inventado.
 */
export const HeroPremium = () => {
  // Ordem aleatória definida uma vez por carregamento.
  const slides = useMemo(() => shuffle(HERO_SLIDES), []);
  const [active, setActive] = useState(0);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotionOk(!reduce);
    if (reduce || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const activeCaption = slides[active]?.caption;

  return (
    <section
      className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white"
      aria-label="Técnico em Curitiba para notebook, PC e informática"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(205_55%_16%)] to-[hsl(var(--hero-bg-end))]" />

      {/* Slideshow de fundo — pontos turísticos de Curitiba, cross-fade lento.
          Levemente desfocado + overlay para não interferir na leitura do texto. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {slides.map((slide, i) => (
          <img
            key={slide.place}
            src={slide.src}
            alt=""
            width={1600}
            height={912}
            loading={i === 0 ? "eager" : "lazy"}
            // @ts-ignore - fetchpriority é atributo HTML válido
            fetchpriority={i === 0 ? "high" : undefined}
            decoding="async"
            className={`hero-photo absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            } ${motionOk ? "hero-photo--pan" : ""}`}
          />
        ))}
      </div>

      {/* Overlay de legibilidade sobre o slideshow */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-bg))]/92 via-[hsl(var(--hero-bg))]/80 to-[hsl(var(--hero-bg))]/60"
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
        <div className="hero-reveal max-w-3xl">
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
              data-wa-source="whatsapp_cta"
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

      {/* Legenda do ponto turístico — frase sobre a foto */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 pb-4">
          {activeCaption && (
            <span
              key={activeCaption}
              className="hero-caption inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:text-[13px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
              {activeCaption}
            </span>
          )}
          {/* Indicadores do slideshow */}
          <span className="pointer-events-auto ml-auto flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.place}
                type="button"
                aria-label={`Ver ${slide.place}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-[hsl(var(--accent))]" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
