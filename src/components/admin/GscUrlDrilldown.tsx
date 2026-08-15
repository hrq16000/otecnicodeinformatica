import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGscUrlDetalhe, type GscUrlDetalhe } from "@/lib/gsc.functions";

/**
 * Drill-down por landing page: métricas do período vs. período anterior,
 * principais consultas e alertas visuais de queda brusca.
 * Nunca inventa zeros — NO_DATA/UNKNOWN aparecem como tal.
 */
const GscUrlDrilldown = ({
  pagina,
  dias,
  onFechar,
}: {
  pagina: string;
  dias: number;
  onFechar: () => void;
}) => {
  const buscar = useServerFn(getGscUrlDetalhe);
  const [dados, setDados] = useState<GscUrlDetalhe | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    setCarregando(true);
    setDados(null);
    void (async () => {
      try {
        const r = await buscar({ data: { pagina, dias } });
        if (vivo) setDados(r);
      } catch {
        if (vivo) setDados(null);
      } finally {
        if (vivo) setCarregando(false);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [buscar, pagina, dias]);

  const delta = (a?: number, b?: number) => {
    if (typeof a !== "number" || typeof b !== "number" || b === 0) return null;
    const v = ((a - b) / b) * 100;
    return `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`;
  };

  return (
    <Card className="mt-4 p-4">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-heading text-base font-semibold text-foreground">Drill-down da URL</h3>
          <p className="truncate text-sm text-muted-foreground" title={pagina}>
            {pagina}
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={onFechar} aria-label="Fechar drill-down">
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </header>

      {carregando && (
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Consultando Search Console…
        </p>
      )}

      {!carregando && dados && dados.status !== "OK" && (
        <p className="mt-3 text-sm text-muted-foreground">
          <Badge variant="outline">{dados.status}</Badge> {dados.motivo ?? "sem dados para esta URL"}
        </p>
      )}

      {!carregando && dados?.status === "OK" && (
        <>
          {dados.alertas.length > 0 && (
            <ul className="mt-3 space-y-1 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
              {dados.alertas.map((a) => (
                <li key={a}>
                  <AlertTriangle className="mr-1 inline h-4 w-4" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {(
              [
                ["Impressões", dados.atual?.impressions, dados.previa?.impressions, (v: number) => v.toLocaleString("pt-BR")],
                ["Cliques", dados.atual?.clicks, dados.previa?.clicks, (v: number) => v.toLocaleString("pt-BR")],
                ["CTR", dados.atual?.ctr, dados.previa?.ctr, (v: number) => `${(v * 100).toFixed(2)}%`],
                ["Posição", dados.atual?.position, dados.previa?.position, (v: number) => v.toFixed(1)],
              ] as [string, number | undefined, number | undefined, (v: number) => string][]
            ).map(([rotulo, atual, previa, fmt]) => (
              <div key={rotulo} className="rounded-lg border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{rotulo}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {typeof atual === "number" ? fmt(atual) : "NO_DATA"}
                </p>
                <p className="text-xs text-muted-foreground">
                  anterior: {typeof previa === "number" ? fmt(previa) : "NO_DATA"}
                  {delta(atual, previa) ? ` · ${delta(atual, previa)}` : ""}
                </p>
              </div>
            ))}
          </div>

          <h4 className="mt-4 text-sm font-medium text-foreground">Principais consultas desta URL</h4>
          <ul className="mt-2 space-y-1 text-sm">
            {dados.consultas.map((q) => (
              <li key={q.chave} className="flex flex-wrap items-center justify-between gap-2">
                <span className="max-w-[60%] truncate text-foreground" title={q.chave}>
                  {q.chave}
                </span>
                <span className="text-xs text-muted-foreground">
                  {q.impressions} impr · {q.clicks} cl · pos {q.position.toFixed(1)}
                </span>
              </li>
            ))}
            {!dados.consultas.length && <li className="text-muted-foreground">NO_DATA</li>}
          </ul>
        </>
      )}
    </Card>
  );
};

export default GscUrlDrilldown;
