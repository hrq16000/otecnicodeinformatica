// ─────────────────────────────────────────────────────────────
// BAIRROS CURADOS DE CURITIBA — 5 landings hiperlocais indexáveis.
// Conteúdo próprio por bairro, sem endereço/unidade física inventada,
// sem tempo de deslocamento prometido, sem avaliação inventada.
// Rota canônica: /bairros/<slug> (self-referente). Página-mãe:
// /tecnico-informatica-curitiba.
// ─────────────────────────────────────────────────────────────

import { SERVICOS_CANONICOS } from "@/lib/cidadesData";
import { BAIRROS_LOTE_2 } from "@/lib/bairrosLote2";
import { BAIRROS_LOTE_3 } from "@/lib/bairrosLote3";
import { BAIRROS_LOTE_4 } from "@/lib/bairrosLote4";


export interface BairroFaq {
  question: string;
  answer: string;
}

export interface BairroLocalData {
  slug: string;
  /** Nome curto do bairro (CIC, Batel, Água Verde, Centro, Portão) */
  nome: string;
  /** Nome locativo para uso em frase: "no CIC", "no Centro de Curitiba" */
  nomeLocativo: string;
  cidade: string;
  /** Nome usado no areaServed do schema */
  areaName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitulo: string;
  /** Mensagem pré-preenchida do WhatsApp (inclui bairro + Curitiba) */
  whatsappMessage: string;
  /** Introdução local — parágrafos distintos por bairro */
  introducaoLocal: string[];
  /** Contexto técnico do bairro — parágrafos autorais, sem promessa nova */
  contextoLocal?: string[];
  /** Logística e acesso reais da localidade (conteúdo autoral) */
  logisticaLocal?: string[];
  /** Como a triagem e a operação funcionam naquele bairro */
  operacaoLocal: string[];
  /** Quando o atendimento no local pode ser indicado */
  atendimentoLocal: string[];
  /** Quando pode ser necessária coleta ou bancada */
  coletaBancada: string[];
  /** Públicos atendidos naquele recorte local (Rodada 5E, opcional) */
  publicoAtendido?: string[];
  /** Serviços prioritários — paths das 8 rotas curadas de /servicos */
  servicosPrioritarios: string[];
  /**
   * Landings serviço × cidade promovidas pela política local. O bairro aponta
   * para elas quando a intenção local for semanticamente melhor que o pai global.
   */
  servicosCidade?: { to: string; label: string; desc: string }[];
  /** Páginas de sintoma (/problemas/*) contextualmente pertinentes ao bairro */
  problemasRelacionados?: { to: string; label: string; desc: string }[];
  /** FAQ local visível (espelhada em FAQPage) — distinta entre bairros */

  faqLocal: BairroFaq[];
}

// Resolve um path de /servicos para o item canônico (label + desc).
export function servicoByPath(to: string) {
  return SERVICOS_CANONICOS.find((s) => s.to === to);
}

export const BAIRROS: Record<string, BairroLocalData> = {
  // ── CIC ─────────────────────────────────────────────────────
  cic: {
    slug: "cic",
    nome: "CIC",
    nomeLocativo: "no CIC",
    cidade: "Curitiba",
    areaName: "Cidade Industrial de Curitiba (CIC)",
    metaTitle: "Técnico de Informática no CIC (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no CIC, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para empresas. Diagnóstico a partir de R$ 99,99.",
    h1: "Técnico de Informática no CIC – Curitiba",
    subtitulo:
      "Atendimento para residências e empresas no maior bairro de Curitiba, começando por triagem no WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no CIC, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "A CIC concentra galpões, pequenas fábricas e prestadores que trabalham com computadores ligados o dia inteiro, muitas vezes em ambientes com mais poeira em suspensão do que um escritório comum. Isso muda o padrão de defeito: dissipador saturado, ventoinha ruidosa, desligamento por temperatura e fonte que começa a falhar sob carga aparecem com mais frequência do que problemas puramente de software. Em máquinas assim, limpeza interna com troca de pasta térmica e teste de alimentação costumam ser verificados antes de qualquer formatação.",
      "Na parte residencial do bairro, a demanda é outra: notebook de estudo e trabalho remoto, computador de família com disco mecânico antigo e roteador posicionado longe dos cômodos onde o sinal é usado. Nesses casos, o ganho real quase sempre vem de três frentes — troca para SSD, reinstalação limpa do sistema com backup conferido antes e reposicionamento ou substituição do roteador. A triagem por WhatsApp serve justamente para separar qual dos dois cenários é o seu antes de deslocar equipe ou equipamento.",
    ],
    logisticaLocal: [
      "Deslocamento até a CIC é planejado por janela: as vias que cortam o bairro concentram caminhão e ônibus em horário de pico, e chegar às 8h ou depois das 14h costuma render mais tempo de bancada no local do que sair no meio da manhã. Quando o chamado é de empresa, combinamos o horário com quem opera a máquina, para que o equipamento esteja livre e o técnico não fique esperando a liberação do posto de trabalho.",
      "Em galpão e área industrial, a coleta é a modalidade mais frequente: o ambiente raramente tem bancada limpa, tomada estável e espaço para abrir um gabinete com segurança. Nesses casos retiramos o equipamento, executamos o serviço em bancada e devolvemos no mesmo endereço, com a peça substituída disponível para conferência na entrega. Para máquinas críticas de produção, a orientação é sempre programar a retirada fora do turno.",
      "Para chamados de empresa na CIC, o registro do atendimento inclui identificação da máquina, setor, sintoma relatado e o que foi efetivamente executado, de modo que o histórico fique com o cliente e não apenas com o técnico. Isso importa em ambiente industrial, onde o mesmo equipamento passa por turnos e operadores diferentes e a informação se perde entre um chamado e outro.",
    ],
    introducaoLocal: [
      "A Cidade Industrial de Curitiba (CIC) é o maior bairro da capital em extensão, com um perfil que mistura indústrias, comércios e muitas residências. Isso gera dois tipos de demanda: empresas que dependem de computadores e rede estáveis para não parar a operação e famílias que precisam do notebook do dia a dia funcionando.",
      "O contato começa pelo WhatsApp: você descreve o problema, recebe as primeiras orientações e, se fizer sentido, combinamos a avaliação do equipamento. A modalidade — no local, remoto ou por coleta — é definida conforme o problema, não prometida antes de entender o caso.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para entender sintoma, uso e urgência",
      "Diagnóstico técnico antes de informar qualquer valor",
      "Valor aprovado por você antes da execução",
      "Manutenção preventiva sugerida para máquinas que rodam o dia inteiro",
    ],
    atendimentoLocal: [
      "Formatação com backup e reinstalação do sistema",
      "Limpeza interna e upgrade de SSD ou memória",
      "Configuração de rede e Wi-Fi em casa ou no comércio",
      "Suporte pontual a estações de trabalho de escritório",
    ],
    coletaBancada: [
      "Reparo de placa-mãe e falhas intermitentes de hardware",
      "Troca de tela ou teclado de notebook",
      "Tentativa de recuperação de dados em HD ou SSD com falha",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/suporte-tecnico-empresarial",
    ],
    faqLocal: [
      { question: "Vocês atendem empresas e comércios no CIC?", answer: "Sim. Como o CIC concentra muitas operações, damos suporte pontual ou recorrente sob consulta a estações de trabalho, rede e rotinas de backup. A avaliação começa pelo WhatsApp." },
      { question: "O atendimento no CIC é no local ou por coleta?", answer: "Depende do problema. Casos como formatação, upgrade e configuração de rede costumam ser resolvidos no local; reparos de bancada seguem por coleta e entrega, sempre com sua aprovação." },
      { question: "Quanto custa o diagnóstico no CIC?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, do deslocamento, da complexidade e de eventuais peças — e nada é executado sem aprovação." },
      { question: "Vale mais a pena consertar ou trocar o computador?", answer: "Em muitos casos, um upgrade de SSD e memória resolve a lentidão por um custo menor que a troca. Avaliamos o equipamento e explicamos com clareza antes de indicar qualquer caminho." },
    ],
  },

  // ── BATEL ───────────────────────────────────────────────────
  batel: {
    slug: "batel",
    nome: "Batel",
    nomeLocativo: "no Batel",
    cidade: "Curitiba",
    areaName: "Batel, Curitiba",
    metaTitle: "Técnico de Informática no Batel (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no Batel, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para home office.",
    h1: "Técnico de Informática no Batel – Curitiba",
    subtitulo:
      "Suporte para residências, home office e pequenos escritórios no Batel, com triagem por WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Batel, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "O Batel é uma região de escritórios, consultórios, agências e apartamentos, com uso intenso de notebooks, monitores externos, docks e videoconferência. O que mais aparece por aqui não é máquina quebrada, e sim máquina lenta em horário de reunião: disco cheio, dezenas de abas e aplicativos carregando junto com o sistema, além de conflitos entre dock USB-C e drivers de vídeo. Boa parte disso é diagnosticável remotamente, sem parar o expediente.",
      "Prédios comerciais e residenciais verticais também trazem uma questão específica de rede: muitos roteadores concorrendo nos mesmos canais de 2,4 GHz, paredes de concreto e cabeamento antigo até o ponto de trabalho. A avaliação nesses casos mede o sinal onde ele é realmente usado, verifica se o problema está no link, no roteador ou no dispositivo, e só então indica troca de equipamento, ponto adicional ou cabeamento — nunca o contrário.",
    ],
    logisticaLocal: [
      "No Batel a logística é vertical, não horizontal: quase todo atendimento envolve prédio comercial ou residencial com portaria, autorização prévia e elevador de serviço. Por isso pedimos antecipadamente o nome do responsável, o andar e a regra de acesso do condomínio — é o que evita a visita perder trinta minutos na recepção. Estacionamento é limitado, então a janela de agendamento é combinada com folga.",
      "Boa parte dos chamados da região se resolve sem visita. Máquina que liga, conecta na internet e apenas está lenta ou com conflito de dock e vídeo é tratada por acesso remoto, com o usuário acompanhando a tela e sem sair do escritório. Quando a bancada é inevitável — tela, teclado, fonte ou armazenamento — a coleta é feita no próprio prédio, no horário comercial, e a devolução é combinada para não coincidir com reunião ou fechamento.",
      "Em atendimento corporativo no Batel, a máquina costuma ter perfil de domínio, VPN e políticas de segurança da empresa. Nada é alterado nessas configurações sem autorização de quem administra o ambiente: quando o ajuste depende de credencial administrativa do cliente, o passo é documentado e devolvido para aprovação em vez de contornado.",
    ],
    introducaoLocal: [
      "O Batel reúne muita gente que trabalha em casa e depende do computador o tempo todo. Por isso, os pedidos mais comuns na região envolvem notebook lento ou esquentando, necessidade de formatação com backup e Wi-Fi estável o suficiente para reuniões online.",
      "O atendimento começa por triagem no WhatsApp. A partir da descrição do problema, orientamos os primeiros passos e definimos se o caso pode ser resolvido no local, de forma remota ou se precisa seguir para bancada — sempre com diagnóstico antes de informar o valor.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp com foco em home office e residências",
      "Diagnóstico honesto antes de trocar qualquer peça",
      "Valor aprovado por você antes de executar",
      "Orientação sobre desempenho e estabilidade de rede",
    ],
    atendimentoLocal: [
      "Ajustes de desempenho e formatação com backup",
      "Upgrade de SSD e memória para ganho de velocidade",
      "Configuração de Wi-Fi e melhoria de cobertura em apartamentos",
      "Remoção de vírus e limpeza de programas indesejados",
    ],
    coletaBancada: [
      "Troca de tela, teclado ou bateria de notebook",
      "Reparos internos que exigem estrutura de oficina",
      "Diagnósticos mais longos de hardware instável",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/remocao-de-virus",
      "/servicos/redes-e-wifi",
    ],
    faqLocal: [
      { question: "Fazem suporte para home office no Batel?", answer: "Sim. Ajustamos desempenho, organizamos programas e melhoramos a estabilidade do Wi-Fi para reuniões online. A avaliação do que é necessário é feita após a triagem pelo WhatsApp." },
      { question: "Atendem apartamentos e prédios no Batel?", answer: "Sim, atendemos residências e pequenos escritórios. Em prédios, basta liberar o acesso na portaria no horário combinado. A modalidade depende do tipo de serviço." },
      { question: "Meu notebook está lento — precisa trocar?", answer: "Nem sempre. Muitas vezes um upgrade de SSD e memória, somado a uma limpeza, devolve a agilidade. Avaliamos antes de indicar troca e explicamos o ganho realista." },
      { question: "Qual o valor do atendimento no Batel?", answer: "O diagnóstico começa em R$ 99,99 quando aplicável. O valor final depende do equipamento, da complexidade e de eventuais peças, sempre aprovado por você antes." },
    ],
  },

  // ── ÁGUA VERDE ──────────────────────────────────────────────
  "agua-verde": {
    slug: "agua-verde",
    nome: "Água Verde",
    nomeLocativo: "no Água Verde",
    cidade: "Curitiba",
    areaName: "Água Verde, Curitiba",
    metaTitle: "Técnico de Informática no Água Verde | Notebook e PC",
    metaDescription:
      "Técnico de informática no Água Verde, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99.",
    h1: "Técnico de Informática no Água Verde – Curitiba",
    subtitulo:
      "Manutenção de notebook e PC para quem trabalha e estuda em casa no Água Verde, com triagem por WhatsApp e valor transparente.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Água Verde, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Água Verde é um bairro majoritariamente residencial e verticalizado, com forte presença de home office e de famílias que compartilham o mesmo computador entre trabalho, estudo e lazer. Esse uso misto gera um padrão claro de chamado: sistema abarrotado de programas instalados ao longo dos anos, atualizações interrompidas, perfis de usuário sobrecarregados e armazenamento no limite. São casos em que a reinstalação organizada, com separação de perfis e backup validado, resolve mais do que a troca de peça.",
      "A segunda demanda recorrente é conectividade dentro do apartamento: o sinal chega bem na sala e cai no quarto onde a pessoa trabalha. Antes de sugerir repetidor ou rede em malha, a avaliação confirma a velocidade contratada, testa o sinal em cada ambiente e observa quantas redes vizinhas disputam o mesmo canal. Muitas vezes a solução é ajuste de canal e posição, não compra de equipamento novo.",
    ],
    logisticaLocal: [
      "Água Verde é predominantemente residencial de prédio, com muitos apartamentos de dois e três dormitórios onde o computador divide espaço com a rotina da casa. O atendimento no local funciona bem aqui: o deslocamento interno é curto, o acesso é simples e o equipamento normalmente está fixo, com monitor, impressora e roteador na mesma sala — o que permite testar o conjunto inteiro em vez de uma peça isolada.",
      "O ponto de atenção do bairro é o Wi-Fi. Apartamento com paredes de concreto, roteador instalado onde o provedor deixou o cabo e vizinhança densa em canais sobrepostos formam a combinação clássica de sinal que cai no quarto do fundo. Nesses casos a avaliação inclui medição de sinal cômodo a cômodo antes de qualquer sugestão de compra: em boa parte das vezes reposicionar e reconfigurar resolve, e só quando não resolve indicamos repetidor ou troca de equipamento.",
      "Em prédio residencial, a devolução do equipamento após coleta é combinada com o morador e registrada na portaria quando o condomínio exige. O prazo estimado é informado no aceite do orçamento, e qualquer mudança durante o serviço é comunicada pelo WhatsApp antes da entrega, nunca depois.",
    ],
    introducaoLocal: [
      "No Água Verde, o perfil que mais aparece é o de quem trabalha de casa e não pode ficar com o notebook parado. Por isso, boa parte das solicitações envolve notebook lento, aquecimento, tela ou teclado com defeito e a necessidade de um upgrade de SSD para dar sobrevida à máquina.",
      "Também há forte procura por formatação com backup e remoção de vírus em computadores usados por vários membros da família. Tudo começa pela triagem no WhatsApp, com diagnóstico antes de informar qualquer valor e sem troca de peça sem necessidade.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp com foco em notebook e PC de uso diário",
      "Backup dos arquivos antes de formatar, quando o caso pede",
      "Diagnóstico de fonte, memória, disco e temperatura antes de indicar troca",
      "Entrega da máquina com drivers e programas essenciais configurados",
    ],
    atendimentoLocal: [
      "Formatação com backup e reinstalação do sistema",
      "Upgrade de SSD e memória para acelerar a máquina",
      "Remoção de vírus e limpeza de pop-ups",
      "Manutenção de desktop de escritório em casa",
    ],
    coletaBancada: [
      "Troca de tela, dobradiça ou teclado de notebook",
      "Reparo de placa e falhas físicas de hardware",
      "Tentativa de recuperação de dados de mídia com defeito",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/upgrade-ssd-ram",
      "/servicos/formatacao",
      "/servicos/recuperacao-de-dados",
    ],
    faqLocal: [
      { question: "Vocês fazem upgrade de SSD no Água Verde?", answer: "Sim, é um dos serviços mais pedidos no bairro. A troca por SSD com aumento de memória costuma trazer ganho perceptível em máquinas antigas, avaliado caso a caso." },
      { question: "Formatam com backup dos meus arquivos?", answer: "Sim. Sempre que possível, fazemos o backup dos arquivos antes de reinstalar o Windows e devolvemos a máquina com drivers, antivírus e programas essenciais já configurados." },
      { question: "Conseguem recuperar arquivos apagados?", answer: "Fazemos a tentativa de recuperação de dados. Não há garantia, pois o resultado depende do estado físico e lógico da mídia — e explicamos as chances antes de iniciar." },
      { question: "O atendimento é a domicílio no Água Verde?", answer: "Pode ser a domicílio ou por coleta e entrega, conforme o serviço. Reparos de bancada seguem para a oficina; a definição acontece após a triagem pelo WhatsApp." },
    ],
  },

  // ── CENTRO ──────────────────────────────────────────────────
  centro: {
    slug: "centro",
    nome: "Centro de Curitiba",
    nomeLocativo: "no Centro de Curitiba",
    cidade: "Curitiba",
    areaName: "Centro de Curitiba",
    metaTitle: "Técnico de Informática no Centro de Curitiba | Notebook e PC",
    metaDescription:
      "Técnico de informática no Centro de Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para escritórios.",
    h1: "Técnico de Informática no Centro de Curitiba",
    subtitulo:
      "Atendimento ágil para lojas, consultórios e escritórios do Centro de Curitiba, com triagem por WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Centro de Curitiba. Pode me orientar?",
    contextoLocal: [
      "O Centro de Curitiba reúne comércio de rua, salas comerciais compactas e moradia, com um parque de equipamentos bastante heterogêneo: computadores de balcão com anos de uso ao lado de notebooks recentes. Em comércio, o que costuma parar a operação não é o computador em si, mas a cadeia em volta dele — impressora fiscal ou térmica sem comunicação, sistema de vendas travado após atualização e rede instável entre caixa e retaguarda.",
      "Como boa parte dos atendimentos no Centro acontece em horário comercial, a triagem prioriza o que pode ser feito remotamente e o que exige presença. Quando o reparo é mais longo — troca de peça interna, recuperação de dados ou reinstalação completa — a coleta evita que o equipamento fique inoperante no balcão durante horas de movimento, e o valor só é informado depois do diagnóstico.",
    ],
    logisticaLocal: [
      "No Centro a variável decisiva é acesso, não distância. Salas comerciais antigas, edifícios com elevador único, carga e descarga restrita e zona azul limitam o tempo que a equipe consegue permanecer no endereço. Agendamos preferencialmente no início da manhã ou no meio da tarde, e pedimos que o equipamento esteja desconectado e acessível quando o caso já foi triado como coleta.",
      "O perfil de chamado também é próprio da região: microempresa, escritório de serviços, comércio de rua e consultório com um ou dois computadores que sustentam a operação inteira, muitas vezes com sistema de gestão, impressora fiscal e leitor conectados ao mesmo aparelho. Antes de qualquer formatação, verificamos licenças, integrações e a existência de cópia dos dados — em máquina de comércio, perder a configuração do sistema costuma custar mais caro que a peça.",
      "Em máquina de comércio no Centro, antes de qualquer intervenção verificamos se existe certificado digital, sistema fiscal ou integração com maquininha instalada no aparelho. Esses itens exigem cuidado específico na reinstalação e, quando reconfigurá-los depende do fornecedor do sistema, isso é informado no orçamento para que a parada seja programada.",
    ],
    introducaoLocal: [
      "O Centro de Curitiba tem ritmo comercial: lojas, escritórios de advocacia e contabilidade, imobiliárias e consultórios que não podem ficar com o computador parado no meio do expediente. Os chamados mais comuns envolvem PC de balcão travando, lentidão com sistemas e planilhas e rede instável afetando o atendimento.",
      "Como cada hora parada pesa no comércio, priorizamos triagem rápida pelo WhatsApp e diagnóstico objetivo. A partir daí, indicamos se o caso é resolvido no local, de forma remota ou por coleta — sempre com valor aprovado antes da execução.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp pensando na rotina comercial",
      "Diagnóstico rápido para reduzir tempo de parada",
      "Backup antes de reinstalar sistemas de equipe",
      "Valor aprovado antes de qualquer serviço",
    ],
    atendimentoLocal: [
      "Reparo de PC de escritório que trava no expediente",
      "Formatação com backup em máquinas compartilhadas",
      "Configuração de rede e impressoras de escritório",
      "Remoção de vírus em computadores de equipe",
    ],
    coletaBancada: [
      "Reparos internos de hardware que exigem oficina",
      "Troca de componentes de notebook",
      "Diagnósticos prolongados de instabilidade",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-computador",
      "/servicos/manutencao-de-notebook",
      "/servicos/formatacao",
      "/servicos/remocao-de-virus",
      "/servicos/redes-e-wifi",
    ],
    faqLocal: [
      { question: "Atendem escritórios e lojas no Centro de Curitiba?", answer: "Sim. Boa parte da demanda no Centro é comercial: PCs de balcão, escritórios e consultórios. Fazemos suporte pontual ou recorrente sob consulta, começando pela triagem no WhatsApp." },
      { question: "Vocês têm loja física no Centro?", answer: "Não trabalhamos com loja de balcão. O atendimento é combinado por WhatsApp e realizado a domicílio, remotamente ou por coleta e entrega, conforme o tipo de serviço." },
      { question: "Dá para reduzir o tempo de parada da empresa?", answer: "Esse é o foco no Centro: triagem rápida e diagnóstico objetivo. Casos simples costumam ser resolvidos no local; quando é preciso bancada, informamos o prazo antes de retirar o equipamento." },
      { question: "Qual o valor da avaliação no Centro?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, da complexidade e de eventuais peças, e é sempre aprovado por você antes." },
    ],
  },

  // ── PORTÃO ──────────────────────────────────────────────────
  portao: {
    slug: "portao",
    nome: "Portão",
    nomeLocativo: "no Portão",
    cidade: "Curitiba",
    areaName: "Portão, Curitiba",
    metaTitle: "Técnico de Informática no Portão (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no Portão, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD.",
    h1: "Técnico de Informática no Portão – Curitiba",
    subtitulo:
      "Conserto de notebook, PC e redes para casas e comércios do Portão, com triagem por WhatsApp e valor aprovado por você.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Portão, em Curitiba. Pode me orientar?",
    contextoLocal: [
      "Portão combina avenidas de comércio, edifícios residenciais e casas, e é um dos bairros onde mais aparecem equipamentos de uso doméstico prolongado: desktops de cinco a dez anos, notebooks com bateria já degradada e impressoras multifuncionais compartilhadas pela família. O diagnóstico nesses casos costuma separar três coisas que o usuário sente como uma só — lentidão por disco mecânico, travamento por superaquecimento e falha de software após atualização.",
      "Pequenos comércios da região trazem outro conjunto: rede Wi-Fi cobrindo loja e estoque, computador que não pode ficar fora do ar e backup inexistente. A recomendação padrão nesses atendimentos é sempre a mesma e é dita antes de qualquer serviço: garantir uma cópia dos arquivos críticos primeiro, depois tratar desempenho e, por último, discutir upgrade ou substituição do equipamento.",
    ],
    logisticaLocal: [
      "O Portão mistura casas, prédios e um corredor comercial movimentado, e isso divide os chamados em dois roteiros logísticos distintos. Nas residências, a visita no local resolve bem porque o equipamento é fixo e o ambiente permite abrir, limpar e testar com calma. No comércio da avenida, o atendimento precisa caber entre movimentos: agendamos em horário de menor fluxo e priorizamos o que devolve a operação ao ar mais rápido.",
      "Como o bairro tem muitos imóveis com computador antigo em uso diário, a decisão entre reparar e trocar aparece com frequência. A avaliação mede o que ainda faz sentido aproveitar — SSD, memória, monitor e periféricos — antes de recomendar equipamento novo, e o parecer é entregue por escrito no WhatsApp para que a decisão possa ser tomada com calma, inclusive a de não contratar serviço nenhum agora.",
      "Para o comércio da região, quando a peça necessária não está disponível de imediato, informamos o prazo estimado de chegada antes da aprovação e, sempre que possível, deixamos a operação rodando de forma provisória. Nenhum equipamento fica retido sem previsão: se o reparo não avança, o aparelho volta ao cliente sem cobrança de mão de obra não executada.",
    ],
    introducaoLocal: [
      "O Portão tem um perfil familiar e comercial ao mesmo tempo: casas com um ou mais computadores usados por toda a família e pequenos comércios que dependem de um PC estável para vender e emitir nota. Por isso aparecem muito computador lento e cheio de programas, notebook esquentando e Wi-Fi que não cobre a casa inteira.",
      "O atendimento começa pela triagem no WhatsApp. A partir do relato, orientamos os primeiros passos e definimos a melhor forma de resolver — no local, remotamente ou por coleta — com diagnóstico antes de informar o valor.",
    ],
    operacaoLocal: [
      "Triagem pelo WhatsApp para residências e comércio do bairro",
      "Diagnóstico antes de indicar troca de peças",
      "Foco em reduzir o tempo de parada do comércio",
      "Valor aprovado por você antes de executar",
    ],
    atendimentoLocal: [
      "Formatação com backup dos arquivos da família",
      "Upgrade de SSD e memória para ganho de desempenho",
      "Configuração de Wi-Fi para cobrir a casa toda",
      "Suporte ao PC do balcão do comércio",
    ],
    coletaBancada: [
      "Reparo de placa e falhas após queda de energia",
      "Troca de componentes internos de notebook",
      "Casos que exigem testes prolongados de bancada",
    ],
    servicosPrioritarios: [
      "/servicos/manutencao-de-notebook",
      "/servicos/manutencao-de-computador",
      "/servicos/formatacao",
      "/servicos/upgrade-ssd-ram",
      "/servicos/redes-e-wifi",
      "/servicos/remocao-de-virus",
    ],
    faqLocal: [
      { question: "Atendem o comércio do Portão?", answer: "Sim. Damos suporte ao PC do balcão, à impressora e à rede de pequenos comércios, com foco em reduzir o tempo de parada. A avaliação começa pela triagem no WhatsApp." },
      { question: "O Wi-Fi não cobre a casa toda — vocês resolvem?", answer: "Avaliamos o posicionamento do roteador e a necessidade de repetidor ou sistema mesh para melhorar a cobertura. A indicação depende do tamanho do imóvel e da estrutura." },
      { question: "Recebi um aviso pedindo pagamento para liberar o PC. É golpe?", answer: "Quase sempre é golpe. Não pague nada antes de uma avaliação. Fale conosco pelo WhatsApp que verificamos o caso com segurança antes de qualquer serviço." },
      { question: "Qual o valor do atendimento no Portão?", answer: "A partir de R$ 99,99 quando aplicável. O valor final depende do equipamento, do deslocamento, da complexidade e de eventuais peças, sempre aprovado por você antes." },
    ],
  },
};

// RODADA 5E — Lote 2 de bairros âncora (Curitiba + São José dos Pinhais).
Object.assign(BAIRROS, BAIRROS_LOTE_2);

// MICRO-RODADA LOCAL 1 — Lote 3 de bairros âncora (rotas já existentes).
Object.assign(BAIRROS, BAIRROS_LOTE_3);

// MICRO-RODADA LOCAL 2 — Lote 4 de bairros âncora (rotas já existentes).
Object.assign(BAIRROS, BAIRROS_LOTE_4);


export const BAIRRO_LIST = Object.values(BAIRROS);
