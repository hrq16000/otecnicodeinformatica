---
name: Rodada 5C — Rota B escolhida para o Lote Local 2
description: Lote Local 2 fechado; aprofundar os 5 bairros âncora primeiro. Limites de unicidade de template, report:local-doorway (CSV/HTML) e budgets lh:local.
type: feature
---

- **Decisão: ROTA B.** O Lote Local 2 fica **fechado** até os 5 bairros âncora ganharem
  profundidade. Motivo medido: Jaccard máximo 0,106 (teto 0,45) — canibalização não é o gargalo;
  o risco real é a sobreposição de H2 entre bairros (0,56), que viraria doorway se replicada.
  Antes de promover qualquer bairro secundário, a sobreposição de H2 precisa cair abaixo de 0,4.
- Rotas descartadas: A (bairros secundários sem operação real), C (serviço × cidade — já resolvido
  por canonical) e D (novo tipo de página — proibido pela política).
- **Gate `check:local-doorway` endurecido** (bloqueante no postbuild e no weekly-gates):
  Jaccard < 0,45 · sem-localidade < 0,82 · introdução intrafamília < 0,40 · Home×Curitiba < 0,35 ·
  H2 overlap < 0,70 (sequência igual = falha) · FAQ overlap < 0,60 (mesma ordem = falha) ·
  title/description/H1 únicos · `<main>` ≥ 550 palavras.
- **`npm run report:local-doorway`** gera `reports/local-doorway.csv|html|json` (matriz par a par
  com o maior bloco de texto coincidente literal) e `reports/local-coverage.csv`
  (robots × canonical × sitemap × palavras). Publicado como artefato no CI.
- **`npm run lh:local`** (`lighthouserc.local.json`): budgets do Lote Local 1 — Perf ≥ 0,85,
  A11y ≥ 0,90, SEO ≥ 0,95, Best Practices ≥ 0,90, LCP ≤ 2,5s, CLS ≤ 0,1 e auditorias
  is-crawlable/canonical/meta-description/document-title obrigatórias. **Toda página local nova
  promovida a indexável deve entrar nessa lista antes do go-live.**
- Documento: `docs/rodada-5c-rota-b-aprofundamento.md`.
