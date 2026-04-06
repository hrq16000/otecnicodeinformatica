import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AlertCircle, MessageCircle, ArrowRight, CheckCircle, Wrench, Shield, Search, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { getProblemaPageBySlug } from "@/lib/problemaPagesData";
import ReactMarkdown from "react-markdown";

const WHATSAPP_NUMBER = "5541997452053";

const tipoIcon = (tipo: string) => {
  switch (tipo) {
    case "hardware": return "🔧";
    case "software": return "💻";
    case "erro-humano": return "⚠️";
    case "desgaste": return "⏳";
    default: return "❓";
  }
};

const nivelColor = (nivel: string) => {
  switch (nivel) {
    case "Simples": return "bg-green-100 text-green-800";
    case "Médio": return "bg-yellow-100 text-yellow-800";
    case "Complexo": return "bg-red-100 text-red-800";
    default: return "bg-muted text-foreground";
  }
};

const ProblemaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getProblemaPageBySlug(slug) : undefined;

  useEffect(() => {
    if (data) {
      document.title = data.title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", data.metaDescription);
      trackPageView(`/${data.slug}`, data.h1);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Página não encontrada</h1>
          <Link to="/" className="text-accent underline">Voltar ao início</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsApp = () => {
    trackCTAClick("whatsapp", data.slug);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(data.whatsappMessage)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs items={[{ label: data.categoria, href: "/servicos" }, { label: data.h1.split("—")[0].trim() }]} />

      {/* Hero */}
      <section className="pt-12 pb-12 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-accent/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">{data.categoria}</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">{data.h1}</h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{data.intro.split("\n")[0]}</p>
            <Button size="lg" variant="cta" onClick={handleWhatsApp}>
              <MessageCircle className="mr-2 h-5 w-5" /> Falar com Técnico Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Introdução completa */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-sm md:prose-base">
            {data.intro.split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Sintomas */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">Sintomas — Identifique o Seu Caso</h2>
            <p className="text-center text-muted-foreground mb-8">Cada sintoma indica uma possível causa e nível de complexidade</p>
            <div className="grid md:grid-cols-2 gap-4">
              {data.sintomas.map((s, i) => (
                <div key={i} className="bg-background rounded-xl p-5 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{s.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">Complexidade: {s.gravidade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Causas Reais */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">Causas Reais — Por Que Isso Acontece</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.causas.map((c, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{tipoIcon(c.tipo)}</span>
                    <h3 className="font-semibold text-foreground">{c.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{c.desc}</p>
                  <span className="text-xs text-muted-foreground capitalize">Tipo: {c.tipo.replace("-", " ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cenários */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">Cenários — Simples, Médio e Complexo</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {data.cenarios.map((c, i) => (
                <div key={i} className="bg-background rounded-xl p-6 border border-border text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${nivelColor(c.nivel)}`}>{c.nivel}</span>
                  <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>⏱ Tempo: {c.tempo}</p>
                    <p>💰 Custo: {c.custo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Riscos */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-destructive mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Riscos de Não Agir ou Agir Sem Conhecimento
              </h2>
              <ul className="space-y-2">
                {data.riscos.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">•</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnóstico */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center flex items-center justify-center gap-2">
              <Search className="h-6 w-6" /> Diagnóstico Profissional
            </h2>
            <div className="bg-background rounded-xl p-6 border border-border">
              {data.diagnostico.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground mb-3 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solução */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center flex items-center justify-center gap-2">
              <Wrench className="h-6 w-6" /> Solução Profissional
            </h2>
            <div className="bg-secondary rounded-xl p-6 border border-border">
              {data.solucao.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground mb-3 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quando Compensa / Não Compensa */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Quando Compensa Reparar
              </h3>
              <p className="text-sm text-muted-foreground">{data.quandoCompensa}</p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-red-200">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" /> Quando Não Compensa
              </h3>
              <p className="text-sm text-muted-foreground">{data.quandoNaoCompensa}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Extra (Markdown) */}
      {data.conteudoExtra && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-sm md:prose-base prose-headings:text-primary prose-headings:font-bold">
              <ReactMarkdown>{data.conteudoExtra}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.h1.split("—")[0].trim()}?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Nosso técnico identifica o problema com diagnóstico preciso. Atendimento em Curitiba e região metropolitana.</p>
          <Button size="lg" variant="cta" onClick={handleWhatsApp}>
            <MessageCircle className="mr-2 h-5 w-5" /> Falar com Técnico Agora
          </Button>
        </div>
      </section>

      {/* Links Relacionados */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-primary mb-6 text-center">Páginas Relacionadas</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {data.relatedPages.map((link) => (
                <Link key={link.to} to={link.to} className="flex items-center gap-2 bg-background rounded-lg p-3 text-sm font-medium text-foreground hover:text-accent hover:shadow-md transition-all border border-border">
                  <ArrowRight className="h-4 w-4 text-accent flex-shrink-0" />{link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ProblemaPage;
