import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

/**
 * PERFORMANCE LOCAL POR ROTA DE PROBLEMA (Onda 30).
 *
 * Cruza, por rota de sintoma:
 *   • Search Console (cliques, impressões, CTR, posição) — snapshot gerado
 *     no deploy em public/local-performance.json (fail-closed: sem credencial,
 *     o painel mostra "sem dados", nunca número inventado);
 *   • cliques reais de WhatsApp (tabela click_events, mesma fonte do GA4
 *     first-party) e as origens de UTM que trouxeram esses cliques.
 *
 * Prioridade = impressões altas com posição entre 5 e 20 (páginas a um empurrão
 * da primeira página) ponderadas pela conversão observada.
 */

type Linha = { path: string; clicks: number; impressions: number; ctr: number; position: number };
type Snapshot = { generatedAt?: string; disponivel: boolean; motivo?: string; rotas: Linha[] };
type Evento = { path: string | null; event_type: string; utm_source: string | null };

const AdminPerformanceLocal = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
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
    const desde = new Date(Date.now() - 28 * 864e5).toISOString();
    const { data } = await supabase
      .from("click_events")
      .select("path,event_type,utm_source")
      .gte("created_at", desde)
      .like("path", "/problemas%")
      .limit(5000);
    setEventos((data as Evento[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  const linhas = useMemo(() => {
    const cliquesPorRota = new Map<string, number>();
    const fontes = new Map<string, Set<string>>();
    for (const e of eventos) {
      if (!e.path) continue;
      cliquesPorRota.set(e.path, (cliquesPorRota.get(e.path) ?? 0) + 1);
      if (e.utm_source) fontes.set(e.path, new Set([...(fontes.get(e.path) ?? []), e.utm_source]));
    }
    const rotas = new Map<string, Linha>();
    for (const r of snap?.rotas ?? []) rotas.set(r.path, r);
    for (const path of cliquesPorRota.keys())
      if (!rotas.has(path)) rotas.set(path, { path, clicks: 0, impressions: 0, ctr: 0, position: 0 });

    return [...rotas.values()]
      .map((r) => {
        const wa = cliquesPorRota.get(r.path) ?? 0;
        const quaseLa = r.position >= 5 && r.position <= 20 ? 1 : 0.35;
        const prioridade = Math.round((r.impressions * quaseLa + wa * 25) * 10) / 10;
        return { ...r, wa, utms: [...(fontes.get(r.path) ?? [])], prioridade };
      })
      .sort((a, b) => b.prioridade - a.prioridade);
  }, [snap, eventos]);

  if (authLoading) {
    return (
      <div className="container mx-auto max-w-6xl space-y-4 px-4 py-8">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-64 w-full" />
        <span className="sr-only">Carregando performance local</span>
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

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
              Search Console + cliques reais de WhatsApp (28 dias) por sintoma, ordenado pela chance
              de ganhar posição.
              {snap?.generatedAt ? ` Snapshot de ${new Date(snap.generatedAt).toLocaleString("pt-BR")}.` : ""}
            </p>
          </div>
          <Button variant="outline" onClick={() => void carregar()} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            Atualizar
          </Button>
        </header>

        {snap && !snap.disponivel && (
          <Card className="mt-6 border-amber-500/40 bg-amber-500/5 p-4 text-sm text-amber-700">
            Sem dados do Search Console ({snap.motivo ?? "não configurado"}). Os números de busca
            ficam vazios — apenas os cliques medidos no site são exibidos.
          </Card>
        )}

        {loading && !linhas.length && <Skeleton className="mt-6 h-64 w-full" />}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2">Rota</th>
                <th className="py-2">Impressões</th>
                <th className="py-2">Cliques Google</th>
                <th className="py-2">CTR</th>
                <th className="py-2">Posição</th>
                <th className="py-2">Cliques WhatsApp</th>
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
                  <td className="py-2">{l.wa || "—"}</td>
                  <td className="py-2 text-xs text-muted-foreground">{l.utms.join(", ") || "—"}</td>
                  <td className="py-2">
                    <Badge variant="outline">{l.prioridade}</Badge>
                  </td>
                </tr>
              ))}
              {!linhas.length && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-muted-foreground">
                    Sem dados disponíveis no período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPerformanceLocal;
