// @ts-nocheck
import { useEffect } from "react";
import { detectByIp, requestPreciseLocation } from "@/lib/geoContext";

/**
 * Detecta a cidade por IP no carregamento e, após 3s, pede a
 * localização precisa. Uso estritamente interno (pré-preencher
 * campos do funil). Nada é exibido na interface.
 */
export const GeoAutoDetect = () => {
  useEffect(() => {
    let cancelled = false;
    const idle = window.setTimeout(() => {
      if (!cancelled) void detectByIp();
    }, 300);
    const precise = window.setTimeout(() => {
      if (!cancelled) void requestPreciseLocation();
    }, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(idle);
      window.clearTimeout(precise);
    };
  }, []);
  return null;
};

export default GeoAutoDetect;
