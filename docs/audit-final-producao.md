# Auditoria final de produção — O Técnico de Informática

Data: 12/08/2026 (execução real) · Domínio: https://otecnicodeinformatica.com.br

## Veredito

**APROVADO PARA PRODUÇÃO COM RESSALVAS.** Build de produção verde e bateria local de gates
(SEO, marca, local, editorial, conversão, telemetria e segurança) sem bloqueios — gates
dependentes de rede, smoke público e E2E Chromium contra o domínio publicado ainda pendentes
(ver "Validação pós-publicação" ao final).

## Build

- `npm run build`: OK — 268 rotas pré-renderizadas, 47 curadas, hub /blog + 159 artigos
  (7 indexáveis, 152 `noindex,follow`).
- Pós-build: SEO básico, JSON-LD, manifesto de rotas, soft-404 (228 verificações),
  sitemap de imagens (57 páginas / 106 imagens) e paridade de tags de medição — todos OK.
- GA4/Ads permanecem desligados por ausência de IDs em env (fail-closed, sem tag externa).

## Correções desta rodada

| Item | Problema | Correção |
| --- | --- | --- |
| `package.json` | `verify:prod-status` e `smoke:edge:prod` apontavam para o domínio de origem | Base passa a vir de `SITE_BASE_URL` / `BASE_URL` |
| `check-nap-whatsapp.mjs` | Auditava domínio de terceiros e tratava o número oficial como legado | Reescrito: audita o build próprio (wa.me, JSON-LD, ausência de `tel:` e de número visível) |
| `check-analytics-parity.mjs` | Falso positivo — persistência agora passa por `registrarConversaoClique` | Aceita a rota deduplicada, exigindo que o evento chegue a `click_events` |
| `check-editorial-governance.mjs` | `BASE_URL` não importado; regras de autor/publisher invertidas pela troca de marca; exigia `wa.me` direto | Import corrigido; publisher deve ser a Organization oficial; CTA exigido é o de triagem |
| `check-editorial-pilot.mjs` | Bloqueava link para artigo aprovado fora da lista-piloto | Aceita piloto **ou** onda editorial aprovada |
| `check-pc-assembly-service.mjs` | Bloco lido ia até o fim do arquivo, capturando copy de `/servicos/pc-gamer` | Delimitação correta da entrada `montagem-de-pc` |
| Telemetria | Funções existiam só no banco, sem migration no repositório | Migration materializa `consolidate_click_events`, `is_qa_click_event`, `purge_*` e baseline |
| Segurança | Funções `SECURITY DEFINER` executáveis por anon/authenticated | `EXECUTE` revogado; só `service_role` executa |
| Lighthouse | `lhci` não instalado (npx baixava pacote homônimo de terceiro) e rotas `noindex` no config | `@lhci/cli` como devDependency, `--no-sandbox`, e rotas locais indexáveis no lighthouserc |

## Indexação e canibalização

- Sitemap principal: 56 URLs curadas; blog, problemas e marcas conforme manifesto.
- Hierarquia local: apenas cidades-âncora e bairros-âncora indexáveis; verticais consolidadas
  (`/conserto-tv/*`, `/conserto-celular/*`) permanecem `noindex,follow` por decisão anticanibalização.
- Gates `check:cannibalization`, `check:local-hierarchy`, `check:programmatic-similarity`,
  `check:meta-uniqueness` e `check:faq-parity`: OK.

## Conversão

- Contato exclusivamente por WhatsApp via funil de triagem; nenhum número visível, nenhum `tel:`.
- CTA editorial passa pela triagem (`editorial_static`), nunca por `wa.me` direto.
- Deduplicação de clique (janela de 8s) antes de persistir conversão e reportar ao Ads.

## Performance local

Lighthouse desktop sobre rotas locais indexáveis (`/bairros/batel`, `/bairros/agua-verde`,
`/tecnico-informatica-sao-jose-pinhais` e demais): baseline gravada em
`.lighthouse-local-baseline.json`, sem falha de asserção.

## Pendências (não bloqueantes)

- `VITE_GA4_ID` / `VITE_GOOGLE_ADS_ID` ausentes: medição desligada até serem configurados.
- Gates dependentes de rede (`check:cf-zone`, `check:index-health`, `check:sitemap-status`,
  `verify:prod-status`) devem rodar contra o domínio publicado.
- Suíte E2E completa (`npx playwright test --project=chromium`) roda longa; o projeto `webkit`
  não tem binário neste ambiente.

---

# Validação pós-publicação (Rodada 3P)

- Data/hora real: **12/08/2026 00:50–01:05 UTC**
- Domínio auditado: **https://otecnicodeinformatica.com.br** (build `x-deployment-id: 39836076-ff8f-41cd-ba8f-81290c881e4b`)
- Novo gate: `npm run check:live-production` (`scripts/check-live-production.mjs`)

## A. Deploy

| Item | Resultado |
| --- | --- |
| Host canônico | https://otecnicodeinformatica.com.br — HTTP 200 |
| www | 302 → host canônico (funciona; recomendado 301) |
| HTTPS / HSTS | OK (`max-age=31536000; includeSubDomains`) |
| Headers | `x-content-type-options`, `referrer-policy` OK; CSP e Permissions-Policy ausentes na resposta real |
| Cache | `no-cache` no HTML, imutável em assets |

## B. Rede

| Gate | Resultado |
| --- | --- |
| check:sitemap-status | HEALTHY — 10 arquivos, 68 URLs, chave IndexNow 200 |
| check:cf-zone | NÃO EXECUTADO — `CLOUDFLARE_API_TOKEN` ausente |
| check:index-health | Corrigido (`BASE_URL` não importado); execução contra produção é longa e ficou incompleta nesta janela |
| check:live-production | BLOQUEADO — ver Pendências |
| verify:prod-status / smoke:edge:prod | NÃO EXECUTADOS nesta janela |

## C/D. Indexação e sitemaps

| Shard | URLs | HTTP |
| --- | ---: | --- |
| sitemap-main.xml | 19 | 200 |
| sitemap-servicos.xml | 15 | 200 |
| sitemap-regioes.xml | 6 | 200 |
| sitemap-bairros.xml | 5 | 200 |
| sitemap-problemas.xml | 2 | 200 |
| sitemap-editorial.xml | 8 | 200 |

Nenhuma URL fora do host oficial, nenhuma URL herdada, localhost ou preview.

## E. HTML real e canonical

As 11 páginas da amostra (`/`, 4 serviços, 2 cidades, 2 bairros, `/sobre`, `/precos-e-politicas`)
entregam title, description, canonical self-referente HTTPS, H1, JSON-LD válido, OG e marca
oficial já no HTML servido pelo servidor. Zero `tel:`, zero número visível, zero token herdado.

## F. Analytics

Fail-closed confirmado em produção: sem GA4, sem Google Ads, sem requisição de medição externa.

## G. Horário

`VITE_BUSINESS_HOURS` configurado — horários aparecem no schema conforme política.

## H. Segurança

Rotas admin bloqueadas em robots; nenhum dado administrativo no HTML servido; service role ausente
do bundle; funções `SECURITY DEFINER` restritas a `service_role` (migration da rodada anterior).

## I. E2E

- Chromium: **NÃO EXECUTADO nesta janela**
- Firefox: **NÃO EXECUTADO**
- WebKit: **NÃO EXECUTADO — LIMITAÇÃO DE AMBIENTE**

## J. Lighthouse de produção

**NÃO EXECUTADO nesta janela.**

## L. Pendências

**Bloqueante**
1. **Soft-404 em produção.** Qualquer URL inexistente (10/10 testadas) responde **HTTP 200 com o
   HTML da Home**, com `canonical=https://otecnicodeinformatica.com.br/` e `index, follow`.
   O `public/_redirects` (`/* → /404.html 404`) não é honrado pelo host atual; o fallback de SPA
   entrega `index.html`. Isso vale também para rotas reais não prerenderizadas
   (`/bairros/santa-felicidade`, `/arrumar-pc/curitiba`, `/servicos/*-curitiba`), que deveriam ser
   `noindex,follow` e hoje chegam ao Google como duplicata da Home.

**Não bloqueantes**
- www responde 302 (idealmente 301).
- CSP e Permissions-Policy não são entregues pelo servidor.
- `check:cf-zone` sem credenciais Cloudflare.
- E2E Chromium, smoke público e Lighthouse de produção pendentes.

## M. Veredito

**APROVADO PARA PRODUÇÃO COM RESSALVAS** — o portal está no ar, correto em domínio, robots,
sitemaps, canonicals, marca, contato e analytics fail-closed; a indexação plena depende de
resolver o soft-404 do fallback e de concluir a bateria (E2E Chromium, smoke público, Lighthouse).

## Rodada 3P.2 — borda e paridade de 404 (fechamento)

- Worker de borda repontado para a zona nova: `otecnicodeinformatica-route-guard`, rota `otecnicodeinformatica.com.br/*` (`cloudflare/wrangler.toml`, `cloudflare/worker.js`, workflow `cloudflare-edge.yml`). Artefatos `.wrangler/dry` herdados da marca de origem foram removidos.
- Rotas dinâmicas inválidas (`/marcas/*`, `/problemas/*`, `/procedimentos/*`, `/blog/*`) passaram a renderizar a 404 canônica (`src/pages/NotFound.tsx`) em vez de telas próprias ou redirect para `/blog`: H1 "Página não encontrada", `noindex, nofollow`, sem canonical e sem JSON-LD.
- Build: 1052 rotas exatas, 317 páginas próprias, 723 shells noindex. Gates `soft-404`, `http-route-semantics`, `brand-isolation`, `sitemap-source`, `internal-links`, `programmatic-similarity`, `local-seo-quality`, `faq-parity`, `meta-uniqueness` e `rich-results` verdes. Vitest 482/482; E2E `soft-404` 9/9.
- Pendência única: 404 real (status HTTP) para URLs desconhecidas depende do deploy do Worker, que exige `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`. Até lá, URLs desconhecidas respondem 200 + `noindex` sem canonical da home (soft-404 controlado).

## Rodada 3P.2 — ativação do Worker e 404 HTTP real

Data/hora: 2026-08-12T01:45Z. Escopo: **exclusivamente borda** — nenhuma alteração em rotas React,
conteúdo, SEO, schemas, sitemap, robots, analytics, funil ou WhatsApp.

**Preparação concluída (código de borda pronto para publicar)**
- `scripts/cf-edge-dry.mjs`: nome esperado do Worker passou a ser derivado de `VITE_SITE_DOMAIN`
  (não mais o literal da marca de origem). Pré-voo agora resulta **APTO**.
- `scripts/lib/edge-router.mjs`: `www.<domínio>` deixou de ser proxy e passa a **308 permanente**
  para o apex, preservando path e query (`/servicos/manutencao-de-notebook?utm_source=x`).
- `cloudflare/worker.js`: honra o status 308 devolvido pelo roteador.
- `cloudflare/wrangler.toml`: rota `www.otecnicodeinformatica.com.br/*` habilitada.
- Testes unitários do roteador: 12/12. Bundle do Worker: 26,6 KiB comprimido (limite 2457,6 KiB).
- Build: 1052 rotas exatas, 38 aliases, 711 assets, 723 shells noindex; gates `soft-404` e
  `http-route-semantics` verdes.

**Medição em produção (2026-08-12, antes do Worker)**

| URL | Esperado | Obtido |
| --- | --- | --- |
| `/` | 200 | 200 |
| `/servicos/manutencao-de-notebook` | 200 | 200 |
| `/tecnico-informatica-curitiba` | 200 | 200 |
| `/bairros/batel` | 200 | 200 |
| `/bairros/academia-sjp` (noindex válido) | 200 + noindex | 200 + noindex |
| `/isto-nao-existe-938472` | 404 | 200 (noindex, sem canonical da home) |
| `/servicos/banana-quantica` | 404 | 200 (noindex) |
| `/bairros/bairro-que-nao-existe` | 404 | 200 (noindex) |
| `/blog/artigo-inexistente-938472` | 404 | 200 (noindex) |
| `/assets/nao-existe-938472.js` | 404 | **404** |
| `/isto-nao-existe-938472?utm_source=test` | 404 | 200 (noindex) |
| `www` + path + query | 301/308 | 302 (path e query preservados) |

**Pendência única (infraestrutura, não código)**
`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` e `CLOUDFLARE_ZONE_ID` não estão disponíveis no
ambiente de execução nem como secrets do repositório; sem eles não é possível validar a zona
(`check:cf-zone` apenas avisa e sai), publicar o Worker (`cf:edge:deploy`) nem rodar
`verify:cf`. Nenhum token foi versionado, impresso ou adicionado ao `.env.example`.

**Veredito mantido: APROVADO PARA PRODUÇÃO COM RESSALVAS.** Todas as condições sob controle da
aplicação estão satisfeitas (indexáveis 200, noindex válidos 200 + noindex, asset inexistente 404,
404 canônica sem canonical da home). O upgrade para **APROVADO PARA PRODUÇÃO E INDEXAÇÃO** ocorre
automaticamente após o deploy do Worker com o token, quando URLs desconhecidas passarem a devolver
status HTTP 404 real.

## Rodada 3P.2 — tentativa de ativação do Worker (13/08/2026, 04:0x UTC)

- Nenhuma alteração na aplicação (rotas, conteúdo, SEO, schemas, sitemap, robots, analytics, funil).
- Pré-voo `cf:edge:dry` (somente leitura, sem secrets): worker
  `otecnicodeinformatica-route-guard`, zona `otecnicodeinformatica.com.br`, rotas
  `otecnicodeinformatica.com.br/*` e `www.otecnicodeinformatica.com.br/*`, modelo de origem `dns`,
  manifesto com 1095 rotas exatas, 41 aliases e 776 assets — **APTO**.
- Retestes HTTP diretos em produção: `/` 200 · `/servicos/manutencao-de-notebook` 200 ·
  `/tecnico-informatica-curitiba` 200 · `/bairros/batel` 200 · `/assets/nao-existe-938472.js` 404 ·
  `/isto-nao-existe-938472` 200 (soft-404) · `/servicos/banana-quantica` 200 (soft-404) ·
  `www/` 302 → `https://otecnicodeinformatica.com.br/`.
- Causa do soft-404 confirmada: ausência do Worker de borda; a origem estática devolve o shell da
  SPA com 200 para qualquer path desconhecido, enquanto o HTML servido já é a 404 canônica
  (`noindex`, sem canonical da home, H1 de página não encontrada).
- `check:cf-zone`, `cf:edge:deploy`, `smoke:edge:prod`, `check:index-health`,
  `check:sitemap-status` e `verify:prod-status` seguem bloqueados: o token Cloudflare foi
  solicitado nesta rodada e não foi fornecido. Nenhum token foi versionado, impresso ou adicionado
  ao `.env.example`.
- Pendência de `www`: a troca de 302 para 308/301 permanente também ocorre no Worker, junto com a
  preservação de path e query (já preservados hoje).

**Veredito mantido: APROVADO PARA PRODUÇÃO COM RESSALVAS** — o upgrade para
**APROVADO PARA PRODUÇÃO E INDEXAÇÃO** depende exclusivamente do deploy do Worker com o token.
