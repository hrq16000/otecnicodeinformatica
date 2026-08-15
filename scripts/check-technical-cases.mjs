#!/usr/bin/env node
/**
 * ============================================================================
 * GATE — CASOS TÉCNICOS REAIS (Rodada 3G)
 * ============================================================================
 * Falha fechado. Valida que:
 *   1. Nenhum caso é publicável sem aprovação completa (real, revisado,
 *      anonimizado, com evidência e limitações registradas).
 *   2. Nenhum dado pessoal (nome, telefone, e-mail, endereço completo,
 *      número de série, senha) aparece no registro de casos.
 *   3. Nenhuma foto sem alt ou sem classificação.
 *   4. Nenhuma categoria fora do escopo atual.
 *   5. Nenhuma linguagem de resultado garantido.
 *   6. Nenhum componente de prova renderizado em rota pública enquanto
 *      não houver caso aprovado.
 *
 * Uso: node scripts/check-technical-cases.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, sep } from "node:path";

const ROOT = process.cwd();
const LIB = join(ROOT, "src/lib/technicalCases.ts");
const COMPONENTS = join(ROOT, "src/components/casos/TechnicalCaseBlocks.tsx");
const DOC = join(ROOT, "docs/coleta-casos-tecnicos-reais.md");

const errors = [];
const info = [];

const fail = (m) => errors.push(m);

// ── 1. Arquivos obrigatórios ────────────────────────────────────────────────
for (const [label, file] of [
  ["modelo de dados", LIB],
  ["componentes de prova", COMPONENTS],
  ["checklist operacional", DOC],
]) {
  if (!existsSync(file)) fail(`Arquivo obrigatório ausente (${label}): ${file}`);
}
if (errors.length) {
  console.error("check:technical-cases FALHOU\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}

const libSrc = readFileSync(LIB, "utf8");
const compSrc = readFileSync(COMPONENTS, "utf8");

// ── 2. Fail-closed no modelo ────────────────────────────────────────────────
const REQUISITOS = [
  "validateTechnicalCase",
  "getPublishableCases",
  "technicalReview",
  "customerAuthorization",
  "customerNameRemoved",
  "serialNumberRemoved",
  "personalDataRemoved",
  "screenDataReviewed",
  "limitations",
  "workOrderReference",
];
for (const r of REQUISITOS) {
  if (!libSrc.includes(r)) fail(`Modelo de casos sem requisito fail-closed: ${r}`);
}
if (!/status === "approved"/.test(libSrc)) {
  fail('Modelo não exige status "approved" para publicação.');
}

// ── 3. Categorias ───────────────────────────────────────────────────────────
const catBlock = libSrc.match(/TECHNICAL_CASE_CATEGORIES = \[([\s\S]*?)\] as const/);
const categorias = catBlock ? [...catBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]) : [];
if (categorias.length === 0) fail("Nenhuma categoria declarada.");
const OFF_TOPIC = ["tv", "celular", "eletrodomestico", "cftv", "videogame", "audio", "eletrica"];
for (const c of categorias) {
  if (OFF_TOPIC.some((o) => c.includes(o))) fail(`Categoria off-topic declarada: ${c}`);
}
info.push(`Categorias no escopo: ${categorias.length}`);

// ── 4. Casos registrados ────────────────────────────────────────────────────
const registroVazio = /TECHNICAL_CASES:\s*TechnicalCase\[\]\s*=\s*\[\s*\]/.test(libSrc);
const casosRegistrados = registroVazio ? 0 : null;
if (casosRegistrados === 0) info.push("Casos registrados: 0 (nenhum caso publicado).");

// ── 5. Varredura de PII em todo o material de casos ─────────────────────────
const PII = [
  { re: /\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/g, msg: "telefone" },
  { re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, msg: "e-mail" },
  { re: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, msg: "CPF" },
  { re: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g, msg: "CNPJ" },
  { re: /\b(rua|avenida|av\.|travessa)\s+[a-zçãéíóú]+[^\n]*,\s*\d+/gi, msg: "endereço completo" },
  { re: /serial\s*[:=]\s*["'][A-Z0-9]{6,}/gi, msg: "número de série" },
  { re: /(senha|password)\s*[:=]\s*["'][^"']+/gi, msg: "senha" },
];
const alvos = [LIB, COMPONENTS, DOC];
for (const f of alvos) {
  const src = readFileSync(f, "utf8");
  for (const p of PII) {
    const hit = src.match(p.re);
    if (hit) fail(`Possível ${p.msg} em ${f}: ${hit[0].slice(0, 40)}`);
  }
}

// ── 6. Linguagem proibida ───────────────────────────────────────────────────
const PROIBIDAS = [
  "sempre resolve",
  "resultado garantido",
  "igual ao novo",
  "100% recuperado",
  "reparo definitivo",
  "melhor assistência",
  "serviço perfeito",
];
for (const p of PROIBIDAS) {
  if (!libSrc.toLowerCase().includes(p)) {
    fail(`Lista de linguagem proibida incompleta no modelo: "${p}"`);
  }
}

// ── 7. Componentes: alt, classificação e fail-closed ────────────────────────
if (!compSrc.includes("validateTechnicalCase")) {
  fail("Componentes de prova não validam o caso antes de renderizar.");
}
if (!/alt=\{photo\.alt\}/.test(compSrc)) fail("Componente de evidência sem alt vinculado à foto.");
if (!compSrc.includes("photo.kind")) fail("Componente de evidência não exige classificação da foto.");
if (!compSrc.includes("Imagem ilustrativa")) fail("Componente de evidência sem indicação de imagem ilustrativa.");
if (!/Resultados variam/i.test(compSrc)) fail("Template de caso sem aviso de variação de resultados.");

// ── 8. Nenhum componente montado em rota pública sem caso aprovado ──────────
const usados = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (![".ts", ".tsx"].includes(extname(entry))) continue;
    if (full === COMPONENTS) continue;
    const src = readFileSync(full, "utf8");
    if (!/TechnicalCase(Summary|Evidence|Process)/.test(src)) continue;
    // Exceção: estação interna do admin — rota /admin/*, noindex e protegida por role.
    const internoAdmin =
      full.includes(`${sep}src${sep}pages${sep}admin${sep}`) &&
      /noindex/.test(src) &&
      /useAdminAuth/.test(src);
    if (internoAdmin) continue;
    usados.push(full);

  }
};
walk(join(ROOT, "src"));
if (casosRegistrados === 0 && usados.length > 0) {
  fail(`Componentes de prova referenciados sem caso aprovado: ${usados.join(", ")}`);
}

// ── 9. Nenhuma rota pública de casos ────────────────────────────────────────
for (const routerFile of ["src/App.tsx", "src/LegacyApp.tsx"]) {
  const p = join(ROOT, routerFile);
  if (!existsSync(p)) continue;
  const src = readFileSync(p, "utf8");
  if (/path="\/casos/.test(src)) fail(`Rota pública de casos criada em ${routerFile} sem caso aprovado.`);
}

// ── 10. Casos fora dos sitemaps ─────────────────────────────────────────────
const publicDir = join(ROOT, "public");
if (existsSync(publicDir)) {
  for (const f of readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"))) {
    const xml = readFileSync(join(publicDir, f), "utf8");
    if (xml.includes("/casos")) fail(`Sitemap ${f} contém URL de casos.`);
  }
}

// ── Resultado ───────────────────────────────────────────────────────────────
if (errors.length) {
  console.error("check:technical-cases FALHOU (fail-closed)\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log("check:technical-cases OK");
for (const i of info) console.log(` - ${i}`);
console.log(" - Casos publicáveis: 0 (nenhum caso aprovado — comportamento esperado nesta fase).");
