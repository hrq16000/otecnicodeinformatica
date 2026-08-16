import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Home,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { bairroAncora, isNoindex } from "@/lib/localIndexPolicy";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig, whatsappLink, absoluteUrl } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { MODALIDADES_ATENDIMENTO } from "@/lib/cidadesData";
import { servicoByPath, type BairroLocalData } from "@/lib/bairrosData";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";

const CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-7 text-base font-bold text-accent-foreground shadow-[0_14px_34px_-10px_hsl(var(--accent)/0.6)] motion-surface hover:shadow-[0_18px_40px_-12px_hsl(var(--accent)/0.55)]";

const CIDADE_PADRAO = { cidade: "Curitiba", parent: "/tecnico-informatica-curitiba" };

export const BairroLocalLayout = ({ data }: { data: BairroLocalData }) => {
  const path = `/bairros/${data.slug}`;
  // Cidade-pai vem da política local (fonte única) — nunca de fallback fixo.
  const ancora = bairroAncora(data.slug);
  const cidade = ancora?.cidade ?? data.cidade ?? CIDADE_PADRAO.cidade;
  const cidadePath = ancora?.parent ?? CIDADE_PADRAO.parent;
  const waHref = whatsappLink(data.whatsappMessage);

  useEffect(() => {
    trackPageView(path, data.h1);
  }, [path, data.h1]);

  const handleCta = (location: string) => trackCTAClick("whatsapp", location);

  const servicos = data.servicosPrioritarios
    .map((to) => servicoByPath(to))
    .filter((s): s is NonNullable<ReturnType<typeof servicoByPath>> => Boolean(s));

  // FASE 31 — a página de bairro NÃO cria LocalBusiness/filial própria:
  // emite WebPage (+ BreadcrumbList do PageSEO e FAQPage abaixo).
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    name: data.metaTitle,
    headline: data.h1,
    description: data.metaDescription,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${siteConfig.baseUrl}/#website` },
    about: { "@type": "Place", name: data.areaName },
    publisher: { "@id": `${siteConfig.baseUrl}/#organization` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: data.faqLocal.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  useJsonLdSlot(SCHEMA_SLOTS.webPage, webPageSchema, SLOT_PRIORITY.page);
  useJsonLdSlot(SCHEMA_SLOTS.faq, faqSchema, SLOT_PRIORITY.page);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={path}
        noindex={isNoindex(path)}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Áreas atendidas", path: "/areas-atendidas" },
          { name: cidade, path: cidadePath },
          { name: data.nome, path },
        ]}
      />

      <FastHeader />
      <main className="pt-[var(--site-header-height)]">
        <Breadcrumbs
          items={[
            { label: "Áreas atendidas", href: "/areas-atendidas" },
            { label: cidade, href: cidadePath },
            { label: data.nome },
          ]}
        />

        {/* Hero local */}
        <section className="relative overflow-hidden border-b border-border/60 bg-secondary/40">
          <div className="container mx-auto py-12 md:py-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                <MapPin className="h-4 w-4" />
                {data.nome} • {cidade}
              </span>
              <h1 className="mt-5 text-3xl font-heading font-bold leading-tight text-foreground md:text-5xl">
                {data.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{data.subtitulo}</p>
              <div className="mt-8">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="bairro_hero"
                  data-wa-source="whatsapp_cta"
                  data-city={cidade}
                  data-neighborhood={data.nome}
                  onClick={() => handleCta(`bairro_${data.slug}_hero`)}
                  className={CTA_CLASS}
                >
                  <MessageCircle className="h-5 w-5" />
                  Iniciar atendimento
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Introdução local + operação */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                Atendimento técnico {data.nomeLocativo}
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                {data.introducaoLocal.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
              {data.contextoLocal?.length ? (
                <div className="mt-8">
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    O que costuma aparecer nos chamados {data.nomeLocativo}
                  </h3>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    {data.contextoLocal.map((par, i) => (
                      <p key={i}>{par}</p>
                    ))}
                  </div>
                </div>
              ) : null}
              {data.logisticaLocal?.length ? (
                <div className="mt-8">
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    Deslocamento, acesso e agendamento {data.nomeLocativo}
                  </h3>
                  <div className="mt-4 space-y-4 text-muted-foreground">
                    {data.logisticaLocal.map((par, i) => (
                      <p key={i}>{par}</p>
                    ))}
                    {data.ponteLocal ? (
                      <p>
                        {data.ponteLocal.antes}
                        <Link
                          to={data.ponteLocal.to}
                          className="font-semibold text-accent underline-offset-4 hover:underline"
                        >
                          {data.ponteLocal.anchor}
                        </Link>
                        {data.ponteLocal.depois}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <aside className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">Como começa a triagem</h3>
              <ul className="mt-4 space-y-3">
                {data.operacaoLocal.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Serviços prioritários no bairro */}
        <section className="border-y border-border/60 bg-secondary/40 py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Serviços mais procurados {data.nomeLocativo}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {servicos.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-accent">{s.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
            </div>
            {data.servicosCidade?.length ? (
              <div className="mt-8 rounded-2xl border border-accent/30 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Contratar o serviço em {cidade}
                </h3>
                <ul className="mt-4 space-y-3">
                  {data.servicosCidade.map((s) => (
                    <li key={s.to}>
                      <Link to={s.to} className="font-semibold text-accent hover:underline">
                        {s.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {data.publicoAtendido?.length ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground">Quem atendemos {data.nomeLocativo}</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {data.publicoAtendido.map((item) => (
                    <li key={item} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {data.problemasRelacionados?.length ? (
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Sintomas mais relatados {data.nomeLocativo}
                </h3>
                <ul className="mt-4 space-y-3">
                  {data.problemasRelacionados.map((p) => (
                    <li key={p.to}>
                      <Link to={p.to} className="font-semibold text-accent hover:underline">
                        {p.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6">
              <Link to="/servicos" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                Ver todos os serviços <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quando no local × quando bancada */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="mt-3 text-xl font-heading font-bold text-foreground">
                Quando o atendimento no local pode ser indicado
              </h2>
              <ul className="mt-4 space-y-2">
                {data.atendimentoLocal.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Truck className="h-8 w-8 text-accent" />
              <h2 className="mt-3 text-xl font-heading font-bold text-foreground">
                Quando pode ser necessária coleta ou bancada
              </h2>
              <ul className="mt-4 space-y-2">
                {data.coletaBancada.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Formas de atendimento */}
        <section className="border-y border-border/60 bg-secondary/40 py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Formas de atendimento
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              A modalidade é definida na triagem, conforme o equipamento e o problema.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {MODALIDADES_ATENDIMENTO.map((m) => (
                <Link
                  key={m.to}
                  to={m.to}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
                >
                  <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-accent">{m.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Preços + página-mãe Curitiba */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Preços e políticas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Diagnóstico/visita a partir de <strong className="text-foreground">{siteConfig.minPriceLabel}</strong>{" "}
                quando aplicável. O valor final depende de equipamento, deslocamento, complexidade e peças.
                Nada é executado sem sua aprovação.
              </p>
              <Link to="/precos-e-politicas" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                Ver preços e políticas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <MapPin className="h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Atendimento em {cidade}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {data.nome} faz parte do atendimento de informática em {cidade}. Veja a página principal
                da cidade para entender a cobertura, as modalidades e todos os serviços.
              </p>
              <Link to={cidadePath} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                Técnico de informática em {cidade} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/areas-atendidas" className="mt-3 block text-sm font-semibold text-accent hover:underline">
                Ver todas as áreas atendidas
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ local */}
        <section className="border-t border-border/60 bg-secondary/40 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
              Perguntas frequentes — {data.nome}
            </h2>
            <div className="mt-8 space-y-4">
              {data.faqLocal.map((f, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{f.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14">
          <div className="container mx-auto">
            <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-12">
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                Precisa de um técnico {data.nomeLocativo}?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Descreva o problema pelo WhatsApp. Você recebe as primeiras orientações e, se fizer sentido,
                combinamos a avaliação do equipamento.
              </p>
              <div className="mt-7">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="bairro_final"
                  data-wa-source="whatsapp_cta"
                  data-city={cidade}
                  data-neighborhood={data.nome}
                  onClick={() => handleCta(`bairro_${data.slug}_final`)}
                  className={CTA_CLASS}
                >
                  <MessageCircle className="h-5 w-5" />
                  Iniciar atendimento
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BairroLocalLayout;
