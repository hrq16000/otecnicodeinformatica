import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, Users, Zap } from "lucide-react";

interface AvailabilityStatus {
  isOnline: boolean;
  technicianCount: number;
  waitTime: string;
  queueSize: number;
}

// Simulates real-time availability - in production, this would connect to a backend
const getNextOpenLabel = (): string => {
  const hour = new Date().getHours();
  // 0h-7h → "Hoje às 8h"  |  20h-23h → "Amanhã às 8h"
  return hour < 8 ? "Hoje às 8h" : "Amanhã às 8h";
};

const getAvailabilityStatus = (): AvailabilityStatus => {
  const hour = new Date().getHours();
  const isBusinessHours = hour >= 8 && hour < 20;
  const isMorningRush = hour >= 9 && hour <= 11;
  const isAfternoonRush = hour >= 14 && hour <= 16;
  
  if (!isBusinessHours) {
    return {
      isOnline: false,
      technicianCount: 0,
      waitTime: getNextOpenLabel(),
      queueSize: 0,
    };
  }

  if (isMorningRush || isAfternoonRush) {
    return {
      isOnline: true,
      technicianCount: 2,
      waitTime: "30-45 min",
      queueSize: Math.floor(Math.random() * 3) + 2,
    };
  }

  return {
    isOnline: true,
    technicianCount: 3,
    waitTime: "15-30 min",
    queueSize: Math.floor(Math.random() * 2) + 1,
  };
};

export const TechnicianAvailability = () => {
  const [status, setStatus] = useState<AvailabilityStatus>(getAvailabilityStatus());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Update every 30 seconds
    const interval = setInterval(() => {
      setStatus(getAvailabilityStatus());
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full",
            status.isOnline 
              ? "bg-green-500 animate-pulse" 
              : "bg-yellow-500"
          )} />
          <span className={cn(
            "font-semibold text-sm",
            status.isOnline ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"
          )}>
            {status.isOnline ? "Técnicos Disponíveis" : "Fora do Horário"}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Atualizado às {lastUpdate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {status.isOnline ? (
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-secondary rounded-lg">
            <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold text-primary">{status.technicianCount}</p>
            <p className="text-xs text-muted-foreground">Técnicos Online</p>
          </div>
          <div className="text-center p-2 bg-secondary rounded-lg">
            <Clock className="h-4 w-4 mx-auto mb-1 text-accent" />
            <p className="text-lg font-bold text-accent">{status.waitTime}</p>
            <p className="text-xs text-muted-foreground">Tempo Estimado</p>
          </div>
          <div className="text-center p-2 bg-secondary rounded-lg">
            <Zap className="h-4 w-4 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold text-primary">{status.queueSize}</p>
            <p className="text-xs text-muted-foreground">Na Fila</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-muted-foreground text-sm">
            Horário de atendimento: <strong>08h às 20h</strong>
          </p>
          <p className="text-primary font-medium mt-1">
            Próximo atendimento: {status.waitTime}
          </p>
        </div>
      )}

      {status.isOnline && status.queueSize <= 2 && (
        <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
            ⚡ Poucos atendimentos na fila - Resposta rápida garantida!
          </p>
        </div>
      )}

      {status.isOnline && status.queueSize > 2 && (
        <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-center">
          <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">
            🔥 Alta demanda agora - Garanta seu horário!
          </p>
        </div>
      )}
    </div>
  );
};

// Compact version for header or floating
export const TechnicianAvailabilityBadge = () => {
  const [status, setStatus] = useState<AvailabilityStatus>(getAvailabilityStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getAvailabilityStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
      status.isOnline 
        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" 
        : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20"
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        status.isOnline ? "bg-green-500 animate-pulse" : "bg-yellow-500"
      )} />
      {status.isOnline ? (
        <span>{status.technicianCount} técnico{status.technicianCount > 1 ? "s" : ""} online</span>
      ) : (
        <span>Retornamos {getNextOpenLabel().toLowerCase()}</span>
      )}
    </div>
  );
};

// Hero inline version
export const TechnicianAvailabilityInline = () => {
  const [status, setStatus] = useState<AvailabilityStatus>(getAvailabilityStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getAvailabilityStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!status.isOnline) {
    return (
      <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <span>Atendimento retorna {getNextOpenLabel().toLowerCase()}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span><strong className="text-white">{status.technicianCount}</strong> técnico{status.technicianCount > 1 ? "s" : ""} disponíve{status.technicianCount > 1 ? "is" : "l"}</span>
      </div>
      <div className="hidden sm:block w-px h-4 bg-white/30" />
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>Tempo de resposta: <strong className="text-white">{status.waitTime}</strong></span>
      </div>
      {status.queueSize <= 2 && (
        <>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <span className="text-green-300 font-medium">⚡ Fila curta!</span>
        </>
      )}
    </div>
  );
};
