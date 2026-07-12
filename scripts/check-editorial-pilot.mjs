#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE DOS OITO CONTEÚDOS-PILOTO (Onda editorial — PROMPT 31)
//
// Verificações OBJETIVAS. Nenhuma avaliação semântica subjetiva.
// Garante que os oito pilotos existem, foram reescritos, seguem
// fail-closed (noindex, fora do sitemap, sem aprovação, sem autor
// pessoal, sem schema de publicação) e apontam apenas para rotas
// curadas.
//
// Uso: node scripts/check-editorial-pilot.mjs
// Sai com código 1 em qualquer violação crítica.
// ─────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => path.join(root, p);
const read = (p) => fs.readFileSync(rel(p), "utf8");
const exists = (p) => fs.existsSync(rel(p));

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const BRAND = "Técnico em Curitiba";
const SITE = "https://tecnico.curitiba.br";

// Rotas internas permitidas em links dos pilotos (curadas).
const ALLOWED_ROUTES = new Set([
  "/servicos/manutencao-de-computador",
  "/servicos/manutencao-de-notebook",
  "/servicos/formatacao",
  "/servicos/upgrade-ssd-ram",
  "/servicos/remocao-de-virus",
  "/servicos/recuperacao-de-dados",
  "/servicos/redes-e-wifi",
  "/servicos/suporte-tecnico-empresarial",
  "/diagnostico-tecnico",
  "/precos-e-politicas",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/empresa-de-ti-curitiba",
]);

const CURATED_SERVICE_ROUTES = new Set([
  "/servicos/manutencao-de-computador",
  "/servicos/manutencao-de-notebook",
  "/servicos/formatacao",
  "/servicos/upgrade-ssd-ram",
  "/servicos/remocao-de-virus",
  "/servicos/recuperacao-de-dados",
  "/servicos/redes-e-wifi",
  "/servicos/suporte-tecnico-empresarial",
]);

// ── 1. Registro editorial ────────────────────────────────────
const registry = read("src/lib/blogEditorialRegistry.ts");

// APPROVED vazio (sem .set e declaração sem argumentos).
if (/APPROVED_EDITORIAL_CONTENT\.set\s*\(/.test(registry)) {
  fail("APPROVED_EDITORIAL_CONTENT recebeu .set() — o registro de aprovados deve permanecer VAZIO.");
}
if (!/APPROVED_EDITORIAL_CONTENT\s*=\s*new Map<[^>]*>\(\s*\)\s*;/.test(registry)) {
  fail("APPROVED_EDITORIAL_CONTENT não está declarado como Map vazio.");
}

// Slugs do piloto.
const slugsMatch = registry.match(/EDITORIAL_PILOT_SLUGS\s*=\s*\[([\s\S]*?)\]/);
if (!slugsMatch) fail("EDITORIAL_PILOT_SLUGS não encontrado no registro editorial.");
const pilotSlugs = slugsMatch
  ? [...slugsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  : [];

if (pilotSlugs.length !== 8) {
  fail(`Esperado exatamente 8 slugs-piloto, encontrados ${pilotSlugs.length}.`);
}
if (new Set(pilotSlugs).size !== pilotSlugs.length) {
  fail("Há slugs-piloto duplicados em EDITORIAL_PILOT_SLUGS.");
}

// Fila de revisão: in_review, sem approvedAt, sem reviewedAt.
const queueMatch = registry.match(/EDITORIAL_REVIEW_QUEUE\s*=\s*new Map[\s\S]*?\n\);/);
if (!queueMatch) {
  fail("EDITORIAL_REVIEW_QUEUE não encontrado no registro editorial.");
} else {
  const queueBlock = queueMatch[0];
  if (!/status:\s*"in_review"/.test(queueBlock)) {
    fail("EDITORIAL_REVIEW_QUEUE não define status 'in_review'.");
  }
  if (/approvedAt\s*:/.test(queueBlock)) {
    fail("EDITORIAL_REVIEW_QUEUE contém approvedAt — pilotos não podem ter data de aprovação.");
  }
  if (/reviewedAt\s*:/.test(queueBlock)) {
    fail("EDITORIAL_REVIEW_QUEUE contém reviewedAt — nenhuma revisão material foi concluída.");
  }
  if (!/authorType:\s*"organization"/.test(queueBlock)) {
    fail("EDITORIAL_REVIEW_QUEUE não usa autoria 'organization'.");
  }
  if (!/imageOrigin:\s*"unknown"/.test(queueBlock)) {
    fail("EDITORIAL_REVIEW_QUEUE não marca imageOrigin como 'unknown'.");
  }
}

// ── 2. Conteúdo dos pilotos (fonte manual) ───────────────────
const contentSrc = read("src/data/blogPostsContent.tsx");
const progSrc = exists("src/data/blogProgrammaticPosts.tsx")
  ? read("src/data/blogProgrammaticPosts.tsx")
  : "";

// Extrai o bloco de cada slug (do "slug": { até o próximo "slug": { top-level).
const entryStarts = [...contentSrc.matchAll(/^ {2}"([a-z0-9-]+)":\s*\{/gm)];
const blocks = new Map();
for (let i = 0; i < entryStarts.length; i++) {
  const slug = entryStarts[i][1];
  const start = entryStarts[i].index;
  const end = i + 1 < entryStarts.length ? entryStarts[i + 1].index : contentSrc.length;
  blocks.set(slug, contentSrc.slice(start, end));
}

const titles = new Map();
const excerpts = new Map();

for (const slug of pilotSlugs) {
  const block = blocks.get(slug);
  if (!block) {
    fail(`Slug-piloto "${slug}" não existe em src/data/blogPostsContent.tsx.`);
    continue;
  }
  // Não pode ser programático (salvo justificativa — nesta rodada, nenhum é).
  if (new RegExp(`slug:\\s*"${slug}"`).test(progSrc)) {
    fail(`Slug-piloto "${slug}" é programático — esta rodada usa apenas artigos manuais.`);
  }

  const titleM = block.match(/title:\s*"([^"]+)"/);
  const excerptM = block.match(/excerpt:\s*"([^"]+)"/);
  if (!titleM) fail(`"${slug}" sem title.`);
  if (!excerptM) fail(`"${slug}" sem excerpt (description).`);
  if (titleM) titles.set(slug, titleM[1]);
  if (excerptM) excerpts.set(slug, excerptM[1]);

  // Links internos.
  const links = [...block.matchAll(/to="(\/[^"]*)"/g)].map((m) => m[1]);
  const serviceLinks = links.filter((l) => CURATED_SERVICE_ROUTES.has(l));
  if (serviceLinks.length === 0) {
    fail(`"${slug}" não possui link para serviço curado.`);
  }
  for (const l of links) {
    if (l.startsWith("/blog/")) {
      const target = l.replace("/blog/", "");
      if (!pilotSlugs.includes(target)) {
        fail(`"${slug}" aponta para artigo não-piloto: ${l}`);
      }
      continue;
    }
    if (l.startsWith("/problemas") || l.startsWith("/marcas")) {
      fail(`"${slug}" aponta para rota programática proibida: ${l}`);
      continue;
    }
    if (!ALLOWED_ROUTES.has(l)) {
      fail(`"${slug}" aponta para rota não curada/legada: ${l}`);
    }
  }

  const lower = block.toLowerCase();

  // Sem promessas / claims proibidos.
  const banned = [
    "sempre resolve", "solução definitiva", "garantimos", "100% seguro",
    "recuperação garantida", "resultado imediato", "o melhor técnico",
    "especialista sênior", "atendimento hoje", "como novo",
  ];
  for (const b of banned) {
    if (lower.includes(b)) fail(`"${slug}" contém expressão proibida: "${b}".`);
  }
  // Sem preço promocional dentro do artigo.
  if (/r\$\s*\d/.test(lower)) {
    fail(`"${slug}" contém preço no corpo do artigo (proibido nos pilotos).`);
  }
}

// Regras temáticas específicas (verificações objetivas por texto).
const themed = [
  { slug: "como-instalar-windows-11-do-zero", needs: ["não resolve"], msg: "formatação deve deixar claro que não resolve tudo" },
  { slug: "quando-trocar-hd-por-ssd", needs: ["não substitui"], msg: "SSD deve indicar que não substitui outros componentes" },
  { slug: "como-saber-se-pc-tem-virus-malware", needs: ["não é possível prometer", "ransomware"], msg: "vírus não pode prometer remoção sem risco e deve citar ransomware" },
  { slug: "como-melhorar-sinal-wifi-em-casa", needs: ["operadora", "rede local"], msg: "Wi-Fi deve diferenciar rede local e operadora" },
  { slug: "notebook-superaquecendo-o-que-fazer", needs: ["desligue", "bateria"], msg: "superaquecimento deve conter alertas de segurança" },
  { slug: "backup-como-proteger-seus-arquivos", needs: ["não há garantia"], msg: "backup não pode prometer recuperação" },
];
for (const t of themed) {
  const block = blocks.get(t.slug);
  if (!block) continue;
  const low = block.toLowerCase();
  for (const n of t.needs) {
    if (!low.includes(n.toLowerCase())) {
      fail(`"${t.slug}": ${t.msg} (faltou "${n}").`);
    }
  }
}

// Títulos e descrições únicos.
const titleVals = [...titles.values()];
if (new Set(titleVals).size !== titleVals.length) fail("Há títulos-piloto duplicados.");
const excVals = [...excerpts.values()];
if (new Set(excVals).size !== excVals.length) fail("Há descriptions-piloto duplicadas.");

// Introduções distintas (primeiro parágrafo com className="lead").
const intros = new Map();
for (const slug of pilotSlugs) {
  const block = blocks.get(slug);
  if (!block) continue;
  const m = block.match(/<p className="lead">([\s\S]*?)<\/p>/);
  if (m) intros.set(slug, m[1].replace(/\s+/g, " ").trim());
}
const introVals = [...intros.values()];
if (new Set(introVals).size !== introVals.length) fail("Há introduções-piloto idênticas.");

// ── 3. Sitemaps não contêm pilotos ──────────────────────────
const sitemapDir = rel("public");
const sitemaps = fs.readdirSync(sitemapDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"));
for (const sm of sitemaps) {
  const xml = fs.readFileSync(path.join(sitemapDir, sm), "utf8");
  for (const slug of pilotSlugs) {
    if (xml.includes(`/blog/${slug}`)) {
      fail(`Slug-piloto "${slug}" aparece no sitemap ${sm} — deve ficar fora do sitemap.`);
    }
  }
}

// ── 4. HTML estático (se dist existir) ──────────────────────
const distDir = rel("dist");
if (fs.existsSync(distDir)) {
  for (const slug of pilotSlugs) {
    const htmlPath = path.join(distDir, "blog", slug, "index.html");
    if (!fs.existsSync(htmlPath)) {
      fail(`HTML estático ausente para piloto: dist/blog/${slug}/index.html`);
      continue;
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    const selfUrl = `${SITE}/blog/${slug}`;
    if (!/name="robots"[^>]*content="noindex/i.test(html)) {
      fail(`"${slug}" HTML sem robots noindex.`);
    }
    if (!html.includes(`rel="canonical" href="${selfUrl}"`)) {
      fail(`"${slug}" canonical não é self-referente.`);
    }
    if (!html.includes(`property="og:url" content="${selfUrl}"`)) {
      fail(`"${slug}" og:url não é self-referente.`);
    }
    if (/"@type":\s*(\[[^\]]*)?"(BlogPosting|Article|TechArticle)"/.test(html)) {
      fail(`"${slug}" HTML emite schema de publicação (BlogPosting/Article/TechArticle).`);
    }
    if (/"@type":\s*"Person"/.test(html)) {
      fail(`"${slug}" HTML contém autor pessoal (Person).`);
    }
    if (!html.includes(`"name":"${BRAND}"`) && !html.includes(`"name": "${BRAND}"`)) {
      warn(`"${slug}" HTML sem publisher "${BRAND}" (verificar).`);
    }
  }
} else {
  warn("dist/ ausente — checagens de HTML estático puladas (rode npm run build antes do gate).");
}

// ── Relatório ────────────────────────────────────────────────
console.log("── check:editorial-pilot ──");
console.log(`Pilotos: ${pilotSlugs.length}`);
console.log(pilotSlugs.map((s) => `  • ${s}`).join("\n"));
if (warnings.length) {
  console.log("\nAvisos:");
  warnings.forEach((w) => console.log(`  ! ${w}`));
}
if (errors.length) {
  console.error("\n❌ FALHAS:");
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log("\n✅ Gate dos oito pilotos aprovado.");
