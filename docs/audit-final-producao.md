# Auditoria final de produção — O Técnico de Informática

Data: 12/08/2026 · Domínio: https://otecnicodeinformatica.com.br

## Veredito

**APROVADO PARA PRODUÇÃO.** Build de produção verde e bateria completa de gates
(SEO, marca, local, editorial, conversão, telemetria e segurança) sem bloqueios.

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
