/**
 * Etapa 10 — fotografia REAL licenciada (sem IA).
 *
 * Busca fotos com licença comercial no Openverse (agregador de CC),
 * baixa para public/fotos/ e grava o manifesto de créditos em
 * src/lib/fotosLicenciadas.ts (URL de origem, autor, licença, atribuição).
 *
 * Fail-closed: se uma busca não retornar foto utilizável, a entrada é
 * omitida do manifesto — nenhuma imagem é inventada ou gerada.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const UA = "otecnicodeinformatica/1.0 (contato via site)";
const DEST = resolve("public/fotos");
const OUT = resolve("src/lib/fotosLicenciadas.ts");

const ALVOS = [
  { slug: "bancada-tecnica", q: "computer repair workbench", alt: "Bancada com computador aberto durante manutenção técnica" },
  { slug: "notebook-manutencao", q: "laptop repair technician", alt: "Técnico realizando manutenção em notebook" },
  { slug: "rede-cabeamento", q: "network cables rack", alt: "Rack de rede com cabeamento organizado" },
  { slug: "roteador-wifi", q: "wifi router home", alt: "Roteador Wi-Fi instalado em ambiente residencial" },
  { slug: "escritorio-empresa", q: "office computers workplace", alt: "Estações de trabalho em escritório de empresa" },
  { slug: "armazenamento-dados", q: "hard drive ssd storage", alt: "Unidades de armazenamento HD e SSD sobre bancada" },
];

const LICENCAS_OK = new Set(["cc0", "pdm", "by", "by-sa"]);

async function buscar(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial&page_size=12&mature=false`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.results || []).find(
    (r) => LICENCAS_OK.has(r.license) && r.url && /\.(jpe?g|png)$/i.test(new URL(r.url).pathname),
  );
}

async function baixar(url, destino) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength < 20_000) return false;
  writeFileSync(destino, buf);
  return true;
}

const main = async () => {
  if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
  const manifesto = [];

  for (const alvo of ALVOS) {
    try {
      const foto = await buscar(alvo.q);
      if (!foto) {
        console.warn(`[fotos] sem resultado utilizável para "${alvo.q}"`);
        continue;
      }
      const ext = new URL(foto.url).pathname.split(".").pop().toLowerCase();
      const arquivo = `${alvo.slug}.${ext === "jpeg" ? "jpg" : ext}`;
      const ok = await baixar(foto.url, resolve(DEST, arquivo));
      if (!ok) {
        console.warn(`[fotos] download falhou: ${alvo.slug}`);
        continue;
      }
      manifesto.push({
        slug: alvo.slug,
        src: `/fotos/${arquivo}`,
        alt: alvo.alt,
        autor: foto.creator || "Autor não informado",
        autorUrl: foto.creator_url || "",
        origem: foto.foreign_landing_url || foto.url,
        licenca: `CC ${String(foto.license).toUpperCase()}${foto.license_version ? ` ${foto.license_version}` : ""}`,
        licencaUrl: foto.license_url || "",
        fonte: foto.source || "openverse",
      });
      console.log(`[fotos] ok ${alvo.slug} — ${foto.license}`);
    } catch (e) {
      console.warn(`[fotos] erro em ${alvo.slug}: ${e.message}`);
    }
  }

  const ts = `// GERADO por scripts/fetch-real-photos.mjs — não editar à mão.
// Fotografias reais com licença comercial (Openverse). Nenhuma imagem de IA.

export type FotoLicenciada = {
  slug: string;
  src: string;
  alt: string;
  autor: string;
  autorUrl: string;
  origem: string;
  licenca: string;
  licencaUrl: string;
  fonte: string;
};

export const FOTOS_LICENCIADAS: FotoLicenciada[] = ${JSON.stringify(manifesto, null, 2)};

export const foto = (slug: string): FotoLicenciada | undefined =>
  FOTOS_LICENCIADAS.find((f) => f.slug === slug);
`;
  writeFileSync(OUT, ts);
  console.log(`[fotos] manifesto com ${manifesto.length} imagens`);
};

await main();
