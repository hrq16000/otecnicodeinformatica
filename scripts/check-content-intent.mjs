#!/usr/bin/env node
/**
 * Gate: INTENÇÃO EDITORIAL (Rodada 8E) — fail-closed.
 *
 * Impede que o conteúdo editorial vire doorway ou canibalize as páginas
 * de serviço. Verifica, contra src/lib/contentIntentMap.ts:
 *
 *  1. Uma intenção por URL e nenhum par (tema × intenção) duplicado.
 *  2. Toda URL de /blog declarada no mapa está aprovada no registro
 *     editorial (nada indexável sem aprovação).
 *  3. As pontes declaradas (bridgesTo) existem de verdade no corpo do
 *     artigo — link contextual, não promessa em planilha.
 *  4. Nenhuma URL de doNotDuplicate é linkada como se fosse conteúdo
 *     equivalente, e o guia comercial não repete o passo a passo.
 *  5. Nenhuma rota editorial carrega cidade no slug (localização é
 *     função das páginas locais, não do conteúdo informacional).
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");

const falhas = [];
const notas = [];
const fail = (m) => falhas.push(m);
const note = (m) => notas.push(m);

const mapSrc = read("src/lib/contentIntentMap.ts");
const conteudo = read("src/data/blogPostsContent.tsx");
const registro = read("src/lib/blogEditorialRegistry.ts");

/** Extrai os nós declarados sem executar TypeScript. */
const nos = [...mapSrc.matchAll(/\{\s*\n\s*url:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)",\s*\n\s*topic:\s*"([^"]+)",[\s\S]*?bridgesTo:\s*\[([\s\S]*?)\],[\s\S]*?doNotDuplicate:\s*\[([\s\S]*?)\],/g)].map(
  (m) => ({
    url: m[1],
    intent: m[2],
    topic: m[3],
    bridgesTo: [...m[4].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
    doNotDuplicate: [...m[5].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  }),
);

if (nos.length === 0) fail("contentIntentMap: nenhum nó declarado (mapa vazio ou formato alterado)");

// 1. Unicidade de URL e de (tema × intenção).
const vistosUrl = new Set();
const vistosPar = new Set();
const CIDADES = /(curitiba|sao-jose-dos-pinhais|pinhais|colombo|araucaria|almirante-tamandare|campo-largo)/;

for (const n of nos) {
  if (vistosUrl.has(n.url)) fail(`URL declarada duas vezes no mapa: ${n.url}`);
  vistosUrl.add(n.url);

  const par = `${n.topic}::${n.intent}`;
  if (vistosPar.has(par)) fail(`tema × intenção duplicado (canibalização declarada): ${par}`);
  vistosPar.add(par);

  if (n.url.startsWith("/blog/") && CIDADES.test(n.url)) {
    fail(`rota editorial com cidade no slug (doorway): ${n.url}`);
  }
}

// 2, 3, 4 — apenas para as URLs editoriais.
for (const n of nos.filter((x) => x.url.startsWith("/blog/"))) {
  const slug = n.url.replace("/blog/", "");

  if (!new RegExp(`slug:\\s*"${slug}"`).test(registro)) {
    fail(`artigo do mapa sem aprovação no registro editorial: ${slug}`);
  }

  const bloco = extrairArtigo(conteudo, slug);
  if (!bloco) {
    fail(`artigo declarado no mapa não existe em blogPostsContent.tsx: ${slug}`);
    continue;
  }

  for (const destino of n.bridgesTo) {
    if (!bloco.includes(`to="${destino}"`)) {
      fail(`${slug}: ponte declarada ausente no corpo do artigo -> ${destino}`);
    }
  }

  // 4. O conteúdo comercial não pode reproduzir o tutorial.
  if (n.intent === "commercial") {
    const marcadoresTutorial = [
      "Redefinir este PC",
      "Media Creation Tool",
      "pendrive bootável",
      "setup.exe",
    ].filter((t) => bloco.includes(t));
    if (marcadoresTutorial.length) {
      fail(
        `${slug}: página comercial repete passo a passo do guia informacional (${marcadoresTutorial.join(", ")})`,
      );
    }
    // Valor citado precisa existir na fonte única de preços.
    const precos = read("src/lib/precosConfig.ts");
    for (const valor of [...bloco.matchAll(/R\$\s?[\d.]+,\d{2}/g)].map((m) => m[0])) {
      if (!precos.includes(valor.replace(/\s/g, " "))) {
        fail(`${slug}: valor "${valor}" não existe em src/lib/precosConfig.ts`);
      }
    }
  }
}

// 5. Nenhuma URL comercial e informacional do mesmo tema com o mesmo título.
const titulos = new Map();
for (const n of nos.filter((x) => x.url.startsWith("/blog/"))) {
  const slug = n.url.replace("/blog/", "");
  const t = (extrairArtigo(conteudo, slug) || "").match(/title:\s*"([^"]+)"/)?.[1];
  if (!t) continue;
  if (titulos.has(t)) fail(`título duplicado entre ${titulos.get(t)} e ${slug}`);
  titulos.set(t, slug);
}

function extrairArtigo(src, slug) {
  const i = src.indexOf(`"${slug}": {`);
  if (i === -1) return null;
  const prox = src.indexOf('\n  "', i + 5);
  return src.slice(i, prox === -1 ? src.length : prox);
}

note(`mapa de intenção: ${nos.length} URLs, ${vistosPar.size} pares tema × intenção únicos`);

console.log("── check:content-intent ──");
for (const n of notas) console.log(`  ✓ ${n}`);
if (falhas.length) {
  console.error(`\n✗ ${falhas.length} falha(s):`);
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("  ✓ nenhuma sobreposição de intenção detectada");
