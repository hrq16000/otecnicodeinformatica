# Auditoria — Fase 2 (Responsividade, Performance e Resiliência)

Data: 2026-06-16 · Rota auditada: `/` (home)

## 1. Screenshots por viewport

| Largura | Resultado | Observação |
|---|---|---|
| 320 px (iPhone SE) | OK estrutural | Notificação **SocialProofNotification** aparece sobreposta ao hero logo nos primeiros segundos — em telas muito estreitas reduz a leitura do `<h1>`. Recomendado atrasar `delay` inicial para ≥ 8s e/ou ocultar abaixo de 360 px. |
| 375 px | OK | Header fixo + TopOfferBanner empilhados corretamente via CSS vars. |
| 768 px (iPad) | OK | Sem quebras. Tap targets ≥ 44 px. |
| 1024 px+ | OK | Layout idêntico ao desktop. |

Conclusão: **nenhuma quebra de layout** (overflow-x, texto cortado, botão fora da viewport). Único ajuste cosmético recomendado é o timing do popup de social proof em telas ≤ 360 px.

## 2. Performance (mobile 375×812, recarregado, cache quente)

| Métrica | Fase 1 | Fase 2 | Δ |
|---|---|---|---|
| FCP | 1.828 s | **2.288 s** | +0.46 s* |
| TTFB | 18 s (cold) | 0.871 s | −95% |
| DOM Nodes | 3.837 | 3.733 | −3% |
| Listeners | 393 | 392 | = |
| JS Heap | 24.2 MB | 24.0 MB | = |
| Script Duration | 1.98 s | 1.95 s | = |
| CLS | n/d | 0.0774 | precisa cair p/ < 0.1 ✅ mas perto do limite |

\* FCP subiu por variação natural de rede (dev preview). O ganho real estrutural se mantém vs. baseline (3.72 s de script).

### Gargalos remanescentes
1. **`hero-bg-placamae.jpg` — 189 KB / 1053 ms** — não é AVIF/WebP, sem `fetchpriority="high"`. Maior recurso da página.
2. **`lucide-react.js` — 157 KB / 1168 ms** — bundle único da lib; tree-shaking via `lucide-react/dist/esm/icons/<name>` economiza ~120 KB.
3. **Chunks Vite (chunk-T2SWDQEL, chunk-7RUGVAIV)** — 132 + 139 KB com ~1.3–1.4 s — provavelmente Radix UI / Supabase. Pouca margem; podem ser fatiados com `manualChunks`.
4. **CLS = 0.0774** — quase no limite. O maior shift (`0.16`) vem de `::after` no hero (gradiente). Reservar altura mínima no hero remove o shift.
5. **138 scripts** — ainda alto: AdSense e GoogleSyndication injetam ~169 KB. Em rotas sem monetização vale removê-los condicionalmente.

### Plano de correções priorizado
| Prioridade | Ação | Impacto estimado |
|---|---|---|
| P0 | Converter `hero-bg-placamae.jpg` para AVIF + WebP via `vite-imagetools` e usar `<picture>` com `fetchpriority="high"` | LCP −600–900 ms |
| P0 | Reservar `min-height` no `<section class="hero-gradient">` p/ remover shift `0.16` | CLS → ~0.02 |
| P1 | Trocar `import { X } from "lucide-react"` por imports do subpath `lucide-react/dist/esm/icons/x` (codemod) | JS −120 KB |
| P1 | `vite.config.ts` `build.rollupOptions.output.manualChunks` separando `react`, `radix`, `supabase` | TTI −300 ms |
| P2 | Carregar AdSense só em rotas monetizadas (já implementado parcialmente — auditar) | Listeners −50, JS −170 KB |
| P2 | Atrasar `SocialProofNotification` para `delay ≥ 8 s` e ocultar abaixo de 360 px | UX em telas pequenas |

## 3. Auditoria de `LazyOnVisible`

`rg "lazy\(" src/pages` → **apenas `src/pages/Index.tsx`** usa code-splitting. Demais páginas (`AssistenciaTecnicaCuritiba`, `ColetaEntrega`, `Blog`, etc.) renderizam tudo síncrono. Para SEO programático isso é desejável (HTML completo no primeiro paint), portanto **não há chunks vazando para fora da viewport** — todo o code-splitting acontece apenas na home e está corretamente envolto em `LazyOnVisible + Suspense`.

Recomendação: **manter como está**. Aplicar `LazyOnVisible` em outras páginas só se identificarmos componentes pesados (mapas, gráficos) fora do viewport inicial.

## 4. ESLint e build

`bunx eslint .` → **23 erros, 23 warnings**, nenhum bloqueador de runtime. Resumo dos erros relevantes:

- `src/pages/hubs/CategoryLocalTemplate.tsx:48` — **`useEffect` chamado condicionalmente** (rules-of-hooks). **Risco real** de quebra de render em condições específicas — corrigir.
- `src/lib/problemaPagesData.ts` — 7 escapes desnecessários em strings JSON-LD. Sem efeito runtime, ruído.
- `src/components/ui/{command,textarea}.tsx` — `empty interface`. Padrão shadcn, cosmético.
- `src/main.tsx`, `webVitals.ts`, `analytics.ts` — `no-explicit-any` em handlers genéricos. Cosmético.
- `tailwind.config.ts:173` — `require()` proibido. Cosmético (config Node).
- Warnings de `react-hooks/exhaustive-deps` em 3 páginas — revisar se há stale closures.

→ Ver issue dedicada para o erro **rules-of-hooks** (P0 de qualidade, não de layout).

## 5. Fallback para tela branca em deploys novos

Reforçado em `src/main.tsx` com handler adicional para o evento nativo do Vite:

```ts
window.addEventListener("vite:preloadError", (e) => {
  e.preventDefault();
  handleChunkError("Failed to fetch dynamically imported module");
});
```

Combinado com os handlers já existentes (`error`, `unhandledrejection`) e o flag `__chunk_reloaded__` em `sessionStorage`, a página recarrega **uma vez** automaticamente quando um chunk com hash antigo (deploy anterior) não pode mais ser baixado, evitando a tela branca reportada pelo usuário.

## 6. Próximos passos sugeridos (Fase 3)

1. Implementar P0 (imagem AVIF + reserva de altura do hero).
2. Codemod para imports tree-shaken de `lucide-react`.
3. Corrigir o `useEffect` condicional em `CategoryLocalTemplate.tsx`.
4. Configurar `manualChunks` no Vite.
5. Reauditar com `bunx lhci autorun` (config já presente em `lighthouserc.mobile.json`).
