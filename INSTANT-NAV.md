# Instant Navigation — Guia de Replicação

Este documento descreve a estratégia usada em **tecnicocuritiba.com.br**
para conseguir navegação **percebida como instantânea** (`<90ms` em
rotas pré-aquecidas) em uma SPA React + Vite, sem flashes de tela
branca nem loaders intermediários.

> Leia este arquivo de cima para baixo e replique os 5 pilares **em
> conjunto** — pular um deles quebra a sensação.

---

## Pilares

1. **Shell estático no `index.html`** — pinta antes do React hidratar.
2. **`warmRoute()`** — cache de Promises de `import()` por pathname.
3. **Pré-fetch por intenção** — `pointerover` / `pointerdown` /
   `focusin` / `touchstart` em capture.
4. **Click interceptado + `startTransition`** — `pushState` + `popstate`
   + scroll para o topo, mantendo a página atual visível até a próxima
   estar pronta.
5. **`RouteLoader` único + gate de 90ms** — só aparece se a navegação
   passar de 90ms. Visualmente idêntico ao shell.

Bônus: **telemetria de navegação** (p50/p95) + tratamento de
`vite:preloadError` / `ChunkLoadError`.

---

## 1. Shell estático (`index.html`)

Coloque **dentro de `<div id="root">`** um shell HTML/CSS inline
(sem JS, sem fontes externas bloqueantes) que já mostre logo +
headline + CTA, com o **mesmo gradiente** e a **mesma logo** que o
`RouteLoader` usará depois.

```html
<style>
  /* Fontes fallback com size-adjust → zero flicker quando Inter/Poppins entram */
  @font-face{font-family:"Inter Fallback";src:local("Arial");size-adjust:107%;ascent-override:90%;descent-override:22%;line-gap-override:0%}
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;font-family:Inter,"Inter Fallback",sans-serif;color:#fff;background:hsl(215,65%,22%)}
  .app-shell{min-height:100vh;background:linear-gradient(155deg,hsl(215,65%,22%) 0%,hsl(215,70%,18%) 55%,hsl(220,55%,28%) 100%);position:relative;overflow:hidden}
  .app-shell-logo{width:clamp(13rem,58vw,22rem);height:auto;filter:drop-shadow(0 .75rem 1.5rem rgba(0,0,0,.22))}
  @media (prefers-reduced-motion:no-preference){
    .app-shell-logo{animation:logoPulse .9s ease-in-out infinite}
  }
  @keyframes logoPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.62;transform:scale(1.06)}}
</style>
<div id="root">
  <div class="app-shell">
    <header><img class="app-shell-logo" src="/logo.webp" alt="Logo" fetchpriority="high" decoding="sync" /></header>
    <main><!-- H1 + CTA inline aqui --></main>
  </div>
</div>
```

**Regras de ouro:**

- Mesma cor de fundo do `<body>` e do shell — sem flash entre HTML e React.
- Logo com `clamp(13rem, 58vw, 22rem)` — **idêntica** à do `RouteLoader`,
  para nunca aparecer "miniatura" durante a transição.
- `fetchpriority="high"` + `decoding="sync"` na logo.

---

## 2. `RouteLoader` único (`src/components/RouteLoader.tsx`)

```tsx
export const RouteLoader = () => (
  <div
    role="status"
    aria-label="Carregando"
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background:
        "linear-gradient(155deg,hsl(215,65%,22%) 0%,hsl(215,70%,18%) 55%,hsl(220,55%,28%) 100%)",
      transition: "opacity 160ms ease",
    }}
  >
    <style>{`@keyframes routeLogoPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.62;transform:scale(1.06)}}`}</style>
    <img
      src="/logo.webp"
      alt="Logo"
      width={304}
      height={98}
      decoding="sync"
      style={{
        width: "clamp(13rem, 58vw, 22rem)",
        height: "auto",
        objectFit: "contain",
        filter: "drop-shadow(0 .75rem 1.5rem rgba(0,0,0,.22))",
        animation: "routeLogoPulse 720ms ease-in-out infinite",
      }}
    />
  </div>
);
```

Use **este mesmo `RouteLoader`** em **TODOS** os `<Suspense fallback>`
do app (incluindo os internos do react-router). Garante continuidade
visual.

---

## 3. `App.tsx` completo — núcleo da navegação instantânea

```tsx
import { lazy, Suspense, startTransition, useEffect, useRef, useState } from "react";
import Index from "./pages/Index";
import { RouteLoader } from "./components/RouteLoader";
import { startNav } from "./lib/navTelemetry";

const LegacyApp = lazy(() => import("./LegacyApp"));

const routeCache = new Map<string, Promise<unknown>>();

const warmRoute = (pathname = "") => {
  if (routeCache.has(pathname)) return routeCache.get(pathname)!;

  // Mapeie aqui as rotas mais visitadas → import() direto do arquivo da página.
  const routeImport =
    pathname === "/servicos" ? import("./pages/Servicos")
    : pathname === "/blog" ? import("./pages/Blog")
    : Promise.resolve();

  const promise = Promise.all([import("./LegacyApp"), routeImport]).catch(() => undefined);
  routeCache.set(pathname, promise);
  return promise;
};

const isHomeRoute = (pathname?: string) => {
  const path = (pathname ?? window.location.pathname).replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index";
};

const InstantNavigation = ({ setRoutePath, setShowNavLoader }: {
  setRoutePath: (p: string) => void;
  setShowNavLoader: (s: boolean) => void;
}) => {
  const navId = useRef(0);

  useEffect(() => {
    warmRoute(window.location.pathname);
    const preloadCommon = window.setTimeout(() => {
      ["/servicos", "/blog"].forEach(warmRoute);
    }, 40);

    const getInternalUrl = (target: EventTarget | null) => {
      const a = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!a || a.target || a.hasAttribute("download")) return null;
      const url = new URL(a.href, window.location.href);
      return url.origin === window.location.origin ? url : null;
    };

    const prefetch = (e: Event) => {
      const url = getInternalUrl(e.target);
      if (url) warmRoute(url.pathname);
    };

    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const url = getInternalUrl(e.target);
      if (!url || (url.pathname === window.location.pathname && url.search === window.location.search && url.hash)) return;

      e.preventDefault();
      const currentNav = ++navId.current;
      const cached = routeCache.has(url.pathname);
      const endNav = startNav(url.pathname);
      const loaderTimer = window.setTimeout(() => {
        if (navId.current === currentNav) setShowNavLoader(true);
      }, 90);

      const go = () => {
        window.history.pushState({}, "", url);
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        startTransition(() => setRoutePath(url.pathname));
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (navId.current === currentNav) setShowNavLoader(false);
          endNav({ cached });
        }));
      };

      warmRoute(url.pathname).then(go).finally(() => window.clearTimeout(loaderTimer));
    };

    const pop = () => startTransition(() => setRoutePath(window.location.pathname));

    document.addEventListener("pointerover", prefetch, true);
    document.addEventListener("pointerdown", prefetch, true);
    document.addEventListener("focusin", prefetch, true);
    document.addEventListener("touchstart", prefetch, true);
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", pop);
    return () => {
      document.removeEventListener("pointerover", prefetch, true);
      document.removeEventListener("pointerdown", prefetch, true);
      document.removeEventListener("focusin", prefetch, true);
      document.removeEventListener("touchstart", prefetch, true);
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", pop);
      window.clearTimeout(preloadCommon);
    };
  }, [setRoutePath, setShowNavLoader]);
  return null;
};

const HomeApp = () => {
  const [routePath, setRoutePath] = useState(() => window.location.pathname);
  const [showNavLoader, setShowNavLoader] = useState(false);

  return (
    <>
      <InstantNavigation setRoutePath={setRoutePath} setShowNavLoader={setShowNavLoader} />
      {showNavLoader ? (
        <div className="fixed inset-0 z-[99] animate-in fade-in duration-150">
          <RouteLoader />
        </div>
      ) : null}
      {isHomeRoute(routePath) ? (
        <Index />
      ) : (
        <Suspense fallback={<RouteLoader />}>
          <LegacyApp />
        </Suspense>
      )}
    </>
  );
};

export default HomeApp;
```

**Pontos críticos** (não pule):

- `capture: true` em **todos** os listeners → pegam o evento antes do
  React.
- `routeCache` retorna a **mesma** Promise → segunda visita resolve
  síncrona no microtask, **loader nunca aparece**.
- `pushState` + `dispatchEvent(new PopStateEvent('popstate'))` →
  `react-router`/`useLocation` recebem a atualização e fecham mobile
  menus automaticamente.
- `scrollTo({behavior:'instant'})` → não anima rolagem; ela é
  imperceptível.
- Mantém a página atual visível até `warmRoute().then(go)` resolver.
  **Sem flash branco**.

---

## 4. Telemetria — `src/lib/navTelemetry.ts`

Mede cada navegação, guarda últimas 30 amostras em `sessionStorage` e
loga p50/p95 sob demanda. Dispara `console.warn` automaticamente quando
uma navegação passa de **90ms** (= o threshold do loader).

```ts
const STORE_KEY = "__nav_p95__";
const MAX_SAMPLES = 30;
const SLOW_THRESHOLD_MS = 90;

type Sample = { path: string; ms: number; cached: boolean; at: number };

const isDebug = () => {
  try {
    if (new URLSearchParams(location.search).has("debug")) return true;
    return localStorage.getItem("NAV_DEBUG") === "1";
  } catch { return false; }
};

const readSamples = (): Sample[] => {
  try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]"); } catch { return []; }
};
const writeSamples = (s: Sample[]) => {
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(s.slice(-MAX_SAMPLES))); } catch {}
};
const pct = (sorted: number[], p: number) =>
  sorted.length ? Math.round(sorted[Math.min(sorted.length - 1, Math.ceil(p/100 * sorted.length) - 1)]) : 0;

export const getNavStats = () => {
  const samples = readSamples();
  const sorted = samples.map(s => s.ms).sort((a,b) => a-b);
  return { count: samples.length, p50: pct(sorted,50), p95: pct(sorted,95),
           max: sorted.at(-1) ?? 0, slowCount: samples.filter(s => s.ms > SLOW_THRESHOLD_MS).length };
};

export const startNav = (path: string) => {
  const t0 = performance.now();
  return ({ cached = false } = {}) => {
    const ms = performance.now() - t0;
    const samples = readSamples();
    samples.push({ path, ms, cached, at: Date.now() });
    writeSamples(samples);
    if (ms > SLOW_THRESHOLD_MS) {
      console.warn(`[nav] slow ${ms.toFixed(0)}ms → ${path}${cached ? " (cached)" : ""}`);
    } else if (isDebug()) {
      console.log(`%c[nav] ${ms.toFixed(0)}ms → ${path}`,
        ms < 30 ? "color:#22c55e" : ms < 90 ? "color:#eab308" : "color:#ef4444");
    }
  };
};

if (typeof window !== "undefined") (window as any).__navStats = getNavStats;
```

### Modo debug

- Adicione `?debug=nav` à URL **ou** rode `localStorage.NAV_DEBUG="1"`
  no console.
- Toda navegação loga tempo (verde `<30ms`, amarelo `<90ms`, vermelho
  acima).
- A qualquer momento: `__navStats()` no console → `{p50, p95, max,
  slowCount}`.

---

## 5. Recuperação de chunks após deploy (`src/main.tsx`)

Quando o usuário está com a página aberta e você faz deploy, os hashes
de chunks mudam e `import()` falha. Recarregue **uma vez** automaticamente:

```ts
const RELOAD_KEY = "__chunk_reloaded__";
const isChunkLoadError = (msg = "") =>
  /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk \d+ failed/i.test(msg);

const handleChunkError = (msg: string) => {
  if (!isChunkLoadError(msg)) return;
  try {
    if (sessionStorage.getItem(RELOAD_KEY)) return;  // já recarregou uma vez → não loop
    sessionStorage.setItem(RELOAD_KEY, "1");
    location.reload();
  } catch { location.reload(); }
};

window.addEventListener("error", (e) => handleChunkError(e?.message || ""));
window.addEventListener("unhandledrejection", (e) =>
  handleChunkError((e?.reason && (e.reason.message || String(e.reason))) || ""));
window.addEventListener("load", () => {
  try { sessionStorage.removeItem(RELOAD_KEY); } catch {}
});
// Evento específico do Vite para falha de preload
window.addEventListener("vite:preloadError", (e) => {
  e.preventDefault?.();
  handleChunkError("Failed to fetch dynamically imported module");
});
```

---

## Checklist de adaptação para outro portal

- [ ] Copiar shell estático para o `index.html` (ajustar logo, cores).
- [ ] Criar `src/components/RouteLoader.tsx` com a **mesma** logo/cor.
- [ ] Substituir TODOS os `<Suspense fallback={...}>` por
      `<Suspense fallback={<RouteLoader />}>`.
- [ ] Adaptar `routeImport` dentro de `warmRoute` com as rotas mais
      visitadas (3–6 caminhos quentes).
- [ ] Ajustar `preloadCommon` (linha do `setTimeout 40ms`) para a sua
      lista de rotas.
- [ ] Copiar `src/lib/navTelemetry.ts` e o handler de `ChunkLoadError`
      em `main.tsx`.
- [ ] Garantir que mobile menus chamem `setOpen(false)` em
      `useEffect(() => {...}, [location.pathname])`.
- [ ] Testar com `?debug=nav` e confirmar p95 < 90ms em rotas comuns.

---

## Sintomas e diagnóstico

| Sintoma                           | Causa provável                                          | Fix                                                                 |
| --------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| Flash branco entre rotas          | Suspense com fallback diferente do shell                | Usar `<RouteLoader />` em todos os Suspense                         |
| Logo aparece "pequena" durante nav| Fallback é o header (`h-8`) e não o RouteLoader         | RouteLoader com `clamp(13rem,58vw,22rem)`                           |
| Primeira nav rápida, segundas lentas | `routeCache` não está sendo populado                 | Conferir `pointerover`/`pointerdown` listeners em `capture: true`   |
| Loader aparece em rota cacheada   | `setShowNavLoader(true)` sem checar `navId`             | Gate por `navId.current === currentNav` antes de mostrar            |
| Mobile menu fica aberto após nav  | Componente não escuta mudança de `location`             | `useEffect(() => closeMobile(), [location.pathname])`               |
| Tela em branco após deploy        | Chunk antigo 404                                        | Handler de `vite:preloadError` + `sessionStorage` reload-once       |

---

**Resultado esperado:** TTI percebido < 100ms em rotas pré-aquecidas,
zero tela branca, uma única tela de transição quando há espera real.
`__navStats()` deve mostrar p95 < 90ms após algumas navegações.
