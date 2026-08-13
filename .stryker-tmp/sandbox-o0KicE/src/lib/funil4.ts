/**
 * ETAPA 4 — FUNIL INTELIGENTE DE ATENDIMENTO (4 etapas)
 *
 * Sequência fixa, escrita na linguagem do cliente:
 *   1. O que aconteceu?        → sintoma em linguagem comum
 *   2. Onde está o problema?   → equipamento
 *   3. Como podemos ajudar?    → modalidade de atendimento
 *   4. Conversão               → dados mínimos + custo antes do envio
 *
 * Lógica pura (sem React) para permitir teste e reuso. Não substitui a
 * triagem completa existente: este é o caminho curto, orientado a problema,
 * usado a partir da Home e da área empresarial.
 */
// @ts-nocheck


export type ModalidadeId = "remoto" | "domicilio" | "coleta";

export type SintomaFunil = {
  id: string;
  label: string;
  /** Termos livres que o visitante costuma digitar. */
  termos: string[];
  /** Equipamentos mais prováveis para esse sintoma. */
  equipamentos: string[];
  /** Modalidade que costuma resolver — sugestão, nunca imposição. */
  modalidadeSugerida: ModalidadeId;
};

export const SINTOMAS_FUNIL: SintomaFunil[] = [
  {
    id: "lento",
    label: "Está muito lento ou travando",
    termos: ["lento", "lentidao", "travando", "demora", "engasga", "pesado"],
    equipamentos: ["notebook", "desktop"],
    modalidadeSugerida: "remoto",
  },
  {
    id: "nao-liga",
    label: "Não liga ou não dá imagem",
    termos: ["nao liga", "morto", "sem imagem", "tela preta", "nao acende"],
    equipamentos: ["notebook", "desktop", "monitor", "tv"],
    modalidadeSugerida: "coleta",
  },
  {
    id: "desliga",
    label: "Desliga ou reinicia sozinho",
    termos: ["desliga", "reinicia", "superaquece", "esquenta", "tela azul"],
    equipamentos: ["notebook", "desktop"],
    modalidadeSugerida: "coleta",
  },
  {
    id: "internet",
    label: "Internet ou Wi-Fi caindo",
    termos: ["wifi", "wi-fi", "internet", "rede", "roteador", "cai"],
    equipamentos: ["rede", "notebook"],
    modalidadeSugerida: "domicilio",
  },
  {
    id: "dados",
    label: "Perdi arquivos ou preciso de backup",
    termos: ["arquivos", "backup", "recuperar", "dados", "hd", "ssd", "apagou"],
    equipamentos: ["notebook", "desktop", "outro"],
    modalidadeSugerida: "coleta",
  },
  {
    id: "sistema",
    label: "Sistema, vírus ou programa não abre",
    termos: ["virus", "windows", "sistema", "programa", "erro", "atualizacao"],
    equipamentos: ["notebook", "desktop"],
    modalidadeSugerida: "remoto",
  },
  {
    id: "danificado",
    label: "Quebrou, caiu ou molhou",
    termos: ["quebrou", "caiu", "molhou", "tela trincada", "dobradica", "teclado"],
    equipamentos: ["notebook", "monitor", "outro"],
    modalidadeSugerida: "coleta",
  },
  {
    id: "empresa",
    label: "Time parado / problema na empresa",
    termos: ["empresa", "escritorio", "servidor", "impressora", "time", "estacao"],
    equipamentos: ["rede", "desktop", "outro"],
    modalidadeSugerida: "domicilio",
  },
];

export type EquipamentoFunil = { id: string; label: string };

export const EQUIPAMENTOS_FUNIL: EquipamentoFunil[] = [
  { id: "notebook", label: "Notebook" },
  { id: "desktop", label: "Computador de mesa" },
  { id: "rede", label: "Rede, Wi-Fi ou roteador" },
  { id: "monitor", label: "Monitor" },
  { id: "tv", label: "TV ou eletrônico" },
  { id: "outro", label: "Outro equipamento" },
];

export type ModalidadeFunil = {
  id: ModalidadeId;
  titulo: string;
  descricao: string;
  /** Só a modalidade presencial gera cálculo de deslocamento. */
  temDeslocamento: boolean;
};

export const MODALIDADES_FUNIL: ModalidadeFunil[] = [
  {
    id: "remoto",
    titulo: "Atendimento remoto",
    descricao:
      "Acesso assistido, com você acompanhando a tela. Resolve software, sistema, lentidão e configuração. Sem deslocamento.",
    temDeslocamento: false,
  },
  {
    id: "domicilio",
    titulo: "Atendimento no local",
    descricao:
      "Técnico no endereço, para rede, Wi-Fi, cabeamento, instalação e o que depende do ambiente. Pode ter custo de deslocamento.",
    temDeslocamento: true,
  },
  {
    id: "coleta",
    titulo: "Coleta e reparo em bancada",
    descricao:
      "Retirada do equipamento para diagnóstico e reparo com bancada, instrumento e teste. Indicado para falha física.",
    temDeslocamento: false,
  },
];

export const getSintoma = (id: string) => SINTOMAS_FUNIL.find((s) => s.id === id);
export const getEquipamento = (id: string) => EQUIPAMENTOS_FUNIL.find((e) => e.id === id);
export const getModalidade = (id: string) => MODALIDADES_FUNIL.find((m) => m.id === id);

const normalizar = (v: string) =>
  v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

/** Sugere sintomas a partir do texto livre digitado pelo visitante. */
export function filtrarSintomasFunil(consulta: string, limite = 6): SintomaFunil[] {
  const q = normalizar(consulta);
  if (!q) return SINTOMAS_FUNIL.slice(0, limite);
  const achados = SINTOMAS_FUNIL.filter(
    (s) => normalizar(s.label).includes(q) || s.termos.some((t) => normalizar(t).includes(q)),
  );
  return (achados.length ? achados : SINTOMAS_FUNIL).slice(0, limite);
}

/** Equipamentos prováveis primeiro, sem esconder as demais opções. */
export function ordenarEquipamentos(sintomaId: string): EquipamentoFunil[] {
  const s = getSintoma(sintomaId);
  if (!s) return EQUIPAMENTOS_FUNIL;
  const prioridade = new Map(s.equipamentos.map((id, i) => [id, i]));
  return [...EQUIPAMENTOS_FUNIL].sort(
    (a, b) => (prioridade.get(a.id) ?? 99) - (prioridade.get(b.id) ?? 99),
  );
}

export type EstadoFunil4 = {
  sintomaId: string;
  descricaoLivre: string;
  equipamentoId: string;
  modalidadeId: ModalidadeId | "";
  nome: string;
  bairro: string;
  cidade: string;
  /** Distância informada/estimada, usada só na modalidade presencial. */
  distanciaKm: string;
};

export const ESTADO_FUNIL4_INICIAL: EstadoFunil4 = {
  sintomaId: "",
  descricaoLivre: "",
  equipamentoId: "",
  modalidadeId: "",
  nome: "",
  bairro: "",
  cidade: "",
  distanciaKm: "",
};

export const PASSOS_FUNIL4 = [
  { id: "sintoma", titulo: "O que aconteceu?" },
  { id: "equipamento", titulo: "Onde está o problema?" },
  { id: "modalidade", titulo: "Como podemos ajudar?" },
  { id: "contato", titulo: "Confirmar atendimento" },
] as const;

export function passoValido(passo: number, e: EstadoFunil4): boolean {
  if (passo === 0) return Boolean(e.sintomaId || e.descricaoLivre.trim().length >= 4);
  if (passo === 1) return Boolean(e.equipamentoId);
  if (passo === 2) return Boolean(e.modalidadeId);
  return e.nome.trim().length >= 2 && e.cidade.trim().length >= 2;
}

/** Mensagem final: objetiva, sem dado sensível, pronta para o WhatsApp. */
export function montarMensagemFunil4(e: EstadoFunil4, custoTexto?: string): string {
  const sintoma = getSintoma(e.sintomaId)?.label ?? e.descricaoLivre.trim();
  const equipamento = getEquipamento(e.equipamentoId)?.label ?? "Não informado";
  const modalidade = e.modalidadeId ? getModalidade(e.modalidadeId)?.titulo : "A definir";
  const local = [e.bairro.trim(), e.cidade.trim()].filter(Boolean).join(" - ");

  const linhas = [
    `Olá! Sou ${e.nome.trim()} e preciso de atendimento técnico.`,
    "",
    `Problema: ${sintoma}`,
    `Equipamento: ${equipamento}`,
    `Modalidade: ${modalidade}`,
  ];
  if (local) linhas.push(`Local: ${local}`);
  if (e.descricaoLivre.trim() && e.sintomaId) linhas.push(`Detalhes: ${e.descricaoLivre.trim()}`);
  if (custoTexto) linhas.push(`Deslocamento estimado: ${custoTexto}`);
  linhas.push("", "Enviado pelo funil de atendimento do site.");
  return linhas.join("\n");
}
