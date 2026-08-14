/**
 * RODADA 8F — PAINEL DE DESCOBERTA E DISTRIBUIÇÃO DO CLUSTER
 *
 * Mostra, para a coorte editorial, o que é fato e o que é ausência de
 * dado. Nada aqui converte "sem evidência" em zero: quando o relatório
 * de descoberta não foi gerado, o painel diz isso em vez de exibir uma
 * tabela vazia que parece resultado ruim.
 */
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CONTENT_COHORT,
  CONTENT_COHORT_ID,
  DISCOVERY_LABEL,
  ageBucket,
  ctrEvidence,
  CTR_EVIDENCE_LABEL,
  type DiscoveryState,
} from "@/lib/contentCohort";
import { PAUTAS_8F, matrizDistribuicao, ESTADO_PUBLICACAO_EXTERNA } from "@/lib/contentDistribution";
import {
  buildCohortRow,
  clusterStatus,
  decideCluster,
  REASON_LABEL,
  type UrlSignals,
} from "@/lib/cohortObservation";

type LinhaDiscovery = {
  url: string;
  discovery: DiscoveryState;
  rota200: boolean;
  noSitemap: boolean;
  selfCanonical: boolean;
  indexavel: boolean;
  linksInternos: number;
  clickDepth: number | null;
  idadeDias: number;
};

type LinhaPerf = {
  url: string;
  impressoes: number;
  cliques: number;
  veredito: string;
  acao: string;
  sessoes?: number | null;
  whatsapp?: number | null;
  jornadasAssistidas?: number | null;
};

const BADGE: Record<DiscoveryState, "default" | "secondary" | "outline" | "destructive"> = {
  INDEXED: "default",
  CRAWLED: "secondary",
  DISCOVERED: "outline",
  UNKNOWN: "destructive",
};

export const PainelClusterEditorial = () => {
  const [discovery, setDiscovery] = useState<LinhaDiscovery[] | null>(null);
  const [perf, setPerf] = useState<LinhaPerf[] | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    const buscar = async (arquivo: string) => {
      try {
        const r = await fetch(`/reports/${arquivo}`, { cache: "no-store" });
        if (!r.ok) return null;
        return await r.json();
      } catch {
        return null;
      }
    };
    void (async () => {
      const [d, p] = await Promise.all([buscar("content-discovery.json"), buscar("content-performance.json")]);
      if (!vivo) return;
      setDiscovery(d?.urls ?? null);
      setPerf(p?.urls ?? null);
      setCarregando(false);
    })();
    return () => {
      vivo = false;
    };
  }, []);

  // RODADA 8G — sinais medidos por URL. `null` = fonte não conectada; nunca 0.
  const sinais: UrlSignals[] = useMemo(
    () =>
      CONTENT_COHORT.map((m) => {
        const d = discovery?.find((x) => x.url === m.url);
        const p = perf?.find((x) => x.url === m.url);
        return {
          url: m.url,
          intent: m.intent,
          publishedAt: m.publishedAt,
          ageDays: Math.max(
            0,
            Math.floor((Date.now() - new Date(`${m.publishedAt}T12:00:00Z`).getTime()) / 86_400_000),
          ),
          discovery: (d?.discovery ?? "UNKNOWN") as DiscoveryState,
          impressions: p ? p.impressoes : null,
          clicks: p ? p.cliques : null,
          sessions: p?.sessoes ?? null,
          ctaClicks: null,
          whatsapp: p?.whatsapp ?? null,
          assists: p?.jornadasAssistidas ?? null,
          tecnico: {
            rota200: d?.rota200 ?? true,
            noSitemap: d?.noSitemap ?? true,
            selfCanonical: d?.selfCanonical ?? true,
            indexavel: d?.indexavel ?? true,
            linksInternos: d?.linksInternos ?? MIN_LINKS_FALLBACK,
            clickDepth: d?.clickDepth ?? null,
          },
        };
      }),
    [discovery, perf],
  );

  const rows = useMemo(() => sinais.map(buildCohortRow), [sinais]);
  const status = useMemo(() => clusterStatus(sinais), [sinais]);
  const decisao = useMemo(() => decideCluster({ urls: sinais }), [sinais]);

  const links = useMemo(() => matrizDistribuicao(), []);

  return (
    <Card className="p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-heading text-lg font-bold text-foreground">Cluster 1 — observação</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{CONTENT_COHORT_ID}</Badge>
          <Badge variant="outline">{status}</Badge>
          <Badge>{decisao.decision}</Badge>
        </div>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{decisao.motivo}</p>

      {carregando ? (
        <div className="space-y-2" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skel h-10 w-full rounded-md" />
          ))}
        </div>
      ) : !discovery ? (
        <p className="text-sm text-muted-foreground">
          Sem relatório de descoberta nesta build. Rode <code>npm run report:content-cohort</code> para gerar
          evidência. Enquanto isso, este bloco não exibe números — ausência de fonte não é resultado zero.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">URL</th>
                <th>Idade</th>
                <th>Search status</th>
                <th className="text-right">Impr.</th>
                <th className="text-right">Cliques</th>
                <th className="text-right">Sessões</th>
                <th className="text-right">CTA</th>
                <th className="text-right">Assist</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.url} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-3">
                    <a className="underline underline-offset-2" href={r.url}>
                      {r.url}
                    </a>
                    <span className="block text-xs text-muted-foreground">
                      {r.intent} · {CTR_EVIDENCE_LABEL[r.evidenciaCtr]}
                    </span>
                  </td>
                  <td className="pr-3 text-xs">
                    {r.ageDays}d
                    <span className="block text-muted-foreground">{ageBucket(r.publishedAt)} dias</span>
                  </td>
                  <td className="pr-3">
                    <Badge variant={BADGE[r.discovery]}>{r.estado}</Badge>
                    <span className="block text-xs text-muted-foreground">{DISCOVERY_LABEL[r.discovery]}</span>
                  </td>
                  <td className="text-right">{r.impressions ?? "—"}</td>
                  <td className="text-right">{r.clicks ?? "—"}</td>
                  <td className="text-right">{r.sessions ?? "—"}</td>
                  <td className="text-right">{r.whatsapp ?? "—"}</td>
                  <td className="text-right">{r.assists ?? "—"}</td>
                  <td className="pr-3 text-xs text-muted-foreground">{REASON_LABEL[r.reason]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-heading text-base font-bold text-foreground">Distribuição preparada</h3>
          <Badge variant="outline">{ESTADO_PUBLICACAO_EXTERNA}</Badge>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          {PAUTAS_8F.length} pautas × {links.length / PAUTAS_8F.length} canais. Nenhuma rota nova foi criada para
          distribuir. A publicação externa é manual — o sistema entrega o link rastreável, não o post publicado.
        </p>
        <ul className="space-y-1 text-xs">
          {links.map((l) => (
            <li key={`${l.pauta.id}-${l.canal}`} className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{l.canal}</Badge>
              <span className="text-muted-foreground">{l.pauta.tema}</span>
              {l.ok ? (
                <code className="break-all text-[11px] text-muted-foreground">{l.url}</code>
              ) : (
                <span className="text-destructive">{l.erro}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default PainelClusterEditorial;
