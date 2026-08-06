#!/usr/bin/env node
/**
 * GATE DE NAVEGADOR PRÉ-CUTOVER (Rodada 2A.3, Fase 9)
 *
 * Substituto reproduzível de `npm run test:e2e` (indisponível no ambiente por
 * falta do pacote privado lovable-agent-playwright-config). Usa Playwright
 * diretamente, sem config do projeto e sem dependências novas.
 *
 *   npm run test:cutover-browser                       # alvo padrão: produção
 *   CUTOVER_BASE_URL=http://localhost:8080 npm run test:cutover-browser
 *
 * Cobre: home, rota profunda, refresh, assets, triagem, alias e 404,
 * registrando erros de console e falhas de rede.
 */
import { chromium } from "playwright";

const BASE = (process.env.CUTOVER_BASE_URL ?? "https://tecnico.curitiba.br").replace(/\/$/, "");
const PAGES = [
  { path: "/", name: "home", expect: 200 },
  { path: "/servicos", name: "serviços", expect: 200 },
  { path: "/servicos/formatacao", name: "rota profunda", expect: 200 },
  { path: "/tecnico-informatica-curitiba", name: "cidade", expect: 200 },
  { path: "/faq", name: "faq", expect: 200 },
  { path: "/precos-e-politicas", name: "preços", expect: 200 },
];
const ALIAS = "/servicos/formatacao-de-computador";
const NOT_FOUND = "/rota-inexistente-cutover-gate";

const results = [];
const fail = [];

let browser;
try {
  browser = await chromium.launch();
} catch (e) {
  console.error("INDISPONÍVEL: não foi possível iniciar o Chromium neste ambiente.");
  console.error(`  motivo: ${String(e.message).split("\n")[0]}`);
  console.error("  execute este gate em CI (actions/setup + npx playwright install --with-deps chromium)");
  console.error("  ou em uma máquina com as bibliotecas de sistema do Chromium.");
  process.exit(2); // 2 = ambiente sem navegador (≠ 1 = falha real de gate)
}
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const consoleErrors = [];
const networkErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(`${page.url()} :: ${m.text().slice(0, 200)}`));
page.on("requestfailed", (r) => networkErrors.push(`${r.url().slice(0, 160)} :: ${r.failure()?.errorText}`));

async function visit(path) {
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1200);
  return res;
}

for (const p of PAGES) {
  const res = await visit(p.path);
  const status = res?.status() ?? 0;
  const h1 = await page.locator("h1").first().innerText().catch(() => "");
  const ok = status === p.expect && h1.trim().length > 0;
  results.push(`${ok ? "OK  " : "FALHA"} ${p.name.padEnd(14)} ${status} h1="${h1.slice(0, 60)}"`);
  if (!ok) fail.push(`${p.path}: status ${status}, h1 "${h1.slice(0, 60)}"`);
}

// Refresh de rota profunda (deep link direto)
const refresh = await visit("/servicos/formatacao");
results.push(`${refresh?.status() === 200 ? "OK  " : "FALHA"} refresh        ${refresh?.status()}`);
if (refresh?.status() !== 200) fail.push("refresh de rota profunda não retornou 200");

// Triagem / funil WhatsApp presente e clicável
await visit("/");
const cta = page.locator('a[href*="wa.me"], button:has-text("WhatsApp"), button:has-text("Agendar")').first();
const ctaOk = await cta.isVisible().catch(() => false);
results.push(`${ctaOk ? "OK  " : "FALHA"} triagem/CTA    visível=${ctaOk}`);
if (!ctaOk) fail.push("nenhum CTA de triagem/WhatsApp visível na home");

// Assets: nenhum 404 em recursos da home
const assetErrors = networkErrors.length;
results.push(`${assetErrors === 0 ? "OK  " : "AVISO"} assets         falhas de rede=${assetErrors}`);

// Alias → deve resolver (301 no edge após cutover; 200 hoje via SPA)
const aliasRes = await visit(ALIAS);
results.push(`INFO alias          ${ALIAS} → ${aliasRes?.status()} · url final ${page.url()}`);

// 404 real
const nf = await visit(NOT_FOUND);
const nfStatus = nf?.status();
results.push(`${nfStatus === 404 ? "OK  " : "AVISO"} 404            ${NOT_FOUND} → ${nfStatus} (404 real só após Worker Route)`);

await browser.close();

console.log(`Gate de navegador pré-cutover — base ${BASE}`);
for (const r of results) console.log(`  ${r}`);
if (consoleErrors.length) {
  console.log("  erros de console:");
  for (const e of consoleErrors.slice(0, 10)) console.log(`    - ${e}`);
}
if (networkErrors.length) {
  console.log("  falhas de rede:");
  for (const e of networkErrors.slice(0, 10)) console.log(`    - ${e}`);
}

if (fail.length) {
  console.error("BLOQUEADO: gate de navegador falhou:");
  for (const f of fail) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("APTO: navegação, assets e triagem operacionais.");
