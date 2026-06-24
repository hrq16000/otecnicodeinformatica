// Google Analytics & Ads tracking utilities — no UI imports here to keep the first load lean.

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA4_ID = 'G-B9VPHCZC10';
const ADS_ID = 'AW-17892118207';
const ADS_CONVERSION_LABEL = 'AW-17892118207/i5jSCMqi1JYcEL-d0NNC';

// Google Ads conversion with callback (mirrors gtag_report_conversion snippet)
export const gtagReportConversion = (url?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const callback = () => {
      if (url) {
        window.location.href = url;
      }
    };
    window.gtag('event', 'conversion', {
      send_to: ADS_CONVERSION_LABEL,
      value: 1.0,
      currency: 'BRL',
      event_callback: callback,
    });
  } else if (url) {
    window.location.href = url;
  }
};

// Read UTM params from current URL (set by Ads autotag / SEO campaigns)
const getUtmContext = () => {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || undefined,
    utm_medium: p.get('utm_medium') || undefined,
    utm_campaign: p.get('utm_campaign') || undefined,
    utm_term: p.get('utm_term') || undefined,
    utm_content: p.get('utm_content') || undefined,
    gclid: p.get('gclid') || undefined,
  };
};

// Device dimension: habilita relatório "conversões/CTR por dispositivo" no GA4
// (mobile/tablet/desktop), inferido por largura + ponteiro coarse.
const getDeviceContext = () => {
  if (typeof window === 'undefined') return { device: 'unknown' as const, viewport_width: 0 };
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  const coarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
  const device = w < 768 || coarse ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  return { device, viewport_width: w };
};

// Lead dedup: gera/persiste um ID por sessão por tipo de CTA para evitar
// múltiplos `generate_lead` na mesma sessão (clicar 2x no WhatsApp = 1 lead).
const LEAD_KEY = 'lead_dedup_v1';
type LeadMap = Partial<Record<'whatsapp' | 'phone' | 'chatbot', string>>;
const readLeadMap = (): LeadMap => {
  try { return JSON.parse(sessionStorage.getItem(LEAD_KEY) || '{}') as LeadMap; } catch { return {}; }
};
const writeLeadMap = (m: LeadMap) => {
  try { sessionStorage.setItem(LEAD_KEY, JSON.stringify(m)); } catch { /* noop */ }
};
const ensureLeadId = (ctaType: 'whatsapp' | 'phone' | 'chatbot'): { leadId: string; isNew: boolean } => {
  const map = readLeadMap();
  if (map[ctaType]) return { leadId: map[ctaType]!, isNew: false };
  const leadId = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  map[ctaType] = leadId;
  writeLeadMap(map);
  return { leadId, isNew: true };
};

// Track CTA clicks for conversions
export const trackCTAClick = (ctaType: 'whatsapp' | 'phone' | 'chatbot', location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const utm = getUtmContext();
    const deviceCtx = getDeviceContext();
    const { leadId, isNew } = ensureLeadId(ctaType);
    const payload = {
      event_category: 'engagement',
      event_label: `${ctaType}_${location}`,
      cta_type: ctaType,
      cta_location: location,
      page_path: window.location.pathname,
      value: 1,
      lead_id: leadId,
      ...deviceCtx,
      ...utm,
    };

    // Custom event (for funnels / debug)
    window.gtag('event', 'cta_click', payload);

    // Eventos GA4 nomeados — facilitam Key Events e relatórios por dispositivo.
    if (ctaType === 'whatsapp') {
      window.gtag('event', 'click_whatsapp', payload);
      window.gtag('event', 'generate_lead', {
        ...payload,
        currency: 'BRL',
        method: 'whatsapp',
      });
    } else if (ctaType === 'phone') {
      window.gtag('event', 'click_call', payload);
      window.gtag('event', 'generate_lead', {
        ...payload,
        currency: 'BRL',
        method: 'phone',
      });
    }

    // Fire the official Google Ads conversion
    gtagReportConversion();

    // Visual debug for WhatsApp clicks (dev or ?debug_utm=1)
    if (ctaType === 'whatsapp') {
      const debugFlag =
        (import.meta as any).env?.DEV ||
        (typeof window !== 'undefined' &&
          (new URLSearchParams(window.location.search).get('debug_utm') === '1' ||
            window.localStorage.getItem('debug_utm') === '1'));
      // Console always for diagnostics
      // eslint-disable-next-line no-console
      console.log('[GA4 cta_click → WhatsApp]', payload);
      if (debugFlag) console.info('[GA4 debug]', { ...utm, location });
    }
  }
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA4_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};
