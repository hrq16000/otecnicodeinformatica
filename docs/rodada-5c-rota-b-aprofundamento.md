# Rodada 5C — Escolha de rota para o Lote Local 2 e início da Rota B

Data: 2026-08-14 · Base de evidência: `docs/relatorio-rodada-5b-final.md` e `reports/local-doorway.*`.

## 1. Recomendação: ROTA B

**Aprofundar os 5 bairros âncora antes de promover qualquer URL nova.**

Justificativa medida, não opinativa:

| Evidência da Rodada 5B | Leitura |
|---|---|
| Jaccard máximo entre indexáveis: **0,106** (teto 0,45) | Canibalização **não** é o gargalo atual. Expandir não resolve um problema que não existe. |
| Teste "sem localidade" máximo: **0,106** | Não há template com localidade trocada — a arquitetura está saudável, mas isso foi provado em apenas 7 páginas. |
| Volume por bairro: **800–885 palavras** | Acima do mínimo (550), porém no piso da faixa. Falta profundidade, não quantidade de URLs. |
| Maior bloco de texto repetido entre bairros: **44 palavras**, todo em rodapé/boilerplate | Nenhum bloco editorial duplicado. O que se repete é chrome do site. |
| Sobreposição de H2 entre bairros: **0,56** | Estrutura ainda bastante templatizada — risco latente se novas páginas copiarem esse esqueleto. |
| Cobertura robots/canonical/sitemap: **8/8 conformes** | A camada técnica está pronta para suportar mais páginas quando houver conteúdo real. |

Por que **não** A (expandir bairros secundários agora): não existe operação nem prova local
declarada para eles; promoveríamos páginas rasas sob o mesmo esqueleto que já mostra 0,56 de
sobreposição de H2 — é exatamente assim que uma arquitetura sadia vira doorway.
Por que **não** C (indexar serviço × cidade): a cidade não altera procedimento nem preço; a
política já resolve isso por canonical.
Por que **não** D (novos tipos de página): a instrução da rodada proíbe criar tipo novo.

## 2. O que a Rota B entrega antes de qualquer promoção

1. Profundidade real por bairro âncora (logística, casos, prova visual licenciada, FAQ local).
2. Redução da sobreposição de H2 entre bairros para < 0,4 — cada bairro com estrutura própria.
3. Só depois disso, avaliação do Lote Local 2 sob o mesmo `localIndexPolicy` e os mesmos gates,
   sem inventar nenhum tipo novo de página.

## 3. Instrumentação entregue nesta etapa

### Relatório de auditoria (`npm run report:local-doorway`)

- `reports/local-doorway.csv` — matriz par a par por família: Jaccard, sem-localidade,
  similaridade de introdução, sobreposição de H2 e de FAQ, ordem de FAQ e o maior bloco de
  texto coincidente (com o trecho literal, para auditoria rápida).
- `reports/local-coverage.csv` — robots, canonical (obtido × esperado), presença no sitemap,
  contagem de palavras e veredito de conformidade por URL.
- `reports/local-doorway.html` — painel com semáforo de risco (alto/médio/baixo) por par.
- `reports/local-doorway.json` — dados brutos para dashboard e CI.

### Gate endurecido (`npm run check:local-doorway`, bloqueante)

Limites em vigor para **toda** URL local indexável, atual ou futura:

| Regra | Limite |
|---|---|
| Jaccard (5-gramas do `<main>`) intrafamília | < 0,45 |
| Similaridade removendo a localidade | < 0,82 |
| Introdução (4-gramas, 120 primeiras palavras) intrafamília | < 0,40 |
| Home × landing de Curitiba (introdução) | < 0,35 |
| Sobreposição de H2 | < 0,70 (sequência idêntica = falha imediata) |
| Sobreposição de perguntas de FAQ | < 0,60 (mesma FAQ na mesma ordem = falha imediata) |
| Title / description / H1 | únicos entre indexáveis |
| Palavras no `<main>` | ≥ 550 |

### Budgets de Lighthouse (`npm run lh:local`, `lighthouserc.local.json`)

12 URLs do Lote Local 1 (cidades, bairros âncora, serviços-pai canônicos e o hub de cobertura)
com Performance ≥ 0,85 (warn), Acessibilidade ≥ 0,90, SEO ≥ 0,95, Best Practices ≥ 0,90,
LCP ≤ 2,5 s, CLS ≤ 0,1 e auditorias `is-crawlable`, `canonical`, `meta-description` e
`document-title` obrigatórias. Toda nova página promovida entra nessa lista antes do go-live.

### CI

`weekly-gates` passou a rodar `check:local-index-policy`, `check:local-doorway` e
`report:local-doorway`, publicando CSV e HTML como artefato do job.

## 4. Estado medido hoje

- 12 pares comparados: **0 de risco alto, 0 de risco médio**.
- 8 URLs de cobertura: **8 conformes** em robots, canonical e sitemap.
- Nenhuma URL nova criada nesta etapa — o Lote Local 2 segue fechado, por decisão.
