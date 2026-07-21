import { useEffect, useRef } from "react";
import { trackCtaVisible } from "@/lib/funnelAnalytics";

/**
 * Dispara `cta_visible` quando o elemento fica com >=50% visível por 400ms.
 * Só emite uma vez por montagem (StrictMode-safe via ref).
 */
export function useCtaVisibility<T extends HTMLElement>(
  ctaType: string,
  ctaLocation: string,
) {
  const ref = useRef<T | null>(null);
  const firedRef = useRef(false);
  const startRef = useRef<number>(typeof performance !== "undefined" ? performance.now() : Date.now());

  useEffect(() => {
    const el = ref.current;
    if (!el || firedRef.current || typeof IntersectionObserver === "undefined") return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (timer === undefined) {
              timer = window.setTimeout(() => {
                if (firedRef.current) return;
                firedRef.current = true;
                const now = typeof performance !== "undefined" ? performance.now() : Date.now();
                trackCtaVisible({
                  ctaType,
                  ctaLocation,
                  visibleAtMs: Math.round(now - startRef.current),
                });
                observer.disconnect();
              }, 400);
            }
          } else if (timer !== undefined) {
            window.clearTimeout(timer);
            timer = undefined;
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [ctaType, ctaLocation]);

  return ref;
}
