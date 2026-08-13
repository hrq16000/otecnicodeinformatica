import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * MotionProvider global.
 *
 * Fail-closed: se a API `matchMedia` não existir (SSR / navegador antigo),
 * assumimos movimento reduzido = false apenas no cliente; no servidor o valor
 * inicial é `false` e a hidratação corrige em seguida. O provider marca
 * `data-reduced-motion` no <html>, permitindo que qualquer CSS do portal
 * desative animações sem depender de media query duplicada.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

const MotionContext = createContext<{ reducedMotion: boolean }>({ reducedMotion: false });

export const useReducedMotion = () => useContext(MotionContext).reducedMotion;

const readInitial = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia(QUERY).matches;
  } catch {
    return false;
  }
};

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useState(readInitial);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    let mql: MediaQueryList;
    try {
      mql = window.matchMedia(QUERY);
    } catch {
      return;
    }
    const onChange = (event: MediaQueryListEvent | MediaQueryList) => setReducedMotion(event.matches);
    onChange(mql);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange as (e: MediaQueryListEvent) => void);
      return () => mql.removeEventListener("change", onChange as (e: MediaQueryListEvent) => void);
    }
    // Safari antigo
    mql.addListener(onChange as (e: MediaQueryListEvent) => void);
    return () => mql.removeListener(onChange as (e: MediaQueryListEvent) => void);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.reducedMotion = reducedMotion ? "true" : "false";
  }, [reducedMotion]);

  const value = useMemo(() => ({ reducedMotion }), [reducedMotion]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export default MotionProvider;
