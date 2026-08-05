#!/usr/bin/env node
/**
 * Generates reports/security-scan.html — a human-readable summary of the
 * security posture: which security finding internal_ids were found vs not found,
 * their status, plus the static always-true RLS scan and the RLS/GRANT guard.
 *
 * Scan-result inputs (from the Lovable security scanners) are committed to
 * reports/security-scan-input.json. When that file is absent, the report is
 * generated from the static checks alone and marks scanner data as unavailable.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const OUT_DIR = "reports";
const OUT = `${OUT_DIR}/security-scan.html`;
const INPUT = `${OUT_DIR}/security-scan-input.json`;

/** internal_ids we explicitly track, whether or not the scanner reports them. */
const TRACKED = [
  { id: "SUPA_rls_policy_always_true", desc: "RLS policy with an always-true (USING/WITH CHECK true) predicate" },
  { id: "SUPA_rls_disabled_in_public", desc: "Public-schema table without RLS enabled" },
  { id: "SUPA_rls_enabled_no_policy", desc: "RLS enabled but no policy defined (table locked)" },
  { id: "SUPA_security_definer_view", desc: "View owned by a privileged role bypassing RLS" },
  { id: "SUPA_function_search_path_mutable", desc: "Function without a fixed search_path" },
  { id: "SUPA_exposed_sensitive_data", desc: "Sensitive column readable by anon" },
];

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function runStatic() {
  try {
    const out = execFileSync("node", ["scripts/check-rls-always-true.mjs", "--json"], { encoding: "utf8" });
    const line = out.split("\n").find((l) => l.startsWith("__JSON__"));
    return { ok: true, data: line ? JSON.parse(line.slice(8)) : null, log: out };
  } catch (err) {
    const out = (err.stdout || "") + (err.stderr || "");
    const line = out.split("\n").find((l) => l.startsWith("__JSON__"));
    return { ok: false, data: line ? JSON.parse(line.slice(8)) : null, log: out };
  }
}

const scanners = existsSync(INPUT) ? JSON.parse(readFileSync(INPUT, "utf8")) : null;
const staticScan = runStatic();

const reported = new Map();
if (scanners) {
  for (const [scannerName, payload] of Object.entries(scanners)) {
    for (const f of payload?.findings ?? []) {
      reported.set(f.internal_id ?? f.id ?? "unknown", { ...f, scannerName });
    }
  }
}

const rows = TRACKED.map((t) => {
  const hit = reported.get(t.id);
  let status = hit ? "FOUND" : "NOT FOUND";
  let detail = hit ? esc(hit.title ?? hit.description ?? "") : "No finding reported by any scanner.";
  if (t.id === "SUPA_rls_policy_always_true") {
    detail += staticScan.ok
      ? ` Static migration scan: clean (${staticScan.data?.allowed?.length ?? 0} allowlisted exception[s]).`
      : ` <strong>Static migration scan FAILED — ${staticScan.data?.violations?.length ?? "?"} violation(s).</strong>`;
    if (!staticScan.ok) status = "FOUND (static)";
  }
  return { ...t, status, detail };
});

const badge = (s) =>
  s.startsWith("NOT FOUND")
    ? '<span class="b ok">NOT FOUND</span>'
    : `<span class="b bad">${esc(s)}</span>`;

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>Relatório de segurança — tecnico.curitiba.br</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
:root{color-scheme:dark}
body{margin:0;padding:32px;font:15px/1.6 ui-sans-serif,system-ui,sans-serif;background:#0e1418;color:#e6edf1}
h1{font-size:26px;margin:0 0 4px}h2{font-size:18px;margin:32px 0 10px;color:#22b8cf}
.meta{color:#8fa3ad;font-size:13px;margin-bottom:24px}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{border:1px solid #223038;padding:9px 11px;text-align:left;vertical-align:top}
th{background:#16212a;color:#9fd8e4;font-weight:600}
code{background:#16212a;padding:1px 5px;border-radius:4px;font-size:13px}
.b{padding:2px 9px;border-radius:99px;font-size:12px;font-weight:700;white-space:nowrap}
.ok{background:#0d3b2e;color:#4ade80}.bad{background:#4a1420;color:#ff8792}
pre{background:#0a1013;border:1px solid #223038;border-radius:8px;padding:14px;overflow:auto;font-size:12.5px}
</style></head><body>
<h1>Relatório de segurança</h1>
<div class="meta">Gerado em ${new Date().toISOString()} &middot; projeto tecnico.curitiba.br</div>

<h2>Findings monitorados (internal_id)</h2>
<table><thead><tr><th>internal_id</th><th>Status</th><th>Descrição / detalhe</th></tr></thead><tbody>
${rows
  .map(
    (r) =>
      `<tr><td><code>${esc(r.id)}</code></td><td>${badge(r.status)}</td><td>${esc(r.desc)}. ${r.detail}</td></tr>`,
  )
  .join("\n")}
</tbody></table>

<h2>Scanners</h2>
${
  scanners
    ? `<table><thead><tr><th>Scanner</th><th>Findings</th><th>Timestamp</th></tr></thead><tbody>${Object.entries(
        scanners,
      )
        .map(
          ([k, v]) =>
            `<tr><td>${esc(k)}</td><td>${(v?.findings ?? []).length}</td><td>${esc(v?.timestamp ?? "-")}</td></tr>`,
        )
        .join("")}</tbody></table>`
    : `<p class="meta">Nenhum <code>${INPUT}</code> presente — relatório gerado apenas com as verificações estáticas.</p>`
}

<h2>Varredura estática de políticas RLS always-true</h2>
<pre>${esc(staticScan.log.replace(/__JSON__.*/s, "").trim())}</pre>
</body></html>`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, html);
console.log(`[security] report written to ${OUT}`);

// Resumo legível por máquina — consumido pelo gate de CI e pela notificação Slack.
const found = rows.filter((r) => r.status !== "NOT FOUND");
const summary = {
  generatedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA ?? null,
  ref: process.env.GITHUB_REF ?? null,
  staticScanOk: staticScan.ok,
  found: found.map((f) => ({ internal_id: f.id, status: f.status, description: f.desc })),
  notFound: rows.filter((r) => r.status === "NOT FOUND").map((r) => r.id),
};
writeFileSync(`${OUT_DIR}/security-scan-summary.json`, JSON.stringify(summary, null, 2));
console.log(`[security] summary written to ${OUT_DIR}/security-scan-summary.json`);

if (found.length > 0) {
  console.error(
    `[security] FAILED: ${found.length} monitored internal_id(s) FOUND: ${found
      .map((f) => f.id)
      .join(", ")}`,
  );
  process.exit(1);
}
if (!staticScan.ok) process.exit(1);
console.log("[security] OK — nenhum internal_id monitorado com status FOUND ✔");

