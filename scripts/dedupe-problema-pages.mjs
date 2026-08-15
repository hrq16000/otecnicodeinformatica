#!/usr/bin/env node
/**
 * Unifica entradas duplicadas em src/lib/problemaPagesData.ts.
 *
 * O arquivo cresceu por acúmulo de lotes e passou a declarar o mesmo slug mais
 * de uma vez (a última declaração vencia em runtime só por ordem de array em
 * alguns consumidores, e a primeira em outros — comportamento indefinido do
 * ponto de vista editorial). Este script escolhe uma entrada canônica por slug
 * e remove as demais, registrando em reports/problem-duplicates.* exatamente o
 * que foi unificado.
 *
 * Critério de escolha: a entrada com maior volume de conteúdo textual útil
 * (intro + sintomas + causas + conteudoExtra), que é a mais próxima do padrão
 * editorial atual. Empate resolve pela primeira ocorrência.
 *
 * Uso:
 *   node scripts/dedupe-problema-pages.mjs           # aplica e grava relatório
 *   node scripts/dedupe-problema-pages.mjs --check   # falha se houver duplicata
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const alvo = resolve(raiz, "src/lib/problemaPagesData.ts");
const CHECK = process.argv.includes("--check");

const fonte = readFileSync(alvo, "utf8");
const marcador = "export const problemaPagesData: ProblemaPageData[] = [";
const inicio = fonte.indexOf(marcador);
if (inicio === -1) {
  console.error("✖ Não encontrei a declaração de problemaPagesData.");
  process.exit(1);
}

const corpoInicio = inicio + marcador.length;

/** Percorre o array respeitando strings, templates e comentários. */
function fatiarElementos(texto, from) {
  const elementos = [];
  let i = from;
  let profundidade = 0;
  let elementoInicio = -1;
  let modo = null; // '"' | "'" | '`' | '//' | '/*'

  while (i < texto.length) {
    const c = texto[i];
    const prox = texto[i + 1];

    if (modo === "//") {
      if (c === "\n") modo = null;
      i++;
      continue;
    }
    if (modo === "/*") {
      if (c === "*" && prox === "/") { modo = null; i += 2; continue; }
      i++;
      continue;
    }
    if (modo) {
      if (c === "\\") { i += 2; continue; }
      if (c === modo) modo = null;
      i++;
      continue;
    }
    if (c === "/" && prox === "/") { modo = "//"; i += 2; continue; }
    if (c === "/" && prox === "*") { modo = "/*"; i += 2; continue; }
    if (c === '"' || c === "'" || c === "`") { modo = c; i++; continue; }

    if (c === "{" || c === "[" || c === "(") {
      if (profundidade === 0 && c === "{") elementoInicio = i;
      profundidade++;
      i++;
      continue;
    }
    if (c === "}" || c === "]" || c === ")") {
      if (profundidade === 0 && c === "]") {
        return { elementos, fim: i };
      }
      profundidade--;
      if (profundidade === 0 && c === "}") {
        let fim = i + 1;
        if (texto[fim] === ",") fim++;
        elementos.push({ inicio: elementoInicio, fim, texto: texto.slice(elementoInicio, fim) });
        elementoInicio = -1;
      }
      i++;
      continue;
    }
    i++;
  }
  throw new Error("Array de problemaPagesData não foi fechado.");
}

const { elementos, fim: arrayFim } = fatiarElementos(fonte, corpoInicio);

const slugDe = (t) => (t.match(/\bslug:\s*"([^"]+)"/) || [])[1];
const h1De = (t) => (t.match(/\bh1:\s*"([^"]+)"/) || [])[1] ?? "";
/** Peso editorial: quanto conteúdo real a entrada carrega. */
const peso = (t) => {
  const blocos = ["intro", "conteudoExtra", "diagnostico", "solucao"];
  let total = 0;
  for (const b of blocos) {
    const m = t.match(new RegExp(`\\b${b}:\\s*(\`[\\s\\S]*?\`|"[^"]*")`));
    if (m) total += m[1].length;
  }
  total += (t.match(/titulo:/g) || []).length * 40;
  return total;
};

const porSlug = new Map();
elementos.forEach((el, ordem) => {
  const slug = slugDe(el.texto);
  if (!slug) return;
  const info = { ...el, ordem, slug, h1: h1De(el.texto), peso: peso(el.texto) };
  const lista = porSlug.get(slug) ?? [];
  lista.push(info);
  porSlug.set(slug, lista);
});

const duplicados = [...porSlug.entries()].filter(([, v]) => v.length > 1);
const removidosTotal = duplicados.reduce((acc, [, v]) => acc + v.length - 1, 0);

if (CHECK) {
  if (duplicados.length === 0) {
    console.log(`✓ problemaPagesData sem slugs duplicados (${porSlug.size} entradas).`);
    process.exit(0);
  }
  console.error(`✖ ${duplicados.length} slug(s) duplicado(s) · ${removidosTotal} entrada(s) redundante(s):`);
  for (const [slug, lista] of duplicados) {
    console.error(`  · ${slug} (${lista.length}x)`);
  }
  console.error("  → rode: node scripts/dedupe-problema-pages.mjs");
  process.exit(1);
}

if (duplicados.length === 0) {
  console.log("✓ Nada a unificar — problemaPagesData já está sem duplicatas.");
  process.exit(0);
}

const descartar = new Set();
const linhas = [];
for (const [slug, lista] of duplicados) {
  const vencedor = lista.reduce((a, b) => (b.peso > a.peso ? b : a));
  for (const item of lista) {
    if (item === vencedor) continue;
    descartar.add(item.ordem);
  }
  linhas.push({
    slug,
    ocorrencias: lista.length,
    mantida: { ordem: vencedor.ordem, h1: vencedor.h1, peso: vencedor.peso },
    removidas: lista
      .filter((i) => i !== vencedor)
      .map((i) => ({ ordem: i.ordem, h1: i.h1, peso: i.peso })),
  });
}

// Reconstrói o array preservando o texto original das entradas mantidas.
const preservadas = elementos.filter((_, ordem) => !descartar.has(ordem));
const corpo = preservadas
  .map((el) => {
    const t = el.texto.trimEnd();
    return t.endsWith(",") ? `  ${t.trimStart()}` : `  ${t.trimStart()},`;
  })
  .join("\n");

const novo = `${fonte.slice(0, corpoInicio)}\n${corpo}\n${fonte.slice(arrayFim)}`;
writeFileSync(alvo, novo);

mkdirSync(resolve(raiz, "reports"), { recursive: true });
const md = [
  "# Unificação de entradas duplicadas — /problemas",
  "",
  `Gerado por \`node scripts/dedupe-problema-pages.mjs\` em ${new Date().toISOString()}.`,
  "",
  `- Entradas antes: **${elementos.length}**`,
  `- Entradas depois: **${preservadas.length}**`,
  `- Slugs com duplicidade: **${duplicados.length}**`,
  `- Entradas removidas: **${removidosTotal}**`,
  "",
  "Critério: manteve-se a declaração com maior volume editorial (intro, causas,",
  "diagnóstico, solução e conteúdo extra). Nenhuma URL deixou de existir — todas",
  "continuam respondidas por exatamente uma entrada.",
  "",
  "| Slug | Ocorrências | H1 mantido | H1(s) removido(s) |",
  "| --- | --- | --- | --- |",
  ...linhas.map(
    (l) =>
      `| /problemas/${l.slug} | ${l.ocorrencias} | ${l.mantida.h1} | ${l.removidas
        .map((r) => r.h1 || "(sem h1)")
        .join(" · ")} |`,
  ),
  "",
].join("\n");
writeFileSync(resolve(raiz, "reports/problem-duplicates.md"), md);
writeFileSync(
  resolve(raiz, "reports/problem-duplicates.json"),
  `${JSON.stringify({ antes: elementos.length, depois: preservadas.length, unificados: linhas }, null, 2)}\n`,
);

console.log(
  `✓ ${removidosTotal} entrada(s) removida(s) em ${duplicados.length} slug(s) · ${elementos.length} → ${preservadas.length}`,
);
console.log("   → reports/problem-duplicates.{md,json}");
