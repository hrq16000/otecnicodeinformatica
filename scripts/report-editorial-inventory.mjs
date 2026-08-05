#!/usr/bin/env node
// Inventário editorial (Rodada 4F) — gera reports/editorial-inventory.md
// Fonte: acervo de artigos + registro fail-closed + mapa de clusters.
// Não altera conteúdo; apenas classifica e evidencia o estado atual.

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => fs.readFile(path.join(ROOT, p), "utf8");

const FORA_DO_CORE = [
  [/^preciso-de-um|^por-que-todo-prestador/, "outra marca"],
  [/cftv|camera|cameras|monitoramento|seguranca-casas/, "CFTV"],
  [/celular|android|whatsapp-tv|conectar-celular/, "celular"],
  [/-tv$|tv-|impressora|nobreak/, "TV/periféricos"],
  [/^ia-|inteligencia-artificial|chatgpt|stable-diffusion|llm|prompts/, "IA"],
  [/linux|ubuntu|docker|apache|nginx|postgresql|systemd|bash|ssh|pfsense|vlan/, "infra/Linux avançado"],
];

function foraDoCore(slug) {
  for (const [re, motivo] of FORA_DO_CORE) if (re.test(slug)) return motivo;
  return null;
}

const main = async () => {
  const base = await read("src/data/blogPostsContent.tsx");
  const prog = await read("src/data/blogProgrammaticPosts.tsx");
  const clusterSrc = await read("src/lib/editorialClusters.ts");
  const registry = await read("src/lib/blogEditorialRegistry.ts");

  const manuais = [...base.matchAll(/^ {2}"([a-z0-9-]+)":\s*\{\s*\n\s*title:\s*"([^"]+)"/gm)].map(
    (m) => ({ slug: m[1], title: m[2], origem: "manual" }),
  );
  const programaticos = [...prog.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*title:\s*"([^"]+)"/g)].map(
    (m) => ({ slug: m[1], title: m[2], origem: "programático" }),
  );
  const artigos = [...manuais, ...programaticos];

  const aprovados = /APPROVED_EDITORIAL_CONTENT[\s\S]{0,400}?"[a-z0-9-]+"/.test(registry);
  const wave = [...clusterSrc.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*cluster:\s*"([a-z-]+)",\s*\n\s*acao:\s*"([a-z-]+)"/g)]
    .map((m) => ({ slug: m[1], cluster: m[2], acao: m[3] }));
  const waveBySlug = new Map(wave.map((w) => [w.slug, w]));

  const rows = artigos.map((a) => {
    const w = waveBySlug.get(a.slug);
    const fora = foraDoCore(a.slug);
    const acao = w?.acao ?? (fora ? "fora-de-foco (avaliar)" : "manter-noindex");
    return {
      ...a,
      cluster: w?.cluster ?? (fora ? `fora do core — ${fora}` : "não classificado"),
      acao,
      index: aprovados ? "conforme registro editorial" : "noindex (registro fail-closed)",
      sitemap: "não",
    };
  });

  const porAcao = rows.reduce((acc, r) => ((acc[r.acao] = (acc[r.acao] || 0) + 1), acc), {});
  const foraCount = rows.filter((r) => r.cluster.startsWith("fora do core")).length;

  const md = [
    "# Inventário editorial — Rodada 4F",
    "",
    `Gerado a partir do código-fonte em ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "## Resumo",
    "",
    `- Artigos no acervo: **${rows.length}** (${manuais.length} manuais, ${programaticos.length} programáticos)`,
    `- Indexação: **${aprovados ? "conforme registro editorial" : "nenhum artigo aprovado (registro fail-closed)"}**`,
    "- Artigos no sitemap: **0** (o sitemap contém apenas rotas curadas)",
    `- Conteúdos fora do core identificados: **${foraCount}**`,
    `- Primeira onda classificada: **${wave.length}** conteúdos`,
    "",
    "### Distribuição por ação",
    "",
    "| Ação | Conteúdos |",
    "| --- | --- |",
    ...Object.entries(porAcao).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} |`),
    "",
    "## Primeira onda",
    "",
    "| Slug | Cluster | Ação |",
    "| --- | --- | --- |",
    ...wave.map((w) => `| ${w.slug} | ${w.cluster} | ${w.acao} |`),
    "",
    "## Acervo completo",
    "",
    "| Slug | Título | Origem | Cluster / classificação | Ação | Index | Sitemap |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map(
      (r) => `| ${r.slug} | ${r.title.replace(/\|/g, "/")} | ${r.origem} | ${r.cluster} | ${r.acao} | ${r.index} | ${r.sitemap} |`,
    ),
    "",
  ].join("\n");

  await fs.mkdir(path.join(ROOT, "reports"), { recursive: true });
  await fs.writeFile(path.join(ROOT, "reports/editorial-inventory.md"), md);
  console.log(
    `✔ Inventário editorial: reports/editorial-inventory.md (${rows.length} artigos, ${wave.length} na primeira onda, ${foraCount} fora do core).`,
  );
};

main().catch((e) => { console.error(e); process.exit(1); });
