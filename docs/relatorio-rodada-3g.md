# Relatório — Rodada 3G (Sistema de provas técnicas reais)

## 1. Resumo executivo

Higiene editorial da Rodada 3F concluída e infraestrutura interna de casos técnicos
preparada. Zero novas URLs públicas, zero casos publicados, zero alteração de
infraestrutura, banco, analytics, preços ou páginas geográficas.

## 2. Estado inicial do Git

`git status --short` e `git diff --stat` sem saída (workspace gerenciado pela plataforma).

## 3. Higiene editorial

- **Links de entrada (A1)**: cada um dos 5 artigos aprovados passou a ter no mínimo
  2 links internos — hub `/blog` + bloco discreto "Conteúdo relacionado" na página
  comercial mais relacionada (`/servicos/upgrade-ssd-ram`, `/servicos/remocao-de-virus`,
  `/servicos/recuperacao-de-dados` e `/seguranca-dos-dados`, `/servicos/redes-e-wifi`,
  `/servicos/manutencao-de-notebook`). Máximo de 3 artigos por página; H1, FAQ, contrato
  semântico e CTA principal inalterados.
- **Outros guias (A2)**: o bloco é derivado do registro editorial e filtrado por
  `isEditorialApproved()` no runtime e no HTML estático. Nenhum link para
  `notebook-nao-liga-o-que-fazer`, `computador-lento-causas-solucoes` ou
  `como-instalar-windows-11-do-zero`, que seguem `noindex, follow` e preservados.
- **Imagem Wi-Fi (A3)**: fonte única `/blog/como-melhorar-sinal-wifi-em-casa.jpg`
  (1200×630, JPEG, ~52 KB, HTTP 200) usada em card do hub, capa, og:image, Twitter
  Card, JSON-LD e metadados estáticos. Nenhuma variação `.webp` duplicada.

## 4. Registro de casos

`src/lib/technicalCases.ts`: tipos `TechnicalCase`, `TechnicalCasePhoto`,
`TechnicalCaseMeasurement`, 12 categorias no escopo atual, registro vazio,
`validateTechnicalCase()` e `getPublishableCases()` fail-closed (exige status
`approved`, atendimento real, referência interna, diagnóstico, intervenção,
resultado, limitações, revisão técnica, autorização e anonimização concluída).

## 5. Privacidade

Nenhum dado pessoal armazenado. Fotos exigem alt, legenda factual, classificação,
EXIF revisado e indicação "imagem do atendimento" vs "imagem ilustrativa".
Localidade sempre ampla.

## 6/7. Template e componentes preparados

`src/components/casos/TechnicalCaseBlocks.tsx` — `TechnicalCaseSummary`,
`TechnicalCaseEvidence` e `TechnicalCaseProcess`, todos fail-closed e não montados
em nenhuma rota.

## 8. Checklist operacional

`docs/coleta-casos-tecnicos-reais.md` (antes / durante / depois, fotos, privacidade,
medições, linguagem, template e SEO futuro).

## 9. Gate técnico

`npm run check:technical-cases` → OK (12 categorias no escopo, 0 casos registrados,
0 publicáveis). Falha fechado em PII, foto sem alt/classificação, categoria off-topic,
linguagem garantista, rota `/casos` ou casos em sitemap.

## 10. Sitemap e indexação

Artigos indexáveis permanecem 5. Sitemap consistente, sem URLs de casos.

## 11. Arquivos alterados

- `src/lib/editorialInboundLinks.ts` (novo)
- `src/components/editorial/EditorialContentLinks.tsx` (novo)
- `src/lib/technicalCases.ts` (novo)
- `src/components/casos/TechnicalCaseBlocks.tsx` (novo)
- `scripts/check-technical-cases.mjs` (novo)
- `docs/coleta-casos-tecnicos-reais.md` (novo)
- `src/components/servico/ServicoLandingLayout.tsx`
- `src/pages/SegurancaDosDados.tsx`
- `scripts/curated-static-body.mjs`
- `package.json`

## 12. Gates

| Gate | Resultado | Evidência |
| --- | --- | --- |
| build | PASS | 50 rotas curadas, 157 artigos (5 indexáveis) |
| check:seo | PASS | title/desc/h1 OK |
| check:seo:curated | PASS | 50 rotas curadas |
| check:cannibalization | PASS | exit 0 |
| check:internal-links | PASS | exit 0 |
| check:sitemap-source | PASS | exit 0 |
| check:editorial-governance | PASS | exit 0 |
| check:jsonld-parity | PASS | exit 0 |
| check:trust-claims | PASS | exit 0 |
| check:soft404 | PASS | 219 verificações |
| check:technical-cases | PASS | 0 casos publicáveis |
| vitest | PASS | 9 arquivos / 73 testes |

## 13. Navegador

`npm run test:cutover-browser` → APTO (console 0 erros, rede 0 falhas, triagem OK).
Ressalva pré-existente e fora do escopo: soft-404 da borda responde 200 em
`/rota-inexistente-cutover-gate`.

## 14. Git final

`git status --short` e `git diff --stat` sem saída.

## 15. Decisão

RODADA 3G APROVADA

## 16. Próximo passo

Iniciar a coleta operacional de pelo menos três atendimentos reais completos antes
de considerar a criação de qualquer rota pública de casos técnicos.
