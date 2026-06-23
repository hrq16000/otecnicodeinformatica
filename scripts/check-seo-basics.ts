/**
 * Build-time SEO sanity check.
 * Garantia mínima antes de qualquer deploy:
 *   - <title> presente, não-vazio e diferente do default "Lovable App"
 *   - <meta name="description"> presente, não-vazio e diferente do default
 *   - exatamente UM <h1> no shell renderizado (index.html servido aos crawlers)
 *
 * Roda no `prebuild` (sobre o index.html fonte) e também pode ser chamado
 * pelo CI sobre `dist/index.html` após o build.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const target = process.argv[2] ?? "index.html";
const path = resolve(process.cwd(), target);

if (!existsSync(path)) {
  console.error(`[seo-check] arquivo não encontrado: ${path}`);
  process.exit(1);
}

const html = readFileSync(path, "utf8");
const errors: string[] = [];

const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
const title = titleMatch?.[1]?.trim() ?? "";
if (!title) errors.push("missing <title>");
else if (/^lovable app$/i.test(title)) errors.push(`default <title>: "${title}"`);
else if (title.length > 70) errors.push(`<title> longo (${title.length} chars, ideal ≤ 60)`);

const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
const desc = descMatch?.[1]?.trim() ?? "";
if (!desc) errors.push("missing <meta name=description>");
else if (/^lovable generated project$/i.test(desc)) errors.push(`default meta description: "${desc}"`);
else if (desc.length > 170) errors.push(`meta description longa (${desc.length} chars, ideal ≤ 160)`);

const h1Count = (html.match(/<h1\b/gi) ?? []).length;
if (h1Count === 0) errors.push("nenhum <h1> no shell renderizado");
else if (h1Count > 1) errors.push(`múltiplos <h1> (${h1Count}); deve haver exatamente 1`);

if (errors.length > 0) {
  console.error(`\n❌ [seo-check] ${target} falhou:`);
  for (const e of errors) console.error(`   • ${e}`);
  console.error("");
  process.exit(1);
}

console.log(`✅ [seo-check] ${target} OK — title: "${title.slice(0, 60)}…" | desc: ${desc.length}c | h1: ${h1Count}`);
