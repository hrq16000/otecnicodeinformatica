// @ts-nocheck
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface GeoFAQ {
  question: string;
  answer: string;
}

// FAQs específicas por bairro - NÃO genéricas
export const bairroFAQs: Record<string, GeoFAQ[]> = {
  // Curitiba - Centro
  "centro": [
    {
      question: "Atendem conforme a disponibilidade da agenda no Centro de Curitiba?",
      answer: "Sim! O Centro de Curitiba é uma das regiões com maior disponibilidade. Na maioria dos casos, conseguimos Atendimento conforme a agenda, especialmente para urgências em escritórios e empresas da região central."
    },
    {
      question: "Tem estacionamento fácil para o técnico no Centro?",
      answer: "Não se preocupe com isso! Nosso técnico já conhece bem a região central e utiliza estacionamentos conveniados. O deslocamento já está incluso no valor do atendimento."
    },
    {
      question: "Atendem empresas e escritórios no Centro?",
      answer: "Com certeza. Grande parte dos nossos clientes são empresas e escritórios no Centro de Curitiba. Oferecemos desde atendimentos pontuais até contratos mensais de suporte."
    },
    {
      question: "Qual o tempo médio de chegada ao Centro de Curitiba?",
      answer: "Em horário comercial, nosso técnico chega em média de 30 a 45 minutos no Centro. Fora do horário de pico, pode ser ainda mais rápido."
    }
  ],

  // Curitiba - Batel
  "batel": [
    {
      question: "Quanto custa formatação de notebook no Batel?",
      answer: "A formatação de notebook no Batel parte de R$ 99,99. O valor final depende da complexidade: backup de dados, instalação de programas específicos, etc. atendimento sem compromisso."
    },
    {
      question: "Atendem residências e apartamentos no Batel?",
      answer: "Sim! Atendemos tanto residências quanto escritórios no Batel. Para prédios, basta liberar a entrada na portaria. Técnico identificado e com todos os equipamentos."
    },
    {
      question: "Fazem suporte para home office no Batel?",
      answer: "Claro. Muitos profissionais do Batel trabalham em home office. Configuramos sua estação de trabalho completa: VPN, impressoras, scanner, backup em nuvem e otimização de desempenho."
    },
    {
      question: "Consertam MacBook e notebooks Apple no Batel?",
      answer: "Trabalhamos principalmente com Windows, mas realizamos diagnósticos em MacBooks. Para reparos específicos de hardware Apple, podemos indicar parceiros especializados."
    }
  ],

  // Curitiba - Portão
  "portao": [
    {
      question: "Atendem fins de semana no Portão?",
      answer: "Sim. Aos sábados atendemos das 9h às 13h. Para urgências no Portão, entre em contato via WhatsApp que verificamos disponibilidade especial."
    },
    {
      question: "Fazem upgrade de SSD no Portão?",
      answer: "Sim! O upgrade de HD para SSD é um dos serviços mais procurados no Portão. Instalamos SSDs de diversas capacidades e fazemos a migração completa do sistema."
    },
    {
      question: "Quanto tempo demora para resolver vírus no Portão?",
      answer: "Depende da infecção. Vírus simples resolvemos em 1-2 horas no local. Ransomware e infecções graves podem precisar de coleta do equipamento para tratamento mais extenso."
    }
  ],

  // Curitiba - CIC
  "cic": [
    {
      question: "Vocês atendem empresas na CIC?",
      answer: "Sim! Atendemos várias empresas e indústrias na CIC (Cidade Industrial de Curitiba). Oferecemos suporte técnico pontual e contratos mensais para empresas de todos os portes."
    },
    {
      question: "Fazem manutenção em computadores industriais na CIC?",
      answer: "Trabalhamos principalmente com computadores e notebooks comerciais. Para equipamentos industriais específicos, podemos fazer diagnóstico inicial e indicar a solução adequada."
    },
    {
      question: "Qual o valor do deslocamento até a CIC?",
      answer: "O deslocamento já está incluso no valor da visita técnica (a partir de R$ 99,99). Não cobramos taxa extra para atendimento na CIC."
    }
  ],

  // Curitiba - Santa Felicidade
  "santa-felicidade": [
    {
      question: "Atendem restaurantes e comércios em Santa Felicidade?",
      answer: "Com certeza. Santa Felicidade é conhecida pelos restaurantes e atendemos vários estabelecimentos na região. Configuramos PDVs, impressoras fiscais, redes e sistemas de gestão."
    },
    {
      question: "Fazem instalação de câmeras de segurança em Santa Felicidade?",
      answer: "Fazemos a configuração de sistemas de câmeras IP e DVR/NVR. Para instalação física das câmeras, trabalhamos em parceria com profissionais especializados."
    },
    {
      question: "Quanto tempo o técnico demora para chegar em Santa Felicidade?",
      answer: "De Curitiba centro, nosso técnico chega em Santa Felicidade em aproximadamente 40-50 minutos, dependendo do trânsito na região."
    }
  ],

  // São José dos Pinhais
  "afonso-pena": [
    {
      question: "Atendem a região do aeroporto em São José dos Pinhais?",
      answer: "Sim! Atendemos toda a região do Afonso Pena, incluindo áreas próximas ao Aeroporto Internacional. Empresas de logística e serviços aeroportuários são atendidas regularmente."
    },
    {
      question: "Qual o tempo de deslocamento até Afonso Pena?",
      answer: "A partir de Curitiba, chegamos ao Afonso Pena em aproximadamente 30-40 minutos. É uma das regiões mais próximas de SJP que atendemos."
    },
    {
      question: "Fazem suporte para empresas de transporte no Afonso Pena?",
      answer: "Sim. Várias empresas de transporte e logística da região contam com nosso suporte. Configuramos sistemas de rastreamento, redes e backup de dados."
    }
  ],

  // Araucária
  "centro-araucaria": [
    {
      question: "Vocês atendem em Araucária mesmo?",
      answer: "Sim! Araucária faz parte da nossa área de cobertura. Atendemos o Centro de Araucária e demais bairros da cidade com a mesma qualidade de Curitiba."
    },
    {
      question: "Qual o valor do atendimento em Araucária?",
      answer: "O valor é o mesmo: R$ 99,99. Não cobramos taxa extra de deslocamento para Araucária."
    },
    {
      question: "Atendem indústrias em Araucária?",
      answer: "Sim. Araucária tem forte polo industrial e atendemos várias empresas da região. Oferecemos suporte técnico para escritórios administrativos das indústrias."
    }
  ],

  // Campo Largo
  "centro-campo-largo": [
    {
      question: "Vocês vão até Campo Largo?",
      answer: "Sim! Campo Largo está na nossa área de atendimento. Atendemos residências e empresas em toda a cidade, especialmente na região central."
    },
    {
      question: "Demora muito para o técnico chegar em Campo Largo?",
      answer: "O deslocamento de Curitiba a Campo Largo leva em média 50-60 minutos. Agendamos horários que permitam um atendimento tranquilo e sem pressa."
    },
    {
      question: "Fazem reparo de notebook em Campo Largo?",
      answer: "Sim! Fazemos diagnóstico e reparo de notebooks em Campo Largo. Caso precise de peças específicas, podemos coletar o equipamento e devolver após o serviço."
    }
  ],

  // Pinhais
  "centro-pinhais": [
    {
      question: "Em quanto tempo conseguem atender em Pinhais?",
      answer: "Na maioria dos casos, sim. Pinhais é bem próximo de Curitiba e conseguimos encaixar atendimentos com boa agilidade, especialmente pela manhã."
    },
    {
      question: "Qual o tempo de chegada até Pinhais?",
      answer: "De Curitiba, nosso técnico chega em Pinhais em aproximadamente 25-35 minutos, dependendo do trânsito na região."
    },
    {
      question: "Fazem formatação em Pinhais?",
      answer: "Claro! Formatação de computadores e notebooks é um dos serviços mais realizados em Pinhais. Valor a partir de R$ 99,99 com Windows, drivers e programas."
    }
  ]
};

interface GeoSpecificFAQsProps {
  bairroSlug: string;
  bairroNome: string;
  cidadeNome: string;
}

export const GeoSpecificFAQs = ({ bairroSlug, bairroNome, cidadeNome }: GeoSpecificFAQsProps) => {
  const faqs = bairroFAQs[bairroSlug] || [];
  
  if (faqs.length === 0) return null;

  // Schema FAQPage para SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-12 md:py-16 bg-secondary">
      {/* Schema FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            Perguntas Frequentes - {bairroNome}, {cidadeNome}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border-none"
              >
                <AccordionTrigger className="px-5 py-4 text-left font-semibold text-foreground hover:text-accent hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default GeoSpecificFAQs;
