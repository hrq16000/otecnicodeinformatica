// @ts-nocheck
// GATE DE NAP / WHATSAPP — build da marca "O Técnico de Informática".
//
// Antes da transformação do remix este verificador comparava o domínio de
// ORIGEM com o novo. Isso deixou de fazer sentido e virou um falso positivo:
// o número "legado" e o oficial passaram a ser o mesmo, e o gate ainda batia
// em um domínio de terceiros — o que viola o isolamento de marca.
//
// Agora ele audita apenas o que este projeto publica: o HTML estático do build
// (dist/) precisa expor o número oficial de forma consistente e NUNCA um número
// diferente do configurado, nem número visível em texto ou link `tel:`.
//
// Uso:
//   node scripts/check-nap-whatsapp.mjs --confirm=<numero>
//   node scripts/check-nap-whatsapp.mjs --confirm=<numero> --pages=/,/valores
//
// Saída: reports/nap-whatsapp.json
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { WHATSAPP_NUMBER, WHATSAPP_CONFIGURED, BRAND_NAME } from "./lib/site-env.mjs";

const args = process.argv.slice(2);
const argVal = (n) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.split("=")[1] : null;
};

const DIST = path.resolve(argVal("dist") || "dist");

if (!WHATSAPP_CONFIGURED) {
  console.error("BLOQUEADO: VITE_WHATSAPP_NUMBER não está configurado — o funil está desligado (fail-closed).");
  process.exit(1);
}

const OFFICIAL = WHATSAPP_NUMBER;
const confirmed = argVal("confirm");
if (!confirmed) {
  console.error("BLOQUEADO: confirme o número oficial com --confirm=<numero> antes de rodar o verificador.");
  process.exit(1);
}
if (confirmed !== OFFICIAL) {
  console.error(`BLOQUEADO: número confirmado (${confirmed}) difere do oficial configurado (${OFFICIAL}).`);
  process.exit(1);
}

const DEFAULT_PAGES = [
  "/",
  "/contato",
  "/precos-e-politicas",
  "/como-funciona",
  "/sobre",
  "/faq",
];
const pagesArg = argVal("pages");
const paths = pagesArg ? pagesArg.split(",") : DEFAULT_PAGES;

const digits = (s) => s.replace(/\D/g, "");
const tail = (n) => n.slice(-11);

function extract(html) {
  const wa = new Set();
  const jsonldPhones = new Set();
  const telLinks = new Set();
  const textoVisivel = new Set();

  for (const m of html.matchAll(/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(\d{10,15})/g)) wa.add(m[1]);
  for (const m of html.matchAll(/"telephone"\s*:\s*"([^"]+)"/g)) jsonldPhones.add(digits(m[1]));
  for (const m of html.matchAll(/tel:\+?([\d\s()-]{8,})/g)) telLinks.add(digits(m[1]));

  // Texto visível: só o que sobra depois de remover scripts e atributos.
  const visivel = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  for (const m of visivel.matchAll(/(?:\+?55[\s.-]?)?\(?\d{2}\)?[\s.-]?9[\s.-]?\d{4}[\s.-]?\d{4}/g)) {
    textoVisivel.add(digits(m[0]));
  }

  const name =
    html.match(/"name"\s*:\s*"([^"]+)"/)?.[1] ??
    html.match(/<meta[^>]+property="og:site_name"[^>]+content="([^"]+)"/i)?.[1] ??
    "";

  return {
    name,
    whatsapp: [...wa],
    jsonldPhones: [...jsonldPhones],
    telLinks: [...telLinks],
    textoVisivel: [...textoVisivel],
  };
}

function readPage(p) {
  const rel = p === "/" ? "index.html" : path.join(p.replace(/^\//, ""), "index.html");
  const file = path.join(DIST, rel);
  if (!existsSync(file)) return null;
  return readFileSync(file, "utf8");
}

const report = { official: OFFICIAL, brand: BRAND_NAME, pages: [], violations: [] };

for (const p of paths) {
  const html = readPage(p);
  if (html === null) {
    report.pages.push({ path: p, presente: false });
    continue; // rota não pré-renderizada não é objeto deste gate
  }
  const data = extract(html);
  report.pages.push({ path: p, presente: true, ...data });

  const foraDoOficial = [...data.whatsapp, ...data.jsonldPhones].filter((n) => tail(n) !== tail(OFFICIAL));
  if (foraDoOficial.length) {
    report.violations.push(`${p}: número diferente do oficial em wa.me/JSON-LD (${foraDoOficial.join(", ")})`);
  }
  if (data.telLinks.length) {
    report.violations.push(`${p}: link tel: encontrado (${data.telLinks.join(", ")}) — contato é exclusivamente por WhatsApp`);
  }
  if (data.textoVisivel.length) {
    report.violations.push(`${p}: telefone em texto visível (${data.textoVisivel.join(", ")}) — o número nunca é exibido`);
  }
  if (data.name && !data.name.toLowerCase().includes("técnico")) {
    report.violations.push(`${p}: NAP inconsistente — nome "${data.name}" não corresponde à marca`);
  }
}

mkdirSync("reports", { recursive: true });
writeFileSync("reports/nap-whatsapp.json", JSON.stringify(report, null, 2) + "\n");

const auditadas = report.pages.filter((p) => p.presente).length;
console.log(`NAP/WhatsApp: ${auditadas}/${paths.length} páginas do build auditadas · ${report.violations.length} violações`);
for (const v of report.violations) console.log(`  FAIL ${v}`);
console.log("relatório: reports/nap-whatsapp.json");
if (report.violations.length) process.exit(1);
