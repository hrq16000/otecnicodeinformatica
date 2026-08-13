// @ts-nocheck
import { useEffect } from "react";
import { trackScrollDepth } from "@/lib/funnelAnalytics";

/**
 * Dispara `scroll_depth` uma vez por marco (25/50/75/100) por sessão+página.
 * Sem alocações extras no scroll: apenas escuta com passive listener.
 */
export function useScrollDepthTracking(pagePath: string, extra: Record<string, unknown> = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !pagePath) return;
    const key = `scroll_depth:${pagePath}`;
    let fired: Set<number>;
    try {
      const raw = sessionStorage.getItem(key);
      fired = new Set<number>(raw ? (JSON.parse(raw) as number[]) : []);
    } catch {
      fired = new Set<number>();
    }
    const marks = [25, 50, 75, 100];

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const total = doc.scrollHeight - window.innerHeight;
        if (total <= 0) return;
        const pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
        for (const m of marks) {
          if (pct >= m && !fired.has(m)) {
            fired.add(m);
            trackScrollDepth(m, pagePath, extra);
          }
        }
        try {
          sessionStorage.setItem(key, JSON.stringify([...fired]));
        } catch { /* noop */ }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePath]);
}
