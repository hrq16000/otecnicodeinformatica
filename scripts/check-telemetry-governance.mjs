#!/usr/bin/env node
/**
 * GATE — Governança de telemetria (Rodada 4E.4).
 *
 * Verifica no código e na documentação que os parâmetros aprovados em
 * 07/08/2026 continuam válidos:
 *   • viewport_width não é persistido em click_events;
 *   • ROPA e teste de balanceamento existem e declaram os parâmetros fechados;
 *   • o documento de gate não segue marcado como bloqueado;
 *   • nenhuma leitura pública foi aberta nos agregados.
 *
 * Uso: node scripts/check-telemetry-governance.mjs
 */
import { existsSync, readFileSync } from "node:fs";

const errors = [];
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

// 1) Minimização: o insert em click_events não pode carregar viewport_width.
const funnel = read("src/lib/funnelAnalytics.ts");
if (!funnel) {
  errors.push("src/lib/funnelAnalytics.ts não encontrado.");
} else if (!/viewport_width:\s*_viewportWidth/.test(funnel)) {
  errors.push(
    "src/lib/funnelAnalytics.ts deve descartar viewport_width antes do insert em click_events (PERSIST_VIEWPORT_WIDTH = false).",
  );
}

// 2) Documentos obrigatórios da decisão.
const required = [
  {
    file: "docs/ropa-telemetria-click-events.md",
    must: ["AUTORIZADO", "RAW_RETENTION_DAYS", "fail-closed", "DADOS AGREGADOS"],
  },
  {
    file: "docs/rodada-4e4-teste-balanceamento.md",
    must: [
      "APROVADO COM CONDIÇÕES",
      "LEGAL_BASIS = LEGITIMATE_INTEREST",
      "RAW_RETENTION_DAYS = 90",
      "AGGREGATE_RETENTION_MONTHS = 24",
      "LOW_COUNT_THRESHOLD = 5",
      "PERSIST_VIEWPORT_WIDTH = false",
    ],
  },
];

for (const { file, must } of required) {
  const content = read(file);
  if (!content) {
    errors.push(`${file} ausente — exigido pela decisão de governança 4E.4.`);
    continue;
  }
  for (const token of must) {
    if (!content.includes(token)) errors.push(`${file} não declara "${token}".`);
  }
}

// 3) O gate anterior precisa refletir que a governança foi aprovada.
const gate = read("docs/rodada-4e4-gate-governanca.md");
if (gate && /IMPLEMENTAÇÃO BLOQUEADA/i.test(gate)) {
  errors.push(
    "docs/rodada-4e4-gate-governanca.md ainda marca a implementação como bloqueada, mas a decisão foi aprovada.",
  );
}

// 4) Zero ampliação de grants públicos nos agregados.
const migrations = "supabase/migrations";
if (existsSync(migrations)) {
  const { readdirSync } = await import("node:fs");
  for (const f of readdirSync(migrations)) {
    const sql = read(`${migrations}/${f}`) || "";
    if (/click_events_daily|telemetry_retention_runs/.test(sql) && /TO\s+anon/i.test(sql)) {
      errors.push(`${f}: agregados de telemetria não podem conceder acesso a anon.`);
    }
  }
}

if (errors.length) {
  console.error("BLOQUEADO — governança de telemetria (4E.4):");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log("OK — governança de telemetria 4E.4 íntegra (minimização, ROPA, balanceamento, grants).");
