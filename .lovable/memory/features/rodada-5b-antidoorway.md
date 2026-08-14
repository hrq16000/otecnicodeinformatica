---
name: Rodada 5B — validação editorial antidoorway do Lote Local 1
description: Home × Curitiba coexistem indexáveis; gate check:local-doorway com limites 0,45 / 0,82 e mínimo de 550 palavras nas locais indexáveis.
type: feature
---

- **Home × /tecnico-informatica-curitiba: coexistem indexáveis.** Home = entrada por sintoma
  (triagem, marca, qualquer equipamento). Curitiba = entrada por localidade + serviço
  (cobertura, bairros, modalidade, logística). Medido: intro 0,023 · corpo 0,022.
  Nunca aproximar title/H1/description dessas duas páginas.
- **Gate `check:local-doorway`** (`scripts/check-local-doorway.mjs`, bloqueante no postbuild e CI):
  1. Home × Curitiba não podem convergir (introdução > 0,35 falha).
  2. Jaccard de 5-gramas do `<main>` intrafamília < 0,45.
  3. Teste "sem localidade": removendo nomes de cidade/bairro, dois textos não podem ficar
     ≥ 82% iguais (detecta search-and-replace de localidade).
  4. Sequência completa de H2 idêntica = falha. FAQ integralmente repetida = falha.
  5. Title/description/H1 únicos e `<main>` ≥ 550 palavras nas locais indexáveis.
- **Baseline medido (13/08/2026):** cidades 0,035; bairros máx. 0,106; palavras 800–981.
  Folga grande contra o teto — o gargalo é prova local real, não canibalização.
- Serviço × cidade do Lote Local 1 permanece `canonicalized` para o serviço-pai; não entra na
  análise de similaridade e não deve ser promovido sem intenção local comprovada.
- Testes: `src/lib/__tests__/localIndexPolicy.test.ts` (regra de ouro, 5 bairros âncora,
  canonicalização, clusters bloqueados). Relatório: `docs/relatorio-rodada-5b-final.md`.
- Próximo passo aprovado: Rota B — aprofundar os 5 bairros âncora antes de promover secundários.
