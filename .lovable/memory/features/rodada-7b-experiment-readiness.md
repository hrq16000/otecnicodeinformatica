---
name: Rodada 7B — Experiment readiness e ativação auditável
description: Política central de prontidão de experimento (sessão elegível, thresholds, reason codes), painel em /admin/conversao e dois gates bloqueantes.
type: feature
---

## Política (`src/lib/experimentReadiness.ts`)

- Unidade experimental **sempre** = sessão elegível. Pageview/evento bruto é
  proibido como tamanho de amostra (gate + teste garantem).
- `EXPERIMENT_READINESS_POLICY` (experiment-001-v1): 200 sessões elegíveis por
  variação, 30 conversões primárias, 7 dias de janela, 90% de completude de
  contexto, MDE alvo 20% relativo (α 0,05 / power 80%).
- Métrica primária: `whatsapp_open` (+ `wa_click`) por sessão elegível,
  deduplicada por sessão.
- Estados: `NOT_READY`, `ACCUMULATING`, `READY`, `RUNNING`,
  `BLOCKED_DATA_QUALITY`, `BLOCKED_GUARDRAIL`.
- Reason codes: `INSUFFICIENT_SESSIONS`, `INSUFFICIENT_CONVERSIONS`,
  `OBSERVATION_WINDOW_INCOMPLETE`, `DATA_QUALITY_FAILURE`,
  `EXPERIMENT_CONTRACT_FAILURE`, `CONTEXT_COMPLETENESS_FAILURE`.
- QA excluído por `isQaEvent` antes de qualquer contagem.
- Sem baseline de conversão ⇒ **nenhuma estimativa de amostra é exibida**
  (proibido inventar projeção).

## Regra de ouro

`READY` = apto a iniciar, **nunca** iniciado. Ativação exige registro
versionado em `config/experiment-activations.json` (experimentId, versão,
estado anterior/novo, readinessStatus READY, razão, actor, timestamp).

## Gates bloqueantes

- `npm run check:experiment-readiness` — política íntegra e versionada.
- `npm run check:experiment-activation` — `ativo: true` sem registro auditável
  quebra o build; exposição continua fail-closed quando desligado.
- Ambos entram no `report:weekly-seo`.

## Painel

`/admin/conversao` → `PainelReadinessExperimento`: status, versão, sessões
elegíveis, conversões, taxa, dias, QA excluído, completude, duplicados, barras
de progresso e bloqueadores.

## Estado em 13/08/2026

Experimento 1 = `NOT_READY`: 0 sessões elegíveis nas rotas do escopo
(36 eventos / 17 sessões na base inteira, todas fora do escopo).
Não avançar para a Rodada 7C. Relatório: `docs/relatorio-rodada-7b-final.md`.
