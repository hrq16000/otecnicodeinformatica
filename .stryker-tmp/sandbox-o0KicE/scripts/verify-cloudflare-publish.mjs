// @ts-nocheck
// RODADA 4C — Verificação PÓS-PUBLICAÇÃO no Cloudflare.
//
// Confirma dois fatos independentes:
//   A) as 612 regras da matriz estão ATIVAS no ruleset da zona (API Cloudflare);
//   B) as 41 URLs críticas respondem 301 com o Location exato da matriz (rede).
//
// Uso:
//   node scripts/verify-cloudflare-publish.mjs            # relatório
//   node scripts/verify-cloudflare-publish.mjs --enforce  # falha em pendência
//   node scripts/verify-cloudflare-publish.mjs --skip-api # só a parte B
//
// Saídas: reports/cloudflare-publish-verification.json e .md
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { loadMap, criticalPaths, categoryOf } from "./lib/migration-critical.mjs";

const args = process.argv.slice(2);
const ENFORCE = args.includes("--enforce");
const SKIP_API = args.includes("--skip-api");
const PHASE = "http_request_dynamic_redirect";
const RULESET_FILE = "redirects/export/cloudflare-ruleset.json";

const map = loadMap();
const byFrom = new Map(map.rules.map((r) => [r.from, r]));
const source = map.source_domain.replace(/\/$/, "");

// ---------- A) ruleset ativo ----------
const rulesetCheck = { checked: false, expected: map.rules.length, active: 0, missing: [], extra: [], error: "" };
if (!SKIP_API) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zone = process.env.CLOUDFLARE_ZONE_ID;
  if (!token || !zone) {
    rulesetCheck.error = "CLOUDFLARE_API_TOKEN/CLOUDFLARE_ZONE_ID ausentes — verificação de ruleset não executada.";
  } else {
    try {
      const api = async (p) => {
        const res = await fetch(`https://api.cloudflare.com/client/v4${p}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(`Cloudflare ${res.status}`);
        return json.result;
      };
      const found = (await api(`/zones/${zone}/rulesets`)).find((r) => r.phase === PHASE);
      if (!found) throw new Error(`nenhum ruleset na fase ${PHASE}`);
      const full = await api(`/zones/${zone}/rulesets/${found.id}`);
      const activeTargets = new Map();
      for (const rule of full.rules ?? []) {
        const expr = rule.expression ?? "";
        const m = expr.match(/http\.request\.uri\.path\s+eq\s+"([^"]+)"/);
        if (m) activeTargets.set(m[1], rule.action_parameters?.from_value?.target_url?.value ?? "");
      }
      rulesetCheck.checked = true;
      rulesetCheck.active = activeTargets.size;
      for (const [from, rule] of byFrom) {
        const to = activeTargets.get(from);
        if (!to) rulesetCheck.missing.push(from);
        else if (to !== rule.to) rulesetCheck.missing.push(`${from} (destino divergente: ${to})`);
      }
      for (const from of activeTargets.keys()) if (!byFrom.has(from)) rulesetCheck.extra.push(from);
    } catch (e) {
      rulesetCheck.error = e.message;
    }
  }
} else if (existsSync(RULESET_FILE)) {
  const local = JSON.parse(readFileSync(RULESET_FILE, "utf8"));
  rulesetCheck.active = local.rules?.length ?? 0;
  rulesetCheck.error = "modo --skip-api: contagem lida do export local, não do edge.";
}

// ---------- B) 41 URLs críticas ----------
const paths = criticalPaths(map);
const rows = [];
for (const from of paths) {
  const rule = byFrom.get(from);
  const origin = `${source}${from}`;
  const row = {
    origin,
    category: categoryOf(from),
    expectedLocation: rule?.to ?? null,
    status: null,
    location: "",
    match: false,
    state: "pendente",
    error: "",
  };
  try {
    const res = await fetch(origin, { redirect: "manual" });
    row.status = res.status;
    row.location = res.headers.get("location") ?? "";
    if (res.status === 301 && row.location === row.expectedLocation) {
      row.match = true;
      row.state = "ok";
    } else if (res.status === 200) {
      row.error = "origem ainda responde 200 (redirect não ativo)";
    } else if ([301, 302, 307, 308].includes(res.status)) {
      row.error = `Location divergente (esperado ${row.expectedLocation})`;
      row.state = "divergente";
    } else {
      row.error = `status inesperado ${res.status}`;
      row.state = "erro";
    }
  } catch (e) {
    row.state = "erro";
    row.error = e.message;
  }
  rows.push(row);
}

const ok = rows.filter((r) => r.state === "ok").length;
const summary = {
  generatedAt: new Date().toISOString(),
  ruleset: rulesetCheck,
  critical: { total: rows.length, ok, pendentes: rows.length - ok },
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/cloudflare-publish-verification.json", JSON.stringify({ summary, rows }, null, 2) + "\n");

const md = [
  "# Verificação pós-publicação — Cloudflare",
  "",
  `Gerado em ${summary.generatedAt}`,
  "",
  "## A) Ruleset ativo",
  "",
  rulesetCheck.checked
    ? `- Regras esperadas: **${rulesetCheck.expected}** · ativas: **${rulesetCheck.active}**\n` +
      `- Faltando: **${rulesetCheck.missing.length}** · extras: **${rulesetCheck.extra.length}**` +
      (rulesetCheck.missing.length ? `\n\n<details><summary>Faltando</summary>\n\n${rulesetCheck.missing.slice(0, 100).map((m) => `- ${m}`).join("\n")}\n\n</details>` : "")
    : `- Não verificado: ${rulesetCheck.error}`,
  "",
  "## B) 41 URLs críticas",
  "",
  `- OK (301 + Location exato): **${ok}/${rows.length}**`,
  "",
  "| Origem | Categoria | Status | Location | Esperado | Estado |",
  "| --- | --- | --- | --- | --- | --- |",
  ...rows.map(
    (r) => `| ${r.origin} | ${r.category} | ${r.status ?? "—"} | ${r.location || "—"} | ${r.expectedLocation ?? "—"} | ${r.state}${r.error ? ` — ${r.error}` : ""} |`,
  ),
  "",
].join("\n");
writeFileSync("reports/cloudflare-publish-verification.md", md);

console.log(
  `verify:cf — ruleset ${rulesetCheck.checked ? `${rulesetCheck.active}/${rulesetCheck.expected} ativas` : "não verificado"} · ` +
    `críticas ${ok}/${rows.length} ok.`,
);
console.log("relatórios: reports/cloudflare-publish-verification.{json,md}");

if (ENFORCE && (ok !== rows.length || (rulesetCheck.checked && rulesetCheck.missing.length > 0))) {
  console.error("BLOQUEADO: publicação não está completa no edge.");
  process.exit(1);
}
