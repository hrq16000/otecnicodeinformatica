/**
 * Etapa 10 — fotografia REAL licenciada (sem IA).
 *
 * Baixa fotos curadas manualmente no Openverse (agregador de Creative
 * Commons) por ID fixo, grava em public/fotos/ e gera o manifesto de
 * créditos em src/lib/fotosLicenciadas.ts (origem, autor, licença, URL da
 * licença). IDs fixos = build determinístico e curadoria revisada.
 *
 * Fail-closed: foto que não baixar fica fora do manifesto — nada é gerado
 * por IA e nenhuma atribuição é inventada.
 */
// @ts-nocheck

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const UA = "otecnicodeinformatica/1.0 (contato via site)";
const DEST = resolve("public/fotos");
const OUT = resolve("src/lib/fotosLicenciadas.ts");

/** Curadoria revisada visualmente (nenhuma imagem sintética). */
const CURADORIA = [
  { slug: "bancada-tecnica", id: "4795b5a0-5664-4991-9cfb-e6ccb008fb04", alt: "Interior de computador desktop aberto durante manutenção" },
  { slug: "rede-cabeamento", id: "d08b5d37-27bb-4bb4-a24f-92d48fa6d0c1", alt: "Computador e roteador com cabos de rede desorganizados" },
  { slug: "infra-empresa", id: "896df346-b6e4-4855-b9b8-7a65cc3a758d", alt: "Sala de servidores com racks alinhados" },
  { slug: "estacao-trabalho", id: "e90a79ef-838b-4fef-8fb9-969ae98581b0", alt: "Estação de trabalho com monitor, teclado e periféricos" },
  { slug: "roteador-wifi", id: "8f506850-b2c6-4044-a606-493c1bc4ca62", alt: "Roteador Wi-Fi doméstico com antenas" },
  { slug: "placa-eletronica", id: "bef1e65a-161e-4d10-afc7-0563eeb43643", alt: "Detalhe macro de placa eletrônica com componentes" },
];

async function detalhe(id) {
  const res = await fetch(`https://api.openverse.org/v1/images/${id}/`, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  return res.json();
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

  for (const item of CURADORIA) {
    try {
      const foto = await detalhe(item.id);
      if (!foto?.url) {
        console.warn(`[fotos] sem metadados: ${item.slug}`);
        continue;
      }
      const ext = new URL(foto.url).pathname.split(".").pop().toLowerCase();
      const arquivo = `${item.slug}.${ext === "jpeg" ? "jpg" : ext}`;
      if (!(await baixar(foto.url, resolve(DEST, arquivo)))) {
        console.warn(`[fotos] download falhou: ${item.slug}`);
        continue;
      }
      manifesto.push({
        slug: item.slug,
        src: `/fotos/${arquivo}`,
        alt: item.alt,
        autor: foto.creator || "Autor não informado",
        autorUrl: foto.creator_url || "",
        origem: foto.foreign_landing_url || foto.url,
        licenca: `CC ${String(foto.license).toUpperCase()}${foto.license_version ? ` ${foto.license_version}` : ""}`,
        licencaUrl: foto.license_url || "",
        fonte: foto.source || "openverse",
      });
      console.log(`[fotos] ok ${item.slug} — ${foto.license}`);
    } catch (e) {
      console.warn(`[fotos] erro em ${item.slug}: ${e.message}`);
    }
  }

  const ts = `// GERADO por scripts/fetch-real-photos.mjs — não editar à mão.
// Fotografias reais com licença Creative Commons comercial. Nenhuma imagem de IA.

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

/** Fail-closed: componente só renderiza foto que exista no manifesto. */
export const foto = (slug: string): FotoLicenciada | undefined =>
  FOTOS_LICENCIADAS.find((f) => f.slug === slug);
`;
  writeFileSync(OUT, ts);
  console.log(`[fotos] manifesto com ${manifesto.length} imagens`);
};

await main();
