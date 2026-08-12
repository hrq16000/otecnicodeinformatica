import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, XCircle } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { clusterEquipamento } from "@/lib/clusterEquipamentos";
import { whatsappLink, absoluteUrl } from "@/lib/siteConfig";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

/**
 * Cluster EQUIPAMENTOS — página indexável por aparelho.
 *
 * Conteúdo autoral por slug em src/lib/clusterEquipamentos.ts. Slug fora do
 * cluster devolve 404 real (nunca o shell da Home).
 */
const ClusterEquipamentoPage = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const slug = params.slug ?? pathname.replace(/^\/equipamentos\//, "").replace(/\/$/, "");
  const dados = clusterEquipamento(slug);

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
          { name: "Equipamentos", path: "/equipamentos" },
          { name: dados.titulo, path: dados.path },
        ]}
      />
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs
          items={[{ label: "Equipamentos", href: "/equipamentos" }, { label: dados.titulo }]}
        />

        <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {dados.titulo}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{dados.resumo}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a
              href={waHref}
              onClick={() => trackCTAClick("whatsapp", "cluster_equipamento_topo")}
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

        <section className="mt-12" aria-labelledby="sintomas">
          <h2 id="sintomas" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Sintomas mais comuns nesse equipamento
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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section aria-labelledby="verificacoes">
            <h2 id="verificacoes" className="mb-4 font-heading text-2xl font-bold text-foreground">
              O que é verificado na avaliação
            </h2>
            <ul className="space-y-3">
              {dados.verificacoes.map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="naofaca">
            <h2 id="naofaca" className="mb-4 font-heading text-2xl font-bold text-foreground">
              O que evitar antes do atendimento
            </h2>
            <ul className="space-y-3">
              {dados.naoFaca.map((n) => (
                <li key={n} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" aria-hidden="true" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="modalidades">
          <h2 id="modalidades" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Como o atendimento acontece
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {dados.modalidades.map((m) => (
              <article key={m.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-bold text-foreground">{m.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
            <span>
              Trabalhamos com atendimento remoto, visita técnica e coleta com entrega — não temos
              balcão de atendimento ao público. Condições, prazos e valores de referência estão em{" "}
              <Link to="/precos-e-politicas" className="font-bold text-accent underline-offset-4 hover:underline">
                preços e políticas
              </Link>
              .
            </span>
          </p>
        </section>

        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Perguntas frequentes
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

        <section className="mt-12" aria-labelledby="relacionados">
          <h2 id="relacionados" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Continue por aqui
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {dados.relacionados.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
              >
                <p className="font-heading font-bold text-foreground">{r.titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                <span className="mt-3 inline-flex items-center gap-2 font-heading text-sm font-bold text-accent">
                  Abrir
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClusterEquipamentoPage;
