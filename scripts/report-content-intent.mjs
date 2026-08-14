#!/usr/bin/env node
/**
 * Relatório: INVENTÁRIO EDITORIAL E MAPA DE INTENÇÃO (Rodada 8E).
 *
 * Responde em uma página: quais URLs editoriais existem, quais estão
 * indexáveis, qual intenção cada uma serve, para onde ela leva e qual é
 * o pai comercial/local. Não inventa métrica: o que não há evidência
 * aparece como "sem evidência".
 *
 * Saída: reports/content-intent-8e.md e reports/content-intent-8e.json
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => readFileSync(path.join(ROOT, p), "utf8");

const mapSrc = read("src/lib/contentIntentMap.ts");
const registro = read("src/lib/blogEditorialRegistry.ts");
const conteudo = read("src/data/blogPostsContent.tsx");

const nos = [...mapSrc.matchAll(
  /\{\s*\n\s*url:\s*"([^"]+)",\s*\n\s*intent:\s*"([^"]+)",\s*\n\s*topic:\s*"([^"]+)",\s*\n\s*queries:\s*\[([\s\S]*?)\],([\s\S]*?)novaNestaRodada:\s*(true|false),\s*\n\s*justificativa:\s*\n?\s*"([\s\S]*?)",\s*\n\s*\}/g,
)].map((m) => ({
  url: m[1],
  intent: m[2],
  topic: m[3],
  queries: [...m[4].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  serviceParent: m[5].match(/serviceParent:\s*"([^"]+)"/)?.[1] ?? null,
  problemParent: m[5].match(/problemParent:\s*"([^"]+)"/)?.[1] ?? null,
  localParent: m[5].match(/localParent:\s*"([^"]+)"/)?.[1] ?? null,
  bridgesTo: [...(m[5].match(/bridgesTo:\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  nova: m[6] === "true",
  justificativa: m[7].replace(/\s+/g, " "),
}));

const indexavel = (url) =>
  url.startsWith("/blog/")
    ? new RegExp(`slug:\\s*"${url.replace("/blog/", "")}"`).test(registro)
    : true;

const palavras = (url) => {
  if (!url.startsWith("/blog/")) return null;
  const slug = url.replace("/blog/", "");
  const i = conteudo.indexOf(`"${slug}": {`);
  if (i === -1) return null;
  const prox = conteudo.indexOf('\n  "', i + 5);
  const bloco = conteudo.slice(i, prox === -1 ? conteudo.length : prox);
  return bloco.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
};

const linhas = nos.map((n) => ({ ...n, indexavel: indexavel(n.url), palavras: palavras(n.url) }));

const md = [
  "# Inventário editorial e mapa de intenção — Rodada 8E",
  "",
  `Gerado em ${new Date().toISOString().slice(0, 10)}.`,
  "",
  "| URL | Intenção | Indexável | Palavras | Pai serviço | Pai problema | Nova |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...linhas.map(
    (l) =>
      `| \`${l.url}\` | ${l.intent} | ${l.indexavel ? "sim" : "não"} | ${l.palavras ?? "—"} | ${l.serviceParent ?? "—"} | ${l.problemParent ?? "—"} | ${l.nova ? "sim" : "não"} |`,
  ),
  "",
  "## Justificativa por URL",
  "",
  ...linhas.flatMap((l) => [`### \`${l.url}\``, "", l.justificativa, "", `Consultas-alvo declaradas: ${l.queries.map((q) => `\`${q}\``).join(", ") || "—"}.`, "", `Pontes: ${l.bridgesTo.map((b) => `\`${b}\``).join(", ") || "—"}.`, ""]),
  "## Desempenho",
  "",
  "Sem evidência de tráfego orgânico até a primeira coleta pós-publicação no Search Console. Nenhuma estimativa foi gerada.",
  "",
].join("\n");

mkdirSync(path.join(ROOT, "reports"), { recursive: true });
writeFileSync(path.join(ROOT, "reports/content-intent-8e.md"), md);
writeFileSync(
  path.join(ROOT, "reports/content-intent-8e.json"),
  JSON.stringify({ geradoEm: new Date().toISOString(), urls: linhas }, null, 2),
);
console.log(`report:content-intent — ${linhas.length} URLs -> reports/content-intent-8e.md`);
