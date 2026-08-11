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
    title: "Atendimento em Almirante Tamandaré",
    description: "Cobrimos do Centro ao Jardim Monte Santo. Conhecemos os acessos e atalhos da cidade.",
  },
  {
    icon: Clock,
    title: "Deslocamento de 30-50 Minutos",
    description: "Acesso rápido pela Rodovia dos Minérios e BR-476. Agendamento conforme a disponibilidade da agenda quando possível.",
  },
  {
    icon: Shield,
    title: "Técnico Experiente",
    description: "Profissional identificado, com registro do atendimento por escrito.",
  },
  {
    icon: Wrench,
    title: "Serviço Garantido",
    description: "Diagnóstico transparente, valor antes da execução e garantia por escrito.",
  },
];

const bairros = [
  { name: "Centro", slug: "centro-almirante-tamandare", hasPage: true },
  { name: "Jardim Monte Santo", slug: "jardim-monte-santo", hasPage: true },
  { name: "Cachoeira", slug: "cachoeira-at", hasPage: true },
  { name: "Tanguá", slug: "tangua-at", hasPage: true },
  { name: "São Venâncio", slug: "sao-venancio", hasPage: true },
  { name: "Jardim Graziela", slug: "jardim-graziela", hasPage: true },
  { name: "Jardim Roma", slug: "jardim-roma", hasPage: true },
  { name: "Colônia Antônio Prado", slug: "colonia-antonio-prado", hasPage: true },
  { name: "Tranqueira", slug: "tranqueira-at", hasPage: true },
  { name: "Jardim Paraíso", slug: "jardim-paraiso-at", hasPage: true },
  { name: "Boa Vista", slug: "boa-vista-at", hasPage: true },
  { name: "Campo do Tenente", slug: "campo-tenente-at", hasPage: true },
  { name: "Jardim Paranaguá", slug: "jardim-paranagua-at", hasPage: true },
  { name: "Jardim São Jorge", slug: "jardim-sao-jorge-at", hasPage: true },
];

const servicos = [
  { title: "Formatação de Computador", description: "Windows 10/11 com drivers e configuração completa", slug: "formatacao-computador" },
  { title: "Remoção de Vírus", description: "Limpeza de malware e proteção instalada", slug: "remocao-virus" },
  { title: "Conserto de PC e Notebook", description: "Diagnóstico e reparo profissional", slug: "conserto-pc-notebook" },
  { title: "Upgrade SSD e Memória", description: "Seu computador muito mais rápido", slug: "upgrade-ssd-memoria" },
  { title: "Configuração de Rede", description: "Wi-Fi, roteadores e internet estável", slug: "redes-wifi" },
  { title: "Backup e Recuperação", description: "Proteção e recuperação de arquivos", slug: "backup-recuperacao" },
];

const localFaqs = [
  {
    question: "Vocês atendem Almirante Tamandaré a domicílio?",
    answer: "Sim. Atendemos todos os bairros de Almirante Tamandaré com visita agendada. O acesso pela Rodovia dos Minérios permite deslocamento de 30 a 50 minutos.",
  },
  {
    question: "Qual o valor da visita técnica em Almirante Tamandaré?",
    answer: "A visita técnica começa em R$ 99,99. Fazemos diagnóstico no local e apresentamos o valor antes de qualquer execução.",
  },
  {
    question: "Em quanto tempo conseguem atender?",
    answer: "Sim, sempre que a agenda permitir. Para urgências, tentamos encaixe prioritário. Recomendamos agendar pelo WhatsApp o mais cedo possível.",
  },
  {
    question: "Fazem coleta e entrega?",
    answer: "Sim. Para serviços que exigem bancada (reparo de placa-mãe, troca de tela), coletamos o equipamento e devolvemos após o reparo.",
  },
];

const atSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Técnico de Informática em Almirante Tamandaré",
  "description": "Assistência técnica de computadores em Almirante Tamandaré PR. Atendimento a domicílio. Formatação, conserto, upgrade.",
  "areaServed": { "@type": "City", "name": "Almirante Tamandaré", "containedInPlace": { "@type": "State", "name": "Paraná" } },
  "priceRange": "$$",
};

const TecnicoInformaticaAlmiranteTamandare = () => {
  useEffect(() => {
    document.title = "Técnico de Informática em Almirante Tamandaré | Atendimento Domicílio | O Técnico de Informática";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content",
        "Técnico de informática em Almirante Tamandaré PR. Formatação, conserto de PC e notebook, remoção de vírus, upgrade. Atendimento a domicílio. a partir de R$ 99,99."
      );
    }
    trackPageView("/tecnico-informatica-almirante-tamandare", "Técnico Almirante Tamandaré");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO noindex title="Técnico de Informática em Almirante Tamandaré | Atendimento Domicílio | O Técnico de Informática" description="Técnico de informática em Almirante Tamandaré PR. Formatação, conserto de PC e notebook, remoção de vírus, upgrade. Atendimento a domicílio. a partir de R$ 99,99." path="/tecnico-informatica-almirante-tamandare" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Técnico de Informática", path: "/servicos" }, { name: "Almirante Tamandaré", path: "/tecnico-informatica-almirante-tamandare" }]} />
      <CityServiceSchema city={"Almirante Tamandaré"} citySameAs={"https://pt.wikipedia.org/wiki/Almirante_Tamandar%C3%A9"} path={"/tecnico-informatica-almirante-tamandare"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(atSchema) }} />
      <JsonLdSchema />
      <Header />
      <Breadcrumbs items={[{ label: "Técnico em Almirante Tamandaré" }]} />
      <main>
        <PageHero
          title="Técnico de Informática em Almirante Tamandaré"
          subtitle="Assistência técnica profissional em Almirante Tamandaré e região. Atendimento a domicílio com garantia e transparência."
          ctaText="Falar com Técnico"
        />

        <BenefitsGrid benefits={benefits} title="Suporte Técnico em Almirante Tamandaré" subtitle="Atendimento profissional para toda a cidade" />

        <RealImageSection imageKey="tecnicoTrabalhando" caption="Técnico em atendimento em Almirante Tamandaré" />

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">
                Assistência Técnica em Almirante Tamandaré
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  <strong className="text-foreground">Almirante Tamandaré</strong> faz divisa direta com Curitiba pela região norte, 
                  o que facilita muito o nosso deslocamento. Com mais de 120 mil habitantes, é uma das cidades mais populosas 
                  da região metropolitana e tem demanda crescente por <strong className="text-foreground">serviços de informática de qualidade</strong>.
                </p>
                <p className="mb-4">
                  Muitos moradores dependem do computador para trabalho remoto, estudos e tarefas pessoais. Quando surgem problemas 
                  como lentidão, vírus, tela azul ou notebook que não liga, o atendimento precisa ser rápido e confiável. 
                  Nosso <strong className="text-foreground">técnico vai até Almirante Tamandaré</strong> com equipamento completo para 
                  diagnóstico e reparo no local.
                </p>
                <p>
                  Atendemos todos os bairros da cidade: Centro, Jardim Monte Santo, Cachoeira, Tanguá, São Venâncio e demais regiões. 
                  Para serviços que exigem bancada, oferecemos coleta e entrega com prazo combinado.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Home className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Residências</h3>
                  <p className="text-sm text-muted-foreground">Visita com hora marcada</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center border border-border hover:-translate-y-0.5 transition-all group">
                  <Building2 className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">Empresas</h3>
                  <p className="text-sm text-muted-foreground">Suporte para comércios locais</p>
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

        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center reveal-text">Bairros Atendidos</h2>
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

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center reveal-text">Serviços em Almirante Tamandaré</h2>
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

        <RealImageSection imageKey="ferramentas" caption="Ferramentas profissionais para diagnóstico" />

        <ServiceLocalLinks currentCity="Almirante Tamandaré" />
        <LocalFAQSection title="Perguntas Frequentes - Almirante Tamandaré" faqs={localFaqs} />
        <ReviewsGrid filter={{ city: "Almirante Tamandaré" }} title="Avaliações de clientes em Almirante Tamandaré" />
        <TrustSection />
        <CTASection />
      </main>
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default TecnicoInformaticaAlmiranteTamandare;
