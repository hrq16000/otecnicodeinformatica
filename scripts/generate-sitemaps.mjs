// Gera um sitemap CURADO para tecnico.curitiba.br.
// Foco desta fase: páginas centrais + serviços de informática em foco + hubs
// de cidade reais. Páginas herdadas/thin (bairros, marcas, problemas, BGA,
// CFTV, celular, TV, som, videogame, eletrodomésticos, blog off-topic) ficam
// FORA da indexação principal até curadoria posterior.
// Runs via predev/prebuild; outputs to public/.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://tecnico.curitiba.br";
const TODAY = new Date().toISOString().slice(0, 10);

// ── Curadoria explícita ──────────────────────────────────────────
const MAIN = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/servicos", changefreq: "weekly", priority: "0.9" },
  { path: "/como-funciona", changefreq: "monthly", priority: "0.8" },
  { path: "/precos-e-politicas", changefreq: "monthly", priority: "0.8" },
  { path: "/sobre", changefreq: "monthly", priority: "0.6" },
  { path: "/contato", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/suporte-empresas", changefreq: "monthly", priority: "0.8" },
  { path: "/atendimento-domicilio", changefreq: "monthly", priority: "0.7" },
  { path: "/atendimento-remoto", changefreq: "monthly", priority: "0.7" },
  { path: "/equipamentos-atendidos", changefreq: "monthly", priority: "0.6" },
  { path: "/diagnostico-tecnico", changefreq: "monthly", priority: "0.6" },
  { path: "/coleta-e-entrega", changefreq: "monthly", priority: "0.6" },
  { path: "/quando-nao-compensa", changefreq: "monthly", priority: "0.5" },
];

// Serviços de informática em foco nesta rodada.
const SERVICOS = [
  "/servicos/formatacao-computador",
  "/servicos/conserto-notebook-curitiba",
  "/servicos/conserto-pc-notebook",
  "/servicos/upgrade-ssd-memoria",
  "/servicos/remocao-virus",
  "/servicos/backup-recuperacao",
  "/servicos/redes-wifi",
  "/servicos/computador-lento",
  "/servicos/computador-nao-liga",
  "/servicos/montagem-pc",
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

function buildUrlset(entries) {
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${BASE_URL}${e.path}</loc><lastmod>${TODAY}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const EMPTY_URLSET = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;

// Sub-sitemaps ativos.
const active = [
  ["sitemap-main.xml", MAIN],
  ["sitemap-servicos.xml", SERVICOS],
  ["sitemap-regioes.xml", REGIOES],
];
for (const [name, entries] of active) {
  writeFileSync(resolve("public", name), buildUrlset(entries));
}

// Zera sub-sitemaps herdados para parar de servir conteúdo thin/duplicado.
for (const name of ["sitemap-bairros.xml", "sitemap-marcas.xml", "sitemap-problemas.xml"]) {
  writeFileSync(resolve("public", name), EMPTY_URLSET);
}

// Índice apenas com os sitemaps ativos + news.
const indexXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  active
    .map(([name]) => `  <sitemap><loc>${BASE_URL}/${name}</loc><lastmod>${TODAY}</lastmod></sitemap>`)
    .join("\n") +
  `\n  <sitemap><loc>${BASE_URL}/sitemap-news.xml</loc><lastmod>${TODAY}</lastmod></sitemap>\n` +
  `</sitemapindex>\n`;

writeFileSync(resolve("public/sitemap-index.xml"), indexXml);
// Alias legado.
writeFileSync(resolve("public/sitemap.xml"), indexXml);

const total = active.reduce((n, [, e]) => n + e.length, 0);
console.log(`sitemap curado: index + ${active.length} sub-sitemaps (${total} urls)`);
