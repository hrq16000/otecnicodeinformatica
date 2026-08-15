# Rodada 2A.1 — Deploy controlado e validação HTTP em produção

Data: 2026-08-06 (UTC)
Commit publicado: `03a2ca4` — "Promoviu HTML ao #root" (branch de edição)
Escopo: apenas publicação das alterações já concluídas da Rodada 2A. Nenhum arquivo de
produto (React, conteúdo, SEO, rotas, redirects, sitemap) foi alterado nesta rodada.

## Fase 0 — Validação pré-deploy

| Item | Resultado |
| --- | --- |
| 0.1 Git limpo, branch/commit registrados | OK |
| 0.2 `rm -rf dist` + `npm run build` | OK (exit 0) |
| 0.3 Origem das rotas (manifesto derivado) | router + prerender (311) + curadas (51) + slugs dinâmicos (404) = 1032 exatas, 11 padrões, 35 redirects |
| 0.4 `check:seo` / `check:seo:curated` / `check:jsonld-refs` | OK (44 rotas curadas) |
| 0.4 typecheck (`tsgo --noEmit`) | OK |
| 0.4 testes unitários (`vitest run`) | 73/73 OK |
| 0.4 `check:internal-links` | OK (339 destinos, 0 quebrados) |
| 0.4 `check:sitemap-source` | OK |
| 0.4 `check:soft404` (local, 214 verificações) | OK |

## Fase 2 — Validação no artefato construído (servidor de paridade `serve-dist.mjs`)

- Rotas válidas (`/`, `/servicos`, `/servicos/remocao-de-virus`, `/precos-e-politicas`,
  `/faq`, `/blog`, `/tecnico-informatica-curitiba`): **200**
- Trailing slash e query de campanha (`/servicos/`, `/servicos/?utm_source=g`): **200**
- Aliases (`/servicos/formatacao-computador`, `/servicos/remocao-virus`,
  `/servicos/conserto-notebook-curitiba`): **301** de salto único para o destino correto
- URLs inexistentes (`/rota-que-nao-existe-2a`, `/marcas/marca-xyz`, `/assets`): **404**
- Corpo do 404: `meta robots noindex, nofollow`, sem canonical, sem JSON-LD, sem conteúdo da home
- Assets (`/assets/*.js`): **200** com `content-type` correto
- `/sitemap.xml` e `/robots.txt`: **200**

## Fase 3 — Teste visual e client-side

Não executável neste ambiente: o runner Playwright (Node e Python) não consegue iniciar
Chromium no sandbox (`libglib-2.0.so.0` ausente). A suíte `e2e/soft-404.spec.ts` permanece
íntegra e roda no CI. A validação equivalente foi feita por HTTP no artefato real (Fase 2).

## Fase 4 — Produção (`https://tecnico.curitiba.br`)

Deploy concluído; home, assets e rotas profundas respondem **200** normalmente.
**Bloqueio de infraestrutura:** a hospedagem Lovable não processa `dist/_redirects` e aplica
fallback SPA para qualquer caminho desconhecido. Em produção, portanto:

- rotas válidas → 200 ✅
- aliases → **200** (esperado 301) ❌
- URLs inexistentes → **200** com shell da home (esperado 404) ❌

`npm run verify:prod-status` registra 110 falhas exatamente nessas duas classes.

### Situação inalterada em relação ao pré-deploy

O comportamento acima já existia antes desta publicação — nada regrediu. Home, assets,
redirects e triagem seguem funcionais, logo **o gate de rollback não foi acionado**.

### Próximo passo obrigatório (fora do escopo desta rodada)

O domínio já está atrás da Cloudflare (`server: cloudflare`). O 404 real e os 301 de alias
precisam ser aplicados na borda:

1. `npm run migration:export` → regras Cloudflare a partir de `dist/route-manifest.json`
2. `npm run migration:cf:dry` → conferência
3. `npm run migration:cf:publish` → publicação das regras
4. `npm run verify:cf:strict` + `npm run verify:prod-status` → evidência

Esses passos exigem as credenciais `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ZONE_ID`, que não
estão disponíveis no ambiente atual.
