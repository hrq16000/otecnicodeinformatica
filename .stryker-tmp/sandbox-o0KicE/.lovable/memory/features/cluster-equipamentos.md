---
name: Cluster de equipamentos
description: Hub /equipamentos e 4 páginas por aparelho (notebook, desktop, impressora, roteador) indexáveis, com espelho estático e entrada no mega-menu
type: feature
---
# Cluster EQUIPAMENTOS

Entrada por aparelho, complementar ao cluster de problemas (sintoma) — sem doorway.

- Rotas indexáveis: `/equipamentos` (hub) + `/equipamentos/{notebook,desktop,impressora,roteador}`.
- Conteúdo autoral em `src/lib/clusterEquipamentos.ts` (sintomas, verificações, o que evitar, modalidades, FAQ, relacionados).
- Espelho estático `scripts/lib/cluster-equipamentos-static.mjs` é **gerado** a partir do TS; ao editar o conteúdo, regenere para manter paridade de prerender.
- Sitemap próprio `sitemap-equipamentos.xml` via `scripts/lib/curated-urls.mjs`; lastmod em `scripts/lib/lastmod.mjs`.
- Slug fora do cluster → `<NotFound />` (404 real, nunca shell da Home).
- Link de entrada: coluna "Por equipamento" no mega-menu (grupo "Meu problema") + hub `/problemas`.
