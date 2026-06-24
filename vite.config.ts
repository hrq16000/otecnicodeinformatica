import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// @ts-expect-error - JS plugin without types
import { prerenderCitiesPlugin } from "./scripts/prerender-cities.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    prerenderCitiesPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // Produção estava congelando antes da hidratação por um ciclo TDZ entre
          // vendor-react e vendor (`Cannot access 'kf' before initialization`).
          // Um único vendor elimina imports circulares entre chunks de libs.
          return "vendor";
        },
      },
    },
  },
}));
