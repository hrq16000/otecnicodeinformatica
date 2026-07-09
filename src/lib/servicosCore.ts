import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

// ─────────────────────────────────────────────────────────────
// SERVIÇOS ESSENCIAIS — conteúdo próprio, local e profundo.
// Sem rating inventado, sem preço fechado universal, sem urgência falsa.
// Slugs canônicos definidos nesta rodada (SEO local curado).
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
  { step: "4", title: "Orçamento", desc: "Valor apresentado e aprovado por você antes de qualquer serviço." },
  { step: "5", title: "Execução", desc: "Realizamos o serviço com peças e procedimentos adequados." },
  { step: "6", title: "Entrega e validação", desc: "Testamos junto com você e entregamos funcionando." },
];

const ATENDIMENTO_PADRAO = {
  residencial:
    "Atendimento a domicílio ou por coleta e entrega em Curitiba e região metropolitana, com horário combinado e diagnóstico transparente antes de aprovar o serviço.",
  empresarial:
    "Suporte a estações de trabalho, servidores locais e rede da empresa, com atendimento pontual ou recorrente sob consulta para reduzir paradas e imprevistos.",
};

export const SERVICOS_CORE: Record<string, ServicoLandingData> = {
  // 1 ─────────────────────────────────────────────────────────
  formatacao: {
    path: "formatacao",
    trackingKey: "formatacao",
    metaTitle: "Formatação de Computador e Notebook em Curitiba | Técnico em Curitiba",
    metaDescription:
      "Formatação de PC e notebook em Curitiba com backup, Windows original, drivers e programas essenciais. Diagnóstico a partir de R$ 99,99. Atendimento via WhatsApp.",
    serviceName: "Formatação de Computador e Notebook",
    serviceDescription:
      "Formatação com backup prévio, Windows 10/11 original, drivers atualizados e programas essenciais, com atendimento em Curitiba e região.",
    eyebrow: "Formatação em Curitiba",
    h1: "Formatação de computador e notebook em Curitiba",
    h1Accent: "com backup dos seus arquivos",
    intro:
      "Windows lento, cheio de erro ou corrompido? A formatação reinstala o sistema do zero. Antes de tudo fazemos o backup dos seus dados e, ao final, restauramos seus arquivos e deixamos a máquina pronta para o dia a dia.",
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
      "Sistema lento mesmo após limpeza e desinstalação de programas",
      "Vírus, pop-ups ou navegador que voltam sempre",
      "Telas azuis, travamentos e erros frequentes do Windows",
      "Sistema corrompido que não inicia corretamente",
      "Acúmulo de programas e arquivos desnecessários",
      "Preparar a máquina para venda, repasse ou novo usuário",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "A formatação apaga meus arquivos?", answer: "A formatação reinstala o sistema do zero. Por isso fazemos backup dos seus dados antes e restauramos depois, sempre que o equipamento permite leitura das informações." },
      { question: "Vocês instalam Office, antivírus e drivers?", answer: "Sim. Entregamos com Windows ativado, drivers atualizados, navegador, antivírus e pacote de produtividade configurados conforme o seu uso." },
      { question: "Formatar deixa o computador mais rápido?", answer: "Na maioria dos casos há ganho perceptível, principalmente combinando com SSD. Não prometemos porcentagem fixa: o resultado depende do hardware." },
      { question: "Em quanto tempo fica pronto?", answer: "Em geral de 2 a 4 horas, variando conforme o hardware e o volume de dados a copiar e restaurar." },
      { question: "Atendem em domicílio ou por coleta?", answer: "Atendemos em Curitiba e região, com opção de atendimento em domicílio ou coleta e entrega do equipamento." },
    ],
    relacionados: [
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 2 ─────────────────────────────────────────────────────────
  "manutencao-de-notebook": {
    path: "manutencao-de-notebook",
    trackingKey: "manutencao-notebook",
    metaTitle: "Manutenção de Notebook em Curitiba | Técnico em Curitiba",
    metaDescription:
      "Manutenção de notebook em Curitiba: lentidão, aquecimento, tela, teclado, bateria e limpeza interna. Diagnóstico antes do orçamento. Atendimento via WhatsApp.",
    serviceName: "Manutenção de Notebook",
    serviceDescription:
      "Diagnóstico e manutenção de notebooks: limpeza interna, troca de pasta térmica, tela, teclado, bateria e desempenho, com atendimento em Curitiba e região.",
    eyebrow: "Notebook em Curitiba",
    h1: "Manutenção de notebook em Curitiba",
    h1Accent: "diagnóstico antes do orçamento",
    intro:
      "Notebook esquentando, lento, com tela, teclado ou bateria com problema? Fazemos o diagnóstico para identificar a causa real e só então apresentamos o orçamento — sem trocar peça sem necessidade.",
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
      "Notebook esquentando e desligando sozinho",
      "Ventoinha barulhenta ou muito acelerada",
      "Lentidão para ligar e abrir programas",
      "Tela com manchas, linhas ou sem imagem",
      "Teclas que falham ou não respondem",
      "Bateria que não segura carga ou não carrega",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "Meu notebook esquenta muito, tem solução?", answer: "Na maioria dos casos, sim. O aquecimento costuma vir de poeira acumulada e pasta térmica ressecada. Fazemos limpeza interna e avaliamos a ventoinha e o dissipador." },
      { question: "Vale a pena consertar ou é melhor trocar?", answer: "Depende do custo do reparo frente ao valor do aparelho. Após o diagnóstico explicamos com honestidade quando compensa consertar e quando não vale." },
      { question: "Vocês trocam tela e teclado?", answer: "Sim, avaliamos e substituímos tela, dobradiça, teclado, bateria e conectores, conforme o modelo e a disponibilidade de peça." },
      { question: "Preciso levar o notebook até vocês?", answer: "Atendemos em domicílio e também por coleta e entrega em Curitiba e região, conforme o tipo de serviço." },
      { question: "Quanto tempo leva a manutenção?", answer: "Serviços simples podem sair no mesmo dia; reparos que dependem de peça específica levam mais tempo. Informamos o prazo no orçamento." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Formatação", to: "/servicos/formatacao" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 3 ─────────────────────────────────────────────────────────
  "manutencao-de-computador": {
    path: "manutencao-de-computador",
    trackingKey: "manutencao-computador",
    metaTitle: "Manutenção de Computador (PC Desktop) em Curitiba | Técnico em Curitiba",
    metaDescription:
      "Manutenção de computador de mesa em Curitiba: travamentos, fonte, memória, HD/SSD e placa-mãe. Diagnóstico honesto antes do orçamento. Atendimento via WhatsApp.",
    serviceName: "Manutenção de Computador (Desktop)",
    serviceDescription:
      "Diagnóstico e manutenção de PCs desktop: fonte, memória, armazenamento, placa-mãe, travamentos e limpeza, com atendimento em Curitiba e região.",
    eyebrow: "PC desktop em Curitiba",
    h1: "Manutenção de computador de mesa em Curitiba",
    h1Accent: "sem troca de peça desnecessária",
    intro:
      "Desktop travando, reiniciando ou fazendo barulho? Avaliamos fonte, memória, armazenamento, placa-mãe e temperatura para identificar a causa real antes de qualquer orçamento.",
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
      "PC que trava ou reinicia sozinho",
      "Computador que não liga ou não dá vídeo",
      "Ruídos anormais na fonte ou nas ventoinhas",
      "Lentidão e travamentos ao abrir programas",
      "Superaquecimento e desligamentos por proteção",
      "Erros após queda de energia",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "Meu PC liga mas não dá imagem, o que pode ser?", answer: "Pode ser memória, placa de vídeo, fonte ou placa-mãe. O diagnóstico isola o componente responsável antes de qualquer troca." },
      { question: "O computador reinicia sozinho, é grave?", answer: "Nem sempre. Costuma estar ligado a superaquecimento, fonte instável, memória ou software. Avaliamos para identificar a causa correta." },
      { question: "Vocês fazem limpeza e troca de pasta térmica?", answer: "Sim. A limpeza interna e a manutenção da refrigeração ajudam a reduzir travamentos e desligamentos por temperatura." },
      { question: "Atendem em domicílio?", answer: "Sim, em Curitiba e região, com opção de coleta e entrega quando o reparo precisa de bancada." },
      { question: "Vale a pena consertar um PC antigo?", answer: "Depende do custo do reparo e de um upgrade frente ao valor da máquina. Explicamos com transparência quando compensa investir." },
    ],
    relacionados: [
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Formatação", to: "/servicos/formatacao" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 4 ─────────────────────────────────────────────────────────
  "upgrade-ssd-ram": {
    path: "upgrade-ssd-ram",
    trackingKey: "upgrade-ssd-ram",
    metaTitle: "Upgrade de SSD e Memória RAM em Curitiba | Técnico em Curitiba",
    metaDescription:
      "Upgrade de SSD e memória RAM em Curitiba com avaliação de compatibilidade, clonagem e backup. Ganho real de desempenho, sem promessa de milagre. Atendimento via WhatsApp.",
    serviceName: "Upgrade de SSD e Memória RAM",
    serviceDescription:
      "Upgrade de SSD e RAM com avaliação de compatibilidade, clonagem do sistema e backup, para ganho real de desempenho em Curitiba e região.",
    eyebrow: "Desempenho em Curitiba",
    h1: "Upgrade de SSD e memória RAM em Curitiba",
    h1Accent: "ganho real de desempenho",
    intro:
      "Trocar o HD por um SSD e ampliar a memória é o upgrade com melhor custo-benefício para a maioria das máquinas. Avaliamos a compatibilidade e, quando possível, clonamos o sistema para você não perder nada.",
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
      "Trava ao usar várias abas ou aplicativos ao mesmo tempo",
      "Ainda usa HD mecânico (não SSD)",
      "Pouca memória para o uso atual",
      "Máquina boa de processador, mas 'lenta' no dia a dia",
      "Quer melhorar sem trocar de computador",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "SSD faz diferença mesmo?", answer: "Sim, é o upgrade que mais melhora a percepção de velocidade no uso diário. O ganho depende do restante do hardware, então não prometemos porcentagem fixa." },
      { question: "Vou perder meus arquivos ao trocar o disco?", answer: "Quando o disco antigo está legível, fazemos a clonagem ou o backup e transferência dos dados. Backup prévio é sempre recomendado." },
      { question: "Vale a pena dar upgrade em máquina muito antiga?", answer: "Depende. Em equipamento condenado, o upgrade não faz milagre. Avaliamos e dizemos com honestidade quando compensa." },
      { question: "Quanta memória eu preciso?", answer: "Depende do uso. Para tarefas do dia a dia, uma quantidade; para edição e trabalho pesado, outra. Dimensionamos junto com você." },
      { question: "Vocês instalam peça que eu já comprei?", answer: "Podemos avaliar e instalar, verificando a compatibilidade. Se a peça não for adequada, orientamos a melhor opção." },
    ],
    relacionados: [
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 5 ─────────────────────────────────────────────────────────
  "remocao-de-virus": {
    path: "remocao-de-virus",
    trackingKey: "remocao-virus",
    metaTitle: "Remoção de Vírus e Malware em Curitiba | Técnico em Curitiba",
    metaDescription:
      "Remoção de vírus, malware e sequestro de navegador em Curitiba. Limpeza segura, proteção dos seus dados e reinstalação quando necessário. Atendimento via WhatsApp.",
    serviceName: "Remoção de Vírus e Malware",
    serviceDescription:
      "Remoção de vírus, malware e adware com proteção de dados, limpeza do navegador e reinstalação quando necessário, em Curitiba e região.",
    eyebrow: "Segurança em Curitiba",
    h1: "Remoção de vírus e malware em Curitiba",
    h1Accent: "com proteção dos seus dados",
    intro:
      "Pop-ups, lentidão repentina, navegador sequestrado ou avisos estranhos? Fazemos a limpeza de vírus e malware com atenção aos seus dados e orientamos sobre proteção para não acontecer de novo.",
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
      "Navegador com página inicial ou busca trocadas",
      "Lentidão repentina e travamentos",
      "Programas desconhecidos instalados sozinhos",
      "Avisos falsos pedindo pagamento ou ligação",
      "Arquivos bloqueados ou com extensão estranha",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "Vou perder meus arquivos na remoção de vírus?", answer: "O objetivo é preservar seus dados. Em infecções graves, priorizamos o backup antes de intervir e explicamos os riscos com antecedência." },
      { question: "Sempre precisa formatar para remover vírus?", answer: "Não. Muitos casos são resolvidos com limpeza direcionada. A formatação só é indicada quando o sistema está comprometido demais." },
      { question: "Meu navegador foi 'sequestrado', dá para resolver?", answer: "Sim. Removemos extensões e redirecionamentos maliciosos e reconfiguramos o navegador com segurança." },
      { question: "Como evitar pegar vírus de novo?", answer: "Orientamos sobre antivírus, atualizações, downloads seguros e cuidado com anexos e links. A prevenção faz parte do atendimento." },
      { question: "Recebi um aviso pedindo pagamento, é golpe?", answer: "Avisos que pedem pagamento ou ligação urgente costumam ser golpe. Não pague nem ligue: avaliamos o equipamento e orientamos com segurança." },
    ],
    relacionados: [
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 6 ─────────────────────────────────────────────────────────
  "recuperacao-de-dados": {
    path: "recuperacao-de-dados",
    trackingKey: "recuperacao-dados",
    metaTitle: "Recuperação de Dados em Curitiba | HD, SSD e Pendrive | Técnico em Curitiba",
    metaDescription:
      "Recuperação de dados em Curitiba de HD, SSD, pendrive e cartão. Exclusão acidental, sistema que não inicia e falhas. Avaliação primeiro — recuperação não é garantida.",
    serviceName: "Recuperação de Dados",
    serviceDescription:
      "Tentativa de recuperação de dados em HD, SSD, pendrive e cartão de memória, com avaliação inicial e transparência sobre as chances, em Curitiba e região.",
    eyebrow: "Recuperação em Curitiba",
    h1: "Recuperação de dados em Curitiba",
    h1Accent: "avaliação antes de qualquer promessa",
    intro:
      "Apagou arquivos por engano, o sistema não inicia ou o disco parou de ser reconhecido? Avaliamos o dispositivo e explicamos as chances reais. Importante: recuperação de dados não é garantida e insistir por conta própria pode piorar.",
    whatsappMessage: "Olá! Preciso recuperar dados de um HD/SSD/pendrive. Podem avaliar?",
    incluso: [
      { title: "Avaliação do dispositivo", desc: "Análise inicial de HD, SSD, pendrive ou cartão." },
      { title: "Diagnóstico de causa", desc: "Exclusão acidental, corrupção lógica ou falha física." },
      { title: "Chances reais", desc: "Explicamos com honestidade a probabilidade de recuperação." },
      { title: "Cópia segura", desc: "Trabalhamos para não agravar o estado do dispositivo." },
      { title: "Entrega dos dados", desc: "Quando recuperados, entregamos em mídia segura." },
      { title: "Orientação", desc: "Recomendações de backup para evitar novas perdas." },
    ],
    sinais: [
      "Arquivos apagados por engano",
      "Sistema que não inicia mais",
      "HD ou SSD não reconhecido pelo computador",
      "Pendrive ou cartão pedindo formatação",
      "Ruídos anormais vindos do HD",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "A recuperação de dados é garantida?", answer: "Não. Nenhum serviço sério garante 100%. Fazemos a avaliação, explicamos as chances reais e trabalhamos para não piorar o estado do dispositivo." },
      { question: "Apaguei arquivos, o que devo fazer agora?", answer: "Pare de usar o dispositivo imediatamente. Continuar gravando dados reduz muito as chances de recuperação. Traga para avaliação o quanto antes." },
      { question: "Meu HD faz barulho, tem solução?", answer: "Ruído pode indicar falha física, que é mais delicada. Não insista em ligar: isso pode agravar. Avaliamos o caso com cuidado." },
      { question: "Recuperam dados de pendrive e cartão?", answer: "Avaliamos HD, SSD, pendrive e cartão de memória. Cada mídia tem particularidades e chances diferentes." },
      { question: "Como evitar perder dados de novo?", answer: "Backup regular em mais de um lugar (disco externo e nuvem, por exemplo). Orientamos a melhor rotina para o seu caso." },
    ],
    relacionados: [
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Formatação", to: "/servicos/formatacao" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 7 ─────────────────────────────────────────────────────────
  "redes-e-wifi": {
    path: "redes-e-wifi",
    trackingKey: "redes-wifi",
    metaTitle: "Redes e Wi-Fi em Curitiba | Instalação e Configuração | Técnico em Curitiba",
    metaDescription:
      "Configuração de redes e Wi-Fi em Curitiba: internet instável, roteador, repetidor, cabeamento e rede empresarial. Cobertura melhor em casa e no trabalho. Via WhatsApp.",
    serviceName: "Redes e Wi-Fi",
    serviceDescription:
      "Instalação e configuração de redes e Wi-Fi residenciais e empresariais: roteador, repetidor, cabeamento e estabilidade, em Curitiba e região.",
    eyebrow: "Conectividade em Curitiba",
    h1: "Redes e Wi-Fi em Curitiba",
    h1Accent: "internet estável em casa e na empresa",
    intro:
      "Wi-Fi que cai, sinal fraco em alguns cômodos ou rede instável no trabalho? Avaliamos o ambiente e configuramos roteador, repetidores e cabeamento para melhorar cobertura e estabilidade.",
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
      "Internet lenta mesmo com bom plano",
      "Muitos dispositivos e a rede não aguenta",
      "Necessidade de rede cabeada estável",
      "Rede da empresa instável ou insegura",
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
    atendimento: ATENDIMENTO_PADRAO,
    faqs: [
      { question: "Meu Wi-Fi não pega em todos os cômodos, o que fazer?", answer: "Avaliamos o ambiente e indicamos posicionamento do roteador, repetidores ou sistema mesh para ampliar a cobertura de forma estável." },
      { question: "Repetidor ou mesh, qual é melhor?", answer: "Depende do ambiente. O mesh costuma oferecer transição mais suave; o repetidor pode resolver casos pontuais. Indicamos o adequado após avaliar." },
      { question: "Vocês configuram a rede da minha empresa?", answer: "Sim. Trabalhamos estabilidade, segurança e organização de redes empresariais, com atendimento pontual ou recorrente sob consulta." },
      { question: "Passam cabo de rede?", answer: "Quando faz sentido para estabilidade, avaliamos e realizamos o cabeamento e a organização dos pontos." },
      { question: "A internet continua lenta, é problema de Wi-Fi?", answer: "Pode ser Wi-Fi, roteador, quantidade de dispositivos ou o próprio plano. O diagnóstico separa o que é rede local do que é o provedor." },
    ],
    relacionados: [
      { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Formatação", to: "/servicos/formatacao" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
  },

  // 8 ─────────────────────────────────────────────────────────
  "suporte-tecnico-empresarial": {
    path: "suporte-tecnico-empresarial",
    trackingKey: "suporte-empresarial",
    metaTitle: "Suporte Técnico Empresarial em Curitiba | Técnico em Curitiba",
    metaDescription:
      "Suporte técnico para empresas em Curitiba: estações de trabalho, rede, impressoras, backups e manutenção preventiva. Atendimento pontual ou recorrente sob consulta.",
    serviceName: "Suporte Técnico Empresarial",
    serviceDescription:
      "Suporte de TI para empresas: estações, rede, impressoras, backups e manutenção preventiva, com atendimento pontual ou recorrente em Curitiba e região.",
    eyebrow: "Empresas em Curitiba",
    h1: "Suporte técnico empresarial em Curitiba",
    h1Accent: "menos paradas, mais previsibilidade",
    intro:
      "Empresa parada custa caro. Damos suporte a estações de trabalho, rede, impressoras e rotinas de backup, com atendimento pontual para emergências ou recorrente para prevenir problemas.",
    whatsappMessage: "Olá! Preciso de suporte técnico para minha empresa. Podem atender?",
    incluso: [
      { title: "Estações de trabalho", desc: "Manutenção e configuração dos computadores da equipe." },
      { title: "Rede e conectividade", desc: "Estabilidade, segurança e organização da rede interna." },
      { title: "Impressoras", desc: "Instalação, compartilhamento e solução de problemas de impressão." },
      { title: "Rotinas de backup", desc: "Estruturação de backup para reduzir risco de perda de dados." },
      { title: "Manutenção preventiva", desc: "Rotinas para evitar falhas e paradas inesperadas." },
      { title: "Atendimento recorrente", desc: "Planos de acompanhamento sob consulta, conforme a necessidade." },
    ],
    sinais: [
      "Computadores da equipe lentos ou instáveis",
      "Rede interna caindo e afetando o trabalho",
      "Problemas frequentes de impressão",
      "Falta de rotina de backup confiável",
      "Ausência de manutenção preventiva",
      "Necessidade de um técnico de confiança recorrente",
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
        "Suporte a micro e pequenas empresas: estações, rede, impressoras, backups e manutenção preventiva, com atendimento pontual ou contrato recorrente sob consulta.",
    },
    faqs: [
      { question: "Vocês atendem empresas de qual porte?", answer: "Atendemos principalmente autônomos, escritórios e micro e pequenas empresas em Curitiba e região, de forma pontual ou recorrente." },
      { question: "Como funciona o atendimento recorrente?", answer: "Definimos um escopo conforme a sua necessidade (estações, rede, backups, preventiva) e um formato de acompanhamento. Os valores são sob consulta." },
      { question: "Fazem atendimento de emergência?", answer: "Sim, avaliamos emergências com empresa parada e priorizamos o restabelecimento conforme a disponibilidade." },
      { question: "Cuidam de backup e segurança?", answer: "Ajudamos a estruturar rotinas de backup e boas práticas de segurança para reduzir o risco de perda de dados e paradas." },
      { question: "Resolvem problemas de rede e impressão?", answer: "Sim. Rede instável e problemas de impressão compartilhada estão entre os atendimentos mais comuns em empresas." },
    ],
    relacionados: [
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      ...LINKS_BASE,
    ],
    dateModified: "2026-07-09",
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

/** Slugs herdados que devem redirecionar para os canônicos desta rodada. */
export const SERVICO_REDIRECTS: Record<string, string> = {
  "/servicos/formatacao-computador": "/servicos/formatacao",
  "/servicos/remocao-virus": "/servicos/remocao-de-virus",
  "/servicos/upgrade-ssd-memoria": "/servicos/upgrade-ssd-ram",
  "/servicos/redes-wifi": "/servicos/redes-e-wifi",
  "/servicos/backup-recuperacao": "/servicos/recuperacao-de-dados",
  "/servicos/conserto-pc-notebook": "/servicos/manutencao-de-computador",
  "/servicos/conserto-notebook-curitiba": "/servicos/manutencao-de-notebook",
};
