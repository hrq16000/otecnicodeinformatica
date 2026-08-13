---
name: Onda 33 — impressora não imprime e teclado de notebook
description: Rotas /problemas/impressora-nao-imprime e /problemas/teclado-notebook-nao-funciona, autorais, com FAQ espelhada e JSON-LD em 14 rotas do cluster.
type: feature
---

Rotas novas indexáveis:
- `/problemas/impressora-nao-imprime` — separa fila travada, IP instável, driver duplicado e falha física (bico/toner).
- `/problemas/teclado-notebook-nao-funciona` — teste com teclado USB externo como divisor entre software, flat solto e dano por líquido.

Segue o padrão da Onda 32 (4 arquivos: clusterProblemas.ts, LegacyApp.tsx, curated-urls.mjs, cluster-problemas-static.mjs + FAQ_POR_ROTA).

Validação: build com 116 páginas indexáveis, similaridade cruzada máx 0.037, JSON-LD completo em 14 rotas de /problemas, 506 testes Vitest, 0 bloqueios nos gates.
