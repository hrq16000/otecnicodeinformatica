import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRate, sampleStatus, SAMPLE_LABEL } from "@/lib/analyticsContract";
import { CANAL_LABEL, funilPorCanal, type EventoCanal } from "@/lib/canalAtribuicao";

/**
 * RODADA 6 — funil e taxas por canal (Google Ads, orgânico/SEO e outros).
 *
 * Derivado apenas de source/medium/attribution_channel. Nenhum canal recebe
 * contexto geográfico inventado: cidade/bairro continuam vindo da rota.
 */
export const SegmentacaoCanal = ({ rows }: { rows: EventoCanal[] }) => {
  const canais = useMemo(() => funilPorCanal(rows), [rows]);

  return (
    <Card className="p-4">
      <h3 className="font-heading text-lg font-semibold">Funil por canal (source / medium)</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Sessões distintas por etapa. Denominador de cada taxa = sessões do próprio canal.
      </p>
      {canais.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Sem dados no período.</p>
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
                <th className="py-2 pr-3 text-right">Leads</th>
                <th className="py-2 pr-3 text-right">WA / sessão</th>
                <th className="py-2 text-right">Amostra</th>
              </tr>
            </thead>
            <tbody>
              {canais.map(({ canal, bucket }) => (
                <tr key={canal} className="border-b border-border/60">
                  <td className="py-2 pr-3">{CANAL_LABEL[canal]}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{bucket.sessoes.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{bucket.cta.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{bucket.triagem.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{bucket.whatsapp.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{bucket.leads.size}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">
                    {formatRate(bucket.whatsapp.size, bucket.sessoes.size)}
                  </td>
                  <td className="py-2 text-right">
                    <Badge variant={sampleStatus(bucket.sessoes.size) === "actionable" ? "default" : "secondary"}>
                      {SAMPLE_LABEL[sampleStatus(bucket.sessoes.size)]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        "Não identificado" fica separado de "Direto" — evento sem UTM não é atribuído a nenhum canal.
      </p>
    </Card>
  );
};
