/**
 * Provas visuais obrigatórias do conserto de monitor — fonte única.
 *
 * Política fail-closed (docs/checklist-provas-visuais-monitor.md): o status
 * de um lead ou OS de monitor só pode ser liberado quando as quatro provas
 * estiverem anexadas E validadas por um administrador.
 */
// @ts-nocheck


export type ProvaMonitorId = "entrada" | "placa-logica" | "teste-final" | "embalagem";

export interface ProvaMonitorSpec {
  id: ProvaMonitorId;
  titulo: string;
  exigencia: string;
}

export const PROVAS_MONITOR: ProvaMonitorSpec[] = [
  {
    id: "entrada",
    titulo: "P1 — Entrada",
    exigencia: "Monitor recebido com marca, modelo, série e estado do painel visíveis na foto.",
  },
  {
    id: "placa-logica",
    titulo: "P2 — Placa lógica",
    exigencia: "Placa exposta com o ponto avaliado ou reparado identificável.",
  },
  {
    id: "teste-final",
    titulo: "P3 — Teste final",
    exigencia: "Monitor remontado, ligado e exibindo imagem estável na bancada.",
  },
  {
    id: "embalagem",
    titulo: "P4 — Embalagem",
    exigencia: "Aparelho embalado para devolução, com proteção e acessórios.",
  },
];

export interface ProvaAnexo {
  path: string;
  validada: boolean;
  anexadaEm: string;
}

export interface DossieMonitor {
  protocolo: string;
  criadoEm: string;
  provas: Partial<Record<ProvaMonitorId, ProvaAnexo>>;
  notas: string;
  liberado: boolean;
  liberadoEm?: string;
}

export function novoDossieMonitor(protocolo: string): DossieMonitor {
  return {
    protocolo,
    criadoEm: new Date().toISOString(),
    provas: {},
    notas: "",
    liberado: false,
  };
}

export interface AvaliacaoProvas {
  ok: boolean;
  validadas: number;
  pendencias: string[];
}

/** Avaliação fail-closed: qualquer prova ausente ou não validada bloqueia. */
export function avaliarProvasMonitor(dossie: DossieMonitor): AvaliacaoProvas {
  const pendencias: string[] = [];
  let validadas = 0;
  for (const spec of PROVAS_MONITOR) {
    const anexo = dossie.provas[spec.id];
    if (!anexo) pendencias.push(`${spec.titulo}: sem foto anexada`);
    else if (!anexo.validada) pendencias.push(`${spec.titulo}: aguardando validação`);
    else validadas += 1;
  }
  return { ok: pendencias.length === 0, validadas, pendencias };
}

const KEY = "provas-monitor-dossies";

export function lerDossies(): DossieMonitor[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DossieMonitor[]) : [];
  } catch {
    return [];
  }
}

export function gravarDossie(dossie: DossieMonitor) {
  const todos = lerDossies().filter((d) => d.protocolo !== dossie.protocolo);
  localStorage.setItem(KEY, JSON.stringify([dossie, ...todos]));
}

export function removerDossie(protocolo: string) {
  localStorage.setItem(KEY, JSON.stringify(lerDossies().filter((d) => d.protocolo !== protocolo)));
}
