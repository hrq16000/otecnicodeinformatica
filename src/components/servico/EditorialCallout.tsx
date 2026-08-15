import { AlertTriangle, ClipboardCheck, HardDriveDownload, ShieldAlert, ShieldCheck, Wrench } from "lucide-react";
import type { ServicoCaixa, ServicoCaixaIcone } from "@/lib/servicoVisual3q";

/**
 * Rodada 3Q — caixa editorial contextual.
 * Reorganiza visualmente conteúdo já publicado na página (limites,
 * checagens, cuidados). Não cria claim, preço, prazo ou avaliação.
 */
const ICONES: Record<ServicoCaixaIcone, typeof ClipboardCheck> = {
  checklist: ClipboardCheck,
  alerta: AlertTriangle,
  limite: ShieldAlert,
  backup: HardDriveDownload,
  bancada: Wrench,
  seguranca: ShieldCheck,
};

export const EditorialCallout = ({ caixa }: { caixa: ServicoCaixa }) => {
  const Icon = ICONES[caixa.icone] ?? ClipboardCheck;

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <h3 className="flex items-start gap-2 font-bold text-foreground">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--accent))]" aria-hidden="true" />
        <span>{caixa.titulo}</span>
      </h3>
      <ul className="mt-3 space-y-2">
        {caixa.itens.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {caixa.nota && (
        <p className="mt-3 border-t border-border pt-3 text-sm font-medium text-foreground">
          {caixa.nota}
        </p>
      )}
    </article>
  );
};

export default EditorialCallout;
