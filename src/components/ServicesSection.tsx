import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Monitor, ShieldCheck, Wrench, HardDrive, Wifi, Database,
  Building2, Headphones, MapPin, ArrowRight, Camera, Clock, MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";

type Service = {
  icon: typeof Monitor;
  title: string;
  pitch: string;            // one-line persuasive promise
  link: string;
  preco: string;
  tempo: string;            // expected resolution time
  badge?: string;           // "Mais pedido", "Urgente", etc.
  waMessage: string;        // pre-filled WhatsApp message per problem
};

const allServices: Service[] = [
  {
    icon: ShieldCheck,
    title: "Remoção de Vírus",
    pitch: "PC travando, abrindo abas sozinho ou com aviso de ameaça? Limpamos hoje.",
    link: "/servicos/remocao-virus",
    preco: "R$ 99,99",
    tempo: "1–2h",
    badge: "Mais pedido",
    waMessage: "Olá! Meu computador está com vírus / lento / abrindo coisas sozinho. Preciso de ajuda hoje.",
  },
  {
    icon: Monitor,
    title: "Formatação de Computador",
    pitch: "Windows novo, drivers, Office e seus arquivos preservados.",
    link: "/servicos/formatacao-computador",
    preco: "R$ 150",
    tempo: "Mesmo dia",
    waMessage: "Olá! Quero formatar meu computador com Windows + programas. Pode me passar o passo a passo?",
  },
  {
    icon: Wrench,
    title: "Conserto de PC e Notebook",
    pitch: "Não liga, tela preta, barulho estranho? Diagnóstico antes de qualquer cobrança.",
    link: "/servicos/conserto-pc-notebook",
    preco: "Diagnóstico grátis",
    tempo: "24–48h",
    badge: "Garantia 90 dias",
    waMessage: "Olá! Meu PC/notebook está com defeito. Pode me ajudar com o diagnóstico?",
  },
  {
    icon: HardDrive,
    title: "Upgrade SSD e Memória",
    pitch: "Boot em 10s e tudo mais rápido. Instalação no mesmo dia.",
    link: "/servicos/upgrade-ssd-memoria",
    preco: "A partir de R$ 80 (M.O.)",
    tempo: "1h",
    waMessage: "Olá! Quero fazer upgrade de SSD/memória no meu computador. Pode me ajudar a escolher?",
  },
  {
    icon: Wifi,
    title: "Redes e Wi-Fi",
    pitch: "Sinal fraco, internet caindo, repetidor mal configurado? Resolvemos.",
    link: "/servicos/redes-wifi",
    preco: "A partir de R$ 80",
    tempo: "1–2h",
    waMessage: "Olá! Meu Wi-Fi está fraco / caindo. Preciso de ajuda para configurar a rede.",
  },
  {
    icon: Database,
    title: "Backup e Recuperação de Dados",
    pitch: "HD não abre, perdeu fotos ou planilhas? Tentamos recuperar antes de cobrar.",
    link: "/servicos/backup-recuperacao",
    preco: "A partir de R$ 80",
    tempo: "24h",
    badge: "Sem dado, sem cobrança",
    waMessage: "Olá! Preciso recuperar arquivos / fotos do meu HD ou pendrive. Pode me ajudar?",
  },
  {
    icon: MapPin,
    title: "Atendimento a Domicílio",
    pitch: "Técnico na sua casa em Curitiba e região. Preço fechado antes de começar.",
    link: "/atendimento-domicilio",
    preco: "A partir de R$ 69,99",
    tempo: "Hoje",
    waMessage: "Olá! Quero atendimento técnico a domicílio em Curitiba. Qual a disponibilidade hoje?",
  },
  {
    icon: Headphones,
    title: "Atendimento Remoto",
    pitch: "Resolvemos online em minutos, sem precisar sair de casa.",
    link: "/atendimento-remoto",
    preco: "R$ 79,99",
    tempo: "~15 min",
    waMessage: "Olá! Quero atendimento remoto agora. Pode me ajudar pelo AnyDesk?",
  },
  {
    icon: Building2,
    title: "Suporte para Empresas",
    pitch: "TI terceirizada com SLA, monitoramento e atendimento prioritário.",
    link: "/suporte-empresas",
    preco: "A partir de R$ 300/mês",
    tempo: "SLA 4h",
    waMessage: "Olá! Quero contratar suporte de TI para minha empresa em Curitiba.",
  },
  {
    icon: Camera,
    title: "CFTV — Câmeras de Segurança",
    pitch: "Kit 4 câmeras Intelbras com instalação e acesso pelo celular.",
    link: "/cftv",
    preco: "R$ 1.350 instalado",
    tempo: "1 dia",
    waMessage: "Olá! Quero instalar câmeras de segurança (CFTV). Pode me passar o orçamento?",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const buildWa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const ServicesSection = () => {
  const isMobile = useIsMobile();
  // Mantém o "primeiros mais pedidos" no topo e embaralha o restante
  const services = useMemo(() => {
    const pinned = allServices.slice(0, 3);
    const rest = shuffleArray(allServices.slice(3));
    const all = [...pinned, ...rest];
    return isMobile ? all.slice(0, 4) : all.slice(0, 9);
  }, [isMobile]);

  return (
    <section
      id="servicos"
      className="py-14 md:py-18 lg:py-24 bg-background relative overflow-hidden spotlight-sweep mesh-gradient-warm noise-overlay"
    >
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none orb-float" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none orb-float-reverse" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 tracking-tight reveal-text">
            Qual é o seu <span className="gradient-text">problema hoje?</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
            Clique no serviço e fale direto no WhatsApp — diagnóstico sem compromisso e preço fechado antes de começar.
          </p>
          <div className="glow-separator max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            const waUrl = buildWa(service.waMessage);
            return (
              <article
                key={service.title}
                className="group relative flex flex-col glass-card gradient-border rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl card-shine animated-border slide-up-stagger"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {service.badge && (
                  <span className="absolute -top-2 right-4 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground shadow-md">
                    {service.badge}
                  </span>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-primary rounded-xl p-3 flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading font-bold text-foreground text-base md:text-lg leading-tight group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12.5px] font-semibold">
                      <span className="text-accent">{service.preco}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" /> {service.tempo}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {service.pitch}
                </p>

                <div className="mt-auto flex items-center gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener nofollow"
                    data-cta-location={`services_card_${service.link.replace(/\W+/g, "_")}`}
                    data-wa-medium="services_card"
                    aria-label={`Falar no WhatsApp sobre ${service.title}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[hsl(var(--whatsapp))] px-3 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_20px_-8px_hsl(145_63%_42%/0.6)] transition-all hover:scale-[1.02] hover:bg-[hsl(var(--whatsapp-hover))]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <Link
                    to={service.link}
                    aria-label={`Ver detalhes de ${service.title}`}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Detalhes
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/valores"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all underline-grow text-[15px] group"
          >
            Ver tabela completa de preços
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={buildWa("Olá! Meu problema não está na lista. Pode me ajudar a identificar?")}
            target="_blank"
            rel="noopener nofollow"
            data-cta-location="services_section_footer"
            data-wa-medium="services_footer"
            className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--whatsapp))] px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-[hsl(var(--whatsapp-hover))] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Meu problema não está aqui
          </a>
        </div>
      </div>
    </section>
  );
};
