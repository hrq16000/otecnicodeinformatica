import { useState } from "react";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const trackHeroWhatsApp = () => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", "hero"));
};

export const FastHeroSection = () => {
  const [showScheduling, setShowScheduling] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="hero-gradient relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-12" aria-label="Técnico de informática em Curitiba">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(var(--hero-bg))] to-[hsl(var(--hero-bg-end))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.16),transparent_45%),radial-gradient(ellipse_at_bottom_left,hsl(var(--primary-foreground)/0.08),transparent_50%)]" />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.08] px-4 py-2 backdrop-blur-md">
              <span className="text-sm font-medium tracking-wide text-white/90">★ +20 anos atendendo Curitiba e região</span>
            </div>

            <h1 className="mb-5 font-heading text-3xl font-bold leading-[1.15] tracking-normal text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-[3.5rem]">
              Técnico de Informática
              <br />
              <span className="text-accent drop-shadow-sm">em Curitiba</span>
              <span className="mt-2 block min-h-[1.5em] break-words text-xl font-semibold tracking-normal text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:text-2xl md:text-3xl">
                e Região Metropolitana
              </span>
            </h1>

            <p className="mx-auto mb-5 max-w-xl text-lg leading-relaxed text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] md:text-xl lg:mx-0">
              <strong className="text-white">Conserto de computadores e notebooks</strong> com atendimento
              <strong className="text-white"> a domicílio</strong> no mesmo dia. Formatação, remoção de vírus,
              upgrade SSD e mais.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {["Atendimento no mesmo dia", "Garantia em todos os serviços", "A domicílio ou remoto"].map((text) => (
                <span key={text} className="rounded-full border border-white/[0.08] bg-white/[0.07] px-3 py-1.5 text-[13px] text-white/95 backdrop-blur-sm">
                  {text}
                </span>
              ))}
            </div>

            <p className="mb-7 text-sm text-white/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
              Atendemos: <strong className="text-white/95">Curitiba</strong>, <strong className="text-white/95">São José dos Pinhais</strong>, <strong className="text-white/95">Araucária</strong>, <strong className="text-white/95">Campo Largo</strong> e <strong className="text-white/95">Pinhais</strong>
            </p>

            <div className="flex flex-col justify-center gap-3.5 sm:flex-row lg:justify-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackHeroWhatsApp}
                aria-label="Chamar técnico no WhatsApp"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[hsl(var(--whatsapp))] px-6 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-[hsl(var(--whatsapp-hover))]"
              >
                Chamar Técnico Agora
              </a>
              <button
                type="button"
                onClick={() => setShowScheduling(true)}
                aria-label="Agendar atendimento técnico online"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 text-base font-bold text-accent-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-accent/90"
              >
                Agendar Atendimento
              </button>
            </div>

            <div className="mt-5 text-sm text-white/90">
              <span className="font-semibold text-white">Resposta em até 5 minutos</span> • Orçamento sem compromisso
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <img
                alt="Técnico de informática profissional realizando conserto de computador em Curitiba"
                className="relative w-64 rounded-2xl shadow-2xl sm:w-80 md:w-96 lg:w-auto lg:max-w-md"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="400"
                height="400"
                src="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-480.webp"
                srcSet="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-240.webp 240w, /lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-360.webp 360w, /lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-480.webp 480w, /lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-800.webp 800w"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
              />
              <div className="absolute -bottom-3 -right-3 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-lg">✓ Atendimento Imediato</div>
            </div>
          </div>
        </div>
      </div>

      {showScheduling && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/50 p-4" role="dialog" aria-modal="true" aria-label="Agendamento">
          <div className="w-full max-w-sm rounded-xl bg-background p-5 text-foreground shadow-2xl">
            <h2 className="mb-2 text-xl font-bold">Agendar atendimento</h2>
            <p className="mb-4 text-sm text-muted-foreground">Para agilizar, chame pelo WhatsApp e envie o melhor horário.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mb-2 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[hsl(var(--whatsapp))] font-bold text-primary-foreground">Continuar no WhatsApp</a>
            <button type="button" onClick={() => setShowScheduling(false)} className="inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-border font-semibold">Fechar</button>
          </div>
        </div>
      )}
    </section>
  );
};