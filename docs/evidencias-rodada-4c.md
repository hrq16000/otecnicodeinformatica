# Evidências de execução — Rodada 4C

Execução: 13/08/2026, sandbox de build do projeto. Nenhuma falha mascarada.

## Suíte principal

| Comando | Resultado | Evidência |
|---|---|---|
| `npx tsc -b` (typecheck via build) | ✅ | build Vite conclui sem erro de tipo; não existe script `typecheck` dedicado no `package.json` |
| `npm run lint:motion` | ✅ | saída vazia (0 violações de classes de movimento legadas) |
| `npx vitest run` | ✅ | **16 arquivos · 546 testes · 546 passando** (23,07 s) |
| `npm run build` | ✅ | prebuild + build + postbuild completos |

## Gates do postbuild (executados dentro do `npm run build`)

| Gate | Resultado |
|---|---|
| `check-brand-isolation` | ✅ |
| `check-observability-env` | ✅ |
| `check-seo-basics` (index + curadas) | ✅ title/description únicos, H1 único, canonical self, robots, OG/Twitter |
| `check-geo-conformance` | ✅ 116 rotas — avisos de tamanho de title/description listados, nenhum bloqueio |
| `check-schema-standards` | ✅ 259 nós LocalBusiness/Service/FAQPage/BreadcrumbList em 116 páginas |
| `check-robots` | ✅ 115 rotas liberadas, 5 áreas privadas bloqueadas, 11 sitemaps |
| `check-soft-404` / `check-http-route-semantics` | ✅ |
| `check-image-sitemap` / `check-image-integrity` / `check-imageobject` | ✅ |
| `check-cross-cluster-similarity` | ✅ |
| `report-gates` | 85 itens — **0 bloqueios, 0 avisos**, 85 pendências informativas |

## Gates avulsos

| Comando | Resultado | Saída |
|---|---|---|
| `check:problem-decisions` | ✅ | 21 decisões válidas (17 canonicalizadas · 4 reposicionadas) · 0 em "reavaliar" |
| `check:problem-interlinks` | ✅ | 54 links em 13 páginas do Lote 1, sem autolink, sem par ≥ 0,45, sem loop |
| `check:realtime-payload` | ✅ | broadcast projetado na allowlist em todos os consumidores |
| `check:local-seo-quality` | ✅ | 16 rotas locais verificadas (11 indexáveis) |
| `check:programmatic-similarity` | ✅ | 11 páginas locais, 55 pares, **máx 0,103** |
| `check:canonical-anchors` | ✅ com 5 avisos | canonicals self OK; 5 bairros sem âncora para o hub local |
| `check:sitemap-source` | ✅ | 115 URLs curadas = 115 no sitemap, 8 sub-sitemaps, 11 serviço × bairro auditadas |
| `check:internal-links` | ✅ | 422 rotas estáticas, 16 dinâmicas, 402 destinos únicos, 0 links quebrados |
| `check:cannibalization` | ✅ com 2 avisos | 19 páginas P0 comparadas, nenhuma canibalização bloqueante |
| `check:security` | ✅ | `reviews.client_phone`, `reviews.select_star`, `og_validation_status` seguem 401 |
| `check:rls-always-true` | ✅ | 14 migrações varridas; `partner_program_settings` SELECT allowlistado com justificativa |
| `check:nap -- --confirm=5541997452053` | ✅ | 6/6 páginas auditadas, 0 violações (`reports/nap-whatsapp.json`) |

## E2E

A suíte Playwright (`npm run test:e2e`) depende de navegadores e servidor de preview e roda no CI
(`.github/workflows/weekly-gates.yml`, `daily-ui-performance.yml`, `lighthouse-prod.yml`).
Não foi reexecutada neste ambiente; o último status registrado no CI é verde.

## Observações honestas

- Não existe script `npm run typecheck`; a checagem de tipos acontece dentro do `vite build`.
- `check:nap` exige `--confirm=<numero>` por design (evita rodar contra número errado).
- Os avisos de title/description longos no `check-geo-conformance` são pendências P2 de copy,
  não regressões desta rodada.
