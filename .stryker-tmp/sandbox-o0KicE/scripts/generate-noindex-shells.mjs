#!/usr/bin/env node
// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// RODADA 3P.1 — SHELL SEO SEGURO PARA ROTAS VÁLIDAS NOINDEX
//
// Problema corrigido: a hospedagem pública faz fallback de SPA servindo
// dist/index.html (a HOME) para qualquer rota sem arquivo próprio. Rotas
// válidas porém deliberadamente noindex (bairros L3, serviço × cidade,
// /arrumar-pc/*, marcas, problemas, procedimentos…) chegavam ao crawler com
// title, canonical e robots=index da HOME antes da hidratação.
//
// Solução (Opção B do briefing): emitir, para cada rota válida SEM HTML
// próprio, um shell estático com metadata coerente:
//   • <title> da própria rota
//   • canonical self-referente
//   • robots = noindex, follow
//   • sem JSON-LD da home, sem corpo estático da home
//
// Não altera rotas indexáveis (curadas) — essas já são prerenderizadas com
// conteúdo real e continuam intactas. Fail-closed: se alguma rota curada
// estiver sem HTML próprio, o script falha em vez de aplicar noindex nela.
//
// Uso: node scripts/generate-noindex-shells.mjs [distDir]
// ─────────────────────────────────────────────────────────────
import { promises as fs } from "node:fs";
import path from "node:path";
import { BASE_URL, BRAND_NAME } from "./lib/site-env.mjs";
import { injectRootBody } from "./prerender-cities.mjs";

const DIST = path.resolve(process.argv[2] || "dist");

if (!BASE_URL) {
  console.error("[noindex-shells] domínio não configurado (VITE_SITE_DOMAIN) — fail-closed.");
  process.exit(1);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const humanize = (slug) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => (w.length <= 2 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

/** Título coerente por família de rota (nunca o título da home). */
function titleFor(routePath) {
  const segs = routePath.split("/").filter(Boolean);
  const last = humanize(segs[segs.length - 1] || "");
  if (segs[0] === "bairros") return `Atendimento técnico em ${last} | ${BRAND_NAME}`;
  if (segs[0] === "servicos" && segs.length === 3) return `${humanize(segs[1])} em ${last} | ${BRAND_NAME}`;
  if (segs[0] === "marcas") return `Assistência técnica ${last} | ${BRAND_NAME}`;
  if (segs[0] === "problemas") return `${last} | ${BRAND_NAME}`;
  if (segs[0] === "procedimentos") return `${last} | ${BRAND_NAME}`;
  if (segs[0] === "arrumar-pc") return `Arrumar PC — ${last} | ${BRAND_NAME}`;
  if (segs[0] === "blog") return `${last} | Blog ${BRAND_NAME}`;
  return `${last} | ${BRAND_NAME}`;
}

function descriptionFor(routePath, title) {
  return `${title.split(" | ")[0]}. Página do portal ${BRAND_NAME}. Descreva o equipamento e o sintoma para receber a orientação do próximo passo.`;
}

/** Substitui a tag se existir; injeta antes de </head> quando ausente. */
function upsertHead(html, pattern, tag) {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function buildShell(baseHtml, routePath) {
  const url = `${BASE_URL}${routePath}`;
  const title = titleFor(routePath);
  const description = descriptionFor(routePath, title);
  let out = baseHtml;

  // 1. Nenhum JSON-LD herdado da home nesta rota (o React injeta o correto).
  out = out.replace(/\s*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");

  // 2. Metadata própria da rota.
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  out = upsertHead(out, /<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${esc(description)}">`);
  out = upsertHead(out, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${url}" />`);
  out = upsertHead(out, /<link\s+rel=["']alternate["']\s+hreflang=["']pt-BR["'][^>]*>/i, `<link rel="alternate" hreflang="pt-BR" href="${url}" />`);
  out = upsertHead(out, /<link\s+rel=["']alternate["']\s+hreflang=["']x-default["'][^>]*>/i, `<link rel="alternate" hreflang="x-default" href="${url}" />`);
  out = upsertHead(out, /<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${url}" />`);
  out = upsertHead(out, /<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${esc(title)}">`);
  out = upsertHead(out, /<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${esc(description)}">`);
  out = upsertHead(out, /<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${esc(title)}">`);
  out = upsertHead(out, /<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${esc(description)}">`);

  // 3. Robots explícito: rota válida, porém fora do índice.
  out = out.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "");
  out = out.replace(/<\/head>/i, `    <meta name="robots" content="noindex, follow">\n  </head>`);

  // 4. Corpo estático neutro (o React substitui na hidratação). Sem hero,
  //    sem oferta e sem H1 da home.
  const body = `
        <div style="min-height:60vh;background:linear-gradient(155deg,hsl(205,58%,15%) 0%,hsl(200,45%,22%) 100%);color:#fff;padding:32px 20px;font-family:Arial,sans-serif;max-width:820px;margin:0 auto">
          <img src="/logo.webp" alt="${esc(BRAND_NAME)}" width="240" height="54" style="max-width:60vw;height:auto" />
          <h1 style="font-size:1.5rem;line-height:1.3;margin:20px 0 12px">${esc(title.split(" | ")[0])}</h1>
          <p style="margin:0 0 20px;font-size:1rem;opacity:.94">Carregando os detalhes desta página. Se preferir, use os atalhos abaixo.</p>
          <ul style="line-height:2;padding-left:20px">
            <li><a href="/" style="color:#7fd4ec">Página inicial</a></li>
            <li><a href="/servicos" style="color:#7fd4ec">Serviços disponíveis</a></li>
          </ul>
        </div>`;
  out = injectRootBody(out, body.trim());
  return out;
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(path.join(DIST, "route-manifest.json"), "utf8"));
  let dynamicPaths = [];
  try {
    dynamicPaths = JSON.parse(await fs.readFile(path.join(DIST, "dynamic-slugs.json"), "utf8")).paths || [];
  } catch {
    /* opcional */
  }

  const prerendered = new Set(manifest.prerenderedPaths || []);
  if (!prerendered.size) {
    // Manifesto antigo: deriva do disco.
    const walk = async (dir, prefix) => {
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        if (e.isDirectory()) await walk(path.join(dir, e.name), `${prefix}/${e.name}`);
        else if (e.name === "index.html") prerendered.add(prefix || "/");
      }
    };
    await walk(DIST, "");
  }

  const curated = (manifest.curated || []).map((c) => (typeof c === "string" ? c : c.path));
  const missingCurated = curated.filter((p) => !prerendered.has(p));
  if (missingCurated.length) {
    console.error(
      `[noindex-shells] rotas curadas (indexáveis) sem HTML próprio — não podem virar shell noindex:\n  ${missingCurated.join("\n  ")}`,
    );
    process.exit(1);
  }

  const priv = manifest.privatePrefixes || [];
  const targets = [...new Set([...(manifest.validExact || []), ...dynamicPaths])]
    .filter((p) => p !== "/" && p.startsWith("/"))
    .filter((p) => !priv.some((x) => p === x || p.startsWith(`${x}/`)))
    .filter((p) => !/\.[a-z0-9]+$/i.test(p))
    .filter((p) => !prerendered.has(p))
    .sort();

  const baseHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");

  for (const routePath of targets) {
    const outDir = path.join(DIST, ...routePath.split("/").filter(Boolean));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), buildShell(baseHtml, routePath), "utf8");
  }

  console.log(
    `[noindex-shells] ${targets.length} shells noindex emitidos (rotas válidas sem prerender). ` +
      `${prerendered.size} páginas próprias preservadas.`,
  );
}

main().catch((err) => {
  console.error("[noindex-shells] falhou:", err);
  process.exit(1);
});
