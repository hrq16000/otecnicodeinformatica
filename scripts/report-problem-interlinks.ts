#!/usr/bin/env bun
/**
 * RODADA 4 — FASE 20: RECOMENDAÇÕES DE INTERLINK DO LOTE 1.
 *
 * Gera, por cluster, o grafo de links internos sugerido para as páginas do lote
 * indexável:
 *
 *   problema → 1 serviço principal (+ 1 secundário quando existe)
 *   problema → 2 a 4 problemas relacionados do MESMO cluster
 *   serviço  → pilar do cluster (link de volta)
 *
 * Duas travas contra canibalização por relacionamento:
 *   • não sugere link entre pares com sobreposição ≥ 0,45 (essas páginas
 *     precisam ser consolidadas ou reposicionadas, não interligadas — linkar
 *     duas páginas quase idênticas só reforça o sinal duplicado);
 *   • cada par entra uma única vez, com âncora diferente em cada direção, para
 *     não repetir o mesmo texto-âncora no site inteiro.
 *
 * Âncoras são descritivas (Fase 38): usam o sintoma, nunca "clique aqui".
 *
 * Uso: bun scripts/report-problem-interlinks.ts
 * Saídas: reports/problem-interlinks.{json,csv,md}
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { problemaPagesData } from "../src/lib/problemIntentSources";
import { slugCanonico } from "../src/lib/problemIntentPolicy";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const LIMITE_RELACIONADOS = 4;
const MINIMO_RELACIONADOS = 2;
/** Acima disso as páginas competem entre si — recomendação vira consolidação. */
const TETO_SOBREPOSICAO = 0.45;

const TAXONOMIA: { nome: string; cluster: string; termos: string[] }[] = [
  { nome: "Dados", cluster: "dados", termos: ["arquivo", "dados", "recuperacao", "apagad", "perdid", "backup"] },
  { nome: "Armazenamento", cluster: "armazenamento", termos: ["hd", "ssd", "disco", "nvme", "espaco", "particao"] },
  { nome: "Temperatura", cluster: "superaquecimento", termos: ["esquent", "aquec", "temperatura", "cooler", "ventoinha", "queimad"] },
  { nome: "Rede", cluster: "rede", termos: ["wifi", "wi-fi", "internet", "rede", "roteador", "conexao"] },
  { nome: "Sistema", cluster: "windows", termos: ["windows", "tela-azul", "bsod", "virus", "malware", "atualizacao", "driver", "sistema", "formata"] },
  { nome: "Inicialização", cluster: "nao-liga", termos: ["nao-liga", "nao-inicia", "liga-e-desliga", "tela-preta", "sem-imagem", "nao-da-imagem", "boot", "reinicia", "desliga-sozinho", "nao-carrega", "molhad"] },
  { nome: "Desempenho", cluster: "lentidao", termos: ["lent", "trav", "demora", "uso-de-disco", "engasg"] },
  { nome: "Notebook", cluster: "notebook", termos: ["bateria", "carregad", "dobradica", "teclado", "touchpad", "tela-quebrada"] },
  { nome: "Hardware", cluster: "hardware", termos: ["fonte", "placa", "memoria", "ram", "video", "gpu", "impressora", "barulho"] },
];

const SERVICOS: Record<string, { principal: string; secundario?: string }> = {
  dados: { principal: "/servicos/recuperacao-de-dados" },
  armazenamento: { principal: "/servicos/upgrade-ssd-ram", secundario: "/servicos/recuperacao-de-dados" },
  superaquecimento: { principal: "/servicos/manutencao-de-computador", secundario: "/servicos/manutencao-de-notebook" },
  rede: { principal: "/servicos/redes-e-wifi" },
  windows: { principal: "/servicos/formatacao", secundario: "/servicos/remocao-de-virus" },
  "nao-liga": { principal: "/servicos/manutencao-de-computador", secundario: "/servicos/manutencao-de-notebook" },
  lentidao: { principal: "/servicos/manutencao-de-computador", secundario: "/servicos/upgrade-ssd-ram" },
  notebook: { principal: "/servicos/manutencao-de-notebook" },
  hardware: { principal: "/servicos/manutencao-de-computador" },
  revisar: { principal: "/servicos/manutencao-de-computador" },
};

const STOPWORDS = new Set([
  "de","da","do","em","no","na","com","para","que","por","como","um","uma","os","as","e","o","a",
  "seu","sua","meu","minha","pode","ser","ou","se","curitiba","tecnico","informatica","assistencia",
]);

const normalizar = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const tokens = (t: string) =>
  new Set(normalizar(t).split(" ").filter((p) => p.length > 2 && !STOPWORDS.has(p)));

const jaccard = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
};

const clusterDe = (url: string, titulo: string) => {
  const alvo = normalizar(`${url} ${titulo}`).replace(/ /g, "-");
  return TAXONOMIA.find((g) => g.termos.some((t) => alvo.includes(t))) ?? {
    nome: "Não classificado",
    cluster: "revisar",
    termos: [],
  };
};

/** Âncora descritiva a partir do sintoma; varia por posição para não repetir texto. */
const ancora = (url: string, variante: number) => {
  const sintoma = slugCanonico(url).replace("/problemas/", "").replace(/-/g, " ");
  const moldes = [
    (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    (s: string) => `o que verificar quando ${s}`,
    (s: string) => `sintoma relacionado: ${s}`,
    (s: string) => `veja também ${s}`,
  ];
  return moldes[variante % moldes.length](sintoma);
};

const ancoraServico = (servico: string) =>
  `${servico.replace("/servicos/", "").replace(/-/g, " ")} — ver serviço`;

// Serviço recomendado que não existe vira link interno quebrado: falha alto.
const rotasExistentes = new Set(
  (CURATED_PATHS as (string | { path: string })[]).map((p) => (typeof p === "string" ? p : p.path)),
);
const servicosInvalidos = [...new Set(Object.values(SERVICOS).flatMap((s) => [s.principal, s.secundario]))]
  .filter((s): s is string => Boolean(s) && !rotasExistentes.has(s));
if (servicosInvalidos.length) {
  console.error(`✖ Serviço(s) inexistente(s) no mapa de interlinks: ${servicosInvalidos.join(", ")}`);
  process.exit(1);
}

const entradas = problemaPagesData();
const tokensPorUrl = new Map(entradas.map((e) => [e.url, tokens(e.texto)]));
const lote = entradas.filter((e) => e.indexavel);

type Recomendacao = {
  origem: string;
  destino: string;
  tipo: "servico-principal" | "servico-secundario" | "problema-relacionado";
  ancora: string;
  cluster: string;
  sobreposicao: number;
  observacao: string;
};

const recomendacoes: Recomendacao[] = [];
const bloqueados: { a: string; b: string; sobreposicao: number; motivo: string }[] = [];
const usados = new Set<string>();

for (const pagina of lote) {
  const grupo = clusterDe(pagina.url, pagina.h1);
  const servico = SERVICOS[grupo.cluster] ?? SERVICOS.revisar;

  recomendacoes.push({
    origem: pagina.url,
    destino: servico.principal,
    tipo: "servico-principal",
    ancora: ancoraServico(servico.principal),
    cluster: grupo.cluster,
    sobreposicao: 0,
    observacao: "bloco 'serviço relacionado' ao final do conteúdo, após 'quando procurar assistência'",
  });
  if (servico.secundario) {
    recomendacoes.push({
      origem: pagina.url,
      destino: servico.secundario,
      tipo: "servico-secundario",
      ancora: ancoraServico(servico.secundario),
      cluster: grupo.cluster,
      sobreposicao: 0,
      observacao: "link contextual dentro de 'possíveis soluções' — só quando a causa se aplicar",
    });
  }

  // Candidatos: mesmo cluster, abaixo do teto de sobreposição, ordenados por
  // proximidade decrescente (mais relacionado primeiro, sem chegar a competir).
  const candidatos = entradas
    .filter((outro) => outro.url !== pagina.url)
    .map((outro) => ({
      outro,
      s: jaccard(tokensPorUrl.get(pagina.url)!, tokensPorUrl.get(outro.url)!),
      mesmoCluster: clusterDe(outro.url, outro.h1).cluster === grupo.cluster,
    }))
    .filter((c) => c.mesmoCluster);

  for (const c of candidatos.filter((c) => c.s >= TETO_SOBREPOSICAO)) {
    bloqueados.push({
      a: pagina.url,
      b: c.outro.url,
      sobreposicao: Number(c.s.toFixed(3)),
      motivo: "sobreposição alta — consolidar ou reposicionar antes de interligar",
    });
  }

  const escolhidos = candidatos
    .filter((c) => c.s < TETO_SOBREPOSICAO)
    .sort((x, y) => y.s - x.s)
    .filter((c) => !usados.has(`${c.outro.url}→${pagina.url}`))
    .slice(0, LIMITE_RELACIONADOS);

  escolhidos.forEach((c, i) => {
    usados.add(`${pagina.url}→${c.outro.url}`);
    recomendacoes.push({
      origem: pagina.url,
      destino: c.outro.url,
      tipo: "problema-relacionado",
      ancora: ancora(c.outro.url, i),
      cluster: grupo.cluster,
      sobreposicao: Number(c.s.toFixed(3)),
      observacao:
        c.outro.indexavel
          ? "bloco 'problemas relacionados'"
          : "página ainda noindex — publicar o link só após a reescrita do satélite",
    });
  });

  if (escolhidos.length < MINIMO_RELACIONADOS) {
    bloqueados.push({
      a: pagina.url,
      b: "—",
      sobreposicao: 0,
      motivo: `apenas ${escolhidos.length} relacionado(s) elegível(is) no cluster ${grupo.cluster} — cluster raso, avaliar novo satélite`,
    });
  }
}

// ── Saídas ──────────────────────────────────────────────────────────────────
const csv = (colunas: string[], linhas: (string | number)[][]) =>
  [colunas, ...linhas]
    .map((l) => l.map((c) => {
      const v = String(c ?? "");
      return /[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(";"))
    .join("\n");

mkdirSync("reports", { recursive: true });

writeFileSync(
  "reports/problem-interlinks.json",
  `${JSON.stringify({ gerado_em: new Date().toISOString(), lote: lote.length, recomendacoes, bloqueados }, null, 2)}\n`,
);
writeFileSync(
  "reports/problem-interlinks.csv",
  csv(
    ["origem", "destino", "tipo", "ancora", "cluster", "sobreposicao", "observacao"],
    recomendacoes.map((r) => [r.origem, r.destino, r.tipo, r.ancora, r.cluster, r.sobreposicao, r.observacao]),
  ),
);

const porCluster = new Map<string, Recomendacao[]>();
for (const r of recomendacoes) {
  porCluster.set(r.cluster, [...(porCluster.get(r.cluster) ?? []), r]);
}

const secoes = [...porCluster.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .map(([cluster, itens]) => {
    const origens = [...new Set(itens.map((i) => i.origem))];
    const linhas = itens.map(
      (i) => `| ${i.origem} | ${i.destino} | ${i.tipo} | ${i.ancora} | ${i.sobreposicao || "—"} | ${i.observacao} |`,
    );
    return [
      `### Cluster \`${cluster}\` — ${origens.length} página(s) do lote`,
      "",
      "| Origem | Destino | Tipo | Âncora sugerida | Sobrep. | Onde inserir |",
      "| --- | --- | --- | --- | --- | --- |",
      ...linhas,
      "",
    ].join("\n");
  })
  .join("\n");

const md = `# Interlinks recomendados — Lote 1

Gerado em ${new Date().toISOString()} por \`npm run report:problem-interlinks\`.

- Páginas do lote indexável: **${lote.length}**
- Links recomendados: **${recomendacoes.length}** (${recomendacoes.filter((r) => r.tipo.startsWith("servico")).length} para serviço · ${recomendacoes.filter((r) => r.tipo === "problema-relacionado").length} problema↔problema)
- Pares descartados por risco de canibalização: **${bloqueados.length}**

Regra: cada problema aponta para 1 serviço principal (+1 secundário quando a
causa justifica) e para ${MINIMO_RELACIONADOS}–${LIMITE_RELACIONADOS} problemas do mesmo cluster. Pares com
sobreposição ≥ ${TETO_SOBREPOSICAO} não são interligados — são candidatos a consolidação.
Âncoras variam por posição para não repetir o mesmo texto no site inteiro.

## Recomendações por cluster

${secoes}

## Descartados / atenção

| A | B | Sobrep. | Motivo |
| --- | --- | --- | --- |
${bloqueados.map((b) => `| ${b.a} | ${b.b} | ${b.sobreposicao || "—"} | ${b.motivo} |`).join("\n") || "| — | — | — | nenhum |"}
`;
writeFileSync("reports/problem-interlinks.md", md);

console.log(
  `🔗 ${recomendacoes.length} interlink(s) recomendado(s) para ${lote.length} página(s) do lote · ${bloqueados.length} descartado(s).`,
);
console.log("   → reports/problem-interlinks.{json,csv,md}");
