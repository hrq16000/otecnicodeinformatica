# Rodada 4C — Baseline de aquisição, conversão e provas reais

TV · Placas · Monitor — sem novas rotas, sem nova copy comercial.
Data: 07/08/2026.

## 1. Resumo executivo

A rodada encontrou **dois P0 reais de mensuração**, ambos corrigidos: a tabela
`click_events` estava **sem GRANT** para `anon`/`authenticated` e o `CHECK` de
`event_type` só aceitava `wa_click` e `call_click`. Resultado: **todo** evento
de funil disparado pelo site vinha sendo recusado pelo banco (a tabela estava
literalmente vazia). Depois da correção, o insert responde `201` e o evento
`funnel_open` chega com `path`, `funnel_stage`, `viewport_bucket`,
`attribution_channel` e `utm_source` preenchidos.

Consequência direta: **não existe baseline histórico** de aquisição/conversão
para as três verticais. Todos os KPIs desta rodada são `AMOSTRA INSUFICIENTE`.
A coleta começa agora, a partir do primeiro deploy pós-correção.

## 2. Git inicial

`git status --short` vazio · `git diff --stat` vazio. Auditoria iniciada limpa.

## 3–5. TV, Placas, Monitor (estado técnico)

| Página | Indexável | Sitemap | Prerender | Canonical self | Palavras (HTML sem JS) | Peso |
| --- | --- | --- | --- | --- | --- | --- |
| /servicos/conserto-tv | sim (`index, follow`) | sim | sim | sim | 4.324 | 47,7 KB |
| /servicos/conserto-placa | sim (`index, follow`) | sim | sim | sim | 3.486 | 41,5 KB |
| /servicos/conserto-monitor | sim (`index, follow`) | sim | sim | sim | 4.675 | 46,7 KB |

Crawler sem JavaScript recebe conteúdo útil nas três rotas (H1 único, ficha
comercial, FAQ e JSON-LD já presentes no HTML estático).

## 6. Indexação

Sem regressão. O P0 de prerender do Monitor (aberto na 4B) está **fechado**:
`dist/servicos/conserto-monitor/index.html` é gerado no build.

## 7. CTA hero (CTA editorial, não o float fixo)

| Página | 360×800 | 390×844 | 430×932 | Classificação |
| --- | --- | --- | --- | --- |
| TV | 681 px | 681 px | 585 px | aceitável / aceitável / confortável |
| Placas | 711 px | 711 px | 657 px | aceitável / aceitável / aceitável |
| Monitor | 615 px | 585 px | 585 px | confortável nos três |

Nenhum CTA acima de 750 px → **nenhuma alteração de layout nesta fase**.

## 8–9. Funil e contrato de eventos

Contrato preservado, sem renomeação:
`wa_funnel_open → wa_funnel_step → wa_funnel_submit → wa_click`.

Campos realmente presentes no payload persistido: `event_type`, `cta_location`,
`funnel_stage`, `viewport_bucket`, `viewport_width`, `cta_position`, `variant`,
`modalidade`, `equipamento`, `problema`, `servico`, `bairro`, `cidade`,
`customer_type`, `session_id`, `path`, `route_type`, `utm_source`,
`utm_medium`, `utm_campaign`, `attribution_channel`.
Não existem campos `service`, `source`, `referrer` — o equivalente real é
`servico`, `attribution_channel` e `utm_*`.

## 10. KPIs por rota

| KPI | TV | Placas | Monitor |
| --- | --- | --- | --- |
| Page views | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE |
| CTA | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE |
| Funnel open | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE |
| Funnel submit | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE |
| WhatsApp | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE |
| Page→WA | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE | AMOSTRA INSUFICIENTE |

Motivo: banco recusava 100% dos eventos até esta rodada (P0-1 e P0-2).

## 11. Origem

Agrupamento disponível: `organic`, `direct`, `internal`, `referral`, `paid`,
`social` via `attribution_channel` + `utm_*`. Limitação real: sem
cross-device, sem view-through e sem dedupe entre GA4 e banco — a atribuição é
de last-touch por sessão.

## 12. Search Console

`SEARCH CONSOLE: SEM DADO` — nenhuma propriedade vinculada ao projeto. Nada
estimado.

## 13. Queries

`SEM DADO`. Os grupos de intenção (TV / Placas / Monitor) ficam registrados
para agrupamento futuro. Nenhuma página de sintoma criada.

## 14–15. Provas reais e manifesto

Nenhuma prova real publicada nas três verticais. Manifesto
`docs/registro-provas-visuais.md` atualizado com a linha do Monitor, a fila de
captura por prioridade, o padrão de foto e a regra de legenda factual.
Política fail-closed mantida: stock nunca é prova.

## 16. Canibalização

`check:cannibalization` verde. Contrato respeitado: equipamento completo →
rota do equipamento; placa isolada → `/servicos/conserto-placa`. Sem
sobreposição TV × placa, Monitor × placa ou Monitor × informática.

## 17. B2B placas

Sem leads registrados (base vazia) → nenhum sinal `técnico/assistência/empresa`
a avaliar. Status: `MERECE AUDITORIA FUTURA` quando houver amostra.

## 18. Gargalo por rota

| Página | Gargalo | Evidência |
| --- | --- | --- |
| TV | Indeterminado (mensuração quebrada) | 0 linhas em `click_events`; insert recusado por GRANT + CHECK |
| Placas | Indeterminado (mensuração quebrada) | idem |
| Monitor | Indeterminado (mensuração quebrada) | idem |

Estágio E (operação) não avaliado — sem dados operacionais.

## 19. P0 (corrigidos nesta rodada)

1. **Sem GRANT em `public.click_events`** para `anon`/`authenticated` →
   toda gravação de evento falhava. Corrigido por migração.
2. **CHECK `click_events_event_type_check`** aceitava apenas `wa_click` e
   `call_click`, recusando `funnel_open` e `funnel_stage` com erro `23514`.
   Corrigido por migração; insert validado com resposta `201`.

## 20. P1

- `servico` chega `null` em `funnel_open` nas rotas de serviço; o recorte por
  vertical hoje depende de `path`/`cta_location`. Não alterado (fora do escopo
  de correção P0 desta rodada).

## 21. P2

- Sem interlink direto entre `conserto-monitor` ↔ `conserto-placa` e
  `conserto-tv` ↔ `conserto-placa` no HTML estático (gate `internal-links`
  passa via hub `/servicos`). Avaliar em rodada de conteúdo.
- Avisos de dev `Function components cannot be given refs` (ruído, não afeta
  produção).

## 22. Arquivos alterados

- `docs/registro-provas-visuais.md` (manifesto)
- `docs/rodada-4c-baseline-aquisicao.md` (este relatório)
- 2 migrações de banco (GRANT + CHECK de `event_type`)

Nenhuma página, copy, rota ou preço alterado.

## 23. Gates

Build limpo. 15 gates executados, **todos PASS**: `check:seo`,
`check:seo:curated`, `check:cannibalization`, `check:internal-links`,
`check:orphan-pages`, `check:sitemap-source`, `check:editorial-governance`,
`check:jsonld-refs`, `check:jsonld-parity`, `check:trust-claims`,
`check:soft404`, `check:copy`, `check:consolidation-3w`,
`check:multielectronics-3y`, `check:premium-tv-board-4a`.
`npx vitest run`: 10 arquivos, **90 testes verdes**. Nenhum gate novo criado.

## 24. Git final

Apenas os dois documentos acima + migrações aplicadas.

## 25. Decisão

**EXISTEM FALHAS DE MENSURAÇÃO ANTES DA OTIMIZAÇÃO** — falhas identificadas e
corrigidas nesta rodada; o baseline só começa a existir a partir de agora.

## 26. Próximo passo

Não alterar as páginas. Publicar para ativar a gravação corrigida, acumular
aquisição e conversão por período útil, produzir as provas fotográficas reais
conforme a fila de captura e só reavaliar com amostra. Nenhuma quarta vertical
até haver baseline mensurável + provas reais + ausência de P0.
