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
                      Você acompanha tudo na tela enquanto corrigimos vírus, lentidão, erros e outros problemas.
                    </p>
                  </div>
                </div>
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
