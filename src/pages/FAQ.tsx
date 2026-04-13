import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { FloatingParticles } from "@/components/FloatingParticles";
import { AnimatedSection } from "@/components/AnimatedSection";
import { trackPageView } from "@/lib/analytics";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Serviços e Preços",
    questions: [
      {
        question: "Quanto custa o atendimento técnico?",
        answer: "Nossos serviços começam a partir de R$ 69,99. O valor varia conforme a complexidade do problema. Serviços mais complexos são orçados individualmente antes de iniciar."
      },
      {
        question: "Vocês fazem orçamento gratuito?",
        answer: "Sim! O orçamento é gratuito e sem compromisso. Você pode descrever o problema pelo WhatsApp e passamos uma estimativa. Se necessário uma visita técnica para diagnóstico, informamos previamente."
      },
      {
        question: "Quais formas de pagamento são aceitas?",
        answer: "Aceitamos dinheiro, PIX, cartão de débito e crédito. Para empresas, oferecemos pagamento faturado (boleto) mediante análise de crédito."
      },
      {
        question: "Vocês emitem nota fiscal?",
        answer: "Sim, emitimos nota fiscal de serviços para todos os atendimentos. Basta solicitar no momento do pagamento."
      },
    ]
  },
  {
    category: "Atendimento",
    questions: [
      {
        question: "Qual a área de atendimento?",
        answer: "Atendemos toda Curitiba e região metropolitana, incluindo São José dos Pinhais, Colombo, Pinhais, Araucária e Campo Largo. Para atendimento remoto, atendemos todo o Brasil."
      },
      {
        question: "Qual o horário de atendimento?",
        answer: "Nosso horário comercial é de segunda a sexta, das 8h às 18h, e sábados das 8h às 12h. Para urgências fora do horário, entre em contato pelo WhatsApp."
      },
      {
        question: "Quanto tempo para responder no WhatsApp?",
        answer: "Durante o horário comercial, respondemos em até 30 minutos. Fora do horário, respondemos assim que possível no próximo dia útil."
      },
      {
        question: "Vocês fazem atendimento no mesmo dia?",
        answer: "Sempre que possível, sim! Depende da disponibilidade de agenda e da localização. Informe seu endereço e verificamos a disponibilidade."
      },
    ]
  },
  {
    category: "Serviços Específicos",
    questions: [
      {
        question: "Vocês formatam computador?",
        answer: "Sim! Fazemos formatação completa com instalação do Windows, drivers, programas essenciais e configuração personalizada. Incluímos backup dos seus dados quando solicitado."
      },
      {
        question: "Consertam notebook que não liga?",
        answer: "Sim, fazemos diagnóstico completo para identificar a causa. Pode ser problema de fonte, bateria, placa-mãe ou outros componentes. Após identificar, informamos o custo do reparo."
      },
      {
        question: "Vocês removem vírus?",
        answer: "Sim! Fazemos varredura completa, removemos todas as ameaças encontradas (vírus, trojans, ransomware, adware) e instalamos proteção adequada para evitar futuras infecções."
      },
      {
        question: "Fazem upgrade de memória e SSD?",
        answer: "Sim, realizamos upgrades de hardware como aumento de memória RAM e troca de HD por SSD. Verificamos a compatibilidade do seu equipamento antes de recomendar."
      },
      {
        question: "Recuperam dados de HD com problema?",
        answer: "Tentamos recuperar dados usando ferramentas especializadas. O sucesso depende do tipo de dano. Para casos mais graves (HD com barulhos estranhos), recomendamos laboratório especializado."
      },
    ]
  },
  {
    category: "Empresas",
    questions: [
      {
        question: "Vocês atendem empresas?",
        answer: "Sim! Oferecemos suporte técnico para pequenas e médias empresas, com opções de atendimento avulso ou planos mensais com suporte contínuo."
      },
      {
        question: "O que inclui o plano mensal para empresas?",
        answer: "Nossos planos incluem suporte remoto e presencial, manutenção preventiva, backup, monitoramento e atendimento prioritário. O valor é personalizado conforme o número de computadores e necessidades da empresa."
      },
      {
        question: "Vocês aceitam pagamento faturado?",
        answer: "Sim, para empresas oferecemos pagamento faturado (boleto) com prazo de até 30 dias, mediante análise de crédito prévia."
      },
    ]
  },
  {
    category: "Garantia e Segurança",
    questions: [
      {
        question: "Os serviços têm garantia?",
        answer: "Sim! Todos os nossos serviços incluem garantia por escrito. O prazo varia conforme o tipo de serviço: formatação tem garantia de 30 dias, peças instaladas seguem garantia do fabricante."
      },
      {
        question: "Meus dados ficam seguros?",
        answer: "Absolutamente. Tratamos seus dados com total sigilo e confidencialidade. Não acessamos arquivos pessoais além do necessário para resolver o problema e nunca compartilhamos informações."
      },
      {
        question: "Como funciona o atendimento remoto? É seguro?",
        answer: "Usamos softwares profissionais e seguros para acesso remoto. Você acompanha tudo na tela e pode encerrar a conexão a qualquer momento. A sessão é criptografada e você autoriza cada acesso."
      },
    ]
  },
];

const FAQ = () => {
  useEffect(() => {
    document.title = "Perguntas Frequentes (FAQ) | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Perguntas frequentes sobre os serviços de informática do Técnico Curitiba. Preços, formas de pagamento, área de atendimento, garantia e mais."
      );
    }
    trackPageView("/faq", "FAQ");
  }, []);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => 
      cat.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Perguntas Frequentes (FAQ) | Técnico Curitiba" description="Perguntas frequentes sobre os serviços de informática do Técnico Curitiba. Preços, formas de pagamento, área de atendimento, garantia e mais." path="/faq" breadcrumbs={[{ name: "Início", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <JsonLdSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient" />
          <FloatingParticles count={20} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] animate-breathe" style={{ animationDelay: "2.5s" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <div className="container mx-auto relative z-10 pt-14 pb-20 md:pt-20 md:pb-24">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-white/90 mb-6 border border-white/15 shimmer">
                  <HelpCircle className="h-4 w-4 text-accent" />
                  <span>Tire suas dúvidas</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5">
                  Perguntas <span className="gradient-text-animated">Frequentes</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Tire suas dúvidas sobre nossos serviços de informática
                </p>
                <div className="glow-separator max-w-[200px] mx-auto mt-6" />
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-10 stagger-item" style={{ animationDelay: `${catIndex * 120}ms` }}>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 reveal-text">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((item, qIndex) => (
                      <AccordionItem
                        key={qIndex}
                        value={`${catIndex}-${qIndex}`}
                        className="glass-card gradient-border rounded-xl border-none px-5 hover:shadow-[var(--shadow-md)] transition-all duration-300"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Não encontrou */}
        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.06),transparent_60%)] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 reveal-text">
                Não Encontrou Sua Dúvida?
              </h2>
              <p className="text-muted-foreground mb-6 reveal-text" data-reveal-delay="100">
                Entre em contato pelo WhatsApp e tire suas dúvidas diretamente com nossa equipe
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <RealImageSection imageKey="diagnostico" caption="Diagnóstico técnico profissional com equipamentos especializados" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default FAQ;
