/**
 * RODADA 7A — PAINEL DE EXPERIMENTOS DE CRO
 *
 * Mostra a prontidão de cada experimento (rotas, cidades, lacunas de registro)
 * e, quando houver exposição, as métricas por variação: sessões expostas,
 * CTA, triagem, WhatsApp e lead. Zero-state honesto: sem amostra suficiente
 * o veredito é "aguardar amostra", nunca um vencedor inventado.
 */
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EXPERIMENTOS_CRO, inventarioProntidao } from "@/lib/croRodada7";

export interface EventoExperimento {
  event_type?: string | null;
  variant?: string | null;
  session_id?: string | null;
  path?: string | null;
}

const CONVERSOES = {
  cta: ["funnel_open", "cta_click"],
  triagem: ["funnel_stage", "triage_start", "wa_funnel_open"],
  whatsapp: ["wa_click", "whatsapp_open"],
  lead: ["wa_funnel_submit", "lead_submitted", "generate_lead"],
};

const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 1000) / 10 : 0);

export const PainelExperimentosCro = ({ rows }: { rows: EventoExperimento[] }) => {
  const prontidao = useMemo(() => inventarioProntidao(), []);

  const metricas = useMemo(
    () =>
      EXPERIMENTOS_CRO.map((exp) => {
        const doExperimento = rows.filter((r) => exp.rotas.includes((r.path ?? "").replace(/\/+$/, "") || "/"));
        const porVariante = exp.variantes.map((v) => {
          const evs = doExperimento.filter((r) => r.variant === v.id);
          const sessoes = new Set(evs.map((r) => r.session_id).filter(Boolean)).size;
          const conta = (lista: string[]) =>
            new Set(evs.filter((r) => lista.includes(r.event_type ?? "")).map((r) => r.session_id)).size;
          const lead = conta(CONVERSOES.lead);
          return {
            id: v.id,
            rotulo: v.rotulo,
            sessoes,
            cta: conta(CONVERSOES.cta),
            triagem: conta(CONVERSOES.triagem),
            whatsapp: conta(CONVERSOES.whatsapp),
            lead,
            taxa: pct(lead, sessoes),
          };
        });
        const amostraOk = porVariante.every((v) => v.sessoes >= exp.amostraMinima);
        return { exp, porVariante, amostraOk };
      }),
    [rows],
  );

  return (
    <Card className="p-4">
      <h2 className="mb-1 font-heading text-lg font-bold text-foreground">Experimentos de CRO (Rodada 7)</h2>
      <p className="mb-4 text-xs text-muted-foreground">
        Todo experimento nasce desligado. Só pode ser ativado com o funil inteiro instrumentado e lido
        depois de atingir a amostra mínima declarada por variação.
      </p>

      <div className="space-y-5">
        {metricas.map(({ exp, porVariante, amostraOk }) => {
          const p = prontidao.find((x) => x.id === exp.id);
          return (
            <section key={exp.id} className="border-t border-border pt-4 first:border-0 first:pt-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground">{exp.id}</span>
                <Badge variant={exp.ativo ? "default" : "secondary"}>{exp.ativo ? "ativo" : "desligado"}</Badge>
                <Badge variant={p?.pronto ? "secondary" : "destructive"}>
                  {p?.pronto ? "instrumentação completa" : `faltam: ${p?.lacunas.join(", ") || "—"}`}
                </Badge>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{exp.hipotese}</p>
              <p className="mb-3 text-xs text-muted-foreground">
                {exp.rotas.length} rota(s) · cidades: {exp.cidades.join(", ") || "não restrito"} · amostra mínima:{" "}
                {exp.amostraMinima} sessões por variação
              </p>

              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-1">Variação</th>
                    <th>Sessões</th>
                    <th>CTA</th>
                    <th>Triagem</th>
                    <th>WhatsApp</th>
                    <th>Lead</th>
                    <th>Taxa lead</th>
                  </tr>
                </thead>
                <tbody>
                  {porVariante.map((v) => (
                    <tr key={v.id} className="border-t border-border">
                      <td className="py-1.5 pr-2">
                        <Badge variant="secondary">{v.rotulo}</Badge>
                      </td>
                      <td>{v.sessoes}</td>
                      <td>{v.cta}</td>
                      <td>{v.triagem}</td>
                      <td>{v.whatsapp}</td>
                      <td>{v.lead}</td>
                      <td className="font-semibold">{v.taxa}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-2 text-xs font-semibold text-muted-foreground">
                {exp.ativo
                  ? amostraOk
                    ? "Amostra suficiente: comparar taxa de lead entre variações antes de decidir."
                    : "Veredito: AGUARDAR AMOSTRA — volume abaixo do mínimo declarado."
                  : "Veredito: NÃO ATIVAR — experimento desligado até haver volume e instrumentação completa."}
              </p>
            </section>
          );
        })}
      </div>
    </Card>
  );
};

export default PainelExperimentosCro;
