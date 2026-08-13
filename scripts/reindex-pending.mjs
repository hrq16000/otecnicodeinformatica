#!/usr/bin/env node
/**
 * PÓS-DEPLOY — REVALIDAÇÃO DE URLs NÃO INDEXADAS (com backoff).
 *
 * 1. Lê as URLs curadas do sitemap gerado (fonte da verdade do manifesto).
 * 2. Consulta o estado real no índice do Google (URL Inspection, leitura).
 * 3. Para as pendentes, reenvia sinal de rastreio de forma escalonada:
 *      • ressubmete o sitemap na propriedade (uma vez por execução);
 *      • dispara IndexNow em lotes com backoff exponencial e jitter.
 * 4. Gera relatório com o MOTIVO de cada pendência.
 *
 * O URL Inspection NÃO solicita indexação — ele só lê o estado. O pedido de
 * rastreio manual continua sendo feito pelo usuário no Search Console.
 *
 * Uso:
 *   node scripts/reindex-pending.mjs               # relatório + reenvio
 *   node scripts/reindex-pending.mjs --dry-run     # só relatório
 *   node scripts/reindex-pending.mjs --limit 40
 *   node scripts/reindex-pending.mjs --alert       # exit 1 se houver pendência
 *
 * Saídas: reports/reindex-pending.json · reports/reindex-pending.md
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { gsc, resolveSite, inspectUrl } from "./lib/gsc-client.mjs";
import { BASE_URL } from "./lib/site-env.mjs";

const DRY = process.argv.includes("--dry-run");
const ALERT = process.argv.includes("--alert");
const li = process.argv.indexOf("--limit");
const LIMITE = li > -1 ? Number(process.argv[li + 1]) || 50 : 50;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "f783ab585dfa9e6b017cb058009cccae";

if (!BASE_URL) {
  console.error("BLOQUEADO: VITE_SITE_DOMAIN ausente — nada é reenviado sem domínio próprio.");
  process.exit(1);
}

/** URLs curadas: lidas dos sub-sitemaps publicados. */
function curatedUrls() {
  const index = "public/sitemap-index.xml";
  if (!existsSync(index)) return [];
  const subs = [...readFileSync(index, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(BASE_URL, "public"),
  );
  const urls = new Set();
  for (const file of subs) {
    if (!existsSync(file)) continue;
    for (const m of readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  }
  return [...urls];
}

const MOTIVOS = {
  "Discovered - currently not indexed": "descoberta sem rastreio — sinal fraco de links internos",
  "Crawled - currently not indexed": "rastreada e descartada — qualidade/originalidade do conteúdo",
  "Duplicate without user-selected canonical": "duplicidade — canonical concorrente",
  "Duplicate, Google chose different canonical than user": "Google escolheu outro canonical",
  "Excluded by ‘noindex’ tag": "meta robots noindex na página",
  "Blocked by robots.txt": "bloqueada no robots.txt",
  "URL is unknown to Google": "Google ainda não conhece a URL",
};

const urls = curatedUrls().slice(0, LIMITE);
if (!urls.length) {
  console.error("Nenhuma URL curada encontrada — rode o gerador de sitemap antes.");
  process.exit(1);
}

const site = await resolveSite(urls[0]);
console.log(`Propriedade: ${site} · ${urls.length} URLs curadas`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Executa `fn` com backoff exponencial + jitter (429/5xx). */
async function withBackoff(fn, tentativas = 4) {
  let erro;
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn();
    } catch (e) {
      erro = e;
      const transitorio = /\[(429|5\d\d)\]/.test(e.message);
      if (!transitorio || i === tentativas - 1) break;
      const espera = 2 ** i * 1000 + Math.floor(Math.random() * 400);
      console.log(`  ↻ retry em ${espera}ms (${e.message.slice(0, 80)})`);
      await sleep(espera);
    }
  }
  throw erro;
}

const resultados = [];
for (const url of urls) {
  try {
    const estado = await withBackoff(() => inspectUrl(site, url));
    const indexada = estado.verdict === "PASS";
    resultados.push({
      url,
      indexada,
      ...estado,
      motivo: indexada ? null : (MOTIVOS[estado.coverageState] ?? estado.coverageState ?? "desconhecido"),
    });
  } catch (e) {
    resultados.push({ url, indexada: false, verdict: "ERROR", motivo: `falha na inspeção: ${e.message}` });
  }
}

const pendentes = resultados.filter((r) => !r.indexada);

let reenvio = { sitemap: "não executado", indexnow: "não executado" };
if (!DRY && pendentes.length) {
  try {
    await withBackoff(() =>
      gsc(
        `/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`,
        { method: "PUT" },
      ),
    );
    reenvio.sitemap = "ressubmetido";
  } catch (e) {
    reenvio.sitemap = `falhou: ${e.message}`;
  }

  const lotes = [];
  for (let i = 0; i < pendentes.length; i += 20) lotes.push(pendentes.slice(i, i + 20).map((p) => p.url));
  const host = new URL(BASE_URL).hostname;
  const enviados = [];
  for (const [i, urlList] of lotes.entries()) {
    if (i) await sleep(2 ** i * 1000 + Math.floor(Math.random() * 500));
    try {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host,
          key: INDEXNOW_KEY,
          keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
          urlList,
        }),
      });
      enviados.push(`${urlList.length} URL(s) → HTTP ${res.status}`);
    } catch (e) {
      enviados.push(`falhou: ${e.message}`);
    }
  }
  reenvio.indexnow = enviados.join(" · ");
}

const relatorio = {
  generatedAt: new Date().toISOString(),
  site,
  total: resultados.length,
  indexadas: resultados.length - pendentes.length,
  pendentes: pendentes.length,
  reenvio,
  resultados,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/reindex-pending.json", `${JSON.stringify(relatorio, null, 2)}\n`);
writeFileSync(
  "reports/reindex-pending.md",
  [
    `# Revalidação de indexação`,
    ``,
    `- Propriedade: \`${site}\``,
    `- Gerado em: ${relatorio.generatedAt}`,
    `- Indexadas: **${relatorio.indexadas}/${relatorio.total}**`,
    `- Sitemap: ${reenvio.sitemap}`,
    `- IndexNow: ${reenvio.indexnow}`,
    ``,
    `| URL | Verdict | Cobertura | Motivo |`,
    `| --- | --- | --- | --- |`,
    ...resultados.map(
      (r) => `| ${r.url.replace(BASE_URL, "")} | ${r.verdict} | ${r.coverageState ?? "—"} | ${r.motivo ?? "indexada"} |`,
    ),
  ].join("\n"),
);

console.log(`Indexadas: ${relatorio.indexadas}/${relatorio.total} · pendentes: ${pendentes.length}`);
for (const p of pendentes) console.log(`  · ${p.url.replace(BASE_URL, "")} → ${p.motivo}`);
console.log(`Sitemap: ${reenvio.sitemap} · IndexNow: ${reenvio.indexnow}`);
if (pendentes.length && ALERT) process.exit(1);
