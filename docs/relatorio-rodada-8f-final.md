# Rodada 8F — Distribuição, discovery e primeiros sinais orgânicos

Data: 2026-08-14. Escopo: **observar o cluster piloto de formatação** publicado na 8E.
Nenhum cluster novo, nenhuma keyword nova, nenhum Ads, Experimento CRO intocado.

## 1. Resumo executivo

O cluster está tecnicamente pronto para ser descoberto: 4/4 URLs respondem 200,
estão no sitemap, com self-canonical, index/follow, links internos de entrada e
profundidade de clique 1 a partir da Home. **Não há ainda evidência de indexação,
impressão, clique ou sessão orgânica** — e isso é o esperado para um domínio novo
com poucos dias de publicação. Nenhuma página foi reescrita por falta de tráfego.

## 2. URLs do cluster

| URL | Intent | Canonical | Sitemap | Parent |
| --- | --- | --- | --- | --- |
| `/blog/como-formatar-pc-sem-perder-arquivos` | informational | self | sim | `/blog` |
| `/blog/quanto-custa-formatar-um-computador` | commercial | self | sim | `/blog` |
| `/servicos/formatacao` | local_commercial | self | sim | `/servicos` |
| `/problemas/computador-lento` | diagnostic | self | sim | `/problemas` |

Slug, title, H1, conteúdo, schema e CTA principal **congelados** na janela de observação.

## 3. Coorte

`content_cluster_formatacao_v1` em `src/lib/contentCohort.ts` — fonte única, contendo
apenas as 4 URLs reais da 8E. Adição silenciosa é bloqueada por `check:content-discovery`
(coerência coorte × `contentIntentMap`).

## 4–5. Discovery e indexação

Estados: UNKNOWN / DISCOVERED / CRAWLED / INDEXED. Sem credencial GSC nesta execução,
a fonte é registrada como "não conectado" e o veredito por URL é **SEM_EVIDENCIA** —
nunca INDEXED inferido.

- Indexadas: **0/4** (sem evidência, não "não indexado").

## 6–9. Sitemap, canonical, links internos, click depth

`check:content-discovery` (fail-closed, roda no build): rota 200 4/4 · sitemap 4/4 ·
self-canonical 4/4 · sem noindex · ≥2 links internos de entrada · profundidade ≤3.
Profundidade real após esta rodada: **1** (era 6). A correção foi feita no gerador do
HTML estático (`scripts/curated-static-body.mjs`, bloco `CLUSTER_8F_INBOUND`), com
links apenas na Home, em `/servicos/formatacao` e em `/problemas/computador-lento` —
sem link sitewide.

## 10. Computador lento

A malha temática agora liga computador lento ↔ guia de formatação ↔ custo ↔ serviço,
com 2 links contextuais por página. Nenhum bloco de links genérico foi adicionado.

## 11–13. Schema e performance

Artigos mantêm Article/BlogPosting + BreadcrumbList; FAQPage só onde a FAQ é visível.
Capas são fotografia real licenciada, com dimensões explícitas e lazy fora da dobra.

## 14–21. Distribuição (GBP + social)

3 pautas × 3 canais = **9 peças**, geradas por `report:content-distribution`
(`reports/content-distribution-map.md`), com UTM montada pelo builder oficial
(`utmLinkBuilder`), nunca à mão. Nenhuma rota nova foi criada para distribuição.

Estado: **PRONTO_PARA_PUBLICAR**. Não existe integração autorizada de postagem —
nada aqui deve ser lido como publicado.

## 22–29. Sinais e queries

`reports/content-query-intent.md`: 0/4 URLs com consulta real. Sem GSC,
observed query = UNKNOWN. Semrush continua tratado como **market demand signal**,
nunca como desempenho do site. Nenhum title foi alterado "para melhorar CTR" —
com 0 impressões o gargalo ainda é discovery.

## 30–35. Sessões, jornada e idade

- FIRST ORGANIC SEARCH SESSION: **não ocorreu**.
- FIRST CONTENT CLUSTER SESSION: **não ocorreu**.
- Primeiro assist (conteúdo → serviço/CTA/WhatsApp): **0**.
- Idade da coorte: faixa 0–7 dias. Classificação global: **LOW_EVIDENCE**,
  sem recomendação automática gerada.

Painel: `PainelClusterEditorial` dentro de `/admin/conversao`, com URL, intent,
discovery, indexado, sessões, orgânico, CTA, transições para serviço, WhatsApp e assist.

## 36–40. Relatórios

- `report:content-discovery` → `reports/content-discovery.{json,md}`
- `report:content-query-intent` → `reports/content-query-intent.{json,md}`
- `report:content-distribution` → `reports/content-distribution-map.{json,md}`
- `report:content-performance` → `reports/content-performance.{json,md}` (4 × SEM_DESCOBERTA)

Alertas cobrem apenas anomalia técnica (noindex, canonical alterado, saída do sitemap,
404/5xx, schema quebrado, perda de links internos). "0 cliques em 3 dias" não alerta.

## 41–52. Atribuição, CRO, edge e contato

GBP (`utm_medium=organic_gbp`), social e busca orgânica permanecem separados.
First touch do conteúdo é preservado até serviço/WhatsApp; a conversão não é
contada duas vezes. Experimento 1: **DISABLED**, thresholds e janela inalterados.
Edge 404: **READY_TO_DEPLOY** (falta `CLOUDFLARE_API_TOKEN`). Contato canônico e
pop-up de saída: sem alteração.

## 53–59. Build e testes

- `npm run build`: **verde** — 110 gates, 0 bloqueios, 0 avisos.
- Vitest: **649 testes / 27 arquivos**, todos passando (total real medido).
- `check:content-discovery` verde após a correção de profundidade.

## Vereditos

1. **Google descobriu todas as URLs?** 0/4 confirmadas — status real: SEM_EVIDENCIA (GSC não conectado nesta execução).
2. **Quantas indexadas?** 0/4 confirmadas. Não inferido.
3. **Impressões orgânicas reais?** NÃO.
4. **Sessões humanas reais no cluster?** NÃO — organic 0, GBP 0, social 0, direct 0.
5. **Jornada avançou para diagnóstico/serviço/CTA/WhatsApp?** 0.
6. **Evidência para criar o Cluster 2?** **NÃO — CONTINUAR OBSERVANDO O CLUSTER 1.**

## Pendências

- Conectar credenciais do Search Console na execução dos relatórios para sair de SEM_EVIDENCIA.
- Publicar manualmente as 9 peças de distribuição (links prontos no mapa).
- Deploy do Worker de 404 quando houver `CLOUDFLARE_API_TOKEN`.
