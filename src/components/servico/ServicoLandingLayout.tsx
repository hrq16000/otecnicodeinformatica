import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema, type ServiceFaq } from "@/components/ServiceLandingSchema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import { EditorialContentLinks } from "@/components/editorial/EditorialContentLinks";
import { ExperienciaBadge } from "@/components/social-proof/ExperienciaBadge";
import { PageTableOfContents } from "@/components/ui/PageTableOfContents";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

export interface ServicoLandingData {
  /** Slug curto usado em tracking e no path (/servicos/<path>) */
  path: string;
  trackingKey: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Schema.org Service name + descrição */
  serviceName: string;
  serviceDescription: string;
  /** Conteúdo visível */
  eyebrow: string;
  h1: string;
  h1Accent?: string;
  intro: string;
  /** Mensagem pré-preenchida do WhatsApp */
  whatsappMessage: string;
  /** Blocos de conteúdo */
  incluso: { title: string; desc: string }[];
  sinais: string[];
  processo: { step: string; title: string; desc: string }[];
  /** Fatores reais que influenciam o valor final (sem preço fechado). */
  fatoresValor?: { title: string; desc: string }[];
  /** Diferenciação residencial x empresarial. */
  atendimento?: { residencial: string; empresarial: string };
  faqs: ServiceFaq[];
  relacionados: { label: string; to: string }[];
  /** Data ISO da última reescrita — atualiza dateModified do schema */
  dateModified?: string;
  /** Nota de preço opcional (ex.: "mão de obra") */
  precoNota?: string;
  /** Bloco extra opcional renderizado antes da FAQ */
  extra?: ReactNode;
  /** Rodada 3P (piloto visual) — resumo objetivo exibido logo abaixo do hero */
  resumo?: { label: string; value: string }[];
  /** Rodada 3P (piloto visual) — sumário "Nesta página" */
  toc?: { id: string; label: string }[];
  /** Rodada 3Q — faixa compacta de confiança (uma única ocorrência) */
  confianca?: boolean;
  /** Rodada 3Q — caixas editoriais contextuais (máximo três) */
  caixas?: ServicoCaixa[];
  caixasTitulo?: string;
  caixasPosicao?: "antes-incluso" | "apos-sinais";
  /** Rodada 3Q — CTA intermediário (mesmo fluxo de triagem) */
  ctaIntermediario?: { titulo: string; texto: string; label: string };
  /** Conteúdo local aprofundado (H2 + parágrafos) para reforço de SEO local */
  blocoLocal?: { titulo: string; paragrafos: string[] }[];
  /** Links internos contextuais para bairros/cidades e problemas próximos */
  linksLocais?: { label: string; to: string }[];
}

const CTA_BASE =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] transition-transform hover:scale-[1.02]";

export const ServicoLandingLayout = ({ data }: { data: ServicoLandingData }) => {
  const waHref = whatsappLink(data.whatsappMessage);

  useEffect(() => {
    trackPageView(`/servicos/${data.path}`, data.serviceName);
  }, [data.path, data.serviceName]);

  const handleCta = () => trackCTAClick("whatsapp", data.trackingKey);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={`/servicos/${data.path}`}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: data.serviceName, path: `/servicos/${data.path}` },
        ]}
      />
      <ServiceLandingSchema
        serviceName={data.serviceName}
        description={data.serviceDescription}
        path={`/servicos/${data.path}`}
        priceFrom={99.99}
        faqs={data.faqs}
        dateModified={data.dateModified}
      />
      <Header />
      <Breadcrumbs
        items={[{ label: "Serviços", href: "/servicos" }, { label: data.serviceName }]}
      />

      {/* Hero — identidade "centro técnico local premium", sem partículas/glow */}
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
              {data.eyebrow}
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
              {data.h1}
              {data.h1Accent && <span className="text-[hsl(var(--accent))]"> {data.h1Accent}</span>}
            </h1>
            <ExperienciaBadge className="mt-4" />
            <p className="tldr mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg" data-speakable>
              {data.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCta}
                data-cta-location={`${data.trackingKey}_hero`}
                className={CTA_BASE}
              >
                Iniciar atendimento no WhatsApp
              </a>
            </div>
            <p className="mt-5 text-sm text-white/70">
              Curitiba e região • A partir de {siteConfig.minPriceLabel}
              {data.precoNota ? ` (${data.precoNota})` : ""} • Diagnóstico honesto, sem promessa falsa
            </p>
          </div>
        </div>
      </section>

      {/* Rodada 3P — piloto visual: resumo objetivo + sumário da página. */}
      {(data.resumo?.length || data.toc?.length) && (
        <section className="border-b border-border bg-secondary py-8">
          <div className="container mx-auto grid gap-5 px-4 lg:grid-cols-2">
            {data.resumo && data.resumo.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Resumo do serviço
                </p>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {data.resumo.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {data.toc && data.toc.length > 0 && <PageTableOfContents items={data.toc} />}
          </div>
        </section>
      )}

      {/* O que está incluso */}
      <section id="incluso" className="scroll-mt-24 py-14 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            O que está incluso
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.incluso.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-xl border border-border bg-card p-5"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-[hsl(var(--accent))]" />
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sinais de que você precisa do serviço */}
      <section id="quando-chamar" className="scroll-mt-24 py-14 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            Quando faz sentido chamar o técnico
          </h2>
          <div className="mx-auto grid max-w-3xl gap-3">
            {data.sinais.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
              >
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[hsl(var(--accent))]" />
                <span className="text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="scroll-mt-24 py-14 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            Como funciona
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.processo.map((p) => (
              <div key={p.step} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--accent))] text-lg font-bold text-accent-foreground">
                  {p.step}
                </div>
                <h3 className="font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que pode influenciar o valor */}
      {data.fatoresValor && data.fatoresValor.length > 0 && (
        <section id="fatores-valor" className="scroll-mt-24 py-14 md:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              O que pode influenciar o valor
            </h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">
              Não trabalhamos com preço fechado universal. O diagnóstico começa a partir de{" "}
              {siteConfig.minPriceLabel} e o valor final depende de fatores reais avaliados caso a caso:
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.fatoresValor.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Atendimento residencial e empresarial */}
      {data.atendimento && (
        <section className="py-14 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
              Atendimento residencial e empresarial em Curitiba e região
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold text-foreground">Residencial</h3>
                <p className="mt-2 text-muted-foreground">{data.atendimento.residencial}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold text-foreground">Empresarial</h3>
                <p className="mt-2 text-muted-foreground">{data.atendimento.empresarial}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {data.extra}

      <EditorialContentLinks path={`/servicos/${data.path}`} />

      {/* Conteúdo local aprofundado — reforço de SEO local em Curitiba */}
      {data.blocoLocal && data.blocoLocal.length > 0 && (
        <section className="py-14 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-10">
              {data.blocoLocal.map((bloco) => (
                <article key={bloco.titulo}>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    {bloco.titulo}
                  </h2>
                  <div className="space-y-4">
                    {bloco.paragrafos.map((p, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 py-14 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            Perguntas frequentes
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {data.faqs.map((f) => (
              <div key={f.question} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-bold text-foreground">{f.question}</h3>
                <p className="mt-2 text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[hsl(var(--hero-bg))] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            Vamos resolver isso hoje?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Fale direto com o técnico pelo WhatsApp. Diagnóstico honesto e valor aprovado antes de
            qualquer serviço.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            data-cta-location={`${data.trackingKey}_final`}
            className={`${CTA_BASE} mt-7`}
          >
            Iniciar atendimento no WhatsApp
          </a>
        </div>
      </section>

      {/* Serviços relacionados */}
      {data.relacionados.length > 0 && (
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="mb-4 text-center text-xl font-heading font-bold text-foreground">
              Serviços relacionados
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.relacionados.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Atendimento local — links internos para bairros, cidades e problemas próximos */}
      {data.linksLocais && data.linksLocais.length > 0 && (
        <section className="py-10 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-xl font-heading font-bold text-foreground">
              Atendimento local em Curitiba e região
            </h2>
            <p className="mx-auto mb-5 max-w-2xl text-center text-sm text-muted-foreground">
              Atendemos os principais bairros de Curitiba e cidades da região metropolitana.
              Veja também os problemas mais buscados e a página da sua região:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.linksLocais.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}



      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default ServicoLandingLayout;
