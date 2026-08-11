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
  { icon: MapPin, title: "Cobertura em Campo Magro", description: "Atendemos do Centro à região rural. Conhecemos os acessos da cidade." },
  { icon: Clock, title: "Deslocamento de 35-55 Minutos", description: "Acesso pela Estrada do Cerne (PR-090). Agendamento flexível." },
  { icon: Shield, title: "Técnico Experiente", description: "Mais de 20 anos. Profissional identificado com ferramentas profissionais." },
  { icon: Wrench, title: "Garantia por Escrito", description: "Valor antes da execução. Garantia em todos os serviços." },
];

const bairros = [
  { name: "Centro", slug: "centro-campo-magro", hasPage: true }, { name: "Sede", slug: "sede-campo-magro", hasPage: true }, { name: "Jardim Boa Vista", slug: "jardim-boa-vista-cm", hasPage: true },
  { name: "São Sebastião", slug: "sao-sebastiao-cm", hasPage: true }, { name: "Rio Verde", slug: "rio-verde-cm", hasPage: true }, { name: "Botiatuva", slug: "botiatuva-cm", hasPage: true },
  { name: "Jóquei Clube", slug: "joquei-clube-cm", hasPage: true },
  { name: "Antônio Olívero", slug: "antonio-olivero-cm", hasPage: true },
  { name: "Espigão Alegre", slug: "espigao-alegre-cm", hasPage: true },
];

const servicos = [
  { title: "Formatação de Computador", description: "Windows 10/11 com drivers completos", slug: "formatacao-computador" },
  { title: "Remoção de Vírus", description: "Limpeza e proteção contra malware", slug: "remocao-virus" },
  { title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo profissional", slug: "conserto-pc-notebook" },
  { title: "Upgrade SSD e Memória", description: "Seu PC muito mais rápido", slug: "upgrade-ssd-memoria" },
  { title: "Configuração de Rede", description: "Wi-Fi e internet estável", slug: "redes-wifi" },
  { title: "Backup e Recuperação", description: "Proteção de arquivos importantes", slug: "backup-recuperacao" },
];

const localFaqs = [
  { question: "Vocês atendem Campo Magro a domicílio?", answer: "Sim. Atendemos Campo Magro com visita agendada. O deslocamento pela PR-090 leva de 35 a 55 minutos." },
  { question: "Qual o valor da visita?", answer: "A visita técnica começa em R$ 99,99. Diagnóstico no local com valor transparente." },
  { question: "Atendem na zona rural?", answer: "Sim, desde que haja acesso por via pavimentada. Consulte pelo WhatsApp para confirmar cobertura no seu endereço." },
];

const schema = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  "name": "Técnico de Informática em Campo Magro",
  "description": "Assistência técnica em Campo Magro PR. Atendimento a domicílio.",
  "areaServed": { "@type": "City", "name": "Campo Magro", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaCampoMagro = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Campo Magro PR | Atendimento Domicílio | O Técnico de Informática";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Técnico de informática em Campo Magro PR. Formatação, conserto, vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.");
    trackPageView("/tecnico-informatica-campo-magro", "Técnico Campo Magro");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO noindex title="Técnico de Informática em Campo Magro PR | Atendimento Domicílio | O Técnico de Informática" description="Técnico de informática em Campo Magro PR. Formatação, conserto, vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99." path="/tecnico-informatica-campo-magro" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Técnico de Informática", path: "/servicos" }, { name: "Campo Magro", path: "/tecnico-informatica-campo-magro" }]} />
      <CityServiceSchema city={"Campo Magro"} citySameAs={"https://pt.wikipedia.org/wiki/Campo_Magro"} path={"/tecnico-informatica-campo-magro"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Campo Magro" }]} />
      <main>
        <PageHero title="Técnico de Informática em Campo Magro" subtitle="Assistência técnica profissional em Campo Magro e região. Atendimento a domicílio com garantia." ctaText="Falar com Técnico" />
        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Campo Magro" subtitle="Atendimento para toda a cidade" />

        <RealImageSection imageKey="notebookReparo" caption="Conserto de notebook em Campo Magro" />

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">Assistência Técnica em Campo Magro</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4"><strong className="text-foreground">Campo Magro</strong> faz divisa com Curitiba pela região noroeste. Com cerca de 30 mil habitantes e perfil misto entre urbano e rural, a cidade conta com nosso <strong className="text-foreground">atendimento profissional de informática a domicílio</strong>.</p>
              <p>Resolvemos problemas comuns como PC lento, notebook que não liga, vírus, Wi-Fi instável e upgrades. Nosso técnico vai até Campo Magro com equipamento completo para diagnóstico e reparo no local.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group"><Home className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" /><h3 className="font-semibold text-foreground">Residências</h3><p className="text-sm text-muted-foreground">Visita agendada</p></div>
              <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group"><Building2 className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" /><h3 className="font-semibold text-foreground">Comércios</h3><p className="text-sm text-muted-foreground">Suporte para negócios locais</p></div>
              <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group"><Zap className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" /><h3 className="font-semibold text-foreground">Coleta e Entrega</h3><p className="text-sm text-muted-foreground">Para serviços de bancada</p></div>
            </div>
          </div></div>
        </section>

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center reveal-text">Bairros e Regiões Atendidas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {bairros.map((b, i) => (
                b.hasPage && b.slug ? (
                  <Link key={b.name} to={`/bairros/${b.slug}`} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 stagger-item hover:-translate-y-0.5 hover:bg-accent/20 transition-all" style={{ animationDelay: `${i * 50}ms` }}>
                    <MapPin className="h-4 w-4 text-accent" />{b.name}
                  </Link>
                ) : (
                  <div key={b.name} className="bg-secondary rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground flex items-center justify-center gap-2 stagger-item hover:-translate-y-0.5 transition-all" style={{ animationDelay: `${i * 50}ms` }}>
                    <MapPin className="h-4 w-4 text-accent" />{b.name}
                  </div>
                )
              ))}
            </div>
          </div></div>
        </section>

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10"><div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center reveal-text">Serviços em Campo Magro</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {servicos.map((s, i) => (
                <Link key={i} to={`/servicos/${s.slug}`} className="flex items-start gap-3 bg-background rounded-lg p-4 hover:shadow-md border border-transparent hover:border-accent/30 hover:-translate-y-1 transition-all group stagger-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1"><h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{s.title}</h3><p className="text-sm text-muted-foreground mt-1">{s.description}</p></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
                </Link>
              ))}
            </div>
          </div></div>
        </section>

        <RealImageSection imageKey="componentesSsd" caption="Upgrade SSD e memória RAM" />

        <ServiceLocalLinks currentCity="Campo Magro" />
        <LocalFAQSection title="Perguntas Frequentes - Campo Magro" faqs={localFaqs} />
        <ReviewsGrid filter={{ city: "Campo Magro" }} title="Avaliações de clientes em Campo Magro" />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default TecnicoInformaticaCampoMagro;
