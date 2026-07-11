import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { MessageCircle, Zap, Download, MapPinOff, CheckCircle2, Ban, ShieldCheck, ArrowRight, Lock } from "lucide-react";

const WHATSAPP_MESSAGE = "Preciso de suporte remoto de informática.";

const podeRemoto = [
  "Configurações do sistema e ajustes do Windows",
  "Erros de sistema, atualizações e drivers",
  "Instalação e configuração de programas",
  "Orientação técnica e suporte a usuários",
  "Acesso e permissões de contas e pastas",
  "Impressoras e dispositivos já conectados",
  "Diagnóstico inicial de lentidão e travamentos",
  "Problemas empresariais compatíveis com acesso remoto",
];

const naoRemoto = [
  "Equipamento que não liga",
  "Falha física ou troca de peça",
  "Superaquecimento físico",
  "Tela sem funcionamento",
  "Danos em conectores",
  "Disco não reconhecido em nível de hardware",
  "Qualquer problema que impeça o acesso ao sistema",
];

const faqs = [
  {
    question: "O que pode ser resolvido remotamente?",
    answer:
      "Configurações, erros de sistema, instalação de programas, orientação técnica, ajustes de acesso e permissões, dispositivos já conectados e o diagnóstico inicial de lentidão. É a modalidade certa para problemas que não exigem intervenção física.",
  },
  {
    question: "O acesso remoto é seguro?",
    answer:
      "Sim. Usamos um software de acesso com sua autorização e você acompanha tudo na tela durante o atendimento. Ao final, o acesso é encerrado.",
  },
  {
    question: "Preciso autorizar o acesso?",
    answer:
      "Sempre. O acesso remoto só acontece com o seu consentimento explícito e sob o seu acompanhamento. Nunca solicitamos senhas no conteúdo do site.",
  },
  {
    question: "Todo vírus pode ser removido remotamente?",
    answer:
      "Nem sempre. Boa parte das infecções de software é tratada remotamente, mas casos graves podem exigir avaliação presencial ou reinstalação do sistema.",
  },
  {
    question: "E se o equipamento não ligar?",
    answer:
      "Nesse caso o suporte remoto não se aplica: problemas físicos, tela sem funcionamento ou disco não reconhecido em hardware precisam de atendimento presencial ou coleta.",
  },
  {
    question: "Atendem empresas remotamente?",
    answer:
      "Sim, para problemas compatíveis com acesso remoto. Demandas maiores podem ser combinadas dentro do suporte técnico empresarial.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const benefits = [
  {
    icon: MessageCircle,
    title: "Suporte via WhatsApp",
    description: "Atendimento imediato pelo WhatsApp com resposta rápida e eficiente"
  },
  {
    icon: Zap,
    title: "Diagnóstico Rápido",
    description: "Identificamos e resolvemos o problema do seu computador em minutos"
  },
  {
    icon: Download,
    title: "Instalação de Software",
    description: "Instalamos e configuramos programas, drivers e atualizações"
  },
  {
    icon: MapPinOff,
    title: "Sem Deslocamento",
    description: "Resolva tudo sem sair de casa, economize tempo e dinheiro"
  }
];

const AtendimentoRemoto = () => {
  useEffect(() => {
    document.title = "Suporte Remoto de Informática | Atendimento em Curitiba";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Suporte remoto para configurações, sistemas, programas, acesso, orientações e problemas de informática que não exigem intervenção física."
      );
    }
    trackPageView("/atendimento-remoto", "Atendimento Remoto");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Suporte Remoto de Informática | Atendimento em Curitiba" description="Suporte remoto para configurações, sistemas, programas, acesso, orientações e problemas de informática que não exigem intervenção física." path="/atendimento-remoto" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: "Atendimento Remoto", path: "/atendimento-remoto" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Suporte remoto de informática para residências e empresas"
          subtitle="Resolvemos remotamente o que não exige intervenção física: configurações, sistemas, programas e orientação — com o seu acompanhamento na tela."
          ctaText="Pedir suporte remoto"
          whatsappMessage={WHATSAPP_MESSAGE}
        />
        
        <BenefitsGrid
          benefits={benefits}
          title="Por Que Escolher o Atendimento Remoto?"
          subtitle="Solução rápida, prática e segura para resolver problemas de informática"
        />

        
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Como Funciona o Atendimento Remoto?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Entre em Contato</h3>
                    <p className="text-muted-foreground">
                      Envie uma mensagem pelo WhatsApp explicando o problema do seu computador.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Conectamos ao Seu PC</h3>
                    <p className="text-muted-foreground">
                      Com sua autorização, usamos um software seguro para acessar seu computador remotamente.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Resolvemos o Problema</h3>
                    <p className="text-muted-foreground">
                      Você acompanha tudo na tela enquanto ajustamos configurações, sistema, programas e boa parte dos problemas de software.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O que pode e o que não pode remoto */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                O que pode (e o que não pode) ser resolvido remotamente
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background rounded-xl p-6 border-l-4 border-accent">
                  <CheckCircle2 className="h-8 w-8 text-accent mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-3">Atendido remotamente</h3>
                  <ul className="space-y-2">
                    {podeRemoto.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background rounded-xl p-6 border-l-4 border-destructive">
                  <Ban className="h-8 w-8 text-destructive mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-3">Exige atendimento físico</h3>
                  <ul className="space-y-2">
                    {naoRemoto.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Ban className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-background p-5 flex gap-3 items-start">
                <Lock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Acesso com consentimento.</strong> O acesso remoto
                  só ocorre com a sua autorização explícita e sob o seu acompanhamento na tela. Não
                  pedimos senhas por aqui e o acesso é encerrado ao final do atendimento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Links relacionados */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <h2 className="mb-5 text-center text-xl md:text-2xl font-bold text-foreground">
              Serviços e modalidades relacionadas
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
                { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial" },
                { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
                { label: "Diagnóstico técnico", to: "/diagnostico-tecnico" },
                { label: "Preços e políticas", to: "/precos-e-politicas" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Perguntas frequentes sobre suporte remoto
              </h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.question} className="rounded-xl border border-border bg-background p-5">
                    <h3 className="flex items-start gap-2 font-bold text-foreground mb-2">
                      <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                      {f.question}
                    </h3>
                    <p className="pl-7 text-muted-foreground leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="suporteRemoto" caption="Suporte técnico remoto profissional" />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default AtendimentoRemoto;
