#!/usr/bin/env node
/**
 * CI guard for the security finding `SUPA_rls_policy_always_true`.
 *
 * Statically scans every migration in supabase/migrations for RLS policies whose
 * USING / WITH CHECK expression is literally `true`. Such policies make the table
 * fully readable/writable by whichever role the policy targets.
 *
 * Exceptions must be declared in ALLOWLIST with an explicit justification —
 * adding one is a deliberate, reviewable security decision.
 *
 * Exit 1 on any non-allowlisted always-true policy, so CI blocks the merge.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = "supabase/migrations";
const FINDING_ID = "SUPA_rls_policy_always_true";

/** table -> { commands: [...], reason } */
const ALLOWLIST = {
  click_events: {
    commands: ["INSERT"],
    reason:
      "Write-only anonymous analytics sink. anon has INSERT only (no SELECT grant); " +
      "reads are admin-only via has_role(). No PII is stored.",
  },
};

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const p = join(dir, entry);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const POLICY_RE =
  /CREATE\s+POLICY\s+(?:"([^"]+)"|'([^']+)'|([\w.]+))([\s\S]*?);/gi;

function analyze(sql, file) {
  const hits = [];
  for (const m of sql.matchAll(POLICY_RE)) {
    const name = m[1] || m[2] || m[3];
    const body = m[4] || "";
    const table = (body.match(/\bON\s+(?:public\.)?"?(\w+)"?/i) || [])[1] || "unknown";
    const cmd = (body.match(/\bFOR\s+(ALL|SELECT|INSERT|UPDATE|DELETE)\b/i) || [])[1]?.toUpperCase() || "ALL";
    const using = /\bUSING\s*\(\s*true\s*\)/i.test(body);
    const check = /\bWITH\s+CHECK\s*\(\s*true\s*\)/i.test(body);
    if (!using && !check) continue;
    hits.push({ file, name, table, cmd, clauses: [using && "USING(true)", check && "WITH CHECK(true)"].filter(Boolean) });
  }
  return hits;
}

const files = walk(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
const all = files.flatMap((f) => analyze(readFileSync(f, "utf8"), f));

const allowed = [];
const violations = [];
for (const h of all) {
  const rule = ALLOWLIST[h.table];
  if (rule && rule.commands.includes(h.cmd)) allowed.push({ ...h, reason: rule.reason });
  else violations.push(h);
}

console.log(`[security] ${FINDING_ID} guard — scanned ${files.length} migration file(s)`);
for (const a of allowed) {
  console.log(`  \u2139 allowlisted: ${a.table} ${a.cmd} "${a.name}" — ${a.reason}`);
}

if (violations.length > 0) {
  console.error(`\n[security] FAILED: ${violations.length} always-true RLS policy(ies) detected (${FINDING_ID}):`);
  for (const v of violations) {
    console.error(`  \u2717 ${v.table} ${v.cmd} "${v.name}" ${v.clauses.join(" + ")}  (${v.file})`);
  }
  console.error(
    "\nReplace the literal `true` with a scoped predicate (e.g. auth.uid() = user_id or " +
      "has_role(auth.uid(), 'admin')). If the openness is intentional, add the table to " +
      "ALLOWLIST in scripts/check-rls-always-true.mjs with a justification in the same PR.",
  );
  process.exit(1);
}

console.log(`[security] OK — no unexpected always-true RLS policies \u2714`);

// Machine-readable output for the HTML report generator.
if (process.argv.includes("--json")) {
  console.log("__JSON__" + JSON.stringify({ findingId: FINDING_ID, files: files.length, allowed, violations }));
}
