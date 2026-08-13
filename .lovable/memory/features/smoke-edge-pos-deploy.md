---
name: Smoke de borda pós-deploy
description: scripts/smoke-edge-post-deploy.mjs roda após cada deploy validando 404 real para URLs/assets inexistentes e 200 para rotas noindex válidas.
type: feature
---
- Script: `scripts/smoke-edge-post-deploy.mjs` (`npm run smoke:edge:post-deploy`, base via `--base=` ou `SITE_BASE_URL`).
- Deriva as rotas noindex do próprio build (meta robots no HTML de `dist/`) e as rotas válidas de `dist/route-manifest.json`.
- Verifica: amostra de rotas indexáveis → 200; rotas noindex válidas → 200; URLs inexistentes → 404; assets inexistentes → 404.
- Fail-closed (exit 1) e artefato em `reports/edge-smoke-post-deploy.json`.
- Executa automaticamente no workflow `.github/workflows/cloudflare-edge.yml` logo após `verify:prod-status` (que roda a cada deploy bem-sucedido).
- Status conhecido: enquanto o Worker de borda não for publicado (falta `CLOUDFLARE_API_TOKEN`), o grupo `url-inexistente` acusa 200 — é exatamente a pendência que o smoke deve vigiar.
