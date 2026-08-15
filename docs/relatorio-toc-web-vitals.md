# TOC dos pilares — UX, acessibilidade e Web Vitals

Rodada 9B.2 · medições em 15/08/2026 · rota de referência `/blog/o-que-e-informatica`.

## 1. O que mudou

| Item | Implementação |
| --- | --- |
| Copiar link da seção | Botão por item do índice (`button.article-toc__copy`, `aria-label="Copiar link da seção …"`), copia `origin+pathname+#id` via Clipboard API, feedback com ícone de confirmação + toast. Não altera a URL. |
| Scroll spy | `IntersectionObserver` dentro de `useEffect` (client-only), estado inicial `null` → primeiro render idêntico ao SSR, sem hydration mismatch. Destaque por borda esquerda em `accent` + `aria-current="location"`. |
| Reduced motion | `scroll-behavior: auto !important` aplicado ao próprio `<html>` sob `prefers-reduced-motion: reduce` e sob `html[data-reduced-motion="true"]` (o seletor global existente só alcançava descendentes). |
| Sem JS | Índice, âncoras e `<details>` continuam no HTML servido; scroll spy e cópia são melhorias progressivas. |

## 2. Web Vitals — antes × depois

Ambiente: Chromium headless, viewport 390×844, servidor de desenvolvimento (bundle não minificado — os valores absolutos de LCP são pessimistas; o que importa é o delta).

| Métrica | Antes (TOC 9B.1, sem spy/cópia) | Depois (9B.2) | Delta |
| --- | --- | --- | --- |
| LCP | 4.84 s | 4.86 s | +0,02 s (ruído; o LCP é a capa do artigo, fora do TOC) |
| CLS | 0,000 | 0,000 | 0 — o índice é renderizado no SSR com altura própria, não empurra conteúdo |
| INP (proxy: clique no item do índice até paint) | ~1,0 s (dev, primeiro clique com scroll suave) | ~1,0 s | sem regressão mensurável |

Observações reais do build:

- O `IntersectionObserver` observa 17 headings e é descartado no unmount (`obs.disconnect()`); custo de main thread por scroll é desprezível e não entra no caminho crítico de renderização.
- Nenhuma dependência nova foi adicionada (ícones já vinham de `lucide-react`, toast de `sonner`).
- CLS permanece zero porque nada do TOC é inserido após a hidratação — apenas classes de destaque mudam.
- Os budgets versionados (`.lighthouse-baseline.json`, `perf-baseline.json`) seguem válidos; o gate `check:perf-regression` não acusa variação.

## 3. Cobertura E2E

`e2e/article-toc.spec.ts`:

- índice presente no HTML servido (sem JS);
- clique leva o heading para dentro da faixa de leitura (abaixo do header fixo) e atualiza o hash;
- navegação por teclado: foco visível, `Enter` ativa e posiciona;
- botão de copiar com nome acessível;
- comportamento validado em 360 px, 390 px e 430 px, incluindo ausência de overflow horizontal;
- `reducedMotion: "reduce"` → `scroll-behavior` computado igual a `auto`.
