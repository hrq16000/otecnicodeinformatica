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

export const trackFunnelStep = (step: number, equipamento?: string | null, sintoma?: string | null, ctaLocation = "unknown") =>
  track("wa_funnel_step", { step, equipamento: equipamento || "none", sintoma: sintoma || "none", ctaLocation });

export const trackFunnelSubmit = (params: {
  equipamento?: string | null;
  sintoma?: string | null;
  requiresColeta?: boolean;
  mediaCount?: number;
  ctaLocation?: string;
  minimumAccepted?: boolean;
}) => track("wa_funnel_submit", params);

export const trackFunnelBlocked = (reason: string, equipamento?: string | null) =>
  track("wa_funnel_blocked", { reason, equipamento: equipamento || "none" });

export const trackFunnelClose = (step: number, equipamento?: string | null) =>
  track("wa_funnel_close", { step, equipamento: equipamento || "none" });

/**
 * Clique no CTA final "Agendar agora" da última etapa do funil V5,
 * imediatamente antes de abrir o WhatsApp. Payload traz o snapshot da
 * triagem para permitir análise de conversão por equipamento/modalidade.
 */
export const trackFunnelAgendarClick = (params: {
  equipamento?: string | null;
  sintoma?: string | null;
  modalidade?: string | null;
  ctaLocation?: string;
}) =>
  track("wa_funnel_agendar_click", {
    equipamento: params.equipamento || "none",
    sintoma: params.sintoma || "none",
    modalidade: params.modalidade || "unknown",
    cta_location: params.ctaLocation || "wa_funnel_review",
  });

/**
 * Impressão do botão "Agendar agora" (≥50% visível por 400ms).
 * Deduplicado por session + cta_location — 1 evento por sessão/localização.
 */
export const trackFunnelAgendarImpression = (params: {
  ctaLocation?: string;
  modalidade?: string | null;
  equipamento?: string | null;
}) => {
  const loc = params.ctaLocation || "wa_funnel_review";
  if (typeof window !== "undefined") {
    const key = `wa:agendar-imp:${loc}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch { /* storage bloqueado */ }
  }
  track("wa_funnel_agendar_impression", {
    cta_location: loc,
    modalidade: params.modalidade || "unknown",
    equipamento: params.equipamento || "none",
  });
};

/** Abertura do modal do funil (transição fechado→aberto). */
export const trackFunnelModalOpen = (params: {
  ctaLocation?: string;
  hasPreset?: boolean;
}) =>
  track("wa_funnel_modal_open", {
    cta_location: params.ctaLocation || "unknown",
    has_preset: !!params.hasPreset,
  });

/**
 * Impressão do modal do funil — 1 evento por sessão + ctaLocation
 * na primeira montagem em estado visível.
 */
export const trackFunnelModalImpression = (params: { ctaLocation?: string }) => {
  const loc = params.ctaLocation || "unknown";
  if (typeof window !== "undefined") {
    const key = `wa:modal-imp:${loc}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch { /* storage bloqueado */ }
  }
  track("wa_funnel_modal_impression", { cta_location: loc });
};

/**
 * Lê o último contexto de triagem persistido (modalidade/equipamento/problema).
 * Retorna sempre `"unknown"` para campos ausentes — garantindo que os eventos
 * de clique em WhatsApp / Ligar continuem sendo registrados mesmo antes do
 * usuário passar pelo funil.
 */
export function readTriageFallback(): { modalidade: string; problema: string; equipamento: string } {
  const fallback = { modalidade: "unknown", problema: "unknown", equipamento: "unknown" };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem("wa-funnel:last-triage");
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      modalidade: typeof parsed.modalidade === "string" && parsed.modalidade ? parsed.modalidade : "unknown",
      problema: typeof parsed.problema === "string" && parsed.problema
        ? parsed.problema
        : typeof parsed.sintoma === "string" && parsed.sintoma ? parsed.sintoma : "unknown",
      equipamento: typeof parsed.equipamento === "string" && parsed.equipamento ? parsed.equipamento : "unknown",
    };
  } catch {
    return fallback;
  }
}

export const trackWaClick = (location: string, extra: Record<string, unknown> = {}) => {
  const ctx = readTriageFallback();
  track("wa_click", { cta_location: location, ...ctx, ...extra });
};

export const trackCallClick = (location: string, extra: Record<string, unknown> = {}) => {
  const ctx = readTriageFallback();
  track("call_click", { cta_location: location, ...ctx, ...extra });
};

/**
 * Clique em serviço interno dentro de páginas /problema/*.
 * Payload dedicado para análise de intenção pré-conversão.
 */
export const trackProblemaServiceClick = (params: {
  problemaSlug: string;
  servicoSlug: string;
  servicoHref: string;
  linkLabel?: string;
}) =>
  track("problema_service_click", {
    problema_slug: params.problemaSlug,
    servico_slug: params.servicoSlug,
    servico_href: params.servicoHref,
    link_label: params.linkLabel || "",
    cta_location: "problema_internal_link",
  });

/**
 * Link interno inválido detectado em /problema/* (rota não whitelisted).
 * Serve como sinal para retirar o link do render e alertar via analytics.
 */
export const trackProblemaLinkBroken = (params: {
  problemaSlug: string;
  targetHref: string;
  reason: string;
  linkLabel?: string;
}) =>
  track("problema_link_broken", {
    problema_slug: params.problemaSlug,
    target_href: params.targetHref,
    reason: params.reason,
    link_label: params.linkLabel || "",
  });

/** Marcos de scroll depth (25/50/75/100). Uma emissão por marco por sessão+página. */
export const trackScrollDepth = (percent: number, path: string, extra: Record<string, unknown> = {}) =>
  track("scroll_depth", { percent, page_path: path, ...extra });

/** Visibilidade de CTA (>=50% visível por 400ms). */
export const trackCtaVisible = (params: {
  ctaType: string;
  ctaLocation: string;
  visibleAtMs: number;
}) =>
  track("cta_visible", {
    cta_type: params.ctaType,
    cta_location: params.ctaLocation,
    visible_at_ms: params.visibleAtMs,
  });

