/**
 * ============================================================================
 * RODADA 6 — CONTRATO CENTRAL DE ANALYTICS (SEO → FUNIL → LEAD → RESULTADO)
 * ============================================================================
 *
 * Fonte única de verdade para:
 *   • nomes canônicos de evento (+ camada de compatibilidade com o histórico);
 *   • contexto comum permitido em qualquer evento;
 *   • famílias de rota, intenção declarada, cidade, bairro e serviço;
 *   • identificador efêmero de jornada (sem PII, com TTL);
 *   • first-touch / last-touch;
 *   • classificação de amostra e cálculo de taxa com denominador explícito.
 *
 * REGRAS ABSOLUTAS
 *   1. Contexto desconhecido é `undefined` — nunca fallback geográfico falso
 *      (SJP jamais vira Curitiba; página sem serviço não ganha service_slug).
 *   2. Nenhum campo de PII/texto livre sai daqui. A sanitização final continua
 *      centralizada em `sanitizeTelemetry` (funnelAnalytics.ts).
 *   3. Nada aqui pode bloquear navegação: tudo é puro e à prova de exceção.
 */
import {
  cityFromPath,
  neighborhoodSlugFromPath,
  normalizeTrackingLabel,
  serviceSlugFromPath,
} from "./trackingTaxonomy";
import { resolveLocal } from "./localIndexPolicy";

/* ────────────────────────────── FASE 3 — ROUTE FAMILY ───────────────────── */

export const ROUTE_FAMILIES = [
  "home",
  "service",
  "problem",
  "city",
  "neighborhood",
  "service_city",
  "institutional",
  "blog",
  "other",
] as const;
export type RouteFamily = (typeof ROUTE_FAMILIES)[number];

const INSTITUTIONAL = /^\/(sobre|contato|faq|precos-e-politicas|valores|termos-e-condicoes|politica-privacidade|politica-cookies-e-anuncios|como-funciona|ordem-de-servico|status-da-ordem-de-servico|status-os|seja-parceiro|status|anuncie|creditos-de-imagens|excluir-meus-dados|gestor-responsavel|areas-atendidas|equipamentos-atendidos|depoimentos|como-avaliar|obrigado)/;

/** Deriva a família da rota. Nunca devolve string arbitrária. */
export function routeFamilyFromPath(pathname: string): RouteFamily {
  const p = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  if (/^\/blog(\/|$)/.test(p)) return "blog";
  if (/^\/problemas(\/|$)/.test(p)) return "problem";
  if (/^\/bairros\/[a-z0-9-]+$/.test(p)) return "neighborhood";
  if (/^\/servicos\/[^/]+\/[^/]+$/.test(p)) return "service_city";
  if (/^\/servicos(\/|$)/.test(p)) return "service";
  if (/^\/(tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-[a-z0-9-]+$/.test(p)) return "city";
  if (INSTITUTIONAL.test(p)) return "institutional";
  return "other";
}

/* ────────────────────────────── FASE 4 — INTENÇÃO ───────────────────────── */

export const INTENT_CATEGORIES = [
  "diagnostic",
  "commercial",
  "local",
  "service_local",
  "brand",
  "informational",
] as const;
export type IntentCategory = (typeof INTENT_CATEGORIES)[number];

/**
 * Intenção vem da ARQUITETURA (família + policy), nunca de texto livre em
 * runtime. Rotas sem intenção declarada devolvem `undefined`.
 */
export function intentFromPath(pathname: string): IntentCategory | undefined {
  const family = routeFamilyFromPath(pathname);
  switch (family) {
    case "home":
      return "brand";
    case "problem":
      return "diagnostic";
    case "blog":
      return "informational";
    case "service":
      return "commercial";
    case "service_city":
      return "service_local";
    case "city":
    case "neighborhood":
      return "local";
    case "institutional":
      return "informational";
    default:
      return undefined;
  }
}

/** Indexabilidade declarada na policy local (somente leitura, para análise). */
export function indexabilityFromPath(pathname: string): string | undefined {
  try {
    return resolveLocal(pathname)?.indexability;
  } catch {
    return undefined;
  }
}

/* ────────────────────────────── FASE 10 — CTA LOCATION ──────────────────── */

export const CTA_LOCATIONS = [
  "hero",
  "mid_page",
  "pricing",
  "faq",
  "service_card",
  "sticky",
  "footer",
  "final_cta",
  "header",
  "float",
  "funnel",
  "other",
] as const;
export type CtaLocation = (typeof CTA_LOCATIONS)[number];

const CTA_ALIASES: Record<string, CtaLocation> = {
  topo: "hero",
  hero_cta: "hero",
  hero_principal: "hero",
  banner: "hero",
  meio: "mid_page",
  conteudo: "mid_page",
  precos: "pricing",
  valores: "pricing",
  tabela_precos: "pricing",
  perguntas: "faq",
  faq_section: "faq",
  card_servico: "service_card",
  servico_card: "service_card",
  cards: "service_card",
  fixo: "sticky",
  barra_fixa: "sticky",
  sticky_mobile: "sticky",
  rodape: "footer",
  cta_final: "final_cta",
  final: "final_cta",
  cta: "final_cta",
  topo_header: "header",
  menu: "header",
  flutuante: "float",
  whatsapp_float: "float",
  wa_funnel: "funnel",
  wa_funnel_review: "funnel",
  modal: "funnel",
};

/** Normaliza qualquer rótulo de CTA para o vocabulário canônico. */
export function normalizeCtaLocation(raw: string | undefined | null): CtaLocation {
  const slug = normalizeTrackingLabel(raw);
  if ((CTA_LOCATIONS as readonly string[]).includes(slug)) return slug as CtaLocation;
  return CTA_ALIASES[slug] ?? "other";
}

/* ────────────────────────────── FASE 2 — EVENTOS ────────────────────────── */

export const ANALYTICS_EVENTS = {
  pageView: "page_view",
  ctaClick: "cta_click",
  triageStart: "triage_start",
  triageStep: "triage_step",
  triageComplete: "triage_complete",
  triageAbandon: "triage_abandon",
  whatsappOpen: "whatsapp_open",
  leadSubmitted: "lead_submitted",
  osCreated: "os_created",
  conversion: "conversion",
  /** Rodada 7A — sessão exposta a uma variação de experimento. */
  experimentExposure: "experiment_exposure",
} as const;
export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];


/**
 * Camada de compatibilidade: eventos históricos continuam sendo emitidos
 * (o histórico do GA4 não pode ser quebrado) e são mapeados para o nome
 * canônico do contrato para efeito de análise/gates.
 */
export const LEGACY_EVENT_MAP: Record<string, AnalyticsEvent> = {
  wa_funnel_open: "triage_start",
  funnel_open: "triage_start",
  wa_funnel_step: "triage_step",
  funnel_stage: "triage_step",
  wa_funnel_submit: "triage_complete",
  wa_funnel_agendar_click: "triage_complete",
  wa_click: "whatsapp_open",
  click_whatsapp: "whatsapp_open",
  call_click: "cta_click",
  generate_lead: "lead_submitted",
};

/** Nome canônico de um evento (histórico ou já contratual). */
export function canonicalEventName(name: string): AnalyticsEvent | undefined {
  if ((Object.values(ANALYTICS_EVENTS) as string[]).includes(name)) return name as AnalyticsEvent;
  return LEGACY_EVENT_MAP[name];
}

/* ────────────────────────────── FASE 3 — CONTEXTO COMUM ─────────────────── */

export interface RouteContext {
  route: string;
  route_family: RouteFamily;
  page_slug: string;
  service_slug?: string;
  city?: string;
  neighborhood_slug?: string;
  intent?: IntentCategory;
}

/** Chaves de contexto permitidas em qualquer evento do contrato. */
export const CONTEXT_KEYS = [
  "route",
  "route_family",
  "page_slug",
  "service_slug",
  "city",
  "neighborhood_slug",
  "intent",
  "source",
  "session_id",
  "journey_id",
  "event_id",
  "experiment_id",
  "variant",
] as const;


/** Chaves proibidas — gate `check:analytics-event-contract` falha se aparecerem. */
export const FORBIDDEN_CONTEXT_KEYS = [
  "name",
  "nome",
  "email",
  "phone",
  "telefone",
  "whatsapp",
  "address",
  "endereco",
  "numero",
  "cep",
  "cpf",
  "cnpj",
  "document",
  "documento",
  "free_text",
  "texto_livre",
  "descricao",
  "mensagem",
  "wa_message",
  "lat",
  "lng",
  "latitude",
  "longitude",
  "foto",
  "fotos",
] as const;

const semSentinela = (v: string | undefined) =>
  !v || v === "nao_definida" || v === "nao_aplicavel" || v === "desconhecido" || v === "unknown"
    ? undefined
    : v;

/**
 * Contexto comum da rota. Campos ausentes ficam `undefined` — melhor do que
 * fallback falso (FASE 8 / FASE 47).
 */
export function buildRouteContext(pathname?: string): RouteContext {
  const raw =
    pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const route = (raw || "/").replace(/\/+$/, "") || "/";
  const segments = route.split("/").filter(Boolean);
  return {
    route,
    route_family: routeFamilyFromPath(route),
    page_slug: segments[segments.length - 1] ?? "home",
    service_slug: semSentinela(serviceSlugFromPath(route)),
    city: semSentinela(cityFromPath(route)),
    neighborhood_slug: semSentinela(neighborhoodSlugFromPath(route)),
    intent: intentFromPath(route),
  };
}

/* ────────────────────────────── FASE 7 — JORNADA ────────────────────────── */

const JOURNEY_KEY = "journey_v1";
/** TTL de 30 minutos — pseudônimo efêmero, nunca identificador de pessoa. */
export const JOURNEY_TTL_MS = 30 * 60 * 1000;

type JourneyRecord = { id: string; exp: number };

/**
 * Identificador efêmero de jornada. Sem PII, sem fingerprint, com TTL
 * renovado a cada evento e escopo de sessão (sessionStorage).
 */
export function getJourneyId(now = Date.now()): string {
  const novo = () => `j_${now.toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  if (typeof window === "undefined") return "server";
  try {
    const raw = sessionStorage.getItem(JOURNEY_KEY);
    const rec = raw ? (JSON.parse(raw) as JourneyRecord) : null;
    const id = rec && rec.exp > now && rec.id ? rec.id : novo();
    sessionStorage.setItem(JOURNEY_KEY, JSON.stringify({ id, exp: now + JOURNEY_TTL_MS }));
    return id;
  } catch {
    return novo();
  }
}

/** Identificador único de evento (FASE 36) — habilita dedupe sem PII. */
export function newEventId(): string {
  return `e_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/* ────────────────────────────── FASES 17/18 — TOUCHPOINTS ───────────────── */

export interface Touchpoint {
  landing_route: string;
  landing_route_family: RouteFamily;
  landing_service?: string;
  landing_city?: string;
  landing_neighborhood?: string;
}

const FIRST_KEY = "touch_first_v1";
const LAST_KEY = "touch_last_v1";

const toTouchpoint = (ctx: RouteContext): Touchpoint => ({
  landing_route: ctx.route,
  landing_route_family: ctx.route_family,
  landing_service: ctx.service_slug,
  landing_city: ctx.city,
  landing_neighborhood: ctx.neighborhood_slug,
});

/**
 * Registra a rota atual como last-touch e, na primeira vez da sessão, também
 * como first-touch. First-touch NUNCA é sobrescrito (FASE 18).
 */
export function recordTouchpoint(ctx = buildRouteContext()): {
  first_touch?: Touchpoint;
  last_touch: Touchpoint;
} {
  const atual = toTouchpoint(ctx);
  if (typeof window === "undefined") return { last_touch: atual };
  try {
    if (!sessionStorage.getItem(FIRST_KEY)) {
      sessionStorage.setItem(FIRST_KEY, JSON.stringify(atual));
    }
    sessionStorage.setItem(LAST_KEY, JSON.stringify(atual));
  } catch {
    /* storage bloqueado — segue sem atribuição */
  }
  return { first_touch: readTouchpoint("first") ?? atual, last_touch: atual };
}

export function readTouchpoint(qual: "first" | "last"): Touchpoint | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(qual === "first" ? FIRST_KEY : LAST_KEY);
    return raw ? (JSON.parse(raw) as Touchpoint) : undefined;
  } catch {
    return undefined;
  }
}

/** Jornada assistida (FASE 31): landing ≠ rota de conversão. */
export function isAssistedJourney(conversionRoute = buildRouteContext().route): boolean {
  const first = readTouchpoint("first");
  return Boolean(first && first.landing_route !== conversionRoute);
}

/* ────────────────────────────── FASES 21/22 — MÉTRICAS ──────────────────── */

export type SampleStatus = "insufficient_data" | "learning" | "actionable";

/** Volume mínimo para leitura — nunca declaramos significância estatística. */
export const SAMPLE_THRESHOLDS = { learning: 30, actionable: 200 } as const;

export function sampleStatus(denominador: number): SampleStatus {
  if (!Number.isFinite(denominador) || denominador < SAMPLE_THRESHOLDS.learning) {
    return "insufficient_data";
  }
  return denominador < SAMPLE_THRESHOLDS.actionable ? "learning" : "actionable";
}

export const SAMPLE_LABEL: Record<SampleStatus, string> = {
  insufficient_data: "Dados insuficientes",
  learning: "Em aprendizado",
  actionable: "Acionável",
};

/**
 * Taxa com denominador explícito e zero-state seguro: sem base, devolve `null`
 * (o painel mostra "—", nunca NaN/Infinity).
 */
export function rate(parte: number, denominador: number): number | null {
  if (!denominador || !Number.isFinite(denominador) || denominador <= 0) return null;
  if (!Number.isFinite(parte)) return null;
  return parte / denominador;
}

export function formatRate(parte: number, denominador: number): string {
  const r = rate(parte, denominador);
  return r === null ? "—" : `${(r * 100).toFixed(1)}%`;
}

/* ────────────────────────────── FASES 15/16 — DEFINIÇÕES ────────────────── */

/**
 * Definições oficiais do funil desta rodada. Documentadas em
 * `docs/analytics-event-contract.md` e usadas pelo painel/relatórios.
 */
export const FUNNEL_DEFINITIONS = {
  micro: ["cta_click", "triage_start", "triage_complete", "whatsapp_open"] as const,
  lead: "lead_submitted",
  operational: "os_created",
} as const;
