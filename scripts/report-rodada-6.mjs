#!/usr/bin/env node
/**
 * RESUMO EXECUTIVO DA RODADA 6 → SLACK
 *
 * Lê docs/relatorio-rodada-6-final.md, extrai o resumo executivo e envia ao
 * canal configurado. Fail-closed: sem SLACK_WEBHOOK_URL não envia nada.
 *
 * Uso: node scripts/report-rodada-6.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { BASE_URL } from "./lib/site-env.mjs";

const DOC = "docs/relatorio-rodada-6-final.md";
const CONTRATO = "docs/analytics-event-contract.md";

if (!existsSync(DOC)) {
  console.error(`[report-rodada-6] ${DOC} ausente — nada a enviar.`);
  process.exit(1);
}

const md = readFileSync(DOC, "utf8");
const resumo = (md.split("## 1. Resumo executivo")[1] ?? "").split("## 2.")[0].trim();
const vereditos = (md.split("## 4. Vereditos")[1] ?? "").split("## 5.")[0].trim();

const texto = [
  "*Rodada 6 — Conversão e mensuração por rota*",
  resumo,
  "*Vereditos*",
  vereditos,
  `Painel: ${BASE_URL || ""}/admin/conversao`,
  `Docs: ${DOC} · ${CONTRATO}`,
].join("\n\n");

console.log(texto);

const webhook = process.env.SLACK_WEBHOOK_URL;
if (!webhook) {
  console.log("[report-rodada-6] SLACK_WEBHOOK_URL ausente — resumo não enviado (fail-closed).");
  process.exit(0);
}

const res = await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: texto }),
});

if (!res.ok) {
  console.error(`[report-rodada-6] Slack respondeu ${res.status}: ${await res.text()}`);
  process.exit(1);
}
console.log("[report-rodada-6] resumo executivo enviado ao Slack.");
