import { useEffect } from "react";

type FAQItem = { q: string; a: string };

const BASE_FAQ: FAQItem[] = [
  {
    q: "Quanto custa o atendimento em Curitiba?",
    a: "A visita técnica em Curitiba começa em R$ 99,99 e o orçamento do serviço é apresentado antes da execução. Você só aprova se concordar.",
  },
  {
    q: "Em quanto tempo o técnico atende?",
    a: "Atendemos no mesmo dia em Curitiba e região metropolitana, conforme disponibilidade da agenda. Confirme o horário pelo WhatsApp.",
  },
  {
    q: "Atende em domicílio ou só na bancada?",
    a: "Atendemos a domicílio em Curitiba e região, com opção de coleta e entrega quando o serviço exigir bancada.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos PIX, dinheiro e cartão. Pagamento somente após o serviço entregue e aprovado.",
  },
];

const CATEGORY_EXTRA: Record<string, FAQItem[]> = {
  CFTV: [
    {
      q: "Vocês instalam câmeras em residência e comércio?",
      a: "Sim. Fazemos projeto, passagem de cabos, instalação de DVR/NVR e configuração de acesso remoto pelo celular.",
    },
  ],
  Formatação: [
    {
      q: "A formatação apaga meus arquivos?",
      a: "Antes da formatação fazemos backup dos seus arquivos importantes. Você aprova o que deve ser preservado.",
    },
  ],
  Vírus: [
    {
      q: "Vocês removem vírus sem perder meus arquivos?",
      a: "Na maioria dos casos sim. Avaliamos o tipo de infecção e priorizamos preservar seus dados.",
    },
  ],
  Notebook: [
    {
      q: "Vocês consertam qualquer marca de notebook?",
      a: "Atendemos as principais marcas: Dell, Lenovo, Acer, HP, Samsung, Asus, Positivo, Apple e outras.",
    },
  ],
};

export const BlogPostFAQ = ({ category, slug }: { category: string; slug: string }) => {
  const extras = CATEGORY_EXTRA[category] ?? [];
  const items = [...extras, ...BASE_FAQ].slice(0, 5);

  useEffect(() => {
    const id = `faq-jsonld-${slug}`;
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [slug, items]);

  return (
    <section className="not-prose mt-12">
      <h2 className="font-heading font-bold text-primary text-xl md:text-2xl mb-4">
        Perguntas frequentes
      </h2>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
        {items.map((it, i) => (
          <details key={i} className="group">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-4 md:p-5 font-semibold text-foreground hover:bg-muted/40 transition-colors">
              <span>{it.q}</span>
              <span className="text-accent text-xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default BlogPostFAQ;
