# Auditoria Global do Topo + Testes de Regressão

## Objetivo
Garantir que o Header fixo e o TopOfferBanner nunca se sobreponham, em nenhuma largura, e que regressões futuras sejam detectadas automaticamente.

---

## Fase 1 — Auditoria estática (sem mudar código)

Varredura no `src/` por padrões que quebram `position: fixed`:

1. **Transform/filter/perspective em ancestrais** — criam containing block novo e quebram `fixed`.
   - `rg -n "transform|filter:|perspective|backdrop-filter|will-change" src/`
   - Focar em wrappers globais: `App.tsx`, `PageTransition.tsx`, `Layout`, `main`, `body`.
2. **Z-index conflitantes** — mapear todos os z-index do projeto.
   - `rg -n "z-\[|zIndex|z-50|z-40|z-60|z-70" src/`
3. **Overflow:hidden em ancestrais do header** — pode cortar sticky/fixed filho.
4. **Uso direto de `top-0` / `sticky` sem variável** — devem migrar para tokens.
5. **Animações Framer Motion com `transform`** no wrapper raiz.

Saída: `docs/audit-topo.md` com checklist priorizado (Alto/Médio/Baixo).

---

## Fase 2 — Padronização via CSS variables

Em `src/index.css` consolidar (já existem parcialmente):

```css
:root {
  --site-header-height: 56px;
  --top-offer-height: 40px;
  --z-header: 70;
  --z-top-offer: 60;
  --z-modal: 90;
  --z-toast: 100;
}
@media (min-width: 640px) { :root { --site-header-height: 60px; } }
@media (min-width: 768px) { :root { --site-header-height: 64px; } }
```

- `Header.tsx` → `height: var(--site-header-height); z-index: var(--z-header)`.
- `TopOfferBanner.tsx` → `top: var(--site-header-height); height: var(--top-offer-height); z-index: var(--z-top-offer)`.
- Spacer global calculado: `calc(var(--site-header-height) + var(--top-offer-height))`.
- Remover qualquer `z-50/z-40` hardcoded de Header/Banner.

---

## Fase 3 — Testes de regressão (Playwright)

Adicionar `@playwright/test` (já existe `e2e/`).

### 3.1 Teste funcional de scroll (mobile)
`e2e/header-fixed.spec.ts`:
- Viewports: 320×568, 375×812, 768×1024, 1366×768.
- Em cada um:
  - Carrega `/`.
  - Mede `boundingBox` do header e banner em `scrollY=0`.
  - Faz `window.scrollTo(0, 1500)`.
  - Reassere: header `y === 0`, banner `y === headerHeight`, sem overlap, ambos visíveis.
  - Confere `getComputedStyle(header).position === 'fixed'`.

### 3.2 Regressão visual (screenshots)
`e2e/visual-top.spec.ts` usando `toHaveScreenshot`:
- Captura apenas a região do topo (`clip: {x:0,y:0,width:vw,height:headerH+bannerH+8}`).
- Snapshots por viewport: `top-mobile-sm.png`, `top-mobile.png`, `top-tablet.png`, `top-desktop.png`.
- Comparação automática com `maxDiffPixelRatio: 0.01`.
- Baseline commitada em `e2e/__screenshots__/`.

### 3.3 Script
`package.json` → `"test:e2e": "playwright test"`, `"test:e2e:update": "playwright test --update-snapshots"`.

---

## Fase 4 — Relatório `docs/audit-topo.md`

Estrutura:
1. Resumo executivo (status atual).
2. Tabela de achados: arquivo · linha · problema · severidade · correção.
3. Mapa de z-index final.
4. Checklist de prevenção (regras a seguir em PRs futuros):
   - Nunca usar `transform` em ancestrais do `Header`.
   - Sempre usar `var(--z-*)` em vez de `z-[n]`.
   - Spacer deve usar `calc(var(--site-header-height) + var(--top-offer-height))`.
   - Animações de página apenas com `opacity`.
5. Backlog priorizado (P0/P1/P2).

---

## Detalhes técnicos

- Stack: Vite + React, Playwright para e2e (não Vitest — Vitest fica para unit).
- Os testes Playwright rodam contra `npm run preview` ou `dev` numa porta fixa; configurar `playwright.config.ts` com `webServer`.
- Snapshots versionados; CI roda `playwright test` e falha em diff > 1%.
- Sem mudanças visuais para o usuário final; somente refator de tokens + infra de teste + doc.

## Arquivos previstos

- editar: `src/index.css`, `src/components/Header.tsx`, `src/components/TopOfferBanner.tsx`, `src/components/HeroSection.tsx`, `src/components/PageTransition.tsx`, `package.json`
- criar: `playwright.config.ts` (se ausente), `e2e/header-fixed.spec.ts`, `e2e/visual-top.spec.ts`, `e2e/__screenshots__/*`, `docs/audit-topo.md`

## Fora de escopo
- Redesign do Header/Banner.
- Mudanças de conteúdo ou copy.
- Refator de outras seções da home.
