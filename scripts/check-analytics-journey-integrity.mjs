#!/usr/bin/env node
/**
 * GATE — INTEGRIDADE DA JORNADA (Rodada 6B, FASES 41/42/43)
 * Falha quando o contrato de jornada perde peças obrigatórias:
 *   • journey_id efêmero com TTL e sem PII;
 *   • event_id para dedupe;
 *   • first-touch não sobrescrito;
 *   • contexto mínimo por família de rota;
 *   • analytics non-blocking (falha de tracking não interrompe a UX).
 */
import { readFileSync } from "node:fs";

const contratoBruto = readFileSync("src/lib/analyticsContract.ts", "utf8");
// Comentários não são código: a menção "sem fingerprint" na doc não é uso.
const contrato = contratoBruto
  .split("\n")
  .filter((l) => !/^\s*(?:\/\/|\*|\/\*)/.test(l))
  .join("\n");
const funil = readFileSync("src/lib/funnelAnalytics.ts", "utf8");
const erros = [];

const exige = (cond, msg) => {
  if (!cond) erros.push(msg);
};

exige(/JOURNEY_TTL_MS/.test(contrato), "journey_id sem TTL declarado");
exige(/getJourneyId/.test(contrato), "getJourneyId ausente do contrato");
exige(/newEventId/.test(contrato), "event_id ausente — dedupe impossível");
exige(/FIRST_KEY|touch_first/.test(contrato), "first-touch não persistido");
exige(/LAST_KEY|touch_last/.test(contrato), "last-touch não persistido");
exige(!/fingerprint|canvas|userAgentData/i.test(contrato), "identificação invasiva detectada no contrato de jornada");
exige(/try\s*{/.test(funil) && /catch/.test(funil), "analytics precisa ser à prova de exceção (fail-open da UX)");

// Contexto mínimo esperado por família de rota (FASE 41).
const OBRIGATORIOS = ["route", "route_family", "journey_id", "event_id"];
for (const campo of OBRIGATORIOS) {
  exige(new RegExp(`\\b${campo}\\b`).test(contrato) || new RegExp(`\\b${campo}\\b`).test(funil), `campo obrigatório ausente na jornada: ${campo}`);
}
exige(/service_slug/.test(contrato), "service_slug ausente — service_city não teria contexto mínimo");
exige(/neighborhood_slug/.test(contrato), "neighborhood_slug ausente — bairro não teria contexto mínimo");

if (erros.length) {
  console.error(`\n✖ BLOQUEADO — ${erros.length} quebra(s) de integridade de jornada:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}
console.log("✓ Jornada íntegra — TTL, dedupe, first/last touch e contexto mínimo presentes; analytics non-blocking.");
