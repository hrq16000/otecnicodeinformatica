#!/usr/bin/env node
/**
 * RELATÓRIO/GATE DE ATRIBUIÇÃO — /problemas (GA4 × Google Ads × UTM).
 *
 * Roda antes do deploy e responde a uma pergunta só: "todo clique de WhatsApp
 * de uma página de sintoma vai chegar ao GA4 e ao Google Ads com a origem
 * correta (rota, sintoma, seção, variante)?".
 *
 * Os links wa.me do cluster são montados em runtime (dependem de triagem,
 * rolagem e variante do A/B), então a checagem é feita em duas camadas:
 *
 *  1) CONTRATO DE ATRIBUIÇÃO — `src/lib/problemasWaTemplates.ts` precisa
 *     emitir utm_medium=cta_problema + rota/sintoma/secao/variante e o rótulo
 *     de evento; `funnelAnalytics.ts` precisa disparar wa_click com as UTMs;
 *     `config/analytics.ts` precisa expor o identificador do Google Ads.
 *  2) COBERTURA POR ROTA — cada sintoma do cluster precisa de mensagem base
 *     (waMessage), FAQ com âncoras rastreadas e página pré-renderizada em
 *     dist/, para que a campanha (utm_campaign = slug) exista de fato.
 *
 * Saída: docs/relatorios/atribuicao-problemas-<data>.md + CSV.
 * Sai com código 1 quando alguma rota fica sem atribuição íntegra.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");
const OUT_DIR = path.join(process.cwd(), "docs", "relatorios");

const erros = [];

// ── 1) Contrato de atribuição ────────────────────────────────────────────────
const templates = readFileSync("src/lib/problemasWaTemplates.ts", "utf8");
const funnel = readFileSync("src/lib/funnelAnalytics.ts", "utf8");
const analyticsCfg = existsSync("src/lib/config/analytics.ts")
  ? readFileSync("src/lib/config/analytics.ts", "utf8")
  : "";

const CONTRATO = [
  { chave: 'medium: "cta_problema"', onde: templates, msg: "utm_medium=cta_problema" },
  { chave: 'searchParams.set("rota"', onde: templates, msg: "parâmetro rota" },
  { chave: 'searchParams.set("sintoma"', onde: templates, msg: "parâmetro sintoma" },
  { chave: 'searchParams.set("secao"', onde: templates, msg: "parâmetro secao" },
  { chave: 'searchParams.set("variante"', onde: templates, msg: "parâmetro variante" },
  { chave: 'servico: ctx.sintoma', onde: templates, msg: "utm_campaign derivado do sintoma" },
  { chave: 'track("wa_click"', onde: funnel, msg: "evento GA4 wa_click" },
];
for (const c of CONTRATO) if (!c.onde.includes(c.chave)) erros.push(`contrato: ${c.msg} ausente`);
for (const utm of ["utm_source", "utm_medium", "utm_campaign"])
  if (!funnel.includes(utm)) erros.push(`contrato: ${utm} ausente do payload de conversão do GA4`);
if (!/ADS|ads/.test(analyticsCfg))
  erros.push("contrato: config/analytics.ts sem identificador do Google Ads (conversão não mapeável)");

// ── 2) Cobertura por rota ────────────────────────────────────────────────────
const cluster = readFileSync("src/lib/clusterProblemas.ts", "utf8");
const blocos = cluster.split(/\n\s+path:\s*"/).slice(1);
const linhas = [];

for (const bloco of blocos) {
  const slugRota = bloco.slice(0, bloco.indexOf('"'));
  if (!slugRota.startsWith("/problemas/")) continue;
  const slug = slugRota.replace("/problemas/", "");
  const corpo = bloco.slice(0, bloco.indexOf("\n  },") + 1 || undefined);

  const temMensagem = /waMessage:\s*["'`]/.test(corpo);
  const perguntas = (corpo.match(/\n\s+q:\s*"/g) || []).length;
  const linksFaq = (corpo.match(/\n\s+to:\s*"/g) || []).length;
  const prerender = existsSync(path.join(DIST, "problemas", slug, "index.html"));

  if (!temMensagem) erros.push(`${slugRota}: sem waMessage (CTA sairia sem mensagem pré-preenchida)`);
  if (perguntas < 3) erros.push(`${slugRota}: FAQ com ${perguntas} pergunta(s) — mínimo 3 seções rastreáveis`);
  if (!prerender) erros.push(`${slugRota}: página não pré-renderizada em dist/ (campanha sem destino)`);

  linhas.push({
    rota: slugRota,
    campanha: slug,
    faqs: perguntas,
    links: linksFaq,
    prerender: prerender ? "sim" : "não",
    status: temMensagem && perguntas >= 3 && prerender ? "ok" : "falha",
  });
}

if (linhas.length === 0) erros.push("nenhuma rota de sintoma encontrada em src/lib/clusterProblemas.ts");

// ── Saída ────────────────────────────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });
const data = new Date().toISOString().slice(0, 10);
const md = [
  `# Atribuição /problemas — GA4 × Google Ads × UTM (${data})`,
  "",
  `Rotas de sintoma: **${linhas.length}** · utm_medium: \`cta_problema\` · utm_campaign: slug do sintoma`,
  "",
  "| Rota | utm_campaign | FAQs rastreadas | Links internos | Prerender | Status |",
  "| --- | --- | ---: | ---: | --- | --- |",
  ...linhas.map((l) => `| ${l.rota} | ${l.campanha} | ${l.faqs} | ${l.links} | ${l.prerender} | ${l.status} |`),
  "",
  erros.length ? `## Inconsistências\n${erros.map((e) => `- ${e}`).join("\n")}` : "Sem inconsistências.",
  "",
].join("\n");
writeFileSync(path.join(OUT_DIR, `atribuicao-problemas-${data}.md`), md);
writeFileSync(
  path.join(OUT_DIR, `atribuicao-problemas-${data}.csv`),
  [
    "rota,utm_campaign,faqs,links_internos,prerender,status",
    ...linhas.map((l) => `${l.rota},${l.campanha},${l.faqs},${l.links},${l.prerender},${l.status}`),
  ].join("\n"),
);

if (erros.length) {
  console.error(`BLOQUEADO — atribuição inconsistente em ${erros.length} verificação(ões):`);
  erros.slice(0, 30).forEach((e) => console.error(`  • ${e}`));
  process.exit(1);
}

console.log(
  `OK — atribuição íntegra em ${linhas.length} rotas de /problemas (relatório em docs/relatorios/atribuicao-problemas-${data}.md).`,
);
