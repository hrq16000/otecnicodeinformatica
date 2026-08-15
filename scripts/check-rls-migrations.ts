/**
 * CI guard: every CREATE TABLE in public.* must be accompanied (in the
 * same migration file) by GRANT statements and ENABLE ROW LEVEL SECURITY.
 * This prevents accidental re-introduction of unprotected tables.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = "supabase/migrations";

function walk(dir: string): string[] {
  if (!safeExists(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const p = join(dir, entry);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function safeExists(p: string): boolean {
  try {
    statSync(p);
    return true;
  } catch {
    return false;
  }
}

const failures: string[] = [];
const files = walk(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));

for (const file of files) {
  const sql = readFileSync(file, "utf8");
  const tableMatches = [...sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?public\.(\w+)/gi)];
  for (const m of tableMatches) {
    const table = m[1];
    const hasRls = new RegExp(`ALTER\\s+TABLE\\s+(?:public\\.)?${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, "i").test(sql);
    const hasGrant = new RegExp(`GRANT\\s+[^;]+ON\\s+(?:TABLE\\s+)?(?:public\\.)?${table}`, "i").test(sql);
    if (!hasRls) failures.push(`${file}: public.${table} missing ENABLE ROW LEVEL SECURITY`);
    if (!hasGrant) failures.push(`${file}: public.${table} missing GRANT statement`);
  }
}

if (failures.length > 0) {
  console.error("[security] RLS / GRANT guard failed:");
  for (const f of failures) console.error(" - " + f);
  process.exit(1);
}

console.log(`[security] RLS guard passed for ${files.length} migration file(s) ✔`);
