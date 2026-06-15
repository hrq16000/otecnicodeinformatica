/**
 * Helpers de tracking de eventos do funil para GA4 (window.gtag).
 * Falha silenciosa quando gtag não está carregado (dev / adblock).
 */
import { readUtms } from "./utmCapture";

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

function baseParams(extra: Record<string, unknown> = {}) {
  return {
    event_category: "wa_funnel",
    page_path: typeof window !== "undefined" ? window.location.pathname : "/",
    ...readUtms(),
    ...extra,
  };
}

export function track(name: string, params: Record<string, unknown> = {}) {
  const g = gtag();
  const payload = baseParams(params);
  // eslint-disable-next-line no-console
  if (typeof window !== "undefined" && (window as unknown as { __funnelDebug?: boolean }).__funnelDebug) {
    console.debug(`[funnel:ga4] ${name}`, payload);
  }
  g?.("event", name, payload);
}

export const trackFunnelOpen = (location: string, hasPreset = false) =>
  track("wa_funnel_open", { cta_location: location, has_preset: hasPreset });

export const trackFunnelStep = (step: number, equipamento?: string | null, sintoma?: string | null) =>
  track("wa_funnel_step", { step, equipamento: equipamento || "none", sintoma: sintoma || "none" });

export const trackFunnelSubmit = (params: {
  equipamento?: string | null;
  sintoma?: string | null;
  requiresColeta?: boolean;
  mediaCount?: number;
  ctaLocation?: string;
}) => track("wa_funnel_submit", params);

export const trackFunnelBlocked = (reason: string, equipamento?: string | null) =>
  track("wa_funnel_blocked", { reason, equipamento: equipamento || "none" });

export const trackFunnelClose = (step: number, equipamento?: string | null) =>
  track("wa_funnel_close", { step, equipamento: equipamento || "none" });

export const trackWaClick = (location: string) => track("wa_click", { cta_location: location });

export const trackCallClick = (location: string) => track("call_click", { cta_location: location });
