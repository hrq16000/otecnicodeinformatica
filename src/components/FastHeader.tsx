import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { whatsappLink } from "@/lib/siteConfig";

const WA_SCHEDULE = whatsappLink("Olá! Quero agendar um atendimento técnico.");

const trackHeaderClick = (type: "whatsapp" | "chatbot") => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick(type, "header"));
};

// Navegação enxuta — foco em informática/PC/notebook/empresarial.
const primaryNav = [
  { label: "Serviços", href: "/servicos" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Preços", href: "/precos-e-politicas" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
];

// Itens extras do menu mobile (mantém acesso, sem poluir o header).
const mobileExtra = [
  { label: "Suporte empresarial", href: "/servicos/suporte-tecnico-empresarial" },
  { label: "Atendimento a domicílio", href: "/atendimento-domicilio" },
  { label: "Atendimento remoto", href: "/atendimento-remoto" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
];

export const FastHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Shrink-on-scroll sem re-render do React.
  if (typeof window !== "undefined" && !(window as any).__hdrScrollBound) {
    (window as any).__hdrScrollBound = true;
    const sync = () => {
      const scrolled = window.scrollY > 24 ? "1" : "0";
      if (document.documentElement.dataset.scrolled !== scrolled) {
        document.documentElement.dataset.scrolled = scrolled;
      }
    };
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  // Fecha ao clicar fora ou pressionar Esc.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      data-testid="site-header"
      className="fixed left-0 right-0 top-0 h-[var(--site-header-height)] border-b border-border/80 bg-background/95 backdrop-blur-md transition-[height] duration-200"
      style={{ zIndex: "var(--z-header)" as unknown as number }}
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-3">
        <a href="/" aria-label="Técnico em Curitiba — início" className="min-w-0 flex-shrink-0">
          <img
            alt="Técnico em Curitiba — assistência técnica em informática"
            src="/logo.webp"
            width="304"
            height="71"
            decoding="sync"
            // @ts-ignore - fetchpriority is a valid HTML attribute
            fetchpriority="high"
            className="h-11 w-auto object-scale-down transition-[height] duration-200 sm:h-12 md:h-14 [html[data-scrolled='1']_&]:h-9 [html[data-scrolled='1']_&]:md:h-10"
          />
        </a>

        <nav className="hidden items-center gap-0.5 text-sm font-semibold xl:flex" aria-label="Navegação principal">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WA_SCHEDULE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeaderClick("chatbot")}
            data-cta-location="header_agendar"
            data-wa-source="whatsapp_cta"
            aria-label="Iniciar atendimento"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02]"
          >
            <span className="sm:hidden">Atender</span>
            <span className="hidden sm:inline">Iniciar atendimento</span>
          </a>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              )}
            </button>

            {menuOpen && (
              <nav
                aria-label="Menu mobile"
                className="absolute right-0 top-[calc(100%+8px)] max-h-[calc(100dvh-var(--site-header-height)-16px)] w-[min(90vw,320px)] origin-top-right animate-in fade-in slide-in-from-top-2 overflow-y-auto rounded-2xl border border-border bg-background p-2 text-foreground shadow-[var(--shadow-xl)] duration-150"
              >
                <div className="grid gap-0.5">
                  {[...primaryNav, ...mobileExtra].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <div className="mt-2 border-t border-border p-2">
                  <a
                    href={WA_SCHEDULE}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackHeaderClick("chatbot");
                      setMenuOpen(false);
                    }}
                    data-cta-location="header_mobile_agendar"
                    data-wa-source="whatsapp_cta"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-accent-foreground"
                  >
                    Iniciar atendimento
                  </a>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
