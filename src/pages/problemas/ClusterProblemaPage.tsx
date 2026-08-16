import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "@/lib/router-compat";
import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, XCircle } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PoliticaAtendimentoBloco } from "@/components/PoliticaAtendimentoBloco";
import { Button } from "@/components/ui/button";
import { FotoLicenciadaImg } from "@/components/FotoLicenciadaImg";
import { ServicosCorrelatos } from "@/components/informatica/ServicosCorrelatos";
import { ProximosPassos } from "@/components/informatica/ProximosPassos";
import InterlinksContextuais from "@/components/problemas/InterlinksContextuais";
import { TriagemContexto } from "@/components/problemas/TriagemContexto";
import NotFound from "@/pages/NotFound";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { clusterProblema } from "@/lib/clusterProblemas";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import {
  buildProblemaWaHref,
  buildProblemaWaFallbackHref,
  rotuloEvento,
  type ContextoTriagem,
} from "@/lib/problemasWaTemplates";
import { useScrollBucket } from "@/hooks/useScrollBucket";
import { useFaqSectionDepth } from "@/hooks/useFaqSectionDepth";
import { useVarianteWa } from "@/lib/problemasWaVariants";
import { copyCta, useVarianteCta } from "@/lib/problemasCtaVariants";
import { trackWaClick } from "@/lib/funnelAnalytics";
import {
  trackPageView,
  trackCTAClick,
  trackFaqLinkClick,
  trackFaqSectionDepth,
} from "@/lib/analytics";


/**
 * Cluster PROBLEMAS (Etapa 12) — página indexável de sintoma.
 *
 * Conteúdo autoral por slug em src/lib/clusterProblemas.ts. Slug fora do
 * cluster devolve 404 real (nada de shell da Home).
 */
const ClusterProblemaPage = () => {
  const params = useParams();
  const { pathname } = useLocation();
  // Rotas literais (/problemas/tela-azul) não têm :slug — cai no pathname.
  const slug = params.slug ?? pathname.replace(/^\/problemas\//, "").replace(/\/$/, "");
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

  // Rodada 4B/Fase 24: página de sintoma NÃO emite Service só por ter CTA.
  // Ela descreve um problema, não uma oferta comercial — o Service vive nas
  // páginas de /servicos. Aqui o par é WebPage + BreadcrumbList (+ FAQPage
  // quando a FAQ está realmente visível).
  useJsonLdSlot(
    SCHEMA_SLOTS.webPage,
    dados
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: dados.metaTitle,
          headline: dados.titulo,
          description: dados.metaDescription,
          url: absoluteUrl(dados.path),
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${siteConfig.baseUrl}/#website` },
          about: { "@type": "Thing", name: dados.titulo },
          publisher: { "@id": `${siteConfig.baseUrl}/#organization` },
        }
      : null,
    SLOT_PRIORITY.page,
  );

  const [contexto, setContexto] = useState<ContextoTriagem>({});
  const rolagem = useScrollBucket();
  // Mesma variante do A/B durante toda a navegação (localStorage + cookie).
  const variante = useVarianteWa();
  // Experimento paralelo: copy + posição do CTA por seção (cta_1 / cta_2).
  const varianteBotao = useVarianteCta();

  /**
   * Registro único de clique de WhatsApp: GA4 (engajamento) + click_events
   * (conversão por sessão, com variante e sintoma) — alimenta /admin/experimento-wa.
   */
  const registrarWa = (ctx: { secao: string }) => {
    const rotulo = rotuloEvento({ ...contexto, sintoma: sintomaSlug, secao: ctx.secao, rolagem, variante });
    trackCTAClick("whatsapp", rotulo);
    trackWaClick(rotulo, {
      variant: `msg_${variante}_cta_${varianteBotao}`,
      servico: sintomaSlug,
      cta_position: `problema_${ctx.secao}`,
      utm_medium: "cta",
      bairro: contexto.bairro ?? null,
    });
  };

  const sintomaSlug = dados?.slug ?? slug;
  const baseMsg = dados?.waMessage ?? "";

  const waHref = useMemo(
    () =>
      buildProblemaWaHref(baseMsg, {
        ...contexto,
        sintoma: sintomaSlug,
        secao: "topo",
        rolagem,
        variante,
      }),
    [baseMsg, contexto, sintomaSlug, rolagem, variante],
  );

  const faqIds = useMemo(
    () => (dados ? dados.faq.map((_, i) => `faq-${i + 1}`) : []),
    [dados],
  );
  useFaqSectionDepth(faqIds, (id, depth) => {
    const idx = Number(id.replace("faq-", "")) - 1;
    const pergunta = dados?.faq[idx]?.q ?? id;
    trackFaqSectionDepth(id, pergunta, depth, rolagem);
  });

  if (!dados) return <NotFound />;

  /**
   * CTA contextual por seção: mensagem pré-preenchida (sintoma + equipamento +
   * bairro + urgência) e link com UTM/identificadores de rota, seção e rolagem,
   * para atribuição precisa no GA4/Google Ads.
   *
   * O microcopy, o rótulo e a POSIÇÃO do bloco vêm do experimento cta_1/cta_2
   * (src/lib/problemasCtaVariants.ts). Cada ponto de inserção declara `quando`
   * ("antes" ou "depois" do conteúdo da seção) e só renderiza se bater com a
   * posição da variante — o conteúdo editorial nunca muda.
   */
  const CtaContextual = ({
    secao,
    mensagem,
    quando = "depois",
  }: {
    secao: string;
    mensagem: string;
    quando?: "antes" | "depois";
  }) => {
    const copy = copyCta(secao, varianteBotao);
    if (copy.posicao !== quando) return null;
    const ctx = { ...contexto, sintoma: sintomaSlug, secao, rolagem, complemento: mensagem, variante };
    return (
    <div
      className={`${quando === "antes" ? "mb-6" : "mt-6"} flex flex-col gap-3 rounded-xl border border-border bg-secondary/30 p-5 sm:flex-row sm:items-center sm:justify-between animate-fade-in`}
    >
      <p className="text-sm leading-relaxed text-muted-foreground">{copy.texto}</p>
      <Button asChild className="shrink-0 transition-transform duration-200 hover:-translate-y-0.5">
        <a
          href={buildProblemaWaHref(baseMsg, ctx)}
          onClick={() => registrarWa({ secao })}
          rel="noopener noreferrer"
          target="_blank"
        >
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          {copy.rotulo}
        </a>
      </Button>
    </div>
    );
  };




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
        {dados.ponteEditorial ? (
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {dados.ponteEditorial.antes}
            <Link
              to={dados.ponteEditorial.to}
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              {dados.ponteEditorial.anchor}
            </Link>
            {dados.ponteEditorial.depois}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a
              href={waHref}
              onClick={() => trackCTAClick("whatsapp", "cluster_problema_topo")}
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
        {/* Fallback sem app instalado: mesmo texto e mesmos parâmetros de tracking. */}
        <p className="mt-3 text-xs text-muted-foreground">
          Sem o aplicativo instalado?{" "}
          <a
            href={buildProblemaWaFallbackHref(baseMsg, {
              ...contexto,
              sintoma: sintomaSlug,
              secao: "topo_web",
              rolagem,
            })}
            onClick={() =>
              trackCTAClick("whatsapp", `problema_${sintomaSlug}_topo_web`)
            }
            rel="noopener noreferrer"
            target="_blank"
            className="font-bold underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            abrir no WhatsApp Web
          </a>{" "}
          com a mesma mensagem.
        </p>

        <TriagemContexto valor={contexto} onChange={setContexto} />

        {dados.foto && (
          <FotoLicenciadaImg slug={dados.foto} className="mt-8" />
        )}


        <section className="mt-12" aria-labelledby="sintomas">
          <h2 id="sintomas" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Como o problema costuma se manifestar
          </h2>
          <CtaContextual secao="sintomas" mensagem="O sintoma mais parecido com o meu caso é:" quando="antes" />
          <div className="grid gap-4 sm:grid-cols-2">
            {dados.sintomas.map((s) => (
              <article key={s.titulo} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-bold text-foreground">{s.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>
          <CtaContextual secao="sintomas" mensagem="O sintoma mais parecido com o meu caso é:" />
        </section>

        <section className="mt-12" aria-labelledby="causas">
          <h2 id="causas" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Causas investigadas no diagnóstico
          </h2>
          <CtaContextual secao="causas" mensagem="Quero uma triagem para descobrir a causa." quando="antes" />
          <ul className="space-y-3">
            {dados.causas.map((c) => (
              <li key={c.titulo} className="rounded-xl border border-border bg-card p-5">
                <p className="font-heading font-bold text-foreground">{c.titulo}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </li>
            ))}
          </ul>
          <CtaContextual secao="causas" mensagem="Quero uma triagem para descobrir a causa." />
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
          <CtaContextual secao="modalidades" mensagem="Quero saber qual modalidade se aplica ao meu caso." quando="antes" />
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
          <CtaContextual secao="modalidades" mensagem="Quero saber qual modalidade se aplica ao meu caso." />
        </section>


        <PoliticaAtendimentoBloco variant="inline" />

        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 font-heading text-2xl font-bold text-foreground">
            Perguntas frequentes sobre este problema
          </h2>
          <CtaContextual secao="faq" mensagem="Minha dúvida é:" quando="antes" />
          <div className="space-y-4">
            {dados.faq.map((f, i) => {
              const rel = dados.relacionados[i % dados.relacionados.length];
              const ancora = `faq-${i + 1}`;
              const ctxFaq = {
                ...contexto,
                sintoma: sintomaSlug,
                secao: ancora,
                rolagem,
                variante,
                complemento: `Minha dúvida é sobre: ${f.q}`,
              };
              return (
                <article key={f.q} id={ancora} className="rounded-xl border border-border bg-card p-5 animate-fade-in">
                  <h3 className="font-heading font-bold text-foreground">
                    <a
                      href={`#${ancora}`}
                      onClick={() => trackFaqLinkClick("anchor", f.q, `#${ancora}`, ancora)}
                      className="transition-colors hover:text-accent"
                    >
                      {f.q}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {rel && (
                      <Link
                        to={rel.to}
                        onClick={() => trackFaqLinkClick("internal_link", f.q, rel.to, ancora)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-transform duration-200 hover:translate-x-0.5"
                      >
                        {rel.titulo}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                    <a
                      href={buildProblemaWaHref(baseMsg, ctxFaq)}
                      onClick={() => registrarWa({ secao: ancora })}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-sm font-bold text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      Perguntar isso no WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}

          </div>
          <CtaContextual secao="faq" mensagem="Minha dúvida é:" />
        </section>

        <InterlinksContextuais path={`/problemas/${sintomaSlug}`} />

        <div className="mt-12">
          <ServicosCorrelatos
            itens={dados.relacionados.map((r) => ({ to: r.to, titulo: r.titulo, desc: r.desc }))}
          />
          <ProximosPassos
            waHref={waHref}
            ctaLocation="cluster_problema_passos"
            onCta={() => trackCTAClick("whatsapp", "cluster_problema_passos")}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClusterProblemaPage;
