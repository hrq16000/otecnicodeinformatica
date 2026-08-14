#!/usr/bin/env node
/**
 * RODADA 5E — PAINEL DE GATES LOCAIS POR ROTA.
 *
 * Executa os gates locais bloqueantes e cruza o resultado com a política
 * central, produzindo, POR ROTA:
 *   local-index-policy · local-service-intent · local-doorway ·
 *   local-neighborhood-intent  →  veredito final
 *   (INDEX | CANONICALIZED_TO_PARENT | NOINDEX | DISABLED)
 *
 * Saída: public/local-gates.json (consumido por /admin/gates-locais) e
 * dist/local-gates.json quando o dist existir. Nada é escrito à mão.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import {
  ENTIDADES,
  BAIRROS_ANCORA_META,
  SERVICO_BAIRRO_INDEXAVEIS,
  resolveLocal,
} from "./lib/local-index-policy.mjs";

const dist = process.argv[2] || "dist";

const GATES = [
  { id: "local-index-policy", script: "check:local-index-policy", familias: ["*"] },
  { id: "local-doorway", script: "check:local-doorway", familias: ["*"] },
  { id: "local-service-intent", script: "check:local-service-intent", familias: ["SERVICO_CIDADE", "SERVICO_BAIRRO"] },
  { id: "local-neighborhood-intent", script: "check:local-neighborhood-intent", familias: ["BAIRRO"] },
];

const resultados = {};
for (const g of GATES) {
  try {
    const out = execFileSync("npm", ["run", "--silent", g.script], { stdio: "pipe" }).toString();
    resultados[g.id] = { status: "pass", saida: out.trim().split("\n").slice(-3).join("\n") };
  } catch (err) {
    const saida = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim();
    resultados[g.id] = { status: "fail", saida: saida.slice(-1500) };
  }
}

/** Veredito final na taxonomia do checklist da rodada. */
const veredito = (d) => {
  if (d.indexability === "index") return "INDEX";
  if (d.indexability === "canonicalized") return "CANONICALIZED_TO_PARENT";
  if (d.indexability === "redirect" || d.indexability === "disabled") return "DISABLED";
  return "NOINDEX";
};

const paths = [
  ...ENTIDADES.map((e) => e.path),
  ...BAIRROS_ANCORA_META.map((b) => `/bairros/${b.slug}`),
  ...SERVICO_BAIRRO_INDEXAVEIS,
];

const rotas = [...new Set(paths)].map((path) => {
  const d = resolveLocal(path);
  const gates = {};
  for (const g of GATES) {
    const aplica = g.familias.includes("*") || g.familias.includes(d.family);
    if (!aplica) {
      gates[g.id] = "n/a";
      continue;
    }
    const r = resultados[g.id];
    // Falha citando a rota = falha atribuída; falha genérica = gate vermelho global.
    if (r.status === "pass") gates[g.id] = "pass";
    else gates[g.id] = r.saida.includes(path) ? "fail" : "fail-global";
  }
  return {
    path,
    familia: d.family,
    indexability: d.indexability,
    canonical: d.canonical,
    sitemap: d.sitemap,
    parent: d.parent ?? null,
    intent: d.intent ?? null,
    motivo: d.reason,
    gates,
    veredito: veredito(d),
  };
});

const relatorio = {
  geradoEm: new Date().toISOString(),
  rodada: "5E",
  gates: Object.entries(resultados).map(([id, r]) => ({ id, status: r.status })),
  resumo: {
    total: rotas.length,
    index: rotas.filter((r) => r.veredito === "INDEX").length,
    canonicalized: rotas.filter((r) => r.veredito === "CANONICALIZED_TO_PARENT").length,
    noindex: rotas.filter((r) => r.veredito === "NOINDEX").length,
    disabled: rotas.filter((r) => r.veredito === "DISABLED").length,
  },
  rotas: rotas.sort((a, b) => a.path.localeCompare(b.path)),
};

const json = `${JSON.stringify(relatorio, null, 2)}\n`;
mkdirSync("public", { recursive: true });
writeFileSync(join("public", "local-gates.json"), json);
if (existsSync(dist)) writeFileSync(join(dist, "local-gates.json"), json);

console.log(
  `[local-gates] ${rotas.length} rotas · INDEX ${relatorio.resumo.index} · ` +
    `CANONICALIZED ${relatorio.resumo.canonicalized} · NOINDEX ${relatorio.resumo.noindex} · ` +
    `gates ${relatorio.gates.map((g) => `${g.id}:${g.status}`).join(" ")}`,
);
