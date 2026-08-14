# Rodada 6 — Conversão e mensuração por rota (relatório final)

Fonte de dados: `click_events` (telemetria própria) + `funnel_submissions`
(leads) + GA4. Tráfego de QA excluído por `filtrarComerciais` /
`is_qa_click_event` (baseline comercial `2026-08-08T00:10:00Z`).
Painel: `/admin/conversao`. Contrato: `docs/analytics-event-contract.md`.

## 1. Resumo executivo

A cadeia **URL → visualização → CTA → triagem → WhatsApp → lead → OS** passou a
existir de ponta a ponta, com contexto de rota em todos os eventos e sem PII:

- Contrato único de eventos (`src/lib/analyticsContract.ts`) com famílias de
  rota, intenção, `journey_id` efêmero (TTL 30 min) e `event_id` para dedupe.
- `click_events` evoluída com `route_family`, `intent`, `neighborhood_slug`,
  `journey_id`, `event_id` e `landing_route`.
- `funnel_submissions` passou a registrar a rota que originou o lead
  (`origin_route`, `route_family`, `city`, `neighborhood_slug`,
  `service_slug`, `journey_id`, `landing_route`).
- Conversões de WhatsApp e ligação enviam `city` e `neighborhood_slug` ao GA4
  **somente quando a rota os declara** — nunca "curitiba" por herança.
- Painel `/admin/conversao` ganhou janelas de 7/30/90 dias, funil por sessão,
  rotas que mais convertem e análise de first touch / last touch / jornadas
  assistidas, com zero-states seguros (sem NaN) e status de amostra.

## 2. Como ler as tabelas do painel

| Tabela | Chave | Denominador |
| --- | --- | --- |
| Por rota | `path` | sessões com `page_view` na rota |
| Por família de rota | `route_family` | idem |
| Por cidade | cidade derivada da rota | idem |
| Por bairro | `neighborhood_slug` (bairros âncora) | idem |
| Por serviço | `service_slug` | idem |

Status de amostra: `insufficient_data` (<30), `learning` (30–199),
`actionable` (≥200). Abaixo de "acionável" o painel **não** gera recomendação.

## 3. Evidências

- Gate `npm run check:analytics-event-contract` — eventos canônicos presentes,
  zero campos sensíveis em payload, zero fallback geográfico.
- Realtime restrito à allowlist de `src/lib/realtimeSafeFields.ts`.
- Retenção preservada: 90 dias raw / 24 meses agregado, k=5 na consolidação.
- Monitoramento diário de similaridade bairro×cidade e bairro×bairro:
  `.github/workflows/local-similarity-daily.yml`.

## 4. Vereditos

1. **Mensuração por rota — aprovado.** Toda conversão carrega rota, família,
   intenção, cidade e bairro quando existem; ausência é explícita.
2. **Atribuição de lead — aprovado com observação.** O vínculo lead ↔ rota já é
   gravado; a leitura só vira acionável quando cada recorte atingir 200 sessões.
3. **Leitura de resultado — em observação.** Enquanto o volume comercial pós
   go-live for baixo, decisões de conteúdo continuam dependendo de evidência do
   Search Console, não do painel isoladamente.

## 5. Próximos passos

- Acompanhar semanalmente as rotas com status `actionable`.
- Ligar `os_created` ao `journey_id` quando a OS for aberta pelo funil.
- Revisar bairros com similaridade em alta no relatório diário.
