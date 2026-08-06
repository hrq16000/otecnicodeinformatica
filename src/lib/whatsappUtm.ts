// Global UTM injector for WhatsApp links (wa.me / api.whatsapp.com).
// Runs once on mount; intercepts clicks and appends utm_source/medium/campaign
// derived from the current page so GA4/Ads can attribute lead origin.

import {
  DEFAULT_UTM_SOURCE,
  campaignFromPath,
  normalizeTrackingLabel,
  normalizeUtmMedium,
  routeTypeFromPath,
} from '@/lib/trackingTaxonomy';
import { geoSuggestion } from '@/lib/geoContext';
import {
  MODALIDADES,
  REGRA_CANCELAMENTO,
  TERMOS_URL,
} from '@/lib/precosConfig';
import { siteConfig } from '@/lib/siteConfig';

// Bloco comercial padrão anexado a toda mensagem de WhatsApp: modalidade,
// valor, condições e local (quando detectado). Fonte única: precosConfig.
const CONDICOES_MARK = 'Modalidades e valores:';

function buildCondicoesBlock(): string {
  const linhas = MODALIDADES.map((m) => `• ${m.titulo}: ${m.valorLabel} (${m.unidade})`);
  const local = geoSuggestion();
  return [
    CONDICOES_MARK,
    ...linhas,
    'Peças, componentes e licenças não inclusos.',
    `Cancelamento: ${REGRA_CANCELAMENTO}`,
    `Condições completas: ${siteConfig.baseUrl}${TERMOS_URL}`,
    local ? `Local: ${local}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}


const WA_HOSTS = ["wa.me", "api.whatsapp.com"];

function isWhatsAppUrl(href: string): boolean {
  try {
    const u = new URL(href, window.location.origin);
    return WA_HOSTS.some((h) => u.hostname.endsWith(h));
  } catch {
    return false;
  }
}

function deriveCampaign(): string {
  return campaignFromPath(window.location.pathname);
}

function deriveMedium(el: HTMLElement | null): string {
  if (!el) return "cta";
  const cls = (el.closest("[data-wa-medium]") as HTMLElement | null)?.dataset.waMedium;
  if (cls) return normalizeUtmMedium(cls);
  // Heuristics by location
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("[class*='float']") || el.closest("[aria-label*='WhatsApp']")) return "float";
  return "cta";
}

// Fonte do clique (substitui o antigo "Ligar Agora"): rótulo declarado no
// próprio CTA via [data-wa-source]. Vira utm_source quando o visitante não
// chegou por uma campanha externa (que sempre tem prioridade de atribuição).
function deriveSource(el: HTMLElement | null): string | null {
  if (!el) return null;
  const src = (el.closest("[data-wa-source]") as HTMLElement | null)?.dataset.waSource;
  return src && src.trim() ? normalizeTrackingLabel(src) : null;
}

function readEntryUtms(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem("utm_payload_v1");
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function withUtm(href: string, medium: string, campaign: string, location: string, source: string | null): string {
  try {
    const u = new URL(href, window.location.origin);
    const text = u.searchParams.get("text");

    // 1) Propaga UTMs originais da entrada do visitante (atribuição da campanha).
    const entry = readEntryUtms();
    for (const [k, v] of Object.entries(entry)) {
      if (v && !u.searchParams.has(k)) u.searchParams.set(k, v);
    }

    // 2) Fallbacks por local de clique (não sobrescreve UTMs de campanha).
    //    data-wa-source define a origem site-side (ex.: whatsapp_cta).
    if (!u.searchParams.has("utm_source")) u.searchParams.set("utm_source", source || DEFAULT_UTM_SOURCE);
    if (!u.searchParams.has("utm_medium")) u.searchParams.set("utm_medium", normalizeUtmMedium(medium));
    if (!u.searchParams.has("utm_campaign")) u.searchParams.set("utm_campaign", campaign);

    // 3) Marca o local de clique (sempre).
    u.searchParams.set("click_location", normalizeTrackingLabel(location));

    // Mantém text por último para preservar ordem/encoding
    if (text !== null) {
      u.searchParams.delete("text");
      u.searchParams.set("text", text);
    }
    return u.toString();
  } catch {
    return href;
  }
}

// Validação obrigatória: garante que UTMs e click_location estão presentes
// antes do clique sair para o WhatsApp. Em modo debug, loga no console.
const REQUIRED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "click_location"] as const;

export type WaUtmAudit = {
  href: string;
  params: Record<string, string | null>;
  missing: string[];
  ok: boolean;
};

export function auditWhatsAppUrl(href: string): WaUtmAudit {
  const params: Record<string, string | null> = {};
  let url: URL | null = null;
  try {
    url = new URL(href, typeof window !== "undefined" ? window.location.origin : "https://x");
  } catch {
    return { href, params, missing: [...REQUIRED_PARAMS], ok: false };
  }
  const missing: string[] = [];
  for (const k of REQUIRED_PARAMS) {
    const v = url.searchParams.get(k);
    params[k] = v;
    if (!v) missing.push(k);
  }
  return { href: url.toString(), params, missing, ok: missing.length === 0 };
}

function isDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if ((import.meta as any).env?.DEV) return true;
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("debug_utm") === "1") return true;
    if (window.localStorage.getItem("debug_utm") === "1") return true;
  } catch { /* noop */ }
  return false;
}

export function initWhatsAppUtm() {
  if (typeof window === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !isWhatsAppUrl(href)) return;
      if (anchor.dataset.utmApplied === "1") return;
      const medium = deriveMedium(anchor);
      const campaign = deriveCampaign();
      const source = deriveSource(anchor);
      const location =
        (anchor.closest("[data-cta-location]") as HTMLElement | null)?.dataset.ctaLocation ||
        anchor.dataset.ctaLocation ||
        source ||
        medium;
      anchor.href = withUtm(anchor.href, medium, campaign, location, source);
      anchor.dataset.utmApplied = "1";

      // Validação + log debug — antes do navegador seguir o link.
      const audit = auditWhatsAppUrl(anchor.href);
      if (isDebugEnabled()) {
        const style = audit.ok
          ? "color:#16a34a;font-weight:bold"
          : "color:#dc2626;font-weight:bold";
        // eslint-disable-next-line no-console
        console.groupCollapsed(`%c[WA UTM] ${audit.ok ? "OK" : "FALTANDO"} → ${location}`, style);
        // eslint-disable-next-line no-console
        console.log("href:", audit.href);
        // eslint-disable-next-line no-console
        console.table(audit.params);
        if (!audit.ok) {
          // eslint-disable-next-line no-console
          console.warn("Parâmetros ausentes:", audit.missing);
        }
        // eslint-disable-next-line no-console
        console.groupEnd();
      } else if (!audit.ok) {
        // Sempre avisa em produção se algo crítico faltar.
        // eslint-disable-next-line no-console
        console.warn("[WA UTM] link sem parâmetros obrigatórios", audit.missing, audit.href);
      }

      // Expõe último audit para inspeção manual / e2e.
      try {
        (window as any).__lastWaUtmAudit = audit;
        window.dispatchEvent(new CustomEvent("wa-utm:audit", { detail: audit }));
      } catch { /* noop */ }
    },
    true
  );
}
