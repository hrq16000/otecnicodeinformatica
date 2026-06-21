const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const trackHeaderClick = (type: "whatsapp" | "chatbot") => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick(type, "header"));
};

export const FastHeader = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const openChatbot = () => {
    trackHeaderClick("chatbot");
    window.dispatchEvent(new CustomEvent("openChatbot"));
  };

  return (
    <header
      data-testid="site-header"
      className="fixed left-0 right-0 top-0 h-[var(--site-header-height)] border-b border-border bg-background/95 shadow-[var(--shadow-sm)] backdrop-blur-md"
      style={{ zIndex: "var(--z-header)" as unknown as number }}
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-2">
        <a href="/" aria-label="Início" className="min-w-0 flex-shrink-0">
          <img
            alt="Técnico Curitiba — Assistência Técnica em Informática"
            src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
            width="304"
            height="98"
            decoding="sync"
            fetchpriority="high"
            className="h-8 w-auto object-scale-down sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex" aria-label="Navegação principal">
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/servicos">Serviços</a>
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/como-funciona">Atendimento</a>
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/tecnico-informatica-curitiba">Regiões</a>
          <a className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" href="/blog">Saiba Mais</a>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeaderClick("whatsapp")}
            aria-label="WhatsApp"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[hsl(var(--whatsapp))] px-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-[hsl(var(--whatsapp-hover))] sm:min-w-24"
          >
            <span className="sm:hidden" aria-hidden="true">☏</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={openChatbot}
            aria-label="Agendar atendimento"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-accent px-3 text-sm font-bold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            Agendar
          </button>
          <a
            href="/servicos"
            aria-label="Abrir menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            <span aria-hidden="true">☰</span>
          </a>
        </div>
      </div>
    </header>
  );
};