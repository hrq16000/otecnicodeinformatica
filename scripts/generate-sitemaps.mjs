// Generates sitemap-index.xml + sub-sitemaps (main, servicos, bairros, marcas, problemas).
// Runs via predev/prebuild. Parses src/App.tsx + data files; outputs to public/.
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://tecnicocuritiba.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

const appSrc = readFileSync(resolve("src/App.tsx"), "utf8");
const brandsSrc = readFileSync(resolve("src/lib/brandsData.ts"), "utf8");
const problemsSrc = readFileSync(resolve("src/lib/problemaPagesData.ts"), "utf8");

// 1) Extract literal routes from App.tsx (no params, no admin/ads, no wildcards).
const routes = new Set();
const reRoute = /<Route\s+path="([^"]+)"/g;
for (const m of appSrc.matchAll(reRoute)) {
  const p = m[1];
  if (p.includes(":") || p.includes("*")) continue;
  if (p.startsWith("/admin") || p.startsWith("/ads") || p === "/index") continue;
  // Skip redirect-only old URLs (they have <Navigate>)
  routes.add(p);
}

// Remove pure redirect rows by checking the source line contains <Navigate
const redirectPaths = new Set();
for (const m of appSrc.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<Navigate/g)) {
  redirectPaths.add(m[1]);
}
for (const p of redirectPaths) routes.delete(p);

// 2) Expand dynamic routes from data files.
const brandSlugs = [...brandsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const problemSlugs = [...problemsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

for (const s of brandSlugs) routes.add(`/marcas/${s}`);
for (const s of problemSlugs) routes.add(`/problemas/${s}`);

// 3) Categorize.
const buckets = { bairros: [], marcas: [], problemas: [], servicos: [], main: [] };
for (const p of [...routes].sort()) {
  if (p.startsWith("/bairros/")) buckets.bairros.push(p);
  else if (p.startsWith("/marcas")) buckets.marcas.push(p);
  else if (p.startsWith("/problemas/") || p.startsWith("/procedimentos")) buckets.problemas.push(p);
  else if (p.startsWith("/servicos") || /^\/conserto-.+-curitiba$/.test(p) || p.startsWith("/conserto-tv/") || p.startsWith("/conserto-som/") || p.startsWith("/conserto-videogame/") || p.startsWith("/conserto-celular/")) buckets.servicos.push(p);
  else buckets.main.push(p);
}

// 4) Priority + changefreq heuristic.
function meta(p) {
  if (p === "/") return { changefreq: "weekly", priority: "1.0" };
  if (p.startsWith("/bairros/")) return { changefreq: "monthly", priority: "0.7" };
  if (p.startsWith("/marcas/")) return { changefreq: "monthly", priority: "0.7" };
  if (p.startsWith("/problemas/") || p.startsWith("/procedimentos")) return { changefreq: "monthly", priority: "0.8" };
  if (p.startsWith("/servicos/") || p.startsWith("/conserto-")) return { changefreq: "weekly", priority: "0.85" };
  return { changefreq: "weekly", priority: "0.8" };
}

function buildUrlset(paths) {
  const urls = paths
    .map((p) => {
      const { changefreq, priority } = meta(p);
      return `  <url><loc>${BASE_URL}${p}</loc><lastmod>${TODAY}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const files = [
  ["sitemap-main.xml", buckets.main],
  ["sitemap-servicos.xml", buckets.servicos],
  ["sitemap-bairros.xml", buckets.bairros],
  ["sitemap-marcas.xml", buckets.marcas],
  ["sitemap-problemas.xml", buckets.problemas],
];

for (const [name, paths] of files) {
  writeFileSync(resolve("public", name), buildUrlset(paths));
}

// 5) Sitemap index.
const indexXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  files
    .map(
      ([name]) =>
        `  <sitemap><loc>${BASE_URL}/${name}</loc><lastmod>${TODAY}</lastmod></sitemap>`,
    )
    .join("\n") +
  `\n  <sitemap><loc>${BASE_URL}/sitemap-news.xml</loc><lastmod>${TODAY}</lastmod></sitemap>\n` +
  `</sitemapindex>\n`;

writeFileSync(resolve("public/sitemap-index.xml"), indexXml);

// Keep legacy /sitemap.xml as an alias of the index so old refs keep working.
writeFileSync(resolve("public/sitemap.xml"), indexXml);

const total = files.reduce((n, [, p]) => n + p.length, 0);
console.log(
  `sitemaps: index + ${files.length} sub-sitemaps written (${total} urls): ` +
    files.map(([n, p]) => `${n}=${p.length}`).join(", "),
);
