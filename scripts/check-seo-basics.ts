/**
 * Build-time SEO sanity check.
 *
 * Modo 1 (arquivo único):  bun scripts/check-seo-basics.ts [index.html]
 *   - <title> presente, não-vazio e diferente do default "Lovable App"
 *   - <meta name="description"> presente e não-default
 *   - exatamente UM <h1> no shell renderizado
 *
 * Modo 2 (rotas curadas):  bun scripts/check-seo-basics.ts --curated [dist]
 *   Percorre a lista deduplicada de rotas curadas dentro do dist/ e falha se:
 *   - a rota não tiver exatamente um H1
 *   - uma rota não-home usar o H1 ou o parágrafo fallback da homepage
 *   - não houver canonical self-referente
 *   - não houver meta robots explícito
 *   - não houver JSON-LD estático, ou ele for inválido
 *   - breadcrumbs apontarem para URL fora do conjunto conhecido
 *   - não houver links internos contextuais
 *   - duas rotas tiverem o mesmo par H1 + introdução
 *   - existir aggregateRating
 *   - aparecer o ano institucional 1999
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
// @ts-expect-error - módulo .mjs sem tipos (fonte curada compartilhada com o prerender)
import { CURATED_ROUTES } from "./curated-routes-meta.mjs";

const SITE = "https://tecnico.curitiba.br";
const HOME_H1 = "Técnico de Informática em Curitiba";
const HOME_INTRO_TOKEN = "Conserto de PC e notebook";

interface CuratedRoute { path: string; title: string; description: string }

function checkSingleFile(target: string) {
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
}

function textOf(fragment: string) {
  return fragment.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function checkCurated(distDir: string) {
  const routes = CURATED_ROUTES as CuratedRoute[];
  const known = new Set(routes.map((r) => r.path));
  const seen = new Map<string, string>();
  const failures: string[] = [];
  const fail = (p: string, msg: string) => failures.push(`${p} → ${msg}`);

  for (const route of routes) {
    const file = route.path === "/"
      ? join(distDir, "index.html")
      : join(distDir, ...route.path.split("/").filter(Boolean), "index.html");
    if (!existsSync(file)) { fail(route.path, `HTML não gerado (${file})`); continue; }
    const html = readFileSync(file, "utf8");

    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => textOf(m[1]));
    if (h1s.length !== 1) { fail(route.path, `esperado exatamente 1 <h1>, encontrou ${h1s.length}`); continue; }
    const h1 = h1s[0];

    const ps = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => textOf(m[1])).filter(Boolean);
    const intro = ps[0] ?? "";

    if (route.path !== "/") {
      if (h1 === HOME_H1) fail(route.path, `usa o H1 fallback da homepage ("${HOME_H1}")`);
      if (intro.includes(HOME_INTRO_TOKEN)) fail(route.path, "usa o parágrafo fallback da homepage");
    }
    if (!intro) fail(route.path, "sem primeiro parágrafo estático");

    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
    const expected = `${SITE}${route.path === "/" ? "/" : route.path}`;
    if (canonical !== expected) fail(route.path, `canonical "${canonical}" != self "${expected}"`);

    const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1];
    if (!robots) fail(route.path, "sem meta robots explícito");

    const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
      .map((m) => m[1].trim())
      .filter(Boolean);
    if (!blocks.length) fail(route.path, "sem JSON-LD estático");
    let hasBreadcrumb = route.path === "/";
    for (const b of blocks) {
      let parsed: unknown;
      try { parsed = JSON.parse(b); } catch (e) { fail(route.path, `JSON-LD inválido: ${(e as Error).message}`); continue; }
      const flat = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of flat as Array<Record<string, unknown>>) {
        if (!node["@type"]) fail(route.path, "JSON-LD sem @type");
        if (JSON.stringify(node).includes("aggregateRating")) fail(route.path, "aggregateRating proibido");
        if (node["@type"] === "BreadcrumbList") {
          hasBreadcrumb = true;
          for (const item of (node.itemListElement as Array<Record<string, unknown>>) ?? []) {
            const url = String(item.item ?? "");
            const p = url.replace(SITE, "") || "/";
            if (!known.has(p === "" ? "/" : p)) fail(route.path, `breadcrumb aponta para URL inexistente: ${url}`);
          }
        }
      }
    }
    if (!hasBreadcrumb) fail(route.path, "sem BreadcrumbList estático");

    const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/i)?.[1] ?? "";
    const internal = [...noscript.matchAll(/href=["'](\/[^"'#]*)["']/g)].map((m) => m[1]).filter((h) => h !== "/logo.webp");
    if (new Set(internal).size < 3) fail(route.path, `links internos contextuais insuficientes (${new Set(internal).size})`);

    if (/\b1999\b/.test(html)) fail(route.path, "ano institucional 1999 presente no build final");

    const key = `${h1}||${intro}`;
    if (seen.has(key)) fail(route.path, `H1 + introdução idênticos a ${seen.get(key)}`);
    else seen.set(key, route.path);
  }

  if (failures.length) {
    console.error(`\n❌ [seo-check curated] ${failures.length} falha(s) em ${routes.length} rotas curadas:`);
    for (const f of failures) console.error(`   • ${f}`);
    console.error("");
    process.exit(1);
  }
  console.log(`✅ [seo-check curated] ${routes.length} rotas curadas OK — H1 único, canonical self, robots, JSON-LD estático e links internos.`);
}

const args = process.argv.slice(2);
if (args[0] === "--curated") checkCurated(args[1] ?? "dist");
else checkSingleFile(args[0] ?? "index.html");
