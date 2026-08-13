#!/usr/bin/env node
/**
 * ONDA 30 — GATE de similaridade CRUZADA (serviço × problema × bairro).
 *
 * Compara o conteúdo editorial (<main> sem header/footer/nav/CTA global) das
 * páginas indexáveis desses três clusters usando Jaccard sobre 5-gramas.
 * Texto quase igual entre clusters diferentes vira duplicidade no índice e
 * canibaliza intenção — aqui isso bloqueia o deploy.
 *
 * Uso: node scripts/check-cross-cluster-similarity.mjs [dist] [--report]
 * Saída: reports/cross-cluster-similarity.json
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const DIST = path.resolve(args.find((a) => !a.startsWith("--")) || "dist");
const REPORT = args.includes("--report");

const BLOQUEIO = 0.62;
const AVISO = 0.5;

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const clusterDe = (rota) => {
  if (rota.startsWith("/servicos/")) return "servico";
  if (rota.startsWith("/problemas/")) return "problema";
  if (rota.startsWith("/bairros/")) return "bairro";
  return null;
};

const editorial = (html) => {
  let main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  main = main
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  return main
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const shingles = (text, n = 5) => {
  const w = text.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i += 1) set.add(w.slice(i, i + n).join(" "));
  return set;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  for (const s of small) if (big.has(s)) inter += 1;
  return inter / (a.size + b.size - inter);
};

const arquivos = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e === "index.html") arquivos.push(full);
  }
})(DIST);

const paginas = [];
for (const file of arquivos) {
  const rota =
    ("/" + path.relative(DIST, file).replace(/index\.html$/, "").replace(/\\/g, "/")).replace(/\/$/, "") || "/";
  const cluster = clusterDe(rota);
  if (!cluster) continue;
  const html = readFileSync(file, "utf8");
  if (/noindex/i.test(html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "")) continue;
  const texto = editorial(html);
  if (texto.split(" ").length < 80) continue;
  paginas.push({ rota, cluster, sh: shingles(texto) });
}

const pares = [];
for (let i = 0; i < paginas.length; i += 1) {
  for (let j = i + 1; j < paginas.length; j += 1) {
    if (paginas[i].cluster === paginas[j].cluster) continue;
    const score = Number(jaccard(paginas[i].sh, paginas[j].sh).toFixed(3));
    if (score >= AVISO - 0.1)
      pares.push({ a: paginas[i].rota, b: paginas[j].rota, clusters: `${paginas[i].cluster}×${paginas[j].cluster}`, score });
  }
}
pares.sort((x, y) => y.score - x.score);

const bloqueios = pares.filter((p) => p.score >= BLOQUEIO);
const avisos = pares.filter((p) => p.score >= AVISO && p.score < BLOQUEIO);

mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/cross-cluster-similarity.json",
  `${JSON.stringify({ generatedAt: new Date().toISOString(), paginas: paginas.length, bloqueio: BLOQUEIO, aviso: AVISO, top: pares.slice(0, 40), bloqueios }, null, 2)}\n`,
);

if (REPORT) pares.slice(0, 20).forEach((p) => console.log(`  ${p.score.toFixed(3)}  [${p.clusters}] ${p.a} × ${p.b}`));

console.log(
  `cross-cluster-similarity: ${paginas.length} páginas (serviço/problema/bairro), máx ${pares[0]?.score.toFixed(3) ?? "0.000"}.`,
);
for (const p of avisos.slice(0, 10)) console.log(`  ! revisar ${p.score.toFixed(3)} — ${p.a} × ${p.b}`);

if (bloqueios.length) {
  console.error("\nBLOQUEADO — conteúdo quase idêntico entre clusters diferentes:");
  for (const p of bloqueios) console.error(`  ✗ ${p.score.toFixed(3)} [${p.clusters}] ${p.a} × ${p.b}`);
  process.exit(1);
}
console.log("✔ Nenhuma duplicidade cruzada acima do limite.");
