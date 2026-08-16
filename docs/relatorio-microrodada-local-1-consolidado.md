# Micro-Rodada Local 1 — relatório consolidado (1.1 + 1.2)

Consolida a modernização dos gates para SSR (1.1) e a correção editorial dos
pares serviço × cidade com similaridade excessiva (1.2), mais a infraestrutura
de prevenção de regressão criada em seguida.

## 1. Antes / depois — similaridade de introdução (Jaccard, janela de 120 palavras)

| Par | Antes | Depois | Limite | Veredito |
| --- | --- | --- | --- | --- |
| `/servicos/montagem-de-pc/curitiba` ↔ `/servicos/pc-gamer/curitiba` | 0.465 | 0.051 | 0.400 | ok |
| `/servicos/suporte-home-office/curitiba` ↔ `/servicos/pc-gamer/curitiba` | 0.452 | 0.042 | 0.400 | ok |
| `/servicos/conserto-notebook/sjp` ↔ `/servicos/conserto-pc/sjp` | 0.426 | 0.098 | 0.400 | ok |

Maior similaridade atual em toda a família serviço × cidade: **0.100** (136 pares avaliados).

A correção foi **editorial**, não algorítmica: 17 introduções autorais
(13 Curitiba, 4 São José dos Pinhais) em `src/lib/servicoCuritibaBlocos.json` e
`src/lib/servicoSjpBlocos.json`, renderizadas no início do conteúdo por
`ServicoCidadePage`. Threshold, tokenização e comparador permaneceram intactos.

## 2. Vereditos dos gates (SSR real)

Todos verdes — detalhamento em `docs/relatorio-microrodada-local-1-1-ssr.md`.
Rodada única: `npm run gates:local`.

## 3. Análise de regressões

| Regressão | Origem | Estado |
| --- | --- | --- |
| Metadados ausentes no HTML servido | `PageSEO` com `useEffect` | corrigida (JSX nativo, SSR-safe) |
| `noindex` falso nos gates | snapshot obsoleto em `dist/` | corrigida (invalidação de manifesto) |
| Breadcrumb duplicado em bairros | template legado | corrigida |
| Promessas de tempo fixo em bairros | template genérico herdado | removidas |

Nenhuma regressão aberta.

## 4. Prevenção (fail-closed)

- `check:local-intro-similarity` — bloqueia o build se qualquer par serviço × cidade
  passar de 0.400 na introdução.
- `check:local-schema` — bloqueia o build em breadcrumb/FAQPage/WebPage ausente,
  malformado, com posição fora de ordem, resposta vazia ou canonical divergente.
- `report:local-seo-diff` — diff de metadata/canonical/robots/schema por URL contra baseline.
- `report:gsc-local` — status de indexação (INDEXED / DISCOVERED_NOT_INDEXED /
  CRAWLED_NOT_INDEXED / UNKNOWN / NO_DATA) da coorte em observação, fail-closed.
- Workflow `.github/workflows/local-gates-daily.yml` — execução diária e em cada PR.

## 5. Próximo passo

Selecionar os próximos 4 bairros pelo painel `/admin/inventario-bairros`, que
cruza slug × política de indexação × profundidade de conteúdo × status no
Search Console e destaca as páginas com oportunidade editorial real.
