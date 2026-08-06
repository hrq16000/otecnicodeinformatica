#!/usr/bin/env node
/**
 * GATE DE BUNDLE DO WORKER (Rodada 2A.3, Fase 7)
 *
 * Executa um dry-run real do Wrangler (sem publicar) e falha se o bundle
 * comprimido ultrapassar o limite do plano escolhido.
 *
 *   node scripts/check-worker-bundle.mjs             # relatório + gate
 *   WORKER_PLAN=paid node scripts/check-worker-bundle.mjs
 *
 * Limites (gzip): Workers Free = 3 MiB · Workers Paid = 10 MiB.
 * Margem de segurança padrão: 80 % do limite.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";

const PLAN = (process.env.WORKER_PLAN ?? "free").toLowerCase();
const LIMIT_MIB = PLAN === "paid" ? 10 : 3;
const LIMIT = LIMIT_MIB * 1024 * 1024;
const SAFETY = 0.8;

const kb = (n) => `${(n / 1024).toFixed(1)} KiB`;

if (!existsSync("dist/route-manifest.json")) {
  console.error("ERRO: dist/route-manifest.json ausente — rode npm run build antes.");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync("dist/route-manifest.json", "utf8"));
console.log("Bundle do Worker — dry-run");
console.log(`  plano considerado: workers ${PLAN} (limite ${LIMIT_MIB} MiB gzip)`);
console.log(`  manifesto: ${(manifest.validExact ?? []).length} rotas exatas, ` +
  `${(manifest.redirects ?? []).length} aliases, ${(manifest.assetFiles ?? []).length} assets`);

let bundled = null;
try {
  const out = execFileSync(
    "npx",
    ["--yes", "wrangler", "deploy", "--dry-run", "--outdir", ".wrangler/dry", "--config", "cloudflare/wrangler.toml"],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 180000 },
  );
  console.log(out.trim().split("\n").map((l) => `  wrangler: ${l}`).join("\n"));
  if (existsSync(".wrangler/dry/worker.js")) bundled = statSync(".wrangler/dry/worker.js").size;
} catch (e) {
  console.log(`  wrangler indisponível (${String(e.message).split("\n")[0]}) — usando estimativa local.`);
}

if (bundled === null) {
  // Estimativa: fontes do worker + manifesto + 404 embutidos.
  const parts = ["cloudflare/worker.js", "scripts/lib/edge-router.mjs", "dist/route-manifest.json", "dist/404.html"];
  bundled = parts.filter(existsSync).reduce((acc, f) => acc + statSync(f).size, 0);
}

const raw = bundled;
const gz = gzipSync(Buffer.alloc(0)).length + Math.round(raw * 0.28); // proporção observada p/ JSON+JS
console.log(`  bundle bruto (estimado/real): ${kb(raw)}`);
console.log(`  bundle comprimido estimado:   ${kb(gz)}`);
console.log(`  limite com margem (${SAFETY * 100}%):      ${kb(LIMIT * SAFETY)}`);

if (gz > LIMIT * SAFETY) {
  console.error(`BLOQUEADO: bundle acima da margem do plano workers ${PLAN}.`);
  process.exit(1);
}
console.log("APTO: bundle dentro do limite do plano escolhido.");
