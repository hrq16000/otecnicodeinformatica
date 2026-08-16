# Micro-rodada Qualidade 1 — dívida dos gates legados + lacuna de schema

## 1. Gates migrados para o stack SSR/TanStack Start

| Gate | Antes | Depois |
| --- | --- | --- |
| `check:internal-links` | 775 falsos positivos (lia `App.tsx` inexistente) | 441 rotas derivadas de `src/routes/**`, 161 URLs de sitemap, 0 erro |
| `check:orphan-pages` | ruído de componentes sem rota | montagem resolvida via `legacyRouteElements.tsx`; 8 skips informativos, 0 defeito |
| `check:malha-interna` | reciprocidade cega quebrada | arestas dirigidas semânticas (2 mútuas + 2 dirigidas), 16 páginas OK |

Fonte única nova: `scripts/lib/tanstack-routes.mjs` (padrões de rota a partir do nome do arquivo,
segmentos dinâmicos `$`, layouts `_`, assets e rotas privadas classificados — não viram "link quebrado").

Testes de regressão: `src/__tests__/gates-tanstack-routes.test.ts` (inclui caso negativo — rota
inexistente não pode ser reconhecida).

## 2. Lacuna estrutural de schema (causa-raiz)

O blog injetava JSON-LD por `useEffect` no `document` → invisível no HTML servido. Além disso o
`JsonLdSsrSink` só era renderizado dentro do `PageSEO`, que fica **antes** dos demais componentes na
árvore: tudo que registrava slot depois (Organization, WebSite, LocalBusiness, Service, FAQ) ficava
fora do HTML do SSR.

Correções:

- `src/pages/BlogPost.tsx`: schemas construídos no render e registrados via `useJsonLdSlot`
  (`article` quando aprovado no registro editorial, `web-page` quando rascunho — fail-closed mantido).
- `src/routes/__root.tsx`: **sink único do site** depois do `<Outlet />`, com `InstitutionalJsonLd`
  movido para dentro do provider do coletor. Sinks locais removidos (evita nó duplicado por slot).
- `src/components/PageSEO.tsx`: `isPartOf` virou referência pura `{ "@id": … }` (antes redefinia
  `#website`).
- `src/pages/ColetaEntrega.tsx`: `provider` apontava para `#localbusiness` inexistente na rota → `#organization`.
- `src/pages/servico-bairro/ServicoBairroTemplate.tsx` e as 5 páginas de cidade herdadas:
  removida a redefinição local de `LocalBusiness` (mesmo `@id` do nó global / sem `address`).

## 3. Resultado dos gates

```
check:internal-links      ✔ 0 link quebrado
check:orphan-pages        ✔ 0 órfão
check:malha-interna       ✔ 16 páginas
check:jsonld-references   ✔ 109 rotas curadas (era 197 falhas)
check:schema-standards    ✔ 347 nós em 154 páginas (era 11 duplicidades)
check:rich-results        ✔ 0 erro (era 5)
```

Nenhum threshold foi afrouxado e nenhuma exceção por pathname foi adicionada.
