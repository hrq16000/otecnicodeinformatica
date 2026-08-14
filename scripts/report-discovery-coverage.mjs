#!/usr/bin/env node
/**
 * RELATÓRIO DE DESCOBERTA × INDEXAÇÃO (Rodada 8A)
 *
 * Lê o estado real de cada URL curada no índice do Google (URL Inspection —
 * somente leitura, não solicita indexação) e classifica em coortes:
 *
 *   INDEXADA                     verdict PASS
 *   DESCOBERTA_NAO_INDEXADA      Google conhece a URL mas não indexou
 *   RASTREADA_NAO_INDEXADA       rastreada e descartada (sinal de qualidade)
 *   DESCONHECIDA                 Google nunca viu a URL (falha de descoberta)
 *   BLOQUEADA                    robots/noindex/canonical apontando para outra
 *
 * A coorte DESCONHECIDA é o alvo operacional: significa que a URL está no
 * sitemap mas não chegou ao Google — problema de descoberta (links internos,
 * sitemap não processado), não de conteúdo.
 *
 * Uso:
 *   node scripts/report-discovery-coverage.mjs                 # amostra padrão
 *   node scripts/report-discovery-coverage.mjs --limit=40
 *   node scripts/report-discovery-coverage.mjs --sitemap=public/sitemap-problemas.xml
 *
 * Sem credenciais de GSC o script encerra em 0 (fail-soft) — nunca quebra build.
 * Saídas: reports/discovery-coverage.json · reports/discovery-coverage.md
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const arg = (nome, padrao) => {
  const hit = process.argv.find((a) => a.startsWith(`--${nome}=`));
  return hit ? hit.split("=").slice(1).join("=") : padrao;
};

const LIMITE = Number(arg("limit", "25"));
const SITEMAP = arg("sitemap", "");

if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) {
  console.log(
    "ℹ Sem LOVABLE_API_KEY / GOOGLE_SEARCH_CONSOLE_API_KEY — relatório de descoberta ignorado.",
  );
  process.exit(0);
}

const { resolveSite, inspectUrl } = await import("./lib/gsc-client.mjs");

/** Coleta as <loc> de um sitemap (ou de todos os sitemaps de rota em public/). */
function coletarUrls() {
  const arquivos = SITEMAP
    ? [SITEMAP]
    : readdirSync("public")
        .filter((f) => /^sitemap-(main|servicos|problemas|bairros|regioes|equipamentos|solucoes|editorial)\.xml$/.test(f))
        .map((f) => join("public", f));

  const urls = [];
  for (const arquivo of arquivos) {
    if (!existsSync(arquivo)) continue;
    const xml = readFileSync(arquivo, "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      urls.push({ url: m[1].trim(), sitemap: arquivo.replace("public/", "") });
    }
  }
  return urls;
}

/** Amostra estratificada: distribui o limite entre os sitemaps disponíveis. */
function amostrar(urls, limite) {
  const porSitemap = new Map();
  for (const u of urls) {
    if (!porSitemap.has(u.sitemap)) porSitemap.set(u.sitemap, []);
    porSitemap.get(u.sitemap).push(u);
  }
  const grupos = [...porSitemap.values()];
  const escolhidas = [];
  let i = 0;
  while (escolhidas.length < Math.min(limite, urls.length)) {
    const grupo = grupos[i % grupos.length];
    const item = grupo.shift();
    if (item) escolhidas.push(item);
    else if (grupos.every((g) => g.length === 0)) break;
    i += 1;
  }
  return escolhidas;
}

function coorte(estado) {
  if (estado.verdict === "PASS") return "INDEXADA";
  const cobertura = (estado.coverageState || "").toLowerCase();
  if (cobertura.includes("unknown to google")) return "DESCONHECIDA";
  if (cobertura.includes("crawled")) return "RASTREADA_NAO_INDEXADA";
  if (cobertura.includes("discovered")) return "DESCOBERTA_NAO_INDEXADA";
  if (estado.robotsTxtState === "DISALLOWED" || cobertura.includes("noindex")) return "BLOQUEADA";
  if (cobertura.includes("alternate") || cobertura.includes("canonical")) return "BLOQUEADA";
  return "OUTRO";
}

const LEITURA = {
  INDEXADA: "OK — manter e observar posição.",
  DESCOBERTA_NAO_INDEXADA: "Google conhece a URL e adiou o rastreio: reforçar links internos e demanda real.",
  RASTREADA_NAO_INDEXADA: "Rastreada e descartada: sinal de qualidade/duplicidade, revisar conteúdo único.",
  DESCONHECIDA: "Falha de descoberta: URL no sitemap sem chegar ao Google (links internos ou sitemap não processado).",
  BLOQUEADA: "Bloqueio técnico: robots, noindex ou canônico apontando para outra URL.",
  ERRO: "Falha de leitura na API — reexecutar.",
  OUTRO: "Estado não mapeado — inspecionar manualmente.",
};

const todas = coletarUrls();
if (todas.length === 0) {
  console.error("✖ Nenhum sitemap de rota encontrado em public/.");
  process.exit(1);
}

const alvos = amostrar(todas, LIMITE);
const site = await resolveSite(alvos[0].url);
console.log(`Propriedade: ${site} · amostra ${alvos.length}/${todas.length} URLs`);

const resultados = [];
for (const alvo of alvos) {
  try {
    const estado = await inspectUrl(site, alvo.url);
    resultados.push({ ...alvo, ...estado, coorte: coorte(estado), erro: null });
  } catch (e) {
    resultados.push({ ...alvo, coorte: "ERRO", erro: e.message });
  }
}

const contagem = resultados.reduce((acc, r) => {
  acc[r.coorte] = (acc[r.coorte] ?? 0) + 1;
  return acc;
}, {});

const indexadas = contagem.INDEXADA ?? 0;
const relatorio = {
  geradoEm: new Date().toISOString(),
  site,
  totalSitemap: todas.length,
  amostra: resultados.length,
  taxaIndexacaoAmostra: resultados.length ? Number(((indexadas / resultados.length) * 100).toFixed(1)) : 0,
  contagem,
  resultados,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/discovery-coverage.json", JSON.stringify(relatorio, null, 2));

const linhas = [
  "# Descoberta × indexação — amostra do sitemap curado",
  "",
  `- Propriedade: \`${site}\``,
  `- Gerado em: ${relatorio.geradoEm}`,
  `- URLs no sitemap curado: **${relatorio.totalSitemap}** · amostra inspecionada: **${relatorio.amostra}**`,
  `- Indexadas na amostra: **${relatorio.taxaIndexacaoAmostra}%** (${indexadas}/${relatorio.amostra})`,
  "",
  "## Coortes",
  "",
  "| Coorte | URLs | Leitura operacional |",
  "| --- | ---: | --- |",
  ...Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => `| ${c} | ${n} | ${LEITURA[c] ?? "—"} |`),
  "",
  "## Detalhe",
  "",
  "| Sitemap | URL | Coorte | Cobertura | Último rastreio |",
  "| --- | --- | --- | --- | --- |",
  ...resultados.map(
    (r) =>
      `| ${r.sitemap} | ${new URL(r.url).pathname} | ${r.coorte} | ${r.coverageState ?? r.erro ?? "—"} | ${r.lastCrawlTime ?? "—"} |`,
  ),
];

writeFileSync("reports/discovery-coverage.md", linhas.join("\n"));
console.log(
  `✔ Relatório gravado. Indexadas ${indexadas}/${resultados.length} · ${JSON.stringify(contagem)}`,
);
