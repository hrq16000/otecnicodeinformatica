/**
 * ============================================================================
 * LOGÍSTICA DE COLETA E ENTREGA — faixas até 30 km (Rodada 3X)
 * ============================================================================
 * Raio máximo confirmado pelo operador: 30 km.
 * Três faixas com taxa, janela de coleta e checklist próprios.
 */

export type FaixaId = "f1" | "f2" | "f3";

export interface FaixaLogistica {
  id: FaixaId;
  nome: string;
  raioMinKm: number;
  raioMaxKm: number;
  /** taxa de deslocamento (ida + volta) */
  taxaLabel: string;
  /** janelas fixas semanais — consolidação reduz custo por OS */
  janelas: string;
  /** dias úteis entre o aceite e a coleta */
  prazoColetaDias: number;
  regioes: string[];
}

export const FAIXAS_LOGISTICAS: FaixaLogistica[] = [
  {
    id: "f1",
    nome: "Faixa 1 — até 8 km",
    raioMinKm: 0,
    raioMaxKm: 8,
    taxaLabel: "Sem custo adicional",
    janelas: "Segunda a sexta, sob agendamento",
    prazoColetaDias: 1,
    regioes: ["Centro", "Batel", "Água Verde", "Rebouças", "Portão", "Bigorrilho", "Cristo Rei"],
  },
  {
    id: "f2",
    nome: "Faixa 2 — 8 a 15 km",
    raioMinKm: 8,
    raioMaxKm: 15,
    taxaLabel: "Taxa reduzida (informada no aceite)",
    janelas: "Terças e quintas",
    prazoColetaDias: 2,
    regioes: ["CIC", "Cajuru", "Boqueirão", "Santa Felicidade", "Boa Vista", "Ecoville", "Pinhais"],
  },
  {
    id: "f3",
    nome: "Faixa 3 — 15 a 30 km",
    raioMinKm: 15,
    raioMaxKm: 30,
    taxaLabel: "Taxa por distância (informada no aceite)",
    janelas: "Quartas (janela única consolidada)",
    prazoColetaDias: 3,
    regioes: ["São José dos Pinhais", "Colombo", "Araucária", "Campo Largo", "Almirante Tamandaré"],
  },
];

export const RAIO_MAXIMO_KM = 30;

export const faixaPorDistancia = (km: number): FaixaLogistica | undefined =>
  FAIXAS_LOGISTICAS.find((f) => km > f.raioMinKm - 0.001 && km <= f.raioMaxKm);

export const faixaPorRegiao = (regiao?: string | null): FaixaLogistica | undefined => {
  if (!regiao) return undefined;
  const alvo = regiao.toLowerCase().trim();
  return FAIXAS_LOGISTICAS.find((f) => f.regioes.some((r) => alvo.includes(r.toLowerCase())));
};

// === STATUS DE MOVIMENTAÇÃO ===================================================

export type MovimentacaoId =
  | "aceite"
  | "coleta-agendada"
  | "coletado"
  | "em-bancada"
  | "laudo-enviado"
  | "aguardando-aprovacao"
  | "em-reparo"
  | "pronto"
  | "entrega-agendada"
  | "entregue";

export interface MovimentacaoEtapa {
  id: MovimentacaoId;
  label: string;
  /** true quando o relógio do SLA fica pausado nesta etapa */
  pausaSla?: boolean;
}

export const MOVIMENTACOES: MovimentacaoEtapa[] = [
  { id: "aceite", label: "Aceite registrado" },
  { id: "coleta-agendada", label: "Coleta agendada" },
  { id: "coletado", label: "Coletado" },
  { id: "em-bancada", label: "Em bancada" },
  { id: "laudo-enviado", label: "Laudo enviado" },
  { id: "aguardando-aprovacao", label: "Aguardando aprovação do cliente", pausaSla: true },
  { id: "em-reparo", label: "Em reparo" },
  { id: "pronto", label: "Pronto para entrega" },
  { id: "entrega-agendada", label: "Entrega agendada" },
  { id: "entregue", label: "Entregue" },
];

export const movimentacaoIndex = (id?: string | null) =>
  MOVIMENTACOES.findIndex((m) => m.id === id);

// === CHECKLISTS ===============================================================

export interface ChecklistItem {
  id: string;
  label: string;
  obrigatorio: boolean;
}

export const CHECKLIST_COLETA: ChecklistItem[] = [
  { id: "conferir-faixa", label: "Confirmar endereço e faixa de distância (até 30 km)", obrigatorio: true },
  { id: "fotos-estado", label: "Fotografar o aparelho de todos os lados antes de retirar", obrigatorio: true },
  { id: "riscos-previos", label: "Registrar riscos, trincas e marcas preexistentes", obrigatorio: true },
  { id: "acessorios", label: "Listar acessórios recebidos (cabo, fonte, controle, base)", obrigatorio: true },
  { id: "senha", label: "Anotar senha de desbloqueio quando aplicável", obrigatorio: false },
  { id: "termo", label: "Registrar aceite das condições (mínimo R$ 299,99 / diagnóstico R$ 99,99)", obrigatorio: true },
  { id: "protocolo", label: "Gerar protocolo e enviar ao cliente pelo WhatsApp", obrigatorio: true },
  { id: "embalagem", label: "Embalar com proteção adequada ao volume", obrigatorio: true },
];

export const CHECKLIST_ENTREGA: ChecklistItem[] = [
  { id: "teste-final", label: "Teste final na bancada com o sintoma original reproduzido", obrigatorio: true },
  { id: "limpeza", label: "Limpeza externa antes da devolução", obrigatorio: true },
  { id: "fotos-pos", label: "Fotografar o aparelho reparado e funcionando", obrigatorio: true },
  { id: "acessorios-volta", label: "Devolver todos os acessórios listados na coleta", obrigatorio: true },
  { id: "garantia", label: "Entregar comprovante com prazo de garantia do serviço", obrigatorio: true },
  { id: "conferencia-cliente", label: "Conferir o funcionamento junto ao cliente na entrega", obrigatorio: true },
  { id: "avaliacao", label: "Enviar pedido de avaliação após a entrega", obrigatorio: false },
];
