import { cn } from "@/lib/utils";

interface ProgressProps {
  /** 0–100. Omitido = progresso indeterminado (nunca simular percentual). */
  value?: number;
  label?: string;
  className?: string;
}

/**
 * Barra de progresso única do sistema. Com `value`, exibe progresso real
 * (com texto percentual e atributos ARIA); sem `value`, usa um indicador
 * indeterminado discreto.
 */
export const Progress = ({ value, label, className }: ProgressProps) => {
  const determinado = typeof value === "number" && Number.isFinite(value);
  const pct = determinado ? Math.min(100, Math.max(0, value)) : undefined;

  return (
    <div className={cn("w-full", className)}>
      {(label || determinado) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>{label ?? "Progresso"}</span>
          {determinado && <span>{Math.round(pct ?? 0)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={determinado ? 0 : undefined}
        aria-valuemax={determinado ? 100 : undefined}
        aria-valuenow={determinado ? Math.round(pct ?? 0) : undefined}
        aria-label={label ?? (determinado ? "Progresso" : "Carregando")}
        className={cn(
          "h-1.5 w-full overflow-hidden rounded-full bg-muted",
          !determinado && "motion-progress-indeterminate",
        )}
      >
        <span
          className="block h-full rounded-full bg-primary"
          style={
            determinado
              ? { width: `${pct}%`, transition: "width var(--motion-duration-normal) var(--motion-ease-standard)" }
              : { width: "35%" }
          }
        />
      </div>
    </div>
  );
};

export default Progress;
