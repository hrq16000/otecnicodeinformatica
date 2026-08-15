# Rodada 5B — Validação editorial do Lote Local 1 (antidoorway)

Data da execução: 2026-08-13 · Escopo: 12 URLs do Lote Local 1 + Home.
Objetivo: provar **editorialmente** o que a Rodada 5A provou estruturalmente — cada URL local
indexável tem intenção e conteúdo próprios, e não um template com a localidade trocada.

## 1. Veredito

**Veredito 2 — arquitetura local aprovada com teto mantido.**
Nenhuma página do lote apresentou padrão de doorway. Nenhuma URL nova foi liberada;
a expansão continua condicionada ao checklist da seção 7 do plano da Rodada 5.

## 2. Home × /tecnico-informatica-curitiba — coexistência

| Dimensão | Home | /tecnico-informatica-curitiba |
|---|---|---|
| Intenção | marca + triagem por sintoma (qualquer equipamento, qualquer região atendida) | serviço de técnico de informática **na cidade**: cobertura, bairros, modalidade e logística |
| H1 | "Qual problema de tecnologia precisamos resolver hoje?" | "Técnico de informática em Curitiba para computador e notebook" |
| Entrada do usuário | descreve o sintoma em texto livre | já sabe o que quer e busca atendimento local |
| Similaridade de introdução | — | **0,023** |
| Similaridade de corpo (`<main>`, 5-gramas) | — | **0,022** |

**Decisão: MANTER as duas indexáveis.** As intenções não competem — a Home é entrada por
problema, a landing de Curitiba é entrada por localidade + serviço. Gate automatizado impede
convergência futura de title, H1, description e introdução.

## 3. Similaridade intrafamília medida (dist real)

### CIDADE

| Par | Jaccard (5-gramas) | Sem localidade | Palavras |
|---|---|---|---|
| curitiba ↔ são josé dos pinhais | 0,035 | 0,034 | 981 / 851 |

### BAIRRO (5 âncoras)

| Par | Jaccard | Sem localidade |
|---|---|---|
| centro ↔ batel | 0,082 | 0,085 |
| centro ↔ água verde | 0,075 | 0,071 |
| centro ↔ cic | 0,078 | 0,076 |
| centro ↔ portão | 0,091 | 0,087 |
| batel ↔ água verde | 0,080 | 0,088 |
| batel ↔ cic | 0,075 | 0,077 |
| batel ↔ portão | 0,096 | 0,106 |
| água verde ↔ cic | 0,074 | 0,079 |
| água verde ↔ portão | 0,077 | 0,081 |
| cic ↔ portão | 0,082 | 0,088 |

Volume por bairro: 800–885 palavras no `<main>` (mínimo exigido: 550).
Máximo global observado: **0,106** — muito abaixo do limite de 0,45.

O teste "sem localidade" é o mais severo: remove os nomes de cidade/bairro dos dois textos e
recompara. Se a única diferença real fosse a localidade, o índice iria a ~1,0. Ficou em ~0,08,
o que confirma conteúdo autoral por bairro (CIC industrial/poeira, Batel home office e
videoconferência, Centro comércio e coleta, Água Verde residencial denso, Portão bairro misto).

## 4. Serviço × cidade (5 URLs)

As 5 combinações do lote (`formatacao-computador`, `remocao-virus`, `conserto-notebook`,
`conserto-pc`, `upgrade-ssd` em Curitiba) permanecem **canonicalizadas** para o serviço-pai:
a cidade não altera procedimento, preço nem logística do serviço. Não competem por indexação,
portanto não entram na análise de similaridade — a autoridade fica concentrada no serviço-pai
e na landing de Curitiba, e não se cria uma matriz de doorways serviço×cidade.

## 5. Gate criado — `check:local-doorway`

`scripts/check-local-doorway.mjs`, bloqueante no `postbuild` e no CI. Falha quando:

1. Home e a landing de Curitiba convergem em title, H1, description ou introdução (> 0,35).
2. Duas páginas da mesma família passam de 0,45 de Jaccard (5-gramas do `<main>`).
3. Removida a localidade, dois textos ficam ≥ 82% iguais (doorway por substituição).
4. Duas páginas compartilham a mesma sequência completa de H2.
5. Duas páginas repetem integralmente a FAQ.
6. Title, description ou H1 se repetem entre indexáveis, ou o `<main>` fica abaixo de 550 palavras.

## 6. Evidências de execução

- `npm run build` — sucesso; 115 rotas indexáveis, 116 páginas com schema conferido.
- `check:local-index-policy` — 20 rotas locais coerentes em robots, canonical e sitemap.
- `check:local-doorway` — 8 páginas analisadas, 7 indexáveis, 0 falhas.
- `check:geo` — title/description únicos, H1 único, canonical self, OG/Twitter e JSON-LD válidos.
- `check:robots` — 115 rotas liberadas, 5 áreas privadas bloqueadas, 11 sitemaps.
- Vitest — `src/lib/__tests__/localIndexPolicy.test.ts`: 9/9 aprovados (regra de ouro,
  bairros âncora, canonicalização serviço×cidade, clusters bloqueados).
- E2E — `e2e/lote-local-1-seo.spec.ts`: contrato SEO das 12 URLs.

## 7. Próximo passo recomendado

Manter a **Rota B**: aprofundar os 5 bairros âncora (provas visuais reais, FAQ de logística e
casos por bairro) antes de promover qualquer bairro secundário. A folga de similaridade
(0,106 contra o teto de 0,45) mostra que o gargalo hoje não é canibalização, e sim volume de
prova local real por página.

## 8. Não executado nesta rodada

Promoção de bairros secundários · reabertura de `/assistencia-tecnica-curitiba` ·
indexação de serviço × cidade · geração de novas combinações locais.
