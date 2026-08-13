# Rodada 5 — SEO LOCAL: plano, clusters iniciais e checklist anticanibalização

Projeto: O Técnico de Informática · Operação: Curitiba, São José dos Pinhais e RMC.
Este documento é o plano da rodada. **Nenhuma página nova deve ser gerada antes de o
checklist da seção 7 passar integralmente.**

## 1. Inventário local (estado medido em 13/08/2026)

| Família | Rotas existentes | Indexáveis hoje | No sitemap |
|---|---|---|---|
| `/tecnico-informatica-<cidade>` | 11 | 6 | 6 |
| `/bairros/<bairro>` | 222 arquivos de página | 5 | 5 |
| `/servicos/:servico` | 86 rotas de serviço | conforme manifesto curado | sim |
| `/servicos/:servico/:local` (serviço × bairro/cidade) | 11 combinações auditadas | 11 | 11 |
| `/assistencia-tecnica-curitiba`, `/empresa-de-ti-curitiba` | 2 | 2 | 2 |
| `/arrumar-pc/:cidade` (nacional herdado) | 8 | 0 | 0 |
| `/cftv/*` (vertical adjacente) | 8 | classificada à parte | fora do cluster de informática |
| Total de rotas estáticas declaradas | 422 | 115 no manifesto curado | 115 |

Fonte da classificação: `scripts/lib/local-inventory.mjs` (L1–L6) e
`npm run report:local-inventory`.

## 2. Classificação por família e intenção

| Família | Camada | Intenção primária |
|---|---|---|
| `/` | HOME | marca + região + visão geral da operação |
| `/tecnico-informatica-curitiba` | CIDADE | assistência de informática na cidade |
| `/bairros/<b>` | BAIRRO | atendimento de informática naquele bairro |
| `/servicos/<s>` | SERVIÇO | entender/contratar o serviço (nacional-agnóstico) |
| `/servicos/<s>/<cidade>` | SERVIÇO + CIDADE | aquele serviço naquela cidade |
| `/servicos/<s>/<bairro>` | SERVIÇO + BAIRRO | só quando houver intenção local própria comprovada |
| `/assistencia-tecnica-curitiba`, `/empresa-de-ti-curitiba` | INSTITUCIONAL LOCAL | oferta comercial regional (PF/PJ) |
| `/arrumar-pc/:cidade` | OUTRA (legado nacional) | sem operação real → NOINDEX permanente |
| `/cftv/*` | OUTRA (vertical adjacente) | não entra no cluster local de informática |

## 3. Estado por cidade

| Cidade | Página | Conteúdo próprio | Operação real | Alvo |
|---|---|---|---|---|
| Curitiba | sim (1077 palavras) | sim | sim | indexar (L1) |
| São José dos Pinhais | sim (942) | sim | sim | indexar (L1) |
| Pinhais | sim (894) | sim | sim | indexar (L2) |
| Colombo | sim (944) | sim | sim | indexar (L2) |
| Araucária | sim (931) | sim | sim | indexar (L2) |
| Campo Largo | sim (912) | sim | sim | indexar (L2) |
| Fazenda Rio Grande, Almirante Tamandaré, Piraquara, Campo Magro, Quatro Barras | sim, mas rasas (118–122 palavras) | não | não declarada | noindex (L3) |

## 4. Estado por bairro

- 222 arquivos de página de bairro existem no código; **apenas 5 são indexáveis**
  (CIC, Batel, Água Verde, Centro, Portão), todos com 899–981 palavras de conteúdo próprio.
- Os demais permanecem `noindex, follow`, fora do sitemap, conforme a política de poda.
- Similaridade máxima entre as locais indexáveis: **0,103** — sem clone programático.

## 5. Conflitos conhecidos a decidir na rodada

| URL A | URL B | Sobreposição | Encaminhamento proposto |
|---|---|---|---|
| `/` | `/tecnico-informatica-curitiba` | intenção parcialmente distinta | auditar conteúdo real antes de decidir; hipótese: Home = marca/região, Curitiba = landing local profunda |
| `/assistencia-tecnica-curitiba` | `/tecnico-informatica-curitiba` | alta (mesma cidade, mesma oferta) | decidir MANTER com intenções separadas (genérica vs. informática) ou CONSOLIDAR |
| `/servicos/suporte-tecnico-empresarial` | `/empresa-de-ti-curitiba` | description 0,50 | reescrever metadata (P2 herdado da 4C) |
| `/atendimento-domicilio` | `/atendimento-remoto` | title 0,60 | reescrever titles (P2 herdado da 4C) |
| `/servicos/<s>` | `/servicos/<s>/curitiba` | risco estrutural | serviço global explica o serviço; local responde logística/cobertura/CTA local |

## 6. Política central de indexabilidade local

Fonte única a criar: **`src/lib/localIndexPolicy.ts`**, consolidando o que hoje está espalhado
entre `scripts/lib/local-inventory.mjs`, `bairrosData.ts` e `cidadesData.ts`:

```ts
type LocalEntity = {
  type: "HOME" | "CIDADE" | "BAIRRO" | "SERVICO" | "SERVICO_CIDADE" | "SERVICO_BAIRRO" | "INSTITUCIONAL" | "OUTRA";
  slug: string;
  parent?: string;          // bairro → cidade; serviço × cidade → serviço
  indexable: boolean;
  canonical: string;        // self quando indexável
  sitemap: boolean;         // nunca true quando indexable === false
  services?: string[];
};
```

Regra de ouro: `indexable === false` ⇒ `sitemap === false`. Flags não se espalham por arquivo
de página; a página lê a política.

## 7. Checklist de validação anticanibalização (obrigatório antes de gerar página)

Uma URL local só é aprovada quando **todos** os itens são verdadeiros:

1. Intenção de busca própria, distinta da cidade-mãe e do serviço-pai.
2. Operação real declarada para a localidade (sem promover cidade por proximidade).
3. Conteúdo próprio ≥ 550 palavras no shell estático, escrito do zero (sem copy da matriz).
4. Jaccard (5-gramas do `<main>`) < 0,45 contra qualquer outra página local indexável.
5. Title e description únicos, dentro das janelas (25–70 / 70–165 caracteres).
6. H1 único, com a localidade mencionada **uma** vez; H2 sem repetição de localidade.
7. Canonical autorreferente; nenhuma página `noindex` no sitemap.
8. Breadcrumb coerente com a hierarquia real (Início → Áreas atendidas → Cidade → Bairro).
9. Schema sem `streetAddress` fictício; `areaServed` real; `Offer` só com preço verdadeiro.
10. Interlinks apontando exclusivamente para URLs canônicas, sem link farm no rodapé.
11. FAQ local verdadeira (cobertura, coleta, atendimento no endereço) — sem pergunta inventada.
12. Nenhum fato hiperlocal fabricado (tempo de deslocamento, técnico do bairro, avaliação local).

## 8. Gates a criar

| Gate | O que valida |
|---|---|
| `check:local-index-policy` | index/noindex, canonical, sitemap, parent e família coerentes com a fonte única |
| `check:local-canonical` | indexável = self-canonical; noindex fora do sitemap; bairro não canonicaliza para bairro errado |
| `check:local-originality` | duplicação exata, similaridade excessiva, metadata e FAQ repetidas |
| `check:local-links` | todo link local aponta para URL canônica existente |
| `check:local-route-validity` | nenhuma rota gerada referencia cidade/serviço inexistente |

Relatórios: `reports/local-intent-overlap.md` e `reports/local-index-policy.md`.

## 9. Lote Local 1 proposto (12 URLs)

Selecionado por intenção forte, operação real e baixa canibalização:

- **Cidades (2):** `/tecnico-informatica-curitiba`, `/tecnico-informatica-sao-jose-pinhais`
- **Bairros (5):** `/bairros/centro`, `/bairros/batel`, `/bairros/agua-verde`, `/bairros/cic`, `/bairros/portao`
- **Serviço × cidade (5):** manutenção de notebook, manutenção de computador, formatação,
  remoção de vírus e recuperação de dados — todos em Curitiba

Nenhuma cidade L3, nenhuma rota `/arrumar-pc/:cidade` e nenhuma vertical adjacente entram no lote.

## 10. Sequência de execução da rodada

1. Inventário completo em `reports/local-index-policy.md` (todas as famílias, sem presumir lista).
2. Matriz de overlaps em `reports/local-intent-overlap.md`.
3. Criar `src/lib/localIndexPolicy.ts` e apontar sitemap/robots/páginas para ela.
4. Decidir Home × Curitiba e Curitiba × assistência-técnica com base no conteúdo real.
5. Reescrever 100% do Lote Local 1.
6. Criar os 5 gates e ligá-los ao `postbuild` e ao CI.
7. Rodar suíte completa + Lighthouse (CLS/LCP não podem regredir).
8. Só então avaliar o Lote Local 2.

## 11. Não fazer nesta rodada

Reescrever centenas de bairros · gerar serviço × bairro em massa · nacionalizar o portal ·
inventar endereço, técnico local, avaliação por bairro ou tempo de deslocamento ·
mudar slugs em massa · liberar dataset inteiro para indexação ·
usar `robots.txt` para resolver duplicação.
