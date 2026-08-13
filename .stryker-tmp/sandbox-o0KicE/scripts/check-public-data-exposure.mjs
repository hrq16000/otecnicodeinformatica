#!/usr/bin/env node
// @ts-nocheck
/**
 * check-public-data-exposure.mjs
 *
 * Regression gate that proves the two audited security invariants still hold in
 * production/preview, using ONLY the public Supabase URL + publishable/anon key
 * (the same pair the frontend already ships). It never uses the service_role
 * key, never inserts real data, and never prints keys, phone numbers or PII.
 *
 * Invariants enforced (see @security-memory):
 *
 * REVIEWS (public.reviews)
 *   R1  anon selecting ONLY the safe public columns          -> 200
 *   R2  anon selecting id,client_phone                       -> 401/403 (blocked)
 *   R3  anon selecting *                                     -> 401/403 (blocked)
 *
 * OG_VALIDATION_STATUS (public.og_validation_status)
 *   O1  anon selecting *                                     -> 401/403 (blocked)
 *   O2  anon attempting an (invalid) INSERT                  -> 401/403 (blocked, no row persisted)
 *
 * A HTTP 200 with an empty array is treated as PASS only for R1 (safe read).
 * For the blocked cases an empty 200 array is a CONTRACT VIOLATION, because it
 * would mean the column/table is readable by anon.
 *
 * Exit code is non-zero if any private surface becomes reachable.
 *
 * NOTE: the "common authenticated (non-admin) user gets zero rows / no
 * client_phone" invariant is NOT covered here because it requires a real test
 * login. That check remains manual — see the bottom of this file.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Read a var from process.env, falling back to a parsed .env at repo root. */
function readEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const envFile = readFileSync(join(__dirname, "..", ".env"), "utf8");
    const line = envFile
      .split(/\r?\n/)
      .find((l) => l.startsWith(`${name}=`));
    if (line) return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "");
  } catch {
    /* .env may be absent in CI — that's fine, rely on process.env */
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
    "[SKIP] Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "This gate is network-dependent; run it where the public env is available.",
  );
  // Exit 0 so build environments without network/env do not become unstable.
  process.exit(0);
}

const REST = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1`;

const BLOCKED = new Set([401, 403]);
let failures = 0;

function pass(id, msg) {
  console.log(`  \u2713 ${id}  ${msg}`);
}
function fail(id, msg) {
  failures += 1;
  console.error(`  \u2717 ${id}  CONTRACT VIOLATED: ${msg}`);
}

async function anonGet(path) {
  const res = await fetch(`${REST}/${path}`, {
    method: "GET",
    headers: { apikey: ANON_KEY },
  });
  return res.status;
}

async function anonInsert(path, body) {
  const res = await fetch(`${REST}/${path}`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.status;
}

async function main() {
  console.log("Public data exposure gate (anon key only)\n");

  // R1 — safe public columns readable
  {
    const status = await anonGet(
      "reviews?select=id,author_name,author_photo_url,rating,comment,service_slug,city,neighborhood,review_date&limit=1",
    );
    if (status === 200) pass("R1", "anon can read safe public review columns (200)");
    else fail("R1", `anon safe-column read returned ${status}, expected 200`);
  }

  // R2 — client_phone blocked
  {
    const status = await anonGet("reviews?select=id,client_phone&limit=1");
    if (BLOCKED.has(status))
      pass("R2", `anon cannot read client_phone (${status})`);
    else fail("R2", `anon client_phone read returned ${status}, expected 401/403`);
  }

  // R3 — select=* blocked
  {
    const status = await anonGet("reviews?select=*&limit=1");
    if (BLOCKED.has(status))
      pass("R3", `anon cannot select=* on reviews (${status})`);
    else fail("R3", `anon reviews select=* returned ${status}, expected 401/403`);
  }

  // O1 — og_validation_status select=* blocked
  {
    const status = await anonGet("og_validation_status?select=*&limit=1");
    if (BLOCKED.has(status))
      pass("O1", `anon cannot read og_validation_status (${status})`);
    else
      fail(
        "O1",
        `anon og_validation_status select=* returned ${status}, expected 401/403`,
      );
  }

  // O2 — og_validation_status INSERT blocked (empty/invalid payload, no persistence)
  {
    const status = await anonInsert("og_validation_status", {});
    if (BLOCKED.has(status))
      pass("O2", `anon cannot INSERT into og_validation_status (${status})`);
    else
      fail(
        "O2",
        `anon og_validation_status INSERT returned ${status}, expected 401/403`,
      );
  }

  console.log("");
  if (failures > 0) {
    console.error(`FAILED: ${failures} public-data-exposure invariant(s) violated.`);
    process.exit(1);
  }
  console.log("OK: all public-data-exposure invariants hold.");
}

main().catch((err) => {
  console.error("Gate crashed:", err?.message ?? err);
  process.exit(1);
});

/*
 * MANUAL CHECK (not automated — requires a real non-admin test login):
 *   1. Sign in through the app as a normal (non-admin) authenticated user.
 *   2. From the browser console, run:
 *        await supabase.from("reviews").select("*")
 *   3. Expected: an empty array (0 rows) and NO client_phone values, because
 *      the only SELECT policies for `authenticated` require has_role('admin').
 *   Do NOT hardcode credentials in this repo to automate it.
 */
