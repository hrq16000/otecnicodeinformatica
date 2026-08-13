#!/usr/bin/env node
// @ts-nocheck
/**
 * Relatório pós-build de governança.
 * Executa um conjunto curado de gates rápidos, registra resultado, duração e
 * timestamp em public/build-status.json e imprime um resumo.
 *
 * Nunca derruba o build (exit 0): os gates bloqueantes já rodam no prebuild.
 * Este script é o relatório consolidado exibido em /status-de-anuncios.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const GATES = [
  { id: "ads-txt", label: "ads.txt e metatag AdSense", cmd: ["node", "scripts/check-ads-txt.mjs"] },
  { id: "policy-jsonld", label: "JSON-LD das políticas", cmd: ["node", "scripts/check-policy-jsonld.mjs"] },
  { id: "telemetry", label: "Transparência da telemetria", cmd: ["node", "scripts/check-telemetry-transparency.mjs"] },
  { id: "missing-exports", label: "Exports ausentes nas rotas", cmd: ["node", "scripts/check-missing-exports.mjs"] },
  { id: "internal-links", label: "Links internos sem 404", cmd: ["node", "scripts/check-internal-links.mjs"] },
  { id: "sitemap-source", label: "Sitemap x fonte curada", cmd: ["node", "scripts/check-sitemap-source.mjs"] },
  { id: "aggregate-rating", label: "Ausência de aggregateRating fabricado", cmd: ["node", "scripts/check-aggregate-rating.mjs"] },
  { id: "media-assets", label: "og:image, mídia kit e assets públicos", cmd: ["node", "scripts/check-media-assets.mjs"] },
  { id: "orphan-pages", label: "Páginas órfãs", cmd: ["node", "scripts/check-orphan-pages.mjs"] },
];

const startedAt = new Date().toISOString();
const gates = [];

for (const gate of GATES) {
  const t0 = Date.now();
  let status = "skipped";
  let detail = "script indisponível";
  const run = spawnSync(gate.cmd[0], gate.cmd.slice(1), { encoding: "utf8" });
  const out = `${run.stdout ?? ""}${run.stderr ?? ""}`;
  if (run.error || /Cannot find module|MODULE_NOT_FOUND/.test(out)) {
    status = "skipped";
  } else {
    status = run.status === 0 ? "ok" : "fail";
    detail = status === "ok" ? "sem pendências" : (out.trim().split("\n").slice(-1)[0] || "falha").slice(0, 200);
  }
  gates.push({
    id: gate.id,
    label: gate.label,
    status,
    detail,
    durationMs: Date.now() - t0,
    checkedAt: new Date().toISOString(),
  });
}

const failed = gates.filter((g) => g.status === "fail");
const report = {
  startedAt,
  finishedAt: new Date().toISOString(),
  ok: failed.length === 0,
  total: gates.length,
  passed: gates.filter((g) => g.status === "ok").length,
  failed: failed.length,
  skipped: gates.filter((g) => g.status === "skipped").length,
  gates,
};

writeFileSync("public/build-status.json", `${JSON.stringify(report, null, 2)}\n`);

console.log("\nRelatório pós-build de gates");
for (const g of gates) {
  const icon = g.status === "ok" ? "✅" : g.status === "fail" ? "❌" : "⏭️";
  console.log(` ${icon} ${g.label} (${g.durationMs}ms) — ${g.detail}`);
}
console.log(`\n${report.passed}/${report.total} gates OK · ${report.failed} falha(s) · ${report.skipped} pulado(s)\n`);
