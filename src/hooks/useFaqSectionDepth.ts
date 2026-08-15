import { useEffect, useRef } from "react";

/**
 * Profundidade de leitura POR SEÇÃO de FAQ.
 *
 * Cada pergunta recebe um id (`faq-N`). O hook observa quanto de cada bloco
 * entrou na viewport e emite marcos (25/50/75/100%) uma única vez por seção.
 * Isso permite correlacionar, no GA4, "quanto o visitante leu daquela
 * pergunta" com os cliques de WhatsApp e de links internos daquela mesma
 * seção — sem custo perceptível de INP (IntersectionObserver, sem scroll
 * listener adicional).
 */
export function useFaqSectionDepth(
  ids: string[],
  onDepth: (id: string, depth: number) => void,
) {
  const emitidos = useRef<Set<string>>(new Set());
  const cb = useRef(onDepth);
  cb.current = onDepth;

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    if (!ids.length) return;

    const marcos = [0.25, 0.5, 0.75, 1];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (!id) continue;
          for (const m of marcos) {
            if (e.intersectionRatio + 0.001 < m) continue;
            const chave = `${id}:${m}`;
            if (emitidos.current.has(chave)) continue;
            emitidos.current.add(chave);
            cb.current(id, Math.round(m * 100));
          }
        }
      },
      { threshold: marcos },
    );

    const alvos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useFaqSectionDepth;
