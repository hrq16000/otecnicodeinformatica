#!/usr/bin/env node
// @ts-nocheck
/**
 * Envia notificação para o Slack quando o relatório de segurança marca
 * qualquer internal_id monitorado como FOUND.
 *
 * Entrada: reports/security-scan-summary.json (gerado por report-security-scan.mjs).
 * Requer a variável de ambiente SLACK_WEBHOOK_URL (Incoming Webhook).
 *
 * Uso:
 *   node scripts/notify-security-slack.mjs            # só notifica se houver FOUND
 *   node scripts/notify-security-slack.mjs --always   # notifica também quando limpo
 *
 * Nunca falha o build por si só — o bloqueio do merge é feito pelo gate
 * (report-security-scan.mjs sai com código 1).
 */
import { readFileSync, existsSync } from "node:fs";

const SUMMARY = "reports/security-scan-summary.json";
const ALWAYS = process.argv.includes("--always");
const webhook = process.env.SLACK_WEBHOOK_URL;

if (!existsSync(SUMMARY)) {
  console.log(`[slack] ${SUMMARY} ausente — nada a notificar.`);
  process.exit(0);
}

const summary = JSON.parse(readFileSync(SUMMARY, "utf8"));
const found = summary.found ?? [];

if (found.length === 0 && !ALWAYS) {
  console.log("[slack] nenhum internal_id monitorado FOUND — sem notificação.");
  process.exit(0);
}

if (!webhook) {
  console.warn(
    "[slack] SLACK_WEBHOOK_URL não configurado — pulando notificação " +
      `(${found.length} finding[s] encontrados).`,
  );
  process.exit(0);
}

const repo = process.env.GITHUB_REPOSITORY ?? "projeto";
const sha = (summary.commit ?? "").slice(0, 7) || "local";
const runUrl =
  process.env.GITHUB_SERVER_URL && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : null;

const clean = found.length === 0;
const lines = clean
  ? ["Nenhum internal_id monitorado com status FOUND."]
  : found.map((f) => `• \`${f.internal_id}\` — *${f.status}* — ${f.description}`);

const payload = {
  text: clean
    ? `:white_check_mark: Segurança OK em ${repo}@${sha}`
    : `:rotating_light: Segurança: ${found.length} finding(s) monitorado(s) em ${repo}@${sha}`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          (clean
            ? `:white_check_mark: *Scan de segurança limpo* — \`${repo}\` @ \`${sha}\`\n`
            : `:rotating_light: *Findings de segurança detectados* — \`${repo}\` @ \`${sha}\`\n`) +
          lines.join("\n") +
          (runUrl ? `\n\n<${runUrl}|Ver execução e baixar o relatório HTML>` : ""),
      },
    },
  ],
};

const res = await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.warn(`[slack] webhook respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  process.exit(0);
}
console.log(`[slack] notificação enviada (${found.length} finding[s]).`);
