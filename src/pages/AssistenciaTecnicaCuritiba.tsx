import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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

const services = [
  {
    icon: Gamepad2,
    title: "Consoles",
    desc: "PlayStation, Xbox e Nintendo Switch",
    items: ["Reparo de placas e BGA", "Superaquecimento e cooler", "Leitor de discos e HD/SSD", "Limpeza preventiva"],
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
    name: "Preciso de um Técnico — Assistência Técnica Especializada",
    description:
      "Assistência técnica especializada em Curitiba: consoles, computadores, notebooks, smartphones e placas de vídeo.",
    areaServed: { "@type": "City", name: "Curitiba" },
    telephone: "+5541997452053",
    url: "https://tecnicocuritiba.com.br/assistencia-tecnica-curitiba",
    priceRange: "$$",
  };

  return (
    <>
      <Helmet>
        <title>Assistência Técnica em Curitiba | Consoles, PC, Notebook e Celular</title>
        <meta
          name="description"
          content="Assistência técnica especializada em Curitiba para PlayStation, Xbox, Nintendo, computadores, notebooks, celulares e placas de vídeo. Orçamento rápido pelo WhatsApp (41) 99745-2053."
        />
        <link rel="canonical" href="https://tecnicocuritiba.com.br/assistencia-tecnica-curitiba" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Assistência Técnica Especializada em Curitiba" />
        <meta
          property="og:description"
          content="Reparo de consoles, PCs, notebooks, smartphones e placas de vídeo em Curitiba. Diagnóstico rápido, garantia e atendimento via WhatsApp."
        />
        <meta property="og:url" content="https://tecnicocuritiba.com.br/assistencia-tecnica-curitiba" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <style>{`
        [data-atc-reveal]{opacity:0;transform:translateY(24px);transition:opacity .7s ease, transform .7s ease;}
        [data-atc-reveal].atc-in{opacity:1;transform:translateY(0);}
        [data-atc-stagger] > *{opacity:0;transform:translateY(14px);transition:opacity .5s ease, transform .5s ease;}
        [data-atc-stagger].atc-in > *{opacity:1;transform:translateY(0);}
        ${Array.from({ length: 12 }).map((_, i) => `[data-atc-stagger].atc-in > *:nth-child(${i + 1}){transition-delay:${i * 70}ms;}`).join("")}
        @keyframes atcPulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.55);}50%{box-shadow:0 0 0 14px rgba(16,185,129,0);}}
        .atc-pulse{animation:atcPulse 2.2s ease-out infinite;}
        .atc-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px -20px rgba(59,130,246,.45),0 0 0 1px rgba(59,130,246,.35) inset;}
        .atc-card{transition:transform .35s ease, box-shadow .35s ease;}
        .atc-card:hover .atc-card-icon{transform:translateY(-4px) rotate(-4deg);}
        .atc-card-icon{transition:transform .4s cubic-bezier(.34,1.56,.64,1);}
      `}</style>

      <main className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {/* Top bar */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <a href="/assistencia-tecnica-curitiba" className="flex items-center gap-2 group">
              <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_22px_rgba(59,130,246,.55)]">
                <Wrench className="h-5 w-5 text-white" />
              </span>
              <span className="font-bold tracking-tight text-white group-hover:text-cyan-300 transition">
                Preciso de um Técnico
              </span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-medium="header"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm shadow-[0_0_20px_rgba(16,185,129,.45)] transition"
            >
              <MessageCircle className="h-4 w-4" />
              (41) 9 9745-2053
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,.25),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,.18),transparent_55%)]" />
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          </div>

          <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div data-atc-reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" /> Especialistas em eletrônica e games
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Assistência Técnica{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Especializada em Curitiba
                </span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Reparo profissional de consoles, computadores, notebooks, smartphones e placas de vídeo.
                Diagnóstico rápido, peças de qualidade e <strong className="text-white">serviço com garantia</strong>.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-medium="hero"
                  className="atc-pulse inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-4 font-bold text-base shadow-[0_18px_40px_-12px_rgba(16,185,129,.7)] transition"
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar Orçamento no WhatsApp
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-4 font-semibold text-base transition"
                >
                  Ver Serviços <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Orçamento Grátis", "Garantia 90 dias", "Peças Originais", "Atende toda Curitiba"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white/85">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating card */}
            <div data-atc-reveal className="relative lg:justify-self-end">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(59,130,246,.6)] max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Star className="h-7 w-7 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold leading-none">4,9</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-white/85 text-sm leading-relaxed">
                  <strong className="text-white">Nossos clientes confiam</strong> na nossa qualidade técnica.
                  Atendimento direto com o profissional — sem intermediários.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-white/70">
                  <div className="rounded-lg bg-white/5 border border-white/10 py-2"><div className="text-white font-bold text-base">+5 anos</div>experiência</div>
                  <div className="rounded-lg bg-white/5 border border-white/10 py-2"><div className="text-white font-bold text-base">+2.000</div>reparos</div>
                  <div className="rounded-lg bg-white/5 border border-white/10 py-2"><div className="text-white font-bold text-base">90 dias</div>garantia</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="servicos" className="container mx-auto px-4 py-20">
          <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Nossos Serviços Especializados</h2>
            <p className="mt-3 text-white/70">Soluções completas para todos os seus dispositivos eletrônicos em Curitiba.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <article
                key={s.title}
                data-atc-reveal
                className="atc-card group rounded-2xl border border-white/10 bg-[#111827]/80 p-6 backdrop-blur-sm"
              >
                <div className="atc-card-icon h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_24px_rgba(59,130,246,.45)] mb-4">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold">Assistência Técnica para {s.title}</h3>
                <p className="text-sm text-white/60 mt-1">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-medium="service_card"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 group/btn"
                >
                  Ver Detalhes
                  <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* COMMON PROBLEMS */}
        <section className="relative py-20 border-y border-white/5 bg-gradient-to-b from-[#0a0a0a] via-[#0b1224] to-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Resolvemos os Principais Defeitos do Seu Aparelho
              </h2>
              <p className="mt-3 text-white/70">
                Mais de 5 anos de experiência com os principais consoles e placas do mercado em Curitiba.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {consoleGroups.map((g) => (
                <div
                  key={g.title}
                  data-atc-reveal
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-[0_0_18px_rgba(139,92,246,.45)]">
                      <g.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Assistência Técnica {g.title}</h3>
                  </div>
                  <div data-atc-stagger data-atc-reveal className="flex flex-wrap gap-2">
                    {g.tags.map((t) => (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/5 px-3 py-1.5 text-sm text-white/85 transition cursor-default"
                      >
                        <t.icon className="h-3.5 w-3.5 text-cyan-300" />
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div data-atc-reveal className="mt-10 text-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-medium="problems_section"
                className="atc-pulse inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-4 font-bold shadow-[0_18px_40px_-12px_rgba(16,185,129,.7)] transition"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar Aparelho para Reparo
              </a>
            </div>
          </div>
        </section>

        {/* DIFFERENTIALS */}
        <section className="container mx-auto px-4 py-20">
          <div data-atc-reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Por que escolher nossa assistência?</h2>
            <p className="mt-3 text-white/70">Qualidade técnica, transparência e atendimento profissional em Curitiba.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentials.map((d) => (
              <div
                key={d.title}
                data-atc-reveal
                className="atc-card rounded-2xl border border-white/10 bg-[#111827]/70 p-6"
              >
                <div className="atc-card-icon h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,.4)] mb-4">
                  <d.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold">{d.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700" />
          <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(34,211,238,.5), transparent 40%), radial-gradient(circle at 80% 80%, rgba(139,92,246,.5), transparent 40%)" }} />
          <div data-atc-reveal className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
              Pronto para resolver o problema do seu aparelho?
            </h2>
            <p className="mt-4 text-white/85 text-lg max-w-2xl mx-auto">
              Atendimento direto com o profissional via WhatsApp. Resposta rápida, orçamento gratuito.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-medium="final_cta"
              className="atc-pulse mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-5 font-bold text-lg shadow-[0_24px_60px_-18px_rgba(16,185,129,.8)] transition"
            >
              <MessageCircle className="h-6 w-6" />
              Chamar no WhatsApp — (41) 9 9745-2053
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-[#070707]">
          <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Wrench className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="font-semibold text-white">Preciso de um Técnico</span>
            </div>
            <p className="text-center md:text-right">
              A melhor assistência técnica de Curitiba para seus dispositivos eletrônicos. <br className="hidden md:inline" />
              Contato apenas via WhatsApp <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold">(41) 9 9745-2053</a>.
            </p>
          </div>
        </footer>

        {/* Floating WA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-medium="float"
          aria-label="Falar no WhatsApp"
          className="atc-pulse fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-3.5 font-semibold shadow-[0_18px_40px_-12px_rgba(16,185,129,.7)]"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Falar no WhatsApp</span>
        </a>
      </main>
    </>
  );
}
