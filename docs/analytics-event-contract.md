# Contrato de eventos de analytics — Rodada 6

Fonte única: `src/lib/analyticsContract.ts`. Gate bloqueante: `npm run check:analytics-event-contract`.

## Eventos canônicos

| Evento | Significado | Conversão? |
| --- | --- | --- |
| `page_view` | Visualização de rota (denominador do funil) | Não |
| `cta_click` | Clique em CTA relevante | Microconversão |
| `triage_start` | Abertura da triagem | Microconversão |
| `triage_step` | Avanço de etapa (só identificadores) | Não |
| `triage_complete` | Triagem concluída | Microconversão |
| `triage_abandon` | Triagem iniciada e não concluída até o `pagehide` | Não |
| `whatsapp_open` / `wa_click` | Abertura do WhatsApp | Microconversão |
| `lead_submitted` | Registro válido em `funnel_submissions` | **Lead** |
| `os_created` | OS criada (quando rastreável) | **Conversão operacional** |

Os nomes históricos (`wa_funnel_open`, `wa_funnel_submit`, `wa_click`) continuam
sendo emitidos para não quebrar o histórico do GA4; a camada canônica é emitida
em paralelo.

## Contexto comum (não sensível)

`route`, `route_family`, `page_slug`, `service_slug`, `city`,
`neighborhood_slug`, `intent`, `source`, `session_id`, `journey_id`,
`event_id`, `landing_route`.

`route_family`: `home | service | problem | city | neighborhood | service_city | institutional | blog | other`.
`intent`: `diagnostic | commercial | local | service_local | brand | informational`.

**Ausência é ausência.** Sem cidade declarada pela rota, o campo vai
`undefined`/`nao_definida` — nunca "curitiba" por herança.

## Campos proibidos (PII)

nome, e-mail, telefone, endereço, número, CEP completo, latitude/longitude,
documento, fotos, arquivos e qualquer texto livre digitado pelo cliente.
O gate falha o build se algum deles aparecer em payload de analytics.

## Jornada

`journey_id` é pseudônimo, efêmero (TTL de 30 min em `sessionStorage`), sem
fingerprint e sem PII. Guarda `first_touch` e `last_touch` lado a lado
(atribuição simples e transparente — sem modelo algorítmico).

## Telemetria interna

`click_events` recebeu `route_family`, `intent`, `neighborhood_slug`,
`journey_id`, `event_id` (índice único para dedupe) e `landing_route`.
Retenção preservada: 90 dias raw / 24 meses agregado, k=5 na consolidação.
Realtime segue restrito à allowlist de `src/lib/realtimeSafeFields.ts`.

## Dashboard

`/admin/conversao` (sem rota nova): funil visual por sessão e tabelas por rota,
família, cidade, bairro e serviço, com status de amostra
(`insufficient_data` / `learning` / `actionable`), zero-states seguros e
exclusão de tráfego de QA via `filtrarComerciais`.

## Snapshot e detecção de divergência (CI)

`docs/analytics-event-contract.snapshot.json` congela os nomes de evento emitidos,
os campos de contexto permitidos e os campos proibidos. O gate
`npm run check:analytics-event-contract` (bloqueante no CI, antes do build)
falha quando o código adiciona, remove ou renomeia qualquer um deles.

Mudança intencional: revise o impacto em GA4/Google Ads e rode
`npm run check:analytics-event-contract -- --update`.

## Alertas de funil no Slack

`config/funnel-alert-thresholds.json` define limites mínimos por recorte
(global, `route_family`, `city`, `neighborhood`, `service`) e a amostra mínima.
`npm run alert:funnel` (workflow `funnel-alerts.yml`, diário) calcula as taxas
da janela, ignora recortes com amostra insuficiente e avisa no Slack.
Fail-closed: sem credenciais ou webhook, nada é enviado.

## Auditoria de tráfego de QA

`/admin/qa-trafego` mostra a proporção de eventos de QA por rota e período,
o motivo técnico da exclusão e permite registrar justificativas permanentes
(tabela `qa_exclusion_justifications`, somente admin, sem edição/exclusão).
