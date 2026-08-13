#!/usr/bin/env bun
/**
 * RODADA 4B — GATE DE INTERLINKS DO LOTE 1 (/problemas/*).
 *
 * Valida os links internos realmente publicados no bloco `relacionados` das
 * páginas indexáveis de sintoma. O relatório (`report:problem-interlinks`)
 * recomenda; este gate cobra o que foi publicado:
 *
 *   1. destino existe de fato (rota declarada no router) — fail-closed;
 *   2. nenhum autolink (página apontando para si mesma);
 *   3. nenhum destino repetido no mesmo bloco;
 *   4. nenhum par com sobreposição ≥ 0,45 (candidato a consolidação, não a link);
 *   5. nenhum beco sem saída: toda página do lote precisa de pelo menos
 *      1 link de serviço existente e 1 link de problema OU o hub /problemas;
 *   6. nenhum ciclo fechado só entre páginas de problema sem saída para
 *      serviço/hub (loop indesejado que prende o crawler no cluster).
 *
 * Uso: bun scripts/check-problem-interlinks.ts [--strict]
 */
import { readFileSync } from "node:fs";
import { CLUSTER_PROBLEMAS } from "../src/lib/clusterProblemas";

const TETO_SOBREPOSICAO = 0.45;
const strict = process.argv.includes("--strict");

/** Rotas declaradas no router — fonte de verdade de "a URL existe". */
function rotasDoRouter(): Set<string> {
  const src = readFileSync("src/LegacyApp.tsx", "utf8");
  const rotas = new Set<string>();
  for (const m of src.matchAll(/path="([^"]+)"/g)) rotas.add(m[1]);
  return rotas;
}

function sobreposicoes(): Map<string, number> {
  const mapa = new Map<string, number>();
  try {
    const raw = JSON.parse(readFileSync("reports/problem-cannibalization.json", "utf8")) as {
      pares?: { a: string; b: string; sobreposicao: number }[];
    };
    for (const par of raw.pares ?? []) {
      mapa.set(`${par.a}|${par.b}`, par.sobreposicao);
      mapa.set(`${par.b}|${par.a}`, par.sobreposicao);
    }
  } catch {
    /* relatório ausente: as demais regras continuam valendo */
  }
  return mapa;
}

type Erro = { url: string; regra: string; detalhe: string };

const rotas = rotasDoRouter();
const overlap = sobreposicoes();
const erros: Erro[] = [];
const avisos: Erro[] = [];

const lote = CLUSTER_PROBLEMAS;
const doLote = new Set(lote.map((p) => p.path));
/** Grafo problema → problema, usado na detecção de ciclo fechado. */
const grafo = new Map<string, string[]>();

let totalLinks = 0;
for (const pagina of lote) {
  const destinos = pagina.relacionados.map((r) => r.to);
  const vistos = new Set<string>();
  const problemas: string[] = [];
  let temServico = false;
  let temSaida = false;

  for (const to of destinos) {
    totalLinks++;
    if (!rotas.has(to)) {
      erros.push({ url: pagina.path, regra: "DESTINO_INEXISTENTE", detalhe: to });
      continue;
    }
    if (to === pagina.path) {
      erros.push({ url: pagina.path, regra: "AUTOLINK", detalhe: to });
      continue;
    }
    if (vistos.has(to)) {
      erros.push({ url: pagina.path, regra: "DESTINO_DUPLICADO", detalhe: to });
      continue;
    }
    vistos.add(to);

    const sobrep = overlap.get(`${pagina.path}|${to}`);
    if (sobrep !== undefined && sobrep >= TETO_SOBREPOSICAO) {
      erros.push({
        url: pagina.path,
        regra: "SOBREPOSICAO_ALTA",
        detalhe: `${to} (sobreposição ${sobrep} ≥ ${TETO_SOBREPOSICAO}) — consolidar, não interligar`,
      });
      continue;
    }

    if (to.startsWith("/servicos/") || to.startsWith("/solucoes/")) temServico = true;
    if (to === "/problemas" || to.startsWith("/servicos/") || to.startsWith("/solucoes/") || to === "/atendimento" || to === "/empresas") {
      temSaida = true;
    }
    if (to.startsWith("/problemas/")) problemas.push(to);
  }

  grafo.set(pagina.path, problemas.filter((p) => doLote.has(p)));
  if (!temServico) {
    erros.push({ url: pagina.path, regra: "SEM_SERVICO", detalhe: "nenhum link de serviço/solução existente no bloco relacionados" });
  }
  if (!temSaida) {
    erros.push({ url: pagina.path, regra: "BECO_SEM_SAIDA", detalhe: "nenhum link para hub, serviço ou atendimento" });
  }
  if (problemas.length === 0) {
    avisos.push({ url: pagina.path, regra: "SEM_PROBLEMA_RELACIONADO", detalhe: "bloco sem sintoma vizinho — revisar semanticamente" });
  }
}

/** Ciclo fechado entre páginas de problema que não oferecem saída ao crawler. */
const semSaida = new Set(
  lote
    .filter((p) => !p.relacionados.some((r) => r.to === "/problemas" || r.to.startsWith("/servicos/") || r.to.startsWith("/solucoes/")))
    .map((p) => p.path),
);
if (semSaida.size > 0) {
  const visitando = new Set<string>();
  const concluido = new Set<string>();
  const dfs = (no: string, caminho: string[]) => {
    if (concluido.has(no)) return;
    if (visitando.has(no)) {
      const ciclo = [...caminho.slice(caminho.indexOf(no)), no];
      if (ciclo.every((n) => semSaida.has(n))) {
        erros.push({ url: no, regra: "LOOP_FECHADO", detalhe: ciclo.join(" → ") });
      }
      return;
    }
    visitando.add(no);
    for (const prox of grafo.get(no) ?? []) dfs(prox, [...caminho, no]);
    visitando.delete(no);
    concluido.add(no);
  };
  for (const no of semSaida) dfs(no, []);
}

const bloqueios = strict ? [...erros, ...avisos] : erros;

for (const a of avisos) console.warn(`⚠ ${a.url} · ${a.regra}: ${a.detalhe}`);
for (const e of erros) console.error(`✖ ${e.url} · ${e.regra}: ${e.detalhe}`);

if (bloqueios.length > 0) {
  console.error(`\n${bloqueios.length} problema(s) de interlink em ${lote.length} página(s) do Lote 1.`);
  process.exit(1);
}
console.log(`✓ Interlinks válidos: ${totalLinks} link(s) em ${lote.length} página(s) do Lote 1 (destinos existentes, sem autolink, sem duplicata, sem par ≥ ${TETO_SOBREPOSICAO}, sem loop fechado).`);
