---
name: Onda 27 — governança de publicação, interlinks e telemetria
description: Painel /admin/publicacao, gates de imagem real e observabilidade, interlinks gerados com âncoras únicas, rate limit de eventos e monitoramento de indexação.
type: feature
---
- **Decisão de publicar**: `scripts/report-publish-status.mjs` → `public/publish-status.json` (rascunho, checklist de meta, fotos, originalidade Jaccard < 0.6) e painel `/admin/publicacao` (só lê o JSON, nunca escreve). Estados: `pronto`, `revisao`, `rascunho`, `sem_meta_curada`. Roda no `prebuild`.
- **Fotos reais**: `npm run check:real-images` exige arquivo existente, > 20KB, sem placeholder e hash exclusivo por rota. Reuso de `bancada-tecnica.jpg`/`placa-eletronica.jpg` derruba o estado `pronto`.
- **Interlinks**: `scripts/generate-interlinks.mjs` gera `src/lib/interlinksGerados.ts` (arquivo gerado, nunca editar à mão) a partir dos títulos/descrições curados; âncoras únicas no site inteiro. Gate `npm run check:interlinks` roda no build; render em `InterlinksContextuais` nas páginas de `/problemas`.
- **Telemetria**: `podeMedirEvento` (dedup + token bucket, capacidade 20, recarga 1/3s) protege `wa_click`, `call_click` e `funnel_open`. O clique do usuário nunca é bloqueado — só o envio do evento.
- **Observabilidade**: `check:observability-env` falha em CI/produção sem `VITE_SENTRY_DSN`/`VITE_OTLP_ENDPOINT` (escape `OBSERVABILITY_OPTIONAL=true`); `sentry:sourcemaps` cria a release por sha, sobe os `.map` pela API HTTP e os apaga de `dist/`.
- **Pós-deploy**: `report:problemas-vitals` (PSI campo+lab, orçamento LCP 2500/INP 200/CLS 0.1) e `monitor:approved-indexing` (URL Inspection só das URLs `pronto`, alerta quando aprovada não indexa).
