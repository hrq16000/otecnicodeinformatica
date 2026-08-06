# Relatório final — RODADA 3B (+3B.1)

Data: 06/08/2026 · Domínio: https://tecnico.curitiba.br
Escopo: conteúdo, interlinking, paridade estática e cluster de sintoma.
Fora de escopo: infraestrutura, borda Cloudflare, tracking, backend.

---

## 1. Entregas por URL

| URL | Situação | Palavras no HTML servido | Indexável |
| --- | --- | --- | --- |
| `/servicos/manutencao-de-notebook` | aprofundada | 907 | sim |
| `/servicos/manutencao-de-computador` | aprofundada | 846 | sim |
| `/servicos/formatacao` | aprofundada | 856 | sim |
| `/como-funciona` | aprofundada | 509 | sim |
| `/problemas/notebook-nao-liga` | **nova** | 808 | sim |
| `/problemas/computador-lento` | **nova** | 830 | sim |

Medição feita sobre o HTML servido (pior caso para rastreamento). O DOM
hidratado é maior em todas elas. Antes da rodada, as páginas de serviço
entregavam menos de 130 palavras no HTML inicial.

---

## 2. Gates executados

| Gate | Resultado |
| --- | --- |
| `build` + `postbuild` | ✅ 46 rotas curadas, 313 páginas estáticas |
| `seo-check curated` | ✅ H1 único, canonical self, robots, links internos |
| `check:jsonld-references` | ✅ Organization única, `@id` resolvidos |
| `validate:jsonld` | ✅ 472 blocos, 0 erros |
| `check:jsonld-parity` | ✅ 314 páginas · 86 FAQ · 12 ofertas · 16 LocalBusiness |
| `check:soft-404` | ✅ 216 verificações: 200/301/404 corretos |
| `check:sitemap-source` | ✅ 53 URLs em 6 sub-sitemaps, derivadas da fonte curada |
| `check:internal-links` | ✅ 341 destinos, 0 links quebrados |
| `check:cannibalization` (P0 e `--all`) | ✅ 12 páginas, 0 canibalizações |
| `check:editorial-cluster` | ✅ pilares e relacionados íntegros |
| `check:forbidden-copy` | ✅ 0 ocorrências |
| `check:trust-claims` | ✅ 0 claims não comprováveis |
| `check:recurring-language` | ✅ funil PJ limpo |
| `vitest` | ✅ 9 arquivos · 73 testes |

---

## 3. Regressões encontradas e corrigidas

| Regressão | Causa | Correção |
| --- | --- | --- |
| `check:forbidden-copy` com 6 ocorrências | uso de "orçamento" no conteúdo novo | substituído por "valor" nas 3 fontes |
| Colisão de identificador `ComputadorLento` | já existia `src/pages/servicos/ComputadorLento.tsx` (noindex) | novo componente importado como `ProblemaComputadorLento` no router legado |
| HTML servido raso (~130 palavras) nas páginas de serviço | corpo estático não renderizava blocos de conteúdo | `blocos` no gerador estático, lidos da fonte única |

Nenhuma URL foi removida, renomeada ou despublicada. A página herdada
`/servicos/computador-lento` permanece publicada como `noindex` (política de
SEO evolutivo), sem disputa com a nova rota de sintoma.

---

## 4. Auditoria de canibalização do cluster de sintoma

Similaridade Jaccard (limites do gate: title 0.70, description 0.60, corpo 0.60):

| Par | title | description | H1 | corpo |
| --- | --- | --- | --- | --- |
| `/problemas/notebook-nao-liga` × `/servicos/manutencao-de-notebook` | 0.57 | 0.10 | 0.09 | 0.41 |
| `/problemas/notebook-nao-liga` × `/servicos/formatacao` | 0.25 | 0.12 | 0.10 | 0.29 |
| `/problemas/computador-lento` × `/servicos/manutencao-de-computador` | 0.29 | 0.09 | 0.10 | 0.34 |
| `/problemas/computador-lento` × `/servicos/formatacao` | 0.13 | 0.07 | 0.00 | 0.36 |
| `/problemas/computador-lento` × `/servicos/upgrade-ssd-ram` | 0.11 | 0.06 | 0.00 | 0.37 |
| `/problemas/notebook-nao-liga` × `/problemas/computador-lento` | 0.10 | 0.11 | 0.00 | 0.40 |

Todos os pares abaixo do limite. A matriz de intenção
(`scripts/check-cannibalization.mjs`) passou a declarar as duas rotas de
sintoma como intenções próprias, explicitamente não concorrentes das páginas de
serviço. Divisão de papéis:

- **Sintoma** — intenção informacional ("por que está acontecendo"), com
  causas possíveis, verificações seguras e encaminhamento ao diagnóstico.
- **Serviço** — intenção comercial ("quem resolve"), com escopo, modalidades,
  componentes avaliados e garantia.

---

## 5. Arquivos alterados

| Arquivo | Alteração |
| --- | --- |
| `src/pages/problemas/NotebookNaoLiga.tsx` | nova página de sintoma |
| `src/pages/problemas/ComputadorLento.tsx` | nova página de sintoma |
| `src/lib/servicosCore.ts` | aprofundamento de notebook, computador e formatação; recuperação de dados nos relacionados |
| `src/pages/ComoFunciona.tsx` | bloco final de políticas + 8 links do cluster |
| `src/pages/Servicos.tsx` | entrada para as duas rotas de sintoma |
| `src/App.tsx`, `src/LegacyApp.tsx` | registro das rotas de sintoma |
| `scripts/lib/curated-urls.mjs` | cluster `PROBLEMAS` e `sitemap-problemas.xml` ativos |
| `scripts/curated-routes-meta.mjs` | metadados e blocos das rotas novas e de `/como-funciona` |
| `scripts/curated-static-body.mjs` | suporte a `blocos` no corpo estático |
| `scripts/lib/servico-blocos.mjs` | novo: espelha `blocoLocal` da fonte única |
| `scripts/lib/priority-faq.mjs` | FAQ das rotas de sintoma |
| `scripts/check-cannibalization.mjs` | matriz de intenção do cluster de sintoma |
| `docs/relatorio-rodada-3b.md`, `docs/relatorio-final-rodada-3b.md` | documentação |

---

## 6. Segunda onda editorial — plano

Critério de liberação: só avança depois de 21 a 28 dias de dados do Search
Console sobre a primeira onda (impressões, cliques, posição média e páginas
indexadas das 6 URLs acima), conforme a regra de mudanças com evidência.

| Ordem | URL | Tipo | Meta de palavras | Intenção dominante | Não concorre com |
| --- | --- | --- | --- | --- | --- |
| 1 | `/servicos/upgrade-ssd-ram` | aprofundar | 900 | instalação de SSD e upgrade de memória | `/problemas/computador-lento`, `/servicos/manutencao-de-computador` |
| 2 | `/servicos/recuperacao-de-dados` | aprofundar | 900 | preservação e recuperação de arquivos | `/servicos/formatacao` |
| 3 | `/precos-e-politicas` | aprofundar | 800 | condições comerciais, garantia e cancelamento | páginas de serviço |
| 4 | `/sobre` | aprofundar | 700 | E-E-A-T, responsabilidade técnica desde 1998 | `/gestor-responsavel` |
| 5 | `/problemas/pc-nao-liga` | nova | 800 | sintoma desktop sem energia | `/problemas/notebook-nao-liga` |
| 6 | `/problemas/tela-azul` | nova | 800 | sintoma de falha de sistema/memória | `/servicos/formatacao` |

Contrato por página (idêntico ao da primeira onda): H1 único, blocos espelhados
no HTML servido, FAQ real com paridade `FAQPage`, 4 a 6 links internos
contextuais, CTA de triagem por WhatsApp, vocabulário oficial (agendar,
solicitar atendimento, valor), zero preço ou prazo inventado, zero avaliação.

Gates obrigatórios antes de indexar cada URL: `check:cannibalization --all`,
`check:jsonld-parity`, `check:internal-links`, `check:forbidden-copy`,
`check:trust-claims`, `validate:jsonld`, `check:soft-404`.

Bloqueio explícito: nenhuma URL da segunda onda entra no sitemap sem que a
primeira onda esteja indexada e sem sinal de canibalização no Search Console
(mesma consulta trazendo alternância entre sintoma e serviço).
