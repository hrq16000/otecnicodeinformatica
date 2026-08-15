#!/usr/bin/env node
/**
 * GATE — conformidade dos schemas estruturais com os padrões do schema.org.
 *
 * Varre TODO o HTML estático de dist/ e valida, por rota pública indexável:
 *   • LocalBusiness  — name, url, address (PostalAddress com streetAddress/
 *                      addressLocality/addressRegion/postalCode/addressCountry),
 *                      areaServed e openingHoursSpecification bem formado.
 *   • Service        — name, serviceType/description, provider e areaServed.
 *   • FAQPage        — mainEntity[] com Question(name) + acceptedAnswer(Answer.text).
 *   • BreadcrumbList — itemListElement[] com position sequencial (1..n), name e item.
 *   • Duplicidade    — nenhum tipo estrutural repetido na mesma página com o mesmo @id
 *                      (ou mais de um FAQPage/BreadcrumbList por rota).
 *
 * Fail-closed: campo inválido ou duplicidade reprova o build.
 * Uso: node scripts/check-schema-standards.mjs [dist]
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");

if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const IGNORAR = [/^404\.html$/, /^admin\//, /^debug\//, /^status-os\//, /^funil-indisponivel\//];

/** Lista recursiva de index.html em dist/. */
function listarPaginas(dir, base = "") {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const abs = path.join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(abs).isDirectory()) {
      out.push(...listarPaginas(abs, rel));
    } else if (entry === "index.html" || rel === "404.html") {
      out.push(rel);
    }
  }
  return out;
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
const temTipo = (n, t) => tipos(n).includes(t);
const texto = (v) => (typeof v === "string" ? v.trim() : "");

const HORARIO_RE = /^(\d{2}):(\d{2})$/;
const DIAS_VALIDOS = new Set([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "PublicHolidays",
]);

function validarLocalBusiness(node, push) {
  if (!texto(node.name)) push("LocalBusiness sem 'name'");
  if (!texto(node.url)) push("LocalBusiness sem 'url'");

  const end = node.address;
  if (!end || typeof end !== "object" || Array.isArray(end)) {
    push("LocalBusiness sem 'address' (PostalAddress)");
  } else {
    if (!temTipo(end, "PostalAddress")) push("LocalBusiness.address sem @type PostalAddress");
    for (const campo of ["addressLocality", "addressRegion", "addressCountry"]) {
      if (!texto(end[campo])) push(`LocalBusiness.address sem '${campo}'`);
    }
  }

  const areas = node.areaServed ? [].concat(node.areaServed) : [];
  if (areas.length === 0) push("LocalBusiness sem 'areaServed'");

  const horarios = node.openingHoursSpecification ? [].concat(node.openingHoursSpecification) : [];
  for (const h of horarios) {
    if (!h || typeof h !== "object") {
      push("openingHoursSpecification com item inválido");
      continue;
    }
    if (!temTipo(h, "OpeningHoursSpecification")) {
      push("openingHoursSpecification sem @type OpeningHoursSpecification");
    }
    const dias = h.dayOfWeek ? [].concat(h.dayOfWeek) : [];
    if (dias.length === 0) push("openingHoursSpecification sem 'dayOfWeek'");
    for (const d of dias) {
      const nome = texto(d).split("/").pop();
      if (!DIAS_VALIDOS.has(nome)) push(`openingHoursSpecification com dayOfWeek inválido: ${d}`);
    }
    for (const campo of ["opens", "closes"]) {
      const valor = texto(h[campo]);
      if (!HORARIO_RE.test(valor.slice(0, 5))) {
        push(`openingHoursSpecification com '${campo}' fora do formato HH:MM (${valor || "vazio"})`);
      }
    }
  }
}

function validarService(node, push) {
  if (!texto(node.name)) push("Service sem 'name'");
  if (!texto(node.serviceType) && !texto(node.description)) {
    push("Service sem 'serviceType' nem 'description'");
  }
  const provider = node.provider;
  if (!provider || typeof provider !== "object" || Array.isArray(provider)) {
    push("Service sem 'provider'");
  } else if (!texto(provider.name) && !texto(provider["@id"])) {
    push("Service.provider sem 'name' nem '@id'");
  }
  const areas = node.areaServed ? [].concat(node.areaServed) : [];
  if (areas.length === 0) push("Service sem 'areaServed'");
}

function validarFaqPage(node, push) {
  const perguntas = node.mainEntity ? [].concat(node.mainEntity) : [];
  if (perguntas.length === 0) {
    push("FAQPage sem 'mainEntity'");
    return;
  }
  const vistos = new Set();
  perguntas.forEach((q, i) => {
    if (!q || typeof q !== "object") {
      push(`FAQPage.mainEntity[${i}] inválido`);
      return;
    }
    if (!temTipo(q, "Question")) push(`FAQPage.mainEntity[${i}] sem @type Question`);
    const nome = texto(q.name);
    if (!nome) push(`FAQPage.mainEntity[${i}] sem 'name'`);
    const chave = nome.toLowerCase();
    if (chave && vistos.has(chave)) push(`FAQPage com pergunta duplicada: "${nome}"`);
    vistos.add(chave);
    const resposta = q.acceptedAnswer;
    if (!resposta || typeof resposta !== "object" || Array.isArray(resposta)) {
      push(`FAQPage.mainEntity[${i}] sem 'acceptedAnswer'`);
      return;
    }
    if (!temTipo(resposta, "Answer")) push(`FAQPage.mainEntity[${i}].acceptedAnswer sem @type Answer`);
    if (!texto(resposta.text)) push(`FAQPage.mainEntity[${i}].acceptedAnswer sem 'text'`);
  });
}

function validarBreadcrumb(node, push) {
  const itens = node.itemListElement ? [].concat(node.itemListElement) : [];
  if (itens.length < 2) {
    push("BreadcrumbList com menos de 2 níveis");
    return;
  }
  itens.forEach((it, i) => {
    if (!it || typeof it !== "object") {
      push(`BreadcrumbList.itemListElement[${i}] inválido`);
      return;
    }
    if (!temTipo(it, "ListItem")) push(`BreadcrumbList.itemListElement[${i}] sem @type ListItem`);
    if (Number(it.position) !== i + 1) {
      push(`BreadcrumbList.itemListElement[${i}] com position ${it.position} (esperado ${i + 1})`);
    }
    const nome = texto(it.name) || texto(it.item?.name);
    if (!nome) push(`BreadcrumbList.itemListElement[${i}] sem 'name'`);
    const alvo = typeof it.item === "string" ? it.item : texto(it.item?.["@id"]) || texto(it.item?.url);
    if (!alvo && i < itens.length - 1) {
      push(`BreadcrumbList.itemListElement[${i}] sem 'item' (obrigatório fora do último nível)`);
    }
  });
}

const VALIDADORES = [
  ["LocalBusiness", validarLocalBusiness],
  ["Service", validarService],
  ["FAQPage", validarFaqPage],
  ["BreadcrumbList", validarBreadcrumb],
];
const UNICOS = new Set(["FAQPage", "BreadcrumbList"]);

const errors = [];
let paginas = 0;
let nosValidados = 0;

for (const rel of listarPaginas(DIST)) {
  if (IGNORAR.some((re) => re.test(rel))) continue;
  const html = readFileSync(path.join(DIST, rel), "utf8");
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) continue;
  paginas++;
  const rota = `/${rel.replace(/index\.html$/, "").replace(/\/$/, "")}` || "/";

  const nodes = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        errors.push(`${rota}: bloco JSON-LD inválido (não parseia)`);
        return null;
      }
    })
    .filter(Boolean)
    .flatMap(flatten);

  const contagem = new Map();
  const idsPorTipo = new Map();

  for (const node of nodes) {
    for (const [tipo, validar] of VALIDADORES) {
      if (!temTipo(node, tipo)) continue;
      nosValidados++;
      contagem.set(tipo, (contagem.get(tipo) || 0) + 1);
      const id = texto(node["@id"]);
      if (id) {
        const chave = `${tipo}|${id}`;
        if (idsPorTipo.has(chave)) errors.push(`${rota}: ${tipo} duplicado com @id "${id}"`);
        idsPorTipo.set(chave, true);
      }
      validar(node, (msg) => errors.push(`${rota}: ${msg}`));
    }
  }

  for (const tipo of UNICOS) {
    const n = contagem.get(tipo) || 0;
    if (n > 1) errors.push(`${rota}: ${n} nós ${tipo} na mesma página (duplicidade)`);
  }
}

if (errors.length > 0) {
  console.error("BLOQUEADO — schemas fora do padrão schema.org:\n");
  for (const e of errors.slice(0, 80)) console.error(`  • ${e}`);
  if (errors.length > 80) console.error(`  … e mais ${errors.length - 80} problema(s).`);
  console.error(`\nTotal: ${errors.length} problema(s) em ${paginas} página(s).`);
  process.exit(1);
}

console.log(
  `OK — schema.org conforme: ${nosValidados} nó(s) LocalBusiness/Service/FAQPage/BreadcrumbList em ${paginas} página(s) indexáveis.`,
);
