---
name: Cluster SOLUÇÕES (entrada por procedimento)
description: Hub /solucoes + 5 páginas de procedimento (diagnóstico, formatação, SSD, backup, recuperação de dados) indexáveis, com espelho estático e sitemap próprio.
type: feature
---
- Fonte única: `src/lib/clusterSolucoes.ts` (slug, metas, indicações, etapas, naoFaca, modalidades, FAQ, relacionados).
- UI: `src/pages/solucoes/SolucoesHub.tsx` e `ClusterSolucaoPage.tsx` (slug fora do cluster → `<NotFound />`, 404 real).
- Espelho estático de prerender: `scripts/lib/cluster-solucoes-static.mjs` (GERADO do TS — regenerar ao mudar conteúdo), consumido por `scripts/curated-routes-meta.mjs`.
- Sitemap próprio `sitemap-solucoes.xml` via `SOLUCOES` em `scripts/lib/curated-urls.mjs` + lastmod em `scripts/lib/lastmod.mjs`.
- Rotas em `src/LegacyApp.tsx`; coluna "Por procedimento" no mega-menu de `FastHeader.tsx`.
- Regra: só entra procedimento com conteúdo próprio de execução. Toda página repete a política: sem balcão, modalidades remoto/visita/coleta, mínimo pré-aprovado R$ 299,99, peça e mão de obra separadas.
