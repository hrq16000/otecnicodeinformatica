import type { ServiceFaq } from "@/components/ServiceLandingSchema";

// ─────────────────────────────────────────────────────────────
// Camada de SEO LOCAL dos serviços core.
// Conteúdo aprofundado (headings + parágrafos), FAQ de intenção local
// e links internos contextuais (bairros, cidades e problemas próximos).
// Sem inventar rating, endereço físico, equipe fixa por bairro ou
// tempo de chegada garantido. Mantém a linguagem honesta do site.
// ─────────────────────────────────────────────────────────────

export interface ServicoLocalData {
  blocoLocal: { titulo: string; paragrafos: string[] }[];
  faqsLocais: ServiceFaq[];
  linksLocais: { label: string; to: string }[];
}

// Regiões âncora reutilizadas (bairros indexáveis + cidades da RMC).
const REGIOES = [
  { label: "Técnico em Curitiba", to: "/tecnico-informatica-curitiba" },
  { label: "Técnico no Batel", to: "/bairros/batel" },
  { label: "Técnico no CIC", to: "/bairros/cic" },
  { label: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais" },
  { label: "Pinhais", to: "/tecnico-informatica-pinhais" },
  { label: "Colombo", to: "/tecnico-informatica-colombo" },
  { label: "Araucária", to: "/tecnico-informatica-araucaria" },
];

export const SERVICOS_LOCAL: Record<string, ServicoLocalData> = {
  // 1 ── FORMATAÇÃO ────────────────────────────────────────────
  formatacao: {
    blocoLocal: [
      {
        titulo: "Formatação de computador em Curitiba com backup dos arquivos",
        paragrafos: [
          "Se você procura formatação de computador em Curitiba feita com cuidado, o ponto de partida é sempre o backup. Antes de reinstalar o Windows, copiamos documentos, fotos, planilhas e o que mais for importante para você, e só depois começamos a formatação de fato. Assim você não corre o risco de perder anos de arquivos por causa de uma reinstalação apressada.",
          "Atendemos formatação de PC de mesa e formatação de notebook em Curitiba e região metropolitana, tanto em domicílio quanto por coleta e entrega. Trabalhamos com Windows 10 e Windows 11 originais, drivers atualizados e os programas essenciais do dia a dia (navegador, pacote de produtividade, leitor de PDF e antivírus) já configurados na entrega.",
        ],
      },
      {
        titulo: "Quando formatar resolve — e quando não vale a pena",
        paragrafos: [
          "Formatar costuma resolver lentidão por acúmulo de programas, sistema corrompido, infecções persistentes e travamentos de software. Combinada com um SSD, a diferença de velocidade fica bem perceptível. Ainda assim, não prometemos porcentagem fixa de ganho: o resultado depende do hardware da máquina.",
          "Quando o problema é físico (HD com falha, superaquecimento, fonte instável), a formatação sozinha não resolve. Nesses casos, explicamos com honestidade o que está acontecendo e indicamos o serviço correto — manutenção, upgrade de SSD ou recuperação de dados — sem empurrar reinstalação desnecessária.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Vocês fazem formatação de computador em domicílio em Curitiba?", answer: "Sim. Fazemos formatação a domicílio em Curitiba e região, com horário agendado, ou por coleta e entrega do equipamento quando você preferir. Em ambos os casos o backup dos seus dados é feito antes de reinstalar o sistema." },
      { question: "Qual o valor da formatação de PC ou notebook em Curitiba?", answer: "O diagnóstico começa a partir de R$ 99,99 e o valor final da formatação depende do volume de backup, do tipo de equipamento e dos programas específicos que você usa. Você aprova o orçamento antes de qualquer serviço." },
      { question: "A formatação inclui a instalação do Windows e dos programas?", answer: "Sim. Entregamos com Windows 10 ou 11 ativado, drivers instalados, navegador, antivírus e pacote de produtividade configurados conforme o seu uso." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Computador lento", to: "/computador-lento-curitiba" },
      { label: "Windows lento", to: "/windows-lento-curitiba" },
      { label: "Computador com vírus", to: "/computador-com-virus-curitiba" },
    ],
  },

  // 2 ── MANUTENÇÃO DE NOTEBOOK ────────────────────────────────
  "manutencao-de-notebook": {
    blocoLocal: [
      {
        titulo: "Conserto e assistência técnica de notebook em Curitiba",
        paragrafos: [
          "Precisa de conserto de notebook em Curitiba com diagnóstico honesto? Antes de trocar qualquer peça, avaliamos hardware e software para descobrir a causa real do problema. Notebook esquentando, lento, com tela, teclado ou bateria com defeito passam pelo mesmo processo: primeiro entender, depois orçar — nunca o contrário.",
          "Nossa assistência técnica de notebook em Curitiba cobre as marcas mais comuns do mercado (Dell, Acer, Lenovo, Samsung, Positivo, HP, Asus, entre outras) e atende tanto residências quanto profissionais em home office. O atendimento é feito em domicílio ou por coleta e entrega em Curitiba e região metropolitana.",
        ],
      },
      {
        titulo: "Onde consertar notebook em Curitiba e região",
        paragrafos: [
          "Atendemos os principais bairros de Curitiba — Batel, Água Verde, Centro, Bigorrilho, Cabral, Boa Vista, CIC e Boqueirão — além de São José dos Pinhais, Pinhais, Colombo e Araucária. Você fala pelo WhatsApp, descreve o sintoma do notebook e combinamos o formato de atendimento mais prático para o seu caso.",
          "Os serviços mais procurados são limpeza interna com troca de pasta térmica (para notebook que esquenta e desliga sozinho), troca de tela e dobradiça, substituição de teclado e bateria, e upgrade de SSD e memória para ganho de desempenho. Reparos de bancada, como conserto de placa, têm prazo e valor informados antes de retirar o equipamento.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Onde consertar meu notebook em Curitiba?", answer: "Atendemos toda Curitiba e região metropolitana em domicílio ou por coleta e entrega. Basta descrever o problema pelo WhatsApp que orientamos o próximo passo e o formato de atendimento ideal." },
      { question: "Quanto custa a assistência técnica de notebook em Curitiba?", answer: "O diagnóstico começa a partir de R$ 99,99. O valor final depende do modelo do notebook, da peça necessária (tela, teclado, bateria, dobradiça) e da complexidade do reparo. Você só aprova depois de saber o valor." },
      { question: "O conserto de notebook é feito no mesmo dia?", answer: "Serviços simples, como limpeza interna e troca de pasta térmica, muitas vezes saem no mesmo dia. Reparos que dependem de peça específica levam mais tempo, e informamos o prazo no orçamento." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Notebook não liga", to: "/notebook-nao-liga-curitiba" },
      { label: "Notebook lento", to: "/notebook-lento-curitiba" },
      { label: "Tela de notebook quebrada", to: "/notebook-com-tela-quebrada-curitiba" },
      { label: "Notebook com água", to: "/notebook-com-agua-ou-liquido-curitiba" },
    ],
  },

  // 3 ── MANUTENÇÃO DE COMPUTADOR ──────────────────────────────
  "manutencao-de-computador": {
    blocoLocal: [
      {
        titulo: "Manutenção e conserto de computador de mesa em Curitiba",
        paragrafos: [
          "Para manutenção de computador em Curitiba, o diagnóstico vem primeiro. Desktop que trava, reinicia sozinho, não dá vídeo ou faz barulho pode ter causas bem diferentes — fonte, memória, armazenamento, placa-mãe ou superaquecimento. Testamos cada parte para isolar o problema real antes de indicar qualquer troca de peça.",
          "Atendemos PCs de casa, de escritório e estações de trabalho de empresas em Curitiba e região metropolitana, com atendimento em domicílio ou coleta e entrega quando o reparo precisa de bancada. A ideia é sempre a mesma: resolver o que precisa ser resolvido, sem custo desnecessário.",
        ],
      },
      {
        titulo: "Computador lento ou travando: quando é manutenção e quando é upgrade",
        paragrafos: [
          "Nem todo computador lento precisa de reparo caro. Muitas vezes, a lentidão vem de HD mecânico antigo, pouca memória ou sistema sobrecarregado — casos que se resolvem com limpeza, formatação ou upgrade de SSD e RAM. Avaliamos e explicamos a opção com melhor custo-benefício para a sua máquina.",
          "Já travamentos, desligamentos por temperatura e telas azuis costumam indicar hardware pedindo atenção: limpeza interna, revisão da refrigeração, teste de fonte e memória. Em Curitiba, esse tipo de manutenção preventiva evita que um problema pequeno vire prejuízo maior.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Vocês fazem manutenção de computador a domicílio em Curitiba?", answer: "Sim. Atendemos em domicílio em Curitiba e região com horário agendado, e também por coleta e entrega quando o reparo exige bancada." },
      { question: "Meu PC vive travando em Curitiba, o que pode ser?", answer: "Travamentos costumam estar ligados a superaquecimento, fonte instável, memória ou software. Fazemos o diagnóstico para identificar a causa correta antes de qualquer orçamento." },
      { question: "Quanto custa a manutenção de computador em Curitiba?", answer: "O diagnóstico começa a partir de R$ 99,99 e o valor final depende do componente afetado e da necessidade de peça. Nada é executado sem a sua aprovação." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Computador não liga", to: "/computador-nao-liga-curitiba" },
      { label: "Computador travando", to: "/computador-travando-curitiba" },
      { label: "PC superaquecendo", to: "/pc-superaquecendo-curitiba" },
      { label: "Tela preta", to: "/computador-com-tela-preta-curitiba" },
    ],
  },

  // 4 ── UPGRADE SSD/RAM ───────────────────────────────────────
  "upgrade-ssd-ram": {
    blocoLocal: [
      {
        titulo: "Upgrade de SSD e memória RAM em Curitiba",
        paragrafos: [
          "Trocar o HD por um SSD e ampliar a memória é o upgrade com melhor custo-benefício para deixar o computador rápido em Curitiba. Se a sua máquina demora para ligar, trava ao abrir várias abas ou ainda usa HD mecânico, o ganho de velocidade com SSD é imediato e perceptível no dia a dia.",
          "Antes de indicar qualquer peça, verificamos a compatibilidade do seu equipamento — tipo de SSD (SATA ou NVMe), limite de memória e suporte da placa. Quando possível, clonamos o Windows para o novo disco, para que você não precise reinstalar tudo nem perder seus programas e configurações.",
        ],
      },
      {
        titulo: "Vale a pena dar upgrade no seu computador?",
        paragrafos: [
          "Em máquinas com bom processador que estão apenas 'lentas', o upgrade de SSD e RAM costuma valer muito mais a pena do que trocar de computador. Já em equipamentos muito antigos ou com defeito de hardware, o upgrade não faz milagre — e dizemos isso com honestidade antes de você gastar.",
          "Atendemos upgrade de notebook e desktop em Curitiba e região metropolitana, em domicílio ou por coleta e entrega. Também avaliamos e instalamos peças que você já comprou, verificando se são realmente compatíveis com o seu equipamento.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Onde fazer upgrade de SSD em Curitiba?", answer: "Fazemos upgrade de SSD e memória em Curitiba e região, em domicílio ou por coleta e entrega. Avaliamos a compatibilidade do seu equipamento antes de indicar as peças." },
      { question: "O upgrade de SSD deixa o computador mais rápido mesmo?", answer: "Sim, é o upgrade que mais melhora a percepção de velocidade no uso diário. O ganho depende do restante do hardware, então avaliamos o seu caso antes de prometer resultado." },
      { question: "Vou perder meus arquivos ao trocar para SSD?", answer: "Quando o disco antigo está legível, fazemos a clonagem ou o backup e a transferência dos dados. Backup prévio é sempre recomendado." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Computador lento", to: "/computador-lento-curitiba" },
      { label: "Notebook lento", to: "/notebook-lento-curitiba" },
      { label: "Vale a pena consertar?", to: "/vale-a-pena-consertar-computador" },
    ],
  },

  // 5 ── REMOÇÃO DE VÍRUS ──────────────────────────────────────
  "remocao-de-virus": {
    blocoLocal: [
      {
        titulo: "Remoção de vírus e malware em Curitiba",
        paragrafos: [
          "Pop-ups sem parar, navegador com página inicial trocada, lentidão repentina ou avisos estranhos pedindo pagamento? Fazemos remoção de vírus e malware em Curitiba com atenção aos seus dados. A limpeza é direcionada para preservar seus arquivos sempre que o estado do sistema permite.",
          "Além de remover a infecção, reconfiguramos o navegador, tiramos extensões e redirecionamentos maliciosos e deixamos o antivírus e as boas práticas de segurança em ordem — para não acontecer de novo. Atendemos residências e empresas em Curitiba e região, em domicílio ou por coleta e entrega.",
        ],
      },
      {
        titulo: "Nem todo vírus exige formatação",
        paragrafos: [
          "Muita gente acha que precisa formatar para remover vírus, mas grande parte dos casos se resolve com limpeza específica, sem perder nada. A formatação só entra quando o sistema está comprometido demais — e, mesmo nesse cenário, priorizamos o backup dos seus dados antes de qualquer coisa.",
          "Se você recebeu um aviso pedindo pagamento urgente ou uma ligação para 'resolver' o computador, desconfie: normalmente é golpe. Não pague nem ligue. Avaliamos o equipamento com segurança e orientamos o caminho certo.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Vocês fazem remoção de vírus a domicílio em Curitiba?", answer: "Sim. Atendemos em domicílio em Curitiba e região, e também por coleta e entrega. A limpeza é feita preservando seus dados sempre que possível." },
      { question: "Preciso formatar para remover o vírus?", answer: "Não necessariamente. Muitos casos são resolvidos com limpeza direcionada. A formatação só é indicada quando o sistema está comprometido demais, sempre com backup antes." },
      { question: "Meu navegador foi sequestrado, dá para resolver em Curitiba?", answer: "Sim. Removemos extensões e redirecionamentos maliciosos e reconfiguramos o navegador com segurança, deixando a máquina protegida." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Computador com vírus", to: "/computador-com-virus-curitiba" },
      { label: "Windows lento", to: "/windows-lento-curitiba" },
      { label: "Computador lento", to: "/computador-lento-curitiba" },
    ],
  },

  // 6 ── RECUPERAÇÃO DE DADOS ──────────────────────────────────
  "recuperacao-de-dados": {
    blocoLocal: [
      {
        titulo: "Recuperação de dados em Curitiba: HD, SSD, pendrive e cartão",
        paragrafos: [
          "Apagou arquivos por engano, o sistema parou de iniciar ou o disco não é mais reconhecido? Fazemos avaliação para recuperação de dados em Curitiba de HD, SSD, pendrive e cartão de memória. Importante ser transparente: recuperação de dados não é garantida, e insistir por conta própria pode reduzir muito as chances.",
          "O primeiro passo é avaliar o dispositivo e identificar se a falha é lógica (exclusão, corrupção, formatação) ou física (dano no hardware, ruídos). Com base nisso, explicamos as chances reais antes de qualquer tentativa e trabalhamos para não agravar o estado da mídia.",
        ],
      },
      {
        titulo: "O que fazer ao perder arquivos importantes",
        paragrafos: [
          "Se você apagou dados ou o disco começou a falhar, pare de usar o dispositivo imediatamente. Cada novo arquivo gravado pode sobrescrever justamente o que você quer recuperar. Se o HD faz barulho, não insista em ligar — isso costuma piorar um dano físico.",
          "Atendemos Curitiba e região com avaliação honesta e cópia cuidadosa. Quando os dados são recuperados, entregamos em mídia segura, e sempre orientamos uma rotina de backup (disco externo e nuvem) para você não passar de novo pelo susto.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Onde recuperar dados de HD ou SSD em Curitiba?", answer: "Fazemos a avaliação em Curitiba e região. Trazemos o dispositivo para análise, explicamos as chances reais e só então seguimos com a tentativa de recuperação." },
      { question: "A recuperação de dados tem garantia?", answer: "Não. Nenhum serviço sério garante 100% de recuperação. Fazemos a avaliação, explicamos as chances com honestidade e trabalhamos para não piorar o estado do dispositivo." },
      { question: "Apaguei arquivos importantes, o que faço agora?", answer: "Pare de usar o dispositivo imediatamente para não sobrescrever os dados e traga para avaliação o quanto antes. Quanto menos uso após a perda, maiores as chances." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Computador não liga", to: "/computador-nao-liga-curitiba" },
      { label: "Upgrade de SSD e RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Formatação", to: "/servicos/formatacao" },
    ],
  },

  // 7 ── REDES E WI-FI ─────────────────────────────────────────
  "redes-e-wifi": {
    blocoLocal: [
      {
        titulo: "Configuração de redes e Wi-Fi em Curitiba",
        paragrafos: [
          "Wi-Fi que cai, sinal fraco em alguns cômodos ou internet instável no trabalho? Fazemos configuração de rede e Wi-Fi em Curitiba avaliando o ambiente antes de indicar solução. Muitas vezes o problema não é o plano de internet, e sim o posicionamento do roteador, interferências ou excesso de dispositivos na rede.",
          "Configuramos roteador, repetidores e sistemas mesh para ampliar a cobertura, além de cabeamento quando faz sentido para estabilidade. Atendemos casas, apartamentos, escritórios e empresas em Curitiba e região metropolitana.",
        ],
      },
      {
        titulo: "Repetidor, mesh ou cabo: o que resolve o seu caso",
        paragrafos: [
          "Não existe solução única para todo ambiente. Em apartamentos e casas com poucos pontos cegos, um repetidor bem posicionado pode bastar. Em imóveis maiores ou com muitas paredes, o sistema mesh costuma oferecer transição mais suave entre os cômodos. Já ambientes que exigem estabilidade máxima pedem cabeamento.",
          "Para empresas em Curitiba, trabalhamos estabilidade, segurança e organização da rede, com atendimento pontual ou recorrente sob consulta. O diagnóstico separa o que é problema de Wi-Fi do que é limitação do provedor.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Vocês configuram Wi-Fi a domicílio em Curitiba?", answer: "Sim. Avaliamos o ambiente no local em Curitiba e região e configuramos roteador, repetidores ou mesh para melhorar cobertura e estabilidade." },
      { question: "Meu Wi-Fi não pega em todos os cômodos, tem solução?", answer: "Sim. Avaliamos posicionamento do roteador, interferências e indicamos repetidor ou sistema mesh conforme o tamanho e o layout do seu ambiente." },
      { question: "Vocês configuram rede de empresa em Curitiba?", answer: "Sim. Trabalhamos estabilidade, segurança e organização de redes empresariais, com atendimento pontual ou recorrente sob consulta." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
    ],
  },

  // 8 ── SUPORTE EMPRESARIAL ───────────────────────────────────
  "suporte-tecnico-empresarial": {
    blocoLocal: [
      {
        titulo: "Suporte técnico de informática para empresas em Curitiba",
        paragrafos: [
          "Empresa parada custa caro. Damos suporte técnico de TI para empresas em Curitiba: estações de trabalho da equipe, rede interna, impressoras compartilhadas e rotinas de backup. O atendimento pode ser pontual, para resolver uma emergência, ou recorrente, para prevenir problemas antes que eles parem a operação.",
          "Atendemos principalmente autônomos, escritórios e micro e pequenas empresas em Curitiba e região metropolitana — do Batel ao CIC, passando por São José dos Pinhais, Pinhais e Colombo. O foco é reduzir paradas e trazer previsibilidade para a rotina de tecnologia do negócio.",
        ],
      },
      {
        titulo: "Manutenção preventiva evita a emergência",
        paragrafos: [
          "A maioria das paradas em empresas poderia ser evitada com manutenção preventiva: computadores revisados, backups testados, rede organizada e antivírus em dia. Estruturamos essa rotina conforme o tamanho da sua operação, sem vender pacote que você não precisa.",
          "Quando a emergência acontece — rede caindo, servidor local com problema, equipe sem conseguir imprimir — priorizamos o restabelecimento conforme a disponibilidade. E depois ajudamos a organizar o ambiente para que o mesmo problema não volte.",
        ],
      },
    ],
    faqsLocais: [
      { question: "Vocês atendem empresas de que porte em Curitiba?", answer: "Atendemos principalmente autônomos, escritórios e micro e pequenas empresas em Curitiba e região, de forma pontual ou recorrente sob consulta." },
      { question: "Fazem suporte de TI recorrente em Curitiba?", answer: "Sim. Definimos um escopo conforme a sua necessidade (estações, rede, backups, preventiva) e um formato de acompanhamento, com valores sob consulta." },
      { question: "Atendem emergência de TI para empresa parada?", answer: "Sim. Avaliamos emergências com empresa parada e priorizamos o restabelecimento conforme a disponibilidade, e depois organizamos o ambiente para evitar recorrência." },
    ],
    linksLocais: [
      ...REGIOES,
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
    ],
  },
};
