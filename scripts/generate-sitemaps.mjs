// Gera um sitemap CURADO para tecnico.curitiba.br.
// Foco desta fase: páginas centrais + serviços de informática em foco + hubs
// de cidade reais. Páginas herdadas/thin (bairros, marcas, problemas, BGA,
// CFTV, celular, TV, som, videogame, eletrodomésticos, blog off-topic) ficam
// FORA da indexação principal até curadoria posterior.
// Runs via predev/prebuild; outputs to public/.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://tecnico.curitiba.br";

// ── Curadoria explícita ──────────────────────────────────────────
const MAIN = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/servicos", changefreq: "weekly", priority: "0.9" },
  { path: "/como-funciona", changefreq: "monthly", priority: "0.8" },
  { path: "/precos-e-politicas", changefreq: "monthly", priority: "0.8" },
  { path: "/sobre", changefreq: "monthly", priority: "0.6" },
  { path: "/contato", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  
  { path: "/atendimento-domicilio", changefreq: "monthly", priority: "0.7" },
  { path: "/atendimento-remoto", changefreq: "monthly", priority: "0.7" },
  { path: "/equipamentos-atendidos", changefreq: "monthly", priority: "0.6" },
  { path: "/diagnostico-tecnico", changefreq: "monthly", priority: "0.6" },
  { path: "/coleta-e-entrega", changefreq: "monthly", priority: "0.6" },
  { path: "/quando-nao-compensa", changefreq: "monthly", priority: "0.5" },
];

// Serviços essenciais — slugs canônicos curados desta rodada.
const SERVICOS = [
  "/servicos/formatacao",
  "/servicos/manutencao-de-notebook",
  "/servicos/manutencao-de-computador",
  "/servicos/upgrade-ssd-ram",
  "/servicos/remocao-de-virus",
  "/servicos/recuperacao-de-dados",
  "/servicos/redes-e-wifi",
  "/servicos/suporte-tecnico-empresarial",
].map((path) => ({ path, changefreq: "weekly", priority: "0.85" }));

// Hubs de cidade reais (NÃO 215 bairros).
const REGIOES = [
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-sao-jose-pinhais",
  "/tecnico-informatica-pinhais",
  "/tecnico-informatica-colombo",
  "/tecnico-informatica-araucaria",
  "/tecnico-informatica-campo-largo",
].map((path) => ({ path, changefreq: "monthly", priority: "0.7" }));

// Bairros âncora INDEXÁVEIS — conteúdo único ≥300 palavras, notebook/PC.
// (política de poda: só entram bairros com conteúdo exclusivo real).
const BAIRROS = [
  "/bairros/cic",
  "/bairros/batel",
  "/bairros/agua-verde",
  "/bairros/centro",
  "/bairros/portao",
].map((path) => ({ path, changefreq: "monthly", priority: "0.65" }));

// Landings serviço × bairro-âncora (geradas por src/lib/servicoBairroFactory.ts).
// Mantidas em sincronia com GENERATED_INDEXABLE_PATHS.
const SERVICO_BAIRRO = [
  "/servicos/formatacao-computador/cic",
  "/servicos/formatacao-computador/batel",
  "/servicos/formatacao-computador/agua-verde",
  "/servicos/remocao-virus/cic",
  "/servicos/remocao-virus/agua-verde",
  "/servicos/conserto-pc-notebook/centro",
  "/servicos/conserto-pc-notebook/agua-verde",
  "/servicos/upgrade-ssd-memoria/cic",
  "/servicos/upgrade-ssd-memoria/centro",
  "/servicos/upgrade-ssd-memoria/agua-verde",
  "/servicos/upgrade-ssd-memoria/portao",
].map((path) => ({ path, changefreq: "monthly", priority: "0.6" }));

// Hubs de SEO temáticos (empresa de TI, etc.).
const HUBS = [
  "/empresa-de-ti-curitiba",
].map((path) => ({ path, changefreq: "weekly", priority: "0.8" }));

function buildUrlset(entries) {
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const EMPTY_URLSET = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;

// Sub-sitemaps ativos.
const active = [
  ["sitemap-main.xml", [...MAIN, ...HUBS]],
  ["sitemap-servicos.xml", [...SERVICOS, ...SERVICO_BAIRRO]],
  ["sitemap-regioes.xml", REGIOES],
  ["sitemap-bairros.xml", BAIRROS],
];
for (const [name, entries] of active) {
  writeFileSync(resolve("public", name), buildUrlset(entries));
}

// Zera sub-sitemaps herdados para parar de servir conteúdo thin/duplicado.
for (const name of ["sitemap-marcas.xml", "sitemap-problemas.xml", "sitemap-news.xml"]) {
  writeFileSync(resolve("public", name), EMPTY_URLSET);
}

// Índice apenas com os sitemaps ativos e curados.
// Blog/news fora do índice nesta fase: conteúdo majoritariamente off-topic
// (Linux/Docker/SSH/IA) — mantido no app, mas sem push de indexação.
const indexXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  active
    .map(([name]) => `  <sitemap><loc>${BASE_URL}/${name}</loc></sitemap>`)
    .join("\n") +
  `\n</sitemapindex>\n`;

writeFileSync(resolve("public/sitemap-index.xml"), indexXml);
// Alias legado.
writeFileSync(resolve("public/sitemap.xml"), indexXml);

const total = active.reduce((n, [, e]) => n + e.length, 0);
console.log(`sitemap curado: index + ${active.length} sub-sitemaps (${total} urls)`);
