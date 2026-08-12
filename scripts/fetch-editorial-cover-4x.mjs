/**
 * Onda 4X — capa editorial com FOTOGRAFIA REAL licenciada (sem IA).
 *
 * Baixa uma foto curada manualmente no Openverse por ID fixo, recorta em
 * 1200x630 e grava em public/blog/<slug>.jpg. Fail-closed: se o download
 * falhar, nada é escrito e nenhuma atribuição é inventada.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const UA = "otecnicodeinformatica/1.0 (contato via site)";

const CURADORIA = [
  {
    slug: "como-instalar-windows-11-do-zero",
    id: "d8410e51-f4e0-4ada-be56-9aedf9858d9e",
  },
  // Onda 4Y
  {
    slug: "como-resolver-tela-azul-windows",
    id: "f4da6064-dc69-4fca-adb2-62cd2e48904e",
  },
  {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    id: "fcc0aa98-ca11-420f-b06e-ea9be3fe365f",
  },
];

/** Fetch com retentativas — a origem (Wikimedia) recusa esporadicamente. */
async function fetchRetry(url, tries = 4) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "*/*" } });
      if (res.ok) return res;
    } catch { /* rede instável: nova tentativa */ }
    await new Promise((r) => setTimeout(r, 5000 * (i + 1)));
  }
  return null;
}

const DEST = resolve("public/blog");
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

for (const item of CURADORIA) {
  const alvo = resolve(DEST, `${item.slug}.jpg`);
  // Idempotente: capa já baixada não é rebaixada (evita 429 da origem).
  if (existsSync(alvo)) { console.log(`[capa] já existe ${item.slug}`); continue; }
  const metaRes = await fetchRetry(`https://api.openverse.org/v1/images/${item.id}/`);
  const meta = metaRes ? await metaRes.json() : null;
  if (!meta?.url) { console.error(`[capa] sem metadados: ${item.slug}`); process.exit(1); }
  const res = await fetchRetry(meta.url);
  if (!res) { console.error(`[capa] download falhou: ${item.slug}`); process.exit(1); }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = resolve(DEST, `${item.slug}.jpg`);
  await sharp(buf).rotate().resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`[capa] ok ${item.slug} — ${meta.creator} — CC ${String(meta.license).toUpperCase()} ${meta.license_version || ""} — ${meta.foreign_landing_url}`);
}
