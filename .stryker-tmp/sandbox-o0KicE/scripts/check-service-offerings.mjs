#!/usr/bin/env node
// @ts-nocheck
/**
 * Gate: JSON-LD não pode ofertar verticais recusadas.
 *
 * Regra de governança (Rodada 3Z / 4I-P.1R):
 *  - Equipamento de áudio/som/home theater foi RECUSADO como vertical.
 *  - Troca de painel de monitor é explicitamente recusada.
 *
 * O gate varre o código-fonte procurando nomes de Service / itens de
 * hasOfferCatalog / itemListElement que citem verticais recusadas.
 * Falha fail-closed no CI quando encontrar.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src"];
const EXT = /\.(ts|tsx)$/;

/** Termos proibidos dentro de nomes de serviço estruturado. */
const RECUSADAS = [
  { termo: "equipamento de som", motivo: "vertical de áudio recusada" },
  { termo: "caixa de som", motivo: "vertical de áudio recusada" },
  { termo: "home theater", motivo: "vertical de áudio recusada" },
  { termo: "aparelho de som", motivo: "vertical de áudio recusada" },
  { termo: "conserto de áudio", motivo: "vertical de áudio recusada" },
  { termo: "troca de painel", motivo: "troca de painel de monitor/TV recusada" },
];

/** Captura valores de "name": "..." próximos de um bloco de Service. */
const SERVICE_NAME_RE = /"?name"?\s*:\s*"([^"]{3,120})"/g;

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full);
    else if (EXT.test(entry)) files.push(full);
  }
};
ROOTS.forEach(walk);

const violations = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  if (!/"@type"\s*:\s*"(Service|OfferCatalog|Offer)"/.test(src)) continue;

  let m;
  SERVICE_NAME_RE.lastIndex = 0;
  while ((m = SERVICE_NAME_RE.exec(src))) {
    const nome = m[1].toLowerCase();
    for (const { termo, motivo } of RECUSADAS) {
      if (nome.includes(termo)) {
        const line = src.slice(0, m.index).split("\n").length;
        violations.push(`${file}:${line} → "${m[1]}" (${motivo})`);
      }
    }
  }
}

if (violations.length) {
  console.error("❌ JSON-LD com serviço de vertical recusada:\n");
  violations.forEach((v) => console.error("  - " + v));
  console.error(
    "\nRemova o item do schema ou aprove a vertical antes de publicá-la.",
  );
  process.exit(1);
}

console.log(
  `✅ check:service-offerings — ${files.length} arquivos varridos, nenhum Service de vertical recusada no JSON-LD.`,
);
