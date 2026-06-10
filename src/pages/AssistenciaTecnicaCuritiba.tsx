import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { trackCTAClick, trackPageView } from "@/lib/analytics";
import {
  MessageCircle,
  Gamepad2,
  Monitor,
  Laptop,
  Smartphone,
  Cpu,
  Wrench,
  Zap,
  Flame,
  Wifi,
  HardDrive,
  Battery,
  Tv,
  ShieldCheck,
  Clock,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const WA = "5541997452053";
const WA_TEXT = "Olá! Preciso de um orçamento de assistência técnica em Curitiba.";
const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(WA_TEXT)}`;

// Emits GA4 cta_click + generate_lead with utm_*/gclid (see analytics.ts)
const onWa = (location: string) => () => trackCTAClick("whatsapp", `atc_${location}`);

const internalLinks = [
  { to: "/servicos", label: "Todos os Serviços" },
  { to: "/servicos/conserto-pc-notebook", label: "Conserto de PC e Notebook" },
  { to: "/servicos/conserto-placa", label: "Conserto de Placa-mãe" },
  { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD e Memória" },
  { to: "/servicos/conserto-celular", label: "Conserto de Celular" },
  { to: "/tecnico-informatica-curitiba", label: "Técnico de Informática Curitiba" },
  { to: "/precos-e-politicas", label: "Preços e Políticas" },
  { to: "/faq", label: "Perguntas Frequentes" },
];

const services = [
  {
    icon: Gamepad2,
    title: "Consoles",
    desc: "PlayStation, Xbox e Nintendo Switch",
    items: ["Reparo de placas e BGA", "Superaquecimento e cooler", "Leitor de discos e HD/SSD", "Limpeza preventiva"],
  },
  {
    icon: Cpu,
    title: "Placas de Vídeo",
    desc: "NVIDIA e AMD — GPUs gamer e workstation",
    items: ["Reballing de GPU", "Troca de capacitores", "Correção de artefatos", "Manutenção de cooler"],
  },
  {
    icon: Monitor,
    title: "Computadores",
    desc: "PCs gamer e desktops corporativos",
    items: ["Montagem e upgrade", "Diagnóstico de falhas", "Recuperação de dados", "Instalação de sistemas"],
  },
  {
    icon: Laptop,
    title: "Notebooks",
    desc: "Todas as marcas e modelos",
    items: ["Troca de tela e teclado", "Reparo de placa-mãe", "Upgrade para SSD/RAM", "Substituição de bateria"],
  },
  {
    icon: Smartphone,
    title: "Smartphones",
    desc: "iPhone, Samsung, Xiaomi e mais",
    items: ["Troca de tela quebrada", "Substituição de bateria", "Reparo de conectores", "Recuperação de dados"],
  },
  {
    icon: Wrench,
    title: "Manutenção Preventiva",
    desc: "Para que o defeito não volte",
    items: ["Limpeza interna completa", "Troca de pasta térmica", "Otimização de sistema", "Diagnóstico preventivo"],
  },
];

const consoleGroups = [
  {
    icon: Gamepad2,
    title: "PlayStation",
    tags: [
      { icon: Zap, label: "PS5 não liga" },
      { icon: Flame, label: "PS4 superaquecendo" },
      { icon: HardDrive, label: "PS3 não lê discos" },
      { icon: Gamepad2, label: "Controle com drift" },
      { icon: Wifi, label: "Problemas de conexão" },
    ],
  },
  {
    icon: Tv,
    title: "Xbox",
    tags: [
      { icon: Zap, label: "Xbox não liga" },
      { icon: Flame, label: "Barulho no cooler" },
      { icon: Tv, label: "Sem vídeo na TV" },
      { icon: Battery, label: "Problema na fonte" },
      { icon: Wifi, label: "Falha de rede" },
    ],
  },
  {
    icon: Gamepad2,
    title: "Nintendo",
    tags: [
      { icon: Battery, label: "Switch não carrega" },
      { icon: Gamepad2, label: "Joy-Con com drift" },
      { icon: Tv, label: "Dock com defeito" },
      { icon: HardDrive, label: "Erro no cartão SD" },
      { icon: Zap, label: "Não liga ou reinicia" },
    ],
  },
  {
    icon: Cpu,
    title: "Placas de Vídeo",
    tags: [
      { icon: Flame, label: "Superaquecimento" },
      { icon: Cpu, label: "Reballing de GPU" },
      { icon: Monitor, label: "Artefatos na tela" },
      { icon: Zap, label: "Não é reconhecida" },
      { icon: Wrench, label: "Baixo desempenho" },
    ],
  },
];

const differentials = [
  { icon: Clock, title: "Diagnóstico Rápido", text: "Avaliação técnica em até 24h." },
  { icon: ShieldCheck, title: "Garantia de 90 dias", text: "Em todo serviço executado." },
  { icon: Sparkles, title: "Peças de qualidade", text: "Componentes testados e originais." },
  { icon: CheckCircle2, title: "Orçamento sem compromisso", text: "Preço justo e transparente." },
  { icon: Wrench, title: "Atende toda Curitiba", text: "Retirada e entrega via motoboy opcional." },
  { icon: Star, title: "Técnicos certificados", text: "Mais de 5 anos de experiência." },
];

export default function AssistenciaTecnicaCuritiba() {
  useEffect(() => {
    trackPageView("/assistencia-tecnica-curitiba", "Assistência Técnica em Curitiba");
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-atc-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("atc-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://tecnicocuritiba.com.br/assistencia-tecnica-curitiba#localbusiness",
    name: "Preciso de um Técnico — Assistência Técnica Especializada",
    description:
      "Assistência técnica especializada em Curitiba: consoles, placas de vídeo, computadores, notebooks e smartphones.",
    areaServed: [
      { "@type": "City", name: "Curitiba", "@id": "https://www.wikidata.org/wiki/Q40269" },
      { "@type": "AdministrativeArea", name: "Região Metropolitana de Curitiba" },
    ],
    serviceArea: { "@type": "City", name: "Curitiba" },
    telephone: "+5541997452053",
    url: "https://tecnicocuritiba.com.br/assistencia-tecnica-curitiba",
    image: "https://tecnicocuritiba.com.br/favicon.png",
    priceRange: "$$",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+5541997452053",
      availableLanguage: ["Portuguese"],
      areaServed: "BR-PR",
    },
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[LocalBusiness JSON-LD /assistencia-tecnica-curitiba]", jsonLd);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Assistência Técnica de Consoles em Curitiba | PS5, Xbox, Nintendo e Placa de Vídeo"
        description="Assistência técnica especializada em Curitiba: PlayStation, Xbox, Nintendo Switch, placas de vídeo, computadores, notebooks e smartphones. Orçamento rápido pelo WhatsApp (41) 99745-2053."
        path="/assistencia-tecnica-curitiba"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: "Assistência Técnica Curitiba", path: "/assistencia-tecnica-curitiba" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        [data-atc-reveal]{opacity:0;transform:translateY(24px);transition:opacity .7s ease, transform .7s ease;}
        [data-atc-reveal].atc-in{opacity:1;transform:translateY(0);}
        [data-atc-stagger] > *{opacity:0;transform:translateY(14px);transition:opacity .5s ease, transform .5s ease;}
        [data-atc-stagger].atc-in > *{opacity:1;transform:translateY(0);}
        ${Array.from({ length: 12 }).map((_, i) => `[data-atc-stagger].atc-in > *:nth-child(${i + 1}){transition-delay:${i * 70}ms;}`).join("")}
        @keyframes atcPulse{0%,100%{box-shadow:0 0 0 0 hsl(var(--accent)/.45);}50%{box-shadow:0 0 0 14px hsl(var(--accent)/0);}}
        .atc-pulse{animation:atcPulse 2.2s ease-out infinite;}
        .atc-card{transition:transform .35s ease, box-shadow .35s ease, border-color .35s ease;}
        .atc-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:hsl(var(--accent)/.5);}
        .atc-card:hover .atc-card-icon{transform:translateY(-3px) rotate(-4deg);}
        .atc-card-icon{transition:transform .4s cubic-bezier(.34,1.56,.64,1);}
      `}</style>

      <Header />

      <main className="pt-20">
        <div className="container mx-auto px-4 pt-4">
          <Breadcrumbs
            items={[
              { label: "Serviços", href: "/servicos" },
              { label: "Assistência Técnica Curitiba", href: "/assistencia-tecnica-curitiba" },
            ]}
          />
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 premium-gradient" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 opacity-[0.06]"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="container mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-24 grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div data-atc-reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Especialistas em eletrônica e games
              </span>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
                Assistência Técnica Especializada em{" "}
                <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                  Consoles em Curitiba
                </span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                Reparo profissional em PlayStation, Xbox, Nintendo Switch e Placas de Vídeo —
                e também computadores, notebooks e smartphones. <strong className="text-white">Serviço com garantia</strong>.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="heroWhatsapp" size="lg" className="atc-pulse" onClick={onWa("hero")}>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" data-wa-medium="hero">
                    <MessageCircle className="h-5 w-5" />
                    Solicitar Orçamento no WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  <a href="#servicos">
                    Ver Serviços <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Orçamento Grátis", "Garantia 90 dias", "Peças Originais", "Atende toda Curitiba"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/15 px-3 py-1.5 text-sm text-white/90">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating card */}
            <div data-atc-reveal className="relative lg:justify-self-end">
              <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md shadow-[var(--shadow-xl)] max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Star className="h-7 w-7 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold leading-none text-white">4,9</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-white/90 text-sm leading-relaxed">
                  <strong className="text-white">Nossos clientes confiam</strong> na qualidade técnica.
                  Atendimento direto com o profissional — sem intermediários.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-white/80">
                  <div className="rounded-lg bg-white/5 border border-white/15 py-2"><div className="text-white font-bold text-base">+5 anos</div>experiência</div>
                  <div className="rounded-lg bg-white/5 border border-white/15 py-2"><div className="text-white font-bold text-base">+2.000</div>reparos</div>
                  <div className="rounded-lg bg-white/5 border border-white/15 py-2"><div className="text-white font-bold text-base">90 dias</div>garantia</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="servicos" className="container mx-auto px-4 py-20">
          <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Nossos Serviços Especializados</h2>
            <p className="mt-3 text-muted-foreground">Soluções completas para todos os seus dispositivos eletrônicos em Curitiba.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <article
                key={s.title}
                data-atc-reveal
                className="atc-card group rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-[var(--shadow-sm)]"
              >
                <div className="atc-card-icon h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-md)] mb-4">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Assistência Técnica para {s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-medium="service_card"
                  onClick={onWa("service_card")}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 group/btn"
                >
                  Ver Detalhes
                  <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* COMMON PROBLEMS */}
        <section className="relative py-20 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Resolvemos os Principais Defeitos do Seu Aparelho
              </h2>
              <p className="mt-3 text-muted-foreground">
                Mais de 5 anos de experiência com os principais consoles e placas do mercado em Curitiba.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {consoleGroups.map((g) => (
                <div
                  key={g.title}
                  data-atc-reveal
                  className="atc-card rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-md)]">
                      <g.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Assistência Técnica {g.title}</h3>
                  </div>
                  <div data-atc-stagger data-atc-reveal className="flex flex-wrap gap-2">
                    {g.tags.map((t) => (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border hover:border-accent/50 hover:bg-accent/5 px-3 py-1.5 text-sm text-foreground/85 transition"
                      >
                        <t.icon className="h-3.5 w-3.5 text-accent" />
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-wa-medium="problem_group"
                    onClick={onWa(`group_${g.title.toLowerCase()}`)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80"
                  >
                    Agendar Reparo <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>

            <div data-atc-reveal className="mt-10 text-center">
              <Button asChild variant="heroWhatsapp" size="lg" className="atc-pulse" onClick={onWa("problems_section")}>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" data-wa-medium="problems_section">
                  <MessageCircle className="h-5 w-5" />
                  Enviar Aparelho para Reparo
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* DIFFERENTIALS */}
        <section className="container mx-auto px-4 py-20">
          <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Por que escolher nossa assistência?</h2>
            <p className="mt-3 text-muted-foreground">Qualidade técnica, transparência e atendimento profissional em Curitiba.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentials.map((d) => (
              <div
                key={d.title}
                data-atc-reveal
                className="atc-card rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
              >
                <div className="atc-card-icon h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-[var(--shadow-md)] mb-4">
                  <d.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 premium-gradient" aria-hidden="true" />
          <div data-atc-reveal className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto text-white">
              Pronto para resolver o problema do seu aparelho?
            </h2>
            <p className="mt-4 text-white/90 text-lg max-w-2xl mx-auto">
              Atendimento direto com o profissional via WhatsApp. Resposta rápida, orçamento gratuito.
            </p>
            <div className="mt-8">
              <Button asChild variant="heroWhatsapp" size="lg" className="atc-pulse text-base md:text-lg px-8" onClick={onWa("final_cta")}>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" data-wa-medium="final_cta">
                  <MessageCircle className="h-6 w-6" />
                  Falar com Especialista — (41) 9 9745-2053
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* INTERLINKING */}
        <section className="container mx-auto px-4 py-14 border-t border-border">
          <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Explore outros serviços em Curitiba</h2>
            <p className="mt-2 text-muted-foreground text-sm">Navegue pelo nosso atendimento técnico completo na capital.</p>
          </div>
          <nav aria-label="Links internos" data-atc-stagger data-atc-reveal className="flex flex-wrap justify-center gap-2.5">
            {internalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card hover:border-accent/50 hover:bg-accent/5 hover:text-accent px-4 py-2 text-sm text-foreground/85 transition"
              >
                {l.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </nav>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
