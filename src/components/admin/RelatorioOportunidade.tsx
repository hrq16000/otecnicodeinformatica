import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  analisarOportunidades,
  formatarTaxa,
  CLASSE_LABEL,
  LIMIARES,
  type ClasseOportunidade,
  type Dimensao,
  type EventoOportunidade,
} from "@/lib/oportunidadeAnalise";
import { baixarCsv, imprimirPdf, type Relatorio } from "@/lib/relatorioExport";

/**
 * RODADA 6B — RELATÓRIO DE OPORTUNIDADE
 * Expand candidate · Improve page · Low evidence
 * por rota, cidade, bairro, serviço e canal, com export CSV/PDF.
 */

const DIMENSOES: { valor: Dimensao; rotulo: string }[] = [
  { valor: "rota", rotulo: "Rota" },
  { valor: "cidade", rotulo: "Cidade" },
  { valor: "bairro", rotulo: "Bairro" },
  { valor: "servico", rotulo: "Serviço" },
  { valor: "canal", rotulo: "Canal" },
];

const VARIANTE: Record<ClasseOportunidade, "default" | "secondary" | "outline"> = {
  expand_candidate: "default",
  improve_page: "outline",
  low_evidence: "secondary",
};

const COLUNAS = ["Dimensão", "Chave", "Sessões", "CTA", "Triagem", "WhatsApp", "WA/sessão", "Classificação", "Motivo"];

export const RelatorioOportunidade = ({
  rows,
  periodo = "período carregado",
}: {
  rows: EventoOportunidade[];
  periodo?: string;
}) => {
  const [dimensao, setDimensao] = useState<Dimensao>("rota");
  const recortes = useMemo(() => analisarOportunidades(rows), [rows]);
  const visiveis = useMemo(() => recortes.filter((r) => r.dimensao === dimensao).slice(0, 60), [recortes, dimensao]);

  const resumo = useMemo(() => {
    const c: Record<ClasseOportunidade, number> = { expand_candidate: 0, improve_page: 0, low_evidence: 0 };
    for (const r of recortes) c[r.classe] += 1;
    return c;
  }, [recortes]);

  const relatorio = (dim: Dimensao): Relatorio => ({
    titulo: `Oportunidades por ${DIMENSOES.find((d) => d.valor === dim)?.rotulo}`,
    periodo,
    colunas: COLUNAS,
    linhas: recortes
      .filter((r) => r.dimensao === dim)
      .map((r) => ({
        "Dimensão": dim,
        Chave: r.chave,
        "Sessões": r.sessoes,
        CTA: r.cta,
        Triagem: r.triagem,
        WhatsApp: r.whatsapp,
        "WA/sessão": formatarTaxa(r.taxaWhatsapp),
        "Classificação": CLASSE_LABEL[r.classe],
        Motivo: r.motivo,
      })),
    observacao: `Amostra mínima ${LIMIARES.amostraMinima} sessões · alvo WhatsApp/sessão ${(LIMIARES.taxaAlvoWhatsapp * 100).toFixed(0)}% · tráfego de QA excluído`,
  });

  return (
    <Card className="mt-6 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-heading text-lg font-semibold">Relatório de oportunidade</h3>
          <p className="text-xs text-muted-foreground">
            Expandir ({resumo.expand_candidate}) · Melhorar ({resumo.improve_page}) · Evidência baixa (
            {resumo.low_evidence}). Volume sempre ao lado da taxa.
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => baixarCsv(relatorio(dimensao), `oportunidades-${dimensao}`)}>
            CSV
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => imprimirPdf(DIMENSOES.map((d) => relatorio(d.valor)), `Oportunidades — ${periodo}`)}
          >
            PDF
          </Button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {DIMENSOES.map((d) => (
          <Button
            key={d.valor}
            size="sm"
            variant={dimensao === d.valor ? "default" : "outline"}
            onClick={() => setDimensao(d.valor)}
          >
            {d.rotulo}
          </Button>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Sem dados nesta dimensão no período.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 pr-3">Chave</th>
                <th className="py-2 pr-3 text-right">Sessões</th>
                <th className="py-2 pr-3 text-right">CTA</th>
                <th className="py-2 pr-3 text-right">Triagem</th>
                <th className="py-2 pr-3 text-right">WhatsApp</th>
                <th className="py-2 pr-3 text-right">WA/sessão</th>
                <th className="py-2">Classificação</th>
              </tr>
            </thead>
            <tbody>
              {visiveis.map((r) => (
                <tr key={`${r.dimensao}-${r.chave}`} className="border-b border-border/60">
                  <td className="max-w-[20rem] truncate py-2 pr-3 font-mono text-xs" title={r.chave}>
                    {r.chave}
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.sessoes}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.cta}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.triagem}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.whatsapp}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{formatarTaxa(r.taxaWhatsapp)}</td>
                  <td className="py-2">
                    <Badge variant={VARIANTE[r.classe]} title={r.motivo}>
                      {CLASSE_LABEL[r.classe]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
