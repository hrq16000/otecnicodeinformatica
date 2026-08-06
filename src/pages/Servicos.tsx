import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Laptop,
  Cpu,
  HardDrive,
  ShieldCheck,
  Database,
  Wifi,
  Building2,
  ArrowRight,
} from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { SERVICOS_CORE } from "@/lib/servicosCore";

const CTA_BASE =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02]";

const CARDS = [
  { slug: "formatacao", icon: Monitor, blurb: "Windows lento ou corrompido? Formatação com backup e sistema pronto para o uso." },
  { slug: "manutencao-de-notebook", icon: Laptop, blurb: "Aquecimento, tela, teclado, bateria e lentidão — com diagnóstico antes de informar o valor." },
  { slug: "manutencao-de-computador", icon: Cpu, blurb: "Desktop travando ou sem vídeo? Fonte, memória, armazenamento e placa-mãe avaliados." },
  { slug: "upgrade-ssd-ram", icon: HardDrive, blurb: "Ganho real de desempenho com SSD e memória, respeitando a compatibilidade." },
  { slug: "remocao-de-virus", icon: ShieldCheck, blurb: "Pop-ups, lentidão e navegador sequestrado, com atenção aos seus dados." },
  { slug: "recuperacao-de-dados", icon: Database, blurb: "HD, SSD e pendrive: avaliação primeiro. Recuperação não é garantida." },
  { slug: "redes-e-wifi", icon: Wifi, blurb: "Wi-Fi caindo ou sinal fraco em casa e na empresa? Cobertura e estabilidade." },
  { slug: "suporte-tecnico-empresarial", icon: Building2, blurb: "Estações, rede, impressoras e backups, pontual ou recorrente sob consulta." },
] as const;

const TITLE = "Serviços de Informática em Curitiba | PC e Notebook";
const DESCRIPTION =
  "Conheça os serviços de formatação, manutenção de computadores e notebooks, SSD, vírus, recuperação de dados, Wi-Fi e suporte empresarial.";

const Servicos = () => {
  useEffect(() => {
    trackPageView("/servicos", "Serviços");
  }, []);

  const waHref = whatsappLink("Olá! Gostaria de saber mais sobre os serviços.");
  const handleCta = () => trackCTAClick("whatsapp", "servicos-hub");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESCRIPTION}
        path="/servicos"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ]}
      />
      <LocalBusinessJsonLd
        path="/servicos"
        description={DESCRIPTION}
        services={CARDS.map((c) => ({ name: c.slug.replace(/-/g, " "), url: `/servicos/${c.slug}` }))}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços" }]} />

      {/* Hero — identidade "centro técnico local premium" */}
      <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(205_55%_16%)] to-[hsl(var(--hero-bg-end))]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
              Serviços em Curitiba
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
              Serviços de informática em Curitiba
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Assistência técnica focada em computadores, notebooks, redes e empresas. O atendimento
              começa por uma triagem no WhatsApp: você descreve o problema, recebe orientação e o
              valor é aprovado antes de qualquer serviço.
            </p>
            <div className="mt-7">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCta}
                data-cta-location="servicos_hub_hero"
                className={CTA_BASE}
              >
                Iniciar atendimento no WhatsApp
              </a>
            </div>
            <p className="mt-5 text-sm text-white/70">
              Curitiba e região • A partir de {siteConfig.minPriceLabel} • Diagnóstico honesto, sem
              promessa falsa
            </p>
          </div>
        </div>
      </section>

      {/* Grid dos 8 serviços essenciais */}
      <section className="py-14 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Serviços essenciais
          </h2>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Encontre o serviço adequado para seu computador, notebook, rede ou empresa. Cada página
            explica os sintomas atendidos, o processo e o que pode influenciar o valor do atendimento.
          </p>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Procurando pelo sintoma?{" "}
            <Link to="/problemas/notebook-nao-liga" className="font-medium text-[hsl(var(--accent))] hover:underline">
              Notebook não liga: sinais, causas possíveis e diagnóstico
            </Link>
            .
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map(({ slug, icon: Icon, blurb }) => {
              const data = SERVICOS_CORE[slug];
              return (
                <Link
                  key={slug}
                  to={`/servicos/${slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-[hsl(var(--accent))]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-[hsl(var(--accent))]">
                    {data.serviceName}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--accent))]">
                    Ver serviço
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Como o atendimento começa */}
      <section className="py-14 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              O atendimento começa pela triagem
            </h2>
            <p className="mt-4 text-muted-foreground">
              Não trabalhamos com preço fechado universal. Você fala com o técnico pelo WhatsApp,
              explicamos os próximos passos e o diagnóstico começa a partir de {siteConfig.minPriceLabel}.
              O valor final depende do equipamento, da complexidade, de eventuais peças e da condição
              real do problema.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/como-funciona"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
              >
                Como funciona
              </Link>
              <Link
                to="/diagnostico-tecnico"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
              >
                Diagnóstico técnico
              </Link>
              <Link
                to="/precos-e-politicas"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
              >
                Preços e políticas
              </Link>
              <Link
                to="/faq"
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
              >
                Dúvidas frequentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[hsl(var(--hero-bg))] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Vamos resolver isso hoje?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Fale direto com o técnico pelo WhatsApp. Diagnóstico honesto e valor aprovado antes de
            qualquer serviço.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            data-cta-location="servicos_hub_final"
            className={`${CTA_BASE} mt-7`}
          >
            Iniciar atendimento no WhatsApp
          </a>
        </div>
      </section>

      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default Servicos;
