#!/usr/bin/env node
/**
 * SMOKE DE BORDA PÓS-DEPLOY — contrato HTTP mínimo, executado após cada deploy.
 *
 * Valida três garantias que a aplicação sozinha não consegue provar:
 *   1. URLs inexistentes  → 404 real (nunca 200 com o shell da SPA)
 *   2. Assets inexistentes → 404 real
 *   3. Rotas válidas com `noindex` → continuam 200 (não podem virar 404)
 *   + amostra de rotas indexáveis → 200
 *
 * Fonte da verdade: dist/route-manifest.json + o HTML gerado no build
 * (rotas cujo `<meta name="robots">` contém `noindex`).
 *
 * Uso:
 *   node scripts/smoke-edge-post-deploy.mjs --base=https://exemplo.com
 *   SITE_BASE_URL=... npm run smoke:edge:post-deploy
 *
 * Artefatos: reports/edge-smoke-post-deploy.json e .md (resumo no CI)
 * Fail-closed: qualquer divergência encerra com código 1.
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync, appendFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { BASE_URL } from "./lib/site-env.mjs";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};

const DIST = path.resolve(flag("dist", "dist"));
const BASE = (flag("base", "") || process.env.SITE_BASE_URL || BASE_URL).replace(/\/+$/, "");
const TIMEOUT = Number(flag("timeout", 15000));
const MAX_NOINDEX = Number(flag("noindex", 12));
const MAX_VALID = Number(flag("valid", 10));
const FAKE_COUNT = Number(flag("fake", 12));
const FAKE_ASSETS = Number(flag("fake-assets", 6));

const manifestPath = path.join(DIST, "route-manifest.json");
if (!existsSync(manifestPath)) {
  console.error(`✗ ${manifestPath} ausente — rode \`npm run build\` antes do smoke.`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const validExact = manifest.validExact ?? [];

/** Amostra determinística e espalhada. */
const sample = (list, n) => {
  if (list.length <= n) return [...list];
  const step = list.length / n;
  return Array.from({ length: n }, (_, i) => list[Math.floor(i * step)]);
};

/** Rotas do build cujo HTML declara robots noindex. */
function noindexRoutes() {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (entry !== "index.html") continue;
      const rel = path.relative(DIST, full).replace(/index\.html$/, "").replace(/\/+$/, "");
      const route = rel === "" ? "/" : `/${rel}`;
      if (!validExact.includes(route)) continue;
      const html = readFileSync(full, "utf8");
      const meta = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] ?? "";
      if (/noindex/i.test(meta)) out.push(route);
    }
  };
  walk(DIST);
  return out.sort();
}

const FAKE_SEEDS = ["notebook", "computador", "ssd", "wifi", "impressora", "batel"];
function fakePaths(n) {
  const out = [];
  let i = 0;
  while (out.length < n) {
    const seed = FAKE_SEEDS[i % FAKE_SEEDS.length];
    const bucket = Math.floor(i / FAKE_SEEDS.length);
    for (const p of [
      `/${seed}-inexistente-${bucket}-${Date.now() % 100000}`,
      `/servicos/${seed}-nao-existe-${bucket}`,
      `/problemas/${seed}-fantasma-${bucket}`,
    ]) {
      if (out.length < n && !validExact.includes(p)) out.push(p);
    }
    i++;
  }
  return out;
}

const fakeAssets = (n) =>
  Array.from({ length: n }, (_, i) => [
    `/assets/inexistente-${i}.js`,
    `/assets/inexistente-${i}.css`,
    `/imagens/inexistente-${i}.webp`,
  ][i % 3]);

async function head(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { redirect: "manual", signal: controller.signal, headers: { "user-agent": "otdi-edge-smoke/1.0" } });
    return { status: res.status };
  } catch (err) {
    return { status: 0, error: String(err?.message ?? err) };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
async function expect(group, pathname, expected) {
  const { status, error } = await head(`${BASE}${pathname}`);
  const ok = Array.isArray(expected) ? expected.includes(status) : status === expected;
  results.push({ group, path: pathname, status, expected, ok, error });
  return ok;
}

const noindex = sample(noindexRoutes(), MAX_NOINDEX);
const indexaveis = sample(validExact.filter((p) => !noindex.includes(p)), MAX_VALID);

console.log("── Smoke de borda pós-deploy ──");
console.log(`  base: ${BASE}`);
console.log(`  rotas noindex detectadas no build: ${noindexRoutes().length} (amostra ${noindex.length})`);

for (const p of indexaveis) await expect("rota-indexavel", p, 200);
for (const p of noindex) await expect("rota-noindex", p, 200);
for (const p of fakePaths(FAKE_COUNT)) await expect("url-inexistente", p, 404);
for (const p of fakeAssets(FAKE_ASSETS)) await expect("asset-inexistente", p, 404);

// ── Cenários-limite (mesmo critério fail-closed) ──
// 1. Query string não pode ressuscitar rota inexistente nem quebrar rota válida.
for (const p of fakePaths(2)) await expect("query-em-url-inexistente", `${p}?utm_source=ads&utm_medium=cpc`, 404);
for (const p of indexaveis.slice(0, 2)) await expect("query-em-rota-valida", `${p}?utm_source=ads&page=2`, 200);

// 2. Assets com caminho parecido com um asset real → 404.
const assetsReais = (manifest.assetFiles ?? [])
  .map((f) => (f.startsWith("/") ? f : `/${f}`))
  .filter((f) => /\.[a-z0-9]{1,8}$/i.test(f));
for (const real of sample(assetsReais, 3)) {
  await expect("asset-real", real, 200);
  await expect("asset-parecido", real.replace(/(\.[a-z0-9]+)$/i, "-copy$1"), 404);
  await expect("asset-parecido", `${real}.map`, 404);
}

// 3. www é secundário: precisa redirecionar permanentemente para o apex.
try {
  const apex = new URL(BASE);
  if (!apex.hostname.startsWith("www.")) {
    const wwwBase = `${apex.protocol}//www.${apex.hostname}`;
    const alvo = indexaveis[0] ?? "/";
    const r = await head(`${wwwBase}${alvo}?utm_source=smoke`);
    const okWww = [301, 308].includes(r.status);
    results.push({
      group: "www-para-apex",
      path: `${wwwBase}${alvo}?utm_source=smoke`,
      status: r.status,
      expected: "301|308",
      ok: okWww,
      error: r.error,
    });
  }
} catch { /* base sem host válido: ignorado */ }

// 4. Caminhos de borda malformados nunca podem responder 200.
for (const p of ["/../../etc/passwd", "/%2e%2e/%2e%2e/etc/passwd", "//evil.example.com"]) {
  await expect("path-malformado", p, [301, 308, 400, 403, 404]);
}

const falhas = results.filter((r) => !r.ok);
mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/edge-smoke-post-deploy.json",
  JSON.stringify({ base: BASE, checkedAt: new Date().toISOString(), total: results.length, falhas: falhas.length, results }, null, 2),
);

// Relatório navegável (Markdown) — vira log e artefato no CI.
const porGrupo = new Map();
for (const r of results) {
  const g = porGrupo.get(r.group) ?? { total: 0, falhas: 0 };
  g.total += 1;
  if (!r.ok) g.falhas += 1;
  porGrupo.set(r.group, g);
}
const md = [
  `# Smoke de borda pós-deploy`,
  ``,
  `- Base: \`${BASE}\``,
  `- Verificado em: ${new Date().toISOString()}`,
  `- Verificações: **${results.length}** · Falhas: **${falhas.length}**`,
  ``,
  `| Grupo | Verificações | Falhas |`,
  `| --- | ---: | ---: |`,
  ...[...porGrupo.entries()].map(([g, v]) => `| ${g} | ${v.total} | ${v.falhas} |`),
  ``,
  falhas.length ? `## Falhas` : `Todas as verificações passaram.`,
  ...(falhas.length
    ? [
        ``,
        `| Grupo | Caminho | Status | Esperado |`,
        `| --- | --- | ---: | ---: |`,
        ...falhas.map((r) => `| ${r.group} | \`${r.path}\` | ${r.status} | ${r.expected} |`),
      ]
    : []),
  ``,
].join("\n");
writeFileSync("reports/edge-smoke-post-deploy.md", md);
if (process.env.GITHUB_STEP_SUMMARY) {
  try {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${md}\n`);
  } catch { /* summary indisponível: não bloqueia */ }
}

for (const r of results) {
  if (!r.ok) console.error(`  ✗ [${r.group}] ${r.path} → ${r.status} (esperado ${r.expected})${r.error ? ` — ${r.error}` : ""}`);
}
console.log(`  verificações: ${results.length} · falhas: ${falhas.length}`);
if (falhas.length) {
  console.error("✗ contrato HTTP da borda quebrado — 404 real e/ou rotas noindex fora do esperado.");
  process.exit(1);
}
console.log("✔ 404 real para URLs e assets inexistentes; rotas noindex válidas seguem 200.");
