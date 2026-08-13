// @ts-nocheck
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { experienciaLabel } from "@/lib/politicaComercial";

interface ExperienciaBadgeProps {
  /** "hero" = pílula clara sobre fundo escuro. "light" = sobre fundo claro. */
  tone?: "hero" | "light";
  className?: string;
  /** Texto complementar curto (opcional). */
  suffix?: string;
}

/**
 * Prova de experiência "desde 1998" — acima da dobra nas páginas comerciais.
 * Texto sempre derivado de politicaComercial/siteConfig (nunca hardcoded).
 */
export const ExperienciaBadge = ({ tone = "hero", className, suffix }: ExperienciaBadgeProps) => (
  !experienciaLabel ? null : <p
    className={cn(
      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold",
      tone === "hero"
        ? "border border-white/20 bg-white/10 text-white backdrop-blur"
        : "border border-accent/30 bg-accent/10 text-foreground",
      className,
    )}
  >
    <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
    <span>
      {experienciaLabel}
      {suffix ? ` · ${suffix}` : ` · ${siteConfig.primaryCity} e região`}
    </span>
  </p>
);

export default ExperienciaBadge;
