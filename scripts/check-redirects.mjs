// RODADA 4B/4B.1 — Gate de redirects da migração tecnicocuritiba.com.br → o domínio configurado
// Valida, contra a rede, cada regra de redirects/tecnicocuritiba.map.json:
//   status 301/308 · Location exato · salto único · destino 200 · HTTPS
//   destino sem noindex · canonical final self-referente · sem loop
//   sem redirect para "/" quando a matriz define destino específico
//
// Uso:
//   node scripts/check-redirects.mjs                  # amostra (críticas + 30)
//   node scripts/check-redirects.mjs --all            # matriz completa
//   node scripts/check-redirects.mjs --batch=100 --offset=0   # validação por lotes
//   node scripts/check-redirects.mjs --all --enforce  # falha se houver pendentes
//
// Saídas: reports/redirect-gate.json e reports/redirect-gate.md (relatório consolidado
// com status por origem, saltos, Location, status final e evidência canonical/noindex).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const MAP = JSON.parse(readFileSync("redirects/tecnicocuritiba.map.json", "utf8"));
const OLD = MAP.source_domain;
const args = process.argv.slice(2);
const ALL = args.includes("--all");
const ENFORCE = args.includes("--enforce");
const argVal = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : null;
};
const BATCH = Number(argVal("batch") || 0);
const OFFSET = Number(argVal("offset") || 0);

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
  if (BATCH > 0) return MAP.rules.slice(OFFSET, OFFSET + BATCH);
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
const selection = pick();

for (const rule of selection) {
  const origin = `${OLD}${rule.from}`;
  const row = {
    origin,
    expected: rule.to,
    critical: CRITICAL.includes(rule.from),
    status: null,
    location: "",
    hops: 0,
    chain: [],
    final: "",
    finalStatus: null,
    canonical: "",
    noindex: null,
    state: "ok",
    error: "",
  };
  try {
    const first = await head(origin);
    row.status = first.status;
    row.location = first.location;

    if (first.status === 200) {
      row.state = "pendente";
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
    row.chain = [`${first.status} ${origin} → ${first.location}`];
    const second = await head(first.location);
    row.hops = 1;
    row.finalStatus = second.status;
    if ([301, 302, 307, 308].includes(second.status)) {
      row.hops = 2;
      row.chain.push(`${second.status} ${first.location} → ${second.location}`);
      row.error ||= `cadeia de redirects (${first.location} → ${second.location})`;
      if (second.location === origin) row.error = "loop de redirect";
    }
    if (second.status !== 200 && row.hops === 1) row.error ||= `destino responde ${second.status}`;
    row.final = first.location;

    // canonical + noindex no destino
    if (!row.error) {
      const html = await (await fetch(first.location)).text();
      row.canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
      row.noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html);
      if (row.canonical && row.canonical.replace(/\/$/, "") !== rule.to.replace(/\/$/, ""))
        row.error = `canonical final ${row.canonical} ≠ ${rule.to}`;
      if (row.noindex) row.error ||= "destino com noindex";
    }
  } catch (err) {
    row.error = `erro de rede: ${err.message}`;
  }
  if (row.error && row.state !== "pendente") {
    row.state = "falha";
    failures.push(row);
  }
  results.push(row);
}

const okCount = results.filter((r) => r.state === "ok").length;
const coverage = ((results.length / MAP.rules.length) * 100).toFixed(1);
const summary = {
  generated_at: new Date().toISOString(),
  source_domain: OLD,
  target_domain: MAP.target_domain,
  published: MAP.published === true,
  total_rules: MAP.rules.length,
  checked: results.length,
  coverage_pct: Number(coverage),
  success: okCount,
  pending: pending.length,
  failures: failures.length,
  pending_urls: pending.map((p) => p.origin),
  results,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/redirect-gate.json", JSON.stringify(summary, null, 2) + "\n");

// Relatório consolidado em markdown (anexo de aprovação).
const md = [
  "# Gate de redirects — tecnicocuritiba.com.br → o domínio configurado",
  "",
  `- Gerado em: ${summary.generated_at}`,
  `- Mapa publicado (published): **${summary.published ? "true" : "false"}**`,
  `- Regras na matriz: ${summary.total_rules}`,
  `- Verificadas nesta execução: ${summary.checked} (coverage ${coverage}%)`,
  `- Sucesso: ${okCount} · Pendentes: ${pending.length} · Falhas: ${failures.length}`,
  "",
  "## Status por origem",
  "",
  "| Origem | Estado | Status | Location | Saltos | Status final | Canonical | noindex | Observação |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...results.map(
    (r) =>
      `| ${r.origin}${r.critical ? " ⭐" : ""} | ${r.state} | ${r.status ?? "-"} | ${r.location || "-"} | ${r.hops} | ${
        r.finalStatus ?? "-"
      } | ${r.canonical || "-"} | ${r.noindex === null ? "-" : r.noindex ? "SIM" : "não"} | ${r.error || "-"} |`,
  ),
  "",
  "## URLs pendentes (redirect ainda não publicado)",
  "",
  pending.length ? pending.map((p) => `- ${p.origin}`).join("\n") : "_nenhuma_",
  "",
].join("\n");
writeFileSync("reports/redirect-gate.md", md);

console.log(
  `redirect gate: ${results.length}/${MAP.rules.length} verificadas (${coverage}%) · ${okCount} ok · ${pending.length} pendentes · ${failures.length} falhas`,
);
for (const f of failures) console.log(`  FAIL ${f.origin} [${f.status}] → ${f.location} (${f.hops} saltos): ${f.error}`);
console.log("relatórios: reports/redirect-gate.json · reports/redirect-gate.md");

if (failures.length) process.exit(1);
if (pending.length && ENFORCE) {
  console.log("ENFORCE: existem origens ainda sem redirect publicado.");
  process.exit(1);
}
