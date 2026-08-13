---
name: Onda 32 — sintomas Windows não inicia e superaquecimento
description: Duas novas rotas autorais no cluster /problemas (windows-nao-inicia, computador-esquentando) com espelho estático, sitemap e gate JSON-LD em 12 rotas.
type: feature
---

Rotas novas indexáveis:
- `/problemas/windows-nao-inicia` — partida do sistema (logotipo, reparo automático, loop, boot device).
- `/problemas/computador-esquentando` — térmico (radiador, pasta, ventoinha, fluxo de ar).

Pontos obrigatórios ao criar novo sintoma (4 arquivos, sempre juntos):
1. `src/lib/clusterProblemas.ts` (conteúdo autoral + FAQ + relacionados; `foto` é opcional).
2. `src/LegacyApp.tsx` (rota explícita apontando para `ClusterProblemaPage`).
3. `scripts/lib/curated-urls.mjs` (bloco `PROBLEMAS` do sitemap).
4. `scripts/lib/cluster-problemas-static.mjs` (bloco em `CLUSTER_PROBLEMAS_ROUTES` + FAQ espelhada em `FAQ_POR_ROTA`, senão o gate `check-problemas-jsonld` falha).

Validação: build 114 URLs indexáveis, similaridade cruzada máx 0.037, JSON-LD OK em 12 rotas de /problemas, 506 testes Vitest.
