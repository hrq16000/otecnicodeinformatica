#!/usr/bin/env node
// @ts-nocheck
/**
 * Relatório semanal de SEO e governança (Rodada 4B).
 *
 * Executa os gates de regressão mais sensíveis — canibalização,
 * interlinking, JSON-LD e claims de confiança — e consolida o resultado
 * em `docs/relatorios/semanal-<data>.md` + CSV, destacando o que passou a
 * falhar em relação ao relatório anterior.
 *
 * Uso: npm run report:weekly-seo   (não falha o build por si só;
 * o job semanal continua quebrando nos gates individuais)
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "docs", "relatorios");

const GATES = [
  { id: "cannibalization", label: "Canibalização de intenção", cmd: "npm run check:cannibalization" },
  { id: "internal-links", label: "Links internos (strict)", cmd: "npm run check:internal-links:strict" },
  { id: "local-interlinking", label: "Interlinking local mãe ⇄ filhas", cmd: "npm run check:local-interlinking" },
  { id: "editorial-cluster", label: "Interlinking artigo ⇄ pilar", cmd: "npm run check:editorial-cluster" },
  { id: "jsonld", label: "JSON-LD (validação geral)", cmd: "npm run validate:jsonld" },
  { id: "jsonld-parity", label: "Paridade JSON-LD × conteúdo visível", cmd: "npm run check:jsonld-parity" },
  { id: "rich-results", label: "Rich results (strict)", cmd: "npm run check:rich-results:strict" },
  { id: "trust-claims", label: "Claims de confiança e copy proibida", cmd: "npm run check:copy" },
  { id: "nap", label: "NAP / WhatsApp oficial", cmd: "npm run check:nap" },
  { id: "sitemap-source", label: "Manifesto × sitemap", cmd: "npm run check:sitemap-source" },
];

/**
 * Taxonomia de conversão acompanhada no painel /admin/conversao.
 * Mantida aqui de propósito: o gate `check:analytics-parity` compara esta
 * lista com o GA4 e com o insert em `click_events`, impedindo que o
 * relatório semanal deixe de contabilizar um evento ou uma UTM.
 */
const EVENTOS_CONVERSAO = ["wa_click", "call_click", "funnel_open"];
const UTMS_CONVERSAO = ["utm_source", "utm_medium", "utm_campaign"];
const RECORTES_CONVERSAO = ["path", "cta_position", "viewport_bucket", "funnel_stage", "variant"];

function rodar(gate) {
  const inicio = Date.now();
  try {
    execSync(gate.cmd, { stdio: "pipe", encoding: "utf8" });
    return { ...gate, status: "ok", ms: Date.now() - inicio, detalhe: "" };
  } catch (err) {
    const saida = `${err.stdout || ""}${err.stderr || ""}`.trim().split("\n").slice(-6).join(" | ");
    return { ...gate, status: "falha", ms: Date.now() - inicio, detalhe: saida.slice(0, 500) };
  }
}

function relatorioAnterior() {
  if (!existsSync(OUT_DIR)) return null;
  const arquivos = readdirSync(OUT_DIR)
    .filter((f) => f.startsWith("semanal-") && f.endsWith(".json"))
    .sort();
  if (arquivos.length === 0) return null;
  try {
    return JSON.parse(readFileSync(path.join(OUT_DIR, arquivos[arquivos.length - 1]), "utf8"));
  } catch {
    return null;
  }
}

const anterior = relatorioAnterior();
const resultados = GATES.map(rodar);
const data = new Date().toISOString().slice(0, 10);
mkdirSync(OUT_DIR, { recursive: true });

const statusAnterior = new Map((anterior?.resultados ?? []).map((r) => [r.id, r.status]));
const regressoes = resultados.filter((r) => r.status === "falha" && statusAnterior.get(r.id) === "ok");
const recuperados = resultados.filter((r) => r.status === "ok" && statusAnterior.get(r.id) === "falha");
const falhas = resultados.filter((r) => r.status === "falha");

const md = [
  `# Relatório semanal de SEO e governança — ${data}`,
  "",
  `Gates executados: **${resultados.length}** · falhas: **${falhas.length}** · regressões desde o último relatório: **${regressoes.length}**`,
  "",
  regressoes.length
    ? `## Regressões\n\n${regressoes.map((r) => `- **${r.label}** — ${r.detalhe || "ver log do gate"}`).join("\n")}`
    : "## Regressões\n\nNenhuma regressão nova desde o relatório anterior.",
  "",
  recuperados.length
    ? `## Recuperados\n\n${recuperados.map((r) => `- ${r.label}`).join("\n")}`
    : "",
  "",
  "## Taxonomia de conversão monitorada",
  "",
  `Eventos: ${EVENTOS_CONVERSAO.map((e) => `\`${e}\``).join(", ")}.`,
  `UTMs: ${UTMS_CONVERSAO.map((u) => `\`${u}\``).join(", ")}.`,
  `Recortes: ${RECORTES_CONVERSAO.map((r) => `\`${r}\``).join(", ")}.`,
  "",
  "## Resultado por gate",
  "",
  "| Gate | Status | Tempo | Observação |",
  "| --- | --- | --- | --- |",
  ...resultados.map(
    (r) => `| ${r.label} | ${r.status === "ok" ? "OK" : "FALHA"} | ${(r.ms / 1000).toFixed(1)}s | ${r.detalhe ? r.detalhe.replace(/\|/g, "/") : "—"} |`,
  ),
  "",
].filter(Boolean).join("\n");

const csv = [
  "gate,label,status,duracao_s,observacao",
  ...resultados.map(
    (r) => `${r.id},"${r.label}",${r.status},${(r.ms / 1000).toFixed(1)},"${(r.detalhe || "").replace(/"/g, "'")}"`,
  ),
].join("\n");

writeFileSync(path.join(OUT_DIR, `semanal-${data}.md`), `${md}\n`);
writeFileSync(path.join(OUT_DIR, `semanal-${data}.csv`), `${csv}\n`);
writeFileSync(
  path.join(OUT_DIR, `semanal-${data}.json`),
  `${JSON.stringify({ data, resultados }, null, 2)}\n`,
);

console.log(md);
console.log(`\nArquivos: docs/relatorios/semanal-${data}.{md,csv,json}`);
if (falhas.length) console.log(`\n${falhas.length} gate(s) com falha — ver detalhes acima.`);
