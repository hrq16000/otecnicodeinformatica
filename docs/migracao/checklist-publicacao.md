# Checklist de publicação — migração SEO tecnicocuritiba.com.br → tecnico.curitiba.br

Anexe esta checklist à aprovação final. Toda linha precisa estar marcada com
evidência (arquivo de relatório) antes de publicar `published: true`.

## 0. Pré-requisitos operacionais

- [ ] Controle da hospedagem/edge do domínio antigo confirmado (quem aplica as 612 regras).
- [ ] Acesso ao Search Console das duas propriedades (para "Alteração de endereço").
- [ ] Número oficial de WhatsApp confirmado: `5541997086380` (legado `5541997452053` deve sumir).

## 1. Build e SEO estático

| # | Verificação | Comando | Artefato |
| --- | --- | --- | --- |
| 1.1 | Build + gates de SEO/JSON-LD do build | `npm run build` | saída do `postbuild` |
| 1.2 | JSON-LD estático válido em todas as páginas | `npm run validate:jsonld` | stdout |
| 1.3 | Referências entre nós JSON-LD | `npm run check:jsonld-refs` | stdout |
| 1.4 | Relatório consolidado LocalBusiness/BreadcrumbList/og/twitter | `npm run report:jsonld` | `reports/jsonld-coverage.md` · `reports/jsonld-coverage.json` |
| 1.5 | Gate estrito (falha em regressão) | `npm run report:jsonld:strict` | exit code 0 |
| 1.6 | Links internos | `npm run check:internal-links:strict` | stdout |

O relatório 1.4 cobre, por rota: `LocalBusiness` (telephone, localidade,
`areaServed`, horários, `@id`), `BreadcrumbList` (blocos e itens), canonical,
robots, `og:image` e todas as tags `twitter:*`, com detecção de duplicidade.

## 2. Rotas de keyword (aliases)

| # | Verificação | Onde |
| --- | --- | --- |
| 2.1 | 7 aliases declarados com `Navigate ... replace` | `src/LegacyApp.tsx` |
| 2.2 | Destino canônico existe no `dist` com canonical próprio | seção "Rotas de keyword" de `reports/jsonld-coverage.md` |
| 2.3 | Nenhum canonical aponta para o alias (anti-canibalização) | mesma seção |

## 3. E2E

| # | Verificação | Comando |
| --- | --- | --- |
| 3.1 | LocalBusiness / NAP | `npx playwright test e2e/localbusiness-jsonld.spec.ts` |
| 3.2 | Canonical único + Organization `@id` | `npx playwright test e2e/canonical-organization.spec.ts` |
| 3.3 | Slots determinísticos de JSON-LD | `npx playwright test e2e/jsonld-slots.spec.ts` |
| 3.4 | Triagem PF × PJ | `npx playwright test e2e/triagem-pf-pj.spec.ts` |
| 3.5 | Matriz multiengine particionada | `npm run e2e:matrix:shard` → `npm run e2e:matrix:merge` → `npm run e2e:matrix:report` |

## 4. NAP / WhatsApp

| # | Verificação | Comando | Artefato |
| --- | --- | --- | --- |
| 4.1 | Número oficial e ausência do legado nas 10 URLs mantidas + domínio novo | `npm run check:nap -- --confirm=5541997086380` | `reports/nap-whatsapp.json` |

O verificador captura o número em: links `wa.me`/`api.whatsapp.com`,
`telephone`/`sameAs` de JSON-LD, links `tel:`, atributos e assets
(`src`, `href`, `alt`, `aria-label`, `data-*`) e texto visível em qualquer
formatação. Qualquer ocorrência do legado **falha** o gate.

## 5. Redirects

| # | Verificação | Comando | Artefato |
| --- | --- | --- | --- |
| 5.1 | Amostra prioritária | `npm run check:redirects` | `reports/redirect-gate.md` |
| 5.2 | Cobertura total das 612 regras (cadeia, hops, status final, canonical/robots) | `npm run check:redirects:all` | `reports/redirect-gate.json` |
| 5.3 | Coverage 100% e 0 falhas | leitura do cabeçalho do relatório | — |
| 5.4 | 41 URLs críticas em produção (status inicial/final, Location, saltos, canonical, robots, título, nº legado) | `npm run check:redirects:critical -- --enforce` | `reports/critical-redirects.md` |
| 5.5 | Auditoria das 10 URLs mantidas (nº legado em HTML/JSON-LD/wa.me/tel:/assets) | `npm run audit:kept-urls -- --confirm=5541997086380` | `reports/kept-urls-audit.md` |

## 5B. Exportação e publicação na camada de edge

A fonte de verdade continua sendo `redirects/tecnicocuritiba.map.json`; os
arquivos abaixo são **gerados**, nunca editados à mão.

| # | Passo | Comando | Artefato |
| --- | --- | --- | --- |
| 5B.1 | Exportar para todas as plataformas | `npm run migration:export` | `redirects/export/*` |
| 5B.2 | Simular publicação no Cloudflare | `npm run migration:cf:dry` | stdout |
| 5B.3 | Publicar ruleset no Cloudflare (com backup automático) | `npm run migration:cf:publish -- --approve="APROVO 612 REGRAS"` | `redirects/rollback/cloudflare/<stamp>.json` |
| 5B.4 | Rollback do Cloudflare | `node scripts/publish-cloudflare-redirects.mjs --rollback=redirects/rollback/cloudflare/<stamp>.json` | — |

Formatos gerados: `cloudflare-bulk-redirects.csv` (Bulk Redirects),
`cloudflare-ruleset.json` (Transform/Redirect Rules via API),
`nginx.conf` (`map` + `return 301`), `apache.htaccess` (RewriteRule por origem)
e `netlify-_redirects.txt`. Requisitos do publicador Cloudflare:
`CLOUDFLARE_API_TOKEN` (Zone → Config Rules → Edit) e `CLOUDFLARE_ZONE_ID`
da zona do domínio antigo.

## 5C. Search Console e monitoramento

| # | Passo | Comando | Artefato |
| --- | --- | --- | --- |
| 5C.1 | Relatório de propriedades, sitemaps e indexação | `npm run report:gsc` | `reports/gsc-migration.md` |
| 5C.2 | Enviar sitemap do domínio novo | `npm run report:gsc -- --submit-sitemap` | mesmo relatório |
| 5C.3 | Monitoramento diário de erros, loops e cadeias | `npm run monitor:redirects -- --strict` | `reports/daily/latest.md` |

A "Alteração de endereço" **não existe na API** do Search Console: continua
sendo passo manual e é registrada como pendência no relatório 5C.1.


## 6. Aprovação e publicação

| # | Passo | Comando |
| --- | --- | --- |
| 6.1 | Conferir a lista de 612 origens | `docs/migracao/aprovacao-urls.txt` |
| 6.2 | **Simular** a publicação (sem mutar arquivos) | `npm run migration:publish:dry -- --approval=docs/migracao/aprovacao-urls.txt --approve="APROVO 612 REGRAS"` |
| 6.3 | Publicar (grava `published: true` + pacote de rollback) | `npm run migration:publish -- --approval=docs/migracao/aprovacao-urls.txt --approve="APROVO 612 REGRAS"` |
| 6.4 | Rollback, se necessário | `node scripts/publish-redirects.mjs --rollback=redirects/rollback/<pasta>` |

Sem a frase exata **`APROVO 612 REGRAS`** e sem a lista completa de 612 origens,
o script bloqueia e nada é alterado.

## 7. Pós-publicação

- [ ] Aplicar as 612 regras 301 na edge do domínio antigo.
- [ ] Rodar `npm run check:redirects:all` em produção → coverage 100%, 0 pendências.
- [ ] Search Console: solicitar "Alteração de endereço" e reenviar sitemaps.
- [ ] `npm run indexnow:ping`.
- [ ] Manter o domínio antigo ativo por, no mínimo, 12 meses.

## Locais dos artefatos

```
reports/jsonld-coverage.md     relatório consolidado JSON-LD + social tags
reports/jsonld-coverage.json   mesmo relatório em JSON
reports/redirect-gate.md       gate de redirects (resumo)
reports/redirect-gate.json     gate de redirects (evidência por URL)
reports/nap-whatsapp.json      evidência NAP/WhatsApp por URL
redirects/tecnicocuritiba.map.json   matriz de 612 regras + 10 URLs mantidas
redirects/rollback/<stamp>/    pacote de rollback gerado na publicação
docs/migracao/aprovacao-urls.txt     lista das 612 origens para aprovação
```
