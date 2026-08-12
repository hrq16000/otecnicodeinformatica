---
name: Cluster PROBLEMAS — Onda 20
description: Duas rotas novas de sintoma (/problemas/computador-desliga-sozinho e /problemas/notebook-nao-carrega) com CTAs contextuais por seção
type: feature
---

Onda 20 do cluster PROBLEMAS (padrão da Etapa 12/Onda 19):

- Rotas indexáveis novas: `/problemas/computador-desliga-sozinho` e `/problemas/notebook-nao-carrega`.
- Toda rota nova de sintoma exige atualização em 5 pontos: `src/lib/clusterProblemas.ts` (conteúdo autoral),
  `scripts/lib/cluster-problemas-static.mjs` (espelho estático + FAQ_POR_ROTA para o prerender),
  `src/LegacyApp.tsx` (rota literal apontando para `ClusterProblemaPage`),
  `scripts/lib/curated-urls.mjs` (sitemap) e `scripts/lib/lastmod.mjs`.
- FAQ do TS e do espelho estático devem ter a mesma copy (paridade FAQPage visível × estático).
- CTAs contextuais: componente `CtaContextual` em `ClusterProblemaPage`, um por seção
  (`cluster_problema_sintomas`, `_causas`, `_faq`, além de `_topo` e `_passos`), cada um com mensagem
  de WhatsApp diferente. **Nunca** usar `tel:` — o gate `check:cta-funnel` bloqueia; contato só via WhatsApp.
- `relacionados` só pode apontar para rotas existentes (não existe `/servicos/limpeza-e-manutencao`
  nem `/servicos/conserto-de-notebook`; use `/servicos/manutencao-de-notebook`).
