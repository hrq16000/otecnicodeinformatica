import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { staggerDelay } from "@/lib/motion";

interface FadeInProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
  /** Índice em uma lista curta — gera stagger limitado (máx. 6 passos). */
  index?: number;
  /** Deslocamento vertical inicial em px. 0 = só opacidade. */
  y?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Entrada padrão do sistema: opacity 0→1 + translateY curto.
 * Puro CSS (`.motion-enter`), GPU-friendly e neutralizado automaticamente
 * por `prefers-reduced-motion`.
 */
export const FadeIn = ({ children, index = 0, y = 8, as: Tag = "div", className }: FadeInProps) => (
  <Tag
    className={cn("motion-enter", className)}
    style={{
      ["--motion-enter-y" as string]: `${y}px`,
      animationDelay: index ? `${staggerDelay(index)}ms` : undefined,
    }}
  >
    {children}
  </Tag>
);

export default FadeIn;
