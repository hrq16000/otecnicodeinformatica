---
name: SEO local programático (Rodada 2C)
description: Inventário L1–L6 das URLs locais, regra de indexação Curitiba/RMC e gates check:local-seo-quality e check:programmatic-similarity
type: feature
---

# SEO local — Rodada 2C

## Fonte única
`scripts/lib/local-inventory.mjs` classifica toda URL local:
L1 principal · L2 complementar · L3 potencial · L4 redundante · L5 doorway · L6 legado.
**Só L1 e L2 podem ser indexáveis e entrar no sitemap.**

- L1: `/tecnico-informatica-curitiba`, `/tecnico-informatica-sao-jose-pinhais`
- L2: Pinhais, Colombo, Araucária, Campo Largo + bairros CIC, Batel, Água Verde, Centro, Portão
- L3 (noindex): Fazenda Rio Grande, Almirante Tamandaré, Piraquara, Campo Magro, Quatro Barras
- L6 (noindex): cluster nacional `/arrumar-pc` — fora da região prioritária
- L5 (noindex): `/servicos/:servico/:local` programático

## Gates
- `npm run check:local-seo-quality` — title, description, H1 único, canonical self-referente,
  piso de conteúdo no shell estático, coerência sitemap × noindex, canonical fora do domínio,
  e proibição de `streetAddress`/múltiplos `LocalBusiness` (nenhuma filial fictícia).
- `npm run check:programmatic-similarity` — Jaccard sobre 5-gramas do `<main>` (sem header/footer/nav).
  ≥0,80 falha o build; ≥0,70 avisa. Allowlist documentada no inventário.
- `npm run report:local-inventory` — tabela Rota/Tipo/Indexável/Sitemap/Conteúdo/Classe.

## Paridade estática (fechamento 2C)
`scripts/lib/bairro-static.mjs` e `scripts/lib/cidade-static.mjs` leem `src/lib/bairrosData.ts`
e `src/lib/cidadesData.ts` e injetam os mesmos blocos e FAQ locais no HTML pré-renderizado,
via `scripts/curated-routes-meta.mjs`. Sem texto novo: é espelho do que o React já mostra.
Efeito no shell: cidades 554–721 palavras, bairros 559–595; similaridade estática caiu de
0,716 para 0,182 e todas as 11 rotas locais indexáveis passaram a "conteúdo próprio".

## Notas de medição
Medição renderizada em 06/2026: Curitiba 1578 palavras, cidades 671–741, bairros 538–586;
similaridade renderizada máxima 0,351. O gate estático usa piso de 100 palavras no shell.

## Regras invioláveis
- Nunca declarar endereço de rua, unidade ou filial por bairro/cidade.
- Nunca criar página local sem contexto próprio (rotas existem, mas ficam noindex).
- Nenhuma URL existente foi removida — apenas retirada do índice/sitemap quando não qualificada.
