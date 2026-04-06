import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Menu, X, ChevronDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

const mainNavItems = [
  { label: "Início", to: "/" },
  {
    label: "Serviços",
    to: "/servicos",
    sub: [
      { label: "Formatação", to: "/servicos/formatacao-computador" },
      { label: "Remoção de Vírus", to: "/servicos/remocao-virus" },
      { label: "Upgrade SSD/RAM", to: "/servicos/upgrade-ssd-memoria" },
      { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-wifi" },
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao" },
      { label: "CFTV / Câmeras", to: "/cftv" },
      { label: "Todos os Serviços", to: "/servicos" },
    ],
  },
  {
    label: "Atendimento",
    to: "/como-funciona",
    sub: [
      { label: "Como Funciona", to: "/como-funciona" },
      { label: "Preços e Políticas", to: "/precos-e-politicas" },
      { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
      { label: "Domicílio", to: "/atendimento-domicilio" },
      { label: "Coleta e Entrega", to: "/coleta-e-entrega" },
      { label: "Remoto", to: "/atendimento-remoto" },
      { label: "Empresas", to: "/suporte-empresas" },
    ],
  },
  {
    label: "Regiões",
    to: "/tecnico-informatica-curitiba",
    sub: [
      { label: "Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais" },
      { label: "Araucária", to: "/tecnico-informatica-araucaria" },
      { label: "Campo Largo", to: "/tecnico-informatica-campo-largo" },
      { label: "Pinhais", to: "/tecnico-informatica-pinhais" },
    ],
  },
  {
    label: "Saiba Mais",
    to: "/blog",
    sub: [
      { label: "Blog", to: "/blog" },
      { label: "Equipamentos Atendidos", to: "/equipamentos-atendidos" },
      { label: "Casos Reais", to: "/problemas-reais-e-casos" },
      { label: "Quando Não Compensa", to: "/quando-nao-compensa" },
      { label: "FAQ", to: "/faq" },
      { label: "Sobre", to: "/sobre" },
      { label: "Contato", to: "/contato" },
    ],
  },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick('whatsapp', 'header');
  };

  const openChatbot = () => {
    trackCTAClick('chatbot', 'header');
    // Dispara evento customizado para abrir o chatbot
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background shadow-sm transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img
            alt="Técnico Curitiba - Assistência Técnica em Informática"
            src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
            className={`transition-all duration-300 w-auto object-scale-down ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {mainNavItems.map((item) => (
            item.sub ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors">
                  {item.label} <ChevronDown className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  {item.sub.map((sub) => (
                    <DropdownMenuItem key={sub.to} asChild>
                      <Link to={sub.to} className="w-full cursor-pointer">
                        {sub.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            )
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="whatsapp" size="sm" className="hidden sm:flex" asChild>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </Button>

          <Button variant="whatsapp" size="icon" className="sm:hidden" asChild>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button>

          <Button variant="cta" size="sm" onClick={openChatbot}>
            <Bot className="h-4 w-4" />
            <span className="hidden md:inline">Atendimento Rápido</span>
            <span className="md:hidden">Atender</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t">
          <nav className="container mx-auto py-4 flex flex-col gap-3">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="border-t border-border pt-3 mt-1">
              {moreNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base block"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
