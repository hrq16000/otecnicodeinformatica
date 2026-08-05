import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

// ─────────────────────────────────────────────────────────────
// SERVIÇOS ESSENCIAIS — conteúdo próprio, local e profundo.
// Cada página é proprietária de UMA intenção comercial. Sem rating
// inventado, sem preço fechado universal, sem urgência falsa.
// Sintomas são absorvidos como seção (sinais) — nunca viram novas URLs.
// ─────────────────────────────────────────────────────────────

const LINKS_BASE = [
  { label: "Preços e políticas", to: "/precos-e-politicas" },
  { label: "Como funciona", to: "/como-funciona" },
  { label: "Dúvidas frequentes", to: "/faq" },
];

const PROCESSO_PADRAO = [
  { step: "1", title: "Triagem", desc: "Você descreve o problema pelo WhatsApp e enviamos as primeiras orientações." },
  { step: "2", title: "Avaliação", desc: "Diagnóstico técnico do equipamento para entender a real causa." },
  { step: "3", title: "Orientação", desc: "Explicamos o que foi encontrado, em linguagem clara, sem empurrar peça." },
  { step: "4", title: "valor do atendimento", desc: "Valor apresentado e aprovado por você antes de qualquer serviço." },
  { step: "5", title: "Execução", desc: "Realizamos o serviço com peças e procedimentos adequados." },
  { step: "6", title: "Entrega e validação", desc: "Testamos junto com você e entregamos funcionando." },
];

export const SERVICOS_CORE: Record<string, ServicoLandingData> = {
  // 1 ─────────────────────────────────────────────────────────
  formatacao: {
    path: "formatacao",
    trackingKey: "formatacao",
    metaTitle: "Formatação de PC e Notebook em Curitiba | Windows",
    metaDescription:
      "Formatação de PC e notebook em Curitiba com backup, Windows original, drivers e programas essenciais. Diagnóstico a partir de R$ 99,99. Atendimento via WhatsApp.",
    serviceName: "Formatação de Computador e Notebook",
    serviceDescription:
      "Formatação com backup prévio, Windows 10/11 original, drivers atualizados e programas essenciais, com atendimento em Curitiba e região.",
    eyebrow: "Formatação em Curitiba",
    h1: "Formatação de computador e notebook em Curitiba",
    h1Accent: "com backup dos seus arquivos",
    intro:
      "Windows corrompido, cheio de erro ou que não inicia direito? A formatação reinstala o sistema do zero — com Windows original, drivers e programas essenciais. Antes de tudo fazemos o backup dos seus arquivos e, ao final, restauramos seus dados. Importante: lentidão nem sempre se resolve formatando; por isso avaliamos a causa antes. Você descreve o caso pelo WhatsApp e seguimos com o diagnóstico.",
    whatsappMessage: "Olá! Preciso formatar meu computador/notebook. Pode me orientar?",
    incluso: [
      { title: "Backup prévio", desc: "Salvamos documentos, fotos e arquivos importantes antes de formatar." },
      { title: "Windows original", desc: "Instalação limpa do Windows 10 ou 11, ativado e atualizado." },
      { title: "Drivers completos", desc: "Todos os drivers de hardware instalados e funcionando." },
      { title: "Programas essenciais", desc: "Navegador, pacote de produtividade, leitor de PDF e compactador." },
      { title: "Ajuste de desempenho", desc: "Inicialização enxuta e sistema configurado para o seu uso." },
      { title: "Restauração dos dados", desc: "Seus arquivos de volta e organizados após o procedimento." },
    ],
    sinais: [
      "Windows corrompido que não inicia corretamente",
      "Inicialização travando ou parando no logo do Windows",
      "Erros recorrentes do sistema mesmo após limpeza",
      "Vírus, pop-ups ou navegador que voltam sempre",
      "Acúmulo de programas e arquivos desnecessários",
      "Preparar a máquina para venda, repasse ou novo usuário",
      "Troca de HD por SSD com reinstalação ou clonagem do sistema",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Tipo de equipamento", desc: "Notebook, desktop, all-in-one e configurações antigas exigem etapas diferentes." },
      { title: "Volume de backup", desc: "Quanto mais dados a copiar e restaurar, maior o tempo envolvido." },
      { title: "Estado do sistema", desc: "Sistema muito corrompido ou com falhas pode demandar etapas extras." },
      { title: "Programas específicos", desc: "Softwares particulares (impressão fiscal, sistemas de trabalho) somam configuração." },
      { title: "Urgência", desc: "Prazos apertados podem influenciar o agendamento." },
      { title: "Deslocamento", desc: "Atendimento em domicílio considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Formatação a domicílio ou por coleta e entrega em Curitiba e região, com backup dos seus arquivos antes de reinstalar e horário combinado com você.",
      empresarial:
        "Formatação e padronização de máquinas de escritório e estações de trabalho, com Windows, drivers e programas essenciais configurados para a rotina da equipe.",
    },
    faqs: [
      { question: "A formatação apaga meus arquivos?", answer: "A formatação reinstala o sistema do zero. Por isso fazemos backup dos seus dados antes e restauramos depois, sempre que o equipamento permite leitura das informações." },
      { question: "Vocês instalam Office, antivírus e drivers?", answer: "Sim. Entregamos com Windows ativado, drivers atualizados, navegador, antivírus e pacote de produtividade configurados conforme o seu uso." },
      { question: "Formatar sempre deixa o computador rápido?", answer: "Nem sempre. Formatar resolve problemas de software, mas lentidão também pode vir de HD antigo, pouca memória ou superaquecimento. Por isso avaliamos a causa antes: às vezes um SSD resolve mais que formatar." },
      { question: "Em quanto tempo fica pronto?", answer: "Em geral de 2 a 4 horas, variando conforme o hardware e o volume de dados a copiar e restaurar." },
      { question: "Atendem em domicílio ou por coleta?", answer: "Atendemos em Curitiba e região, com opção de atendimento em domicílio ou coleta e entrega do equipamento." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Diagnóstico técnico", to: "/diagnostico-tecnico" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    blocoLocal: [
      {
        titulo: "Quando formatar resolve e quando é só desperdício",
        paragrafos: [
          "Formatar corrige o que é software: sistema corrompido, atualização malsucedida, perfil de usuário quebrado, infecção persistente, acúmulo de anos de instalações e serviços disputando a inicialização. Nesses cenários a máquina volta previsível já no primeiro boot.",
          "Formatar não corrige hardware. Se o gargalo é HD mecânico, memória insuficiente ou superaquecimento, a máquina fica boa por alguns dias e volta a arrastar — porque a causa continua no lugar. Por isso avaliamos antes: em boa parte dos atendimentos, migrar para SSD entrega mais resultado do que reinstalar o Windows.",
          "Há ainda o caso em que formatar é arriscado: disco com setores defeituosos ou com arquivos importantes sem cópia. Nessa situação a prioridade é preservar os dados primeiro, e só depois decidir o que fazer com o sistema.",
        ],
      },
      {
        titulo: "Backup, licença e o que você precisa separar antes",
        paragrafos: [
          "Antes de reinstalar, copiamos documentos, fotos, downloads e área de trabalho. Vale avisar sobre o que costuma escapar: e-mails configurados em programa local, favoritos e senhas do navegador, arquivos de sistemas de trabalho e licenças de softwares pagos. Se existir algo assim, avise na triagem para incluirmos na cópia.",
          "Sobre licença: máquinas com Windows de fábrica normalmente reativam sozinhas pela chave gravada na placa. Quando não há licença válida, explicamos como regularizar — não entregamos ativação irregular.",
          "Você também recebe orientação de senhas: contas do navegador, e-mail e serviços precisam ser acessíveis depois da reinstalação. Perder acesso à conta principal costuma dar mais trabalho do que a própria formatação.",
        ],
      },
      {
        titulo: "Como fica a máquina na entrega",
        paragrafos: [
          "Entregamos com Windows atualizado, drivers corretos do modelo, navegador, leitor de PDF, compactador e antivírus ativos, inicialização enxuta e os arquivos restaurados nas pastas originais. Programas específicos do seu trabalho podem ser instalados se você fornecer instalador e licença.",
          "O tempo típico é de algumas horas e varia com o volume de dados. Se a máquina for antiga e o disco estiver lento, avisamos: a formatação vai demorar mais e o resultado será limitado pelo hardware — cenário em que o upgrade de SSD e memória costuma ser o passo mais inteligente.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 2 ─────────────────────────────────────────────────────────
  "manutencao-de-notebook": {
    path: "manutencao-de-notebook",
    trackingKey: "manutencao-notebook",
    metaTitle: "Assistência Técnica de Notebook em Curitiba | Diagnóstico",
    metaDescription:
      "Assistência técnica de notebook em Curitiba: lentidão, aquecimento, tela, teclado, bateria e limpeza interna. Todas as marcas. Diagnóstico antes de informar o valor via WhatsApp.",
    serviceName: "Manutenção de Notebook",
    serviceDescription:
      "Diagnóstico e manutenção de notebooks: limpeza interna, troca de pasta térmica, tela, teclado, bateria e desempenho, com atendimento em Curitiba e região.",
    eyebrow: "Notebook em Curitiba",
    h1: "Assistência técnica de notebook em Curitiba",
    h1Accent: "diagnóstico antes de informar o valor",
    intro:
      "Notebook que não liga, esquenta e desliga, ficou lento ou está com tela, teclado ou bateria com defeito? Atendemos as marcas mais comuns do mercado e começamos sempre pelo diagnóstico, para identificar a causa real antes de falar em peça ou preço. Nem toda placa tem reparo viável, e explicamos isso com honestidade. Descreva o sintoma pelo WhatsApp e combinamos o próximo passo.",
    whatsappMessage: "Olá! Meu notebook está com problema. Podem avaliar?",
    incluso: [
      { title: "Diagnóstico do notebook", desc: "Avaliação de hardware e software para achar a causa real." },
      { title: "Limpeza interna", desc: "Remoção de poeira e troca de pasta térmica para reduzir aquecimento." },
      { title: "Tela e teclado", desc: "Avaliação e troca de tela, dobradiça, teclado e conectores." },
      { title: "Bateria e carga", desc: "Teste de bateria, carregador e circuito de energia." },
      { title: "Desempenho", desc: "Ajuste do sistema, SSD e memória quando compensa." },
      { title: "Teste final", desc: "Validação com você antes da entrega." },
    ],
    sinais: [
      "Notebook não liga ou não dá sinal de vídeo",
      "Esquenta muito e desliga sozinho",
      "Ventoinha barulhenta ou muito acelerada",
      "Não carrega ou a bateria não segura carga",
      "Lentidão para ligar e abrir programas",
      "Tela com manchas, linhas ou sem imagem",
      "Teclado ou touchpad falhando",
      "Dobradiça solta ou carcaça danificada",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Modelo do notebook", desc: "Peças e desmontagem variam bastante entre fabricantes e linhas." },
      { title: "Peça necessária", desc: "Tela, bateria, teclado ou dobradiça influenciam o valor final." },
      { title: "Complexidade", desc: "Reparos em placa e conectores exigem mais tempo de bancada." },
      { title: "Risco de dados", desc: "Quando há dados importantes, priorizamos backup antes de intervir." },
      { title: "Urgência", desc: "Prazos curtos podem alterar o agendamento e a disponibilidade de peça." },
      { title: "Deslocamento", desc: "Coleta e entrega consideram a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Atendimento de notebook em domicílio ou por coleta e entrega em Curitiba e região, ideal para quem usa o aparelho em casa, nos estudos ou no home office.",
      empresarial:
        "Manutenção de notebooks corporativos e de equipes, com diagnóstico, limpeza, troca de peças e upgrade para reduzir paradas no trabalho.",
    },
    faqs: [
      { question: "Meu notebook esquenta muito, tem solução?", answer: "Na maioria dos casos, sim. O aquecimento costuma vir de poeira acumulada e pasta térmica ressecada. Fazemos limpeza interna e avaliamos a ventoinha e o dissipador." },
      { question: "Vale a pena consertar ou é melhor trocar?", answer: "Depende do custo do reparo frente ao valor do aparelho. Após o diagnóstico explicamos com honestidade quando compensa consertar e quando não vale." },
      { question: "Vocês trocam tela e teclado?", answer: "Sim, avaliamos e substituímos tela, dobradiça, teclado, bateria e conectores, conforme o modelo e a disponibilidade de peça. Nem toda placa, porém, tem reparo viável." },
      { question: "Preciso levar o notebook até vocês?", answer: "Atendemos em domicílio e também por coleta e entrega em Curitiba e região, conforme o tipo de serviço." },
      { question: "Quanto tempo leva a manutenção?", answer: "Serviços simples podem sair conforme a disponibilidade da agenda; reparos que dependem de peça específica levam mais tempo. Informamos o prazo no valor do atendimento." },
    ],
    relacionados: [
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Coleta e entrega", to: "/coleta-e-entrega" },
      { label: "Diagnóstico técnico", to: "/diagnostico-tecnico" },
    ],
    blocoLocal: [
      {
        titulo: "Os três defeitos que mais chegam em notebook",
        paragrafos: [
          "O primeiro é superaquecimento: ventoinha barulhenta, base quente, quedas em jogo ou videochamada e desligamento repentino. Quase sempre é pasta térmica ressecada somada a dissipador entupido de poeira e pelo de animal — serviço de bancada, com limpeza física e troca da interface térmica, não algo que se resolve por software.",
          "O segundo é não ligar. Aqui é preciso separar fonte, conector de energia, bateria e placa. Um notebook que acende LED mas não dá vídeo tem causa diferente de um que não reage a nada. Fazemos essa separação no diagnóstico antes de falar em peça, porque trocar carregador por chute é o erro mais caro do usuário.",
          "O terceiro é dano físico: dobradiça estourada, tela trincada, teclado com líquido, porta de carga solta. Líquido é urgência real — quanto mais tempo ligado, maior a corrosão. O certo é desligar, não tentar secar com secador e levar o equipamento o quanto antes.",
        ],
      },
      {
        titulo: "Conserto ou troca: como avaliamos peças de notebook",
        paragrafos: [
          "Notebook tem peça cara e componente soldado. Antes de indicar reparo, comparamos o custo total do serviço com o valor de mercado do equipamento e com o que ele ainda entrega para o seu uso. Se a soma passar de boa parte do valor do aparelho e o desempenho continuar limitado, dizemos isso com clareza — mesmo perdendo o serviço.",
          "Há casos intermediários que valem muito a pena: máquina com placa saudável e apenas disco lento ou pouca memória volta a ser produtiva com upgrade, por uma fração do preço de um modelo novo. Já placa com dano por líquido ou falha de chip gráfico entra em outra faixa de risco, e explicamos a chance real de sucesso antes de qualquer autorização.",
          "Trabalhamos com peças compatíveis e informamos quando o item é original, paralelo ou recondicionado. Você aprova o valor antes da execução; nada é trocado sem sua confirmação.",
        ],
      },
      {
        titulo: "Prazo, retirada e o que não fazemos",
        paragrafos: [
          "Limpeza interna e troca de pasta costumam ficar prontas conforme a disponibilidade da agenda. Serviços que dependem de peça específica seguem o prazo de reposição, informado na aprovação. Quando o equipamento precisa de bancada, oferecemos coleta e entrega em Curitiba e região para você não perder o dia.",
          "Não fazemos remoção de senha de equipamento sem comprovação de propriedade, não trabalhamos com desbloqueio de conta de fabricante e não assumimos reparo de placa com dano estrutural irreversível — nesses casos indicamos o caminho honesto, que às vezes é migrar seus dados e planejar a substituição.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 3 ─────────────────────────────────────────────────────────
  "manutencao-de-computador": {
    path: "manutencao-de-computador",
    trackingKey: "manutencao-computador",
    metaTitle: "Assistência Técnica de Computador em Curitiba | PC",
    metaDescription:
      "Assistência técnica de computador em Curitiba: travamentos, fonte, memória, HD/SSD e placa-mãe. Casa e empresa. Diagnóstico honesto antes de informar o valor via WhatsApp.",
    serviceName: "Manutenção de Computador (Desktop)",
    serviceDescription:
      "Diagnóstico e manutenção de PCs desktop: fonte, memória, armazenamento, placa-mãe, travamentos e limpeza, com atendimento em Curitiba e região.",
    eyebrow: "PC desktop em Curitiba",
    h1: "Manutenção e assistência técnica de computador em Curitiba",
    h1Accent: "sem troca de peça desnecessária",
    intro:
      "Computador que não liga, trava, reinicia sozinho, dá tela azul ou não dá vídeo? No desktop, quase todo componente pode ser testado de forma isolada — fonte, memória, armazenamento, placa de vídeo e placa-mãe. Testamos cada parte para isolar a causa real antes de indicar qualquer troca. Esta página é sobre PC de mesa; se o seu equipamento é notebook, veja a assistência específica. Fale pelo WhatsApp para começar o diagnóstico.",
    whatsappMessage: "Olá! Meu computador de mesa está com problema. Podem avaliar?",
    incluso: [
      { title: "Diagnóstico completo", desc: "Teste de fonte, memória, armazenamento e placa-mãe." },
      { title: "Limpeza interna", desc: "Remoção de poeira e revisão da refrigeração do gabinete." },
      { title: "Travamentos e erros", desc: "Investigação de falhas de hardware e de sistema." },
      { title: "Armazenamento", desc: "Avaliação de HD/SSD, saúde do disco e migração quando compensa." },
      { title: "Energia", desc: "Verificação de fonte e estabilidade de alimentação." },
      { title: "Teste final", desc: "Validação de estabilidade antes de devolver o equipamento." },
    ],
    sinais: [
      "Computador que não liga ou não dá vídeo",
      "PC que trava ou reinicia sozinho",
      "Tela azul e falhas de inicialização do Windows",
      "Ruídos anormais na fonte ou nas ventoinhas",
      "Superaquecimento e desligamentos por proteção",
      "Lentidão e baixo desempenho no dia a dia",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Componente afetado", desc: "Fonte, memória, armazenamento ou placa-mãe têm custos diferentes." },
      { title: "Necessidade de peça", desc: "Reposição de peça influencia o valor e o prazo do serviço." },
      { title: "Complexidade do reparo", desc: "Falhas intermitentes exigem mais tempo de teste e diagnóstico." },
      { title: "Estado do sistema", desc: "Sistema corrompido pode exigir formatação como parte da solução." },
      { title: "Urgência", desc: "Prazos curtos podem alterar agendamento e disponibilidade." },
      { title: "Deslocamento", desc: "Atendimento em domicílio considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Manutenção de PC de mesa em domicílio ou por coleta e entrega em Curitiba e região, com diagnóstico transparente antes de aprovar qualquer serviço.",
      empresarial:
        "Manutenção de desktops e estações de trabalho de escritórios e empresas, de forma pontual ou preventiva, para manter a equipe produtiva.",
    },
    faqs: [
      { question: "Meu PC liga mas não dá imagem, o que pode ser?", answer: "Pode ser memória, placa de vídeo, fonte ou placa-mãe. O diagnóstico isola o componente responsável antes de qualquer troca." },
      { question: "O computador reinicia sozinho, é grave?", answer: "Nem sempre. Costuma estar ligado a superaquecimento, fonte instável, memória ou software. Avaliamos para identificar a causa correta." },
      { question: "Vocês fazem limpeza e troca de pasta térmica?", answer: "Sim. A limpeza interna e a manutenção da refrigeração ajudam a reduzir travamentos e desligamentos por temperatura." },
      { question: "Atendem em domicílio?", answer: "Sim, em Curitiba e região, com opção de coleta e entrega quando o reparo precisa de bancada." },
      { question: "Vale a pena consertar um PC antigo?", answer: "Depende do custo do reparo e de um upgrade frente ao valor da máquina. Explicamos com transparência quando compensa investir." },
    ],
    relacionados: [
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
      { label: "Diagnóstico técnico", to: "/diagnostico-tecnico" },
    ],
    blocoLocal: [
      {
        titulo: "Como isolamos a causa em um PC de mesa",
        paragrafos: [
          "A vantagem do desktop é que quase tudo pode ser testado separadamente. Diante de um PC que não liga, a sequência começa pela alimentação: fonte, botão, cabo e sinais da placa. Se há energia mas não há vídeo, a investigação passa para memória, placa de vídeo e placa-mãe, testando com peças conhecidas em vez de trocar por suposição.",
          "Reinício sozinho e desligamento repentino raramente são 'defeito do Windows'. Costumam vir de fonte perdendo capacidade, temperatura alta por dissipador saturado de poeira ou pasta térmica ressecada, e memória instável. Tela azul recorrente pede leitura do erro e teste de memória e disco antes de qualquer conclusão.",
          "Lentidão tem duas origens bem diferentes: sistema comprometido, que se resolve com limpeza ou reinstalação, e hardware defasado, que só melhora com disco e memória adequados. Diagnosticar antes evita o pior desperdício — formatar uma máquina cujo gargalo era o HD.",
        ],
      },
      {
        titulo: "O que esta página não cobre",
        paragrafos: [
          "Aqui tratamos de computador de mesa. Notebook tem desmontagem, refrigeração e peças próprias e é atendido na página específica de manutenção de notebook.",
          "Também não fazemos reparo em nível de componente na placa-mãe, como retrabalho de BGA ou substituição de chip. Quando o diagnóstico aponta esse caminho, dizemos que o serviço é de laboratório especializado em vez de empurrar uma tentativa cara e incerta.",
          "Não trabalhamos com preço fechado por telefone. Sem ver o comportamento do equipamento, qualquer valor seria chute; o valor do atendimento sai depois da avaliação e só é executado após sua aprovação.",
        ],
      },
      {
        titulo: "Quando o conserto não compensa",
        paragrafos: [
          "Existe um ponto em que o reparo custa quase o mesmo que uma máquina melhor: placa-mãe de plataforma obsoleta somada a fonte e memória de padrão antigo é o caso clássico. Nessas horas dizemos com clareza que o dinheiro rende mais em substituição — e explicamos qual peça atual pode ser aproveitada.",
          "Em outros casos o oposto é verdadeiro: um desktop de plataforma ainda atual costuma ter vida longa com troca de fonte, limpeza e migração para SSD. A recomendação é feita com os números na mesa, sem pressa e sem pressão para fechar.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 4 ─────────────────────────────────────────────────────────
  "upgrade-ssd-ram": {
    path: "upgrade-ssd-ram",
    trackingKey: "upgrade-ssd-ram",
    metaTitle: "Instalação de SSD e Upgrade de Memória em Curitiba",
    metaDescription:
      "Instalação de SSD e upgrade de memória RAM em Curitiba com avaliação de compatibilidade, clonagem e backup. Ganho real de desempenho, sem promessa de milagre. Via WhatsApp.",
    serviceName: "Upgrade de SSD e Memória RAM",
    serviceDescription:
      "Instalação de SSD e ampliação de RAM com avaliação de compatibilidade, clonagem do sistema e backup, para ganho real de desempenho em Curitiba e região.",
    eyebrow: "Desempenho em Curitiba",
    h1: "Instalação de SSD e upgrade de memória RAM em Curitiba",
    h1Accent: "ganho real de desempenho",
    intro:
      "Trocar o HD por um SSD e ampliar a memória é o upgrade com melhor custo-benefício para a maioria das máquinas. Antes de indicar peça, avaliamos a compatibilidade do seu equipamento (SATA ou NVMe, limite de RAM) e, quando possível, clonamos o Windows para você não perder nada. O ganho é real, mas depende do gargalo de cada máquina — não prometemos milagre em equipamento condenado. Envie o modelo pelo WhatsApp para avaliação.",
    whatsappMessage: "Olá! Quero fazer upgrade de SSD e/ou memória. Podem avaliar meu equipamento?",
    incluso: [
      { title: "Avaliação de compatibilidade", desc: "Checamos o que o seu equipamento suporta antes de indicar peças." },
      { title: "Instalação de SSD", desc: "SATA ou NVMe conforme o suporte da máquina." },
      { title: "Ampliação de memória", desc: "Dimensionamos a RAM ideal para o seu uso." },
      { title: "Clonagem do sistema", desc: "Quando possível, migramos o Windows sem reinstalar tudo." },
      { title: "Backup preventivo", desc: "Recomendamos backup antes de qualquer migração." },
      { title: "Teste de desempenho", desc: "Validamos o ganho e a estabilidade após o upgrade." },
    ],
    sinais: [
      "Computador demora muito para ligar e abrir programas",
      "Disco (HD) sempre em uso elevado, travando o sistema",
      "Falta de espaço em disco",
      "Trava ao usar várias abas ou aplicativos ao mesmo tempo",
      "Ainda usa HD mecânico (não SSD)",
      "Pouca memória RAM para o uso atual",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Capacidade das peças", desc: "Tamanho do SSD e quantidade de RAM impactam diretamente no valor." },
      { title: "Tipo de SSD", desc: "SATA e NVMe têm preços e compatibilidades diferentes." },
      { title: "Clonagem ou reinstalação", desc: "Migrar o sistema ou reinstalar do zero muda o tempo de serviço." },
      { title: "Volume de dados", desc: "Backup e transferência de muitos arquivos somam tempo." },
      { title: "Compatibilidade do equipamento", desc: "Máquinas antigas podem ter limites de suporte." },
      { title: "Deslocamento", desc: "Atendimento em domicílio considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Upgrade de notebook e desktop de uso pessoal em Curitiba e região, com avaliação de compatibilidade e clonagem do sistema sempre que possível.",
      empresarial:
        "Padronização e upgrade de SSD e memória no parque de máquinas de empresas, melhorando o desempenho das estações sem trocar todo o equipamento.",
    },
    faqs: [
      { question: "SSD faz diferença mesmo?", answer: "Sim, é o upgrade que mais melhora a percepção de velocidade no uso diário. O ganho depende do restante do hardware, então não prometemos porcentagem fixa." },
      { question: "Vou perder meus arquivos ao trocar o disco?", answer: "Quando o disco antigo está legível, fazemos a clonagem ou o backup e transferência dos dados. Backup prévio é sempre recomendado." },
      { question: "Vale a pena dar upgrade em máquina muito antiga?", answer: "Depende. Em equipamento condenado, o upgrade não faz milagre. Avaliamos e dizemos com honestidade quando compensa." },
      { question: "Quanta memória eu preciso?", answer: "Depende do uso. Para tarefas do dia a dia, uma quantidade; para edição e trabalho pesado, outra. Dimensionamos junto com você." },
      { question: "Vocês instalam peça que eu já comprei?", answer: "Podemos avaliar e instalar, verificando a compatibilidade. Se a peça não for adequada, orientamos a melhor opção." },
    ],
    relacionados: [
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "HD, SSD SATA e NVMe: o que muda na prática",
        paragrafos: [
          "O HD mecânico depende de partes móveis, e é por isso que domina a lista de gargalos em máquinas antigas: qualquer tarefa que exija muitos acessos pequenos ao disco fica presa esperando. O SSD elimina esse tempo de espera, e é daí que vem a sensação de máquina nova na inicialização, na abertura de programas e na resposta do sistema.",
          "Entre SSD SATA e NVMe existe diferença de barramento, mas o impacto percebido no uso comum é bem menor do que o salto de HD para SSD. Por isso não prometemos número de segundos nem multiplicador de velocidade: indicamos o que o equipamento aceita e o que muda de fato no seu tipo de uso.",
          "A memória atua em outra frente: ela não acelera o que já cabe, evita o engasgo quando falta espaço. Máquinas com pouca RAM passam a usar o disco como apoio e travam em multitarefa. Ampliar ajuda quem trabalha com muitas abas, planilhas grandes, edição ou máquinas virtuais; para uso leve, o SSD costuma resolver sozinho.",
        ],
      },
      {
        titulo: "Compatibilidade e peças: o que é avaliado antes",
        paragrafos: [
          "Nenhuma peça é indicada sem olhar o equipamento. Verificamos qual conexão o modelo aceita (SATA 2,5 polegadas, M.2 SATA ou M.2 NVMe), se há slot livre, o tipo e a frequência da memória suportada, o limite total reconhecido pela placa e se o sistema instalado aproveita o que será colocado. Notebook fino com slot único e memória soldada, por exemplo, muda completamente a recomendação.",
          "Peças são informadas separadamente da mão de obra e a garantia do componente segue o fornecedor. Você pode fornecer o SSD ou a memória que já possui — nesse caso conferimos a compatibilidade antes de instalar. Não trabalhamos com preço fixo de componente, porque modelo, capacidade e disponibilidade mudam o valor.",
        ],
      },
      {
        titulo: "Clonagem ou instalação limpa?",
        paragrafos: [
          "A clonagem mantém sistema, programas e arquivos como estavam e é a opção mais confortável quando o ambiente atual está saudável. Ela exige que o disco de origem seja lido sem erro: disco em falha pode interromper a cópia no meio do caminho.",
          "A instalação limpa é preferível quando o sistema já apresentava travamento, infecção ou anos de acúmulo — levar esse problema para dentro do SSD apenas deixa o mesmo desconforto mais rápido. Nos dois caminhos, a recomendação é ter uma cópia dos arquivos antes: upgrade é procedimento controlado, mas qualquer trabalho sobre disco tem risco.",
          "Se a máquina desliga sozinha, esquenta muito ou reinicia em uso pesado, trocar disco e memória não resolve. Antes do upgrade vale o diagnóstico de hardware, porque o sintoma tem origem elétrica ou térmica.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Instalação limpa do sistema", to: "/servicos/formatacao" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 5 ─────────────────────────────────────────────────────────
  "remocao-de-virus": {
    path: "remocao-de-virus",
    trackingKey: "remocao-virus",
    metaTitle: "Remoção de Vírus e Malware em Curitiba | PC e Notebook",
    metaDescription:
      "Remoção de vírus, malware e sequestro de navegador em Curitiba. Limpeza segura, proteção dos seus dados e reinstalação quando necessário. Atendimento via WhatsApp.",
    serviceName: "Remoção de Vírus e Malware",
    serviceDescription:
      "Remoção de vírus, malware e adware com proteção de dados, limpeza do navegador e reinstalação quando necessário, em Curitiba e região.",
    eyebrow: "Segurança em Curitiba",
    h1: "Remoção de vírus e malware em Curitiba",
    h1Accent: "com proteção dos seus dados",
    intro:
      "Pop-ups sem parar, navegador sequestrado, programas desconhecidos ou avisos falsos pedindo pagamento? Fazemos a remoção de vírus e malware com atenção aos seus arquivos e reconfiguramos o navegador e a proteção. A limpeza preserva seus dados sempre que o sistema permite — quando há criptografia ou corrupção, porém, não é possível garantir integridade total. Fale pelo WhatsApp e descreva o que está acontecendo.",
    whatsappMessage: "Olá! Acho que meu computador está com vírus. Podem ajudar?",
    incluso: [
      { title: "Diagnóstico de infecção", desc: "Identificação de vírus, malware, adware e sequestro de navegador." },
      { title: "Remoção segura", desc: "Limpeza com atenção à integridade dos seus arquivos." },
      { title: "Navegador limpo", desc: "Remoção de extensões e redirecionamentos maliciosos." },
      { title: "Proteção", desc: "Configuração de antivírus e boas práticas de segurança." },
      { title: "Backup quando há risco", desc: "Priorizamos seus dados quando a infecção é grave." },
      { title: "Reinstalação se necessário", desc: "Quando o sistema está comprometido demais, indicamos formatação." },
    ],
    sinais: [
      "Pop-ups e propagandas aparecendo sem parar",
      "Navegador com página inicial, busca ou extensões trocadas",
      "Programas desconhecidos instalados sozinhos",
      "Lentidão repentina e travamentos",
      "Avisos falsos pedindo pagamento ou ligação",
      "Arquivos bloqueados e acessos suspeitos às contas",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Gravidade da infecção", desc: "Casos simples e sistemas comprometidos exigem esforços diferentes." },
      { title: "Risco aos dados", desc: "Quando há risco de perda, o cuidado extra com backup soma tempo." },
      { title: "Necessidade de formatação", desc: "Sistemas muito comprometidos podem exigir reinstalação." },
      { title: "Quantidade de contas afetadas", desc: "Sequestro de contas e senhas pode demandar orientação adicional." },
      { title: "Urgência", desc: "Prazos curtos podem influenciar o agendamento." },
      { title: "Deslocamento", desc: "Atendimento em domicílio considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Remoção de vírus em domicílio ou por coleta e entrega em Curitiba e região, preservando seus dados sempre que o estado do sistema permite.",
      empresarial:
        "Limpeza e proteção de estações de trabalho de empresas, com orientação de segurança para reduzir reincidência e risco de golpes na equipe.",
    },
    faqs: [
      { question: "Vou perder meus arquivos na remoção de vírus?", answer: "O objetivo é preservar seus dados. Em infecções graves, com criptografia ou corrupção, nem sempre há garantia de integridade total — por isso priorizamos o backup antes de intervir e explicamos os riscos." },
      { question: "Sempre precisa formatar para remover vírus?", answer: "Não. Muitos casos são resolvidos com limpeza direcionada. A formatação só é indicada quando o sistema está comprometido demais." },
      { question: "Meu navegador foi 'sequestrado', dá para resolver?", answer: "Sim. Removemos extensões e redirecionamentos maliciosos e reconfiguramos o navegador com segurança." },
      { question: "Como evitar pegar vírus de novo?", answer: "Orientamos sobre antivírus, atualizações, downloads seguros e cuidado com anexos e links. A prevenção faz parte do atendimento." },
      { question: "Recebi um aviso pedindo pagamento, é golpe?", answer: "Avisos que pedem pagamento ou ligação urgente costumam ser golpe. Não pague nem ligue: avaliamos o equipamento e orientamos com segurança." },
    ],
    relacionados: [
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Limpar, formatar ou preservar: como decidimos",
        paragrafos: [
          "Nem toda infecção exige reinstalar o sistema. Adware de navegador, extensão sequestradora, tarefa agendada maliciosa e atalho contaminado saem com limpeza dirigida, preservando programas e arquivos no lugar. Esse é o cenário mais comum de quem chega reclamando de pop-up e página inicial trocada.",
          "Reinstalar passa a ser a escolha certa quando a ameaça tocou componentes do sistema, quando há vários malwares somados a anos de acúmulo, ou quando a máquina volta a apresentar sintoma depois da limpeza. Nesses casos, insistir em remover peça por peça custa mais tempo do que reinstalar e devolve uma máquina menos confiável.",
          "Em ransomware, a conversa é outra e precisa ser honesta: arquivos criptografados por famílias recentes normalmente não têm decriptador público. Avaliamos a extensão, verificamos se existe ferramenta legítima disponível e priorizamos preservar o disco original antes de qualquer tentativa. Não prometemos recuperação que não podemos entregar, e não intermediamos pagamento de resgate.",
        ],
      },
      {
        titulo: "O que fazer agora, antes do atendimento",
        paragrafos: [
          "Se aparecerem cobranças estranhas ou logins suspeitos, desconecte a máquina da internet e troque as senhas críticas por outro aparelho — e-mail principal primeiro, depois banco e redes sociais. Trocar senha no computador infectado apenas entrega a senha nova ao invasor.",
          "Não instale três antivírus ao mesmo tempo tentando resolver: eles se bloqueiam e mascaram o diagnóstico. Também evite rodar limpadores de registro baixados de anúncio, que costumam ser a própria origem do problema.",
          "Se houver arquivo importante sem cópia, avise na triagem. A ordem correta é preservar dados, depois limpar — inverter essa ordem é o que costuma transformar um caso simples em perda definitiva.",
        ],
      },
      {
        titulo: "Depois da limpeza: o que reduz reinfecção",
        paragrafos: [
          "Entregamos com antivírus nativo ativo e configurado, extensões revisadas, inicialização enxuta, contas de administrador separadas do uso diário quando faz sentido e atualizações pendentes aplicadas. A maior parte das reinfecções acontece por software pirata, instalador baixado de link patrocinado e anexo de e-mail — orientamos caso a caso com exemplos do que a pessoa realmente usa.",
          "Fora do escopo: recuperação de contas já invadidas junto a bancos e plataformas, contestação de cobranças e perícia forense. Nesses casos indicamos os canais corretos e documentamos tecnicamente o que foi encontrado.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 6 ─────────────────────────────────────────────────────────
  "recuperacao-de-dados": {
    path: "recuperacao-de-dados",
    trackingKey: "recuperacao-dados",
    metaTitle: "Recuperação de Dados em Curitiba | HD, SSD e Pendrive",
    metaDescription:
      "Recuperação de dados em Curitiba de HD, SSD, pendrive e cartão. Exclusão acidental, sistema que não inicia e falhas. Avaliação primeiro — recuperação não é garantida.",
    serviceName: "Recuperação de Dados",
    serviceDescription:
      "Tentativa de recuperação de dados em HD, SSD, pendrive e cartão de memória, com avaliação inicial e transparência sobre as chances, em Curitiba e região.",
    eyebrow: "Recuperação em Curitiba",
    h1: "Recuperação de dados de HD, SSD e pendrive em Curitiba",
    h1Accent: "avaliação antes de qualquer promessa",
    intro:
      "Apagou arquivos por engano, o sistema não inicia ou o disco parou de ser reconhecido? Avaliamos HD, SSD, pendrive e cartão e explicamos as chances reais antes de qualquer tentativa. Isto não é o mesmo que backup preventivo: aqui tentamos resgatar o que já foi perdido. Importante: recuperação de dados não é garantida, e continuar usando o dispositivo pode sobrescrever ou piorar a falha. Se houver risco, pare de usar e fale pelo WhatsApp.",
    whatsappMessage: "Olá! Preciso avaliar uma possível recuperação de dados de um HD/SSD/pendrive.",
    incluso: [
      { title: "Avaliação do dispositivo", desc: "Análise inicial de HD, SSD, pendrive ou cartão." },
      { title: "Diagnóstico de causa", desc: "Exclusão acidental, corrupção lógica ou falha física." },
      { title: "Chances reais", desc: "Explicamos com honestidade a probabilidade de recuperação." },
      { title: "Cópia segura", desc: "Trabalhamos para não agravar o estado do dispositivo." },
      { title: "Entrega dos dados", desc: "Quando recuperados, entregamos em mídia segura." },
      { title: "Orientação", desc: "Recomendações de backup para evitar novas perdas." },
    ],
    sinais: [
      "Arquivos apagados por engano ou partição inacessível",
      "Sistema que não inicia mais",
      "HD ou SSD não reconhecido pelo computador",
      "Pendrive ou cartão pedindo formatação",
      "Ruídos anormais vindos do HD (possível falha física)",
      "Perda de fotos, documentos ou trabalhos importantes",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Tipo de falha", desc: "Falha lógica e falha física exigem procedimentos muito diferentes." },
      { title: "Dispositivo", desc: "HD, SSD, pendrive e cartão têm complexidades distintas." },
      { title: "Volume e prioridade", desc: "Quantidade de dados e quais arquivos são prioritários." },
      { title: "Estado físico", desc: "Dispositivos com dano físico demandam mais cuidado e tempo." },
      { title: "Urgência", desc: "Prazos curtos podem influenciar o processo." },
      { title: "Necessidade de mídia", desc: "Fornecimento de novo disco/mídia para entrega dos dados." },
    ],
    atendimento: {
      residencial:
        "Avaliação de recuperação de dados de HD, SSD, pendrive e cartão de uso pessoal em Curitiba e região, com transparência sobre as chances reais.",
      empresarial:
        "Tentativa de recuperação de dados de máquinas e servidores locais de empresas, sempre com avaliação prévia — a recuperação não é garantida.",
    },
    faqs: [
      { question: "A recuperação de dados é garantida?", answer: "Não. Nenhum serviço sério garante 100%. Fazemos a avaliação, explicamos as chances reais e trabalhamos para não piorar o estado do dispositivo." },
      { question: "Apaguei arquivos, o que devo fazer agora?", answer: "Pare de usar o dispositivo imediatamente. Continuar gravando dados reduz muito as chances de recuperação. Traga para avaliação o quanto antes." },
      { question: "Meu HD faz barulho, tem solução?", answer: "Ruído pode indicar falha física, que é mais delicada. Não insista em ligar: isso pode agravar. Avaliamos o caso com cuidado." },
      { question: "Recuperação é a mesma coisa que backup?", answer: "Não. Recuperação tenta resgatar dados já perdidos e não tem garantia. Backup é preventivo, feito antes de qualquer problema. Orientamos uma rotina de backup para você não depender de recuperação." },
      { question: "Como evitar perder dados de novo?", answer: "Backup regular em mais de um lugar (disco externo e nuvem, por exemplo). Orientamos a melhor rotina para o seu caso." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Coleta e entrega", to: "/coleta-e-entrega" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Perda lógica x perda física: por que a diferença muda tudo",
        paragrafos: [
          "Na perda lógica o dispositivo continua sendo reconhecido: houve exclusão acidental, formatação, corrupção de partição ou falha do sistema de arquivos. O conteúdo em geral ainda está gravado, e a chance depende de quanto foi escrito por cima desde o incidente. Por isso o pedido mais importante é parar de usar o aparelho imediatamente.",
          "Na perda física o dispositivo apresenta comportamento anormal: ruído, aquecimento incomum, sumiço intermitente ou capacidade errada. Aqui não se roda software de recuperação sobre o disco original, porque cada tentativa força um hardware já comprometido. O caminho é avaliar e, quando viável, trabalhar sobre uma cópia de imagem em vez do disco doente.",
          "SSD merece um parágrafo próprio: como o controlador gerencia os blocos internamente e há descarte automático de dados apagados, a recuperação em SSD tem limite técnico maior do que em HD, e falha de controladora frequentemente encerra o caso. Preferimos dizer isso na primeira conversa a cobrar por uma tentativa sem perspectiva.",
        ],
      },
      {
        titulo: "O que precisa ficar claro antes de começar",
        paragrafos: [
          "Recuperação de dados é tentativa técnica, não resultado garantido. Existem mídias cujo conteúdo não retorna, e isso é dito antes da execução, nunca depois. Também não usamos percentual de sucesso: cada caso depende do tipo de falha e do histórico do dispositivo.",
          "Tentativas anteriores atrapalham. Mídia já aberta, congelada, ligada repetidamente ou submetida a programas de recuperação chega em condição pior. Parte dos casos que não avançam tinham chance antes da improvisação em casa.",
          "Alguns cenários exigem terceiros: falha mecânica interna pode demandar ambiente controlado e peças doadoras de laboratório especializado, com prazo e custo próprios. O valor do atendimento sempre depende do estado real da mídia, avaliado antes, e o acesso ao conteúdo respeita a autorização do cliente e a política de privacidade publicada no site.",
        ],
      },
      {
        titulo: "Backup é mais barato do que tentar recuperar",
        paragrafos: [
          "A maior parte das perdas que chegam até nós teria sido evitada por uma rotina simples: uma cópia local em disco externo e outra fora de casa, em nuvem. Configuramos essa rotina, testamos a restauração — backup que nunca foi restaurado não é backup — e explicamos o que costuma ficar de fora, como caixas de e-mail e pastas de programas.",
          "Quando o disco ainda funciona mas dá sinais de desgaste, a ordem é copiar tudo primeiro e só depois planejar a troca por SSD. Se o equipamento sequer inicia, a avaliação começa pela manutenção do computador, porque o problema pode estar fora do disco.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Coleta e entrega do equipamento", to: "/coleta-e-entrega" },
      { label: "Política de privacidade", to: "/politica-de-privacidade" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 7 ─────────────────────────────────────────────────────────
  "redes-e-wifi": {
    path: "redes-e-wifi",
    trackingKey: "redes-wifi",
    metaTitle: "Configuração de Redes e Wi-Fi em Curitiba | Roteadores",
    metaDescription:
      "Configuração de redes e Wi-Fi em Curitiba: internet instável, roteador, repetidor, cabeamento e rede empresarial. Cobertura melhor em casa e no trabalho. Via WhatsApp.",
    serviceName: "Redes e Wi-Fi",
    serviceDescription:
      "Instalação e configuração de redes e Wi-Fi residenciais e empresariais: roteador, repetidor, cabeamento e estabilidade, em Curitiba e região.",
    eyebrow: "Conectividade em Curitiba",
    h1: "Instalação e configuração de redes e Wi-Fi em Curitiba",
    h1Accent: "internet estável em casa e na empresa",
    intro:
      "Wi-Fi que cai, sinal fraco em alguns cômodos ou rede instável no trabalho? Avaliamos o ambiente e configuramos roteador, repetidores, mesh e cabeamento para melhorar cobertura e estabilidade. Muitas vezes o problema é o posicionamento ou o excesso de dispositivos, não o plano — mas falhas que são do provedor só confirmamos após diagnóstico. Fale pelo WhatsApp para avaliarmos o seu caso.",
    whatsappMessage: "Olá! Preciso melhorar minha rede/Wi-Fi. Podem avaliar?",
    incluso: [
      { title: "Análise do ambiente", desc: "Avaliação de cobertura, interferências e pontos críticos." },
      { title: "Configuração de roteador", desc: "Ajuste de canais, senha, banda e segurança da rede." },
      { title: "Repetidores e mesh", desc: "Ampliação de cobertura para áreas com sinal fraco." },
      { title: "Cabeamento", desc: "Passagem e organização de cabos quando faz sentido." },
      { title: "Rede empresarial", desc: "Segmentação, estabilidade e prioridade de tráfego sob avaliação." },
      { title: "Testes de estabilidade", desc: "Validação de sinal e velocidade nos ambientes de uso." },
    ],
    sinais: [
      "Wi-Fi que cai ou oscila com frequência",
      "Sinal fraco em cômodos ou setores específicos",
      "Dispositivos que não conectam ou conflito de IP",
      "Impressora de rede que some ou não é encontrada",
      "Muitos dispositivos e a rede não aguenta",
      "Rede da empresa instável, insegura ou desorganizada",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Tamanho do ambiente", desc: "Área a cobrir e número de cômodos ou setores." },
      { title: "Equipamentos necessários", desc: "Roteador, repetidores, mesh ou switches conforme o caso." },
      { title: "Cabeamento", desc: "Passagem de cabos e infraestrutura influenciam o serviço." },
      { title: "Complexidade da rede", desc: "Redes empresariais com segmentação exigem mais planejamento." },
      { title: "Urgência", desc: "Prazos curtos podem alterar o agendamento." },
      { title: "Deslocamento", desc: "Atendimento considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Wi-Fi de casas e apartamentos em Curitiba e região: posicionamento de roteador, repetidores ou mesh para cobrir todos os cômodos com estabilidade.",
      empresarial:
        "Redes de escritórios e pequenas empresas: cabeamento, segmentação simples, impressoras em rede e estabilidade para o trabalho, sob avaliação.",
    },
    faqs: [
      { question: "Meu Wi-Fi não pega em todos os cômodos, o que fazer?", answer: "Avaliamos o ambiente e indicamos posicionamento do roteador, repetidores ou sistema mesh para ampliar a cobertura de forma estável." },
      { question: "Repetidor ou mesh, qual é melhor?", answer: "Depende do ambiente. O mesh costuma oferecer transição mais suave; o repetidor pode resolver casos pontuais. Indicamos o adequado após avaliar." },
      { question: "Vocês configuram a rede da minha empresa?", answer: "Sim. Trabalhamos estabilidade, segurança e organização de redes empresariais, com atendimento pontual ou recorrente sob consulta." },
      { question: "Passam cabo de rede?", answer: "Quando faz sentido para estabilidade, avaliamos e realizamos o cabeamento e a organização dos pontos." },
      { question: "A internet continua lenta, é problema de Wi-Fi?", answer: "Pode ser Wi-Fi, roteador, quantidade de dispositivos ou o próprio plano. O diagnóstico separa o que é rede local do que é o provedor — falhas da operadora fogem ao nosso reparo." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Por que o Wi-Fi cai em parte da casa (e o repetidor nem sempre resolve)",
        paragrafos: [
          "A queixa mais comum não é falta de internet, é falta de cobertura. O roteador costuma ficar onde o cabo da operadora entrou — hall, área de serviço, atrás da TV — e o sinal ainda precisa atravessar parede de concreto, laje, caixa d'água e espelho. Em imóveis alongados ou sobrados de Curitiba, o resultado é sempre o mesmo: sala com sinal cheio e quarto dos fundos com conexão que cai na videochamada.",
          "Repetidor simples entrega metade da banda, porque escuta e retransmite pelo mesmo rádio. Quando ele é instalado justamente onde o sinal já chegava fraco, o problema piora: o celular gruda no repetidor ruim em vez de voltar ao roteador. Por isso medimos antes de indicar equipamento — em muitos casos, reposicionar o roteador e corrigir canal resolve sem custo de hardware.",
          "Em prédios com muitas redes vizinhas, a faixa de 2,4 GHz vive congestionada. Separar as bandas, fixar canal limpo e priorizar 5 GHz para os aparelhos próximos costuma devolver estabilidade imediata, sem trocar nada.",
        ],
      },
      {
        titulo: "Quando mesh e cabo valem o investimento",
        paragrafos: [
          "Mesh faz sentido quando existem dois ou três ambientes distantes com uso pesado ao mesmo tempo: home office com reunião por vídeo, TV em streaming e alguém jogando. Os nós conversam entre si e o aparelho troca de ponto sem derrubar a chamada.",
          "Quando há passagem de cabo possível — conduíte livre, forro acessível, canaleta discreta — levar um ponto cabeado até o nó distante é a melhor decisão de custo-benefício: a rede fica estável mesmo com a casa cheia de dispositivos. Explicamos essa alternativa antes de vender equipamento a mais.",
          "Também deixamos claro o limite honesto: se o plano contratado entrega pouca banda ou a fibra chega instável, nenhum roteador conserta. Nesse caso o problema é da operadora e orientamos como registrar a reclamação com medição em mãos.",
        ],
      },
      {
        titulo: "O que fica configurado e o que não está incluído",
        paragrafos: [
          "Entregamos senha forte com WPA2/WPA3, nome de rede padronizado, bandas organizadas, canal escolhido por medição, rede de visitantes separada dos dispositivos da casa, firmware atualizado e senha de administração do roteador alterada — este último ponto é o mais esquecido e o mais explorado por invasores.",
          "Não está incluído: obra civil, quebra de parede, instalação de infraestrutura nova de conduíte, contrato com a operadora e suporte a equipamento em falha de fábrica. Câmeras, automação e servidores entram como escopo à parte, avaliado na triagem.",
        ],
      },
    ],
    linksLocais: [
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Técnico no seu endereço", to: "/atendimento-domicilio" },
      { label: "Suporte para empresas", to: "/empresa-de-ti-curitiba" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-05",
  },

  // 8 ─────────────────────────────────────────────────────────
  "suporte-tecnico-empresarial": {
    path: "suporte-tecnico-empresarial",
    trackingKey: "suporte-empresarial",
    metaTitle: "Suporte Técnico para Empresas em Curitiba | Informática",
    metaDescription:
      "Suporte técnico de informática para empresas em Curitiba, com atendimento para computadores, usuários, redes, impressoras e manutenção preventiva.",
    serviceName: "Suporte Técnico Empresarial",
    serviceDescription:
      "Suporte de informática para empresas: estações, rede, impressoras, backups e manutenção preventiva, com atendimento pontual ou recorrente em Curitiba e região.",
    eyebrow: "Empresas em Curitiba",
    h1: "Suporte técnico de informática para empresas em Curitiba",
    h1Accent: "menos paradas, mais previsibilidade",
    intro:
      "Empresa parada custa caro. Damos suporte técnico às estações de trabalho da equipe, à rede interna, às impressoras compartilhadas e às rotinas de backup, com atendimento pontual para emergências ou recorrente para prevenir problemas. É o suporte prático do dia a dia; a estruturação institucional de TI mais ampla você encontra na página Empresa de TI em Curitiba. Fale pelo WhatsApp para avaliarmos a necessidade.",
    whatsappMessage: "Olá! Preciso de suporte técnico de informática para uma empresa em Curitiba.",
    incluso: [
      { title: "Estações de trabalho", desc: "Manutenção e configuração dos computadores da equipe." },
      { title: "Rede e conectividade", desc: "Estabilidade, segurança e organização da rede interna." },
      { title: "Impressoras", desc: "Instalação, compartilhamento e solução de problemas de impressão." },
      { title: "Rotinas de backup", desc: "Estruturação de backup para reduzir risco de perda de dados." },
      { title: "Manutenção preventiva", desc: "Rotinas para evitar falhas e paradas inesperadas." },
      { title: "Atendimento recorrente", desc: "Planos de acompanhamento sob consulta, conforme a necessidade." },
    ],
    sinais: [
      "Estações de trabalho lentas ou instáveis",
      "Falhas recorrentes que atrapalham a operação",
      "Usuários sem acesso a arquivos, rede ou impressão",
      "Rede interna caindo e afetando o trabalho",
      "Computadores sem manutenção preventiva",
      "Necessidade de suporte remoto ou presencial recorrente",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Quantidade de estações", desc: "Número de computadores e usuários atendidos." },
      { title: "Complexidade da rede", desc: "Infraestrutura, servidores locais e segmentação." },
      { title: "Escopo do serviço", desc: "Atendimento pontual, projeto específico ou acompanhamento recorrente." },
      { title: "Rotinas de backup", desc: "Estruturar e manter backups influencia o escopo." },
      { title: "Urgência", desc: "Emergências com empresa parada podem alterar prioridade." },
      { title: "Deslocamento", desc: "Atendimento presencial considera a localização em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Também atendemos profissionais autônomos e home office que dependem do computador para trabalhar, com o mesmo cuidado de diagnóstico e prevenção.",
      empresarial:
        "Suporte a micro e pequenas empresas: estações, rede, impressoras, backups e manutenção preventiva, com atendimento pontual ou recorrente sob consulta.",
    },
    faqs: [
      { question: "Vocês atendem empresas de qual porte?", answer: "Atendemos principalmente autônomos, escritórios e micro e pequenas empresas em Curitiba e região, de forma pontual ou recorrente." },
      { question: "Como funciona o atendimento recorrente?", answer: "Definimos um escopo conforme a sua necessidade (estações, rede, backups, preventiva) e um formato de acompanhamento. Os valores são sob consulta." },
      { question: "Fazem atendimento de emergência?", answer: "Sim, avaliamos emergências com empresa parada e priorizamos o restabelecimento conforme a disponibilidade." },
      { question: "Cuidam de backup e segurança?", answer: "Ajudamos a estruturar rotinas de backup e boas práticas de segurança para reduzir o risco de perda de dados e paradas." },
      { question: "Resolvem problemas de rede e impressão?", answer: "Sim. Rede instável e problemas de impressão compartilhada estão entre os atendimentos mais comuns em empresas." },
    ],
    relacionados: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Suporte remoto", to: "/atendimento-remoto" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
      { label: "Diagnóstico técnico", to: "/diagnostico-tecnico" },
    ],
    dateModified: "2026-07-11",
  },
};

/** Ordem canônica exibida no hub /servicos. */
export const SERVICOS_CORE_ORDER = [
  "formatacao",
  "manutencao-de-notebook",
  "manutencao-de-computador",
  "upgrade-ssd-ram",
  "remocao-de-virus",
  "recuperacao-de-dados",
  "redes-e-wifi",
  "suporte-tecnico-empresarial",
] as const;
