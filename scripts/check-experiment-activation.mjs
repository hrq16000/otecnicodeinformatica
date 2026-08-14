#!/usr/bin/env node
/**
 * GATE — ATIVAÇÃO DE EXPERIMENTO (Rodada 7B)
 *
 * Impede `ativo: true` sem um registro de ativação versionado e auditável.
 * READY significa "apto a iniciar" — nunca "iniciado automaticamente".
 *
 * Para ligar um experimento é obrigatório um registro em
 * `config/experiment-activations.json` com:
 *   experimentId, experimentVersion, readinessStatus === "READY",
 *   razao, actor (admin) e timestamp.
 */
import { existsSync, readFileSync } from "node:fs";

const cro = readFileSync("src/lib/croRodada7.ts", "utf8");
const registros = existsSync("config/experiment-activations.json")
  ? JSON.parse(readFileSync("config/experiment-activations.json", "utf8"))
  : { ativacoes: [] };

const erros = [];
const bloco = cro.match(/export const EXPERIMENTOS_CRO[^=]*=\s*\[([\s\S]*?)\n\];/)?.[1] ?? "";
const experimentos = [...bloco.matchAll(/\{\s*\n\s*id: "([^"]+)"([\s\S]*?)\n {2}\},?/g)].map((m) => ({
  id: m[1],
  ativo: /ativo:\s*true/.test(m[2]),
}));

for (const exp of experimentos.filter((e) => e.ativo)) {
  const reg = (registros.ativacoes ?? []).find((a) => a.experimentId === exp.id && a.estadoNovo === "ativo");
  if (!reg) {
    erros.push(`${exp.id}: ativo sem registro de ativação auditável em config/experiment-activations.json`);
    continue;
  }
  if (reg.readinessStatus !== "READY") {
    erros.push(`${exp.id}: ativação registrada com readinessStatus "${reg.readinessStatus}" (exigido READY)`);
  }
  for (const campo of ["experimentVersion", "razao", "actor", "timestamp"]) {
    if (!reg[campo]) erros.push(`${exp.id}: registro de ativação sem campo obrigatório "${campo}"`);
  }
}

// Enquanto o experimento estiver desligado, nenhuma exposição pode ser emitida.
const exposicao = readFileSync("src/lib/croExposicao.ts", "utf8");
if (!/if \(!decisao\.habilitado\) return decisao;/.test(exposicao)) {
  erros.push("croExposicao pode emitir experiment_exposure com experimento desligado");
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO — ${erros.length} problema(s) na ativação de experimentos:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}

const ativos = experimentos.filter((e) => e.ativo).length;
console.log(
  `✓ Ativação governada — ${experimentos.length} experimento(s), ${ativos} ativo(s); ativação exige READY + registro auditável.`,
);
