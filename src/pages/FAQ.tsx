import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { FloatingParticles } from "@/components/FloatingParticles";
import { AnimatedSection } from "@/components/AnimatedSection";
import { trackPageView, trackFaqToggle } from "@/lib/analytics";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Antes de chamar",
    questions: [
      {
        question: "Preciso saber qual é o defeito antes de entrar em contato?",
        answer: "Não. Basta descrever o sintoma: o que aparece na tela, quando começou, se houve queda, líquido, queda de energia ou atualização recente. Identificar a causa é trabalho técnico, e é a nossa parte."
      },
      {
        question: "O que devo enviar na primeira mensagem?",
        answer: "Tipo de equipamento e marca, o que está acontecendo, desde quando e se algo mudou antes do problema aparecer. Com isso a triagem já consegue indicar a modalidade adequada."
      },
      {
        question: "O atendimento começa pelo WhatsApp?",
        answer: "Sim. Todo atendimento começa por uma triagem no WhatsApp, que organiza o caso antes do diagnóstico e da execução. Não há formulário longo nem cadastro."
      },
      {
        question: "O número de WhatsApp fica visível no site?",
        answer: "Não. O contato acontece pelos botões de atendimento, que abrem a conversa diretamente e já identificam de qual página você veio."
      },
    ]
  },
  {
    category: "Modalidades de atendimento",
    questions: [
      {
        question: "Quando o atendimento é remoto?",
        answer: "Quando o problema é de software: sistema, configuração, programas, e-mail, lentidão por configuração indevida. Problema físico não se resolve remotamente, e dizemos isso na triagem em vez de tentar."
      },
      {
        question: "Quando vale a visita técnica?",
        answer: "Quando a máquina liga e a necessidade é configuração, instalação de peça, rede, Wi-Fi ou checagem física no local. A visita é uma inspeção técnica, não uma promessa de conserto imediato."
      },
      {
        question: "Quando o equipamento vai para bancada?",
        answer: "Quando o reparo exige ferramenta, teste ou tempo que não cabem em uma visita — falha de placa, energia, tela, dobradiça ou diagnóstico mais profundo. Nesse caso existe a modalidade com coleta e entrega inclusas."
      },
      {
        question: "Quais regiões são atendidas?",
        answer: "Curitiba e São José dos Pinhais como área principal, e os demais municípios da Região Metropolitana conforme a modalidade e a agenda. Casos de software podem ser atendidos remotamente."
      },
    ]
  },
  {
    category: "Equipamentos e limites técnicos",
    questions: [
      {
        question: "Vocês atendem notebook e computador?",
        answer: "Sim, é o foco principal: notebooks, desktops e All in One, incluindo manutenção, limpeza interna, formatação, upgrade e diagnóstico de hardware e software."
      },
      {
        question: "Fazem upgrade para SSD e memória?",
        answer: "Sim, com checagem de compatibilidade antes. Quando possível, o sistema é migrado para o SSD para você não perder programas e configurações. As peças são cobradas à parte."
      },
      {
        question: "Recuperação de dados é garantida?",
        answer: "Não. Recuperação de dados é sempre uma tentativa e depende do estado real da mídia. Disco com falha mecânica interna exige laboratório especializado, e explicamos o cenário antes de qualquer cobrança de execução."
      },
      {
        question: "Removem vírus e resolvem lentidão?",
        answer: "Sim. Varredura, remoção de ameaças, limpeza de inicialização e configuração de proteção. Quando a lentidão é de hardware, e não de software, apontamos isso em vez de vender uma limpeza inútil."
      },
      {
        question: "Vocês atendem TV, celular ou outros eletrônicos?",
        answer: "O foco deste site é informática. Existem páginas específicas para TV, monitor e reparo de placa; para outros equipamentos, consulte pela triagem — se não for do nosso escopo, dizemos com clareza."
      },
    ]
  },
  {
    category: "Valores, prazos e condições",
    questions: [
      {
        question: "Quanto custa o atendimento?",
        answer: "A partir de R$ 99,99. Esse é um ponto de partida, não um preço fechado: modalidade, equipamento e complexidade mudam o total. Peças, componentes e licenças nunca estão inclusas."
      },
      {
        question: "O valor é informado antes da execução?",
        answer: "Sempre. Você recebe escopo, prazo estimado, valor aplicável e o que fica de fora antes de qualquer serviço ser executado. Nada avança sem a sua aprovação."
      },
      {
        question: "Por que não há tabela de preço fechada por serviço?",
        answer: "Porque o mesmo sintoma pode ter causas de custo muito diferente. Publicar um preço único obrigaria a inflar o valor de casos simples ou a cobrar surpresa em casos complexos — preferimos publicar a regra."
      },
      {
        question: "Como funciona o cancelamento?",
        answer: "Na modalidade de diagnóstico com coleta, o cancelamento pode ser feito em até 24 horas corridas após a coleta, conforme as condições publicadas na página de termos, condições, valores e prazos."
      },
      {
        question: "Há garantia sobre o serviço?",
        answer: "Sim, sobre o serviço executado, no escopo do que foi feito. A garantia é delimitada ao reparo realizado e não cobre falhas novas, alheias ao escopo ou causadas por uso posterior."
      },
    ]
  },
];

const FAQ = () => {
  useEffect(() => {
    document.title = "Perguntas Frequentes | Atendimento, Valores e Limites Técnicos";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Respostas diretas sobre como funciona a triagem, quando o atendimento é remoto, visita ou bancada, valores a partir de R$ 99,99, garantias e limites técnicos."
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

  useJsonLdSlot(SCHEMA_SLOTS.faq, faqSchema, SLOT_PRIORITY.page);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Perguntas Frequentes | Atendimento, Valores e Limites Técnicos" description="Respostas diretas sobre como funciona a triagem, quando o atendimento é remoto, visita ou bancada, valores a partir de R$ 99,99, garantias e limites técnicos." path="/faq" breadcrumbs={[{ name: "Início", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <JsonLdSchema />
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
                  Perguntas frequentes: <span className="gradient-text-animated">o que perguntam antes de chamar</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Triagem, modalidades, valores, garantias e limites técnicos — sem rodeio
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
                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-3"
                    onValueChange={(value) => {
                      if (!value) return;
                      const qIdx = Number(value.split("-")[1]);
                      const q = category.questions[qIdx];
                      if (q) trackFaqToggle(q.question, "open", `faq_${category.category}`, qIdx);
                    }}
                  >

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
