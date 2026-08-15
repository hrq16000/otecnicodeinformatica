#!/usr/bin/env node
/**
 * RELATÓRIO PÚBLICO — divergências entre a FAQ visível e o FAQPage (JSON-LD).
 *
 * Gera:
 *   • public/reports/faq-parity.csv — uma linha por localidade;
 *   • public/reports/faq-parity.md  — resumo legível com status de correção.
 *
 * Não bloqueia o build (o gate check:faq-parity faz isso); serve como
 * evidência pública e auditável do estado de cada localidade.
 *
 * Uso: node scripts/report-faq-parity.mjs [dist]
 */
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CATEGORIES, LOCAIS, localizedFaqs, cityLabel } from "./lib/category-local.mjs";

const DIST = path.resolve(process.argv[2] || "dist");
const OUT = path.resolve("public/reports");
if (!existsSync(DIST)) {
  console.error(`Relatório FAQ: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const norm = (s) =>
  String(s ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const visibleText = (html) =>
  norm(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));

const flatten = (n) =>
  Array.isArray(n)
    ? n.flatMap(flatten)
    : n && typeof n === "object"
      ? Array.isArray(n["@graph"]) ? n["@graph"].flatMap(flatten) : [n]
      : [];

const rows = [];
for (const cat of CATEGORIES) {
  for (const local of LOCAIS) {
    const route = `/${cat.slug}/${local.slug}`;
    const file = path.join(DIST, route, "index.html");
    if (!existsSync(file)) {
      rows.push({ route, categoria: cat.titlePrefix, local: cityLabel(local), jsonld: 0, visiveis: 0, divergencias: ["página ausente no build"], status: "pendente" });
      continue;
    }
    const html = readFileSync(file, "utf8");
    const text = visibleText(html);
    const nodes = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
      .filter(Boolean)
      .flatMap(flatten)
      .filter((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]).includes("FAQPage"));

    const perguntas = nodes.flatMap((n) => (n.mainEntity || []).map((q) => q.name));
    const esperadas = localizedFaqs(cat, local);
    const divergencias = [];

    for (const q of perguntas) if (!text.includes(norm(q))) divergencias.push(`pergunta só no JSON-LD: "${q}"`);
    for (const f of esperadas) {
      if (!perguntas.some((q) => norm(q) === norm(f.q))) divergencias.push(`pergunta visível fora do JSON-LD: "${f.q}"`);
      const trecho = norm(f.a).split(" ").slice(0, 8).join(" ");
      if (trecho && !text.includes(trecho)) divergencias.push(`resposta divergente: "${f.q}"`);
    }
    if (nodes.length > 1) divergencias.push(`${nodes.length} nós FAQPage na mesma página`);

    rows.push({
      route,
      categoria: cat.titlePrefix,
      local: cityLabel(local),
      jsonld: perguntas.length,
      visiveis: esperadas.length,
      divergencias,
      status: divergencias.length ? "divergente" : "ok",
    });
  }
}

const csvEsc = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [
  "rota,categoria,localidade,perguntas_jsonld,perguntas_visiveis,divergencias,detalhe,status",
  ...rows.map((r) =>
    [r.route, r.categoria, r.local, r.jsonld, r.visiveis, r.divergencias.length, r.divergencias.join(" | "), r.status]
      .map(csvEsc)
      .join(","),
  ),
].join("\n");
writeFileSync(path.join(OUT, "faq-parity.csv"), csv + "\n");

const ruins = rows.filter((r) => r.status !== "ok");
const md = [
  "# Paridade FAQ visível × FAQPage (JSON-LD)",
  "",
  `Gerado a partir do build em \`${path.relative(process.cwd(), DIST)}\`.`,
  "",
  `- Localidades auditadas: **${rows.length}**`,
  `- Sem divergência: **${rows.length - ruins.length}**`,
  `- Com divergência: **${ruins.length}**`,
  "",
  "## Localidades com inconsistência",
  "",
  ruins.length ? "| Rota | Localidade | Divergências | Status |\n| --- | --- | --- | --- |" : "Nenhuma inconsistência encontrada — paridade 1:1 em todas as localidades.",
  ...ruins.map((r) => `| \`${r.route}\` | ${r.local} | ${r.divergencias.join("; ")} | ${r.status} |`),
  "",
  "## Status de correção",
  "",
  ruins.length
    ? "Divergências pendentes: o gate `check:faq-parity` bloqueia o deploy até a correção."
    : "Todas as localidades corrigidas e validadas pelo gate `check:faq-parity`.",
  "",
  "CSV completo: [`/reports/faq-parity.csv`](/reports/faq-parity.csv)",
  "",
].join("\n");
writeFileSync(path.join(OUT, "faq-parity.md"), md);

console.log(`Relatório FAQ gerado: ${rows.length} localidades, ${ruins.length} com divergência → public/reports/faq-parity.{csv,md}`);
