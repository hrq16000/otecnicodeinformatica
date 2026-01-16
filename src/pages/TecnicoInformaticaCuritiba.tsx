import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight } from "lucide-react";

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

const bairros = [
  { name: "Centro", slug: "centro", hasPage: true },
  { name: "Batel", slug: "batel", hasPage: true },
  { name: "Portão", slug: "portao", hasPage: true },
  { name: "Campo Comprido", slug: "campo-comprido", hasPage: true },
  { name: "CIC", slug: "cic", hasPage: true },
  { name: "Santa Felicidade", slug: "santa-felicidade", hasPage: true },
  { name: "Água Verde", slug: null, hasPage: false },
  { name: "Bigorrilho", slug: null, hasPage: false },
  { name: "Mercês", slug: null, hasPage: false },
  { name: "Boa Vista", slug: null, hasPage: false },
  { name: "Juvevê", slug: null, hasPage: false },
  { name: "Cabral", slug: null, hasPage: false },
  { name: "Cristo Rei", slug: null, hasPage: false },
  { name: "Cajuru", slug: null, hasPage: false },
  { name: "Uberaba", slug: null, hasPage: false },
  { name: "Pinheirinho", slug: null, hasPage: false },
  { name: "Xaxim", slug: null, hasPage: false },
  { name: "Boqueirão", slug: null, hasPage: false },
  { name: "Bacacheri", slug: null, hasPage: false },
  { name: "Tingui", slug: null, hasPage: false },
];

const servicos = [
  {
    title: "Formatação de Computador",
    description: "Instalação limpa do Windows com drivers e programas essenciais",
  },
  {
    title: "Remoção de Vírus e Malware",
    description: "Limpeza completa e proteção contra ameaças digitais",
  },
  {
    title: "Conserto de PC e Notebook",
    description: "Reparo de hardware, diagnóstico e troca de peças",
  },
  {
    title: "Upgrade SSD e Memória RAM",
    description: "Deixe seu computador até 10x mais rápido",
  },
  {
    title: "Configuração de Redes Wi-Fi",
    description: "Instalação de roteadores, repetidores e mesh",
  },
  {
    title: "Backup e Recuperação de Dados",
    description: "Proteção e recuperação de arquivos importantes",
  },
  {
    title: "Instalação de Programas",
    description: "Office, antivírus, drivers e softwares profissionais",
  },
  {
    title: "Limpeza Interna e Pasta Térmica",
    description: "Manutenção preventiva para melhor desempenho",
  },
  {
    title: "Suporte para Home Office",
    description: "Configuração completa para trabalho remoto",
  },
  {
    title: "Atendimento Remoto",
    description: "Suporte imediato sem sair de casa",
  },
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
                  Nossa equipe oferece <strong className="text-foreground">assistência técnica em informática</strong> para toda a capital paranaense, desde o Centro até os bairros mais distantes. Não importa se você está no <Link to="/bairros/batel" className="text-accent hover:underline">Batel</Link>, <Link to="/bairros/santa-felicidade" className="text-accent hover:underline">Santa Felicidade</Link>, <Link to="/bairros/portao" className="text-accent hover:underline">Portão</Link> ou <Link to="/bairros/cic" className="text-accent hover:underline">CIC</Link> – nosso técnico vai até você ou resolve seu problema remotamente.
                </p>
                <p>
                  Com atendimento ágil, <strong className="text-foreground">orçamento transparente</strong> e garantia em todos os serviços, somos a escolha certa para quem busca um técnico de computador confiável em Curitiba.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros Atendidos com Links */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Bairros Atendidos em Curitiba
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Clique no bairro para ver serviços específicos e solicitar atendimento
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) => (
                  bairro.hasPage && bairro.slug ? (
                    <Link
                      key={index}
                      to={`/bairros/${bairro.slug}`}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors group flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-accent group-hover:text-accent-foreground" />
                      {bairro.name}
                    </Link>
                  ) : (
                    <div
                      key={index}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {bairro.name}
                    </div>
                  )
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                E todos os demais bairros de Curitiba e região metropolitana
              </p>
              
              <div className="text-center mt-6">
                <Link 
                  to="/tecnico-informatica-sao-jose-pinhais"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  Ver bairros atendidos em São José dos Pinhais
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços com Links */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Serviços de Informática em Curitiba
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  <Link 
                    key={index} 
                    to="/servicos"
                    className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md hover:border-accent/30 border border-transparent transition-all group"
                  >
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {servico.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {servico.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors mt-1" />
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link 
                  to="/servicos"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  Ver lista completa de serviços
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

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