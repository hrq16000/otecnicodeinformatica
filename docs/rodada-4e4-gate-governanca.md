# Rodada 4E.4 — Gate de entrada da governança de telemetria

Status: **GATE LIBERADO — GOVERNANÇA APROVADA PARA IMPLEMENTAÇÃO**
Data da decisão: 07/08/2026 — Curitiba/PR (referência UTC 08/08/2026)
Aprovado por: Henrique Rodrigues — responsável pelo projeto e pela decisão interna de governança

> Decisão interna de governança do projeto. Não constitui parecer jurídico profissional externo.
> Formulário original de decisão: [`docs/rodada-4e4-gov-pacote-decisao.md`](./rodada-4e4-gov-pacote-decisao.md).

## 1. Verificação do gate de entrada

| Item obrigatório | Evidência documental | Situação |
|---|---|---|
| Hipótese legal aprovada | legítimo interesse (art. 7º, IX) — [teste de balanceamento](./rodada-4e4-teste-balanceamento.md) | **APROVADO** |
| Prazo de retenção raw (`RAW_RETENTION_DAYS`) | 90 dias — decisão 2 | **APROVADO** |
| Teste de balanceamento | [`docs/rodada-4e4-teste-balanceamento.md`](./rodada-4e4-teste-balanceamento.md) | **APROVADO COM CONDIÇÕES** |
| Política de agregados | dimensões fechadas, k = 5, guarda de 24 meses | **APROVADA** |

Parâmetros fechados da implementação:

```text
LEGAL_BASIS = LEGITIMATE_INTEREST
RAW_RETENTION_DAYS = 90
AGGREGATE_RETENTION_MONTHS = 24
LOW_COUNT_THRESHOLD = 5
PERSIST_VIEWPORT_WIDTH = false
GOVERNANCE_REVIEW_MONTHS = 12
```

## 2. O que foi implementado nesta reabertura

| Fase | Entrega | Situação |
|---|---|---|
| 2 — Minimização | `viewport_width` deixou de ser persistido em `click_events` (`src/lib/funnelAnalytics.ts`); `viewport_bucket` mantido; `bairro`/`cidade` mantidos para reavaliação | Concluída |
| 3 — Agregados | Tabela `click_events_daily` com as dimensões aprovadas, sem `session_id`, sem `viewport_width` e sem timestamp fino | Concluída |
| 4 — Consolidação | `consolidate_click_events(p_until)` com generalização progressiva e supressão de células com menos de 5 ocorrências | Concluída |
| 5 — Expurgo | `purge_click_events_raw(p_dry_run)` fail-closed: bloqueia dias não consolidados e exige dry-run prévio; `purge_click_events_aggregates()` aplica os 24 meses | Concluída |
| 8 — Auditoria | `telemetry_retention_runs` registra modo, período, quantidades e resultado de cada execução | Concluída |
| 9 — ROPA | [`docs/ropa-telemetria-click-events.md`](./ropa-telemetria-click-events.md) | Concluída |
| 10 — Balanceamento | [`docs/rodada-4e4-teste-balanceamento.md`](./rodada-4e4-teste-balanceamento.md) | Concluída |
| 12 — Gate | `npm run check:telemetry-governance` | Concluída |

Pendências deliberadas (fora do escopo autorizado desta reabertura):

- Fase 6 — agendamento automático do ciclo (só após o primeiro dry-run avaliado).
- Fase 7 — fronteira raw/agregado nos painéis (depende de agregado com volume útil).
- Fase 11 — atualização do prazo na política pública (executar junto do primeiro
  ciclo real de expurgo, para o texto público refletir prática já vigente).
- Condição 7 do balanceamento — revisão após o primeiro baseline útil.

## 3. Invariantes preservados

Zero alteração no funil comercial, CTAs, preços, garantia, SEO, interlinking,
páginas e rotas. Zero nova finalidade. Zero ampliação de grants públicos:
`anon` segue apenas inserindo eventos, leitura dos agregados é restrita a
administradores via RLS e as rotinas de retenção só executam pelo backend.
Marco T1 (2026-08-08T00:05:45Z) inalterado; exclusão de tráfego QA e
Consent Mode v2 inalterados.

## 4. Decisão

**GOVERNANÇA APROVADA — IMPLEMENTAÇÃO EXECUTADA CONFORME OS PARÂMETROS FECHADOS**

Próximo passo: executar o dry-run de expurgo (`purge_click_events_raw(true)`)
quando existirem eventos com mais de 90 dias, avaliar o resultado registrado em
`telemetry_retention_runs` e só então autorizar o primeiro expurgo real.
