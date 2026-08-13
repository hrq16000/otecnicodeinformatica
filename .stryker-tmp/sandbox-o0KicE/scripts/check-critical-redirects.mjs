// @ts-nocheck
// RODADA 4B.2 — Validação em produção das 41 URLs críticas.
// Para cada URL crítica registra: status inicial, Location, saltos, URL final,
// status final, canonical, robots, title, presença no domínio novo e evidência
// de ausência do número legado de WhatsApp.
//
// Uso:
//   node scripts/check-critical-redirects.mjs
//   node scripts/check-critical-redirects.mjs --enforce   # falha se houver pendências
//
// Saídas: reports/critical-redirects.json · reports/critical-redirects.md
import { writeFileSync, mkdirSync } from "node:fs";
import { loadMap, criticalPaths, categoryOf, scanLegacySurfaces, LEGACY_WA, OFFICIAL_WA } from "./lib/migration-critical.mjs";

const map = loadMap();
const args = process.argv.slice(2);
const ENFORCE = args.includes("--enforce");
const paths = criticalPaths(map);
const byFrom = new Map(map.rules.map((r) => [r.from, r]));

const hop = async (url) => {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, location: res.headers.get("location") ?? "" };
};

const rows = [];
for (const from of paths) {
  const rule = byFrom.get(from);
  const origin = `${map.source_domain}${from}`;
  const row = {
    origin,
    category: categoryOf(from),
    expected: rule?.to ?? null,
    initialStatus: null,
    location: "",
    hops: 0,
    chain: [],
    finalUrl: "",
    finalStatus: null,
    canonical: "",
    robots: "",
    title: "",
    onNewDomain: false,
    legacyHits: [],
    state: "ok",
    error: "",
  };
  try {
    let current = origin;
    let step = await hop(current);
    row.initialStatus = step.status;
    row.location = step.location;

    if (step.status === 200) {
      row.state = "pendente";
      row.error = "origem ainda responde 200 (redirect não publicado)";
      rows.push(row);
      continue;
    }
    while ([301, 302, 307, 308].includes(step.status) && row.hops < 5) {
      row.chain.push(`${step.status} ${current} → ${step.location}`);
      row.hops += 1;
      if (step.location === origin) {
        row.error = "loop de redirect";
        break;
      }
      current = step.location;
      step = await hop(current);
    }
    row.finalUrl = current;
    row.finalStatus = step.status;

    if (![301, 308].includes(row.initialStatus)) row.error ||= `status inicial ${row.initialStatus} não é permanente`;
    if (rule && row.location !== rule.to) row.error ||= `Location ${row.location} ≠ esperado ${rule.to}`;
    if (row.hops > 1) row.error ||= `cadeia com ${row.hops} saltos`;
    if (!current.startsWith("https://")) row.error ||= "destino final não HTTPS";
    if (current.includes(map.source_domain.replace("https://", ""))) row.error ||= "retorno ao domínio antigo";
    if (rule && rule.to !== `${map.target_domain}/` && current.replace(/\/$/, "") === map.target_domain)
      row.error ||= "redirect genérico para a home";
    row.onNewDomain = current.startsWith(map.target_domain);
    if (row.finalStatus !== 200) row.error ||= `destino final responde ${row.finalStatus}`;

    if (row.finalStatus === 200) {
      const html = await (await fetch(current)).text();
      row.canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
      row.robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "";
      row.title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
      row.legacyHits = scanLegacySurfaces(html, LEGACY_WA);
      if (/noindex/i.test(row.robots)) row.error ||= "destino com noindex";
      if (rule && row.canonical && row.canonical.replace(/\/$/, "") !== rule.to.replace(/\/$/, ""))
        row.error ||= `canonical ${row.canonical} ≠ ${rule.to}`;
      if (row.legacyHits.length)
        row.error ||= `número legado no destino (${row.legacyHits.map((h) => h.surface).join(", ")})`;
    }
  } catch (err) {
    row.error = `erro de rede: ${err.message}`;
  }
  if (row.error && row.state !== "pendente") row.state = "falha";
  rows.push(row);
}

const ok = rows.filter((r) => r.state === "ok");
const pending = rows.filter((r) => r.state === "pendente");
const failures = rows.filter((r) => r.state === "falha");

const summary = {
  generated_at: new Date().toISOString(),
  source_domain: map.source_domain,
  target_domain: map.target_domain,
  official_whatsapp: OFFICIAL_WA,
  legacy_whatsapp: LEGACY_WA,
  critical_total: rows.length,
  success: ok.length,
  pending: pending.length,
  failures: failures.length,
  results: rows,
};
mkdirSync("reports", { recursive: true });
writeFileSync("reports/critical-redirects.json", JSON.stringify(summary, null, 2) + "\n");

const md = [
  "# URLs críticas — validação em produção",
  "",
  `- Gerado em: ${summary.generated_at}`,
  `- Críticas verificadas: ${rows.length}`,
  `- OK: ${ok.length} · Pendentes: ${pending.length} · Falhas: ${failures.length}`,
  "",
  "| # | Origem | Categoria | Status inicial | Location | Saltos | URL final | Status final | Canonical | Robots | Título | Nº legado |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map(
    (r, i) =>
      `| ${i + 1} | ${r.origin} | ${r.category} | ${r.initialStatus ?? "-"} | ${r.location || "-"} | ${r.hops} | ${
        r.finalUrl || "-"
      } | ${r.finalStatus ?? "-"} | ${r.canonical || "-"} | ${r.robots || "-"} | ${(r.title || "-").slice(0, 60)} | ${
        r.legacyHits.length ? `SIM (${r.legacyHits.map((h) => h.surface).join(", ")})` : "não"
      } |`,
  ),
  "",
  "## Observações",
  "",
  ...rows.filter((r) => r.error).map((r) => `- ${r.state.toUpperCase()} ${r.origin}: ${r.error}`),
  rows.every((r) => !r.error) ? "- nenhuma" : "",
  "",
].join("\n");
writeFileSync("reports/critical-redirects.md", md);

console.log(`críticas: ${rows.length} · ${ok.length} ok · ${pending.length} pendentes · ${failures.length} falhas`);
for (const f of failures) console.log(`  FAIL ${f.origin}: ${f.error}`);
console.log("relatórios: reports/critical-redirects.json · reports/critical-redirects.md");
if (failures.length) process.exit(1);
if (pending.length && ENFORCE) {
  console.log("ENFORCE: existem URLs críticas sem redirect publicado.");
  process.exit(1);
}
