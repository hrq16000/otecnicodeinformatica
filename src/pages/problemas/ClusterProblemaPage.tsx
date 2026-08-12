import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, XCircle } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { FotoLicenciadaImg } from "@/components/FotoLicenciadaImg";
import { ServicosCorrelatos } from "@/components/informatica/ServicosCorrelatos";
import { ProximosPassos } from "@/components/informatica/ProximosPassos";
import NotFound from "@/pages/NotFound";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { clusterProblema } from "@/lib/clusterProblemas";
import { whatsappLink, absoluteUrl } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

/**
 * Cluster PROBLEMAS (Etapa 12) — página indexável de sintoma.
 *
 * Conteúdo autoral por slug em src/lib/clusterProblemas.ts. Slug fora do
 * cluster devolve 404 real (nada de shell da Home).
 */
const ClusterProblemaPage = () => {
  const { slug = "" } = useParams();
  const dados = clusterProblema(slug);

  useEffect(() => {
    if (dados) trackPageView(dados.path, dados.titulo);
  }, [dados]);

  useJsonLdSlot(
    SCHEMA_SLOTS.faq,
    dados
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: dados.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null,
    SLOT_PRIORITY.page,
  );

  useJsonLdSlot(
    SCHEMA_SLOTS.article ?? "article",
    dados
      ? {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: dados.titulo,
          description: dados.metaDescription,
          url: absoluteUrl(dados.path),
          inLanguage: "pt-BR",
        }
      : null,
    SLOT_PRIORITY.page,
  );

  if (!dados) return <NotFound />;

  const waHref = whatsappLink(dados.waMessage);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={dados.metaTitle}
        description={dados.metaDescription}
        path={dados.path}
        ogType="article"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Problemas", path: "/problemas" },
          { name: dados.titulo, path: dados.path },
        ]}
      />
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Problemas", href: "/problemas" },
            { label: dados.titulo },
          ]}
        />

        <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {dados.titulo}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{dados.resumo}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a
              href={waHref}
              onClick={() => trackCTAClick("cluster_problema_topo", dados.path)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Descrever meu caso
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/atendimento">
              Ver modalidades de atendimento
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {dados.foto && (
          <FotoLicenciadaImg slug={dados.foto} className="mt-8" />
        )}

        <section className="mt-12" aria-labelledby="sintomas">
          <h2 id="sintomas" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Como o problema costuma se manifestar
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {dados.sintomas.map((s) => (
              <article key={s.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-bold text-foreground">{s.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="causas">
          <h2 id="causas" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Causas investigadas no diagnóstico
          </h2>
          <ul className="space-y-3">
            {dados.causas.map((c) => (
              <li key={c.titulo} className="rounded-xl border border-border bg-card p-5">
                <p className="font-heading font-bold text-foreground">{c.titulo}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section aria-labelledby="antes">
            <h2 id="antes" className="mb-4 font-heading text-2xl font-bold text-foreground">
              O que checar antes de chamar
            </h2>
            <ul className="space-y-3">
              {dados.antesDeChamar.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="nao-faca">
            <h2 id="nao-faca" className="mb-4 font-heading text-2xl font-bold text-foreground">
              O que evitar
            </h2>
            <ul className="space-y-3">
              {dados.naoFaca.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="modalidades">
          <h2 id="modalidades" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Modalidades possíveis de atendimento
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {dados.modalidades.map((m) => (
              <article key={m.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-bold text-foreground">{m.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 flex gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
            <span>
              A modalidade só é definida depois de entender o sintoma. Diagnóstico, deslocamento,
              mão de obra e peça são informados separadamente e nada é executado sem sua aprovação.
            </span>
          </p>
        </section>

        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Perguntas frequentes sobre este problema
          </h2>
          <div className="space-y-4">
            {dados.faq.map((f) => (
              <article key={f.q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-bold text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <ServicosCorrelatos
            itens={dados.relacionados.map((r) => ({ to: r.to, titulo: r.titulo, desc: r.desc }))}
          />
          <ProximosPassos
            waHref={waHref}
            ctaLocation="cluster_problema_passos"
            onCta={() => trackCTAClick("cluster_problema_passos", dados.path)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClusterProblemaPage;
