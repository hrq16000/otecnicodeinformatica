#!/usr/bin/env node
/**
 * REVALIDAÇÃO PERIÓDICA DAS ROTAS LOCAIS PROMOVIDAS (Rodada 5D)
 *
 * Reexecuta, em lote, a verificação de canonical / robots / sitemap e os
 * gates de schema e antidoorway sobre as rotas que a `localIndexPolicy`
 * declara como `index`. Escreve reports/local-regression.json e, com
 * `--alert`, dispara Slack e/ou e-mail (Resend) quando houver regressão.
 *
 * Uso:
 *   node scripts/check-local-regression.mjs [dist] [--alert] [--strict]
 *
 * Fail-closed: dist ausente ou rota promovida sem HTML = regressão.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { BASE_URL, SITE_DOMAIN } from "./lib/site-env.mjs";

const args = process.argv.slice(2);
const DIST = args.find((a) => !a.startsWith("--")) || "dist";
const ALERT = args.includes("--alert");
const STRICT = args.includes("--strict");

const policy = JSON.parse(readFileSync("src/lib/localIndexPolicy.json", "utf8"));
// RODADA 5E: bairros âncora promovidos entram no escopo da revalidação.
const bairros = (policy.bairrosAncora ?? []).map((b) => ({
  path: `/bairros/${b.slug}`,
  indexability: "index",
  sitemap: true,
  cidade: b.cidade,
  family: "BAIRRO",
}));
const promovidas = [...policy.entities.filter((e) => e.indexability === "index"), ...bairros];

const problemas = [];
const rotas = [];

// ── 1. canonical / robots / HTML por rota promovida ───────────────────────
await prepararSsr(rotasLocais({ incluirSitemap: true }), { dist: DIST });
abortarSeBloqueado("check-local-regression");

const htmlDe = (path) => htmlDaRota(path, DIST);

const sitemapUrls = new Set();
for (const f of ["public/sitemap.xml", "public/sitemap-servicos.xml", "public/sitemap-main.xml", "public/sitemap-regioes.xml", "public/sitemap-bairros.xml"]) {
  if (!existsSync(f)) continue;
  for (const m of readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapUrls.add(m[1].replace(BASE_URL, "").replace(/\/$/, "") || "/");
  }
}

for (const e of promovidas) {
  const html = htmlDe(e.path);
  const row = { path: e.path, html: Boolean(html), canonical: null, robots: null, sitemap: sitemapUrls.has(e.path), schemas: [] };
  if (!html) {
    problemas.push(`${e.path}: HTML ausente em ${DIST} (rota promovida sem página gerada)`);
  } else {
    row.canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? null;
    row.robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "index,follow";
    const esperado = `${BASE_URL}${e.canonical ?? e.path}`;
    if (row.canonical !== esperado) problemas.push(`${e.path}: canonical "${row.canonical}" ≠ policy "${esperado}"`);
    if (/noindex/i.test(row.robots)) problemas.push(`${e.path}: robots "${row.robots}" contradiz policy index`);
    row.schemas = [...html.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)].map((m) => m[1]);
    const servicoCidade = /^\/servicos\/[^/]+\/[^/]+$/.test(e.path);
    if (servicoCidade) {
      // Contrato completo das rotas serviço × cidade (Rodadas 5C/5D).
      for (const tipo of ["Service", "WebPage", "BreadcrumbList"]) {
        if (!row.schemas.includes(tipo)) problemas.push(`${e.path}: ${tipo} ausente`);
      }
    } else if (!row.schemas.some((t) => ["WebPage", "WebSite", "CollectionPage", "LocalBusiness", "Organization"].includes(t))) {
      problemas.push(`${e.path}: nenhum schema principal emitido`);
    }
    // areaServed deve nomear a cidade da própria URL (nunca herdar Curitiba).
    const cidade = e.path.split("/")[3];
    if (e.family === "BAIRRO") {
      // Bairro nunca pode herdar a cidade errada nem criar filial fictícia.
      const nomeCidade = e.cidade ?? "";
      if (nomeCidade && !new RegExp(nomeCidade.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(html))
        problemas.push(`${e.path}: página não menciona a cidade-pai (${nomeCidade})`);
      if (!row.schemas.includes("WebPage")) problemas.push(`${e.path}: WebPage ausente`);
      if (!row.schemas.includes("BreadcrumbList")) problemas.push(`${e.path}: BreadcrumbList ausente`);
    }
    if (cidade === "sao-jose-dos-pinhais" && !/S[aã]o Jos[eé] dos Pinhais/.test(html)) {
      problemas.push(`${e.path}: areaServed/conteúdo não menciona São José dos Pinhais`);
    }
  }
  if (e.sitemap && !row.sitemap) problemas.push(`${e.path}: policy pede sitemap=true, mas a URL não está nos sitemaps`);
  if (!e.sitemap && row.sitemap) problemas.push(`${e.path}: URL no sitemap sem sitemap=true na policy`);
  rotas.push(row);
}

// ── 2. gates existentes ───────────────────────────────────────────────────
const GATES = [
  ["local-index-policy", "check:local-index-policy"],
  ["local-doorway", "check:local-doorway"],
  ["local-service-intent", "check:local-service-intent"],
  ["local-neighborhood-intent", "check:local-neighborhood-intent"],
  ["schema-standards", "check:schema-standards"],
  ["robots", "check:robots"],
  ["sitemap-source", "check:sitemap-source"],
];

const gates = [];
for (const [nome, script] of GATES) {
  try {
    execFileSync("npm", ["run", "--silent", script], { stdio: "pipe" });
    gates.push({ gate: nome, status: "ok" });
  } catch (err) {
    const saida = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim().slice(-600);
    gates.push({ gate: nome, status: "falhou", saida });
    problemas.push(`gate ${nome} falhou: ${saida.split("\n").slice(-3).join(" | ")}`);
  }
}

const relatorio = {
  geradoEm: new Date().toISOString(),
  base: BASE_URL,
  rotasPromovidas: promovidas.length,
  status: problemas.length === 0 ? "healthy" : "regression",
  problemas,
  gates,
  rotas,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/local-regression.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(`[local-regression] ${promovidas.length} rotas promovidas · status ${relatorio.status}`);
gates.forEach((g) => console.log(`  gate ${g.gate}: ${g.status}`));
problemas.forEach((p) => console.error(`  ✖ ${p}`));

// ── 3. alerta ─────────────────────────────────────────────────────────────
if (ALERT && relatorio.status === "regression") {
  const titulo = `Regressão nas rotas locais promovidas — ${SITE_DOMAIN}`;
  const corpo = [titulo, "", ...problemas.map((p) => `• ${p}`)].join("\n");
  const enviar = async (nome, url, body, headers = {}) => {
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
      console.log(`[local-regression] ${nome}: HTTP ${res.status}`);
    } catch (e) {
      console.error(`[local-regression] ${nome} falhou: ${e.message}`);
    }
  };
  if (process.env.SLACK_WEBHOOK_URL) {
    await enviar("slack", process.env.SLACK_WEBHOOK_URL, {
      text: `:rotating_light: ${titulo}`,
      blocks: [
        { type: "header", text: { type: "plain_text", text: titulo } },
        { type: "section", text: { type: "mrkdwn", text: problemas.slice(0, 20).map((p) => `• ${p}`).join("\n") } },
      ],
    });
  }
  if (process.env.ALERT_EMAIL_TO && process.env.RESEND_API_KEY) {
    await enviar(
      "email",
      "https://api.resend.com/emails",
      {
        from: process.env.ALERT_EMAIL_FROM || `alertas@${SITE_DOMAIN}`,
        to: process.env.ALERT_EMAIL_TO.split(",").map((s) => s.trim()),
        subject: titulo,
        text: corpo,
      },
      { authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    );
  }
  if (!process.env.SLACK_WEBHOOK_URL && !process.env.ALERT_EMAIL_TO) {
    console.warn("[local-regression] nenhum canal de alerta configurado.");
  }
}

if (STRICT && relatorio.status === "regression") process.exit(1);
