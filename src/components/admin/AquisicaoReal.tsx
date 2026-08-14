import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CANAL_LABEL,
  canalDoEvento,
  ehAquisicao,
  type Canal,
  type EventoCanal,
} from "@/lib/canalAtribuicao";

/**
 * RODADA 8D — BLOCO "AQUISIÇÃO REAL" (/admin/conversao)
 *
 * Separa, sem inventar número:
 *   • aquisição real (canais externos) — a única soma principal;
 *   • interno/QA — nunca somado à aquisição;
 *   • unknown — estado válido, com reason code explícito (nunca vira "direto").
 *
 * Fail-closed: sem eventos, o painel diz "sem evidência" em vez de estimar.
 */

type ReasonCode = "MISSING_ATTRIBUTION_SIGNAL" | "INVALID_UTM" | "UNKNOWN_REFERRER";

export function reasonCodeUnknown(ev: EventoCanal): ReasonCode {
  const source = (ev.utm_source || "").trim();
  const medium = (ev.utm_medium || "").trim();
  if (source && !medium) return "UNKNOWN_REFERRER";
  if (source || medium) return "INVALID_UTM";
  return "MISSING_ATTRIBUTION_SIGNAL";
}

type Etapa = { sessoes: Set<string>; cta: Set<string>; triagem: Set<string>; whatsapp: Set<string>; lead: Set<string> };
const novaEtapa = (): Etapa => ({
  sessoes: new Set(),
  cta: new Set(),
  triagem: new Set(),
  whatsapp: new Set(),
  lead: new Set(),
});

const ETAPA: Record<string, keyof Etapa> = {
  cta_click: "cta",
  funnel_open: "triagem",
  triage_start: "triagem",
  triage_complete: "triagem",
  wa_click: "whatsapp",
  whatsapp_open: "whatsapp",
  lead_submitted: "lead",
  wa_funnel_submit: "lead",
};

const MILESTONES = [1, 5, 10, 25, 50];

export const AquisicaoReal = ({ rows }: { rows: EventoCanal[] }) => {
  const dados = useMemo(() => {
    const porCanal = new Map<Canal, Etapa>();
    const reasons = new Map<ReasonCode, Set<string>>();
    const internas = new Set<string>();
    const aquisicao = new Set<string>();
    let primeiraSessaoAquisicao: { session: string; canal: Canal; quando?: string | null } | null = null;

    for (const ev of rows) {
      const canal = canalDoEvento(ev);
      const sid = ev.session_id || ev.created_at || "sessao-desconhecida";
      const bucket = porCanal.get(canal) ?? novaEtapa();
      bucket.sessoes.add(sid);
      const etapa = ETAPA[ev.event_type];
      if (etapa) bucket[etapa].add(sid);
      porCanal.set(canal, bucket);

      if (canal === "internal") internas.add(sid);
      if (canal === "unknown") {
        const rc = reasonCodeUnknown(ev);
        const set = reasons.get(rc) ?? new Set<string>();
        set.add(sid);
        reasons.set(rc, set);
      }
      if (ehAquisicao(canal)) {
        aquisicao.add(sid);
        if (!primeiraSessaoAquisicao) primeiraSessaoAquisicao = { session: sid, canal, quando: ev.created_at };
        else if (ev.created_at && primeiraSessaoAquisicao.quando && ev.created_at < primeiraSessaoAquisicao.quando)
          primeiraSessaoAquisicao = { session: sid, canal, quando: ev.created_at };
      }
    }

    const canais = [...porCanal.entries()]
      .filter(([canal]) => ehAquisicao(canal))
      .sort((a, b) => b[1].sessoes.size - a[1].sessoes.size);

    return {
      canais,
      internas: internas.size,
      unknown: porCanal.get("unknown")?.sessoes.size ?? 0,
      reasons: [...reasons.entries()],
      total: aquisicao.size,
      primeira: primeiraSessaoAquisicao,
    };
  }, [rows]);

  const proximoMilestone = MILESTONES.find((m) => dados.total < m);

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold">Aquisição real (Rodada 8D)</h3>
        <Badge variant={dados.total > 0 ? "default" : "secondary"}>
          {dados.total} sessão{dados.total === 1 ? "" : "es"} de aquisição
        </Badge>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Só canais externos entram na soma principal. Interno/QA e "não identificado" ficam fora — nunca são
        convertidos em "direto".
      </p>

      {dados.total === 0 ? (
        <p className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
          <strong>Sem evidência de aquisição humana ainda.</strong> Nenhuma sessão externa registrada no período.
          Nada é estimado.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-3">Canal</th>
                <th className="py-2 pr-3 text-right">Sessões</th>
                <th className="py-2 pr-3 text-right">CTA</th>
                <th className="py-2 pr-3 text-right">Triagem</th>
                <th className="py-2 pr-3 text-right">WhatsApp</th>
                <th className="py-2 text-right">Lead</th>
              </tr>
            </thead>
            <tbody>
              {dados.canais.map(([canal, b]) => (
                <tr key={canal} className="border-b border-border/60">
                  <td className="py-2 pr-3">{CANAL_LABEL[canal]}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{b.sessoes.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{b.cta.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{b.triagem.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{b.whatsapp.size}</td>
                  <td className="py-2 text-right tabular-nums">{b.lead.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {dados.primeira && (
        <p className="mt-3 rounded-md bg-primary/10 p-3 text-sm">
          <strong>FIRST ACQUISITION SESSION</strong> registrada — canal {CANAL_LABEL[dados.primeira.canal]}
          {dados.primeira.quando ? ` em ${new Date(dados.primeira.quando).toLocaleString("pt-BR")}` : ""}.
        </p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border p-3">
          <p className="text-xs uppercase text-muted-foreground">Interno / QA (fora da soma)</p>
          <p className="text-xl font-semibold tabular-nums">{dados.internas}</p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="text-xs uppercase text-muted-foreground">Não identificado</p>
          <p className="text-xl font-semibold tabular-nums">{dados.unknown}</p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="text-xs uppercase text-muted-foreground">Próximo milestone</p>
          <p className="text-xl font-semibold tabular-nums">
            {proximoMilestone ? `${dados.total}/${proximoMilestone}` : "50+"}
          </p>
        </div>
      </div>

      {dados.reasons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {dados.reasons.map(([rc, sessoes]) => (
            <Badge key={rc} variant="outline" className="font-mono text-[11px]">
              UNKNOWN · {rc} · {sessoes.size}
            </Badge>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Amostra pequena não gera vencedor: com poucas sessões o veredito permanece LOW_EVIDENCE e o Experimento 1
        continua DISABLED.
      </p>
    </Card>
  );
};
