import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Quanto custa o serviço de técnico de informática em Curitiba?",
    answer: "O valor da visita técnica começa em R$ 69,99. O orçamento é feito no local e você só paga se aprovar o serviço. Aceitamos PIX, cartão de crédito, débito e dinheiro. Não cobramos taxa de deslocamento dentro de Curitiba e região metropolitana."
  },
  {
    question: "O técnico vai até minha casa ou empresa?",
    answer: "Sim! Oferecemos atendimento a domicílio em toda Curitiba e região metropolitana, incluindo São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo e Almirante Tamandaré. O técnico vai até você com todas as ferramentas e peças mais comuns necessárias."
  },
  {
    question: "Quanto tempo demora para o técnico chegar?",
    answer: "Na maioria dos casos, conseguimos atender no mesmo dia. O tempo médio de deslocamento varia de 30 a 60 minutos dependendo da sua localização em Curitiba. Para urgências, oferecemos atendimento prioritário com chegada mais rápida."
  },
  {
    question: "Vocês consertam notebook de qualquer marca?",
    answer: "Sim! Trabalhamos com todas as marcas de notebooks: Dell, HP, Lenovo, Acer, Asus, Samsung, LG, Positivo, Apple (MacBook), entre outras. Realizamos desde limpeza, formatação e upgrade até troca de tela, teclado, bateria e placa-mãe."
  },
  {
    question: "Os serviços têm garantia?",
    answer: "Sim, todos os nossos serviços têm garantia por escrito. A formatação e limpeza têm 30 dias de garantia. Serviços de hardware como troca de SSD, memória RAM e outras peças têm de 90 dias a 1 ano de garantia, dependendo do componente instalado."
  },
  {
    question: "Vocês atendem empresas também?",
    answer: "Sim! Atendemos pequenas e médias empresas com contratos de suporte técnico contínuo, manutenção preventiva, configuração de redes e servidores. Oferecemos planos mensais com SLA garantido e atendimento prioritário."
  },
  {
    question: "Como funciona o atendimento remoto?",
    answer: "O atendimento remoto é ideal para problemas de software que não exigem manutenção física. Usamos ferramentas seguras como AnyDesk ou TeamViewer para acessar seu computador com sua autorização. É mais rápido e mais barato, perfeito para remoção de vírus, configurações e instalação de programas."
  },
  {
    question: "Meu computador está muito lento. O que pode ser?",
    answer: "Computador lento geralmente é causado por: HD antigo (a solução é trocar por SSD), pouca memória RAM, excesso de programas iniciando com o Windows, vírus ou malware, ou acúmulo de poeira. Fazemos diagnóstico completo e recomendamos a melhor solução custo-benefício."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden" aria-labelledby="faq-heading">
      <div data-parallax="0.06" className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none" />
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium text-sm">Perguntas Frequentes</span>
          </div>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Dúvidas sobre Assistência Técnica em Curitiba
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços de informática, preços, garantia e formas de atendimento.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-border last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-5 flex items-start justify-between gap-4 text-left hover:bg-muted/30 transition-all duration-300 px-4 -mx-4 rounded-lg hover:scale-[1.01] hover:shadow-[var(--shadow-sm)]"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-base md:text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 mt-1 text-primary">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed px-4 -mx-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SEO text block */}
        <div className="mt-12 max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Não encontrou sua dúvida? Entre em contato pelo <strong>WhatsApp</strong> e 
            fale diretamente com nosso técnico. Atendemos em toda <strong>Curitiba</strong>, <strong>São José dos Pinhais</strong>, 
            <strong> Araucária</strong>, <strong>Campo Largo</strong>, <strong>Pinhais</strong> e região metropolitana.
          </p>
        </div>
      </div>
    </section>
  );
};