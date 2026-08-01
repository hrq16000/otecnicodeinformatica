#!/usr/bin/env node
/**
 * GATE — Verdade comercial do ramo empresarial recorrente (Rodada 2.1).
 *
 * Falha se o funil PJ introduzir promessas comerciais inexistentes:
 * mensalidade, preço mensal, SLA, horas/visitas contratadas, técnico
 * dedicado, monitoramento, fidelidade, contrato mínimo, zero downtime ou
 * atendimento imediato/garantido.
 *
 * Escopo: arquivos de configuração/motor/UI da triagem.
 */
import { readFileSync } from "node:fs";

const FILES = [
  "src/lib/funnel/triageConfig.ts",
  "src/lib/funnel/triageMachine.ts",
  "src/components/WhatsAppFunnel.tsx",
  "src/components/TriageField.tsx",
];

const FORBIDDEN = [
  /mensalidad/i,
  /pre[çc]o\s+mensal/i,
  /por\s+m[êe]s/i,
  /\/m[êe]s/i,
  /\bSLA\b/,
  /horas\s+contratad/i,
  /pacote\s+de\s+horas/i,
  /visitas\s+inclu/i,
  /t[ée]cnico\s+dedicado/i,
  /monitoramento\s+24/i,
  /fidelidade/i,
  /contrato\s+m[íi]nimo/i,
  /zero\s+downtime/i,
  /atendimento\s+imediato/i,
  /prazo\s+garantido/i,
  /recupera[çc][ãa]o\s+garantida/i,
];

let failures = 0;
for (const file of FILES) {
  let src = "";
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue; // arquivo opcional
  }
  src.split("\n").forEach((line, i) => {
    if (line.trim().startsWith("*") || line.trim().startsWith("//")) return; // comentários
    for (const rx of FORBIDDEN) {
      if (rx.test(line)) {
        failures += 1;
        console.error(`✗ ${file}:${i + 1} — termo proibido no ramo recorrente: ${rx}`);
        console.error(`  ${line.trim().slice(0, 160)}`);
      }
    }
  });
}

if (failures > 0) {
  console.error(`\n${failures} ocorrência(s) proibida(s) no funil empresarial.`);
  process.exit(1);
}
console.log("✓ check:recurring-language — nenhum termo comercial proibido no funil PJ.");
