#!/usr/bin/env node
// Pré-voo somente leitura do Worker de borda (Frente B, Rodada 2A.2).
// Não chama a Cloudflare, não publica nada. Falha se o worker não estiver
// apto: zona errada, manifesto implausível ou origem placeholder.
import { readFileSync, existsSync } from "node:fs";
import { compileManifest, assertManifestSane, ORIGIN_PLACEHOLDER, ALLOWED_HOSTS } from "./lib/edge-router.mjs";

const problems = [];
const info = [];

const toml = readFileSync("cloudflare/wrangler.toml", "utf8");
const name = toml.match(/^name\s*=\s*"([^"]+)"/m)?.[1];
if (name !== "tecnico-curitiba-route-guard") problems.push(`nome do worker inesperado: ${name}`);
info.push(`worker: ${name}`);

const zones = [...toml.matchAll(/zone_name\s*=\s*"([^"]+)"/g)].map((m) => m[1]);
if (!zones.length) problems.push("nenhuma zone_name declarada");
for (const z of zones) if (z !== "tecnico.curitiba.br") problems.push(`zona inválida: ${z}`);
if (/custom_domain\s*=\s*true/.test(toml)) problems.push("custom_domain = true não é permitido");
info.push(`zonas: ${[...new Set(zones)].join(", ")}`);

const routes = [...toml.matchAll(/pattern\s*=\s*"([^"]+)"/g)].map((m) => m[1]);
for (const r of routes) {
  const host = r.split("/")[0];
  if (!ALLOWED_HOSTS.includes(host)) problems.push(`rota fora dos hosts permitidos: ${r}`);
}
info.push(`rotas: ${routes.join(", ") || "(nenhuma ativa)"}`);

const origin = toml.match(/LOVABLE_ORIGIN\s*=\s*"([^"]+)"/)?.[1];
info.push(`origem: ${origin}`);
const blockedByOrigin = origin === ORIGIN_PLACEHOLDER;

if (!existsSync("dist/route-manifest.json")) {
  problems.push("dist/route-manifest.json ausente — rode npm run build");
} else {
  const manifest = JSON.parse(readFileSync("dist/route-manifest.json", "utf8"));
  const compiled = compileManifest(manifest);
  problems.push(...assertManifestSane(compiled).map((p) => `manifesto: ${p}`));
  info.push(
    `manifesto: ${compiled.counts.validExact} rotas exatas, ${compiled.counts.redirects} aliases, ${compiled.counts.assetFiles} assets`,
  );
  if (!existsSync("dist/404.html")) problems.push("dist/404.html ausente");
}

console.log("Pré-voo do Worker (somente leitura)");
for (const i of info) console.log(`  ${i}`);
for (const p of problems) console.error(`  ERRO: ${p}`);

if (problems.length) {
  console.error("NÃO APTO: corrija os erros acima.");
  process.exit(1);
}
if (blockedByOrigin) {
  console.log("PUBLICAÇÃO BLOQUEADA: LOVABLE_ORIGIN ainda é placeholder (esperado nesta rodada).");
  process.exit(0);
}
console.log("APTO: configuração consistente e origem definida.");
