#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE EDITORIAL FAIL-CLOSED
// Valida que o ambiente editorial permanece fechado por padrão:
//  - registro editorial existe e inicia vazio (zero aprovados);
//  - BlogPost usa o registro (categoria não controla indexabilidade);
//  - nenhum autor pessoal fictício / cargo inventado;
//  - publisher institucional "O Técnico de Informática";
//  - /blog lista apenas aprovados e permanece noindex sem aprovados;
//  - cada artigo possui HTML próprio com noindex,follow + canonical self;
//  - zero artigos/problemas/marcas em sitemap; sitemap principal = manifesto curado (scripts/lib/curated-urls.mjs);
//  - nenhuma data editorial gerada no build / data futura.
// Falha com exit code != 0. Erros nunca são reduzidos a warnings.
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import { WHATSAPP_NUMBER, BASE_URL } from "./lib/site-env.mjs";
import path from "node:path";
import { getBlogPosts } from "./prerender-cities.mjs";
import { EDITORIAL_WAVE, EDITORIAL_WAVE_SLUGS, isWaveApproved } from "./lib/editorial-wave.mjs";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SITE = BASE_URL;

const errors = [];
const notes = [];
const fail = (m) => errors.push(m);
const note = (m) => notes.push(m);

async function read(p) {
  return fs.readFile(p, "utf8");
}
async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
function count(hay, re) {
  return (hay.match(re) || []).length;
}

// ── 1. Registro editorial ──────────────────────────────────
async function checkRegistry() {
  const p = path.join(ROOT, "src/lib/blogEditorialRegistry.ts");
  if (!(await exists(p))) { fail("registro editorial ausente (src/lib/blogEditorialRegistry.ts)"); return; }
  const src = await read(p);
  if (!/APPROVED_EDITORIAL_CONTENT\s*=\s*new Map/.test(src))
    fail("registro: APPROVED_EDITORIAL_CONTENT deve ser um Map tipado");
  // Padrão fail-closed: default draft.
  if (!/\?\?\s*"draft"/.test(src))
    fail('registro: getEditorialStatus deve retornar "draft" por padrão (fail-closed)');
  // Aprovação exige status approved.
  if (!/status\s*!==\s*"approved"/.test(src))
    fail("registro: aprovação deve exigir status === approved");
  // Aprovação exige imagem !== unknown.
  if (!/imageOrigin\s*===\s*"unknown"/.test(src))
    fail("registro: aprovação deve rejeitar imageOrigin unknown");
  // Aprovação exige data real (approvedAt).
  if (!/approvedAt/.test(src))
    fail("registro: aprovação deve exigir approvedAt (data real)");
  // Rejeita data futura.
  if (!/>\s*Date\.now\(\)/.test(src))
    fail("registro: aprovação deve rejeitar data de aprovação no futuro");

  // Paridade runtime × build: o registro só pode aprovar slugs da onda.
  const waveBlock = src.match(/FIRST_WAVE_SLUGS\s*=\s*\[([\s\S]*?)\]/);
  const wave4xBlock = src.match(/WAVE_4X:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const wave4yBlock = src.match(/WAVE_4Y:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const wave4zBlock = src.match(/WAVE_4Z:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const wave5bBlock = src.match(/WAVE_5B:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const wave5cBlock = src.match(/WAVE_5C:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const wave5dBlock = src.match(/WAVE_5D:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const wave5aBlock = src.match(/WAVE_5A:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/);
  const registered = [
    ...(waveBlock ? [...waveBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
    ...(wave4xBlock ? [...wave4xBlock[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
    ...(wave4yBlock ? [...wave4yBlock[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
    ...(wave4zBlock ? [...wave4zBlock[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
    ...(wave5aBlock ? [...wave5aBlock[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
    ...(wave5bBlock ? [...wave5bBlock[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
    ...(wave5cBlock ? [...wave5cBlock[1].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]) : []),
  ];
  const extra = registered.filter((s) => !EDITORIAL_WAVE_SLUGS.includes(s));
  const missing = EDITORIAL_WAVE_SLUGS.filter((s) => !registered.includes(s));
  if (extra.length) fail(`registro: slugs aprovados fora da onda editorial: ${extra.join(", ")}`);
  if (missing.length) fail(`registro: slugs da onda ausentes no registro: ${missing.join(", ")}`);
  note(`registro editorial: fail-closed + ${registered.length} aprovados em paridade com a onda`);

}

// ── 2. Runtime BlogPost ────────────────────────────────────
async function checkBlogPostRuntime() {
  const p = path.join(ROOT, "src/pages/BlogPost.tsx");
  const src = await read(p);
  if (!/from\s+["']@\/lib\/blogEditorialRegistry["']/.test(src))
    fail("BlogPost: não importa o registro editorial");
  if (!/isEditorialApproved\(/.test(src))
    fail("BlogPost: não consulta isEditorialApproved");
  if (/Técnico de Informática Sênior/.test(src))
    fail('BlogPost: cargo fictício "Técnico de Informática Sênior" ainda presente');
  if (/"@type":\s*"Person"/.test(src))
    fail("BlogPost: schema Person fictício ainda presente");
  if (/jobTitle/.test(src))
    fail("BlogPost: jobTitle fictício ainda presente");
  if (/OFF_TOPIC_BLOG_CATEGORIES|isOffTopicCategory/.test(src))
    fail("BlogPost: categoria não pode controlar indexabilidade (lógica off-topic presente)");
  // Publisher institucional oficial.
  if (/"O Técnico de Informática"/.test(src))
    fail('BlogPost: publisher/autor deve usar "O Técnico de Informática", não "O Técnico de Informática"');
  // dateModified não pode ser gerado no build.
  if (/dateModified[\s\S]{0,80}(new Date\(\)|Date\.now\(\))/.test(src))
    fail("BlogPost: dateModified não pode ser gerado no build");
  note("BlogPost runtime: registro editorial + autoria institucional OK");
}

// ── 3. Runtime Blog (hub) ──────────────────────────────────
async function checkBlogHubRuntime() {
  const p = path.join(ROOT, "src/pages/Blog.tsx");
  const src = await read(p);
  if (!/getApprovedSlugs/.test(src))
    fail("Blog hub: não usa getApprovedSlugs para a listagem");
  if (!/noindex/.test(src))
    fail("Blog hub: deve permanecer noindex sem artigos aprovados");
  if (/programmaticPostsMeta|problemaSummaries/.test(src))
    fail("Blog hub: não pode listar posts programáticos/problemas");
  if (/blogPostsContentBase/.test(src) && !/approvedSlugs/.test(src))
    fail("Blog hub: conteúdo só pode ser lido para slugs aprovados");

  if (!/Política editorial/.test(src))
    fail("Blog hub: seção de Política editorial ausente");
  note("Blog hub: lista apenas aprovados + política editorial visível");
}

// ── 4. HTML inicial dos artigos + hub ──────────────────────
async function checkStaticHtml(posts) {
  if (!(await exists(DIST))) { fail("dist/ ausente — rode o build antes do gate"); return; }

  // Hub /blog — indexável apenas com massa editorial aprovada (>= 3).
  const hubShouldIndex = EDITORIAL_WAVE_SLUGS.length >= 3;
  const hubPath = path.join(DIST, "blog", "index.html");
  if (!(await exists(hubPath))) {
    fail("HTML do hub /blog ausente (dist/blog/index.html)");
  } else {
    const h = await read(hubPath);
    const robots = h.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
    if (!robots) fail("/blog: meta robots ausente");
    else if (hubShouldIndex && /noindex/.test(robots[1]))
      fail("/blog: hub deve ser indexável com artigos aprovados na onda");
    else if (!hubShouldIndex && !/noindex/.test(robots[1]))
      fail("/blog: hub deve ser noindex sem massa editorial aprovada");
    if (count(h, /rel=["']canonical["']/gi) !== 1) fail("/blog: deve ter exatamente 1 canonical");
    if (!h.includes(`href="${SITE}/blog"`)) fail("/blog: canonical deve ser self (/blog)");
    if (hubShouldIndex) {
      for (const slug of EDITORIAL_WAVE_SLUGS) {
        if (!h.includes(`/blog/${slug}`)) fail(`/blog: hub estático não linka /blog/${slug}`);
      }
    }
  }


  let checked = 0;
  for (const post of posts) {
    const fp = path.join(DIST, "blog", post.slug, "index.html");
    if (!(await exists(fp))) { fail(`artigo sem HTML próprio: /blog/${post.slug}`); continue; }
    const h = await read(fp);
    const url = `${SITE}/blog/${post.slug}`;

    const approved = isWaveApproved(post.slug);

    // robots — exatamente 1; noindex,follow fora da onda, index,follow na onda
    const robotsAll = h.match(/<meta\s+name=["']robots["'][^>]*>/gi) || [];
    if (robotsAll.length !== 1) fail(`/blog/${post.slug}: esperado exatamente 1 meta robots (achou ${robotsAll.length})`);
    else if (approved) {
      if (/noindex/i.test(robotsAll[0])) fail(`/blog/${post.slug}: artigo da onda deve ser index, follow`);
    } else if (!/noindex,\s*follow/i.test(robotsAll[0])) {
      fail(`/blog/${post.slug}: robots deve ser noindex, follow`);
    }

    if (approved) {
      // Conteúdo estático próprio + rich results do artigo.
      if (!/"@type":\s*\[\s*"BlogPosting"/.test(h)) fail(`/blog/${post.slug}: BlogPosting ausente no HTML estático`);
      if (!/"@type":\s*"BreadcrumbList"/.test(h)) fail(`/blog/${post.slug}: BreadcrumbList ausente`);
      if (count(h, /<h1[\s>]/gi) !== 1) fail(`/blog/${post.slug}: HTML estático deve ter exatamente 1 <h1>`);
      const wave = EDITORIAL_WAVE.find((a) => a.slug === post.slug);
      if (!h.includes(`content="${SITE}${wave.cover}`)) fail(`/blog/${post.slug}: og:image deve usar a capa exclusiva`);
      if (!h.includes(`href="${wave.pilar}"`)) fail(`/blog/${post.slug}: link interno ao pilar ausente`);
      if (!h.includes('href="/blog"')) fail(`/blog/${post.slug}: link ao hub /blog ausente`);
      // O CTA editorial passa pela triagem central, nunca por wa.me direto
      // (ver check:editorial-no-direct-wa) — aqui exigimos que ele exista.
      if (!/data-cta-location="editorial_static"/.test(h))
        fail(`/blog/${post.slug}: CTA editorial de triagem ausente`);

    }


    // canonical — exatamente 1, self
    const canonAll = h.match(/<link\s+rel=["']canonical["'][^>]*>/gi) || [];
    if (canonAll.length !== 1) fail(`/blog/${post.slug}: esperado exatamente 1 canonical (achou ${canonAll.length})`);
    else if (!canonAll[0].includes(url)) fail(`/blog/${post.slug}: canonical deve ser self`);
    if (canonAll[0] && canonAll[0].includes(`"${SITE}/"`)) fail(`/blog/${post.slug}: canonical não pode ser da home`);

    // title / description — exatamente 1
    if (count(h, /<title>/gi) !== 1) fail(`/blog/${post.slug}: esperado exatamente 1 <title>`);
    if (count(h, /<meta\s+name=["']description["']/gi) !== 1) fail(`/blog/${post.slug}: esperado exatamente 1 description`);

    // og:url self
    const ogUrl = h.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i);
    if (!ogUrl || ogUrl[1] !== url) fail(`/blog/${post.slug}: og:url deve ser self`);

    // og:site_name oficial
    if (!/og:site_name["']\s+content=["']O Técnico de Informática["']/.test(h))
      fail(`/blog/${post.slug}: og:site_name deve ser "O Técnico de Informática"`);

    // Sem autor/cargo fictício no schema editorial injetado.
    // O publisher DEVE ser a organização oficial ("O Técnico de Informática");
    // o autor nunca pode ser uma pessoa inventada.
    if (/Técnico de Informática Sênior/.test(h)) fail(`/blog/${post.slug}: cargo fictício no HTML`);
    if (/"@type":\s*"Person"/.test(h)) fail(`/blog/${post.slug}: Person no HTML`);
    if (/"author":/.test(h) && !/"author":\s*\{[^}]*"@type":\s*"Organization"/.test(h))
      fail(`/blog/${post.slug}: autor deve ser a organização, nunca uma pessoa`);
    const publisher = h.match(/"publisher":\s*\{[^}]*\}/)?.[0];
    if (publisher && !(publisher.includes('"Organization"') && publisher.includes("O Técnico de Informática")))
      fail(`/blog/${post.slug}: publisher divergente no schema`);


    checked++;
  }
  note(`HTML inicial: ${checked}/${posts.length} artigos verificados (${EDITORIAL_WAVE_SLUGS.length} indexáveis da onda)`);
}

// ── 5. Sitemaps ────────────────────────────────────────────
async function checkSitemaps() {
  const pub = path.join(ROOT, "public");
  const files = (await fs.readdir(pub)).filter((f) => /^sitemap.*\.xml$/.test(f));
  const { PROBLEMAS: CURATED_PROBLEMAS } = await import("./lib/curated-urls.mjs");
  const allowedProblemas = new Set(CURATED_PROBLEMAS.map((e) => e.path));
  const allowedBlog = new Set([
    `${SITE}/blog`,
    ...EDITORIAL_WAVE_SLUGS.map((s) => `${SITE}/blog/${s}`),
  ]);
  for (const f of files) {
    const src = await read(path.join(pub, f));
    for (const m of src.matchAll(/<loc>([^<]*\/blog[^<]*)<\/loc>/g)) {
      if (!allowedBlog.has(m[1]))
        fail(`sitemap ${f}: URL de blog fora da onda editorial (${m[1]})`);
    }
    // Páginas de problema são indexáveis desde a onda 3B/3C: só podem estar no
    // sitemap se declaradas no manifesto curado (fonte única), nunca por acaso.
    for (const m of src.matchAll(/<loc>[^<]*?(\/problemas?\/[^<]*)<\/loc>/g)) {
      if (!allowedProblemas.has(m[1]))
        fail(`sitemap ${f}: página de problema fora do manifesto curado (${m[1]})`);
    }
    if (/\/marcas?\//.test(src)) fail(`sitemap ${f}: contém páginas de marcas`);
  }

  // Expectativa derivada do manifesto curado — nunca de um número fixo.
  const { ACTIVE_SITEMAPS, CURATED_PATHS } = await import("./lib/curated-urls.mjs");
  let total = 0;
  for (const [f] of ACTIVE_SITEMAPS) {
    const fp = path.join(pub, f);
    if (await exists(fp)) total += count(await read(fp), /<loc>/gi);
  }
  if (total !== CURATED_PATHS.length)
    fail(
      `sitemap principal: manifesto curado declara ${CURATED_PATHS.length} URLs, sitemap emitiu ${total} (rode npm run sitemap)`,
    );
  note(`sitemaps: blog/problemas/marcas conforme manifesto curado; principal = ${total} URLs`);
}

// ── 6. Datas ───────────────────────────────────────────────
async function checkDates(posts) {
  const now = Date.now();
  for (const post of posts) {
    const d = new Date(post.date).getTime();
    if (!Number.isNaN(d) && d > now) fail(`/blog/${post.slug}: data futura (${post.date})`);
  }
  // Fontes editoriais não podem gerar datas no build.
  const bp = await read(path.join(ROOT, "src/pages/BlogPost.tsx"));
  if (/date[A-Za-z]*\s*[:=][\s\S]{0,40}(new Date\(\)|Date\.now\(\))/.test(bp))
    fail("BlogPost: data editorial não pode usar new Date()/Date.now()");
  note("datas: sem datas futuras nem geração no build");
}

async function main() {
  const { posts, duplicates } = await getBlogPosts(".");
  note(`inventário: ${posts.length} artigos únicos (${posts.filter(p => p.origin === "manual").length} manuais, ${posts.filter(p => p.origin === "programmatic").length} programáticos)`);
  if (duplicates.length) note(`slugs duplicados ignorados: ${duplicates.length} (${duplicates.join(", ")})`);

  await checkRegistry();
  await checkBlogPostRuntime();
  await checkBlogHubRuntime();
  await checkStaticHtml(posts);
  await checkSitemaps();
  await checkDates(posts);

  console.log("── check:editorial-governance ──");
  for (const n of notes) console.log(`  ✓ ${n}`);
  if (errors.length) {
    console.error(`\n✗ ${errors.length} falha(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log("\n✓ governança editorial fail-closed OK");
}

main().catch((err) => { console.error(err); process.exit(1); });
