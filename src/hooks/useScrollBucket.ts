import { useEffect, useState } from "react";

/**
 * Faixa de rolagem atual da página (0, 25, 50, 75, 100).
 * Usada para atribuir o clique de CTA ao ponto da leitura no GA4/Ads.
 * Listener passivo + rAF: sem custo perceptível de INP.
 */
export function useScrollBucket(): number {
  const [bucket, setBucket] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const total = doc.scrollHeight - window.innerHeight;
        const pct = total <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / total) * 100));
        const faixa = pct >= 100 ? 100 : pct >= 75 ? 75 : pct >= 50 ? 50 : pct >= 25 ? 25 : 0;
        setBucket((atual) => (atual === faixa ? atual : faixa));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return bucket;
}

export default useScrollBucket;
