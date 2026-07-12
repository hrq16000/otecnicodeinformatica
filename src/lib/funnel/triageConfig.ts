/**
 * ============================================================================
 * TRIAGEM — CONFIGURAÇÃO ÚNICA (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 * Este arquivo é a ÚNICA fonte de verdade do funil de triagem. Para replicar
 * a lógica em outros projetos Lovable, ajuste APENAS os pontos marcados com
 * `⚙️ CONFIGURÁVEL`. Não espalhe textos/valores em componentes.
 *
 * ⚙️ CONFIGURÁVEL:
 *  - WHATSAPP_NUMBER ....... número de destino (por projeto)
 *  - BRAND_NAME ............ nome exibido nas mensagens
 *  - TRIAGE_VERSION ........ versão dos termos/estado (bump ao mudar regras)
 *  - PRICING ............... valores mínimos e faixas de referência
 *  - PRAZO_* ............... prazos estimados
 *  - URGENCY_OPTIONS ....... opções de urgência
 * ============================================================================
 */
import { siteConfig } from "@/lib/siteConfig";

// ⚙️ CONFIGURÁVEL — número por projeto (aqui vem do siteConfig do portal).
export const WHATSAPP_NUMBER = siteConfig.whatsappNumber;
export const BRAND_NAME = siteConfig.brandName;

/** Bump SEMPRE que regras/termos/estrutura mudarem (invalida estado antigo). */
export const TRIAGE_VERSION = "5.0";
export const STORAGE_KEY = `triage_state_${TRIAGE_VERSION}`;

// ─────────────────────────────────────────────────────────────
// PREÇOS, PRAZOS E MODALIDADES (⚙️ CONFIGURÁVEL)
// ─────────────────────────────────────────────────────────────
export const PRICING = {
  minGeral: "R$ 99,99",
  visita: "R$ 99,99 por até 30 min",
  visitaObs:
    "Nova cobrança a cada período adicional de até 30 min. Peças não inclusas. A visita não garante o reparo.",
  coletaMin: "R$ 299,99",
  coletaCancel: "R$ 99,99",
  coletaTeto: "R$ 300,00",
} as const;

export const PRAZO_COLETA = "3 a 60 dias úteis (pode ser maior se houver encomenda/importação de peças)";

// ─────────────────────────────────────────────────────────────
// MODALIDADES
// ─────────────────────────────────────────────────────────────
export type ServiceRoute = "remoto" | "visita" | "coleta";

export const ROUTE_LABEL: Record<ServiceRoute, string> = {
  remoto: "Atendimento remoto",
  visita: "Visita técnica",
  coleta: "Coleta e entrega",
};

export const ROUTE_MIN_PRICE: Record<ServiceRoute, string> = {
  remoto: PRICING.minGeral,
  visita: PRICING.visita,
  coleta: PRICING.coletaMin,
};

export const ROUTE_PRAZO: Record<ServiceRoute, string> = {
  remoto: "Combinado no WhatsApp (serviço compatível)",
  visita: "Agendamento conforme disponibilidade",
  coleta: PRAZO_COLETA,
};

// ─────────────────────────────────────────────────────────────
// URGÊNCIA (⚙️ CONFIGURÁVEL)
// ─────────────────────────────────────────────────────────────
export const URGENCY_OPTIONS = [
  { value: "72h", label: "Próximas 72 horas úteis — até 3 dias úteis" },
  { value: "semana", label: "Esta semana" },
  { value: "sem-pressa", label: "Sem pressa" },
];

// ─────────────────────────────────────────────────────────────
// TIPOS DE CAMPO / ESTADO
// ─────────────────────────────────────────────────────────────
export type EquipmentId =
  | "pc"
  | "tv"
  | "celular"
  | "surface"
  | "som"
  | "videogame"
  | "outro";

export type FieldType = "single" | "chips" | "text" | "textarea";

export interface FieldOption {
  value: string;
  label: string;
}

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  required?: boolean;
  placeholder?: string;
  helper?: string;
  minLength?: number;
  /** Visibilidade condicional dependente das respostas atuais. */
  visibleWhen?: (a: TriageAnswers) => boolean;
}

/** Metadados por sintoma: rota base, tipo de pergunta de evento e faixa de preço. */
export interface SymptomMeta {
  /** Rota base do sintoma (PC pode ser rebaixado p/ coleta se não ligar). */
  route: ServiceRoute;
  /** Pergunta temporal correta para este sintoma. */
  event?: "quando_aconteceu" | "quando_comecou" | "frequencia" | null;
  /** Texto informativo de faixa/estimativa (não vinculante). */
  priceHint?: string;
  /** Categoria interna (indício provável, nunca diagnóstico definitivo). */
  category?: string;
}

export interface EquipmentConfig {
  id: EquipmentId;
  label: string;
  /** Nome de ícone lucide-react. */
  icon: string;
  /** Rota fixa quando o equipamento nunca aceita remoto/visita. */
  forcedRoute?: ServiceRoute;
  /** Campos de identificação (etapa 2). */
  identityFields: Field[];
  /** Campo de sintoma principal (etapa 2). */
  symptomField: Field;
  /** Metadados por valor de sintoma. */
  symptomMeta: Record<string, SymptomMeta>;
  /** Campos contextuais condicionais (etapa 3). */
  contextFields: Field[];
}

export interface TriageAnswers {
  equipment: EquipmentId | null;
  /** Respostas de identificação e contexto, chaveadas por field.id. */
  fields: Record<string, string>;
  symptom: string | null;
  urgency: string | null;
  termsAccepted: Record<string, boolean>;
  finalNotes: string;
}

export const EMPTY_ANSWERS: TriageAnswers = {
  equipment: null,
  fields: {},
  symptom: null,
  urgency: null,
  termsAccepted: {},
  finalNotes: "",
};

// ─────────────────────────────────────────────────────────────
// HELPERS DE CAMPO REUTILIZÁVEIS
// ─────────────────────────────────────────────────────────────
const modeloField: Field = {
  id: "modelo",
  label: "Marca e modelo (se souber)",
  type: "text",
  placeholder: "Ex.: Samsung 50\" NU7100 · Dell Inspiron 15 · iPhone 12",
  required: false,
};

const idadeField: Field = {
  id: "idade",
  label: "Idade aproximada do equipamento",
  type: "single",
  required: false,
  options: [
    { value: "<1", label: "Menos de 1 ano" },
    { value: "1-3", label: "1 a 3 anos" },
    { value: "3-5", label: "3 a 5 anos" },
    { value: ">5", label: "Mais de 5 anos" },
    { value: "nao-sei", label: "Não sei" },
  ],
};

const arquivosField = (a: TriageAnswers): boolean =>
  ["pc", "celular", "surface"].includes(a.equipment ?? "");

// ─────────────────────────────────────────────────────────────
// CATÁLOGO DE EQUIPAMENTOS
// ─────────────────────────────────────────────────────────────
export const EQUIPMENTS: EquipmentConfig[] = [
  // ===================== PC / NOTEBOOK =====================
  {
    id: "pc",
    label: "PC / Notebook",
    icon: "Laptop",
    identityFields: [
      {
        id: "tipo",
        label: "Qual é o tipo?",
        type: "single",
        required: true,
        options: [
          { value: "desktop", label: "Computador desktop" },
          { value: "notebook", label: "Notebook" },
          { value: "all-in-one", label: "All-in-one" },
          { value: "nao-sei", label: "Não sei informar" },
        ],
      },
      modeloField,
      {
        id: "liga",
        label: "O equipamento liga?",
        type: "single",
        required: true,
        options: [
          { value: "liga-normal", label: "Liga e inicia normalmente" },
          { value: "liga-nao-inicia", label: "Liga, mas não inicia o sistema" },
          { value: "liga-desliga", label: "Liga e desliga" },
          { value: "nao-liga", label: "Não liga" },
          { value: "nao-sei", label: "Não sei informar" },
        ],
      },
    ],
    symptomField: {
      id: "symptom",
      label: "Qual é o principal objetivo?",
      type: "single",
      required: true,
      options: [
        { value: "instalar-configurar", label: "Instalar ou configurar programa" },
        { value: "virus-lentidao", label: "Remover vírus ou lentidão" },
        { value: "impressora-periferico", label: "Configurar impressora ou periférico" },
        { value: "windows-sistema", label: "Problema no Windows ou sistema" },
        { value: "recuperar-arquivos", label: "Recuperar arquivos" },
        { value: "trocar-componente", label: "Trocar ou instalar componente" },
        { value: "tela-teclado-bateria", label: "Problema de tela, teclado ou bateria" },
        { value: "nao-liga-placa", label: "Não liga ou possível defeito de placa" },
        { value: "outro", label: "Outro" },
      ],
    },
    symptomMeta: {
      "instalar-configurar": { route: "remoto", event: "quando_comecou", category: "software" },
      "virus-lentidao": { route: "visita", event: "quando_comecou", category: "software" },
      "impressora-periferico": { route: "visita", event: null, category: "periférico" },
      "windows-sistema": { route: "visita", event: "quando_comecou", category: "sistema" },
      "recuperar-arquivos": { route: "visita", event: "quando_aconteceu", category: "dados" },
      "trocar-componente": { route: "coleta", event: null, category: "hardware" },
      "tela-teclado-bateria": { route: "coleta", event: "quando_aconteceu", category: "hardware" },
      "nao-liga-placa": { route: "coleta", event: "quando_aconteceu", category: "possível placa" },
      "outro": { route: "visita", event: "quando_comecou" },
    },
    contextFields: [
      {
        id: "arquivos-importantes",
        label: "Há arquivos importantes que você quer preservar?",
        type: "single",
        required: false,
        visibleWhen: arquivosField,
        options: [
          { value: "sim", label: "Sim, tenho arquivos importantes" },
          { value: "nao", label: "Não" },
          { value: "nao-sei", label: "Não sei" },
        ],
      },
      {
        id: "outra-assistencia",
        label: "O equipamento já passou por outra assistência para este problema?",
        type: "single",
        required: false,
        options: [
          { value: "nao", label: "Não" },
          { value: "sim", label: "Sim" },
        ],
      },
    ],
  },

  // ===================== TV =====================
  {
    id: "tv",
    label: "TV",
    icon: "Tv",
    forcedRoute: "coleta",
    identityFields: [
      {
        id: "tipo",
        label: "Tipo aproximado da TV",
        type: "single",
        required: true,
        options: [
          { value: "led", label: "LED" },
          { value: "lcd", label: "LCD" },
          { value: "oled", label: "OLED" },
          { value: "qled", label: "QLED" },
          { value: "nao-sei", label: "Não sei informar" },
        ],
      },
      {
        id: "polegadas",
        label: "Tamanho em polegadas (se souber)",
        type: "text",
        placeholder: "Ex.: 50\"",
        required: false,
      },
      modeloField,
    ],
    symptomField: {
      id: "symptom",
      label: "O que aconteceu?",
      type: "single",
      required: true,
      options: [
        { value: "tela-quebrada", label: "Tela quebrada" },
        { value: "linhas", label: "Linhas na imagem" },
        { value: "manchas", label: "Manchas na tela" },
        { value: "tela-escura-som", label: "Tela escura com som" },
        { value: "acende-apaga", label: "Acende e apaga" },
        { value: "nao-liga", label: "Não liga" },
        { value: "sem-imagem", label: "Sem imagem" },
        { value: "sem-som", label: "Sem som" },
        { value: "imagem-defeito", label: "Imagem com defeito" },
        { value: "outro", label: "Outro" },
      ],
    },
    symptomMeta: {
      "tela-quebrada": {
        route: "coleta", event: "quando_aconteceu", category: "possível conjunto de tela/display",
        priceHint: "Display: peças/reparo podem variar de ~R$ 900 a R$ 5.000 conforme tamanho, tecnologia e disponibilidade; mão de obra e logística ~R$ 300 a R$ 500.",
      },
      "linhas": {
        route: "coleta", event: "quando_comecou", category: "possível display",
        priceHint: "Indício de display: peças/reparo ~R$ 900 a R$ 5.000; mão de obra/logística ~R$ 300 a R$ 500.",
      },
      "manchas": {
        route: "coleta", event: "quando_comecou", category: "possível display",
        priceHint: "Indício de display: peças/reparo ~R$ 900 a R$ 5.000; mão de obra/logística ~R$ 300 a R$ 500.",
      },
      "tela-escura-som": {
        route: "coleta", event: "quando_comecou", category: "possível análise de LEDs",
        priceHint: "Indício de LEDs: faixa de referência ~R$ 300 a R$ 500, sujeita à avaliação.",
      },
      "acende-apaga": {
        route: "coleta", event: "frequencia", category: "possível placa/alimentação",
        priceHint: "Placa/alimentação: faixa de referência ~R$ 300 a R$ 500, sujeita à avaliação.",
      },
      "nao-liga": {
        route: "coleta", event: "quando_aconteceu", category: "possível placa/alimentação",
        priceHint: "Placa/alimentação: faixa de referência ~R$ 300 a R$ 500, sujeita à avaliação.",
      },
      "sem-imagem": {
        route: "coleta", event: "quando_comecou", category: "possível placa/componentes",
        priceHint: "Placa/componentes: faixa de referência ~R$ 300 a R$ 500, sujeita à avaliação.",
      },
      "sem-som": {
        route: "coleta", event: "quando_comecou", category: "possível placa/áudio",
        priceHint: "Placa/áudio: faixa de referência ~R$ 300 a R$ 500, sujeita à avaliação.",
      },
      "imagem-defeito": {
        route: "coleta", event: "quando_comecou", category: "possível placa/componentes",
        priceHint: "Placa/componentes: faixa de referência ~R$ 300 a R$ 500, sujeita à avaliação.",
      },
      "outro": { route: "coleta", event: "quando_comecou" },
    },
    contextFields: [],
  },

  // ===================== CELULAR / TABLET =====================
  {
    id: "celular",
    label: "Celular / Tablet",
    icon: "Smartphone",
    forcedRoute: "coleta",
    identityFields: [
      {
        id: "tipo",
        label: "Celular ou tablet?",
        type: "single",
        required: true,
        options: [
          { value: "celular", label: "Celular" },
          { value: "tablet", label: "Tablet" },
        ],
      },
      {
        id: "marca",
        label: "Marca",
        type: "chips",
        required: true,
        options: [
          { value: "Apple", label: "Apple (iPhone/iPad)" },
          { value: "Samsung", label: "Samsung" },
          { value: "Motorola", label: "Motorola" },
          { value: "Xiaomi", label: "Xiaomi" },
          { value: "LG", label: "LG" },
          { value: "Outra", label: "Outra" },
        ],
      },
      modeloField,
      idadeField,
    ],
    symptomField: {
      id: "symptom",
      label: "O que aconteceu?",
      type: "single",
      required: true,
      options: [
        { value: "caiu", label: "Caiu" },
        { value: "molhou", label: "Molhou" },
        { value: "tela-quebrou", label: "Tela quebrou" },
        { value: "tela-sem-imagem", label: "Tela sem imagem" },
        { value: "nao-liga", label: "Não liga" },
        { value: "nao-carrega", label: "Não carrega" },
        { value: "bateria", label: "Bateria descarrega rápido" },
        { value: "reinicia-trava", label: "Reinicia ou trava" },
        { value: "camera-audio-conector", label: "Câmera, áudio ou conector" },
        { value: "outro", label: "Outro" },
      ],
    },
    symptomMeta: {
      "caiu": { route: "coleta", event: "quando_aconteceu" },
      "molhou": { route: "coleta", event: "quando_aconteceu" },
      "tela-quebrou": { route: "coleta", event: "quando_aconteceu" },
      "tela-sem-imagem": { route: "coleta", event: "quando_comecou" },
      "nao-liga": { route: "coleta", event: "quando_aconteceu" },
      "nao-carrega": { route: "coleta", event: "quando_comecou" },
      "bateria": { route: "coleta", event: "quando_comecou" },
      "reinicia-trava": { route: "coleta", event: "frequencia" },
      "camera-audio-conector": { route: "coleta", event: "quando_comecou" },
      "outro": { route: "coleta", event: "quando_comecou" },
    },
    contextFields: [
      // molhou
      {
        id: "molhou-tentou",
        label: "Depois que molhou, tentou ligar ou carregar?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "molhou",
        options: [
          { value: "nao", label: "Não tentei" },
          { value: "liguei", label: "Tentei ligar" },
          { value: "carreguei", label: "Tentei carregar" },
        ],
      },
      {
        id: "molhou-ligado",
        label: "O aparelho ainda está ligado?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "molhou",
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "nao-sei", label: "Não sei" },
        ],
      },
      {
        id: "molhou-liquido",
        label: "Qual foi o contato?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "molhou",
        options: [
          { value: "agua", label: "Água" },
          { value: "chuva", label: "Chuva" },
          { value: "piscina", label: "Piscina / cloro" },
          { value: "outro", label: "Outro líquido" },
        ],
      },
      // caiu
      {
        id: "caiu-tela",
        label: "A tela quebrou?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "caiu",
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
        ],
      },
      {
        id: "caiu-estrutura",
        label: "A estrutura entortou?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "caiu",
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "nao-sei", label: "Não sei" },
        ],
      },
      {
        id: "caiu-liga",
        label: "O aparelho ainda liga?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "caiu",
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
        ],
      },
      // não carrega
      {
        id: "carrega-testou",
        label: "Já testou outro cabo e carregador compatíveis?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "nao-carrega",
        options: [
          { value: "sim", label: "Sim, testei" },
          { value: "nao", label: "Ainda não" },
        ],
      },
      {
        id: "carrega-conector",
        label: "O conector está frouxo ou danificado?",
        type: "single",
        required: true,
        visibleWhen: (a) => a.symptom === "nao-carrega",
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "nao-sei", label: "Não sei" },
        ],
      },
      {
        id: "arquivos-importantes",
        label: "Há arquivos importantes (fotos/contatos) que deseja preservar?",
        type: "single",
        required: false,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "nao-sei", label: "Não sei" },
        ],
      },
    ],
  },

  // ===================== SURFACE =====================
  {
    id: "surface",
    label: "Surface",
    icon: "TabletSmartphone",
    forcedRoute: "coleta",
    identityFields: [
      {
        id: "modelo",
        label: "Modelo ou linha do Surface (se souber)",
        type: "text",
        placeholder: "Ex.: Surface Pro 7, Surface Laptop",
        required: false,
      },
      idadeField,
      {
        id: "liga",
        label: "O equipamento liga?",
        type: "single",
        required: true,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "as-vezes", label: "Às vezes" },
        ],
      },
    ],
    symptomField: {
      id: "symptom",
      label: "O que aconteceu?",
      type: "single",
      required: true,
      options: [
        { value: "tela-quebrada", label: "Tela quebrada" },
        { value: "nao-liga", label: "Não liga" },
        { value: "nao-carrega", label: "Não carrega" },
        { value: "bateria", label: "Bateria" },
        { value: "teclado", label: "Teclado" },
        { value: "sistema", label: "Sistema" },
        { value: "superaquecimento", label: "Superaquecimento" },
        { value: "outro", label: "Outro" },
      ],
    },
    symptomMeta: {
      "tela-quebrada": { route: "coleta", event: "quando_aconteceu" },
      "nao-liga": { route: "coleta", event: "quando_aconteceu" },
      "nao-carrega": { route: "coleta", event: "quando_comecou" },
      "bateria": { route: "coleta", event: "quando_comecou" },
      "teclado": { route: "coleta", event: "quando_comecou" },
      "sistema": { route: "coleta", event: "quando_comecou" },
      "superaquecimento": { route: "coleta", event: "frequencia" },
      "outro": { route: "coleta", event: "quando_comecou" },
    },
    contextFields: [
      {
        id: "arquivos-importantes",
        label: "Há arquivos importantes que deseja preservar?",
        type: "single",
        required: false,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "nao-sei", label: "Não sei" },
        ],
      },
    ],
  },

  // ===================== SOM / RECEIVER / ÁUDIO =====================
  {
    id: "som",
    label: "Som / Receiver / Áudio",
    icon: "Speaker",
    forcedRoute: "coleta",
    identityFields: [
      {
        id: "tipo",
        label: "Qual equipamento?",
        type: "single",
        required: true,
        options: [
          { value: "receiver", label: "Receiver" },
          { value: "amplificador", label: "Amplificador" },
          { value: "caixa-ativa", label: "Caixa ativa" },
          { value: "soundbar", label: "Soundbar" },
          { value: "home-theater", label: "Home theater" },
          { value: "aparelho-som", label: "Aparelho de som" },
          { value: "outro", label: "Outro" },
        ],
      },
      modeloField,
      idadeField,
    ],
    symptomField: {
      id: "symptom",
      label: "O que aconteceu?",
      type: "single",
      required: true,
      options: [
        { value: "nao-liga", label: "Não liga" },
        { value: "liga-sem-som", label: "Liga sem som" },
        { value: "som-falhando", label: "Som falhando" },
        { value: "um-canal", label: "Um canal não funciona" },
        { value: "ruido", label: "Ruído ou chiado" },
        { value: "desliga-sozinho", label: "Desliga sozinho" },
        { value: "entrada", label: "Entrada não funciona" },
        { value: "outro", label: "Outro" },
      ],
    },
    symptomMeta: {
      "nao-liga": { route: "coleta", event: "quando_aconteceu", category: "possível placa/componentes", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "liga-sem-som": { route: "coleta", event: "quando_comecou", category: "possível placa/áudio", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "som-falhando": { route: "coleta", event: "frequencia", category: "possível placa/áudio", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "um-canal": { route: "coleta", event: "quando_comecou", category: "possível placa/áudio", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "ruido": { route: "coleta", event: "frequencia", category: "possível placa/áudio", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "desliga-sozinho": { route: "coleta", event: "frequencia", category: "possível placa/alimentação", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "entrada": { route: "coleta", event: "quando_comecou", category: "possível entrada/placa", priceHint: "Possível análise de placa/componentes: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "outro": { route: "coleta", event: "quando_comecou" },
    },
    contextFields: [],
  },

  // ===================== VIDEOGAME =====================
  {
    id: "videogame",
    label: "Videogame",
    icon: "Gamepad2",
    forcedRoute: "coleta",
    identityFields: [
      {
        id: "console",
        label: "Qual videogame?",
        type: "chips",
        required: true,
        options: [
          { value: "PlayStation 5", label: "PlayStation 5" },
          { value: "PlayStation 4", label: "PlayStation 4" },
          { value: "Xbox Series", label: "Xbox Series X/S" },
          { value: "Xbox One", label: "Xbox One" },
          { value: "Nintendo Switch", label: "Nintendo Switch" },
          { value: "Antigo", label: "PS3 / Xbox 360" },
          { value: "Outro", label: "Outro" },
        ],
      },
      modeloField,
      idadeField,
    ],
    symptomField: {
      id: "symptom",
      label: "O que aconteceu?",
      type: "single",
      required: true,
      options: [
        { value: "nao-liga", label: "Não liga" },
        { value: "desliga-sozinho", label: "Desliga sozinho" },
        { value: "superaquece", label: "Superaquece" },
        { value: "nao-le-disco", label: "Não lê disco" },
        { value: "sem-imagem", label: "Sem imagem" },
        { value: "controle", label: "Controle ou conexão" },
        { value: "hdmi", label: "Porta HDMI" },
        { value: "erro-sistema", label: "Erro de sistema" },
        { value: "outro", label: "Outro" },
      ],
    },
    symptomMeta: {
      "nao-liga": { route: "coleta", event: "quando_aconteceu", category: "possível reparo de placa", priceHint: "Não liga / possível placa: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "desliga-sozinho": { route: "coleta", event: "frequencia", category: "manutenção específica", priceHint: "Desliga sozinho: referência até ~R$ 500 conforme diagnóstico (não é orçamento)." },
      "superaquece": { route: "coleta", event: "frequencia", category: "manutenção térmica", priceHint: "Manutenção térmica: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "nao-le-disco": { route: "coleta", event: "quando_comecou", category: "leitor/manutenção", priceHint: "Não lê disco: referência até ~R$ 500 conforme diagnóstico (não é orçamento)." },
      "sem-imagem": { route: "coleta", event: "quando_comecou", category: "possível HDMI/placa", priceHint: "Possível HDMI/placa: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "controle": { route: "coleta", event: "quando_comecou", category: "controle/conexão" },
      "hdmi": { route: "coleta", event: "quando_aconteceu", category: "possível HDMI/placa", priceHint: "Possível HDMI/placa: faixa de referência ~R$ 300 a R$ 500 (não é orçamento)." },
      "erro-sistema": { route: "coleta", event: "quando_comecou", category: "sistema" },
      "outro": { route: "coleta", event: "quando_comecou" },
    },
    contextFields: [],
  },

  // ===================== OUTRO =====================
  {
    id: "outro",
    label: "Outro",
    icon: "HelpCircle",
    forcedRoute: "coleta",
    identityFields: [
      {
        id: "equip-nome",
        label: "Qual é o equipamento?",
        type: "text",
        required: true,
        minLength: 3,
        placeholder: "Ex.: micro-ondas, drone, impressora 3D…",
      },
      {
        id: "marca",
        label: "Marca",
        type: "text",
        required: true,
        placeholder: "Ex.: Electrolux",
      },
      modeloField,
      idadeField,
      {
        id: "liga",
        label: "O equipamento liga?",
        type: "single",
        required: true,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "as-vezes", label: "Às vezes" },
        ],
      },
    ],
    symptomField: {
      id: "symptom",
      label: "O que aconteceu?",
      type: "textarea",
      required: true,
      minLength: 6,
      placeholder: "Descreva o defeito com o máximo de detalhes.",
    },
    symptomMeta: {},
    contextFields: [
      {
        id: "eventos",
        label: "Houve queda, líquido, impacto, cheiro de queimado ou oscilação elétrica?",
        type: "textarea",
        required: false,
        placeholder: "Descreva se houve algum desses eventos.",
      },
      {
        id: "tentativa-reparo",
        label: "Já houve tentativa de reparo?",
        type: "single",
        required: false,
        options: [
          { value: "nao", label: "Não" },
          { value: "sim", label: "Sim" },
        ],
      },
      {
        id: "info-adicional",
        label: "Existe alguma informação adicional importante?",
        type: "textarea",
        required: false,
        placeholder: "Opcional",
      },
    ],
  },
];

export function getEquipment(id: EquipmentId | null): EquipmentConfig | undefined {
  return id ? EQUIPMENTS.find((e) => e.id === id) : undefined;
}

// ─────────────────────────────────────────────────────────────
// TEXTOS DE EVENTO TEMPORAL
// ─────────────────────────────────────────────────────────────
export const EVENT_LABELS: Record<NonNullable<SymptomMeta["event"]>, string> = {
  quando_aconteceu: "Quando aconteceu?",
  quando_comecou: "Quando começou?",
  frequencia: "Com que frequência acontece?",
};

export const EVENT_OPTIONS: Record<NonNullable<SymptomMeta["event"]>, FieldOption[]> = {
  quando_aconteceu: [
    { value: "hoje", label: "Hoje" },
    { value: "esta-semana", label: "Esta semana" },
    { value: "mais-de-semana", label: "Há mais de uma semana" },
  ],
  quando_comecou: [
    { value: "poucos-dias", label: "Há poucos dias" },
    { value: "semanas", label: "Há algumas semanas" },
    { value: "meses", label: "Há meses" },
  ],
  frequencia: [
    { value: "sempre", label: "Sempre / permanente" },
    { value: "as-vezes", label: "Às vezes" },
    { value: "raro", label: "Raramente" },
  ],
};
