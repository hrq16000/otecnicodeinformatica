import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Bot,
  Search,
  Home,
  Wrench,
  Headphones,
  MapPin,
  BookOpen,
  Globe,
  Sparkles,
  Cpu,
  ShieldCheck,
  HardDrive,
  Zap,
  Gauge,
  Monitor,
  CircuitBoard,
  Hammer,
  Wifi,
  DatabaseBackup,
  Camera,
  ListChecks,
  ClipboardList,
  CreditCard,
  Stethoscope,
  Truck,
  Building2,
  FileText,
  Cog,
  PackageSearch,
  AlertTriangle,
  HelpCircle,
  Info,
  Mail,
  Handshake,
} from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { SmartSearch } from "@/components/SmartSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico.";

type SubItem = { label: string; to: string; icon: any };
type NavItem = {
  label: string;
  to: string;
  icon: any;
  highlight?: boolean;
  sub?: SubItem[];
};

const mainNavItems: NavItem[] = [
  { label: "Início", to: "/", icon: Home },
  {
    label: "Arrumar PC",
    to: "/arrumar-pc",
    icon: Globe,
    highlight: true,
    sub: [
      { label: "Atendimento Brasil (remoto)", to: "/arrumar-pc", icon: Globe },
      { label: "Suporte online", to: "/arrumar-pc/online", icon: Wifi },
      { label: "Atendimento remoto", to: "/atendimento-remoto", icon: Headphones },
    ],
  },
  {
    label: "Serviços",
    to: "/servicos",
    icon: Wrench,
    sub: [
      { label: "Assistência Técnica Curitiba", to: "/assistencia-tecnica-curitiba", icon: Sparkles },
      { label: "Formatação", to: "/servicos/formatacao-computador", icon: HardDrive },
      { label: "Remoção de Vírus", to: "/servicos/remocao-virus", icon: ShieldCheck },
      { label: "Upgrade SSD/RAM", to: "/servicos/upgrade-ssd-memoria", icon: Zap },
      { label: "Conserto PC/Notebook", to: "/servicos/conserto-pc-notebook", icon: Cpu },
      { label: "Computador Lento", to: "/servicos/computador-lento", icon: Gauge },
      { label: "Computador Não Liga", to: "/servicos/computador-nao-liga", icon: AlertTriangle },
      { label: "Manutenção de TV", to: "/servicos/manutencao-tv", icon: Monitor },
      { label: "Conserto de Placa", to: "/servicos/conserto-placa", icon: CircuitBoard },
      { label: "Montagem de PC", to: "/servicos/montagem-pc", icon: Hammer },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-wifi", icon: Wifi },
      { label: "Backup e Recuperação", to: "/servicos/backup-recuperacao", icon: DatabaseBackup },
      { label: "CFTV / Câmeras", to: "/cftv", icon: Camera },
      { label: "Todos os Serviços", to: "/servicos", icon: ListChecks },
    ],
  },
  {
    label: "Atendimento",
    to: "/como-funciona",
    icon: Headphones,
    sub: [
      { label: "Como Funciona", to: "/como-funciona", icon: ClipboardList },
      { label: "Preços e Políticas", to: "/precos-e-politicas", icon: CreditCard },
      { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico", icon: Stethoscope },
      { label: "Domicílio", to: "/atendimento-domicilio", icon: Home },
      { label: "Coleta e Entrega", to: "/coleta-e-entrega", icon: Truck },
      { label: "Remoto", to: "/atendimento-remoto", icon: Wifi },
      { label: "Empresas", to: "/suporte-empresas", icon: Building2 },
    ],
  },
  {
    label: "Regiões",
    to: "/tecnico-informatica-curitiba",
    icon: MapPin,
    sub: [
      { label: "Curitiba", to: "/tecnico-informatica-curitiba", icon: MapPin },
      { label: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais", icon: MapPin },
      { label: "Araucária", to: "/tecnico-informatica-araucaria", icon: MapPin },
      { label: "Campo Largo", to: "/tecnico-informatica-campo-largo", icon: MapPin },
      { label: "Pinhais", to: "/tecnico-informatica-pinhais", icon: MapPin },
      { label: "Colombo", to: "/tecnico-informatica-colombo", icon: MapPin },
      { label: "Fazenda Rio Grande", to: "/tecnico-informatica-fazenda-rio-grande", icon: MapPin },
      { label: "Almirante Tamandaré", to: "/tecnico-informatica-almirante-tamandare", icon: MapPin },
      { label: "Piraquara", to: "/tecnico-informatica-piraquara", icon: MapPin },
      { label: "Campo Magro", to: "/tecnico-informatica-campo-magro", icon: MapPin },
      { label: "Quatro Barras", to: "/tecnico-informatica-quatro-barras", icon: MapPin },
    ],
  },
  {
    label: "Saiba Mais",
    to: "/blog",
    icon: BookOpen,
    sub: [
      { label: "Blog", to: "/blog", icon: FileText },
      { label: "Procedimentos Técnicos", to: "/procedimentos-placa", icon: Cog },
      { label: "Equipamentos Atendidos", to: "/equipamentos-atendidos", icon: PackageSearch },
      { label: "Casos Reais", to: "/problemas-reais-e-casos", icon: AlertTriangle },
      { label: "Quando Não Compensa", to: "/quando-nao-compensa", icon: HelpCircle },
      { label: "FAQ", to: "/faq", icon: HelpCircle },
      { label: "Sobre", to: "/sobre", icon: Info },
      { label: "Contato", to: "/contato", icon: Mail },
      { label: "Seja Parceiro", to: "/seja-parceiro", icon: Handshake },
    ],
  },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const { isDark, toggle: toggleDark } = useDarkMode();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenMobileGroup(null);
  }, []);

  // Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smart search hotkey
  useEffect(() => {
    const handler = () => setSearchOpen(true);
    window.addEventListener("openSmartSearch", handler);
    return () => window.removeEventListener("openSmartSearch", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  // Close on ESC
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, closeMobile]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleWhatsAppClick = () => trackCTAClick("whatsapp", "header");
  const openChatbot = () => {
    trackCTAClick("chatbot", "header");
    window.dispatchEvent(new CustomEvent("openChatbot"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-0.5 bg-background/90 backdrop-blur-xl shadow-[var(--shadow-md)]"
          : "py-1 bg-background/80 backdrop-blur-md shadow-[var(--shadow-sm)]"
      }`}
    >
      {/* Gradient underline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container mx-auto flex items-center justify-between gap-2">
        <Link to="/" className="flex-shrink-0" aria-label="Início">
          <img
            alt="Técnico Curitiba — Assistência Técnica em Informática"
            src="/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp"
            width="304"
            height="98"
            className={`transition-all duration-300 w-auto object-scale-down ${
              isScrolled ? "h-7 sm:h-9 md:h-10" : "h-9 sm:h-11 md:h-12"
            }`}
          />
        </Link>

        {/* Desktop Navigation — compact, with icons */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNavItems.map((item) =>
            item.sub ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium outline-none group transition-all duration-300 whitespace-nowrap ${
                    item.highlight
                      ? "text-accent hover:bg-accent/10"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  }`}
                >
                  <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                  <span>{item.label}</span>
                  <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-64 bg-background/95 backdrop-blur-xl border border-border/60 shadow-[var(--shadow-xl)] rounded-2xl p-1.5 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                >
                  {item.sub.map((sub) => (
                    <DropdownMenuItem
                      key={sub.to}
                      asChild
                      className="rounded-xl px-2.5 py-2 text-sm text-foreground cursor-pointer transition-all duration-200 focus:bg-accent/10 focus:text-accent data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent group"
                    >
                      <Link to={sub.to} className="w-full flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-[var(--shadow-accent)]">
                          <sub.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1">{sub.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-foreground hover:text-accent hover:bg-accent/5 transition-all duration-300 group whitespace-nowrap"
              >
                <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <DarkModeToggle isDark={isDark} toggle={toggleDark} className="hidden sm:block" />

          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex text-foreground/70 hover:text-accent hover:scale-110 transition-transform"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="whatsapp" size="sm" className="hidden sm:flex shadow-sm group h-9" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
              <MessageCircle className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </Button>

          <Button variant="whatsapp" size="icon" className="sm:hidden group h-9 w-9" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </Button>

          <Button
            variant="cta"
            size="sm"
            className="shadow-sm group h-9"
            onClick={openChatbot}
            aria-label="Atendimento rápido"
          >
            <Bot className="h-4 w-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">Atender</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden flex-shrink-0 h-9 w-9 relative"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop — clique aqui fecha */}
        <div
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={closeMobile}
        />

        {/* Painel */}
        <div
          ref={menuRef}
          className={`absolute top-2 right-2 max-h-[calc(100dvh-1rem)] w-[88vw] max-w-sm bg-background border border-border rounded-2xl shadow-2xl overflow-y-auto transition-all duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do drawer */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-xl border-b border-border">
            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Menu
            </span>
            <div className="flex items-center gap-1">
              <DarkModeToggle isDark={isDark} toggle={toggleDark} />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeMobile} aria-label="Fechar menu">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* CTA destaque dentro do drawer */}
          <div className="p-4 grid gap-2 border-b border-border">
            <Button variant="whatsapp" size="lg" className="w-full group shadow-md" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                <MessageCircle className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Falar no WhatsApp
              </a>
            </Button>
            <Link
              to="/arrumar-pc"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/5 text-accent text-sm font-semibold py-2.5 hover:bg-accent/10 transition-colors"
            >
              <Globe className="h-4 w-4" />
              Arrumar PC online — Brasil
            </Link>
          </div>

          {/* Lista */}
          <nav className="p-2">
            {mainNavItems.map((item, idx) => {
              const isOpen = openMobileGroup === item.label;
              return (
                <div
                  key={item.label}
                  className="opacity-0 animate-[heroFadeUp_0.35s_ease-out_forwards]"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {!item.sub ? (
                    <Link
                      to={item.to}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-accent/8 hover:text-accent transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <item.icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all ${
                          item.highlight
                            ? "text-accent bg-accent/5"
                            : "text-foreground hover:bg-accent/8 hover:text-accent"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                            item.highlight
                              ? "bg-accent text-accent-foreground shadow-[var(--shadow-accent)]"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pl-3 pr-1 py-1 grid gap-0.5">
                            {item.sub.map((sub) => (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                onClick={closeMobile}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground/85 hover:bg-accent/8 hover:text-accent transition-colors"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                  <sub.icon className="h-3.5 w-3.5" />
                                </span>
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 text-center text-xs text-muted-foreground border-t border-border mt-2">
            © Técnico Curitiba — Atendimento Brasil via WhatsApp
          </div>
        </div>
      </div>

      <SmartSearch isOpen={searchOpen} onClose={closeSearch} />
    </header>
  );
};
