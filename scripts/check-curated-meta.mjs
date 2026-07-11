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

// ── Resultado ───────────────────────────────────────────────────────
if (errors.length) {
  console.error("❌ check-curated-meta: FALHOU\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}
console.log(`✅ check-curated-meta: OK — 8 serviços em paridade, imagens sociais alinhadas, nome institucional "${OFFICIAL_NAME}", /valores sem canonical próprio.`);
