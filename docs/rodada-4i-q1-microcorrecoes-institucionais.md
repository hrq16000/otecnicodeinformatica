# RODADA 4I-Q.1 — Microcorreções institucionais (`<main>` em /servicos + moldura de preço em /contato)

Escopo executado: exatamente os 2 P1 institucionais aprovados pela auditoria 4I-Q.
Zero home, zero funil, zero verticais congeladas.

## 1. HEAD inicial
- HEAD no início da rodada: `f36d0e55afa1d92b85e6c6facbc21e56df6fb4f8`
- Branch: `edit/edt-ec600ae1-0eaf-43d5-a7d6-56dddc932216`

## 2. Git inicial
`git status --short` vazio, `git diff --stat` vazio — working tree limpo e compreendido.
As duas alterações desta rodada foram aplicadas sobre esse HEAD (commit de aplicação `f36d0e5`, ajuste de vocabulário posterior).

## 3. Reprodução /servicos
Auditoria 4I-Q registrou `document.querySelector('main') === null` em `/servicos`.
Inspeção do código-fonte confirmou: `src/pages/Servicos.tsx` tinha `Header` → `Breadcrumbs` → `sections` → `Footer`
dentro de um `<div className="min-h-screen bg-background">`, **sem landmark principal**.
P1 REPRODUZIDO.

## 4. Alteração /servicos
Único arquivo: `src/pages/Servicos.tsx` (+2 linhas).
- Abertura `<main id="conteudo">` imediatamente após `<Breadcrumbs />`.
- Fechamento `</main>` imediatamente antes de `<Footer />`.

Preservados sem qualquer mudança: classes, spacing, ids das seções, layout, animações,
cards, ícones, CTAs, links, copy, H1, metadata e interlinking.
Header, breadcrumbs globais e footer permanecem **fora** do `<main>`.

## 5. Landmark final
Verificação via Playwright (dev server local), duas viewports:

| viewport | `document.querySelectorAll('main').length` | `h1` | header/footer dentro de main |
|---|---|---|---|
| 390×844 | 1 | 1 | não |
| 1440×900 | 1 | 1 | não |

Sem landmark aninhado, sem landmark duplicado, H1 único preservado, tab order inalterado
(nenhum elemento focável foi movido, apenas o wrapper semântico foi introduzido).

## 6. Reprodução /contato
Estado anterior:
- title: `Contato Técnico Curitiba | WhatsApp Hoje R$ 99,99`
- H1 (2ª linha): `WhatsApp hoje · R$ 99,99`
- description: já continha `a partir de R$ 99,99` (coerente, não alterada)

Title e H1 apresentavam `R$ 99,99` **sem** `a partir de`, sugerindo preço universal fixo.
P1 REPRODUZIDO.

## 7. Contrato comercial anterior
`/contato` = "R$ 99,99" fixo na moldura principal → divergente da fonte canônica
`/precos-e-politicas` e da Home, que usam faixa de entrada.

## 8. Contrato comercial final
- title: `Contato Técnico Curitiba | Atendimento a partir de R$ 99,99` (59 caracteres)
- H1 (2ª linha): `WhatsApp hoje · a partir de R$ 99,99`
- description: inalterada (já correta)

Arquivos: `src/pages/Contato.tsx` e `scripts/curated-routes-meta.mjs` (espelho curado obrigatório
para paridade HTML servido × DOM hidratado).

Nota de conformidade: uma primeira formulação (`WhatsApp e Orçamento`) foi rejeitada pelo gate
`check:copy` por usar termo fora do vocabulário oficial. Corrigida na própria rodada, sem alterar
a regra do gate.

## 9. Política de preço
Valor numérico **não** alterado: continua `R$ 99,99`.
Não houve conversão de "taxa de diagnóstico" em "preço universal": a moldura passou a explicitar
o piso, alinhada a `/precos-e-politicas` e à Home.
`rg -n "R\$ ?99[,.]99" src` → 478 ocorrências no projeto; nenhuma outra foi tocada.
Registradas como **FORA DE ESCOPO** desta rodada.

## 10. Home
`git diff -- src | rg "Index|home|Cookie|Consent"` → **0 ocorrências**. Home integralmente congelada.

## 11. TV / placas / monitor
`git diff -- src | rg "conserto-tv|conserto-placa|conserto-monitor"` → **0 ocorrências**.
Verticais congeladas intactas, direta e indiretamente.

## 12. Funil / tracking / banco
`git diff -- src scripts | rg "WhatsAppFunnel|funnelAnalytics|triage|tracking|click_events"`
→ 1 ocorrência, exclusivamente em **linha de contexto de hunk** do `src/index.css`
(`body[data-triage-open="1"]`), sem alteração de conteúdo.
Zero diff em funil, triagem, CTAs, tracking, telemetria, migrações e banco.

## 13. check:copy
- 1ª execução após a alteração: **FAIL** (termo proibido no novo title de /contato) → regressão detectada e corrigida na mesma rodada.
- Execução final: **1 violação remanescente**, pré-existente e fora do escopo:
  `src/pages/AssistenciaTecnicaCuritiba.tsx:335` (commit `d4fc71ea`, arquivo não tocado nesta rodada
  e pertencente ao SEO de informática congelado).
- Conclusão: **nenhuma regressão de copy introduzida pela 4I-Q.1**. A violação pré-existente vira dívida P1 para rodada própria.

## 14. Cannibalization
`check:cannibalization` → **PASS** (19 páginas P0). Avisos mantidos, sem bloqueio:
- description 0.50 entre `/servicos/suporte-tecnico-empresarial` e `/empresa-de-ti-curitiba`
- title 0.60 entre `/atendimento-domicilio` e `/atendimento-remoto`
Nenhuma exceção criada, threshold intocado.

## 15. Meta uniqueness
`check:meta-uniqueness` → **PASS** — 235 rotas programáticas com title/description únicos e dentro dos limites.

## 16. Internal links
`check:internal-links` → **PASS** — 392 rotas estáticas, 11 dinâmicas, 72 URLs de sitemap,
361 destinos internos únicos, **0 links quebrados**.

## 17. Sitemap
`check:sitemap-source` → **PASS** — 66 URLs indexáveis, 6 sub-sitemaps, 11 combinações serviço × bairro,
sem noindex, alias ou redirect.

## 18. Build / postbuild
`npm run build` → **PASS**, incluindo gates automáticos:
- `seo-check dist/index.html` OK
- `seo-check curated` — 57 rotas OK (H1 único, canonical self, robots, JSON-LD estático)
- `jsonld-refs` — 57 rotas OK
- route-manifest — 1061 rotas exatas, 39 redirects, 326 páginas estáticas
- soft-404 — 241 verificações OK
- image sitemap — 66 páginas / 124 imagens OK

## 19. Paridade
`/servicos` e `/contato`: title, description, canonical, robots e H1 do HTML servido conferem com o DOM
hidratado (title de /contato espelhado em `curated-routes-meta.mjs`, validado por `seo-check curated`).
MESMA INTENÇÃO nos dois lados.

## 20. Mobile / desktop
| rota | 390×844 | 1440×900 |
|---|---|---|
| /servicos | 1 `<main>`, H1 único, layout idêntico | idem |
| /contato | title/H1 corretos, CTA intacto, sem overflow horizontal | idem |

Zero mudança visual intencional em `/servicos`; em `/contato` a única mudança visível é o prefixo
"a partir de" na segunda linha do H1.

## 21. Arquivos alterados
- `src/pages/Servicos.tsx` (+2)
- `src/pages/Contato.tsx` (title, PageSEO, H1)
- `scripts/curated-routes-meta.mjs` (title espelhado de /contato)

Fora do pacote 4I-Q.1, aplicado em demanda anterior do usuário na mesma sessão e registrado aqui por transparência:
`src/index.css` (cor própria da barra de rolagem) — puramente cosmético, sem impacto em SEO, funil ou telemetria.

## 22. Git final
Working tree consistente, sem alterações pendentes fora dos arquivos acima.

## 23. P0
Nenhum.

## 24. P1 (dívida, não implementada nesta rodada)
- Prova operacional na Home — depende da 4I-M (GBP, fotos reais).
- `check:copy`: termo proibido pré-existente em `src/pages/AssistenciaTecnicaCuritiba.tsx:335`.

## 25. P2 (registrados, não corrigidos)
- Banner de cookies ocupando ~40% da dobra mobile na Home.
- Claims residuais: "atendimento imediato", "solução nº 1".
- Entrada por problema e garantia na dobra.
- Proximidade de metadata: `/atendimento-domicilio` × `/atendimento-remoto` (title 0.60) e descriptions PJ (0.50).

## DECISÃO
**CAMADA INSTITUCIONAL CORRIGIDA — 4I-Q.1 APROVADA**

## Próximo passo
Camada institucional recongelada. Não abrir 4I-Q.2.
A prioridade volta integralmente à execução humana da 4I-M: GBP, fotos reais e citations.
