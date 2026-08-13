#!/usr/bin/env node
// @ts-nocheck
/**
 * Consolida, deduplica e classifica falhas dos relatórios JSON do Playwright.
 *
 * Uso:
 *   node scripts/consolidate-e2e-failures.mjs <dir-ou-arquivo...> [--out docs/e2e-falhas.md]
 *
 * Aceita:
 *   - o JSON consolidado gerado por `playwright merge-reports --reporter=json`;
 *   - vários JSONs por shard nomeados `results-<engine>-<shard>.json`.
 *
 * Classificação:
 *   A — bug real de produção (falha determinística em todos os engines executados)
 *   B — dependência de engine / flakiness (falha em subconjunto de engines)
 *   C — teste obsoleto ou infraestrutura da suíte (seletor, servidor, ambiente)
 *   D — contraste, acessibilidade ou snapshot visual (fora de escopo desta rodada)
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outFile = outIdx >= 0 ? args[outIdx + 1] : null;
const inputs = args.filter((a, i) => !a.startsWith("--") && i !== outIdx + 1);

if (inputs.length === 0) {
  console.error("[consolidate-e2e] informe ao menos um arquivo ou diretório de relatórios JSON.");
  process.exit(2);
}

/** @returns {string[]} */
function collectFiles(entries) {
  const files = [];
  for (const entry of entries) {
    if (!fs.existsSync(entry)) continue;
    const stat = fs.statSync(entry);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(entry)) {
        const full = path.join(entry, name);
        if (fs.statSync(full).isDirectory()) files.push(...collectFiles([full]));
        else if (name.endsWith(".json")) files.push(full);
      }
    } else if (entry.endsWith(".json")) {
      files.push(entry);
    }
  }
  return files;
}

const ROUTE_RE = /(?:localhost:\d+|tecnico\.curitiba\.br)(\/[\w\-/]*)/;
const ROUTE_IN_TEXT_RE = /(?:^|\s)(\/[a-z0-9][\w\-/]*)/i;

function extractRoute(text) {
  if (!text) return "—";
  const m = ROUTE_RE.exec(text);
  if (m) return m[1] || "/";
  const t = ROUTE_IN_TEXT_RE.exec(text);
  return t ? t[1] : "—";
}

function normalizeError(message) {
  return (message || "")
    .replace(/\u001b\[[0-9;]*m/g, "")
    .replace(/localhost:\d+/g, "localhost:PORT")
    .replace(/\d+(\.\d+)?ms/g, "Nms")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 400);
}

function firstAssertionLine(message) {
  const clean = (message || "").replace(/\u001b\[[0-9;]*m/g, "");
  const line = clean.split("\n").find((l) => l.trim().length > 0) || "";
  return line.trim().slice(0, 200);
}

function expectedFound(message) {
  const clean = (message || "").replace(/\u001b\[[0-9;]*m/g, "");
  const exp = /Expected:?\s*(.+)/i.exec(clean);
  const rec = /(?:Received|Actual):?\s*(.+)/i.exec(clean);
  return {
    expected: exp ? exp[1].trim().slice(0, 120) : "—",
    found: rec ? rec[1].trim().slice(0, 120) : "—",
  };
}

/** Categoria bruta por sinais textuais/arquivo. */
function rawCategory(specFile, message) {
  const m = (message || "").toLowerCase();
  const f = specFile.toLowerCase();
  if (f.includes("contrast") || m.includes("contrast ratio") || m.includes("wcag")) return "D";
  if (f.includes("visual-") || m.includes("tomatchsnapshot") || m.includes("screenshot comparison")) return "D";
  if (
    m.includes("econnrefused") ||
    m.includes("net::err_connection") ||
    m.includes("browsertype.launch") ||
    m.includes("target page, context or browser has been closed") ||
    m.includes("missing dependenc") ||
    m.includes("error while loading shared libraries")
  )
    return "C-env";
  if (
    m.includes("waiting for locator") ||
    m.includes("strict mode violation") ||
    m.includes("resolved to 0 elements") ||
    m.includes("getbyrole")
  )
    return "C-selector";
  return null;
}

const files = collectFiles(inputs);
if (files.length === 0) {
  console.error("[consolidate-e2e] nenhum relatório JSON encontrado em:", inputs.join(", "));
  process.exit(2);
}

/** @type {Map<string, any>} */
const failures = new Map();
/** engine -> stats */
const engineStats = new Map();
/** `${engine}|${shard}` -> stats */
const shardStats = new Map();
const enginesSeen = new Set();

function bump(map, key, field, by = 1) {
  const cur = map.get(key) || { total: 0, passed: 0, failed: 0, skipped: 0, flaky: 0, durationMs: 0 };
  cur[field] += by;
  map.set(key, cur);
}

for (const file of files) {
  let report;
  try {
    report = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    console.warn(`[consolidate-e2e] ignorando JSON inválido: ${file}`);
    continue;
  }
  const nameMatch = /results-([a-z]+)-([\w.]+)\.json$/i.exec(path.basename(file));
  const fileEngine = nameMatch ? nameMatch[1] : null;
  const fileShard = nameMatch ? nameMatch[2] : "—";

  const walk = (suite, specFile) => {
    const currentFile = suite.file || specFile;
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const engine = fileEngine || test.projectName || "unknown";
        enginesSeen.add(engine);
        const shardKey = `${engine}|${fileShard}`;
        const results = test.results || [];
        const last = results[results.length - 1];
        const status = test.status || last?.status || "unknown";
        bump(engineStats, engine, "total");
        bump(shardStats, shardKey, "total");
        const dur = results.reduce((a, r) => a + (r.duration || 0), 0);
        bump(engineStats, engine, "durationMs", dur);
        bump(shardStats, shardKey, "durationMs", dur);

        if (status === "skipped") {
          bump(engineStats, engine, "skipped");
          bump(shardStats, shardKey, "skipped");
          continue;
        }
        if (status === "flaky") {
          bump(engineStats, engine, "flaky");
          bump(shardStats, shardKey, "flaky");
        }
        const failed = status === "unexpected" || status === "failed" || status === "flaky";
        if (!failed) {
          bump(engineStats, engine, "passed");
          bump(shardStats, shardKey, "passed");
          continue;
        }
        if (status !== "flaky") {
          bump(engineStats, engine, "failed");
          bump(shardStats, shardKey, "failed");
        }

        const errResult = results.find((r) => r.error || (r.errors || []).length) || last || {};
        const message = errResult.error?.message || (errResult.errors || [])[0]?.message || errResult.status || "";
        const assertion = firstAssertionLine(message);
        const key = `${currentFile}::${spec.title}::${normalizeError(assertion)}`;
        const entry =
          failures.get(key) ||
          {
            spec: currentFile,
            test: spec.title,
            route: extractRoute(`${message} ${spec.title}`),
            assertion,
            ...expectedFound(message),
            engines: new Set(),
            shards: new Set(),
            flaky: false,
            attachments: new Set(),
            raw: rawCategory(currentFile, message),
          };
        entry.engines.add(engine);
        entry.shards.add(fileShard);
        if (status === "flaky") entry.flaky = true;
        for (const att of errResult.attachments || []) {
          if (att.name === "trace" || att.name === "screenshot") entry.attachments.add(att.name);
        }
        failures.set(key, entry);
      }
    }
    for (const child of suite.suites || []) walk(child, currentFile);
  };

  for (const suite of report.suites || []) walk(suite, suite.file || "?");
}

const engines = [...enginesSeen].sort();

function classify(entry) {
  if (entry.raw === "D") return { cat: "D", label: "Contraste / snapshot visual", prio: "P2" };
  if (entry.flaky) return { cat: "B", label: "Flakiness", prio: "P1" };
  if (entry.raw === "C-env") return { cat: "C", label: "Problema ambiental / infraestrutura da suíte", prio: "P1" };
  const failsEverywhere = engines.length > 0 && engines.every((e) => entry.engines.has(e));
  if (entry.raw === "C-selector") {
    return failsEverywhere
      ? { cat: "C", label: "Teste obsoleto (seletor)", prio: "P1" }
      : { cat: "B", label: "Dependência de engine (seletor/render)", prio: "P1" };
  }
  if (failsEverywhere) return { cat: "A", label: "Bug real de produção (todos os engines)", prio: "P0" };
  return { cat: "B", label: "Dependência de engine", prio: "P1" };
}

const rows = [...failures.values()]
  .map((e) => ({ ...e, ...classify(e) }))
  .sort((a, b) => a.cat.localeCompare(b.cat) || a.spec.localeCompare(b.spec));

const fmtMs = (ms) => `${(ms / 1000).toFixed(1)}s`;

const lines = [];
lines.push("# Inventário consolidado de falhas E2E");
lines.push("");
lines.push(`Gerado em ${new Date().toISOString()} a partir de ${files.length} relatório(s).`);
lines.push("");
lines.push("## Resultado por engine");
lines.push("");
lines.push("| Engine | Total | Passou | Falhou | Ignorado | Flaky | Duração |");
lines.push("| ------ | ----: | -----: | -----: | -------: | ----: | ------: |");
for (const engine of engines) {
  const s = engineStats.get(engine) || {};
  lines.push(
    `| ${engine} | ${s.total || 0} | ${s.passed || 0} | ${s.failed || 0} | ${s.skipped || 0} | ${s.flaky || 0} | ${fmtMs(s.durationMs || 0)} |`,
  );
}
lines.push("");
lines.push("## Resultado por shard");
lines.push("");
lines.push("| Engine | Shard | Total | Passou | Falhou | Flaky | Duração |");
lines.push("| ------ | ----- | ----: | -----: | -----: | ----: | ------: |");
for (const [key, s] of [...shardStats.entries()].sort()) {
  const [engine, shard] = key.split("|");
  lines.push(
    `| ${engine} | ${shard} | ${s.total} | ${s.passed} | ${s.failed} | ${s.flaky} | ${fmtMs(s.durationMs)} |`,
  );
}
lines.push("");
lines.push("## Falhas deduplicadas e classificadas");
lines.push("");
if (rows.length === 0) {
  lines.push("Nenhuma falha registrada nos relatórios analisados.");
} else {
  lines.push("| # | Cat | Prio | Spec | Teste | Rota | Engines | Shards | Assertion | Esperado | Encontrado | Evidência |");
  lines.push("| -: | --- | ---- | ---- | ----- | ---- | ------- | ------ | --------- | -------- | ---------- | --------- |");
  rows.forEach((r, i) => {
    const ev = [...r.attachments].join(" + ") || "—";
    const esc = (s) => String(s).replace(/\|/g, "\\|");
    lines.push(
      `| ${i + 1} | ${r.cat} | ${r.prio} | ${esc(r.spec)} | ${esc(r.test)} | ${esc(r.route)} | ${[...r.engines].sort().join(", ")} | ${[...r.shards].sort().join(", ")} | ${esc(r.assertion)} | ${esc(r.expected)} | ${esc(r.found)} | ${ev} |`,
    );
  });
  lines.push("");
  lines.push("### Legenda das categorias");
  lines.push("");
  lines.push("- **A** — bug real de produção: falha determinística em todos os engines executados. Prioridade P0.");
  lines.push("- **B** — dependência de engine ou flakiness: falha em subconjunto de engines/execuções. Prioridade P1.");
  lines.push("- **C** — teste obsoleto ou infraestrutura da suíte (seletor, servidor, ambiente). Prioridade P1.");
  lines.push("- **D** — contraste, acessibilidade ou snapshot visual. Fora de escopo desta rodada. Prioridade P2.");
}
lines.push("");

const md = lines.join("\n");
if (outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, md);
  console.log(`[consolidate-e2e] relatório escrito em ${outFile} (${rows.length} falhas deduplicadas).`);
} else {
  console.log(md);
}
