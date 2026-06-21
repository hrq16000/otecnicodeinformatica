import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

export const FastHeader = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const openChatbot = () => {
    trackCTAClick("chatbot", "header");
    window.dispatchEvent(new CustomEvent("openChatbot"));
  };

  return (
    <header
      data-testid="site-header"
      className="fixed left-0 right-0 top-0 h-[var(--site-header-height)] border-b border-border bg-background/95 shadow-[var(--shadow-sm)] backdrop-blur-md"
      style={{ zIndex: "var(--z-header)" as unknown as number }}
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-2">
        <Link to="/" aria-label="Início" className="min-w-0 flex-shrink-0">
          <img
            alt="Técnico Curitiba — Assistência Técnica em Informática"
            src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
            width="304"
            height="98"
            decoding="sync"
            fetchPriority="high"
            className="h-8 w-auto object-scale-down sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex" aria-label="Navegação principal">
          <Link className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" to="/servicos">Serviços</Link>
          <Link className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" to="/como-funciona">Atendimento</Link>
          <Link className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" to="/tecnico-informatica-curitiba">Regiões</Link>
          <Link className="rounded-lg px-3 py-2 text-foreground hover:bg-accent/10 hover:text-accent" to="/blog">Saiba Mais</Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick("whatsapp", "header")}
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
          <Link
            to="/servicos"
            aria-label="Abrir menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            <span aria-hidden="true">☰</span>
          </Link>
        </div>
      </div>
    </header>
  );
};