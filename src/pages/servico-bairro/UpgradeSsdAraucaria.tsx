import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Upgrade SSD e Memória em Araucária | PC Mais Rápido | O Técnico de Informática",
  metaDescription: "Upgrade de SSD e memória RAM em Araucária. Computador até 10x mais rápido. SSD incluso, instalação domiciliar. A partir de R$ 199,99.",
  
  servico: "Upgrade SSD e Memória",
  servicoSlug: "upgrade-ssd-memoria",
  bairro: "Araucária",
  bairroSlug: "araucaria",
  cidade: "Araucária",
  
  h1: "Upgrade SSD e Memória RAM em Araucária",
  subtitulo: "Computador lento em Araucária? Troque o HD por SSD e turbine a memória RAM com técnico local.",
  
  precoBase: "R$ 219,99",
  precoDescricao: "Inclui SSD 240GB, migração do sistema e instalação domiciliar em Araucária.",
  
  descricaoLonga: `O upgrade de SSD é a solução mais eficiente para computadores lentos em Araucária. 
    Substituímos o HD mecânico por um SSD de alta velocidade, fazendo seu computador ligar em segundos. 
    Ideal para profissionais do distrito industrial, escritórios e residências que precisam de mais 
    produtividade. O processo preserva todos os seus dados e programas. Atendemos Centro, Capela Velha, 
    Thomaz Coelho e toda Araucária com técnico local.`,
  
  beneficios: [
    "SSD 240GB de alta velocidade incluso",
    "Migração completa sem perda de dados",
    "Computador até 10x mais rápido",
    "Upgrade de memória RAM disponível",
    "Instalação no seu endereço",
    "Garantia de 90 dias sobre o serviço executado (peças seguem a garantia do fornecedor)",
    "Processo em menos de 2 horas",
    "Técnico local em Araucária",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Verificamos compatibilidade" },
    { titulo: "Clonagem", descricao: "Sistema migrado para o SSD" },
    { titulo: "Instalação", descricao: "Troca do HD pelo SSD" },
    { titulo: "Teste", descricao: "Validação completa de desempenho" },
  ],
  
  faq: [
    { 
      pergunta: "O SSD funciona no meu computador antigo?", 
      resposta: "Na grande maioria dos casos, sim! Verificamos a compatibilidade antes de iniciar. Computadores a partir de 2010 geralmente aceitam SSD." 
    },
    { 
      pergunta: "Quanto mais rápido fica com SSD?", 
      resposta: "Em média 5 a 10 vezes mais rápido. O Windows liga em 15-20 segundos e programas abrem quase instantaneamente." 
    },
    { 
      pergunta: "Perco meus programas e arquivos?", 
      resposta: "Não! Fazemos clonagem completa. Tudo permanece igual, só muito mais rápido." 
    },
    { 
      pergunta: "Tem SSD maior que 240GB?", 
      resposta: "Sim! Oferecemos SSD de 480GB e 1TB. Consulte valores via WhatsApp." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Araucária",
    "Capela Velha",
    "Thomaz Coelho",
    "Refinaria REPAR",
    "Parque Cachoeira",
    "Distrito Industrial",
  ],
  
  tempoAtendimento: "Instalação em até 2 horas no local",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Campo Largo", slug: "campo-largo" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const UpgradeSsdAraucaria = () => <ServicoBairroTemplate data={data} />;
export default UpgradeSsdAraucaria;
