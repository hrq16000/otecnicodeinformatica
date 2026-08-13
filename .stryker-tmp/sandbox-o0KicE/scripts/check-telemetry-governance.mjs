#!/usr/bin/env node
// @ts-nocheck
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

// 5) Rodada 4E.5.1 — o agregado comercial exclui QA/pré-baseline ANTES do k=5.
const { readdirSync: _rd } = await import("node:fs");
const migFiles = existsSync(migrations) ? _rd(migrations).sort() : [];
const consolidateDefs = migFiles.filter((f) =>
  /CREATE OR REPLACE FUNCTION public\.consolidate_click_events/i.test(read(`${migrations}/${f}`) || ""),
);
const lastConsolidate = consolidateDefs[consolidateDefs.length - 1];
if (!lastConsolidate) {
  errors.push("nenhuma migration define consolidate_click_events.");
} else {
  const sql = read(`${migrations}/${lastConsolidate}`) || "";
  const body = sql.slice(sql.search(/CREATE OR REPLACE FUNCTION public\.consolidate_click_events/i));
  if (!/is_qa_click_event/.test(body)) {
    errors.push(
      `${lastConsolidate}: consolidate_click_events deve excluir QA/pré-baseline via is_qa_click_event antes de agrupar.`,
    );
  }
  const wherePos = body.search(/NOT public\.is_qa_click_event/i);
  const groupPos = body.search(/GROUP BY 1,2,3/);
  if (wherePos < 0 || groupPos < 0 || wherePos > groupPos) {
    errors.push("a exclusão de QA precisa ocorrer no filtro raw, antes do agrupamento/generalização/k=5.");
  }
}
const relatorio451 = read("docs/rodada-4e51-microgate-telemetria.md");
if (!relatorio451) {
  errors.push("docs/rodada-4e51-microgate-telemetria.md ausente — exigido pelo microgate 4E.5.1.");
} else {
  for (const t of ["BASELINE_COMERCIAL_ISO = 2026-08-08T00:10:00Z", "T1 = 2026-08-08T00:05:45Z", "ZERO DELETE REAL"]) {
    if (!relatorio451.includes(t)) errors.push(`docs/rodada-4e51-microgate-telemetria.md não declara "${t}".`);
  }
}

if (errors.length) {
  console.error("BLOQUEADO — governança de telemetria (4E.4):");
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log("OK — governança de telemetria 4E.4/4E.5.1 íntegra (minimização, ROPA, balanceamento, grants, exclusão QA antes do k=5).");
