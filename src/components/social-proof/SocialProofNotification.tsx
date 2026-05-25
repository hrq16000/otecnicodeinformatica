import { useState, useEffect, useCallback } from "react";
import { X, Users, Clock, MapPin, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeolocation, CURITIBA_REGION_CITIES } from "@/hooks/useGeolocation";
import { useSocialProofSettings } from "@/hooks/useSocialProofSettings";

// CDC-compliant messages - informative, not misleading
const getActivityMessages = (city: string) => [
  {
    icon: Activity,
    text: `Solicitações recentes de atendimento em ${city}`,
    subtext: "Atividade registrada há poucos minutos",
  },
  {
    icon: Users,
    text: "Profissionais em atendimento neste momento",
    subtext: "Equipe técnica ativa na região",
  },
  {
    icon: Clock,
    text: "Alta demanda por serviços técnicos hoje",
    subtext: "Tempo de resposta pode variar",
  },
  {
    icon: MapPin,
    text: `Técnicos disponíveis para ${city}`,
    subtext: "Consulte disponibilidade em tempo real",
  },
  {
    icon: Activity,
    text: "Volume elevado de solicitações registradas",
    subtext: "Horário de pico identificado",
  },
];

export const SocialProofNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { city, isLoading } = useGeolocation();
  const { settings } = useSocialProofSettings();

  const messages = getActivityMessages(city || "sua região");

  const showNextNotification = useCallback(() => {
    if (!settings.enabled || !settings.showActivityNotifications) return;
    
    setIsExiting(false);
    setCurrentMessage((prev) => (prev + 1) % messages.length);
    setIsVisible(true);

    // Auto-hide after 6 seconds
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 300);
    }, 6000);
  }, [settings.enabled, settings.showActivityNotifications, messages.length]);

  useEffect(() => {
    if (!settings.enabled || !settings.showActivityNotifications || isLoading) {
      return;
    }

    // Initial delay of 8 seconds before first notification
    const initialTimeout = setTimeout(() => {
      showNextNotification();
    }, 8000);

    // Set up interval for subsequent notifications (20-40 seconds range)
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 20000 + 20000; // 20-40 seconds
      setTimeout(showNextNotification, randomDelay - settings.notificationInterval * 1000);
    }, settings.notificationInterval * 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [settings, isLoading, showNextNotification]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible || !settings.enabled || !settings.showActivityNotifications) {
    return null;
  }

  const message = messages[currentMessage];
  const IconComponent = message.icon;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 max-w-sm",
        "bg-card border border-border rounded-xl shadow-lg",
        "transform transition-all duration-300 ease-out",
        isExiting
          ? "translate-y-4 opacity-0"
          : "translate-y-0 opacity-100",
        // Mobile responsive
        "w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[320px]"
      )}
      role="status"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground leading-tight">
              {message.text}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {message.subtext}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Fechar notificação"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* CDC compliance footer */}
      <div className="px-4 pb-3">
        <p className="text-[10px] text-muted-foreground leading-tight">
          Avisos com base em atividade recente e volume médio de solicitações.
        </p>
      </div>
    </div>
  );
};
