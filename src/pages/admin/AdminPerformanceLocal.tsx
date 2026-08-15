import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "@/lib/router-compat";
import { Helmet } from "react-helmet";
import { ArrowDownRight, ArrowUpRight, Download, Loader2, Minus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";
import GscPanel from "@/components/admin/GscPanel";
import SegmentacaoGeoPanel from "@/components/admin/SegmentacaoGeoPanel";


/**
 * PERFORMANCE LOCAL POR ROTA DE PROBLEMA (Onda 30 + tendências da Onda 31).
 *
 * Cruza Search Console (snapshot fail-closed em public/local-performance.json)
 * com os cliques reais de WhatsApp de click_events, comparando os últimos 28
 * dias com os 28 anteriores para ranquear quedas e subidas, e gera
 * recomendações do que editar primeiro em cada rota de sintoma.
 */

type Linha = { path: string; clicks: number; impressions: number; ctr: number; position: number };
type Snapshot = {
  generatedAt?: string;
  disponivel: boolean;
  motivo?: string;
  rotas: Linha[];
  rotasAnterior?: Linha[];
};
type Evento = { path: string | null; event_type: string; utm_source: string | null; created_at: string };

const pct = (atual: number, anterior: number) => {
  if (!anterior) return atual ? 100 : 0;
  return Math.round(((atual - anterior) / anterior) * 1000) / 10;
};

const AdminPerformanceLocal = () => {
  const { loading: authLoading, session, isRevisor } = useAdminRoles();
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/local-performance.json?t=${Date.now()}`, { cache: "no-store" });
      setSnap(res.ok ? ((await res.json()) as Snapshot) : { disponivel: false, motivo: "snapshot ausente", rotas: [] });
    } catch {
      setSnap({ disponivel: false, motivo: "snapshot ausente", rotas: [] });
    }
    const desde = new Date(Date.now() - 56 * 864e5).toISOString();
    const { data } = await supabase
      .from("click_events")
      .select("path,event_type,utm_source,created_at")
      .gte("created_at", desde)
      .like("path", "/problemas%")
      .limit(10000);
    setEventos((data as Evento[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isRevisor) void carregar();
  }, [isRevisor, carregar]);

  const linhas = useMemo(() => {
    const corte = Date.now() - 28 * 864e5;
    const atual = new Map<string, number>();
    const anterior = new Map<string, number>();
    const fontes = new Map<string, Set<string>>();
    for (const e of eventos) {
      if (!e.path) continue;
      const alvo = new Date(e.created_at).getTime() >= corte ? atual : anterior;
      alvo.set(e.path, (alvo.get(e.path) ?? 0) + 1);
      if (e.utm_source) fontes.set(e.path, new Set([...(fontes.get(e.path) ?? []), e.utm_source]));
    }

    const antSc = new Map<string, Linha>();
    for (const r of snap?.rotasAnterior ?? []) antSc.set(r.path, r);

    const rotas = new Map<string, Linha>();
    for (const r of snap?.rotas ?? []) rotas.set(r.path, r);
    for (const path of [...atual.keys(), ...anterior.keys()])
      if (!rotas.has(path)) rotas.set(path, { path, clicks: 0, impressions: 0, ctr: 0, position: 0 });

    return [...rotas.values()]
      .map((r) => {
        const wa = atual.get(r.path) ?? 0;
        const waAnt = anterior.get(r.path) ?? 0;
        const ant = antSc.get(r.path);
        const varWa = pct(wa, waAnt);
        const varImp = ant ? pct(r.impressions, ant.impressions) : null;
        const varCliques = ant ? pct(r.clicks, ant.clicks) : null;
        const quaseLa = r.position >= 5 && r.position <= 20 ? 1 : 0.35;
        const prioridade = Math.round((r.impressions * quaseLa + wa * 25) * 10) / 10;

        const recomendacoes: string[] = [];
        if (r.position >= 5 && r.position <= 20 && r.impressions > 0)
          recomendacoes.push("Está na faixa 5–20: reforce H2 com a intenção exata e amplie a FAQ com 2 perguntas novas.");
        if (r.impressions > 0 && r.ctr < 0.02)
          recomendacoes.push("CTR abaixo de 2%: reescreva title e meta description com sintoma + cidade + prazo real.");
        if (r.impressions > 30 && wa === 0)
          recomendacoes.push("Tráfego sem conversão: suba o CTA de WhatsApp acima da dobra e contextualize a mensagem pré-preenchida.");
        if (varWa <= -30 && waAnt > 0)
          recomendacoes.push("Queda de cliques de WhatsApp: revise o bloco de CTA e teste a outra variante do A/B.");
        if (varImp !== null && varImp <= -20)
          recomendacoes.push("Queda de impressões: atualize o conteúdo com novos casos e reenvie a URL para indexação.");
        if (r.position > 20 && r.impressions > 0)
          recomendacoes.push("Fora da faixa competitiva: adicione foto real com ImageObject e links internos do cluster.");
        if (!recomendacoes.length) recomendacoes.push("Sem sinal de perda — manter e monitorar.");

        return {
          ...r,
          wa,
          waAnt,
          varWa,
          varImp,
          varCliques,
          utms: [...(fontes.get(r.path) ?? [])],
          prioridade,
          recomendacoes,
        };
      })
      .sort((a, b) => b.prioridade - a.prioridade);
  }, [snap, eventos]);

  const quedas = useMemo(() => [...linhas].filter((l) => l.varWa < 0 || (l.varImp ?? 0) < 0).sort((a, b) => a.varWa - b.varWa).slice(0, 5), [linhas]);
  const subidas = useMemo(() => [...linhas].filter((l) => l.varWa > 0 || (l.varImp ?? 0) > 0).sort((a, b) => b.varWa - a.varWa).slice(0, 5), [linhas]);

  const exportLinhas = useMemo(
    () =>
      linhas.map((l) => ({
        rota: l.path,
        impressoes: l.impressions,
        cliquesGoogle: l.clicks,
        ctr: l.ctr,
        posicao: l.position,
        cliquesWhatsapp: l.wa,
        cliquesWhatsappAnteriores: l.waAnt,
        variacaoWhatsappPct: l.varWa,
        variacaoImpressoesPct: l.varImp ?? "",
        prioridade: l.prioridade,
        recomendacoes: l.recomendacoes.join(" | "),
      })),
    [linhas],
  );

  const Tendencia = ({ valor }: { valor: number | null }) => {
    if (valor === null) return <span className="text-muted-foreground">—</span>;
    const Icone = valor > 0 ? ArrowUpRight : valor < 0 ? ArrowDownRight : Minus;
    const cor = valor > 0 ? "text-primary" : valor < 0 ? "text-destructive" : "text-muted-foreground";
    return (
      <span className={`inline-flex items-center gap-1 ${cor}`}>
        <Icone className="h-3.5 w-3.5" aria-hidden="true" />
        {valor > 0 ? "+" : ""}
        {valor}%
      </span>
    );
  };

  if (authLoading) {
    return (
      <div className="container mx-auto max-w-6xl space-y-4 px-4 py-8">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-64 w-full" />
        <span className="sr-only">Carregando performance local</span>
      </div>
    );
  }
  if (!session || !isRevisor) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Performance local por rota | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Performance local por rota de problema</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Search Console + cliques de WhatsApp (28 dias vs. 28 anteriores), com ranking de
              tendência e o que editar primeiro em cada rota.
              {snap?.generatedAt ? ` Snapshot de ${new Date(snap.generatedAt).toLocaleString("pt-BR")}.` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => exportarCsv("performance-local", exportLinhas)}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              CSV
            </Button>
            <Button variant="outline" onClick={() => exportarJson("performance-local", { snapshot: snap, linhas })}>
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              JSON
            </Button>
            <Button variant="outline" onClick={() => void carregar()} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              Atualizar
            </Button>
          </div>
        </header>

        {snap && !snap.disponivel && (
          <Card className="mt-6 border-amber-500/40 bg-amber-500/5 p-4 text-sm text-amber-700">
            Sem dados do Search Console ({snap.motivo ?? "não configurado"}). Os números de busca
            ficam vazios — apenas os cliques medidos no site são exibidos.
          </Card>
        )}

        {loading && !linhas.length && <Skeleton className="mt-6 h-64 w-full" />}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">Maiores quedas</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {quedas.map((l) => (
                <li key={l.path} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-foreground">{l.path}</span>
                  <span className="text-xs">
                    WhatsApp <Tendencia valor={l.varWa} /> · impressões <Tendencia valor={l.varImp} />
                  </span>
                </li>
              ))}
              {!quedas.length && <li className="text-muted-foreground">Nenhuma queda no período.</li>}
            </ul>
          </Card>
          <Card className="p-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">Maiores subidas</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {subidas.map((l) => (
                <li key={l.path} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-foreground">{l.path}</span>
                  <span className="text-xs">
                    WhatsApp <Tendencia valor={l.varWa} /> · impressões <Tendencia valor={l.varImp} />
                  </span>
                </li>
              ))}
              {!subidas.length && <li className="text-muted-foreground">Nenhuma subida no período.</li>}
            </ul>
          </Card>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2">Rota</th>
                <th className="py-2">Impressões</th>
                <th className="py-2">Cliques Google</th>
                <th className="py-2">CTR</th>
                <th className="py-2">Posição</th>
                <th className="py-2">WhatsApp (28d)</th>
                <th className="py-2">Tendência</th>
                <th className="py-2">UTMs</th>
                <th className="py-2">Prioridade</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((l) => (
                <tr key={l.path} className="border-b border-border/60">
                  <td className="py-2 font-medium text-foreground">{l.path}</td>
                  <td className="py-2">{l.impressions || "—"}</td>
                  <td className="py-2">{l.clicks || "—"}</td>
                  <td className="py-2">{l.ctr ? `${(l.ctr * 100).toFixed(1)}%` : "—"}</td>
                  <td className="py-2">{l.position ? l.position.toFixed(1) : "—"}</td>
                  <td className="py-2">
                    {l.wa || "—"} <span className="text-xs text-muted-foreground">(antes {l.waAnt})</span>
                  </td>
                  <td className="py-2 text-xs">
                    <Tendencia valor={l.varWa} />
                  </td>
                  <td className="py-2 text-xs text-muted-foreground">{l.utms.join(", ") || "—"}</td>
                  <td className="py-2">
                    <Badge variant="outline">{l.prioridade}</Badge>
                  </td>
                </tr>
              ))}
              {!linhas.length && (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-muted-foreground">
                    Sem dados disponíveis no período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">O que editar primeiro</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {linhas.slice(0, 6).map((l) => (
              <Card key={l.path} className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium text-foreground">{l.path}</h3>
                  <Badge variant="outline">prioridade {l.prioridade}</Badge>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {l.recomendacoes.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Card>
            ))}
            {!linhas.length && <p className="text-sm text-muted-foreground">Sem rotas para recomendar ainda.</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPerformanceLocal;
