#!/usr/bin/env node
/**
 * GERADOR — public/robots.txt dinâmico.
 *
 * Fonte única: site-env (domínio + flag de indexação) e curated-urls (rotas
 * indexáveis + sitemaps ativos). Nada é escrito à mão:
 *   • indexação ligada  → Allow: / com Disallow explícito das áreas privadas
 *                          e diretivas Sitemap dos sitemaps realmente gerados;
 *   • fail-closed       → sem domínio/flag, robots bloqueia tudo e não aponta
 *                          sitemap nenhum (nunca herda domínio de outra marca).
 *
 * Uso: node scripts/generate-robots.mjs [saida=public/robots.txt]
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { BASE_URL, INDEXING_ENABLED, SITE_DOMAIN } from "./lib/site-env.mjs";
import { ACTIVE_SITEMAPS } from "./lib/curated-urls.mjs";

const OUT = path.resolve(process.argv[2] || "public/robots.txt");

/** Áreas privadas/operacionais — nunca indexáveis, nunca no sitemap. */
export const ROTAS_PRIVADAS = ["/admin", "/admin/", "/debug/", "/status-os", "/funil-indisponivel"];

/** Bots de busca clássicos + bots de IA/LLM liberados para o conteúdo público. */
const BOTS_LIBERADOS = [
  "Googlebot",
  "Bingbot",
  "Twitterbot",
  "facebookexternalhit",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
];

export function buildRobots() {
  const linhas = [`# O Técnico de Informática${SITE_DOMAIN ? ` — ${SITE_DOMAIN}` : ""}`];

  if (!INDEXING_ENABLED) {
    linhas.push(
      "# Fail-closed: domínio próprio e/ou VITE_SITE_INDEXING_ENABLED ausentes — indexação bloqueada.",
      "",
      "User-agent: *",
      "Disallow: /",
      "",
    );
    return linhas.join("\n");
  }

  linhas.push(
    "# Arquivo gerado por scripts/generate-robots.mjs — não editar à mão.",
    "# Indexação liberada (VITE_SITE_DOMAIN + VITE_SITE_INDEXING_ENABLED=true).",
    "",
    "User-agent: *",
    ...ROTAS_PRIVADAS.map((r) => `Disallow: ${r}`),
    "Allow: /",
    "",
  );

  for (const bot of BOTS_LIBERADOS) {
    linhas.push(`User-agent: ${bot}`, ...ROTAS_PRIVADAS.map((r) => `Disallow: ${r}`), "Allow: /", "");
  }

  linhas.push(
    "# Resumo estruturado para modelos de IA: /llms.txt e /llms-full.txt",
    "",
    `Sitemap: ${BASE_URL}/sitemap-index.xml`,
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    ...ACTIVE_SITEMAPS.map(([nome]) => `Sitemap: ${BASE_URL}/${nome}`),
    "",
  );

  return linhas.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const conteudo = buildRobots();
  writeFileSync(OUT, conteudo, "utf8");
  console.log(
    `robots.txt gerado (${INDEXING_ENABLED ? "indexação liberada" : "FAIL-CLOSED: tudo bloqueado"}) → ${path.relative(process.cwd(), OUT)}`,
  );
}
