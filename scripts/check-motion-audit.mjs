#!/usr/bin/env node
/**
 * Gate check:motion-audit
 *
 * Impede o retorno de movimento fora do Motion System Global:
 *  - hover scale genérico (`hover:scale-*`, `group-hover:scale-*`);
 *  - vocabulário decorativo legado (hover-streak, card-shine, elastic-click,
 *    ring-pulse, animated-border, animate-pulse-soft, cta-pulse);
 *  - `animate-pulse` ad-hoc como placeholder (deve usar `.skel`).
 *
 * Exceções: primitivas shadcn em src/components/ui (mantidas pelo upstream)
 * e indicadores de status "ao vivo" (bolinhas de 2x2/8px).
 * Fail-closed: qualquer ocorrência derruba o build.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const RAIZ = "src";
const IGNORAR = [path.join("src", "components", "ui"), path.join("src", "index.css")];
const PROIBIDOS = [
  [/\bhover:scale-/, "hover scale genérico — use .motion-surface (cor/sombra/borda)"],
  [/\bgroup-hover:scale-/, "group-hover scale genérico — use .motion-surface"],
  [/\bhover-streak\b/, "classe decorativa legada hover-streak"],
  [/\bcard-shine\b/, "classe decorativa legada card-shine"],
  [/\belastic-click\b/, "classe decorativa legada elastic-click"],
  [/\bring-pulse\b/, "classe decorativa legada ring-pulse"],
  [/\banimated-border\b/, "classe decorativa legada animated-border"],
  [/\banimate-pulse-soft\b/, "classe decorativa legada animate-pulse-soft"],
  [/\bcta-pulse\b/, "classe decorativa legada cta-pulse"],
];
const PULSE_STATUS = /(h-2 w-2|w-2 h-2|h-1\.5 w-1\.5|size-2)/;

const arquivos = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (IGNORAR.some((i) => full === i || full.startsWith(`${i}${path.sep}`))) continue;
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx?|css)$/.test(e)) arquivos.push(full);
  }
})(RAIZ);

const erros = [];
for (const arquivo of arquivos) {
  const linhas = readFileSync(arquivo, "utf8").split("\n");
  linhas.forEach((linha, i) => {
    if (/check-motion-audit|motion-audit:allow/.test(linha)) return;
    for (const [re, msg] of PROIBIDOS) {
      if (re.test(linha)) erros.push(`${arquivo}:${i + 1} — ${msg}`);
    }
    if (/\banimate-pulse\b/.test(linha) && !PULSE_STATUS.test(linha) && !/^\s*\*/.test(linha)) {
      erros.push(`${arquivo}:${i + 1} — animate-pulse ad-hoc; use o token .skel ou um Skeleton`);
    }
  });
}

console.log("── Gate check:motion-audit ──");
console.log(`  arquivos analisados: ${arquivos.length}`);
if (erros.length) {
  for (const e of erros) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("✔ nenhuma animação fora do Motion System Global.");
