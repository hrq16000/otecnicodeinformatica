// Global UTM injector for WhatsApp links (wa.me / api.whatsapp.com).
// Runs once on mount; intercepts clicks and appends utm_source/medium/campaign
// derived from the current page so GA4/Ads can attribute lead origin.

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
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
  return path.replace(/\//g, "_").slice(0, 80);
}

function deriveMedium(el: HTMLElement | null): string {
  if (!el) return "cta";
  const cls = (el.closest("[data-wa-medium]") as HTMLElement | null)?.dataset.waMedium;
  if (cls) return cls;
  // Heuristics by location
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("[class*='float']") || el.closest("[aria-label*='WhatsApp']")) return "float";
  return "cta";
}

function readEntryUtms(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem("utm_payload_v1");
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function withUtm(href: string, medium: string, campaign: string, location: string): string {
  try {
    const u = new URL(href, window.location.origin);
    const text = u.searchParams.get("text");

    // 1) Propaga UTMs originais da entrada do visitante (atribuição da campanha).
    const entry = readEntryUtms();
    for (const [k, v] of Object.entries(entry)) {
      if (v && !u.searchParams.has(k)) u.searchParams.set(k, v);
    }

    // 2) Fallbacks por local de clique (não sobrescreve UTMs existentes).
    if (!u.searchParams.has("utm_source")) u.searchParams.set("utm_source", "site");
    if (!u.searchParams.has("utm_medium")) u.searchParams.set("utm_medium", medium);
    if (!u.searchParams.has("utm_campaign")) u.searchParams.set("utm_campaign", campaign);

    // 3) Marca o local de clique (sempre).
    u.searchParams.set("click_location", location);

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
      const location =
        (anchor.closest("[data-cta-location]") as HTMLElement | null)?.dataset.ctaLocation ||
        anchor.dataset.ctaLocation ||
        medium;
      anchor.href = withUtm(anchor.href, medium, campaign, location);
      anchor.dataset.utmApplied = "1";
    },
    true
  );
}
