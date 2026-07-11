// Validação anti-regressão dos bloqueadores SEO P0 (Onda 1).
// Confirma, sem executar o app:
//  1. Paridade de title/description entre servicosCore.ts (fonte de verdade)
//     e curated-routes-meta.mjs (prerender pré-hidratação) nas 8 rotas de serviço.
//  2. Ausência de storage externo (gpt-engineer) no HTML base.
//  3. og:image === og:image:secure_url === twitter:image no index.html.
//  4. Nome institucional único ("Técnico em Curitiba") nos campos de entidade.
//  5. Exatamente 1 <title>, 1 description e 1 canonical no index.html.
//  6. /valores sem canonical próprio (fora do prerender curado) e
//     /precos-e-politicas presente como rota canônica oficial.
//
// Uso: node scripts/check-curated-meta.mjs
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const OFFICIAL_NAME = "Técnico em Curitiba";
const SERVICE_PATHS = [
  "formatacao",
  "manutencao-de-notebook",
  "manutencao-de-computador",
  "upgrade-ssd-ram",
  "remocao-de-virus",
  "recuperacao-de-dados",
  "redes-e-wifi",
  "suporte-tecnico-empresarial",
];

const errors = [];
const fail = (msg) => errors.push(msg);

// ── 1. Fonte de verdade: servicosCore.ts ────────────────────────────
const coreSrc = readFileSync(resolve(root, "src/lib/servicosCore.ts"), "utf8");
const grabAll = (re, s) => [...s.matchAll(re)].map((m) => m[1]);
const paths = grabAll(/path:\s*"([^"]+)"/g, coreSrc);
const titles = grabAll(/metaTitle:\s*"([^"]+)"/g, coreSrc);
const descs = grabAll(/metaDescription:\s*"([^"]+)"/g, coreSrc);
if (paths.length !== titles.length || paths.length !== descs.length) {
  fail(`servicosCore.ts: contagem desalinhada (path=${paths.length}, metaTitle=${titles.length}, metaDescription=${descs.length})`);
}
const official = new Map();
paths.forEach((p, i) => official.set(p, { title: titles[i], description: descs[i] }));
for (const sp of SERVICE_PATHS) {
  if (!official.has(sp)) fail(`servicosCore.ts: serviço ausente "${sp}"`);
}

// ── 2. Prerender: curated-routes-meta.mjs ───────────────────────────
const { CURATED_ROUTES } = await import(pathToFileURL(resolve(root, "scripts/curated-routes-meta.mjs")).href);
const curatedByPath = new Map(CURATED_ROUTES.map((r) => [r.path, r]));

for (const sp of SERVICE_PATHS) {
  const routePath = `/servicos/${sp}`;
  const cur = curatedByPath.get(routePath);
  const off = official.get(sp);
  if (!cur) { fail(`curated: rota ausente ${routePath}`); continue; }
  if (!off) continue;
  if (cur.title !== off.title) fail(`title divergente em ${routePath}\n  prerender: ${cur.title}\n  oficial:   ${off.title}`);
  if (cur.description !== off.description) fail(`description divergente em ${routePath}`);
  if (!cur.title || !cur.description) fail(`curated: title/description vazios em ${routePath}`);
}

// ── /valores e /precos-e-politicas ──────────────────────────────────
if (curatedByPath.has("/valores")) fail("/valores não deve ter entrada própria no prerender curado (canonical próprio)");
if (!curatedByPath.has("/precos-e-politicas")) fail("/precos-e-politicas ausente do prerender curado (URL canônica oficial)");

// ── 3+4+5. index.html ───────────────────────────────────────────────
const html = readFileSync(resolve(root, "index.html"), "utf8");
if (/gpt-engineer/i.test(html)) fail("index.html contém referência a storage do gpt-engineer");

const metaContent = (re) => { const m = html.match(re); return m ? m[1] : null; };
const ogImage = metaContent(/property="og:image"\s+content="([^"]+)"/);
const ogSecure = metaContent(/property="og:image:secure_url"\s+content="([^"]+)"/);
const twImage = metaContent(/name="twitter:image"\s+content="([^"]+)"/);
if (!ogImage || !ogSecure || !twImage) fail("index.html: og:image/og:image:secure_url/twitter:image ausente(s)");
if (!(ogImage === ogSecure && ogSecure === twImage)) {
  fail(`imagens sociais divergentes:\n  og:image=${ogImage}\n  secure_url=${ogSecure}\n  twitter=${twImage}`);
}
if (ogImage && /gpt-engineer/i.test(ogImage)) fail("og:image aponta para storage externo");
if (ogImage && !ogImage.startsWith("https://tecnico.curitiba.br/")) fail("og:image não usa o domínio oficial");

const siteName = metaContent(/property="og:site_name"\s+content="([^"]+)"/);
if (siteName !== OFFICIAL_NAME) fail(`og:site_name divergente: "${siteName}" (esperado "${OFFICIAL_NAME}")`);
const appName = metaContent(/name="application-name"\s+content="([^"]+)"/);
if (appName !== OFFICIAL_NAME) fail(`application-name divergente: "${appName}" (esperado "${OFFICIAL_NAME}")`);

const count = (re) => (html.match(re) || []).length;
if (count(/<title>/g) !== 1) fail(`index.html: esperado exatamente 1 <title> (achou ${count(/<title>/g)})`);
if (count(/name="description"/g) !== 1) fail(`index.html: esperado exatamente 1 meta description (achou ${count(/name="description"/g)})`);
if (count(/rel="canonical"/g) !== 1) fail(`index.html: esperado exatamente 1 canonical (achou ${count(/rel="canonical"/g)})`);

// ── 4. Nome institucional em PageSEO.tsx (og:site_name runtime) ──────
const pageSeo = readFileSync(resolve(root, "src/components/PageSEO.tsx"), "utf8");
const siteNameConst = pageSeo.match(/const SITE_NAME\s*=\s*"([^"]+)"/);
if (!siteNameConst || siteNameConst[1] !== OFFICIAL_NAME) {
  fail(`PageSEO.tsx SITE_NAME divergente: "${siteNameConst ? siteNameConst[1] : "?"}" (esperado "${OFFICIAL_NAME}")`);
}

// ── 6. Identidade institucional: manifest.json ──────────────────────
import { existsSync } from "node:fs";
let manifest;
try {
  manifest = JSON.parse(readFileSync(resolve(root, "public/manifest.json"), "utf8"));
} catch (e) {
  fail(`public/manifest.json inválido: ${e.message}`);
}
if (manifest) {
  if (manifest.name !== OFFICIAL_NAME) fail(`manifest.name divergente: "${manifest.name}" (esperado "${OFFICIAL_NAME}")`);
  if (manifest.short_name !== OFFICIAL_NAME) fail(`manifest.short_name divergente: "${manifest.short_name}" (esperado "${OFFICIAL_NAME}")`);
}

// ── 7. Identidade institucional: prerender-cities.mjs ───────────────
// Campos institucionais (og:site_name, Organization.name, LocalBusiness.name)
// não devem usar o nome antigo "Técnico Curitiba".
const prerenderSrc = readFileSync(resolve(root, "scripts/prerender-cities.mjs"), "utf8");
const badSiteName = [...prerenderSrc.matchAll(/(og:site_name"\s+content=|name:\s*)"Técnico Curitiba"/g)];
if (badSiteName.length) {
  fail(`prerender-cities.mjs ainda usa "Técnico Curitiba" em ${badSiteName.length} campo(s) institucional(is)`);
}

// ── 8. Pós-build: dist/valores/index.html (alias de /precos-e-politicas) ──
const valoresHtmlPath = resolve(root, "dist/valores/index.html");
if (existsSync(valoresHtmlPath)) {
  const v = readFileSync(valoresHtmlPath, "utf8");
  const canonicalCount = (v.match(/rel="canonical"/g) || []).length;
  if (canonicalCount !== 1) fail(`dist/valores: esperado exatamente 1 canonical (achou ${canonicalCount})`);
  const vCanonical = (v.match(/rel="canonical"\s+href="([^"]+)"/) || [])[1];
  if (vCanonical !== "https://tecnico.curitiba.br/precos-e-politicas") {
    fail(`dist/valores: canonical divergente "${vCanonical}" (esperado /precos-e-politicas)`);
  }
  if (/rel="canonical"\s+href="https:\/\/tecnico\.curitiba\.br\/"/.test(v)) {
    fail("dist/valores: canonical aponta para a home (proibido)");
  }
  const vOgUrl = (v.match(/property="og:url"\s+content="([^"]+)"/) || [])[1];
  if (vOgUrl !== "https://tecnico.curitiba.br/precos-e-politicas") {
    fail(`dist/valores: og:url divergente "${vOgUrl}" (esperado /precos-e-politicas)`);
  }
  if (/gpt-engineer/i.test(v)) fail("dist/valores: contém referência a storage do gpt-engineer");

  // /valores fora de todos os sitemaps
  const sitemapDir = resolve(root, "public");
  for (const f of ["sitemap-main.xml", "sitemap-servicos.xml", "sitemap-regioes.xml", "sitemap-bairros.xml", "sitemap.xml"]) {
    const sp = resolve(sitemapDir, f);
    if (existsSync(sp) && /\/valores(<|\/)/.test(readFileSync(sp, "utf8"))) {
      fail(`/valores presente em ${f} (deve ficar fora dos sitemaps)`);
    }
  }
} else {
  console.log("ℹ️  check-curated-meta: dist/valores/index.html ausente (pré-build) — validação de alias adiada para pós-build.");
}

// ── 9. Pós-build: indexabilidade das famílias legadas vs. rotas curadas ──
// Confirma no HTML gerado (dist) que:
//  - as 108 rotas legadas (/arrumar-pc/*, hubs conserto-*-curitiba,
//    conserto-*/local e /cftv/*) são noindex,follow, self-canonical e
//    ausentes de todos os sitemaps;
//  - as rotas curadas pré-renderizadas continuam index,follow, self-canonical;
//  - cada HTML tem exatamente 1 meta robots e 1 canonical.
const SITE = "https://tecnico.curitiba.br";
const distDir = resolve(root, "dist");
if (existsSync(distDir)) {
  const { CITIES, CATEGORIES, LOCAIS, CFTV_ROUTES } = await import(
    pathToFileURL(resolve(root, "scripts/prerender-cities.mjs")).href
  );

  const readDist = (routePath) => {
    const file = routePath === "/"
      ? resolve(distDir, "index.html")
      : resolve(distDir, ...routePath.split("/").filter(Boolean), "index.html");
    return existsSync(file) ? readFileSync(file, "utf8") : null;
  };
  const robotsOf = (h) => {
    const all = [...h.matchAll(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/gi)];
    return { count: all.length, value: all.length ? all[0][1] : null };
  };
  const canonicalsOf = (h) => [...h.matchAll(/rel=["']canonical["']\s+href=["']([^"']+)["']/gi)].map((m) => m[1]);

  // Famílias legadas (fonte única: prerender-cities.mjs).
  const legacyArrumar = CITIES.map((c) => `/arrumar-pc/${c.slug}`);
  const legacyHubs = CATEGORIES.map((c) => `/${c.slug}-curitiba`);
  const legacyLocal = CATEGORIES.flatMap((cat) => LOCAIS.map((l) => `/${cat.slug}/${l.slug}`));
  const legacyCftv = CFTV_ROUTES.map((r) => r.path);
  const legacyPaths = [...legacyArrumar, ...legacyHubs, ...legacyLocal, ...legacyCftv];

  const expected = { arrumar: 20, hubs: 4, local: 76, cftv: 8, total: 108 };
  if (legacyArrumar.length !== expected.arrumar) fail(`legacy /arrumar-pc: esperado ${expected.arrumar}, achou ${legacyArrumar.length}`);
  if (legacyHubs.length !== expected.hubs) fail(`legacy hubs conserto-*-curitiba: esperado ${expected.hubs}, achou ${legacyHubs.length}`);
  if (legacyLocal.length !== expected.local) fail(`legacy conserto-*/local: esperado ${expected.local}, achou ${legacyLocal.length}`);
  if (legacyCftv.length !== expected.cftv) fail(`legacy /cftv/*: esperado ${expected.cftv}, achou ${legacyCftv.length}`);
  if (legacyPaths.length !== expected.total) fail(`legacy total: esperado ${expected.total}, achou ${legacyPaths.length}`);

  for (const p of legacyPaths) {
    const h = readDist(p);
    if (!h) { fail(`legacy: HTML ausente em dist${p}/index.html`); continue; }
    const r = robotsOf(h);
    if (r.count !== 1) fail(`legacy ${p}: esperado exatamente 1 meta robots (achou ${r.count})`);
    if (r.value !== "noindex, follow") fail(`legacy ${p}: robots="${r.value}" (esperado "noindex, follow")`);
    const cans = canonicalsOf(h);
    if (cans.length !== 1) fail(`legacy ${p}: esperado exatamente 1 canonical (achou ${cans.length})`);
    if (cans[0] && cans[0] !== `${SITE}${p}`) fail(`legacy ${p}: canonical "${cans[0]}" não é self-referente`);
    if (cans[0] === `${SITE}/`) fail(`legacy ${p}: canonical aponta para a home (proibido)`);
  }

  // Rotas curadas pré-renderizadas: index,follow + self-canonical.
  for (const route of CURATED_ROUTES) {
    const h = readDist(route.path);
    if (!h) { fail(`curated: HTML ausente em dist${route.path === "/" ? "" : route.path}/index.html`); continue; }
    const r = robotsOf(h);
    if (r.count !== 1) fail(`curated ${route.path}: esperado exatamente 1 meta robots (achou ${r.count})`);
    if (!r.value || !/^index,\s*follow/.test(r.value)) fail(`curated ${route.path}: robots="${r.value}" (esperado index, follow)`);
    if (r.value && /noindex/.test(r.value)) fail(`curated ${route.path}: recebeu noindex (proibido)`);
    const cans = canonicalsOf(h);
    if (cans.length !== 1) fail(`curated ${route.path}: esperado exatamente 1 canonical (achou ${cans.length})`);
    if (cans[0] && cans[0] !== `${SITE}${route.path}`) fail(`curated ${route.path}: canonical "${cans[0]}" não é self-referente`);
  }

  // ── Onda 2 · 6 URLs curadas que antes herdavam o fallback da home ──────
  // Validação reforçada: HTML próprio + index,follow + self-canonical +
  // og:url self + og:title/og:description presentes + og:image oficial +
  // sem gpt-engineer + presença no sitemap. Fonte de verdade: componentes
  // de página (PageSEO) espelhados em curated-routes-meta.mjs.
  const NEW_CURATED = [
    "/atendimento-domicilio",
    "/atendimento-remoto",
    "/coleta-e-entrega",
    "/diagnostico-tecnico",
    "/equipamentos-atendidos",
    "/quando-nao-compensa",
  ];
  const sitemapMainXml = existsSync(resolve(root, "public/sitemap-main.xml"))
    ? readFileSync(resolve(root, "public/sitemap-main.xml"), "utf8")
    : "";
  const metaProp = (h, prop) => (h.match(new RegExp(`property=["']${prop}["']\\s+content=["']([^"']+)["']`, "i")) || [])[1];
  const metaName = (h, name) => (h.match(new RegExp(`name=["']${name}["']\\s+content=["']([^"']+)["']`, "i")) || [])[1];
  for (const p of NEW_CURATED) {
    const h = readDist(p);
    if (!h) { fail(`nova curada ${p}: HTML ausente em dist${p}/index.html`); continue; }
    const r = robotsOf(h);
    if (r.count !== 1) fail(`nova curada ${p}: esperado exatamente 1 meta robots (achou ${r.count})`);
    if (r.value !== "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1") {
      fail(`nova curada ${p}: robots="${r.value}" (esperado index, follow …)`);
    }
    const cans = canonicalsOf(h);
    if (cans.length !== 1) fail(`nova curada ${p}: esperado exatamente 1 canonical (achou ${cans.length})`);
    if (cans[0] !== `${SITE}${p}`) fail(`nova curada ${p}: canonical "${cans[0]}" não é self-referente`);
    if (cans[0] === `${SITE}/`) fail(`nova curada ${p}: canonical aponta para a home (proibido)`);
    const title = (h.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
    if (!title) fail(`nova curada ${p}: <title> ausente`);
    if (!metaName(h, "description")) fail(`nova curada ${p}: meta description ausente`);
    if (metaProp(h, "og:url") !== `${SITE}${p}`) fail(`nova curada ${p}: og:url "${metaProp(h, "og:url")}" não é self-referente`);
    if (!metaProp(h, "og:title")) fail(`nova curada ${p}: og:title ausente`);
    if (!metaProp(h, "og:description")) fail(`nova curada ${p}: og:description ausente`);
    const ogImg = metaProp(h, "og:image");
    if (!ogImg || !ogImg.startsWith(`${SITE}/`)) fail(`nova curada ${p}: og:image "${ogImg}" não usa o domínio oficial`);
    if (metaProp(h, "og:site_name") !== OFFICIAL_NAME) fail(`nova curada ${p}: og:site_name divergente`);
    if (!metaName(h, "twitter:image")) fail(`nova curada ${p}: twitter:image ausente`);
    if (/gpt-engineer/i.test(h)) fail(`nova curada ${p}: contém referência a storage do gpt-engineer`);
    if (!sitemapMainXml.includes(`<loc>${SITE}${p}</loc>`)) fail(`nova curada ${p}: ausente do sitemap-main.xml`);
    if (!curatedByPath.has(p)) fail(`nova curada ${p}: ausente de CURATED_ROUTES (curated-routes-meta.mjs)`);
  }


  // Sitemaps: total 33 URLs e nenhuma rota legada presente.
  const sitemapFiles = ["sitemap-main.xml", "sitemap-servicos.xml", "sitemap-regioes.xml", "sitemap-bairros.xml"];
  let sitemapTotal = 0;
  for (const f of sitemapFiles) {
    const sp = resolve(root, "public", f);
    if (!existsSync(sp)) { fail(`sitemap ausente: ${f}`); continue; }
    const xml = readFileSync(sp, "utf8");
    sitemapTotal += (xml.match(/<loc>/g) || []).length;
    for (const p of legacyPaths) {
      if (xml.includes(`<loc>${SITE}${p}</loc>`)) fail(`rota legada ${p} presente em ${f} (deve ficar fora dos sitemaps)`);
    }
  }
  if (sitemapTotal !== 33) fail(`sitemaps: total esperado 33 URLs, achou ${sitemapTotal}`);
} else {
  console.log("ℹ️  check-curated-meta: dist/ ausente (pré-build) — validação de indexabilidade legada adiada para pós-build.");
}

if (errors.length) {
  console.error("❌ check-curated-meta: FALHOU\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}
console.log(`✅ check-curated-meta: OK — 8 serviços em paridade, imagens sociais alinhadas, nome institucional "${OFFICIAL_NAME}", /valores sem canonical próprio, 108 rotas legadas noindex e sitemaps com 33 URLs.`);
