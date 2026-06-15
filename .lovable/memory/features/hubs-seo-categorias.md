---
name: Hubs SEO Categorias × Local
description: Templates para Conserto de TV, Som, Videogame e Celular cruzados com Curitiba, RMC e bairros principais
type: feature
---

# Hubs SEO de Categoria

Template único: `src/pages/hubs/CategoryLocalTemplate.tsx`
- `CategoryLocalTemplate` (page por categoria × local)
- `CategoryHub` (hub raiz, lista locais)

Dados:
- `src/pages/hubs/categories.ts` — TV, Som, Videogame, Celular
- `src/pages/hubs/locais.ts` — 11 cidades RMC + 8 bairros Curitiba

Rotas:
- `/conserto-{tv|som|videogame|celular}-curitiba` → hub
- `/conserto-{tv|som|videogame|celular}/:local` → page

Schema: `LocalBusiness` provider + `Service` + `Offer` (R$ 300 mínimo) + `FAQPage` + breadcrumbs.

Prerender: `scripts/prerender-cities.mjs` emite HTML estático para os 4 hubs + 76 páginas (4×19) na build, com og/title/description/JSON-LD inline para crawlers.

Sitemap: 80 novas URLs adicionadas em `public/sitemap.xml`.
