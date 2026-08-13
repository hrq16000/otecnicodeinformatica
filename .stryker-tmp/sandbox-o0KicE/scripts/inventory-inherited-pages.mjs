// @ts-nocheck
// Inventário de herança editorial — Rodada 2A.
//
// Classifica cada URL curada (indexável) segundo o quanto o conteúdo ainda é
// herdado/duplicado do remix de origem:
//
//   A — conteúdo próprio, volume adequado e baixa sobreposição
//   B — parcialmente herdada: sobreposição média OU volume abaixo do alvo
//   C — majoritariamente herdada: sobreposição alta OU conteúdo raso
//   D — duplicada: quase idêntica a outra página curada
//
// Uso: node scripts/inventory-inherited-pages.mjs [dist]
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ACTIVE_SITEMAPS } from "./lib/curated-urls.mjs";

const dist = process.argv[2] || "dist";

const paths = [...new Set(ACTIVE_SITEMAPS.flatMap(([, e]) => e.map((x) => x.path)))];

function readRoute(p) {
  const file = p === "/" ? resolve(dist, "index.html") : resolve(dist, `.${p}/index.html`);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

function mainText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shingles(text) {
  const w = text.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 5 <= w.length; i += 1) set.add(w.slice(i, i + 5).join(" "));
  return set;
}

function overlap(a, b) {
  if (!a.size || !b.size) return 0;
  let hits = 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  for (const s of small) if (big.has(s)) hits += 1;
  return hits / small.size;
}

const pages = [];
const missing = [];
for (const p of paths) {
  const html = readRoute(p);
  if (!html) {
    missing.push(p);
    continue;
  }
  const text = mainText(html);
  pages.push({
    path: p,
    words: text.split(" ").filter(Boolean).length,
    title: html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "",
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    ),
    desc: html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "",
    shingles: shingles(text),
  });
}

for (const page of pages) {
  let best = 0;
  let bestPath = "";
  for (const other of pages) {
    if (other === page) continue;
    const o = overlap(page.shingles, other.shingles);
    if (o > best) {
      best = o;
      bestPath = other.path;
    }
  }
  page.maxOverlap = Number(best.toFixed(3));
  page.nearest = bestPath;

  let grade = "A";
  if (page.maxOverlap >= 0.8) grade = "D";
  else if (page.maxOverlap >= 0.6 || page.words < 400) grade = "C";
  else if (page.maxOverlap >= 0.35 || page.words < 800) grade = "B";
  page.grade = grade;
}

pages.sort((a, b) => b.maxOverlap - a.maxOverlap);

const counts = pages.reduce((acc, p) => ({ ...acc, [p.grade]: (acc[p.grade] ?? 0) + 1 }), {});
console.log("── Inventário de herança editorial (páginas curadas) ──");
console.log(`  páginas analisadas: ${pages.length}${missing.length ? ` · sem HTML estático: ${missing.length}` : ""}`);
console.log(`  A ${counts.A ?? 0} · B ${counts.B ?? 0} · C ${counts.C ?? 0} · D ${counts.D ?? 0}`);
for (const g of ["D", "C", "B"]) {
  const rows = pages.filter((p) => p.grade === g);
  if (!rows.length) continue;
  console.log(`\n[${g}]`);
  for (const r of rows) {
    console.log(`  ${r.path}  words=${r.words}  overlap=${r.maxOverlap} (${r.nearest})`);
  }
}

writeFileSync(
  resolve(dist, "inventory-inherited.json"),
  JSON.stringify(
    pages.map(({ shingles: _s, ...rest }) => rest),
    null,
    2,
  ),
);
