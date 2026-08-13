// @ts-nocheck
import { MessageCircle } from "lucide-react";

/**
 * Rodada 3Q — CTA intermediário das páginas comerciais de serviço.
 * Usa exatamente o mesmo destino e a mesma mensagem de triagem do CTA
 * do hero (o funil global intercepta o clique). Não cria novo fluxo,
 * formulário, modal ou telefone.
 */
export const InlineTriageCTA = ({
  href,
  titulo,
  texto,
  label,
  location,
  onClick,
}: {
  href: string;
  titulo: string;
  texto: string;
  label: string;
  location: string;
  onClick?: () => void;
}) => (
  <section className="py-10 md:py-12 bg-background">
    <div className="container mx-auto px-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="font-heading text-lg font-bold text-foreground">{titulo}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{texto}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          data-cta-location={location}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] px-6 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {label}
        </a>
      </div>
    </div>
  </section>
);

export default InlineTriageCTA;
