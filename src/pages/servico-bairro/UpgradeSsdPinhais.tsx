import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Upgrade SSD e Memória em Pinhais | PC Mais Rápido | Técnico Curitiba",
  metaDescription: "Upgrade de SSD e memória RAM em Pinhais. Computador até 10x mais rápido. SSD incluso, instalação domiciliar. A partir de R$ 199,99.",
  
  servico: "Upgrade SSD e Memória",
  servicoSlug: "upgrade-ssd-memoria",
  bairro: "Pinhais",
  bairroSlug: "pinhais",
  cidade: "Pinhais",
  
  h1: "Upgrade SSD e Memória RAM em Pinhais",
  subtitulo: "PC lento em Pinhais? Troque o HD por SSD e aumente a memória RAM. Até 10x mais rápido com técnico local.",
  
  precoBase: "R$ 209,99",
  precoDescricao: "Inclui SSD 240GB, migração do sistema e instalação domiciliar em Pinhais.",
  
  descricaoLonga: `O upgrade de SSD é a melhor forma de turbinar seu computador em Pinhais. Substituímos o HD 
    mecânico antigo por um SSD de alta velocidade, fazendo o Windows iniciar em segundos e programas 
    abrirem instantaneamente. Ideal para home office, estudos e uso profissional. Atendemos Centro, 
    Weissópolis, Pineville e toda Pinhais com técnico local. Todos os dados e programas são preservados 
    durante o processo de migração.`,
  
  beneficios: [
    "SSD 240GB incluso no serviço",
    "Migração completa sem perda de dados",
    "PC até 10x mais rápido",
    "Upgrade de memória RAM disponível",
    "Instalação no seu endereço",
    "Garantia de 1 ano no SSD",
    "Processo em menos de 2 horas",
    "Técnico local em Pinhais",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Verificamos compatibilidade" },
    { titulo: "Clonagem", descricao: "Sistema migrado para o SSD" },
    { titulo: "Instalação", descricao: "Troca do HD pelo SSD" },
    { titulo: "Teste", descricao: "Validação de desempenho" },
  ],
  
  faq: [
    { 
      pergunta: "Funciona em qualquer computador?", 
      resposta: "Sim! Notebooks e desktops de praticamente todas as marcas e modelos aceitam SSD." 
    },
    { 
      pergunta: "Perco meus arquivos?", 
      resposta: "Não! Fazemos clonagem completa do sistema. Tudo fica igual, só muito mais rápido." 
    },
    { 
      pergunta: "Tem SSD maior que 240GB?", 
      resposta: "Sim! Oferecemos 480GB e 1TB. Consulte preços pelo WhatsApp." 
    },
    { 
      pergunta: "Pinhais tem taxa extra?", 
      resposta: "Não! Pinhais é vizinha de Curitiba, sem taxa adicional de deslocamento." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Pinhais",
    "Weissópolis",
    "Pineville",
    "Avenida Iraí",
    "Emiliano Perneta",
    "Shopping Pinhais",
  ],
  
  tempoAtendimento: "Instalação em até 2 horas no local",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Centro (Curitiba)", slug: "centro" },
    { nome: "Batel (Curitiba)", slug: "batel" },
    { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const UpgradeSsdPinhais = () => <ServicoBairroTemplate data={data} />;
export default UpgradeSsdPinhais;
