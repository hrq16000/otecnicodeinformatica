# Go-live — baseline de indexação e medição

Data do registro: 2026-08-06 (UTC)
Propriedade Search Console: `sc-domain:tecnico.curitiba.br` (siteOwner)

Este documento é o marco zero. A partir dele, **nenhuma alteração deve ser feita
por suposição** — apenas com evidência vinda do Search Console ou do funil.

---

## 1. Ambiente de produção

| Verificação | Resultado |
| --- | --- |
| `https://tecnico.curitiba.br/` | 200, HTTPS válido |
| `https://www.tecnico.curitiba.br/` | 200, HTTPS válido |
| `/robots.txt` | 200, `Allow: /` para Googlebot, Bingbot e demais agentes |
| `/sitemap.xml` | 200, `sitemapindex` com 5 sub-sitemaps |
| Sitemaps herdados (`news`, `marcas`, `problemas`) | servidos com 0 `<loc>` (zerados, sem URLs órfãs) |

## 2. Sitemap enviado

- Enviado via API: `https://tecnico.curitiba.br/sitemap.xml`
- `lastSubmitted`: 2026-08-06T04:32:48Z · `lastDownloaded`: 2026-08-06T04:32:50Z
- **errors: 0 · warnings: 0 · isPending: false**
- Sub-sitemaps: `main` (14), `servicos` (19), `regioes`, `bairros`, `editorial` (6)
- Total de URLs indexáveis no manifesto curado: **51**

## 3. Baseline — páginas comerciais P0

| URL | Estado no índice | Último crawl |
| --- | --- | --- |
| `/` | Submitted and indexed | 2026-08-05 |
| `/tecnico-informatica-curitiba` | Submitted and indexed | 2026-07-09 |
| `/servicos/recuperacao-de-dados` | Submitted and indexed | 2026-07-12 |
| `/servicos/formatacao` | Submitted and indexed | 2026-07-17 |
| `/servicos/upgrade-ssd-ram` | Submitted and indexed | 2026-07-12 |
| `/empresa-de-ti-curitiba` | Submitted and indexed | 2026-07-12 |
| `/servicos/manutencao-de-computador` | URL is unknown to Google | — |
| `/servicos/manutencao-de-notebook` | URL is unknown to Google | — |
| `/atendimento-domicilio` | URL is unknown to Google | — |
| `/servicos/suporte-tecnico-empresarial` | URL is unknown to Google | — |

As quatro URLs desconhecidas **estão no sitemap** (`sitemap-servicos.xml` /
`sitemap-main.xml`), são `index, follow` e retornam 200 — apenas ainda não foram
rastreadas. Nenhuma ação corretiva antes da janela de 4 semanas.

Rich results: `Breadcrumbs` detectado com verdict PASS em todas as páginas já rastreadas.

## 4. Baseline — primeira onda editorial (6 artigos)

| Artigo | Estado no índice |
| --- | --- |
| `/blog/notebook-nao-liga-o-que-fazer` | Submitted and indexed |
| `/blog/como-saber-se-pc-tem-virus-malware` | Submitted and indexed |
| `/blog/computador-lento-causas-solucoes` | Discovered — currently not indexed |
| `/blog/quando-trocar-hd-por-ssd` | Discovered — currently not indexed |
| `/blog/backup-como-proteger-seus-arquivos` | Discovered — currently not indexed |
| `/blog/como-melhorar-sinal-wifi-em-casa` | URL is unknown to Google |

Todos os seis: HTML estático com H1 real, canonical self-referencing,
`robots: index, follow`, JSON-LD `BlogPosting` + `BreadcrumbList` + `FAQPage`,
e presença no `sitemap-editorial.xml`.

## 5. Higiene confirmada

- Nenhum CTA editorial aponta direto para `wa.me` — toda origem passa pela
  triagem central (`/contato?assunto=…`). Exceções auditadas e documentadas:
  barra de fallback de hidratação e shell `<noscript>` de artigos não aprovados.
- Nenhuma URL `noindex` no sitemap; nenhum redirect ou alias no sitemap.
- Segunda onda editorial **não liberada** (modelo fail-closed mantido).

### Gates executados nesta rodada (todos PASS)

`build` · `typecheck` · `check:seo` · `check:sitemap-source` ·
`check:editorial-governance` · `check:editorial-cluster` · `check:internal-links` ·
`check:cannibalization` · `check:orphan-pages` · `check:local-hierarchy` ·
`validate:jsonld` · `check:jsonld-refs` · `check:cta-funnel` ·
`check:editorial-no-direct-wa`

## 6. Redirects do domínio antigo

`redirects/tecnicocuritiba.map.json` (612 regras) permanece **preparado, não
publicado**. Publicar apenas quando houver acesso ao domínio antigo, com o gate
de aprovação e rollback de `scripts/publish-redirects.mjs`. Nenhuma alteração de
DNS nesta rodada.

## 7. Plano de observação

### Semana 4 (2026-09-03)
- Reinspecionar as 10 P0 e os 6 artigos.
- Esperado: as 4 URLs "unknown" rastreadas; ao menos 4 dos 6 artigos indexados.
- Ação só se: URL continuar desconhecida com sitemap aceito, ou `Crawled — not indexed`.

### Semana 8 (2026-10-01)
- Ler consultas e CTR por página (Search Analytics, 28 dias).
- Ação só se: CTR abaixo do esperado com impressões relevantes (revisar title/description),
  ou URL errada ranqueando para a consulta comercial (revisar canibalização).

### Semana 12 (2026-10-29)
- Comparar conversão (`trackWaClick` / `trackCallClick` por bairro e serviço no
  painel admin) contra impressões orgânicas.
- Ação só se: tráfego relevante sem conversão, ou consulta com demanda comprovada
  sem página correspondente.

## 8. Critério de encerramento

Desenvolvimento orientado por suposição está encerrado. Novas alterações somente
com evidência de: indexação ausente, consulta relevante, CTR baixo, canibalização,
URL incorreta ranqueando, conversão baixa, erro técnico, ou oportunidade
demonstrada pelo Search Console.
