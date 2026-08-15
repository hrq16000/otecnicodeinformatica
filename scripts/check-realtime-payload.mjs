#!/usr/bin/env node
/**
 * GATE — payload de realtime não pode entrar cru no estado da UI (Rodada 4C).
 *
 * `postgres_changes` entrega a linha inteira de `click_events`. Qualquer uso de
 * `payload.new` que não passe por `projetarEventoClique` deixa campos de
 * contexto (bairro, cidade, problema) trafegarem para o navegador sem
 * necessidade — contrariando a governança de telemetria 4E.4.
 *
 * Também falha quando um campo da lista proibida é lido explicitamente do
 * payload.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const PROIBIDOS = ["bairro", "cidade", "problema", "equipamento", "modalidade", "viewport_width"];

function arquivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return arquivos(p);
    return /\.tsx?$/.test(n) ? [p] : [];
  });
}

const erros = [];
for (const arquivo of arquivos("src")) {
  const src = readFileSync(arquivo, "utf8");
  if (!src.includes("postgres_changes")) continue;

  const linhas = src.split("\n");
  linhas.forEach((linha, i) => {
    if (!linha.includes("payload.new")) return;
    if (!linha.includes("projetarEventoClique")) {
      erros.push(`${arquivo}:${i + 1} — payload.new usado sem projetarEventoClique()`);
    }
  });

  for (const campo of PROIBIDOS) {
    const re = new RegExp(`payload\\.new[^\\n]*\\b${campo}\\b|novo\\.${campo}\\b`);
    if (re.test(src)) erros.push(`${arquivo} — lê campo proibido "${campo}" do broadcast`);
  }
}

if (erros.length) {
  console.error(`\n✖ BLOQUEADO: ${erros.length} uso(s) inseguro(s) de realtime:`);
  for (const e of erros) console.error(`  · ${e}`);
  console.error("\n  Allowlist: src/lib/realtimeSafeFields.ts");
  process.exit(1);
}

console.log("✓ Broadcast de telemetria projetado na allowlist em todos os consumidores.");
