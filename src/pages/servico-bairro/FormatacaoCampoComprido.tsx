import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador no Campo Comprido Curitiba | Técnico Curitiba",
  metaDescription: "Formatação de computador e notebook no Campo Comprido, Curitiba. Windows 10/11 original, backup completo e programas. a partir de R$ 99,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "Campo Comprido",
  bairroSlug: "campo-comprido",
  cidade: "Curitiba",
  
  h1: "Formatação de Computador no Campo Comprido",
  subtitulo: "Formatação completa com backup seguro e instalação de Windows original. Atendimento a domicílio no Campo Comprido.",
  
  precoBase: "R$ 69,99",
  precoDescricao: "Inclui Windows, drivers e programas essenciais. Atendimento a domicílio.",
  
  descricaoLonga: `Precisa formatar seu computador ou notebook no Campo Comprido? Atendemos toda a região com 
    agilidade, incluindo residências próximas ao Shopping Barigüi, escritórios na Rua Eduardo 
    Sprada e condomínios da região. Realizamos formatação completa com backup de todos os seus 
    arquivos, instalação do Windows 10 ou 11 original, drivers atualizados, Office, navegadores 
    e antivírus. O Campo Comprido tem crescido muito e atendemos a demanda crescente com 
    prioridade e atendimento no mesmo dia.`,
  
  beneficios: [
    "Backup completo antes da formatação",
    "Windows 10 ou 11 original e ativado",
    "Drivers completos e atualizados",
    "Pacote Office e programas essenciais",
    "Antivírus profissional configurado",
    "Otimização para máximo desempenho",
    "Garantia de 90 dias no serviço",
    "Atendimento a domicílio rápido",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Agende pelo WhatsApp com seu endereço" },
    { titulo: "Backup", descricao: "Salvamos todos os seus dados importantes" },
    { titulo: "Formatação", descricao: "Instalação completa do sistema e programas" },
    { titulo: "Entrega", descricao: "Computador pronto e otimizado" },
  ],
  
  faq: [
    { 
      pergunta: "Atendem perto do Shopping Barigüi?", 
      resposta: "Sim! Atendemos toda região do Campo Comprido, incluindo proximidades do Shopping Barigüi, Rua Eduardo Sprada e arredores." 
    },
    { 
      pergunta: "Formatam computador gamer?", 
      resposta: "Sim! Formatamos e otimizamos PCs gamer com drivers específicos para placa de vídeo, configurações de performance e programas essenciais para jogos." 
    },
    { 
      pergunta: "Quanto tempo demora a formatação?", 
      resposta: "Em média 1 a 2 horas, incluindo backup e instalação de todos os programas." 
    },
    { 
      pergunta: "Instalam dual boot Linux?", 
      resposta: "Sim! Configuramos dual boot Windows + Linux (Ubuntu, Mint, etc.) para quem precisa dos dois sistemas." 
    },
  ],
  
  pontosReferencia: [
    "Shopping Barigüi",
    "Rua Eduardo Sprada",
    "Av. Juscelino Kubitschek",
    "Parque Barigüi",
    "Terminal Campo Comprido",
    "Rua Professor Pedro Viriato",
    "Condor Campo Comprido",
  ],
  
  tempoAtendimento: "Atendimento no mesmo dia",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "CIC", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Portão", slug: "portao" },
    { nome: "Centro", slug: "centro" },
  ],
};

const FormatacaoCampoComprido = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoCampoComprido;
