# Micro-Rodada Local 1.1 — vereditos dos gates contra SSR real

Data da execução: registrada em `reports/local-seo-diff.json` (campo `geradoEm`).
Harness: `scripts/with-ssr-server.mjs` + `scripts/lib/ssr-harness.mjs` (snapshot invalidado antes de cada rodada).

## Escopo

Modernização dos gates locais para o stack SSR (TanStack Start). Todos os checks
passaram a ler o HTML renderizado pelo servidor, e não mais o HTML estático legado.

## Vereditos finais

| Gate | Comando | Veredito |
| --- | --- | --- |
| Política de indexação | `check:local-index-policy` | ok |
| Antidoorway | `check:local-doorway` | ok |
| Intenção de bairro | `check:local-neighborhood-intent` | ok |
| Intenção de serviço | `check:local-service-intent` | ok |
| Interlinking | `check:local-interlinking` | ok — 34 links na rota-mãe, 9 serviços canônicos |
| Qualidade de SEO local | `check:local-seo-quality` | ok — 11 rotas indexáveis, 5 puladas por serem noindex |
| Similaridade de introdução | `check:local-intro-similarity` | ok — máximo 0.100 (limite 0.400), 136 pares |
| Schema de bairros | `check:local-schema` | ok — 21 rotas com breadcrumb, FAQPage e WebPage válidos |
| Regressão local | `check:local-regression` | healthy — 47 rotas promovidas |

## Regressões observadas e resolvidas

1. **Metadados vazios no primeiro chunk do SSR.** `PageSEO` injetava tags via
   `useEffect`; o HTML servido saía sem título/canonical. Corrigido com JSX nativo.
2. **Snapshot obsoleto do harness.** Os gates liam `dist/` antigo e reportavam
   `noindex` falso. Corrigido invalidando `ssr-snapshot-manifest.json` antes da execução.
3. **Breadcrumb duplicado** em rotas de bairro — consolidado em um único bloco JSON-LD.

## Evidências

- `reports/local-seo-diff.json` / `reports/local-seo-diff.md` — assinatura de SEO por URL.
- `reports/local-seo-baseline.json` — baseline para comparação nas próximas rodadas.
- `public/gsc-local-status.json` — status de indexação da coorte em observação.
