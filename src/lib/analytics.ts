// Google Analytics & Ads tracking utilities

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

// Track CTA clicks for conversions
export const trackCTAClick = (ctaType: 'whatsapp' | 'phone' | 'chatbot', location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // GA4 event
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: `${ctaType}_${location}`,
      value: 1
    });

    // Fire the official Google Ads conversion
    gtagReportConversion();
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
