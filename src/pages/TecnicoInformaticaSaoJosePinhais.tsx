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
import { MapPin, Clock, Shield, Wrench, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em São José dos Pinhais",
    description: "Cobrimos toda a cidade, do Centro aos bairros industriais. Técnico próximo a você na região metropolitana.",
  },
  {
    icon: Clock,
    title: "Rapidez no Atendimento",
    description: "Por estarmos na região metropolitana, chegamos rápido até você. Agendamento flexível conforme sua disponibilidade.",
  },
  {
    icon: Shield,
    title: "Profissional de Confiança",
    description: "Técnico identificado, com experiência comprovada e referências. Atendimento seguro para sua casa ou empresa.",
  },
  {
    icon: Wrench,
    title: "Serviço Completo",
    description: "Desde formatação até conserto de hardware. Resolvemos qualquer problema do seu computador ou notebook.",
  },
];

const bairros = [
  "Centro",
  "Afonso Pena",
  "Cidade Jardim",
  "Pedro Moro",
  "São Cristóvão",
  "Costeira",
  "Guatupê",
  "Ipê",
  "Jardim Cruzeiro",
  "Rio Pequeno",
  "Aristocrata",
  "Borda do Campo",
];

const servicos = [
  "Formatação de computador e notebook",
  "Remoção de vírus e proteção",
  "Conserto de PC e notebook",
  "Upgrade de memória e SSD",
  "Configuração de rede e internet",
  "Backup e recuperação de arquivos",
  "Instalação de programas e sistemas",
  "Suporte técnico para empresas locais",
];

const TecnicoInformaticaSaoJosePinhais = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em São José dos Pinhais | Assistência Técnica | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em São José dos Pinhais. Atendimento em domicílio e empresas. Conserto de computador, formatação, remoção de vírus na região metropolitana de Curitiba."
      );
    }
    trackPageView("/tecnico-informatica-sao-jose-pinhais", "Técnico São José dos Pinhais");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Técnico de Informática em São José dos Pinhais"
          subtitle="Assistência técnica profissional na segunda maior cidade do Paraná. Atendimento rápido para residências e empresas."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Suporte Técnico Local em São José dos Pinhais"
          subtitle="Atendimento presencial e remoto para toda a cidade"
        />

        {/* Sobre a Cidade */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Assistência Técnica em São José dos Pinhais
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  São José dos Pinhais, segunda maior cidade do Paraná e parte da região metropolitana de Curitiba, é um importante polo industrial e comercial. Com milhares de empresas e residências, a demanda por <strong className="text-foreground">técnico de informática em São José dos Pinhais</strong> é constante.
                </p>
                <p className="mb-4">
                  Nossa equipe atende toda a cidade, desde o Centro até os bairros industriais próximos ao aeroporto. Oferecemos <strong className="text-foreground">assistência técnica de computadores</strong> com a mesma qualidade e profissionalismo que nossos clientes em Curitiba já conhecem.
                </p>
                <p>
                  Se você mora ou trabalha em São José dos Pinhais e precisa de um técnico de computador confiável, entre em contato. Atendemos residências, comércios e empresas de todos os portes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros Atendidos */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Bairros Atendidos em São José dos Pinhais
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) => (
                  <div
                    key={index}
                    className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground"
                  >
                    {bairro}
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                E todos os demais bairros da cidade
              </p>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços Disponíveis
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
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
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaSaoJosePinhais;
