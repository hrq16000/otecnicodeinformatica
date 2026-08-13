import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, Gauge, Trash2, Download, ExternalLink, Printer } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  readVitalsHistory,
  readVitalsAlerts,
  clearVitalsAlerts,
  clearVitalsHistory,
  type WebVitalEntry,
  type AlertaVital,
} from "@/lib/webVitals";
import {
  lerHistoricoUi,
  lerAlertasUi,
  limparAlertasUi,
  limparHistoricoUi,
  type Amostra,
  type AlertaUi,
} from "@/lib/interactionMetrics";
import { BUDGETS, formatarMetrica } from "@/lib/uiPerformanceBudgets";
import { linkDrilldown, drilldownDisponivel } from "@/lib/sentryDrilldown";

/**
 * PAINEL DE PERFORMANCE DE INTERFACE (/admin/ui-performance).
 *
 * Junta em uma tela as fontes que viviam separadas:
 *   • Web Vitals (LCP/CLS/INP) com os MESMOS budgets do CI;
 *   • tempo até a interação responder (LoadingButton, submits);
 *   • duração das exibições de Skeleton (AsyncContent e esqueletos marcados);
 *   • alertas disparados para Sentry/GA4 quando o budget estourou.
 *
 * Filtros por rota, componente e janela de tempo permitem responder a
 * pergunta que importa: "esse skeleton longo está na mesma rota onde o LCP
 * piorou?".
 */

const JANELAS = [
  { id: "15m", label: "15 min", ms: 15 * 60_000 },
  { id: "1h", label: "1 hora", ms: 60 * 60_000 },
  { id: "24h", label: "24 horas", ms: 24 * 60 * 60_000 },
  { id: "tudo", label: "Tudo", ms: Number.POSITIVE_INFINITY },
] as const;

const p75 = (valores: number[]) => {
  if (!valores.length) return 0;
  const ordenados = [...valores].sort((a, b) => a - b);
  return ordenados[Math.floor(ordenados.length * 0.75)] ?? ordenados[ordenados.length - 1];
};

const hora = (t: number) =>
  new Date(t).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const Selecao = ({
  id,
  label,
  valor,
  opcoes,
  onChange,
}: {
  id: string;
  label: string;
  valor: string;
  opcoes: string[];
  onChange: (v: string) => void;
}) => (
  <label htmlFor={id} className="flex flex-col gap-1 text-xs text-muted-foreground">
    {label}
    <select
      id={id}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className="min-w-40 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
    >
      {opcoes.map((o) => (
        <option key={o} value={o}>
          {o === "__todas__" ? "Todas" : o || "(sem rota)"}
        </option>
      ))}
    </select>
  </label>
);

/** CSV com separador padrão brasileiro (;) e escape de aspas. */
const paraCsv = (colunas: string[], linhas: (string | number)[][]) =>
  [colunas, ...linhas]
    .map((linha) =>
      linha
        .map((c) => {
          const v = String(c ?? "");
          return /[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
        })
        .join(";"),
    )
    .join("\n");

const baixar = (nome: string, conteudo: string, tipo = "text/csv;charset=utf-8") => {
  const url = URL.createObjectURL(new Blob(["\uFEFF" + conteudo], { type: tipo }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  URL.revokeObjectURL(url);
};

/** Abre o Sentry com os filtros do painel já aplicados (ou nada, se não houver org). */
const LinkSentry = ({
  rota,
  componente,
  kind,
  janela,
  rotulo,
}: {
  rota?: string;
  componente?: string;
  kind?: string;
  janela?: string;
  rotulo: string;
}) => {
  const href = linkDrilldown({ rota, componente, kind, janela });
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 text-xs text-accent underline underline-offset-2"
    >
      {rotulo}
      <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  );
};

const AdminUiPerformance = () => {
  const [vitais, setVitais] = useState<WebVitalEntry[]>([]);
  const [alertasVitais, setAlertasVitais] = useState<AlertaVital[]>([]);
  const [alertasUi, setAlertasUi] = useState<AlertaUi[]>([]);
  const [amostrasBrutas, setAmostrasBrutas] = useState<Amostra[]>([]);

  const [janela, setJanela] = useState<(typeof JANELAS)[number]["id"]>("1h");
  const [rota, setRota] = useState("__todas__");
  const [componente, setComponente] = useState("__todas__");

  useEffect(() => {
    const atualizar = () => {
      setVitais(readVitalsHistory());
      setAlertasVitais(readVitalsAlerts());
      setAlertasUi(lerAlertasUi());
      setAmostrasBrutas(lerHistoricoUi());
    };
    atualizar();
    const eventos = ["web-vital", "web-vital-alert", "ui-metric", "ui-metric-alert"];
    eventos.forEach((e) => window.addEventListener(e, atualizar));
    const id = window.setInterval(atualizar, 4000);
    return () => {
      eventos.forEach((e) => window.removeEventListener(e, atualizar));
      window.clearInterval(id);
    };
  }, []);

  const limite = useMemo(() => {
    const ms = JANELAS.find((j) => j.id === janela)?.ms ?? Number.POSITIVE_INFINITY;
    return Number.isFinite(ms) ? Date.now() - ms : 0;
  }, [janela, amostrasBrutas.length, vitais.length]);

  const rotas = useMemo(
    () => [
      "__todas__",
      ...Array.from(new Set([...amostrasBrutas.map((a) => a.rota), ...vitais.map((v) => v.path)])).sort(),
    ],
    [amostrasBrutas, vitais],
  );
  const componentes = useMemo(
    () => ["__todas__", ...Array.from(new Set(amostrasBrutas.map((a) => a.primitiva))).sort()],
    [amostrasBrutas],
  );

  const amostras = useMemo(
    () =>
      amostrasBrutas.filter(
        (a) =>
          a.timestamp >= limite &&
          (rota === "__todas__" || a.rota === rota) &&
          (componente === "__todas__" || a.primitiva === componente),
      ),
    [amostrasBrutas, limite, rota, componente],
  );

  const vitaisFiltrados = useMemo(
    () => vitais.filter((v) => v.timestamp >= limite && (rota === "__todas__" || v.path === rota)),
    [vitais, limite, rota],
  );

  const resumoVitais = useMemo(
    () =>
      (["LCP", "CLS", "INP"] as const).map((nome) => {
        const valores = vitaisFiltrados.filter((v) => v.name === nome).map((v) => v.value);
        const valor = p75(valores);
        return {
          nome,
          valor,
          amostras: valores.length,
          budget: BUDGETS[nome],
          estourou: valores.length > 0 && valor > BUDGETS[nome],
        };
      }),
    [vitaisFiltrados],
  );

  const interacoes = useMemo(() => amostras.filter((a) => a.tipo === "interaction"), [amostras]);
  const loadings = useMemo(() => amostras.filter((a) => a.tipo === "loading"), [amostras]);

  /** Série temporal de LCP e CLS (CLS multiplicado para caber no mesmo eixo). */
  const serieVitais = useMemo(
    () =>
      vitaisFiltrados
        .filter((v) => v.name === "LCP" || v.name === "CLS" || v.name === "INP")
        .slice(-40)
        .map((v) => ({
          t: hora(v.timestamp),
          [v.name]: v.name === "CLS" ? Number((v.value * 1000).toFixed(1)) : Math.round(v.value),
        })),
    [vitaisFiltrados],
  );

  /** Série temporal das esperas percebidas, por componente. */
  const serieEsperas = useMemo(
    () =>
      amostras.slice(-40).map((a) => ({
        t: hora(a.timestamp),
        [a.tipo === "interaction" ? "Interação" : "Loading"]: Math.round(a.duracao),
      })),
    [amostras],
  );

  const porRota = useMemo(() => {
    const chaves = new Set<string>([...amostras.map((a) => a.rota), ...vitaisFiltrados.map((v) => v.path)]);
    return [...chaves]
      .map((r) => ({
        rota: r,
        loadingP75: p75(loadings.filter((a) => a.rota === r).map((a) => a.duracao)),
        interacaoP75: p75(interacoes.filter((a) => a.rota === r).map((a) => a.duracao)),
        erros: amostras.filter((a) => a.rota === r && a.resultado === "error").length,
        lcp: p75(vitaisFiltrados.filter((v) => v.path === r && v.name === "LCP").map((v) => v.value)),
        cls: p75(vitaisFiltrados.filter((v) => v.path === r && v.name === "CLS").map((v) => v.value)),
      }))
      .sort((a, b) => b.loadingP75 - a.loadingP75);
  }, [amostras, loadings, interacoes, vitaisFiltrados]);

  const porSuperficie = useMemo(() => {
    const chaves = Array.from(new Set(amostras.map((a) => `${a.primitiva}·${a.superficie}`)));
    return chaves
      .map((chave) => {
        const grupo = amostras.filter((a) => `${a.primitiva}·${a.superficie}` === chave);
        return {
          chave,
          superficie: grupo[0].superficie,
          primitiva: grupo[0].primitiva,
          cta: grupo.find((a) => a.ctaTipo)?.ctaLocal ?? "",
          n: grupo.length,
          p75: p75(grupo.map((a) => a.duracao)),
          erros: grupo.filter((a) => a.resultado === "error").length,
        };
      })
      .sort((a, b) => b.p75 - a.p75)
      .slice(0, 12);
  }, [amostras]);

  const alertas = useMemo(
    () =>
      [
        ...alertasVitais
          .filter((a) => a.timestamp >= limite && (rota === "__todas__" || a.path === rota))
          .map((a) => ({
            t: a.timestamp,
            titulo: `${a.name} ${formatarMetrica(a.name, a.value)}`,
            detalhe: `budget ${formatarMetrica(a.name, a.budget)} · ${a.path}`,
          })),
        ...alertasUi
          .filter((a) => a.timestamp >= limite && (rota === "__todas__" || a.rota === rota))
          .map((a) => ({
            t: a.timestamp,
            titulo: `${a.metrica} ${a.duracao}ms · ${a.primitiva}:${a.superficie}`,
            detalhe: `budget ${a.budget}ms · ${a.resultado} · ${a.rota}`,
          })),
      ].sort((x, y) => y.t - x.t),
    [alertasVitais, alertasUi, limite, rota],
  );

  const sufixo = `${janela}_${rota === "__todas__" ? "todas" : rota.replace(/\W+/g, "-")}_${componente === "__todas__" ? "todos" : componente}`;

  /** Exporta as amostras já filtradas (rota, componente e janela ativos). */
  const exportarAmostras = () =>
    baixar(
      `ui-performance-amostras_${sufixo}.csv`,
      paraCsv(
        ["timestamp", "tipo", "rota", "componente", "superficie", "duracao_ms", "resultado", "acima_budget", "cta_tipo", "cta_local"],
        amostras.map((a) => [
          new Date(a.timestamp).toISOString(),
          a.tipo,
          a.rota,
          a.primitiva,
          a.superficie,
          Math.round(a.duracao),
          a.resultado,
          a.excedeu ? "sim" : "nao",
          a.ctaTipo ?? "",
          a.ctaLocal ?? "",
        ]),
      ),
    );

  /** Exporta o resumo por rota (a visão usada para decidir onde atacar). */
  const exportarResumo = () =>
    baixar(
      `ui-performance-rotas_${sufixo}.csv`,
      paraCsv(
        ["rota", "lcp_p75_ms", "cls_p75", "loading_p75_ms", "interacao_p75_ms", "erros", "budget_lcp_ms", "budget_cls", "budget_loading_ms", "budget_interacao_ms"],
        porRota.map((r) => [
          r.rota,
          Math.round(r.lcp),
          r.cls.toFixed(3),
          Math.round(r.loadingP75),
          Math.round(r.interacaoP75),
          r.erros,
          BUDGETS.LCP,
          BUDGETS.CLS,
          BUDGETS.LOADING,
          BUDGETS.INTERACTION,
        ]),
      ),
    );

  /** Exporta os alertas de budget (o que já foi para Sentry/GA4). */
  const exportarAlertas = () =>
    baixar(
      `ui-performance-alertas_${sufixo}.csv`,
      paraCsv(
        ["timestamp", "alerta", "detalhe"],
        alertas.map((a) => [new Date(a.t).toISOString(), a.titulo, a.detalhe]),
      ),
    );

  // PDF: usa a impressão do navegador ("Salvar como PDF"). Evita puxar uma
  // biblioteca de ~500 kB para uma tela administrativa de uso pontual.
  const exportarPdf = () => window.print();

  const limparTudo = () => {
    clearVitalsAlerts();
    clearVitalsHistory();
    limparAlertasUi();
    limparHistoricoUi();
    setVitais([]);
    setAlertasVitais([]);
    setAlertasUi([]);
    setAmostrasBrutas([]);
  };

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Performance de interface</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Web Vitals, tempo até a interação responder e duração das exibições de esqueleto — comparados
          com os mesmos orçamentos que bloqueiam o CI. Quando o budget estoura, o alerta vai para o
          Sentry (<code>perf.budget_exceeded</code> / <code>ui.budget_exceeded</code>) e para o GA4
          (<code>web_vital_budget_exceeded</code> / <code>ui_budget_exceeded</code>).
        </p>
      </header>

      <section aria-label="Filtros" className="mb-8 flex flex-wrap items-end gap-4">
        <Selecao
          id="filtro-janela"
          label="Janela"
          valor={janela}
          opcoes={JANELAS.map((j) => j.id)}
          onChange={(v) => setJanela(v as typeof janela)}
        />
        <Selecao id="filtro-rota" label="Rota" valor={rota} opcoes={rotas} onChange={setRota} />
        <Selecao
          id="filtro-componente"
          label="Componente"
          valor={componente}
          opcoes={componentes}
          onChange={setComponente}
        />
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={exportarAmostras} className="gap-2">
            <Download className="h-4 w-4" aria-hidden="true" /> CSV amostras
          </Button>
          <Button variant="outline" size="sm" onClick={exportarResumo} className="gap-2">
            <Download className="h-4 w-4" aria-hidden="true" /> CSV por rota
          </Button>
          <Button variant="outline" size="sm" onClick={exportarAlertas} className="gap-2">
            <Download className="h-4 w-4" aria-hidden="true" /> CSV alertas
          </Button>
          <Button variant="outline" size="sm" onClick={exportarPdf} className="gap-2">
            <Printer className="h-4 w-4" aria-hidden="true" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={limparTudo} className="gap-2">
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Limpar histórico
          </Button>
        </div>
      </section>

      {drilldownDisponivel() ? (
        <p className="mb-6 text-xs text-muted-foreground">
          Os links “Sentry” abrem a busca de eventos já filtrada pelas mesmas tags gravadas pelo
          cliente (<code>kind</code>, <code>path</code>, <code>primitive</code>).
        </p>
      ) : (
        <p className="mb-6 text-xs text-muted-foreground">
          Drilldown no Sentry desativado: defina <code>VITE_SENTRY_ORG</code> (e opcionalmente{" "}
          <code>VITE_SENTRY_PROJECT</code>) para liberar os links por rota e componente.
        </p>
      )}

      <section aria-labelledby="vitais" className="mb-10">
        <h2 id="vitais" className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Gauge className="h-4 w-4" aria-hidden="true" /> Web Vitals (p75)
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {resumoVitais.map((m) => (
            <Card key={m.nome} className="p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.nome}</p>
              <p className={`mt-1 text-2xl font-bold ${m.estourou ? "text-destructive" : "text-foreground"}`}>
                {m.amostras ? formatarMetrica(m.nome, m.valor) : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                budget {formatarMetrica(m.nome, m.budget)} · {m.amostras} amostra(s)
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-4 p-4">
          <p className="mb-2 text-xs text-muted-foreground">
            Evolução (CLS exibido ×1000 para caber no mesmo eixo; linha tracejada = budget de LCP).
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serieVitais}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="t" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={BUDGETS.LCP} stroke="hsl(var(--destructive))" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="LCP" stroke="hsl(var(--accent))" dot={false} connectNulls />
                <Line type="monotone" dataKey="CLS" stroke="hsl(var(--primary))" dot={false} connectNulls />
                <Line type="monotone" dataKey="INP" stroke="hsl(var(--muted-foreground))" dot={false} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section aria-labelledby="esperas" className="mb-10">
        <h2 id="esperas" className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Activity className="h-4 w-4" aria-hidden="true" /> Esperas percebidas (p75)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Interação → resposta</p>
            <p className="mt-1 text-2xl font-bold">
              {interacoes.length ? `${Math.round(p75(interacoes.map((a) => a.duracao)))}ms` : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              budget {BUDGETS.INTERACTION}ms · {interacoes.length} amostra(s) ·{" "}
              {interacoes.filter((a) => a.resultado === "error").length} erro(s)
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Skeleton → conteúdo</p>
            <p className="mt-1 text-2xl font-bold">
              {loadings.length ? `${Math.round(p75(loadings.map((a) => a.duracao)))}ms` : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              budget {BUDGETS.LOADING}ms · {loadings.length} amostra(s) ·{" "}
              {loadings.filter((a) => a.resultado === "error").length} erro(s)
            </p>
          </Card>
        </div>

        <Card className="mt-4 p-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serieEsperas}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="t" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" unit="ms" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={BUDGETS.INTERACTION} stroke="hsl(var(--destructive))" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="Interação" stroke="hsl(var(--accent))" dot={false} connectNulls />
                <Line type="monotone" dataKey="Loading" stroke="hsl(var(--primary))" dot={false} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section aria-labelledby="componentes" className="mb-10">
        <h2 id="componentes" className="mb-3 text-lg font-semibold">
          Por componente e superfície (p75)
        </h2>
        <Card className="p-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porSuperficie} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} unit="ms" stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  type="category"
                  dataKey="chave"
                  width={220}
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip />
                <ReferenceLine x={BUDGETS.LOADING} stroke="hsl(var(--destructive))" strokeDasharray="4 4" />
                <Bar dataKey="p75" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {drilldownDisponivel() && porSuperficie.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {porSuperficie.slice(0, 6).map((s) => (
                <li key={`link-${s.chave}`}>
                  <LinkSentry
                    componente={s.primitiva}
                    rota={rota}
                    kind="ui.loading_end"
                    janela={janela}
                    rotulo={`Sentry · ${s.chave}`}
                  />
                </li>
              ))}
            </ul>
          )}
          {porSuperficie.some((s) => s.cta) && (
            <p className="mt-3 text-xs text-muted-foreground">
              CTA correlacionado mais recente:{" "}
              {porSuperficie
                .filter((s) => s.cta)
                .slice(0, 3)
                .map((s) => `${s.superficie} ← ${s.cta}`)
                .join(" · ")}
            </p>
          )}
        </Card>
      </section>

      <section aria-labelledby="rotas" className="mb-10">
        <h2 id="rotas" className="mb-3 text-lg font-semibold">
          Correlação por rota
        </h2>
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Rota</th>
                <th className="px-4 py-3">LCP p75</th>
                <th className="px-4 py-3">CLS p75</th>
                <th className="px-4 py-3">Loading p75</th>
                <th className="px-4 py-3">Interação p75</th>
                <th className="px-4 py-3">Erros</th>
                <th className="px-4 py-3 print:hidden">Sentry</th>
              </tr>
            </thead>
            <tbody>
              {porRota.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-muted-foreground">
                    Sem amostras nesta janela.
                  </td>
                </tr>
              )}
              {porRota.map((r) => (
                <tr key={r.rota} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-medium">{r.rota || "—"}</td>
                  <td className={`px-4 py-3 ${r.lcp > BUDGETS.LCP ? "text-destructive" : ""}`}>
                    {r.lcp ? `${Math.round(r.lcp)}ms` : "—"}
                  </td>
                  <td className={`px-4 py-3 ${r.cls > BUDGETS.CLS ? "text-destructive" : ""}`}>
                    {r.cls ? r.cls.toFixed(3) : "—"}
                  </td>
                  <td className={`px-4 py-3 ${r.loadingP75 > BUDGETS.LOADING ? "text-destructive" : ""}`}>
                    {r.loadingP75 ? `${Math.round(r.loadingP75)}ms` : "—"}
                  </td>
                  <td className={`px-4 py-3 ${r.interacaoP75 > BUDGETS.INTERACTION ? "text-destructive" : ""}`}>
                    {r.interacaoP75 ? `${Math.round(r.interacaoP75)}ms` : "—"}
                  </td>
                  <td className="px-4 py-3">{r.erros}</td>
                  <td className="px-4 py-3 print:hidden">
                    <LinkSentry rota={r.rota} componente={componente} janela={janela} rotulo="Abrir" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      <section aria-labelledby="alertas">
        <h2 id="alertas" className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Alertas de budget ({alertas.length})
          <span className="ml-auto text-xs font-normal">
            <LinkSentry rota={rota} kind="ui.budget_exceeded" janela={janela} rotulo="Ver no Sentry" />
          </span>
        </h2>
        <Card className="p-4">
          {alertas.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum budget estourado nesta janela — nada foi enviado ao Sentry/GA4.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {alertas.slice(0, 20).map((a, i) => (
                <li key={`${a.t}-${i}`} className="flex flex-wrap items-baseline gap-2">
                  <span className="font-medium text-destructive">{a.titulo}</span>
                  <span className="text-muted-foreground">{a.detalhe}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{hora(a.t)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </main>
  );
};

export default AdminUiPerformance;
