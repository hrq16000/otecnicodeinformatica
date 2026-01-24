import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type LocalFAQItem = {
  question: string;
  answer: string;
};

interface LocalFAQSectionProps {
  /** Ex: "Perguntas Frequentes - Araucária" */
  title: string;
  /** Perguntas e respostas que serão exibidas e usadas no JSON-LD */
  faqs: LocalFAQItem[];
}

export const LocalFAQSection = ({ title, faqs }: LocalFAQSectionProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      {/* Schema FAQPage (local) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            {title}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-secondary rounded-lg border-none"
              >
                <AccordionTrigger className="px-5 py-4 text-left font-semibold text-foreground hover:text-accent hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};