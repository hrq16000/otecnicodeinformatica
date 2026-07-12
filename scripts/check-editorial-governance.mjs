#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE EDITORIAL FAIL-CLOSED
// Valida que o ambiente editorial permanece fechado por padrão:
//  - registro editorial existe e inicia vazio (zero aprovados);
//  - BlogPost usa o registro (categoria não controla indexabilidade);
//  - nenhum autor pessoal fictício / cargo inventado;
//  - publisher institucional "Técnico em Curitiba";
//  - /blog lista apenas aprovados e permanece noindex sem aprovados;
//  - cada artigo possui HTML próprio com noindex,follow + canonical self;
//  - zero artigos/problemas/marcas em sitemap; sitemap principal = 33 URLs;
//  - nenhuma data editorial gerada no build / data futura.
// Falha com exit code != 0. Erros nunca são reduzidos a warnings.
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import path from "node:path";
import { getBlogPosts } from "./prerender-cities.mjs";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SITE = "https://tecnico.curitiba.br";

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
  // Nenhuma inserção de aprovação nesta fase.
  if (/APPROVED_EDITORIAL_CONTENT\.set\(/.test(src))
    fail("registro: nenhum artigo pode ser cadastrado como aprovado nesta fase (.set encontrado)");
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
  note("registro editorial: presente, tipado e vazio (fail-closed)");
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
  if (/"Técnico Curitiba"/.test(src))
    fail('BlogPost: publisher/autor deve usar "Técnico em Curitiba", não "Técnico Curitiba"');
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
  if (/programmaticPostsMeta|problemaSummaries|blogPostsContentBase/.test(src))
    fail("Blog hub: não pode listar posts programáticos/problemas/artigos não aprovados");
  if (!/Política editorial/.test(src))
    fail("Blog hub: seção de Política editorial ausente");
  note("Blog hub: lista apenas aprovados + política editorial visível");
}

// ── 4. HTML inicial dos artigos + hub ──────────────────────
async function checkStaticHtml(posts) {
  if (!(await exists(DIST))) { fail("dist/ ausente — rode o build antes do gate"); return; }

  // Hub /blog
  const hubPath = path.join(DIST, "blog", "index.html");
  if (!(await exists(hubPath))) {
    fail("HTML do hub /blog ausente (dist/blog/index.html)");
  } else {
    const h = await read(hubPath);
    const robots = h.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
    if (!robots || !/noindex/.test(robots[1])) fail("/blog: hub deve ser noindex no HTML inicial");
    if (count(h, /rel=["']canonical["']/gi) !== 1) fail("/blog: deve ter exatamente 1 canonical");
    if (!h.includes(`href="${SITE}/blog"`)) fail("/blog: canonical deve ser self (/blog)");
  }

  let checked = 0;
  for (const post of posts) {
    const fp = path.join(DIST, "blog", post.slug, "index.html");
    if (!(await exists(fp))) { fail(`artigo sem HTML próprio: /blog/${post.slug}`); continue; }
    const h = await read(fp);
    const url = `${SITE}/blog/${post.slug}`;

    // robots — exatamente 1, noindex,follow
    const robotsAll = h.match(/<meta\s+name=["']robots["'][^>]*>/gi) || [];
    if (robotsAll.length !== 1) fail(`/blog/${post.slug}: esperado exatamente 1 meta robots (achou ${robotsAll.length})`);
    else if (!/noindex,\s*follow/i.test(robotsAll[0])) fail(`/blog/${post.slug}: robots deve ser noindex, follow`);

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
    if (!/og:site_name["']\s+content=["']Técnico em Curitiba["']/.test(h))
      fail(`/blog/${post.slug}: og:site_name deve ser "Técnico em Curitiba"`);

    // Sem autor/cargo fictício
    if (/Técnico de Informática Sênior/.test(h)) fail(`/blog/${post.slug}: cargo fictício no HTML`);
    if (/"@type":"Person"/.test(h)) fail(`/blog/${post.slug}: Person no HTML`);
    if (/"Técnico Curitiba"/.test(h)) fail(`/blog/${post.slug}: marca divergente "Técnico Curitiba" no HTML`);

    checked++;
  }
  note(`HTML inicial: ${checked}/${posts.length} artigos verificados (noindex,follow + canonical self)`);
}

// ── 5. Sitemaps ────────────────────────────────────────────
async function checkSitemaps() {
  const pub = path.join(ROOT, "public");
  const files = (await fs.readdir(pub)).filter((f) => /^sitemap.*\.xml$/.test(f));
  for (const f of files) {
    const src = await read(path.join(pub, f));
    if (/\/blog\//.test(src) || /<loc>[^<]*\/blog<\/loc>/.test(src))
      fail(`sitemap ${f}: contém referência a /blog`);
    if (/\/problemas?\//.test(src)) fail(`sitemap ${f}: contém páginas de problemas`);
    if (/\/marcas?\//.test(src)) fail(`sitemap ${f}: contém páginas de marcas`);
  }
  // Sitemap principal (soma dos ativos) deve continuar com 33 URLs.
  const active = ["sitemap-main.xml", "sitemap-servicos.xml", "sitemap-regioes.xml", "sitemap-bairros.xml"];
  let total = 0;
  for (const f of active) {
    const fp = path.join(pub, f);
    if (await exists(fp)) total += count(await read(fp), /<loc>/gi);
  }
  if (total !== 33) fail(`sitemap principal: esperado 33 URLs, encontrou ${total}`);
  note(`sitemaps: 0 artigos/problemas/marcas; principal = ${total} URLs`);
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
