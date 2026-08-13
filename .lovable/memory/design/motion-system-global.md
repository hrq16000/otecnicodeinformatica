---
name: Motion System Global
description: Tokens --motion-* e primitivas reutilizáveis (FadeIn, Collapse, Presence, LoadingButton, AsyncContent, Progress, AnimatedList) + esqueletos estruturais; gate check:motion-loading.
type: design
---
Fonte única de movimento do portal (design-motion-principles):

- Tokens CSS em `src/index.css`: `--motion-duration-instant|fast|normal|slow` (100/160/220/300ms) e `--motion-ease-standard|enter|exit|spring`. Espelhados em `src/lib/motion.ts`.
- Classes utilitárias: `.motion-enter`, `.motion-exit` (saída mais curta que entrada), `.motion-collapse` (grid-template-rows 0fr→1fr, sem animar height), `.motion-surface` (hover por cor/borda/sombra, nunca scale genérico), `.motion-progress-indeterminate`.
- Primitivas em `src/components/motion/` (barrel `index.ts`): FadeIn, Collapse, Presence (equivalente a AnimatePresence), LoadingButton (idle→loading→success/error, aria-busy, bloqueia duplo submit), AsyncContent (skeleton/erro/vazio/refetch preservando conteúdo), Progress (real ou indeterminado — nunca simular percentual), AnimatedList (stagger só até 12 itens), RouteTransition (fade de entrada por rota, sem transform pesado).
- Esqueletos estruturais em `src/components/Skeleton.tsx`: SkeletonTable, SkeletonMetrics, SkeletonChart, SkeletonForm, SkeletonPage (além de Card/Text/Grid/Hero).
- `prefers-reduced-motion` e `html[data-reduced-motion="true"]` neutralizam tudo; estados nunca dependem só de movimento (texto + ícone + ARIA).
- Gate `npm run check:motion-loading` valida tokens, reduced-motion e todas as primitivas — fail-closed.

Aliases oficiais do barrel: PageSkeleton/CardSkeleton/TableSkeleton (= SkeletonPage/Card/Table).

Regra: tela nova consome as primitivas; proibido reimplementar loader/animação local.
