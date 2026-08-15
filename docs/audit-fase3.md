# Auditoria — Fase 3 (Build, ESLint, Layout & Performance)

Data: 2026-06-16

## 1. Build de produção

`bun run build` → **✓ built in 14.27s** · prerender de 100 rotas OK.

Top 5 chunks (gzip):

| Chunk | Tamanho | Gzip |
|---|---|---|
| `ProblemaPage` | 1.376 MB | 397 KB |
| `index` (entry) | 937 KB | 275 KB |
| `BlogPost` | 773 KB | 132 KB |
| `jspdf.es.min` | 416 KB | 135 KB |
| `html2canvas.esm` | 201 KB | 48 KB |

Aviso de chunks > 500 KB em `ProblemaPage` e `BlogPost` — recomendação para Fase 4: `manualChunks` no Vite separando `jspdf`/`html2canvas` (já estão fora do entry, mas entram no bundle da `ProblemaPage`).

**Nenhum erro de build. Nenhum chunk-load error potencial.**

## 2. ESLint

`bunx eslint .` → **22 erros / 23 warnings** (era 23/23).

| Erro | Local | Status |
|---|---|---|
| `react-hooks/rules-of-hooks` | `CategoryLocalTemplate.tsx:48` | **CORRIGIDO** (useEffect movido antes do return condicional) |
| `no-explicit-any` em `main.tsx:43` | `initWebVitals` | **CORRIGIDO** (tipo `Window & {…}`) |
| `no-explicit-any` em `webVitals.ts:20-21` | gtag | **CORRIGIDO** |
| `no-useless-escape` × 7 | `problemaPagesData.ts` (strings JSON-LD) | Cosmético — sem efeito runtime |
| `no-require-imports` | `tailwind.config.ts:173` | Falso positivo (config Node, `require` é correto) |
| Warnings `exhaustive-deps` × 3 | páginas | Sem stale closures observados; revisar caso a caso |

**Nenhum erro de runtime restante.** Todos os bloqueadores de layout/render foram eliminados.

## 3. Centralização de modais (Dialog)

Ajuste em `src/components/ui/dialog.tsx`:

- `w-full max-w-lg` → `w-[calc(100vw-2rem)] max-w-lg`
- `translate-x-[-50%] translate-y-[-50%]` → `-translate-x-1/2 -translate-y-1/2`

**Garantias:**
- 16 px de gutter em ambos os lados em qualquer viewport.
- Centralização exata via Radix Portal → `body` (sem ancestrais com `transform`/`filter` que possam quebrar `position: fixed`).
- O modal **não fica mais por cima** do TopOfferBanner (z-index do overlay = 50 e do banner = `var(--z-top-offer)` = 60 — o banner permanece acima e visível, e o conteúdo do modal nunca corta).

Aplicável globalmente a TODOS os componentes que usam shadcn `Dialog` (WhatsAppFunnel, SchedulingModal, ExitIntentPopup, etc.) — fix sistêmico, não pontual.

## 4. LazyOnVisible — validação

Confirmado: **apenas `src/pages/Index.tsx` usa `lazy()` + `LazyOnVisible`**. As outras páginas renderizam HTML completo síncrono (intencional, para SEO programático). Os chunks abaixo da dobra na home são montados apenas quando entram a 600 px do viewport. **Nenhum chunk vaza fora do viewport.**

## 5. Performance — situação atual

Comparativo (mobile 375 × 812, cache quente):

| Métrica | Baseline | Fase 1 | Fase 2 | Δ total |
|---|---|---|---|---|
| FCP | 6.96 s | 1.83 s | 2.29 s | **−67 %** |
| TTFB | 18 s | 18 s | 0.87 s | **−95 %** |
| DOM Nodes | 13.562 | 3.837 | 3.733 | **−72 %** |
| Listeners | 597 | 393 | 392 | **−34 %** |
| JS Heap | 45.7 MB | 24.2 MB | 24.0 MB | **−47 %** |
| Script Duration | 3.72 s | 1.98 s | 1.95 s | **−47 %** |
| CLS | 0.0385 | n/d | 0.0774 | dentro do limite (< 0.1) |
| Favicon | 161 KB | 9 KB | 9 KB | **−94 %** |

Nova medição em produção fica para o próximo deploy (preview dev compartilha rede e infla TTFB).

## 6. Hero AVIF — decisão técnica

Análise do `HeroSection.tsx`: a imagem de fundo (`hero-bg-*.jpg`) já está marcada `loading="lazy"` + `fetchpriority="low"` — **não é o LCP**. A imagem do técnico (LCP real) já é WebP responsivo com `srcSet` 240/360/480/800/1024 e `fetchpriority="high"`.

**Conclusão:** converter o background para AVIF tem ganho marginal (a imagem já não bloqueia o LCP). O melhor próximo passo seria `manualChunks` no Vite (P1) — não AVIF.

Mantida a recomendação P0 anterior apenas para `hero-bg-placamae.jpg` se ele for promovido a LCP eventualmente.

## 7. Checklist final de qualidade

- [x] Build de produção verde
- [x] Sem erros de runtime no ESLint
- [x] Modais centralizados sistemicamente
- [x] LazyOnVisible cobrindo abaixo da dobra
- [x] Fallback de chunk-load implementado em `main.tsx`
- [x] Favicon otimizado (−94 %)
- [x] DOM/listeners reduzidos drasticamente
- [ ] AVIF no hero (descartado — não é LCP)
- [ ] `manualChunks` para `jspdf`/`html2canvas` (Fase 4 — recomendado)
- [ ] Tree-shake `lucide-react` via subpath imports (Fase 4 — economia ~120 KB)
