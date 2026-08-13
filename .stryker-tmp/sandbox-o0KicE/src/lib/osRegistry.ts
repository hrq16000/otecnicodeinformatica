// @ts-nocheck
// Registro local (navegador) das ordens de serviço abertas pelo wizard.
// Não há armazenamento no servidor: o histórico fica no dispositivo do
// cliente e a consulta oficial continua sendo pelo atendimento.

export interface OsRecord {
  protocolo: string;
  criadoEm: number;
  servico: string;
  modelo?: string;
  cidade?: string;
  modalidade?: string;
  janela?: string;
}

const KEY = "os_records_v1";
const MAX = 20;

export function listOsRecords(): OsRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as OsRecord[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOsRecord(record: OsRecord): void {
  if (typeof window === "undefined") return;
  try {
    const atual = listOsRecords().filter((r) => r.protocolo !== record.protocolo);
    const proximo = [record, ...atual].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(proximo));
  } catch {
    /* storage indisponível — segue sem histórico local */
  }
}

export function findOsRecord(protocolo: string): OsRecord | undefined {
  const alvo = protocolo.trim().toUpperCase();
  return listOsRecords().find((r) => r.protocolo.toUpperCase() === alvo);
}

export interface OsEtapa {
  titulo: string;
  prazo: string;
  descricao: string;
}

/** Etapas e prazos padrão do atendimento (mesma régua usada na OS em PDF). */
export const OS_ETAPAS: OsEtapa[] = [
  {
    titulo: "1. Abertura e triagem",
    prazo: "Em até 1 dia útil",
    descricao:
      "Conferência dos dados informados, entendimento do uso pretendido e alinhamento da modalidade (bancada ou no local).",
  },
  {
    titulo: "2. Conferência de compatibilidade e peças",
    prazo: "Até 1 dia útil após a triagem",
    descricao:
      "Verificação de compatibilidade, procedência e integridade das peças. Peças fornecidas pelo cliente têm garantia apenas de mão de obra.",
  },
  {
    titulo: "3. Valor do atendimento e aprovação",
    prazo: "Até 1 dia útil após a conferência",
    descricao: "Envio do escopo e do valor de mão de obra. Nada é executado sem aprovação por escrito no atendimento.",
  },
  {
    titulo: "4. Execução",
    prazo: "1 a 3 dias úteis conforme o escopo",
    descricao: "Montagem, instalação, atualização de firmware/drivers e organização de cabos e fluxo de ar.",
  },
  {
    titulo: "5. Testes e checklist final",
    prazo: "No mesmo ciclo da execução",
    descricao: "Bateria de testes de estabilidade, temperatura e armazenamento, com checklist de entrega em PDF.",
  },
  {
    titulo: "6. Entrega e garantia",
    prazo: "Combinada no atendimento",
    descricao: "Entrega com checklist assinado, nota fiscal e prazo de garantia de mão de obra registrado.",
  },
];

// ============================================================
// Linha do tempo local da OS (data/hora de cada etapa registrada)
// ============================================================

export interface OsEvento {
  /** Rótulo da etapa ou alteração (ex.: "Abertura e triagem"). */
  titulo: string;
  /** Timestamp em ms. */
  em: number;
  /** Detalhe opcional (ex.: novo prazo combinado). */
  detalhe?: string;
  /** Marca eventos de alteração de prazo. */
  tipo?: "etapa" | "prazo" | "sistema";
}

const EVENTOS_KEY = "os_eventos_v1";
const MAX_EVENTOS = 60;

type EventosMap = Record<string, OsEvento[]>;

function readEventosMap(): EventosMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(EVENTOS_KEY);
    const parsed = raw ? (JSON.parse(raw) as EventosMap) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Eventos registrados neste dispositivo para o protocolo informado. */
export function listOsEventos(protocolo: string): OsEvento[] {
  const alvo = protocolo.trim().toUpperCase();
  const lista = readEventosMap()[alvo] ?? [];
  return [...lista].sort((a, b) => a.em - b.em);
}

/** Registra um evento (etapa concluída, alteração de prazo, consulta). */
export function addOsEvento(protocolo: string, evento: Omit<OsEvento, "em"> & { em?: number }): void {
  if (typeof window === "undefined") return;
  const alvo = protocolo.trim().toUpperCase();
  if (!alvo) return;
  try {
    const map = readEventosMap();
    const atual = map[alvo] ?? [];
    const novo: OsEvento = { tipo: "etapa", ...evento, em: evento.em ?? Date.now() };
    map[alvo] = [...atual, novo].slice(-MAX_EVENTOS);
    window.localStorage.setItem(EVENTOS_KEY, JSON.stringify(map));
  } catch {
    /* storage indisponível — segue sem linha do tempo local */
  }
}

/** Linha do tempo consolidada: abertura registrada + eventos posteriores. */
export function osTimeline(record: OsRecord): OsEvento[] {
  const abertura: OsEvento = {
    titulo: "Ordem de serviço aberta neste dispositivo",
    em: record.criadoEm,
    detalhe: record.servico,
    tipo: "sistema",
  };
  const eventos = listOsEventos(record.protocolo).filter((e) => e.em !== record.criadoEm);
  return [abertura, ...eventos];
}

/** Formato oficial do protocolo (ver OS_FORMAT_LABEL em config/commercial). */
export const OS_PATTERN = /^OS-[A-Z]{2,4}-\d{8}-\d{3,5}$/;

export function normalizeOsNumero(valor: string): string {
  return valor.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidOsNumero(valor: string): boolean {
  return OS_PATTERN.test(normalizeOsNumero(valor));
}
