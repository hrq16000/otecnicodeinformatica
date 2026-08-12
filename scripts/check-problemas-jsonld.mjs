#!/usr/bin/env node
/**
 * GATE — completude do JSON-LD do cluster /problemas.
 *
 * Antes do deploy, cada página de sintoma precisa entregar, já no HTML estático:
 *   • WebPage (ou TechArticle/Article equivalente) com url/description;
 *   • FAQPage com pelo menos 3 perguntas, em paridade com a FAQ espelhada;
 *   • BreadcrumbList com 3 níveis (Início > Problemas > sintoma);
 *   • canonical self coerente com a rota.
 *
 * Uso: node scripts/check-problemas-jsonld.mjs [dist]
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { BASE_URL } from "./lib/site-env.mjs";
import { CLUSTER_PROBLEMAS_ROUTES } from "./lib/cluster-problemas-static.mjs";

const DIST = path.resolve(process.argv[2] || "dist");

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const flatten = (n) =>
  Array.isArray(n)
    ? n.flatMap(flatten)
    : n && typeof n === "object"
      ? Array.isArray(n["@graph"])
        ? n["@graph"].flatMap(flatten)
        : [n]
      : [];

const tipos = (n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]).filter(Boolean);

const errors = [];
let checked = 0;

for (const rota of CLUSTER_PROBLEMAS_ROUTES) {
  const rel = rota.path.replace(/^\//, "");
  const file = path.join(DIST, rel, "index.html");
  if (!existsSync(file)) {
    errors.push(`${rota.path}: HTML estático ausente (${path.relative(DIST, file)})`);
    continue;
  }
  checked++;
  const html = readFileSync(file, "utf8");
  const nodes = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        errors.push(`${rota.path}: bloco JSON-LD inválido (não parseia)`);
        return null;
      }
    })
    .filter(Boolean)
    .flatMap(flatten);

  const temPagina = nodes.some((n) =>
    tipos(n).some((t) => ["WebPage", "TechArticle", "Article", "CollectionPage"].includes(t)),
  );
  if (!temPagina) errors.push(`${rota.path}: sem nó WebPage/TechArticle`);

  const crumbs = nodes.filter((n) => tipos(n).includes("BreadcrumbList"));
  if (crumbs.length !== 1) {
    errors.push(`${rota.path}: esperado 1 BreadcrumbList, encontrado ${crumbs.length}`);
  } else {
    const items = crumbs[0].itemListElement ?? [];
    const minimo = rota.path === "/problemas" ? 2 : 3;
    if (items.length < minimo)
      errors.push(`${rota.path}: BreadcrumbList com ${items.length} níveis (mínimo ${minimo})`);
    items.forEach((it, i) => {
      if (it.position !== i + 1) errors.push(`${rota.path}: breadcrumb nível ${i + 1} com position=${it.position}`);
      if (!it.name) errors.push(`${rota.path}: breadcrumb nível ${i + 1} sem name`);
    });
  }

  // FAQPage: só é exigida onde existe FAQ espelhada (o hub não tem FAQ própria).
  if (Array.isArray(rota.faq) && rota.faq.length) {
    const faqs = nodes.filter((n) => tipos(n).includes("FAQPage"));
    if (faqs.length !== 1) {
      errors.push(`${rota.path}: esperado 1 FAQPage, encontrado ${faqs.length}`);
    } else {
      const perguntas = (faqs[0].mainEntity ?? []).filter((q) => tipos(q).includes("Question"));
      if (perguntas.length < 3)
        errors.push(`${rota.path}: FAQPage com ${perguntas.length} perguntas (mínimo 3)`);
      if (perguntas.length !== rota.faq.length)
        errors.push(
          `${rota.path}: FAQPage com ${perguntas.length} perguntas × ${rota.faq.length} espelhadas (paridade quebrada)`,
        );
      for (const q of perguntas) {
        if (!q.name) errors.push(`${rota.path}: Question sem name`);
        const texto = q.acceptedAnswer?.text ?? "";
        if (!texto || texto.length < 40)
          errors.push(`${rota.path}: resposta vazia ou curta demais em "${q.name}"`);
      }
    }
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const esperado = `${BASE_URL}${rota.path}`;
  if (canonical && canonical.replace(/\/$/, "") !== esperado.replace(/\/$/, ""))
    errors.push(`${rota.path}: canonical="${canonical}" (esperado "${esperado}")`);
}

if (errors.length) {
  console.error(`BLOQUEADO — JSON-LD incompleto no cluster /problemas (${errors.length} problema(s)):`);
  errors.slice(0, 40).forEach((e) => console.error(`  • ${e}`));
  if (errors.length > 40) console.error(`  … +${errors.length - 40}`);
  process.exit(1);
}

console.log(`OK — WebPage + FAQPage + BreadcrumbList completos em ${checked} rotas de /problemas.`);
