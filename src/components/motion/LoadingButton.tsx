import { forwardRef, useEffect, useRef, type ComponentProps } from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { iniciarEstadoCarregamento } from "@/lib/interactionMetrics";

type ButtonProps = ComponentProps<typeof Button>;

interface LoadingButtonProps extends ButtonProps {
  /** Ciclo padrão de ações assíncronas. */
  state?: "idle" | "loading" | "success" | "error";
  loadingLabel?: string;
  successLabel?: string;
  /** Nome da superfície para telemetria (ex.: "avaliar:enviar"). */
  metricSurface?: string;
}

/**
 * Botão com estados idle → loading → success/error.
 * O estado nunca é comunicado só por movimento: há ícone, texto e
 * `aria-busy`/`aria-live` para leitores de tela. Bloqueia duplo submit.
 * Cada ciclo de loading é medido e enviado à telemetria de interação.
 */
export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      state = "idle",
      loadingLabel = "Enviando…",
      successLabel,
      metricSurface,
      children,
      className,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const loading = state === "loading";
    const success = state === "success";
    const encerrar = useRef<((r?: "success" | "error" | "abort") => number) | null>(null);

    useEffect(() => {
      const superficie = metricSurface || (typeof children === "string" ? children : "loading-button");
      if (loading && !encerrar.current) {
        encerrar.current = iniciarEstadoCarregamento(superficie, "loading-button");
        return;
      }
      if (!loading && encerrar.current) {
        encerrar.current(state === "error" ? "error" : "success");
        encerrar.current = null;
      }
    }, [loading, state, metricSurface, children]);

    useEffect(
      () => () => {
        encerrar.current?.("abort");
        encerrar.current = null;
      },
      [],
    );

    return (
      <Button
        ref={ref}
        aria-busy={loading}
        aria-live="polite"
        disabled={disabled || loading}
        className={cn("motion-surface", className)}
        {...rest}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {success && !loading && <Check className="mr-2 h-4 w-4" aria-hidden="true" />}
        <span>{loading ? loadingLabel : success && successLabel ? successLabel : children}</span>
      </Button>
    );
  },
);
LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
