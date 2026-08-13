#!/usr/bin/env node
/**
 * UPLOAD DE SOURCEMAPS PARA O SENTRY (release = versão do build).
 *
 * Usa a API HTTP oficial de releases — sem SDK e sem CLI adicional:
 *   1. cria a release  POST /releases/
 *   2. sobe cada .map  POST /releases/<v>/files/  (name = ~/assets/<arquivo>)
 *   3. finaliza        PUT  /releases/<v>/        (dateReleased)
 *   4. remove os .map de dist/ para não expor código-fonte em produção
 *
 * Env necessárias (job de deploy):
 *   SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT
 *   APP_VERSION (opcional — default: git short sha)
 *
 * Sem env o script sai com sucesso e não faz nada (fail-closed, não bloqueia).
 * Uso: node scripts/upload-sentry-sourcemaps.mjs [dist]
 */
import { readdirSync, readFileSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const DIST = process.argv[2] || "dist";
const { SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = process.env;
const HOST = process.env.SENTRY_URL || "https://sentry.io";

const version =
  process.env.APP_VERSION ||
  (() => {
    try {
      return execSync("git rev-parse --short HEAD").toString().trim();
    } catch {
      return `b${Date.now().toString(36)}`;
    }
  })();

if (!SENTRY_AUTH_TOKEN || !SENTRY_ORG || !SENTRY_PROJECT) {
  console.log("⏭️  Sentry não configurado (SENTRY_AUTH_TOKEN/ORG/PROJECT) — upload ignorado.");
  process.exit(0);
}
if (!existsSync(DIST)) {
  console.error(`✖ ${DIST}/ ausente — rode o build antes do upload.`);
  process.exit(1);
}

const api = `${HOST}/api/0/organizations/${SENTRY_ORG}/releases`;
const auth = { Authorization: `Bearer ${SENTRY_AUTH_TOKEN}` };

const call = async (url, init) => {
  const res = await fetch(url, init);
  const body = await res.text();
  if (!res.ok && res.status !== 409) throw new Error(`Sentry [${res.status}] ${url} → ${body.slice(0, 300)}`);
  return body;
};

const walk = (dir, out = []) => {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (nome.endsWith(".map")) out.push(p);
  }
  return out;
};

await call(`${api}/`, {
  method: "POST",
  headers: { ...auth, "Content-Type": "application/json" },
  body: JSON.stringify({ version, projects: [SENTRY_PROJECT] }),
});

const mapas = walk(DIST);
if (!mapas.length) {
  console.log("⚠ Nenhum .map encontrado — habilite sourcemaps no build (SENTRY_AUTH_TOKEN presente).");
}

let enviados = 0;
for (const arquivo of mapas) {
  const rel = arquivo.slice(DIST.length + 1).replace(/\\/g, "/");
  const form = new FormData();
  form.set("name", `~/${rel}`);
  form.set("file", new Blob([readFileSync(arquivo)]), rel.split("/").pop());
  await call(`${api}/${encodeURIComponent(version)}/files/`, {
    method: "POST",
    headers: auth,
    body: form,
  });
  enviados += 1;
  unlinkSync(arquivo); // sourcemap nunca vai para produção
}

await call(`${api}/${encodeURIComponent(version)}/`, {
  method: "PUT",
  headers: { ...auth, "Content-Type": "application/json" },
  body: JSON.stringify({ dateReleased: new Date().toISOString() }),
});

console.log(`✔ Sentry release ${version}: ${enviados} sourcemap(s) enviados e removidos de ${DIST}/.`);
