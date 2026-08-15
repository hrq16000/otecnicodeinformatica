#!/usr/bin/env node
/**
 * ONDA 30 — snapshot de performance de busca por rota de problema.
 *
 * Lê o Search Console pelo connector gateway (server-side) e grava
 * public/local-performance.json, consumido pelo painel /admin/performance-local.
 *
 * FAIL-CLOSED: sem credenciais ou sem propriedade verificada, grava
 * `{ disponivel: false, motivo }` com lista vazia — nunca número estimado.
 *
 * Uso: node scripts/report-local-performance.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { BASE_URL } from "./lib/site-env.mjs";
import { CLUSTER_PROBLEMAS_ROUTES } from "./lib/cluster-problemas-static.mjs";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const lovableKey = process.env.LOVABLE_API_KEY;
const connKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;

const gravar = (payload) => {
  mkdirSync("reports", { recursive: true });
  const body = `${JSON.stringify(payload, null, 2)}\n`;
  writeFileSync("public/local-performance.json", body);
  writeFileSync("reports/local-performance.json", body);
};

const rotas = new Set(CLUSTER_PROBLEMAS_ROUTES.map((r) => r.path));

if (!lovableKey || !connKey) {
  gravar({
    generatedAt: new Date().toISOString(),
    disponivel: false,
    motivo: "Search Console não conectado neste ambiente",
    rotas: [],
  });
  console.log("local-performance: sem credenciais — snapshot fail-closed gravado.");
  process.exit(0);
}

const headers = { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": connKey };

const cobre = (siteUrl, target) => {
  if (siteUrl.startsWith("sc-domain:")) {
    const d = siteUrl.slice(10).toLowerCase();
    const h = new URL(target).hostname.toLowerCase();
    return h === d || h.endsWith(`.${d}`);
  }
  return target.startsWith(siteUrl);
};

try {
  const list = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers });
  if (!list.ok) throw new Error(`sites [${list.status}]: ${await list.text()}`);
  const { siteEntry = [] } = await list.json();
  const matches = siteEntry.filter(
    (e) => e.permissionLevel !== "siteUnverifiedUser" && cobre(e.siteUrl, `${BASE_URL}/`),
  );
  if (matches.length !== 1) {
    gravar({
      generatedAt: new Date().toISOString(),
      disponivel: false,
      motivo:
        matches.length === 0
          ? "nenhuma propriedade verificada cobre o domínio"
          : `múltiplas propriedades verificadas (${matches.map((m) => m.siteUrl).join(", ")}) — escolha necessária`,
      rotas: [],
    });
    console.log("local-performance: propriedade não resolvida — snapshot fail-closed gravado.");
    process.exit(0);
  }

  const dia = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
  const fim = dia(3);
  const inicio = dia(31);
  const fimAnt = dia(32);
  const inicioAnt = dia(60);

  const consultar = async (startDate, endDate) => {
    const res = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(matches[0].siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, dimensions: ["page"], rowLimit: 500 }),
      },
    );
    if (!res.ok) throw new Error(`searchAnalytics [${res.status}]: ${await res.text()}`);
    const { rows = [] } = await res.json();
    return rows
      .map((r) => {
        const path = new URL(r.keys[0]).pathname.replace(/\/$/, "") || "/";
        return { path, clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, ctr: r.ctr ?? 0, position: r.position ?? 0 };
      })
      .filter((r) => rotas.has(r.path));
  };

  const saida = await consultar(inicio, fim);
  const anterior = await consultar(inicioAnt, fimAnt);

  gravar({
    generatedAt: new Date().toISOString(),
    disponivel: true,
    periodo: { inicio, fim },
    periodoAnterior: { inicio: inicioAnt, fim: fimAnt },
    rotas: saida,
    rotasAnterior: anterior,
  });
  console.log(`local-performance: ${saida.length} rota(s) de problema com dados de busca.`);
} catch (e) {
  gravar({
    generatedAt: new Date().toISOString(),
    disponivel: false,
    motivo: `falha ao consultar o Search Console: ${e.message}`,
    rotas: [],
  });
  console.log(`local-performance: ${e.message} — snapshot fail-closed gravado.`);
}
