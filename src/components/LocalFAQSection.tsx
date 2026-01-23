import React from "react";

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
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div key={idx} className="bg-secondary rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
