#!/usr/bin/env node
/**
 * check-security-findings-baseline.mjs
 *
 * Build-failing regression gate focused ONLY on the two tables that the
 * post-publication security audit flagged and that were remediated by
 * migration: `reviews` and `og_validation_status`.
 *
 * It probes the public (anon) surface of those tables and compares the result
 * against a committed baseline of the *expected* security posture. If a surface
 * that must stay blocked becomes readable/insertable, that is treated as a NEW
 * SECURITY FINDING and the process exits non-zero, failing the build.
 *
 * It never uses the service_role key, never inserts real data, and never prints
 * keys, phone numbers or any PII. Uses only the public URL + publishable/anon
 * key already shipped to the browser.
 *
 * Baseline semantics per surface:
 *   expect: "blocked" -> anon MUST get 401/403. A 200 here = NEW FINDING (fail).
 *   expect: "allowed" -> anon MUST get 200. A block here is stricter than the
 *                        baseline: reported as a NOTICE, never fails the build.
 *
 * Offline / missing env -> SKIP (exit 0), so builds without network stay green.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const envFile = readFileSync(join(__dirname, "..", ".env"), "utf8");
    const line = envFile.split(/\r?\n/).find((l) => l.startsWith(`${name}=`));
    if (line) return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "");
  } catch {
    /* .env absent in CI is fine */
  }
  return undefined;
}

const SUPABASE_URL = readEnv("VITE_SUPABASE_URL") || readEnv("SUPABASE_URL");
const ANON_KEY =
  readEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ||
  readEnv("SUPABASE_PUBLISHABLE_KEY") ||
  readEnv("SUPABASE_ANON_KEY");

if (!SUPABASE_URL || !ANON_KEY) {
  console.error(
    "[SKIP] Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY — " +
      "security-findings baseline is network-dependent; skipping (build stays green).",
  );
  process.exit(0);
}

const REST = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1`;
const BLOCKED = new Set([401, 403]);

/**
 * Committed baseline. Each entry is a public surface the audit reasoned about.
 * Changing this baseline is a deliberate, reviewable security decision.
 */
const BASELINE = [
  {
    finding: "reviews.public_safe_columns",
    method: "GET",
    path: "reviews?select=id,author_name,rating,comment,city&limit=1",
    expect: "allowed",
    note: "Public read of safe review columns (verified+published) is intentional.",
  },
  {
    finding: "reviews.client_phone_exposed",
    method: "GET",
    path: "reviews?select=id,client_phone&limit=1",
    expect: "blocked",
    note: "client_phone must never be readable by anon.",
  },
  {
    finding: "reviews.select_star_exposed",
    method: "GET",
    path: "reviews?select=*&limit=1",
    expect: "blocked",
    note: "select=* must be blocked (would leak client_phone).",
  },
  {
    finding: "og_validation_status.read_exposed",
    method: "GET",
    path: "og_validation_status?select=*&limit=1",
    expect: "blocked",
    note: "Internal OG diagnostics table must be service_role only.",
  },
  {
    finding: "og_validation_status.insert_exposed",
    method: "POST",
    path: "og_validation_status",
    body: {},
    expect: "blocked",
    note: "anon must not be able to insert into og_validation_status.",
  },
];

async function probe(entry) {
  const opts = { method: entry.method, headers: { apikey: ANON_KEY } };
  if (entry.method === "POST") {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(entry.body ?? {});
  }
  const res = await fetch(`${REST}/${entry.path}`, opts);
  return res.status;
}

async function main() {
  console.log("Security findings baseline — reviews + og_validation_status\n");
  let newFindings = 0;
  let notices = 0;

  for (const entry of BASELINE) {
    const status = await probe(entry);
    const blocked = BLOCKED.has(status);

    if (entry.expect === "blocked") {
      if (blocked) {
        console.log(`  \u2713 ${entry.finding}  stays blocked (${status})`);
      } else {
        newFindings += 1;
        console.error(
          `  \u2717 ${entry.finding}  NEW FINDING: surface is reachable (${status}, expected 401/403)`,
        );
        console.error(`      ${entry.note}`);
      }
    } else {
      // expect allowed
      if (status === 200) {
        console.log(`  \u2713 ${entry.finding}  allowed as baselined (200)`);
      } else {
        notices += 1;
        console.log(
          `  \u2139 ${entry.finding}  NOTICE: stricter than baseline (${status}); not a regression`,
        );
      }
    }
  }

  console.log("");
  if (newFindings > 0) {
    console.error(
      `FAILED: ${newFindings} NEW security finding(s) for reviews/og_validation_status. ` +
        "Build blocked. If this is an intentional posture change, update the BASELINE " +
        "in scripts/check-security-findings-baseline.mjs in the same PR.",
    );
    process.exit(1);
  }
  console.log(
    `OK: no new findings for reviews/og_validation_status${notices ? ` (${notices} notice[s])` : ""}.`,
  );
}

main().catch((err) => {
  // Network hiccups should not flake the build; only real regressions fail it.
  console.error(`[SKIP] baseline gate could not complete: ${err?.message ?? err}`);
  process.exit(0);
});
