import { useState } from "react";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE =
  "Olá! Preciso de suporte técnico em Curitiba. Pode me passar um orçamento?";
const SCHEDULE_MESSAGE =
  "Olá! Quero agendar um atendimento técnico. Pode me ajudar com horários disponíveis?";

const trackHeroWhatsApp = () => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", "hero"));
};
const trackHeroSchedule = () => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("chatbot", "hero_schedule"));
};

export const FastHeroSection = () => {
  const [showScheduling, setShowScheduling] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const scheduleUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(SCHEDULE_MESSAGE)}`;

  return (
    <section
      className="hero-gradient relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-12"
      aria-label="Técnico de informática em Curitiba — atendimento hoje"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(var(--hero-bg))] to-[hsl(var(--hero-bg-end))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.16),transparent_45%),radial-gradient(ellipse_at_bottom_left,hsl(var(--primary-foreground)/0.08),transparent_50%)]" />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            {/* Prova de autoridade mensurável (substitui o "+20 anos" abstrato) */}
            <div className="mb-5 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 backdrop-blur-md lg:justify-start">
              <span className="text-sm font-semibold tracking-wide text-yellow-300" aria-hidden="true">★ 4.9/5</span>
              <span className="text-sm font-medium text-white/90">+1.200 atendimentos</span>
              <span className="hidden text-white/40 sm:inline" aria-hidden="true">·</span>
              <span className="text-sm font-medium text-white/90">+20 anos em Curitiba</span>
            </div>

            {/* H1 cirúrgico: serviço + cidade + ancoragem de preço + urgência local */}
            <h1 className="mb-4 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:mb-5 md:text-5xl lg:text-[3.4rem]">
              Conserto de PC e Notebook
              <br />
              <span className="text-accent drop-shadow-sm">em Curitiba — Hoje</span>
              <span className="mt-2 block text-lg font-semibold tracking-normal text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:text-xl md:text-2xl">
                A partir de <span className="text-yellow-300 font-extrabold">R$ 99,99</span> · Atendimento a domicílio
              </span>
            </h1>

            {/* Subhead remove objeção principal: "vai me cobrar caro sem dizer antes?" */}
            <p className="mx-auto mb-5 max-w-xl text-base leading-relaxed text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] md:text-lg lg:mx-0">
              <strong className="text-white">Diagnóstico grátis</strong> e você aprova o preço{" "}
              <strong className="text-white">antes</strong> de qualquer reparo. Formatação, remoção de vírus, upgrade
              SSD e mais — com garantia.
            </p>

            {/* Trust chips reorientados: cada um quebra uma objeção real */}
            <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="Garantias do serviço">
              {[
                { icon: "✓", text: "Garantia de 90 dias" },
                { icon: "✓", text: "Preço fixo aprovado por você" },
                { icon: "✓", text: "Atendimento no mesmo dia" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.09] px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
                >
                  <span className="text-yellow-300" aria-hidden="true">{icon}</span>
                  {text}
                </span>
              ))}
            </div>

            {/* CTA primária dominante (~2x peso visual) + secundária como ghost */}
            <div className="flex flex-col justify-center gap-2.5 sm:flex-row sm:items-stretch lg:justify-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackHeroWhatsApp}
                data-cta-location="hero_primary"
                aria-label="Falar com técnico no WhatsApp agora — orçamento gratuito"
                className="group inline-flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl bg-[hsl(var(--whatsapp))] px-6 py-2 text-base font-extrabold text-primary-foreground shadow-[0_12px_30px_-8px_hsl(145_63%_42%/0.55)] transition-all hover:scale-[1.02] hover:bg-[hsl(var(--whatsapp-hover))] sm:flex-1"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">💬</span>
                  Falar no WhatsApp · R$ 99,99
                </span>
                <span className="text-[11px] font-medium text-white/85 sm:text-xs">
                  Resposta em ~5 min · Orçamento grátis
                </span>
              </a>
              <button
                type="button"
                onClick={() => setShowScheduling(true)}
                data-cta-location="hero_secondary"
                aria-label="Agendar atendimento técnico"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:text-base"
              >
                <span aria-hidden="true">📅</span>
                Prefiro agendar
              </button>
            </div>

            {/* Linha de cobertura abaixo da CTA — não compete com o botão */}
            <p className="mt-5 text-sm text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
              <span aria-hidden="true">📍</span> Atende{" "}
              <strong className="text-white/95">Curitiba</strong>, São José dos Pinhais, Araucária, Campo Largo, Pinhais
              e região
            </p>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <img
                alt="Técnico de informática profissional realizando conserto de computador em Curitiba"
                className="relative w-64 rounded-2xl shadow-2xl sm:w-80 md:w-96 lg:w-auto lg:max-w-md"
                loading="eager"
                decoding="async"
                width="400"
                height="400"
                src="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-480.webp"
                srcSet="/lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-240.webp 240w, /lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-360.webp 360w, /lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-480.webp 480w, /lovable-uploads/77ec0b6a-9ce8-4e20-b893-7eff7ec03859-800.webp 800w"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
              />
              {/* Badge da imagem: prova concreta, não claim genérico */}
              <div className="absolute -bottom-3 -right-3 rounded-lg bg-accent px-3 py-2 text-xs font-extrabold text-accent-foreground shadow-lg sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <span aria-hidden="true">🛡️</span>
                  <div className="text-left leading-tight">
                    <div>Garantia 90 dias</div>
                    <div className="text-[10px] font-semibold opacity-90 sm:text-[11px]">Sem custo se não resolver</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA mobile: ponto de retorno permanente para WhatsApp durante scroll */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[var(--z-mobile-drawer)] flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackHeroWhatsApp}
          data-cta-location="hero_sticky_mobile"
          aria-label="WhatsApp — R$ 99,99, resposta em ~5 min"
          className="pointer-events-auto inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-[hsl(var(--whatsapp))] px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)]"
        >
          <span aria-hidden="true">💬</span>
          WhatsApp · R$ 99,99
          <span className="text-[11px] font-medium text-white/85">· resposta ~5 min</span>
        </a>
      </div>

      {showScheduling && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-title"
          onClick={() => setShowScheduling(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-background p-5 text-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="schedule-title" className="mb-2 text-xl font-bold">Agendar atendimento</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Envie pelo WhatsApp o equipamento, o problema e o melhor horário. Confirmamos a disponibilidade em
              minutos.
            </p>
            <a
              href={scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackHeroSchedule}
              data-cta-location="hero_schedule_modal"
              className="mb-2 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[hsl(var(--whatsapp))] font-bold text-primary-foreground"
            >
              Continuar no WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setShowScheduling(false)}
              className="inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-border font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
