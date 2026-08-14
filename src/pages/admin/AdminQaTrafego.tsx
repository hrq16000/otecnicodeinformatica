import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "@/lib/router-compat";
import { Helmet } from "react-helmet";
import { Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { isQaEvent } from "@/lib/qaExclusion";
import { toast } from "sonner";

/**
 * RODADA 6 — AUDITORIA DE TRÁFEGO DE QA / TESTE
 *
 * Mostra, por rota e período, quantos eventos foram classificados como QA e
 * quanto isso representa do total. Cada exclusão relevante pode receber uma
 * justificativa escrita, registrada de forma permanente (somente inserção).
 *
 * Nada é apagado do banco: a exclusão é analítica. Nenhum dado pessoal é lido.
 */

type Evento = {
  created_at: string;
  event_type: string;
  path: string | null;
  session_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

type Justificativa = {
  id: string;
  scope_type: string;
  scope_value: string;
  period_start: string;
  period_end: string;
  qa_events: number;
  total_events: number;
  justification: string;
  created_at: string;
};

const hojeMenos = (dias: number) => {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
};

const pct = (parte: number, total: number) => (total ? Math.round((parte / total) * 1000) / 10 : 0);

const AdminQaTrafego = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<Evento[]>([]);
  const [justificativas, setJustificativas] = useState<Justificativa[]>([]);
  const [loading, setLoading] = useState(false);
  const [inicio, setInicio] = useState(hojeMenos(29));
  const [fim, setFim] = useState(hojeMenos(0));
  const [rotaSelecionada, setRotaSelecionada] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    const [{ data: eventos }, { data: just }] = await Promise.all([
      supabase
        .from("click_events")
        .select("created_at,event_type,path,session_id,utm_source,utm_medium,utm_campaign")
        .gte("created_at", `${inicio}T00:00:00Z`)
        .lte("created_at", `${fim}T23:59:59Z`)
        .order("created_at", { ascending: false })
        .limit(5000),
      supabase
        .from("qa_exclusion_justifications")
        .select("id,scope_type,scope_value,period_start,period_end,qa_events,total_events,justification,created_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);
    setRows((eventos as Evento[]) ?? []);
    setJustificativas((just as Justificativa[]) ?? []);
    setLoading(false);
  }, [isAdmin, inicio, fim]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const analise = useMemo(() => {
    const porRota = new Map<string, { qa: number; total: number; motivos: Set<string> }>();
    let qaTotal = 0;
    for (const r of rows) {
      const rota = r.path || "(sem rota)";
      const linha = porRota.get(rota) ?? { qa: 0, total: 0, motivos: new Set<string>() };
      linha.total += 1;
      if (isQaEvent(r)) {
        linha.qa += 1;
        qaTotal += 1;
        const motivo = r.utm_source
          ? `utm_source=${r.utm_source}`
          : r.utm_medium
            ? `utm_medium=${r.utm_medium}`
            : r.utm_campaign
              ? `utm_campaign=${r.utm_campaign}`
              : "anterior ao baseline comercial";
        linha.motivos.add(motivo);
      }
      porRota.set(rota, linha);
    }
    return {
      qaTotal,
      total: rows.length,
      porRota: [...porRota.entries()]
        .map(([rota, v]) => ({ rota, ...v, proporcao: pct(v.qa, v.total) }))
        .sort((a, b) => b.proporcao - a.proporcao || b.qa - a.qa)
        .slice(0, 60),
    };
  }, [rows]);

  const registrar = useCallback(async () => {
    if (!rotaSelecionada || texto.trim().length < 10) {
      toast.error("Selecione uma rota e escreva uma justificativa com pelo menos 10 caracteres.");
      return;
    }
    const linha = analise.porRota.find((l) => l.rota === rotaSelecionada);
    setSalvando(true);
    const { error } = await supabase.from("qa_exclusion_justifications").insert({
      scope_type: "route",
      scope_value: rotaSelecionada,
      period_start: inicio,
      period_end: fim,
      qa_events: linha?.qa ?? 0,
      total_events: linha?.total ?? 0,
      justification: texto.trim(),
      author_id: session?.user?.id,
    });
    setSalvando(false);
    if (error) {
      toast.error("Não foi possível registrar a justificativa.");
      return;
    }
    toast.success("Justificativa registrada.");
    setTexto("");
    setRotaSelecionada(null);
    void carregar();
  }, [rotaSelecionada, texto, analise.porRota, inicio, fim, session, carregar]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden />
      </div>
    );
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center text-muted-foreground">
        Acesso restrito a administradores.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <Helmet>
        <title>Auditoria de tráfego de QA | Painel interno</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Auditoria de tráfego de QA / teste
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Proporção de eventos excluídos das métricas comerciais por rota e período, com o motivo técnico
          da exclusão e registro permanente das justificativas.
        </p>
      </header>

      <Card className="mb-6 grid gap-3 p-4 md:grid-cols-5">
        <div className="flex gap-1" role="group" aria-label="Período rápido">
          {[7, 30, 90].map((d) => (
            <Button
              key={d}
              size="sm"
              variant={inicio === hojeMenos(d - 1) && fim === hojeMenos(0) ? "default" : "outline"}
              onClick={() => {
                setInicio(hojeMenos(d - 1));
                setFim(hojeMenos(0));
              }}
            >
              {d}d
            </Button>
          ))}
        </div>
        <Input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} aria-label="Data inicial" />
        <Input type="date" value={fim} onChange={(e) => setFim(e.target.value)} aria-label="Data final" />
        <Button onClick={() => void carregar()} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <RefreshCw className="h-4 w-4" aria-hidden />}
          Atualizar
        </Button>
      </Card>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Eventos no período</p>
          <p className="font-heading text-2xl font-bold">{analise.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Eventos classificados como QA</p>
          <p className="font-heading text-2xl font-bold">{analise.qaTotal}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Proporção de QA</p>
          <p className="font-heading text-2xl font-bold">{pct(analise.qaTotal, analise.total)}%</p>
        </Card>
      </div>

      <Card className="mb-6 p-4">
        <h2 className="mb-3 font-heading text-lg font-bold">QA por rota</h2>
        {analise.porRota.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Sem eventos no período.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="py-2 pr-3">Rota</th>
                  <th className="py-2 pr-3 text-right">Total</th>
                  <th className="py-2 pr-3 text-right">QA</th>
                  <th className="py-2 pr-3 text-right">% QA</th>
                  <th className="py-2 pr-3">Motivo da exclusão</th>
                  <th className="py-2 text-right">Justificar</th>
                </tr>
              </thead>
              <tbody>
                {analise.porRota.map((l) => (
                  <tr key={l.rota} className="border-b border-border/60">
                    <td className="max-w-[20rem] truncate py-2 pr-3 font-mono text-xs">{l.rota}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{l.total}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{l.qa}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">
                      {l.proporcao > 0 ? (
                        <Badge variant={l.proporcao >= 50 ? "destructive" : "secondary"}>{l.proporcao}%</Badge>
                      ) : (
                        "0%"
                      )}
                    </td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">
                      {[...l.motivos].join(" · ") || "—"}
                    </td>
                    <td className="py-2 text-right">
                      <Button
                        size="sm"
                        variant={rotaSelecionada === l.rota ? "default" : "outline"}
                        disabled={l.qa === 0}
                        onClick={() => setRotaSelecionada(l.rota)}
                      >
                        Selecionar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="mb-6 p-4">
        <h2 className="mb-1 font-heading text-lg font-bold">Justificar exclusão</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Rota selecionada: <strong>{rotaSelecionada ?? "nenhuma"}</strong> · período {inicio} a {fim}.
          O registro é permanente e não pode ser editado nem apagado.
        </p>
        <Textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ex.: sessões geradas pelo smoke test de mensuração da rodada X, com utm_source=qa."
          aria-label="Justificativa da exclusão"
          rows={3}
        />
        <Button className="mt-3 gap-2" onClick={() => void registrar()} disabled={salvando || !rotaSelecionada}>
          {salvando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ShieldCheck className="h-4 w-4" aria-hidden />}
          Registrar justificativa
        </Button>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 font-heading text-lg font-bold">Justificativas registradas</h2>
        {justificativas.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Nenhuma justificativa registrada ainda.</p>
        ) : (
          <ul className="space-y-2">
            {justificativas.map((j) => (
              <li key={j.id} className="rounded-lg border border-border/60 p-3 text-sm">
                <p className="font-mono text-xs text-muted-foreground">
                  {j.scope_type} · {j.scope_value} · {j.period_start} a {j.period_end} · {j.qa_events}/{j.total_events} eventos
                </p>
                <p className="mt-1">{j.justification}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  );
};

export default AdminQaTrafego;
