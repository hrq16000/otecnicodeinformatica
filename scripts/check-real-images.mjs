#!/usr/bin/env node
/**
 * GATE DE IMAGENS REAIS (por página de problema e por bairro).
 *
 * Valida, antes de liberar indexação:
 *   - presença: a foto declarada existe em public/
 *   - tamanho: arquivo acima do mínimo (placeholder/ícone não passa)
 *   - autenticidade: nada de placeholder.svg ou nome "placeholder/ia/ai-"
 *   - exclusividade: hash único por página (reuso é reportado por URL)
 *
 * Falha (exit 1) em foto ausente, placeholder ou arquivo pequeno demais.
 * Reuso de foto NÃO derruba o build: entra no relatório e bloqueia a URL no
 * painel de publicação (`pronto para sitemap`).
 *
 * Saída: reports/real-images.json
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";

const MIN_BYTES = 20_000;
const PLACEHOLDER = /placeholder|lorem|mock|dummy|\bia-|\bai-generated/i;

const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");

/** slug → src das fotos licenciadas (fonte única gerada). */
const fotos = new Map();
for (const m of read("src/lib/fotosLicenciadas.ts").matchAll(
  /"slug":\s*"([^"]+)"[\s\S]{0,120}?"src":\s*"([^"]+)"/g,
)) {
  fotos.set(m[1], m[2]);
}

/** Páginas de problema: path + foto declarada. */
const problemas = [];
{
  const src = read("src/lib/clusterProblemas.ts");
  const re = /path:\s*"(\/problemas\/[a-z0-9-]+)"([\s\S]*?)(?=\n\s{2}\{\s*\n\s*slug:|\n\];)/g;
  for (const m of src.matchAll(re)) {
    const foto = /foto:\s*"([a-z0-9-]+)"/.exec(m[2])?.[1] ?? null;
    problemas.push({ path: m[1], grupo: "problema", foto });
  }
}

/** Bairros âncora indexáveis. */
const bairros = [];
{
  const src = read("src/lib/bairrosData.ts");
  for (const m of src.matchAll(/\n\s{4}slug:\s*"([a-z0-9-]+)"/g)) {
    bairros.push({ path: `/bairros/${m[1]}`, grupo: "bairro", foto: null });
  }
}

const hashes = new Map(); // hash → [paths]
const errors = [];
const itens = [];

for (const item of [...problemas, ...bairros]) {
  const src = item.foto ? fotos.get(item.foto) : null;
  const file = src ? `public${src}` : null;

  if (!src) {
    itens.push({ ...item, status: "sem_foto", bytes: 0, hash: null, exclusiva: false });
    continue;
  }
  if (PLACEHOLDER.test(src)) {
    errors.push(`${item.path}: imagem placeholder (${src})`);
    itens.push({ ...item, src, status: "placeholder", bytes: 0, hash: null, exclusiva: false });
    continue;
  }
  if (!file || !existsSync(file)) {
    errors.push(`${item.path}: arquivo ausente (${src})`);
    itens.push({ ...item, src, status: "ausente", bytes: 0, hash: null, exclusiva: false });
    continue;
  }
  const bytes = statSync(file).size;
  if (bytes < MIN_BYTES) {
    errors.push(`${item.path}: imagem pequena demais (${bytes}B < ${MIN_BYTES}B) em ${src}`);
  }
  const hash = createHash("sha1").update(readFileSync(file)).digest("hex").slice(0, 12);
  hashes.set(hash, [...(hashes.get(hash) ?? []), item.path]);
  itens.push({ ...item, src, bytes, hash, status: bytes < MIN_BYTES ? "pequena" : "ok" });
}

for (const item of itens) {
  item.exclusiva = item.hash ? (hashes.get(item.hash) ?? []).length === 1 : false;
  item.compartilhadaCom = item.hash ? (hashes.get(item.hash) ?? []).filter((p) => p !== item.path) : [];
}

const relatorio = {
  generatedAt: new Date().toISOString(),
  minBytes: MIN_BYTES,
  total: itens.length,
  comFoto: itens.filter((i) => i.status === "ok" || i.status === "pequena").length,
  exclusivas: itens.filter((i) => i.exclusiva).length,
  semFoto: itens.filter((i) => i.status === "sem_foto").map((i) => i.path),
  itens,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/real-images.json", `${JSON.stringify(relatorio, null, 2)}\n`);

console.log(
  `Imagens reais: ${relatorio.comFoto}/${relatorio.total} páginas com foto · ${relatorio.exclusivas} exclusivas`,
);
if (relatorio.semFoto.length) {
  console.log(`Sem foto (não bloqueia build, bloqueia sitemap no painel): ${relatorio.semFoto.length}`);
}
const reusadas = [...hashes.values()].filter((v) => v.length > 1);
for (const grupo of reusadas) console.log(`  ↺ foto compartilhada: ${grupo.join(", ")}`);

if (errors.length) {
  console.error(`\n✖ ${errors.length} problema(s) de imagem:`);
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}
console.log("✔ Nenhuma imagem ausente, placeholder ou pequena demais.");
