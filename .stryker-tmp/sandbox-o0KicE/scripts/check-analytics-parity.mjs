#!/usr/bin/env node
// @ts-nocheck
/**
 * GATE DE PARIDADE DE ANALYTICS
 *
 * Garante que os mesmos IDs de evento e as mesmas chaves de UTM sejam usados em:
 *   - GA4 (src/lib/funnelAnalytics.ts → track())
 *   - persistência no banco (click_events)
 *   - relatório semanal (scripts/report-weekly-seo.mjs)
 *
 * Sem isso, o relatório de conversão por rota deixa de bater com o GA4.
 */
import { readFileSync } from "node:fs";

const EVENTS = ["wa_click", "call_click"];
const UTMS = ["utm_source", "utm_medium", "utm_campaign"];

const funnel = readFileSync("src/lib/funnelAnalytics.ts", "utf8");
const weekly = readFileSync("scripts/report-weekly-seo.mjs", "utf8");

const errors = [];

for (const ev of EVENTS) {
  if (!new RegExp(`track\\("${ev}"`).test(funnel)) errors.push(`GA4 não dispara "${ev}" em funnelAnalytics.ts`);
  // Rodada 4M: a persistência passa por registrarConversaoClique(), que aplica a
  // deduplicação antes de gravar em click_events e de reportar a conversão do Ads.
  // Aceitamos tanto a chamada direta quanto a rota deduplicada — o que não pode
  // faltar é o evento chegar a click_events por algum caminho.
  const persisteDireto = new RegExp(`persistClickEvent\\("${ev}"`).test(funnel);
  const persisteDeduplicado =
    new RegExp(`registrarConversaoClique\\(\\s*"${ev}"`).test(funnel) &&
    /function registrarConversaoClique[\s\S]*?persistClickEvent\(/.test(funnel);
  if (!persisteDireto && !persisteDeduplicado) errors.push(`"${ev}" não é persistido em click_events`);
  if (!weekly.includes(`"${ev}"`)) errors.push(`relatório semanal não contabiliza "${ev}"`);
}

// UTMs precisam existir tanto no payload do GA4 (baseParams) quanto no insert.
const baseParams = funnel.split("function baseParams")[1]?.split("\n}")[0] ?? "";
const persist = funnel.split("function persistClickEvent")[1]?.split("\n}")[0] ?? "";
for (const key of UTMS) {
  if (!baseParams.includes(key)) errors.push(`${key} ausente no payload GA4 (baseParams)`);
  if (!persist.includes(key)) errors.push(`${key} ausente no insert de click_events`);
  if (!weekly.includes(key)) errors.push(`${key} ausente no relatório semanal`);
}

if (errors.length) {
  console.error("BLOQUEADO — paridade de analytics quebrada:");
  errors.forEach((e) => console.error(`  • ${e}`));
  process.exit(1);
}

console.log(`[analytics-parity] OK — eventos ${EVENTS.join(", ")} e UTMs ${UTMS.join(", ")} alinhados em GA4, click_events e relatório semanal.`);
