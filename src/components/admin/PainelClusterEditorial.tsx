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
import { Button } from "@/components/ui/button";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";
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
  MIN_INBOUND_LINKS,
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

/** Comparação entre a última execução do relatório e a anterior. */
type ComparacaoUrl = {
  url: string;
  estadoAnterior: string | null;
  estado: string;
  estadoMudou: boolean;
  reasonAnterior: string | null;
  reason: string;
  reasonMudou: boolean;
  deltaImpressoes: number | null;
  deltaCliques: number | null;
  deltaSessoes: number | null;
};

type Coorte = {
  resumo?: Record<string, unknown>;
  linhas?: Array<Record<string, unknown>>;
  timeline?: Record<string, string>;
  comparacao?: {
    geradoEmAnterior: string | null;
    statusAnterior: string | null;
    decisaoAnterior: string | null;
    statusMudou: boolean;
    milestonesNovos: string[];
    urls: ComparacaoUrl[];
  } | null;
};

const BADGE: Record<DiscoveryState, "default" | "secondary" | "outline" | "destructive"> = {
  INDEXED: "default",
  CRAWLED: "secondary",
  DISCOVERED: "outline",
  UNKNOWN: "destructive",
};

const delta = (n: number | null) => (n == null ? "—" : n > 0 ? `+${n}` : String(n));

export const PainelClusterEditorial = () => {
  const [discovery, setDiscovery] = useState<LinhaDiscovery[] | null>(null);
  const [perf, setPerf] = useState<LinhaPerf[] | null>(null);
  const [coorte, setCoorte] = useState<Coorte | null>(null);
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
      const [d, p, c] = await Promise.all([
        buscar("content-discovery.json"),
        buscar("content-performance.json"),
        buscar("content-cohort.json"),
      ]);
      if (!vivo) return;
      setDiscovery(d?.urls ?? null);
      setPerf(p?.urls ?? null);
      setCoorte(c ?? null);
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
            linksInternos: d?.linksInternos ?? MIN_INBOUND_LINKS,
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
  const comparacao = coorte?.comparacao ?? null;

  const linhasExport = useMemo(
    () =>
      rows.map((r) => ({
        url: r.url,
        intencao: r.intent,
        publicadoEm: r.publishedAt,
        idadeDias: r.ageDays,
        estado: r.estado,
        discovery: r.discovery,
        reason: r.reason,
        impressoes: r.impressions ?? "",
        cliques: r.clicks ?? "",
        sessoes: r.sessions ?? "",
        whatsapp: r.whatsapp ?? "",
        assist: r.assists ?? "",
      })),
    [rows],
  );

  const exportarPdf = async () => {
    const [{ jsPDF }, { default: autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.text(`Cluster 1 — observação (${CONTENT_COHORT_ID})`, 14, 16);
    doc.setFontSize(10);
    doc.text(`Status ${status} · decisão ${decisao.decision}`, 14, 23);
    autoTable(doc, {
      startY: 28,
      head: [["URL", "Idade", "Estado", "Reason", "Impr.", "Cliques", "Sessões", "WhatsApp", "Assist"]],
      body: rows.map((r) => [
        r.url,
        `${r.ageDays}d`,
        r.estado,
        r.reason,
        r.impressions ?? "—",
        r.clicks ?? "—",
        r.sessions ?? "—",
        r.whatsapp ?? "—",
        r.assists ?? "—",
      ]),
      styles: { fontSize: 8 },
    });
    doc.save(`cluster-1-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

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

      <div className="mb-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => exportarCsv("cluster-1", linhasExport)}>
          Exportar CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => void exportarPdf()}>
          Exportar PDF
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            exportarJson("cluster-1", coorte ?? { resumo: { status, decisao: decisao.decision }, linhas: rows })
          }
        >
          Exportar JSON
        </Button>
      </div>

      {comparacao ? (
        <div className="mb-4 rounded-lg border border-border p-3">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-sm font-bold text-foreground">Comparação com a execução anterior</h3>
            {comparacao.statusMudou ? (
              <Badge>
                {comparacao.statusAnterior ?? "—"} → {status}
              </Badge>
            ) : (
              <Badge variant="outline">Status estável</Badge>
            )}
            {comparacao.milestonesNovos?.length ? (
              <Badge variant="secondary">Novos milestones: {comparacao.milestonesNovos.join(", ")}</Badge>
            ) : null}
          </div>
          <ul className="space-y-1 text-xs">
            {comparacao.urls.map((c) => (
              <li key={c.url} className="flex flex-wrap items-center gap-2">
                <code className="text-[11px]">{c.url}</code>
                {c.estadoMudou ? (
                  <Badge variant="default">
                    {c.estadoAnterior} → {c.estado}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">sem transição de estado</span>
                )}
                {c.reasonMudou ? (
                  <Badge variant="secondary">
                    {c.reasonAnterior} → {c.reason}
                  </Badge>
                ) : null}
                <span className="text-muted-foreground">
                  Δ impr. {delta(c.deltaImpressoes)} · Δ cliques {delta(c.deltaCliques)} · Δ sessões{" "}
                  {delta(c.deltaSessoes)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}


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
