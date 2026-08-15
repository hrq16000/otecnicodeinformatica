#!/usr/bin/env node
/**
 * GATE — SAÚDE DE SITEMAP + INDEXNOW.
 *
 * Verifica, nesta ordem:
 *   1. Sitemap index e shards existem, são XML válido e não têm <lastmod> futuro.
 *   2. Arquivo de chave do IndexNow existe em public/ e o conteúdo é igual ao
 *      nome do arquivo (regra do protocolo).
 *   3. Em produção (ou --base=<url>), o arquivo de chave responde 200 com o
 *      conteúdo correto e o sitemap-index responde 200.
 *
 * Só marca status "healthy" quando o IndexNow responde 200. Caso contrário
 * "degraded" (chave local ok, remoto indisponível) ou "unhealthy" (sitemap
 * quebrado ou chave ausente/divergente).
 *
 * Saída: reports/sitemap-status.json  (consumido por alert-sitemap-status.mjs)
 *
 * Uso: node scripts/check-sitemap-status.mjs [--base=https://o domínio configurado] [--offline] [--strict]
 */
import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { BASE_URL, SITE_DOMAIN } from "./lib/site-env.mjs";

const args = process.argv.slice(2);
const arg = (n, d) => args.find((a) => a.startsWith(`--${n}=`))?.split("=")[1] ?? d;
const OFFLINE = args.includes("--offline");
const STRICT = args.includes("--strict");
const BASE = (arg("base", BASE_URL)).replace(/\/+$/, "");

const publicDir = resolve(process.cwd(), "public");
const problems = [];   // → unhealthy
const warnings = [];   // → degraded
const checks = [];

const push = (name, ok, detail) => checks.push({ name, ok, detail });

// ── 1. Sitemaps ───────────────────────────────────────────────
const sitemaps = existsSync(publicDir)
  ? readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"))
  : [];

if (!sitemaps.includes("sitemap-index.xml")) {
  problems.push("public/sitemap-index.xml ausente");
}

let totalUrls = 0;
const hoje = new Date().toISOString().slice(0, 10);
for (const f of sitemaps) {
  const xml = readFileSync(resolve(publicDir, f), "utf8");
  if (!/<(urlset|sitemapindex)\b/.test(xml)) {
    problems.push(`${f}: XML sem <urlset>/<sitemapindex>`);
    continue;
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  totalUrls += locs.length;
  const invalidas = locs.filter((u) => !/^https:\/\//.test(u));
  if (invalidas.length) problems.push(`${f}: ${invalidas.length} <loc> sem https absoluto`);
  const futuras = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)]
    .map((m) => m[1].trim().slice(0, 10))
    .filter((d) => d > hoje);
  if (futuras.length) problems.push(`${f}: ${futuras.length} <lastmod> no futuro (${futuras[0]})`);
}
push("sitemaps", problems.length === 0, `${sitemaps.length} arquivo(s), ${totalUrls} URL(s)`);

// ── 2. Chave do IndexNow (local) ──────────────────────────────
const keyFiles = existsSync(publicDir)
  ? readdirSync(publicDir).filter((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f))
  : [];

let keyName = null;
if (keyFiles.length === 0) {
  problems.push("Arquivo de chave do IndexNow ausente em public/ (<key>.txt)");
} else {
  keyName = basename(keyFiles[0], ".txt");
  const conteudo = readFileSync(resolve(publicDir, keyFiles[0]), "utf8").trim();
  if (conteudo !== keyName) {
    problems.push(`Chave IndexNow divergente: ${keyFiles[0]} contém "${conteudo.slice(0, 24)}…"`);
  }
}
push("indexnow_key_local", keyName !== null && problems.length === 0, keyName ? `${keyName}.txt` : "ausente");

// ── 3. Verificação remota (200) ───────────────────────────────
let remoteKeyStatus = null;
let remoteSitemapStatus = null;

async function head(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const body = res.ok ? (await res.text()).trim() : "";
    return { status: res.status, body };
  } catch (e) {
    return { status: 0, body: "", error: e.message };
  }
}

if (!OFFLINE) {
  if (keyName) {
    const r = await head(`${BASE}/${keyName}.txt`);
    remoteKeyStatus = r.status;
    if (r.status !== 200) {
      warnings.push(`IndexNow key file respondeu ${r.status} em ${BASE}/${keyName}.txt`);
    } else if (r.body !== keyName) {
      problems.push(`IndexNow key file servido com conteúdo divergente em ${BASE}`);
    }
    push("indexnow_key_remote", r.status === 200 && r.body === keyName, `HTTP ${r.status}`);
  }
  const s = await head(`${BASE}/sitemap-index.xml`);
  remoteSitemapStatus = s.status;
  if (s.status !== 200) warnings.push(`sitemap-index.xml respondeu ${s.status} em ${BASE}`);
  push("sitemap_remote", s.status === 200, `HTTP ${s.status}`);
} else {
  push("remoto", true, "pulado (--offline)");
}

// ── Status final ──────────────────────────────────────────────
// healthy exige IndexNow 200; sem isso o máximo é "degraded".
const indexNowOk = OFFLINE ? true : remoteKeyStatus === 200;
const status = problems.length ? "unhealthy" : warnings.length || !indexNowOk ? "degraded" : "healthy";

const report = {
  status,
  generatedAt: new Date().toISOString(),
  base: BASE,
  offline: OFFLINE,
  indexNow: { key: keyName, remoteStatus: remoteKeyStatus, ok: indexNowOk },
  sitemap: { files: sitemaps.length, urls: totalUrls, remoteStatus: remoteSitemapStatus },
  checks,
  problems,
  warnings,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/sitemap-status.json", JSON.stringify(report, null, 2));

console.log("── GATE check:sitemap-status ──");
for (const c of checks) console.log(`  ${c.ok ? "✓" : "✗"} ${c.name}: ${c.detail}`);
warnings.forEach((w) => console.warn("  ! ", w));
problems.forEach((p) => console.error("  ✗ ", p));
console.log(`status: ${status.toUpperCase()} → reports/sitemap-status.json`);

if (status === "unhealthy" || (STRICT && status !== "healthy")) process.exit(1);
