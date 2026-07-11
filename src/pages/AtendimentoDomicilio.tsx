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
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Clock, Shield, Home, User, Briefcase, CheckCircle, Truck, AlertTriangle, ArrowRight, Camera } from "lucide-react";

const WHATSAPP_NUMBER = "5541997086380";
const WHATSAPP_MESSAGE = "Preciso verificar a possibilidade de atendimento técnico em domicílio.";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em Toda Curitiba",
    description: "Vamos até você em qualquer bairro de Curitiba e região metropolitana. Técnico perto de você, sempre disponível.",
  },
  {
    icon: Clock,
    title: "Horário Flexível",
    description: "Agendamos conforme sua disponibilidade, inclusive aos sábados. Você não precisa perder um dia de trabalho.",
  },
  {
    icon: Shield,
    title: "Técnico Identificado",
    description: "Nosso profissional chega identificado, com crachá e uniforme. Segurança e confiança para você e sua família.",
  },
  {
    icon: Home,
    title: "Sem Deslocamento",
    description: "Você não precisa carregar seu computador. Resolvemos tudo no conforto da sua casa ou escritório.",
  },
];

const publicoAlvo = [
  {
    icon: Home,
    title: "Residências",
    description: "Famílias que precisam de suporte técnico sem complicação. Resolvemos problemas de vírus, lentidão, formatação e muito mais.",
  },
  {
    icon: User,
    title: "Profissionais Liberais",
    description: "Advogados, médicos, contadores e outros profissionais que dependem do computador para trabalhar e não podem ficar parados.",
  },
  {
    icon: Briefcase,
    title: "Home Office",
    description: "Quem trabalha de casa precisa de equipamento funcionando 100%. Configuramos VPN, rede, impressora e todo seu ambiente de trabalho.",
  },
];

const AtendimentoDomicilio = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Domicílio Curitiba | Atendimento em Casa | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em domicílio em Curitiba. Atendimento em casa ou escritório com horário agendado. Técnico perto de mim, rápido e confiável."
      );
    }
    trackPageView("/atendimento-domicilio", "Atendimento Domicílio");
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleCTAClick = () => {
    trackCTAClick("whatsapp", "domicilio-cta");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Técnico de Informática em Domicílio Curitiba | Atendimento em Casa | Técnico Curitiba" description="Técnico de informática em domicílio em Curitiba. Atendimento em casa ou escritório com horário agendado. Técnico perto de mim, rápido e confiável." path="/atendimento-domicilio" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: "Atendimento a Domicílio", path: "/atendimento-domicilio" }]} />
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Técnico de Informática em Domicílio"
          subtitle="Atendimento técnico na sua casa ou escritório em Curitiba. Comodidade, rapidez e segurança sem você precisar sair de casa."
          ctaText="Agendar Visita Técnica"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Vantagens do Atendimento em Domicílio"
          subtitle="Por que escolher o técnico que vai até você?"
        />

        {/* Como Funciona */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Como Funciona o Atendimento em Domicílio?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start bg-background rounded-xl p-5">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Entre em Contato pelo WhatsApp</h3>
                    <p className="text-muted-foreground">
                      Descreva o problema do seu computador e informe seu endereço em Curitiba. Respondemos rapidamente com disponibilidade e orçamento estimado.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-background rounded-xl p-5">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Agendamos a Visita</h3>
                    <p className="text-muted-foreground">
                      Escolha o melhor dia e horário para você. Nosso técnico chegará pontualmente, identificado e com todas as ferramentas necessárias.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-background rounded-xl p-5">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Resolvemos na Hora</h3>
                    <p className="text-muted-foreground">
                      A maioria dos problemas é resolvida em uma única visita. Se precisar de peças ou serviço mais complexo, informamos antes de continuar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button variant="whatsapp" size="lg" asChild>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCTAClick}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Agendar Visita Agora
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Público Alvo */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Para Quem é o Atendimento em Domicílio?
              </h2>
              <p className="text-muted-foreground text-lg">
                Ideal para quem precisa de comodidade e não quer carregar equipamentos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {publicoAlvo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-secondary rounded-xl p-6 text-center hover:shadow-lg transition-all"
                  >
                    <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Serviços em Domicílio */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                O Que Podemos Resolver na Sua Casa?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Formatação de computador e notebook",
                  "Remoção de vírus e malwares",
                  "Computador lento ou travando",
                  "Problemas de inicialização",
                  "Upgrade de memória e SSD",
                  "Configuração de rede e Wi-Fi",
                  "Instalação de programas",
                  "Backup e recuperação de dados",
                  "Configuração de impressora",
                  "Suporte para home office",
                  "Limpeza interna e troca de pasta térmica",
                  "Diagnóstico de hardware",
                ].map((servico, index) => (
                  <div key={index} className="flex items-center gap-3 bg-background rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{servico}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="atendimentoDomiciliar" secondaryImageKey="tecnicoTrabalhando" layout="duo" caption="Atendimento técnico diretamente na sua casa" secondaryCaption="Diagnóstico profissional a domicílio" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default AtendimentoDomicilio;
