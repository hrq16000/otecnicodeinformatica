// RODADA 4B — Gate de redirects da migração tecnicocuritiba.com.br → tecnico.curitiba.br
// Valida, contra a rede, cada regra de redirects/tecnicocuritiba.map.json:
//   status 301/308 · Location exato · salto único · destino 200 · HTTPS
//   destino sem noindex · canonical final self-referente · sem loop
//   sem redirect para "/" quando a matriz define destino específico
// Uso:
//   node scripts/check-redirects.mjs            # amostra (URLs críticas + 30 aleatórias)
//   node scripts/check-redirects.mjs --all      # matriz completa
// Exit code 1 em qualquer falha. Enquanto os redirects não forem publicados,
// o gate reporta "PENDENTE" (origem ainda 200) sem falhar, salvo --enforce.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const MAP = JSON.parse(readFileSync("redirects/tecnicocuritiba.map.json", "utf8"));
const OLD = MAP.source_domain;
const args = process.argv.slice(2);
const ALL = args.includes("--all");
const ENFORCE = args.includes("--enforce");

// URLs críticas obrigatórias (Etapa 15).
const CRITICAL = [
  "/",
  "/valores",
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-fazenda-rio-grande",
  "/tecnico-informatica-colombo",
  "/assistencia-tecnica-curitiba",
  "/bairros/jardim-das-americas",
  "/servicos/conserto-pc-notebook/portao",
  "/diagnostico-60s",
  "/suporte-empresas",
  "/seja-parceiro",
];

const pick = () => {
  if (ALL) return MAP.rules;
  const crit = MAP.rules.filter((r) => CRITICAL.includes(r.from));
  const rest = MAP.rules.filter((r) => !CRITICAL.includes(r.from)).slice(0, 30);
  return [...crit, ...rest];
};

async function head(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, location: res.headers.get("location") ?? "" };
}

const failures = [];
const pending = [];
const results = [];

for (const rule of pick()) {
  const origin = `${OLD}${rule.from}`;
  const row = { origin, expected: rule.to, status: null, location: "", hops: 0, final: "", error: "" };
  try {
    const first = await head(origin);
    row.status = first.status;
    row.location = first.location;

    if (first.status === 200) {
      row.error = "origem ainda responde 200 (redirect não publicado)";
      pending.push(row);
      results.push(row);
      continue;
    }
    if (![301, 308].includes(first.status)) row.error = `status ${first.status} não é 301/308`;
    if (first.location !== rule.to) row.error ||= `Location ${first.location} ≠ esperado ${rule.to}`;
    if (!first.location.startsWith("https://")) row.error ||= "destino não HTTPS";
    if (first.location.includes(OLD.replace("https://", ""))) row.error ||= "retorno ao domínio antigo";
    if (rule.to !== `${MAP.target_domain}/` && first.location === `${MAP.target_domain}/`)
      row.error ||= "redirect genérico para a home";

    // salto único + destino 200
    const second = await head(first.location);
    row.hops = 1;
    if ([301, 302, 307, 308].includes(second.status)) {
      row.hops = 2;
      row.error ||= `cadeia de redirects (${first.location} → ${second.location})`;
    }
    if (second.status !== 200 && row.hops === 1) row.error ||= `destino responde ${second.status}`;
    row.final = first.location;

    // canonical + noindex no destino
    if (!row.error) {
      const html = await (await fetch(first.location)).text();
      const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
      if (canonical && canonical.replace(/\/$/, "") !== rule.to.replace(/\/$/, ""))
        row.error = `canonical final ${canonical} ≠ ${rule.to}`;
      if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) row.error ||= "destino com noindex";
    }
  } catch (err) {
    row.error = `erro de rede: ${err.message}`;
  }
  if (row.error) failures.push(row);
  results.push(row);
}

mkdirSync("reports", { recursive: true });
writeFileSync(
  "reports/redirect-gate.json",
  JSON.stringify({ checked: results.length, pending: pending.length, failures: failures.length, results }, null, 2) + "\n",
);

console.log(`redirect gate: ${results.length} verificadas · ${pending.length} pendentes · ${failures.length} falhas`);
for (const f of failures) console.log(`  FAIL ${f.origin} [${f.status}] → ${f.location} (${f.hops} saltos): ${f.error}`);

if (failures.length) process.exit(1);
if (pending.length && ENFORCE) {
  console.log("ENFORCE: existem origens ainda sem redirect publicado.");
  process.exit(1);
}
