# Micro-Rodada Discovery 1 — redução de click depth de URLs existentes

Escopo: **somente descoberta interna**. Nenhuma página criada, nenhum conteúdo
reescrito além da frase mínima necessária para inserir link contextual natural.
Nenhuma alteração em canonical, robots, sitemap ou schema.

## 1. Baseline do grafo (SSR real, BFS a partir da Home)

Ferramenta: `scripts/report-discovery-graph-1.mjs` sobre o harness SSR
(`scripts/lib/ssr-harness.mjs`), universo de 153 URLs curadas.

| URL | Inbound | Depth Home | Hub natural | Depth Hub |
| --- | --- | --- | --- | --- |
| /equipamentos/desktop | 2 | 4 | /equipamentos | 1 |
| /equipamentos/impressora | 1 | 6 | /equipamentos | 1 |
| /servicos/conserto-pc-notebook/centro | 2 | — (inalcançável) | /bairros/centro | — |
| /servicos/formatacao-computador/batel | 1 | — (inalcançável) | /bairros/batel | — |
| /blog/como-resolver-tela-azul-windows | 1 | 4 | /blog | — |

Distribuição de depth antes: `{1: 21, 2: 51, 3: 36, 4: 17, 5+: 28, orphan: 0}`.

## 2. Artigo do blog resolvido

O grafo atual (não o relatório antigo) apontou `/blog/como-resolver-tela-azul-windows`
como o artigo com pior relação inbound × depth (1 inbound, depth 4) entre os que
têm hub semântico óbvio no cluster de problemas.

## 3. Origens escolhidas, justificativa e anchors

| Alvo | Origem | Justificativa semântica | Anchor |
| --- | --- | --- | --- |
| /equipamentos/desktop | /problemas/computador-lento | O texto já distingue famílias de causa; em máquina de mesa entram fonte, ventilação e disco secundário — continuidade real da mesma dúvida. | "problemas comuns em computadores desktop" |
| /equipamentos/impressora | /problemas/impressora-nao-imprime | Jornada natural: sintoma de impressão → entender o próprio aparelho (jato, laser, multifuncional de rede). | "problemas mais frequentes em impressoras" |
| /blog/como-resolver-tela-azul-windows | /problemas/tela-azul | O sintoma orienta o que anotar; o artigo aprofunda a leitura do código de erro. | "como interpretar e resolver a tela azul do Windows" |
| /servicos/conserto-pc-notebook/centro | /bairros/centro | Ponte editorial ao fim da logística local do bairro, para o serviço correspondente naquele bairro. | anchor local do bairro Centro |
| /servicos/formatacao-computador/batel | /bairros/batel | Mesma lógica: continuidade da logística do Batel para o serviço local. | anchor local do bairro Batel |

Todos os links são texto corrido dentro da jornada editorial. Nenhum bloco
"Veja também", nenhum anchor repetido, nenhum link na Home (Fase 14 respeitada).

Implementação:
- `src/lib/bairrosData.ts` — campo `ponteLocal` (Centro, Batel);
- `src/components/bairro/BairroLocalLayout.tsx` — renderização SSR da ponte;
- `src/lib/clusterProblemas.ts` — campo `ponteEditorial` (tela-azul, impressora);
- `src/pages/problemas/ClusterProblemaPage.tsx` — renderização SSR da ponte;
- `src/pages/problemas/ComputadorLento.tsx` — parágrafo com link para desktop.

## 4. Grafo antes × depois

| URL | Inbound antes | Inbound depois | Depth antes | Depth depois |
| --- | --- | --- | --- | --- |
| /equipamentos/desktop | 2 | 3 | 4 | 2 |
| /equipamentos/impressora | 1 | 2 | 6 | 3 |
| /servicos/conserto-pc-notebook/centro | 2 | 3 | inalcançável | 3 |
| /servicos/formatacao-computador/batel | 1 | 2 | inalcançável | 3 |
| /blog/como-resolver-tela-azul-windows | 1 | 2 | 4 | 3 |

## 5. Órfãos globais e distribuição de depth (153 URLs)

- ORPHANS BEFORE = 0
- ORPHANS AFTER = 0

| Depth | Antes | Depois |
| --- | --- | --- |
| 1 | 21 | 21 |
| 2 | 51 | 53 |
| 3 | 36 | 40 |
| 4 | 17 | 20 |
| 5+ | 28 | 19 |
| orphan | 0 | 0 |

Deslocamento líquido da cauda: 9 URLs saíram de 5+ para faixas mais rasas, sem
qualquer bloco artificial de links.

## 6. SSR

Os cinco novos links aparecem como `<a href="...">` no HTML servido pelo SSR
(verificado por curl direto no harness e pelo BFS, que só conta anchors reais).
Nenhum depende de hidratação, onClick ou navegação programática.

## 7. Gates executados

| Gate | Resultado |
| --- | --- |
| typecheck (tsgo) | OK |
| build | OK |
| audit:seo | OK (0 erros, 47 avisos pré-existentes de descrição >160) |
| check:content-discovery | OK |
| check:local-interlinking | OK |
| check:local-index-policy / doorway / service-intent / neighborhood-intent | OK (via check:local-regression, status healthy) |
| check:local-schema (bairros) | OK — 21 rotas |
| check:schema-standards | OK — 272 nós em 153 páginas |
| check:sitemap-source | OK — 153 URLs |
| check:robots | OK |
| check:problem-discovery | OK — 15 indexáveis, 0 órfãs |

Falhas **pré-existentes**, fora do escopo desta rodada e não causadas por ela
(nenhum arquivo tocado pertence a essas rotas):
`check:malha-interna` (3 reciprocidades entre páginas de serviço),
`check:internal-links` (assets e rota legada em `routeTree.gen.ts`),
`check:orphan-pages` (componentes legados sem rota).

## 8. GSC — baseline

Sem novo crawl registrado para os alvos; `lastCrawlTime` inalterado. Nenhuma
conclusão de indexação é extraída nesta rodada. Coorte `indexation_microlot_1`
preservada; estado de descoberta registrado como `discovery_fix_applied_at`.

## 9. Pendências

- Publicar e reconfirmar os cinco links no HTML de produção (smoke).
- Observar crawl no GSC; não expandir conteúdo até haver sinal real.
- Dívida legada dos gates `malha-interna` / `internal-links` / `orphan-pages`.

## Vereditos

1. Todos os cinco alvos possuem inbound HTML real? **SIM**
2. Algum alvo continua órfão? **NÃO**
3. Quantos alvos ficaram em depth ≤ 3? **5/5** (naturalmente, via hub semântico)
4. URLs indexáveis órfãs globalmente após a rodada? **0**
5. Houve regressão em robots/canonical/schema/sitemap/doorway/metadata? **NÃO**
6. Produção contém os novos links SSR? **Pendente de publicação** (validado em SSR local)
7. Já houve novo crawl/indexação no GSC? **NÃO — OBSERVE**
