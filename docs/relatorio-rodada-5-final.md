# Rodada 5 — SEO Local: relatório final

## Veredito (escala 1–3)

**Veredito: 2 — arquitetura local sob controle, expansão liberada em lotes.**

- Não é 1 (crítico): não há mais doorways indexáveis por cidade/bairro; canonical, robots e sitemap saem de uma única fonte de verdade e são validados no build.
- Não é 3 (maduro): a autoridade local ainda depende de poucas páginas (6 cidades + 5 bairros âncora) e não há histórico de desempenho no Search Console para as URLs do Lote Local 1.

## Governança

Fonte única de verdade: `src/lib/localIndexPolicy.json`, consumida por
`src/lib/localIndexPolicy.ts` (runtime) e `scripts/lib/local-index-policy.mjs`
(build, sitemap, robots e gates). Nenhuma página local decide sozinha se é
indexável.

## Lote Local 1 — 12 URLs

### Cidades (indexáveis)

| URL | Indexação | Canonical | Sitemap |
| --- | --- | --- | --- |
| /tecnico-informatica-curitiba | index | self | sim |
| /tecnico-informatica-sao-jose-pinhais | index | self | sim |

### Bairros âncora (indexáveis)

| URL | Indexação | Canonical | Sitemap | Pai |
| --- | --- | --- | --- | --- |
| /bairros/cic | index | self | sim | /tecnico-informatica-curitiba |
| /bairros/batel | index | self | sim | /tecnico-informatica-curitiba |
| /bairros/agua-verde | index | self | sim | /tecnico-informatica-curitiba |
| /bairros/centro | index | self | sim | /tecnico-informatica-curitiba |
| /bairros/portao | index | self | sim | /tecnico-informatica-curitiba |

### Serviço × cidade (canonicalizados no serviço-pai)

| URL | Indexação | Canonical | Sitemap |
| --- | --- | --- | --- |
| /servicos/formatacao-computador/curitiba | canonicalized | /servicos/formatacao-computador | não |
| /servicos/remocao-virus/curitiba | canonicalized | /servicos/remocao-virus | não |
| /servicos/conserto-notebook/curitiba | canonicalized | /servicos/conserto-pc-notebook | não |
| /servicos/conserto-pc/curitiba | canonicalized | /servicos/conserto-pc-notebook | não |
| /servicos/upgrade-ssd/curitiba | canonicalized | /servicos/upgrade-ssd-memoria | não |

Motivo comum das canonicalizações: a cidade não muda o procedimento, o preço
nem a logística já descritos no serviço-pai e na landing de Curitiba. Criar
página própria produziria doorway e canibalização.

## Checklist anticanibalização

| Critério | Resultado |
| --- | --- |
| Uma intenção por URL indexável | OK |
| Bairros indexáveis com contexto local próprio | OK (5 âncora; 217 restantes noindex) |
| Serviço × cidade sem intenção extra | Canonicalizado (5/5) |
| Cidades sem operação declarada | noindex (5 cidades) |
| Sobreposição /assistencia-tecnica-curitiba × /tecnico-informatica-curitiba | Resolvida: a genérica segue noindex |
| Prefixos herdados (/arrumar-pc/*, /cftv/*) | Bloqueados permanentemente |

## Evidências de execução

| Verificação | Resultado |
| --- | --- |
| `npm run build` (inclui gates de robots, schema, GEO, imagens e política local) | OK — 115 rotas indexáveis, 20 rotas locais conferidas |
| `check-local-index-policy` | OK — robots, canonical e sitemap coerentes com o JSON central |
| `vitest run` | 547 testes / 16 arquivos — todos verdes |
| `e2e/lote-local-1-seo.spec.ts` | 12/12 verdes (robots, canonical, sitemap, breadcrumbs, JSON-LD, link para o pai) |

O spec E2E lê os artefatos publicados em `dist/` para as rotas com HTML
próprio (a trava `VITE_SITE_INDEXING_ENABLED` remove canonical no preview) e
valida em runtime as rotas SPA canonicalizadas, que por decisão da política não
têm HTML próprio.

## Recomendação de próximo passo

**Rota B — aprofundar antes de expandir.**

Justificativa: o checklist anticanibalização não apontou conflitos abertos, mas
a base indexável local é estreita e ainda sem sinal de desempenho. Antes de
liberar o Lote Local 2 (novos bairros), o ganho maior está em:

1. enriquecer as 5 páginas de bairro âncora com prova local real (fotos
   licenciadas, referências de deslocamento, casos por bairro);
2. acompanhar impressões/posição dessas 12 URLs no Search Console por pelo
   menos 14 dias;
3. só então promover novos bairros, usando desempenho observado como critério
   de entrada — e não volume.
