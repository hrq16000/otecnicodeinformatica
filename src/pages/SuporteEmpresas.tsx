import { useEffect } from "react";
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
import { MessageCircle, Headphones, Clock, Building, CreditCard, FileText, CheckCircle, Users, Shield } from "lucide-react";

const WHATSAPP_NUMBER = "5541997086380";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico para minha empresa.";

const services = [
  {
    icon: Headphones,
    title: "Suporte Contínuo",
    description: "Acompanhamento técnico permanente para sua empresa funcionar sem interrupções. Planos mensais com atendimento prioritário.",
  },
  {
    icon: Clock,
    title: "SLA Personalizado",
    description: "Tempo de resposta garantido conforme a necessidade do seu negócio. Atendimento emergencial quando você mais precisa.",
  },
  {
    icon: Building,
    title: "Remoto e Presencial",
    description: "Atendimento híbrido: resolvemos problemas simples remotamente e vamos até sua empresa quando necessário.",
  },
  {
    icon: CreditCard,
    title: "Pagamento Facilitado",
    description: "Aceitamos pagamento faturado para empresas. Nota fiscal emitida em todos os serviços realizados.",
  },
];

const diferenciais = [
  {
    icon: FileText,
    title: "Nota Fiscal Garantida",
    description: "Emitimos nota fiscal de serviços para todos os atendimentos, facilitando sua contabilidade e controle de despesas de TI.",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Contamos com parcerias em todas as regiões de Curitiba e do Brasil, garantindo cobertura ampla e atendimento de alto padrão.",
  },
  {
    icon: Shield,
    title: "Confidencialidade",
    description: "Tratamos os dados da sua empresa com total sigilo e segurança. Políticas de privacidade e termos de confidencialidade quando necessário.",
  },
];

const SuporteEmpresas = () => {
  useEffect(() => {
    document.title = "Suporte Técnico para Empresas em Curitiba | TI Corporativo | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Suporte técnico empresarial em Curitiba. TI para pequenas e médias empresas com planos mensais, nota fiscal e pagamento faturado. Manutenção de computadores corporativos."
      );
    }
    trackPageView("/suporte-empresas", "Suporte Empresas");

    // Schemas Service para sinais Premium PJ
    import("@/lib/schemaValidation").then(({ validateAndInjectSchema }) => {
      const baseProvider = { "@type": "LocalBusiness", name: "Técnico Curitiba", url: "https://tecnico.curitiba.br/", areaServed: "Curitiba e região metropolitana" };
      const services = [
        { id: "service-faturado", name: "Pagamento Faturado PJ", desc: "Atendimento técnico corporativo com pagamento faturado (boleto/30 dias) para empresas em Curitiba." },
        { id: "service-nfe", name: "Emissão de NF-e", desc: "Nota fiscal eletrônica em todos os atendimentos PJ, conforme legislação do Município de Curitiba." },
        { id: "service-infra", name: "Projetos de Infraestrutura de TI", desc: "Cabeamento estruturado, redes Wi-Fi corporativas, racks e configuração de servidores para PMEs." },
        { id: "service-premium", name: "Atendimento Premium PJ", desc: "SLA prioritário, técnico dedicado e janela de atendimento garantida para contratos mensais." },
      ];
      services.forEach((s) => {
        validateAndInjectSchema(s.id, {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `https://tecnico.curitiba.br/suporte-empresas#${s.id}`,
          name: s.name,
          description: s.desc,
          serviceType: s.name,
          areaServed: { "@type": "City", name: "Curitiba" },
          provider: baseProvider,
          url: "https://tecnico.curitiba.br/suporte-empresas",
        });
      });
    });
  }, []);


  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleCTAClick = () => {
    trackCTAClick("whatsapp", "empresas-cta");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO noindex title="Suporte Técnico para Empresas em Curitiba | TI Corporativo | Técnico Curitiba" description="Suporte técnico empresarial em Curitiba. TI para pequenas e médias empresas com planos mensais, nota fiscal e pagamento faturado. Manutenção de computadores corporativos." path="/suporte-empresas" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: "Suporte Empresas", path: "/suporte-empresas" }]} />
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Suporte Técnico para Empresas"
          subtitle="Soluções de TI para pequenas e médias empresas em Curitiba. Planos mensais, atendimento prioritário e nota fiscal garantida."
          ctaText="Solicitar Proposta Comercial"
        />

        <BenefitsGrid
          benefits={services}
          title="Serviços para Sua Empresa"
          subtitle="Suporte técnico empresarial completo e profissional"
        />

        {/* O Que Está Incluso */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                O Que Está Incluso no Suporte Empresarial?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Manutenção Preventiva</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Limpeza e otimização de computadores
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Atualização de softwares e sistemas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Verificação de segurança e antivírus
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Backup e proteção de dados corporativos
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Suporte Técnico</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Atendimento remoto prioritário
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Visitas técnicas quando necessário
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Suporte a redes e Wi-Fi corporativo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Instalação e configuração de equipamentos
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Infraestrutura</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Configuração de servidores locais
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Gestão de rede local e cabeamento
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Segurança e firewall empresarial
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      VPN para colaboradores remotos
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Consultoria</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Análise de necessidades de TI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Recomendação de equipamentos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Planejamento de upgrades
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Treinamento básico de equipe
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Por Que Empresas Escolhem a Técnico Curitiba?
              </h2>
              <p className="text-muted-foreground text-lg">
                Diferenciais que fazem a diferença no dia a dia da sua empresa
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {diferenciais.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-background rounded-xl p-6 text-center hover:shadow-lg transition-all"
                  >
                    <div className="bg-accent rounded-full p-4 w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCTAClick}
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar Proposta
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Tipos de Atendimento */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Atendimento Avulso ou Plano Mensal
              </h2>
              <p className="text-muted-foreground mb-8">
                Oferecemos flexibilidade para atender sua empresa da melhor forma. Escolha entre chamados avulsos quando precisar ou um plano mensal com suporte contínuo e valor fixo.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary rounded-xl p-6 border-2 border-transparent hover:border-accent/30 transition-all">
                  <h3 className="text-xl font-bold text-foreground mb-3">Atendimento Avulso</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Ideal para empresas que precisam de suporte esporádico. Você chama quando precisa e paga apenas pelo serviço realizado.
                  </p>
                  <p className="text-accent font-bold">A partir de R$ 99,99 por atendimento</p>
                </div>

                <div className="bg-secondary rounded-xl p-6 border-2 border-accent/30 transition-all">
                  <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto mb-3">
                    RECOMENDADO
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Plano Mensal</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Valor fixo mensal com suporte ilimitado, manutenção preventiva inclusa e atendimento prioritário para sua empresa.
                  </p>
                  <p className="text-accent font-bold">Consulte valores personalizados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="servidores" secondaryImageKey="redesWifi" layout="duo" caption="Infraestrutura de rede empresarial" secondaryCaption="Configuração profissional de redes corporativas" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default SuporteEmpresas;
