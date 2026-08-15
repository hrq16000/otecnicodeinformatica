// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { execSync } from "node:child_process";
import { imagetools } from "vite-imagetools";

// Força modo produção para builds fora do sandbox Lovable, garantindo que o
// runtime JSX de produção seja usado também no SSR.
process.env.NODE_ENV = "production";
console.log("[vite.config] NODE_ENV =", process.env.NODE_ENV);

const resolveAppVersion = () => {
  if (process.env['APP_VERSION']) return process.env['APP_VERSION'];
  if (process.env['VERCEL_GIT_COMMIT_SHA']) return process.env['VERCEL_GIT_COMMIT_SHA'].slice(0, 7);
  if (process.env['COMMIT_REF']) return process.env['COMMIT_REF'].slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return `b${Date.now().toString(36)}`;
  }
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // O prerender integrado do TanStack Start precisa de ajustes para o preset
    // cloudflare-module. Usamos scripts/prerender-blog.mjs para renderizar as
    // rotas /blog/:slug aprovadas manualmente após o build.
    prerender: {
      enabled: false,
    },
  },
  // Força output do Nitro para dist/ em builds locais e fora do sandbox Lovable.
  // O preset cloudflare-module mantem compatibilidade com o deploy no Lovable.
  nitro: {
    preset: "cloudflare-module",
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist/client",
    },
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
    },
  },
  vite: {
    plugins: [imagetools()],
    define: {
      __APP_VERSION__: JSON.stringify(resolveAppVersion()),
      __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    build: {
      chunkSizeWarningLimit: 800,
    },
  },
});
