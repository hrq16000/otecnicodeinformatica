#!/usr/bin/env node
/**
 * ALERTA DE FUNIL NO SLACK (Rodada 6)
 * -----------------------------------
 * Lê os eventos comerciais da janela configurada, calcula as taxas de
 * triagem / WhatsApp / lead / conversão por rota, cidade, bairro e serviço e
 * avisa no Slack quando alguma fica abaixo do limite.
 *
 * Fail-closed:
 *   • sem SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY → não inventa dado, sai 0;
 *   • sem SLACK_WEBHOOK_URL → imprime o alerta e não envia;
 *   • amostra abaixo do mínimo → nenhum alerta (nada de "vencedor" com 2 visitas).
 *
 * Uso: node scripts/alert-funnel-thresholds.mjs [--dry]
 */
import { readFileSync } from "node:fs";
import { avaliarLimites, formatarAlerta } from "./lib/funnel-thresholds.mjs";
import { BASE_URL } from "./lib/site-env.mjs";

const DRY = process.argv.includes("--dry");
const CONFIG = JSON.parse(readFileSync("config/funnel-alert-thresholds.json", "utf8"));

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.log("[alert-funnel] credenciais de leitura ausentes — nenhum alerta calculado (fail-closed).");
  process.exit(0);
}

const desde = new Date(Date.now() - (CONFIG.janelaDias ?? 7) * 86400000).toISOString();
const campos = [
  "created_at",
  "event_type",
  "path",
  "session_id",
  "servico",
  "route_family",
  "neighborhood_slug",
  "utm_source",
  "utm_medium",
  "utm_campaign",
].join(",");

const res = await fetch(
  `${url}/rest/v1/click_events?select=${campos}&created_at=gte.${desde}&order=created_at.desc&limit=50000`,
  { headers: { apikey: key, Authorization: `Bearer ${key}` } },
);

if (!res.ok) {
  console.error(`[alert-funnel] leitura falhou [${res.status}]: ${await res.text()}`);
  process.exit(1);
}

const brutos = await res.json();

// Exclusão de QA espelha o regime do painel (utm de teste + baseline comercial).
const QA_SOURCES = ["teste_4d1", "teste_4d", "teste_4c", "qa"];
const BASELINE = new Date("2026-08-08T00:10:00Z");
const eventos = brutos.filter((e) => {
  const s = (e.utm_source || "").toLowerCase();
  const m = (e.utm_medium || "").toLowerCase();
  const c = (e.utm_campaign || "").toLowerCase();
  if (QA_SOURCES.includes(s) || m === "qa") return false;
  if (["measurement_final", "measurement_cutover"].includes(c)) return false;
  return new Date(e.created_at) >= BASELINE;
});

const { violacoes, avaliados } = avaliarLimites(eventos, CONFIG);

console.log(`[alert-funnel] ${eventos.length} eventos comerciais · ${avaliados.length} recortes avaliados`);
for (const a of avaliados) {
  console.log(
    `  · ${a.tipo}:${a.valor} — ${a.agg.sessoes} sessões · status ${a.status}` +
      (a.status === "actionable"
        ? ` · WA ${(100 * (a.taxas.whatsapp_rate ?? 0)).toFixed(1)}%`
        : " (amostra insuficiente)"),
  );
}

const texto = formatarAlerta(violacoes, {
  janelaDias: CONFIG.janelaDias ?? 7,
  painel: `${BASE_URL || ""}/admin/conversao`,
});

if (!texto) {
  console.log("[alert-funnel] nenhuma métrica abaixo do limite com amostra suficiente.");
  process.exit(0);
}

console.log(texto);

const webhook = process.env.SLACK_WEBHOOK_URL;
if (DRY || !webhook) {
  console.log("[alert-funnel] alerta não enviado (dry-run ou SLACK_WEBHOOK_URL ausente).");
  process.exit(0);
}

const envio = await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: texto }),
});
if (!envio.ok) {
  console.error(`[alert-funnel] Slack respondeu ${envio.status}: ${await envio.text()}`);
  process.exit(1);
}
console.log(`[alert-funnel] ${violacoes.length} alerta(s) enviado(s) ao Slack.`);
