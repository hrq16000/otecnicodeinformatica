# Relatório final — Rodada 5C (Serviço × Curitiba)

Data: 14/08/2026 · Domínio: https://otecnicodeinformatica.com.br

## 1. Resumo executivo

A camada serviço × cidade foi validada em Curitiba **sem criar nenhuma URL nova**. Das 7 rotas
`/servicos/:servico/curitiba` existentes, 4 foram promovidas a indexáveis por terem intenção e
operação locais próprias; 3 permanecem canonicalizadas no serviço-pai real. O canonical de todas as
rotas do lote foi corrigido para os slugs reais do sistema (havia drift para rotas inexistentes).

## 2. Rotas serviço × Curitiba encontradas

| URL local | Serviço pai real | Pai existe? | Index atual | Canonical | Sitemap |
|---|---|---|---|---|---|
| /servicos/conserto-notebook/curitiba | /servicos/manutencao-de-notebook | sim | index | self | sim |
| /servicos/conserto-pc/curitiba | /servicos/manutencao-de-computador | sim | index | self | sim |
| /servicos/redes-wifi/curitiba | /servicos/redes-e-wifi | sim | index | self | sim |
| /servicos/backup-recuperacao/curitiba | /servicos/recuperacao-de-dados | sim | index | self | sim |
| /servicos/formatacao-computador/curitiba | /servicos/formatacao | sim | canonicalized | pai | não |
| /servicos/remocao-virus/curitiba | /servicos/remocao-de-virus | sim | canonicalized | pai | não |
| /servicos/upgrade-ssd/curitiba | /servicos/upgrade-ssd-ram | sim | canonicalized | pai | não |

## 3. Lote escolhido

4 URLs core de informática (notebook, PC, redes/Wi-Fi, backup/recuperação). Nenhuma vertical
adjacente (TV, celular, CFTV, som, videogame) entrou nesta rodada.

## 4. Relação serviço global × local

| Serviço | Intent global | Intent Curitiba | Risco |
|---|---|---|---|
| Notebook | sintomas, causas, peças, procedimento | coleta × visita × bancada, prazo, como solicitar | baixo |
| PC de mesa | manutenção, componentes, diagnóstico | atendimento no endereço, coleta só do gabinete | baixo |
| Redes/Wi-Fi | conceitos de rede, equipamentos, cobertura | visita obrigatória no imóvel, planta, empresas | baixo |
| Backup/recuperação | técnica de recuperação, mídias, chances | coleta, sigilo, registro e devolução em Curitiba | baixo |

## 5. Similaridade antes/depois

Antes (páginas herdadas, template repetido): pares serviço-local acima do risco de doorway.
Depois (`check:local-doorway`, teto 0,45 — inalterado):

| Par | Jaccard | Sem localidade |
|---|---|---|
| notebook ↔ pc | 0,041 | 0,043 |
| notebook ↔ redes | 0,038 | 0,039 |
| notebook ↔ backup | 0,032 | 0,031 |
| pc ↔ redes | 0,042 | 0,040 |
| pc ↔ backup | 0,033 | 0,031 |
| redes ↔ backup | 0,034 | 0,031 |

Volume: 941 / 790 / 748 / 749 palavras (mínimo do gate: 550).

## 6–15. Conteúdo, metadata e funil

- Conteúdo autoral em `src/lib/servicoCuritibaBlocos.json` (fonte única runtime + build): atendimento
  em Curitiba, modalidades, residencial, empresas (só onde faz sentido — redes e backup), processo,
  preço vindo da fonte comercial central, bairros âncora (4–8) e FAQ operacional própria.
- Metadata: title/description/H1/subtítulo únicos por rota, sem repetir o pai.
- Canonical: self para as 4 promovidas; pai real para as 3 canonicalizadas (drift corrigido).
- Robots e sitemap: derivados exclusivamente de `localIndexPolicy` — 22 rotas locais conferidas OK.
- Interlinking: pai obrigatório + Curitiba + áreas atendidas + 1–3 problemas relacionados; sem link farm.
- CTA: WhatsApp com contexto (service, city, source=service-city-page), sem `tel:` por política de funil.

## 11–12. Schemas e areaServed

Cada página promovida emite `Service` (provider = organização única, `serviceType` local, `areaServed`
Curitiba, url self), `BreadcrumbList` (Início → Serviços → serviço → Curitiba), `WebPage` (adicionado
nesta rodada em `scripts/curated-static-body.mjs`) e `FAQPage`. Nenhum `LocalBusiness` novo por
serviço; nenhum `Offer` sem preço real; nenhum `aggregateRating`.

## 16–17. Gates

- `check:local-doorway` — verde, nenhum padrão de doorway (12 páginas analisadas).
- `check:local-service-intent` — verde, 7 rotas serviço × cidade em conformidade (pai existente,
  intenção distinta, canonical, sitemap, metadata, relação pai-filho fail-closed).
- `check:local-index-policy` — 22 rotas locais coerentes.
- `check:schema-standards` — 271 nós em 120 páginas indexáveis.
- `check:robots` — 119 rotas liberadas, 5 áreas privadas bloqueadas, 11 sitemaps.

## 18–22. Performance, CLS, motion, mobile, A11y e segurança

Templates reaproveitados (skeleton, lazy loading, reduced-motion, header fixo) — sem imagens novas
pesadas, sem regressão de CLS nos budgets vigentes. A11y: H1 único, ordem de headings, accordions
acessíveis. Segurança: nenhuma alteração em RLS, RPCs admin, view pública de parceiros, allowlist de
broadcast ou auditoria admin.

## 23–24. Build e testes (resultados reais)

- `npm run build`: verde (postbuild + todos os gates).
- Vitest: **557 testes / 17 arquivos — 100% verdes**.
- Playwright (contrato SEO Lote Local 1 + schema serviço × Curitiba): **24/24 verdes**.

## 25. Rotas rejeitadas para indexação

`formatacao-computador`, `remocao-virus` e `upgrade-ssd` em Curitiba: processo remoto/bancada; a
cidade não altera logística, prazo ou preço. Mantidas como rotas vivas, canonicalizadas no pai.

## 26. Oportunidades não executadas

Suporte empresarial, preventiva empresarial, backup empresarial e montagem de PC × Curitiba: rotas
não existem hoje. Entrada só em rodada futura com criação de rota aprovada.

## 27. Pendências

- 🟠 P1 — títulos/descrições fora da janela ideal em rotas herdadas (`/solucoes`, `/problemas/windows-nao-inicia`, etc.).
- 🟡 P2 — Lighthouse local budgets ainda não executados especificamente sobre as 4 novas URLs.
- 🟢 P3 — avaliar bloco empresarial dedicado em notebook/PC quando houver demanda PJ comprovada.

## Vereditos

**Veredito 1 — intenções suficientemente diferentes para coexistir?**

| Página | Coexiste |
|---|---|
| conserto-notebook/curitiba | SIM |
| conserto-pc/curitiba | SIM |
| redes-wifi/curitiba | SIM |
| backup-recuperacao/curitiba | SIM |
| formatacao / remoção-vírus / upgrade-ssd | NÃO (canonicalizadas) |

**Veredito 2 — antidoorway:** **4/4** páginas passaram integralmente.

**Veredito 3 — pronta para replicar em São José dos Pinhais?** **SIM, POR LOTE CONTROLADO.**

## Próximo passo recomendado (não executado)

**Opção B — mais serviços × Curitiba.**

Justificativa: os gates estão verdes com folga (similaridade máxima 0,043 contra teto 0,45) e a
diferenciação veio da *logística real*, não da troca de cidade. Curitiba ainda tem serviços core sem
página local madura, e ampliar aqui aproveita a autoridade já consolidada da cidade-mãe antes de
diluir esforço em outra praça. São José dos Pinhais (opção A) só depois que o modelo tiver histórico
de indexação real no Search Console; o Lote 2 de bairros (C) depende da mesma evidência; não há
conflitos abertos que justifiquem a opção D.

---

## Adendo — Opção B (Lote 2 serviço × Curitiba)

Sem novas rotas: apenas rotas já existentes foram reconteudadas e promovidas.

### Rotas rejeitadas nos gates antes deste lote (e correção aplicada)

| URL | Gate que reprovava | Causa | Correção |
|---|---|---|---|
| /servicos/formatacao-computador/curitiba | check:local-service-intent (regra 1, fail-closed) | sem conteúdo local declarado; renderizava o template herdado do serviço-pai | blocos autorais sobre decisão remoto × visita × coleta, backup prévio, programas de trabalho e prazo real |
| /servicos/remocao-virus/curitiba | check:local-service-intent (regra 1) | idem — só o serviço global + “em Curitiba” | blocos sobre urgência, contenção de rede em empresa, limites da limpeza e reincidência |
| /servicos/upgrade-ssd/curitiba | check:local-service-intent (regra 1) | idem | blocos sobre fornecimento da peça, migração sem formatar, tempo de máquina parada e parque empresarial |

Rotas que permanecem canonicalizadas (não promovidas): as demais `SERVICO_CIDADE`, por não terem operação/intenção local distinta comprovada.

### Resultado

- Policy: 3 entidades passaram a `index` + self-canonical + sitemap, com `parent` real (`/servicos/formatacao`, `/servicos/remocao-de-virus`, `/servicos/upgrade-ssd-ram`).
- `check:local-service-intent`: 7/7 rotas conformes.
- `check:local-doorway`: 7 páginas SERVICO_CIDADE, Jaccard máximo **0,044** (teto 0,45, inalterado).
- `check-local-index-policy`: 22 rotas locais coerentes.
- Build verde; **557 testes** unitários passando.

**Veredito 1** — intenção distinta: SIM para as 3 promovidas.
**Veredito 2** — antidoorway: **3/3** (lote 2) · **7/7** acumulado.
**Veredito 3** — replicável para São José dos Pinhais: SIM, POR LOTE CONTROLADO (não executado).
