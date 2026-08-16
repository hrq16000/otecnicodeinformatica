# Micro-Rodada Indexação 1.1 — publicação, smoke de produção e baseline pós-deploy

Data da publicação: 2026-08-16 (UTC).
Coorte observada: `indexation_microlot_1`. Artefato: `reports/indexation-microlot-1.json`
(campo `baseline` = `2026-08-16T01:38:21.308Z`).

## 1. Pipeline pré-deploy (todos exit 0)

| Gate | Resultado |
| --- | --- |
| `npm run build` | OK (dist regenerado do zero) |
| `audit:seo` | 0 erros · 47 avisos (descriptions 161–164 chars) |
| `check:local-index-policy` | 32 rotas locais coerentes (robots + canonical + sitemap) |
| `check:local-neighborhood-intent` | 21 bairros âncora conferidos |
| `check:local-doorway` | nenhum padrão de doorway (Jaccard máx. 0.168) |
| `check:local-service-intent` | 17 rotas serviço × cidade · Jaccard máx. 0.232 |
| `check:local-seo-quality` | 11 rotas locais indexáveis OK |
| `check:local-interlinking` | mãe ⇄ bairros/cidades íntegro, sem noindex/redirect |
| `check:schema-standards` | 272 nós válidos em 153 páginas indexáveis |
| `check:sitemap-source` | 153 URLs curadas = 153 emitidas em 8 sub-sitemaps |
| `check:robots` | 153 liberadas · 5 áreas privadas bloqueadas |
| `check:local-regression` | 47 rotas promovidas · status `healthy` |
| `tsgo --noEmit` | sem erros |

## 2. Artefato SSR antes da publicação

| Rota | robots | canonical | H1 | WebPage | Breadcrumb | FAQPage |
| --- | --- | --- | --- | --- | --- | --- |
| `/bairros/boqueirao` | index, follow | self | 1 | 1 | 1 | 1 |
| `/bairros/cajuru` | index, follow | self | 1 | 1 | 1 | 1 |
| `/bairros/pinheirinho` | index, follow | self | 1 | 1 | 1 | 1 |
| `/bairros/cidade-jardim-sjp` | index, follow | self | 1 | 1 | 1 | 1 |

## 3. Divergência produção × repositório — resolvida

Estado de produção **antes** da publicação (curl direto, 01:34 UTC): as quatro rotas serviam
`noindex, follow`. Estado **depois** (01:36 UTC): `index, follow` nas quatro. A divergência
documentada na Micro-Rodada Indexação 1 era de deploy pendente, não de código, e está encerrada.

## 4. Smoke de produção (HTML servido pelo domínio canônico)

| Rota | HTTP | robots | canonical | H1 | Schema | Links internos |
| --- | --- | --- | --- | --- | --- | --- |
| `/bairros/boqueirao` | 200 | index, follow | self | 1 | WebPage + Breadcrumb + FAQPage | 37 |
| `/bairros/cajuru` | 200 | index, follow | self | 1 | WebPage + Breadcrumb + FAQPage | 36 |
| `/bairros/pinheirinho` | 200 | index, follow | self | 1 | WebPage + Breadcrumb + FAQPage | 37 |
| `/bairros/cidade-jardim-sjp` | 200 | index, follow | self | 1 | WebPage + Breadcrumb + FAQPage | 36 |

Títulos e descriptions únicos por rota, sem template repetido.

Outras verificações em produção:

- `/areas-atendidas` publica os **21** links de bairro do diretório (`src/lib/bairrosDirectory.ts`).
  `/bairros/aviacao` e `/bairros/boqueirao` deixaram de ser órfãs no HTML servido.
- `sitemap-bairros.xml` contém as quatro URLs.
- `robots.txt` não bloqueia `/bairros`.
- `/servicos/formatacao-computador/batel` já serve `index, follow` em produção (o
  `Excluded by 'noindex'` do GSC é estado histórico e resolve no próximo rastreio).

## 5. Baseline pós-deploy no Search Console

Propriedade: `sc-domain:otecnicodeinformatica.com.br`. Somente leitura.

Coorte de 10 URLs (`report:indexation-microlot-1`): `DISCOVERY_FIX` 7 · `OBSERVE` 3.
`/bairros/afonso-pena` está **INDEXED**; `/blog/backup-nuvem-empresas-qual-escolher` segue indexada.
Todas com `LOW_SAMPLE` — ausência de clique não é sinal, é falta de amostra.

Quatro rotas publicadas nesta micro-rodada (urlInspection, imediatamente após o deploy):

| Rota | coverageState | verdict | lastCrawlTime |
| --- | --- | --- | --- |
| `/bairros/boqueirao` | URL is unknown to Google | NEUTRAL | NO_DATA |
| `/bairros/cajuru` | URL is unknown to Google | NEUTRAL | NO_DATA |
| `/bairros/pinheirinho` | URL is unknown to Google | NEUTRAL | NO_DATA |
| `/bairros/cidade-jardim-sjp` | URL is unknown to Google | NEUTRAL | NO_DATA |

Leitura correta: o índice ainda reflete o rastreio anterior ao deploy. `NO_DATA` não é
"não indexável"; é ausência de dado. Nada aqui autoriza mudança de threshold ou conteúdo.

## 6. Pendências herdadas (não tratadas nesta micro-rodada)

1. Click depth ≥ 4 em `/equipamentos/desktop`, `/equipamentos/impressora` e um artigo do blog.
2. `/servicos/conserto-pc-notebook/centro` e `/servicos/formatacao-computador/batel` órfãos de
   descoberta interna (`in` baixo, depth órfã).

## 7. Próxima observação

Reobservar a mesma coorte com `npm run report:indexation-microlot-1` e comparar contra o baseline
`2026-08-16T01:38:21.308Z`. Sem novo rastreio registrado, não há decisão a tomar.
