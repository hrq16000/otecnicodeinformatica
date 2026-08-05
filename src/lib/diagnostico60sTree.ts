// Árvore de decisão para o hub "Diagnóstico em 60s".
// Cada nó folha (leaf) gera um CTA WhatsApp pré-preenchido + recomendação.
export type DiagnosticLeaf = {
  id: string;
  label: string;
  description: string;
  // Recomendação técnica curta (mostrada ao usuário)
  advice: string;
  // Mensagem pré-preenchida no WhatsApp
  waMessage: string;
  // Slug do serviço relacionado para link interno (opcional)
  relatedHref?: string;
  relatedLabel?: string;
};

export type DiagnosticNode = {
  id: string;
  question: string;
  // Opções intermediárias OU folhas finais
  options: Array<DiagnosticLeaf | DiagnosticBranch>;
};

export type DiagnosticBranch = {
  id: string;
  label: string;
  next: DiagnosticNode;
};

export type Equipment = {
  slug: string;
  label: string;
  emoji: string;
  tagline: string;
  root: DiagnosticNode;
};

export function isLeaf(o: DiagnosticLeaf | DiagnosticBranch): o is DiagnosticLeaf {
  return (o as DiagnosticLeaf).waMessage !== undefined;
}

const wa = (msg: string) =>
  `Olá! Acabei de fazer o diagnóstico em 60s no site e ${msg} Pode me ajudar?`;

export const EQUIPMENTS: Equipment[] = [
  {
    slug: "notebook",
    label: "Notebook / PC",
    emoji: "💻",
    tagline: "Não liga, lento, travando, tela azul…",
    root: {
      id: "notebook-root",
      question: "Qual é o sintoma principal?",
      options: [
        {
          id: "nao-liga",
          label: "Não liga (tela preta, sem LED)",
          next: {
            id: "nao-liga-q",
            question: "O LED da fonte/bateria acende?",
            options: [
              {
                id: "nao-liga-sem-led",
                label: "Não, nenhum LED acende",
                description: "Provável fonte/carregador queimado ou placa em curto.",
                advice:
                  "Teste outra tomada e, se possível, outro carregador. Se nada mudar, há grande chance de ser fonte/placa-mãe. Levar para diagnóstico em bancada.",
                waMessage: wa(
                  "meu notebook não liga e nenhum LED acende — diagnóstico aponta fonte ou placa-mãe.",
                ),
                relatedHref: "/servicos/conserto-pc-notebook",
                relatedLabel: "Conserto de notebook em Curitiba",
              },
              {
                id: "nao-liga-com-led",
                label: "Sim, LED acende mas tela fica preta",
                description: "Provável defeito em vídeo, RAM ou BIOS corrompida.",
                advice:
                  "Tente segurar o botão power por 30s sem bateria/carregador. Se continuar, é diagnóstico de RAM/vídeo/BIOS em bancada.",
                waMessage: wa(
                  "meu notebook liga (LED acende) mas a tela continua preta — pode ser RAM, vídeo ou BIOS.",
                ),
                relatedHref: "/servicos/conserto-pc-notebook",
                relatedLabel: "Conserto de notebook em Curitiba",
              },
            ],
          },
        },
        {
          id: "lento",
          label: "Está muito lento / travando",
          next: {
            id: "lento-q",
            question: "Quando começou a ficar lento?",
            options: [
              {
                id: "lento-sempre",
                label: "Sempre foi lento / nunca formatado",
                description: "Acúmulo de software, falta de SSD ou pouca RAM.",
                advice:
                  "Combo ideal: SSD + 8GB RAM (mín.) + formatação limpa. Resolve 95% dos casos de PC lento.",
                waMessage: wa(
                  "meu notebook está muito lento e nunca foi formatado — quero agendar atendimento de SSD + RAM + formatação.",
                ),
                relatedHref: "/servicos/upgrade-ssd-memoria",
                relatedLabel: "Upgrade SSD + RAM em Curitiba",
              },
              {
                id: "lento-recente",
                label: "Ficou lento de uns dias pra cá",
                description: "Provável vírus, atualização ruim ou HD com badblocks.",
                advice:
                  "Recomendo: remoção de vírus + verificação de disco. Se o HD estiver com badblocks, troca por SSD antes que perca dados.",
                waMessage: wa(
                  "meu notebook ficou lento de repente — suspeito de vírus ou HD com problema.",
                ),
                relatedHref: "/servicos/remocao-virus",
                relatedLabel: "Remoção de vírus em Curitiba",
              },
            ],
          },
        },
        {
          id: "tela-azul",
          label: "Tela azul / reinicia sozinho",
          description: "Driver, RAM defeituosa ou superaquecimento.",
          advice:
            "Anote o código da tela azul (ex.: MEMORY_MANAGEMENT) e nos envie. Diagnóstico inclui teste de memória + temperatura + drivers.",
          waMessage: wa(
            "meu PC dá tela azul e reinicia sozinho — quero diagnóstico de RAM, temperatura e drivers.",
          ),
          relatedHref: "/servicos/conserto-pc-notebook",
          relatedLabel: "Conserto de PC/notebook",
        },
        {
          id: "barulho",
          label: "Faz barulho / esquenta muito",
          description: "Cooler sujo, pasta térmica seca ou ventoinha quebrada.",
          advice:
            "Limpeza interna + troca de pasta térmica. Em notebooks gamer, considere troca do cooler se já tiver mais de 3 anos.",
          waMessage: wa(
            "meu notebook esquenta muito e faz barulho — quero limpeza interna e troca de pasta térmica.",
          ),
          relatedHref: "/servicos/conserto-pc-notebook",
          relatedLabel: "Limpeza interna em Curitiba",
        },
        {
          id: "sem-internet",
          label: "Sem internet / Wi-Fi sumiu",
          description: "Driver de rede, antena Wi-Fi solta ou roteador.",
          advice:
            "Teste com cabo Ethernet. Se cabo funciona e Wi-Fi não, é driver/antena interna. Se nenhum funciona, é configuração ou roteador.",
          waMessage: wa(
            "meu notebook está sem internet/Wi-Fi — preciso de diagnóstico de rede.",
          ),
          relatedHref: "/servicos/redes-wifi",
          relatedLabel: "Redes e Wi-Fi em Curitiba",
        },
      ],
    },
  },
  {
    slug: "tv",
    label: "TV / Smart TV",
    emoji: "📺",
    tagline: "Não liga, sem imagem, listras, sem som…",
    root: {
      id: "tv-root",
      question: "Qual é o problema da TV?",
      options: [
        {
          id: "tv-nao-liga",
          label: "Não liga (LED apagado ou piscando)",
          description: "Provável fonte de alimentação ou placa principal.",
          advice:
            "Teste outra tomada. Se LED pisca em padrão (ex.: 3x), é código de erro do fabricante — informe ao técnico.",
          waMessage: wa("minha TV não liga / LED piscando — preciso de valor do atendimento."),
          relatedHref: "/conserto-tv-curitiba",
          relatedLabel: "Conserto de TV em Curitiba",
        },
        {
          id: "tv-sem-imagem",
          label: "Liga mas sem imagem (som ok)",
          description: "Backlight (LEDs internos) queimado é o mais comum.",
          advice:
            "No escuro, ilumine a tela com lanterna do celular: se ver imagem fraca, é backlight (~R$ 350–650 dependendo da polegada).",
          waMessage: wa(
            "minha TV liga, tem som, mas sem imagem — suspeita de backlight queimado.",
          ),
          relatedHref: "/conserto-tv-curitiba",
          relatedLabel: "Conserto de TV em Curitiba",
        },
        {
          id: "tv-listras",
          label: "Listras / manchas na tela",
          description: "T-CON, flat cable ou painel.",
          advice:
            "Se listras verticais finas: geralmente T-CON ou flat (reparável). Se manchas grandes: painel (geralmente não compensa).",
          waMessage: wa(
            "minha TV está com listras/manchas — quero saber se compensa consertar.",
          ),
          relatedHref: "/conserto-tv-curitiba",
          relatedLabel: "Diagnóstico de TV",
        },
        {
          id: "tv-sem-som",
          label: "Sem som ou som distorcido",
          description: "Alto-falantes, amplificador da placa principal.",
          advice:
            "Teste com fone Bluetooth ou soundbar. Se sai som por aí, é o alto-falante; se nada, é placa principal.",
          waMessage: wa("minha TV está sem som — preciso de valor do atendimento."),
          relatedHref: "/conserto-tv-curitiba",
          relatedLabel: "Conserto de TV",
        },
      ],
    },
  },
  {
    slug: "celular",
    label: "Celular / Tablet",
    emoji: "📱",
    tagline: "Tela quebrada, não carrega, molhou…",
    root: {
      id: "cel-root",
      question: "O que aconteceu com seu celular?",
      options: [
        {
          id: "cel-tela",
          label: "Tela quebrada / trincada",
          description: "Troca de tela (display ou touch).",
          advice:
            "Se só o vidro trincou mas a imagem funciona, ainda é troca de display completo nos modelos atuais.",
          waMessage: wa("meu celular está com a tela quebrada — quero agendar atendimento de troca."),
          relatedHref: "/servicos/conserto-celular",
          relatedLabel: "Conserto de celular em Curitiba",
        },
        {
          id: "cel-nao-carrega",
          label: "Não carrega / bateria viciada",
          description: "Conector de carga ou bateria.",
          advice:
            "Teste outro cabo. Se persistir, geralmente é conector de carga (R$ 99,99 a R$ 180) ou bateria (R$ 120–250).",
          waMessage: wa("meu celular não carrega direito — pode ser conector ou bateria."),
          relatedHref: "/servicos/conserto-celular",
          relatedLabel: "Conserto de celular",
        },
        {
          id: "cel-molhou",
          label: "Caiu na água / molhou",
          description: "URGENTE — não tente ligar.",
          advice:
            "NÃO ligue, NÃO carregue, NÃO use arroz. Traga imediatamente — quanto antes abrir e limpar a placa, maior a chance de salvar.",
          waMessage: wa(
            "meu celular molhou e está desligado — URGENTE, preciso de limpeza de placa.",
          ),
          relatedHref: "/servicos/conserto-celular",
          relatedLabel: "Conserto de celular emergencial",
        },
      ],
    },
  },
  {
    slug: "impressora",
    label: "Impressora",
    emoji: "🖨️",
    tagline: "Não imprime, atola, sem tinta…",
    root: {
      id: "imp-root",
      question: "Qual é o problema da impressora?",
      options: [
        {
          id: "imp-nao-imprime",
          label: "Não imprime / Wi-Fi não conecta",
          description: "Driver, fila travada ou rede.",
          advice:
            "Tente limpar a fila de impressão e reinstalar o driver. Se persistir, é configuração de rede.",
          waMessage: wa("minha impressora não imprime / não conecta no Wi-Fi."),
          relatedHref: "/conserto-impressora-curitiba",
          relatedLabel: "Conserto de impressora em Curitiba",
        },
        {
          id: "imp-atola",
          label: "Atola papel direto",
          description: "Roletes desgastados ou objeto preso.",
          advice:
            "Manutenção preventiva: limpeza dos roletes e revisão da mecânica. Quase sempre vale mais que comprar nova.",
          waMessage: wa("minha impressora atola papel toda vez — quero manutenção."),
          relatedHref: "/conserto-impressora-curitiba",
          relatedLabel: "Conserto de impressora",
        },
        {
          id: "imp-borrada",
          label: "Imprime borrado / sem tinta",
          description: "Cabeça de impressão entupida.",
          advice:
            "Faça 2–3 ciclos de limpeza pelo menu da impressora. Se não resolver, é desentupimento da cabeça em bancada.",
          waMessage: wa("minha impressora está imprimindo borrado — preciso de limpeza de cabeça."),
          relatedHref: "/conserto-impressora-curitiba",
          relatedLabel: "Conserto de impressora",
        },
      ],
    },
  },
  {
    slug: "internet",
    label: "Internet / Wi-Fi",
    emoji: "📶",
    tagline: "Lenta, cai toda hora, sem sinal…",
    root: {
      id: "net-root",
      question: "Qual é o problema da sua internet?",
      options: [
        {
          id: "net-cai",
          label: "Cai toda hora",
          description: "Roteador velho, canal saturado ou cabo do provedor.",
          advice:
            "Teste cabeado direto no modem. Se cabo é estável, é o Wi-Fi do roteador (troca ou mesh).",
          waMessage: wa("minha internet cai toda hora — quero diagnóstico de rede."),
          relatedHref: "/servicos/redes-wifi",
          relatedLabel: "Redes e Wi-Fi",
        },
        {
          id: "net-lenta",
          label: "Wi-Fi lento em alguns cômodos",
          description: "Sinal fraco — caso clássico para mesh.",
          advice:
            "Sistema mesh (2–3 pontos) resolve casas/comércios médios. Faço projeto + instalação em Curitiba.",
          waMessage: wa("meu Wi-Fi não pega em alguns cômodos — quero agendar atendimento de mesh."),
          relatedHref: "/servicos/redes-wifi",
          relatedLabel: "Instalação de mesh em Curitiba",
        },
      ],
    },
  },
];
