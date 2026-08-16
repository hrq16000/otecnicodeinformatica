import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BAIRROS } from "@/lib/bairrosData";
import { resolveLocal } from "@/lib/localIndexPolicy";

/**
 * INVENTÁRIO DE /bairros/* — apoio à seleção da próxima micro-rodada local.
 *
 * Cruza, por slug: decisão da política de indexação, profundidade real de
 * conteúdo (palavras úteis, FAQ, links internos) e o status de indexação
 * coletado do Search Console (public/gsc-local-status.json, fail-closed).
 * Nada aqui inventa número: campo sem fonte aparece como "—".
 */

interface StatusGsc {
  geradoEm: string;
  disponivel: boolean;
  rotas: { slug: string; path: string; status: string; coverageState?: string | null; ultimoCrawl?: string | null }[];
}

const corStatus: Record<string, string> = {
  INDEXED: "bg-emerald-500/15 text-emerald-500",
  DISCOVERED_NOT_INDEXED: "bg-amber-500/15 text-amber-500",
  CRAWLED_NOT_INDEXED: "bg-amber-500/15 text-amber-500",
  UNKNOWN: "bg-muted text-muted-foreground",
  NO_DATA: "bg-muted text-muted-foreground",
};

const contarPalavras = (valores: unknown[]): number =>
  valores
    .flatMap((v) => (typeof v === "string" ? [v] : Array.isArray(v) ? v.map((x) => (typeof x === "string" ? x : JSON.stringify(x ?? ""))) : [JSON.stringify(v ?? "")]))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

const AdminInventarioBairros = () => {
  const [gsc, setGsc] = useState<StatusGsc | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch("/gsc-local-status.json")
      .then((r) => (r.ok ? r.json() : null))
      .then(setGsc)
      .catch(() => setGsc(null));
  }, []);

  const linhas = useMemo(() => {
    return Object.entries(BAIRROS)
      .map(([slug, data]) => {
        const path = `/bairros/${slug}`;
        const politica = resolveLocal(path);
        const bruto = data as unknown as Record<string, unknown>;
        const palavras = contarPalavras(Object.values(bruto));
        const faq = Array.isArray(bruto.faqs) ? (bruto.faqs as unknown[]).length : 0;
        const links = Array.isArray(bruto.servicosPrioritarios) ? (bruto.servicosPrioritarios as unknown[]).length : 0;
        const statusGsc = gsc?.rotas.find((r) => r.slug === slug)?.status ?? "—";
        const oportunidade = palavras < 700 || faq < 4 || links < 3;
        return { slug, path, politica: politica.indexability, palavras, faq, links, statusGsc, oportunidade };
      })
      .filter((l) => l.slug.includes(busca.toLowerCase()))
      .sort((a, b) => Number(b.oportunidade) - Number(a.oportunidade) || a.palavras - b.palavras);
  }, [gsc, busca]);

  const emObservacao = gsc?.rotas ?? [];

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-2xl font-semibold text-foreground">Inventário de bairros</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Base para escolher os próximos bairros da micro-rodada local. "Oportunidade" marca páginas com
        conteúdo raso (menos de 700 palavras, FAQ curta ou poucos links internos).
      </p>

      <Card className="mt-6 p-4">
        <h2 className="font-heading text-sm font-semibold text-foreground">Coorte em observação (14 dias)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {gsc
            ? gsc.disponivel
              ? `Search Console coletado em ${new Date(gsc.geradoEm).toLocaleString("pt-BR")}.`
              : "Search Console indisponível — status exibido como UNKNOWN (fail-closed)."
            : "Nenhuma coleta disponível ainda (rode report:gsc-local)."}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {emObservacao.map((r) => (
            <div key={r.slug} className="rounded-lg border border-border p-3">
              <p className="text-sm font-medium text-foreground">{r.path}</p>
              <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[11px] ${corStatus[r.status] ?? corStatus.UNKNOWN}`}>
                {r.status}
              </span>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Último crawl: {r.ultimoCrawl ? new Date(r.ultimoCrawl).toLocaleDateString("pt-BR") : "—"}
              </p>
            </div>
          ))}
          {!emObservacao.length && <p className="text-xs text-muted-foreground">—</p>}
        </div>
      </Card>

      <div className="mt-6 max-w-sm">
        <Input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Filtrar por slug…" aria-label="Filtrar bairros por slug" />
      </div>

      <Card className="mt-4 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <caption className="sr-only">Inventário de rotas de bairro com política, conteúdo e indexação</caption>
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Rota</th>
              <th className="p-3">Política</th>
              <th className="p-3">Palavras</th>
              <th className="p-3">FAQ</th>
              <th className="p-3">Links</th>
              <th className="p-3">GSC</th>
              <th className="p-3">Oportunidade</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.slug} className="border-t border-border">
                <td className="p-3 font-medium text-foreground">{l.path}</td>
                <td className="p-3 text-muted-foreground">{l.politica}</td>
                <td className="p-3 text-muted-foreground">{l.palavras}</td>
                <td className="p-3 text-muted-foreground">{l.faq}</td>
                <td className="p-3 text-muted-foreground">{l.links}</td>
                <td className="p-3">
                  <span className={`rounded px-1.5 py-0.5 text-[11px] ${corStatus[l.statusGsc] ?? "bg-muted text-muted-foreground"}`}>
                    {l.statusGsc}
                  </span>
                </td>
                <td className="p-3">
                  {l.oportunidade ? (
                    <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[11px] text-amber-500">reescrever</span>
                  ) : (
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[11px] text-emerald-500">ok</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
};

export default AdminInventarioBairros;
