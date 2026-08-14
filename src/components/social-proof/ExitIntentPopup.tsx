import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, MessageCircle, X, Shield, Clock, Star, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSocialProofSettings } from "@/hooks/useSocialProofSettings";
import { useGeolocation } from "@/hooks/useGeolocation";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";

const WHATSAPP_NUMBER = WA_NUMBER;
const WHATSAPP_MESSAGE = "Olá! Vi a oferta especial e gostaria de garantir meu atendimento técnico com desconto.";

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [countdown, setCountdown] = useState(299); // 4:59
  const { city } = useGeolocation();
  const { settings } = useSocialProofSettings();
  const lastScrollY = useRef(0);
  const scrollUpCount = useRef(0);

  // Desktop: mouse leave top
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !hasShown && settings.enabled && settings.showExitIntent) {
      setIsVisible(true);
      setHasShown(true);
    }
  }, [hasShown, settings.enabled, settings.showExitIntent]);

  // Mobile: detect rapid scroll up (intent to leave)
  const handleScroll = useCallback(() => {
    if (hasShown || !settings.enabled || !settings.showExitIntent) return;
    const currentY = window.scrollY;
    if (currentY < lastScrollY.current - 100 && currentY < 200) {
      scrollUpCount.current++;
      if (scrollUpCount.current >= 2) {
        setIsVisible(true);
        setHasShown(true);
      }
    } else if (currentY > lastScrollY.current) {
      scrollUpCount.current = 0;
    }
    lastScrollY.current = currentY;
  }, [hasShown, settings.enabled, settings.showExitIntent]);

  // Mobile: back button / visibility change
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "hidden" && !hasShown && settings.enabled && settings.showExitIntent) {
      // Will show when they come back
      setHasShown(true);
    }
    if (document.visibilityState === "visible" && hasShown && !isVisible) {
      setIsVisible(true);
    }
  }, [hasShown, isVisible, settings.enabled, settings.showExitIntent]);

  useEffect(() => {
    if (!settings.enabled || !settings.showExitIntent) return;

    const delay = setTimeout(() => {
      // Desktop
      if (window.innerWidth >= 768) {
        document.addEventListener("mouseleave", handleMouseLeave);
      }
      // Mobile — scroll up detection
      window.addEventListener("scroll", handleScroll, { passive: true });
      // Both — tab switch / back button
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }, 15000); // Wait 15s before arming

    return () => {
      clearTimeout(delay);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleMouseLeave, handleScroll, handleVisibilityChange, settings.enabled, settings.showExitIntent]);

  // Countdown timer
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isVisible]);

  // RODADA 8D — regressão do pop-up: Escape fecha e o foco volta ao elemento anterior.
  const focoAnterior = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (!isVisible) {
      focoAnterior.current?.focus?.();
      focoAnterior.current = null;
      return;
    }
    focoAnterior.current = (document.activeElement as HTMLElement) ?? null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isVisible, handleClose]);


  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const conteudo = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Wrapper de centralização — evita que a animação (transform) tire o modal da viewport */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overscroll-contain p-3 sm:p-4">
        <div
          className={cn(
            "relative m-auto w-full max-w-md",
            "max-h-[calc(100dvh-1.5rem)] overflow-y-auto",
            "bg-card border border-accent/20 rounded-2xl shadow-2xl",
            "p-5 sm:p-6",
            "animate-in zoom-in-95 fade-in duration-300"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-1.5 bg-accent/15 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Zap className="h-3.5 w-3.5" />
            OFERTA EXCLUSIVA
          </div>

          <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mb-3">
            <Gift className="h-7 w-7 text-accent" />
          </div>

          <h2 id="exit-intent-title" className="text-lg sm:text-xl font-bold text-foreground mb-2">
            Espere! Não vá embora ainda...
          </h2>

          <p className="text-muted-foreground text-sm mb-3">
            Garanta <span className="text-accent font-bold">diagnóstico técnico GRÁTIS</span> + desconto exclusivo para quem chamar agora{city && ` em ${city}`}.
          </p>

          {/* Countdown */}
          {countdown > 0 && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-primary/10 rounded-lg px-3 py-2 text-center min-w-[56px]">
                <span className="text-lg font-bold text-primary font-mono">{String(minutes).padStart(2, "0")}</span>
                <p className="text-[9px] text-muted-foreground">MIN</p>
              </div>
              <span className="text-primary font-bold text-lg">:</span>
              <div className="bg-primary/10 rounded-lg px-3 py-2 text-center min-w-[56px]">
                <span className="text-lg font-bold text-primary font-mono">{String(seconds).padStart(2, "0")}</span>
                <p className="text-[9px] text-muted-foreground">SEG</p>
              </div>
            </div>
          )}

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-accent" />
              <span>Diagnóstico honesto</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-trust" />
              <span>Garantia por escrito</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>Resposta em 5min</span>
            </div>
          </div>

          {/* CTA */}
          <Button
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsApp}
            className="w-full gap-2 text-base font-bold shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Quero Meu Desconto Agora
          </Button>

          <button
            onClick={handleClose}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Não, prefiro pagar preço cheio
          </button>
        </div>

        <p className="text-[9px] text-muted-foreground text-center mt-3">
          Oferta válida apenas para novos atendimentos. Sem compromisso.
        </p>
        </div>
      </div>
    </>
  );

  // Portal no <body>: qualquer ancestral com transform/filter cria um novo
  // containing block e tiraria o `fixed` da viewport (era a causa do modal
  // "escondido" que exigia rolagem).
  return typeof document === "undefined" ? conteudo : createPortal(conteudo, document.body);
};
