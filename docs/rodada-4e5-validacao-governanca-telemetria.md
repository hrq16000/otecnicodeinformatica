# Rodada 4E.5 — Relatório de Validação da Governança de Telemetria

Data da execução: 2026-08-08 (UTC)
Escopo: validar em produção a implementação da Rodada 4E.4. Nenhuma alteração de
funil, copy comercial, SEO ou rotas foi feita (Regra Zero respeitada).

---

## 1. Resumo executivo

| Item | Situação |
| --- | --- |
| Minimização (`viewport_width` deixou de ser persistido) | **Aprovado** |
| Consolidação diária com k=5 | **Aprovado após correção P0** |
| Supressão de células de baixa cardinalidade | **Aprovado** |
| Idempotência da consolidação | **Aprovado** |
| Dry-run do expurgo (raw e agregado) | **Aprovado** |
| Fail-closed do expurgo raw | **Parcialmente verificado** (ver §6) |
| Grants/RLS das tabelas de governança | **Aprovado após correção P1** |
| Exclusão de tráfego de QA | **Aprovado** |

Foram encontrados **1 defeito P0** e **1 defeito P1**, ambos corrigidos e revalidados
nesta mesma rodada.

---

## 2. Defeito P0 — consolidação nunca executava

A função `consolidate_click_events` abortava com
`UPDATE requires a WHERE clause` nos passos de generalização progressiva
(`UPDATE _low SET ...` sem cláusula `WHERE`, bloqueado pelo modo de atualização
segura do banco).

Consequência real: **nenhum agregado diário jamais foi gravado**. Como o expurgo
raw é fail-closed e exige dias consolidados, a política de retenção de 90 dias
também estava inoperante — só não houve perda de dados porque ainda não existem
eventos com mais de 90 dias.

Correção: recriação da função com `WHERE true` explícito nos quatro níveis de
generalização. Nenhum parâmetro de governança foi alterado (k=5, 90 dias, 24 meses).

## 3. Defeito P1 — permissões excedentes

`click_events_daily` e `telemetry_retention_runs` tinham `GRANT ALL` para `anon` e
`authenticated`, apesar de as políticas de acesso só preverem leitura por
administradores. As permissões foram revogadas e reconcedidas como:

- `authenticated`: apenas leitura (a política RLS restringe a administradores);
- `service_role`: acesso completo (rotinas de manutenção);
- `anon`: sem permissão alguma.

`click_events` permanece com inserção pública (coleta first-party) e leitura
restrita a administradores — inalterado.

---

## 4. Evidências da consolidação (k=5)

Execução sobre o dia fechado 2026-08-07:

```text
rows_scanned = 24   rows_written = 3   rows_suppressed = 5
```

Agregado resultante:

| event_date | event_type | path | cta_location | customer_type | viewport_bucket | count | generalizado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-08-07 | funnel_stage | /servicos/conserto-tv | (agrupado) | (agrupado) | 390 | 8 | sim |
| 2026-08-07 | funnel_open | (agrupado) | (agrupado) | (agrupado) | (agrupado) | 6 | sim |
| 2026-08-07 | funnel_stage | /servicos/conserto-monitor | (agrupado) | (agrupado) | 390 | 5 | sim |

Conferência:

- menor célula publicada = **5** → limite k=5 respeitado, sem exceções;
- reconciliação: 19 preservados + 5 suprimidos = 24 escaneados = 24 eventos brutos
  do dia (delta zero);
- todas as células publicadas passaram por generalização, ou seja, nenhuma
  combinação de granularidade máxima sobreviveu.

**Idempotência:** a segunda execução para o mesmo período devolveu exatamente
`24 / 3 / 5` e o agregado permaneceu com 3 células e total 19 — sem duplicação e
sem inflar contagens.

---

## 5. Evidências do dry-run de expurgo

```text
purge_raw        dry_run=true → candidate_rows=0, deleted_rows=0, blocked_days=0
purge_aggregate  dry_run=true → candidate_rows=0, deleted_rows=0
```

Corte calculado corretamente: 2026-05-10 (90 dias) para eventos brutos e
2024-08-08 (24 meses) para agregados. Ambas as execuções ficaram registradas em
`telemetry_retention_runs` com `outcome = dry_run`. **Nenhum registro foi apagado
nesta rodada.**

---

## 6. Fail-closed — limitação declarada

O bloqueio do expurgo raw quando existem dias sem consolidação validada foi
verificado por revisão do código da função, mas **não foi exercitado em execução
real**: fazer isso exigiria inserir eventos antigos sintéticos na base de
produção, o que contraria a regra de não fabricar dados. O segundo guarda
(exigência de um dry-run prévio antes do primeiro expurgo real) já está satisfeito
pelo registro de 2026-08-08.

Recomendação: exercitar esse caminho na primeira vez que existirem eventos
próximos de 90 dias, com dry-run obrigatório antes de qualquer execução real.

---

## 7. Minimização de dados

`viewport_width` não é mais enviado ao banco: a coluna é removida do objeto antes
da inserção e apenas `viewport_bucket` (faixa) é persistido.

```text
total de eventos           96
eventos com viewport_width 92
último registro com valor  2026-08-08 01:03:27 UTC
```

Todos os 92 registros são anteriores ao deploy da minimização; todos os eventos
gravados depois têm `viewport_width` nulo. Os valores históricos permanecem
sujeitos ao expurgo de 90 dias e não aparecem em nenhum agregado (a coluna não
faz parte de `click_events_daily`).

O gate `check:telemetry-governance` segue verde.

---

## 8. Operação das rotinas

As rotinas passaram a ser operáveis por uma função de manutenção protegida
(`telemetry-maintenance`), com quatro ações: `status`, `consolidate`,
`purge_raw` e `purge_aggregates`. Regras de acesso:

- administrador autenticado, ou credencial de serviço do próprio backend;
- chave pública/visitante anônimo recebem 401 (verificado em teste);
- expurgo real exige `dry_run: false` explícito — o padrão é sempre simulação.

---

## 9. Estado final

- Baseline T0 preservado; nenhum evento de produção foi apagado ou alterado.
- Primeiro agregado diário oficial: 2026-08-07 (3 células, 19 eventos).
- Governança operante de ponta a ponta, exceto o caminho fail-closed do §6.
