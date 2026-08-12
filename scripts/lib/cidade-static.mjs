/**
 * Rodada 2C — paridade estática das landings de cidade.
 *
 * Fonte única: src/lib/cidadesData.ts (mesmo conteúdo renderizado pelo React).
 * Lemos aquele arquivo e devolvemos `blocos` + `faq` no formato consumido por
 * scripts/curated-static-body.mjs, para que o HTML pré-hidratação de cada
 * cidade âncora carregue a proposta local, o perfil local e os cenários de
 * chamado próprios — em vez de apenas title + description.
 *
 * Não há endereço, unidade física, tempo de deslocamento, avaliação ou
 * promessa nova: é reaproveitamento do texto já aprovado em runtime.
 */
import { readFileSync } from "fs";
import { resolve } from "path";

const SRC = resolve("src/lib/cidadesData.ts");

function parse() {
  let raw = "";
  try {
    raw = readFileSync(SRC, "utf8");
  } catch {
    return {};
  }
  const start = raw.indexOf("export const CIDADES");
  if (start === -1) return {};
  const body = raw.slice(start);
  const out = {};
  const blocks = body.matchAll(
    /\n  "?([a-z][a-z0-9-]*)"?:\s*\{\s*\n\s*slug:\s*"([a-z0-9-]+)",([\s\S]*?)\n\s{2}\},/g,
  );
  for (const m of blocks) {
    const b = m[3];
    const slug = m[2];
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
    const quandoChunk = /quandoChamar:\s*\[([\s\S]*?)\n\s{4}\]/.exec(b)?.[1] ?? "";
    const quandoChamar = [...quandoChunk.matchAll(
      /title:\s*"((?:[^"\\]|\\.)*)",\s*desc:\s*"((?:[^"\\]|\\.)*)"/g,
    )].map((x) => ({
      title: x[1].replace(/\\"/g, '"'),
      desc: x[2].replace(/\\"/g, '"'),
    }));
    const faqChunk = /faqs:\s*\[([\s\S]*?)\n\s{4}\]/.exec(b)?.[1] ?? "";
    const faq = [...faqChunk.matchAll(
      /question:\s*"((?:[^"\\]|\\.)*)",\s*answer:\s*"((?:[^"\\]|\\.)*)"/g,
    )].map((x) => ({
      pergunta: x[1].replace(/\\"/g, '"'),
      resposta: x[2].replace(/\\"/g, '"'),
    }));

    out[`/tecnico-informatica-${slug}`] = {
      cidade: str("cidade"),
      proposta: list("proposta"),
      perfilLocal: list("perfilLocal"),
      contexto: list("contextoLocal"),
      quandoChamar,
      faq,
    };
  }
  return out;
}

const DATA = parse();

/** Blocos editoriais próprios da cidade para o HTML estático. */
export function cidadeBlocos(path) {
  const d = DATA[path];
  if (!d || !d.proposta.length) return undefined;
  const blocos = [
    {
      titulo: `Como funciona o atendimento em ${d.cidade}`,
      paragrafos: d.proposta,
    },
  ];
  if (d.contexto?.length) {
    blocos.push({
      titulo: `O que costuma aparecer nos chamados de ${d.cidade}`,
      paragrafos: d.contexto,
    });
  }
  if (d.perfilLocal.length) {
    blocos.push({
      titulo: `Perfil dos chamados em ${d.cidade}`,
      paragrafos: [d.perfilLocal.join(". ") + "."],
    });
  }
  if (d.quandoChamar.length) {
    blocos.push({
      titulo: "Quando chamar o técnico",
      paragrafos: d.quandoChamar.map((q) => `${q.title}: ${q.desc}`),
    });
  }
  return blocos;
}

/** FAQ local visível — mesma exibida na página, em paridade 1:1. */
export function cidadeFaq(path) {
  const d = DATA[path];
  return d?.faq?.length ? d.faq : undefined;
}

export default { cidadeBlocos, cidadeFaq };
