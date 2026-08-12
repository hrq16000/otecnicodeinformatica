---
name: Onda 24 — sintomas urgentes /problemas
description: /problemas/hd-fazendo-barulho e /problemas/notebook-molhado indexáveis, FAQ única, espelho estático e anti-canibalização com rotas herdadas *-curitiba.
type: feature
---
- Duas rotas novas no cluster: `/problemas/hd-fazendo-barulho` e `/problemas/notebook-molhado`, servidas por `ClusterProblemaPage` (CTAs rastreados por seção, variante A/B, faq_section_depth).
- Fonte de verdade: `src/lib/clusterProblemas.ts`; espelho estático obrigatório em `scripts/lib/cluster-problemas-static.mjs` (rota + FAQ_POR_ROTA, paridade 1:1 com o visível).
- Registro obrigatório em `src/LegacyApp.tsx`, `scripts/lib/curated-urls.mjs` e `scripts/lib/lastmod.mjs`.
- Anti-canibalização: as herdadas `/problemas/hd-fazendo-barulho-curitiba` e `/problemas/notebook-com-agua-ou-liquido-curitiba` permanecem noindex,follow — não reindexar.
- Conteúdo: prioridade de dados antes do reparo (HD com ruído) e proibição de arroz/secador (notebook molhado); garantia sempre escopada, sem promessa de recuperação.
