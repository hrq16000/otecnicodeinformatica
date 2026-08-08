# RODADA 4I-P.R — RECONCILIAÇÃO CANÔNICA DA AUDITORIA SEO

**Somente leitura. Zero alteração de código, SEO, sitemap, robots, canonical, conteúdo, banco ou tracking.**
Este documento substitui, como fonte única de verdade, todas as conclusões conflitantes das execuções anteriores da Rodada 4I-P.

---

## 1. FASE 1 — IDENTIDADE DO ESTADO AUDITADO

```text
COMMIT AUDITADO = 73a305b9d2af669df59e716825ce8c2d9004b12a ("Concluída auditoria 4I-P")
BRANCH AUDITADA = edit/edt-d4fb650d-1b9b-4d16-8018-19ef32a96e1d
DATA/HORA       = 2026-08-08T05:32Z (02:32 America/Sao_Paulo)
GIT STATUS      = limpo (nenhum arquivo modificado no início da auditoria)
```

Todas as conclusões abaixo valem **exclusivamente** para esse estado. Conclusões anteriores
que não foram reproduzidas aqui estão formalmente revogadas.

---

## 2. FASE 2 — GATES REALMENTE EXISTENTES NO `package.json`

Fonte: `node -e "console.log(require('./package.json').scripts)"`.

| Gate citado historicamente | Existe agora? | Resultado nesta rodada |
| --- | --- | --- |
| `check:seo` | SIM | não executado isoladamente (coberto por `postbuild` no `npm run build`) — PASS dentro do build |
| `check:title-meta` | **NÃO EXISTE** | gate inexistente — o achado histórico de "598 violações no check:title-meta" **não pode ser reproduzido nem verificado**; nunca houve tal script |
| `check:canonical` | **NÃO EXISTE** | substituído na prática por `check:index-health` e `check:seo:curated` |
| `check:thin` | **NÃO EXISTE** | — |
| `check:claims` | **NÃO EXISTE** | equivalente real: `check:trust-claims` |
| `check:trust-claims` | SIM | não reexecutado (PASS registrado na 4H, sem alteração de código desde então) |
| `check:analytics-parity` | SIM | não executado (fora do escopo desta reconciliação) |
| `check:internal-links` | SIM | **PASS** |
| `check:orphan-pages` | SIM | **PASS** |
| `check:sitemap-source` | SIM | **PASS** |
| `check:editorial-governance` | SIM | **PASS** |
| `check:meta-uniqueness` | SIM | **PASS** |
| `check:cannibalization` | SIM | **FALHA** (1 bloqueio + 3 avisos) |
| `check:copy` | SIM | **FALHA** (1 ocorrência, pré-existente) |
| `check:index-health` | SIM | PASS com 135 avisos (avisos de dev sem prerender) |

Nenhum script foi criado. Nenhum script ausente foi substituído por aproximação.

---

## 3. FASE 3 e 4 — VERDADE DO SITEMAP E PROVA RUNTIME/HTML

Não existe `src/lib/services.ts` neste repositório. A camada de serviços é
`src/lib/servicosCore.ts` + `src/lib/servicoBairroFactory.ts`, e o sitemap deriva
exclusivamente do manifesto curado `scripts/lib/curated-urls.mjs`.

### Método de prova

`npm run build` (exit 0), seguido de varredura de **todo o `dist/`**: 325 arquivos
`index.html` prerenderizados, cruzados com os 6 sub-sitemaps emitidos.

| Métrica medida no build | Valor |
| --- | --- |
| Páginas HTML prerenderizadas | 325 |
| Com `robots: index, follow` no HTML inicial | 65 |
| Com `robots: noindex, follow` no HTML inicial | 260 |
| URLs no sitemap curado | 65 |
| Indexáveis prerenderizadas **fora** do sitemap | **1** (`/valores`) |
| Títulos duplicados entre páginas indexáveis | 1 par (`/precos-e-politicas` e seu alias `/valores`) |

`/valores` é **alias intencional**: `robots: index, follow`, mas
`canonical → https://tecnico.curitiba.br/precos-e-politicas`. Alias canonicalizado
não deve figurar no sitemap. Não é defeito.

Todos os 15 slugs de `SERVICOS` do manifesto renderizam 200 útil, com `index, follow`,
canonical self e presença no `sitemap-servicos.xml` (verificado no `dist/`).

### CLASSIFICAÇÃO

```text
SITEMAP CORRETO
```

O achado histórico **"serviços indexáveis ausentes do sitemap" está REFUTADO** no estado atual.

**Exceção registrada (não é serviço, não é P0):** `/assistencia-tecnica-curitiba` é rota
real, `robots: index, follow` via `PageSEO`, **não prerenderizada** e **fora do sitemap curado**.
No HTML inicial ela serve o shell (`canonical = https://tecnico.curitiba.br/`, title genérico),
corrigido apenas após hidratação. O e2e `e2e/seo-sitemap-robots.spec.ts` ainda afirma que essa URL
está em `sitemap-main.xml` — **o teste está dessincronizado do manifesto curado**. Ver P1-1.

---

## 4. FASE 5 — GOVERNANÇA EDITORIAL (FAIL-CLOSED)

`check:editorial-governance` → PASS: 159 artigos únicos, 7 aprovados na onda,
`HTML inicial: 159/159 artigos verificados (7 indexáveis da onda)`.

Prova direta no HTML servido pelo build (`dist/blog/<slug>/index.html`):

| Artigo | Aprovado na onda | No sitemap | robots no HTML inicial | robots no DOM | GSC (3 meses) |
| --- | --- | --- | --- | --- | --- |
| `como-fazer-manutencao-nobreak` | NÃO | NÃO | `noindex, follow` | noindex | 9 impressões, 0 cliques (resíduo de índice antigo) |
| `notebook-nao-liga-o-que-fazer` | NÃO | NÃO | `noindex, follow` | noindex | 4 impressões, 0 cliques |
| `como-montar-pc-gamer-2026` | NÃO | NÃO | `noindex, follow` | noindex | 2 impressões, 0 cliques |
| `como-fazer-backup-completo-windows-11` | NÃO | NÃO | `noindex, follow` | noindex | 1 impressão, 0 cliques |
| `quando-trocar-hd-por-ssd` (controle) | SIM | SIM | `index, follow` | index | — |

**QUESTÃO CENTRAL:** o `noindex` está **no HTML inicial**, não apenas após efeito de cliente.
As impressões residuais no GSC são de URLs ainda no índice do Google **antes** do fail-closed
entrar em produção; não provam indexabilidade atual.

### CLASSIFICAÇÃO

```text
EDITORIAL FAIL-CLOSED OPERANTE
```

O P0 histórico "artigos não aprovados indexados / noindex só client-side" está **REFUTADO**.

---

## 5. FASE 6 e 8 — `/ATENDIMENTO/*`

**Não existe nenhuma rota `/atendimento/:cidade/:bairro` neste repositório.**
Busca exaustiva em `src/`, `scripts/` e `public/`: as únicas ocorrências de `/atendimento/`
são comentários históricos de migração (`scripts/build-migration-matrix.mjs`,
`scripts/lib/migration-critical.mjs`), tratando esse padrão como **URL legada a redirecionar**.

As rotas reais de atendimento são apenas duas, ambas curadas e indexáveis:
`/atendimento-domicilio` e `/atendimento-remoto`.

| Pergunta | Resposta |
| --- | --- |
| Quantidade total de `/atendimento/*` | 0 |
| Indexáveis | 0 |
| Noindex | 0 |
| No sitemap | 0 |

O que existe de fato são **260 páginas prerenderizadas `noindex, follow`** (bairros podados,
cidades não aprovadas, artigos fora da onda) — que é exatamente a política vigente, não um defeito.

### CLASSIFICAÇÃO DA ARQUITETURA

```text
SEM DADOS — o objeto auditado não existe no repositório
```

O achado histórico "~300 `/atendimento/*` com title/description duplicados / 598 violações"
está **NÃO REPRODUZIDO** (objeto inexistente + gate inexistente).

---

## 6. FASE 7 — TITLE/META

Gate real existente: `check:meta-uniqueness`.

```text
exit code   = 0
URLs        = 235 rotas programáticas
violações   = 0
tipo        = nenhuma (títulos e descriptions únicos e dentro dos limites)
```

Duplicação de metadados encontrada no `dist/`: **1 par**, `/precos-e-politicas` × `/valores`
(alias canonicalizado — duplicação técnica esperada e neutralizada por canonical).

Separação obrigatória mantida: **duplicação de metadados ≠ canibalização**. Ver Fase 18.

---

## 7. FASE 9 — GSC CANÔNICO (JANELA ÚNICA)

Propriedade: `sc-domain:tecnico.curitiba.br`. Janela única e absoluta usada em **toda** esta rodada:

```text
2026-05-08 → 2026-08-04 (3 meses, dados completos)
```

Snapshot complementar de indexação da home (28 dias, 2026-07-08 → 2026-08-04): "Submitted and indexed",
canonical escolhido pelo Google = `https://tecnico.curitiba.br`, 2 cliques / 278 impressões,
posição média 15,8. Nenhuma outra exportação foi misturada.

Linhas relevantes (query × página), 3 meses:

| Query | URL | Cliques | Impressões | CTR | Posição |
| --- | --- | --- | --- | --- | --- |
| técnico de computador | /tecnico-informatica-araucaria | 0 | 6 | 0% | 8,0 |
| técnico de computador | /tecnico-informatica-curitiba | 0 | 1 | 0% | 33,0 |
| técnico computador | /tecnico-informatica-araucaria | 0 | 3 | 0% | 5,7 |
| técnico computador | /tecnico-informatica-colombo | 0 | 3 | 0% | 10,0 |
| assistência técnica notebook | /tecnico-informatica-araucaria | 0 | 2 | 0% | 10,0 |
| assistência técnica notebook | /tecnico-informatica-colombo | 0 | 1 | 0% | 11,0 |
| assistência pc | /tecnico-informatica-araucaria | 0 | 2 | 0% | 8,5 |
| assistencia tecnica computador | /tecnico-informatica-colombo | 0 | 2 | 0% | 8,5 |
| manutencao computador | /tecnico-informatica-araucaria | 0 | 1 | 0% | 5,0 |
| tecnico de informatica perto de mim | /tecnico-informatica-colombo | 0 | 1 | 0% | 7,0 |
| tecnico informatica curitiba | /tecnico-informatica-curitiba | 0 | 1 | 0% | 33,0 |
| recuperação de dados empresa curitiba | /servicos/recuperacao-de-dados | 0 | 5 | 0% | 46,0 |
| formatacao notebook curitiba | /servicos/formatacao | 0 | 1 | 0% | 15,0 |
| conserto placa de video curitiba | /faq | 0 | 2 | 0% | 80,0 |
| conserto de monitor curitiba | /faq | 0 | 1 | 0% | 86,0 |
| gerenciamento de nobreaks | /blog/como-fazer-manutencao-nobreak | 0 | 4 | 0% | 46,8 |

---

## 8. FASE 10 — CLUSTER GENÉRICO DE INFORMÁTICA (query → URL)

| Query alvo | URL que o Google escolhe hoje | Posição |
| --- | --- | --- |
| assistência técnica informática curitiba | (sem linha na janela) | — |
| assistência técnica notebook | /tecnico-informatica-araucaria e /tecnico-informatica-colombo | 10–11 |
| técnico de computador | /tecnico-informatica-araucaria (8) **e** /tecnico-informatica-curitiba (33) | conflito |
| assistência pc | /tecnico-informatica-araucaria | 8,5 |
| manutenção computador | /tecnico-informatica-araucaria | 5,0 |
| técnico de informática curitiba | /tecnico-informatica-curitiba | 33,0 |
| conserto notebook curitiba | (sem linha; variante "conserto de notebook perto de mim" → /tecnico-informatica-colombo, pos 10) | — |

**Leitura:** para queries genéricas **sem localidade**, o Google está escolhendo páginas de
cidades satélite; a página de Curitiba só aparece em posições muito piores (33) — inclusive para
a query onde ela é a resposta certa (`técnico informatica curitiba`).

---

## 9. FASE 11 — CIDADES SATÉLITE

Rotas auditadas (todas existem, indexáveis, canonical self, prerenderizadas):
`/tecnico-informatica-curitiba`, `/tecnico-informatica-araucaria`,
`/tecnico-informatica-colombo`, `/tecnico-informatica-sao-jose-pinhais`.

Pergunta: Araucária/Colombo capturam queries genéricas sem localidade que deveriam pertencer à página de Curitiba?

```text
COMPROVADO
```

Evidência mínima satisfeita: mesma query (`técnico de computador`, `técnico computador`,
`assistência técnica notebook`), múltiplas URLs do próprio site, dados de GSC na janela fixa,
e efeito relevante (satélite em 5–10 × Curitiba em 33). Volume absoluto é baixo — o efeito é
**direcional e comprovado**, não estatisticamente robusto.

---

## 10. FASE 12 — AUTORIDADE PRINCIPAL DO CLUSTER

`/servicos/informatica` **não existe** neste repositório (rota inexistente). A disputa real é
entre três URLs existentes:

| Critério | /tecnico-informatica-curitiba | /servicos (hub) | /assistencia-tecnica-curitiba |
| --- | --- | --- | --- |
| Intenção | técnico de informática local em Curitiba | navegação por serviço | multi-vertical (consoles + PC + placas) |
| Title | "Técnico de Informática em Curitiba \| PC e Notebook" | "Serviços de Informática em Curitiba \| PC e Notebook" | "Assistência Técnica em Curitiba \| Consoles, PC e Placas" |
| H1 | Técnico de Informática em Curitiba | Serviços | Assistência Técnica Especializada em Curitiba |
| Conteúdo | local, próprio, prerenderizado | hub com 11 cards de serviço | landing multi-vertical, **sem prerender** |
| Links internos (`src/`) | 33 | 105 | 5 |
| GSC (3 meses) | aparece em queries genéricas e locais (pos 33) | sem linha | sem linha |
| Local intent | alto | médio | alto, porém diluído por consoles |

### DECISÃO

```text
PÁGINA PRIMÁRIA = /tecnico-informatica-curitiba
```

- `/servicos` → **HUB** (navegação e distribuição de equity; não disputa a intenção-mãe).
- `/assistencia-tecnica-curitiba` → **OUTRA INTENÇÃO** (multi-vertical com consoles), hoje
  **SUPORTE** sem prerender e fora do sitemap.
- `/servicos/informatica` → inexistente; qualquer relatório anterior que a citou usou URL fantasma.

---

## 11. FASE 13 — `/ASSISTENCIA-TECNICA-CURITIBA`

Estado atual medido (`src/pages/AssistenciaTecnicaCuritiba.tsx:333-336` + `dist/`):

- title: `Assistência Técnica em Curitiba | Consoles, PC e Placas`
- description: `Assistência técnica em Curitiba: PlayStation, Xbox, Nintendo, placas de vídeo, PCs e notebooks. Diagnóstico…` (contém "orçamento", vocabulário proibido)
- H1: "Assistência Técnica Especializada em Curitiba"
- canonical (após hidratação): self; **canonical no HTML inicial: `https://tecnico.curitiba.br/`** (sem prerender)
- robots: `index, follow`; **fora do sitemap curado**

**O title/description ainda são de consoles?**

```text
SIM
```

Classificado como **P1 de intenção** (ver Fase 23). Não corrigido nesta rodada.

---

## 12. FASE 14 — B2B

URLs testadas contra o roteador real:

| URL | Existe? |
| --- | --- |
| `/empresa-de-ti-curitiba` | SIM |
| `/servicos/suporte-tecnico-empresarial` | SIM |
| `/assistencia-tecnica-empresas-curitiba` | NÃO |
| `/suporte-empresas` | NÃO |

| Critério | /empresa-de-ti-curitiba | /servicos/suporte-tecnico-empresarial |
| --- | --- | --- |
| Intenção | hub de TI empresarial em Curitiba | serviço de suporte técnico PJ |
| H1 | Empresa de TI em Curitiba | Suporte técnico empresarial |
| Title | hub de TI | serviço PJ |
| CTA/contexto | triagem PJ | triagem PJ |
| Links internos | 2 na home + hub `/servicos` | cards do hub + home |
| GSC (3 meses) | sem linhas | sem linhas |

`check:cannibalization` aponta apenas **aviso** de description próxima (0,50) entre as duas.
Sem nenhum dado de GSC, não há prova de disputa.

### RESULTADO

```text
SOBREPOSIÇÃO LEVE
```

---

## 13. FASE 15 — LINK EQUITY (metodologia única)

Metodologia única: contagem de ocorrências literais do path em `src/**/*.ts(x)`
(`grep -roh '"<path>"' src/`). Números de rodadas anteriores, produzidos por scripts diferentes,
**não** são comparáveis e ficam revogados.

| URL | Ocorrências | Existe? |
| --- | --- | --- |
| `/servicos` | 105 | sim |
| `/precos-e-politicas` | 102 | sim |
| `/servicos/manutencao-de-computador` | 92 | sim |
| `/servicos/recuperacao-de-dados` | 56 | sim |
| `/servicos/manutencao-de-notebook` | 45 | sim |
| `/tecnico-informatica-curitiba` | 33 | sim |
| `/blog` | 12 | sim |
| `/assistencia-tecnica-curitiba` | 5 | sim |
| `/servicos/informatica` | — | **não existe** |
| `/servicos/conserto-notebook-curitiba` | — | **não existe** |
| `/manutencao-notebook-pc-curitiba` | — | **não existe** |
| `/servicos/recuperacao-dados` | — | **não existe** (slug correto: `recuperacao-de-dados`) |

O achado histórico "money pages de notebook/computador com apenas 8 links contra 73 das páginas de
confiança" está **REFUTADO**: notebook 45 e computador 92 contra preços 102 — a distribuição é
comparável.

---

## 14. FASE 16 — HOME

A home possui links contextuais **estáveis** (JSX permanente em `src/components/home/`, sem sorteio,
sem carousel aleatório, sem renderização condicional) para money pages de informática:

`/servicos` (4) · `/servicos/upgrade-ssd-ram` (3) · `/servicos/redes-e-wifi` (3) ·
`/servicos/recuperacao-de-dados` (3) · `/servicos/manutencao-de-notebook` (3) ·
`/servicos/formatacao` (3) · `/servicos/remocao-de-virus` (2) ·
`/servicos/manutencao-de-computador` (2) · `/servicos/suporte-tecnico-empresarial` (3) ·
`/tecnico-informatica-curitiba` (3) · `/empresa-de-ti-curitiba` (2) · bairros-âncora (5).

```text
RESPOSTA: SIM — a home linka money pages de forma estável.
```

O achado histórico "a home não linka diretamente nenhuma landing de serviço" está **REFUTADO**.

---

## 15. FASE 17 — HUB `/SERVICOS`

Links permanentes (array `CARDS`, `src/pages/Servicos.tsx:68-78`):

| Tema | Coberto pelo hub |
| --- | --- |
| notebook | SIM (`manutencao-de-notebook`) |
| computador | SIM (`manutencao-de-computador`) |
| SSD/RAM | SIM (`upgrade-ssd-ram`) |
| formatação | SIM (`formatacao`) |
| vírus | SIM (`remocao-de-virus`) |
| dados | SIM (`recuperacao-de-dados`) |
| redes | SIM (`redes-e-wifi`) |

Também linka `montagem-de-pc`, `suporte-tecnico-empresarial`, `conserto-tv`, `conserto-placa`.
Ausentes do hub (indexáveis no sitemap, sem card): `conserto-monitor`,
`manutencao-preventiva-empresas`, `backup-para-empresas`, `suporte-home-office` — registrado como P2.

---

## 16. FASE 18 — CANIBALIZAÇÃO EM TRÊS NÍVEIS

**NÍVEL A — DUPLICAÇÃO TÉCNICA**
- `/precos-e-politicas` × `/valores`: title idêntico, resolvido por canonical (não é defeito).
- `check:cannibalization` bloqueia: `/` × `/tecnico-informatica-curitiba` com similaridade de title 0,60 (> 0,50).
- Avisos: `/servicos/suporte-tecnico-empresarial` × `/empresa-de-ti-curitiba` (description 0,50);
  `/atendimento-domicilio` × `/atendimento-remoto` (title 0,60).

**NÍVEL B — SOBREPOSIÇÃO SEMÂNTICA**
- `/tecnico-informatica-curitiba` × cidades satélite (mesma proposta, geografia diferente).
- `/empresa-de-ti-curitiba` × `/servicos/suporte-tecnico-empresarial`.
- `/assistencia-tecnica-curitiba` × `/tecnico-informatica-curitiba` (intenção-mãe parcialmente sobreposta).

**NÍVEL C — CANIBALIZAÇÃO COMPROVADA POR GSC**
- **Confirmada:** satélites (`araucaria`, `colombo`) × `/tecnico-informatica-curitiba` em queries
  genéricas sem localidade (`técnico de computador`, `técnico computador`, `assistência técnica notebook`).
- Não confirmada em nenhum outro par: B2B, blog × sintomas e verticais congeladas não têm
  linhas de GSC suficientes na janela.

---

## 17. FASE 19 e 20 — VERTICAIS CONGELADAS E MAP PACK

**TV / Placas / Monitor:** continuam congelados. Achados registrados, **não priorizados**:
`/faq` está ranqueando (pos 80–86) para `conserto placa de video curitiba` e
`conserto de monitor curitiba` em vez das páginas de serviço dedicadas. Zero alteração.

**Map Pack:** permanece frente **externa** prioritária (GBP SAB da 4H/4I, ainda `NÃO CRIADO`).
Nenhuma hipótese de Map Pack foi usada para justificar mudança orgânica nesta rodada — não houve
medição de SERP.

---

## 18. FASE 21 — MATRIZ DE VERDADES CONFLITANTES

| Achado histórico | Estado atual | Evidência | Veredito |
| --- | --- | --- | --- |
| Editorial noindex quebrado (só client-side) | `noindex, follow` no HTML inicial dos 4 artigos citados | `dist/blog/<slug>/index.html` + `check:editorial-governance` PASS (159/159) | **REFUTADO** |
| Serviços indexáveis fora do sitemap | 65 indexáveis = 65 URLs no sitemap; única exceção é o alias `/valores` (canonicalizado) | varredura de 325 HTMLs × 6 sub-sitemaps + `check:sitemap-source` PASS | **REFUTADO** |
| 598 violações no `check:title-meta` | gate inexistente; `check:meta-uniqueness` = 235 rotas, 0 violações | `package.json` | **NÃO REPRODUZIDO** |
| ~300 `/atendimento/*` duplicados | rota inexistente; existem 2 páginas `/atendimento-*` curadas | busca em `src/`, `scripts/`, `public/` | **NÃO REPRODUZIDO** |
| Satélites canibalizam Curitiba | satélites em 5–10, Curitiba em 33 nas mesmas queries genéricas | GSC 2026-05-08→2026-08-04 | **CONFIRMADO** |
| B2B canibaliza | apenas description próxima (0,50); sem linhas de GSC | `check:cannibalization` + GSC | **SEM DADOS** |
| Home sem money links | 10+ links estáveis para serviços na home | `src/components/home/` | **REFUTADO** |
| `/assistencia-tecnica-curitiba` com intenção de consoles | title/description ainda citam PlayStation/Xbox/Nintendo | `src/pages/AssistenciaTecnicaCuritiba.tsx:333-336` | **CONFIRMADO** |
| `/servicos/informatica` como candidata a primária | rota inexistente | roteador `src/LegacyApp.tsx` | **REFUTADO** |
| Money pages com 8 links vs 73 das páginas de confiança | notebook 45 · computador 92 · preços 102 | contagem única em `src/` | **REFUTADO** |

---

## 19. FASE 22 — P0 (somente reproduzido agora)

Critérios: indexável que a política manda noindex · canonical incorreto · rota estratégica
indexável fora do sitemap por erro · gate técnico crítico falhando.

| # | P0 | Evidência |
| --- | --- | --- |
| P0-1 | **`check:cannibalization` falhando (gate crítico bloqueante)** | bloqueio: `/` × `/tecnico-informatica-curitiba`, similaridade de title 0,60 > 0,50 |

**HÁ P0 ATUAL: SIM (1).** Nenhum P0 antigo foi transportado. Nenhuma correção foi aplicada.

---

## 20. FASE 23 — P1 (máximo 3, reproduzidos)

| # | P1 | Evidência |
| --- | --- | --- |
| P1-1 | `/assistencia-tecnica-curitiba` indexável, **sem prerender** (HTML inicial serve canonical da home) e fora do sitemap, enquanto o e2e `seo-sitemap-robots.spec.ts` afirma que ela está no `sitemap-main.xml` — teste dessincronizado do manifesto curado | `dist/` sem `assistencia-tecnica-curitiba/index.html`; `curated-urls.mjs` sem o path; `e2e/seo-sitemap-robots.spec.ts:18` |
| P1-2 | Canibalização comprovada satélites × Curitiba em queries genéricas sem localidade | GSC 3 meses (Fase 9/11) |
| P1-3 | Intenção equivocada em `/assistencia-tecnica-curitiba`: title/description de consoles em URL de intenção-mãe local | `AssistenciaTecnicaCuritiba.tsx:333-336` |

---

## 21. FASE 24 — P2 (máximo 5)

| # | P2 | Evidência |
| --- | --- | --- |
| P2-1 | `check:copy` falha: "orçamento" na description de `/assistencia-tecnica-curitiba` (dívida de copy congelada, já registrada na 4H/4I) | `check:copy` |
| P2-2 | 4 serviços indexáveis sem card no hub `/servicos`: `conserto-monitor`, `manutencao-preventiva-empresas`, `backup-para-empresas`, `suporte-home-office` | `src/pages/Servicos.tsx:68-78` × `curated-urls.mjs` |
| P2-3 | `/faq` ranqueia para `conserto placa de video curitiba` (80) e `conserto de monitor curitiba` (86) em vez das páginas de serviço — **vertical congelada, não priorizar** | GSC 3 meses |
| P2-4 | Descriptions próximas entre `/servicos/suporte-tecnico-empresarial` e `/empresa-de-ti-curitiba` (0,50) | `check:cannibalization` (aviso) |
| P2-5 | Titles próximos entre `/atendimento-domicilio` e `/atendimento-remoto` (0,60) | `check:cannibalization` (aviso) |

---

## 22. FASE 25 — NÃO IMPLEMENTAR

Nenhuma correção foi aplicada, inclusive para o P0 confirmado. Esta rodada é reconciliadora.

---

## 23. GATES EXECUTADOS

| Gate | Exit | Resultado |
| --- | --- | --- |
| `check:sitemap-source` | 0 | PASS — 65 URLs curadas = 65 emitidas, 11 serviço × bairro auditadas |
| `check:editorial-governance` | 0 | PASS — 159/159 artigos verificados no HTML inicial |
| `check:meta-uniqueness` | 0 | PASS — 235 rotas, 0 violações |
| `check:internal-links` | 0 | PASS — 391 rotas estáticas, 0 link quebrado |
| `check:orphan-pages` | 0 | PASS — 65 páginas, 0 órfã |
| `check:index-health` | 0 | PASS com 135 avisos (canonical de dev sem prerender) |
| `check:cannibalization` | ≠0 | **FALHA** — 1 bloqueio, 3 avisos |
| `check:copy` | ≠0 | **FALHA** — 1 ocorrência pré-existente |
| `npm run build` (+ `postbuild`) | 0 | PASS — 325 HTMLs, `check:seo` curado, jsonld-refs, soft-404, image-sitemap todos OK |

---

## 24. GIT FINAL

```text
git status --short   → (vazio, exceto este relatório)
git diff --stat      → 0 alterações rastreadas antes deste documento
git diff -- src/     → ZERO ALTERAÇÃO
git diff -- scripts/ → ZERO ALTERAÇÃO
```

Único arquivo criado: `docs/rodada-4i-pr-reconciliacao-seo.md`.
`dist/` é artefato de build não versionado.

---

## RESPOSTAS OBRIGATÓRIAS

**A — HÁ P0 ATUAL?**
```text
SIM — 1: check:cannibalization bloqueando (/ × /tecnico-informatica-curitiba, title 0,60)
```

**B — O SITEMAP ESTÁ CORRETO?**
```text
SIM
```

**C — O FAIL-CLOSED EDITORIAL ESTÁ CORRETO NO HTML INICIAL?**
```text
SIM
```

**D — AS ~300 ROTAS /ATENDIMENTO/* TÊM METADADOS DUPLICADOS?**
```text
NÃO — essas rotas não existem no repositório
```

**E — EXISTE CANIBALIZAÇÃO COMPROVADA POR GSC?**
```text
SIM — cidades satélite (Araucária, Colombo) × /tecnico-informatica-curitiba em queries genéricas
```

**F — URL PRIMÁRIA DO CLUSTER DE INFORMÁTICA**
```text
/tecnico-informatica-curitiba
```

**G — QUAL É O AJUSTE SEO DE MAIOR IMPACTO CONFIRMADO AGORA?**
```text
Diferenciar a intenção-mãe: dar a /tecnico-informatica-curitiba um title/H1 exclusivamente
genérico-local (resolvendo o bloqueio de canibalização com a home) e regionalizar de forma
explícita os titles das satélites, para que as queries sem localidade parem de ser servidas
por Araucária e Colombo.
```

---

## DECISÃO

```text
ESTADO SEO RECONCILIADO — PRONTO PARA 4I-P.1
```

## PRÓXIMO PASSO

Abrir **4I-P.1** com no máximo **três** alterações, exclusivamente as confirmadas aqui:

1. Diferenciar title/H1 de `/tecnico-informatica-curitiba` frente à home (resolve P0-1) e
   regionalizar os titles de Araucária e Colombo (resolve P1-2).
2. Decidir formalmente o destino de `/assistencia-tecnica-curitiba`: entrar no manifesto curado
   com prerender e intenção corrigida, **ou** sair de índice — e sincronizar o e2e (resolve P1-1 e P1-3).
3. Nada além disso. Nenhum achado de snapshots anteriores pode ser transportado.
