/**
 * RODADA 4 — ENTREGÁVEIS 1 e 2: MAPA DE INTENÇÃO E MATRIZ DE CANIBALIZAÇÃO.
 *
 * Este script NÃO reescreve conteúdo e NÃO altera indexabilidade. Ele apenas
 * inventaria o que existe hoje e classifica, para que a reescrita do Lote 1
 * seja decidida com dados e não por impressão:
 *
 *   1. inventário real de todas as páginas de problema/sintoma;
 *   2. taxonomia (inicialização, desempenho, temperatura, armazenamento,
 *      dados, sistema, notebook, rede, hardware);
 *   3. intenção principal (DIAGNÓSTICA / INFORMATIVA / COMERCIAL / LOCAL);
 *   4. cluster e serviço correspondente;
 *   5. risco de canibalização problema↔problema e problema↔serviço,
 *      medido por sobreposição de tokens do slug + título + meta;
 *   6. indexabilidade atual (está no sitemap curado?) e ação recomendada.
 *
 * Fontes: src/lib/problemaPagesData.ts, src/lib/clusterProblemas.ts e
 * scripts/lib/curated-urls.mjs — nenhuma lista nova é mantida à mão.
 *
 * Uso: bun scripts/report-problem-intent-map.ts
 * Saídas: reports/problem-intent-map.{json,csv,md}
 *         reports/problem-cannibalization.{json,csv}
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { problemaPagesData } from "../src/lib/problemaPagesData";
import { CLUSTER_PROBLEMAS } from "../src/lib/clusterProblemas";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

type Registro = {
  url: string;
  origem: "problemaPagesData" | "clusterProblemas";
  titulo: string;
  h1: string;
  descricao: string;
  equipamento: string;
  sintoma: string;
  taxonomia: string;
  cluster: string;
  intencaoPrimaria: string;
  intencaoSecundaria: string;
  servicoRelacionado: string;
  indexavelHoje: boolean;
  riscoCanibalizacao: "BAIXO" | "MÉDIO" | "ALTO" | "CRÍTICO";
  conflitoPrincipal: string;
  acaoRecomendada: string;
};

// ── Taxonomia: cluster ← palavras do slug/título (ordem importa) ────────────
const TAXONOMIA: { nome: string; cluster: string; termos: string[] }[] = [
  { nome: "Dados", cluster: "dados", termos: ["arquivo", "dados", "recuperacao", "apagad", "perdid", "backup"] },
  { nome: "Armazenamento", cluster: "armazenamento", termos: ["hd", "ssd", "disco", "nvme", "espaco", "particao"] },
  { nome: "Temperatura", cluster: "superaquecimento", termos: ["esquent", "aquec", "temperatura", "cooler", "ventoinha", "fan", "queimad"] },
  { nome: "Rede", cluster: "rede", termos: ["wifi", "wi-fi", "internet", "rede", "roteador", "conexao", "lento-internet"] },
  { nome: "Sistema", cluster: "windows", termos: ["windows", "tela-azul", "bsod", "virus", "malware", "atualizacao", "driver", "sistema", "formata"] },
  { nome: "Inicialização", cluster: "nao-liga", termos: ["nao-liga", "nao-inicia", "liga-e-desliga", "tela-preta", "sem-imagem", "nao-da-imagem", "boot", "reinicia", "desliga-sozinho"] },
  { nome: "Desempenho", cluster: "lentidao", termos: ["lent", "trav", "demora", "uso-de-disco", "memoria-cheia", "engasg"] },
  { nome: "Notebook", cluster: "notebook", termos: ["bateria", "carregad", "dobradica", "teclado", "touchpad", "tela-quebrada", "molhad"] },
  { nome: "Hardware", cluster: "hardware", termos: ["fonte", "placa", "memoria", "ram", "video", "gpu", "impressora", "periferic", "barulho"] },
];

// ── Problema → serviço principal (Fase 20: 1 serviço + 2-4 problemas) ───────
const SERVICO_POR_CLUSTER: Record<string, string> = {
  dados: "/servicos/recuperacao-de-dados",
  armazenamento: "/servicos/upgrade-ssd-ram",
  superaquecimento: "/servicos/limpeza-e-pasta-termica",
  rede: "/servicos/redes-e-wifi",
  windows: "/servicos/formatacao-e-backup",
  "nao-liga": "/servicos/manutencao-de-computador",
  lentidao: "/servicos/manutencao-de-computador",
  notebook: "/servicos/manutencao-de-notebook",
  hardware: "/servicos/manutencao-de-computador",
};

const STOPWORDS = new Set([
  "de","da","do","em","no","na","com","para","que","por","como","um","uma","os","as","e","o","a",
  "seu","sua","meu","minha","pode","ser","ou","se","curitiba","tecnico","informatica","assistencia",
]);

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokens = (t: string) =>
  new Set(normalizar(t).split(" ").filter((p) => p.length > 2 && !STOPWORDS.has(p)));

const jaccard = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
};

const equipamentoDe = (texto: string) => {
  const t = normalizar(texto);
  if (/notebook|laptop/.test(t)) return "notebook";
  if (/impressora/.test(t)) return "impressora";
  if (/celular|smartphone/.test(t)) return "celular";
  if (/tv|monitor/.test(t)) return "tela";
  if (/roteador|wifi|rede/.test(t)) return "rede";
  return "desktop";
};

const classificar = (slug: string, titulo: string) => {
  const alvo = normalizar(`${slug} ${titulo}`).replace(/ /g, "-");
  for (const grupo of TAXONOMIA) {
    if (grupo.termos.some((termo) => alvo.includes(termo))) return grupo;
  }
  return { nome: "Não classificado", cluster: "revisar", termos: [] };
};

/** Fase 3: página de sintoma é diagnóstica; slug com cidade/preço puxa outra intenção. */
const intencaoDe = (slug: string, titulo: string) => {
  const t = normalizar(`${slug} ${titulo}`);
  if (/(preco|orcamento|quanto custa|valor)/.test(t)) return ["COMERCIAL", "DIAGNÓSTICA"];
  if (/(curitiba|bairro|perto de mim|domicilio)/.test(t)) return ["LOCAL", "DIAGNÓSTICA"];
  if (/(o que e|como funciona|guia|significa)/.test(t)) return ["INFORMATIVA", "DIAGNÓSTICA"];
  return ["DIAGNÓSTICA", "COMERCIAL"];
};

// ── Inventário ──────────────────────────────────────────────────────────────
const curados = new Set(
  (CURATED_PATHS as (string | { path: string })[]).map((p) => (typeof p === "string" ? p : p.path)),
);

const brutos = [
  ...problemaPagesData.map((p) => ({
    url: `/problemas/${p.slug}`,
    origem: "problemaPagesData" as const,
    titulo: p.title,
    h1: p.h1,
    descricao: p.metaDescription,
    texto: `${p.slug} ${p.h1} ${p.metaDescription}`,
  })),
  ...CLUSTER_PROBLEMAS.map((p) => ({
    url: p.path,
    origem: "clusterProblemas" as const,
    titulo: p.metaTitle,
    h1: p.titulo,
    descricao: p.metaDescription,
    texto: `${p.slug} ${p.titulo} ${p.metaDescription}`,
  })),
];

// URLs duplicadas entre as duas fontes são conflito estrutural, não editorial.
const vistos = new Map<string, (typeof brutos)[number]>();
const duplicadasEntreFontes: string[] = [];
for (const item of brutos) {
  if (vistos.has(item.url)) duplicadasEntreFontes.push(item.url);
  else vistos.set(item.url, item);
}
const itens = [...vistos.values()];
const tokensPorUrl = new Map(itens.map((i) => [i.url, tokens(i.texto)]));

// ── Matriz de canibalização problema ↔ problema ─────────────────────────────
type Par = { a: string; b: string; intencaoA: string; intencaoB: string; sobreposicao: number; decisao: string };
const pares: Par[] = [];

const registros: Registro[] = itens.map((item) => {
  const grupo = classificar(item.url, `${item.h1} ${item.descricao}`);
  const [primaria, secundaria] = intencaoDe(item.url, `${item.h1} ${item.titulo}`);
  return {
    url: item.url,
    origem: item.origem,
    titulo: item.titulo,
    h1: item.h1,
    descricao: item.descricao,
    equipamento: equipamentoDe(`${item.url} ${item.h1}`),
    sintoma: item.url.replace("/problemas/", "").replace(/-/g, " "),
    taxonomia: grupo.nome,
    cluster: grupo.cluster,
    intencaoPrimaria: primaria,
    intencaoSecundaria: secundaria,
    servicoRelacionado: SERVICO_POR_CLUSTER[grupo.cluster] ?? "",
    indexavelHoje: curados.has(item.url),
    riscoCanibalizacao: "BAIXO",
    conflitoPrincipal: "",
    acaoRecomendada: "",
  };
});

const porUrl = new Map(registros.map((r) => [r.url, r]));

for (let i = 0; i < registros.length; i++) {
  for (let j = i + 1; j < registros.length; j++) {
    const a = registros[i];
    const b = registros[j];
    const s = jaccard(tokensPorUrl.get(a.url)!, tokensPorUrl.get(b.url)!);
    if (s < 0.35) continue;
    const mesmoCluster = a.cluster === b.cluster;
    const decisao =
      s >= 0.6 && mesmoCluster
        ? "CONSOLIDAR"
        : s >= 0.45 && mesmoCluster
          ? "REPOSICIONAR INTENÇÃO"
          : "MANTER AMBAS";
    pares.push({
      a: a.url,
      b: b.url,
      intencaoA: a.intencaoPrimaria,
      intencaoB: b.intencaoPrimaria,
      sobreposicao: Number(s.toFixed(3)),
      decisao,
    });
  }
}

// Risco por página = maior sobreposição encontrada.
for (const par of pares) {
  for (const [url, outro] of [
    [par.a, par.b],
    [par.b, par.a],
  ]) {
    const reg = porUrl.get(url)!;
    const nivel: Registro["riscoCanibalizacao"] =
      par.sobreposicao >= 0.6 ? "CRÍTICO" : par.sobreposicao >= 0.45 ? "ALTO" : "MÉDIO";
    const ordem = { BAIXO: 0, MÉDIO: 1, ALTO: 2, CRÍTICO: 3 } as const;
    if (ordem[nivel] > ordem[reg.riscoCanibalizacao]) {
      reg.riscoCanibalizacao = nivel;
      reg.conflitoPrincipal = outro;
    }
  }
}

// ── Ação recomendada (Fase 4 + Fase 28) ─────────────────────────────────────
for (const r of registros) {
  if (duplicadasEntreFontes.includes(r.url)) r.acaoRecomendada = "RESOLVER DUPLICIDADE DE FONTE";
  else if (r.riscoCanibalizacao === "CRÍTICO") r.acaoRecomendada = "CONSOLIDAR NO PILAR DO CLUSTER";
  else if (r.riscoCanibalizacao === "ALTO") r.acaoRecomendada = "REPOSICIONAR INTENÇÃO";
  else if (r.indexavelHoje) r.acaoRecomendada = "REESCREVER (LOTE PRIORITÁRIO)";
  else if (r.cluster === "revisar") r.acaoRecomendada = "CLASSIFICAR MANUALMENTE";
  else r.acaoRecomendada = "MANTER NOINDEX ATÉ REESCRITA";
}

// ── Saídas ──────────────────────────────────────────────────────────────────
const csv = (colunas: string[], linhas: (string | number | boolean)[][]) =>
  [colunas, ...linhas]
    .map((l) =>
      l
        .map((c) => {
          const v = String(c ?? "");
          return /[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
        })
        .join(";"),
    )
    .join("\n");

mkdirSync("reports", { recursive: true });

writeFileSync(
  "reports/problem-intent-map.json",
  `${JSON.stringify({ gerado_em: new Date().toISOString(), total: registros.length, duplicadasEntreFontes, registros }, null, 2)}\n`,
);

writeFileSync(
  "reports/problem-intent-map.csv",
  csv(
    ["url","origem","equipamento","sintoma","taxonomia","cluster","intencao_primaria","intencao_secundaria","servico_relacionado","indexavel_hoje","risco_canibalizacao","conflito_principal","acao_recomendada"],
    registros.map((r) => [
      r.url, r.origem, r.equipamento, r.sintoma, r.taxonomia, r.cluster,
      r.intencaoPrimaria, r.intencaoSecundaria, r.servicoRelacionado,
      r.indexavelHoje ? "sim" : "nao", r.riscoCanibalizacao, r.conflitoPrincipal, r.acaoRecomendada,
    ]),
  ),
);

writeFileSync(
  "reports/problem-cannibalization.csv",
  csv(
    ["url_a", "url_b", "intencao_a", "intencao_b", "sobreposicao", "decisao"],
    pares
      .sort((x, y) => y.sobreposicao - x.sobreposicao)
      .map((p) => [p.a, p.b, p.intencaoA, p.intencaoB, p.sobreposicao, p.decisao]),
  ),
);
writeFileSync(
  "reports/problem-cannibalization.json",
  `${JSON.stringify({ gerado_em: new Date().toISOString(), total: pares.length, pares }, null, 2)}\n`,
);

const contar = <T extends string>(chave: (r: Registro) => T) => {
  const mapa = new Map<T, number>();
  for (const r of registros) mapa.set(chave(r), (mapa.get(chave(r)) ?? 0) + 1);
  return [...mapa.entries()].sort((a, b) => b[1] - a[1]);
};

const indexaveis = registros.filter((r) => r.indexavelHoje);
const md = `# Mapa de intenção — páginas de problema

Gerado em ${new Date().toISOString()}.

- Páginas de problema inventariadas: **${registros.length}**
- Indexáveis hoje (no sitemap curado): **${indexaveis.length}**
- Fora do sitemap (noindex/reavaliar): **${registros.length - indexaveis.length}**
- Pares com sobreposição ≥ 0,35: **${pares.length}**
- URLs declaradas em duas fontes: **${duplicadasEntreFontes.length}**${duplicadasEntreFontes.length ? ` (${duplicadasEntreFontes.join(", ")})` : ""}

## Taxonomia

| Categoria | Páginas |
| --- | --- |
${contar((r) => r.taxonomia).map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

## Intenção primária

| Intenção | Páginas |
| --- | --- |
${contar((r) => r.intencaoPrimaria).map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

## Risco de canibalização

| Risco | Páginas |
| --- | --- |
${contar((r) => r.riscoCanibalizacao).map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

## Ação recomendada

| Ação | Páginas |
| --- | --- |
${contar((r) => r.acaoRecomendada).map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

## Top 20 conflitos (matriz de canibalização)

| URL A | URL B | Intenção A | Intenção B | Sobreposição | Decisão |
| --- | --- | --- | --- | --- | --- |
${pares.slice(0, 20).map((p) => `| ${p.a} | ${p.b} | ${p.intencaoA} | ${p.intencaoB} | ${p.sobreposicao} | ${p.decisao} |`).join("\n")}

## Lote 1 sugerido (indexáveis, risco ≤ MÉDIO)

${indexaveis.filter((r) => r.riscoCanibalizacao !== "CRÍTICO" && r.riscoCanibalizacao !== "ALTO").slice(0, 20).map((r) => `- ${r.url} — ${r.taxonomia} · ${r.intencaoPrimaria} → ${r.servicoRelacionado || "(serviço a definir)"}`).join("\n")}
`;
writeFileSync("reports/problem-intent-map.md", md);

console.log(`📋 ${registros.length} páginas de problema inventariadas (${indexaveis.length} indexáveis).`);
console.log(`   ${pares.length} par(es) com sobreposição ≥ 0,35 · ${duplicadasEntreFontes.length} URL(s) duplicada(s) entre fontes.`);
console.log("   → reports/problem-intent-map.{json,csv,md} · reports/problem-cannibalization.{json,csv}");
