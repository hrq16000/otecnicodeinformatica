// Pós-build: gera o manifesto de rotas, o arquivo de redirects do host e a
// página 404 estática. Executado automaticamente no `postbuild`.
//
// Saídas:
//   dist/route-manifest.json  → contrato único consumido por servidor/gates/testes
//   dist/_redirects           → aliases 301 + rotas válidas 200 + catch-all 404
//   dist/404.html             → resposta 404 sem conteúdo, canonical ou schema da home

import { promises as fs } from "node:fs";
import path from "node:path";
import { buildRouteManifest } from "./lib/route-manifest.mjs";

const DIST = path.resolve(process.argv[2] || "dist");

const TITLE_404 = "Página não encontrada | Técnico Curitiba";
const DESC_404 =
  "A página que você tentou acessar não existe ou foi movida. Veja os serviços disponíveis ou volte para a página inicial.";

const BODY_404 = `
      <noscript>
        <div style="min-height:100vh;background:linear-gradient(155deg,hsl(205,58%,15%) 0%,hsl(200,45%,22%) 100%);color:#fff;padding:32px 20px;font-family:Arial,sans-serif;max-width:720px;margin:0 auto">
          <img src="/logo.webp" alt="Técnico em Curitiba" width="240" height="78" style="max-width:60vw;height:auto" />
          <h1 style="font-size:1.6rem;line-height:1.25;margin:20px 0 12px">Página não encontrada</h1>
          <p style="margin:0 0 20px;font-size:1rem;opacity:.94">O endereço acessado não existe ou foi movido. Use os links abaixo para continuar.</p>
          <ul style="line-height:2;padding-left:20px">
            <li><a href="/" style="color:#7fd4ec">Página inicial</a></li>
            <li><a href="/servicos" style="color:#7fd4ec">Serviços disponíveis</a></li>
          </ul>
        </div>
      </noscript>`;

/** Remove canonical, hreflang, JSON-LD e metadados comerciais herdados da home. */
function build404Html(baseHtml) {
  let html = baseHtml;
  html = html.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "");
  html = html.replace(/\s*<link\s+rel=["']alternate["'][^>]*hreflang[^>]*>/gi, "");
  html = html.replace(/\s*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "");
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${TITLE_404}</title>`);
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${DESC_404}">`,
  );
  for (const [prop, value] of [
    ["og:title", TITLE_404],
    ["twitter:title", TITLE_404],
    ["og:description", DESC_404],
    ["twitter:description", DESC_404],
  ]) {
    const attr = prop.startsWith("og:") ? "property" : "name";
    const re = new RegExp(`<meta\\s+${attr}=["']${prop}["'][^>]*>`, "gi");
    html = html.replace(re, `<meta ${attr}="${prop}" content="${value}">`);
  }
  html = html.replace(
    /<\/head>/i,
    `    <meta name="robots" content="noindex, nofollow">\n  </head>`,
  );
  // Corpo estático: sem oferta, preço, CTA de WhatsApp ou schema da home.
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, BODY_404.trim());
  return html;
}

function buildRedirectsFile(manifest) {
  const lines = [
    "# GERADO AUTOMATICAMENTE por scripts/generate-route-manifest.mjs — não editar à mão.",
    "# Ordem: aliases 301 → rotas válidas 200 (SPA) → catch-all 404.",
    "",
    "# ── B. Aliases legítimos (301, salto único) ──",
  ];
  for (const r of manifest.redirects) lines.push(`${r.from}    ${r.to}    301!`);
  lines.push("", "# ── A/C. Rotas públicas válidas e administrativas (SPA fallback 200) ──");
  for (const p of manifest.validExact) lines.push(`${p}    /index.html    200`);
  for (const p of manifest.validPatterns) lines.push(`${p}    /index.html    200`);
  lines.push("", "# ── D. Qualquer outra URL: 404 real ──", "/*    /404.html    404", "");
  return lines.join("\n");
}

async function main() {
  const manifest = await buildRouteManifest({ distDir: DIST });

  await fs.writeFile(path.join(DIST, "route-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await fs.writeFile(path.join(DIST, "_redirects"), buildRedirectsFile(manifest));

  const baseHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");
  await fs.writeFile(path.join(DIST, "404.html"), build404Html(baseHtml));

  console.log(
    `[route-manifest] ${manifest.counts.validExact} rotas exatas, ${manifest.counts.validPatterns} padrões, ` +
      `${manifest.counts.redirects} redirects, ${manifest.counts.prerendered} páginas estáticas.`,
  );
  console.log("[route-manifest] dist/route-manifest.json, dist/_redirects e dist/404.html emitidos.");
}

main().catch((err) => {
  console.error("[route-manifest] falhou:", err);
  process.exit(1);
});
