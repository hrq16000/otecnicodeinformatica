#!/usr/bin/env node
/**
 * GATE — ANTIDOORWAY LOCAL (RODADA 5B)
 *
 * Prova editorialmente o que a Rodada 5A provou estruturalmente: cada URL local
 * indexável precisa ter conteúdo genuinamente próprio, e não o mesmo template
 * com a localidade trocada.
 *
 * Valida, sobre o dist gerado:
 *   1. HOME × /tecnico-informatica-curitiba — intenções distintas
 *      (title, H1, description e introdução não podem convergir).
 *   2. Similaridade intrafamília (CIDADE ↔ CIDADE, BAIRRO ↔ BAIRRO) via
 *      Jaccard de 5-gramas do <main>: limite 0,45 (checklist da Rodada 5).
 *   3. Doorway por substituição de localidade: remove os nomes de localidade
 *      dos dois textos; se o restante ficar praticamente idêntico (>= 0,82),
 *      a única diferença significativa era a localidade → falha.
 *   4. Unicidade de metadata (title/description/H1) e de FAQ entre as páginas.
 *
 * Fail-closed e bloqueante: sem HTML da rota indexável, é erro.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { resolveLocal, LOTE_LOCAL_1 } from "./lib/local-index-policy.mjs";

const dist = process.argv[2] || "dist";
const erros = [];
const avisos = [];

// Limites do checklist (docs/rodada-5-seo-local-plano.md, item 4 da seção 7).
const LIMITE_JACCARD = 0.45;
const LIMITE_SEM_LOCALIDADE = 0.82;
const LIMITE_INTRO_HOME_CIDADE = 0.35;

const LOCALIDADES = [
  "curitiba",
  "sao jose dos pinhais",
  "sao jose",
  "pinhais",
  "colombo",
  "araucaria",
  "campo largo",
  "batel",
  "agua verde",
  "centro",
  "portao",
  "cic",
  "cidade industrial",
  "regiao metropolitana",
  "rmc",
];

function htmlPath(p) {
  const clean = p === "/" ? "/index" : p.replace(/\/$/, "");
  for (const c of [resolve(dist, `.${clean}.html`), resolve(dist, `.${clean}/index.html`)]) {
    if (existsSync(c)) return c;
  }
  return null;
}

const semAcento = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function textoDe(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return semAcento(
    main
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " "),
  )
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function ngrams(texto, n = 5) {
  const w = texto.split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(" "));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return inter / (a.size + b.size - inter);
}

function semLocalidade(texto) {
  let t = texto;
  for (const loc of LOCALIDADES) t = t.split(loc).join(" ");
  return t.replace(/\s+/g, " ").trim();
}

function extrair(path) {
  const file = htmlPath(path);
  if (!file) return null;
  const html = readFileSync(file, "utf8");
  const texto = textoDe(html);
  const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    semAcento(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(),
  );
  const faqs = [
    ...html.matchAll(/"@type"\s*:\s*"Question"\s*,\s*"name"\s*:\s*"([^"]+)"/g),
  ].map((m) => semAcento(m[1]).trim());
  return {
    path,
    title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "",
    description:
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "",
    h1: semAcento(
      (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").replace(/<[^>]+>/g, " "),
    )
      .replace(/\s+/g, " ")
      .trim(),
    h2,
    faqs,
    texto,
    intro: texto.split(" ").slice(0, 120).join(" "),
    palavras: texto.split(" ").filter(Boolean).length,
    grams: ngrams(texto),
  };
}

// ── Coleta ────────────────────────────────────────────────────────────────
const alvos = ["/", ...LOTE_LOCAL_1];
const paginas = new Map();

for (const path of alvos) {
  const d = path === "/" ? { indexability: "index" } : resolveLocal(path);
  const dados = extrair(path);
  if (!dados) {
    if (d.indexability === "index") erros.push(`${path}: indexável sem HTML estático no dist.`);
    continue;
  }
  paginas.set(path, { ...dados, decisao: d });
}

// ── 1. HOME × CURITIBA ────────────────────────────────────────────────────
const home = paginas.get("/");
const curitiba = paginas.get("/tecnico-informatica-curitiba");
if (home && curitiba) {
  const norm = (s) => semAcento(s).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  if (norm(home.title) === norm(curitiba.title))
    erros.push("HOME × CURITIBA: title idêntico.");
  if (norm(home.h1) === norm(curitiba.h1)) erros.push("HOME × CURITIBA: H1 equivalente.");
  if (norm(home.description) === norm(curitiba.description))
    erros.push("HOME × CURITIBA: description equivalente.");
  const simIntro = jaccard(ngrams(home.intro, 4), ngrams(curitiba.intro, 4));
  if (simIntro > LIMITE_INTRO_HOME_CIDADE)
    erros.push(
      `HOME × CURITIBA: introduções convergiram (Jaccard ${simIntro.toFixed(3)} > ${LIMITE_INTRO_HOME_CIDADE}).`,
    );
  const simCorpo = jaccard(home.grams, curitiba.grams);
  if (simCorpo > LIMITE_JACCARD)
    erros.push(`HOME × CURITIBA: corpo com similaridade ${simCorpo.toFixed(3)}.`);
}

// ── 2/3. Intrafamília + substituição de localidade ────────────────────────
const indexaveis = [...paginas.values()].filter(
  (p) => p.path !== "/" && p.decisao.indexability === "index",
);
const porFamilia = new Map();
for (const p of indexaveis) {
  const f = p.decisao.family;
  if (!porFamilia.has(f)) porFamilia.set(f, []);
  porFamilia.get(f).push(p);
}

for (const [familia, lista] of porFamilia) {
  for (let i = 0; i < lista.length; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      const a = lista[i];
      const b = lista[j];
      const sim = jaccard(a.grams, b.grams);
      if (sim >= LIMITE_JACCARD)
        erros.push(
          `${familia}: ${a.path} ↔ ${b.path} com Jaccard ${sim.toFixed(3)} (limite ${LIMITE_JACCARD}).`,
        );
      const simSemLocal = jaccard(
        ngrams(semLocalidade(a.texto)),
        ngrams(semLocalidade(b.texto)),
      );
      if (simSemLocal >= LIMITE_SEM_LOCALIDADE)
        erros.push(
          `DOORWAY ${familia}: ${a.path} ↔ ${b.path} — removendo a localidade os textos ficam ${(simSemLocal * 100).toFixed(1)}% iguais.`,
        );
      // Sequência de H2 idêntica é sinal de template puro com localidade trocada.
      if (a.h2.length > 2 && a.h2.join("|") === b.h2.join("|"))
        erros.push(`DOORWAY ${familia}: ${a.path} ↔ ${b.path} — sequência de H2 idêntica.`);
      const faqIguais = a.faqs.filter((q) => b.faqs.includes(q));
      if (a.faqs.length && faqIguais.length === a.faqs.length && faqIguais.length === b.faqs.length)
        erros.push(`DOORWAY ${familia}: ${a.path} ↔ ${b.path} — FAQ integralmente repetida.`);
    }
  }
}

// ── 4. Unicidade de metadata e volume mínimo ──────────────────────────────
const vistos = { title: new Map(), description: new Map(), h1: new Map() };
for (const p of indexaveis) {
  for (const campo of ["title", "description", "h1"]) {
    const chave = semAcento(p[campo]).replace(/\s+/g, " ").trim();
    if (!chave) {
      erros.push(`${p.path}: ${campo} ausente.`);
      continue;
    }
    const anterior = vistos[campo].get(chave);
    if (anterior) erros.push(`${p.path}: ${campo} idêntico ao de ${anterior}.`);
    else vistos[campo].set(chave, p.path);
  }
  if (p.palavras < 550)
    erros.push(`${p.path}: ${p.palavras} palavras no <main> (mínimo do checklist: 550).`);
}

// ── Saída ─────────────────────────────────────────────────────────────────
console.log(
  `check:local-doorway — ${paginas.size} páginas analisadas (${indexaveis.length} indexáveis do Lote Local 1).`,
);
for (const a of avisos) console.log(`  aviso: ${a}`);
if (erros.length) {
  console.error(`\n✖ ${erros.length} falha(s) antidoorway:`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("✔ Nenhum padrão de doorway detectado no Lote Local 1.");
