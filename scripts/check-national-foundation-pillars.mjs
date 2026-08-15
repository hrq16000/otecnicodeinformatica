#!/usr/bin/env node
/**
 * Gate: PILARES NACIONAIS (Rodada 9B).
 *
 * Valida os três pilares de fundamentos nacionais:
 *   1. Existem no conteúdo do blog e estão aprovados no registro editorial.
 *   2. Capa é fotografia real licenciada (imageOrigin !== "generated").
 *   3. Arquivo de capa existe em public/blog/.
 *   4. FAQ própria (override não comercial) no BlogPostFAQ.
 *   5. Conteúdo sem menção a localidades (escopo nacional).
 *   6. Interlinking obrigatório entre os três pilares.
 *   7. Presentes na coorte de observação 9B.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");

const SLUGS = ["o-que-e-informatica", "informatica-basica", "como-aprender-informatica"];
const LOCALIDADES = [
  "Curitiba",
  "Paraná",
  "São José dos Pinhais",
  "Pinhais",
  "Colombo",
  "Araucária",
  "Campo Largo",
];

const falhas = [];
const notas = [];
const fail = (m) => falhas.push(m);
const note = (m) => notas.push(m);

const conteudo = read("src/data/blogPostsContent.tsx");
const registry = read("src/lib/blogEditorialRegistry.ts");
const covers = read("src/lib/blogEditorialCovers.ts");
const faq = read("src/components/BlogPostFAQ.tsx");
const cohort = read("src/lib/nationalFoundationCohort.ts");

for (const slug of SLUGS) {
  // 1. conteúdo
  const key = `"${slug}":`;
  const i = conteudo.indexOf(key);
  if (i === -1) {
    fail(`${slug}: ausente em src/data/blogPostsContent.tsx`);
    continue;
  }
  const fim = conteudo.indexOf("\n  },\n", i);
  const corpo = conteudo.slice(i, fim === -1 ? conteudo.length : fim);

  // 2. registro editorial aprovado, capa licenciada
  const r = registry.indexOf(`slug: "${slug}",`);
  if (r === -1) fail(`${slug}: ausente em blogEditorialRegistry.ts`);
  else {
    const bloco = registry.slice(r, registry.indexOf("  },", r));
    if (!bloco.includes('status: "approved"')) fail(`${slug}: não aprovado no registro`);
    if (bloco.includes('imageOrigin: "generated"'))
      fail(`${slug}: capa marcada como gerada (proibido — usar fotografia real licenciada)`);
    if (!/imageAttribution:/.test(bloco)) fail(`${slug}: sem atribuição de imagem`);
  }

  // 3. arquivo de capa
  if (!covers.includes(`"${slug}": {`)) fail(`${slug}: sem capa em blogEditorialCovers.ts`);
  if (!existsSync(path.join(ROOT, "public", "blog", `${slug}.jpg`)))
    fail(`${slug}: arquivo public/blog/${slug}.jpg não encontrado`);

  // 4. FAQ própria
  if (!faq.includes(`"${slug}": [`)) fail(`${slug}: sem FAQ editorial própria (override)`);

  // 5. escopo nacional
  for (const loc of LOCALIDADES) {
    if (corpo.includes(loc)) fail(`${slug}: menção local proibida em pilar nacional ("${loc}")`);
  }

  // 6. interlinking entre pilares
  for (const outro of SLUGS.filter((s) => s !== slug)) {
    if (!corpo.includes(`/blog/${outro}`)) fail(`${slug}: sem link interno para /blog/${outro}`);
  }

  // 7. coorte
  if (!cohort.includes(`"${slug}"`)) fail(`${slug}: fora da coorte national_foundations_9b`);

  // 8. blocos editoriais obrigatórios (refinamento 9B)
  if (!/<h2[^>]*>Leia também<\/h2>/.test(corpo)) fail(`${slug}: sem bloco "Leia também"`);
  if (!/Glossário/.test(corpo)) fail(`${slug}: sem glossário de termos`);
  if (!/<h2>Referências e fontes<\/h2>/.test(corpo)) fail(`${slug}: sem "Referências e fontes"`);
  const externas = [...corpo.matchAll(/href="https?:\/\//g)].length;
  if (externas < 3) fail(`${slug}: só ${externas} fonte(s) externa(s) citada(s) (mínimo 3)`);
  if (/href="https?:\/\/[^"]+"(?![^>]*rel="[^"]*nofollow)/.test(corpo))
    fail(`${slug}: link externo sem rel="nofollow noopener"`);

  const palavras = corpo.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (palavras < 900) fail(`${slug}: conteúdo raso (${palavras} palavras)`);
  note(`${slug}: ${palavras} palavras, capa licenciada, FAQ própria, glossário + ${externas} fontes`);
}

console.log("── check:national-foundation-pillars ──");
for (const n of notas) console.log(`  ✓ ${n}`);
if (falhas.length) {
  console.error(`\n✗ ${falhas.length} falha(s):`);
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("  ✓ pilares nacionais da Rodada 9B conformes");
