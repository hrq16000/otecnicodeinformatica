import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Upgrade SSD e Memória em São José dos Pinhais | Computador Mais Rápido | Técnico Curitiba",
  metaDescription: "Upgrade de SSD e memória RAM em São José dos Pinhais. Computador até 10x mais rápido. Atendimento domiciliar. A partir de R$ 199,99 com SSD incluso.",
  
  servico: "Upgrade SSD e Memória",
  servicoSlug: "upgrade-ssd-memoria",
  bairro: "São José dos Pinhais",
  bairroSlug: "sao-jose-dos-pinhais",
  cidade: "São José dos Pinhais",
  
  h1: "Upgrade SSD e Memória RAM em São José dos Pinhais",
  subtitulo: "Computador lento? Troque o HD por SSD e aumente a memória RAM. Seu PC até 10x mais rápido com técnico local em SJP.",
  
  precoBase: "R$ 219,99",
  precoDescricao: "Inclui SSD 240GB, instalação, migração do sistema e atendimento em SJP.",
  
  descricaoLonga: `O upgrade de SSD é a melhor relação custo-benefício para quem quer um computador mais rápido 
    em São José dos Pinhais. Trocamos o HD antigo por SSD de alta velocidade e aumentamos a memória RAM, 
    fazendo seu computador ligar em segundos e abrir programas instantaneamente. É ideal para profissionais 
    do distrito industrial, estudantes e empresas que precisam de produtividade. Atendemos toda SJP com 
    técnico local que vai até o seu endereço. O processo é rápido e seus dados são preservados integralmente.`,
  
  beneficios: [
    "SSD de alta velocidade incluso",
    "Migração completa do sistema",
    "Todos os dados preservados",
    "Computador até 10x mais rápido",
    "Atendimento domiciliar em SJP",
    "Upgrade de memória RAM disponível",
    "Garantia de 90 dias sobre o serviço executado (peças seguem a garantia do fornecedor)",
    "Instalação em menos de 2 horas",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Verificamos compatibilidade do seu PC" },
    { titulo: "Backup", descricao: "Clonagem completa do sistema" },
    { titulo: "Upgrade", descricao: "Troca do HD por SSD + memória" },
    { titulo: "Teste", descricao: "Validação de desempenho e dados" },
  ],
  
  faq: [
    { 
      pergunta: "O upgrade de SSD funciona em qualquer computador?", 
      resposta: "Sim! Tanto notebooks quanto desktops podem receber SSD. Verificamos a compatibilidade antes de iniciar o serviço." 
    },
    { 
      pergunta: "Perco meus arquivos ao trocar o HD por SSD?", 
      resposta: "Não! Fazemos a clonagem completa do sistema. Tudo fica exatamente como estava, só muito mais rápido." 
    },
    { 
      pergunta: "Qual a diferença de velocidade com SSD?", 
      resposta: "Em média o computador fica 5 a 10 vezes mais rápido. O Windows inicia em 15-20 segundos ao invés de 2-3 minutos." 
    },
    { 
      pergunta: "Vocês fazem upgrade de memória RAM também?", 
      resposta: "Sim! Podemos adicionar memória RAM junto com o SSD para máximo desempenho. Consulte valores via WhatsApp." 
    },
  ],
  
  pontosReferencia: [
    "Centro de São José dos Pinhais",
    "Aeroporto Afonso Pena",
    "Shopping São José",
    "Distrito Industrial",
    "Avenida Rui Barbosa",
    "Terminal Central SJP",
  ],
  
  tempoAtendimento: "Instalação em até 2 horas no local",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Afonso Pena", slug: "afonso-pena" },
    { nome: "Cruzeiro", slug: "cruzeiro" },
    { nome: "Aristocrata", slug: "aristocrata" },
    { nome: "Costeira", slug: "costeira" },
  ],
};

const UpgradeSsdSaoJosePinhais = () => <ServicoBairroTemplate data={data} />;
export default UpgradeSsdSaoJosePinhais;
