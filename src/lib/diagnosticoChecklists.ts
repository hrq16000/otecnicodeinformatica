// ─────────────────────────────────────────────────────────────
// CHECKLISTS DE DIAGNÓSTICO RÁPIDO POR SINTOMA.
//
// Conteúdo derivado das páginas /problemas/* já publicadas — nada
// aqui é novo claim. Serve para gerar um PDF sob demanda no
// navegador e compartilhar pelo WhatsApp. Nenhuma rota pública é
// criada, nenhum formulário coleta dados.
// ─────────────────────────────────────────────────────────────

export interface ChecklistStep {
  label: string;
  hint: string;
}

export interface DiagnosticoChecklist {
  slug: string;
  /** Página de origem (canônica) do sintoma. */
  path: string;
  title: string;
  intro: string;
  steps: ChecklistStep[];
  /** Sinais que pedem parar e procurar o técnico antes de insistir. */
  stopSigns: string[];
  /** Limites honestos do checklist. */
  limits: string[];
}

export const DIAGNOSTICO_CHECKLISTS: Record<string, DiagnosticoChecklist> = {
  "notebook-nao-liga": {
    slug: "notebook-nao-liga",
    path: "/problemas/notebook-nao-liga",
    title: "Checklist de diagnóstico rápido — notebook não liga",
    intro:
      "Roteiro de verificação para descrever o problema com precisão antes do atendimento. Ele não substitui o diagnóstico técnico: serve para separar o que é alimentação, o que é vídeo e o que é sistema.",
    steps: [
      {
        label: "Observar o LED de carga com a fonte conectada",
        hint: "Anote se acende, pisca ou fica apagado. Teste em outra tomada e sem filtro de linha.",
      },
      {
        label: "Verificar o cabo e o conector da fonte",
        hint: "Procure dobras, aquecimento anormal, folga no conector e ruído ao encostar no plug.",
      },
      {
        label: "Testar com a bateria e sem a bateria (quando removível)",
        hint: "Se ligar apenas em uma das condições, o caminho de investigação muda.",
      },
      {
        label: "Fazer a descarga de energia residual",
        hint: "Desligar, retirar a fonte, segurar o botão de ligar por cerca de 20 segundos e tentar novamente.",
      },
      {
        label: "Ouvir sinais de vida",
        hint: "Cooler girando, ruído de disco, bipes ou vibração indicam que há energia chegando à placa.",
      },
      {
        label: "Separar 'não liga' de 'liga sem imagem'",
        hint: "Com o quarto escuro, ilumine a tela de lado: imagem fraca indica retroiluminação, não placa.",
      },
      {
        label: "Testar uma saída de vídeo externa",
        hint: "Se aparece imagem no monitor externo, o equipamento está ligando — o problema é de tela.",
      },
      {
        label: "Registrar o que aconteceu antes",
        hint: "Queda de energia, líquido, queda física, atualização interrompida ou aquecimento recente.",
      },
      {
        label: "Anotar mensagens de erro exatas",
        hint: "Fotografe a tela em vez de reescrever de memória. Códigos mudam o diagnóstico.",
      },
      {
        label: "Não insistir em ligar repetidamente",
        hint: "Em suspeita de curto ou líquido, cada tentativa pode ampliar o dano.",
      },
    ],
    stopSigns: [
      "Cheiro de queimado, estalo ou fumaça ao conectar a fonte.",
      "Contato com líquido, mesmo que o equipamento tenha ligado depois.",
      "Queda física com deformação da carcaça ou tela.",
      "Dados importantes sem backup — preservar arquivos vem antes de qualquer reparo.",
    ],
    limits: [
      "Este checklist descreve sintomas; ele não identifica o componente com falha.",
      "Placa-mãe, fonte interna e circuito de carga só podem ser avaliados em bancada, com instrumentos.",
      "Nenhuma etapa aqui garante reparo nem estima valor: isso depende da avaliação real.",
    ],
  },
  "computador-lento": {
    slug: "computador-lento",
    path: "/problemas/computador-lento",
    title: "Checklist de diagnóstico rápido — computador lento",
    intro:
      "Roteiro para identificar onde está o gargalo antes de gastar com peça errada. A lentidão quase sempre tem uma causa dominante: armazenamento, memória, temperatura, software ou rede.",
    steps: [
      {
        label: "Cronometrar o tempo até a área de trabalho",
        hint: "Do botão ligar até poder usar. Acima de alguns minutos, o disco costuma ser o gargalo.",
      },
      {
        label: "Descobrir se o disco do sistema é HD ou SSD",
        hint: "Sistema em HD mecânico é hoje a causa mais comum de lentidão geral.",
      },
      {
        label: "Conferir o espaço livre no disco do sistema",
        hint: "Disco quase cheio degrada o desempenho mesmo em SSD.",
      },
      {
        label: "Observar quando a lentidão piora",
        hint: "Logo ao ligar, com vários programas abertos ou só depois de minutos de uso.",
      },
      {
        label: "Verificar aquecimento e ruído do cooler",
        hint: "Lentidão após alguns minutos com cooler acelerado aponta para temperatura, não para falta de peça.",
      },
      {
        label: "Anotar quantos programas iniciam junto com o sistema",
        hint: "Excesso de itens na inicialização atrasa tudo antes mesmo do primeiro clique.",
      },
      {
        label: "Testar com a internet desligada",
        hint: "Se a lentidão some, o problema é de rede ou de serviços online, não do equipamento.",
      },
      {
        label: "Procurar sinais de programa indesejado",
        hint: "Abas abrindo sozinhas, página inicial trocada, anúncios fora do navegador.",
      },
      {
        label: "Registrar mensagens de erro de leitura ou ruído de clique",
        hint: "São sinais de saúde do armazenamento e exigem cuidado com os dados antes de qualquer reparo.",
      },
      {
        label: "Listar os programas realmente usados no dia a dia",
        hint: "Define se o caso é ajuste, upgrade ou incompatibilidade real com o uso.",
      },
    ],
    stopSigns: [
      "Ruído de clique metálico ou travamentos com erro de leitura: pare e priorize backup.",
      "Arquivos que desapareceram ou pastas que não abrem.",
      "Tela azul repetida após atualização ou queda de energia.",
      "Equipamento desligando sozinho por aquecimento.",
    ],
    limits: [
      "O checklist aponta a direção provável; a confirmação exige teste de saúde do disco e medição de temperatura.",
      "Nenhum item aqui garante que a troca de peça resolverá o caso.",
      "Se houver suspeita de falha de disco, preservar os dados vem antes de formatar ou trocar componente.",
    ],
  },
};

export function getChecklist(slug: string): DiagnosticoChecklist | undefined {
  return DIAGNOSTICO_CHECKLISTS[slug];
}
