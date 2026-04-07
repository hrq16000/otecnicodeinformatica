import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Menu, X, ChevronDown, Bot } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { DarkModeToggle } from "@/components/DarkModeToggle";
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
      { label: "Computador Lento", to: "/servicos/computador-lento" },
      { label: "Computador Não Liga", to: "/servicos/computador-nao-liga" },
      { label: "Manutenção de TV", to: "/servicos/manutencao-tv" },
      { label: "Conserto de Placa", to: "/servicos/conserto-placa" },
      { label: "Montagem de PC", to: "/servicos/montagem-pc" },
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
      { label: "Colombo", to: "/tecnico-informatica-colombo" },
      { label: "Fazenda Rio Grande", to: "/tecnico-informatica-fazenda-rio-grande" },
      { label: "Almirante Tamandaré", to: "/tecnico-informatica-almirante-tamandare" },
      { label: "Piraquara", to: "/tecnico-informatica-piraquara" },
      { label: "Campo Magro", to: "/tecnico-informatica-campo-magro" },
      { label: "Quatro Barras", to: "/tecnico-informatica-quatro-barras" },
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
  const { isDark, toggle: toggleDark } = useDarkMode();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => trackCTAClick('whatsapp', 'header');

  const openChatbot = () => {
    trackCTAClick('chatbot', 'header');
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-1 bg-background/95 backdrop-blur-md shadow-[var(--shadow-md)]'
          : 'py-2 bg-background shadow-[var(--shadow-sm)]'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img
            alt="Técnico Curitiba - Assistência Técnica em Informática"
            src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
            width="304"
            height="98"
            className={`transition-all duration-300 w-auto object-scale-down ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {mainNavItems.map((item) => (
            item.sub ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors outline-none group">
                  {item.label} <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-[var(--shadow-lg)] rounded-xl p-1.5">
                  {item.sub.map((sub) => (
                    <DropdownMenuItem key={sub.to} asChild className="rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-accent/8 hover:text-accent focus:bg-accent/8 focus:text-accent cursor-pointer transition-colors">
                      <Link to={sub.to} className="w-full">
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
          <Button variant="whatsapp" size="sm" className="hidden sm:flex shadow-sm group" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
              <MessageCircle className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </Button>

          <Button variant="whatsapp" size="icon" className="sm:hidden group" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
              <MessageCircle className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </Button>

          <Button variant="cta" size="sm" className="shadow-sm group" onClick={openChatbot}>
            <Bot className="h-4 w-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
            <span className="hidden md:inline">Atendimento Rápido</span>
            <span className="md:hidden">Atender</span>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5 rotate-0 transition-transform duration-300" /> : <Menu className="h-5 w-5 hover:scale-110 transition-transform duration-300" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[80vh] overflow-y-auto shadow-[var(--shadow-lg)]">
          <nav className="container mx-auto py-4 flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <div key={item.label}>
                {!item.sub ? (
                  <NavLink to={item.to} onClick={() => setMobileMenuOpen(false)} className="py-2 text-base block">
                    {item.label}
                  </NavLink>
                ) : (
                  <>
                    <p className="py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                      {item.label}
                    </p>
                    {item.sub.map((sub) => (
                      <NavLink key={sub.to} to={sub.to} onClick={() => setMobileMenuOpen(false)} className="py-1.5 pl-3 text-base block">
                        {sub.label}
                      </NavLink>
                    ))}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
