import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { LocalFAQSection } from "@/components/LocalFAQSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ServiceLocalLinks } from "@/components/ServiceLocalLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView } from "@/lib/analytics";
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
  { name: "Iguaçu", slug: "iguacu-frg", hasPage: false },
  { name: "Gralha Azul", slug: "gralha-azul", hasPage: false },
  { name: "Santa Terezinha", slug: "santa-terezinha-frg", hasPage: false },
  { name: "Jardim Estados", slug: "jardim-estados", hasPage: false },
  { name: "Pioneiros", slug: "pioneiros-frg", hasPage: false },
  { name: "São Lourenço", slug: "sao-lourenco-frg", hasPage: false },
  { name: "Hortência", slug: "hortencia-frg", hasPage: false },
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
    answer: "Sim. Atendemos todos os bairros de Fazenda Rio Grande com visita técnica agendada. O deslocamento leva em torno de 40 a 60 minutos dependendo do bairro.",
  },
  {
    question: "Qual o valor da visita técnica em Fazenda Rio Grande?",
    answer: "A visita técnica começa em R$ 69,99. O diagnóstico é feito no local e apresentamos o orçamento antes de qualquer serviço.",
  },
  {
    question: "Fazem coleta e entrega em Fazenda Rio Grande?",
    answer: "Sim. Para serviços que exigem bancada (reparo de placa, troca de tela), fazemos coleta no seu endereço e devolvemos quando pronto.",
  },
  {
    question: "Atendem no mesmo dia em Fazenda Rio Grande?",
    answer: "Sempre que possível, sim. Depende da agenda do dia e do horário do contato. Para urgências, tentamos encaixe prioritário.",
  },
];

const frgSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Fazenda Rio Grande",
  "description": "Assistência técnica de computadores em Fazenda Rio Grande PR. Formatação, conserto, upgrade, redes. Atendimento a domicílio.",
  "telephone": "+55-41-99745-2053",
  "areaServed": { "@type": "City", "name": "Fazenda Rio Grande", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaFazendaRioGrande = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Fazenda Rio Grande | Atendimento Domicílio | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        "Técnico de informática em Fazenda Rio Grande PR. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de A partir de R$ 69,99."
      );
    }
    trackPageView("/tecnico-informatica-fazenda-rio-grande", "Técnico Fazenda Rio Grande");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(frgSchema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Fazenda Rio Grande" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em Fazenda Rio Grande"
          subtitle="Assistência técnica profissional em Fazenda Rio Grande. Atendimento a domicílio com diagnóstico transparente e serviço garantido."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Fazenda Rio Grande" subtitle="Atendimento profissional para toda a cidade" />

        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
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
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Atendimento domiciliar agendado</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Comércios</h3>
                  <p className="text-sm text-muted-foreground">Suporte para lojas e escritórios</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border">
                  <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Coleta e Entrega</h3>
                  <p className="text-sm text-muted-foreground">Para serviços de bancada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bairros */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Bairros Atendidos em Fazenda Rio Grande</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {bairros.map((bairro) =>
                  bairro.hasPage ? (
                    <Link key={bairro.slug} to={`/bairros/${bairro.slug}`}
                      className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-accent/10 hover:text-accent transition-colors">
                      <MapPin className="h-4 w-4 text-accent" />{bairro.name}
                    </Link>
                  ) : (
                    <div key={bairro.slug} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />{bairro.name}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Serviços em Fazenda Rio Grande</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {servicos.map((servico, index) => (
                  <Link key={index} to={`/servicos/${servico.slug}`}
                    className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md hover:border-accent/30 border border-transparent transition-all group">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{servico.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{servico.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceLocalLinks currentCity="Fazenda Rio Grande" />
        <LocalFAQSection title="Perguntas Frequentes - Fazenda Rio Grande" faqs={localFaqs} />
        <SocialProofSection />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TecnicoInformaticaFazendaRioGrande;
