// RODADA 4B.1 — Verificador de WhatsApp e NAP no domínio antigo e no novo.
// Extrai automaticamente números de WhatsApp, nome, endereço e telefone (NAP)
// das páginas públicas dos dois domínios e FALHA se o número oficial não for
// confirmado explicitamente na linha de comando.
//
// Uso:
//   node scripts/check-nap-whatsapp.mjs --confirm=5541997452053
//   node scripts/check-nap-whatsapp.mjs --confirm=5541997452053 --pages=/,/valores
//
// Saída: reports/nap-whatsapp.json
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const MAP = JSON.parse(readFileSync("redirects/tecnicocuritiba.map.json", "utf8"));
const OFFICIAL = "5541997452053";
const LEGACY = "5541997452053";

const args = process.argv.slice(2);
const argVal = (n) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.split("=")[1] : null;
};

const confirmed = argVal("confirm");
if (!confirmed) {
  console.error("BLOQUEADO: confirme o número oficial com --confirm=<numero> antes de rodar o verificador.");
  process.exit(1);
}
if (confirmed !== OFFICIAL) {
  console.error(`BLOQUEADO: número confirmado (${confirmed}) difere do oficial do projeto (${OFFICIAL}).`);
  process.exit(1);
}

const KEPT = MAP.kept_urls ?? ["/"];
const pagesArg = argVal("pages");
const paths = pagesArg ? pagesArg.split(",") : KEPT;

const digits = (s) => s.replace(/\D/g, "");

// Detecta um número em QUALQUER formatação (espaços, pontos, hífens,
// parênteses, +55, entidades HTML) dentro de um texto arbitrário.
function containsNumber(text, number) {
  const flat = text.replace(/&#\d+;/g, "").replace(/[^\d]/g, "");
  if (flat.includes(number)) return true;
  // fallback: sem o DDI
  return flat.includes(number.slice(2));
}

function extract(html) {
  const phones = new Set();
  const wa = new Set();
  const sources = new Set();
  // 1. links wa.me / api.whatsapp.com (href, data-*, JS inline)
  for (const m of html.matchAll(/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)\/?(\d{10,15})/g)) {
    wa.add(m[1]);
    sources.add("whatsapp-link");
  }
  // 2. JSON-LD / schemas: telephone, contactPoint, sameAs
  for (const m of html.matchAll(/"telephone"\s*:\s*"([^"]+)"/g)) {
    phones.add(digits(m[1]));
    sources.add("jsonld-telephone");
  }
  for (const m of html.matchAll(/"(?:sameAs|url|identifier)"\s*:\s*"([^"]*(?:wa\.me|whatsapp)[^"]*)"/gi)) {
    const d = digits(m[1]);
    if (d.length >= 10) {
      wa.add(d);
      sources.add("jsonld-sameas");
    }
  }
  // 3. links tel:
  for (const m of html.matchAll(/tel:\+?([\d\s()-]{8,})/g)) {
    phones.add(digits(m[1]));
    sources.add("tel-link");
  }
  // 4. atributos e assets (img src, data-phone, aria-label, og:*)
  for (const m of html.matchAll(/(?:data-[\w-]*phone|data-whatsapp|aria-label|alt|content|src|href)="([^"]*)"/gi)) {
    const d = digits(m[1]);
    if (d.length >= 10) {
      phones.add(d);
      sources.add("atributo/asset");
    }
  }
  // 5. texto visível em qualquer formatação
  for (const m of html.matchAll(/(?:\+?55[\s.-]?)?\(?41\)?[\s.-]?9[\s.-]?\d{4}[\s.-]?\d{4}/g)) {
    phones.add(digits(m[0]));
    sources.add("texto");
  }
  const name =
    html.match(/"name"\s*:\s*"([^"]+)"/)?.[1] ??
    html.match(/<meta[^>]+property="og:site_name"[^>]+content="([^"]+)"/i)?.[1] ??
    "";
  const address =
    html.match(/"streetAddress"\s*:\s*"([^"]+)"/)?.[1] ??
    html.match(/"addressLocality"\s*:\s*"([^"]+)"/)?.[1] ??
    "";
  return {
    name,
    address,
    phones: [...phones],
    whatsapp: [...wa],
    sources: [...sources],
    legacyRaw: containsNumber(html, LEGACY),
    officialRaw: containsNumber(html, OFFICIAL),
  };
}

async function scan(domain, path) {
  const url = `${domain}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    return { url, status: res.status, finalUrl: res.url, ...extract(html) };
  } catch (err) {
    return { url, status: 0, error: err.message, phones: [], whatsapp: [] };
  }
}

const report = { confirmed_official: OFFICIAL, legacy: LEGACY, old: [], new: [], violations: [] };

for (const p of paths) {
  const oldPage = await scan(MAP.source_domain, p);
  report.old.push(oldPage);
  const all = [...oldPage.phones, ...oldPage.whatsapp].map(digits);
  if (all.some((n) => n.endsWith(LEGACY.slice(-11))) || oldPage.legacyRaw)
    report.violations.push(
      `número legado ainda servido em ${oldPage.url} (fontes: ${(oldPage.sources ?? []).join(", ") || "html bruto"})`,
    );
  if (oldPage.status === 200 && !all.some((n) => n.endsWith(OFFICIAL.slice(-11))) && all.length)
    report.violations.push(`${oldPage.url} não expõe o número oficial`);
}

for (const p of paths) {
  const newPage = await scan(MAP.target_domain, p);
  report.new.push(newPage);
  const all = [...newPage.phones, ...newPage.whatsapp].map(digits);
  if (all.some((n) => n.endsWith(LEGACY.slice(-11))) || newPage.legacyRaw)
    report.violations.push(`número legado presente no domínio novo em ${newPage.url}`);
}

mkdirSync("reports", { recursive: true });
writeFileSync("reports/nap-whatsapp.json", JSON.stringify(report, null, 2) + "\n");

console.log(`NAP/WhatsApp: ${paths.length} páginas antigas + ${paths.length} novas verificadas · ${report.violations.length} violações`);
for (const v of report.violations) console.log(`  FAIL ${v}`);
console.log("relatório: reports/nap-whatsapp.json");
if (report.violations.length) process.exit(1);
