/**
 * CI guard: fails the build if any required security header disappears
 * from public/_headers. Pair with .github/workflows/security.yml.
 */
import { readFileSync } from "node:fs";

const REQUIRED = [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Content-Security-Policy",
] as const;

const file = readFileSync("public/_headers", "utf8");

const missing = REQUIRED.filter((h) => !new RegExp(`^\\s+${h}:`, "m").test(file));

if (missing.length > 0) {
  console.error(`[security] missing required headers in public/_headers: ${missing.join(", ")}`);
  process.exit(1);
}

// Sanity checks on individual directives.
const csp = file.match(/Content-Security-Policy:\s*(.+)/)?.[1] ?? "";
const cspMust = ["default-src", "frame-ancestors", "object-src 'none'", "base-uri"];
const cspMissing = cspMust.filter((d) => !csp.includes(d));
if (cspMissing.length > 0) {
  console.error(`[security] CSP missing required directives: ${cspMissing.join(", ")}`);
  process.exit(1);
}

const hsts = file.match(/Strict-Transport-Security:\s*(.+)/)?.[1] ?? "";
if (!/max-age=\d{7,}/.test(hsts)) {
  console.error("[security] HSTS max-age must be at least 1 year (>= 1,000,000 seconds).");
  process.exit(1);
}

console.log("[security] all required headers present ✔");
