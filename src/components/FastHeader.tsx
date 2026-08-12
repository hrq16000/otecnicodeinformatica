import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  Menu,
  X,
  Wrench,
  Route,
  Tag,
  HelpCircle,
  MessageCircle,
  Building2,
  Home,
  MonitorSmartphone,
  Info,
  Users,
  type LucideIcon,
} from "lucide-react";
import { whatsappLink } from "@/lib/siteConfig";
import { brandConfig } from "@/lib/config";
import { MegaMenu, type MegaGrupo } from "@/components/MegaMenu";

const WA_SCHEDULE = whatsappLink("Olá! Quero agendar um atendimento técnico.");

const trackHeaderClick = (type: "whatsapp" | "chatbot") => {
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick(type, "header"));
};

type NavItem = { label: string; href: string; icon: LucideIcon };

// Navegação enxuta — foco em informática/PC/notebook/empresarial.
const primaryNav: NavItem[] = [
  { label: "Serviços", href: "/servicos", icon: Wrench },
  { label: "Empresas", href: "/servicos/suporte-tecnico-empresarial", icon: Building2 },
  { label: "Como funciona", href: "/como-funciona", icon: Route },
  { label: "Preços", href: "/precos-e-politicas", icon: Tag },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Contato", href: "/contato", icon: MessageCircle },
];

// Itens extras do menu mobile (mantém acesso, sem poluir o header).
const mobileExtra: NavItem[] = [
  { label: "Atendimento a domicílio", href: "/atendimento-domicilio", icon: Home },
  { label: "Atendimento remoto", href: "/atendimento-remoto", icon: MonitorSmartphone },
  { label: "Profissionais parceiros", href: "/profissionais", icon: Users },
  { label: "Valorização do trabalho técnico", href: "/valorizacao-do-trabalho-tecnico", icon: Info },
  { label: "Sobre", href: "/sobre", icon: Info },
];

// Mega-menu contextual: entra pelo problema, pelo equipamento ou pelo perfil.
const megaGrupos: MegaGrupo[] = [
  {
    id: "problemas",
    label: "Meu problema",
    icon: Wrench,
    colunas: [
      {
        titulo: "Sintomas comuns",
        links: [
          { label: "Computador não liga", href: "/problemas/computador-nao-liga-curitiba" },
          { label: "Notebook desligando sozinho", href: "/problemas/notebook-desligando-sozinho-curitiba" },
          { label: "PC muito lento", href: "/problemas/computador-lento" },
          { label: "Travando e tela azul", href: "/problemas/computador-travando-curitiba" },
          { label: "Superaquecendo", href: "/problemas/pc-superaquecendo-curitiba" },
        ],
      },
      {
        titulo: "Serviços mais pedidos",
        links: [
          { label: "Formatação com backup", href: "/servicos/formatacao" },
          { label: "Limpeza e troca de pasta térmica", href: "/servicos/manutencao-de-computador" },
          { label: "Recuperação de dados", href: "/servicos/recuperacao-de-dados" },
          { label: "Upgrade de SSD e memória", href: "/servicos/upgrade-ssd-ram" },
          { label: "Ver todos os serviços", href: "/servicos" },
        ],
      },
      {
        titulo: "Por equipamento",
        links: [
          { label: "Notebook", href: "/equipamentos/notebook" },
          { label: "Desktop / PC", href: "/equipamentos/desktop" },
          { label: "Impressora", href: "/equipamentos/impressora" },
          { label: "Roteador e Wi-Fi", href: "/equipamentos/roteador" },
          { label: "Ver todos os equipamentos", href: "/equipamentos" },
        ],
      },
    ],

    destaque: {
      titulo: "Não sabe nomear o defeito?",
      texto: "Descreva com suas palavras. A triagem identifica o cenário antes de qualquer preço.",
      cta: "Fazer triagem",
      href: "/#triagem",
    },
  },
  {
    id: "empresas",
    label: "Empresas",
    icon: Building2,
    colunas: [
      {
        titulo: "Para o seu negócio",
        links: [
          { label: "Atendimento para empresas", href: "/empresas" },
          { label: "Suporte técnico empresarial", href: "/servicos/suporte-tecnico-empresarial" },
          { label: "Manutenção preventiva", href: "/servicos/manutencao-preventiva-empresas" },
          { label: "Backup para empresas", href: "/servicos/backup-para-empresas" },
        ],
      },
      {
        titulo: "Infraestrutura",
        links: [
          { label: "Empresa de TI em Curitiba", href: "/empresa-de-ti-curitiba" },
          { label: "Redes e cabeamento", href: "/servicos/redes-e-wifi" },
        ],
      },
    ],
    destaque: {
      titulo: "Estação parada custa caro",
      texto: "Triagem empresarial com prioridade por impacto: máquina parada, rede instável ou backup.",
      cta: "Abrir chamado",
      href: "/empresas",
    },
  },
  {
    id: "profissionais",
    label: "Profissionais",
    icon: Users,
    colunas: [
      {
        titulo: "Rede de parceiros",
        links: [
          { label: "Encontrar profissional", href: "/profissionais" },
          { label: "Quero fazer parte da rede", href: "/profissionais/cadastro" },
          { label: "Valorização do trabalho técnico", href: "/valorizacao-do-trabalho-tecnico" },
        ],
      },
      {
        titulo: "Transparência",
        links: [
          { label: "Preços e políticas", href: "/precos-e-politicas" },
          { label: "Quando não compensa consertar", href: "/quando-nao-compensa" },
          { label: "Como funciona o atendimento", href: "/como-funciona" },
        ],
      },
    ],
    destaque: {
      titulo: "Sem leilão de preço",
      texto: "A rede não coloca técnico para disputar quem cobra menos. Perfil próprio e contato direto.",
      cta: "Ver a rede",
      href: "/profissionais",
    },
  },
  { id: "precos", label: "Preços", icon: Tag, href: "/precos-e-politicas" },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "/faq" },
  { id: "contato", label: "Contato", icon: MessageCircle, href: "/contato" },
];



export const FastHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  // Quando o menu abre por teclado, focar o primeiro item.
  const focusFirstOnOpen = useRef(false);

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

  // Fecha ao clicar fora ou pressionar Esc (devolvendo o foco ao botão).
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
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

  // Ao abrir por teclado, move o foco para o primeiro item do menu.
  useEffect(() => {
    if (menuOpen && focusFirstOnOpen.current) {
      focusFirstOnOpen.current = false;
      const first = listRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
      first?.focus();
    }
  }, [menuOpen]);

  const itemsEls = () =>
    Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);

  // Navegação por setas / Home / End dentro do menu.
  const onMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = itemsEls();
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1 + items.length) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      // Fecha ao sair do menu por Tab, mantendo o fluxo natural de foco.
      setMenuOpen(false);
    }
  };

  const onButtonKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !menuOpen) {
      e.preventDefault();
      focusFirstOnOpen.current = true;
      setMenuOpen(true);
    }
  };


  return (
    <header
      data-testid="site-header"
      className="fixed left-0 right-0 top-0 h-[var(--site-header-height)] border-b border-border/80 bg-background/95 backdrop-blur-md transition-[height] duration-200"
      style={{ zIndex: "var(--z-header)" as unknown as number }}
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-3">
        <a href="/" aria-label={`${brandConfig.brandName} — início`} className="min-w-0 flex-shrink-0">
          <img
            alt={brandConfig.logoAlt}
            src={brandConfig.logoOnLight}
            width="304"
            height="68"
            decoding="sync"
            // @ts-ignore - fetchpriority is a valid HTML attribute
            fetchpriority="high"
            className="h-11 w-auto object-scale-down transition-[height] duration-200 sm:h-12 md:h-14 [html[data-scrolled='1']_&]:h-9 [html[data-scrolled='1']_&]:md:h-10"
          />
        </a>

        <MegaMenu grupos={megaGrupos} />


        <div className="flex items-center gap-2">
          <a
            href={WA_SCHEDULE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeaderClick("chatbot")}
            data-cta-location="header_agendar"
            data-wa-source="whatsapp_cta"
            aria-label="Iniciar atendimento"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02]"
          >
            <span className="sm:hidden">Atender</span>
            <span className="hidden sm:inline">Solicitar atendimento</span>
          </a>

          <div ref={menuRef} className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={onButtonKeyDown}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-controls="site-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              )}
            </button>

            {menuOpen && (
              <nav
                id="site-menu"
                aria-label="Menu de navegação"
                className="menu-panel absolute right-0 top-[calc(100%+8px)] z-50 max-h-[calc(100dvh-var(--site-header-height)-16px)] w-[min(90vw,320px)] origin-top-right overflow-y-auto rounded-2xl border border-border bg-background p-2 text-foreground opacity-100 shadow-[var(--shadow-xl)]"
              >
                <div
                  ref={listRef}
                  role="menu"
                  aria-label="Páginas do site"
                  onKeyDown={onMenuKeyDown}
                  className="grid gap-0.5"
                >
                  {[...primaryNav, ...mobileExtra].map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      style={{ animationDelay: `${i * 35}ms` }}
                      className="menu-item group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-accent/10 hover:text-accent focus-visible:bg-accent/10 focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-200 group-hover:scale-110">
                        <item.icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                      </span>
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
