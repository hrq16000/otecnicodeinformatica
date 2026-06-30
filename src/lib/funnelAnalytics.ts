/**
 * Helpers de tracking de eventos do funil para GA4 (window.gtag).
 * Falha silenciosa quando gtag não está carregado (dev / adblock).
 */
import { readUtms } from "./utmCapture";
import { getSessionId } from "./funnelSubmission";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    __APP_VERSION__?: string;
    __waFunnelEvents?: Array<{ name: string; payload: Record<string, unknown> }>;
  }
}

function getDeviceContext() {
  if (typeof window === "undefined") return { device: "unknown", viewport_width: 0 };
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  const coarse = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
  const device = w < 768 || coarse ? "mobile" : w < 1024 ? "tablet" : "desktop";
  return { device, viewport_width: w };
}

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

function baseParams(extra: Record<string, unknown> = {}) {
  const location = extra.click_location || extra.cta_location || "unknown";
  return {
    event_category: "wa_funnel",
    page_path: typeof window !== "undefined" ? window.location.pathname : "/",
    app_version: typeof window !== "undefined" ? window.__APP_VERSION__ || "dev" : "server",
    session_id: typeof window !== "undefined" ? getSessionId() : "server",
    ...getDeviceContext(),
    ...readUtms(),
    ...extra,
    click_location: location,
    cta_location: location,
  };
}

export function track(name: string, params: Record<string, unknown> = {}) {
  const g = gtag();
  const payload = baseParams(params);
  // eslint-disable-next-line no-console
  if (typeof window !== "undefined" && (window as unknown as { __funnelDebug?: boolean }).__funnelDebug) {
    console.debug(`[funnel:ga4] ${name}`, payload);
  }
  if (typeof window !== "undefined") {
    window.__waFunnelEvents = window.__waFunnelEvents || [];
    window.__waFunnelEvents.push({ name, payload });
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
