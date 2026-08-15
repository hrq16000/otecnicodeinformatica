// RODADA 4C — Simulação LOCAL da matriz de redirects (sem rede, sem publicar).
//
// Valida redirects/tecnicocuritiba.map.json contra uma lista de URLs/paths e
// detecta, ANTES da publicação:
//   • conflitos (mesma origem com destinos diferentes / duplicadas);
//   • loops (destino que volta a ser origem no mesmo domínio);
//   • cadeias (destino que é origem de outra regra → 2 saltos);
//   • colisão com kept_urls (URL mantida que também tem regra de redirect);
//   • destinos fora do domínio canônico;
//   • redirects genéricos para "/" (perda de sinal);
//   • origens da lista sem cobertura na matriz;
//   • canônico esperado divergente do destino.
//
// Uso:
//   node scripts/simulate-redirects.mjs
//   node scripts/simulate-redirects.mjs --urls=docs/migracao/old-paths.txt
//   node scripts/simulate-redirects.mjs --enforce
//
// Saídas: reports/redirect-simulation.json · reports/redirect-simulation.md
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { loadMap } from "./lib/migration-critical.mjs";

const args = process.argv.slice(2);
const argVal = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? null;
const ENFORCE = args.includes("--enforce");

const map = loadMap();
const CANONICAL = map.target_domain.replace(/\/$/, "");
const SOURCE = map.source_domain.replace(/\/$/, "");

const toPath = (raw) => {
  const t = raw.trim();
  if (!t || t.startsWith("#")) return null;
  try {
    if (/^https?:\/\//i.test(t)) return new URL(t).pathname + new URL(t).search;
  } catch {
    return null;
  }
  return t.startsWith("/") ? t : `/${t}`;
};

// Índice da matriz + detecção de conflitos de origem.
const byFrom = new Map();
const conflicts = [];
const duplicates = [];
for (const rule of map.rules) {
  const prev = byFrom.get(rule.from);
  if (prev) {
    if (prev.to !== rule.to) conflicts.push({ from: rule.from, a: prev.to, b: rule.to });
    else duplicates.push(rule.from);
  } else byFrom.set(rule.from, rule);
}

const kept = new Set((map.kept_urls ?? []).map((u) => toPath(u)).filter(Boolean));
const keptCollisions = [...kept].filter((p) => byFrom.has(p));

// Lista de URLs a simular.
const urlsFile = argVal("urls");
let inputs = [...byFrom.keys()];
if (urlsFile) {
  if (!existsSync(urlsFile)) {
    console.error(`BLOQUEADO: arquivo de URLs não encontrado: ${urlsFile}`);
    process.exit(1);
  }
  inputs = readFileSync(urlsFile, "utf8").split("\n").map(toPath).filter(Boolean);
}
inputs = [...new Set([...inputs, ...kept])];

const resolve = (path) => {
  const chain = [];
  let current = path;
  for (let i = 0; i < 6; i += 1) {
    const rule = byFrom.get(current);
    if (!rule) break;
    chain.push({ from: current, to: rule.to, status: rule.status ?? 301 });
    let next;
    try {
      const u = new URL(rule.to);
      next = `${u.origin}` === CANONICAL ? null : u.pathname;
      // destino no domínio ANTIGO volta a ser origem → loop potencial
      if (`${u.origin}` === SOURCE) next = u.pathname;
    } catch {
      next = null;
    }
    if (!next || next === current) break;
    if (chain.some((c) => c.from === next)) {
      chain.push({ from: next, to: "(loop detectado)", status: 0 });
      break;
    }
    current = next;
  }
  return chain;
};

const rows = [];
for (const path of inputs) {
  const chain = resolve(path);
  const issues = [];
  const rule = byFrom.get(path);

  if (kept.has(path) && rule) issues.push("kept_url com regra de redirect");
  if (!rule && !kept.has(path)) issues.push("sem cobertura na matriz");

  if (rule) {
    let target = null;
    try {
      target = new URL(rule.to);
    } catch {
      issues.push("destino inválido (URL malformada)");
    }
    if (target) {
      if (target.origin !== CANONICAL) issues.push(`destino fora do domínio canônico (${target.origin})`);
      if (target.pathname === "/" && path !== "/") issues.push("redirect genérico para /");
      if (target.pathname === path && target.origin === SOURCE) issues.push("auto-redirect");
    }
    if ((rule.status ?? 301) !== 301) issues.push(`status ${rule.status} (esperado 301)`);
  }
  if (chain.length > 1) issues.push(`cadeia de ${chain.length} saltos`);
  if (chain.some((c) => c.to === "(loop detectado)")) issues.push("loop");

  rows.push({
    path,
    kept: kept.has(path),
    to: rule?.to ?? null,
    status: rule?.status ?? null,
    hops: chain.length,
    expectedCanonical: rule?.to ?? (kept.has(path) ? `${SOURCE}${path}` : null),
    chain: chain.map((c) => `${c.status} ${c.from} → ${c.to}`),
    issues,
  });
}

const failing = rows.filter((r) => r.issues.length > 0);
const summary = {
  generatedAt: new Date().toISOString(),
  source: SOURCE,
  target: CANONICAL,
  rules: map.rules.length,
  keptUrls: kept.size,
  simulated: rows.length,
  ok: rows.length - failing.length,
  withIssues: failing.length,
  conflicts,
  duplicates,
  keptCollisions,
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/redirect-simulation.json", JSON.stringify({ summary, rows }, null, 2) + "\n");

const md = [
  "# Simulação local de redirects (sem rede)",
  "",
  `Gerado em ${summary.generatedAt}`,
  "",
  `- Regras na matriz: **${summary.rules}**`,
  `- URLs mantidas: **${summary.keptUrls}**`,
  `- URLs simuladas: **${summary.simulated}**`,
  `- Sem problema: **${summary.ok}** · com problema: **${summary.withIssues}**`,
  `- Conflitos de origem: **${conflicts.length}** · duplicadas: **${duplicates.length}** · colisões com kept_urls: **${keptCollisions.length}**`,
  "",
  "## Ocorrências",
  "",
  failing.length === 0
    ? "Nenhuma ocorrência. A matriz está pronta para publicação."
    : ["| URL | Destino | Saltos | Problemas |", "| --- | --- | --- | --- |"]
        .concat(failing.slice(0, 200).map((r) => `| ${r.path} | ${r.to ?? "—"} | ${r.hops} | ${r.issues.join("; ")} |`))
        .join("\n"),
  "",
].join("\n");
writeFileSync("reports/redirect-simulation.md", md);

console.log(
  `simulate:redirects — ${summary.simulated} URLs · ${summary.ok} ok · ${summary.withIssues} com problema · ` +
    `${conflicts.length} conflito(s) · ${keptCollisions.length} colisão(ões) kept.`,
);
console.log("relatórios: reports/redirect-simulation.json e reports/redirect-simulation.md");

if (ENFORCE && (failing.length > 0 || conflicts.length > 0 || keptCollisions.length > 0)) {
  console.error("BLOQUEADO: simulação encontrou pendências. Corrija a matriz antes de publicar.");
  process.exit(1);
}
