# Auditoria Global — Responsividade & Performance

## Diagnóstico atual (medido agora no preview mobile 520px)

**Performance**
- DOM com **3289 elementos** / profundidade 16 / **597 listeners** — home com 25+ seções `lazy` carregando quase todas no primeiro paint.
- **162 scripts carregados** (1.92 MB JS), `lucide-react` sozinho = 156 KB, dois chunks Vite > 130 KB cada.
- Script Duration **3.72s**, Style Recalc **1.71s**, 350 layouts.
- DOMContentLoaded **7.4s**, Full Load **8.7s** no preview.
- Console reportou FCP 6960ms (poor) e TTFB 18s em sessão anterior (provavelmente cold start do preview, mas indica fragilidade).
- LCP candidato: `hero-bg-hardware.jpg` (171 KB) — sem `preload`, sem AVIF/WebP, sem `fetchpriority`.
- Favicon 158 KB (PNG enorme servido 2×).
- CLS 0.0385 (ok), maior shift em `::after` do hero — provável animação.

**Responsividade**
- Header/TopOfferBanner já padronizados com `--site-header-height` / `--top-offer-height` / `--z-*` (sessão anterior).
- Falta auditar: overflow horizontal em mobile, `min-w-0` em flex children, textos com `whitespace-nowrap`, imagens sem `max-w-full`, tabelas, formulários, modais.
- Várias seções home (`HomePricingBlock`, `HomeDiagnosticoBlock`, `HomeEquipamentosBlock`, `ProblemasDestaque`, etc.) nunca foram auditadas em 320px.

## Escopo proposto (3 fases, sem mudar design)

### Fase 1 — Performance (impacto alto, baixo risco)
1. **LCP image**: converter `hero-bg-hardware.jpg` via `vite-imagetools` para AVIF+WebP, adicionar `<link rel="preload" as="image" fetchpriority="high">` no `index.html` e usar `<picture>` no `HeroSection`.
2. **Favicon**: gerar versão 32×32 / 192×192 otimizada (target < 10 KB), corrigir tag duplicada que faz 2 requests.
3. **lucide-react tree-shake**: trocar imports `from "lucide-react"` por `lucide-react/dist/esm/icons/<icon>` nos componentes acima da dobra (Header, HeroSection, TopOfferBanner, TechnicianAvailability, PricingBanner). Reduz ~120 KB do bundle inicial.
4. **Lazy real**: mover `JsonLdSchema`, `PricingBanner`, `TechnicianAvailability` para `lazy()` ou renderizar após `requestIdleCallback`. Hoje todos vão no primeiro chunk.
5. **`Suspense` com `IntersectionObserver`**: criar `<LazyOnVisible>` wrapper para não montar 15 seções `lazy` simultaneamente (hoje todas baixam logo após paint).
6. **Remover scripts AdSense** do head em rotas que não monetizam (ou usar `loading="lazy"`).

### Fase 2 — Responsividade (audit + fix)
1. Script de varredura `rg` para encontrar: `whitespace-nowrap`, `min-w-\[`, `w-\[[0-9]+px\]`, `overflow-x` ausente, imagens sem `max-w-full h-auto`.
2. Inspeção visual via `browser--screenshot` em 320, 375, 414, 768, 1024 px nas rotas principais: `/`, `/assistencia-tecnica-curitiba`, `/blog`, `/servicos`, `/contato`, `/coleta-entrega`.
3. Corrigir cada quebra encontrada (sem rewrite — apenas ajustes Tailwind: `flex-wrap`, `min-w-0`, `break-words`, `truncate`, `grid-cols-1 sm:grid-cols-2`, padding mobile).
4. Garantir tap targets ≥ 44×44 px em CTAs e links inline.

### Fase 3 — Relatório
- Atualizar `docs/audit-topo.md` → renomear para `docs/audit-global.md` com seção Performance + Responsividade.
- Tabela antes/depois (LCP, JS inicial, DOM nodes, listeners).
- Checklist de prevenção (imports lucide, lazy patterns, breakpoints).

## Fora do escopo
- Redesign visual ou mudanças de conteúdo.
- Refator de rotas, mudanças no funil WhatsApp, edits em backend.
- SSR/prerender (mudança arquitetural grande).

## Arquivos a editar (estimativa)
- `index.html` (preload, favicon, scripts)
- `vite.config.ts` (imagetools)
- `src/components/HeroSection.tsx`, `Header.tsx`, `TopOfferBanner.tsx`, `TechnicianAvailability.tsx`, `PricingBanner.tsx` (imports lucide + picture)
- `src/pages/Index.tsx` (lazy reorganizado)
- Novo `src/components/LazyOnVisible.tsx`
- Vários componentes pontuais conforme bugs de responsividade encontrados
- `public/favicon.png` substituído por versão otimizada
- `docs/audit-global.md`

## Pergunta
Quer que eu execute as 3 fases de uma vez (PR grande, ~20+ arquivos), ou prefere ir **fase por fase** com aprovação entre cada uma (mais seguro, permite validar Performance antes de mexer em responsividade)?
