#!/usr/bin/env node
/**
 * RELATÓRIO/GATE DE ATRIBUIÇÃO — /problemas (GA4 × Google Ads × UTM).
 *
 * Roda sobre o build (dist/) ANTES do deploy e responde a uma pergunta só:
 * "todo clique de WhatsApp de uma página de sintoma chega ao GA4 e ao Ads
 * com a origem correta?".
 *
 * Verifica, rota a rota:
 *   • existe pelo menos 1 CTA de WhatsApp no HTML estático;
 *   • cada link wa.me carrega text + utm_source/medium/campaign/content
 *     + rota + sintoma + secao + variante;
 *   • utm_campaign == slug do sintoma (correlação 1:1 rota ⇄ campanha);
 *   • utm_medium é o valor esperado do cluster (cta_problema);
 *   • os eventos de conversão (wa_click) e as UTMs continuam declarados no
 *     GA4 (funnelAnalytics) e no mapeamento do Ads (config/analytics).
 *
 * Saída: docs/relatorios/atribuicao-problemas-<data>.md + CSV.
 * Sai com código 1 quando encontra rota sem atribuição íntegra.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");
const OUT_DIR = path.join(process.cwd(), "docs", "relatorios");
const UTM_MEDIUM_ESPERADO = "cta_problema";
const OBRIGATORIOS = [
  "text",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "rota",
  "sintoma",
  "secao",
  "variante",
];

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const base = path.join(DIST, "problemas");
if (!existsSync(base)) {
  console.error("BLOQUEADO: dist/problemas ausente — cluster de sintomas não foi pré-renderizado.");
  process.exit(1);
}

const rotas = readdirSync(base, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(path.join(base, d.name, "index.html")))
  .map((d) => ({ slug: d.name, rota: `/problemas/${d.name}`, file: path.join(base, d.name, "index.html") }));

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');

const erros = [];
const linhas = [];

for (const r of rotas) {
  const html = readFileSync(r.file, "utf8");
  const hrefs = [...html.matchAll(/href="([^"]*wa\.me[^"]*)"/g)].map((m) => decode(m[1]));
  const doCluster = hrefs.filter((h) => h.includes("sintoma="));

  if (doCluster.length === 0) {
    erros.push(`${r.rota}: nenhum CTA de WhatsApp com atribuição de sintoma no HTML estático`);
    linhas.push({ rota: r.rota, ctas: 0, secoes: "", campanhas: "", status: "falha" });
    continue;
  }

  const secoes = new Set();
  const campanhas = new Set();

  for (const href of doCluster) {
    let p;
    try {
      p = new URL(href, "https://wa.me").searchParams;
    } catch {
      erros.push(`${r.rota}: href inválido (${href.slice(0, 80)})`);
      continue;
    }
    for (const chave of OBRIGATORIOS) {
      if (!p.get(chave)) erros.push(`${r.rota}: parâmetro "${chave}" ausente em um CTA`);
    }
    if (p.get("utm_medium") && p.get("utm_medium") !== UTM_MEDIUM_ESPERADO)
      erros.push(`${r.rota}: utm_medium="${p.get("utm_medium")}" (esperado "${UTM_MEDIUM_ESPERADO}")`);
    if (p.get("utm_campaign") && p.get("utm_campaign") !== r.slug)
      erros.push(`${r.rota}: utm_campaign="${p.get("utm_campaign")}" não corresponde ao sintoma "${r.slug}"`);
    if (p.get("rota") && p.get("rota") !== r.rota)
      erros.push(`${r.rota}: parâmetro rota="${p.get("rota")}" divergente da URL`);
    if (p.get("secao")) secoes.add(p.get("secao"));
    if (p.get("utm_campaign")) campanhas.add(p.get("utm_campaign"));
  }

  linhas.push({
    rota: r.rota,
    ctas: doCluster.length,
    secoes: [...secoes].sort().join(" | "),
    campanhas: [...campanhas].sort().join(" | "),
    status: erros.some((e) => e.startsWith(`${r.rota}:`)) ? "falha" : "ok",
  });
}

// Correlação com a camada de medição (GA4 + mapeamento do Ads).
const funnel = readFileSync("src/lib/funnelAnalytics.ts", "utf8");
const analyticsCfg = existsSync("src/lib/config/analytics.ts")
  ? readFileSync("src/lib/config/analytics.ts", "utf8")
  : "";
if (!/track\("wa_click"/.test(funnel)) erros.push("GA4: evento wa_click não é disparado em funnelAnalytics.ts");
for (const utm of ["utm_source", "utm_medium", "utm_campaign"])
  if (!funnel.includes(utm)) erros.push(`GA4: ${utm} ausente do payload de conversão`);
if (analyticsCfg && !/ADS|ads/.test(analyticsCfg))
  erros.push("Ads: config/analytics.ts sem referência ao identificador do Google Ads");

// Saída do relatório.
mkdirSync(OUT_DIR, { recursive: true });
const data = new Date().toISOString().slice(0, 10);
const md = [
  `# Atribuição /problemas — GA4 × Google Ads × UTM (${data})`,
  "",
  `Rotas analisadas: **${rotas.length}** · CTAs com atribuição: **${linhas.reduce((a, l) => a + l.ctas, 0)}**`,
  "",
  "| Rota | CTAs | Seções rastreadas | utm_campaign | Status |",
  "| --- | ---: | --- | --- | --- |",
  ...linhas.map((l) => `| ${l.rota} | ${l.ctas} | ${l.secoes} | ${l.campanhas} | ${l.status} |`),
  "",
  erros.length ? "## Inconsistências\n" + erros.map((e) => `- ${e}`).join("\n") : "Sem inconsistências.",
  "",
].join("\n");
writeFileSync(path.join(OUT_DIR, `atribuicao-problemas-${data}.md`), md);
writeFileSync(
  path.join(OUT_DIR, `atribuicao-problemas-${data}.csv`),
  ["rota,ctas,secoes,utm_campaign,status", ...linhas.map((l) => `${l.rota},${l.ctas},"${l.secoes}","${l.campanhas}",${l.status}`)].join("\n"),
);

if (erros.length) {
  console.error(`BLOQUEADO — atribuição inconsistente em ${erros.length} verificação(ões):`);
  erros.slice(0, 30).forEach((e) => console.error(`  • ${e}`));
  process.exit(1);
}

console.log(`OK — atribuição íntegra em ${rotas.length} rotas de /problemas (relatório em docs/relatorios/atribuicao-problemas-${data}.md).`);
