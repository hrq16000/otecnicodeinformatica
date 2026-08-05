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
    title: "Cobertura em Fazenda Rio Grande",
    description: "Atendemos do Centro ao Eucaliptos. Técnico com conhecimento das vias de acesso da cidade.",
  },
  {
    icon: Clock,
    title: "Atendimento no Mesmo Dia",
    description: "Agendamento flexível com prioridade para urgências. Deslocamento via Contorno Sul.",
  },
  {
    icon: Shield,
    title: "Profissional Credenciado",
    description: "Técnico identificado, com equipamento profissional e mais de 20 anos de experiência.",
  },
  {
    icon: Wrench,
    title: "Garantia em Todo Serviço",
    description: "Orçamento antes da execução. Garantia por escrito em todos os reparos realizados.",
  },
];

const bairros = [
  { name: "Centro", slug: "centro-fazenda-rio-grande", hasPage: true },
  { name: "Eucaliptos", slug: "eucaliptos-frg", hasPage: true },
  { name: "Nações", slug: "nacoes-frg", hasPage: true },
  { name: "Iguaçu", slug: "iguacu-frg", hasPage: true },
  { name: "Gralha Azul", slug: "gralha-azul", hasPage: true },
  { name: "Santa Terezinha", slug: "santa-terezinha-frg", hasPage: true },
  { name: "Jardim Estados", slug: "jardim-estados", hasPage: true },
  { name: "Pioneiros", slug: "pioneiros-frg", hasPage: true },
  { name: "São Lourenço", slug: "sao-lourenco-frg", hasPage: true },
  { name: "Hortência", slug: "hortencia-frg", hasPage: true },
  { name: "Parque Industrial", slug: "parque-industrial-frg", hasPage: true },
  { name: "Jardim Condor", slug: "jardim-condor-frg", hasPage: true },
  { name: "Jardim Ipê", slug: "jardim-ipe-frg", hasPage: true },
  { name: "Jardim das Pedras", slug: "jardim-das-pedras-frg", hasPage: true },
];

const servicos = [
  { title: "Formatação de Computador", description: "Windows 10/11 com drivers e programas essenciais", slug: "formatacao-computador" },
  { title: "Remoção de Vírus", description: "Limpeza completa e proteção contra malware", slug: "remocao-virus" },
  { title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo profissional de hardware", slug: "conserto-pc-notebook" },
  { title: "Upgrade SSD e Memória", description: "Computador até 10x mais rápido", slug: "upgrade-ssd-memoria" },
  { title: "Configuração de Rede", description: "Wi-Fi, roteadores e cabeamento", slug: "redes-wifi" },
  { title: "Backup e Recuperação", description: "Proteção e recuperação de dados", slug: "backup-recuperacao" },
];

const localFaqs = [
  {
    question: "Vocês atendem Fazenda Rio Grande a domicílio?",
    answer: "O atendimento em Fazenda Rio Grande é avaliado caso a caso na triagem pelo WhatsApp. A disponibilidade de visita, a data e a modalidade (no local ou por coleta) são confirmadas antes do agendamento — sem promessa de deslocamento imediato.",
  },
  {
    question: "Qual o valor da visita técnica em Fazenda Rio Grande?",
    answer: "A visita técnica começa em R$ 69,99. O diagnóstico é feito no local e apresentamos o orçamento antes de qualquer serviço.",
  },
  {
    question: "Fazem coleta e entrega em Fazenda Rio Grande?",
    answer: "Serviços de bancada (reparo de placa, troca de tela) podem seguir por coleta e entrega quando houver disponibilidade na rota do dia. Isso é confirmado na triagem, antes de qualquer combinação.",
  },
  {
    question: "Existe atendimento garantido no mesmo dia?",
    answer: "Não trabalhamos com garantia de atendimento no mesmo dia. A data possível é informada na triagem, conforme a agenda e o tipo de reparo.",
  },
];

const frgSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Fazenda Rio Grande",
  "description": "Assistência técnica de computadores em Fazenda Rio Grande PR. Formatação, conserto, upgrade, redes. Atendimento a domicílio.",
  "areaServed": { "@type": "City", "name": "Fazenda Rio Grande", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaFazendaRioGrande = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Fazenda Rio Grande | Atendimento Domicílio | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        "Técnico de informática em Fazenda Rio Grande PR. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99."
      );
    }
    trackPageView("/tecnico-informatica-fazenda-rio-grande", "Técnico Fazenda Rio Grande");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO noindex title="Técnico de Informática em Fazenda Rio Grande | Atendimento Domicílio | Técnico Curitiba" description="Técnico de informática em Fazenda Rio Grande PR. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99." path="/tecnico-informatica-fazenda-rio-grande" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Técnico de Informática", path: "/servicos" }, { name: "Fazenda Rio Grande", path: "/tecnico-informatica-fazenda-rio-grande" }]} />
      <CityServiceSchema city={"Fazenda Rio Grande"} citySameAs={"https://pt.wikipedia.org/wiki/Fazenda_Rio_Grande"} path={"/tecnico-informatica-fazenda-rio-grande"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(frgSchema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Fazenda Rio Grande" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em Fazenda Rio Grande"
          subtitle="Assistência técnica de computadores e notebooks para moradores e empresas de Fazenda Rio Grande, com triagem por WhatsApp e diagnóstico antes do orçamento."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Fazenda Rio Grande" subtitle="Atendimento avaliado caso a caso na triagem" />

        <RealImageSection imageKey="atendimentoDomiciliar" caption="Atendimento técnico a domicílio realizado pela equipe" />

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">
                Assistência Técnica em Fazenda Rio Grande
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  <strong className="text-foreground">Fazenda Rio Grande</strong> é uma das cidades que mais crescem na região 
                  metropolitana de Curitiba, com mais de 100 mil habitantes. O crescimento rápido aumentou a demanda por 
                  <strong className="text-foreground"> serviços de informática confiáveis</strong> — desde computadores domésticos 
                  até suporte para pequenos comércios e empresas locais.
                </p>
                <p className="mb-4">
                  Muitos moradores de Fazenda Rio Grande trabalham ou estudam usando computadores que precisam funcionar bem. 
                  Quando o notebook trava, o Wi-Fi cai toda hora ou o PC não liga, nosso técnico vai até o seu endereço 
                  com ferramentas e peças para resolver no local sempre que possível.
                </p>
                <p>
                  O acesso a Fazenda Rio Grande pela Contorno Sul facilita nosso deslocamento. Atendemos bairros como 
                  Centro, Eucaliptos, Nações, Iguaçu e toda a extensão da cidade com o mesmo padrão de qualidade e 
                  transparência que praticamos em Curitiba.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Atendimento domiciliar agendado</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Comércios</h3>
                  <p className="text-sm text-muted-foreground">Suporte para lojas e escritórios</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Zap className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Coleta e Entrega</h3>
                  <p className="text-sm text-muted-foreground">Para serviços de bancada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">Bairros Atendidos em Fazenda Rio Grande</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro, index) =>
                  bairro.hasPage ? (
                    <Link key={bairro.slug} to={`/bairros/${bairro.slug}`}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 transition-all stagger-item"
                      style={{ animationDelay: `${index * 40}ms` }}>
                      <MapPin className="h-4 w-4 text-accent" />{bairro.name}
                    </Link>
                  ) : (
                    <div key={bairro.slug} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 stagger-item"
                      style={{ animationDelay: `${index * 40}ms` }}>
                      <MapPin className="h-4 w-4 text-muted-foreground" />{bairro.name}
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center reveal-text">Serviços em Fazenda Rio Grande</h2>
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
            </div>
          </div>
        </section>

        <RealImageSection imageKey="placaMae" caption="Diagnóstico de placa-mãe profissional" />

        <ServiceLocalLinks currentCity="Fazenda Rio Grande" />
        <LocalFAQSection title="Perguntas Frequentes - Fazenda Rio Grande" faqs={localFaqs} />
        <ReviewsGrid filter={{ city: "Fazenda Rio Grande" }} title="Avaliações de clientes em Fazenda Rio Grande" />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default TecnicoInformaticaFazendaRioGrande;
