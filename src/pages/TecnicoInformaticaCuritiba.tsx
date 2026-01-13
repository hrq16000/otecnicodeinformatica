import { useEffect } from "react";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { NeighborhoodsSection } from "@/components/NeighborhoodsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
    title: "Cobertura em Toda Curitiba",
    description: "Atendemos todos os bairros da capital paranaense e região metropolitana. Técnico de informática perto de você.",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Resposta imediata via WhatsApp. Agendamos visita técnica para o mesmo dia quando possível.",
  },
  {
    icon: Shield,
    title: "Garantia por Escrito",
    description: "Todos os serviços realizados contam com garantia. Trabalhamos com transparência e compromisso.",
  },
  {
    icon: Wrench,
    title: "Técnico Especializado",
    description: "Profissional com experiência em manutenção de computadores, notebooks e redes. Diagnóstico preciso e solução eficaz.",
  },
];

const servicos = [
  "Formatação de computador e notebook",
  "Remoção de vírus e malwares",
  "Conserto de PC que não liga",
  "Upgrade de memória RAM e SSD",
  "Configuração de redes e Wi-Fi",
  "Backup e recuperação de dados",
  "Instalação de programas",
  "Limpeza interna e pasta térmica",
  "Suporte para home office",
  "Atendimento remoto imediato",
];

const TecnicoInformaticaCuritiba = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Curitiba | Assistência Técnica Local | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Técnico de informática em Curitiba com atendimento em domicílio e remoto. Conserto de computador, formatação, remoção de vírus. Técnico perto de mim em Curitiba."
      );
    }
    trackPageView("/tecnico-informatica-curitiba", "Técnico Curitiba");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        <PageHero
          title="Técnico de Informática em Curitiba"
          subtitle="Assistência técnica profissional em toda capital paranaense. Atendimento em domicílio, empresas e remoto com rapidez e garantia."
          ctaText="Falar com Técnico em Curitiba"
        />

        <BenefitsGrid
          benefits={benefits}
          title="Por Que Escolher Nosso Técnico em Curitiba?"
          subtitle="Atendimento local com qualidade, confiança e preço justo"
        />

        {/* Sobre Curitiba */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Assistência Técnica em Informática para Curitiba e Região
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  Curitiba é uma das cidades mais desenvolvidas do Brasil, com milhares de empresas, escritórios e residências que dependem de computadores e tecnologia para suas atividades diárias. Quando seu equipamento apresenta problemas, você precisa de um <strong className="text-foreground">técnico de informática em Curitiba</strong> que entenda suas necessidades e resolva rapidamente.
                </p>
                <p className="mb-4">
                  Nossa equipe oferece <strong className="text-foreground">assistência técnica em informática</strong> para toda a capital paranaense, desde o Centro até os bairros mais distantes. Não importa se você está no Batel, Santa Felicidade, Portão ou CIC – nosso técnico vai até você ou resolve seu problema remotamente.
                </p>
                <p>
                  Com atendimento ágil, <strong className="text-foreground">orçamento transparente</strong> e garantia em todos os serviços, somos a escolha certa para quem busca um técnico de computador confiável em Curitiba.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços de Informática em Curitiba
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  <div key={index} className="flex items-center gap-3 bg-secondary rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{servico}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <NeighborhoodsSection />
        <TestimonialsSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaCuritiba;
