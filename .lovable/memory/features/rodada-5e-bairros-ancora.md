---
name: Rodada 5E — bairros âncora (Lote 2)
description: 13 bairros âncora indexáveis (5 Curitiba lote 1 + 4 Curitiba + 4 SJP no lote 2), sem LocalBusiness por bairro, gate check:local-neighborhood-intent
type: feature
---

- Lote 2 (Rodada 5E): santa-felicidade, boa-vista, bigorrilho, cabral (Curitiba) e afonso-pena, cruzeiro, costeira, guatupe (São José dos Pinhais). Nenhuma rota nova — só promoção de rotas existentes.
- Conteúdo autoral em `src/lib/bairrosLote2.ts`; a decisão de indexar vem só de `src/lib/localIndexPolicy.json` (`bairrosAncora` com `cidade`, `cidadeSlug`, `parent`, `lote`).
- Página de bairro NÃO emite LocalBusiness próprio (proíbe filial fictícia): emite WebPage + BreadcrumbList (+ FAQPage) e Service com areaServed = cidade-pai.
- Breadcrumb e interlinks obrigatórios: Início → Áreas atendidas → cidade-pai → bairro. Bairro de SJP nunca aponta para Curitiba.
- Analytics: `neighborhood_slug` (taxonomia categórica) e `city` derivados da política — sem fallback para Curitiba (`nao_definida` quando não há âncora).
- Gates: `check:local-neighborhood-intent` (bloqueante no postbuild), `check:local-doorway` com par bairro × cidade-pai (limite 0,4), revalidação diária no workflow `local-guardrails`.
- Painéis/relatórios: `/admin/gates-locais` (public/local-gates.json via `npm run report:local-gates`) e `npm run report:rodada-5e` (docs/relatorio-rodada-5e-final.md + resumo Slack quando há SLACK_WEBHOOK_URL).
