import { forwardRef, type ComponentProps } from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

interface LoadingButtonProps extends ButtonProps {
  /** Ciclo padrão de ações assíncronas. */
  state?: "idle" | "loading" | "success" | "error";
  loadingLabel?: string;
  successLabel?: string;
}

/**
 * Botão com estados idle → loading → success/error.
 * O estado nunca é comunicado só por movimento: há ícone, texto e
 * `aria-busy`/`aria-live` para leitores de tela. Bloqueia duplo submit.
 */
export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ state = "idle", loadingLabel = "Enviando…", successLabel, children, className, disabled, ...rest }, ref) => {
    const loading = state === "loading";
    const success = state === "success";
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
