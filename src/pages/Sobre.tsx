import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { Award, Users, Target, Heart } from "lucide-react";

const valores = [
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos a melhor solução técnica para cada problema, com qualidade e atenção aos detalhes.",
  },
  {
    icon: Users,
    title: "Atendimento Humano",
    description: "Tratamos cada cliente de forma personalizada, com respeito e comunicação clara.",
  },
  {
    icon: Target,
    title: "Compromisso",
    description: "Cumprimos prazos e entregamos o que prometemos. Sua confiança é nossa prioridade.",
  },
  {
    icon: Heart,
    title: "Paixão por Tecnologia",
    description: "Amamos o que fazemos e isso reflete na qualidade do nosso trabalho.",
  },
];

const Sobre = () => {
  useEffect(() => {
    document.title = "Sobre Nós | Técnico Curitiba - Assistência Técnica em Informática";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Conheça a Técnico Curitiba. Assistência técnica em informática com experiência, compromisso e atendimento humanizado em Curitiba e região."
      );
    }
    trackPageView("/sobre", "Sobre");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Sobre Nós | Técnico Curitiba - Assistência Técnica em Informática" description="Conheça a Técnico Curitiba. Assistência técnica em informática com experiência, compromisso e atendimento humanizado em Curitiba e região." path="/sobre" />
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-10 pb-10 md:pt-12 md:pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--glow-accent)/0.15),transparent_60%)] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4 reveal-text">
                Sobre a Técnico Curitiba
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Assistência técnica em informática com compromisso, transparência e paixão por resolver problemas
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center reveal-text">
                Nossa História
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  A Técnico Curitiba nasceu da percepção de que muitas pessoas e empresas em Curitiba tinham dificuldade em encontrar um <strong className="text-foreground">técnico de informática confiável</strong>, que fosse transparente no orçamento e cumprisse prazos.
                </p>
                <p>
                  Com experiência prática em manutenção de computadores, decidimos criar um serviço diferente: atendimento humanizado, comunicação clara, preço justo e, acima de tudo, <strong className="text-foreground">resolver o problema do cliente</strong>.
                </p>
                <p>
                  Hoje, atendemos residências, profissionais liberais e empresas em toda Curitiba e região metropolitana. Contamos com parcerias estratégicas em diversas regiões do Brasil, permitindo oferecer suporte de alto padrão mesmo para demandas mais complexas.
                </p>
                <p>
                  Nossa missão é simples: <strong className="text-foreground">fazer seu computador funcionar</strong>, sem enrolação, sem termos técnicos confusos, sem cobranças surpresa. Você fala direto com o técnico, recebe um orçamento claro e tem a garantia de um serviço bem feito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 reveal-text">
                Nossos Valores
              </h2>
              <p className="text-muted-foreground text-lg">
                O que guia nosso trabalho todos os dias
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {valores.map((valor, index) => {
                const Icon = valor.icon;
                return (
                  <div
                    key={index}
                    className="group bg-background rounded-xl p-6 text-center border border-border/50 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 stagger-item"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_24px_hsl(var(--glow-primary)/0.3)] transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{valor.title}</h3>
                    <p className="text-muted-foreground text-sm">{valor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center reveal-text">
                Por Que Somos Diferentes?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {[
                  { title: "Você fala direto com o técnico", desc: "Nada de call center ou atendentes que não entendem seu problema. Você conversa diretamente com quem vai resolver." },
                  { title: "Orçamento transparente", desc: "Antes de qualquer serviço, você sabe exatamente quanto vai pagar. Sem surpresas, sem taxas escondidas." },
                  { title: "Garantia em todos os serviços", desc: "Confiamos no nosso trabalho. Por isso, oferecemos garantia por escrito em cada serviço realizado." },
                  { title: "Atendimento para pessoa física e empresas", desc: "Residências, profissionais liberais, pequenas e médias empresas. Emitimos nota fiscal e aceitamos pagamento faturado." },
                ].map((item, i) => (
                  <div key={i} className="group bg-secondary rounded-xl p-5 border border-border/50 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 stagger-item" style={{ animationDelay: `${i * 60}ms` }}>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="bancadaTecnica" secondaryImageKey="clienteSatisfeito" layout="duo" caption="Nossa bancada de trabalho profissional" secondaryCaption="Clientes satisfeitos com nosso atendimento" />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default Sobre;
