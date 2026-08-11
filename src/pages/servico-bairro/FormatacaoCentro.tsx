import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador no Centro de Curitiba | Atendimento Rápido | O Técnico de Informática",
  metaDescription: "Formatação de computador e notebook no Centro de Curitiba. Windows 10/11, backup completo, drivers e programas. Atendimento conforme a agenda. a partir de R$ 99,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "Centro",
  bairroSlug: "centro",
  cidade: "Curitiba",
  
  h1: "Formatação de Computador no Centro de Curitiba",
  subtitulo: "Reinstalação completa do Windows com backup de dados. Técnico especializado no Centro com Atendimento conforme a agenda.",
  
  precoBase: "R$ 99,99",
  precoDescricao: "Inclui Windows, drivers e programas essenciais. Atendimento a domicílio ou no local.",
  
  descricaoLonga: `Precisa formatar seu computador ou notebook no Centro de Curitiba? Nossa equipe técnica 
    atende toda a região central com agilidade e profissionalismo. Realizamos a formatação completa 
    com backup de todos os seus arquivos, instalação do Windows 10 ou 11 original, drivers atualizados 
    e programas essenciais como Office, navegadores e antivírus. Atendemos desde escritórios na 
    Rua XV de Novembro até residências próximas ao Largo da Ordem. Por estarmos estrategicamente 
    localizados, oferecemos tempo de chegada reduzido para toda a região central.`,
  
  beneficios: [
    "Backup completo de documentos, fotos e vídeos",
    "Windows 10 ou 11 original e atualizado",
    "Drivers de hardware completos",
    "Office, navegadores e antivírus instalados",
    "Otimização para máximo desempenho",
    "Restauração de arquivos na organização original",
    "Garantia de 90 dias no serviço",
    "Atendimento conforme a agenda",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Agende via WhatsApp e confirme seu endereço no Centro" },
    { titulo: "Backup", descricao: "Salvamos todos os seus arquivos importantes" },
    { titulo: "Formatação", descricao: "Instalamos Windows e programas completos" },
    { titulo: "Entrega", descricao: "Computador pronto e funcionando perfeitamente" },
  ],
  
  faq: [
    { 
      pergunta: "Qual o tempo de atendimento no Centro?", 
      resposta: "Por ser região central, conseguimos Atendimento conforme a agenda na maioria dos casos. Tempo de chegada estimado: 30-60 minutos após confirmação." 
    },
    { 
      pergunta: "Vocês atendem empresas no Centro?", 
      resposta: "Sim! Atendemos escritórios, lojas e empresas em toda região central. Oferecemos atendimento prioritário para empresas com contrato de suporte." 
    },
    { 
      pergunta: "Fazem backup antes de formatar?", 
      resposta: "Sim, sempre! Salvamos todos os documentos, fotos, vídeos e arquivos importantes antes de iniciar a formatação." 
    },
    { 
      pergunta: "Quanto tempo demora a formatação?", 
      resposta: "Em média 1 a 2 horas, dependendo da quantidade de dados para backup e do hardware do equipamento." 
    },
  ],
  
  pontosReferencia: [
    "Rua XV de Novembro",
    "Praça Tiradentes",
    "Largo da Ordem",
    "Rua das Flores",
    "Praça Santos Andrade",
    "Shopping Estação",
    "Rodoferroviária",
  ],
  
  tempoAtendimento: "Atendimento conforme a agenda",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Batel", slug: "batel" },
    { nome: "Rebouças", slug: "reboucas" },
    { nome: "Alto da XV", slug: "alto-da-xv" },
    { nome: "Mercês", slug: "merces" },
  ],
};

const FormatacaoCentro = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoCentro;
