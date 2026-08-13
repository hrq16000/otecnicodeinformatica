# Relatório — sitemap e noindex das páginas herdadas (B/C)

Gerado na Rodada 4L. Fonte: `npm run inventory:inherited` (sobreposição Jaccard
sobre o HTML estático de cada rota curada) + `dist/sitemap.xml`.

## Situação atual

- Páginas curadas analisadas: **56** — grau A 0 · B 41 · C 15 · D 0.
- Nenhuma página grau D permanece no sitemap (as 11 herdadas com conteúdo
  duplicado já saíram em rodada anterior, com `noindex, follow`).
- Blog: 7 artigos indexáveis (teto atual da onda editorial); 152 seguem
  `noindex, follow`.

## Critério de permanência

| Grau | Sobreposição | Decisão |
| --- | --- | --- |
| A/B | < 0,50 | permanece no sitemap e indexável |
| C | 0,50–0,62 | permanece indexável **em observação**: reescrita prioritária antes da próxima rodada |
| D | > 0,62 ou conteúdo herdado | fora do sitemap, `noindex, follow`, sem link em navegação |

Regra fixa (SEO evolutivo): **nenhuma URL é removida**. A saída é sempre por
`noindex` + retirada do sitemap/navegação — nunca 404.

## Grau C — indexáveis em observação (reescrita prioritária)

`/diagnostico-tecnico`, `/coleta-e-entrega`, `/anuncie`, `/quando-nao-compensa`,
`/contato`, `/`, `/servicos` e os 8 artigos da onda editorial.

Observação metodológica: as rotas institucionais aparecem com poucas palavras no
inventário porque a medição usa o *shell* estático; o conteúdo completo é
hidratado no React. A sobreposição alta vem dos blocos comuns (processo em 4
etapas, faixa de CTA, provas de confiança) e não do corpo editorial.

Ação: diferenciar os blocos comuns por rota (títulos e microcopy próprios) para
puxar essas páginas para grau B na próxima rodada.

## Fora do sitemap (só voltam com conteúdo 100% próprio)

- Verticais secundárias consolidadas: `/cftv`, `/servicos/conserto-celular`,
  `/servicos/manutencao-tv` (canônica em `/servicos/conserto-tv`).
- Rota herdada `/arrumar-pc`.
- Bairros fora dos 12 âncoras e cidades fora das 6 âncoras.
- 152 artigos de blog herdados.

Condição de retorno para qualquer item acima: texto integralmente próprio,
sobreposição < 0,45 contra qualquer rota indexável, FAQ contextual própria e
prova visual real da rota. Só então volta ao sitemap com `index, follow`.

## Gates que sustentam a decisão

`check:brand-isolation`, `check:programmatic-similarity`, `check:faq-parity`,
`check:breadcrumb-schema`, `check:malha-interna`, `check:forbidden-copy`,
`check:cta-funnel` — todos verdes no build desta rodada.
