#!/usr/bin/env node
/**
 * Pós-build: corrige o bundle SSR gerado fora do sandbox Lovable.
 *
 * Problema: o build divide o route tree em dois chunks circulares. O chunk
 * principal cria `router_exports` com `__exportAll({ getRouter: () => getRouter })`
 * importando `__exportAll` do chunk secundário. Em ciclo ESM, `__exportAll` ainda
 * não é uma função quando o chunk principal o chama no topo, quebrando a importação
 * e fazendo o servidor ver `.getRouter` como undefined.
 *
 * Correção: remove a importação de `__exportAll` e cria `router_exports` como um
 * objeto simples, depois atribui `getRouter` após a definição da função.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SSR_DIR = path.join(ROOT, "dist/server/_ssr");

async function patchRouterChunk(filePath) {
  let content = await fs.readFile(filePath, "utf-8");

  // Substitui qualquer criação de router_exports via __exportAll por objeto simples.
  const marker = "var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });";
  const assignmentDone = content.includes("router_exports.getRouter = getRouter;");
  if (!content.includes(marker) && !content.includes(" as __exportAll") && assignmentDone) return false;

  // Remove a importação circular de __exportAll do chunk secundário, se ainda existir.
  if (content.includes(" as __exportAll")) {
    content = content.replace(
      /,?\s*\w+\s+as\s+__exportAll\s*,?/g,
      (match) => {
        const trimmed = match.replace(/^,\s*|,\s*$/g, "");
        return trimmed === match ? "" : ", ";
      }
    );
  }

  content = content.replace(
    marker,
    `var router_exports = /* @__PURE__ */ (() => {
  const mod = {};
  Object.defineProperty(mod, Symbol.toStringTag, { value: "Module" });
  return mod;
})();`
  );

  // Garante que router_exports tenha a função getRouter depois de definida.
  if (!content.includes("router_exports.getRouter = getRouter;")) {
    content = content.replace(
      /(var getRouter = \(\) => \{[\s\S]*?defaultPreloadStaleTime: 0\s*\n\s*\}\);\s*\n\s*\};)/,
      "$1\nrouter_exports.getRouter = getRouter;"
    );
  }

  await fs.writeFile(filePath, content, "utf-8");
  return true;
}

async function main() {
  const files = await fs.readdir(SSR_DIR);
  const routerFiles = files.filter(
    (f) => f.startsWith("router-") && f.endsWith(".mjs") && !f.endsWith("2.mjs")
  );

  let patched = 0;
  for (const file of routerFiles) {
    const p = path.join(SSR_DIR, file);
    const size = (await fs.stat(p)).size;
    // O chunk principal é o maior (centenas de kB); o "2" é o secundário.
    if (size < 200_000) continue;
    if (await patchRouterChunk(p)) {
      console.log(`[postbuild-patch] corrigido ${file}`);
      patched++;
    }
  }
  if (!patched) console.log("[postbuild-patch] nenhum patch necessário");
}

main().catch((err) => {
  console.error("[postbuild-patch] erro:", err);
  process.exit(1);
});
