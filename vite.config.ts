// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { execSync } from "node:child_process";
import { imagetools } from "vite-imagetools";

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
  },
  vite: {
    plugins: [imagetools()],
    define: {
      __APP_VERSION__: JSON.stringify(resolveAppVersion()),
      __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    build: {
      chunkSizeWarningLimit: 800,
    },
  },
});
