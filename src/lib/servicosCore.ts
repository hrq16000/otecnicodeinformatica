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
  { step: "4", title: "Valor do atendimento", desc: "Valor apresentado e aprovado por você antes de qualquer serviço." },
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
      { question: "O backup está incluído?", answer: "A cópia dos seus arquivos faz parte do procedimento sempre que o armazenamento permite leitura. Volumes muito grandes, discos com falha ou pedidos de mídia adicional são tratados como escopo à parte e informados antes da execução." },
      { question: "A licença do Windows está incluída?", answer: "Não fornecemos ativação irregular. Máquinas com licença de fábrica normalmente reativam pela chave gravada na placa; quando não existe licença válida, explicamos como regularizar antes de concluir a instalação." },
      { question: "Quais programas são instalados?", answer: "Navegador, leitor de PDF, compactador, antivírus e o pacote de produtividade compatível com o seu uso. Programas específicos de trabalho podem ser instalados desde que você forneça instalador e licença." },
      { question: "É possível recuperar arquivos antes da formatação?", answer: "Na maioria dos casos, sim, e essa é a primeira etapa. Quando o disco apresenta setores defeituosos ou falha de leitura, a prioridade passa a ser preservar os dados, e a reinstalação só é discutida depois disso." },
      { question: "O serviço possui garantia?", answer: "Sim, conforme o serviço executado e as condições publicadas na página de preços e políticas. A garantia cobre o serviço realizado, não novas infecções ou alterações feitas depois da entrega." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Computador lento: investigar o sintoma", to: "/problemas/computador-lento" },
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
        titulo: "Instalação limpa, restauração e o que pode ser preservado",
        paragrafos: [
          "A instalação limpa apaga a partição do sistema e recria tudo do zero: é o caminho quando o Windows está corrompido, quando houve infecção persistente ou quando anos de instalações deixaram a máquina imprevisível. A restauração do próprio fabricante devolve o estado de fábrica, mas traz de volta o conjunto original de programas e nem sempre resolve o problema que motivou o atendimento.",
          "O que costuma ser preservado com a cópia prévia: documentos, fotos, downloads, área de trabalho, favoritos e, quando aplicável, perfis de programas usados no dia a dia. O que não retorna sozinho: programas instalados, configurações internas de sistema e licenças que dependem de chave própria.",
          "Preparação do disco também entra no escopo: verificação da saúde do armazenamento, particionamento adequado e, quando indicado, migração do sistema para SSD. Se o disco estiver com falha de leitura, a reinstalação é interrompida e o assunto passa a ser preservação de dados.",
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
        titulo: "Nem todo computador lento precisa ser formatado",
        paragrafos: [
          "Antes de recomendar a reinstalação do sistema, é necessário diferenciar falhas de software, armazenamento, memória, aquecimento e outros problemas físicos. Formatar um equipamento cujo gargalo é disco no fim da vida ou memória insuficiente devolve alguns dias de melhora e o problema retorna, porque a causa continua no lugar.",
          "Formatação também não corrige fonte defeituosa, bateria, tela, teclado, conector, memória com defeito, armazenamento fisicamente danificado, placa-mãe ou desligamentos por temperatura. Esses cenários pertencem à manutenção de computador ou à manutenção de notebook, conforme o equipamento.",
          "Quando o diagnóstico indica origem física, dizemos isso mesmo que o pedido inicial tenha sido formatar. Reinstalar sistema em máquina com hardware comprometido é o tipo de serviço que gera retrabalho e desconfiança — e não é assim que trabalhamos.",
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
      { question: "Quanto tempo leva a manutenção?", answer: "Serviços simples podem sair conforme a disponibilidade da agenda; reparos que dependem de peça específica levam mais tempo. Informamos o prazo junto com o valor." },
      { question: "Meu notebook não liga. O que devo fazer?", answer: "Teste outra tomada, observe se algum LED acende e remova periféricos externos. Se não houver mudança, evite novas tentativas — principalmente após líquido, queda, cheiro ou aquecimento — e encaminhe para diagnóstico. Os sinais e as causas possíveis estão detalhados na página sobre notebook que não liga." },
      { question: "Notebook aquecendo precisa de limpeza?", answer: "Aquecimento pode estar relacionado a poeira acumulada e pasta térmica ressecada, mas também a ventoinha com desgaste, dissipador obstruído ou uso intenso sem ventilação. A limpeza é indicada depois da avaliação, não antes dela." },
      { question: "Vale a pena trocar SSD ou memória?", answer: "Quando a placa está saudável e o gargalo é disco lento ou memória insuficiente, o upgrade costuma entregar ganho real de desempenho. Isso é avaliado no diagnóstico, junto da compatibilidade do modelo." },
      { question: "A manutenção apaga meus arquivos?", answer: "Serviços de hardware não têm como objetivo apagar dados. Ainda assim, quando há risco envolvido — armazenamento suspeito ou reinstalação de sistema — avisamos antes e tratamos a preservação dos arquivos como etapa separada." },
      { question: "É possível informar o valor sem diagnóstico?", answer: "Não com precisão. O mesmo sintoma pode ter causas de custo muito diferente. Informamos antes as condições comerciais vigentes, publicadas em preços e políticas; o valor do reparo vem depois da causa confirmada e depende da sua autorização." },
      { question: "Peças estão incluídas?", answer: "Não. Peças, componentes e materiais são tratados à parte do serviço e só são adquiridos após a sua aprovação. Informamos se o item é original, paralelo ou recondicionado." },
      { question: "Há garantia?", answer: "Sim, conforme o serviço efetivamente executado e a peça aplicada. As condições de garantia estão descritas na página de preços e políticas." },
    ],
    relacionados: [
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Notebook não liga", to: "/problemas/notebook-nao-liga" },
      { label: "Como funciona o atendimento", to: "/como-funciona" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Coleta e entrega", to: "/coleta-e-entrega" },
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
        titulo: "Quando interromper o uso do notebook",
        paragrafos: [
          "Alguns sinais pedem que o equipamento seja desligado imediatamente: contato com líquido, cheiro de queimado, estalo, fumaça, bateria visivelmente inchada ou carcaça deformada. Nesses cenários, cada nova tentativa de ligar tende a ampliar o dano e a encarecer o reparo.",
          "Outros sinais permitem uso vigiado, mas indicam avaliação próxima: desligamento repentino sob esforço, base muito quente, ventoinha em rotação máxima o tempo todo, travamentos frequentes e ruído metálico vindo do armazenamento. Se houver dados importantes sem cópia, a prioridade passa a ser preservar os arquivos antes de qualquer intervenção.",
          "Quando o notebook simplesmente não dá sinal de energia, a investigação é específica desse sintoma e está detalhada na página sobre notebook que não liga, que explica os testes externos seguros e o que não deve ser tentado em casa.",
        ],
      },
      {
        titulo: "Peças, materiais e segurança dos seus arquivos",
        paragrafos: [
          "Peças e materiais são tratados de forma separada do serviço: só são adquiridos depois da sua aprovação e sempre informamos se o item é original, paralelo ou recondicionado, além da disponibilidade real para o modelo. Nenhuma substituição acontece sem autorização.",
          "Sobre dados: procedimentos de hardware não têm o objetivo de apagar arquivos, mas nenhum equipamento com falha pode ser apresentado como livre de risco. Quando o armazenamento é suspeito ou quando o caso exige reinstalação do sistema, avisamos antes e tratamos a preservação dos arquivos como etapa própria. Intervenções de software, quando indicadas, seguem o escopo da página de formatação.",
          "A garantia acompanha o serviço executado e a peça aplicada, conforme as regras publicadas em preços e políticas — não existe garantia universal para qualquer defeito futuro do aparelho.",
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
      { question: "Computador lento precisa ser formatado?", answer: "Nem sempre. Lentidão pode estar relacionada a disco mecânico no fim da vida, memória insuficiente, temperatura alta ou sistema comprometido. A formatação só é indicada quando a causa é de software; o diagnóstico é o que faz essa separação." },
      { question: "Como saber se o problema é fonte ou placa-mãe?", answer: "Pela descrição não é possível afirmar. No desktop, alimentação e placa são testadas de forma isolada, com componentes conhecidos, para identificar qual dos dois está envolvido antes de qualquer substituição." },
      { question: "O computador pode ser avaliado no local?", answer: "Em parte dos casos, sim. Falhas intermitentes, testes com peças substitutas e reparos que exigem bancada costumam pedir coleta e entrega. A modalidade é definida na triagem, conforme o sintoma." },
      { question: "Vale a pena trocar HD por SSD?", answer: "Quando o restante da plataforma está saudável, a migração para SSD costuma ser o upgrade de melhor retorno. A compatibilidade e o ganho esperado são avaliados no diagnóstico, sem promessa de desempenho de máquina nova." },
      { question: "O diagnóstico inclui peças?", answer: "Não. O diagnóstico identifica a causa; peças, componentes e materiais têm valor à parte e só adquiridos após a sua autorização." },
      { question: "O serviço possui garantia?", answer: "Sim, conforme o serviço executado e a peça aplicada, nas condições publicadas na página de preços e políticas." },
    ],
    relacionados: [
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Montagem de PC e PC Gamer", to: "/servicos/montagem-de-pc" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Computador lento: investigar o sintoma", to: "/problemas/computador-lento" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Como funciona o atendimento", to: "/como-funciona" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
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
        titulo: "Manutenção de computador não é a mesma coisa que formatação",
        paragrafos: [
          "Manutenção de computador concentra o lado físico e a estabilidade: diagnóstico de falhas, energia, componentes, refrigeração, armazenamento, memória, montagem e conexão de partes. É o caminho quando a máquina não liga, trava, reinicia, esquenta, faz ruído ou perde desempenho por limitação de hardware.",
          "Formatação é uma intervenção de software: reinstalação organizada do sistema, preparação do disco, drivers, atualizações e configuração inicial, indicada quando o sistema está comprometido. Ela não corrige fonte defeituosa, memória com falha, disco fisicamente danificado nem aquecimento. Por isso as duas páginas existem separadas, e a indicação vem do diagnóstico — nunca do palpite.",
          "Na prática, os dois serviços podem se encontrar em um mesmo atendimento: substituir um disco no fim da vida e, em seguida, reinstalar o sistema no armazenamento novo. Quando isso acontece, o escopo é explicado item a item antes da autorização.",
        ],
      },
      {
        titulo: "Computadores residenciais e ambientes de empresa",
        paragrafos: [
          "Em casa, o desktop costuma ser usado para estudo, trabalho remoto, edição e jogos. O foco fica em estabilidade, temperatura e desempenho suficiente para o uso real, com atenção ao que já existe na máquina e pode ser aproveitado.",
          "Em empresa, o mesmo defeito tem outro peso: uma estação parada interrompe atendimento, emissão fiscal ou produção. Nesses casos a prioridade é reduzir o tempo de indisponibilidade, padronizar as máquinas e organizar o que precisa de reposição. Ambientes com várias estações, servidores e rede são tratados de forma contínua na página de empresa de TI em Curitiba.",
          "Prevenção também muda de escala: limpeza periódica, revisão de refrigeração, verificação da saúde dos discos e controle de energia evitam paradas repetidas e custos maiores de reparo mais adiante.",
        ],
      },
      {
        titulo: "O que esta página não cobre",
        paragrafos: [
          "Aqui tratamos de computador de mesa. Notebook tem desmontagem, refrigeração e peças próprias e é atendido na página específica de manutenção de notebook.",
          "Também não fazemos reparo em nível de componente na placa-mãe, como retrabalho de BGA ou substituição de chip. Quando o diagnóstico aponta esse caminho, dizemos que o serviço é de laboratório especializado em vez de empurrar uma tentativa cara e incerta.",
          "Não trabalhamos com preço fechado por telefone. Sem ver o comportamento do equipamento, qualquer estimativa seria chute; o valor sai depois da avaliação e só é executado após sua aprovação.",
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
      { question: "SSD deixa qualquer computador rápido?", answer: "Não é uma regra universal. O SSD elimina a espera do disco e muda muito a inicialização e a abertura de programas, mas quem limita a máquina pode ser o processador, a placa ou a quantidade de memória. Avaliamos a configuração antes de indicar a peça e dizemos quando o ganho será pequeno." },
      { question: "Quantos gigabytes de memória eu preciso?", answer: "Depende do uso e do que a placa aceita. Navegação, textos e vídeo pedem menos do que edição, planilhas grandes, máquinas virtuais ou muitas abas simultâneas. Verificamos o padrão suportado, o limite reconhecido pelo equipamento e dimensionamos junto com você, sem empurrar capacidade que não será aproveitada." },
      { question: "É possível manter meus arquivos?", answer: "Na maioria dos casos, sim. Quando o disco de origem é lido sem erro, o conteúdo é migrado por clonagem ou por cópia e restauração. Mesmo assim, recomendamos backup antes: qualquer trabalho sobre disco tem risco, e disco já em falha pode interromper a cópia." },
      { question: "Clonagem é sempre recomendada?", answer: "Não. A clonagem é confortável quando o sistema atual está saudável, porque preserva programas e configurações. Se o sistema já apresentava travamento, infecção ou anos de acúmulo, clonar leva o mesmo problema para dentro do SSD — nesse cenário a instalação limpa entrega um resultado melhor." },
      { question: "Notebook aceita qualquer SSD?", answer: "Não. É preciso confirmar o formato aceito pelo modelo (SATA 2,5 polegadas, M.2 SATA ou M.2 NVMe), se existe slot livre e se a placa reconhece o padrão. Também existem notebooks com armazenamento ou memória soldados, que limitam ou impedem o upgrade — isso é verificado antes de indicar qualquer peça." },
      { question: "A peça está incluída?", answer: "Não. Peças e componentes são informados separadamente da mão de obra, sempre com aprovação antes da compra. Você também pode fornecer o SSD ou a memória que já possui; nesse caso conferimos a compatibilidade antes de instalar." },
      { question: "Vale a pena fazer upgrade em computador antigo?", answer: "Às vezes, sim; às vezes, não. Em máquinas com plataforma muito defasada, o SSD melhora a resposta, mas o restante continua limitando o desempenho. Quando o valor do upgrade se aproxima do valor de um equipamento adequado, dizemos isso abertamente, e o critério está detalhado na página sobre quando não compensa reparar." },
      { question: "O serviço possui garantia?", answer: "A mão de obra segue as condições publicadas na página de preços e políticas, e a peça segue a garantia do fornecedor ou fabricante. Não existe garantia universal para qualquer falha futura do equipamento." },
    ],
    relacionados: [
      { label: "Computador lento: investigar o sintoma", to: "/problemas/computador-lento" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Montagem de PC e PC Gamer", to: "/servicos/montagem-de-pc" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Quando não compensa reparar", to: "/quando-nao-compensa" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Quando o SSD ajuda e quando a memória ajuda",
        paragrafos: [
          "O SSD entra em cena quando a máquina passa o tempo esperando o disco: demora para chegar à área de trabalho, programas que levam segundos para abrir, indicador de disco constantemente saturado. Esse é o cenário clássico de quem ainda usa HD mecânico, e é onde a mudança aparece já no primeiro uso.",
          "A memória resolve outro incômodo: o engasgo em multitarefa. Quando falta espaço, o sistema passa a usar o disco como apoio e tudo trava junto — muitas abas, planilha grande aberta ao lado de reunião, edição de imagem, máquina virtual. Ampliar memória não acelera o que já cabia; evita a parada quando não cabe mais.",
          "Nenhuma das duas peças corrige superaquecimento, fonte perdendo capacidade, disco com setores defeituosos ou sistema comprometido. Se o computador desliga sozinho, esquenta demais ou reinicia em uso pesado, o caminho começa pelo diagnóstico de hardware, não pela loja de peças.",
        ],
      },
      {
        titulo: "HD, SSD SATA e NVMe: o que muda na prática",
        paragrafos: [
          "O HD mecânico depende de partes móveis, e é por isso que domina a lista de gargalos em máquinas antigas: qualquer tarefa que exija muitos acessos pequenos ao disco fica presa esperando. O SSD elimina esse tempo de espera, e é daí que vem a sensação de máquina nova na inicialização, na abertura de programas e na resposta do sistema.",
          "Entre SSD SATA e NVMe existe diferença de barramento, mas o impacto percebido no uso comum é bem menor do que o salto de HD para SSD. Por isso não prometemos número de segundos nem multiplicador de velocidade: indicamos o que o equipamento aceita e o que muda de fato no seu tipo de uso.",
          "Capacidade também entra na conversa. Armazenamento quase cheio degrada a resposta mesmo em SSD, então dimensionamos o tamanho considerando o volume atual de arquivos e o que você pretende guardar, em vez de escolher pelo menor valor da prateleira.",
        ],
      },
      {
        titulo: "Compatibilidade, memória soldada e peças",
        paragrafos: [
          "Nenhuma peça é indicada sem olhar o equipamento. Verificamos qual conexão o modelo aceita (SATA 2,5 polegadas, M.2 SATA ou M.2 NVMe), se há slot livre, o tipo e a frequência da memória suportada, o limite total reconhecido pela placa e se o sistema instalado aproveita o que será colocado.",
          "Existem equipamentos com memória soldada à placa e notebooks finos com um único slot ocupado. Nesses casos o upgrade pode ser parcial ou simplesmente não existir, e é melhor saber disso antes de comprar peça. Também há placas que reconhecem um limite menor do que o anunciado pelo módulo — confirmamos o comportamento real do modelo.",
          "Peças são informadas separadamente da mão de obra e a garantia do componente segue o fornecedor. Você pode fornecer o SSD ou a memória que já possui — nesse caso conferimos a compatibilidade antes de instalar. Não trabalhamos com preço fixo de componente, porque modelo, capacidade e disponibilidade mudam o valor.",
        ],
      },
      {
        titulo: "Clonagem ou instalação limpa?",
        paragrafos: [
          "A clonagem mantém sistema, programas e arquivos como estavam e é a opção mais confortável quando o ambiente atual está saudável. Ela exige que o disco de origem seja lido sem erro: disco em falha pode interromper a cópia no meio do caminho.",
          "A instalação limpa é preferível quando o sistema já apresentava travamento, infecção ou anos de acúmulo — levar esse problema para dentro do SSD apenas deixa o mesmo desconforto mais rápido. Nos dois caminhos, a recomendação é ter uma cópia dos arquivos antes: upgrade é procedimento controlado, mas qualquer trabalho sobre disco tem risco.",
          "O disco antigo costuma ser devolvido a você, e ele pode continuar útil como armazenamento secundário quando estiver saudável. Se a avaliação indicar desgaste, avisamos: manter arquivos importantes em disco com sinal de falha é adiar um problema maior.",
        ],
      },
      {
        titulo: "Quando o upgrade não compensa",
        paragrafos: [
          "Há situações em que preferimos dizer não: plataforma antiga demais para aproveitar o SSD, placa com limite de memória muito baixo, equipamento com defeito estrutural, ou soma de peças que se aproxima do valor de um aparelho adequado ao seu uso. Nessas horas o upgrade só adia a troca e consome dinheiro no meio do caminho.",
          "Também não indicamos upgrade como cura para um sintoma ainda não investigado. Quando a queixa é lentidão, a ordem correta é entender a origem — o caminho está descrito na página sobre computador lento — e só então decidir entre peça, limpeza, reinstalação ou reparo.",
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
      { question: "A recuperação de dados é garantida?", answer: "Não. Nenhum serviço sério garante resultado. Fazemos a avaliação, explicamos as chances reais do seu caso e trabalhamos para não piorar o estado do dispositivo. Quando não há perspectiva técnica, dizemos antes de executar qualquer tentativa." },
      { question: "Apaguei arquivos, o que devo fazer agora?", answer: "Pare de usar o dispositivo imediatamente e não instale programas de recuperação nele. Cada nova gravação pode sobrescrever justamente o que você quer de volta. Desligue, guarde e traga para avaliação o quanto antes." },
      { question: "Meu HD faz barulho, tem solução?", answer: "Ruído repetitivo costuma indicar falha física, que é o cenário mais delicado. Não insista em ligar e desligar: cada tentativa força um hardware já comprometido. A avaliação define se o caso é tratável aqui ou se exige ambiente de laboratório especializado." },
      { question: "Recuperação em SSD é diferente de HD?", answer: "Sim. O SSD gerencia os blocos internamente e descarta dados apagados de forma automática, o que reduz a janela de recuperação em comparação com o HD. Falha de controladora frequentemente encerra o caso. Preferimos explicar esse limite antes de qualquer tentativa." },
      { question: "Vocês veem o conteúdo dos meus arquivos?", answer: "O acesso é limitado ao necessário para confirmar integridade e organizar a entrega, sempre com sua autorização. Não copiamos, divulgamos nem utilizamos conteúdo pessoal, e o material recuperado é entregue em mídia combinada com você." },
      { question: "Quanto tempo demora?", answer: "Depende do tipo de falha, do tamanho da mídia e do estado do dispositivo. Casos lógicos simples costumam ser mais rápidos; mídias com dano físico exigem cópia cuidadosa e podem levar bem mais tempo. O prazo estimado é informado após a avaliação, não antes." },
      { question: "Recuperação é a mesma coisa que backup?", answer: "Não. Recuperação tenta resgatar dados já perdidos e não tem garantia. Backup é preventivo, feito antes de qualquer problema, e custa muito menos. Orientamos uma rotina de backup para você não depender de recuperação." },
      { question: "Como evitar perder dados de novo?", answer: "Mantenha cópia em mais de um lugar — disco externo e nuvem, por exemplo — e confira periodicamente se a cópia realmente abre. Também vale trocar o armazenamento quando ele já mostra sinal de desgaste, em vez de esperar a falha." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Notebook não liga: por onde começar", to: "/problemas/notebook-nao-liga" },
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
          "Alguns cenários exigem terceiros: falha mecânica interna pode demandar ambiente controlado e peças doadoras de laboratório especializado, com prazo e custo próprios. O valor sempre depende do estado real da mídia, avaliado antes, e o acesso ao conteúdo respeita a autorização do cliente e a política de privacidade publicada no site.",
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
      { title: "Impressora e periféricos em rede", desc: "Driver oficial, IP fixo, compartilhamento e fila — apenas conectividade, sem reparo do aparelho." },
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
      { question: "Vocês configuram a rede da minha empresa?", answer: "Sim. Trabalhamos estabilidade, segurança e organização de redes empresariais, com atendimento pontual ou recorrente conforme o escopo definido após a avaliação." },
      { question: "Por que o Wi-Fi cai em alguns ambientes do escritório?", answer: "Normalmente por distância, parede de concreto, divisórias metálicas, excesso de redes vizinhas na faixa de 2,4 GHz ou por um único roteador tentando cobrir toda a área. A medição no local mostra onde o sinal deixa de ser utilizável." },
      { question: "Um roteador mais potente resolve?", answer: "Nem sempre. Potência não vence obstrução física nem congestionamento de canal. Em escritórios, dois pontos bem posicionados costumam entregar mais estabilidade do que um equipamento isolado mais caro." },
      { question: "É necessário instalar cabeamento?", answer: "Depende do layout e do uso. Quando existe passagem viável, levar cabo até o ponto distante é a solução mais estável para setores fixos. Onde não há infraestrutura, avaliamos alternativas sem prometer obra civil." },
      { question: "É possível separar redes de funcionários e visitantes?", answer: "Sim, quando o equipamento suporta rede de visitantes ou segmentação básica. É uma separação de uso, não uma solução completa de segurança corporativa." },
      { question: "Vocês configuram impressoras de rede?", answer: "Sim, dentro do escopo de conectividade: instalação do driver oficial, endereço IP fixo, compartilhamento entre as estações, fila de impressão, descoberta na rede, digitalização em rede quando o modelo suporta e reconexão após troca de roteador. O atendimento de impressoras e periféricos nesta página se limita à configuração, comunicação e compartilhamento em rede. Defeitos mecânicos ou eletrônicos dependem de assistência específica para o equipamento." },
      { question: "Vocês consertam impressora com defeito?", answer: "Não. Reparo mecânico, troca de cabeçote, recarga, manutenção de fusor, reparo eletrônico, conserto de placa e manutenção de plotter estão fora do escopo, assim como o fornecimento de toner e tinta. Se a avaliação apontar falha física do aparelho, informamos e orientamos a assistência do fabricante." },
      { question: "Dá para compartilhar uma pasta ou um disco na rede?", answer: "Sim, para compartilhamento simples entre os computadores do ambiente ou disco ligado ao roteador, dentro do que a estrutura atual permite. Servidor de arquivos com permissões por setor é escopo do suporte técnico empresarial." },
      { question: "Passam cabo de rede?", answer: "Quando faz sentido para estabilidade, avaliamos e realizamos o cabeamento e a organização dos pontos." },
      { question: "O valor pode ser definido sem avaliar o local?", answer: "Não para ambientes empresariais. Cobertura, número de pontos e infraestrutura existente só ficam claros com levantamento no local ou com informações detalhadas da planta e do uso." },
      { question: "Equipamentos estão incluídos?", answer: "Roteadores, access points, switches e cabos são tratados como material à parte. Informamos o que é necessário antes da execução e você decide se fornece ou se compramos conforme autorização." },
      { question: "A internet continua lenta, é problema de Wi-Fi?", answer: "Pode ser Wi-Fi, roteador, quantidade de dispositivos ou o próprio plano. O diagnóstico separa o que é rede local do que é o provedor — falhas da operadora fogem ao nosso reparo." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Suporte para home office", to: "/servicos/suporte-home-office" },
      { label: "Equipamentos atendidos", to: "/equipamentos-atendidos" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Manutenção preventiva para empresas", to: "/servicos/manutencao-preventiva-empresas" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
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
        titulo: "Rede de escritório: cobertura, compartilhamento e continuidade do trabalho",
        paragrafos: [
          "Em empresa o sintoma muda de figura. Não é uma videochamada travando: é o sistema de gestão perdendo conexão no meio do lançamento, a impressora sumindo da lista de dispositivos, o arquivo compartilhado abrindo lento e cinco pessoas paradas ao mesmo tempo. Por isso o levantamento em escritório começa pelo mapa de uso — quantos usuários, onde ficam, quais aplicações dependem da rede e quais setores não podem parar.",
          "Divisórias metálicas, forro técnico, salas de reunião fechadas e vizinhança densa de redes fazem o ponto único de Wi-Fi entregar bem apenas no raio próximo. A saída realista costuma ser distribuir cobertura em dois ou três pontos, cabear os setores fixos e reservar o Wi-Fi para notebooks e celulares, mantendo caixa, servidor local e impressora principal em conexão cabeada.",
          "Também tratamos a parte esquecida: rede de visitantes separada da rede de trabalho, senha de administração dos equipamentos alterada, firmware atualizado, endereços fixos para impressoras e um registro simples do que existe — modelo dos equipamentos, onde está cada ponto e como a rede foi configurada. Sem essa documentação básica, todo atendimento futuro recomeça do zero.",
          "O limite fica explícito antes de começar: não prometemos cobertura perfeita em toda a área, disponibilidade ininterrupta, certificação de cabeamento que não executamos nem administração de equipamentos corporativos fora do que conseguimos suportar. Projetos de maior porte só são discutidos após vistoria no local.",
        ],
      },
      {
        titulo: "Impressoras e periféricos conectados à rede",
        paragrafos: [
          "O atendimento de impressoras e periféricos nesta página se limita à configuração, comunicação e compartilhamento em rede. Defeitos mecânicos ou eletrônicos dependem de assistência específica para o equipamento. Isso significa que trabalhamos com o aparelho que já funciona e precisa ser encontrado, compartilhado ou reconectado — não com reparo do equipamento em si.",
          "O que resolvemos: impressora já funcional que sumiu da rede, compartilhamento entre os computadores da casa ou do escritório, instalação do driver oficial do fabricante, fila de impressão travada, endereço IP fixo para o aparelho parar de trocar de número, descoberta na rede quando um computador enxerga e o outro não, comunicação entre dispositivos e reconexão depois da troca de roteador ou de senha do Wi-Fi. Quando o modelo suporta, também configuramos a conexão Wi-Fi do próprio aparelho e a digitalização em rede.",
          "Armazenamento simples em rede — uma pasta compartilhada entre as estações ou um disco ligado ao roteador — entra no mesmo escopo de conectividade, dentro do que a estrutura atual permite. Estruturas maiores, com servidor de arquivos e controle de permissões por setor, são avaliadas no suporte técnico empresarial.",
          "O que está fora, sem exceção: reparo mecânico, troca de cabeçote, recarga, manutenção de fusor, reparo eletrônico, conserto de placa, manutenção de plotter, suporte universal a equipamento antigo e fornecimento de toner ou tinta. Se a avaliação indicar falha física do aparelho, dizemos isso com clareza e orientamos a procurar a assistência do fabricante, em vez de cobrar por uma tentativa que não resolve.",
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
    dateModified: "2026-08-06",
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
      { question: "O suporte pode ser contratado uma única vez?", answer: "Sim. O atendimento avulso resolve uma demanda específica — máquina parada, usuário sem acesso, impressora fora do ar — sem exigir qualquer vínculo recorrente." },
      { question: "Vocês atendem remotamente?", answer: "Sim, para o que não depende de intervenção física: sistema, configuração, acessos, programas, impressão e boa parte dos incidentes de usuário. Falhas de hardware, rede e infraestrutura exigem visita." },
      { question: "O atendimento inclui programas?", answer: "Inclui instalação, configuração e correção de programas compatíveis, desde que a empresa forneça instalador e licença. Não damos suporte ao funcionamento interno de sistemas de terceiros que possuem fabricante próprio." },
      { question: "Peças estão incluídas?", answer: "Não. Componentes e materiais são tratados à parte, informados antes e substituídos apenas mediante a sua autorização." },
      { question: "Existe prazo garantido?", answer: "Não trabalhamos com prazo de resposta garantido nem plantão. O atendimento é agendado conforme a disponibilidade, e prioridades e prazos, quando aplicáveis, são definidos na contratação do atendimento recorrente." },
      { question: "É possível atender vários computadores?", answer: "Sim. Atendimentos com várias estações são organizados por lote e por prioridade, para que a operação não pare inteira durante o serviço." },
      { question: "Como funciona o faturamento?", answer: "O escopo é definido após o diagnóstico e o valor é apresentado e aprovado antes da execução. As formas de pagamento e as condições aplicáveis estão descritas na página de preços e políticas." },
      { question: "Há garantia?", answer: "Sim, conforme o serviço executado e as condições publicadas em preços e políticas. A garantia cobre o serviço realizado, não novas falhas de causa diferente nem alterações feitas depois da entrega." },
      { question: "Vocês atendem empresas de qual porte?", answer: "Atendemos principalmente autônomos, escritórios, comércios e micro e pequenas empresas em Curitiba e região, de forma avulsa ou recorrente, dentro da nossa capacidade operacional." },
      { question: "Como funciona o atendimento recorrente?", answer: "Definimos escopo, itens acompanhados e periodicidade conforme a necessidade da empresa. Não é suporte ilimitado: o que está incluído e o que é cobrado à parte fica registrado antes de começar." },
      { question: "Fazem atendimento de emergência?", answer: "Avaliamos situações com operação parada e priorizamos o restabelecimento conforme a disponibilidade da agenda. Não mantemos plantão em regime ininterrupto." },
      { question: "Resolvem problemas de rede e impressão?", answer: "Sim, esses estão entre os chamados mais comuns. Casos que envolvem cobertura, cabeamento ou reestruturação da conectividade são conduzidos pela página de redes e Wi-Fi." },
    ],
    relacionados: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Manutenção preventiva para empresas", to: "/servicos/manutencao-preventiva-empresas" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Suporte remoto", to: "/atendimento-remoto" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Como funciona", to: "/como-funciona" },
    ],
    blocoLocal: [
      {
        titulo: "Avulso, recorrente, remoto e presencial: qual formato resolve o seu caso",
        paragrafos: [
          "O chamado avulso existe para o incidente isolado: uma estação que não inicia, um usuário sem acesso à pasta compartilhada, a impressora que sumiu da rede, o sistema de gestão que parou de abrir em uma máquina. Você descreve o caso na triagem, avaliamos, informamos o valor e executamos após a sua aprovação — sem vínculo posterior.",
          "O atendimento recorrente faz sentido quando a empresa já percebeu que o mesmo tipo de chamado se repete todo mês e que a parada custa mais que a manutenção. Nesse formato combinamos escopo, itens acompanhados, periodicidade e prioridades na contratação. É um acordo delimitado, não suporte ilimitado.",
          "O atendimento remoto resolve o que é software, configuração, acesso e usuário, e costuma ser o caminho mais rápido para desbloquear alguém no meio do expediente. O presencial entra quando a causa é física ou está na infraestrutura: hardware, rede, cabeamento, periférico ou equipamento que sequer inicia.",
          "Na prática as empresas alternam entre os quatro. O que evitamos é vender formato: depois do diagnóstico dizemos qual modalidade resolve a sua demanda, mesmo quando a resposta é a mais barata.",
        ],
      },
      {
        titulo: "Do chamado à entrega: autorização, registro e prioridade",
        paragrafos: [
          "Todo atendimento empresarial começa por uma descrição objetiva do incidente: qual máquina, qual usuário, o que mudou, desde quando e o que já foi tentado. Essa triagem reduz tempo perdido e evita deslocamento que não resolve nada.",
          "Nenhum serviço é executado sem autorização. Apresentamos o que foi encontrado, o que precisa ser feito, o que fica fora do escopo e o valor correspondente. Só depois da sua aprovação a execução começa, e o que foi feito é registrado para consulta futura.",
          "Quando existem vários chamados ao mesmo tempo, a prioridade segue o impacto na operação: máquina que trava o faturamento vem antes de ajuste de conforto. Em atendimento recorrente, essa ordem de prioridade é acordada previamente, para não depender de improviso no dia da urgência.",
          "Sobre dados: durante o suporte trabalhamos com o mínimo de acesso necessário, orientamos sobre cópias antes de intervenções de risco e não movimentamos arquivos da empresa sem alinhamento. Não assumimos responsabilidade sobre dados que já estavam sem cópia antes do atendimento, e o tratamento de informações segue o combinado com a empresa.",
        ],
      },
      {
        titulo: "O que este suporte cobre e o que pertence a outra página",
        paragrafos: [
          "Esta página trata da execução do suporte: computadores, usuários, sistemas operacionais, programas compatíveis, periféricos, acessos, impressão, incidentes do dia a dia e manutenção corretiva das estações da equipe.",
          "Reestruturar cobertura de Wi-Fi, cabeamento e segmentação é escopo de redes e Wi-Fi. Organizar rotina de inspeção, inventário e relatório de riscos é escopo de manutenção preventiva para empresas. Estruturar cópias, retenção e teste de restauração é escopo de backup para empresas. E o panorama institucional da nossa atuação com empresas fica no hub Empresa de TI em Curitiba.",
          "Fora da nossa capacidade operacional ficam: administração de infraestrutura corporativa de grande porte, monitoramento contínuo sem contratação específica, atendimento em regime ininterrupto e suporte a plataformas que não conseguimos sustentar com qualidade. Quando a demanda passa desse limite, dizemos na avaliação.",
        ],
      },
    ],
    linksLocais: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    dateModified: "2026-08-06",
  },

  // 9 ─────────────────────────────────────────────────────────
  "manutencao-preventiva-empresas": {
    path: "manutencao-preventiva-empresas",
    trackingKey: "manutencao-preventiva-empresas",
    metaTitle: "Manutenção Preventiva de Computadores em Curitiba | Empresas",
    metaDescription:
      "Manutenção preventiva de computadores para empresas em Curitiba: inventário, inspeção, armazenamento, atualizações e relatório de riscos priorizado, sem promessa de zero falhas.",
    serviceName: "Manutenção Preventiva de Computadores para Empresas",
    serviceDescription:
      "Rotina planejada de inspeção, limpeza quando indicada, verificação de armazenamento, memória, atualizações e riscos das estações de trabalho de empresas em Curitiba e região.",
    eyebrow: "Empresas em Curitiba",
    h1: "Manutenção preventiva de computadores para empresas",
    h1Accent: "menos paradas, decisões planejadas",
    intro:
      "Máquina que trava no meio do expediente raramente falha do nada: quase sempre houve disco no limite, memória insuficiente, temperatura alta ou atualização pendente por meses. A manutenção preventiva empresarial organiza essa rotina — inventário das estações, inspeção, verificação de armazenamento e refrigeração, atualizações e um relatório com prioridades. Ela reduz riscos previsíveis, mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos. Descreva o ambiente pela triagem para avaliarmos o escopo.",
    whatsappMessage: "Olá! Quero avaliar manutenção preventiva dos computadores da minha empresa em Curitiba.",
    incluso: [
      { title: "Inventário básico", desc: "Registro das estações: modelo, configuração, idade estimada e uso principal de cada máquina." },
      { title: "Inspeção do equipamento", desc: "Verificação física e funcional: ruídos, ventilação, conectores, fonte, cabos e sinais de desgaste." },
      { title: "Armazenamento e espaço livre", desc: "Leitura da saúde de HD e SSD dentro das ferramentas disponíveis e checagem do espaço disponível." },
      { title: "Memória e desempenho", desc: "Avaliação do consumo real de memória e do que trava a rotina do usuário durante o expediente." },
      { title: "Limpeza quando indicada", desc: "Limpeza interna e reaplicação de pasta térmica apenas nos equipamentos em que a inspeção justificar." },
      { title: "Sistema e atualizações", desc: "Estado do Windows, atualizações pendentes, inicialização e programas desnecessários acumulados." },
      { title: "Conferência do backup existente", desc: "Verificação de qual cópia existe hoje, onde está e se alguém já testou uma restauração." },
      { title: "Relatório com prioridades", desc: "Lista de riscos encontrados, ordenada por urgência, com recomendação clara para cada item." },
    ],
    sinais: [
      "Estações travando ou reiniciando durante o expediente",
      "Computadores com disco quase cheio e sistema lento",
      "Equipamentos esquentando, com ventoinha barulhenta ou desligando sozinhos",
      "Windows sem atualização há muitos meses",
      "Máquinas com HD mecânico antigo em uso diário",
      "Ninguém sabe quantos computadores existem nem qual a configuração de cada um",
      "Backup que ninguém conferiu ou restaurou desde que foi criado",
      "Falhas que sempre voltam no mesmo equipamento",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Quantidade de estações", desc: "Número de computadores inspecionados e usuários envolvidos no atendimento." },
      { title: "Condição atual dos equipamentos", desc: "Máquinas sem manutenção há anos exigem mais tempo do que um parque já organizado." },
      { title: "Escopo escolhido", desc: "Somente inspeção e relatório, ou inspeção com limpeza, ajustes e correções aplicadas." },
      { title: "Janela de atendimento", desc: "Realizar em horário de menor movimento pode exigir agendamento específico, conforme disponibilidade." },
      { title: "Deslocamento", desc: "Atendimento presencial considera a localização em Curitiba e região metropolitana." },
      { title: "Recorrência", desc: "Rotina periódica combinada altera o planejamento em relação a um atendimento avulso." },
    ],
    atendimento: {
      residencial:
        "Profissionais liberais e home office que dependem de um único computador também usam a rotina preventiva, em escala menor: inspeção, armazenamento, temperatura e conferência do backup.",
      empresarial:
        "Escritórios, comércios e pequenas empresas de Curitiba e região: inventário das estações, inspeção, ajustes e relatório de riscos, em atendimento avulso ou recorrente conforme o escopo definido.",
    },
    faqs: [
      { question: "Com que frequência a manutenção deve ser feita?", answer: "Depende do ambiente. Escritório limpo e com máquinas novas costuma trabalhar bem com revisões semestrais; ambiente com poeira, uso pesado ou equipamentos antigos pede intervalos mais curtos. A frequência é definida após a primeira inspeção, não por regra fixa." },
      { question: "A manutenção preventiva evita todos os defeitos?", answer: "Não. Ela reduz riscos previsíveis — disco no limite, superaquecimento, atualização pendente, desgaste visível — mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos. Componente eletrônico pode falhar sem aviso." },
      { question: "O serviço pode ser feito fora do horário comercial?", answer: "Pode ser agendado fora do horário de maior movimento conforme a disponibilidade da agenda. Não mantemos plantão nem equipe em turno noturno, então esse formato é combinado caso a caso antes da execução." },
      { question: "É necessário parar todos os computadores?", answer: "Não. Trabalhamos por lotes, começando pelas máquinas menos críticas, para que a operação continue. Cada equipamento fica indisponível apenas durante a própria inspeção." },
      { question: "Limpeza está sempre incluída?", answer: "Não. A limpeza interna é executada quando a inspeção indica necessidade — poeira acumulada, temperatura alta, ventoinha ruidosa. Abrir equipamento sem motivo não melhora nada e ainda gera risco desnecessário." },
      { question: "Peças estão incluídas?", answer: "Não. Memória, SSD, fonte, ventoinha e demais componentes são tratados à parte. Quando a inspeção indica troca, informamos o motivo e o custo antes, e nada é substituído sem a sua autorização." },
      { question: "É fornecido relatório?", answer: "Sim. Entregamos a lista dos equipamentos inspecionados com os riscos encontrados e as recomendações em ordem de prioridade, para que a empresa decida o que fazer agora e o que pode esperar." },
      { question: "Pode ser feita em atendimento recorrente?", answer: "Sim. O acompanhamento periódico é definido na contratação, com escopo e intervalo combinados. Não trabalhamos com contrato de suporte ilimitado nem com prazos de resposta garantidos fora do que foi acordado." },
      { question: "A manutenção preventiva melhora o desempenho?", answer: "Melhora quando o problema é software acumulado, disco cheio ou superaquecimento. Quando a limitação é hardware — HD mecânico, memória insuficiente, processador antigo — o ganho real vem de upgrade, e explicamos isso no relatório em vez de prometer resultado." },
      { question: "Vocês cuidam do backup durante a preventiva?", answer: "Conferimos o que existe hoje e apontamos as falhas do processo. Estruturar cópias, definir retenção e testar restauração é escopo da página de backup para empresas, contratado à parte." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],
    blocoLocal: [
      {
        titulo: "Por que preventiva empresarial não é a mesma coisa que consertar quando quebra",
        paragrafos: [
          "Reparo é reativo: alguém abre chamado porque a máquina parou, o técnico diagnostica e resolve aquele equipamento. Preventiva é planejada: olhamos o conjunto antes de qualquer falha, procurando os sinais que antecedem parada — disco chegando ao limite, temperatura fora do normal, atualização travada, memória insuficiente para o que o usuário realmente executa.",
          "A diferença aparece no custo da interrupção. Um HD que falha no meio do fechamento do mês para o setor inteiro e ainda coloca arquivos em risco. O mesmo disco, identificado com antecedência pela leitura de saúde, vira uma troca agendada em horário combinado, com dados migrados sem correria.",
          "Por isso a preventiva não substitui a manutenção corretiva de um equipamento específico, e a página de manutenção de computador continua sendo o caminho quando a máquina já apresenta defeito. Uma organiza a rotina; a outra resolve o problema que já existe.",
        ],
      },
      {
        titulo: "O que o inventário e o relatório entregam na prática",
        paragrafos: [
          "O inventário é o começo de tudo e costuma ser o que a empresa mais sente falta: quantas máquinas existem, qual a configuração de cada uma, quem usa, há quanto tempo estão em serviço e quais ainda rodam HD mecânico. Sem esse mapa, toda decisão de investimento vira palpite e toda compra de emergência sai mais cara.",
          "Com o inventário em mãos, a inspeção ganha objetivo. Verificamos espaço livre e saúde do armazenamento dentro do que as ferramentas disponíveis conseguem ler, consumo de memória no uso real, temperatura e ventilação, estado da inicialização, programas acumulados que ninguém usa mais e atualizações pendentes do sistema.",
          "O resultado vira um relatório curto e priorizado: o que representa risco imediato de parada ou de perda de arquivo, o que deve ser resolvido nos próximos meses e o que apenas merece acompanhamento. Nada de lista genérica — cada item cita o equipamento e o motivo técnico.",
          "Esse documento é também a base da conversa sobre renovação. Quando o custo de manter uma máquina antiga se aproxima do valor de substituí-la, dizemos com clareza, incluindo o cenário de migração dos dados e dos programas de trabalho.",
        ],
      },
      {
        titulo: "Limites honestos da manutenção preventiva",
        paragrafos: [
          "Manutenção preventiva reduz riscos, mas não elimina falhas inesperadas nem substitui backup, segurança e renovação de equipamentos. Fonte, placa, memória e disco podem falhar sem qualquer sinal anterior, e nenhuma inspeção prevê queda de energia, dano por líquido ou erro de usuário.",
          "Também não prometemos ganho garantido de desempenho, vida útil específica para nenhum componente nem prevenção de todos os incidentes. O que entregamos é redução de causa previsível e informação suficiente para a empresa decidir com antecedência.",
          "Ficam fora do escopo: administração de servidores e ambientes que não conseguimos suportar, licenciamento de softwares corporativos, monitoramento contínuo sem contratação específica e atendimento em regime ininterrupto. Quando a demanda passa da nossa capacidade operacional, dizemos isso na avaliação em vez de aceitar o serviço.",
        ],
      },
    ],
    linksLocais: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Atendimento técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Como funciona o atendimento", to: "/como-funciona" },
    ],
    dateModified: "2026-08-06",
  },

  // 10 ────────────────────────────────────────────────────────
  "backup-para-empresas": {
    path: "backup-para-empresas",
    trackingKey: "backup-empresarial",
    metaTitle: "Backup para Empresas em Curitiba | Proteção de Arquivos",
    metaDescription:
      "Backup para empresas em Curitiba: avaliação do que existe hoje, cópia local, cópia externa, nuvem, retenção, versionamento e teste de restauração. Sem promessa de proteção absoluta.",
    serviceName: "Backup para Empresas",
    serviceDescription:
      "Avaliação, configuração e orientação de rotinas de backup para empresas de Curitiba e região: cópia local, cópia externa, nuvem, retenção, versionamento e teste de restauração.",
    eyebrow: "Empresas em Curitiba",
    h1: "Backup para empresas em Curitiba",
    h1Accent: "cópia separada e restauração testada",
    intro:
      "Perder o arquivo de contabilidade, a base do sistema de gestão ou anos de documentos é o tipo de acidente que fecha a semana de uma empresa. Avaliamos o que já existe, apontamos as falhas do processo atual e ajudamos a estruturar cópias em camadas — local, externa e em nuvem — com frequência, retenção e teste de restauração. A regra que orienta todo o serviço é simples: um backup só pode ser considerado confiável quando existe cópia separada e o processo de restauração é testado. Descreva o cenário pela triagem para avaliarmos.",
    whatsappMessage: "Olá! Quero avaliar o backup dos arquivos da minha empresa em Curitiba.",
    incluso: [
      { title: "Diagnóstico do que existe", desc: "Levantamento de onde os arquivos críticos estão hoje e que cópia realmente existe." },
      { title: "Mapa dos dados críticos", desc: "Identificação do que a empresa não pode perder: sistema de gestão, fiscal, contratos e projetos." },
      { title: "Cópia local", desc: "Configuração de rotina em disco ou dispositivo separado da máquina de origem." },
      { title: "Cópia externa", desc: "Orientação para manter uma cópia fora do mesmo ambiente físico da empresa." },
      { title: "Backup em nuvem", desc: "Configuração de rotina em serviço de nuvem compatível, com escopo e responsáveis definidos." },
      { title: "Frequência e retenção", desc: "Definição de quantas vezes copiar e por quanto tempo manter versões anteriores." },
      { title: "Teste de restauração", desc: "Restauração de amostra para confirmar que os arquivos voltam íntegros e utilizáveis." },
      { title: "Registro do processo", desc: "Documento simples com o que é copiado, para onde, com que frequência e quem é o responsável." },
    ],
    sinais: [
      "Arquivos importantes salvos apenas no computador de um usuário",
      "Backup que ninguém restaurou desde que foi criado",
      "Cópia gravada no mesmo disco ou no mesmo computador dos arquivos originais",
      "HD externo que fica permanentemente conectado à mesma máquina",
      "Uso de sincronização em nuvem como se fosse backup",
      "Ninguém sabe dizer quem é o responsável pela rotina de cópia",
      "Empresa já perdeu arquivo por exclusão acidental, falha de disco ou infecção",
      "Base do sistema de gestão sem cópia fora do servidor local",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Volume de dados", desc: "Quantidade de arquivos e o tamanho total a copiar influenciam tempo e estrutura." },
      { title: "Número de origens", desc: "Estações, servidor local e pastas compartilhadas envolvidas na rotina." },
      { title: "Camadas escolhidas", desc: "Somente cópia local, local mais externa ou combinação com nuvem." },
      { title: "Frequência e retenção", desc: "Cópias diárias com histórico longo exigem mais espaço e mais planejamento." },
      { title: "Recursos já existentes", desc: "Aproveitar dispositivos e contas que a empresa já possui reduz o escopo do serviço." },
      { title: "Teste e acompanhamento", desc: "Verificação periódica da rotina é definida na contratação, conforme o escopo acordado." },
    ],
    atendimento: {
      residencial:
        "Profissionais autônomos que guardam trabalho no próprio notebook seguem a mesma lógica em escala menor: uma cópia local, uma cópia fora do equipamento e uma restauração de teste.",
      empresarial:
        "Escritórios, comércios e pequenas empresas de Curitiba e região: avaliação do processo atual, estruturação das cópias em camadas, definição de responsáveis e teste de restauração.",
    },
    faqs: [
      { question: "Google Drive ou OneDrive já são backup?", answer: "Não por si só. Esses serviços são de sincronização: se um arquivo é apagado, corrompido ou criptografado por um vírus na máquina, a alteração se propaga para a nuvem. Eles ajudam quando o versionamento e a lixeira estão configurados e conhecidos, mas continuam sendo uma camada, não o backup completo." },
      { question: "Quantas cópias a empresa deve ter?", answer: "A prática mais aceita é manter pelo menos duas cópias além do original, em mídias ou serviços diferentes, e uma delas fora do ambiente físico da empresa. Adaptamos essa regra ao volume, aa verba disponível para infraestrutura e à criticidade dos arquivos." },
      { question: "O backup precisa ficar fora da empresa?", answer: "Uma das cópias sim. Incêndio, furto, dano elétrico e infecção que se espalha pela rede atingem tudo que está no mesmo local e conectado. A cópia externa é justamente o que sobra quando o pior acontece no endereço." },
      { question: "Como saber se a restauração funciona?", answer: "Testando. Selecionamos uma amostra representativa, restauramos em local separado e conferimos se os arquivos abrem íntegros. Backup nunca testado é apenas uma suposição, e é assim que a maioria das empresas descobre o problema no pior momento." },
      { question: "Backup protege contra ransomware?", answer: "Ajuda, e é a defesa mais efetiva na prática, desde que exista cópia desconectada ou com versionamento que o ataque não consiga alterar. Cópia permanentemente conectada à mesma rede pode ser criptografada junto. Não prometemos proteção absoluta contra ataque." },
      { question: "Quem deve ter acesso?", answer: "O menor número possível de pessoas, com responsável nomeado e substituto definido. Acesso amplo à rotina de cópia aumenta o risco de exclusão acidental e de exposição de dados sensíveis." },
      { question: "O serviço inclui armazenamento?", answer: "Não. Discos, dispositivos e planos de nuvem são contratados pela empresa. Indicamos o que é compatível com o volume e o uso, e configuramos a rotina sobre o recurso escolhido, sem oferecer armazenamento ilimitado." },
      { question: "Vocês garantem que os arquivos sempre voltam?", answer: "Não. Backup reduz o risco de perda, mas nenhuma rotina elimina totalmente a possibilidade de falha. Quando o arquivo já foi perdido e não existe cópia, o caminho é a avaliação de recuperação de dados, que também não tem resultado assegurado." },
      { question: "Backup atende às exigências da LGPD?", answer: "Backup é uma das medidas técnicas que apoiam a proteção de dados, mas conformidade não é automática: depende de políticas internas, base legal, controle de acesso e tratamento adequado dos dados pessoais pela própria empresa. Não emitimos declaração de conformidade." },
      { question: "Com que frequência a cópia deve ser feita?", answer: "Pela pergunta inversa: quanto trabalho a empresa aceita refazer. Se refazer um dia inteiro é inviável, a rotina precisa ser diária ou mais frequente. Definimos frequência e retenção junto com você, em vez de aplicar um padrão único." },
    ],
    relacionados: [
      { label: "Suporte técnico empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Manutenção preventiva para empresas", to: "/servicos/manutencao-preventiva-empresas" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Como funciona", to: "/como-funciona" },
    ],
    blocoLocal: [
      {
        titulo: "Sincronizar não é copiar: a confusão que mais causa perda de arquivo",
        paragrafos: [
          "A empresa instala uma pasta sincronizada, vê o ícone verde e considera o assunto resolvido. O problema é que sincronização replica o estado atual: se alguém apaga a pasta de contratos, a exclusão sobe para a nuvem em segundos. Se um ransomware criptografa os arquivos da estação, a versão criptografada substitui a boa no serviço.",
          "Backup verdadeiro guarda cópias em pontos diferentes no tempo, em local separado, com histórico que permite voltar ao dia anterior à falha. Versionamento é o que transforma uma pasta em nuvem em algo próximo de backup — e, mesmo assim, precisa estar ativado, com prazo de retenção conhecido e alguém sabendo como recuperar.",
          "A régua que usamos é objetiva: um backup só pode ser considerado confiável quando existe cópia separada e o processo de restauração é testado. Enquanto essas duas condições não estiverem atendidas, a empresa tem sensação de segurança, não segurança.",
        ],
      },
      {
        titulo: "Camadas de cópia, frequência e retenção no cenário de uma pequena empresa",
        paragrafos: [
          "A cópia local é a mais rápida para restaurar e resolve os incidentes mais comuns: exclusão acidental, arquivo corrompido, falha de uma estação. Ela precisa ficar em disco ou dispositivo diferente do que guarda os originais — cópia na mesma máquina desaparece junto com ela.",
          "A cópia externa é a que sobrevive ao incidente do endereço: furto, incêndio, dano elétrico, infecção que se espalha pela rede. Pode ser um disco que sai da empresa em rodízio ou um serviço em nuvem contratado, desde que a rotina seja verificada e não dependa de alguém lembrar de executar manualmente.",
          "Frequência e retenção saem de duas perguntas: quanto trabalho a empresa aceita refazer se perder o dia, e por quanto tempo pode precisar de uma versão antiga. Fiscal e contábil normalmente exigem histórico longo; arquivos operacionais do dia a dia costumam pedir alta frequência com retenção mais curta.",
          "Fecha o desenho a definição de responsáveis: quem executa, quem confere, quem é avisado se a rotina falhar e quem tem acesso aos dados sensíveis. Rotina sem dono é rotina que para sem ninguém perceber, e só aparece no dia da emergência.",
        ],
      },
      {
        titulo: "Backup previne, recuperação de dados é a tentativa depois da perda",
        paragrafos: [
          "São serviços diferentes e é importante não confundir. Backup atua antes: organiza cópias para que a perda tenha um custo pequeno e previsível. Recuperação de dados atua depois, quando o disco falhou, o arquivo sumiu ou o sistema não inicia, e o resultado nunca é garantido — depende do estado físico e lógico da mídia.",
          "Toda empresa que passa por uma recuperação bem-sucedida faz a mesma pergunta ao final: como evitar isso de novo. A resposta é sempre a rotina de cópia. Toda empresa que passa por uma recuperação sem sucesso descobre o custo real de não ter tido essa rotina.",
          "Também deixamos claro o que não fazemos: não prometemos proteção absoluta, resultado assegurado na recuperação de arquivos, conformidade automática com a LGPD, armazenamento ilimitado nem monitoramento contínuo da rotina sem contratação específica. O escopo é definido após o diagnóstico e executado mediante a sua autorização.",
        ],
      },
    ],
    linksLocais: [
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Como funciona o atendimento", to: "/como-funciona" },
    ],
    dateModified: "2026-08-06",
  },

  // 11 ────────────────────────────────────────────────────────
  "suporte-home-office": {
    path: "suporte-home-office",
    trackingKey: "suporte-home-office",
    metaTitle: "Suporte Técnico para Home Office em Curitiba",
    metaDescription:
      "Suporte técnico para quem trabalha em casa em Curitiba: computador lento, Wi-Fi instável, câmera e microfone em reuniões, e-mail, arquivos e preparação do posto de trabalho.",
    serviceName: "Suporte Técnico para Home Office",
    serviceDescription:
      "Suporte técnico para profissionais em home office em Curitiba e região: equipamento, conexão, reuniões, e-mail, arquivos e organização do posto de trabalho, com atendimento remoto ou no local.",
    eyebrow: "Home office em Curitiba",
    h1: "Suporte técnico para home office em Curitiba",
    h1Accent: "para quem depende do computador para trabalhar",
    intro:
      "Quando o trabalho acontece em casa, uma falha de computador, de internet ou de microfone deixa de ser um incômodo e vira hora parada. Este serviço é para o profissional que precisa da máquina, da conexão, das ferramentas de reunião e dos arquivos funcionando todos os dias. Avaliamos o posto de trabalho inteiro — equipamento, rede, periféricos e rotina de arquivos — e resolvemos o que for possível remotamente, indo até o endereço quando o caso exige avaliação física. O que depende de sistema, política ou credencial da sua empresa é sempre tratado com a autorização de quem responde por ele.",
    whatsappMessage: "Olá! Trabalho em home office e preciso de suporte técnico no meu computador.",
    incluso: [
      { title: "Avaliação do posto de trabalho", desc: "Computador, conexão, periféricos e rotina de arquivos analisados em conjunto, não isoladamente." },
      { title: "Desempenho do equipamento", desc: "Investigação de lentidão, travamento e aquecimento no uso real do seu dia de trabalho." },
      { title: "Internet e Wi-Fi", desc: "Verificação de sinal, posicionamento do roteador, interferência e alternativa por cabo quando faz sentido." },
      { title: "Reuniões online", desc: "Câmera, microfone, saída de áudio e permissões ajustados nas ferramentas que você já utiliza." },
      { title: "E-mail e arquivos", desc: "Configuração de contas, organização de pastas e acesso aos documentos de trabalho." },
      { title: "Impressora já compatível", desc: "Reinstalação e ajuste de impressora que já funciona no seu ambiente doméstico." },
      { title: "Monitor e periféricos", desc: "Segundo monitor, teclado, mouse, headset e dock configurados para a sua rotina." },
      { title: "Orientação de continuidade", desc: "O que fazer quando algo falha no meio do expediente e como reduzir o tempo parado." },
    ],
    sinais: [
      "Computador lento justamente nas horas de maior trabalho",
      "Notebook aquecendo e perdendo desempenho durante reuniões longas",
      "Wi-Fi que oscila e derruba chamadas de vídeo",
      "Câmera ou microfone que não são reconhecidos pela ferramenta de reunião",
      "E-mail que parou de sincronizar depois de uma atualização",
      "Arquivos de trabalho espalhados sem cópia nenhuma",
      "Computador novo que precisa ser preparado para começar a trabalhar",
      "Posto de trabalho improvisado, com cabos, monitor e periféricos mal resolvidos",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Modalidade do atendimento", desc: "Casos compatíveis com acesso remoto costumam ser mais rápidos que a visita ao endereço." },
      { title: "Quantidade de itens", desc: "Um ajuste pontual é diferente de preparar computador, rede, periféricos e arquivos." },
      { title: "Estado do equipamento", desc: "Máquina antiga, disco mecânico ou sistema corrompido exigem etapas adicionais." },
      { title: "Rede do imóvel", desc: "Cobertura difícil, paredes e distância do roteador podem exigir avaliação no local." },
      { title: "Dependência de terceiros", desc: "Quando o caso depende do provedor ou do setor de TI da empresa, o prazo deixa de ser só nosso." },
      { title: "Deslocamento", desc: "Atendimento presencial considera a localização em Curitiba e região metropolitana." },
    ],
    atendimento: {
      residencial:
        "Profissionais autônomos e empregados em regime remoto: avaliação do computador, da conexão e das ferramentas de trabalho no próprio endereço ou por acesso remoto autorizado.",
      empresarial:
        "Empresas que precisam apoiar colaboradores em casa: atendemos o usuário e o equipamento, sempre dentro do que a empresa autoriza. Estrutura, servidores e política de TI seguem no suporte técnico empresarial.",
    },
    faqs: [
      { question: "Vocês atendem profissionais em home office?", answer: "Sim. É exatamente o foco desta página: quem trabalha de casa e depende do computador, da internet e das ferramentas de reunião para produzir. Atendemos tanto autônomos quanto colaboradores de empresas, respeitando as regras do equipamento corporativo." },
      { question: "O atendimento pode ser remoto?", answer: "Pode, sempre que o computador liga, o sistema carrega e existe conexão estável. Configuração, e-mail, programas, ajustes de reunião e orientação são resolvidos por acesso remoto autorizado. Falha física, equipamento que não liga ou rede indisponível exigem avaliação presencial." },
      { question: "É possível melhorar o Wi-Fi de casa?", answer: "Em muitos casos sim, com reposicionamento do roteador, mudança de canal, atualização de firmware, uso de cabo no posto de trabalho ou inclusão de um ponto adicional de cobertura. O que não conseguimos alterar é o link contratado com o seu provedor." },
      { question: "Vocês configuram câmera e microfone para reuniões?", answer: "Sim. Ajustamos dispositivo de entrada e saída, permissões do sistema, drivers e as configurações dentro das ferramentas de reunião que você já usa. Se o problema for o próprio hardware, indicamos isso na avaliação." },
      { question: "É possível configurar a VPN da minha empresa?", answer: "Somente com a documentação e a autorização da empresa responsável. Seguimos a instrução fornecida pelo setor de TI; não alteramos política corporativa, não recriamos credencial e não contornamos controle de acesso." },
      { question: "O técnico pode alterar o computador corporativo?", answer: "Apenas dentro do que a empresa proprietária autorizar. Máquinas corporativas costumam ter controle, perfis e restrições próprias. Sem autorização, limitamos o atendimento ao que não interfere nessas regras e orientamos o caminho correto." },
      { question: "Backup está incluído no atendimento?", answer: "A cópia dos seus arquivos é avaliada caso a caso e informada antes da execução. Orientação sobre onde guardar e como manter uma cópia faz parte do atendimento; estruturar rotina completa de backup é escopo próprio, tratado na página de backup." },
      { question: "Como funciona a disponibilidade de agenda?", answer: "Os horários variam conforme a agenda e a modalidade escolhida. Não prometemos disponibilidade imediata: descreva o caso pela triagem no WhatsApp para conferirmos os horários realmente livres e combinarmos o atendimento." },
    ],
    relacionados: [
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Backup para empresas", to: "/servicos/backup-para-empresas" },
      { label: "Segurança dos dados", to: "/seguranca-dos-dados" },
      { label: "Computador lento: causas e correções", to: "/problemas/computador-lento" },
      { label: "Notebook que não liga: diagnóstico", to: "/problemas/notebook-nao-liga" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
    ],

    blocoLocal: [
      {
        titulo: "A dependência tecnológica de quem trabalha em casa",
        paragrafos: [
          "No escritório, quando algo para, quase sempre existe outra máquina, outro cabo e alguém do suporte no andar de baixo. Em casa, o profissional é ao mesmo tempo usuário e responsável pela infraestrutura: o computador é dele, a internet é dele e a solução precisa aparecer no meio do expediente. É por isso que tratamos home office como um contexto próprio, e não apenas como mais um atendimento residencial.",
          "A conta é direta. Uma manhã sem conexão estável derruba reuniões, atrasa entregas e, em muitos casos, custa mais do que o próprio atendimento técnico. O objetivo aqui não é deixar o equipamento bonito: é reduzir a chance de parada e encurtar o tempo de retorno quando alguma coisa falha.",
          "Por isso avaliamos o posto de trabalho como um conjunto. Computador, roteador, cabeamento, periféricos de áudio e vídeo, contas de e-mail e local dos arquivos formam uma cadeia — e o elo mais fraco é quem define a experiência do seu dia.",
        ],
      },
      {
        titulo: "Os problemas mais comuns e o que cada um costuma indicar",
        paragrafos: [
          "Lentidão que aparece justamente com vários programas abertos costuma apontar para memória insuficiente ou disco mecânico ainda como sistema. Notebook que esquenta e perde desempenho no meio da reunião aponta para ventilação obstruída e pasta térmica ressecada. Cada sintoma pede uma investigação diferente, e nenhuma delas se resolve com palpite ao telefone.",
          "Wi-Fi instável é o campeão de reclamação no home office e raramente tem uma causa única: distância do roteador, parede de concreto, canal congestionado no prédio, firmware antigo ou simplesmente um aparelho antigo demais para a quantidade de dispositivos conectados. Quando o posto de trabalho permite, o cabo continua sendo a solução mais confiável para chamadas de vídeo.",
          "Câmera e microfone que somem em reuniões geralmente envolvem permissões do sistema, dispositivo de entrada errado selecionado ou driver desatualizado. E-mail que parou de sincronizar costuma ser conta reconfigurada, senha alterada ou verificação em duas etapas ativada sem o ajuste correspondente no aplicativo.",
          "Já os arquivos merecem atenção separada. É muito comum encontrar anos de trabalho salvos apenas na pasta de documentos de um único notebook, sem nenhuma cópia. Nesse cenário, qualquer falha de disco deixa de ser problema técnico e vira prejuízo direto.",
        ],
      },
      {
        titulo: "Limites do atendimento em home office",
        paragrafos: [
          "Existe uma fronteira clara que respeitamos: o que pertence à sua empresa é decidido pela sua empresa. Não alteramos política corporativa, não removemos controle de acesso, não desbloqueamos credencial, não configuramos VPN sem documentação do setor responsável e não instalamos software proprietário sem licença ou acesso legítimo.",
          "Também não prometemos recuperação imediata da produtividade nem acesso a sistemas empresariais dos quais não somos responsáveis. Quando a causa está no provedor de internet, na plataforma da empresa ou em uma conta administrada por terceiros, o nosso papel é diagnosticar, documentar e orientar o caminho — não improvisar uma solução que crie risco maior.",
          "Quando o problema envolve estrutura da organização, servidores, rede corporativa ou vários colaboradores ao mesmo tempo, o caminho correto é o suporte técnico empresarial. Home office trata do posto de trabalho individual; a página empresarial trata da estrutura que sustenta a operação inteira.",
        ],
      },
      {
        titulo: "Suporte remoto imediato: como funciona o fluxo pelo WhatsApp",
        paragrafos: [
          "Quando o computador liga, o sistema carrega e existe conexão, boa parte dos problemas de home office pode ser tratada sem visita. O fluxo é sempre o mesmo e começa pelo WhatsApp: você descreve o sintoma, informa o bairro e diz há quanto tempo o problema aparece. Essa triagem inicial serve para separar o que é ajuste de configuração do que exige avaliação física.",
          "Confirmada a viabilidade remota, combinamos o horário e enviamos o link do programa de acesso. A sessão só abre com a sua autorização explícita, acontece com você acompanhando a tela e é encerrada ao final do atendimento — nada permanece instalado rodando em segundo plano sem que você saiba.",
          "Durante a sessão explicamos o que está sendo verificado e o que foi alterado. Se, no meio do caminho, ficar claro que a causa é física — disco em falha, memória com defeito, superaquecimento, rede do imóvel — interrompemos o remoto e encaminhamos para visita ou bancada, sem cobrar duas vezes pela mesma triagem.",
          "O que não fazemos remotamente: instalar peça, avaliar ruído e temperatura de perto, resolver equipamento que não liga e contornar credencial ou política do setor de TI da sua empresa. Nesses casos o caminho correto é o atendimento em domicílio.",
        ],
      },
      {
        titulo: "Casos técnicos recorrentes em home office: antes e depois",
        paragrafos: [
          "Notebook que arrastava com planilha e navegador abertos ao mesmo tempo, disco mecânico ainda como sistema e 4 GB de memória: antes, cada troca de programa parava o trabalho por segundos. Depois da migração para SSD e do reforço de memória, o mesmo equipamento passou a abrir o ambiente de trabalho em poucos segundos. É o cenário mais frequente que encontramos e quase sempre dispensa comprar máquina nova.",
          "Reunião derrubando a cada vinte minutos com o roteador na sala e o posto de trabalho no quarto dos fundos: antes, o sinal chegava fraco e disputado com dezenas de redes vizinhas. Depois do ajuste de canal, reposicionamento e cabo até a mesa, a chamada de vídeo deixou de cair. Nada disso muda o link contratado com o provedor — muda o que acontece dentro do imóvel.",
          "Microfone reconhecido pelo sistema mas mudo na ferramenta de reunião: antes, a suspeita era headset com defeito. Depois da verificação de permissão do aplicativo e da seleção do dispositivo de entrada correto, o mesmo headset voltou a funcionar. Trocar equipamento sem diagnóstico é o gasto mais comum e mais evitável do home office.",
          "Estes são padrões de atendimento, não promessa de resultado: o desfecho de cada caso depende do estado real do equipamento e é apresentado a você depois do diagnóstico, antes de qualquer execução.",
        ],
      },
      {
        titulo: "Segurança dos dados de quem trabalha em casa: ransomware, backup e recuperação",
        paragrafos: [
          "No home office, o mesmo computador guarda contrato, proposta, planilha de cliente e arquivo pessoal — em geral sem nenhuma cópia fora dele. Basta uma falha de disco, um furto ou um arquivo criptografado por ransomware para que anos de trabalho desapareçam de uma vez. É por isso que tratamos cópia de arquivos como parte do atendimento, e não como assunto opcional.",
          "Pasta sincronizada em nuvem não é backup por si só: se o arquivo é apagado ou criptografado na sua máquina, a alteração sobe para o serviço. Backup de verdade guarda versões em pontos diferentes no tempo, em local separado, e permite voltar ao estado anterior à falha. Quando o versionamento existe no serviço que você já usa, mostramos como ativá-lo e por quanto tempo o histórico é mantido.",
          "A régua que aplicamos é objetiva e verificável: existe cópia em dispositivo separado do original, existe histórico com data anterior ao incidente e a restauração já foi testada pelo menos uma vez. Enquanto essas três condições não estiverem atendidas, o que existe é sensação de segurança.",
          "Se a perda já aconteceu, o assunto muda de nome: passa a ser recuperação de dados, feita depois do incidente, com resultado que depende do estado físico e lógico da mídia e sem garantia de sucesso. Não prometemos descriptografar arquivos atingidos por ransomware nem recuperar conteúdo sobrescrito.",
        ],
      },
      {
        titulo: "Triagem rápida de sintomas: descreva e nós direcionamos",
        paragrafos: [
          "Computador lento no expediente: se a lentidão aparece com poucos programas abertos e o disco fica em uso constante, a investigação começa por armazenamento e memória. Esse sintoma tem página própria com as causas e as opções de correção em computador lento.",
          "Travando ou reiniciando sozinho: quando o travamento vem acompanhado de barulho de ventoinha, calor na base ou tela azul, a suspeita é térmica ou de hardware, e a avaliação precisa ser presencial. Notebook que sequer inicia entra no roteiro de notebook que não liga.",
          "Vírus, pop-up e navegador sequestrado: anúncios que voltam sozinhos, página inicial trocada e extensões desconhecidas indicam infecção ativa. Nesse caso a prioridade é remover a ameaça e preservar os arquivos antes de qualquer reinstalação — o caminho é a remoção de vírus, e a formatação só entra se a limpeza não sustentar o resultado.",
          "Em todos os casos o passo inicial é o mesmo: descreva o sintoma pelo WhatsApp, informe o bairro e diga se o equipamento é de uso pessoal ou fornecido pela empresa. Com essas três informações já indicamos se o atendimento pode ser remoto ou se exige visita, antes de você perder tempo esperando.",
        ],
      },
    ],

    linksLocais: [
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "Atendimento em domicílio", to: "/atendimento-domicilio" },
      { label: "Segurança dos dados", to: "/seguranca-dos-dados" },
      { label: "Equipamentos atendidos", to: "/equipamentos-atendidos" },
    ],
    dateModified: "2026-08-06",
  },

  // 12 ────────────────────────────────────────────────────────
  // MONTAGEM DE PC (Rodada 3L) — construir e validar um conjunto novo.
  // Não compete com manutenção (reparo) nem com upgrade (modernização).
  "montagem-de-pc": {
    path: "montagem-de-pc",
    trackingKey: "montagem-de-pc",
    metaTitle: "Montagem de PC e PC Gamer em Curitiba | Compatibilidade e Testes",
    metaDescription:
      "Montagem e configuração de computadores em Curitiba: verificação de compatibilidade, instalação dos componentes, BIOS, sistema, drivers e testes antes da entrega. Peças do cliente aceitas.",
    serviceName: "Montagem de PC e PC Gamer",
    serviceDescription:
      "Montagem, configuração e avaliação técnica de computadores desktop, PC Gamer e estações de trabalho em Curitiba e região, com verificação de compatibilidade, organização dos componentes e testes antes da entrega.",
    eyebrow: "Montagem em Curitiba",
    h1: "Montagem de PC e PC Gamer em Curitiba",
    h1Accent: "com verificação de compatibilidade e testes antes da entrega",
    intro:
      "Montagem e configuração de computadores com verificação de compatibilidade, organização dos componentes e testes antes da entrega. Atendemos quem já comprou as peças, quem ainda está definindo a configuração e quem tem uma montagem feita por conta própria que ficou instável. O trabalho aqui é montar certo e comprovar que o conjunto liga, reconhece tudo e se mantém estável sob carga — não prometer número de quadros por segundo nem desempenho de jogo. Descreva o seu caso pela triagem no WhatsApp para começarmos pela verificação da configuração.",
    whatsappMessage: "Olá! Quero montar/configurar um computador. Posso enviar a lista de peças para avaliação?",
    incluso: [
      { title: "Verificação de compatibilidade", desc: "Socket, chipset, geração, memória suportada, dimensões, conectores e alimentação conferidos antes da montagem." },
      { title: "Montagem física", desc: "Instalação e fixação de processador, memória, placa-mãe, armazenamento, placa de vídeo e fonte no gabinete." },
      { title: "Refrigeração a ar", desc: "Cooler, pasta térmica, posição das ventoinhas e fluxo de ar organizados conforme o gabinete." },
      { title: "Organização interna", desc: "Passagem e amarração dos cabos dentro do que o gabinete permite, sem obstruir a ventilação." },
      { title: "BIOS e firmware", desc: "Configuração básica, ordem de inicialização, reconhecimento do armazenamento e perfil de memória quando suportado." },
      { title: "Sistema e drivers", desc: "Instalação legítima do sistema e drivers oficiais dos componentes instalados." },
      { title: "Bateria de testes", desc: "Memória, armazenamento, temperatura sob carga, estabilidade, portas, rede, áudio e vídeo." },
      { title: "Registro do atendimento", desc: "Componentes instalados, configurações aplicadas e testes executados registrados por escrito." },
    ],
    sinais: [
      "Peças já compradas e nenhuma confiança para montar sozinho",
      "Lista de componentes montada na internet sem certeza de compatibilidade",
      "PC montado em casa que liga, mas reinicia ou trava sob carga",
      "Máquina nova que não reconhece toda a memória ou o segundo SSD",
      "Gabinete com cabos soltos e temperatura alta desde o primeiro dia",
      "Computador de trabalho que precisa ser preparado antes de entrar em uso",
      "Peças aproveitadas de outro computador sem saber o que ainda serve",
      "Estação de trabalho que precisa de levantamento de requisitos antes da compra",
    ],
    processo: PROCESSO_PADRAO,
    fatoresValor: [
      { title: "Quantidade de componentes", desc: "Uma montagem simples é diferente de um conjunto com várias unidades de armazenamento, ventoinhas e periféricos." },
      { title: "Estado das peças", desc: "Componentes usados, sem acessórios ou com dano prévio exigem verificação adicional antes da instalação." },
      { title: "Compatibilidade", desc: "Configurações com peças de gerações diferentes pedem conferência mais profunda e podem exigir troca de item." },
      { title: "Firmware e configuração", desc: "Atualização autorizada de BIOS e ajustes específicos acrescentam etapas ao serviço." },
      { title: "Complexidade e refrigeração", desc: "Gabinete apertado, muitos cabos e solução térmica mais elaborada aumentam o tempo de bancada." },
      { title: "Sistema, drivers e testes", desc: "Instalação do sistema, drivers e a bateria de testes solicitada entram na composição do valor." },
      { title: "Correções de montagem anterior", desc: "Refazer uma montagem instável envolve diagnóstico antes da correção." },
      { title: "Modalidade", desc: "Bancada, atendimento no endereço ou coleta e entrega mudam a logística do atendimento em Curitiba e região." },
    ],
    atendimento: {
      residencial:
        "Uso doméstico, jogos e criação de conteúdo: montagem com as suas peças ou apoio para fechar a configuração antes da compra, com entrega testada e sistema pronto para uso.",
      empresarial:
        "Estações de trabalho e computadores de escritório: montagem padronizada, registro dos componentes por máquina e configuração alinhada ao uso do posto de trabalho. Estrutura de rede e rotina de TI seguem no suporte técnico empresarial.",
    },
    faqs: [
      { question: "Vocês montam PC com peças compradas pelo cliente?", answer: "Sim, e é o cenário mais comum. Antes de agendar, conferimos a compatibilidade a partir dos modelos exatos que você comprou. No recebimento registramos o estado de cada item, incluindo acessórios e cabos que vieram na caixa. Peça com defeito de fábrica é acionada por você junto ao vendedor ou fabricante — a garantia do componente não é nossa." },
      { question: "Vocês ajudam a verificar se as peças são compatíveis?", answer: "Sim. Avaliamos socket e chipset entre processador e placa-mãe, geração e capacidade de memória suportadas, espaço físico do gabinete para cooler e placa de vídeo, conectores disponíveis para armazenamento e alimentação da GPU, além do consumo estimado do conjunto. Se algo não fecha, explicamos o que precisa mudar antes de você comprar." },
      { question: "É possível montar um PC Gamer?", answer: "É. Montamos desktops com placa de vídeo dedicada, incluindo configurações voltadas para jogos e criação de conteúdo. O que não fazemos é prometer quantidade de quadros por segundo, percentual de ganho ou ausência de gargalo: o desempenho depende do conjunto escolhido, do jogo, da resolução e das configurações usadas. Nosso compromisso é montagem correta, refrigeração adequada e estabilidade comprovada em teste." },
      { question: "Vocês atualizam a BIOS?", answer: "Somente quando existe motivo técnico, como suporte a um processador mais novo, e com a sua autorização registrada. A gravação de firmware tem risco real: uma interrupção de energia pode inutilizar a placa. Por isso trabalhamos com a versão estável publicada pelo fabricante e, em placas sem recurso de recuperação, não atualizamos sem o seu aceite expresso do risco." },
      { question: "O sistema operacional está incluído?", answer: "A instalação do sistema faz parte do serviço quando você solicita, mas a licença é fornecida ou adquirida por você. Instalamos apenas sistema legítimo e não realizamos ativação irregular. Se preferir receber a máquina apenas montada e testada, sem sistema, isso também é possível." },
      { question: "Os drivers são instalados?", answer: "Sim, sempre a partir dos pacotes oficiais do fabricante de cada componente: chipset, vídeo, áudio, rede e armazenamento. Evitamos instaladores genéricos de terceiros, que costumam ser a origem de instabilidade em máquinas recém-montadas." },
      { question: "Vocês realizam testes antes da entrega?", answer: "Sim, e informamos exatamente quais. Verificamos o reconhecimento de todos os componentes, inicialização repetida e partida a frio, teste de memória com ciclo definido, estado e leitura do armazenamento, temperatura sob carga controlada, estabilidade por período definido e o funcionamento de portas USB, áudio, vídeo e rede. Teste com duração limitada não substitui o uso prolongado, e dizemos isso abertamente." },
      { question: "A garantia cobre defeito das peças?", answer: "Não. A nossa garantia é de 90 dias sobre a mão de obra do serviço executado: instalação, fixação, conexões, organização interna e configuração entregue funcionando. Peças e componentes seguem a garantia do fornecedor ou fabricante. Também ficam fora da cobertura alterações feitas depois pelo usuário, overclock, uso inadequado e dano por oscilação elétrica." },
      { question: "É possível aproveitar peças de outro computador?", answer: "Em muitos casos sim, principalmente gabinete, fonte em bom estado, armazenamento e, dependendo da geração, memória. A verificação é individual: componente antigo pode limitar o conjunto ou simplesmente não ser compatível com a plataforma nova. Avaliamos e dizemos o que vale aproveitar e o que é melhor substituir." },
      { question: "O valor pode ser informado antes de verificar a configuração?", answer: "Não de forma fechada. O serviço varia com a quantidade e o estado das peças, a complexidade do gabinete, a solução de refrigeração, a instalação de sistema e drivers, a bateria de testes e a modalidade de atendimento. Depois da verificação da configuração, apresentamos o escopo e o valor por escrito — e nada é executado sem a sua aprovação." },
    ],
    relacionados: [
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
      { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-ram" },
      { label: "Equipamentos atendidos", to: "/equipamentos-atendidos" },
      { label: "Coleta e entrega", to: "/coleta-e-entrega" },
      { label: "Suporte para home office", to: "/servicos/suporte-home-office" },
      { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
      ...LINKS_BASE,
    ],
    blocoLocal: [
      {
        titulo: "Para quem esta montagem é indicada",
        paragrafos: [
          "O serviço atende quatro situações bem diferentes. A primeira é a de quem já comprou tudo, abriu as caixas e travou na hora de encaixar: as peças estão certas, mas falta segurança para manusear processador, cooler e alimentação sem risco. A segunda é a de quem ainda não comprou e precisa de alguém para conferir a lista antes de gastar, evitando a combinação que só aparece errada quando a máquina não dá vídeo.",
          "A terceira é a de quem montou por conta própria e ficou com um computador que liga, mas reinicia sob carga, esquenta demais, não reconhece toda a memória ou perde o segundo SSD. Nesse caso o trabalho começa como diagnóstico da montagem existente, não como montagem nova. A quarta é a de empresa e profissional que precisa de estação de trabalho preparada e registrada, com os mesmos critérios aplicados em todas as máquinas.",
          "Usos técnicos específicos — renderização profissional, inteligência artificial, CAD, engenharia, edição em resoluções muito altas, servidor — não são tratados como capacidade pronta aqui. São contextos que exigem levantamento de requisitos antes de qualquer definição de componentes, e é assim que conduzimos a conversa.",
        ],
      },
      {
        titulo: "Avaliação de compatibilidade: o que é conferido antes de montar",
        paragrafos: [
          "Compatibilidade não é uma checagem única, são várias camadas. Processador e placa-mãe precisam compartilhar socket e chipset, e a geração do processador precisa constar na lista de suporte da placa — em algumas combinações, o suporte só existe a partir de determinada versão de firmware. A memória tem que respeitar tipo, capacidade por módulo e quantidade de módulos que aquela placa aceita, e o perfil de velocidade anunciado na caixa só se aplica quando a placa suporta oficialmente esse perfil.",
          "Depois vem o espaço físico, que é onde as listas feitas na internet costumam falhar: altura do cooler contra a lateral do gabinete, comprimento da placa de vídeo contra a gaiola de discos, formato da fonte, posição dos conectores frontais. Conectores também contam — quantas portas de armazenamento a placa oferece, se o slot de armazenamento rápido divide banda com outro slot, e se a fonte tem os conectores de alimentação que a placa de vídeo exige.",
          "Por fim, a alimentação. Estimamos o consumo do conjunto pelos componentes declarados e avaliamos se a fonte tem margem para os picos de carga. Quando algum ponto não fecha, você recebe a informação antes da compra ou antes da montagem, com a alternativa correspondente. Essa conferência é documental e física; depende dos modelos exatos informados, e é por isso que pedimos a lista completa na triagem.",
        ],
      },
      {
        titulo: "Fonte, refrigeração e gabinete: as três decisões que mais causam instabilidade",
        paragrafos: [
          "Potência nominal escrita na caixa da fonte não define qualidade nem compatibilidade. O que importa é o consumo real dos componentes somado a uma margem de trabalho, a existência dos conectores certos para a placa de vídeo, a presença de proteções contra sobrecarga e curto, o formato físico que cabe no gabinete e o estado de conservação quando a peça é reaproveitada. Fonte no limite é a causa silenciosa de reinício sob carga em boa parte das montagens que chegam para correção.",
          "Refrigeração a ar é a solução que executamos e comprovamos: cooler adequado ao processador, pasta térmica aplicada corretamente, ventoinhas posicionadas para criar um caminho coerente de entrada e saída de ar, espaço interno livre e cabos fora do fluxo. Temperatura, porém, não tem número universal: depende do ambiente, da carga aplicada, da poeira acumulada com o tempo e da própria peça. Medimos sob carga controlada e mostramos o resultado, sem prometer uma temperatura fixa.",
          "O gabinete entra nessa conta mais do que a maioria imagina. Modelo com pouca entrada de ar frontal, painel fechado e sem passagem traseira de cabos limita qualquer configuração. Quando o gabinete escolhido restringe o conjunto, dizemos isso na avaliação em vez de montar e deixar o problema para você descobrir em julho, no primeiro dia quente.",
        ],
      },
      {
        titulo: "BIOS, sistema, drivers e organização interna",
        paragrafos: [
          "Com a máquina montada, a configuração começa na BIOS/UEFI: reconhecimento de todos os componentes, ordem de inicialização, detecção correta dos dispositivos de armazenamento e ativação do perfil de memória quando a placa suporta esse perfil oficialmente. Não realizamos overclock, não aplicamos modificação não oficial de firmware e não alteramos nada fora do que o fabricante suporta.",
          "Atualização de firmware é exceção, não rotina. Só acontece quando existe motivo técnico claro e com autorização registrada, usando a versão estável publicada pelo fabricante. O risco é real: interrupção de energia durante a gravação pode inutilizar a placa. Em placa sem recurso de recuperação, explicamos o cenário e só seguimos com o seu aceite expresso — caso contrário, buscamos outro caminho.",
          "Na sequência vem o sistema, instalado de forma legítima com licença fornecida por você, e os drivers, sempre baixados dos sites oficiais dos fabricantes dos componentes. Instalador genérico de terceiros é justamente o que costuma gerar tela azul em máquina nova. A organização dos cabos fecha a montagem: passagem pelos caminhos que o gabinete oferece, amarração discreta e nenhum cabo cruzando a frente das ventoinhas.",
        ],
      },
      {
        titulo: "Testes executados, correção de montagem instável e limites do serviço",
        paragrafos: [
          "Antes da entrega, a máquina passa por uma sequência definida: conferência do reconhecimento de todos os componentes, inicializações repetidas incluindo partida a frio, teste de memória com ciclo determinado, verificação do estado e da leitura dos dispositivos de armazenamento, carga controlada de processador e placa de vídeo com acompanhamento de temperatura, estabilidade por período definido e checagem de portas USB, áudio, vídeo e rede. Você recebe a lista do que foi testado — evitamos a expressão vaga de teste completo, porque teste sem escopo declarado não significa nada.",
          "Quando o caso é uma montagem feita por outra pessoa, a ordem muda: primeiro isolamos a causa. Reinício sob carga, ausência de vídeo, memória não reconhecida e ruído anormal têm origens distintas, e cada uma é verificada com componente conhecido antes de qualquer substituição. Só depois do diagnóstico existe proposta de correção, sempre com escopo e valor aprovados por você.",
          "Os limites também são claros. Montagem correta não é sinônimo de desempenho máximo: um conjunto bem montado entrega o que aqueles componentes conseguem entregar, e nenhuma montagem elimina a limitação de uma peça. Não fornecemos peças de estoque próprio, não trabalhamos com catálogo fechado de componentes e não indicamos marca sem base técnica. Peças adquiridas a pedido dependem da sua autorização de item, valor e fornecedor, e são cobradas à parte da mão de obra.",
        ],
      },
    ],
    dateModified: "2026-08-06",
  },
};

/** Ordem canônica exibida no hub /servicos. */
export const SERVICOS_CORE_ORDER = [
  "formatacao",
  "manutencao-de-notebook",
  "manutencao-de-computador",
  "montagem-de-pc",
  "upgrade-ssd-ram",
  "remocao-de-virus",
  "recuperacao-de-dados",
  "redes-e-wifi",
  "suporte-tecnico-empresarial",
  "manutencao-preventiva-empresas",
  "backup-para-empresas",
  "suporte-home-office",
] as const;
