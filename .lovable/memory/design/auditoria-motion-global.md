---
name: Auditoria de movimento e gate check:motion-audit
description: Vocabulário decorativo legado removido, hover-scale proibido, .motion-status-live como única animação contínua e rede de segurança global de prefers-reduced-motion.
type: constraint
---
Auditoria concluída sobre toda a interface:

- **Removidas** as classes decorativas legadas: `hover-streak`, `animated-border`, `card-shine`, `ring-pulse`, `elastic-click`, `animate-pulse-soft`, `cta-pulse`.
- **Proibido** hover scale genérico (`hover:scale-*`, `group-hover:scale-*`). Feedback de superfície usa `.motion-surface` (cor/borda/sombra). Setas com `translate-x` continuam permitidas (indicam direção).
- **Proibido** `animate-pulse` ad-hoc: placeholders usam `.skel`/Skeletons. Exceção: indicador "ao vivo" com `.motion-status-live` (única animação contínua do sistema, responde "ainda está acontecendo?").
- **Rede de segurança** no fim de `src/index.css`: `prefers-reduced-motion: reduce` e `html[data-reduced-motion="true"]` zeram animação e transição de qualquer elemento, inclusive código legado; parallax é neutralizado.
- **Gate** `npm run check:motion-audit` (também no `postbuild`, junto com `check:motion-loading`) bloqueia o retorno de qualquer um desses padrões. Escape pontual: comentário `motion-audit:allow` na linha.
