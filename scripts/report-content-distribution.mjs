#!/usr/bin/env node
/**
 * RODADA 8F — MAPA DE DISTRIBUIÇÃO (GBP + SOCIAL)
 * -----------------------------------------------
 * Gera as pautas prontas e os links rastreáveis do lote de distribuição
 * definido em `src/lib/contentDistribution.ts`.
 *
 * Não publica nada em canal externo. A entrega é o material pronto e o
 * link com UTM correta; o estado permanece PRONTO_PARA_PUBLICAR até que
 * exista integração autorizada.
 *
 * Saída: reports/content-distribution-map.json e .md
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "reports");
const BASE = process.env.SITE_BASE_URL || "https://otecnicodeinformatica.com.br";

const src = readFileSync(path.join(ROOT, "src/lib/contentDistribution.ts"), "utf8");

const PAUTAS = [...src.matchAll(
  /\{\s*id:\s*"([^"]+)",\s*\n\s*tema:\s*"([^"]+)",\s*\n\s*landing:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)",\s*\n\s*resumo:\s*\n?\s*"((?:[^"\\]|\\.)*)",\s*\n\s*cta:\s*"([^"]+)",\s*\n\s*utmContent:\s*"([^"]+)",\s*\n\s*canais:\s*\[([^\]]+)\]/g,
)].map((m) => ({
  id: m[1],
  tema: m[2],
  landing: m[3],
  intent: m[4],
  resumo: m[5].replace(/\\"/g, '"'),
  cta: m[6],
  utmContent: m[7],
  canais: [...m[8].matchAll(/"([^"]+)"/g)].map((c) => c[1]),
}));

if (PAUTAS.length === 0) {
  console.error("BLOQUEADO: nenhuma pauta lida de src/lib/contentDistribution.ts.");
  process.exit(1);
}

const PRESET = {
  gbp: { utm_source: "google", utm_medium: "organic_gbp", utm_campaign: "gbp_post" },
  facebook: { utm_source: "facebook", utm_medium: "organic", utm_campaign: "facebook_organic" },
  instagram: { utm_source: "instagram", utm_medium: "organic", utm_campaign: "instagram_organic" },
};

const montar = (pauta, canal) => {
  const p = PRESET[canal];
  const u = new URL(pauta.landing, BASE);
  u.searchParams.set("utm_source", p.utm_source);
  u.searchParams.set("utm_medium", p.utm_medium);
  u.searchParams.set("utm_campaign", p.utm_campaign);
  u.searchParams.set("utm_content", pauta.utmContent);
  return u.toString();
};

const itens = PAUTAS.flatMap((pauta) =>
  pauta.canais.map((canal) => ({
    pautaId: pauta.id,
    tema: pauta.tema,
    canal,
    landing: pauta.landing,
    intent: pauta.intent,
    link: montar(pauta, canal),
    estado: "PRONTO_PARA_PUBLICAR",
  })),
);

const resumo = {
  geradoEm: new Date().toISOString(),
  pautas: PAUTAS.length,
  itens: itens.length,
  canais: [...new Set(itens.map((i) => i.canal))],
  rotasNovasCriadas: 0,
  estado: "PRONTO_PARA_PUBLICAR",
};

mkdirSync(OUT, { recursive: true });
writeFileSync(
  path.join(OUT, "content-distribution-map.json"),
  JSON.stringify({ resumo, pautas: PAUTAS, itens }, null, 2),
);

const md = [
  "# Mapa de distribuição do cluster piloto — Rodada 8F",
  "",
  `${resumo.pautas} pautas × ${resumo.canais.join(", ")} = ${resumo.itens} peças. Rotas novas criadas para distribuição: **0** (regra da rodada).`,
  "",
  "Estado: **PRONTO_PARA_PUBLICAR**. A publicação nos canais externos é manual —",
  "não existe integração autorizada de postagem, então nada aqui deve ser lido",
  "como “já publicado”.",
  "",
  ...PAUTAS.flatMap((p) => [
    `## ${p.tema}`,
    "",
    `- Destino: \`${p.landing}\` (${p.intent})`,
    `- CTA: ${p.cta}`,
    "",
    p.resumo,
    "",
    "| Canal | Link rastreável |",
    "| --- | --- |",
    ...p.canais.map((c) => `| ${c} | ${montar(p, c)} |`),
    "",
  ]),
  "## Regras de atribuição",
  "",
  "- GBP usa `utm_medium=organic_gbp` para não se misturar com busca orgânica.",
  "- Facebook e Instagram usam `utm_medium=organic` com `utm_source` próprio.",
  "- `utm_content` carrega o tema, permitindo comparar pautas entre canais.",
  "- Nenhum link aponta para rota fora da coorte da 8E.",
  "",
].join("\n");

writeFileSync(path.join(OUT, "content-distribution-map.md"), md);

console.log("── report:content-distribution ──");
console.log(`  ${resumo.pautas} pautas · ${resumo.itens} peças · ${resumo.estado}`);
console.log("  → reports/content-distribution-map.md");
