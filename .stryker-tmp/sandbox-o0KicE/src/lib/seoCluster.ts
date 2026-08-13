/**
 * ============================================================================
 * CLUSTER SEO — links internos automáticos sintoma → serviço → local
 * ============================================================================
 * Objetivo: formar clusters temáticos consistentes (e legíveis por IA) entre
 * páginas de sintoma/problema, serviços canônicos, modalidades de atendimento
 * e páginas locais (bairros curados + cidades âncora), sem link em massa.
 *
 * Regras:
 *  - Só entram rotas reais já existentes no app.
 *  - Volume controlado por bloco (evita spam de links internos).
 */
// @ts-nocheck

import {
  SERVICOS_CANONICOS,
  MODALIDADES_ATENDIMENTO,
  CURITIBA_BAIRROS,
  CIDADE_LIST,
} from "@/lib/cidadesData";

export interface ClusterLink {
  label: string;
  to: string;
  desc?: string;
}

export interface ClusterGroup {
  titulo: string;
  links: ClusterLink[];
}

/** Palavras-chave → serviços canônicos relacionados. */
const SERVICE_KEYWORDS: Record<string, string[]> = {
  "/servicos/formatacao": ["formatar", "formatação", "windows", "sistema", "lento", "reinstalar"],
  "/servicos/manutencao-de-notebook": ["notebook", "tela", "teclado", "bateria", "dobradiça", "carrega"],
  "/servicos/manutencao-de-computador": ["pc", "computador", "desktop", "não liga", "nao liga", "reinicia", "trava", "fonte", "placa"],
  "/servicos/upgrade-ssd-ram": ["ssd", "memória", "memoria", "ram", "lento", "desempenho", "upgrade"],
  "/servicos/remocao-de-virus": ["vírus", "virus", "malware", "pop-up", "propaganda", "sequestro", "ransomware"],
  "/servicos/recuperacao-de-dados": ["arquivo", "dados", "backup", "hd", "recuperar", "apagou", "perdeu"],
  "/servicos/redes-e-wifi": ["wi-fi", "wifi", "internet", "rede", "roteador", "sinal", "conexão", "conexao"],
  "/servicos/suporte-tecnico-empresarial": ["empresa", "empresarial", "escritório", "escritorio", "servidor", "corporativo"],
};

const norm = (s: string) => s.toLowerCase();

/** Serviços relacionados a um texto livre (sintoma, categoria, título). */
export function relatedServices(context: string, limit = 4): ClusterLink[] {
  const ctx = norm(context);
  const scored = SERVICOS_CANONICOS.map((s) => {
    const kws = SERVICE_KEYWORDS[s.to] ?? [];
    const score = kws.reduce((acc, k) => (ctx.includes(k) ? acc + 1 : acc), 0);
    return { s, score };
  });
  const matched = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  const fallback = scored.filter((x) => x.score === 0);
  return [...matched, ...fallback]
    .slice(0, limit)
    .map(({ s }) => ({ label: s.label, to: s.to, desc: s.desc }));
}

/** Bairros curados relacionados (bairro atual sempre primeiro, sem auto-link). */
export function relatedBairros(currentPath?: string, limit = 5): ClusterLink[] {
  return CURITIBA_BAIRROS.filter((b) => b.to !== currentPath).slice(0, limit);
}

/** Cidades âncora relacionadas. */
export function relatedCidades(currentSlug?: string, limit = 5): ClusterLink[] {
  return CIDADE_LIST.filter((c) => c.slug !== currentSlug)
    .slice(0, limit)
    .map((c) => ({
      label: `Técnico em ${c.cidade}`,
      to: `/tecnico-informatica-${c.slug}`,
      desc: c.subtitulo,
    }));
}

/** Modalidades de atendimento. */
export function modalidades(currentPath?: string, limit = 4): ClusterLink[] {
  return MODALIDADES_ATENDIMENTO.filter((m) => m.to !== currentPath).slice(0, limit);
}

export interface ClusterOptions {
  /** Texto de contexto (categoria + sintoma + título da página). */
  contexto?: string;
  currentPath?: string;
  currentCidadeSlug?: string;
}

/** Monta os grupos do cluster para renderização. */
export function buildCluster(opts: ClusterOptions = {}): ClusterGroup[] {
  const { contexto = "", currentPath, currentCidadeSlug } = opts;
  return [
    { titulo: "Serviços relacionados", links: relatedServices(contexto) },
    { titulo: "Como o atendimento acontece", links: modalidades(currentPath) },
    { titulo: "Bairros de Curitiba", links: relatedBairros(currentPath) },
    { titulo: "Cidades atendidas", links: relatedCidades(currentCidadeSlug) },
  ].filter((g) => g.links.length > 0);
}
