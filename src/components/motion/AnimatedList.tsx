import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface AnimatedListProps<T> {
  items: T[];
  keyOf: (item: T, index: number) => string;
  children: (item: T, index: number) => ReactNode;
  className?: string;
  as?: "ul" | "div";
  /** Acima deste tamanho, o stagger é desligado (coleções grandes). */
  staggerLimit?: number;
}

/**
 * Lista com entrada suave e stagger limitado. Não anima coleções grandes,
 * conforme os princípios de motion: movimento só quando ajuda a perceber
 * a mudança.
 */
export function AnimatedList<T>({
  items,
  keyOf,
  children,
  className,
  as = "div",
  staggerLimit = 12,
}: AnimatedListProps<T>) {
  const Wrapper = as;
  const stagger = items.length <= staggerLimit;
  const Item = as === "ul" ? "li" : "div";

  return (
    <Wrapper className={cn(className)}>
      {items.map((item, i) => (
        <FadeIn key={keyOf(item, i)} as={Item} index={stagger ? i : 0} y={stagger ? 8 : 0}>
          {children(item, i)}
        </FadeIn>
      ))}
    </Wrapper>
  );
}

export default AnimatedList;
