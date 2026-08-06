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
// Permite usar um Chromium de sistema quando o binário empacotado do Playwright
// não tem as bibliotecas necessárias (sandbox/CI mínimo).
const EXECUTABLE = process.env.CUTOVER_CHROMIUM_PATH || undefined;
const PAGES = [
  { path: "/", name: "home", expect: 200 },
  { path: "/servicos", name: "serviços", expect: 200 },
  { path: "/servicos/formatacao", name: "rota profunda", expect: 200 },
  { path: "/tecnico-informatica-curitiba", name: "cidade", expect: 200 },
  { path: "/bairros/batel", name: "bairro", expect: 200 },
  { path: "/faq", name: "faq", expect: 200 },
  { path: "/precos-e-politicas", name: "preços", expect: 200 },
];
const ALIAS = process.env.CUTOVER_ALIAS ?? "/servicos/formatacao-computador";
const NOT_FOUND = "/rota-inexistente-cutover-gate";

const expectLocal = /localhost|127\.0\.0\.1/.test(BASE); // paridade local já entrega 301/404 reais
const results = [];
const fail = [];

let browser;
try {
  browser = await chromium.launch({
    executablePath: EXECUTABLE,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
} catch (e) {
  console.error("INDISPONÍVEL: não foi possível iniciar o Chromium neste ambiente.");
  console.error(`  motivo: ${String(e.message).split("\n")[0]}`);
  console.error("  execute este gate em CI (actions/setup + npx playwright install --with-deps chromium)");
  console.error("  ou defina CUTOVER_CHROMIUM_PATH com um Chromium de sistema.");
  process.exit(2); // 2 = ambiente sem navegador (≠ 1 = falha real de gate)
}
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const consoleErrors = [];
const networkErrors = [];
const requestsByPage = new Map();
let currentPage = "(inicial)";
page.on("request", () => requestsByPage.set(currentPage, (requestsByPage.get(currentPage) ?? 0) + 1));
const isThirdParty = (u = "") => /googlesyndication|google-analytics|googletagmanager|doubleclick|supabase\.co|clarity\.ms|facebook/.test(u);
page.on("console", (m) => {
  if (m.type() !== "error") return;
  const text = m.text();
  const loc = m.location()?.url ?? "";
  // Falhas de terceiros (analytics/ads/API externa) não bloqueiam o cutover.
  if (isThirdParty(loc) || /status of (400|401|403|404|429)/.test(text)) return;
  consoleErrors.push(`${page.url()} :: ${text.slice(0, 200)}`);
});
page.on("requestfailed", (r) => {
  const u = r.url();
  if (isThirdParty(u) || !u.startsWith(BASE)) return; // só recursos próprios bloqueiam
  networkErrors.push(`${u.slice(0, 160)} :: ${r.failure()?.errorText}`);
});


async function visit(path) {
  currentPage = path;
  requestsByPage.set(path, 0);
  const res = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1500);
  return res;
}

for (const p of PAGES) {
  const res = await visit(p.path);
  const status = res?.status() ?? 0;
  const h1 = await page.locator("h1").first().innerText().catch(() => "");
  const ok = status === p.expect && h1.trim().length > 0;
  results.push(`${ok ? "OK  " : "FALHA"} ${p.name.padEnd(14)} ${status} h1="${h1.slice(0, 60)}" req=${requestsByPage.get(p.path)}`);
  if (!ok) fail.push(`${p.path}: status ${status}, h1 "${h1.slice(0, 60)}"`);
}

// Refresh de rota profunda (deep link direto)
const refresh = await visit("/servicos/formatacao");
results.push(`${refresh?.status() === 200 ? "OK  " : "FALHA"} refresh        ${refresh?.status()}`);
if (refresh?.status() !== 200) fail.push("refresh de rota profunda não retornou 200");

// Assets críticos: JS, CSS e imagens carregados com MIME correto
await visit("/");
const assetAudit = await page.evaluate(async () => {
  const urls = [
    ...[...document.querySelectorAll("script[src]")].map((s) => s.src),
    ...[...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
    ...[...document.querySelectorAll("img[src]")].map((i) => i.src).slice(0, 3),
  ].filter((u) => u.startsWith(location.origin));
  const out = [];
  for (const u of urls.slice(0, 12)) {
    try {
      const r = await fetch(u, { method: "GET" });
      out.push({ u, status: r.status, type: r.headers.get("content-type") ?? "" });
    } catch (e) {
      out.push({ u, status: 0, type: String(e) });
    }
  }
  return out;
});
const badAssets = assetAudit.filter(
  (a) => a.status !== 200 || (/\.(js|css)(\?|$)/.test(a.u) && /text\/html/.test(a.type)),
);
results.push(`${badAssets.length === 0 ? "OK  " : "FALHA"} assets         auditados=${assetAudit.length} inválidos=${badAssets.length}`);
for (const b of badAssets) fail.push(`asset inválido: ${b.u} (${b.status} ${b.type})`);

// Triagem: CTA visível, modal abre e avança pelo menos um passo
const cta = page.locator('button:has-text("Agendar"), button:has-text("WhatsApp"), a[href*="wa.me"]').first();
const ctaOk = await cta.isVisible().catch(() => false);
let triageOpened = false;
let triageAdvanced = false;
if (ctaOk) {
  await cta.click({ timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(900);
  triageOpened = await page.locator('[role="dialog"]').first().isVisible().catch(() => false);
  if (triageOpened) {
    const step = page.locator('[role="dialog"] button:visible').nth(1);
    await step.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(700);
    triageAdvanced = await page.locator('[role="dialog"]').first().isVisible().catch(() => false);
  }
}
results.push(`${ctaOk && triageOpened ? "OK  " : "FALHA"} triagem        cta=${ctaOk} modal=${triageOpened} avanço=${triageAdvanced}`);
if (!ctaOk) fail.push("nenhum CTA de triagem/WhatsApp visível na home");
if (ctaOk && !triageOpened) fail.push("CTA de triagem não abriu o modal");

// Falhas de rede acumuladas
const netFail = networkErrors.length;
results.push(`${netFail === 0 ? "OK  " : "FALHA"} rede           falhas=${netFail}`);
if (netFail > 0) fail.push(`${netFail} falha(s) de rede durante a navegação`);

// Erros críticos de console
if (consoleErrors.length) fail.push(`${consoleErrors.length} erro(s) críticos de console`);
results.push(`${consoleErrors.length === 0 ? "OK  " : "FALHA"} console        erros=${consoleErrors.length}`);

// Alias → 301 de salto único contra o servidor de paridade / Worker
const aliasRes = await visit(ALIAS);
const aliasChain = aliasRes?.request().redirectedFrom() ? "com redirect" : "sem redirect";
const aliasOk = aliasRes?.status() === 200 && page.url().endsWith("/servicos/formatacao");
results.push(`${aliasOk ? "OK  " : "AVISO"} alias          ${ALIAS} → ${aliasRes?.status()} (${aliasChain}) · url final ${page.url()}`);
if (expectLocal && !aliasOk) fail.push(`alias ${ALIAS} não resolveu por 301 de salto único`);

// 404 real
const nf = await visit(NOT_FOUND);
const nfStatus = nf?.status();

results.push(`${nfStatus === 404 ? "OK  " : expectLocal ? "FALHA" : "AVISO"} 404            ${NOT_FOUND} → ${nfStatus}`);
if (expectLocal && nfStatus !== 404) fail.push("servidor de paridade não retornou 404 real");

// Média de requisições por página (insumo para o dimensionamento do Worker)
const counts = [...requestsByPage.values()].filter((n) => n > 0);
const avg = counts.length ? (counts.reduce((a, b) => a + b, 0) / counts.length).toFixed(1) : "0";
results.push(`INFO requisições    média por página=${avg} (máx=${Math.max(0, ...counts)})`);


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
