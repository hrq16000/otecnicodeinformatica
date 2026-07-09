import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { CityServiceSchema } from "@/components/CityServiceSchema";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
import { RealImageSection } from "@/components/RealImageSection";
import { MapPin, Clock, Shield, Wrench, CheckCircle, ArrowRight, Building2, Home, Zap } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Atendimento em Todo Colombo",
    description: "Cobrimos todos os bairros de Colombo, do Centro ao Maracanã. Técnico com conhecimento da região.",
  },
  {
    icon: Clock,
    title: "Chegamos em 30-50 Minutos",
    description: "Proximidade com Curitiba garante deslocamento rápido. Agendamento no mesmo dia quando possível.",
  },
  {
    icon: Shield,
    title: "Técnico Experiente e Identificado",
    description: "Mais de 20 anos de experiência. Profissional credenciado com equipamento profissional.",
  },
  {
    icon: Wrench,
    title: "Serviço com Garantia",
    description: "Todos os serviços com garantia por escrito. Diagnóstico transparente antes da execução.",
  },
];

const bairros = [
  { name: "Centro", slug: "centro-colombo", hasPage: true },
  { name: "Maracanã", slug: "maracana-colombo", hasPage: true },
  { name: "Guaraituba", slug: "guaraituba-colombo", hasPage: true },
  { name: "Alto Maracanã", slug: "alto-maracana", hasPage: true },
  { name: "Atuba", slug: "atuba-colombo", hasPage: true },
  { name: "Campo Pequeno", slug: "campo-pequeno", hasPage: true },
  { name: "Fátima", slug: "fatima-colombo", hasPage: true },
  { name: "Gabirobal", slug: "gabirobal", hasPage: true },
  { name: "Jardim Osasco", slug: "jardim-osasco", hasPage: true },
  { name: "Monza", slug: "monza-colombo", hasPage: true },
  { name: "Palmital", slug: "palmital-colombo", hasPage: true },
  { name: "Roça Grande", slug: "roca-grande", hasPage: true },
  { name: "São Gabriel", slug: "sao-gabriel-colombo", hasPage: true },
  { name: "Santa Terezinha", slug: "santa-terezinha-colombo", hasPage: true },
  { name: "Osvaldo Cruz", slug: "osvaldo-cruz-colombo", hasPage: true },
  { name: "São Dimas", slug: "sao-dimas-colombo", hasPage: true },
  { name: "Campina Grande", slug: "campina-grande-colombo", hasPage: true },
  { name: "Taxiqueira", slug: "taxiqueira-colombo", hasPage: true },
  { name: "Embu", slug: "embu-colombo", hasPage: true },
];

const servicos = [
  { title: "Formatação de Computador", description: "Windows 10/11 com drivers e programas essenciais", slug: "formatacao-computador" },
  { title: "Remoção de Vírus", description: "Limpeza completa de malware com proteção instalada", slug: "remocao-virus" },
  { title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo de hardware profissional", slug: "conserto-pc-notebook" },
  { title: "Upgrade SSD e Memória", description: "Deixe seu computador até 10x mais rápido", slug: "upgrade-ssd-memoria" },
  { title: "Configuração de Rede", description: "Wi-Fi, roteadores e cabeamento estruturado", slug: "redes-wifi" },
  { title: "Backup e Recuperação", description: "Proteção e recuperação de arquivos importantes", slug: "backup-recuperacao" },
];

const localFaqs = [
  {
    question: "Vocês atendem a domicílio em Colombo?",
    answer: "Sim. Atendemos todos os bairros de Colombo com visita técnica agendada. Por ser vizinha de Curitiba, o deslocamento é rápido — geralmente entre 30 e 50 minutos.",
  },
  {
    question: "Qual o valor da visita técnica em Colombo?",
    answer: "A visita técnica começa em R$ 69,99. O diagnóstico é feito no local e o orçamento é apresentado antes de qualquer execução.",
  },
  {
    question: "Atendem empresas em Colombo?",
    answer: "Sim. Oferecemos suporte técnico para pequenas e médias empresas, incluindo manutenção de rede, backup corporativo e suporte contínuo.",
  },
  {
    question: "Quanto tempo leva para o técnico chegar em Colombo?",
    answer: "Dependendo do bairro e do trânsito, entre 30 e 50 minutos. Para bairros como Centro e Maracanã, o acesso é mais rápido.",
  },
];

const colomboSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Colombo",
  "description": "Assistência técnica de computadores em Colombo PR. Atendimento a domicílio. Formatação, conserto, upgrade e redes.",
  "areaServed": { "@type": "City", "name": "Colombo", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaColombo = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Colombo PR | Atendimento a Domicílio | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        "Técnico de informática em Colombo PR. Formatação, conserto de PC e notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. a partir de R$ 99,99."
      );
    }
    trackPageView("/tecnico-informatica-colombo", "Técnico Colombo");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Técnico de Informática em Colombo PR | Atendimento a Domicílio | Técnico Curitiba" description="Técnico de informática em Colombo PR. Formatação, conserto de PC e notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. a partir de R$ 99,99." path="/tecnico-informatica-colombo" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Técnico de Informática", path: "/servicos" }, { name: "Colombo", path: "/tecnico-informatica-colombo" }]} />
      <CityServiceSchema city={"Colombo"} citySameAs={"https://pt.wikipedia.org/wiki/Colombo_(Paran%C3%A1)"} path={"/tecnico-informatica-colombo"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(colomboSchema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Colombo" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em Colombo"
          subtitle="Assistência técnica profissional em Colombo e região. Atendimento a domicílio com diagnóstico transparente e garantia."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Colombo" subtitle="Atendimento profissional para toda a cidade" />

        <RealImageSection imageKey="atendimentoDomiciliar" caption="Técnico em atendimento a domicílio em Colombo" />

        {/* Conteúdo SEO */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">
                Assistência Técnica de Informática em Colombo
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  <strong className="text-foreground">Colombo</strong> é uma das maiores cidades da região metropolitana de Curitiba, 
                  com mais de 240 mil habitantes e forte crescimento nos últimos anos. Com bairros residenciais extensos como 
                  Maracanã, Guaraituba e Centro, a demanda por <strong className="text-foreground">serviços de informática confiáveis</strong> é constante.
                </p>
                <p className="mb-4">
                  Muitos moradores de Colombo trabalham em Curitiba e dependem do computador para home office, estudos e tarefas do dia a dia. 
                  Quando o PC trava, fica lento ou não liga, a solução precisa ser rápida. Nosso <strong className="text-foreground">técnico atende 
                  Colombo a domicílio</strong> com equipamento profissional, faz o diagnóstico no local e resolve a maioria dos problemas na primeira visita.
                </p>
                <p>
                  Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela de notebook), oferecemos 
                  <strong className="text-foreground"> coleta e entrega</strong> para sua comodidade. Trabalhamos com transparência: 
                  você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Atendimento domiciliar com hora marcada</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Empresas</h3>
                  <p className="text-sm text-muted-foreground">Suporte para escritórios e comércios</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Zap className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Mesmo Dia</h3>
                  <p className="text-sm text-muted-foreground">Urgências atendidas no mesmo dia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">
                Bairros Atendidos em Colombo
              </h2>
              <p className="text-center text-muted-foreground mb-8 reveal-text" data-reveal-delay="100">
                Técnico de informática a domicílio em todos os bairros de Colombo
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) =>
                  bairro.hasPage ? (
                    <Link key={bairro.slug} to={`/bairros/${bairro.slug}`}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 transition-all stagger-item"
                      style={{ animationDelay: `${index * 40}ms` }}>
                      <MapPin className="h-4 w-4 text-accent" />
                      {bairro.name}
                    </Link>
                  ) : (
                    <div key={bairro.slug} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 stagger-item"
                      style={{ animationDelay: `${index * 40}ms` }}>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {bairro.name}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center reveal-text">
                Serviços de Informática em Colombo
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  <Link key={index} to={`/servicos/${servico.slug}`}
                    className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md hover:border-accent/30 border border-transparent hover:-translate-y-1 transition-all group stagger-item"
                    style={{ animationDelay: `${index * 80}ms` }}>
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{servico.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{servico.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/servicos" className="inline-flex items-center gap-2 text-accent hover:underline font-medium group">
                  Ver todos os serviços disponíveis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <RealImageSection imageKey="diagnostico" caption="Diagnóstico profissional de hardware" />

        <ServiceLocalLinks currentCity="Colombo" />
        <LocalFAQSection title="Perguntas Frequentes - Colombo" faqs={localFaqs} />
        <ReviewsGrid filter={{ city: "Colombo" }} title="Avaliações de clientes em Colombo" />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default TecnicoInformaticaColombo;
