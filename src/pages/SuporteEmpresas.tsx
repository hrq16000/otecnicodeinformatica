import { useEffect } from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { Headphones, Clock, Building, CreditCard } from "lucide-react";

const services = [
  {
    icon: Headphones,
    title: "Suporte Contínuo",
    description: "Acompanhamento técnico permanente para sua empresa funcionar sem interrupções"
  },
  {
    icon: Clock,
    title: "SLA Personalizado",
    description: "Tempo de resposta garantido conforme a necessidade do seu negócio"
  },
  {
    icon: Building,
    title: "Remoto e Presencial",
    description: "Atendimento híbrido: resolvemos remotamente ou vamos até sua empresa"
  },
  {
    icon: CreditCard,
    title: "Planos Mensais",
    description: "Pacotes personalizados com valor fixo mensal, sem surpresas"
  }
];

const SuporteEmpresas = () => {
  useEffect(() => {
    document.title = "Suporte Técnico para Empresas em Curitiba | Técnico Curitiba";
    trackPageView("/suporte-empresas", "Suporte Empresas");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Suporte Técnico para Empresas"
          subtitle="Mantenha sua empresa funcionando com suporte profissional e dedicado"
          ctaText="Solicitar Proposta"
        />
        
        <BenefitsGrid
          benefits={services}
          title="Serviços para Sua Empresa"
          subtitle="Soluções completas de TI para pequenas e médias empresas em Curitiba"
        />
        
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
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
                      Backup e proteção de dados
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
                      Suporte a redes e Wi-Fi
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Instalação de equipamentos
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Infraestrutura</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Configuração de servidores
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Gestão de rede local
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Segurança e firewall
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      VPN para trabalho remoto
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
                      Treinamento de equipe
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default SuporteEmpresas;
