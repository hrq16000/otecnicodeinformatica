import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "@/lib/motion";
import { useReducedMotion } from "@/components/MotionProvider";

interface PresenceProps {
  /** Quando falso, o conteúdo sai com animação antes de deixar o DOM. */
  show: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Equivalente enxuto ao AnimatePresence: mantém o filho montado durante a
 * animação de saída (mais curta que a de entrada, conforme a skill) e só
 * então o remove do DOM. Sem dependência extra — apenas classes CSS.
 */
export const Presence = ({ show, children, className }: PresenceProps) => {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(show);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (show) {
      setLeaving(false);
      setMounted(true);
      return;
    }
    if (!mounted) return;
    if (reduced) {
      setMounted(false);
      return;
    }
    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setLeaving(false);
      setMounted(false);
    }, motion.duration.fast);
    return () => window.clearTimeout(timer.current);
  }, [show, mounted, reduced]);

  if (!mounted) return null;
  return <div className={cn(leaving ? "motion-exit" : "motion-enter", className)}>{children}</div>;
};

export default Presence;
