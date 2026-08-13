/**
 * ============================================================================
 * BASE OPERACIONAL POR CATEGORIA — Rodada 3X
 * ============================================================================
 * Fonte única de verdade para:
 *  - SLA interno por categoria (diagnóstico, reparo, meta de cumprimento)
 *  - Capacidade (horas médias por OS → WIP máximo)
 *  - Critérios de ACEITE e RECUSA usados na triagem antes de confirmar
 *  - Scripts de WhatsApp por categoria (prazo estimado + orientação inicial)
 *
 * IMPORTANTE (governança): os prazos abaixo são INTERNOS até termos 20 OS
 * medidas por categoria (ver docs/rodada-3x-auditoria-multieletronicos.md).
 * Não publicar esses números em páginas indexáveis sem lastro.
 */
// @ts-nocheck


export type CategoriaId = "tv" | "monitor" | "audio" | "placa" | "celular" | "pc";

export interface SlaCategoria {
  /** dias úteis até o laudo/diagnóstico ser comunicado */
  diagnosticoDias: number;
  /** faixa de dias úteis do reparo padrão (sem peça sob encomenda) */
  reparoMinDias: number;
  reparoMaxDias: number;
  /** dias úteis adicionais quando há peça sob encomenda */
  encomendaDias: number;
  /** meta de OS dentro do SLA (0–1) */
  metaCumprimento: number;
}

export interface CategoriaOperacional {
  id: CategoriaId;
  nome: string;
  emoji: string;
  /** ids de equipamento do funil que caem nesta categoria */
  equipamentosFunil: string[];
  sla: SlaCategoria;
  /** horas médias de bancada por OS — base do cálculo de capacidade */
  horasPorOs: number;
  /** fatia da bancada dedicada à categoria (0–1) */
  fatorDedicacao: number;
  aceite: string[];
  recusa: string[];
  /** perguntas obrigatórias antes de confirmar o atendimento */
  triagemObrigatoria: string[];
  /** orientação inicial enviada ao cliente no primeiro contato */
  orientacaoInicial: string[];
}

export const CATEGORIAS_OPERACIONAIS: CategoriaOperacional[] = [
  {
    id: "tv",
    nome: "TV / Smart TV",
    emoji: "📺",
    equipamentosFunil: ["tv"],
    sla: { diagnosticoDias: 5, reparoMinDias: 10, reparoMaxDias: 25, encomendaDias: 35, metaCumprimento: 0.8 },
    horasPorOs: 4,
    fatorDedicacao: 0.25,
    aceite: [
      "Não liga, fica em standby ou desliga sozinha",
      "Backlight (imagem escura, só aparece com lanterna)",
      "Falha de T-CON: linhas verticais/horizontais, imagem duplicada",
      "Fonte com capacitores estufados, ruído ou desarme",
      "Placa principal: HDMI sem sinal, rede/Wi-Fi da TV, firmware travado",
    ],
    recusa: [
      "Display trincado, com mancha de impacto ou aranhado — painel novo custa mais que a TV",
      "OLED com burn-in permanente (marca fixa de canal/logo)",
      "TV acima de 65 polegadas — não temos logística segura para transporte",
      "Aparelho já aberto por terceiro com flat/conector rompido",
    ],
    triagemObrigatoria: [
      "Marca, modelo exato e polegadas",
      "Foto da tela ligada e da etiqueta traseira",
      "A tela tem trinca, mancha ou marca de impacto?",
      "Já foi aberta por outra assistência?",
    ],
    orientacaoInicial: [
      "Não insista em ligar/desligar várias vezes: em falha de fonte isso agrava o dano.",
      "Desconecte da tomada até a coleta.",
      "Separe o controle remoto e a base/suporte — ajudam no teste de bancada.",
    ],
  },
  {
    id: "monitor",
    nome: "Monitor",
    emoji: "🖥️",
    equipamentosFunil: ["monitor"],
    sla: { diagnosticoDias: 5, reparoMinDias: 7, reparoMaxDias: 15, encomendaDias: 30, metaCumprimento: 0.8 },
    horasPorOs: 3,
    fatorDedicacao: 0.15,
    aceite: [
      "Não liga ou LED pisca sem imagem",
      "Fonte interna/externa com defeito",
      "Backlight apagado (imagem visível só com lanterna)",
      "Placa lógica: entradas HDMI/DisplayPort sem sinal",
    ],
    recusa: [
      "Painel trincado ou com mancha de pressão",
      "Monitor abaixo de 22 polegadas fora de garantia — reparo não compensa",
      "Modelo sem peça de reposição no mercado nacional",
    ],
    triagemObrigatoria: [
      "Marca, modelo e polegadas",
      "Testou com outro cabo e outra fonte de vídeo?",
      "O LED de energia acende?",
      "Foto da tela e da etiqueta traseira",
    ],
    orientacaoInicial: [
      "Teste antes com outro cabo HDMI/DP e outra tomada — descarta causa externa.",
      "Se usa fonte externa (tijolinho), traga junto na coleta.",
      "Não pressione a tela para 'melhorar' a imagem: isso danifica o painel.",
    ],
  },
  {
    id: "audio",
    nome: "Áudio / Som",
    emoji: "🔊",
    equipamentosFunil: ["som"],
    sla: { diagnosticoDias: 3, reparoMinDias: 3, reparoMaxDias: 10, encomendaDias: 20, metaCumprimento: 0.85 },
    horasPorOs: 2.5,
    fatorDedicacao: 0.15,
    aceite: [
      "Caixa portátil que não liga ou não segura carga (bateria)",
      "Soundbar/home-theater sem som ou com chiado",
      "Receiver em proteção, desarmando ou com canal mudo",
      "Alto-falante rasgado, tweeter queimado, conector de carga",
      "Bluetooth que não pareia (módulo/firmware)",
    ],
    recusa: [
      "Gabinete destruído ou sem estrutura para remontagem",
      "Corrosão generalizada por líquido açucarado na placa",
      "Equipamento de PA/linha profissional acima de 500 W (fora do escopo de bancada)",
    ],
    triagemObrigatoria: [
      "Tipo (caixa portátil, soundbar, home-theater, receiver) e marca",
      "Liga? Acende algum LED?",
      "Molhou ou caiu líquido em algum momento?",
      "Foto do aparelho e da etiqueta",
    ],
    orientacaoInicial: [
      "Não deixe carregando um aparelho que esquenta ou incha — risco de bateria.",
      "Traga o cabo/fonte original: muitos casos são falha do carregador, não do aparelho.",
      "Se molhou, não ligue: envie assim mesmo para avaliação.",
    ],
  },
  {
    id: "placa",
    nome: "Reparo de placa",
    emoji: "🔬",
    equipamentosFunil: ["placa"],
    sla: { diagnosticoDias: 7, reparoMinDias: 10, reparoMaxDias: 20, encomendaDias: 30, metaCumprimento: 0.75 },
    horasPorOs: 6,
    fatorDedicacao: 0.25,
    aceite: [
      "Placa-mãe de notebook/desktop que não dá POST",
      "Curto em linha de alimentação, MOSFET ou controlador PWM",
      "Conector de carga, trilha rompida, reparo em nível de componente",
      "Placa de vídeo com artefatos ou sem imagem (reballing/VRM)",
      "Placa-fonte de TV, monitor ou áudio",
    ],
    recusa: [
      "Trilhas amplamente corroídas por oxidação (recuperação sem garantia real)",
      "BGA sem stencil/estêncil disponível para o chip específico",
      "Placa multicamadas com dano interno por impacto",
      "Placa já retrabalhada por terceiro com pads arrancados",
    ],
    triagemObrigatoria: [
      "Modelo exato do equipamento e da placa",
      "Molhou? Ligou depois de molhar?",
      "Já passou por outra assistência? O que foi feito?",
      "Fotos nítidas dos dois lados da placa",
    ],
    orientacaoInicial: [
      "Não ligue o aparelho novamente: cada tentativa pode espalhar o curto.",
      "Se molhou, não use arroz nem secador — traga o quanto antes.",
      "Reparo de placa é sempre em bancada, com diagnóstico antes de qualquer execução.",
    ],
  },
  {
    id: "celular",
    nome: "Celular / Tablet",
    emoji: "📱",
    equipamentosFunil: ["celular", "surface"],
    sla: { diagnosticoDias: 2, reparoMinDias: 2, reparoMaxDias: 5, encomendaDias: 10, metaCumprimento: 0.9 },
    horasPorOs: 1.5,
    fatorDedicacao: 0.1,
    aceite: [
      "Tela trincada, touch sem resposta",
      "Não carrega / conector de carga",
      "Bateria com autonomia baixa ou inchada",
      "Molhou (oxidação recente)",
      "Alto-falante, microfone, botões",
    ],
    recusa: [
      "Aparelho bloqueado por conta (iCloud/Google) sem comprovação de propriedade",
      "Modelo sem peça no mercado nacional",
      "Placa com oxidação total após semanas de contato com líquido",
    ],
    triagemObrigatoria: [
      "Marca e modelo exato",
      "Sabe a senha de desbloqueio? (sem ela não há teste final)",
      "Molhou ou caiu?",
      "Já foi aberto antes?",
    ],
    orientacaoInicial: [
      "Faça backup antes de entregar, se o aparelho ainda liga.",
      "Se molhou, desligue e não coloque para carregar.",
      "Anote a senha de tela: sem ela não conseguimos validar o reparo.",
    ],
  },
  {
    id: "pc",
    nome: "PC / Notebook",
    emoji: "💻",
    equipamentosFunil: ["pc"],
    sla: { diagnosticoDias: 2, reparoMinDias: 1, reparoMaxDias: 5, encomendaDias: 10, metaCumprimento: 0.9 },
    horasPorOs: 2,
    fatorDedicacao: 0.1,
    aceite: [
      "Lentidão, formatação, vírus, upgrade de SSD/RAM",
      "Superaquecimento, limpeza e pasta térmica",
      "Rede/Wi-Fi, periféricos, configuração e backup",
      "Não liga (encaminhado para reparo de placa quando confirmado)",
    ],
    recusa: [
      "Equipamento sem fonte/carregador para teste",
      "Máquina com dano estrutural que impede remontagem",
    ],
    triagemObrigatoria: [
      "Marca, modelo e idade aproximada",
      "Liga normalmente?",
      "Tem arquivos importantes sem backup?",
    ],
    orientacaoInicial: [
      "Se há arquivos importantes, avise antes: o backup muda o plano de execução.",
      "Traga o carregador original.",
      "Se não liga, o atendimento passa a ser em bancada (coleta).",
    ],
  },
];

export const getCategoria = (id?: string | null): CategoriaOperacional | undefined =>
  CATEGORIAS_OPERACIONAIS.find((c) => c.id === id);

/** Mapeia o equipamento escolhido no funil para a categoria operacional. */
export function categoriaPorEquipamento(equipamento?: string | null): CategoriaOperacional | undefined {
  if (!equipamento) return undefined;
  const e = equipamento.toLowerCase();
  return CATEGORIAS_OPERACIONAIS.find((c) => c.equipamentosFunil.includes(e));
}

/** Prazo total estimado (texto) do laudo até o aparelho pronto. */
export function prazoEstimadoLabel(c: CategoriaOperacional): string {
  return `laudo em até ${c.sla.diagnosticoDias} dias úteis e reparo em ${c.sla.reparoMinDias} a ${c.sla.reparoMaxDias} dias úteis (peça sob encomenda soma até ${c.sla.encomendaDias} dias úteis)`;
}

/** Limite de prazo em dias úteis usado para o semáforo de SLA. */
export const limiteSlaDias = (c: CategoriaOperacional) => c.sla.diagnosticoDias + c.sla.reparoMaxDias;

// === CAPACIDADE ===============================================================

/** Horas úteis de bancada por semana confirmadas pelo operador (Rodada 3X). */
export const HORAS_BANCADA_SEMANA = 40;

export interface Capacidade {
  categoria: CategoriaOperacional;
  osPorSemana: number;
  wipMax: number;
}

export function calcularCapacidade(horasSemana = HORAS_BANCADA_SEMANA): Capacidade[] {
  return CATEGORIAS_OPERACIONAIS.map((categoria) => {
    const osPorSemana = (horasSemana * categoria.fatorDedicacao) / categoria.horasPorOs;
    const semanasAlvo = limiteSlaDias(categoria) / 5;
    return {
      categoria,
      osPorSemana: Math.round(osPorSemana * 10) / 10,
      wipMax: Math.max(1, Math.floor(osPorSemana * semanasAlvo * 0.8)),
    };
  });
}

// === SCRIPTS DE WHATSAPP ======================================================

export interface ScriptContexto {
  nome?: string;
  bairro?: string;
  sintoma?: string;
}

/** Script de primeiro contato: confirma escopo, prazo e orientação inicial. */
export function scriptPrimeiroContato(c: CategoriaOperacional, ctx: ScriptContexto = {}): string {
  const saudacao = ctx.nome ? `Olá, ${ctx.nome}!` : "Olá!";
  const local = ctx.bairro ? ` em ${ctx.bairro}` : "";
  const sintoma = ctx.sintoma ? ` (${ctx.sintoma})` : "";
  return [
    `${saudacao} Aqui é do Técnico de Informática. Recebi seu contato sobre ${c.nome}${sintoma}${local}.`,
    `Antes de confirmar o atendimento preciso checar 3 pontos:`,
    c.triagemObrigatoria.map((p, i) => `${i + 1}. ${p}`).join("\n"),
    `Prazo estimado para esta categoria: ${prazoEstimadoLabel(c)}.`,
    `Orientação até a coleta:\n${c.orientacaoInicial.map((o) => `• ${o}`).join("\n")}`,
    `Condições: reparo mínimo R$ 299,99 com diagnóstico incluso. Se você desistir após o laudo, paga somente R$ 99,99 do diagnóstico. Nada é executado sem sua autorização.`,
  ].join("\n\n");
}

/** Script de recusa técnica — educado, com o motivo e a alternativa. */
export function scriptRecusa(c: CategoriaOperacional, motivo: string): string {
  return [
    `Obrigado pelas informações.`,
    `Neste caso eu não vou aceitar o serviço: ${motivo}.`,
    `Prefiro ser transparente a coletar o aparelho, cobrar diagnóstico e devolver sem solução.`,
    `Se quiser, posso avaliar outra opção (troca ou aproveitamento de peças) ou te orientar sobre o que faz sentido no seu caso.`,
  ].join("\n\n");
}

/** Script de laudo pronto, com valor e prazo de execução. */
export function scriptLaudo(c: CategoriaOperacional, achado: string, valor: string): string {
  return [
    `Laudo concluído do seu ${c.nome}.`,
    `Achado: ${achado}.`,
    `Valor do atendimento: ${valor}. Prazo de execução após sua autorização: ${c.sla.reparoMinDias} a ${c.sla.reparoMaxDias} dias úteis.`,
    `Posso executar? Se preferir não seguir, o diagnóstico é R$ 99,99 e devolvo o aparelho como recebi.`,
  ].join("\n\n");
}

/** Só as perguntas de triagem, para colar rápido no WhatsApp. */
export function scriptTriagemPerguntas(c: CategoriaOperacional): string {
  return [
    `Para avaliar seu ${c.nome} preciso destas informações:`,
    c.triagemObrigatoria.map((p, i) => `${i + 1}. ${p}`).join("\n"),
    `Assim que você responder, digo em seguida se o caso é viável, o prazo e o valor mínimo.`,
  ].join("\n\n");
}

/**
 * Script de ACEITE: confirma que o caso passou na triagem e abre o agendamento
 * de coleta com faixa logística, pré-requisitos e prazo.
 */
export function scriptAceite(
  c: CategoriaOperacional,
  ctx: ScriptContexto & { faixa?: string; janelas?: string; taxa?: string; prazoColetaDias?: number } = {},
): string {
  const saudacao = ctx.nome ? `${ctx.nome}, ` : "";
  const logistica = ctx.faixa
    ? `Sua região entra na ${ctx.faixa}${ctx.janelas ? ` — coleta ${ctx.janelas.toLowerCase()}` : ""}${
        ctx.taxa ? `, ${ctx.taxa.toLowerCase()}` : ""
      }${ctx.prazoColetaDias ? `, retirada em até ${ctx.prazoColetaDias} dia(s) útil(eis) após a confirmação` : ""}.`
    : `Atendemos com coleta e entrega em um raio de até 30 km de Curitiba.`;
  return [
    `${saudacao}caso ACEITO para ${c.nome}. ✅`,
    `${logistica}`,
    `Antes da coleta, por favor deixe pronto:\n${c.orientacaoInicial.map((o) => `• ${o}`).join("\n")}`,
    `Prazo do serviço: ${prazoEstimadoLabel(c)}.`,
    `Condições: diagnóstico R$ 99,99 (abatido no serviço) e reparo mínimo R$ 299,99. Nada é executado sem laudo e sua autorização por escrito.`,
    `Me confirme o endereço completo e o melhor dia para eu registrar o protocolo da coleta.`,
  ].join("\n\n");
}

/** Script de RECUSA com alternativa objetiva (fail-closed na triagem). */
export function scriptRecusadoComAlternativa(
  c: CategoriaOperacional,
  motivo: string,
  ctx: ScriptContexto = {},
): string {
  const saudacao = ctx.nome ? `${ctx.nome}, ` : "";
  return [
    `${saudacao}obrigado pelas informações. Caso RECUSADO para ${c.nome}. ❌`,
    `Motivo: ${motivo}.`,
    `Prefiro te dizer isso agora do que coletar o aparelho, cobrar diagnóstico e devolver sem solução.`,
    `Alternativas que posso avaliar com você: aproveitamento de peças boas, orientação de substituição ou indicação do que faz sentido comprar.`,
    `Se aparecer outro equipamento com defeito, é só me chamar aqui.`,
  ].join("\n\n");
}
