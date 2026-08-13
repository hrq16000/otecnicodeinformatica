/**
 * Runtime guard (dev-only): garante que todo clique em CTA passa pelo funil
 * obrigatório com tracking (click_location + app_version).
 *
 * - Avisa no console quando um botão/anchor com cara de CTA é clicado
 *   sem que `trackCTAClick` tenha sido chamado no mesmo tick.
 * - Verifica periodicamente se algum número de telefone/WhatsApp ficou
 *   visível no DOM.
 */
// @ts-nocheck


import { WHATSAPP_CONFIGURED, CONTACT_FALLBACK_URL } from "@/lib/siteConfig";

const PHONE_RE = /\(?\b(?:41|11|21)\)?\s*9?\s*\d{4}\s*-?\s*\d{4}\b/;
const WA_NUMBER_RE = /55\s*41\s*9{0,1}\s*7\s*\d{3}\s*-?\s*\d{4}/;

declare global {
  interface Window {
    __ctaTracked?: { type?: string; location?: string; t: number };
  }
}

function installClickGuard() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>("a,button");
      if (!el) return;
      const text = (el.textContent || "").toLowerCase();
      const looksLikeCta =
        el.dataset.ctaLocation ||
        el.getAttribute("data-wa-funnel") ||
        /whatsapp|agendar|ligar|fale|valor do atendimento|agora/.test(text);
      if (!looksLikeCta) return;
      const tracked = window.__ctaTracked;
      setTimeout(() => {
        const fresh = window.__ctaTracked;
        if (!fresh || Date.now() - fresh.t > 500) {
          // eslint-disable-next-line no-console
          console.warn(
            "[cta-guard] CTA clicado sem trackCTAClick:",
            { text: text.slice(0, 40), el },
          );
        }
      }, 50);
      void tracked;
    },
    true,
  );
}

function installNumberLeakWatcher() {
  if (typeof document === "undefined") return;
  const scan = () => {
    const body = document.body?.innerText || "";
    if (PHONE_RE.test(body) || WA_NUMBER_RE.test(body)) {
      // eslint-disable-next-line no-console
      console.warn("[cta-guard] Número de telefone/WhatsApp exposto no DOM visível");
    }
  };
  // Scan after hydration + on route changes
  setTimeout(scan, 1500);
  window.addEventListener("popstate", () => setTimeout(scan, 500));
}

/**
 * RODADA 1 — FAIL-CLOSED DE CONTATO (roda também em produção).
 * Enquanto o WhatsApp da nova operação não estiver configurado, nenhum clique
 * pode abrir wa.me: o lead iria para a operação de origem. Todo CTA cai na
 * rota de indisponibilidade.
 */
function installContactFailClosed() {
  if (typeof document === "undefined" || WHATSAPP_CONFIGURED) return;
  document.addEventListener(
    "click",
    (e) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      if (!/wa\.me|api\.whatsapp\.com|web\.whatsapp\.com/i.test(href)) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(CONTACT_FALLBACK_URL);
    },
    true,
  );
}

export function installCtaRuntimeGuard() {
  installContactFailClosed();
  if (import.meta.env.PROD) return;
  installClickGuard();
  installNumberLeakWatcher();
}
