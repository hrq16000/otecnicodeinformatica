#!/usr/bin/env node
/**
 * GATE — COLISÃO DE INTENÇÃO ENTRE CLUSTERS (serviço × problema × bairro × hub).
 *
 * Os gates existentes cobrem:
 *   • check-cannibalization.mjs        → páginas comerciais P0 (metadados curados);
 *   • check-programmatic-similarity.mjs → páginas locais entre si (doorway).
 *
 * Falta o cruzamento ENTRE famílias: uma página de sintoma que virou cópia da
 * página de serviço-mãe, ou uma página de bairro que repete o hub de serviço.
 * Este gate lê o HTML estático já construído e compara pares cross-família.
 *
 * Critérios de bloqueio:
 *   • <title> quase idêntico (Jaccard de tokens > 0.75);
 *   • H1 idêntico após normalização;
 *   • corpo editorial (<main> sem header/footer/nav/script) com Jaccard de
 *     5-gramas >= 0.55 — clusters diferentes devem ter texto próprio.
 *
 * Uso:
 *   node scripts/check-intent-collisions.mjs [dist] [--report]
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { SERVICOS, PROBLEMAS, BAIRROS, HUBS } from "./lib/curated-urls.mjs";

const args = process.argv.slice(2);
const ROOT = args.find((a) => !a.startsWith("--")) || "dist";
const REPORT = args.includes("--report");

const LIMITE_TITLE = 0.75;
const LIMITE_CORPO = 0.55;
const AVISO_CORPO = 0.45;

const asPath = (e) => (typeof e === "string" ? e : e.path);
const familias = [
  ["servico", SERVICOS.map(asPath)],
  ["problema", PROBLEMAS.map(asPath)],
  ["bairro", BAIRROS.map(asPath)],
  ["hub", HUBS.map(asPath)],
];

const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOP = new Set(
  "a o e de da do das dos em no na nos nas para por com sem que se ao aos as os um uma uns umas mais ou seu sua seus suas pelo pela como quando onde entre sobre ate".split(
    " ",
  ),
);
const tokens = (s) => norm(s).split(" ").filter((t) => t.length > 2 && !STOP.has(t));

const shingles = (texto, n = 5) => {
  const w = norm(texto).split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i += 1) set.add(w.slice(i, i + n).join(" "));
  return set;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [menor, maior] = a.size <= b.size ? [a, b] : [b, a];
  for (const v of menor) if (maior.has(v)) inter += 1;
  return inter / (a.size + b.size - inter);
};

function editorial(html) {
  let main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  main = main
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  return main.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

const paginas = [];
const semHtml = [];
for (const [familia, rotas] of familias) {
  for (const path of rotas) {
    const arquivo = join(ROOT, path.replace(/^\//, ""), "index.html");
    if (!existsSync(arquivo)) {
      semHtml.push(path);
      continue;
    }
    const html = readFileSync(arquivo, "utf8");
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").replace(/<[^>]+>/g, " ");
    const corpo = editorial(html);
    paginas.push({
      familia,
      path,
      title,
      h1,
      tTitle: new Set(tokens(title)),
      shCorpo: shingles(corpo),
      palavras: corpo.split(" ").filter(Boolean).length,
    });
  }
}

if (!paginas.length) {
  console.log(
    `[intent-collisions] pulado — nenhum HTML estático encontrado em "${ROOT}". Rode o build antes do gate.`,
  );
  process.exit(0);
}

const falhas = [];
const avisos = [];
const pares = [];

for (let i = 0; i < paginas.length; i += 1) {
  for (let j = i + 1; j < paginas.length; j += 1) {
    const a = paginas[i];
    const b = paginas[j];
    if (a.familia === b.familia) continue; // coberto por outros gates
    const st = jaccard(a.tTitle, b.tTitle);
    const sc = jaccard(a.shCorpo, b.shCorpo);
    pares.push({ a: a.path, b: b.path, title: st, corpo: sc });
    if (st > LIMITE_TITLE)
      falhas.push(`title cross-cluster ${st.toFixed(2)} > ${LIMITE_TITLE} — ${a.path} × ${b.path}`);
    if (norm(a.h1) && norm(a.h1) === norm(b.h1))
      falhas.push(`H1 idêntico entre ${a.path} e ${b.path}: "${a.h1.trim()}"`);
    if (sc >= LIMITE_CORPO)
      falhas.push(`corpo editorial ${sc.toFixed(2)} >= ${LIMITE_CORPO} — ${a.path} × ${b.path}`);
    else if (sc >= AVISO_CORPO) avisos.push(`corpo próximo ${sc.toFixed(2)} — ${a.path} × ${b.path}`);
  }
}

if (REPORT) {
  pares.sort((x, y) => y.corpo - x.corpo);
  console.log("── 15 pares cross-cluster mais semelhantes ──");
  for (const p of pares.slice(0, 15))
    console.log(`  corpo ${p.corpo.toFixed(3)} · title ${p.title.toFixed(2)}  ${p.a} × ${p.b}`);
}

console.log(
  `[intent-collisions] ${paginas.length} páginas · ${pares.length} pares cross-cluster comparados` +
    (semHtml.length ? ` · ${semHtml.length} sem HTML (${semHtml.slice(0, 3).join(", ")}…)` : ""),
);
for (const a of avisos.slice(0, 15)) console.log(`  ! ${a}`);

if (falhas.length) {
  console.error("\nBLOQUEADO — colisão de intenção entre clusters:");
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("✓ Nenhuma colisão de intenção entre serviço, problema, bairro e hub.");
