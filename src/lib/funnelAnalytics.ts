/**
 * Helpers de tracking de eventos do funil para GA4 (window.gtag).
 * Falha silenciosa quando gtag não está carregado (dev / adblock).
 * Cliques em WhatsApp/Ligar também são persistidos em `click_events`
 * (Supabase) para alimentar o dashboard admin por bairro/serviço.
 */
import { readUtms } from "./utmCapture";
import { readAttribution } from "./attribution";
import { getSessionId } from "./funnelSubmission";
import {
  DEFAULT_UTM_SOURCE,
  campaignFromPath,
  normalizeUtmMedium,
  routeTypeFromPath,
  viewportBucket,
} from "./trackingTaxonomy";
import { supabase } from "@/integrations/supabase/client";


type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    __APP_VERSION__?: string;
    __waFunnelEvents?: Array<{ name: string; payload: Record<string, unknown> }>;
  }
}

function getDeviceContext() {
  if (typeof window === "undefined")
    return { device: "unknown", viewport_width: 0, viewport_bucket: "unknown" };
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  const coarse = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
  const device = w < 768 || coarse ? "mobile" : w < 1024 ? "tablet" : "desktop";
  return { device, viewport_width: w, viewport_bucket: viewportBucket(w) };
}

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

function baseParams(extra: Record<string, unknown> = {}) {
  const location = extra.click_location || extra.cta_location || "unknown";
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const utms = readUtms();
  return {
    event_category: "wa_funnel",
    page_path: path,
    // Segmentação PF/PJ/serviço/local no GA4 e Google Ads.
    route_type: routeTypeFromPath(path),
    app_version: typeof window !== "undefined" ? window.__APP_VERSION__ || "dev" : "server",
    session_id: typeof window !== "undefined" ? getSessionId() : "server",
    ...getDeviceContext(),
    // UTMs padronizados: preserva campanha real, completa o que faltar.
    utm_source: utms.utm_source || DEFAULT_UTM_SOURCE,
    utm_medium: normalizeUtmMedium(
      (utms.utm_medium as string | undefined) ||
        (typeof extra.utm_medium === "string" ? extra.utm_medium : undefined),
    ),
    utm_campaign: utms.utm_campaign || campaignFromPath(path),
    // Atribuição por origem (first-touch): ads | seo | social | referral | direto | campanha.
    attribution_channel: readAttribution().channel,
    attribution_source: readAttribution().source,
    ...utms,
    ...extra,
    click_location: location,
    cta_location: location,
  };
}


/**
 * Contexto do ramo da triagem (PF × PJ). Fica em módulo para que TODO evento
 * do funil carregue `customer_type` sem alterar cada assinatura.
 */
let branchContext: Record<string, unknown> = { customer_type: "unknown" };

export const setFunnelBranchContext = (partial: Record<string, unknown>) => {
  branchContext = { ...branchContext, ...partial };
};

export const getFunnelBranchContext = () => ({ ...branchContext });

export const resetFunnelBranchContext = () => {
  branchContext = { customer_type: "unknown" };
};

/**
 * Rotas cujo público é inequivocamente PJ (empresa). Usadas apenas como
 * *fallback* quando o usuário ainda não passou pela bifurcação PF × PJ da
 * triagem — nunca sobrescrevem uma escolha explícita do usuário.
 */
const BUSINESS_PATH_HINTS = [
  "/empresa-de-ti-curitiba",
  "/servicos/suporte-tecnico-empresarial",
  "/servicos/redes-e-wifi-empresarial",
  "/empresa",
];

/**
 * Resolve a intenção PF × PJ do clique, na ordem:
 *   1. ramo escolhido na triagem (memória do módulo);
 *   2. ramo persistido na sessão (usuário voltou depois);
 *   3. dica pela rota (páginas exclusivamente empresariais);
 *   4. "unknown" — nunca chutamos residencial.
 */
export function resolveCustomerType(): "residential" | "business" | "unknown" {
  const fromBranch = branchContext.customer_type;
  if (fromBranch === "residential" || fromBranch === "business") return fromBranch;
  if (typeof window === "undefined") return "unknown";
  try {
    const raw = sessionStorage.getItem("wa-funnel:last-triage");
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const t = parsed.customer_type ?? parsed.customerType;
      if (t === "residential" || t === "business") return t;
    }
  } catch {
    /* sessão indisponível — segue para a dica de rota */
  }
  const path = window.location.pathname;
  if (BUSINESS_PATH_HINTS.some((p) => path === p || path.startsWith(`${p}/`))) return "business";
  return "unknown";
}

/**
 * Chaves proibidas na telemetria da triagem (GA4/Sentry/breadcrumbs).
 * Dados pessoais, texto livre e identificadores de patrimônio nunca saem
 * do navegador por estes helpers — apenas dimensões categóricas.
 */
export const BLOCKED_TELEMETRY_KEYS = [
  "nome", "name", "nome_completo", "contato",
  "empresa", "company", "business_name", "biz-empresa", "razao_social", "cnpj",
  "descricao", "description", "biz-descricao", "detalhes", "observacao", "final_notes",
  "mensagem", "message", "wa_message", "text",
  "telefone", "phone", "whatsapp", "email",
  "endereco", "address", "rua", "numero", "complemento", "cep",
  "lat", "lng", "latitude", "longitude", "ip",
  "marca", "modelo", "serial", "patrimonio",
  "foto", "fotos", "photo", "photos",
  "answers", "triage", "triage_answers", "state", "fields", "business",
];

const BLOCKED_SET = new Set(BLOCKED_TELEMETRY_KEYS.map((k) => k.toLowerCase()));
/** Limite defensivo de cardinalidade para valores string. */
const MAX_VALUE_LEN = 80;

/** Remove PII/texto livre e limita a cardinalidade de qualquer payload. */
export function sanitizeTelemetry(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input)) {
    if (BLOCKED_SET.has(k.toLowerCase())) continue;
    if (v === undefined || v === null) continue;
    if (typeof v === "string") {
      out[k] = v.length > MAX_VALUE_LEN ? v.slice(0, MAX_VALUE_LEN) : v;
      continue;
    }
    if (typeof v === "number" || typeof v === "boolean") { out[k] = v; continue; }
    if (Array.isArray(v)) {
      out[k] = v.filter((i) => typeof i === "string").slice(0, 6).join("|").slice(0, MAX_VALUE_LEN);
      continue;
    }
    // Objetos completos (estado da triagem) nunca são enviados.
  }
  return out;
}

export function track(name: string, params: Record<string, unknown> = {}) {
  const g = gtag();
  const payload = sanitizeTelemetry(baseParams({ ...branchContext, ...params }));
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

export const trackFunnelOpen = (location: string, hasPreset = false) => {
  track("wa_funnel_open", { cta_location: location, has_preset: hasPreset });
  // Persistido para permitir medir abertura → conversão (wa_click) no painel.
  persistClickEvent("funnel_open", location, readTriageFallback(), {});
};


/** Escolha do ramo PF × PJ (primeira etapa da triagem). */
export const trackFunnelBranch = (params: {
  customerType: "residential" | "business";
  ctaLocation?: string;
}) =>
  track("wa_funnel_branch", {
    customer_type: params.customerType,
    cta_location: params.ctaLocation || "wa_funnel",
  });

/** Escolhas estruturais do ramo empresarial (sem dados pessoais). */
export const trackFunnelBusinessProfile = (params: {
  intent?: string;
  engagement?: string;
  deviceRange?: string;
  impact?: string;
  modalidade?: string;
}) =>
  track("wa_funnel_business_profile", {
    business_intent: params.intent || "unknown",
    business_engagement: params.engagement || "unknown",
    business_device_range: params.deviceRange || "unknown",
    business_impact: params.impact || "unknown",
    modalidade: params.modalidade || "unknown",
  });

export const trackFunnelStep = (
  step: number,
  equipamento?: string | null,
  sintoma?: string | null,
  ctaLocation = "unknown",
  stepName?: string,
) =>
  track("wa_funnel_step", {
    step,
    step_name: stepName || "unknown",
    equipamento: equipamento || "none",
    sintoma: sintoma || "none",
    ctaLocation,
  });


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

function persistClickEvent(eventType: "wa_click" | "call_click" | "funnel_open", location: string, ctx: { modalidade: string; problema: string; equipamento: string }, extra: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const utms = readUtms();
  const payload = {
    event_type: eventType,
    cta_location: location,
    modalidade: ctx.modalidade,
    equipamento: ctx.equipamento,
    problema: ctx.problema,
    servico: typeof extra.servico === "string" ? extra.servico : null,
    bairro: typeof extra.bairro === "string" ? extra.bairro : null,
    cidade: typeof extra.cidade === "string" ? extra.cidade : null,
    customer_type: resolveCustomerType(),
    session_id: getSessionId(),
    path,
    // Segmentação do dashboard: tipo de rota + campanha de origem.
    route_type: routeTypeFromPath(path),
    utm_source: utms.utm_source || DEFAULT_UTM_SOURCE,
    utm_medium: normalizeUtmMedium(
      (utms.utm_medium as string | undefined) ||
        (typeof extra.utm_medium === "string" ? extra.utm_medium : undefined),
    ),
    utm_campaign: utms.utm_campaign || campaignFromPath(path),
    attribution_channel: readAttribution().channel,
  };
  // Fire-and-forget; nunca bloqueia o clique.
  void supabase.from("click_events").insert(payload).then(({ error }) => {
    if (error && (window as unknown as { __funnelDebug?: boolean }).__funnelDebug) {
      // eslint-disable-next-line no-console
      console.debug("[click_events] insert failed", error.message);
    }
  });
}

export const trackWaClick = (location: string, extra: Record<string, unknown> = {}) => {
  const ctx = readTriageFallback();
  track("wa_click", { cta_location: location, customer_type: resolveCustomerType(), ...ctx, ...extra });
  persistClickEvent("wa_click", location, ctx, extra);
};

export const trackCallClick = (location: string, extra: Record<string, unknown> = {}) => {
  const ctx = readTriageFallback();
  track("call_click", { cta_location: location, customer_type: resolveCustomerType(), ...ctx, ...extra });
  persistClickEvent("call_click", location, ctx, extra);
};

/**
 * Submit efetivo do modal "Agendar agora" (Agendar → WhatsApp). Complementa
 * `trackFunnelAgendarClick` para medir taxa clique→envio dentro do modal.
 */
export const trackFunnelAgendarSubmit = (params: {
  servico?: string | null;
  regiao?: string | null;
  hasDate?: boolean;
  hasTime?: boolean;
  ctaLocation?: string;
}) =>
  track("wa_funnel_agendar_submit", {
    servico: params.servico || "unknown",
    regiao: params.regiao || "unknown",
    has_date: !!params.hasDate,
    has_time: !!params.hasTime,
    cta_location: params.ctaLocation || "scheduling_modal",
  });


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


/**
 * Qualificação curta (nome, bairro, urgência e sintoma) enviada imediatamente
 * antes de abrir o WhatsApp. Envia ao GA4 e ao buffer global de observabilidade
 * (`window.__APP_ERRORS__` / evento `app:error` — consumido pelo Sentry quando
 * habilitado). Não inclui telefone nem qualquer contato direto.
 */
export const trackFunnelQualification = (params: {
  nome?: string;
  bairro?: string;
  urgencia?: string | null;
  sintoma?: string | null;
  categoria?: string | null;
  modalidade?: string | null;
  triageId?: string;
  originUrl?: string;
}) => {
  const payload = {
    // nome não é enviado em claro ao analytics: só o indicador de preenchimento.
    has_nome: Boolean(params.nome?.trim()),
    bairro: params.bairro?.trim() || "unknown",
    urgencia: params.urgencia || "unknown",
    sintoma: params.sintoma || "unknown",
    categoria: params.categoria || "unknown",
    modalidade: params.modalidade || "unknown",
    triage_id: params.triageId || "unknown",
    origin_url: params.originUrl || "unknown",
  };
  track("wa_funnel_qualification", payload);
  try {
    const w = window as unknown as {
      Sentry?: { addBreadcrumb?: (b: Record<string, unknown>) => void };
      __APP_ERRORS__?: Array<Record<string, unknown>>;
    };
    w.Sentry?.addBreadcrumb?.({
      category: "funnel",
      level: "info",
      message: "wa_funnel_qualification",
      data: sanitizeTelemetry(payload),
    });
    w.__APP_ERRORS__ = w.__APP_ERRORS__ || [];
    w.__APP_ERRORS__.push({ kind: "funnel_qualification", ...sanitizeTelemetry(payload), ts: Date.now() });
    window.dispatchEvent(
      new CustomEvent("app:funnel-qualification", { detail: payload }),
    );
  } catch {
    /* noop */
  }
};

// ============================================================
// Ordem de serviço, avaliações e QR codes
// ============================================================

/** PDF da Ordem de Serviço baixado/aberto pelo cliente. */
export const trackOsPdfDownload = (params: {
  protocolo?: string | null;
  origem?: string;
  servico?: string | null;
}) =>
  track("os_pdf_download", {
    protocolo: params.protocolo || "unknown",
    origem: params.origem || "wizard_montagem",
    servico: params.servico || "montagem-de-pc",
  });

/** Abertura da página de avaliação (link enviado no WhatsApp). */
export const trackReviewLinkOpen = (params: {
  protocolo?: string | null;
  utmSource?: string | null;
  servico?: string | null;
}) =>
  track("review_link_open", {
    protocolo: params.protocolo || "unknown",
    utm_source: params.utmSource || "direct",
    servico: params.servico || "unknown",
  });

/** Envio da avaliação com estrelas. */
export const trackReviewSubmit = (params: {
  rating: number;
  authorized: boolean;
  servico?: string | null;
  bairro?: string | null;
}) =>
  track("review_submit", {
    rating: params.rating,
    authorized_publication: params.authorized,
    servico: params.servico || "unknown",
    regiao: params.bairro || "unknown",
  });

/** Exibição/uso de QR code de contato. */
export const trackQrCode = (action: "open" | "scan_hint", channel: "whatsapp" | "call", location: string) =>
  track("qr_code_" + action, { channel, cta_location: location });

/** Pedido de exclusão de dados (LGPD). */
export const trackDataDeletionRequest = (params: { via: string }) =>
  track("data_deletion_request", { via: params.via });
