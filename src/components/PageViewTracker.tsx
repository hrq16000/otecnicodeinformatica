import { useEffect } from "react";
import { ANALYTICS_EVENTS, buildRouteContext, getJourneyId, recordTouchpoint } from "@/lib/analyticsContract";
import { track, registrarPageView, registrarAbandonoSePendente } from "@/lib/funnelAnalytics";

/**
 * RODADA 6 — FASE 8. Page view com contexto comum (rota, família, cidade,
 * bairro, serviço, intenção). Campos ausentes não são inventados.
 *
 * Nunca bloqueia navegação: qualquer falha é silenciosa (fail open).
 */
export const PageViewTracker = ({ path }: { path?: string }) => {
  useEffect(() => {
    try {
      const ctx = buildRouteContext(path);
      const touch = recordTouchpoint(ctx);
      track(ANALYTICS_EVENTS.pageView, {
        ...ctx,
        journey_id: getJourneyId(),
        first_touch_route: touch.first_touch?.landing_route,
        last_touch_route: touch.last_touch.landing_route,
      });
      registrarPageView();
    } catch {
      /* analytics nunca impede a navegação */
    }
  }, [path]);

  // FASE 13 — abandono de triagem sem timer invasivo.
  useEffect(() => {
    const onHide = () => {
      try {
        registrarAbandonoSePendente();
      } catch {
        /* fail open */
      }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  return null;
};

export default PageViewTracker;
