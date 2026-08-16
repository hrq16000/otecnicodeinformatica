#!/usr/bin/env node
/**
 * COLETA DE STATUS DE INDEXAÇÃO (GSC) DAS ROTAS LOCAIS OBSERVADAS.
 *
 * Micro-Rodada Local 2 colocou 4 bairros novos em observação de 14 dias.
 * Este script consulta o Search Console (via connector gateway) e grava um
 * resumo estruturado em public/gsc-local-status.json, consumido pelo painel
 * /admin/inventario-bairros.
 *
 * Fail-closed: sem credenciais, grava um arquivo com status UNKNOWN e
 * `disponivel: false` — nunca inventa número.
 *
 * Uso: node scripts/gsc-local-status.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = process.env.GSC_SITE_URL ?? "sc-domain:otecnicodeinformatica.com.br";
const BASE = process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br";

/** Coorte em observação (14 dias) — Micro-Rodada Local 2. */
export const OBSERVADOS = ["boqueirao", "cajuru", "pinheirinho", "cidade-jardim-sjp"];

const lovableKey = process.env.LOVABLE_API_KEY;
const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;

const saida = {
  geradoEm: new Date().toISOString(),
  site: SITE,
  disponivel: Boolean(lovableKey && gscKey),
  rotas: [],
};

const inspecionar = async (url) => {
  const res = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: "pt-BR" }),
  });
  if (!res.ok) throw new Error(`[${res.status}] ${(await res.text()).slice(0, 200)}`);
  return res.json();
};

const normalizar = (verdict, coverageState) => {
  const c = String(coverageState ?? "").toLowerCase();
  if (verdict === "PASS") return "INDEXED";
  if (c.includes("discovered")) return "DISCOVERED_NOT_INDEXED";
  if (c.includes("crawled")) return "CRAWLED_NOT_INDEXED";
  if (!verdict || verdict === "VERDICT_UNSPECIFIED") return "UNKNOWN";
  return "NO_DATA";
};

for (const slug of OBSERVADOS) {
  const path = `/bairros/${slug}`;
  const url = `${BASE}${path}`;
  if (!saida.disponivel) {
    saida.rotas.push({ slug, path, url, status: "UNKNOWN", motivo: "credenciais do Search Console ausentes" });
    continue;
  }
  try {
    const data = await inspecionar(url);
    const r = data?.inspectionResult?.indexStatusResult ?? {};
    saida.rotas.push({
      slug,
      path,
      url,
      status: normalizar(r.verdict, r.coverageState),
      coverageState: r.coverageState ?? null,
      ultimoCrawl: r.lastCrawlTime ?? null,
      canonicalGoogle: r.googleCanonical ?? null,
      canonicalDeclarado: r.userCanonical ?? null,
      robots: r.robotsTxtState ?? null,
    });
  } catch (e) {
    saida.rotas.push({ slug, path, url, status: "UNKNOWN", motivo: String(e.message).slice(0, 200) });
  }
}

mkdirSync("public", { recursive: true });
writeFileSync("public/gsc-local-status.json", JSON.stringify(saida, null, 2));

console.log(`gsc-local-status → public/gsc-local-status.json (disponível: ${saida.disponivel})`);
for (const r of saida.rotas) console.log(`   ${r.status.padEnd(24)} ${r.path}`);
