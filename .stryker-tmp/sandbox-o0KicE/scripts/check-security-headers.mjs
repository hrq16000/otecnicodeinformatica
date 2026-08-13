#!/usr/bin/env node
// @ts-nocheck
import { BASE_URL, SITE_DOMAIN } from "./lib/site-env.mjs";
/**
 * Runtime security-headers gate (Prompt 12).
 *
 * Probes a live URL (production or preview) and reports on the security
 * headers actually served. It is intentionally NON-DESTRUCTIVE:
 *   - no writes, no DB access, no service role, prints no secrets;
 *   - meant to run manually post-deploy, not to block the build on flaky prod.
 *
 * Usage:
 *   node scripts/check-security-headers.mjs [url]
 *   SECURITY_HEADERS_URL=https://o domínio configurado node scripts/check-security-headers.mjs
 *
 * Exit codes:
 *   0  = platform baseline present; no dangerous CSP condition detected.
 *   1  = a genuinely dangerous condition (enforced CSP this round, wildcard,
 *        http: origin, or unsafe-eval), OR a mandatory platform header missing.
 *
 * Headers that depend on `public/_headers` (X-Frame-Options, Permissions-Policy,
 * Content-Security-Policy-Report-Only) are reported as WARN when absent, because
 * Lovable's managed hosting does not currently emit `_headers`. The static file
 * itself is validated by scripts/check-security-headers.ts.
 */

const DEFAULT_URL =
  process.env.SECURITY_HEADERS_URL || process.argv[2] || `${BASE_URL}/`;

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const ok = (m) => console.log(`${GREEN}PASS${RESET}  ${m}`);
const warn = (m) => console.log(`${YELLOW}WARN${RESET}  ${m}`);
const fail = (m) => console.log(`${RED}FAIL${RESET}  ${m}`);

async function main() {
  console.log(`\n[security-headers] probing ${DEFAULT_URL}\n`);

  let res;
  try {
    res = await fetch(DEFAULT_URL, { method: "GET", redirect: "follow" });
  } catch (err) {
    // Network flakiness must not break the build — this is a manual gate.
    warn(`could not reach ${DEFAULT_URL}: ${err?.message ?? err}`);
    console.log("\n[security-headers] skipped (target unreachable) — non-blocking.\n");
    process.exit(0);
  }

  const h = (name) => res.headers.get(name);
  let hardFail = false;

  // --- 1. Platform baseline (must always be present) ---
  const baseline = [
    ["strict-transport-security", /max-age=\d{6,}/, "HSTS with a long max-age"],
    ["x-content-type-options", /nosniff/i, "nosniff"],
    ["referrer-policy", /.+/, "a Referrer-Policy"],
  ];
  for (const [name, re, label] of baseline) {
    const v = h(name);
    if (v && re.test(v)) ok(`${name}: ${v}`);
    else {
      fail(`missing/invalid ${label} (${name}: ${v ?? "absent"})`);
      hardFail = true;
    }
  }

  // --- 2. `_headers`-dependent headers (WARN if absent on Lovable hosting) ---
  const xfo = h("x-frame-options");
  if (xfo) ok(`x-frame-options: ${xfo}`);
  else warn("x-frame-options absent (Lovable hosting does not serve _headers yet)");

  const pp = h("permissions-policy");
  if (pp) ok(`permissions-policy: ${pp}`);
  else warn("permissions-policy absent (Lovable hosting does not serve _headers yet)");

  const cspRO = h("content-security-policy-report-only");
  const cspEnforced = h("content-security-policy");

  if (cspEnforced) {
    fail(`enforcing Content-Security-Policy present — this round must be Report-Only`);
    hardFail = true;
  } else {
    ok("no enforcing Content-Security-Policy (correct for this round)");
  }

  if (cspRO) {
    ok("content-security-policy-report-only present");
    for (const [re, label] of [
      [/(^|\s)\*(\s|;|$)/, "bare wildcard '*'"],
      [/https?:\/\/\*/, "wildcard host"],
      [/(^|\s)http:\/\//, "insecure http: origin"],
      [/'unsafe-eval'/, "'unsafe-eval'"],
    ]) {
      if (re.test(cspRO)) {
        fail(`CSP-Report-Only contains forbidden token: ${label}`);
        hardFail = true;
      }
    }
  } else {
    warn("content-security-policy-report-only absent (Lovable hosting does not serve _headers yet)");
  }

  console.log("");
  if (hardFail) {
    console.log("[security-headers] FAILED — dangerous condition or missing baseline header.\n");
    process.exit(1);
  }
  console.log("[security-headers] OK — baseline present, no dangerous CSP condition.\n");
  process.exit(0);
}

main();
