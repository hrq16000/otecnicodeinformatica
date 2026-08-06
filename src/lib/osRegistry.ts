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
