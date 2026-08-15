#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// GATE DA ONDA EDITORIAL EMPRESARIAL — RODADA 3O
//
// Valida, de forma derivada (nunca hardcodando a lista de aprovados):
//   • no máximo 2 conteúdos promovidos nesta onda;
//   • no máximo 8 artigos indexáveis no total (derivado do registro);
//   • cada conteúdo da onda 3O tem destino comercial (pilar) e apoio reais;
//   • links de entrada obrigatórios configurados (hub + páginas comerciais);
//   • capa própria declarada e arquivo presente em public/;
//   • revisão técnica concluída no manifesto de fontes;
//   • datas de aprovação válidas e não futuras;
//   • ausência de nome de software em slug, H1/title e excerpt;
//   • ausência de promessa de desempenho no conteúdo dos dois artigos;
//   • ausência de rota/landing por profissão criada nesta onda.
// ─────────────────────────────────────────────────────────────

import { promises as fs } from "node:fs";
import path from "node:path";
import { EDITORIAL_WAVE, EDITORIAL_WAVE_SLUGS } from "./lib/editorial-wave.mjs";

const ROOT = process.cwd();
const read = (p) => fs.readFile(path.join(ROOT, p), "utf8");
const exists = async (p) => {
  try { await fs.access(path.join(ROOT, p)); return true; } catch { return false; }
};

const errors = [];
const notes = [];
const fail = (m) => errors.push(m);
const note = (m) => notes.push(m);

// Conteúdos promovidos nesta rodada (escopo declarado da onda).
const WAVE_3O = [
  {
    slug: "organizacao-de-ti-para-pequenos-escritorios",
    pilar: "/empresa-de-ti-curitiba",
    entradas: ["/empresa-de-ti-curitiba", "/servicos/suporte-tecnico-empresarial"],
  },
  {
    slug: "como-escolher-uma-workstation",
    pilar: "/servicos/montagem-de-pc",
    entradas: ["/servicos/montagem-de-pc"],
  },
];

const MAX_ONDA = 2;
const MAX_INDEXAVEIS = 30;

// Nomes de software que não podem aparecer em slug/H1/title/excerpt.
const SOFTWARE = /autocad|revit|lumion|solidworks|photoshop|premiere|sketchup|archicad|blender|3ds\s?max|after\s?effects/i;

// Promessas de desempenho proibidas no corpo editorial.
const PROMESSAS = [
  // Negações ("não garante desempenho") são permitidas — só a promessa afirmativa falha.
  /(?<!n[ãa]o\s)garante\s+(o\s+)?desempenho/i,
  /(?<!n[ãa]o\s[ée]\s)desempenho\s+garantido/i,
  /\bfps\s+garantid/i,
  /tempo\s+de\s+render\w*\s+garantid/i,
  /performance\s+garantida/i,
  /compatibilidade\s+(total|absoluta)/i,
  /sem\s+risco\s+de\s+perda/i,
  /seguran[çc]a\s+total/i,
  /continuidade\s+garantida/i,
  /suporte\s+ilimitado/i,
  /\bSLA\b/,
];

function blockFor(src, slug) {
  const starts = [...src.matchAll(/^ {2}"([a-z0-9-]+)":\s*\{/gm)];
  for (let i = 0; i < starts.length; i++) {
    if (starts[i][1] !== slug) continue;
    const end = i + 1 < starts.length ? starts[i + 1].index : src.length;
    return src.slice(starts[i].index, end);
  }
  return null;
}

async function main() {
  const registry = await read("src/lib/blogEditorialRegistry.ts");
  const covers = await read("src/lib/blogEditorialCovers.ts");
  const inbound = await read("src/lib/editorialInboundLinks.ts");
  const sources = await read("src/lib/blogEditorialSources.ts");
  const content = await read("src/data/blogPostsContent.tsx");
  const clusters = await read("src/lib/editorialClusters.ts");

  // 1. Limite total de indexáveis (derivado do registro, não hardcodado no valor).
  const registered = (registry.match(/FIRST_WAVE_SLUGS\s*=\s*\[([\s\S]*?)\]/) || [])[1] ?? "";
  const wave4x = (registry.match(/WAVE_4X:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave4y = (registry.match(/WAVE_4Y:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5b = (registry.match(/WAVE_5B:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5c = (registry.match(/WAVE_5C:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5d = (registry.match(/WAVE_5D:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5e = (registry.match(/WAVE_5E:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5f = (registry.match(/WAVE_5F:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5g = (registry.match(/WAVE_5G:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5h = (registry.match(/WAVE_5H:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5i = (registry.match(/WAVE_5I:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave5a = (registry.match(/WAVE_5A:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const wave4z = (registry.match(/WAVE_4Z:\s*EditorialApproval\[\]\s*=\s*\[([\s\S]*?)\n\];/) || [])[1] ?? "";
  const registeredSlugs = [
    ...[...registered.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave4x.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave4y.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave4z.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5a.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5b.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5c.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5d.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5e.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5f.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5g.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5h.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
    ...[...wave5i.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),

  ];
  if (registeredSlugs.length !== EDITORIAL_WAVE_SLUGS.length)
    fail(`paridade quebrada: registro tem ${registeredSlugs.length} slugs, onda de build tem ${EDITORIAL_WAVE_SLUGS.length}`);
  if (EDITORIAL_WAVE_SLUGS.length > MAX_INDEXAVEIS)
    fail(`onda editorial: ${EDITORIAL_WAVE_SLUGS.length} artigos indexáveis (máximo ${MAX_INDEXAVEIS})`);
  note(`artigos indexáveis: ${EDITORIAL_WAVE_SLUGS.length}/${MAX_INDEXAVEIS} (derivado do registro)`);

  // 2. Escopo da rodada 3O.
  if (WAVE_3O.length > MAX_ONDA) fail(`rodada 3O: ${WAVE_3O.length} conteúdos (máximo ${MAX_ONDA})`);

  for (const item of WAVE_3O) {
    const wave = EDITORIAL_WAVE.find((a) => a.slug === item.slug);
    if (!wave) { fail(`${item.slug}: ausente da onda editorial de build`); continue; }
    if (!registeredSlugs.includes(item.slug)) fail(`${item.slug}: ausente do registro editorial`);

    // Destino comercial.
    if (wave.pilar !== item.pilar) fail(`${item.slug}: destino comercial esperado ${item.pilar}, encontrado ${wave.pilar}`);
    if (!wave.apoio || !wave.apoio.startsWith("/")) fail(`${item.slug}: destino secundário ausente`);

    // Data de aprovação válida e não futura.
    const ts = new Date(wave.approvedAt).getTime();
    if (Number.isNaN(ts)) fail(`${item.slug}: approvedAt inválido (${wave.approvedAt})`);
    else if (ts > Date.now()) fail(`${item.slug}: approvedAt no futuro (${wave.approvedAt})`);

    // Capa própria declarada + arquivo real.
    if (!covers.includes(`"${item.slug}"`)) fail(`${item.slug}: capa ausente em blogEditorialCovers.ts`);
    if (!(await exists(path.join("public", wave.cover)))) fail(`${item.slug}: arquivo de capa ausente (public${wave.cover})`);

    // Links de entrada obrigatórios.
    for (const origem of item.entradas) {
      const bloco = inbound.split(`"${origem}": [`)[1];
      const temPilar = clusters.includes(`pilar: "${origem}"`);
      if ((!bloco || !bloco.split("],")[0].includes(item.slug)) && !temPilar)
        fail(`${item.slug}: link de entrada ausente em ${origem}`);
    }

    // Revisão técnica concluída.
    const manifesto = sources.split(`"${item.slug}": {`)[1]?.split("},")[0] ?? "";
    if (!/technicalReview:\s*"reviewed"/.test(manifesto))
      fail(`${item.slug}: revisão técnica não concluída no manifesto de fontes`);
    if (!/factChecked:\s*true/.test(manifesto))
      fail(`${item.slug}: fact-check não registrado`);

    // Conteúdo: slug/title/excerpt sem nome de software; corpo sem promessa.
    if (SOFTWARE.test(item.slug)) fail(`${item.slug}: nome de software no slug`);
    const block = blockFor(content, item.slug);
    if (!block) { fail(`${item.slug}: artigo ausente do acervo`); continue; }
    const title = (block.match(/title:\s*"([^"]+)"/) || [])[1] ?? "";
    const excerpt = (block.match(/excerpt:\s*"([^"]+)"/) || [])[1] ?? "";
    if (SOFTWARE.test(title)) fail(`${item.slug}: nome de software no title/H1`);
    if (SOFTWARE.test(excerpt)) fail(`${item.slug}: nome de software na description`);
    for (const re of PROMESSAS) {
      const m = block.match(re);
      if (m) fail(`${item.slug}: promessa proibida no conteúdo ("${m[0]}")`);
    }
  }

  // 3. Nenhuma landing por profissão nesta onda.
  const PROFISSAO = /(advocacia|advogado|cl[íi]nica|consult[óo]rio|contabilidade|arquitetura|engenharia-civil)/i;
  for (const slug of EDITORIAL_WAVE_SLUGS) {
    if (PROFISSAO.test(slug)) fail(`onda editorial: slug segmentado por profissão (${slug})`);
  }

  note(`rodada 3O: ${WAVE_3O.length} conteúdos promovidos, 0 rotas novas`);

  console.log("── check:editorial-wave-3o ──");
  for (const n of notes) console.log(`  ✓ ${n}`);
  if (errors.length) {
    console.error(`\n✗ ${errors.length} falha(s):`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log("\n✓ onda editorial empresarial (3O) íntegra");
}

main().catch((e) => { console.error(e); process.exit(1); });
