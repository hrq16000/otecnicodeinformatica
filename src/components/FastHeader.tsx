const WHATSAPP_NUMBER = "5541997086380";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";
const SCHEDULE_MESSAGE = "Olá! Quero agendar atendimento técnico.";

const trackHeaderClick = (type: "whatsapp" | "chatbot") => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick(type, "header"));
};

const menuGroups: Array<{
  label: string;
  icon: string;
  highlight?: boolean;
  links?: Array<{ label: string; href: string }>;
  href?: string;
}> = [
  { label: "Início", icon: "⌂", href: "/" },
  {
    label: "Arrumar PC",
    icon: "◉",
    highlight: true,
    links: [
      { label: "Atendimento Brasil (remoto)", href: "/arrumar-pc" },
      { label: "Suporte online", href: "/arrumar-pc/online" },
      { label: "Atendimento remoto", href: "/atendimento-remoto" },
    ],
  },
  {
    label: "Serviços",
    icon: "⌘",
    links: [
      { label: "Todos os Serviços", href: "/servicos" },
      { label: "Formatação", href: "/servicos/formatacao-computador" },
      { label: "Remoção de Vírus", href: "/servicos/remocao-virus" },
      { label: "Upgrade SSD/RAM", href: "/servicos/upgrade-ssd-memoria" },
      { label: "Conserto PC/Notebook", href: "/servicos/conserto-pc-notebook" },
    ],
  },
  {
    label: "Atendimento",
    icon: "⌕",
    links: [
      { label: "Como Funciona", href: "/como-funciona" },
      { label: "Preço", href: "/valores" },
      { label: "Domicílio", href: "/atendimento-domicilio" },
      { label: "Remoto", href: "/atendimento-remoto" },
      { label: "Empresas", href: "/suporte-empresas" },
    ],
  },
  {
    label: "Regiões",
    icon: "⌖",
    links: [
      { label: "Curitiba", href: "/tecnico-informatica-curitiba" },
      { label: "São José dos Pinhais", href: "/tecnico-informatica-sao-jose-pinhais" },
      { label: "Araucária", href: "/tecnico-informatica-araucaria" },
      { label: "Campo Largo", href: "/tecnico-informatica-campo-largo" },
      { label: "Pinhais", href: "/tecnico-informatica-pinhais" },
    ],
  },
  {
    label: "Saiba Mais",
    icon: "▤",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" },
    ],
  },
];

export const FastHeader = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const scheduleUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(SCHEDULE_MESSAGE)}`;

  // Shrink-on-scroll: alterna `data-scrolled` no <html>, e o CSS troca
  // `--site-header-height` por sua versão compacta. Sem re-render do React.
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

  return (
    <header
      data-testid="site-header"
      className="fixed left-0 right-0 top-0 h-[var(--site-header-height)] border-b border-border bg-background/95 shadow-[var(--shadow-sm)] backdrop-blur-md transition-[height] duration-200"
      style={{ zIndex: "var(--z-header)" as unknown as number }}
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-2">
        <a href="/" aria-label="Início" className="min-w-0 flex-shrink-0">
          <img
            alt="Técnico Curitiba — Assistência Técnica em Informática"
            src="/__l5e/assets-v1/957e727d-8074-4275-82c1-a2a326c28b7a/logo-tecnico-curitiba.png"
            width="304"
            height="98"
            decoding="sync"
            // @ts-ignore - fetchpriority is valid HTML attribute
            fetchpriority="high"
            className="h-12 w-auto object-scale-down transition-[height] duration-200 sm:h-14 md:h-16 [html[data-scrolled='1']_&]:h-9 [html[data-scrolled='1']_&]:sm:h-10 [html[data-scrolled='1']_&]:md:h-11"
          />
        </a>

        <nav className="hidden items-center gap-1 text-sm font-semibold md:flex" aria-label="Navegação principal">
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/servicos">Serviços</a>
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/valores">Preço</a>
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/como-funciona">Atendimento</a>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeaderClick("whatsapp")}
            aria-label="WhatsApp"
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[hsl(var(--whatsapp))] px-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-[hsl(var(--whatsapp-hover))] sm:min-w-24"
          >
            <span aria-hidden="true">☏</span>
            <span>WhatsApp</span>
          </a>

          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeaderClick("chatbot")}
            aria-label="Agendar atendimento"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-accent px-3 text-sm font-bold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            Agendar
          </a>

          <details className="group/root relative">
            <summary
              aria-label="Abrir menu"
              title="Abrir menu"
              className="inline-flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent/10 hover:text-accent marker:hidden [&::-webkit-details-marker]:hidden"
            >
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 group-open/root:top-2.5 group-open/root:rotate-45" />
                <span className="absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 group-open/root:opacity-0" />
                <span className="absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 group-open/root:top-2.5 group-open/root:-rotate-45" />
              </span>
            </summary>
            <nav
              aria-label="Menu principal"
              className="absolute right-0 top-[calc(100%+8px)] max-h-[calc(100dvh-var(--site-header-height)-16px)] w-[min(92vw,360px)] overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-[var(--shadow-xl)]"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
                <span className="text-accent" aria-hidden="true">✦</span>
                Menu
              </div>
              <div className="grid gap-2 border-b border-border p-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackHeaderClick("whatsapp")} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--whatsapp))] px-4 text-sm font-bold text-primary-foreground">
                  <span aria-hidden="true">☏</span> Falar no WhatsApp
                </a>
                <a href="/arrumar-pc" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/5 px-4 text-sm font-semibold text-accent">
                  <span aria-hidden="true">◉</span> Arrumar PC online — Brasil
                </a>
              </div>
              <div className="grid gap-1 p-2 text-sm">
                {menuGroups.map((group) =>
                  group.links ? (
                    <details key={group.label} className="group/menu">
                      <summary className={`flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-xl px-2.5 py-2 font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent marker:hidden [&::-webkit-details-marker]:hidden ${group.highlight ? "bg-accent/5 text-accent" : ""}`}>
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${group.highlight ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"}`} aria-hidden="true">{group.icon}</span>
                        <a
                          href={group.links[0]?.href}
                          className="flex-1 rounded-md py-1 hover:text-accent"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {group.label}
                        </a>
                        <span className="transition-transform group-open/menu:rotate-180" aria-hidden="true">⌄</span>
                      </summary>
                      <div className="grid gap-0.5 py-1 pl-14 pr-1">
                        {group.links.map((link) => (
                          <a key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-foreground/85 hover:bg-accent/10 hover:text-accent">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <a key={group.href} href={group.href} className="flex min-h-12 items-center gap-3 rounded-xl px-2.5 py-2 font-medium text-foreground hover:bg-accent/10 hover:text-accent">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent" aria-hidden="true">{group.icon}</span>
                      {group.label}
                    </a>
                  )
                )}
              </div>
              <div className="border-t border-border p-4 text-center text-xs text-muted-foreground">
                © Técnico Curitiba — Atendimento Brasil via WhatsApp
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
};
