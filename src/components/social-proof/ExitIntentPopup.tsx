import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, MessageCircle, X, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSocialProofSettings } from "@/hooks/useSocialProofSettings";
import { useGeolocation } from "@/hooks/useGeolocation";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Gostaria de garantir meu atendimento técnico.";

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { city } = useGeolocation();
  const { settings } = useSocialProofSettings();

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse moves to top of viewport
    if (
      e.clientY <= 5 &&
      !hasShown &&
      settings.enabled &&
      settings.showExitIntent
    ) {
      setIsVisible(true);
      setHasShown(true);
    }
  }, [hasShown, settings.enabled, settings.showExitIntent]);

  useEffect(() => {
    // Don't show on mobile (exit intent doesn't make sense)
    if (window.innerWidth < 768) return;
    
    if (!settings.enabled || !settings.showExitIntent) return;

    // Only add listener after user has been on page for 10 seconds
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave, settings.enabled, settings.showExitIntent]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          "bg-card border border-border rounded-2xl shadow-2xl",
          "w-[calc(100vw-2rem)] max-w-md p-6",
          "animate-in zoom-in-95 fade-in duration-300"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-accent" />
          </div>

          <h2
            id="exit-intent-title"
            className="text-xl font-bold text-foreground mb-2"
          >
            Antes de sair...
          </h2>

          <p className="text-muted-foreground mb-4">
            Profissionais na sua região{city && ` (${city})`} estão recebendo solicitações agora.
            <br />
            <span className="text-sm">
              A disponibilidade pode variar ao longo do dia.
            </span>
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-trust" />
              <span>Profissionais verificados</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>Resposta em até 5min</span>
            </div>
          </div>

          {/* CTA */}
          <Button
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsApp}
            className="w-full gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Quero garantir meu atendimento
          </Button>

          <button
            onClick={handleClose}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Não, obrigado
          </button>
        </div>

        {/* CDC disclaimer */}
        <p className="text-[10px] text-muted-foreground/60 text-center mt-4">
          Consulte disponibilidade em tempo real. Sem compromisso.
        </p>
      </div>
    </>
  );
};
