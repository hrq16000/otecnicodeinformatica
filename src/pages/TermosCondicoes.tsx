import { Helmet } from "react-helmet";
import { useCanonical } from "@/lib/canonicalUrl";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  MessageCircle,
  Home,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const CANONICAL = "https://tecnico.curitiba.br/termos-e-condicoes";

const faq = [
  {
    q: "Quanto custa o valor do atendimento pelo WhatsApp?",
    a: "Totalmente grátis. Envie fotos, vídeos e a descrição do problema pelo WhatsApp. Respondemos em até 30 minutos em horário comercial.",
  },
  {
    q: "Quanto custa a visita técnica em Curitiba e região?",
    a: "A partir de R$ 99,99 por até 30 minutos de inspeção superficial (sem abertura de equipamentos). Existe um combo opcional de até 2 horas por R$ 299,99 para serviços mais longos. Não inclui peças, estacionamento nem abertura de placas.",
  },
  {
    q: "Como funciona a taxa de diagnóstico em bancada de R$ 90?",
    a: "Quando o equipamento vai para análise em bancada (com coleta ou entrega no parceiro), realizamos diagnóstico completo. Se você aprovar o reparo, esse valor entra no preço final. Se desistir após o diagnóstico, é cobrada apenas a taxa de R$ 90.",
  },
  {
    q: "Por que reparos de placa têm valor mínimo de R$ 300?",
    a: "Reparos em placas-mãe, placas de TV, consoles, notebooks e equipamentos eletrônicos exigem equipamentos especializados (estação de retrabalho, microscópio, BGA). Trabalhamos com faixa pré-aprovada entre R$ 300 e R$ 500. Acima disso, só seguimos com a sua autorização expressa.",
  },
  {
    q: "Quais casos não compensa consertar?",
    a: "Placas-mãe de desktops antigos ou de entrada, e smartphones de linha A/C/E quase nunca compensam financeiramente. Nestes casos avisamos antes e oferecemos substituição. Filosofia: tudo tem conserto, mas nem tudo vale a pena.",
  },
  {
    q: "Qual é a garantia dos serviços?",
    a: "Oferecemos 90 dias de garantia para o serviço executado, contra defeito de mão de obra. Peças substituídas seguem a garantia do fabricante.",
  },
  {
    q: "Vocês atendem fora de Curitiba?",
    a: "Sim. Atendemos toda a Região Metropolitana de Curitiba (São José dos Pinhais, Pinhais, Araucária, Campo Largo, Colombo, Fazenda Rio Grande, Almirante Tamandaré, Piraquara, Quatro Barras, Campo Magro). Para outras cidades do Brasil, trabalhamos com parcerias e atendimento remoto.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// LocalBusiness NÃO é emitido aqui: o slot global (Footer) é o dono único
// da entidade https://tecnico.curitiba.br/#localbusiness.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnico.curitiba.br/" },
    { "@type": "ListItem", position: 2, name: "Termos e Condições", item: CANONICAL },
  ],
};


const TermosCondicoes = () => {
  const title = "Termos, Preços e Condições | Assistência Técnica Curitiba";
  const description =
    "Conserto de placas em Curitiba: atendimento sem compromisso pelo WhatsApp, visita técnica a partir de R$ 99,99, diagnóstico R$ 90, reparo mínimo R$ 300. Política transparente.";

  useCanonical(CANONICAL);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="conserto de placas Curitiba, diagnóstico R$ 90, visita técnica R$ 99,90, reparo mínimo R$ 300, atendimento sem compromisso WhatsApp, assistência técnica Curitiba" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <Header />

      <PageHero
        title="Como Funciona · Preços · Termos e Condições"
        subtitle="Transparência total nos valores antes do primeiro contato. Nossa filosofia: quase tudo tem conserto, mas nem tudo vale a pena — e a gente avisa antes."
        ctaText="Falar agora no WhatsApp"
      />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Pricing summary */}
        <section className="grid sm:grid-cols-2 gap-4 mb-12" aria-labelledby="precos">
          <h2 id="precos" className="sr-only">Resumo de preços</h2>
          {[
            {
              icon: MessageCircle,
              tone: "text-emerald-600",
              title: "valor do atendimento por WhatsApp",
              price: "Grátis",
              desc: "Envie fotos, vídeos e detalhes pelo WhatsApp. Nada é cobrado para receber a proposta.",
            },
            {
              icon: Home,
              tone: "text-blue-600",
              title: "Visita técnica em Curitiba",
              price: "A partir de R$ 99,99",
              desc: "Até 30 minutos de inspeção superficial. Combo 2h: R$ 299,99. Não inclui peças nem abertura.",
            },
            {
              icon: Wrench,
              tone: "text-amber-600",
              title: "Diagnóstico em bancada",
              price: "R$ 90",
              desc: "Cobrado apenas se você desistir após análise/coleta. Se aprovar o reparo, entra no valor final.",
            },
            {
              icon: ShieldCheck,
              tone: "text-violet-600",
              title: "Reparo de placa / TV / PC",
              price: "R$ 300 a R$ 500",
              desc: "Faixa pré-aprovada. Reparos acima de R$ 500 só com sua autorização explícita.",
            },
          ].map((c) => (
            <article key={c.title} className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-shadow">
              <c.icon className={`h-7 w-7 ${c.tone} mb-3`} />
              <h3 className="text-base font-semibold mb-1">{c.title}</h3>
              <p className="text-lg font-bold text-foreground mb-2">{c.price}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </section>

        {/* How it works */}
        <section className="mb-12" aria-labelledby="como-funciona">
          <h2 id="como-funciona" className="text-2xl font-bold mb-6">Como funciona nosso atendimento</h2>
          <ol className="space-y-3">
            {[
              { icon: MessageCircle, title: "1. valor do atendimento por WhatsApp", desc: "Você manda fotos e detalhes. Resposta em até 30 min em horário comercial." },
              { icon: Home, title: "2. Visita técnica (opcional)", desc: "A partir de R$ 99,99 por até 30 min. Combo 2h por R$ 299,99 para serviços mais longos." },
              { icon: Wrench, title: "3. Diagnóstico em bancada", desc: "Para casos complexos (placas, consoles, TVs). R$ 90 só se você cancelar o reparo." },
              { icon: ShieldCheck, title: "4. Reparo aprovado", desc: "Valor mínimo R$ 300 para eletrônicos complexos. Acima de R$ 500, autorização prévia." },
              { icon: CheckCircle2, title: "5. Garantia de 90 dias", desc: "Sobre o serviço executado. Peças seguem garantia do fabricante." },
            ].map((s) => (
              <li key={s.title} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                <s.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* When it's not worth it */}
        <section className="mb-12 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold">Quando não compensa consertar</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Avisamos antes de iniciar qualquer serviço. Casos típicos: placas-mãe de desktop antigos/básicos e
                smartphones de linha A, C ou E. Nestes equipamentos, indicamos substituição em vez de reparo.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold mb-6">Perguntas frequentes</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-lg border border-border bg-card p-4">
                <summary className="cursor-pointer font-semibold flex items-center justify-between gap-2">
                  {f.q}
                  <Clock className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold mb-2">Pronto para um valor transparente?</h2>
          <p className="text-muted-foreground mb-6">
            Toda conversa começa com nossas perguntas rápidas para já chegar com tudo pronto no WhatsApp.
          </p>
          <a
            href="https://wa.me/5541997086380"
            data-cta-location="terms_bottom_cta"
            className="inline-flex items-center gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link to="/como-funciona" className="underline hover:text-foreground">Ver como funciona</Link>
            {" · "}
            <Link to="/precos-e-politicas" className="underline hover:text-foreground">Preços completos</Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermosCondicoes;
