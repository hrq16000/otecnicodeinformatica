// @ts-nocheck
import { MessageCircle } from "lucide-react";

/**
 * Barra fixa de conversão — apenas mobile — das páginas de serviço.
 *
 * Objetivo: deixar o CTA do serviço sempre à mão no celular, já com a
 * mensagem de funil específica da rota (mesmo `href`/mensagem do CTA do
 * hero, portanto o funil global intercepta o clique e confirma o mínimo).
 *
 * A barra também resume o processo em 4 etapas para reduzir a fricção de
 * quem chega direto do Google: o visitante sabe o que acontece depois do
 * clique antes de abrir a conversa.
 */
export const MobileServicoFunnelBar = ({
  href,
  servicoLabel,
  etapas,
  ctaLabel = "Iniciar atendimento",
  apoio,
  variante,
  location,
  onClick,
}: {
  href: string;
  servicoLabel: string;
  /** Rótulos curtos das 4 etapas (triagem → diagnóstico → aprovação → execução). */
  etapas: string[];
  ctaLabel?: string;
  /** Linha de apoio do experimento de copy (variação por sessão). */
  apoio?: string;
  /** Identificador da variação ativa — apenas para leitura no painel. */
  variante?: string;
  location: string;
  onClick?: () => void;
}) => {
  const passos = etapas.slice(0, 4);


  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-card/95 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-2 backdrop-blur md:hidden"
      data-testid="mobile-servico-funnel-bar"
    >
      <ol className="mb-1.5 flex items-center gap-1 overflow-hidden text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {passos.map((etapa, i) => (
          <li key={etapa} className="flex min-w-0 items-center gap-1">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[0.6rem] text-accent-foreground">
              {i + 1}
            </span>
            <span className="truncate">{etapa}</span>
            {i < passos.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
      {apoio && (
        <p className="mb-1.5 line-clamp-2 text-[0.72rem] leading-snug text-muted-foreground">{apoio}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        data-cta-location={location}
        data-cta-variant={variante}
        aria-label={`${ctaLabel} de ${servicoLabel} pelo WhatsApp`}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[hsl(var(--accent))] text-base font-bold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        {ctaLabel}
      </a>

    </div>
  );
};

export default MobileServicoFunnelBar;
