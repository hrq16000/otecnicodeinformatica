import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonTable } from "@/components/motion";

/**
 * RODADA 5E — painel de gates locais por rota.
 * Consome public/local-gates.json (scripts/generate-local-gates-report.mjs).
 * Não decide nada: apenas expõe a decisão da política e o status dos gates.
 */
interface RotaGates {
  path: string;
  familia: string;
  indexability: string;
  canonical: string;
  sitemap: boolean;
  parent: string | null;
  intent: string | null;
  motivo: string;
  gates: Record<string, string>;
  veredito: string;
}

interface Relatorio {
  geradoEm: string;
  rodada: string;
  gates: { id: string; status: string }[];
  resumo: { total: number; index: number; canonicalized: number; noindex: number; disabled: number };
  rotas: RotaGates[];
}

const GATES = ["local-index-policy", "local-service-intent", "local-doorway", "local-neighborhood-intent"];

const corVeredito: Record<string, string> = {
  INDEX: "bg-emerald-500/15 text-emerald-500",
  CANONICALIZED_TO_PARENT: "bg-sky-500/15 text-sky-500",
  NOINDEX: "bg-amber-500/15 text-amber-500",
  DISABLED: "bg-destructive/15 text-destructive",
};

const Status = ({ valor }: { valor: string }) => {
  const map: Record<string, string> = {
    pass: "bg-emerald-500/15 text-emerald-500",
    fail: "bg-destructive/15 text-destructive",
    "fail-global": "bg-amber-500/15 text-amber-500",
    "n/a": "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${map[valor] ?? map["n/a"]}`}>
      {valor}
    </span>
  );
};

export default function AdminGatesLocais() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [familia, setFamilia] = useState("");
  const [veredito, setVeredito] = useState("");

  useEffect(() => {
    document.title = "Gates locais por rota | Admin";
    fetch("/local-gates.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const familias = useMemo(
    () => Array.from(new Set((dados?.rotas ?? []).map((r) => r.familia))).sort(),
    [dados],
  );

  const rotas = useMemo(() => {
    let lista = dados?.rotas ?? [];
    if (familia) lista = lista.filter((r) => r.familia === familia);
    if (veredito) lista = lista.filter((r) => r.veredito === veredito);
    return lista;
  }, [dados, familia, veredito]);

  const exportarCsv = () => {
    const head = ["path", "familia", "veredito", "canonical", "sitemap", ...GATES];
    const linhas = rotas.map((r) =>
      [r.path, r.familia, r.veredito, r.canonical, r.sitemap ? "sim" : "nao", ...GATES.map((g) => r.gates[g] ?? "n/a")]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...linhas].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gates-locais.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">Gates locais por rota</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Resultado dos gates bloqueantes e veredito final de cada rota local, conforme a política central.
      </p>

      {erro && <p className="mt-6 text-sm text-destructive">Relatório indisponível: {erro}. Rode <code>npm run report:local-gates</code>.</p>}
      {!dados && !erro && <SkeletonTable rows={8} />}

      {dados && (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {[
              ["Rotas", dados.resumo.total],
              ["INDEX", dados.resumo.index],
              ["Canonicalizadas", dados.resumo.canonicalized],
              ["Noindex", dados.resumo.noindex],
              ["Desativadas", dados.resumo.disabled],
            ].map(([label, valor]) => (
              <Card key={String(label)} className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{valor}</p>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <select
              aria-label="Filtrar por família"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={familia}
              onChange={(e) => setFamilia(e.target.value)}
            >
              <option value="">Todas as famílias</option>
              {familias.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <select
              aria-label="Filtrar por veredito"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={veredito}
              onChange={(e) => setVeredito(e.target.value)}
            >
              <option value="">Todos os vereditos</option>
              {Object.keys(corVeredito).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <Button variant="outline" onClick={exportarCsv}>
              Exportar CSV
            </Button>
            <span className="text-xs text-muted-foreground">
              Gerado em {new Date(dados.geradoEm).toLocaleString("pt-BR")}
            </span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3">Rota</th>
                  <th className="py-2 pr-3">Família</th>
                  {GATES.map((g) => (
                    <th key={g} className="py-2 pr-3">
                      {g.replace("local-", "")}
                    </th>
                  ))}
                  <th className="py-2 pr-3">Veredito</th>
                  <th className="py-2">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {rotas.map((r) => (
                  <tr key={r.path} className="border-b border-border/60 align-top">
                    <td className="py-2 pr-3 font-medium text-foreground">{r.path}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{r.familia}</td>
                    {GATES.map((g) => (
                      <td key={g} className="py-2 pr-3">
                        <Status valor={r.gates[g] ?? "n/a"} />
                      </td>
                    ))}
                    <td className="py-2 pr-3">
                      <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${corVeredito[r.veredito]}`}>
                        {r.veredito}
                      </span>
                    </td>
                    <td className="py-2 text-xs text-muted-foreground">{r.motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
