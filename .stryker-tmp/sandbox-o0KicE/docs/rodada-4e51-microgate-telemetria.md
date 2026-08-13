# Rodada 4E.5.1 — Microgate final da governança de telemetria

QA/pré-baseline no agregado + fail-closed executável. Zero alteração comercial.

## 1. Resumo executivo

Os dois pontos pendentes da Rodada 4E.5 foram encerrados:

1. **Contaminação do agregado** — `click_events_daily` passou a ser um agregado
   **comercial**: QA e pré-baseline são excluídos no filtro do raw, **antes** do
   agrupamento, da generalização e do k=5. O primeiro agregado (2026-08-07),
   composto exclusivamente por eventos pré-baseline/QA, foi removido de forma
   auditável (o raw foi integralmente preservado).
2. **Fail-closed executável** — os dois guardas do `purge_click_events_raw` foram
   exercitados de verdade contra o banco, em **transação descartável com rollback
   garantido**, sem inserir dados falsos permanentes e sem apagar nada real.

Nenhuma rota, copy, CTA, funil, SEO, política pública, hipótese legal, Consent
Mode ou parâmetro de retenção foi alterado.

## 2. Git inicial

Base: árvore corrente do projeto no momento do microgate (Rodada 4E.5 concluída,
Edge Function `telemetry-maintenance` já publicada).

## 3. T1 e baseline comercial

- `T1 = 2026-08-08T00:05:45Z` — marco de **mensuração integral tecnicamente
  confiável**.
- `BASELINE_COMERCIAL_ISO = 2026-08-08T00:10:00Z` — início dos **dados elegíveis
  para taxas comerciais** (fim comprovado dos smoke tests de cutover).

Ambos preservados, sem alteração de valor. A documentação operacional vigente foi
corrigida onde chamava o marco antigo de "baseline T0 oficial"
(`docs/rodada-4e5-validacao-governanca-telemetria.md`, §9).

## 4. Agregado de 07/08

`event_date = 2026-08-07`, `rows_scanned = 24`, `rows_written = 3`,
`rows_suppressed = 5`.

Classificação: **QA/PRÉ-BASELINE** (100%). A janela inteira é anterior a
`BASELINE_COMERCIAL_ISO`; nenhum dos 24 eventos era elegível para análise
comercial. Como `click_events_daily` é o agregado comercial (Estratégia A), essas
3 linhas foram removidas e a remoção foi registrada em
`telemetry_retention_runs`. **Nenhum evento raw foi apagado** (96 linhas raw
antes e depois).

## 5. Regra de QA

Fonte de verdade no frontend: `src/lib/qaExclusion.ts` (UTMs de teste, session
IDs de QA e `created_at < BASELINE_COMERCIAL_ISO`).

O banco passou a ter regra **semanticamente equivalente**:
`public.is_qa_click_event(created_at, utm_source, utm_medium, utm_campaign,
session_id)` + `public.telemetry_baseline_comercial()`.

## 6. Consolidação comercial

`consolidate_click_events` aplica, no `WHERE` da leitura do raw:

```sql
AND NOT public.is_qa_click_event(created_at, utm_source, utm_medium, utm_campaign, session_id)
```

A run passa a registrar `scope = "comercial"` e
`qa_excluded_before_grouping = true` em `telemetry_retention_runs.details`.

Correção adicional de defeito real: o guarda do `purge_raw` exigia uma linha em
`click_events_daily` por dia; com a exclusão de QA, dias 100% QA nunca teriam
agregado e ficariam presos para sempre. O guarda passou a aceitar também a
cobertura por uma run de consolidação auditada (`run_type='consolidate'`,
`outcome='ok'`, `period_start..period_end`). O comportamento fail-closed foi
mantido: dia sem consolidação → bloqueio.

## 7. Ordem QA → k=5

Comprovada por leitura do corpo da função e pelo gate ampliado
(`scripts/check-telemetry-governance.mjs`, verificação 5): a posição do filtro
`NOT is_qa_click_event` é obrigatoriamente anterior ao `GROUP BY`, portanto:

```
raw → exclusão QA/pré-baseline → agrupar → generalizar → k=5 → gravar agregado
```

## 8. Fixture QA × comercial

Executada via `telemetry_guard_selftest()` (transação descartável):

| Verificação | Esperado | Obtido |
| --- | --- | --- |
| 5 comerciais + 5 QA na mesma rota/dia | `count = 5` | `5` |
| contaminação por QA | `false` | `false` |
| 5 eventos pré-baseline | ausente do agregado | `0` |

## 9. Painéis

- `AdminDashboard` e `AdminConversao` leem **apenas** `click_events` (raw) e
  aplicam `filtrarComerciais()` — QA e pré-baseline fora das taxas.
- Nenhum painel consome `click_events_daily`; portanto não há dupla contagem na
  fronteira raw/agregado, e o histórico agregado (agora comercial por
  construção) não reintroduz QA quando for adotado.

## 10. Fail-closed — consolidação ausente

Fixture: 6 eventos raw em `current_date - 200`, dia sem consolidação.
`purge_click_events_raw(false)` →
`deleted_rows = 0`, `blocked_days = 1`, run gravada com
`outcome = 'blocked'` e `reason = 'dias sem consolidacao validada'`.

## 11. Fail-closed — dry-run ausente

Fixture: raw elegível + consolidação válida + zero dry-run prévio.
`purge_click_events_raw(false)` → `deleted_rows = 0` e 1 run
`outcome='blocked'` com `reason = 'dry-run obrigatorio ainda nao executado'`.

## 12. Caminho permitido em fixture

Após dry-run válido, `purge_click_events_raw(false)` removeu os
`6` eventos da fixture — tudo revertido pelo rollback do autoteste.

Saída integral do autoteste:

```json
{
  "rolled_back": true,
  "fixture_comercial_count": 5,
  "fixture_qa_contaminou": false,
  "fixture_pre_baseline_count": 0,
  "idempotencia_run2_count": 5,
  "idempotencia_run2_linhas": 1,
  "failclosed_sem_consolidacao_deleted": 0,
  "failclosed_sem_consolidacao_blocked_days": 1,
  "failclosed_sem_dryrun_deleted": 0,
  "failclosed_sem_dryrun_blocked_logs": 1,
  "caminho_permitido_deleted": 6
}
```

## 13. Produção

**ZERO DELETE REAL** em `click_events`: 96 linhas raw antes e 96 depois do
microgate. A única remoção foi das 3 linhas do agregado pré-baseline de
2026-08-07, registrada em `telemetry_retention_runs`.

## 14. Idempotência

Segunda execução da consolidação sobre a mesma janela:
`count = 5` e `1` linha para a célula de teste (sem duplicação, sem inflação,
sem mudança de generalização).

## 15. Grants/RLS

Sem ampliação. `click_events_daily` e `telemetry_retention_runs` seguem sem
qualquer grant para `anon`; leitura apenas para `authenticated` com RLS
`has_role(auth.uid(), 'admin')`; manutenção via `service_role`. As rotinas
`consolidate_click_events`, `purge_click_events_raw`,
`purge_click_events_aggregates`, `is_qa_click_event`,
`telemetry_baseline_comercial` e `telemetry_guard_selftest` tiveram `EXECUTE`
revogado de `PUBLIC`/`anon`/`authenticated`, restando apenas `service_role`.

## 16. Viewport

Fluxo novo verificado nos eventos mais recentes: `viewport_width = NULL` e
`viewport_bucket` preenchido. Minimização preservada.

## 17. Gates

- `npm run check:telemetry-transparency` — OK (18 verificações)
- `npm run check:telemetry-governance` — OK (ampliado com a verificação 5:
  exclusão de QA antes do agrupamento + presença deste relatório)
- `npm run check:analytics-parity` — OK
- `npm run build` — OK
- `npx vitest run` — OK

## 18. Testes

Autoteste de banco `telemetry_guard_selftest()`, exposto apenas pela ação
`selftest` da Edge Function `telemetry-maintenance` (restrita a administradores
autenticados ou credencial de serviço). Todo o cenário roda dentro de um bloco
com `RAISE EXCEPTION` final, garantindo rollback total.

## 19. P0

Nenhum aberto.

## 20. P1

Nenhum aberto. Os dois P1 herdados da 4E.5 (agregado potencialmente contaminado
e fail-closed não exercitado) foram resolvidos nesta rodada.

## 21. P2

- Adotar `click_events_daily` nos painéis somente quando houver janela comercial
  útil (hoje eles usam raw com filtro de QA, o que é suficiente).

## 22. Arquivos alterados

- `supabase/migrations/*` — `is_qa_click_event`, `telemetry_baseline_comercial`,
  `consolidate_click_events` (exclusão de QA), `purge_click_events_raw`
  (cobertura por run de consolidação), limpeza auditável do agregado
  pré-baseline, `telemetry_guard_selftest`, revogações de `EXECUTE`.
- `supabase/functions/telemetry-maintenance/index.ts` — ação `selftest`.
- `scripts/check-telemetry-governance.mjs` — verificação 5 (ordem QA → k=5 e
  relatório 4E.5.1).
- `docs/rodada-4e5-validacao-governanca-telemetria.md` — nomenclatura T1 ×
  baseline comercial e status do agregado de 07/08.
- `docs/rodada-4e51-microgate-telemetria.md` — este relatório.

## 23. Decisão

GOVERNANÇA DE TELEMETRIA VALIDADA

## 24. Próximo passo

Encerrar definitivamente o ciclo 4E e retornar ao regime de observação
comercial. Nenhuma intervenção em TV, placas ou monitor até existir baseline
comercial útil.
