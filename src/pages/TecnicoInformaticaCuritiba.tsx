import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Link } from "react-router-dom";
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
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Star, Award } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Cobertura em Toda Curitiba",
    description: "Atendemos todos os bairros da capital paranaense e região metropolitana. Técnico de informática perto de você.",
  },
  {
    icon: Clock,
    title: "Atendimento no Mesmo Dia",
    description: "Resposta imediata via WhatsApp. Na maioria dos casos, atendemos hoje mesmo. Urgências são prioridade.",
  },
  {
    icon: Shield,
    title: "Garantia por Escrito",
    description: "Todos os serviços realizados contam com garantia de 30 dias a 1 ano. Trabalhamos com transparência total.",
  },
  {
    icon: Wrench,
    title: "Técnico Certificado",
    description: "Profissional com mais de 20 anos de experiência. Diagnóstico preciso e solução definitiva.",
  },
];

const bairros = [
  { name: "Centro", slug: "centro", hasPage: true },
  { name: "Batel", slug: "batel", hasPage: true },
  { name: "Portão", slug: "portao", hasPage: true },
  { name: "Campo Comprido", slug: "campo-comprido", hasPage: true },
  { name: "CIC", slug: "cic", hasPage: true },
  { name: "Santa Felicidade", slug: "santa-felicidade", hasPage: true },
  { name: "Água Verde", slug: "agua-verde", hasPage: true },
  { name: "Bigorrilho", slug: "bigorrilho", hasPage: true },
  { name: "Mercês", slug: "merces", hasPage: true },
  { name: "Boa Vista", slug: "boa-vista", hasPage: true },
  { name: "Juvevê", slug: "juveve", hasPage: true },
  { name: "Cabral", slug: "cabral", hasPage: true },
  { name: "Cristo Rei", slug: "cristo-rei", hasPage: true },
  { name: "Cajuru", slug: "cajuru", hasPage: true },
  { name: "Uberaba", slug: "uberaba", hasPage: true },
  { name: "Pinheirinho", slug: "pinheirinho", hasPage: true },
  { name: "Xaxim", slug: "xaxim", hasPage: true },
  { name: "Boqueirão", slug: "boqueirao", hasPage: true },
  { name: "Bacacheri", slug: "bacacheri", hasPage: true },
  { name: "Tingui", slug: "tingui", hasPage: true },
  { name: "Alto da Glória", slug: "alto-da-gloria", hasPage: true },
  { name: "Rebouças", slug: "reboucas", hasPage: true },
  { name: "Vila Izabel", slug: "vila-izabel", hasPage: true },
  { name: "Seminário", slug: "seminario", hasPage: true },
  { name: "Hugo Lange", slug: "hugo-lange", hasPage: true },
  { name: "Jardim Social", slug: "jardim-social", hasPage: true },
  { name: "Jardim das Américas", slug: "jardim-das-americas", hasPage: true },
  { name: "Tarumã", slug: "taruma", hasPage: true },
  { name: "Capão da Imbuia", slug: "capao-da-imbuia", hasPage: true },
  { name: "Hauer", slug: "hauer", hasPage: true },
  { name: "Alto Boqueirão", slug: "alto-boqueirao", hasPage: true },
  { name: "Sítio Cercado", slug: "sitio-cercado", hasPage: true },
  { name: "Novo Mundo", slug: "novo-mundo", hasPage: true },
  { name: "Fazendinha", slug: "fazendinha", hasPage: true },
  { name: "Jardim Botânico", slug: "jardim-botanico", hasPage: true },
];

const servicos = [
  {
    title: "Formatação de Computador",
    description: "Instalação limpa do Windows 10/11 com drivers e programas essenciais. Backup incluso.",
    slug: "formatacao-computador",
  },
  {
    title: "Remoção de Vírus e Malware",
    description: "Limpeza completa e proteção contra ameaças digitais. Antivírus instalado.",
    slug: "remocao-virus",
  },
  {
    title: "Conserto de PC e Notebook",
    description: "Reparo de hardware, diagnóstico avançado e troca de peças com garantia.",
    slug: "conserto-pc-notebook",
  },
  {
    title: "Upgrade SSD e Memória RAM",
    description: "Deixe seu computador até 10x mais rápido. Migração completa do sistema.",
    slug: "upgrade-ssd-memoria",
  },
  {
    title: "Configuração de Redes Wi-Fi",
    description: "Instalação de roteadores, repetidores, mesh e redes empresariais.",
    slug: "redes-wifi",
  },
  {
    title: "Backup e Recuperação de Dados",
    description: "Proteção e recuperação de arquivos importantes. Backup em nuvem.",
    slug: "backup-recuperacao",
  },
];

const localFaqs = [
  {
    question: "Quanto custa um técnico de informática em Curitiba?",
    answer:
      "A visita técnica começa em R$ 69,99. Este valor inclui deslocamento, diagnóstico e pequenos ajustes. Serviços adicionais são orçados antes da execução, sem surpresas.",
  },
  {
    question: "Vocês atendem em todos os bairros de Curitiba?",
    answer:
      "Sim! Atendemos 100% de Curitiba: Centro, Batel, Portão, Água Verde, CIC, Santa Felicidade, Boqueirão, Cajuru, Boa Vista e todos os demais bairros. Também atendemos região metropolitana.",
  },
  {
    question: "Em quanto tempo o técnico chega em Curitiba?",
    answer:
      "O tempo médio de chegada é de 30 a 60 minutos, dependendo do bairro e trânsito. Para urgências, priorizamos atendimento no mesmo dia sempre que possível.",
  },
  {
    question: "Vocês fazem atendimento remoto em Curitiba?",
    answer:
      "Sim! Para problemas de software, configuração e lentidão, o suporte remoto pode resolver em minutos. Para hardware e troca de peças, recomendamos atendimento presencial.",
  },
  {
    question: "Os serviços têm garantia?",
    answer:
      "Todos os serviços têm garantia por escrito. Formatação: 30 dias. Remoção de vírus: 30 dias. Troca de peças: 90 dias a 1 ano dependendo do componente.",
  },
  {
    question: "Atendem empresas em Curitiba?",
    answer:
      "Sim! Oferecemos suporte técnico para empresas de todos os portes. Desde atendimentos pontuais até contratos mensais com SLA e atendimento prioritário.",
  },
];

const TecnicoInformaticaCuritiba = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Curitiba | Assistência Técnica Nº1 | Atendimento Hoje";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "A assistência técnica em informática mais completa de Curitiba. Formatação, conserto de PC e notebook, remoção de vírus, upgrade SSD. ⭐ 4.9/5 - Atendimento a domicílio no mesmo dia. (41) 99745-2053"
      );
    }
    trackPageView("/tecnico-informatica-curitiba", "Técnico Curitiba");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Técnico de Informática em Curitiba | Assistência Técnica Nº1 | Atendimento Hoje" description="A assistência técnica em informática mais completa de Curitiba. Formatação, conserto de PC e notebook, remoção de vírus, upgrade SSD. ⭐ 4.9/5 - Atendimento a domicílio no mesmo dia. (41) 99745-2053" path="/tecnico-informatica-curitiba" />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Curitiba" }]} />
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

        <RealImageSection imageKey="atendimentoDomiciliar" caption="Atendimento a domicílio em Curitiba" />

        {/* Sobre Curitiba */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">
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
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">
                Bairros Atendidos em Curitiba
              </h2>
              <p className="text-center text-muted-foreground mb-8 reveal-text" data-reveal-delay="100">
                Clique no bairro para ver serviços específicos e solicitar atendimento
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) => (
                  bairro.hasPage && bairro.slug ? (
                    <Link
                      key={index}
                      to={`/bairros/${bairro.slug}`}
                      className="glass-card gradient-border rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-1 transition-all group flex items-center justify-center gap-2 stagger-item hover:shadow-[var(--shadow-md)]"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <MapPin className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors" />
                      {bairro.name}
                    </Link>
                  ) : (
                    <div
                      key={index}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 stagger-item"
                      style={{ animationDelay: `${index * 40}ms` }}
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
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium group"
                >
                  Ver bairros atendidos em São José dos Pinhais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços com Links */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center reveal-text">
                Serviços de Informática em Curitiba
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  <Link 
                    key={index} 
                    to={`/servicos/${servico.slug}`}
                    className="flex items-start gap-3 glass-card gradient-border rounded-lg p-4 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all group stagger-item hover-streak"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {servico.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {servico.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link 
                  to="/servicos"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium group"
                >
                  Ver lista completa de serviços
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ServiceLocalLinks currentCity="Curitiba" />
        <RealImageSection imageKey="bancadaTecnica" caption="Laboratório técnico profissional" />
        <LocalFAQSection title="Perguntas Frequentes - Curitiba" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default TecnicoInformaticaCuritiba;