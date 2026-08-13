// @ts-nocheck
import { MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  t24WaLink,
  t72WaLink,
  reviewWindow,
  type ReviewRequestContext,
} from "@/lib/reviewRequest";

interface Props {
  /** Telefone do cliente em formato E.164 ou só dígitos (ex: 5541999999999). */
  clientPhone: string;
  /** ISO do momento em que o atendimento foi fechado. */
  serviceClosedAt: string;
  context: ReviewRequestContext;
  compact?: boolean;
}

/**
 * Botões para disparar manualmente a mensagem T+24h e T+72h via wa.me.
 * Custo zero, sem opt-in regulatório, abre o WhatsApp Web/App do operador
 * já com mensagem personalizada + link mágico do Google Review.
 *
 * Use dentro de cada linha do painel /admin/reviews ou de uma lista
 * "Atendimentos fechados aguardando review".
 */
export const ReviewRequestButtons = ({
  clientPhone,
  serviceClosedAt,
  context,
  compact = false,
}: Props) => {
  const window = reviewWindow(serviceClosedAt);
  const t24 = t24WaLink(clientPhone, context);
  const t72 = t72WaLink(clientPhone, context);

  const size = compact ? "sm" : "default";

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button
        asChild
        size={size}
        variant={window === "t24" ? "default" : "outline"}
        disabled={window === "wait"}
        title={
          window === "wait"
            ? "Aguarde 24h após o fechamento"
            : "Abrir WhatsApp com pedido de review (T+24h)"
        }
      >
        <a href={t24} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-4 h-4 mr-1" />
          Pedir review (24h)
        </a>
      </Button>

      <Button
        asChild
        size={size}
        variant={window === "t72" ? "default" : "outline"}
        disabled={window === "wait" || window === "t24"}
        title={
          window === "expired"
            ? "Janela expirada (>7d) — review tardia tem baixa conversão"
            : "Lembrete educado (T+72h)"
        }
      >
        <a href={t72} target="_blank" rel="noopener noreferrer">
          <Clock className="w-4 h-4 mr-1" />
          Lembrete (72h)
        </a>
      </Button>

      <span className="text-xs text-muted-foreground">
        Janela:{" "}
        <strong>
          {window === "wait"
            ? "aguardando 24h"
            : window === "t24"
              ? "pronto para T+24h"
              : window === "t72"
                ? "pronto para T+72h"
                : "expirada"}
        </strong>
      </span>
    </div>
  );
};

export default ReviewRequestButtons;
