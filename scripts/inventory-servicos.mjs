/**
 * INVENTÁRIO DAS PÁGINAS DE SERVIÇO (Rodada 4M)
 *
 * Lê o build (`dist`) e classifica cada rota `/servicos/*` de A a E cruzando:
 *  • volume de conteúdo próprio (palavras do corpo estático);
 *  • similaridade herdada — maior Jaccard contra as demais páginas de serviço;
 *  • intenção de busca declarada por família de slug;
 *  • indexabilidade real (meta robots + presença no sitemap).
 *
 * Saída: docs/inventario-servicos.md (tabela) e código de saída 0.
 * Não é gate: é instrumento de decisão editorial.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { BASE_URL } from "./lib/site-env.mjs";

const DIST = process.argv[2] || "dist";
const DIR = join(DIST, "servicos");

if (!existsSync(DIR)) {
  console.error(`[inventario-servicos] ${DIR} não existe — rode o build antes.`);
  process.exit(1);
}

const sitemap = existsSync(join(DIST, "sitemap.xml"))
  ? readFileSync(join(DIST, "sitemap.xml"), "utf8")
  : "";

/** Intenção por família de slug (declarada, não inferida por IA). */
const INTENCAO = [
  [/(empresa|empresas|empresarial|backup|preventiva|home-office)/, "Comercial B2B"],
  [/(conserto|reparo|placa|monitor|tv|celular)/, "Transacional — reparo"],
  [/(manutencao|limpeza|formatacao|virus|recuperacao)/, "Transacional — serviço"],
  [/(upgrade|montagem|gamer|redes|wifi)/, "Comercial — projeto/upgrade"],
];
const intencaoDe = (slug) => INTENCAO.find(([re]) => re.test(slug))?.[1] ?? "Transacional — serviço";

const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokens = (t) =>
  new Set(
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );

const jaccard = (a, b) => {
  let inter = 0;
  for (const w of a) if (b.has(w)) inter += 1;
  const uni = a.size + b.size - inter;
  return uni ? inter / uni : 0;
};

const paginas = [];
for (const slug of readdirSync(DIR)) {
  const file = join(DIR, slug, "index.html");
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const corpo = texto(html);
  const robots = (html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i) || [])[1] || "index, follow";
  const url = `${BASE_URL}/servicos/${slug}`;
  paginas.push({
    slug,
    rota: `/servicos/${slug}`,
    title: (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "—",
    h1: texto((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "—"),
    palavras: corpo.split(" ").filter(Boolean).length,
    indexavel: !/noindex/i.test(robots),
    noSitemap: sitemap.includes(`<loc>${url}</loc>`),
    intencao: intencaoDe(slug),
    tokens: tokens(corpo),
  });
}

for (const p of paginas) {
  let maior = 0;
  let par = "—";
  for (const q of paginas) {
    if (q === p) continue;
    const s = jaccard(p.tokens, q.tokens);
    if (s > maior) {
      maior = s;
      par = q.rota;
    }
  }
  p.similaridade = Number(maior.toFixed(3));
  p.parMaisProximo = par;
}

/**
 * Nota A–E.
 *  A — conteúdo denso e distinto, indexável e no sitemap.
 *  B — bom conteúdo, similaridade moderada.
 *  C — conteúdo suficiente porém com sobreposição relevante.
 *  D — sobreposição alta ou conteúdo raso ainda indexável (risco de canibalização).
 *  E — fora do índice por decisão editorial (consolidada em outra canônica).
 */
function nota(p) {
  if (!p.indexavel) return "E";
  if (p.similaridade >= 0.6 || p.palavras < 400) return "D";
  if (p.similaridade >= 0.5) return "C";
  if (p.similaridade >= 0.42 || p.palavras < 900) return "B";
  return "A";
}

paginas.sort((a, b) => a.rota.localeCompare(b.rota));
const linhas = paginas.map((p) => ({ ...p, nota: nota(p) }));
const contagem = linhas.reduce((acc, l) => ({ ...acc, [l.nota]: (acc[l.nota] || 0) + 1 }), {});

const md = [
  "# Inventário das páginas de serviço (A–E)",
  "",
  `Gerado por \`npm run inventory:servicos\` a partir do build estático. Rotas: **${linhas.length}**.`,
  "",
  `Distribuição: ${["A", "B", "C", "D", "E"].map((g) => `**${g}** ${contagem[g] || 0}`).join(" · ")}`,
  "",
  "| Rota | H1 | Palavras | Similaridade herdada (par) | Intenção | Indexável | Sitemap | Nota |",
  "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ...linhas.map(
    (l) =>
      `| \`${l.rota}\` | ${l.h1.slice(0, 70)} | ${l.palavras} | ${l.similaridade} (\`${l.parMaisProximo}\`) | ${l.intencao} | ${l.indexavel ? "sim" : "não"} | ${l.noSitemap ? "sim" : "não"} | **${l.nota}** |`,
  ),
  "",
  "## Critério das notas",
  "",
  "- **A** — conteúdo próprio denso (≥ 900 palavras no estático) e similaridade < 0,42.",
  "- **B** — conteúdo próprio com similaridade moderada (0,42–0,49).",
  "- **C** — sobreposição relevante (0,50–0,59): diferenciar blocos comuns.",
  "- **D** — sobreposição alta (≥ 0,60) ou conteúdo raso (< 400 palavras) ainda indexável: risco de canibalização, prioridade de reescrita.",
  "- **E** — `noindex` por decisão editorial (vertical consolidada em outra canônica).",
  "",
  "Regra fixa: nenhuma URL é removida. A saída do índice é sempre por `noindex` + retirada do sitemap.",
  "",
].join("\n");

writeFileSync("docs/inventario-servicos.md", md);
console.log(
  `[inventario-servicos] ${linhas.length} rotas → docs/inventario-servicos.md · ` +
    ["A", "B", "C", "D", "E"].map((g) => `${g}=${contagem[g] || 0}`).join(" "),
);
