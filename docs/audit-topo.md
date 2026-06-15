# Auditoria do Topo — Header fixo + TopOfferBanner

> Documento vivo. Atualizar a cada mudança nos componentes `Header`, `TopOfferBanner`, `PageTransition` ou nos tokens `--site-header-height` / `--top-offer-height` / `--z-*`.

## 1. Resumo executivo

| Item | Status |
| --- | --- |
| Header `position: fixed` íntegro em todos os viewports | ✅ |
| TopOfferBanner sem sobrepor o header | ✅ |
| Spacer dinâmico (`header + banner`) empurrando o `<main>` | ✅ |
| `PageTransition` sem `transform/filter` no wrapper (não quebra `fixed`) | ✅ |
| Tokens de stacking centralizados (`--z-*`) | ✅ |
| Tokens de altura centralizados (`--site-header-height`, `--top-offer-height`) | ✅ |
| Testes Playwright de scroll + regressão visual | ✅ |

## 2. Mapa de stacking (z-index tokens)

Definidos em `src/index.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `--z-top-offer` | 60 | `TopOfferBanner` |
| `--z-header` | 70 | `Header` |
| `--z-mobile-drawer` | 80 | Drawer mobile do header |
| `--z-modal` | 90 | Dialogs do shadcn (referência — Radix gerencia internamente) |
| `--z-page-wipe` | 100 | Overlay de transição de página |
| `--z-toast` | 110 | Toasters (sonner / radix) |

Regra: nunca usar `z-[n]` hardcoded em chrome fixo. Sempre referenciar via `style={{ zIndex: "var(--z-*)" }}`.

## 3. Achados da varredura estática

| # | Arquivo | Problema | Severidade | Ação |
| --- | --- | --- | --- | --- |
| 1 | `src/components/PageTransition.tsx` | Histórico de uso de `transform`/`filter` no wrapper raiz quebrava `position: fixed` do header | Resolvido | Animação migrada para `opacity` puro |
| 2 | `src/components/Header.tsx` | `z-[70]` literal | Resolvido | Substituído por `var(--z-header)` |
| 3 | `src/components/Header.tsx` | Drawer mobile com `z-40` (menor que o banner z=60) podia ficar atrás | Resolvido | `var(--z-mobile-drawer)` = 80 |
| 4 | `src/components/TopOfferBanner.tsx` | `z-[60]` literal | Resolvido | `var(--z-top-offer)` |
| 5 | `src/components/PageTransition.tsx` | `z-[100]` literal | Resolvido | `var(--z-page-wipe)` |
| 6 | `src/pages/Blog.tsx:675` | Barra sticky com `z-30` (ok, fica abaixo do header) | OK | Sem ação |
| 7 | `body { overflow: hidden }` aplicado quando drawer abre | Esperado | OK | Header fixo continua ancorado ao viewport |

## 4. Checklist de prevenção (PRs futuros)

- [ ] Nunca aplicar `transform`, `filter`, `perspective`, `backdrop-filter` ou `will-change: transform` em `#root`, `<body>`, `<main>` ou ancestrais diretos do `Header`. Isso cria *containing block* novo e quebra `position: fixed`.
- [ ] Nunca usar classes `z-[NN]`/`z-50/40/30` em componentes de chrome fixo. Sempre tokens `var(--z-*)`.
- [ ] Spacer abaixo do `TopOfferBanner` deve ser sempre `calc(var(--site-header-height) + var(--top-offer-height))`.
- [ ] Animações de transição de rota apenas com `opacity`/`clip-path`. Sem `transform` no wrapper raiz.
- [ ] Ao mudar altura do header em breakpoints, ajustar apenas `--site-header-height` em `src/index.css` — nada nos componentes.
- [ ] Após qualquer mudança em `Header`/`TopOfferBanner`/`PageTransition`, rodar `npm run test:e2e` (header-fixed + visual-top).

## 5. Tokens de altura (responsivo)

```css
:root { --site-header-height: 56px; --top-offer-height: 42px; }
@media (min-width: 640px) { :root { --site-header-height: 60px; --top-offer-height: 40px; } }
@media (min-width: 768px) { :root { --site-header-height: 64px; } }
```

## 6. Cobertura de testes

- `e2e/header-fixed.spec.ts` — 4 viewports × scroll de 1500px, valida `position: fixed`, ausência de overlap, ancoragem do banner.
- `e2e/visual-top.spec.ts` — 4 viewports × snapshot da região do topo (`clip` calculado pelas CSS vars), tolerância 1% de diff.

Para gerar baseline na primeira execução:

```bash
npx playwright test e2e/visual-top.spec.ts --update-snapshots
```

## 7. Backlog priorizado

| Prioridade | Item |
| --- | --- |
| P2 | Migrar a sticky bar do `Blog.tsx` (`z-30`) para um token (`--z-section-sticky: 30`) por consistência. |
| P2 | Adicionar regra ESLint custom proibindo `className=".*z-\[.*\]"` em arquivos sob `src/components/` (chrome). |
| P3 | Considerar `@container` para o banner colapsar texto longo em telas <360px. |
