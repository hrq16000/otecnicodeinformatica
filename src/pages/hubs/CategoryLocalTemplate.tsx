import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PageSEO } from "@/components/PageSEO";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { CTASection } from "@/components/CTASection";
import { trackPageView } from "@/lib/analytics";
import { CATEGORIES, type CategoryId, findCategory } from "./categories";
import { LOCAIS, findLocal, type LocalData } from "./locais";
import {
  Package, ShieldCheck, Clock, Wrench, MapPin, MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";

const beneficios = [
  { icon: Package, title: "Coleta e Entrega", description: "Buscamos seu equipamento em casa e devolvemos consertado. Sem precisar deslocar até a loja." },
  { icon: ShieldCheck, title: "Garantia em todo serviço", description: "90 dias de garantia escrita sobre a peça e a mão-de-obra." },
  { icon: Wrench, title: "Diagnóstico transparente", description: "Orçamento exato antes de qualquer execução. Você autoriza tudo por escrito." },
  { icon: Clock, title: "Prazo combinado", description: "Atualizações de andamento por WhatsApp. Sem surpresa." },
];

interface Props {
  categoryId: CategoryId;
  /** Override do slug local (quando renderizado sem useParams) */
  localSlug?: string;
}

/** Template compartilhado: categoria × local. */
export const CategoryLocalTemplate = ({ categoryId, localSlug }: Props) => {
  const params = useParams<{ local?: string }>();
  const slug = localSlug ?? params.local ?? "curitiba";
  const local = findLocal(slug);
  const category = CATEGORIES[categoryId];

  if (!local) return <Navigate to={`/${category.slug}-curitiba`} replace />;

  const path = `/${category.slug}/${local.slug}`;
  const cityLabel = local.kind === "bairro" ? `${local.nome}, ${local.cidadeMae}` : local.nome;
  const title = `${category.titlePrefix} em ${cityLabel} | Coleta e Entrega · Técnico Curitiba`;
  const description = `${category.titlePrefix} em ${cityLabel}/${local.uf} com coleta e entrega. Reparo a partir de R$ 300 com diagnóstico incluso, garantia de 90 dias e orçamento sem compromisso pelo WhatsApp.`;
  const msg = `Olá! Preciso de ${category.titlePrefix.toLowerCase()} em ${cityLabel}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  useEffect(() => {
    trackPageView(path, title);
  }, [path, title]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${category.titlePrefix} em ${cityLabel}`,
    serviceType: category.titlePrefix,
    provider: { "@type": "LocalBusiness", name: "Técnico Curitiba", url: "https://tecnicocuritiba.com.br", telephone: "+5541997452053", address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" } },
    areaServed: { "@type": local.kind === "bairro" ? "Place" : "City", name: cityLabel, containedInPlace: { "@type": "State", name: "Paraná" } },
    description,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "300",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "BRL",
        minPrice: "300",
        description: "Reparo mínimo com diagnóstico incluso. Coleta e entrega conforme distância.",
      },
      availability: "https://schema.org/InStock",
      url: `https://tecnicocuritiba.com.br${path}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faqs.map((f) => ({
      "@type": "Question",
      name: f.q.replace(/\?$/, "") + `?`,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Locais relacionados (outros 6)
  const related = LOCAIS.filter((l) => l.slug !== local.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: category.titlePrefix, path: `/${category.slug}-curitiba` },
          { name: cityLabel, path },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        <PageHero
          title={`${category.titlePrefix} em ${cityLabel}`}
          subtitle={`${category.emoji} Coleta e entrega no seu endereço · diagnóstico incluso · garantia de 90 dias. Atendimento por WhatsApp em até 30 min.`}
          ctaText="Solicitar Coleta no WhatsApp"
        />

        <BenefitsGrid
          benefits={beneficios}
          title={`Por que escolher para ${cityLabel}`}
          subtitle="Coleta na porta, bancada com instrumental adequado, garantia escrita."
        />

        {/* Sintomas */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Problemas comuns de {category.nome.toLowerCase()} em {cityLabel}
            </h2>
            <p className="text-muted-foreground text-lg">
              Atendemos as falhas mais frequentes — todas com diagnóstico transparente antes da execução.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {category.sintomas.map((s) => (
              <a
                key={s}
                href={whatsappUrl}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-accent hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <Wrench className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{s}</p>
                  <p className="text-xs text-muted-foreground">Pedir orçamento →</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-secondary/40 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Como funciona em {cityLabel}
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { n: "1", t: "Triagem no WhatsApp", d: "Você envia fotos/vídeo e responde 5 perguntas no funil." },
                { n: "2", t: "Coleta agendada", d: "Buscamos no seu endereço com proteção e nota de retirada." },
                { n: "3", t: "Diagnóstico + orçamento", d: `Avaliação em bancada. ${category.precoVisita}.` },
                { n: "4", t: "Reparo + entrega", d: `${category.prazoEntrega} · garantia de 90 dias.` },
              ].map((s) => (
                <div key={s.n} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className="mx-auto mb-2 w-9 h-9 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center">{s.n}</div>
                  <p className="font-semibold text-sm">{s.t}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços oferecidos */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
            Serviços de {category.nome} oferecidos
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {category.servicos.map((s) => (
              <div key={s} className="flex items-start gap-2 p-3 rounded-lg border border-border bg-card">
                <ShieldCheck className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              Perguntas frequentes — {cityLabel}
            </h2>
            <div className="space-y-3">
              {category.faqs.map((f) => (
                <details key={f.q} className="group p-5 rounded-xl border border-border bg-card hover:border-accent/40 transition-colors">
                  <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between items-center gap-4">
                    {f.q}
                    <span className="text-accent text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Interlinking */}
        <section className="bg-secondary/40 py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
              Atendemos {category.nome} também em
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-sm">
              {related.map((l) => (
                <Link
                  key={l.slug}
                  to={`/${category.slug}/${l.slug}`}
                  className="px-3 py-2 rounded-lg border border-border bg-card hover:border-accent hover:text-accent text-center transition-colors"
                >
                  <MapPin className="inline h-3 w-3 mr-1 -mt-px" />
                  {l.nome}
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to={`/${category.slug}-curitiba`} className="text-accent font-semibold hover:underline">
                Ver hub completo de {category.titlePrefix} em Curitiba e RMC →
              </Link>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryLocalTemplate;

/* ===== Hub raiz por categoria (lista todos os locais) ===== */
export const CategoryHub = ({ categoryId }: { categoryId: CategoryId }) => {
  const category = CATEGORIES[categoryId];
  const path = `/${category.slug}-curitiba`;
  const title = `${category.titlePrefix} em Curitiba e Região Metropolitana | Coleta e Entrega`;
  const description = `${category.titlePrefix} para Curitiba, São José dos Pinhais, Araucária, Pinhais, Colombo, Campo Largo e mais. Coleta e entrega, reparo mínimo R$ 300 com diagnóstico incluso. WhatsApp em 30 min.`;

  useEffect(() => { trackPageView(path, title); }, [path, title]);

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.titlePrefix,
    description,
    provider: { "@type": "LocalBusiness", name: "Técnico Curitiba", url: "https://tecnicocuritiba.com.br" },
    areaServed: { "@type": "AdministrativeArea", name: "Região Metropolitana de Curitiba" },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: `${category.titlePrefix} em Curitiba`, path },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(hubSchema)}</script>
      </Helmet>
      <Header />
      <main>
        <PageHero
          title={`${category.emoji} ${category.titlePrefix} em Curitiba e RMC`}
          subtitle={`Cobertura completa para ${category.nome.toLowerCase()}: coleta e entrega em toda a Região Metropolitana, diagnóstico incluso e garantia escrita.`}
          ctaText="Pedir orçamento no WhatsApp"
        />
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            Escolha sua cidade ou bairro
          </h2>
          <p className="text-center text-muted-foreground mb-8">{category.servicos.length}+ serviços disponíveis · {LOCAIS.length} locais atendidos</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {LOCAIS.map((l: LocalData) => (
              <Link
                key={l.slug}
                to={`/${category.slug}/${l.slug}`}
                className="p-3 rounded-lg border border-border bg-card hover:border-accent hover:shadow-md transition-all text-center"
              >
                <MapPin className="inline h-3.5 w-3.5 text-accent mr-1 -mt-px" />
                <span className="font-medium text-sm">{l.nome}</span>
                {l.kind === "bairro" && (
                  <p className="text-[10px] text-muted-foreground">bairro de {l.cidadeMae}</p>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-secondary/40 py-10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h3 className="text-xl font-bold mb-3">Como funciona</h3>
            <p className="text-muted-foreground">
              Triagem rápida pelo WhatsApp (com fotos/vídeo) → coleta agendada → diagnóstico em bancada → orçamento por escrito → reparo + entrega com garantia de 90 dias.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Quero orçamento de ${category.titlePrefix}.`)}`}
              className="inline-flex items-center gap-2 mt-5 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white px-5 py-3 rounded-lg font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com técnico agora
            </a>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

/* ===== Wrappers concretos para cada categoria (lazy-loadable) ===== */
export const ConsertoTVCity = () => <CategoryLocalTemplate categoryId="tv" />;
export const ConsertoSomCity = () => <CategoryLocalTemplate categoryId="som" />;
export const ConsertoVideogameCity = () => <CategoryLocalTemplate categoryId="videogame" />;
export const ConsertoCelularLocalCity = () => <CategoryLocalTemplate categoryId="celular" />;

export const ConsertoTVHub = () => <CategoryHub categoryId="tv" />;
export const ConsertoSomHub = () => <CategoryHub categoryId="som" />;
export const ConsertoVideogameHub = () => <CategoryHub categoryId="videogame" />;
export const ConsertoCelularLocalHub = () => <CategoryHub categoryId="celular" />;
