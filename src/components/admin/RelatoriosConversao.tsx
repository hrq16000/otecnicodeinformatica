import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { rate } from "@/lib/analyticsContract";
import { canalDoEvento, CANAL_LABEL } from "@/lib/canalAtribuicao";
import { baixarCsv, imprimirPdf, type Relatorio } from "@/lib/relatorioExport";
import type { EventoRodada6 } from "@/components/admin/FunilRodada6";

/**
 * RODADA 6 — exportação CSV/PDF dos relatórios do painel.
 *
 * Períodos: 7 / 30 / 90 dias (janela móvel sobre o intervalo carregado).
 * Recortes: rota, cidade, bairro, serviço e canal.
 * Só agregados por sessão — nenhum dado pessoal sai daqui.
 */

type Evento = EventoRodada6 & {
  utm_source?: string | null;
  utm_medium?: string | null;
  attribution_channel?: string | null;
};

type Celula = {
  sessoes: Set<string>;
  cta: Set<string>;
  triagem: Set<string>;
  whatsapp: Set<string>;
};

const nova = (): Celula => ({ sessoes: new Set(), cta: new Set(), triagem: new Set(), whatsapp: new Set() });

const ETAPA: Record<string, keyof Celula> = {
  cta_click: "cta",
  funnel_open: "triagem",
  triage_start: "triagem",
  triage_complete: "triagem",
  wa_click: "whatsapp",
  whatsapp_open: "whatsapp",
};

/** Cidade derivada da rota — sem fallback para Curitiba. */
function cidadeDe(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  const svc = path.match(/^\/servicos\/[^/]+\/([a-z0-9-]+)$/);
  if (svc) return svc[1];
  const local = path.match(/^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/);
  return local ? local[1] : undefined;
}

const DIMENSOES = [
  { id: "rota", label: "Rota" },
  { id: "cidade", label: "Cidade" },
  { id: "bairro", label: "Bairro" },
  { id: "servico", label: "Serviço" },
  { id: "canal", label: "Canal" },
] as const;

type DimensaoId = (typeof DIMENSOES)[number]["id"];

function chaveDe(dim: DimensaoId, e: Evento): string | undefined {
  switch (dim) {
    case "rota":
      return e.path || undefined;
    case "cidade":
      return cidadeDe(e.path);
    case "bairro":
      return e.neighborhood_slug || undefined;
    case "servico":
      return e.servico || undefined;
    case "canal":
      return CANAL_LABEL[canalDoEvento(e)];
    default:
      return undefined;
  }
}

const COLUNAS = ["Chave", "Sessões", "CTA", "Triagem", "WhatsApp", "WA/sessão %", "Amostra"];

function montarRelatorio(rows: Evento[], dim: DimensaoId, dias: number): Relatorio {
  const corte = Date.now() - dias * 24 * 60 * 60 * 1000;
  const mapa = new Map<string, Celula>();
  for (const e of rows) {
    if (new Date(e.created_at).getTime() < corte) continue;
    const chave = chaveDe(dim, e);
    if (!chave) continue;
    const c = mapa.get(chave) ?? nova();
    const sid = e.session_id || e.created_at;
    c.sessoes.add(sid);
    const etapa = ETAPA[e.event_type];
    if (etapa) c[etapa].add(sid);
    mapa.set(chave, c);
  }
  const linhas = [...mapa.entries()]
    .sort((a, b) => b[1].sessoes.size - a[1].sessoes.size)
    .map(([chave, c]) => {
      const taxa = rate(c.whatsapp.size, c.sessoes.size);
      return {
        Chave: chave,
        "Sessões": c.sessoes.size,
        CTA: c.cta.size,
        Triagem: c.triagem.size,
        WhatsApp: c.whatsapp.size,
        "WA/sessão %": taxa == null ? "—" : Math.round(taxa * 100),
        Amostra: c.sessoes.size >= 50 ? "actionable" : c.sessoes.size >= 15 ? "learning" : "insufficient_data",
      };
    });
  const label = DIMENSOES.find((d) => d.id === dim)?.label ?? dim;
  return {
    titulo: `Conversão por ${label.toLowerCase()}`,
    periodo: `Últimos ${dias} dias`,
    colunas: COLUNAS,
    linhas,
    observacao:
      "Sessões distintas por etapa. Tráfego de QA excluído. Recortes sem valor declarado ficam fora (sem fallback geográfico).",
  };
}

export const RelatoriosConversao = ({ rows }: { rows: Evento[] }) => {
  const [dias, setDias] = useState<7 | 30 | 90>(30);
  const [dim, setDim] = useState<DimensaoId>("rota");

  const relatorio = useMemo(() => montarRelatorio(rows, dim, dias), [rows, dim, dias]);
  const todos = useMemo(
    () => DIMENSOES.map((d) => montarRelatorio(rows, d.id, dias)),
    [rows, dias],
  );

  return (
    <Card className="p-4">
      <h3 className="font-heading text-lg font-semibold">Exportar relatórios</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        Escolha o período e o recorte. O PDF sai com todos os recortes do período selecionado.
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        <div className="flex gap-1" role="group" aria-label="Período do relatório">
          {([7, 30, 90] as const).map((d) => (
            <Button key={d} size="sm" variant={dias === d ? "default" : "outline"} onClick={() => setDias(d)}>
              {d}d
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Recorte do relatório">
          {DIMENSOES.map((d) => (
            <Button key={d.id} size="sm" variant={dim === d.id ? "default" : "outline"} onClick={() => setDim(d.id)}>
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          className="gap-2"
          disabled={relatorio.linhas.length === 0}
          onClick={() => baixarCsv(relatorio, `conversao_${dim}_${dias}d`)}
        >
          <Download className="h-4 w-4" aria-hidden />
          Exportar CSV ({relatorio.linhas.length} linhas)
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          disabled={todos.every((r) => r.linhas.length === 0)}
          onClick={() => imprimirPdf(todos, `Janela de ${dias} dias · rota, cidade, bairro, serviço e canal`)}
        >
          <FileText className="h-4 w-4" aria-hidden />
          Exportar PDF (todos os recortes)
        </Button>
      </div>

      {relatorio.linhas.length === 0 && (
        <p className="mt-3 text-xs text-muted-foreground">Sem dados no período para este recorte.</p>
      )}
    </Card>
  );
};
