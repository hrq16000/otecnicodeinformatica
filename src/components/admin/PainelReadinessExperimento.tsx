/**
 * RODADA 7B — BLOCO DE PRONTIDÃO DO EXPERIMENTO
 *
 * Mostra, derivado dos dados reais: status, sessões elegíveis, conversões
 * primárias, dias observados, qualidade dos dados e estimativa de amostra.
 * Sem falsa precisão: projeções aparecem como estimativa baseada no tráfego
 * recente, nunca como promessa. READY não ativa nada.
 */
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  calcularReadiness,
  EXPERIMENT_READINESS_POLICY,
  type EventoReadiness,
  type ReadinessStatus,
} from "@/lib/experimentReadiness";

const CORES: Record<ReadinessStatus, "default" | "secondary" | "destructive" | "outline"> = {
  READY: "default",
  RUNNING: "default",
  ACCUMULATING: "secondary",
  NOT_READY: "outline",
  BLOCKED_DATA_QUALITY: "destructive",
  BLOCKED_GUARDRAIL: "destructive",
};

const MOTIVOS: Record<string, string> = {
  INSUFFICIENT_SESSIONS: "Sessões elegíveis abaixo do mínimo",
  INSUFFICIENT_CONVERSIONS: "Conversões primárias abaixo do mínimo",
  OBSERVATION_WINDOW_INCOMPLETE: "Janela de observação incompleta",
  DATA_QUALITY_FAILURE: "Gate de qualidade de dados vermelho",
  EXPERIMENT_CONTRACT_FAILURE: "Contrato do experimento inválido",
  CONTEXT_COMPLETENESS_FAILURE: "Perda material de contexto nos eventos",
};

export const PainelReadinessExperimento = ({
  rows,
  gatesVermelhos = [],
}: {
  rows: EventoReadiness[];
  gatesVermelhos?: string[];
}) => {
  const r = useMemo(() => calcularReadiness({ eventos: rows, gatesVermelhos }), [rows, gatesVermelhos]);
  const p = EXPERIMENT_READINESS_POLICY;
  const taxa = `${(r.baseline.taxaPrimaria * 100).toFixed(1)}%`;

  return (
    <Card className="p-4">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h2 className="font-heading text-lg font-bold text-foreground">Prontidão do Experimento 1</h2>
        <Badge variant={CORES[r.status]}>{r.status}</Badge>
        <Badge variant="outline">{r.experimentVersion}</Badge>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Unidade experimental: sessão elegível (produção, fora de QA, dentro do escopo declarado). Métrica
        primária: <strong>{p.primaryMetric.id}</strong> por sessão elegível. READY significa apto a iniciar —
        a ativação continua sendo explícita, versionada e auditável.
      </p>

      <dl className="mb-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
        {[
          ["Sessões elegíveis", String(r.baseline.sessoesElegiveis)],
          ["Conversões primárias", String(r.baseline.conversoesPrimarias)],
          ["Taxa primária", taxa],
          ["Dias observados", String(r.baseline.diasObservados)],
          ["Sessões QA excluídas", `${r.baseline.sessoesExcluidasQa} (${(r.baseline.percentualQa * 100).toFixed(0)}%)`],
          ["Contexto completo", `${(r.baseline.completudeContexto * 100).toFixed(0)}%`],
          ["Eventos duplicados", String(r.baseline.eventosDuplicados)],
          [
            "Qualidade dos dados",
            r.gatesVermelhos.length === 0 ? "verde" : `vermelho: ${r.gatesVermelhos.join(", ")}`,
          ],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-border p-2">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="font-semibold text-foreground">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-4 space-y-2">
        {r.progresso.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.rotulo}</span>
              <span>
                {item.atual} / {item.alvo} · {item.percentual}%
              </span>
            </div>
            <Progress value={item.percentual} className="h-2" />
          </div>
        ))}
      </div>

      {r.motivos.length > 0 && (
        <div className="mb-3 rounded-md border border-border bg-muted/40 p-3 text-sm">
          <p className="mb-1 font-semibold text-foreground">Bloqueadores</p>
          <ul className="list-inside list-disc text-muted-foreground">
            {r.motivos.map((m) => (
              <li key={m}>
                <code className="text-xs">{m}</code> — {MOTIVOS[m] ?? m}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {r.estimativa.sessoesNecessariasPorVariacao
          ? `Estimativa baseada no tráfego recente: ~${r.estimativa.sessoesNecessariasPorVariacao} sessões por variação para detectar um ganho relativo de ${(p.mdeAlvo * 100).toFixed(0)}% (bicaudal, 95% de confiança, 80% de poder).`
          : "Sem baseline de conversão suficiente para estimar tamanho de amostra — nenhuma projeção é exibida."}
        {r.estimativa.diasEstimados && r.estimativa.diasEstimados > 0
          ? ` No ritmo atual, a acumulação levaria cerca de ${r.estimativa.diasEstimados} dia(s).`
          : ""}
      </p>
    </Card>
  );
};
