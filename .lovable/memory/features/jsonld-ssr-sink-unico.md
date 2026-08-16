---
name: JSON-LD no SSR — sink único no __root
description: Regra de arquitetura para emissão de dados estruturados no HTML servido (slots + coletor + sink único) e gates que dependem dela
type: feature
---

- Todo JSON-LD é registrado **durante o render** via `useJsonLdSlot` (`src/lib/jsonLdSlots.ts`).
  Proibido injetar `<script type="application/ld+json">` por `useEffect`/DOM: fica invisível ao SSR.
- Existe **um único** `<JsonLdSsrSink />`, em `src/routes/__root.tsx`, depois do `<Outlet />` e dentro
  do `JsonLdCollectorContext.Provider`. `InstitutionalJsonLd` também fica dentro do provider.
  Nunca adicionar sinks em páginas/componentes: dois sinks duplicam o mesmo slot.
- Um `@id` é definido **uma vez** no documento. Em qualquer outro lugar use referência pura
  `{ "@id": "…" }` (sem `@type`/`name`), senão `check:jsonld-references` acusa "definido 2x".
- `LocalBusiness` institucional vem do slot global; páginas de serviço/bairro/cidade só referenciam
  o `@id`. Redefinir localmente quebra `check:schema-standards` e `check:rich-results`.
- Blog: schema de artigo é fail-closed pelo registro editorial — aprovado emite
  `BlogPosting/Article/TechArticle`; rascunho emite apenas `WebPage` + `BreadcrumbList`.
- Gates dependem de snapshot SSR: rodar `node scripts/snapshot-ssr.mjs dist http://localhost:8080`
  antes de `check:jsonld-references`, `check:schema-standards`, `check:rich-results`, `check:malha-interna`.
- Universo de rotas dos gates: `scripts/lib/tanstack-routes.mjs` (derivado de `src/routes/**`),
  nunca `App.tsx` (não existe mais).
