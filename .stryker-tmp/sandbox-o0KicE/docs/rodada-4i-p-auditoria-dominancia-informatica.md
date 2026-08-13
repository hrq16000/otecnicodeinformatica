# RODADA 4I-P — AUDITORIA DE DOMINÂNCIA SEO EM INFORMÁTICA

**Modo:** somente leitura. Zero alteração de código, copy, rota, canonical, sitemap, schema, funil, tracking ou banco.
**Data:** 2026-08-08 · **Propriedade GSC:** `sc-domain:tecnico.curitiba.br`
**Git inicial:** `git status --short` vazio · `git diff --stat` vazio.

---

## 1. Resumo executivo

A arquitetura de informática **não está concentrando autoridade na página certa**. O conteúdo e o SEO técnico continuam fortes (gates verdes, 0 links quebrados, 0 órfãs comerciais), mas o Google escolheu como porta de entrada para as consultas genéricas de informática **as páginas de cidades satélite** (`/tecnico-informatica-araucaria` e `/tecnico-informatica-colombo`), e não `/tecnico-informatica-curitiba`, que é a página declarada como dominante na matriz de intenção.

Isso é **canibalização comprovada por dados**: nos últimos 3 meses o mesmo cluster (“assistência técnica notebook”, “técnico de computador”, “assistência pc”) recebeu impressões em 2+ URLs simultaneamente, nenhuma delas a página-alvo.

Segundo achado material: artigos editoriais **não aprovados** (`/blog/como-fazer-manutencao-nobreak`, `/blog/notebook-nao-liga-o-que-fazer`, `/blog/como-montar-pc-gamer-2026`, `/blog/como-fazer-backup-completo-windows-11`) estão fora do sitemap e deveriam ser `noindex`, mas **estão recebendo impressões reais no Google** — a política fail-closed é aplicada só por efeito de cliente.

**Decisão:** `ARQUITETURA SEO DE INFORMÁTICA TEM OPORTUNIDADES CIRÚRGICAS`.

---

## 2. Metodologia

- Inventário a partir das fontes reais: `scripts/curated-routes-meta.mjs` (56 rotas curadas), `scripts/curated-static-body.mjs` (H1/corpo/links), sitemaps em `public/`.
- Grafo de links internos calculado por `linksFor()` sobre as rotas curadas (não inclui componentes globais de navegação; nav/footer contam à parte).
- GSC: snapshot do projeto (28 dias, 2026-07-08→2026-08-04) + consulta `query × page` de 3 meses (2026-05-08→2026-08-04) via gateway.
- Semrush: não consultado nesta rodada (volume orgânico atual é baixo demais para estimativa de terceiro alterar a conclusão; ver §7).
- Gates executados em modo leitura: `check:seo`, `check:trust-claims`, `check:analytics-parity`, `check:orphan-pages`, `check:internal-links`.

---

## 3. Inventário (informática, indexável)

71 URLs no sitemap. Recorte de informática:

| Grupo | URLs |
|---|---|
| Núcleo local | `/`, `/tecnico-informatica-curitiba`, `/areas-atendidas` |
| Serviços PF | `/servicos`, `/servicos/manutencao-de-computador`, `/servicos/manutencao-de-notebook`, `/servicos/formatacao`, `/servicos/remocao-de-virus`, `/servicos/upgrade-ssd-ram`, `/servicos/recuperacao-de-dados`, `/servicos/redes-e-wifi`, `/servicos/montagem-de-pc` |
| B2B | `/empresa-de-ti-curitiba`, `/servicos/suporte-tecnico-empresarial`, `/servicos/manutencao-preventiva-empresas`, `/servicos/backup-para-empresas`, `/servicos/suporte-home-office` |
| Modalidade | `/atendimento-domicilio`, `/atendimento-remoto`, `/coleta-e-entrega`, `/diagnostico-tecnico` |
| Confiança | `/precos-e-politicas`, `/como-funciona`, `/faq`, `/sobre`, `/seguranca-dos-dados`, `/quando-nao-compensa`, `/politica-de-pecas-do-cliente`, `/equipamentos-atendidos` |
| Sintoma | `/problemas/computador-lento`, `/problemas/notebook-nao-liga` |
| Cidades | 6 (`curitiba`, `sao-jose-pinhais`, `pinhais`, `colombo`, `araucaria`, `campo-largo`) |
| Bairros | 5 (`cic`, `batel`, `agua-verde`, `centro`, `portao`) |
| Serviço×bairro | 11 |
| Editorial | `/blog` + 7 artigos aprovados |

Fora do recorte (congeladas, não auditadas): `/servicos/conserto-tv`, `/servicos/conserto-placa`, `/servicos/conserto-monitor`.

---

## 4. Intenções (primária)

| URL | Intenção |
|---|---|
| `/` | BRAND + roteador PF×PJ |
| `/tecnico-informatica-curitiba` | LOCAL/TRANSACTIONAL (dominante declarada) |
| `/servicos/*` PF | TRANSACTIONAL (secundária: LOCAL) |
| `/empresa-de-ti-curitiba` | B2B institucional |
| `/servicos/suporte-tecnico-empresarial` | B2B execução |
| `/problemas/*` | PROBLEM/SYMPTOM (secundária: TRANSACTIONAL) |
| cidades / bairros | LOCAL |
| `/blog/*` | INFORMATIONAL |
| `/precos-e-politicas`, `/faq`, `/como-funciona` | INFORMATIONAL de conversão |

Nenhuma URL do recorte ficou sem intenção primária identificável.

---

## 5. Query → URL (com dados reais, 3 meses)

| Cluster | URL adequada | URL que efetivamente recebe impressão | Status |
|---|---|---|---|
| técnico de informática / computador (genérico) | `/tecnico-informatica-curitiba` | `araucaria` (6 imp, pos 8) **e** `colombo` (3 imp) **e** `curitiba` (1 imp, pos 33) | **MÚLTIPLAS URLs** |
| assistência técnica notebook | `/servicos/manutencao-de-notebook` | `araucaria` (2) + `colombo` (1+2) | **URL SUBÓTIMA + MÚLTIPLAS** |
| assistência técnica computador/pc | `/servicos/manutencao-de-computador` | `araucaria`, `colombo` | **URL SUBÓTIMA** |
| formatação notebook curitiba | `/servicos/formatacao` | `/servicos/formatacao` (pos 15) | URL CORRETA |
| recuperação de dados empresa curitiba | `/servicos/recuperacao-de-dados` | idem (26 imp, 1 clique) | URL CORRETA |
| vírus / malware | `/servicos/remocao-de-virus` | `/blog/como-saber-se-pc-tem-virus-malware` (9 imp) | artigo cobrindo intenção informacional — OK, mas sem clique |
| notebook não liga | `/problemas/notebook-nao-liga` | `/blog/notebook-nao-liga-o-que-fazer` (4 imp) — artigo **não aprovado** | **MÚLTIPLAS URLs / conflito de política** |
| conserto de monitor / placa de vídeo Curitiba | páginas dedicadas (congeladas) | `/faq` (pos 80–86) | **URL SUBÓTIMA** |
| serviços de informática preços | `/precos-e-politicas` | idem (pos 57) | URL CORRETA |
| nobreak | — (sem serviço declarado) | `/blog/como-fazer-manutencao-nobreak` (20 imp) | artigo não aprovado ranqueando |
| upgrade SSD / memória, computador lento, backup, rede Wi-Fi empresa, PC gamer, TI empresas | páginas existem | **sem impressão registrada** | DADOS INSUFICIENTES |

---

## 6. GSC

28 dias (2026-07-08→08-04): **2 cliques · 278 impressões · CTR 0,72% · posição média 15,8**. Home: “Submitted and indexed”, canonical escolhido pelo Google = o declarado.

Top pages: `/servicos/recuperacao-de-dados` (26 imp, 1 clique), `/tecnico-informatica-curitiba` (17 imp, 1 clique), `/blog/como-fazer-manutencao-nobreak` (20 imp, 0), `/bairros/portao` (10), `/blog/como-saber-se-pc-tem-virus-malware` (9), `/bairros/agua-verde` (5), `/` (5, pos 4,2), `/bairros/batel` (4).

Volume ainda é baixo: nenhuma conclusão de CTR é estatisticamente válida.

## 7. Semrush

Não consultado. Com 278 impressões/28d, estimativa de terceiro não muda nenhuma decisão desta rodada e seria tratada como `DADOS DE TERCEIRO`. Fica registrado como opcional para a próxima rodada, junto do keyword gap (§30).

---

## 8. Canibalização

| Caso | Classificação | Evidência |
|---|---|---|
| `araucaria` × `colombo` × `curitiba` em queries genéricas sem cidade | **CANIBALIZAÇÃO COMPROVADA POR DADOS** | mesmas queries com impressões em 2–3 URLs no mesmo período |
| `/blog/notebook-nao-liga-o-que-fazer` × `/problemas/notebook-nao-liga` | **CANIBALIZAÇÃO PROVÁVEL** | artigo não aprovado recebe as impressões do sintoma |
| `/servicos/manutencao-de-computador` × `/servicos/manutencao-de-notebook` | SEM CANIBALIZAÇÃO | titles/H1 distintos, gate `check:cannibalization` verde, sem sobreposição no GSC |
| `/empresa-de-ti-curitiba` × `/servicos/suporte-tecnico-empresarial` | SOBREPOSIÇÃO LEVE | separação institucional × execução mantida; sem dado de GSC |
| bairros entre si | SOBREPOSIÇÃO LEVE (template) | família data-driven, já tratada como aviso pelo gate |

---

## 9. Home

5 links contextuais curados: `/servicos`, `/tecnico-informatica-curitiba`, `/como-funciona`, `/precos-e-politicas`, `/contato`. Âncoras descritivas. **Nenhum link direto da home para as landings de serviço PF** (notebook, computador, formatação, SSD, vírus, dados) — a distribuição passa obrigatoriamente pelo hub.

## 10. Hub `/servicos`

Recebe 32 links internos (2º mais linkado) e distribui para as landings de serviço. Âncoras descritivas, sem excesso de links, sem órfãs no escopo comercial (`check:orphan-pages` OK). O hub cumpre a função; o gargalo está *acima* dele (home) e *abaixo* (poucos links laterais entre serviços).

## 11. Profundidade de clique

| Landing | Cliques desde a home |
|---|---|
| `/servicos`, `/tecnico-informatica-curitiba`, `/precos-e-politicas`, `/como-funciona`, `/contato` | 1 |
| todas as landings `/servicos/*` | 2 |
| `/problemas/*`, bairros, cidades, artigos | 2–3 |
| serviço×bairro | 3 |

Nenhuma landing comercial prioritária está a 3+ cliques. Sem órfãs.

## 12. Órfãs

Nenhuma página comercial órfã (`[orphan-gate] 65 páginas + 2 roteadores — OK`). Os 4 artigos legados não aprovados são órfãos *por projeto* (fora do sitemap e sem links de entrada) — porém indexados pelo Google.

## 13. Link equity interno (top 15 de entrada)

`/precos-e-politicas` 39 · `/servicos` 32 · `/tecnico-informatica-curitiba` 25 · `/atendimento-domicilio` 22 · `/como-funciona` 18 · `/contato` 16 · `/coleta-e-entrega` 8 · `/servicos/upgrade-ssd-ram` 7 · `/servicos/backup-para-empresas` 6 · `/servicos/recuperacao-de-dados` 6 · `/atendimento-remoto` 6 · `/servicos/conserto-pc-notebook/agua-verde` 6 · `/servicos/redes-e-wifi` 5 · `/servicos/manutencao-de-computador` 5 · `/servicos/suporte-tecnico-empresarial` 5.

**A distribuição não é proporcional ao valor estratégico.** Páginas de confiança (`/precos-e-politicas`, `/como-funciona`, `/contato`) somam 73 links de entrada; as duas landings de maior valor comercial (`manutencao-de-computador` 5, `manutencao-de-notebook` 3) somam 8. Uma página de serviço×bairro (`conserto-pc-notebook/agua-verde`, 6) recebe mais links que a landing de notebook.

## 14. Âncoras

Predominantemente **DESCRITIVAS** nos blocos curados. Não foram encontradas âncoras “clique aqui”/“saiba mais” nos corpos estáticos auditados. Nenhum caso de exact-match excessivo.

## 15. Breadcrumbs

Hierarquia coerente (`Início → hub → página`) com `BreadcrumbList` correspondente; gate `check:breadcrumb-schema` existe e cobre o conjunto. Sem breadcrumb artificial detectado.

## 16. Canonical

Ownership determinístico via `src/lib/canonicalUrl.ts` (um único nó `data-canonical-owner="managed"`). Self-canonical em todas as rotas curadas. Google confirmou o canonical declarado na home. **Sem achado.**

## 17. Titles

Sem duplicatas. Todos ≤ 60 caracteres após a correção anterior. Observação semântica: `manutencao-de-notebook` e `manutencao-de-computador` abrem ambos com “Assistência Técnica de …” — diferenciação existe (Notebook × Computador | PC), mas é o par mais próximo do conjunto. Cidades usam padrão “Técnico em X para …”, distinto da página de Curitiba.

## 18. H1

`h1For()` não retorna valor para as rotas auditadas (o H1 vive no componente React, não no corpo curado). A matriz URL→H1 **não pôde ser extraída da fonte curada** — registrado como limitação de método, não como ausência de H1: `check:seo` confirma 1 H1 no documento servido.

## 19. Meta descriptions

Únicas, presentes, não genéricas (`check:meta-uniqueness` verde). Dívida conhecida mantida: `src/pages/AssistenciaTecnicaCuritiba.tsx:335` usa “orçamento” contra o vocabulário oficial (`check:copy`). **Classificada como dívida separada — P2, não corrigida nesta rodada.**

## 20. Local intent

Curitiba aparece de forma factual e natural em todas as landings comerciais. São José dos Pinhais aparece na página de cidade própria e em `/areas-atendidas`. Sem keyword stuffing local.

## 21. Cidades

| Cidade | Conteúdo distinto | Links | GSC |
|---|---|---|---|
| curitiba | sim | 25 | 17 imp / 1 clique |
| araucaria | template | baixo | **17+ imp em queries genéricas** |
| colombo | template | baixo | **15+ imp em queries genéricas** |
| sao-jose-pinhais | template | baixo | 1 imp |
| pinhais / campo-largo | template | baixo | sem dado |

Função real comprovada: curitiba. Araucária e Colombo têm *desempenho* real, mas para consultas que não são delas — é justamente o problema. Nenhuma cidade nova.

## 22. Bairros

| Bairro | Classificação |
|---|---|
| portao (10 imp, pos 8,2) | ÚTIL |
| agua-verde (5 imp, pos 4,8) | ÚTIL |
| batel (4 imp, pos 6,75) | ÚTIL |
| centro / cic | SEM DADOS |

Nenhum caso de doorway. Política de poda (12–13 âncoras) respeitada.

## 23. Residencial × B2B

A intenção empresarial **tem URL clara**: `/empresa-de-ti-curitiba` (institucional) + 4 landings de execução. Não está espalhada. Ainda sem sinal de GSC.

## 24. Notebook × computador

`AINDA SEM DADOS` — não há impressão registrada em nenhuma das duas landings. Arquitetura, titles e matriz de intenção sustentam a separação. **Não fundir.**

## 25. Sintomas

Cobertura: `lento` (`/problemas/computador-lento`), `não liga` (`/problemas/notebook-nao-liga`), `aquecendo` (artigo), `sem internet` (artigo Wi-Fi + `/servicos/redes-e-wifi`). Sem página para `travando` e `tela azul` — cobertos por blocos. **Sem thin content e sem micro-landings excessivas.** Não criar landing por sintoma sem demanda.

## 26. Serviços específicos

SSD/RAM · formatação · backup (PF via artigo, PJ via landing) · recuperação de dados · vírus · redes → todos com **LANDING PRÓPRIA** (backup PF = ARTIGO). Nobreak = **AUSENTE como serviço**, presente só como artigo não aprovado que ranqueia (20 imp). Não é gap comercial declarado: depende de confirmação de capacidade operacional.

## 27. Conteúdo editorial

7 artigos aprovados na onda; `/blog` no sitemap. Todos apontam para pilar comercial e recebem link de entrada (`editorialInboundLinks.ts`, gate `check:editorial-cluster`). Artigo → money page e money page → conteúdo: **cobertos**.

Fora da onda, 4 artigos legados continuam no bundle e recebem impressões (§28 abaixo).

## 28. Clusters (arquitetura atual real)

```
/ (home)
└── /servicos  ← hub
    ├── NOTEBOOK  /servicos/manutencao-de-notebook
    ├── COMPUTADOR /servicos/manutencao-de-computador · /servicos/montagem-de-pc
    ├── SERVIÇOS   formatacao · remocao-de-virus · upgrade-ssd-ram ·
    │              recuperacao-de-dados · redes-e-wifi
    ├── EMPRESAS   /empresa-de-ti-curitiba → suporte-tecnico-empresarial ·
    │              manutencao-preventiva-empresas · backup-para-empresas ·
    │              suporte-home-office
    ├── SINTOMAS   /problemas/computador-lento · /problemas/notebook-nao-liga
    └── CONTEÚDO   /blog + 7 artigos
LOCAL: /tecnico-informatica-curitiba → 5 cidades · 5 bairros · 11 serviço×bairro · /areas-atendidas
```

## 29. Gap real

| Possível gap | Veredito |
|---|---|
| “assistência técnica de informática em Curitiba” como página única e forte | **GAP REAL de consolidação** — a intenção existe e ranqueia, mas na URL errada |
| nobreak / no-break | DEPENDE DE DADOS (capacidade operacional não declarada) |
| PC gamer manutenção | JÁ COBERTO (`/servicos/montagem-de-pc` + artigo) |
| tela azul / travando | VOLUME/INTENÇÃO INSUFICIENTE |
| impressora, celular, áudio | fora de escopo declarado |

## 30. Keyword gap

Não executado (Semrush não consultado). Registrado como pendência opcional. Nada nesta rodada foi justificado por “concorrente tem página”.

## 31. SERP features

Não medido diretamente. Sinal indireto relevante: as queries de maior intenção comercial local (“técnico de informática perto de mim”, “assistência técnica notebook”) são exatamente as dominadas por **Map Pack** — e o portal não tem GBP ativo. Ou seja, parte do clique real está sendo capturado por um formato que a 4I-M destrava, não por SEO orgânico. Isso reforça a prioridade da 4I-M sobre qualquer nova página.

## 32. Score de arquitetura SEO — **72/100**

| Critério | Nota | Justificativa |
|---|---|---|
| Intenção por URL | 17/20 | uma intenção clara por URL; par notebook/computador é o mais próximo |
| Canibalização | 8/15 | caso comprovado cidades satélite × Curitiba; conflito blog × sintoma |
| Interlinking | 12/20 | sem órfãs e sem quebras, mas equity concentrada em páginas de confiança, não nas money pages |
| Profundidade de clique | 9/10 | tudo ≤ 2 cliques |
| Local relevance | 8/10 | Curitiba forte, SJP fraco, GBP ausente |
| Query-page alignment | 8/15 | a maioria das impressões chega na URL errada |
| Cobertura comercial | 10/10 | nenhum serviço declarado sem cobertura |

## 33. Top 5 achados

1. **Cidades satélite capturam as queries genéricas de informática.** Evidência: GSC 3 meses — `araucaria` e `colombo` com impressões em “assistência técnica notebook/pc”, “técnico de computador”, “manutenção computador” (pos 4–12), enquanto `/tecnico-informatica-curitiba` fica em pos 33 nas mesmas buscas. URLs: `/tecnico-informatica-araucaria`, `/tecnico-informatica-colombo`, `/tecnico-informatica-curitiba`. Impacto: alto. Ação futura: reforço semântico de escopo geográfico nas cidades satélite + interlinking ascendente para a página de Curitiba. **P1**.
2. **Artigos não aprovados indexados apesar da política fail-closed.** Evidência: 20 impressões em `/blog/como-fazer-manutencao-nobreak`, além de `notebook-nao-liga-o-que-fazer`, `como-montar-pc-gamer-2026`, `como-fazer-backup-completo-windows-11` — todos fora de `EDITORIAL_WAVE_SLUGS` e fora do sitemap. Causa: `noindex` aplicado por efeito de cliente em `BlogPost.tsx`, não no HTML servido. Impacto: alto (conflito técnico comprovado + canibaliza o sintoma). **P0**.
3. **Money pages subalimentadas internamente.** Evidência: `manutencao-de-notebook` 3 links de entrada e `manutencao-de-computador` 5, contra `/precos-e-politicas` 39 e uma serviço×bairro com 6. Impacto: médio-alto. **P1**.
4. **Home não linka nenhuma landing de serviço.** Evidência: 5 links curados, nenhum para `/servicos/*`. Impacto: médio. **P1**.
5. **`/faq` ranqueando (pos 80–86) para “conserto de monitor curitiba” e “conserto placa de vídeo curitiba”.** Sinal de desalinhamento query→URL nas verticais congeladas. Impacto: baixo hoje (posição fora de alcance). **P2 — não tocar agora (congelamento).**

## 34. P0
- Achado 2 — `noindex` de artigo não aprovado precisa existir no HTML servido, não só no cliente. Conflito técnico comprovado por dados do Google.

## 35. P1
- Achado 1 — escopo geográfico e interlinking ascendente das cidades satélite.
- Achado 3 — redistribuição de links internos para as money pages PF.
- Achado 4 — links contextuais da home para 3–4 landings de serviço.

## 36. P2
- `AssistenciaTecnicaCuritiba.tsx:335` (“orçamento” na meta description) — dívida de copy congelada.
- Diferenciação semântica adicional entre os titles de notebook × computador.
- Alinhamento `/faq` × verticais congeladas (após descongelamento).

## 37. O que NÃO fazer

- **Não** criar novos bairros ou cidades — Araucária/Colombo mostram que mais páginas locais capturam intenção alheia, não demanda nova.
- **Não** criar landing por sintoma (“travando”, “tela azul”) sem demanda registrada.
- **Não** fundir notebook × computador: sem dados que justifiquem (§24).
- **Não** alterar title/meta por CTR: n = 2 cliques, amostra inválida.
- **Não** podar página só porque o GSC ainda não tem dado (`/bairros/centro`, `/bairros/cic`, landings B2B).
- **Não** criar página de nobreak antes de confirmar capacidade operacional.
- **Não** compensar a autoridade externa ausente com novas páginas — o gargalo real é Map Pack/GBP (§31), que pertence à 4I-M.

## 38. Git final

`git status --short` → vazio (antes deste documento) · `git diff -- src/` vazio · `git diff -- scripts/` vazio.
Único arquivo criado: este relatório em `docs/`.

**Gates (leitura):** `check:seo` PASS · `check:trust-claims` PASS · `check:analytics-parity` PASS · `check:orphan-pages` PASS · `check:internal-links` PASS.

---

## Perguntas obrigatórias

1. **Qual URL deve ser a principal autoridade para “assistência técnica em informática em Curitiba”?**
   `/tecnico-informatica-curitiba`. Ela já é a dominante declarada, tem o 3º maior equity interno (25) e é a única cidade com conteúdo próprio — mas hoje perde as impressões para as satélites.
2. **Existe canibalização real?** **Sim, comprovada por dados** — cidades satélite × Curitiba em queries genéricas; e `/blog/notebook-nao-liga-o-que-fazer` × `/problemas/notebook-nao-liga`.
3. **Qual página recebe autoridade interna abaixo do que merece?** `/servicos/manutencao-de-notebook` (3 links), seguida de `/servicos/manutencao-de-computador` (5) e `/servicos/remocao-de-virus` (3).
4. **Qual cluster tem o maior gap comercial real?** Nenhum gap de *cobertura*. O gap real é de **consolidação de autoridade no cluster local genérico de informática** (§29).
5. **Temos páginas demais, de menos ou o número certo?** **O número certo, mal balanceado.** 71 URLs para a operação atual é adequado; o problema é distribuição de equity e escopo das satélites, não quantidade.

## DECISÃO FINAL

```text
ARQUITETURA SEO DE INFORMÁTICA TEM OPORTUNIDADES CIRÚRGICAS
```

**Próximo passo:** abrir **4I-P.1** com no máximo 3 ajustes — (1) `noindex` server-side dos artigos não aprovados [P0], (2) interlinking ascendente das cidades satélite → `/tecnico-informatica-curitiba` [P1], (3) links contextuais home/hub → money pages PF [P1] — com diff mínimo e gates completos. Em paralelo, a 4I-M segue como prioridade de aquisição real.
