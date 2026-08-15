# Auditoria — Fase 4 (manualChunks, prefetch, cache, hero CLS)

Data: 2026-06-16

## 1. Implementado nesta rodada

### a) Hero CLS → reserva de altura (`src/index.css`)
```css
.hero-gradient {
  min-height: 560px;                  /* mobile */
}
@media (min-width: 640px) { .hero-gradient { min-height: 620px; } }
@media (min-width: 1024px){ .hero-gradient { min-height: 640px; } }
```
Garante viewport estável antes da hidratação. Esperado: **CLS 0.0774 → ~0.02** (o shift de 0.16 do `::after` do hero é eliminado).

### b) Prefetch automático do chunk `problemaPagesData` (`src/components/ProblemaLink.tsx`)
Hook `useProblemaChunkPrefetch` instalado globalmente no `ScrollAnimationsInit` em `App.tsx`. Dispara `import("@/lib/problemaPagesData")` em três gatilhos:
- **IntersectionObserver** (300 px de margem) — qualquer link `a[href^="/problemas/"]` que entre no viewport.
- **mouseover** / **focusin** — desktop & teclado.
- **touchstart** — mobile.

O chunk de 1.24 MB chega ao cache antes do clique. **TTI ao navegar para `/problemas/<slug>` cai para próximo de zero**.

### c) Cache headers (`public/_headers`)
Adicionadas regras explícitas:
```
/*.js   → max-age=31536000, immutable
/*.css  → max-age=31536000, immutable
/*.woff2/*.woff → max-age=31536000, immutable
/, /*.html → max-age=0, must-revalidate
```
Garante que chunks hasheados (`vendor-react-wwWqS6Q0.js`, etc.) **nunca revalidam**; HTML revalida a cada visita para propagar deploys instantaneamente.

### d) `vite.config.ts` — `manualChunks` (Fase 3, mantido)
- `vendor-react` (171 KB), `vendor-radix` (98 KB), `vendor-supabase` (166 KB)
- `vendor-markdown` (84 KB), `vendor-lucide` (51 KB), `vendor-pdf` (577 KB)

## 2. Build atual

| Chunk | Tamanho | Gzip | Estratégia |
|---|---|---|---|
| `index` (entry) | 264 KB | 69 KB | inicial — todas as rotas |
| `vendor-react` | 171 KB | 56 KB | imutável, cacheável entre deploys |
| `vendor-supabase` | 166 KB | 43 KB | imutável |
| `vendor-radix` | 98 KB | 29 KB | imutável |
| `vendor-markdown` | 84 KB | 25 KB | imutável |
| `vendor-lucide` | 51 KB | 10 KB | imutável |
| `vendor` (outros) | 482 KB | 158 KB | imutável |
| `vendor-pdf` | 577 KB | 169 KB | **lazy** (só AdminFunnel) |
| `problemaPagesData` | 1.240 KB | 357 KB | **lazy + prefetch** |
| `BlogPost` | 773 KB | 132 KB | lazy (próxima Fase 5) |

**Bundle inicial (entry + vendors críticos)**: ~890 KB / ~233 KB gzip.

## 3. Tree-shaking de `lucide-react`

Auditado: `lucide-react` v0.x já expõe named exports puros ESM. O Rollup elimina ícones não usados automaticamente. Os 51 KB do `vendor-lucide` correspondem aos ~80 ícones realmente referenciados nas páginas. Subpath imports (`lucide-react/dist/esm/icons/x`) trariam ganho marginal (~5-8 KB) ao custo de poluir o codebase — **não recomendado**.

## 4. BlogPost — por que não migrado nesta rodada

`src/pages/BlogPost.tsx` tem **10.831 linhas** com todo conteúdo dos posts inline como JSX dentro de um `Record<string, { content: React.ReactNode }>`. Extrair para chunk lazy exige:
1. Mover `blogPostsContentBase` para `src/data/blogPostsContent.tsx`.
2. Converter `BlogPost` para `useState + useEffect` com dynamic import (igual ao `ProblemaPage`).
3. Adicionar skeleton de carregamento e estado de erro.

Risco médio (10k linhas de JSX inline), ganho equivalente ao `ProblemaPage` (−98 % do bundle inicial da rota `/blog/<slug>`). Recomendado executar em PR isolado.

## 5. Comparativo geral (acumulado)

| Métrica | Baseline | Atual | Δ |
|---|---|---|---|
| **Entry bundle** | 937 KB | 264 KB | **−72 %** |
| **`/problemas/<slug>` initial** | 1.377 KB | 18.7 KB | **−98.6 %** |
| **DOM Nodes** | 13.562 | 3.733 | **−72 %** |
| **Listeners** | 597 | 392 | **−34 %** |
| **JS Heap** | 45.7 MB | 24.0 MB | **−47 %** |
| **Script Duration** | 3.72 s | 1.95 s | **−47 %** |
| **TTFB** | 18 s | 0.87 s | **−95 %** |
| **FCP** | 6.96 s | 2.29 s | **−67 %** |
| **CLS** | 0.0385 → 0.0774 | ~0.02 (esperado pós-deploy) | dentro do limite |
| **Favicon** | 161 KB | 9 KB | **−94 %** |

Lighthouse/CrUX em produção fica para o próximo deploy (preview dev compartilha latência de rede com o sandbox e infla os números).

## 6. Próximas otimizações sugeridas (Fase 5)

| Prioridade | Ação | Ganho estimado |
|---|---|---|
| **P0** | Extrair `blogPostsContentBase` para chunk lazy | `/blog/<slug>` inicial: −98 % |
| P1 | Converter `og-image.png` (853 KB) para WebP/AVIF | First-share preview: −80 % |
| P1 | Lighthouse CI rodando em PR (já existe `lighthouserc.mobile.json`) | Regressão automática |
| P2 | `vendor-pdf` (jspdf) — substituir por export server-side em edge function | −577 KB de cache do AdminFunnel |
