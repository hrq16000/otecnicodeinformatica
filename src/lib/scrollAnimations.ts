/**
 * Global scroll-triggered animation system.
 * Auto-applies .fade-up / .fade-in to sections, cards, and content blocks.
 * Uses IntersectionObserver for performant reveal on scroll.
 * Respects prefers-reduced-motion.
 */

const SELECTORS = [
  'main > section',
  'main > div > section',
  '[class*="container"] > [class*="grid"] > div',
  '[class*="container"] > [class*="max-w"] > [class*="grid"] > div',
  'main [class*="card"]',
  'main [class*="rounded-xl"]',
  'main [class*="rounded-lg"]',
  'main img[loading="lazy"]',
  'main picture',
].join(', ');

const EXCLUDE_SELECTORS = [
  'header', 'nav', '[role="navigation"]',
  'button', 'a[href]', 'input', 'textarea', 'select', 'label',
  '[class*="fixed"]', '[class*="sticky"]',
  '[class*="WhatsApp"]', '[class*="whatsapp"]',
  '[class*="modal"]', '[class*="dialog"]', '[class*="popup"]',
  '[class*="toast"]', '[class*="sonner"]',
];

function shouldExclude(el: Element): boolean {
  for (const sel of EXCLUDE_SELECTORS) {
    if (el.matches(sel) || el.closest(sel)) return true;
  }
  // Skip elements already animated by AnimatedSection
  if (el.classList.contains('anim-fade-up') ||
      el.classList.contains('anim-fade-in') ||
      el.classList.contains('anim-fade-soft')) return true;
  // Skip very small elements (buttons, icons)
  const rect = el.getBoundingClientRect();
  if (rect.height < 30) return true;
  return false;
}

let observer: IntersectionObserver | null = null;

export function initScrollAnimations(): void {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Clean up previous observer if any
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-visible');
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  const elements = document.querySelectorAll(SELECTORS);
  let index = 0;

  elements.forEach((el) => {
    if (shouldExclude(el)) return;
    // Already has animation class
    if (el.classList.contains('fade-up') || el.classList.contains('fade-in')) return;

    // 70% fade-up, 30% fade-in
    const cls = index % 10 < 7 ? 'fade-up' : 'fade-in';
    el.classList.add(cls);
    index++;

    // If already in viewport, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('fade-visible');
    } else {
      observer!.observe(el);
    }
  });
}

export function cleanupScrollAnimations(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
