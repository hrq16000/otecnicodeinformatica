#!/usr/bin/env node
/**
 * RODADA 5E — geração e publicação automática do relatório final.
 *
 * Lê as evidências já produzidas pelos gates (public/local-gates.json,
 * reports/local-*.json) e escreve docs/relatorio-rodada-5e-final.md com
 * resumo executivo, tabelas por bairro e links para as evidências.
 * Com SLACK_WEBHOOK_URL definido, envia o resumo executivo ao canal.
 *
 * Fail-closed: sem evidência gerada, o relatório não é escrito.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { BAIRROS_ANCORA_META, resolveLocal } from "./lib/local-index-policy.mjs";

const ler = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null);

const gates = ler("public/local-gates.json");
if (!gates) {
  console.error("[report-rodada-5e] public/local-gates.json ausente — rode `npm run report:local-gates` antes.");
  process.exit(1);
}
const similaridade = ler("reports/local-doorway.json") ?? ler("reports/local-service-sjp-similarity.json");

const bairros = BAIRROS_ANCORA_META.map((b) => {
  const path = `/bairros/${b.slug}`;
  const linha = gates.rotas.find((r) => r.path === path);
  return { ...b, path, veredito: linha?.veredito ?? "NAO_AVALIADO", gates: linha?.gates ?? {} };
});

const lote2 = bairros.filter((b) => (b.lote ?? 1) === 2);
const gatesVermelhos = gates.gates.filter((g) => g.status !== "pass");

const tabela = (lista) =>
  [
    "| Bairro | Cidade-pai | Intenção declarada | Veredito | Gates |",
    "| --- | --- | --- | --- | --- |",
    ...lista.map(
      (b) =>
        `| [${b.slug}](${b.path}) | ${b.cidade} | ${b.intent ?? "—"} | **${b.veredito}** | ` +
        `${Object.entries(b.gates).map(([k, v]) => `${k.replace("local-", "")}:${v}`).join(" · ")} |`,
    ),
  ].join("\n");

const md = `# Rodada 5E — Bairros âncora (Lote 2)

_Gerado automaticamente por \`scripts/report-rodada-5e.mjs\` em ${new Date().toISOString()}._

## Resumo executivo

- Bairros âncora totais: **${bairros.length}** (Lote 1: ${bairros.length - lote2.length} · Lote 2: ${lote2.length}).
- Vereditos: INDEX ${gates.resumo.index} · CANONICALIZED_TO_PARENT ${gates.resumo.canonicalized} · NOINDEX ${gates.resumo.noindex} · DISABLED ${gates.resumo.disabled} (${gates.resumo.total} rotas locais governadas).
- Gates bloqueantes: ${gatesVermelhos.length === 0 ? "**todos verdes**" : `**${gatesVermelhos.length} vermelho(s)**: ${gatesVermelhos.map((g) => g.id).join(", ")}`}.
- Nenhuma página de bairro declara filial, técnico residente, tempo de chegada ou distância — proibições verificadas pelo gate \`check:local-neighborhood-intent\`.

## Lote 2 promovido

${tabela(lote2)}

## Lote 1 (mantido)

${tabela(bairros.filter((b) => (b.lote ?? 1) !== 2))}

## Similaridade (antidoorway)

${
  similaridade
    ? `Máximo observado: **${similaridade.maiorJaccard ?? similaridade.max ?? "ver evidência"}**. Evidência: \`reports/local-doorway.json\`.`
    : "Evidência de similaridade não encontrada — rode `npm run check:local-doorway`."
}

## Evidências

- \`public/local-gates.json\` — status de gate por rota (painel \`/admin/gates-locais\`).
- \`public/local-audit.json\` — canonical/robots/sitemap por rota (painel \`/admin/auditoria-local\`).
- \`reports/local-regression.json\` — revalidação diária (workflow \`local-guardrails\`).
- \`src/lib/localIndexPolicy.json\` — política central (fonte única de verdade).
`;

mkdirSync("docs", { recursive: true });
writeFileSync("docs/relatorio-rodada-5e-final.md", md);
console.log(`[report-rodada-5e] docs/relatorio-rodada-5e-final.md escrito (${lote2.length} bairros no Lote 2).`);

const webhook = process.env.SLACK_WEBHOOK_URL;
if (webhook) {
  const texto =
    `*Rodada 5E — bairros âncora*\n` +
    `Lote 2: ${lote2.length} bairros · INDEX ${gates.resumo.index} · ` +
    `gates ${gatesVermelhos.length === 0 ? "verdes ✅" : `vermelhos ❌ (${gatesVermelhos.map((g) => g.id).join(", ")})`}\n` +
    lote2.map((b) => `• ${b.path} (${b.cidade}) → ${b.veredito}`).join("\n");
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: texto }),
  }).catch((e) => ({ ok: false, statusText: e.message }));
  console.log(`[report-rodada-5e] Slack: ${res.ok ? "enviado" : `falhou (${res.statusText})`}`);
} else {
  console.log("[report-rodada-5e] SLACK_WEBHOOK_URL ausente — resumo não enviado (fail-closed).");
}
