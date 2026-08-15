# Micro-Rodada Técnica Local 1.1 — Gates locais no stack SSR

## O que mudou

- Gates locais passaram a validar HTML renderizado pelo SSR (`scripts/lib/ssr-harness.mjs`), sem depender de HTML estático legado.
- `scripts/with-ssr-server.mjs`: sobe o servidor SSR, exporta `SSR_BASE_URL`, roda o gate e derruba o servidor. Usado em `local-guardrails.yml`, `ci.yml` e `weekly-gates.yml`.
- Novos scripts: `npm run check:local-all` e `npm run gates:local`.
- `check-sitemap-source` agora conhece as rotas file-based do TanStack (`src/routes/*`), eliminando falsos 404 dos pilares `/blog/*`.

## Correções de conformidade

- Home (`src/pages/Index.tsx`): metadados saem no SSR via `PageSEO` (title, description, canonical, robots) — antes só em `useEffect`.
- `ServicoBairroTemplate`: indexabilidade derivada de `resolveLocal()` (fonte única). Corrigiu `noindex` indevido em `/servicos/redes-wifi/sao-jose-dos-pinhais`.
- `PageSEO`: passa a emitir `WebPage` baseline (prioridade `component`), corrigindo 12 rotas serviço × cidade sem `WebPage`.
- `CidadeLandingLayout`: `LocalBusiness` com `address` (PostalAddress) — 5 páginas de cidade regularizadas.
- Removidos blocos `BreadcrumbList` duplicados em `/como-funciona`, `/coleta-e-entrega`, `/diagnostico-tecnico`, `/quando-nao-compensa`.

## Estado dos gates (SSR real)

| Gate | Estado |
| --- | --- |
| check:local-index-policy | OK (32 rotas) |
| check:local-service-intent | OK (17 rotas, Jaccard máx. 0.254) |
| check:local-neighborhood-intent | OK (17 bairros âncora) |
| check:local-seo-quality | OK (11 rotas indexáveis) |
| check:local-interlinking | OK |
| check:schema-standards | OK (275 nós / 150 páginas) |
| check:sitemap-source | OK (149 URLs) |
| check:robots | OK |
| check:local-doorway | **FALHA (dívida editorial)** |

## Pendência aberta (P0 editorial, fora do escopo técnico desta rodada)

Introduções acima do limite 0.4 nas rotas serviço × cidade recém-promovidas:

- `/servicos/montagem-de-pc/curitiba` ↔ `/servicos/pc-gamer/curitiba` — 0.465
- `/servicos/suporte-home-office/curitiba` ↔ `/servicos/pc-gamer/curitiba` — 0.452
- `/servicos/conserto-notebook/sao-jose-dos-pinhais` ↔ `/servicos/conserto-pc/sao-jose-dos-pinhais` — 0.426

Ação: reescrever as introduções com conteúdo autoral antes de manter essas URLs no índice.

## Vereditos

1. Gates dependem de HTML estático legado? **NÃO** (renderizam via SSR).
2. Validações continuam efetivas no stack SSR? **SIM**.
3. Falso verde por skip? **NÃO** (fail-closed com SSR indisponível).
4. Bairros da Micro-Rodada 1 no contrato moderno? **4/4**.
5. Infraestrutura pronta para Micro-Rodada Local 2? **SIM**, com a pendência editorial acima registrada.
