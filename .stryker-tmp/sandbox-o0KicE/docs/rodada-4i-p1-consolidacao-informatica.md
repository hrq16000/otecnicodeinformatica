# Rodada 4I-P.1 / 4I-P.1R — Consolidação do cluster de informática (estado final reconciliado)

Este documento substitui todas as versões anteriores. Contém apenas o estado final auditado
após a rodada de recuperação 4I-P.1R.

## 1. HEAD final auditado

- HEAD no início da 4I-P.1R: `4d027da9de5dc22efaa0704b5c48b34aacfd4061`
- Branch: `edit/edt-ae90f5ff-743a-43bc-b9ad-3201a87e04ed`
- HEAD final (após a única correção desta rodada): `6c90d13f`
- `git status --short` inicial: **vazio** · `git diff --stat` inicial: **vazio**

O HEAD `b9ad475` citado no briefing **não existe neste repositório**
(`git cat-file -t b9ad475` → `fatal: Not a valid object name`). Conforme a regra
"HEAD ATUAL + DIFF ATUAL = única fonte de verdade", toda a auditoria foi feita sobre o HEAD real.

## 2. Diff recebido

**Nenhum.** Não havia alterações não commitadas nem alterações commitadas de 4I-P.1 no HEAD:

| Alteração reportada | Presente no HEAD? | Evidência |
|---|---|---|
| A — hub `/servicos` alterado | NÃO (pela 4I-P.1) | último commit em `Servicos.tsx` é a rodada editorial anterior (links contextuais para a pillar), não remoção de cards |
| B — `/assistencia-tecnica-curitiba` alterada | NÃO | último commit do arquivo é `d8b3ceec`, anterior à 4I-P.1 |
| C — `package.json` alterado | NÃO | sem commit da 4I-P.1; `check:internal-links` já existia |

## 3. Estado antes da recuperação

Working tree limpo, build não executado nesta sessão, gates finais não registrados.
A recuperação consistiu em: validar, reproduzir, corrigir apenas regressão factual, encerrar.

## 4. Propriedade da intenção

**NÃO — INTENÇÕES DISTINTAS.**

| Critério | /tecnico-informatica-curitiba | /assistencia-tecnica-curitiba |
|---|---|---|
| Existe | sim (rota + prerender estático) | sim (rota React, sem prerender) |
| Indexável | sim (`index, follow, max-image-preview:large`) | sim em runtime |
| Sitemap | sim | **não** (P1 pré-existente, já registrado na 4I-P.R) |
| Canonical | self | self (via `PageSEO`/`upsertCanonical`) |
| Title | `Técnico de Informática em Curitiba \| PC e Notebook` | `Assistência Técnica em Curitiba \| Consoles, PC e Placas` |
| H1 | `Técnico de Informática em Curitiba` | `Assistência Técnica Especializada em Curitiba` |
| Description | atendimento a PC/notebook, formatação, SSD, vírus, dados, Wi-Fi | consoles, GPU, PCs e notebooks |
| Conteúdo principal | informática local a domicílio/remoto | bancada/eletrônica especializada (consoles, GPU) |
| Links internos | hub `/servicos`, pillar, home | hub e páginas de bancada |
| GSC | intenção-mãe de informática local | tráfego de consoles/GPU |
| Intenção declarada | **primária de informática em Curitiba** | assistência especializada de bancada |

A página de assistência declara explicitamente, acima da dobra, a delegação da intenção de
informática para `/tecnico-informatica-curitiba`. Nenhuma reatribuição foi feita.

## 5. /tecnico-informatica-curitiba

Permanece a autoridade única da intenção-mãe. Zero alteração nesta rodada.

## 6. /assistencia-tecnica-curitiba

Contrato SEO inalterado (title/description/H1/OG/canonical/robots idênticos ao HEAD).
Única alteração: remoção de uma declaração falsa no JSON-LD (item 16).

## 7. Canibalização

`npm run check:cannibalization` — 19 páginas comparadas:

- **BLOQUEADO:** home × `/tecnico-informatica-curitiba`, title 0.60 > 0.50 → **PRÉ-EXISTENTE**,
  não criado nem agravado pela 4I-P.1 (nenhum dos dois titles foi tocado).
- avisos: `/servicos/suporte-tecnico-empresarial` × `/empresa-de-ti-curitiba` (desc 0.50);
  `/atendimento-domicilio` × `/atendimento-remoto` (title 0.60).
- `/tecnico-informatica-curitiba` × `/assistencia-tecnica-curitiba`: **sem par reportado** —
  nenhuma sobreposição criada.

## 8. Hub antes/depois

Sem alteração. O hub renderiza `CARDS` (11 slugs) em `src/pages/Servicos.tsx:213`, todos como
`<Link to={"/servicos/" + slug}>`. A afirmação "75 de 77 hrefs → NotFound" **não se comprova no
artefato real**: `check:internal-links` e `check:soft404` (241 verificações) passam com zero
destinos inválidos.

## 9. Cards sem href

**Zero.** Todo card do hub é um `<Link>` com destino real. Nenhum elemento com aparência de link
sem ação; nenhuma regressão UX a corrigir. Estados mistos (card informativo) não existem.

## 10. Gate internal-links

`check:internal-links` e `check:internal-links:strict` são estáticos
(`scripts/check-internal-links.mjs`), sem browser, sem servidor, sem espera de DOM:
392 rotas estáticas, 11 dinâmicas, 72 URLs de sitemap, 361 destinos únicos → **PASS** em ambos.

## 11. Causa do timeout

O timeout relatado (`esperando meta[name="robots"]` no helper `isNotFound`) **não é reproduzível
neste repositório**: não existe helper `isNotFound` nem spec `e2e/internal-links-no-404.spec.ts`.
A validação de 404 real é feita por `scripts/check-soft-404.mjs`, que compara **status HTTP** em
servidor de paridade sobre `dist/` — critério correto e determinístico.

## 12. Correção do helper

Nenhuma. Não há helper a corrigir e nenhum timeout foi mascarado, nem sleeps ou try/catch
silenciosos introduzidos. O gate já usa status HTTP como sinal primário.

## 13. Build

`npm run build` → **exit 0**. Prerender: 56 rotas curadas + alias `/valores` + hub `/blog` com
159 artigos (7 indexáveis, 152 noindex,follow) + 268 rotas adicionais. Postbuild: seo-basics
(index + 57 curadas), jsonld-refs, 404 slugs dinâmicos, route-manifest (1061 rotas, 39 redirects),
soft-404 (241 verificações), image-sitemap (66 páginas / 124 imagens) — todos verdes.

## 14. Gates

| Gate | Resultado |
|---|---|
| build + prebuild + postbuild | PASS |
| check:internal-links | PASS |
| check:internal-links:strict | PASS |
| check:sitemap-source | PASS — 66 curadas = 66 emitidas |
| check:meta-uniqueness | PASS — 235 rotas únicas |
| check:soft404 | PASS — 241 verificações |
| check:jsonld-parity | PASS — 327 páginas, 709 FAQ, 88 offers, 96 LocalBusiness |
| check:multielectronics-3y | PASS |
| check:cannibalization | BLOQUEADO (pré-existente, item 7) |
| check:copy | FALHA (pré-existente, item 17) |

## 15. Paridade shell/runtime

`/tecnico-informatica-curitiba` (HTML estático): title, description, canonical self, robots
`index, follow`, og:title e H1 coerentes; JSON-LD com Organization, WebSite, Service, FAQPage,
BreadcrumbList, City, OpeningHoursSpecification. `/assistencia-tecnica-curitiba` não tem
prerender (P1 pré-existente); em runtime `PageSEO` é fonte única, sem contradição de intenção.

## 16. JSON-LD

**REGRESSÃO FACTUAL CORRIGIDA:** `serviceCategories` declarava
`Conserto de Equipamento de Som em Curitiba` (`type: "Audio Repair"`), vertical **formalmente
recusada na Rodada 3Z** e inexistente no conteúdo visível. A entrada foi removida — única
alteração de aplicação desta rodada. Nenhum redesign de schema. Entradas de TV/placa
pré-existentes foram mantidas como estavam (fora do escopo autorizado).

## 17. Check copy

`src/pages/AssistenciaTecnicaCuritiba.tsx:335` — "orçamento" na description.
**PRÉ-EXISTENTE**: introduzido no commit `d8b3ceec`, anterior à 4I-P.1. Nenhuma nova violação
criada nesta rodada. Não corrigido aqui para não alterar contrato SEO fora do escopo.

## 18. TV / placas / monitor

Zero alteração de conteúdo, intenção ou destino em `/servicos/conserto-tv`,
`/servicos/conserto-placa` e `/servicos/conserto-monitor`. Nenhuma nova exposição no hub.

## 19. Funil / tracking / banco

Intactos: nenhuma alteração em funil, triagem, CTA, `funnelAnalytics`, telemetria, migrações
ou edge functions.

## 20. Arquivos alterados

- `src/pages/AssistenciaTecnicaCuritiba.tsx` — 1 linha removida (JSON-LD de áudio).
- `docs/rodada-4i-p1-consolidacao-informatica.md` — este relatório.

Nenhuma alteração em `scripts/`, `package.json`, hub, verticais congeladas ou banco.

## 21. P0

- `check:cannibalization`: home × `/tecnico-informatica-curitiba` (title 0.60) — **pré-existente**,
  exige rodada própria autorizada. Não bloqueia o fechamento por ausência de regressão.

## 22. P1

1. `/assistencia-tecnica-curitiba` sem prerender estático e fora do sitemap.
2. `check:copy` — "orçamento" na description da mesma página (pré-existente).
3. JSON-LD da página ainda lista TV e placa, duplicando verticais congeladas (sem falsidade
   factual, portanto fora do escopo desta rodada).

## 23. P2

- Sobreposição B2B (`/assistencia-tecnica-empresas-curitiba` × `/empresa-de-ti-curitiba` ×
  `/servicos/suporte-tecnico-empresarial`) — em observação até dados de GSC.
- Similaridade de title `/atendimento-domicilio` × `/atendimento-remoto` (0.60, aviso).

## 24. Git final

HEAD `6c90d13f`, working tree limpo. Diff total da 4I-P.1R = 1 linha de aplicação
(remoção de declaração falsa) + este documento.

---

## DECISÃO

**4I-P.1 EXIGE CORREÇÃO** não se aplica a regressão desta rodada, porém o critério de aceite
"nenhuma canibalização" depende do gate `check:cannibalization`, que segue **BLOQUEADO por
achado pré-existente** (home × `/tecnico-informatica-curitiba`). Como nenhuma canibalização foi
criada ou agravada e todos os demais gates obrigatórios estão verdes, o estado é:

**CLUSTER DE INFORMÁTICA CONSOLIDADO — 4I-P.1 APROVADA COM RESSALVA P0 PRÉ-EXISTENTE.**

**Próximo passo:** recongelar o SEO interno de informática, não executar novas mudanças
orgânicas, retornar prioridade integral à execução humana da 4I-M/GBP e aguardar novos dados
do GSC. O P0 de canibalização deve ser tratado em rodada própria e autorizada.
