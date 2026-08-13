import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Expansão/colapso sem animar `height` em px: usa `grid-template-rows`
 * (0fr → 1fr), o que evita medir o conteúdo e não gera reflow contínuo.
 * O conteúdo continua no DOM (bom para SEO e leitores de tela) e recebe
 * `hidden` lógico via `aria-hidden` quando fechado.
 */
export const Collapse = ({ open, children, className, id }: CollapseProps) => (
  <div id={id} className={cn("motion-collapse", className)} data-open={open ? "true" : "false"} aria-hidden={!open}>
    <div>{children}</div>
  </div>
);

export default Collapse;
