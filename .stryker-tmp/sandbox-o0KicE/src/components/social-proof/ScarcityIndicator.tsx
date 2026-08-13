// @ts-nocheck
import { useState, useEffect } from "react";
import { AlertTriangle, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSocialProofSettings } from "@/hooks/useSocialProofSettings";
import { useGeolocation } from "@/hooks/useGeolocation";

interface ScarcityData {
  availableTechnicians: number;
  waitTime: string;
  demandLevel: "normal" | "high" | "very_high";
  isPeakHour: boolean;
}

const getScarcityData = (): ScarcityData => {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isBusinessHours = hour >= 8 && hour < 20;
  
  // Peak hours: 9-11am and 2-4pm on weekdays
  const isPeakHour = !isWeekend && ((hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16));
  
  if (!isBusinessHours) {
    return {
      availableTechnicians: 0,
      waitTime: "Amanhã a partir das 8h",
      demandLevel: "normal",
      isPeakHour: false,
    };
  }

  if (isPeakHour) {
    return {
      availableTechnicians: Math.floor(Math.random() * 2) + 1, // 1-2
      waitTime: `${Math.floor(Math.random() * 20) + 30} minutos`, // 30-50 min
      demandLevel: "very_high",
      isPeakHour: true,
    };
  }

  // Normal hours
  return {
    availableTechnicians: Math.floor(Math.random() * 3) + 2, // 2-4
    waitTime: `${Math.floor(Math.random() * 15) + 15} minutos`, // 15-30 min
    demandLevel: Math.random() > 0.5 ? "high" : "normal",
    isPeakHour: false,
  };
};

export const ScarcityIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scarcityData, setScarcityData] = useState<ScarcityData>(getScarcityData());
  const { city } = useGeolocation();
  const { settings } = useSocialProofSettings();

  useEffect(() => {
    if (!settings.enabled || !settings.showScarcityMessages) {
      return;
    }

    // Show only after user has been on page for 25+ seconds
    const showTimeout = setTimeout(() => {
      // Check if this is a new visitor or been here 20+ seconds
      const visitStart = sessionStorage.getItem("visit_start");
      if (!visitStart) {
        sessionStorage.setItem("visit_start", Date.now().toString());
      }
      setIsVisible(true);
    }, settings.scarcityDelay * 1000);

    // Update scarcity data every 30 seconds
    const updateInterval = setInterval(() => {
      setScarcityData(getScarcityData());
    }, 30000);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(updateInterval);
    };
  }, [settings]);

  if (!isVisible || !settings.enabled || !settings.showScarcityMessages) {
    return null;
  }

  const { availableTechnicians, waitTime, demandLevel, isPeakHour } = scarcityData;

  return (
    <div
      className={cn(
        "fixed bottom-24 right-4 z-40 max-w-xs",
        "bg-card border rounded-xl shadow-lg",
        "transform transition-all duration-500 ease-out",
        "animate-in slide-in-from-right-4 fade-in",
        demandLevel === "very_high" && "border-accent/50 bg-accent/5",
        demandLevel === "high" && "border-accent/30",
        demandLevel === "normal" && "border-border",
        // Mobile responsive
        "w-[calc(100vw-2rem)] sm:w-auto right-4 sm:right-4"
      )}
      role="complementary"
      aria-label="Informações de disponibilidade"
    >
      <div className="p-3 sm:p-4">
        {/* Header */}
        {isPeakHour && (
          <div className="flex items-center gap-2 mb-2 text-accent">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">Horário de pico</span>
          </div>
        )}

        {/* Availability info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm">
              {availableTechnicians > 0 ? (
                <>
                  <strong className="text-primary">{availableTechnicians}</strong>
                  {" "}técnico{availableTechnicians > 1 ? "s" : ""} disponíve{availableTechnicians > 1 ? "is" : "l"}
                  {city && ` em ${city}`}
                </>
              ) : (
                "Atendimento retorna amanhã"
              )}
            </span>
          </div>

          {availableTechnicians > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Tempo estimado: <strong>{waitTime}</strong>
              </span>
            </div>
          )}
        </div>

        {/* CDC-compliant disclaimer */}
        <p className="text-[10px] text-muted-foreground mt-3 leading-tight">
          A disponibilidade de profissionais pode variar conforme a região e horário.
        </p>
      </div>
    </div>
  );
};
