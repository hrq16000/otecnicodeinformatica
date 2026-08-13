// @ts-nocheck
export type ServicoData = {
  slug: string;
  nome: string;
  nomeCurto: string;
  verbo: string; // "formatar", "consertar"...
  descricao: string;
  problemas: string[];
};

export const servicos: ServicoData[] = [
  {
    slug: "formatacao-windows",
    nome: "Formatação de Windows",
    nomeCurto: "Formatação Windows",
    verbo: "formatar Windows",
    descricao:
      "Formatação completa do Windows 10/11 com backup dos seus arquivos, ativação, drivers e programas essenciais — tudo via acesso remoto seguro.",
    problemas: [
      "Windows travando ou muito lento",
      "Erros de inicialização",
      "Tela azul recorrente",
      "Sistema corrompido após atualização",
      "Reinstalar do zero sem perder fotos",
      "Ativar Windows original",
    ],
  },
  {
    slug: "remocao-de-virus",
    nome: "Remoção de Vírus e Ransomware",
    nomeCurto: "Remoção de Vírus",
    verbo: "remover vírus",
    descricao:
      "Limpeza completa de vírus, trojans, ransomware, adware e sequestradores de navegador, sem perder seus arquivos importantes.",
    problemas: [
      "Anúncios pop-up no navegador",
      "Arquivos com extensão estranha (ransomware)",
      "PC abrindo programas sozinho",
      "Senhas e contas invadidas",
      "Antivírus desativado por malware",
      "Mineradores de cripto (CPU 100%)",
    ],
  },
  {
    slug: "pc-lento",
    nome: "PC ou Notebook Lento",
    nomeCurto: "PC Lento",
    verbo: "deixar o PC mais rápido",
    descricao:
      "Diagnóstico completo de lentidão: limpeza, otimização de inicialização, ajuste de Windows e indicação de upgrade quando vale a pena.",
    problemas: [
      "Demora para ligar",
      "Trava ao abrir o navegador",
      "Disco em 100% o tempo todo",
      "Memória sempre cheia",
      "Notebook esquentando muito",
      "Boot demorado e travamentos",
    ],
  },
  {
    slug: "tela-azul",
    nome: "Tela Azul / Travamentos",
    nomeCurto: "Tela Azul",
    verbo: "resolver tela azul",
    descricao:
      "Análise dos códigos de erro (BSOD), drivers, memória RAM e disco para resolver travamentos e reinícios automáticos do Windows.",
    problemas: [
      "Tela azul aleatória",
      "Reinício automático sem aviso",
      "DRIVER_IRQL / PAGE_FAULT",
      "Travamentos em jogos",
      "Erros de memória RAM",
      "Falhas após atualização do Windows",
    ],
  },
  {
    slug: "wifi-e-internet",
    nome: "Wi-Fi e Internet",
    nomeCurto: "Wi-Fi / Rede",
    verbo: "configurar Wi-Fi",
    descricao:
      "Configuração de roteador, repetidor, mesh, DNS e otimização do Wi-Fi para resolver oscilação, queda e lentidão da internet.",
    problemas: [
      "Wi-Fi caindo o tempo todo",
      "Internet lenta só em alguns cômodos",
      "Configurar roteador novo",
      "Bloquear dispositivos invasores",
      "Configurar repetidor / mesh",
      "Conectar impressora / Smart TV na rede",
    ],
  },
  {
    slug: "recuperacao-de-arquivos",
    nome: "Recuperação de Arquivos",
    nomeCurto: "Recuperação de Dados",
    verbo: "recuperar arquivos",
    descricao:
      "Recuperação de arquivos apagados, formatados ou perdidos por falha de sistema, pen drive corrompido, HD com bad blocks e cartão de memória.",
    problemas: [
      "Apaguei fotos por engano",
      "Pen drive pedindo formatação",
      "HD externo não abre",
      "Lixeira esvaziada sem querer",
      "Cartão SD corrompido",
      "Arquivos sumiram após atualização",
    ],
  },
];

export const getServico = (slug?: string) =>
  servicos.find((s) => s.slug === slug);
