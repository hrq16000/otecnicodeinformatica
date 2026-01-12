// Google Analytics tracking utilities

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track CTA clicks for conversions
export const trackCTAClick = (ctaType: 'whatsapp' | 'phone', location: string) => {
  // Google Analytics event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: `${ctaType}_${location}`,
      value: 1
    });
    
    // Google Ads conversion tracking
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion ID
      value: 1.0,
      currency: 'BRL'
    });
  }
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', { // Replace with actual GA4 ID
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};
