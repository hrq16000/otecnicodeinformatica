import { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "fade-up" | "scale" | "slide-left" | "slide-right";
}

/**
 * Lightweight wrapper — renders children immediately (always visible).
 * CSS scroll-driven animations are applied via the class for progressive enhancement.
 */
export const AnimatedSection = ({ children, className = "" }: AnimatedSectionProps) => {
  return (
    <div className={className || undefined}>
      {children}
    </div>
  );
};
