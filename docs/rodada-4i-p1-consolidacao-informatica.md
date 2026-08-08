# Rodada 4I-P.1 — Consolidação cirúrgica do cluster de informática

Escopo: reproduzir no HEAD atual os três achados da reconciliação 4I-P.R e corrigir
**somente** o que for reproduzido. Regra Zero aplicada integralmente.

## 1. HEAD inicial

- Commit: `7f59e56492ffd5e7c5e254b6e14fb59cd36a926d`
- Branch: `edit/edt-62dc9ed9-e89e-4a59-80c5-6d7ac6967f0f`

> Divergência com o baseline `docs/rodada-4i-pr-reconciliacao-seo.md` (commit `73a305b9`).
> Conforme a regra **HEAD ATUAL VENCE**, toda a reprodução foi feita sobre `7f59e564`.

## 2. Git inicial

`git status --short` e `git diff --stat`: **vazios** — working tree limpo, sem alterações
prévias a misturar.

## 3. P1-1 — reprodução (hub /servicos)

Fonte única dos cards: array `CARDS` em `src/pages/Servicos.tsx` (11 slugs), renderizado como
`<Link to={"/servicos/" + slug}>`. Enumeração completa dos destinos internos do hub:

| href renderizado | rota declarada | status | indexável |
|---|---|---|---|
| /servicos/formatacao | LegacyApp | 200 | sim |
| /servicos/manutencao-de-notebook | LegacyApp | 200 | sim |
| /servicos/manutencao-de-computador | LegacyApp | 200 | sim |
| /servicos/montagem-de-pc | App + LegacyApp | 200 | sim |
| /servicos/upgrade-ssd-ram | LegacyApp | 200 | sim |
| /servicos/remocao-de-virus | LegacyApp | 200 | sim |
| /servicos/recuperacao-de-dados | LegacyApp | 200 | sim |
| /servicos/redes-e-wifi | LegacyApp | 200 | sim |
| /servicos/suporte-tecnico-empresarial | App + LegacyApp | 200 | sim |
| /servicos/conserto-tv (congelada) | LegacyApp | 200 | sim |
| /servicos/conserto-placa (congelada) | LegacyApp | 200 | sim |
| /problemas/notebook-nao-liga | LegacyApp | 200 | sim |
| /problemas/computador-lento | LegacyApp | 200 | sim |
| /como-funciona · /diagnostico-tecnico · /precos-e-politicas · /faq | LegacyApp | 200 | sim |
| /empresa-de-ti-curitiba · /atendimento-remoto | LegacyApp | 200 | sim |

Destinos citados historicamente como quebrados — `/servicos/informatica`,
`/servicos/notebooks`, `/servicos/recuperacao-dados` — **não existem em lugar nenhum de `src/`**
(`rg` retornou zero ocorrências). Não são renderizados pelo hub.

Gate automatizado confirmando (`npm run check:internal-links`):

```
Rotas estáticas declaradas: 391 · dinâmicas: 11
URLs no sitemap: 71 · destinos internos únicos: 360
✔ Nenhum link quebrado nem URL de sitemap inválida.
```

**P1-1 NÃO REPRODUZIDO — HUB NÃO ALTERADO.**

## 4. Quantidade real de links quebrados

**0** (zero) links internos renderizados pelo hub apontando para rota inexistente.

## 5. Mapa antigo → novo

Não aplicável: nenhum remapeamento executado, nenhum card removido, nenhuma rota criada.

## 6. Hub após correção

Sem correção. Estado final = estado inicial: 11 cards de serviço, todos com destino real,
nenhum card de informática apontando para TV/placas/monitor (os cards de TV e placa são cards
próprios das verticais congeladas, preservados como estavam).

## 7. P1-2 — reprodução (/assistencia-tecnica-curitiba)

Contrato SEO observado no HEAD (`src/pages/AssistenciaTecnicaCuritiba.tsx`):

- title: `Assistência Técnica em Curitiba | Consoles, PC e Placas`
- description: `Assistência técnica em Curitiba: PlayStation, Xbox, Nintendo, placas de vídeo, PCs e notebooks...`
- H1: `Assistência Técnica Especializada em Curitiba`
- canonical: self (`/assistencia-tecnica-curitiba`, via `PageSEO` → `upsertCanonical`)
- robots: `index, follow` · OG/Twitter derivados do mesmo title/description
- JSON-LD: LocalBusiness + FAQPage + BreadcrumbList + `Service[]`
- conteúdo: consoles, GPU, computadores, notebooks, smartphones, manutenção preventiva

A mistura de consoles **existe**, porém não configura o defeito descrito ("URL genérica com
metadados desalinhados"). No HEAD atual a página já declara explicitamente, acima da dobra:

> "Para formatação, remoção de vírus, upgrade SSD e suporte de informática a domicílio, acesse
> a página canônica de **técnico de informática em Curitiba** … Esta página fica focada em
> assistência técnica especializada e reparos de bancada."

Ou seja: a intenção-mãe de informática local **já está delegada** à rota existente
`/tecnico-informatica-curitiba` (`src/LegacyApp.tsx:521`), e title/H1/description/schema desta
página concordam entre si com a intenção declarada (bancada/eletrônica especializada).

Reescrever o contrato SEO para "assistência técnica em informática em Curitiba" faria esta URL
**passar a competir** com a página-mãe existente — exatamente o que a rodada proíbe — e criaria
divergência metadata × conteúdo, hoje inexistente.

**P1-2 NÃO REPRODUZIDO — PÁGINA NÃO ALTERADA.**

## 8. Contrato SEO anterior · 9. Contrato SEO final

Idênticos (ver item 7). Nenhum campo tocado.

## 10. Shell × runtime

`PageSEO` é a fonte única de title/description/canonical/robots/OG e o prerender parte da mesma
árvore React, portanto shell e DOM hidratado servem a mesma intenção. Nenhuma divergência
intencional foi introduzida nesta rodada (zero diff).

## 11. JSON-LD

Válido e coerente com a página; `check:meta-uniqueness` e `check:sitemap-source` passam.
Observação registrada como P1 remanescente (não corrigida aqui, fora dos três achados):
`serviceCategories` inclui `Conserto de Equipamento de Som` (áudio foi formalmente **recusado**
na Rodada 3Z) e entradas de TV/placa que pertencem às verticais congeladas.

## 12. P1-3 — reprodução (gate de links internos)

O arquivo `e2e/internal-links-no-404.spec.ts` **não existe** no HEAD. Em contrapartida, o gate
já existe e está mais forte do que o proposto:

- `scripts/check-internal-links.mjs`
- `package.json`: `check:internal-links` e `check:internal-links:strict` (órfãs bloqueiam)
- CI: `.github/workflows/ci.yml:27` (`check:internal-links`) e
  `.github/workflows/weekly-gates.yml:31` (`:strict`)
- Complemento sobre artefato de produção: `check:soft404` roda no `postbuild` sobre `dist/`
  e nos workflows `seo-daily-health.yml` e `cloudflare-edge.yml`.

**P1-3 NÃO REPRODUZIDO — nenhum script novo criado (evitada segunda fonte de verdade).**

## 13. Gate internal-links

`npm run check:internal-links` → **PASS** (0 links quebrados, 0 URLs de sitemap inválidas).

## 14. Build

Não foi necessário novo build: zero alteração de código. Os artefatos `dist/` do HEAD foram
usados pelos gates que exigem build (`check:meta-uniqueness`).

## 15. Gates executados

| Gate | Resultado |
|---|---|
| check:internal-links | PASS |
| check:meta-uniqueness | PASS — 235 rotas, títulos/descriptions únicos e dentro do limite |
| check:sitemap-source | PASS — 65 URLs curadas = 65 emitidas |
| check:cannibalization | **BLOQUEADO (P0 pré-existente)** — home × /tecnico-informatica-curitiba, title 0.60 > 0.50 |

Scripts inexistentes citados no briefing (`check:canonical`, `check:thin`, `check:claims`,
`check:meta`) não foram inventados; os equivalentes reais estão acima.

## 16. E2E

`e2e/internal-links-no-404.spec.ts` não existe; nenhum teste paralelo foi criado. A cobertura
equivalente está nos gates estáticos + `e2e/soft-404.spec.ts`, `e2e/areas-atendidas-links.spec.ts`
e `e2e/monitor-placa-links.spec.ts`, todos preservados.

## 17. TV / placas / monitor

`git diff -- src` → vazio. Zero alteração em `/servicos/conserto-tv`,
`/servicos/conserto-placa`, `/servicos/conserto-monitor` ou qualquer arquivo relacionado.

## 18. Funil / tracking / banco

Intactos. Nenhuma alteração em `src/lib/funnelAnalytics.ts`, triagem, CTAs, telemetria,
migrações ou edge functions.

## 19. Arquivos alterados

**QUANTOS ARQUIVOS DE APLICAÇÃO FORAM ALTERADOS? → 0 (zero).**

Único arquivo criado: `docs/rodada-4i-p1-consolidacao-informatica.md` (documentação).
`git diff -- src/`, `git diff -- scripts/`, `git diff -- package.json`: todos vazios.

## 20. Git final

Working tree com um único arquivo novo, em `docs/`. Nenhum diff em código de aplicação.

## 21. P0 encontrados

- `check:cannibalization`: title da home ≈ title de `/tecnico-informatica-curitiba` (0.60).
  **Não corrigido nesta rodada** — a rodada proíbe explicitamente alterar a home e as páginas
  de cidade/intenção-mãe, e o achado não está entre os três itens autorizados.

## 22. P1 remanescentes

1. JSON-LD de `/assistencia-tecnica-curitiba` declara serviço de áudio (vertical recusada na 3Z)
   e serviços de TV/placa duplicando as verticais congeladas.
2. `check:copy` — ocorrência pré-existente de "orçamento" em
   `src/pages/AssistenciaTecnicaCuritiba.tsx`.

## 23. P2

- Sobreposição B2B (`/assistencia-tecnica-empresas-curitiba` × `/empresa-de-ti-curitiba` ×
  `/servicos/suporte-tecnico-empresarial`): mantida em observação até dados reais de GSC.
- Similaridade de description entre suporte empresarial e empresa de TI (0.50, aviso).
- Similaridade de title entre `/atendimento-domicilio` e `/atendimento-remoto` (0.60, aviso).

---

## DECISÃO

**CLUSTER DE INFORMÁTICA CONSOLIDADO — 4I-P.1 APROVADA**

Os três achados não se reproduziram no HEAD: o hub não tem links quebrados, a página-mãe já
possui intenção única com delegação explícita da intenção de informática, e o gate de links
internos já existe e roda em CI. Conforme a regra "não implementar correção para defeito não
reproduzido", nenhuma alteração de aplicação foi feita.

**Próximo passo:** congelar novamente a arquitetura interna de informática e retornar prioridade
à 4I-M/GBP. Observar GSC antes de qualquer nova expansão SEO. O P0 de canibalização
home × `/tecnico-informatica-curitiba` deve ser tratado em rodada própria e autorizada.
