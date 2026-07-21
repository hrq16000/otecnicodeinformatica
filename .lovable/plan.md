## Objetivo
Garantir que **todo** botão "WhatsApp Agora" da landing e das páginas `/problemas/*` passe pelo Funil V5 (ciência + aceite antes do WhatsApp), entregar a página `/obrigado` com mensagens por modalidade e enriquecer o SEO local das páginas de problema — mantendo a coerência com o resto do site (contato só via WhatsApp, sem `tel:`, sem AggregateRating inventado, /problemas/* ficam `noindex` por serem legadas).

## 1. Integrar Funil V5 nos CTAs "WhatsApp Agora"

**Landing das cidades — `src/components/cidade/CidadeLandingLayout.tsx`**
Trocar os dois `<a href={waHref}>` (hero e CTA final) por `<button>` que dispara `wa-funnel:open` com `detail.location` (`cidade_hero`, `cidade_final`) e `detail.presetContext` com `{ cidade, service: "cidade" }`. Mantém `data-cta-location` e `trackCTAClick` — a única diferença é que o WhatsApp só abre depois da triagem/aceite.

**Página `/problemas/:slug` — `src/pages/ProblemaPage.tsx`**
- `handleWhatsApp` deixa de chamar `window.open(wa.me/…)` diretamente.
- Passa a disparar `wa-funnel:open` com `detail.presetMessage = data.whatsappMessage` e `detail.location = "problema_" + data.slug`.
- Botões trocam `<a>` → `<button>` (todos os CTAs internos da página).

**Guarda automática (`scripts/check-cta-funnel.ts`)**
Já reforça que qualquer novo `wa.me` fora do funil quebra o build; nenhum ajuste necessário.

## 2. Página `/obrigado` (contexto pós-WhatsApp)

**Novos arquivos**
- `src/pages/Obrigado.tsx`
- Rota lazy em `src/App.tsx` (`/obrigado` → `Obrigado`) e entrada em `src/LegacyApp.tsx` (para navegação legada).

**Comportamento**
- Lê `sessionStorage['wa-funnel:last-triage']` (gravado pelo funil no `submit` — sem PII, apenas `{ modality, equipmentLabel, triageId, cidade? }`).
- Renderiza mensagem específica por modalidade (`remoto`, `visita`, `coleta`) com próximos passos, prazo e link único de reabrir o WhatsApp (via mesma preset).
- Se `sessionStorage` estiver vazio (usuário chegou por link direto), mostra mensagem genérica + CTA "Iniciar triagem" que abre o funil, **sem** reiniciar automaticamente.
- Uso de `document.title`, `meta description` e `canonical` via efeito (mesmo padrão de `Index.tsx`).
- Bloqueia indexação com `<meta name="robots" content="noindex,follow">` (não é página de conversão de busca).

**JSON-LD**
- `LocalBusiness` reutilizando `siteConfig` (sem AggregateRating — respeita regra de core).
- `FAQPage` com 3 perguntas úteis pós-envio ("Quando o técnico responde?", "Preciso preparar algo?", "Como acompanho o atendimento?").

**Ajuste no funil (`src/components/WhatsAppFunnel.tsx`)**
No `submit`, após `window.open` bem-sucedido, gravar em `sessionStorage` o contexto reduzido e navegar via `history.pushState` para `/obrigado` disparando `popstate` (mesmo mecanismo de InstantNavigation em `App.tsx`). A navegação para `/obrigado` **não** reabre o funil (ele só abre por evento explícito).

## 3. SEO local das páginas `/problemas/:slug`

Mantendo `noindex, follow` (respeita política de rotas legadas), reforçar:
- `<h1>` já traz o problema — adicionar variação com "em Curitiba" no `data.h1` quando faltar (via helper em `ProblemaPage`, sem editar dados).
- Adicionar `BreadcrumbList` (já existe) + bloco visível "Atendemos em Curitiba, região metropolitana e coleta em bairros como Batel, Centro, Água Verde, CIC e Portão" com links internos para as 5 páginas curadas de bairro e para `/tecnico-informatica-curitiba`.
- Substituir botão "Falar com Técnico Agora" pelo disparo do funil (item 1) — coerência de contato.
- `FAQPage` já existe: acrescentar 2 perguntas locais ("Vocês atendem em Curitiba?" / "Quanto tempo demora após o WhatsApp?").
- Adicionar `LocalBusiness` mínimo (mesmo padrão de `CidadeLandingLayout`), sem inventar rating.
- Guarda de conteúdo: se `data` não tiver campos essenciais, manter fallback.

## 4. Testes/validação

- Ajustar `e2e/whatsapp-funnel.spec.ts` para cobrir o novo CTA da cidade (clicar hero → modal do funil abre, WhatsApp não abre antes do aceite).
- Novo teste rápido: navegar até `/obrigado` sem contexto → mostra estado genérico; injetar contexto no `sessionStorage` → mostra bloco por modalidade.
- `bun run check:cta-funnel`, `bun run validate:jsonld` e `bunx vitest run` no final.

## Detalhes técnicos

```text
Fluxo pós-triagem:
  submit() -> gravar sessionStorage(wa-funnel:last-triage)
           -> window.open(wa.me)
           -> pushState('/obrigado') + popstate
           -> Obrigado.tsx lê sessionStorage e renderiza
```

Arquivos alterados/criados:
```
src/components/cidade/CidadeLandingLayout.tsx   (edit — trocar 2 CTAs)
src/pages/ProblemaPage.tsx                      (edit — CTAs + SEO local + JSON-LD)
src/components/WhatsAppFunnel.tsx               (edit — gravar contexto + push /obrigado)
src/pages/Obrigado.tsx                          (new)
src/App.tsx                                     (edit — routeImportMap /obrigado)
src/LegacyApp.tsx                               (edit — <Route path="/obrigado">)
e2e/whatsapp-funnel.spec.ts                     (edit — novo caso)
```

Sem mudanças de schema, sitemaps ou dados. Contato continua exclusivamente via WhatsApp; nenhum `tel:` introduzido; nenhuma AggregateRating inventada.
