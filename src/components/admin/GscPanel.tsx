import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Loader2, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getGscSnapshot, type GscSnapshot } from "@/lib/gsc.functions";
import { exportarCsv, exportarPdf } from "@/lib/exportarRelatorio";
import GscUrlDrilldown from "@/components/admin/GscUrlDrilldown";


/**
 * SEARCH CONSOLE (performance real do site) + alertas da auditoria de SEO.
 *
 * Integra-se ao painel existente /admin/performance-local — sem ecossistema
 * paralelo. Nunca inventa zeros: NO_DATA e UNKNOWN são exibidos como tal.
 * Semrush/AnswerThePublic (demanda de mercado) NÃO entram aqui.
 */

type AuditoriaItem = { rota: string; msg: string };
type Auditoria = {
  geradoEm?: string;
  indexacaoLiberada?: boolean;
  rotasAuditadas?: number;
  erros: AuditoriaItem[];
  avisos: AuditoriaItem[];
};

const PERIODOS = [7, 28, 90] as const;

const num = (v: number | undefined | null) => (typeof v === "number" ? v.toLocaleString("pt-BR") : "—");

const StatusBadge = ({ status }: { status: GscSnapshot["status"] }) => {
  const map = {
    OK: { label: "dados reais", variant: "default" as const },
    NO_DATA: { label: "NO_DATA", variant: "secondary" as const },
    UNKNOWN: { label: "UNKNOWN", variant: "outline" as const },
  };
  const cfg = map[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
};

const GscPanel = () => {
  const buscar = useServerFn(getGscSnapshot);
  const [dias, setDias] = useState<(typeof PERIODOS)[number]>(28);
  const [snap, setSnap] = useState<GscSnapshot | null>(null);
  const [auditoria, setAuditoria] = useState<Auditoria | null>(null);
  const [loading, setLoading] = useState(false);
  const [paginaSel, setPaginaSel] = useState<string | null>(null);


  const carregar = useCallback(
    async (periodo: number) => {
      setLoading(true);
      try {
        setSnap(await buscar({ data: { dias: periodo } }));
      } catch (e) {
        setSnap({
          status: "UNKNOWN",
          motivo: (e as Error).message,
          propriedade: null,
          periodo: null,
          totais: null,
          paginas: [],
          consultas: [],
          paises: [],
          dispositivos: [],
          geradoEm: new Date().toISOString(),
        });
      }
      setLoading(false);
    },
    [buscar],
  );

  useEffect(() => {
    void carregar(dias);
  }, [carregar, dias]);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(`/seo-audit.json?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) setAuditoria((await res.json()) as Auditoria);
      } catch {
        /* auditoria indisponível — nada a exibir */
      }
    })();
  }, []);

  const paginas = useMemo(() => (snap?.paginas ?? []).slice(0, 25), [snap]);
  const consultas = useMemo(() => (snap?.consultas ?? []).slice(0, 25), [snap]);

  return (
    <section className="mt-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Search Console — performance real do site
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Leitura direta da API (somente leitura). Sem dados, exibimos NO_DATA/UNKNOWN — nunca
            zeros inventados. Demanda de mercado (Semrush/AnswerThePublic) é outra camada.
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
        </div>
      </header>

      {loading && !snap && <Skeleton className="mt-4 h-40 w-full" />}

      {snap && (
        <>
          <Card className="mt-4 p-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <StatusBadge status={snap.status} />
              <span className="text-foreground">{snap.propriedade ?? "propriedade não resolvida"}</span>
              {snap.periodo && (
                <span className="text-muted-foreground">
                  {snap.periodo.inicio} → {snap.periodo.fim}
                </span>
              )}
              {snap.motivo && <span className="text-muted-foreground">· {snap.motivo}</span>}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                ["Impressões", snap.totais ? num(snap.totais.impressions) : snap.status],
                ["Cliques", snap.totais ? num(snap.totais.clicks) : snap.status],
                ["CTR", snap.totais ? `${(snap.totais.ctr * 100).toFixed(2)}%` : snap.status],
                ["Posição média", snap.totais ? snap.totais.position.toFixed(1) : snap.status],
              ].map(([rotulo, valor]) => (
                <div key={rotulo} className="rounded-lg border border-border p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{rotulo}</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{valor}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Páginas com dados: {snap.paginas.length || "NO_DATA"} · consultas com dados:{" "}
              {snap.consultas.length || "NO_DATA"} · países: {snap.paises.length || "NO_DATA"} ·
              dispositivos: {snap.dispositivos.length || "NO_DATA"}
            </p>
            {snap.status === "OK" && (
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    exportarCsv(
                      "search-console-paginas",
                      snap.paginas.map((p) => ({
                        pagina: p.chave,
                        impressoes: p.impressions,
                        cliques: p.clicks,
                        ctr: p.ctr,
                        posicao: p.position,
                      })),
                    )
                  }
                >
                  Exportar páginas (CSV)
                </Button>
              </div>
            )}
          </Card>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <h3 className="font-heading text-base font-semibold text-foreground">
                Landing pages com dados de busca
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {paginas.map((p) => (
                  <li key={p.chave}>
                    <button
                      type="button"
                      onClick={() => setPaginaSel(p.chave === paginaSel ? null : p.chave)}
                      className="flex w-full flex-wrap items-center justify-between gap-2 rounded-md px-1 py-1 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-pressed={p.chave === paginaSel}
                    >
                      <span className="max-w-[60%] truncate text-foreground" title={p.chave}>
                        {p.chave}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {p.impressions} impr · {p.clicks} cl · pos {p.position.toFixed(1)}
                      </span>
                    </button>
                  </li>
                ))}

                {!paginas.length && (
                  <li className="text-muted-foreground">{snap.status === "OK" ? "NO_DATA" : snap.status}</li>
                )}
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-heading text-base font-semibold text-foreground">
                <Search className="mr-1 inline h-4 w-4" aria-hidden="true" />
                Consultas com dados
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {consultas.map((q) => (
                  <li key={q.chave} className="flex flex-wrap items-center justify-between gap-2">
                    <span className="max-w-[60%] truncate text-foreground" title={q.chave}>
                      {q.chave}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {q.impressions} impr · {q.clicks} cl · pos {q.position.toFixed(1)}
                    </span>
                  </li>
                ))}
                {!consultas.length && (
                  <li className="text-muted-foreground">{snap.status === "OK" ? "NO_DATA" : snap.status}</li>
                )}
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-heading text-base font-semibold text-foreground">País</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {snap.paises.slice(0, 10).map((c) => (
                  <li key={c.chave} className="flex items-center justify-between gap-2">
                    <span className="uppercase text-foreground">{c.chave}</span>
                    <span className="text-xs text-muted-foreground">
                      {c.impressions} impr · {c.clicks} cl
                    </span>
                  </li>
                ))}
                {!snap.paises.length && <li className="text-muted-foreground">NO_DATA</li>}
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-heading text-base font-semibold text-foreground">Dispositivo</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {snap.dispositivos.map((d) => (
                  <li key={d.chave} className="flex items-center justify-between gap-2">
                    <span className="text-foreground">{d.chave}</span>
                    <span className="text-xs text-muted-foreground">
                      {d.impressions} impr · {d.clicks} cl
                    </span>
                  </li>
                ))}
                {!snap.dispositivos.length && <li className="text-muted-foreground">NO_DATA</li>}
              </ul>
            </Card>
          </div>
        </>
      )}

      <Card className="mt-4 p-4">
        <h3 className="font-heading text-base font-semibold text-foreground">
          <AlertTriangle className="mr-1 inline h-4 w-4" aria-hidden="true" />
          Alertas da auditoria de SEO (noindex, títulos longos, OG inválido)
        </h3>
        {!auditoria && (
          <p className="mt-2 text-sm text-muted-foreground">
            Auditoria indisponível neste ambiente (gere com <code>npm run audit:seo</code>).
          </p>
        )}
        {auditoria && (
          <>
            <p className="mt-2 text-xs text-muted-foreground">
              {auditoria.rotasAuditadas ?? "—"} rotas auditadas ·{" "}
              {auditoria.indexacaoLiberada ? "indexação liberada" : "indexação BLOQUEADA"} ·{" "}
              {auditoria.geradoEm ? new Date(auditoria.geradoEm).toLocaleString("pt-BR") : "—"}
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-destructive">Erros ({auditoria.erros.length})</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {auditoria.erros.slice(0, 20).map((e) => (
                    <li key={`${e.rota}${e.msg}`}>
                      <span className="text-foreground">{e.rota}</span> — {e.msg}
                    </li>
                  ))}
                  {!auditoria.erros.length && <li>Nenhum erro bloqueante.</li>}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Avisos ({auditoria.avisos.length})</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {auditoria.avisos.slice(0, 20).map((a) => (
                    <li key={`${a.rota}${a.msg}`}>
                      <span className="text-foreground">{a.rota}</span> — {a.msg}
                    </li>
                  ))}
                  {!auditoria.avisos.length && <li>Sem avisos.</li>}
                </ul>
              </div>
            </div>
          </>
        )}
      </Card>
    </section>
  );
};

export default GscPanel;
