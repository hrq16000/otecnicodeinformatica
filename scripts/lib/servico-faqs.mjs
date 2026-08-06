/**
 * Espelha as FAQs REAIS das páginas de serviço (src/lib/servicosCore.ts) para o
 * HTML estático curado. Não inventa conteúdo: lê a fonte única usada na
 * hidratação, garantindo paridade entre FAQPage estático e texto visível.
 */
import { readFileSync, existsSync } from "node:fs";

const SOURCE = "src/lib/servicosCore.ts";

const PAIR =
  /question:\s*"((?:[^"\\]|\\.)*)"\s*,\s*answer:\s*(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/g;

const unescape = (s) =>
  s
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** FAQ da rota /servicos/<slug> no formato do gerador estático, ou null. */
export function servicoFaqs(path) {
  const m = /^\/servicos\/([^/]+)$/.exec(path);
  if (!m || !existsSync(SOURCE)) return null;
  const slug = m[1];
  const src = readFileSync(SOURCE, "utf8");
  const start = src.indexOf(`path: "${slug}",`);
  if (start === -1) return null;
  const faqStart = src.indexOf("faqs: [", start);
  if (faqStart === -1) return null;
  const faqEnd = src.indexOf("\n    ],", faqStart);
  const chunk = src.slice(faqStart, faqEnd === -1 ? undefined : faqEnd);

  const out = [];
  for (const e of chunk.matchAll(PAIR)) {
    const pergunta = unescape(e[1]);
    const resposta = unescape(e[2] ?? e[3] ?? "");
    if (pergunta && resposta) out.push({ pergunta, resposta });
  }
  return out.length ? out : null;
}
