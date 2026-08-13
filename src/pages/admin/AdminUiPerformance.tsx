import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, Gauge, Trash2 } from "lucide-react";
import {
  readVitalsHistory,
  readVitalsAlerts,
  clearVitalsAlerts,
  type WebVitalEntry,
  type AlertaVital,
} from "@/lib/webVitals";
import { lerAmostrasInteracao } from "@/lib/interactionMetrics";
import { BUDGETS, formatarMetrica } from "@/lib/uiPerformanceBudgets";

/**
 * PAINEL DE PERFORMANCE DE INTERFACE (/admin/ui-performance).
 *
 * Junta em uma tela as três fontes que hoje viviam separadas:
 *   • Web Vitals (LCP/CLS/INP) com os MESMOS budgets do CI;
 *   • tempo até a interação responder (LoadingButton, submits);
 *   • duração das exibições de Skeleton (AsyncContent e esqueletos marcados).
 *
 * Assim dá para ver, por rota, se um skeleton longo ou uma interação lenta
 * está acompanhando uma piora de LCP/CLS — e o histórico de alertas
 * disparados para o Sentry/GA4 quando o budget estourou.
 */

type Amostra = ReturnType<typeof lerAmostrasInteracao>[number];

const p75 = (valores: number[]) => {
  if (!valores.length) return 0;
  const ordenados = [...valores].sort((a, b) => a - b);
  return ordenados[Math.floor(ordenados.length * 0.75)] ?? ordenados[ordenados.length - 1];
};

const AdminUiPerformance = () => {
  const [vitais, setVitais] = useState<WebVitalEntry[]>([]);
  const [alertas, setAlertas] = useState<AlertaVital[]>([]);
  const [amostras, setAmostras] = useState<Amostra[]>([]);

  useEffect(() => {
    const atualizar = () => {
      setVitais(readVitalsHistory());
      setAlertas(readVitalsAlerts());
      setAmostras(lerAmostrasInteracao());
    };
    atualizar();
    window.addEventListener("web-vital", atualizar);
    window.addEventListener("web-vital-alert", atualizar);
    window.addEventListener("ui-metric", atualizar);
    const id = window.setInterval(atualizar, 4000);
    return () => {
      window.removeEventListener("web-vital", atualizar);
      window.removeEventListener("web-vital-alert", atualizar);
      window.removeEventListener("ui-metric", atualizar);
      window.clearInterval(id);
    };
  }, []);

  const resumoVitais = useMemo(
    () =>
      (["LCP", "CLS", "INP"] as const).map((nome) => {
        const valores = vitais.filter((v) => v.name === nome).map((v) => v.value);
        const valor = p75(valores);
        return { nome, valor, amostras: valores.length, budget: BUDGETS[nome], estourou: valor > BUDGETS[nome] };
      }),
    [vitais],
  );

  const interacoes = useMemo(() => amostras.filter((a) => a.tipo === "interaction"), [amostras]);
  const loadings = useMemo(() => amostras.filter((a) => a.tipo === "loading"), [amostras]);

  const porRota = useMemo(() => {
    const mapa = new Map<
      string,
      { rota: string; loadingP75: number; interacaoP75: number; erros: number; lcp: number; cls: number }
    >();
    const rotas = new Set<string>([...amostras.map((a) => a.rota), ...vitais.map((v) => v.path)]);
    for (const rota of rotas) {
      const l = loadings.filter((a) => a.rota === rota);
      const i = interacoes.filter((a) => a.rota === rota);
      mapa.set(rota, {
        rota,
        loadingP75: p75(l.map((a) => a.duracao)),
        interacaoP75: p75(i.map((a) => a.duracao)),
        erros: amostras.filter((a) => a.rota === rota && a.resultado === "error").length,
        lcp: p75(vitais.filter((v) => v.path === rota && v.name === "LCP").map((v) => v.value)),
        cls: p75(vitais.filter((v) => v.path === rota && v.name === "CLS").map((v) => v.value)),
      });
    }
    return [...mapa.values()].sort((a, b) => b.loadingP75 - a.loadingP75);
  }, [amostras, loadings, interacoes, vitais]);

  const porSuperficie = useMemo(() => {
    const mapa = new Map<string, { superficie: string; primitiva: string; n: number; p75: number; erros: number }>();
    for (const a of amostras) {
      const chave = `${a.primitiva}·${a.superficie}`;
      const atual = mapa.get(chave) || { superficie: a.superficie, primitiva: a.primitiva, n: 0, p75: 0, erros: 0 };
      atual.n += 1;
      if (a.resultado === "error") atual.erros += 1;
      mapa.set(chave, atual);
    }
    for (const [chave, valor] of mapa) {
      const duracoes = amostras
        .filter((a) => `${a.primitiva}·${a.superficie}` === chave)
        .map((a) => a.duracao);
      valor.p75 = p75(duracoes);
    }
    return [...mapa.values()].sort((a, b) => b.p75 - a.p75).slice(0, 20);
  }, [amostras]);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Performance de interface</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Web Vitals, tempo até a interação responder e duração das exibições de esqueleto — medidos nesta
          sessão do navegador e comparados com os mesmos orçamentos que bloqueiam o CI. Alertas são
          enviados ao Sentry e ao GA4 (<code>web_vital_budget_exceeded</code>) quando o budget estoura.
        </p>
      </header>

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
              budget {BUDGETS.INTERACTION}ms · {interacoes.length} amostra(s) · {interacoes.filter((a) => a.resultado === "error").length} erro(s)
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Skeleton → conteúdo</p>
            <p className="mt-1 text-2xl font-bold">
              {loadings.length ? `${Math.round(p75(loadings.map((a) => a.duracao)))}ms` : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              budget {BUDGETS.LOADING}ms · {loadings.length} amostra(s)
            </p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="correlacao" className="mb-10">
        <h2 id="correlacao" className="mb-3 text-lg font-semibold">
          Correlação por rota
        </h2>
        {porRota.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ainda sem amostras nesta sessão. Navegue pelo site com este painel aberto em outra aba.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <caption className="sr-only">Esperas de interface e Web Vitals por rota</caption>
              <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th scope="col" className="p-3">Rota</th>
                  <th scope="col" className="p-3">Skeleton p75</th>
                  <th scope="col" className="p-3">Interação p75</th>
                  <th scope="col" className="p-3">LCP p75</th>
                  <th scope="col" className="p-3">CLS p75</th>
                  <th scope="col" className="p-3">Erros</th>
                </tr>
              </thead>
              <tbody>
                {porRota.map((r) => (
                  <tr key={r.rota} className="border-t border-border/60">
                    <td className="p-3 font-medium">{r.rota || "—"}</td>
                    <td className={`p-3 ${r.loadingP75 > BUDGETS.LOADING ? "text-destructive" : ""}`}>
                      {r.loadingP75 ? `${Math.round(r.loadingP75)}ms` : "—"}
                    </td>
                    <td className={`p-3 ${r.interacaoP75 > BUDGETS.INTERACTION ? "text-destructive" : ""}`}>
                      {r.interacaoP75 ? `${Math.round(r.interacaoP75)}ms` : "—"}
                    </td>
                    <td className={`p-3 ${r.lcp > BUDGETS.LCP ? "text-destructive" : ""}`}>
                      {r.lcp ? `${Math.round(r.lcp)}ms` : "—"}
                    </td>
                    <td className={`p-3 ${r.cls > BUDGETS.CLS ? "text-destructive" : ""}`}>
                      {r.cls ? r.cls.toFixed(3) : "—"}
                    </td>
                    <td className="p-3">{r.erros}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section aria-labelledby="superficies" className="mb-10">
        <h2 id="superficies" className="mb-3 text-lg font-semibold">
          Superfícies mais lentas (LoadingButton e Skeletons)
        </h2>
        {porSuperficie.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sem amostras de loading nesta sessão.</p>
        ) : (
          <ul className="divide-y divide-border rounded-xl border border-border">
            {porSuperficie.map((s) => (
              <li key={`${s.primitiva}-${s.superficie}`} className="flex items-center justify-between gap-4 p-3 text-sm">
                <span className="min-w-0 truncate">
                  <span className="text-muted-foreground">{s.primitiva}</span> · {s.superficie}
                </span>
                <span className="flex-shrink-0 tabular-nums">
                  {Math.round(s.p75)}ms · {s.n}x{s.erros ? ` · ${s.erros} erro(s)` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="alertas">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 id="alertas" className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Alertas de budget ({alertas.length})
          </h2>
          {alertas.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearVitalsAlerts();
                setAlertas([]);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
              Limpar
            </Button>
          )}
        </div>
        {alertas.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum orçamento estourado nesta sessão.</p>
        ) : (
          <ul className="space-y-2">
            {[...alertas].reverse().map((a, i) => (
              <li
                key={`${a.name}-${a.timestamp}-${i}`}
                className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm"
              >
                <strong>{a.name}</strong> {formatarMetrica(a.name, a.value)} acima do budget{" "}
                {formatarMetrica(a.name, a.budget)} em <code>{a.path}</code>{" "}
                <span className="text-muted-foreground">
                  ({new Date(a.timestamp).toLocaleTimeString("pt-BR")})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default AdminUiPerformance;
