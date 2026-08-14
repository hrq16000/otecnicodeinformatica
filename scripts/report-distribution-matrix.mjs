#!/usr/bin/env node
/**
 * RODADA 8H — MATRIZ OPERACIONAL DE DISTRIBUIÇÃO DO CLUSTER 1
 * Gera docs/distribuicao-cluster-1.md e a cópia lida pelo painel.
 * Não publica nada: só declara o que está pronto e o que tem prova.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const cfg = JSON.parse(readFileSync(path.join(ROOT, "config/distribuicao-cluster-1.json"), "utf8"));
const site = readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SITE_DOMAIN="?([^"\n]+)/)?.[1] ?? "";
const BASE = site ? `https://${site}` : "";

const src = readFileSync(path.join(ROOT, "src/lib/contentDistribution.ts"), "utf8");
const pautas = [...src.matchAll(/id:\s*"([^"]+)",\s*\n\s*tema:\s*"([^"]+)",\s*\n\s*landing:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], tema: m[2], landing: m[3], intent: m[4] }),
);
const utmContent = Object.fromEntries(
  [...src.matchAll(/id:\s*"([^"]+)",[\s\S]*?utmContent:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
const PRESET = {
  gbp: { utm_source: "google", utm_medium: "organic_gbp", utm_campaign: "gbp_post" },
  facebook: { utm_source: "facebook", utm_medium: "organic", utm_campaign: "facebook_organic" },
  instagram: { utm_source: "instagram", utm_medium: "organic", utm_campaign: "instagram_organic" },
};
const ISO = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/;

const linhas = cfg.registros.map((r) => {
  const p = pautas.find((x) => x.id === r.pauta);
  const preset = PRESET[r.canal];
  let status = String(r.status || "").toUpperCase();
  let motivo = null;
  if (!["READY", "SCHEDULED", "PUBLISHED", "BLOCKED"].includes(status)) {
    status = "BLOCKED";
    motivo = `status "${r.status}" fora do contrato`;
  } else if (status === "PUBLISHED" && !(r.published_at && ISO.test(r.published_at))) {
    status = "READY";
    motivo = "PUBLISHED sem published_at válido";
  }
  if (!p || !preset) {
    status = "BLOCKED";
    motivo = motivo ?? "pauta/canal desconhecido";
  }
  const url =
    p && preset
      ? `${BASE}${p.landing}?utm_source=${preset.utm_source}&utm_medium=${preset.utm_medium}&utm_campaign=${preset.utm_campaign}&utm_content=${utmContent[p.id] ?? p.id}`
      : null;
  return { canal: r.canal, tema: p?.tema ?? r.pauta, landing: p?.landing ?? "—", intent: p?.intent ?? "—", url, status, publishedAt: r.published_at ?? null, motivo };
});

const publicados = linhas.filter((l) => l.status === "PUBLISHED").length;
const estado = publicados === 0 ? "PRONTO_PARA_PUBLICAR" : publicados === linhas.length ? "PUBLICADO" : "PARCIAL";

const md = `# Matriz de distribuição — Cluster 1 (Rodada 8H)

Coorte \`${cfg.cohort}\` · estado externo: **${estado}** · publicações comprovadas: **${publicados}/${linhas.length}**.

Links gerados pelos presets do \`/admin/link-builder\` (governança UTM da 8C). Nenhuma URL nova foi criada.

| Canal | Tema | Landing | Intent | UTM | Status |
| --- | --- | --- | --- | --- | --- |
${linhas
  .map(
    (l) =>
      `| ${l.canal} | ${l.tema} | \`${l.landing}\` | ${l.intent} | ${l.url ? `\`${l.url.split("?")[1]}\`` : "—"} | ${l.status}${l.motivo ? ` (${l.motivo})` : ""} |`,
  )
  .join("\n")}

## Offline / QR

Status: **${cfg.offline.status}** — ${cfg.offline.nota}

## Regra de publicação

\`PUBLISHED\` exige \`published_at\` real e prova arquivada (URL do post). Sem isso o registro é
rebaixado automaticamente para \`READY\`. Datas não são reescritas para parecer recentes.
`;

writeFileSync(path.join(ROOT, "docs/distribuicao-cluster-1.md"), md);
for (const dir of ["reports", "public/reports"]) {
  mkdirSync(path.join(ROOT, dir), { recursive: true });
  writeFileSync(
    path.join(ROOT, dir, "distribuicao-cluster-1.json"),
    JSON.stringify({ cohort: cfg.cohort, estado, publicados, total: linhas.length, linhas, offline: cfg.offline }, null, 2),
  );
}

console.log("── report:distribution ──");
console.log(`  ${linhas.length} pares canal×pauta · estado ${estado} · publicados ${publicados}`);
console.log("  → docs/distribuicao-cluster-1.md");
