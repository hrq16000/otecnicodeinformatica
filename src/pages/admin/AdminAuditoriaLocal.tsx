import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonTable } from "@/components/motion";

/** Uma linha da auditoria local gerada por scripts/generate-local-audit.mjs. */
interface RotaAuditada {
  path: string;
  familia: string;
  cidade: string;
  indexability: string;
  canonical?: string;
  canonicalOk?: boolean;
  robots?: string;
  sitemapEsperado?: boolean;
  sitemapReal?: boolean;
  schemas?: string[];
  areaServed?: string | null;
  parent?: string | null;
  gate: string;
  problemas?: string[];
  observacao?: string;
}

interface Auditoria {
  geradoEm: string;
  total: number;
  verdes: number;
  bloqueados: number;
  rotas: RotaAuditada[];
}

const SCHEMAS = ["Service", "BreadcrumbList", "WebPage", "FAQPage"] as const;

const Selo = ({ ok, label }: { ok: boolean; label: string }) => (
  <span
    className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${
      ok ? "bg-emerald-500/15 text-emerald-500" : "bg-destructive/15 text-destructive"
    }`}
  >
    {label}
  </span>
);

export default function AdminAuditoriaLocal() {
  const [dados, setDados] = useState<Auditoria | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroCidade, setFiltroCidade] = useState("");
  const [somenteBloqueados, setSomenteBloqueados] = useState(false);

  useEffect(() => {
    document.title = "Auditoria local por URL | Admin";
    fetch("/local-audit.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const cidades = useMemo(
    () => Array.from(new Set((dados?.rotas ?? []).map((r) => r.cidade))).sort(),
    [dados],
  );

  const rotas = useMemo(() => {
    let lista = dados?.rotas ?? [];
    if (filtroCidade) lista = lista.filter((r) => r.cidade === filtroCidade);
    if (somenteBloqueados) lista = lista.filter((r) => r.gate !== "VERDE");
    return lista;
  }, [dados, filtroCidade, somenteBloqueados]);

  const exportarCsv = () => {
    const head = "url;cidade;indexability;canonical_ok;robots;sitemap;schemas;area_served;gate;problemas";
    const linhas = rotas.map((r) =>
      [
        r.path,
        r.cidade,
        r.indexability,
        r.canonicalOk ? "ok" : "divergente",
        r.robots ?? "",
        r.sitemapReal ? "presente" : "ausente",
        (r.schemas ?? []).join("|"),
        r.areaServed ?? "",
        r.gate,
        (r.problemas ?? []).join(" / "),
      ].join(";"),
    );
    const blob = new Blob([[head, ...linhas].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "auditoria-local.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (erro) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Auditoria local por URL</h1>
        <p className="mt-4 text-muted-foreground">
          Não foi possível carregar <code>/local-audit.json</code> ({erro}). Rode <code>npm run build</code> para gerar o relatório.
        </p>
      </main>
    );
  }

  if (!dados) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Auditoria local por URL</h1>
        <div className="mt-6"><SkeletonTable /></div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Auditoria local por URL</h1>
          <p className="text-sm text-muted-foreground">
            Gerado em {new Date(dados.geradoEm).toLocaleString("pt-BR")} · {dados.total} rotas ·{" "}
            <span className="text-emerald-500">{dados.verdes} verdes</span> ·{" "}
            <span className="text-destructive">{dados.bloqueados} bloqueadas</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filtrar por cidade"
            className="h-9 rounded-md border border-border bg-background px-2 text-sm"
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
          >
            <option value="">Todas as cidades</option>
            {cidades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={() => setSomenteBloqueados((v) => !v)}>
            {somenteBloqueados ? "Ver todas" : "Só bloqueadas"}
          </Button>
          <Button size="sm" onClick={exportarCsv}>
            Exportar CSV
          </Button>
        </div>
      </header>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="py-2 pr-3">URL</th>
              <th className="py-2 pr-3">Robots</th>
              <th className="py-2 pr-3">Canonical</th>
              <th className="py-2 pr-3">Sitemap</th>
              <th className="py-2 pr-3">Schemas</th>
              <th className="py-2 pr-3">areaServed</th>
              <th className="py-2 pr-3">Gate</th>
            </tr>
          </thead>
          <tbody>
            {rotas.map((r) => (
              <tr key={r.path} className="border-b border-border/60 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium">{r.path}</span>
                  {r.problemas?.length ? (
                    <div className="mt-1 text-xs text-destructive">{r.problemas.join(" · ")}</div>
                  ) : null}
                  {r.observacao ? <div className="mt-1 text-xs text-destructive">{r.observacao}</div> : null}
                </td>
                <td className="py-2 pr-3">{r.robots}</td>
                <td className="py-2 pr-3">
                  <Selo ok={!!r.canonicalOk} label={r.canonicalOk ? "self/política" : "divergente"} />
                </td>
                <td className="py-2 pr-3">
                  <Selo ok={r.sitemapEsperado === r.sitemapReal} label={r.sitemapReal ? "presente" : "ausente"} />
                </td>
                <td className="py-2 pr-3">
                  <div className="flex flex-wrap gap-1">
                    {SCHEMAS.map((s) => (
                      <Selo key={s} ok={(r.schemas ?? []).includes(s)} label={s} />
                    ))}
                  </div>
                </td>
                <td className="py-2 pr-3">{r.areaServed ?? "—"}</td>
                <td className="py-2 pr-3">
                  <Selo ok={r.gate === "VERDE"} label={r.gate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
