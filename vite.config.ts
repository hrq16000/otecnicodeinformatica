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

          // React core
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/react-router") ||
            id.includes("/react-helmet")
          ) {
            return "vendor-react";
          }

          // Radix UI primitives (heavy & shared across many pages)
          if (id.includes("@radix-ui/")) return "vendor-radix";

          // Supabase client
          if (id.includes("@supabase/")) return "vendor-supabase";

          // Markdown rendering stack (used by ProblemaPage + BlogPost)
          if (
            id.includes("/react-markdown/") ||
            id.includes("/remark-") ||
            id.includes("/rehype-") ||
            id.includes("/micromark") ||
            id.includes("/mdast-") ||
            id.includes("/hast-") ||
            id.includes("/unified/") ||
            id.includes("/unist-")
          ) {
            return "vendor-markdown";
          }

          // Lucide icons (single big lib used everywhere)
          if (id.includes("lucide-react")) return "vendor-lucide";

          // Form/validation (zod, react-hook-form)
          if (id.includes("/zod/") || id.includes("react-hook-form")) {
            return "vendor-forms";
          }

          // jspdf/html2canvas already split via dynamic import in AdminFunnel;
          // pin them anyway so they never leak into other chunks.
          if (id.includes("jspdf") || id.includes("html2canvas")) {
            return "vendor-pdf";
          }

          return "vendor";
        },
      },
    },
  },
}));
