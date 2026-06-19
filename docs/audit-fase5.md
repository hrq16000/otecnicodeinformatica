# Auditoria — Fase 5 (BlogPost lazy, cache headers, perf check)

Data: 2026-06-19

## 1. BlogPost.tsx → chunk lazy (✓ feito)

Extraído `blogPostsContentBase` (10.531 linhas inline) para `src/data/blogPostsContent.tsx`. `BlogPost.tsx` caiu de **10.831 → 327 linhas**.

| Chunk | Antes | Depois |
|---|---|---|
| `BlogPost-*.js` (rota) | 773 KB | < 20 KB |
| `blogPostsContent-*.js` (lazy) | — | **763 KB / 129 KB gzip** |

Mecânica:
- Cache de módulo em escopo (`cachedPosts`) + `inflight` Promise → uma única request, evita duplicação se múltiplas instâncias da rota montarem.
- Guard `if (!posts) return <spinner>` antes do `if (!post) return <Navigate />` evita redirect durante o carregamento.
- Prefetch já cobre este chunk (`useBlogChunkPrefetch` em `App.tsx`).

Build de produção: **✓ 12.32s, zero erros, 100 rotas prerenderizadas**.

## 2. Cache headers — validação real (✓ corrigido bug)

Escrito validador `/tmp/validate-headers.mjs` que parseia `dist/_headers` (mesmo formato Cloudflare Pages / Netlify) e testa cada URL representativa contra as regras com semântica **first-match-wins**.

### Bug encontrado e corrigido

A regra genérica `/*.html` estava **antes** de `/arrumar-pc/*`. Como `*` em `_headers` casa com `/`, `/*.html` capturava `/arrumar-pc/curitiba/index.html` e aplicava `max-age=0, must-revalidate` — anulando o cache de borda pretendido (`s-maxage=3600, SWR=86400`) das 100 HTMLs prerenderizadas.

**Fix**: reordenado `public/_headers` em 3 blocos:
1. Assets hasheados imutáveis (`/assets/*`, `/*.{js,css,woff2,woff}`)
2. Paths específicos (`/arrumar-pc/*`, `/og/*`, `/favicon.*`, `/manifest.json`)
3. Fallback genérico HTML (`/`, `/*.html`)

### Resultado da validação (12/12 ✓)

| URL | Regra casada | Cache-Control |
|---|---|---|
| `/` | `/` | `max-age=0, must-revalidate` |
| `/index.html` | `/*.html` | `max-age=0, must-revalidate` |
| `/arrumar-pc/curitiba/index.html` | `/arrumar-pc/*` | `max-age=300, s-maxage=3600, SWR=86400` |
| `/assets/vendor-react-wwWqS6Q0.js` | `/assets/*` | `max-age=31536000, immutable` |
| `/assets/index-C9EtwqZX.css` | `/assets/*` | `max-age=31536000, immutable` |
| `/favicon.ico` | `/favicon.ico` | `max-age=604800` |
| `/favicon.png` | `/favicon.png` | `max-age=604800` |
| `/manifest.json` | `/manifest.json` | `max-age=86400` |
| `/og/example.jpg` | `/og/*` | `max-age=86400, SWR=604800` |
| `/assets/AcademiaSJP-CeNi3CaI.js` | `/assets/*` | `max-age=31536000, immutable` |
| `/assets/AdminFunnel-Bd_KWpY4.js` | `/assets/*` | `max-age=31536000, immutable` |
| `/assets/AdminLogin-Dge93XOr.js` | `/assets/*` | `max-age=31536000, immutable` |

### Auditoria de hashing

- **373/373** arquivos JS em `dist/assets/` possuem content-hash → seguros para `immutable`.
- CSS único `index-C9EtwqZX.css` também hasheado.
- `_headers` é copiado para `dist/` automaticamente pelo Vite (verificado).

**Pós-deploy:** HTML revalida a cada visita (deploy propaga em segundos), chunks JS/CSS hasheados nunca revalidam (cache hit eterno → load secundário ~0).

## 3. Performance — situação no dev preview

| Métrica | Baseline (Fase 0) | Fase 2 | Fase 5 (atual) |
|---|---|---|---|
| FCP | 6.96 s | 2.29 s | **1.82 s** |
| TTFB | 18 s | 0.87 s | **0.36 s** |
| DOM Nodes | 13.562 | 3.733 | **3.623** |
| Listeners | 597 | 392 | **399** |
| JS Heap | 45.7 MB | 24.0 MB | **24.3 MB** |
| Script Duration | 3.72 s | 1.95 s | 2.01 s |
| CLS | 0.0385 | 0.0774 | 0.0773 (Good) |
| Entry bundle | 937 KB | 264 KB | **264 KB** |
| BlogPost route | 773 KB | 773 KB | **< 20 KB + lazy 129 KB gzip** |

### CLS — diagnóstico honesto

A reserva de `min-height: 560px` no `.hero-gradient` está aplicada e funcional, mas no **dev preview** o CLS persiste em ~0.077 (ainda "Good"). Maior shift: `::after` da `.noise-overlay` em 0.17. Causa: o hero **cresce além de 560px** conforme conteúdo (TypingEffect, badges, CTAs) hidrata, e o `::after` com `inset: 0` acompanha o crescimento.

**Mitigação aplicada**: adicionado `.hero-gradient` a `EXCLUDE_PARENT_SELECTORS` em `scrollAnimations.ts` → hero não recebe mais `fade-up`/`fade-in` automático (estava contribuindo com 0.05).

**Em produção** (prerender estático + manualChunks + bundle minificado): o HTML serve todo o conteúdo do hero já posicionado no primeiro paint → o hero não cresce → CLS aproxima de zero. Aguardar deploy + Lighthouse real para confirmar.

### Lighthouse CLI local — não executado

Chromium está disponível na sandbox (`/bin/chromium`), porém a Lighthouse CLI não está instalada e o sandbox tem restrições para spawn de browser headless com `npx --yes lighthouse`. O `browser--performance_profile` (usado acima) reporta os mesmos Web Vitals que o Lighthouse mede (FCP, LCP, CLS) com a vantagem de rodar contra o preview real. INP exige interação para ser medido.

Para Lighthouse "oficial" em produção:
```bash
bunx lhci autorun --config=./lighthouserc.mobile.json
```
(já configurado, roda no CI/local após `publish`).

## 4. Próximos passos

- **Deploy** para validar CLS real em prod (espera-se < 0.02).
- **Frente 6 (estratégico)**: plano SEO para bater os 5 maiores concorrentes em "técnico Curitiba" — Semrush + roadmap de conteúdo.
- (Opcional) Reduzir `min-height` mobile para ~750px se medições reais mostrarem o hero crescer além disso.

## Arquivos modificados nesta fase

- `src/data/blogPostsContent.tsx` (novo, 10.538 linhas, lazy chunk)
- `src/pages/BlogPost.tsx` (10.831 → 327 linhas)
- `public/_headers` (reordenado, bug de specificity corrigido)
- `src/lib/scrollAnimations.ts` (hero excluído da reveal automática)
- `docs/audit-fase5.md` (este documento)
- `/tmp/validate-headers.mjs` (script de validação, não vai pro repo)
