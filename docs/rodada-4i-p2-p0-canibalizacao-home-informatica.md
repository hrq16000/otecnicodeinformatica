# RODADA 4I-P.2 — Microcorreção P0 de canibalização (home × /tecnico-informatica-curitiba)

## 1. HEAD
- Commit de entrada: `6aca93c062aea7d5f60883aa8cda923364fce986`
- Working tree: limpo antes da alteração
- Escopo: exclusivamente o par `/` × `/tecnico-informatica-curitiba`

## 2. Reprodução
```
npm run check:cannibalization
BLOQUEADO — canibalização interna detectada:
  ✗ home × /tecnico-informatica-curitiba com title equivalente (0.60 > 0.50)
```
- pair: `/` × `/tecnico-informatica-curitiba`
- title A: "Técnico em Curitiba | PC, Notebook, Wi-Fi e Empresas"
- title B: "Técnico de Informática em Curitiba | PC e Notebook"
- similarity: 0.60 (Jaccard de tokens)
- threshold: 0.50 (regra específica home × landing local)
- blocking reason: title equivalente entre entidade e vertical

## 3. Contrato da home
Intenção factual: **MARCA / PORTAL LOCAL DE ASSISTÊNCIA TÉCNICA EM CURITIBA**.
A home é roteadora (PF×PJ), com hub de serviços, fluxo de atendimento, provas e regiões.
Não é landing de informática.

## 4. Contrato da landing
`/tecnico-informatica-curitiba`: **SERVIÇO LOCAL DE INFORMÁTICA** (notebook, PC,
formatação, SSD, vírus, recuperação de dados, Wi-Fi, suporte a pequenos negócios).
Permanece inalterada.

## 5. Causa
Tokens compartilhados nos titles:
- `tecnico` — MARCA
- `curitiba` — LOCALIDADE
- `notebook` / `pc` — SERVIÇO (vertical de informática)

O title da home listava verticais de informática (PC, Notebook), assumindo intenção
que pertence à landing. A sobreposição era de SERVIÇO, não de marca ou localidade.

## 6. Decisão
Alterar **apenas a home** — era o lado menos aderente à sua função arquitetural
(entidade/portal descrito como lista de verticais). A landing já cumpria seu contrato.
Nenhuma alteração de threshold, exceção hardcoded ou reescrita de corpo.

## 7. Antes
- title: `Técnico em Curitiba | PC, Notebook, Wi-Fi e Empresas`
- description: `Diagnóstico, manutenção e suporte para computadores, notebooks, redes e empresas em Curitiba. Escolha o serviço e continue pelo WhatsApp.`

## 8. Depois
- title: `Técnico em Curitiba | Assistência Técnica e Suporte Local` (57 chars)
- description: `Assistência técnica em Curitiba com diagnóstico honesto: atendimento a domicílio, remoto ou com coleta. Escolha o serviço e continue pelo WhatsApp.` (147 chars)

Description ajustada apenas para manter paridade semântica com o novo title
(amplitude da operação, sem listar verticais). Sem termos proibidos.

## 9. GSC
Não há evidência isolada, na janela usada pelo projeto, de ambas as URLs disputando a
mesma query com volume relevante. Registro:
**P0 É PREVENTIVO/ESTRUTURAL DO GATE, NÃO CANIBALIZAÇÃO COMERCIAL COMPROVADA.**
A correção do contrato semântico segue válida.

## 10. Cannibalization gate
`npm run check:cannibalization` → **PASS**
`✓ Nenhuma canibalização entre as páginas comerciais P0.`
Avisos remanescentes (informativos, fora do escopo): description 0.50 entre
`/servicos/suporte-tecnico-empresarial` e `/empresa-de-ti-curitiba`; title 0.60 entre
`/atendimento-domicilio` e `/atendimento-remoto`.

## 11. Meta uniqueness
`npm run check:meta-uniqueness` → **PASS** (235 rotas programáticas únicas e dentro dos limites).

## 12. Build
`npm run build` → **PASS**, incluindo postbuild:
seo-basics (dist e 57 rotas curadas), jsonld-references, soft-404 (241 verificações),
route-manifest, image sitemap.

## 13. Demais gates
- `check:internal-links` → PASS (361 destinos internos, nenhum link quebrado)
- `check:sitemap-source` → PASS
- soft-404 → PASS

## 14. Check copy
- ANTES: 1 ocorrência — `src/pages/AssistenciaTecnicaCuritiba.tsx:335` (`orcamento`)
- DEPOIS: 1 ocorrência — idêntica
Nenhuma nova violação introduzida. Dívida histórica mantida (vertical congelada).

## 15. HTML inicial
Home (`dist/index.html`):
- title: Técnico em Curitiba | Assistência Técnica e Suporte Local
- description: assistência técnica ampla em Curitiba
- canonical: `https://tecnico.curitiba.br/` (self)
- robots: index, follow
- H1: "Técnico em Curitiba — Assistência Técnica e Suporte Local"

Landing (`dist/tecnico-informatica-curitiba/index.html`):
- title: Técnico de Informática em Curitiba | PC e Notebook
- canonical: `https://tecnico.curitiba.br/tecnico-informatica-curitiba` (self)
- robots: index, follow
- H1: "Técnico de Informática em Curitiba"

Intenções diferenciadas já no HTML inicial. Zero canonical cruzado, zero redirect.

## 16. Diff
3 arquivos, todos espelhos da mesma string de metadata da home:
- `index.html` (title, og:title, twitter:title, description, og/twitter description)
- `src/lib/siteConfig.ts` (`homeTitle`, `homeDescription`)
- `scripts/curated-routes-meta.mjs` (entrada `/`)

Justificativa: a metadata da home é replicada em três fontes (shell estático, runtime e
fonte curada de prerender/gates). Alterar menos arquivos causaria divergência de gate.

## 17. Congelamento
- `/assistencia-tecnica-curitiba` — 0 alterações
- TV / Placas / Monitor — 0
- Cidades / bairros / B2B / artigos — 0
- Funil / triagem / tracking / banco / telemetria — 0
- Schema / redirects / preços / políticas — 0

## 18. P0
**P0 DE CANIBALIZAÇÃO ESTRUTURAL ENCERRADO.**

## 19. P1
- `check:copy`: ocorrência de "orçamento" em `AssistenciaTecnicaCuritiba.tsx` (pré-existente, vertical congelada).

## 20. P2
- Avisos de proximidade `/atendimento-domicilio` × `/atendimento-remoto` (0.60 em title, abaixo do bloqueio) e descriptions PJ (0.50) — monitorar, não corrigir agora.

## Próximo passo
SEO interno recongelado. Retornar à 4I-M (GBP, fotos reais, citations).
