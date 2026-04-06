import { useEffect } from "react";
import { Header } from "@/components/Header";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
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
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Sobre a Técnico Curitiba
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Assistência técnica em informática com compromisso, transparência e paixão por resolver problemas
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
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
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
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
                    className="bg-background rounded-xl p-6 text-center hover:shadow-lg transition-all"
                  >
                    <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{valor.title}</h3>
                    <p className="text-muted-foreground text-sm">{valor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                Por Que Somos Diferentes?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-secondary rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">Você fala direto com o técnico</h3>
                  <p className="text-sm">Nada de call center ou atendentes que não entendem seu problema. Você conversa diretamente com quem vai resolver.</p>
                </div>
                <div className="bg-secondary rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">Orçamento transparente</h3>
                  <p className="text-sm">Antes de qualquer serviço, você sabe exatamente quanto vai pagar. Sem surpresas, sem taxas escondidas.</p>
                </div>
                <div className="bg-secondary rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">Garantia em todos os serviços</h3>
                  <p className="text-sm">Confiamos no nosso trabalho. Por isso, oferecemos garantia por escrito em cada serviço realizado.</p>
                </div>
                <div className="bg-secondary rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">Atendimento para pessoa física e empresas</h3>
                  <p className="text-sm">Residências, profissionais liberais, pequenas e médias empresas. Emitimos nota fiscal e aceitamos pagamento faturado.</p>
                </div>
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
      <WhatsAppFloat />
    </div>
  );
};

export default Sobre;
