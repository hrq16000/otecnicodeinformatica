// Google Analytics & Ads tracking utilities

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA4_ID = 'G-B9VPHCZC10';
const ADS_ID = 'AW-17892118207';

// Track CTA clicks for conversions
export const trackCTAClick = (ctaType: 'whatsapp' | 'phone' | 'chatbot', location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // GA4 event
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: `${ctaType}_${location}`,
      value: 1
    });

    // Google Ads conversions
    const conversionLabels: Record<string, string> = {
      whatsapp: 'whatsapp_click',
      phone: 'phone_click',
      chatbot: 'chatbot_click',
    };

    const label = conversionLabels[ctaType];
    if (label) {
      window.gtag('event', 'conversion', {
        send_to: `${ADS_ID}/${label}`,
        value: 1.0,
        currency: 'BRL'
      });
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
