# Plano de execução por ondas (publicação controlada)

Objetivo: publicar em ondas curtas, cada uma com gate próprio, sem regressão e
sem URL entrando no sitemap antes de estar realmente pronta.

> Nota honesta sobre expectativa: "primeira posição no Google ainda esta semana"
> não é algo que se entrega por implementação — indexação e ranqueamento
> dependem de rastreio, autoridade e concorrência. O que este plano garante é
> velocidade máxima de publicação limpa, indexação monitorada e alerta quando
> uma URL aprovada não indexar.

## Onda 27 — Governança de publicação (esta rodada)

| Frente | Entrega | Gate |
| --- | --- | --- |
| Status por URL | `public/publish-status.json` + painel `/admin/publicacao` | `npm run report:publish-status` |
| Imagens reais | presença, tamanho mínimo, placeholder e exclusividade por problema/bairro | `npm run check:real-images` |
| Interlinkagem | blocos contextuais gerados com âncoras únicas | `npm run generate:interlinks` |
| Indexação pós-deploy | alerta de URL aprovada e não indexada | `npm run monitor:approved-indexing` |
| Sentry | sourcemaps + release version | `npm run sentry:sourcemaps` |
| Telemetria | rate limit + dedup em `wa_click`/`call_click`/`funnel_open` | `src/lib/clickDedup.ts` |
| Web Vitals | relatório LCP/CLS/INP por rota de `/problemas` | `npm run report:problemas-vitals` |
| Observabilidade | build falha em produção sem DSN/OTLP | `npm run check:observability-env` |

## Onda 28 — Parceiros prestadores (pendente, exige dado real)

Modelo de página de parceiro (fotos reais, serviços, casos, FAQ) só entra
quando houver parceiro real cadastrado com prova. A base de conhecimento proíbe
parceiro fictício, foto de IA e caso inventado — portanto a onda é fail-closed:
sem parceiro aprovado, nenhuma rota é criada nem entra no sitemap.

## Ritmo semanal

1. Segunda: rodar `report:publish-status`, aprovar URLs no painel.
2. Publicar somente o que estiver `pronto`.
3. Após deploy: `monitor:approved-indexing --alert` + `report:problemas-vitals`.
4. Sexta: revisar URLs aprovadas ainda não indexadas e reforçar interlinkagem.
