// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { readVitalsHistory, clearVitalsHistory, type WebVitalEntry } from "@/lib/webVitals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


const METRICS = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;

const ratingColor: Record<string, string> = {
  good: "text-emerald-500",
  "needs-improvement": "text-amber-500",
  poor: "text-red-500",
};

const fmt = (m: WebVitalEntry) =>
  m.name === "CLS" ? m.value.toFixed(3) : `${Math.round(m.value)}ms`;

const p75 = (values: number[]) => {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.floor(s.length * 0.75)] ?? s[s.length - 1];
};

export default function AdminVitals() {
  const [entries, setEntries] = useState<WebVitalEntry[]>([]);
  const [filterPath, setFilterPath] = useState<string>("");

  useEffect(() => {
    setEntries(readVitalsHistory());
    const onVital = () => setEntries(readVitalsHistory());
    window.addEventListener("web-vital", onVital);
    const id = window.setInterval(onVital, 4000);
    return () => {
      window.removeEventListener("web-vital", onVital);
      window.clearInterval(id);
    };
  }, []);

  const paths = useMemo(
    () => Array.from(new Set(entries.map((e) => e.path))).sort(),
    [entries],
  );

  const filtered = filterPath
    ? entries.filter((e) => e.path === filterPath)
    : entries;

  const byMetric = METRICS.map((m) => {
    const vals = filtered.filter((e) => e.name === m);
    return {
      name: m,
      count: vals.length,
      p75: p75(vals.map((v) => v.value)),
      last: vals[vals.length - 1],
    };
  });

  const perPage = useMemo(() => {
    const map: Record<string, Record<string, number[]>> = {};
    for (const e of entries) {
      map[e.path] ??= {};
      map[e.path][e.name] ??= [];
      map[e.path][e.name].push(e.value);
    }
    return Object.entries(map).map(([path, m]) => ({
      path,
      LCP: p75(m.LCP || []),
      INP: p75(m.INP || []),
      CLS: p75(m.CLS || []),
      samples: Object.values(m).reduce((a, b) => a + b.length, 0),
    }));
  }, [entries]);

  useEffect(() => {
    document.title = "Painel Web Vitals — Admin";
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex,nofollow");
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Web Vitals — histórico local</h1>
            <p className="text-sm text-muted-foreground">
              Últimas {entries.length} medições deste navegador. Também enviadas ao GA4 como eventos.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border bg-background px-3 py-2 text-sm"
              value={filterPath}
              onChange={(e) => setFilterPath(e.target.value)}
            >
              <option value="">Todas as páginas</option>
              {paths.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Button variant="outline" size="sm" onClick={() => { clearVitalsHistory(); setEntries([]); }}>
              Limpar histórico
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {byMetric.map((m) => (
            <Card key={m.name} className="p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {m.name} (p75)
              </div>
              <div className={`mt-1 text-2xl font-bold ${m.last ? ratingColor[m.last.rating] ?? "" : ""}`}>
                {m.count
                  ? m.name === "CLS"
                    ? m.p75.toFixed(3)
                    : `${Math.round(m.p75)}ms`
                  : "—"}
              </div>
              <div className="text-xs text-muted-foreground">{m.count} amostras</div>
            </Card>
          ))}
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Resumo por página (p75)</h2>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-3 py-2">Página</th>
                  <th className="px-3 py-2">LCP</th>
                  <th className="px-3 py-2">INP</th>
                  <th className="px-3 py-2">CLS</th>
                  <th className="px-3 py-2">Amostras</th>
                </tr>
              </thead>
              <tbody>
                {perPage.map((r) => (
                  <tr key={r.path} className="border-t">
                    <td className="px-3 py-2 font-mono text-xs">{r.path}</td>
                    <td className="px-3 py-2">{r.LCP ? `${Math.round(r.LCP)}ms` : "—"}</td>
                    <td className="px-3 py-2">{r.INP ? `${Math.round(r.INP)}ms` : "—"}</td>
                    <td className="px-3 py-2">{r.CLS ? r.CLS.toFixed(3) : "—"}</td>
                    <td className="px-3 py-2">{r.samples}</td>
                  </tr>
                ))}
                {!perPage.length && (
                  <tr><td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">Navegue pelo site para coletar amostras.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold">Últimas medições</h2>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-3 py-2">Horário</th>
                  <th className="px-3 py-2">Métrica</th>
                  <th className="px-3 py-2">Valor</th>
                  <th className="px-3 py-2">Classificação</th>
                  <th className="px-3 py-2">Página</th>
                </tr>
              </thead>
              <tbody>
                {[...filtered].slice(-30).reverse().map((e) => (
                  <tr key={e.id + e.timestamp} className="border-t">
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {new Date(e.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-3 py-2 font-semibold">{e.name}</td>
                    <td className="px-3 py-2">{fmt(e)}</td>
                    <td className={`px-3 py-2 ${ratingColor[e.rating] ?? ""}`}>{e.rating}</td>
                    <td className="px-3 py-2 font-mono text-xs">{e.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
