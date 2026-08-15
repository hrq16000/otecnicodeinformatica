import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { exportarCsv } from "@/lib/exportarRelatorio";

/**
 * SEGMENTAÇÃO GEOGRÁFICA E POR ORIGEM (mesma taxonomia enviada ao GA4).
 *
 * Lê click_events (contrato de analytics já existente: cidade, canal de
 * atribuição, utm_source) e mostra leads/CTAs por cidade e a tendência
 * semanal por origem. Sem PII e sem zeros inventados: quando não há evento,
 * o painel diz NO_DATA.
 */

type Evento = {
  cidade: string | null;
  attribution_channel: string | null;
  utm_source: string | null;
  event_type: string;
  created_at: string;
};

const PERIODOS = [7, 28, 90] as const;
const LEAD_EVENTS = new Set(["whatsapp_open", "lead_submit", "funnel_submit"]);

const semanaDe = (iso: string) => {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() - d.getUTCDay());
  return d.toISOString().slice(0, 10);
};

const SegmentacaoGeoPanel = () => {
  const [dias, setDias] = useState<(typeof PERIODOS)[number]>(28);
  const [eventos, setEventos] = useState<Evento[] | null>(null);
  const [loading, setLoading] = useState(false);

  const carregar = useCallback(async (periodo: number) => {
    setLoading(true);
    const desde = new Date(Date.now() - periodo * 864e5).toISOString();
    const { data } = await supabase
      .from("click_events")
      .select("cidade,attribution_channel,utm_source,event_type,created_at")
      .gte("created_at", desde)
      .limit(20000);
    setEventos((data as Evento[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void carregar(dias);
  }, [carregar, dias]);

  const porCidade = useMemo(() => {
    const mapa = new Map<string, { cidade: string; eventos: number; leads: number }>();
    for (const e of eventos ?? []) {
      const cidade = e.cidade?.trim() || "UNKNOWN";
      const item = mapa.get(cidade) ?? { cidade, eventos: 0, leads: 0 };
      item.eventos += 1;
      if (LEAD_EVENTS.has(e.event_type)) item.leads += 1;
      mapa.set(cidade, item);
    }
    return [...mapa.values()].sort((a, b) => b.leads - a.leads || b.eventos - a.eventos);
  }, [eventos]);

  const tendencia = useMemo(() => {
    const mapa = new Map<string, Map<string, number>>();
    for (const e of eventos ?? []) {
      if (!LEAD_EVENTS.has(e.event_type)) continue;
      const origem = e.attribution_channel || e.utm_source || "direct";
      const semana = semanaDe(e.created_at);
      const linha = mapa.get(origem) ?? new Map<string, number>();
      linha.set(semana, (linha.get(semana) ?? 0) + 1);
      mapa.set(origem, linha);
    }
    const semanas = [...new Set([...mapa.values()].flatMap((m) => [...m.keys()]))].sort();
    return {
      semanas,
      linhas: [...mapa.entries()]
        .map(([origem, m]) => ({
          origem,
          valores: semanas.map((s) => m.get(s) ?? 0),
          total: [...m.values()].reduce((a, b) => a + b, 0),
        }))
        .sort((a, b) => b.total - a.total),
    };
  }, [eventos]);

  return (
    <section className="mt-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            <MapPin className="mr-1 inline h-4 w-4" aria-hidden="true" />
            Tráfego e leads por cidade/estado e origem (GA4)
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mesma taxonomia enviada ao GA4 (cidade e canal de atribuição). Cidades sem contexto
            aparecem como UNKNOWN — nunca são preenchidas por suposição.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PERIODOS.map((p) => (
            <Button key={p} size="sm" variant={p === dias ? "default" : "outline"} onClick={() => setDias(p)}>
              {p}d
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => void carregar(dias)} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            Atualizar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => exportarCsv("segmentacao-cidade-origem", porCidade)}
            disabled={!porCidade.length}
          >
            CSV
          </Button>
        </div>
      </header>

      {loading && !eventos && <Skeleton className="mt-4 h-40 w-full" />}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-heading text-base font-semibold text-foreground">Por cidade</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {porCidade.slice(0, 15).map((c) => (
              <li key={c.cidade} className="flex items-center justify-between gap-2">
                <span className="text-foreground">{c.cidade}</span>
                <span className="text-xs text-muted-foreground">
                  {c.leads} lead(s) · {c.eventos} evento(s)
                </span>
              </li>
            ))}
            {!porCidade.length && <li className="text-muted-foreground">NO_DATA no período.</li>}
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="font-heading text-base font-semibold text-foreground">
            Tendência semanal de leads por origem
          </h3>
          {tendencia.linhas.length ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2">Origem</th>
                    {tendencia.semanas.map((s) => (
                      <th key={s} className="py-2">
                        {s.slice(5)}
                      </th>
                    ))}
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {tendencia.linhas.map((l) => (
                    <tr key={l.origem} className="border-b border-border/60">
                      <td className="py-2 font-medium text-foreground">{l.origem}</td>
                      {l.valores.map((v, i) => (
                        <td key={tendencia.semanas[i]} className="py-2">
                          {v || "—"}
                        </td>
                      ))}
                      <td className="py-2">{l.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">NO_DATA no período.</p>
          )}
        </Card>
      </div>
    </section>
  );
};

export default SegmentacaoGeoPanel;
