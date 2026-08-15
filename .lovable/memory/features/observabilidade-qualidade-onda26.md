---
name: Onda 26 — observabilidade e gates de qualidade
description: Sink Sentry/OTLP fail-closed, Biome no CI, Stryker semanal e relatório de atribuição GA4×Ads×UTM de /problemas.
type: feature
---
- `src/lib/observability.ts` é o único ponto de saída de telemetria técnica: Sentry (Store API via `VITE_SENTRY_DSN`) e OTLP-JSON (`VITE_OTLP_ENDPOINT`, serve para OpenTelemetry Collector, Datadog Agent OTLP e New Relic OTLP). Sem env = nenhum request e nenhum SDK no bundle. Nunca adicionar SDK oficial (peso e conflito com o orçamento de performance).
- Sem PII: só rota, versão, ambiente, trace/span id, tipo de evento. Amostragem por `VITE_OBSERVABILITY_SAMPLE`.
- Ganchos: `errorReporter` → `capturarErro`; `funnelAnalytics.track` espelha `wa_click`/`call_click`/`funnel_open` em `registrarEtapaFunil`; `iniciarObservabilidade` captura falha de carregamento de recurso (`resource.load_failed`) para alertas.
- `biome.json` roda só regras de correctness/suspicious/complexity (formatter desligado, ESLint segue soberano) — gate `npm run lint:biome` no CI.
- `stryker.config.json` mutaciona `problemasWaTemplates.ts` e `clickDedup.ts`, break=40 (score atual ~65) — roda no workflow semanal, nunca no CI de PR (leva ~5 min).
- `npm run report:problemas-attribution` valida antes do deploy o contrato de atribuição (utm_medium=cta_problema, utm_campaign=slug, rota/sintoma/secao/variante, wa_click no GA4, ID do Ads) e a cobertura por rota; grava `docs/relatorios/atribuicao-problemas-<data>.md/.csv`.
