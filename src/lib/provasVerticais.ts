/**
 * Provas visuais das verticais multieletrônicos — fonte única fail-closed.
 *
 * Regra (docs/registro-provas-visuais.md): nenhuma galeria pública de TV
 * ou de placas pode ser publicada enquanto o dossiê da vertical não tiver
 * as cinco provas anexadas E validadas por um administrador. Imagem de
 * banco nunca conta como prova operacional.
 */

export type VerticalProva = "tv" | "placa" | "monitor";

export type ProvaId = "bancada" | "entrada" | "placa" | "teste-final" | "embalagem";

export interface ProvaSpec {
  id: ProvaId;
  titulo: string;
  exigencia: string;
}

/** Checklist obrigatório, na ordem do fluxo de bancada. */
export const CHECKLIST_PROVAS: ProvaSpec[] = [
  {
    id: "bancada",
    titulo: "P1 — Bancada",
    exigencia:
      "Bancada real em uso, com instrumentação visível (fonte, multímetro, estação ou microscópio) e área ESD identificável.",
  },
  {
    id: "entrada",
    titulo: "P2 — Entrada",
    exigencia:
      "Equipamento recebido e etiquetado, com marca, modelo e estado de recebimento legíveis na foto.",
  },
  {
    id: "placa",
    titulo: "P3 — Placa",
    exigencia: "Placa exposta com o ponto avaliado ou reparado identificável.",
  },
  {
    id: "teste-final",
    titulo: "P4 — Teste final",
    exigencia: "Equipamento remontado e em funcionamento na bancada após o reparo.",
  },
  {
    id: "embalagem",
    titulo: "P5 — Embalagem",
    exigencia: "Aparelho embalado para devolução, com proteção e acessórios conferidos.",
  },
];

export const VERTICAIS: { id: VerticalProva; rotulo: string; rota: string }[] = [
  { id: "tv", rotulo: "TV / Smart TV", rota: "/servicos/conserto-tv" },
  { id: "placa", rotulo: "Placas eletrônicas", rota: "/servicos/conserto-placa" },
  { id: "monitor", rotulo: "Monitor", rota: "/servicos/conserto-monitor" },
];

export interface AnexoProva {
  /** Caminho no bucket privado `os-midias`. */
  path: string;
  /** Protocolo da OS que originou a foto (rastreabilidade). */
  protocolo: string;
  /** Origem comprovada: sempre bancada própria. Banco de imagem é recusado. */
  origemPropria: boolean;
  /** Autorização do cliente quando o equipamento é identificável. */
  autorizacaoCliente: boolean;
  validada: boolean;
  anexadaEm: string;
  /** Texto alternativo factual, sem claim promocional. */
  alt: string;
}

export interface DossieVertical {
  vertical: VerticalProva;
  criadoEm: string;
  provas: Partial<Record<ProvaId, AnexoProva>>;
  notas: string;
  publicado: boolean;
  publicadoEm?: string;
}

export function novoDossieVertical(vertical: VerticalProva): DossieVertical {
  return { vertical, criadoEm: new Date().toISOString(), provas: {}, notas: "", publicado: false };
}

export interface AvaliacaoVertical {
  ok: boolean;
  validadas: number;
  total: number;
  pendencias: string[];
}

/**
 * Avaliação fail-closed: a galeria só é liberada quando as cinco provas
 * existirem, forem de bancada própria, tiverem alt factual, autorização
 * (quando identificável) e validação manual.
 */
export function avaliarDossie(dossie: DossieVertical): AvaliacaoVertical {
  const pendencias: string[] = [];
  let validadas = 0;
  for (const spec of CHECKLIST_PROVAS) {
    const anexo = dossie.provas[spec.id];
    if (!anexo) {
      pendencias.push(`${spec.titulo}: sem foto anexada`);
      continue;
    }
    if (!anexo.origemPropria) {
      pendencias.push(`${spec.titulo}: origem não comprovada como bancada própria`);
      continue;
    }
    if (!anexo.protocolo.trim()) {
      pendencias.push(`${spec.titulo}: sem protocolo de OS vinculado`);
      continue;
    }
    if (!anexo.alt.trim()) {
      pendencias.push(`${spec.titulo}: sem texto alternativo factual`);
      continue;
    }
    if (!anexo.autorizacaoCliente) {
      pendencias.push(`${spec.titulo}: sem autorização registrada do cliente`);
      continue;
    }
    if (!anexo.validada) {
      pendencias.push(`${spec.titulo}: aguardando validação do administrador`);
      continue;
    }
    validadas += 1;
  }
  return { ok: pendencias.length === 0, validadas, total: CHECKLIST_PROVAS.length, pendencias };
}

/** Só pode publicar galeria quem passou pelo checklist completo. */
export function podePublicarGaleria(dossie: DossieVertical): boolean {
  return avaliarDossie(dossie).ok;
}

const KEY = "provas-verticais-dossies";

export function lerDossiesVerticais(): DossieVertical[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DossieVertical[]) : [];
  } catch {
    return [];
  }
}

export function gravarDossieVertical(dossie: DossieVertical) {
  const todos = lerDossiesVerticais().filter((d) => d.vertical !== dossie.vertical);
  localStorage.setItem(KEY, JSON.stringify([dossie, ...todos]));
}
