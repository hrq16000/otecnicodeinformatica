# Relatório — RODADA 3D.1 (microgate do sitemap de problemas)

Data: 2026-08-06 · Domínio: https://tecnico.curitiba.br · Escopo: correção isolada, sem conteúdo novo

## 1. Causa raiz

O gate `check:editorial-governance` carregava uma regra da era em que o cluster
`/problemas/*` era fail-closed (noindex, proibido em sitemap). Linha 222 de
`scripts/check-editorial-governance.mjs`:

```js
if (/\/problemas?\//.test(src)) fail(`sitemap ${f}: contém páginas de problemas`);
```

A partir das ondas 3B/3C as duas páginas de sintoma passaram a ser indexáveis e
foram declaradas no manifesto curado (`PROBLEMAS` em `scripts/lib/curated-urls.mjs`,
shard `sitemap-problemas.xml`). O gerador estava certo; a **regra do gate ficou
obsoleta** — banimento absoluto em vez de verificação contra a fonte única.

Dois defeitos reais foram encontrados no caminho e corrigidos junto, ambos ligados
à elegibilidade/frescor:

- **lastmod no futuro**: `/problemas/computador-lento` e `/como-funciona` estavam
  com `2026-08-08` (hoje é 06/08/2026). Data futura é sinal inválido e ajuda a
  explicar por que `/problemas/computador-lento` seguia "desconhecida" no GSC.
- **órfãs no HTML servido**: nenhum link de entrada para `/problemas/*` existia no
  HTML estático — os links só viviam no bundle React (`Servicos.tsx`, `servicosCore`).
  Para o crawler, as duas páginas eram descobertas apenas pelo sitemap.

## 2. Falha reproduzida

```
$ npm run check:editorial-governance
── check:editorial-governance ──
  ✓ inventário: 157 artigos únicos (137 manuais, 20 programáticos)
  ✓ registro editorial: fail-closed + 6 aprovados em paridade com a onda
  ✓ sitemaps: 0 artigos/problemas/marcas; principal = 55 URLs
  ✓ datas: sem datas futuras nem geração no build

✗ 1 falha(s):
  ✗ sitemap sitemap-problemas.xml: contém páginas de problemas
exit 1
```

- Arquivo responsável: `scripts/check-editorial-governance.mjs` (regra), não o gerador.
- URLs envolvidas: `/problemas/notebook-nao-liga`, `/problemas/computador-lento`.
- Esperado: URLs de problema aceitas quando declaradas no manifesto curado.
- Encontrado: qualquer URL `/problemas/` reprovava o sitemap.

## 3. Elegibilidade das páginas

| URL | Elegível antes | Critério ausente | Ação | Depois | Sitemap | Canonical |
|---|---|---|---|---|---|---|
| `/problemas/notebook-nao-liga` | parcial | links de entrada no HTML servido | link estático a partir de `/servicos` e `/servicos/manutencao-de-notebook` | ✔ elegível | `sitemap-problemas.xml` | self, `https://tecnico.curitiba.br/problemas/notebook-nao-liga` |
| `/problemas/computador-lento` | parcial | links de entrada + `lastmod` futuro (2026-08-08) | link estático a partir de `/servicos` e `/servicos/manutencao-de-computador`; lastmod → 2026-08-06 | ✔ elegível | `sitemap-problemas.xml` | self, `https://tecnico.curitiba.br/problemas/computador-lento` |

Demais critérios verificados no artefato (ambas): HTTP 200, title/description/H1
exclusivos, 716 e 1020 palavras no HTML servido, `WebPage` + `BreadcrumbList` +
`FAQPage` válidos, CTA de WhatsApp presente, `index, follow`, canibalização,
trust-claims e soft-404 aprovados. **Nenhuma página foi forçada para dentro do
sitemap** — as duas cumprem todos os critérios.

## 4. Arquivos alterados

| Arquivo | Motivo |
|---|---|
| `scripts/check-editorial-governance.mjs` | Regra passa a derivar de `PROBLEMAS` do manifesto curado: URL de problema fora da fonte única continua reprovando; declarada é aceita. Sem exceção artificial. |
| `scripts/lib/lastmod.mjs` | Datas futuras corrigidas (2026-08-08 → 2026-08-06) e `lastmodFor` passou a clampar qualquer data futura no dia corrente, impedindo a reincidência na fonte. |
| `scripts/curated-static-body.mjs` | Saídas estáticas obrigatórias: `/servicos` e as duas páginas de manutenção agora linkam o sintoma correspondente no HTML servido. |

Nenhum arquivo em `dist/` foi editado; nenhum shard novo, alias, redirect ou lista
manual paralela foi criado. Conteúdo, headings, FAQs, JSON-LD, design, triagem,
analytics e infraestrutura permaneceram intactos.

## 5. Sitemaps

| Item | Antes | Depois |
|---|---|---|
| Sitemap index | 6 shards | 6 shards (inalterado) |
| Total de URLs | 55 | 55 |
| `sitemap-problemas.xml` | 2 URLs (reprovado pelo gate) | 2 URLs (aprovado) |
| URLs duplicadas | 0 | 0 |
| URLs noindex | 0 | 0 |
| Canonical divergente | 0 | 0 |
| lastmod futuro | 2 | 0 |

Shards herdados `sitemap-marcas.xml` e `sitemap-news.xml` seguem vazios de propósito
e fora do index. Manifesto curado (55) = URLs emitidas (55) = rotas indexáveis do
manifesto de rotas. Geração conferida como determinística e idempotente (md5 idêntico
em duas execuções seguidas).

## 6. Regressão da Rodada 3D

| Página | Conteúdo estático | Canonical | JSON-LD | Links | Sitemap | CTA |
|---|---|---|---|---|---|---|
| `/empresa-de-ti-curitiba` | 466 palavras, inalterado | self ✔ | ✔ | ✔ | `sitemap-main` ✔ | ✔ |
| `/servicos/suporte-tecnico-empresarial` | 1005 palavras, inalterado | self ✔ | ✔ | ✔ | `sitemap-servicos` ✔ | ✔ |
| `/servicos/redes-e-wifi` | 1164 palavras, inalterado | self ✔ | ✔ | ✔ | `sitemap-servicos` ✔ | ✔ |
| `/servicos/manutencao-preventiva-empresas` | 989 palavras, inalterado | self ✔ | ✔ | ✔ | `sitemap-servicos` ✔ | ✔ |
| `/servicos/backup-para-empresas` | 1087 palavras, inalterado | self ✔ | ✔ | ✔ | `sitemap-servicos` ✔ | ✔ |

Nenhuma alteração editorial nas cinco páginas.

## 7. Gates

| Gate | Resultado | Evidência |
|---|---|---|
| `rm -rf dist && npm run build` | ✔ | 48 rotas curadas prerenderizadas, 1036 rotas no manifesto |
| `check:editorial-governance` (gate da falha) | ✔ | "blog/problemas/marcas conforme manifesto curado; principal = 55 URLs" |
| `check:seo` | ✔ | title/desc/H1 OK |
| `check:seo:curated` | ✔ | 48 rotas |
| `check:cannibalization` | ✔ | 14 páginas P0, só aviso 0,50 pré-existente |
| `check:internal-links` | ✔ | 0 quebrados |
| `check:sitemap-source` | ✔ | 55 URLs em 6 shards |
| `check:jsonld-parity` | ✔ | 316 páginas, 200 FAQ |
| `check:trust-claims` | ✔ | 0 claims |
| `check:soft404` | ✔ | 218 verificações |
| `check:orphan-pages` | ✔ | 0 órfãos |
| `vitest run` | ✔ | 9 arquivos, 73 testes |
| `test:validate-jsonld` | ✔ | validador aprova/reprova conforme esperado |
| `test:smoke` (Playwright) | não executável | falta `lovable-agent-playwright-config` no ambiente; teste de navegador não exigido para correção de sitemap, nenhum componente de UI alterado |

## 8. Git final

`git status --short` e `git diff --stat` são gerenciados pela plataforma neste
ambiente (estado do git não é manipulável pelo agente). Diff efetivo desta rodada:
3 arquivos de script, listados na seção 4.

## 9. Decisão

RODADA 3D APROVADA

## 10. Próximo passo

Planejar a Rodada 3E concentrada em suporte remoto, home office, segurança de dados
e casos técnicos reais, sem criar novas páginas de cidades, bairros ou infraestrutura.
