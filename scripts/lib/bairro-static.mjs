/**
 * Rodada 2C — paridade estática das landings de bairro.
 *
 * Fonte única: src/lib/bairrosData.ts (mesmo conteúdo renderizado pelo React).
 * Aqui apenas lemos aquele arquivo e devolvemos `blocos` + `faq` no formato
 * consumido por scripts/curated-static-body.mjs, para que o HTML servido antes
 * da hidratação carregue o conteúdo local próprio de cada bairro — e não só
 * title + description, o que inflava artificialmente a similaridade medida
 * pelo gate check:programmatic-similarity.
 *
 * Nada é inventado: não há endereço, unidade física, tempo de deslocamento,
 * avaliação nem promessa nova. Só reaproveitamento do texto já aprovado.
 */
import { readFileSync } from "fs";
import { resolve } from "path";

// RODADA 5E: o Lote 2 vive em arquivo próprio, mas alimenta o mesmo HTML estático.
const SRCS = [resolve("src/lib/bairrosData.ts"), resolve("src/lib/bairrosLote2.ts")];

function parse() {
  const out = {};
  for (const src of SRCS) parseFile(src, out);
  return out;
}

function parseFile(src, out) {
  let raw = "";
  try {
    raw = readFileSync(src, "utf8");
  } catch {
    return out;
  }
  const start = raw.indexOf("export const BAIRROS");
  if (start === -1) return out;
  const body = raw.slice(start);
  const blocks = body.matchAll(
    /\n  "?([a-z][a-z0-9-]*)"?:\s*\{\s*\n\s*slug:\s*"([a-z0-9-]+)",([\s\S]*?)\n\s{2}\},/g,
  );
  for (const m of blocks) {
    const slug = m[2];
    const b = m[3];
    const str = (name) => {
      const re = new RegExp(`${name}:\\s*\\n?\\s*"([\\s\\S]*?)"(?=,\\n)`);
      return re.exec(b)?.[1]?.replace(/\\"/g, '"') ?? "";
    };
    const list = (name) => {
      const re = new RegExp(`${name}:\\s*\\[([\\s\\S]*?)\\n\\s{4}\\]`);
      const chunk = re.exec(b)?.[1] ?? "";
      return [...chunk.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) =>
        x[1].replace(/\\"/g, '"'),
      );
    };
    const faqChunk = /faqLocal:\s*\[([\s\S]*?)\n\s{4}\]/.exec(b)?.[1] ?? "";
    const faq = [...faqChunk.matchAll(
      /question:\s*"((?:[^"\\]|\\.)*)",\s*answer:\s*"((?:[^"\\]|\\.)*)"/g,
    )].map((x) => ({
      pergunta: x[1].replace(/\\"/g, '"'),
      resposta: x[2].replace(/\\"/g, '"'),
    }));

    out[`/bairros/${slug}`] = {
      nome: str("nome"),
      cidade: str("cidade"),
      metaTitle: str("metaTitle"),
      metaDescription: str("metaDescription"),
      h1: str("h1"),
      subtitulo: str("subtitulo"),
      publico: list("publicoAtendido"),
      nomeLocativo: str("nomeLocativo"),
      introducao: list("introducaoLocal"),
      contexto: list("contextoLocal"),
      logistica: list("logisticaLocal"),
      operacao: list("operacaoLocal"),
      atendimento: list("atendimentoLocal"),
      coleta: list("coletaBancada"),
      faq,
    };
  }
  return out;
}

const DATA = parse();

/** Blocos editoriais próprios do bairro para o HTML estático. */
export function bairroBlocos(path) {
  const d = DATA[path];
  if (!d || !d.introducao.length) return undefined;
  const loc = d.nomeLocativo || `no ${d.nome}`;
  const blocos = [
    {
      titulo: `Como é o atendimento ${loc}`,
      paragrafos: d.introducao,
    },
  ];
  if (d.contexto?.length) {
    blocos.push({
      titulo: `O que costuma aparecer nos chamados ${loc}`,
      paragrafos: d.contexto,
    });
  }
  if (d.logistica?.length) {
    blocos.push({
      titulo: `Deslocamento, acesso e agendamento ${loc}`,
      paragrafos: d.logistica,
    });
  }
  if (d.operacao.length) {
    blocos.push({
      titulo: "Como a triagem funciona nessa região",
      paragrafos: [d.operacao.join(". ") + "."],
    });
  }
  if (d.atendimento.length) {
    blocos.push({
      titulo: `O que costuma ser resolvido no local ${loc}`,
      paragrafos: [d.atendimento.join(". ") + "."],
    });
  }
  if (d.coleta.length) {
    blocos.push({
      titulo: "Quando o caso segue para coleta e bancada",
      paragrafos: [
        d.coleta.join(". ") +
          ". A modalidade é definida na triagem, sempre com a sua aprovação antes de qualquer execução.",
      ],
    });
  }
  return blocos;
}

/** FAQ local visível — mesma exibida na página, em paridade 1:1. */
export function bairroFaq(path) {
  const d = DATA[path];
  return d?.faq?.length ? d.faq : undefined;
}

/** Título/descrição/H1 próprios do bairro (paridade estática ↔ React). */
export function bairroMeta(path) {
  const d = DATA[path];
  if (!d?.metaTitle || !d?.metaDescription) return undefined;
  return {
    path,
    title: d.metaTitle,
    description: d.metaDescription,
    h1: d.h1 || undefined,
    subtitulo: d.subtitulo || undefined,
  };
}

/** Todos os caminhos de bairro com conteúdo próprio parseado. */
export function bairroPaths() {
  return Object.keys(DATA);
}

export default { bairroBlocos, bairroFaq, bairroMeta, bairroPaths };
