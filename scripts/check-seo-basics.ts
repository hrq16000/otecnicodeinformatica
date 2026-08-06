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
const LEGACY_FALLBACK_INTRO = "Conserto de PC e notebook, formatação, remoção de vírus e SSD";

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
  // H1 real da home no build atual — nenhuma rota interna pode repeti-lo.
  const homeFile = join(distDir, "index.html");
  const homeH1 = existsSync(homeFile)
    ? textOf(readFileSync(homeFile, "utf8").match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "")
    : "";
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
      if (homeH1 && h1 === homeH1) fail(route.path, `usa o H1 fallback da homepage ("${homeH1}")`);
      if (intro.includes(LEGACY_FALLBACK_INTRO)) fail(route.path, "usa o parágrafo fallback da homepage");
    }
    if (!intro) fail(route.path, "sem primeiro parágrafo estático");

    const canonicalNodes = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)];
    if (canonicalNodes.length !== 1) {
      fail(route.path, `esperado exatamente 1 <link rel="canonical">, encontrou ${canonicalNodes.length}`);
    }
    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
    const expected = `${SITE}${route.path === "/" ? "/" : route.path}`;
    if (canonical !== expected) fail(route.path, `canonical "${canonical}" != self "${expected}"`);

    const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1];
    if (!robots) fail(route.path, "sem meta robots explícito");

    const scripts = [...html.matchAll(
      /<script([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi,
    )].map((m) => ({ attrs: `${m[1]} ${m[2]}`, body: m[3].trim() })).filter((s) => s.body);
    const blocks = scripts.map((s) => s.body);
    if (!blocks.length) fail(route.path, "sem JSON-LD estático");

    // Governança de slots: chave estável única por HTML (data-schema-key).
    const slotCount = new Map<string, number>();
    for (const s of scripts) {
      const slot = s.attrs.match(/data-schema-key=["']([^"']+)["']/)?.[1];
      if (!slot) { fail(route.path, "JSON-LD estático sem data-schema-key (slot)"); continue; }
      slotCount.set(slot, (slotCount.get(slot) ?? 0) + 1);
    }
    for (const [slot, n] of slotCount) if (n > 1) fail(route.path, `slot JSON-LD duplicado: ${slot} (${n}x)`);

    let hasBreadcrumb = route.path === "/";
    const idSeen = new Map<string, number>();
    const ID_REQUIRED = new Set(["BreadcrumbList", "Service", "WebPage", "AboutPage", "ContactPage", "LocalBusiness"]);
    for (const b of blocks) {
      let parsed: unknown;
      try { parsed = JSON.parse(b); } catch (e) { fail(route.path, `JSON-LD inválido: ${(e as Error).message}`); continue; }
      const flat = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of flat as Array<Record<string, unknown>>) {
        if (!node["@type"]) fail(route.path, "JSON-LD sem @type");
        if (JSON.stringify(node).includes("aggregateRating")) fail(route.path, "aggregateRating proibido");
        const types = Array.isArray(node["@type"]) ? (node["@type"] as string[]) : [String(node["@type"])];
        const id = typeof node["@id"] === "string" ? (node["@id"] as string) : "";
        if (id) idSeen.set(id, (idSeen.get(id) ?? 0) + 1);
        if (types.some((t) => ID_REQUIRED.has(t))) {
          if (!id) fail(route.path, `entidade ${types[0]} sem @id estável`);
          else if (!id.startsWith(SITE) || !id.includes("#")) fail(route.path, `@id fora do padrão canônico: ${id}`);
          else if (!/#(organization|website)$/.test(id) && !id.startsWith(`${expected}#`) && !(route.path === "/" && id.startsWith(`${SITE}/#`))) {
            fail(route.path, `@id "${id}" não é coerente com o canonical "${expected}"`);
          }
        }
        if (types.includes("BreadcrumbList")) {
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
    for (const [dupId, n] of idSeen) {
      if (n > 1) fail(route.path, `@id duplicado entre entidades JSON-LD: ${dupId} (${n}x)`);
    }


    // Corpo estático real dentro do #root (promovido do antigo <noscript>).
    const staticShell =
      html.match(/<div data-static-shell="1">([\s\S]*?)<\/div>\s*<\/div>/i)?.[1] ??
      html.match(/<noscript>\s*<div style="min-height:100vh([\s\S]*?)<\/noscript>/i)?.[1] ??
      "";
    const internal = [...staticShell.matchAll(/href=["'](\/[^"'#]*)["']/g)].map((m) => m[1]).filter((h) => h !== "/logo.webp");
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
