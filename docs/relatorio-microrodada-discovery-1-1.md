# Micro-Rodada Discovery 1.1 — deploy + smoke real de produção

Escopo: publicar o estado aprovado, provar que **repositório = deploy = HTML público**
e registrar baseline. Nenhum conteúdo novo, nenhuma correção adicional.

## 1. Publicação

| Item | Valor |
| --- | --- |
| Commit publicado | `4485cf611817ea09a4a9aefbfb033051cdc6673f` |
| Horário do deploy (UTC) | 2026-08-16T02:32Z |
| Horário do smoke (UTC) | 2026-08-16T02:45Z |
| Destino | https://otecnicodeinformatica.com.br |
| Pipeline | workflow normal de publicação do projeto (sem alteração de Cloudflare/edge) |
| Resultado | sucesso |

## 2. Dívidas pré-existentes (Fase 2)

`check:malha-interna`, `check:internal-links` e `check:orphan-pages` continuam falhando
por dívida legada (reciprocidades entre páginas de serviço, assets/rota legada em
`routeTree.gen.ts`, componentes sem rota). **Não são bloqueantes** para o workflow de
publicação usado e **não foram** causadas pela Discovery 1. Nenhum gate foi afrouxado.

## 3. Smoke das origens — anchor HTML real em produção

Método: `curl --compressed` sobre o HTML inicial servido (sem JS, sem hydration, sem
snapshot local).

| Origem | HTTP | Anchor `<a href>` | Texto âncora |
| --- | --- | --- | --- |
| /problemas/computador-lento | 200 | `/equipamentos/desktop` | "problemas comuns em computadores desktop" |
| /problemas/impressora-nao-imprime | 200 | `/equipamentos/impressora` | "problemas mais frequentes em impressoras" |
| /problemas/tela-azul | 200 | `/blog/como-resolver-tela-azul-windows` | "como interpretar e resolver a tela azul do Windows" |
| /bairros/centro | 200 | `/servicos/conserto-pc-notebook/centro` | "conserto de PC e notebook no Centro" |
| /bairros/batel | 200 | `/servicos/formatacao-computador/batel` | "formatação de computador no Batel" |

Todos os cinco são `<a href="...">` no HTML inicial. Nenhum depende de onClick,
botão sem href ou inserção pós-hidratação.

## 4. Destinos — HTTP, robots, canonical, H1, schema

| Destino | HTTP | Robots | Canonical | H1 | Schema |
| --- | --- | --- | --- | --- | --- |
| /equipamentos/desktop | 200 | index, follow | self | 1 | WebPage, BreadcrumbList, TechArticle, FAQPage |
| /equipamentos/impressora | 200 | index, follow | self | 1 | WebPage, BreadcrumbList, TechArticle, FAQPage |
| /blog/como-resolver-tela-azul-windows | 200 | index, follow, max-image-preview:large… | self | 1 | — (sem JSON-LD; ver §9) |
| /servicos/conserto-pc-notebook/centro | 200 | index, follow | self | 1 | WebPage, BreadcrumbList, LocalBusiness, Service, FAQPage, Place/City |
| /servicos/formatacao-computador/batel | 200 | index, follow | self | 1 | WebPage, BreadcrumbList, LocalBusiness, Service, FAQPage, Place/City |
| /equipamentos (hub) | 200 | index, follow | self | 1 | WebPage, BreadcrumbList |

Metadata apenas verificada (Fase 7): nenhuma regressão de title/description no deploy.
`robots.txt` de produção bloqueia somente áreas privadas (`/admin`, `/debug/`,
`/status-os`, `/funil-indisponivel`) — nenhuma das cinco URLs é atingida (Fase 8).
Canonicais idênticos entre repositório e produção (Fase 9).

## 5. Grafo medido no HTML público (Fase 10)

Ferramenta nova: `scripts/report-discovery-graph-prod.mjs` (BFS a partir da Home,
somente anchors reais do HTML de produção, universo de 153 URLs curadas).
Artefato: `reports/discovery-graph-prod.json`.

| Alvo | Inbound produção | Depth produção |
| --- | --- | --- |
| /equipamentos/desktop | 3 | 2 |
| /equipamentos/impressora | 2 | 3 |
| /blog/como-resolver-tela-azul-windows | 2 | 2 |
| /servicos/conserto-pc-notebook/centro | 3 | 3 |
| /servicos/formatacao-computador/batel | 2 | 3 |

Distribuição de depth em produção: `{0: 1, 1: 20, 2: 53, 3: 40, 4: 20, 5+: 19}`.

**Órfãos indexáveis em produção: 0** (Fase 11).

`/equipamentos` segue funcionando como hub (Fase 12) e o artigo de tela azul segue
indexável e acessível, sem alteração (Fase 13).

## 6. Tabela obrigatória

| Alvo | Ponte em produção | HTTP | Robots | Canonical | Depth produção | Veredito |
| --- | --- | --- | --- | --- | --- | --- |
| /equipamentos/desktop | SIM | 200 | index, follow | self | 2 | OK |
| /equipamentos/impressora | SIM | 200 | index, follow | self | 3 | OK |
| /blog/como-resolver-tela-azul-windows | SIM | 200 | index, follow | self | 2 | OK |
| /servicos/conserto-pc-notebook/centro | SIM | 200 | index, follow | self | 3 | OK |
| /servicos/formatacao-computador/batel | SIM | 200 | index, follow | self | 3 | OK |

## 7. Search Console — coorte `indexation_microlot_1` (Fase 16)

Propriedade: `sc-domain:otecnicodeinformatica.com.br`. Nenhuma coorte nova criada.

| URL | verdict | coverageState | lastCrawlTime | impressions/clicks |
| --- | --- | --- | --- | --- |
| /equipamentos/desktop | NEUTRAL | URL is unknown to Google | — | NO_DATA |
| /equipamentos/impressora | NEUTRAL | Discovered - currently not indexed | — | NO_DATA |
| /blog/como-resolver-tela-azul-windows | PASS | Submitted and indexed | 2026-08-14T11:16:15Z | NO_DATA |
| /servicos/conserto-pc-notebook/centro | NEUTRAL | URL is unknown to Google | — | NO_DATA |
| /servicos/formatacao-computador/batel | NEUTRAL | Excluded by ‘noindex’ tag | 2026-08-11T23:00:34Z | NO_DATA |

Observação sobre o Batel (Fase 14): o `noindex` relatado pelo Google vem do crawl de
**11/08**, anterior às correções. A produção atual serve `index, follow` com canonical
self. Nada foi alterado para "corrigir histórico"; apenas OBSERVE até novo crawl.

Todos os `lastCrawlTime` são anteriores ao deploy — nenhum novo crawl após as correções
(Fase 17). `discovery_fix_applied_at = 2026-08-16T02:32Z` registrado em
`reports/indexation-microlot-1.json`, junto do bloco `discovery_1_1` (Fase 18).

## 8. Preservações

- Bairros da Local 2 (`boqueirao`, `cajuru`, `pinheirinho`, `cidade-jardim-sjp`): intocados (Fase 19).
- Pilares 9B (`o-que-e-informatica`, `informatica-basica`, `como-aprender-informatica`): intocados (Fase 20).

## 9. Pendências e dívidas

- `/blog/como-resolver-tela-azul-windows` não emite JSON-LD. **Não é regressão de deploy**:
  o mesmo comportamento ocorre no SSR local, logo repo = produção. Fica registrado como
  dívida editorial/schema para rodada futura (o Google já reporta Breadcrumbs via outra fonte).
- Dívida legada dos gates `malha-interna` / `internal-links` / `orphan-pages`.
- Aguardar novo crawl do Google; nenhuma ação editorial pendente.

## Vereditos

1. **5/5** pontes presentes em HTML real de produção.
2. Destinos tecnicamente indexáveis: **5/5**.
3. Divergência repo × produção: **NÃO**.
4. URL indexável órfã após o deploy: **0** (medido no HTML público).
5. Novo crawl do Google após as correções: **NÃO** (crawls mais recentes: 14/08 e 11/08).
6. Ação editorial necessária agora: **NÃO — OBSERVE**.
7. Discovery 1 pode ser encerrada: **SIM**.
