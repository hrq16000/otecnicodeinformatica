// ─────────────────────────────────────────────────────────────
// BAIRROS CURADOS DE CURITIBA — 5 landings hiperlocais indexáveis.
// Conteúdo próprio por bairro, sem endereço/unidade física inventada,
// sem tempo de deslocamento prometido, sem avaliação inventada.
// Rota canônica: /bairros/<slug> (self-referente). Página-mãe:
// /tecnico-informatica-curitiba.
// ─────────────────────────────────────────────────────────────

import { SERVICOS_CANONICOS } from "@/lib/cidadesData";

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
  /** Como a triagem e a operação funcionam naquele bairro */
  operacaoLocal: string[];
  /** Quando o atendimento no local pode ser indicado */
  atendimentoLocal: string[];
  /** Quando pode ser necessária coleta ou bancada */
  coletaBancada: string[];
  /** Serviços prioritários — paths das 8 rotas curadas de /servicos */
  servicosPrioritarios: string[];
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
      "Técnico de informática no CIC, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para empresas. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
    h1: "Técnico de Informática no CIC – Curitiba",
    subtitulo:
      "Atendimento para residências e empresas no maior bairro de Curitiba, começando por triagem no WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no CIC, em Curitiba. Pode me orientar?",
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
      "Técnico de informática no Batel, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para home office. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
    h1: "Técnico de Informática no Batel – Curitiba",
    subtitulo:
      "Suporte para residências, home office e pequenos escritórios no Batel, com triagem por WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Batel, em Curitiba. Pode me orientar?",
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
    metaTitle: "Técnico de Informática no Água Verde (Curitiba) | Notebook e PC",
    metaDescription:
      "Técnico de informática no Água Verde, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
    h1: "Técnico de Informática no Água Verde – Curitiba",
    subtitulo:
      "Manutenção de notebook e PC para quem trabalha e estuda em casa no Água Verde, com triagem por WhatsApp e valor transparente.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Água Verde, em Curitiba. Pode me orientar?",
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
      "Técnico de informática no Centro de Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para escritórios. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
    h1: "Técnico de Informática no Centro de Curitiba",
    subtitulo:
      "Atendimento ágil para lojas, consultórios e escritórios do Centro de Curitiba, com triagem por WhatsApp e diagnóstico antes de informar o valor.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Centro de Curitiba. Pode me orientar?",
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
      "Técnico de informática no Portão, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Atendimento a domicílio a partir de R$ 99,99. Via WhatsApp.",
    h1: "Técnico de Informática no Portão – Curitiba",
    subtitulo:
      "Conserto de notebook, PC e redes para casas e comércios do Portão, com triagem por WhatsApp e valor aprovado por você.",
    whatsappMessage:
      "Olá! Preciso de um técnico de informática no Portão, em Curitiba. Pode me orientar?",
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

export const BAIRRO_LIST = Object.values(BAIRROS);
