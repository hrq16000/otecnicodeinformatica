/**
 * Extrai as FAQs REAIS já renderizadas nas páginas comerciais P0 a partir do
 * próprio código-fonte da página — sem reescrever nem inventar conteúdo.
 * Garante paridade entre o que o usuário vê (hidratado) e o FAQPage estático.
 *
 * Só há entrada aqui para páginas que realmente exibem um bloco de perguntas
 * frequentes. Páginas sem FAQ visível NÃO recebem FAQPage (seria markup sem
 * conteúdo correspondente, contra as diretrizes de rich results).
 */
import { readFileSync, existsSync } from "node:fs";

const SOURCES = {
  "/tecnico-informatica-curitiba": "src/pages/TecnicoInformaticaCuritiba.tsx",
  "/atendimento-domicilio": "src/pages/AtendimentoDomicilio.tsx",
  "/empresa-de-ti-curitiba": "src/pages/EmpresaDeTiCuritiba.tsx",
  "/faq": "src/pages/FAQ.tsx",
  "/problemas/notebook-nao-liga": "src/pages/problemas/NotebookNaoLiga.tsx",
};

const PAIR =
  /question:\s*"((?:[^"\\]|\\.)*)"\s*,\s*answer:\s*(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/g;

const unescape = (s) =>
  s
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** FAQ da rota no formato usado pelo gerador estático, ou null. */
export function priorityFaq(path) {
  const file = SOURCES[path];
  if (!file || !existsSync(file)) return null;
  const src = readFileSync(file, "utf8");
  const out = [];
  for (const m of src.matchAll(PAIR)) {
    const pergunta = unescape(m[1]);
    const resposta = unescape(m[2] ?? m[3] ?? "");
    if (pergunta && resposta) out.push({ pergunta, resposta });
  }
  return out.length ? out.slice(0, 10) : null;
}

export const PRIORITY_FAQ_PATHS = Object.keys(SOURCES);
