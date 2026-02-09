import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador em São José dos Pinhais | Técnico Local | Técnico Curitiba",
  metaDescription: "Formatação de computador e notebook em São José dos Pinhais. Windows 10/11, backup, drivers. Atendimento domiciliar em todos os bairros. A partir de R$ 99,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "São José dos Pinhais",
  bairroSlug: "sao-jose-dos-pinhais",
  cidade: "São José dos Pinhais",
  
  h1: "Formatação de Computador em São José dos Pinhais",
  subtitulo: "Reinstalação completa do Windows com técnico local. Atendemos toda São José dos Pinhais e região.",
  
  precoBase: "R$ 109,99",
  precoDescricao: "Inclui Windows, drivers, programas e atendimento a domicílio em SJP.",
  
  descricaoLonga: `São José dos Pinhais é a segunda maior cidade da região metropolitana de Curitiba 
    e possui grande demanda por serviços de informática de qualidade. Nossa equipe atende toda 
    a cidade com serviço de formatação completa de computadores e notebooks. Desde o Centro 
    até bairros como Afonso Pena, Cruzeiro, Aristocrata e região do aeroporto, estamos 
    prontos para deixar seu computador como novo. Realizamos backup completo antes da 
    formatação, instalamos Windows original, drivers atualizados e todos os programas 
    essenciais que você precisa no dia a dia.`,
  
  beneficios: [
    "Backup completo antes da formatação",
    "Windows 10 ou 11 original",
    "Drivers completos e atualizados",
    "Office, antivírus e navegadores",
    "Atendimento em toda SJP",
    "Técnico local conhecedor da região",
    "Garantia de 90 dias",
    "Suporte pós-formatação",
  ],
  
  processoPasso: [
    { titulo: "Agendamento", descricao: "Escolha o melhor dia e horário via WhatsApp" },
    { titulo: "Backup", descricao: "Salvamos seus arquivos com segurança" },
    { titulo: "Formatação", descricao: "Sistema reinstalado do zero" },
    { titulo: "Finalização", descricao: "Programas instalados e dados restaurados" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês atendem todos os bairros de SJP?", 
      resposta: "Sim! Atendemos Centro, Afonso Pena, Cruzeiro, Aristocrata, Costeira, Borda do Campo, região do aeroporto e todos os demais bairros." 
    },
    { 
      pergunta: "O preço é mais caro por ser fora de Curitiba?", 
      resposta: "Temos uma pequena taxa de deslocamento para SJP (já inclusa no valor informado), mas os preços são competitivos e justos." 
    },
    { 
      pergunta: "Vocês atendem empresas em SJP?", 
      resposta: "Sim! Atendemos desde pequenos escritórios até empresas industriais na região. Oferecemos contratos de manutenção mensal." 
    },
    { 
      pergunta: "Qual o tempo de atendimento em SJP?", 
      resposta: "Conseguimos agendar para o mesmo dia ou próximo dia útil, dependendo da demanda. Confirmamos disponibilidade via WhatsApp." 
    },
  ],
  
  pontosReferencia: [
    "Centro de São José dos Pinhais",
    "Aeroporto Afonso Pena",
    "Shopping São José",
    "Avenida Rui Barbosa",
    "Parque da Fonte",
    "Distrito Industrial",
  ],
  
  tempoAtendimento: "Agendamento para mesmo dia ou próximo",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Afonso Pena", slug: "afonso-pena" },
    { nome: "Cruzeiro", slug: "cruzeiro" },
    { nome: "Aristocrata", slug: "aristocrata" },
    { nome: "Costeira", slug: "costeira" },
  ],
};

const FormatacaoSaoJosePinhais = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoSaoJosePinhais;
