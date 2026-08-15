/**
 * Global scroll-triggered animation system.
 * Auto-applies .fade-up / .fade-in to sections, cards, and content blocks.
 * Uses IntersectionObserver for performant reveal on scroll.
 * Respects prefers-reduced-motion.
 *
 * REGRA: Toda página nova herda animações automaticamente via este sistema.
 */

const SELECTORS = [
  // Sections em qualquer nível
  'section',
  // Cards e blocos de conteúdo
  '[class*="grid"] > div',
  '[class*="grid"] > article',
  '[class*="grid"] > a',
  // Rounded containers (cards)
  '[class*="rounded-xl"]:not(button):not(a):not(input):not(select)',
  '[class*="rounded-2xl"]:not(button):not(a):not(input):not(select)',
  // Content blocks
  '[class*="max-w-"] > div > div',
  '[class*="container"] > div > h2',
  '[class*="container"] > div > h3',
  // Images
  'img[loading="lazy"]',
  'picture',
  // Flex wrap items (neighborhood pills, badges)
  '[class*="flex-wrap"] > a',
  '[class*="flex-wrap"] > div',
  // Prose / text blocks
  '[class*="prose"]',
].join(', ');

const EXCLUDE_SELECTORS = [
  'header', 'nav', '[role="navigation"]',
  'button', 'input', 'textarea', 'select', 'label',
  '[class*="fixed"]', '[class*="sticky"]',
  '[class*="WhatsApp"]', '[class*="whatsapp"]',
  '[class*="modal"]', '[class*="dialog"]', '[class*="popup"]',
  '[class*="toast"]', '[class*="sonner"]',
  '[class*="Breadcrumb"]', '[class*="breadcrumb"]',
  'script', 'style', 'noscript',
];

// Elements that should NOT be animated even if matched
const EXCLUDE_PARENT_SELECTORS = [
  'header', 'nav', '[role="navigation"]',
  '[class*="fixed"]', '[class*="sticky"]',
  // Hero is above the fold and must be visible immediately (CLS guard).
  '.hero-gradient',
];


function shouldExclude(el: Element): boolean {
  // Direct match
  for (const sel of EXCLUDE_SELECTORS) {
    try { if (el.matches(sel)) return true; } catch { /* skip invalid selector */ }
  }
  // Parent match
  for (const sel of EXCLUDE_PARENT_SELECTORS) {
    try { if (el.closest(sel)) return true; } catch { /* skip */ }
  }
  // Skip elements already animated by AnimatedSection or previous run
  if (el.classList.contains('anim-fade-up') ||
      el.classList.contains('anim-fade-in') ||
      el.classList.contains('anim-fade-soft') ||
      el.classList.contains('fade-up') ||
      el.classList.contains('fade-in')) return true;
  // Skip very small elements (icons, small badges)
  const rect = el.getBoundingClientRect();
  if (rect.height < 24 || rect.width < 24) return true;
  // Skip invisible / hidden
  if (rect.height === 0 || rect.width === 0) return true;
  return false;
}

let observer: IntersectionObserver | null = null;
const animatedElements: Set<Element> = new Set();

export function initScrollAnimations(): void {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Clean up previous run
  cleanupScrollAnimations();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-visible');
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  const elements = document.querySelectorAll(SELECTORS);
  let index = 0;

  elements.forEach((el) => {
    if (shouldExclude(el)) return;
    if (animatedElements.has(el)) return;

    // 70% fade-up, 30% fade-in
    const cls = index % 10 < 7 ? 'fade-up' : 'fade-in';
    el.classList.add(cls);
    animatedElements.add(el);
    index++;

    // Add stagger delay for grid children
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      const siblingIndex = siblings.indexOf(el);
      if (siblingIndex > 0 && siblingIndex < 12) {
        (el as HTMLElement).style.transitionDelay = `${siblingIndex * 60}ms`;
      }
    }

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
  // Remove animation classes from previous run so they re-apply on new routes
  animatedElements.forEach((el) => {
    el.classList.remove('fade-up', 'fade-in', 'fade-visible');
    (el as HTMLElement).style.transitionDelay = '';
  });
  animatedElements.clear();
}
