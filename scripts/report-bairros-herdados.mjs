#!/usr/bin/env node
/**
 * AUDITORIA DAS PÁGINAS DE BAIRRO HERDADAS (noindex)
 * ==================================================
 * Não promove nada. Inventaria as rotas /bairros/* que existem no app mas
 * seguem noindex pela política de poda, e classifica cada uma pelo que hoje
 * impede a promoção:
 *
 *   SEM_CONTEUDO_PROPRIO  → usa template genérico (doorway em potencial)
 *   CONTEUDO_CURTO        → tem texto próprio, mas abaixo do mínimo editorial
 *   PRONTA_PARA_FILA      → conteúdo próprio suficiente; falta decisão/evidência
 *
 * A promoção continua condicionada a evidência do Search Console (política de
 * poda de bairros) e a copy exclusiva por bairro — nunca a lote automático.
 *
 * Saída: reports/bairros-herdados.json + reports/bairros-herdados.md
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { BAIRROS_ANCORA } from "./lib/local-index-policy.mjs";

const MIN_PALAVRAS = 400;
const ancoras = new Set(BAIRROS_ANCORA);

const rotas = readdirSync("src/routes")
  .filter((f) => /^bairros_\..+\.tsx$/.test(f))
  .map((f) => f.replace(/^bairros_\./, "").replace(/\.tsx$/, ""));

const paginas = readdirSync("src/pages/bairros").filter((f) => f.endsWith(".tsx"));
const fonteDaPagina = new Map();
for (const arquivo of paginas) {
  fonteDaPagina.set(arquivo, readFileSync(`src/pages/bairros/${arquivo}`, "utf8"));
}

/** Heurística: casa o slug com o arquivo de página pelo nome em PascalCase. */
const pascal = (slug) => slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");

const linhas = [];
for (const slug of rotas.sort()) {
  if (ancoras.has(slug)) continue;

  const rota = readFileSync(`src/routes/bairros_.${slug}.tsx`, "utf8");
  const alvo =
    paginas.find((p) => p.toLowerCase() === `${pascal(slug).toLowerCase()}.tsx`) ??
    paginas.find((p) => p.toLowerCase().startsWith(pascal(slug).toLowerCase()));
  const fonte = alvo ? fonteDaPagina.get(alvo) : rota;

  const usaTemplate = /BairroTemplate|bairroTemplate/.test(fonte);
  const texto = [...fonte.matchAll(/"([^"\\]{40,})"|>([^<>{}]{40,})</g)]
    .map((m) => m[1] ?? m[2])
    .join(" ");
  const palavras = texto.split(/\s+/).filter(Boolean).length;

  const status = usaTemplate
    ? "SEM_CONTEUDO_PROPRIO"
    : palavras < MIN_PALAVRAS
      ? "CONTEUDO_CURTO"
      : "PRONTA_PARA_FILA";

  linhas.push({ slug, url: `/bairros/${slug}`, pagina: alvo ?? null, palavrasAprox: palavras, usaTemplate, status });
}

const resumo = linhas.reduce((acc, l) => ((acc[l.status] = (acc[l.status] ?? 0) + 1), acc), {});

mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/bairros-herdados.json",
  JSON.stringify({ geradoEm: new Date().toISOString(), indexaveis: ancoras.size, herdadas: linhas.length, resumo, linhas }, null, 2),
);

const md = [
  "# Auditoria — páginas de bairro herdadas (noindex)",
  "",
  `Gerado em ${new Date().toISOString()}.`,
  "",
  `- Bairros âncora indexáveis: **${ancoras.size}**`,
  `- Páginas herdadas noindex: **${linhas.length}**`,
  ...Object.entries(resumo).map(([k, v]) => `- ${k}: **${v}**`),
  "",
  "Promoção só acontece com copy exclusiva por bairro **e** evidência de demanda",
  "no Search Console. Lote automático é doorway e fica proibido.",
  "",
  "| URL | Página | Palavras (aprox.) | Template genérico | Status |",
  "| --- | --- | --- | --- | --- |",
  ...linhas.map((l) => `| ${l.url} | ${l.pagina ?? "—"} | ${l.palavrasAprox} | ${l.usaTemplate ? "sim" : "não"} | ${l.status} |`),
  "",
].join("\n");
writeFileSync("reports/bairros-herdados.md", md);

console.log(`[bairros-herdados] ${linhas.length} rota(s) herdada(s) · ${JSON.stringify(resumo)}`);
console.log("  → reports/bairros-herdados.json · reports/bairros-herdados.md");
