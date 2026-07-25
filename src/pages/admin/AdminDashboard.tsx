import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2, RefreshCw, Download, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ClickEvent = {
  id: string;
  created_at: string;
  event_type: "wa_click" | "call_click";
  servico: string | null;
  bairro: string | null;
  cidade: string | null;
  cta_location: string | null;
  modalidade: string | null;
  equipamento: string | null;
  problema: string | null;
  path: string | null;
};

const RANGES: Record<string, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const AdminDashboard = () => {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<ClickEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<keyof typeof RANGES>("30d");

  const fetchData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    const since = new Date();
    since.setDate(since.getDate() - RANGES[range]);
    const { data, error } = await supabase
      .from("click_events")
      .select("*")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false })
      .limit(5000);
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data || []) as ClickEvent[]);
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, range]);

  // Agregações
  const byBairroServico = useMemo(() => {
    const map = new Map<string, { bairro: string; servico: string; wa: number; call: number; total: number }>();
    for (const r of rows) {
      const key = `${r.bairro || "—"}::${r.servico || "—"}`;
      const cur = map.get(key) || { bairro: r.bairro || "—", servico: r.servico || "—", wa: 0, call: 0, total: 0 };
      if (r.event_type === "wa_click") cur.wa++;
      else cur.call++;
      cur.total++;
      map.set(key, cur);
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  }, [rows]);

  const byDay = useMemo(() => {
    const map = new Map<string, { day: string; wa: number; call: number }>();
    for (const r of rows) {
      const day = r.created_at.slice(0, 10);
      const cur = map.get(day) || { day, wa: 0, call: 0 };
      if (r.event_type === "wa_click") cur.wa++;
      else cur.call++;
      map.set(day, cur);
    }
    return [...map.values()].sort((a, b) => a.day.localeCompare(b.day));
  }, [rows]);

  const totals = useMemo(() => {
    const wa = rows.filter(r => r.event_type === "wa_click").length;
    const call = rows.filter(r => r.event_type === "call_click").length;
    return { wa, call, total: rows.length };
  }, [rows]);

  const maxDay = Math.max(1, ...byDay.map(d => d.wa + d.call));

  const exportCsv = () => {
    const cols = ["created_at", "event_type", "servico", "bairro", "cidade", "cta_location", "modalidade", "equipamento", "problema", "path"];
    const csv = [
      cols.join(","),
      ...rows.map(r => cols.map(c => `"${String((r as any)[c] ?? "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `click-events-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Acesso negado</h1>
          <Button variant="outline" onClick={signOut}>Sair</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Dashboard — Admin | Técnico Curitiba</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Dashboard de Conversão</h1>
            <p className="text-xs text-muted-foreground">
              Cliques em WhatsApp e Ligar por bairro e serviço · {totals.total} eventos
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Select value={range} onValueChange={(v) => setRange(v as keyof typeof RANGES)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} className="gap-1">
              <Download className="h-4 w-4" /> CSV
            </Button>
            <Link to="/admin/funnel"><Button variant="outline" size="sm">Leads</Button></Link>
            <Button variant="outline" size="sm" onClick={signOut} className="gap-1">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">Cliques WhatsApp</p>
            <p className="text-3xl font-bold text-accent">{totals.wa}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">Cliques Ligar</p>
            <p className="text-3xl font-bold text-primary">{totals.call}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">Total no período</p>
            <p className="text-3xl font-bold">{totals.total}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-lg border border-border p-4 mb-6">
          <h2 className="font-semibold mb-3">Evolução por dia</h2>
          {byDay.length === 0 && <p className="text-sm text-muted-foreground">Sem eventos no período.</p>}
          <div className="space-y-1">
            {byDay.map(d => {
              const totalDay = d.wa + d.call;
              const waPct = (d.wa / maxDay) * 100;
              const callPct = (d.call / maxDay) * 100;
              return (
                <div key={d.day} className="flex items-center gap-2 text-xs">
                  <span className="w-20 text-muted-foreground">{d.day}</span>
                  <div className="flex-1 flex h-4 rounded overflow-hidden bg-muted">
                    <div className="bg-accent" style={{ width: `${waPct}%` }} title={`WhatsApp: ${d.wa}`} />
                    <div className="bg-primary" style={{ width: `${callPct}%` }} title={`Ligar: ${d.call}`} />
                  </div>
                  <span className="w-12 text-right tabular-nums">{totalDay}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agregado bairro × serviço */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Cliques por bairro × serviço</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted text-xs">
                <tr>
                  <th className="px-3 py-2 text-left">Bairro</th>
                  <th className="px-3 py-2 text-left">Serviço</th>
                  <th className="px-3 py-2 text-right">WhatsApp</th>
                  <th className="px-3 py-2 text-right">Ligar</th>
                  <th className="px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {byBairroServico.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-6 text-muted-foreground">Nenhum evento agregado.</td></tr>
                )}
                {byBairroServico.map(r => (
                  <tr key={`${r.bairro}-${r.servico}`} className="border-t border-border">
                    <td className="px-3 py-2">{r.bairro}</td>
                    <td className="px-3 py-2">{r.servico}</td>
                    <td className="px-3 py-2 text-right text-accent font-medium">{r.wa}</td>
                    <td className="px-3 py-2 text-right text-primary font-medium">{r.call}</td>
                    <td className="px-3 py-2 text-right font-bold">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
