import { projetarEventoClique } from "@/lib/realtimeSafeFields";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "@/lib/router-compat";
import { Helmet } from "react-helmet";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { filtrarComerciais } from "@/lib/qaExclusion";

/**
 * PAINEL A/B DAS MENSAGENS DO WHATSAPP EM /problemas (msg_a × msg_b).
 *
 * Lê `click_events` (mesma fonte do GA4 first-party) e compara, POR SINTOMA:
 *  • sessões expostas a cada variante;
 *  • sessões que clicaram em WhatsApp e em ligação;
 *  • taxa de conversão por sessão (não por evento) e o delta B − A.
 *
 * Tempo real: novos cliques entram sem recarregar (Realtime em click_events).
 */

type Evento = {
  created_at: string;
  event_type: string;
  path: string | null;
  servico: string | null;
  variant: string | null;
  session_id: string | null;
  cta_position: string | null;
};

const hojeMenos = (dias: number) => {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
};

const pct = (parte: number, total: number) => (total ? (parte / total) * 100 : 0);
const fmtPct = (v: number) => `${v.toFixed(1)}%`;

/** msg_a / msg_b → a / b. Qualquer outro valor fica fora do experimento. */
const varianteDe = (v: string | null): "a" | "b" | null => {
  if (v === "msg_a" || v === "a") return "a";
  if (v === "msg_b" || v === "b") return "b";
  return null;
};

type Linha = {
  sintoma: string;
  a: { sessoes: number; wa: number; call: number };
  b: { sessoes: number; wa: number; call: number };
};

const AdminExperimentoWa = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [inicio, setInicio] = useState(hojeMenos(29));
  const [fim, setFim] = useState(hojeMenos(0));

  const carregar = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    const { data } = await supabase
      .from("click_events")
      .select("created_at,event_type,path,servico,variant,session_id,cta_position")
      .gte("created_at", `${inicio}T00:00:00Z`)
      .lte("created_at", `${fim}T23:59:59Z`)
      .like("path", "/problemas%")
      .order("created_at", { ascending: false })
      .limit(5000);
    setRows(filtrarComerciais((data as Evento[]) ?? []));
    setLoading(false);
  }, [isAdmin, inicio, fim]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  useEffect(() => {
    if (!isAdmin) return;
    const canal = supabase
      .channel("admin-experimento-wa")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "click_events" },
        (payload) => {
          const novo = projetarEventoClique<Evento>(payload.new);
          if (!novo.path?.startsWith("/problemas")) return;
          const [ok] = filtrarComerciais([novo]);
          if (!ok) return;
          setRows((prev) => [ok, ...prev].slice(0, 5000));
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(canal);
    };
  }, [isAdmin]);

  const linhas = useMemo<Linha[]>(() => {
    const mapa = new Map<
      string,
      Record<"a" | "b", { sessoes: Set<string>; wa: Set<string>; call: Set<string> }>
    >();
    for (const r of rows) {
      const v = varianteDe(r.variant);
      if (!v) continue;
      const sintoma = r.servico || (r.path || "").replace("/problemas/", "") || "hub";
      const sid = r.session_id || r.created_at;
      const atual =
        mapa.get(sintoma) ??
        {
          a: { sessoes: new Set<string>(), wa: new Set<string>(), call: new Set<string>() },
          b: { sessoes: new Set<string>(), wa: new Set<string>(), call: new Set<string>() },
        };
      atual[v].sessoes.add(sid);
      if (r.event_type === "wa_click") atual[v].wa.add(sid);
      if (r.event_type === "call_click") atual[v].call.add(sid);
      mapa.set(sintoma, atual);
    }
    return Array.from(mapa.entries())
      .map(([sintoma, d]) => ({
        sintoma,
        a: { sessoes: d.a.sessoes.size, wa: d.a.wa.size, call: d.a.call.size },
        b: { sessoes: d.b.sessoes.size, wa: d.b.wa.size, call: d.b.call.size },
      }))
      .sort((x, y) => y.a.sessoes + y.b.sessoes - (x.a.sessoes + x.b.sessoes));
  }, [rows]);

  const totais = useMemo(() => {
    const acc = { a: { sessoes: 0, wa: 0, call: 0 }, b: { sessoes: 0, wa: 0, call: 0 } };
    for (const l of linhas) {
      (["a", "b"] as const).forEach((k) => {
        acc[k].sessoes += l[k].sessoes;
        acc[k].wa += l[k].wa;
        acc[k].call += l[k].call;
      });
    }
    return acc;
  }, [linhas]);

  if (authLoading) {
    return (
      <div className="container mx-auto max-w-5xl space-y-4 p-6" role="status" aria-live="polite">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
        <span className="sr-only">Carregando painel do experimento</span>
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  const deltaWa = pct(totais.b.wa, totais.b.sessoes) - pct(totais.a.wa, totais.a.sessoes);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Experimento WhatsApp msg_a × msg_b | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Experimento de mensagem — /problemas
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Comparação msg_a (controle) × msg_b (pede o próximo passo) por sintoma. Taxas por
              sessão, cliques de WhatsApp e ligação. Atualização em tempo real.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs text-muted-foreground">
              Início
              <Input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} className="mt-1" />
            </label>
            <label className="text-xs text-muted-foreground">
              Fim
              <Input type="date" value={fim} onChange={(e) => setFim(e.target.value)} className="mt-1" />
            </label>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">msg_a (controle)</p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">
              {fmtPct(pct(totais.a.wa, totais.a.sessoes))}
            </p>
            <p className="text-xs text-muted-foreground">
              {totais.a.wa} de {totais.a.sessoes} sessões · {totais.a.call} ligações
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">msg_b (desafiante)</p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">
              {fmtPct(pct(totais.b.wa, totais.b.sessoes))}
            </p>
            <p className="text-xs text-muted-foreground">
              {totais.b.wa} de {totais.b.sessoes} sessões · {totais.b.call} ligações
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Delta B − A</p>
            <p
              className={`mt-1 font-heading text-2xl font-bold ${
                deltaWa > 0 ? "text-emerald-500" : deltaWa < 0 ? "text-red-500" : "text-foreground"
              }`}
            >
              {deltaWa > 0 ? "+" : ""}
              {deltaWa.toFixed(1)} p.p.
            </p>
            <p className="text-xs text-muted-foreground">
              {totais.a.sessoes + totais.b.sessoes < 100
                ? "Amostra pequena: decida só com volume maior."
                : "Amostra suficiente para leitura direcional."}
            </p>
          </Card>
        </div>

        <Card className="mt-6 overflow-x-auto p-0">
          {loading && !rows.length ? (
            <div className="space-y-3 p-4" role="status" aria-live="polite">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
              <span className="sr-only">Carregando comparação por sintoma</span>
            </div>
          ) : (
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="p-3">Sintoma</th>
                  <th className="p-3">Sessões A</th>
                  <th className="p-3">WA A</th>
                  <th className="p-3">Taxa A</th>
                  <th className="p-3">Sessões B</th>
                  <th className="p-3">WA B</th>
                  <th className="p-3">Taxa B</th>
                  <th className="p-3">Delta</th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((l) => {
                  const ta = pct(l.a.wa, l.a.sessoes);
                  const tb = pct(l.b.wa, l.b.sessoes);
                  const d = tb - ta;
                  return (
                    <tr key={l.sintoma} className="border-b border-border/60 transition-colors hover:bg-secondary/40">
                      <td className="p-3 font-medium text-foreground">{l.sintoma}</td>
                      <td className="p-3">{l.a.sessoes}</td>
                      <td className="p-3">{l.a.wa}</td>
                      <td className="p-3">{fmtPct(ta)}</td>
                      <td className="p-3">{l.b.sessoes}</td>
                      <td className="p-3">{l.b.wa}</td>
                      <td className="p-3">{fmtPct(tb)}</td>
                      <td className="p-3">
                        <Badge variant={d >= 0 ? "default" : "secondary"}>
                          {d > 0 ? "+" : ""}
                          {d.toFixed(1)} p.p.
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
                {!linhas.length && (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-muted-foreground">
                      Nenhum clique com variante registrada no período.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AdminExperimentoWa;
