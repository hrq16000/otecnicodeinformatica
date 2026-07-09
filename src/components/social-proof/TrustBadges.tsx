import { Shield, Award, Clock, CheckCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  variant?: "inline" | "card" | "minimal";
  className?: string;
}

export const TrustBadges = ({ variant = "card", className }: TrustBadgeProps) => {
  const badges = [
    {
      icon: Shield,
      title: "Profissionais Verificados",
      description: "Equipe técnica certificada e documentada",
    },
    {
      icon: Award,
      title: "Mais de 20 anos de experiência",
      description: "Atendendo Curitiba e região desde 2005",
    },
    {
      icon: Clock,
      title: "Garantia em todos os serviços",
      description: "Cobertura de até 90 dias após o atendimento",
    },
    {
      icon: Lock,
      title: "Ambiente seguro",
      description: "Proteção de dados e privacidade garantida",
    },
  ];

  if (variant === "minimal") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {badges.slice(0, 3).map((badge, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs"
          >
            <badge.icon className="h-3.5 w-3.5 text-trust" />
            <span className="text-muted-foreground">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap justify-center gap-4 md:gap-6", className)}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2">
            <badge.icon className="h-5 w-5 text-trust" />
            <span className="text-sm text-muted-foreground">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-xl border border-border/50"
        >
          <div className="w-12 h-12 bg-trust/10 rounded-full flex items-center justify-center mb-3">
            <badge.icon className="h-6 w-6 text-trust" />
          </div>
          <h3 className="font-semibold text-sm text-foreground mb-1">
            {badge.title}
          </h3>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

export const RatingBadge = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm",
        className
      )}
    >
      <CheckCircle className="h-4 w-4 text-trust" />
      <span className="font-semibold text-foreground">Atendimento local e direto</span>
      <span className="text-sm text-muted-foreground">Curitiba e região</span>
    </div>
  );
};

export const SecurityBadge = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 bg-trust/10 border border-trust/20 rounded-full text-xs",
        className
      )}
    >
      <CheckCircle className="h-3.5 w-3.5 text-trust" />
      <span className="text-trust font-medium">
        Você está em um ambiente seguro e monitorado
      </span>
    </div>
  );
};
