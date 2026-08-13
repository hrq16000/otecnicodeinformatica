#!/usr/bin/env node
/**
 * INTERLINKAGEM CONTEXTUAL GERADA (hubs de serviço × problemas × bairros).
 *
 * Para cada rota de /problemas escolhe os destinos mais próximos pelo conteúdo
 * já renderizado (title + description curados, não por lista fixa) e gera uma
 * âncora ÚNICA no site inteiro, combinando o assunto do destino com o sintoma
 * de origem. Nada é inventado: as âncoras usam palavras dos títulos aprovados.
 *
 * Saída: src/lib/interlinksGerados.ts (consumido por InterlinksContextuais).
 * Uso: node scripts/generate-interlinks.mjs [--check]
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { CURATED_ROUTES } from "./curated-routes-meta.mjs";
import { SERVICOS, BAIRROS, PROBLEMAS } from "./lib/curated-urls.mjs";

const CHECK = process.argv.includes("--check");
const DEST = "src/lib/interlinksGerados.ts";

const meta = new Map(CURATED_ROUTES.map((r) => [r.path, r]));
const STOP = new Set(
  "para com uma como qual quais quando onde essa esse isso mais menos sobre pelo pela seus suas nossa nosso curitiba técnico informática".split(
    " ",
  ),
);
const tokens = (s) =>
  new Set(
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  );
const score = (a, b) => [...a].filter((w) => b.has(w)).length;

/** "Formatação de computador | Marca" → "formatação de computador" */
const assunto = (path) => {
  const t = meta.get(path)?.title ?? "";
  const base = t.split("|")[0].split(":")[0].split("?")[0].trim();
  return base ? base.charAt(0).toLowerCase() + base.slice(1) : path.split("/").pop().replace(/-/g, " ");
};

const sintoma = (path) => {
  const t = meta.get(path)?.h1 ?? meta.get(path)?.title ?? "";
  const base = t.split("|")[0].split(":")[0].split("?")[0].trim();
  return base ? base.charAt(0).toLowerCase() + base.slice(1) : path.split("/").pop().replace(/-/g, " ");
};

const usados = new Set();
const unico = (texto, alternativas) => {
  const candidatos = [texto, ...alternativas];
  for (const c of candidatos) {
    const chave = c.toLowerCase();
    if (!usados.has(chave)) {
      usados.add(chave);
      return c;
    }
  }
  let i = 2;
  let final = `${texto} — ${i}`;
  while (usados.has(final.toLowerCase())) {
    i += 1;
    final = `${texto} — ${i}`;
  }
  usados.add(final.toLowerCase());
  return final;
};

const servicos = SERVICOS.map((s) => s.path).filter((p) => meta.has(p));
const bairros = BAIRROS.map((b) => b.path);
const problemas = PROBLEMAS.map((p) => p.path).filter((p) => p !== "/problemas");

const blocos = {};

for (const origem of problemas) {
  const tk = tokens(`${meta.get(origem)?.title ?? ""} ${meta.get(origem)?.description ?? ""}`);

  const servicosRel = servicos
    .map((path) => ({ path, s: score(tk, tokens(`${meta.get(path).title} ${meta.get(path).description}`)) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 2);

  const problemasRel = problemas
    .filter((p) => p !== origem)
    .map((path) => ({ path, s: score(tk, tokens(`${meta.get(path)?.title ?? ""} ${meta.get(path)?.description ?? ""}`)) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 2);

  const bairro = bairros[problemas.indexOf(origem) % bairros.length];
  const nomeBairro = (meta.get(bairro)?.title ?? bairro.split("/").pop())
    .split("|")[0]
    .split(":")[0]
    .replace(/técnico de inform[áa]tica (em|no|na)\s*/i, "")
    .trim();

  const itens = [];
  for (const { path } of servicosRel) {
    itens.push({
      href: path,
      anchor: unico(`${assunto(path)} para quem tem ${sintoma(origem)}`, [
        `${assunto(path)} no caso de ${sintoma(origem)}`,
      ]),
      contexto: "servico",
    });
  }
  for (const { path } of problemasRel) {
    itens.push({
      href: path,
      anchor: unico(`sintoma parecido: ${assunto(path)}`, [`compare com ${assunto(path)}`]),
      contexto: "problema",
    });
  }
  itens.push({
    href: bairro,
    anchor: unico(`atendimento em ${nomeBairro} para ${sintoma(origem)}`, [
      `${nomeBairro}: atendimento para ${sintoma(origem)}`,
    ]),
    contexto: "bairro",
  });

  blocos[origem] = itens;
}

const conteudo = `// GERADO por scripts/generate-interlinks.mjs — não editar à mão.
// Âncoras únicas em todo o site, derivadas do conteúdo curado de cada destino.

export type InterlinkContextual = {
  href: string;
  anchor: string;
  contexto: "servico" | "problema" | "bairro";
};

export const INTERLINKS_GERADOS: Record<string, InterlinkContextual[]> = ${JSON.stringify(blocos, null, 2)};

export const interlinksDe = (path: string): InterlinkContextual[] =>
  INTERLINKS_GERADOS[path] ?? [];
`;

const atual = existsSync(DEST) ? readFileSync(DEST, "utf8") : "";
const totalAncoras = Object.values(blocos).flat().length;
const distintas = new Set(Object.values(blocos).flat().map((i) => i.anchor.toLowerCase())).size;

if (CHECK) {
  if (atual !== conteudo) {
    console.error("✖ interlinksGerados.ts desatualizado — rode `npm run generate:interlinks`.");
    process.exit(1);
  }
  if (totalAncoras !== distintas) {
    console.error("✖ âncoras duplicadas na interlinkagem gerada.");
    process.exit(1);
  }
  console.log(`✔ Interlinkagem em dia: ${totalAncoras} âncoras únicas.`);
} else {
  writeFileSync(DEST, conteudo);
  console.log(
    `✔ ${DEST}: ${Object.keys(blocos).length} rotas · ${totalAncoras} âncoras (${distintas} distintas).`,
  );
}
