import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Search } from "lucide-react";

/**
 * ALERTA DIÁRIO DE INDEXAÇÃO E DESCOBERTA (/admin, Rodada 8B)
 *
 * Lê dois artefatos gerados pela rotina diária — nenhum dado é inventado:
 *   public/indexing-status.json          → Search Console (URLs prioritárias)
 *   public/problem-discovery-status.json → descoberta do cluster /problemas
 *
 * Regra do alerta visual (vermelho): URL prioritária com verdict UNKNOWN,
 * ERROR, queda em relação ao baseline, ou URL indexável do cluster sem
 * nenhum link interno. Sem dados, o bloco declara "sem leitura" — jamais
 * finge cobertura.
 */

type UrlIndex = {
  path: string;
  family: "service_city" | "neighborhood" | "problem" | "other";
  verdict: string;
  coverageState: string | null;
  indexed: boolean;
  lastCrawlTime: string | null;
};

type StatusIndexacao = {
  generatedAt: string;
  coverage: number;
  previousCoverage: number | null;
  regressions: string[];
  urls: UrlIndex[];
};

type StatusDiscovery = {
  generatedAt: string;
  resumo: { total: number; orfas: number; semNavegacao: number };
  urls: { url: string; sitemap: boolean; links: number; clickDepth: number | null; searchStatus: string }[];
};

const FAMILIAS: { id: UrlIndex["family"]; label: string }[] = [
  { id: "service_city", label: "Serviço × cidade" },
  { id: "neighborhood", label: "Bairro" },
  { id: "problem", label: "Problema" },
  { id: "other", label: "Outras" },
];

const problematico = (u: UrlIndex) =>
  !u.indexed || u.verdict === "UNKNOWN" || u.verdict === "ERROR";

/**
 * Reason code sempre visível quando o status é incerto ou falha (Rodada 8C).
 * Nunca inventamos motivo: se a fonte não trouxe `coverageState`, dizemos
 * exatamente isso (`SEM_MOTIVO_REPORTADO`).
 */
const reasonCode = (u: UrlIndex): string => {
  if (u.verdict === "UNKNOWN") return u.coverageState ?? "UNKNOWN_SEM_MOTIVO_REPORTADO";
  if (u.verdict === "ERROR") return u.coverageState ?? "ERROR_SEM_MOTIVO_REPORTADO";
  if (!u.indexed) return u.coverageState ?? "NAO_INDEXADA_SEM_MOTIVO_REPORTADO";
  return u.coverageState ?? "OK";
};

const severidade = (u: UrlIndex): "unknown" | "erro" | "atencao" =>
  u.verdict === "UNKNOWN" ? "unknown" : u.verdict === "ERROR" ? "erro" : "atencao";

const CLASSE_BADGE: Record<"unknown" | "erro" | "atencao", string> = {
  unknown: "border-destructive bg-destructive/10 text-destructive",
  erro: "border-destructive bg-destructive/10 text-destructive",
  atencao: "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};


export const AlertaIndexacao = () => {
  const [indexacao, setIndexacao] = useState<StatusIndexacao | null>(null);
  const [discovery, setDiscovery] = useState<StatusDiscovery | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    const carregar = async () => {
      const ler = async <T,>(url: string): Promise<T | null> => {
        try {
          const r = await fetch(url, { cache: "no-store" });
          return r.ok ? ((await r.json()) as T) : null;
        } catch {
          return null;
        }
      };
      const [i, d] = await Promise.all([
        ler<StatusIndexacao>("/indexing-status.json"),
        ler<StatusDiscovery>("/problem-discovery-status.json"),
      ]);
      if (!vivo) return;
      setIndexacao(i);
      setDiscovery(d);
      setCarregando(false);
    };
    void carregar();
    return () => {
      vivo = false;
    };
  }, []);

  if (carregando) {
    return (
      <div className="mb-6 flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Lendo status de indexação…
      </div>
    );
  }

  const urls = indexacao?.urls ?? [];
  const criticas = urls.filter(problematico);
  const orfas = discovery?.resumo.orfas ?? 0;
  const quedas = indexacao?.regressions ?? [];
  const alerta = criticas.length > 0 || quedas.length > 0 || orfas > 0;

  return (
    <section
      aria-label="Indexação e descoberta"
      className={`mb-6 rounded-lg border p-4 ${alerta ? "border-destructive/50 bg-destructive/5" : "border-border bg-card"}`}
    >
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          {alerta ? (
            <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
          )}
          Indexação e descoberta
        </h2>
        <p className="text-xs text-muted-foreground">
          {indexacao
            ? `Search Console · cobertura ${indexacao.coverage}%${indexacao.previousCoverage !== null ? ` (antes ${indexacao.previousCoverage}%)` : ""} · ${new Date(indexacao.generatedAt).toLocaleString("pt-BR")}`
            : "Sem leitura do Search Console nesta build"}
        </p>
      </header>

      {!indexacao && (
        <p className="text-xs text-muted-foreground">
          O monitoramento diário ainda não publicou <code>indexing-status.json</code>. Nenhum status é
          assumido: rode <code>npm run monitor:gsc</code> na rotina para gerar a leitura real.
        </p>
      )}

      {indexacao && (
        <div className="grid gap-2 sm:grid-cols-4">
          {FAMILIAS.map((f) => {
            const lote = urls.filter((u) => u.family === f.id);
            const ruins = lote.filter(problematico).length;
            if (!lote.length) return null;
            return (
              <div key={f.id} className="rounded-md border border-border bg-background p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="text-lg font-bold">
                  {lote.length - ruins}/{lote.length}
                </p>
                <p className={`text-[11px] ${ruins ? "text-destructive" : "text-muted-foreground"}`}>
                  {ruins ? `${ruins} com problema` : "todas indexadas"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {(criticas.length > 0 || quedas.length > 0) && (
        <ul className="mt-3 space-y-1 text-xs">
          {quedas.map((p) => (
            <li key={`q-${p}`} className="text-destructive">
              ⚠ Queda de indexação: <code>{p}</code>
            </li>
          ))}
          {criticas.slice(0, 12).map((u) => (
            <li key={u.path} className="text-muted-foreground">
              <code>{u.path}</code> — {u.verdict}
              {u.coverageState ? ` · ${u.coverageState}` : ""}
            </li>
          ))}
        </ul>
      )}

      {discovery && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          Cluster /problemas: {discovery.resumo.total} URLs mapeadas ·{" "}
          <span className={orfas ? "font-semibold text-destructive" : ""}>{orfas} órfã(s)</span> ·{" "}
          {discovery.resumo.semNavegacao} indexável(is) sem caminho de navegação.
        </p>
      )}
    </section>
  );
};

export default AlertaIndexacao;
