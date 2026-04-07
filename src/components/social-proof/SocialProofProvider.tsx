import { useState, useEffect, useRef } from "react";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { X, Users, Clock, MapPin, Activity, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useSocialProofSettings } from "@/hooks/useSocialProofSettings";

const getActivityMessages = (city: string) => [
  { icon: Activity, text: `Solicitações recentes de atendimento em ${city}`, subtext: "Atividade registrada há poucos minutos" },
  { icon: Users, text: "Profissionais em atendimento neste momento", subtext: "Equipe técnica ativa na região" },
  { icon: Clock, text: "Alta demanda por serviços técnicos hoje", subtext: "Tempo de resposta pode variar" },
  { icon: MapPin, text: `Técnicos disponíveis para ${city}`, subtext: "Consulte disponibilidade em tempo real" },
  { icon: Activity, text: "Volume elevado de solicitações registradas", subtext: "Horário de pico identificado" },
];

const getScarcityData = () => {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isBusinessHours = hour >= 8 && hour < 20;
  const isPeakHour = !isWeekend && ((hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16));

  if (!isBusinessHours) return { availableTechnicians: 0, waitTime: "Amanhã a partir das 8h", isPeakHour: false };
  if (isPeakHour) return { availableTechnicians: Math.floor(Math.random() * 2) + 1, waitTime: `${Math.floor(Math.random() * 20) + 30} minutos`, isPeakHour: true };
  return { availableTechnicians: Math.floor(Math.random() * 3) + 2, waitTime: `${Math.floor(Math.random() * 15) + 15} minutos`, isPeakHour: false };
};

type ProofType = "notification" | "scarcity";

export const SocialProofProvider = () => {
  const [activeType, setActiveType] = useState<ProofType | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [scarcityData, setScarcityData] = useState(getScarcityData());
  const { city } = useGeolocation();
  const { settings } = useSocialProofSettings();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef(0);
  const cityRef = useRef(city);
  cityRef.current = city;

  const clearScheduled = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!settings.enabled) return;
    if (!settings.showActivityNotifications && !settings.showScarcityMessages) return;

    const showNext = () => {
      const cycle = cycleRef.current;
      cycleRef.current++;

      const shouldShowNotification = cycle % 2 === 0 && settings.showActivityNotifications;
      const shouldShowScarcity = cycle % 2 === 1 && settings.showScarcityMessages;

      if (shouldShowNotification || (!shouldShowScarcity && settings.showActivityNotifications)) {
        setMessageIndex(prev => (prev + 1) % 5);
        setActiveType("notification");
      } else if (shouldShowScarcity || settings.showScarcityMessages) {
        setScarcityData(getScarcityData());
        setActiveType("scarcity");
      } else {
        return;
      }

      // Auto-hide after 5s
      timeoutRef.current = setTimeout(() => {
        setIsExiting(true);
        timeoutRef.current = setTimeout(() => {
          setActiveType(null);
          setIsExiting(false);
          // Next proof after 8-18s
          timeoutRef.current = setTimeout(showNext, 8000 + Math.random() * 10000);
        }, 400);
      }, 5000);
    };

    // Initial delay 5-8s
    const initialDelay = 5000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(showNext, initialDelay);

    return () => clearScheduled();
  }, [settings.enabled, settings.showActivityNotifications, settings.showScarcityMessages]);

  const handleClose = () => {
    clearScheduled();
    setIsExiting(true);
    setTimeout(() => {
      setActiveType(null);
      setIsExiting(false);
    }, 400);
  };

  if (!activeType) return <ExitIntentPopup />;

  const messages = getActivityMessages(cityRef.current || "sua região");

  if (activeType === "notification") {
    const message = messages[messageIndex];
    const IconComponent = message.icon;
    return (
      <>
        <ExitIntentPopup />
        <div
          className={cn(
            "fixed bottom-28 left-4 z-40 max-w-sm",
            "bg-card border border-border rounded-xl shadow-lg",
            "transform transition-all duration-400 ease-out",
            isExiting ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
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
                <p className="text-sm font-medium text-foreground leading-tight">{message.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{message.subtext}</p>
              </div>
              <button onClick={handleClose} className="flex-shrink-0 p-1 rounded-full hover:bg-muted transition-colors" aria-label="Fechar">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="px-4 pb-3">
            <p className="text-[10px] text-muted-foreground/70 leading-tight">
              Avisos com base em atividade recente e volume médio de solicitações.
            </p>
          </div>
        </div>
      </>
    );
  }

  const { availableTechnicians, waitTime, isPeakHour } = scarcityData;
  return (
    <>
      <ExitIntentPopup />
      <div
        className={cn(
          "fixed bottom-28 left-4 z-40 max-w-xs",
          "bg-card border rounded-xl shadow-lg",
          "transform transition-all duration-400 ease-out",
          isExiting ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
          isPeakHour ? "border-accent/50 bg-accent/5" : "border-border",
          "w-[calc(100vw-2rem)] sm:w-auto"
        )}
        role="complementary"
        aria-label="Informações de disponibilidade"
      >
        <div className="p-3 sm:p-4">
          {isPeakHour && (
            <div className="flex items-center gap-2 mb-2 text-accent">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium">Horário de pico</span>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">
                {availableTechnicians > 0 ? (
                  <><strong className="text-primary">{availableTechnicians}</strong> técnico{availableTechnicians > 1 ? "s" : ""} disponíve{availableTechnicians > 1 ? "is" : "l"}{cityRef.current && ` em ${cityRef.current}`}</>
                ) : "Atendimento retorna amanhã"}
              </span>
            </div>
            {availableTechnicians > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tempo estimado: <strong>{waitTime}</strong></span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-[10px] text-muted-foreground/70 leading-tight">
              Disponibilidade pode variar conforme região e horário.
            </p>
            <button onClick={handleClose} className="p-1 rounded-full hover:bg-muted transition-colors ml-2" aria-label="Fechar">
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
