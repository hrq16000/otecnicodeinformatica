---
name: Onda 25 — sintomas elétricos /problemas + gate de JSON-LD
description: /problemas/computador-nao-da-imagem e /problemas/cheiro-de-queimado indexáveis; gate check:problemas-jsonld valida WebPage+FAQPage+Breadcrumb por rota do cluster.
type: feature
---
- Duas rotas novas: `/problemas/computador-nao-da-imagem` (separar monitor/cabo × vídeo × fonte-memória antes de comprar peça) e `/problemas/cheiro-de-queimado` (parar de usar imediatamente, inspeção antes de energizar, dados copiados em separado).
- Mesmo pipeline obrigatório: `src/lib/clusterProblemas.ts` + espelho `scripts/lib/cluster-problemas-static.mjs` (rota + FAQ_POR_ROTA) + `src/LegacyApp.tsx` + `scripts/lib/curated-urls.mjs` + `scripts/lib/lastmod.mjs`.
- Novo gate: `npm run check:problemas-jsonld` (scripts/check-problemas-jsonld.mjs) — exige, no HTML estático de cada rota do cluster, nó WebPage/TechArticle, 1 BreadcrumbList com 3 níveis, 1 FAQPage com ≥3 perguntas em paridade com a FAQ espelhada e canonical self.
- FAQ das novas páginas herda o padrão da Onda 21: âncora `#faq-N`, link interno contextual (serviços/sintomas relacionados) com `trackFaqLinkClick` e CTA "Perguntar isso no WhatsApp" com UTM/rota/sintoma/seção/rolagem/variante.
- Triagem do hub inclui os novos sintomas automaticamente (ProblemasHub mapeia CLUSTER_PROBLEMAS).
