---
name: Rodada 6 — conversão e mensuração por rota
description: Contrato de analytics, vínculo lead↔rota, painel /admin/conversao com períodos e jornadas, monitoramento diário de similaridade
type: feature
---

- Contrato único: `src/lib/analyticsContract.ts` (famílias de rota, intenção,
  `journey_id` TTL 30 min, `event_id`, first/last touch). Ausência é ausência:
  `city`/`neighborhood_slug` nunca caem em "curitiba" por herança.
- `funnel_submissions` guarda `origin_route`, `route_family`, `city`,
  `neighborhood_slug`, `service_slug`, `journey_id`, `landing_route`.
- `trackWaClick`/`trackCallClick` anexam contexto de rota ao GA4 e emitem
  `whatsapp_open` canônico em paralelo ao histórico `wa_click`.
- `/admin/conversao`: atalhos 7/30/90 dias, janelas móveis, rotas que mais
  convertem, first/last touch e jornadas assistidas — zero-state sem NaN e
  status de amostra (30 / 200).
- Gate bloqueante: `npm run check:analytics-event-contract`.
- Relatório: `docs/relatorio-rodada-6-final.md` + `npm run report:rodada-6`
  (Slack fail-closed).
- Monitoramento diário de canibalização:
  `.github/workflows/local-similarity-daily.yml`.
