import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, Clock, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  categoriaPorEquipamento,
  prazoEstimadoLabel,
} from "@/lib/operacaoCategorias";

interface Props {
  equipamento?: string | null;
  accepted: boolean;
  onAcceptChange: (v: boolean) => void;
}

/**
 * Etapa de triagem por categoria: mostra o que aceitamos, o que recusamos e o
 * prazo estimado ANTES de o cliente confirmar o atendimento. Evita coleta de
 * caso inviável e alinha expectativa de prazo na origem.
 */
export const CriteriosAceiteCard = ({ equipamento, accepted, onAcceptChange }: Props) => {
  const categoria = useMemo(() => categoriaPorEquipamento(equipamento), [equipamento]);
  const [aberto, setAberto] = useState(false);

  if (!categoria) return null;

  return (
    <div className="rounded-xl border border-border bg-card/60 p-3 space-y-3">
      <div className="flex items-start gap-2">
        <span aria-hidden="true" className="text-base leading-none">{categoria.emoji}</span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Critérios de atendimento — {categoria.nome}
          </p>
          <p className="mt-0.5 flex items-start gap-1.5 text-xs text-foreground/70">
            <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span>Prazo estimado: {prazoEstimadoLabel(categoria)}.</span>
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            Aceitamos
          </p>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-foreground/80">
            {categoria.aceite.slice(0, aberto ? undefined : 3).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <XCircle className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
            Não aceitamos
          </p>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-foreground/80">
            {categoria.recusa.slice(0, aberto ? undefined : 3).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="flex items-center gap-1 text-[11px] font-medium text-foreground/70 underline-offset-2 hover:underline"
        aria-expanded={aberto}
      >
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${aberto ? "rotate-180" : ""}`} aria-hidden="true" />
        {aberto ? "Ver menos" : "Ver lista completa e o que perguntamos antes"}
      </button>

      {aberto && (
        <div className="rounded-lg border border-border bg-background/60 p-2.5">
          <p className="text-xs font-semibold text-foreground">Confirmamos antes de agendar</p>
          <ul className="mt-1 space-y-1 text-[11px] leading-snug text-foreground/80">
            {categoria.triagemObrigatoria.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-semibold text-foreground">Orientação até a coleta</p>
          <ul className="mt-1 space-y-1 text-[11px] leading-snug text-foreground/80">
            {categoria.orientacaoInicial.map((o) => (
              <li key={o}>• {o}</li>
            ))}
          </ul>
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border bg-background/50 p-2.5 text-xs leading-snug transition-colors hover:bg-background/80">
        <Checkbox
          checked={accepted}
          onCheckedChange={(v) => onAcceptChange(!!v)}
          className="mt-0.5"
          aria-label="Confirmar ciência dos critérios de aceite e recusa"
        />
        <span className="text-foreground/85">
          Li os critérios de aceite e recusa e o prazo estimado para {categoria.nome}. Entendo que a
          confirmação do atendimento depende da checagem técnica acima.
        </span>
      </label>
    </div>
  );
};

export default CriteriosAceiteCard;
