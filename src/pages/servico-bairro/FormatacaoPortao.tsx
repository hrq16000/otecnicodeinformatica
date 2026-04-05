import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador no Portão Curitiba | Rápido e Seguro | Técnico Curitiba",
  metaDescription: "Formatação de computador e notebook no Portão, Curitiba. Windows 10/11, backup completo e drivers. Atendimento a domicílio no mesmo dia. A partir de R$ 99,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "Portão",
  bairroSlug: "portao",
  cidade: "Curitiba",
  
  h1: "Formatação de Computador no Portão",
  subtitulo: "Reinstalação completa do Windows com backup seguro. Técnico no Portão com atendimento rápido a domicílio.",
  
  precoBase: "R$ 99,99",
  precoDescricao: "Inclui Windows, drivers e programas essenciais. Atendimento a domicílio.",
  
  descricaoLonga: `Precisa formatar seu computador no Portão? Nossa equipe atende toda a região com rapidez e 
    profissionalismo. Realizamos backup completo dos seus arquivos, instalação do Windows 10 ou 11 
    original, drivers atualizados e programas essenciais. Atendemos residências próximas ao Shopping 
    Palladium, escritórios na Av. República Argentina e empresas na região da Rua João Bettega. 
    O Portão é uma das regiões com maior concentração de clientes — por isso garantimos 
    atendimento prioritário e tempo de chegada reduzido.`,
  
  beneficios: [
    "Backup completo de documentos, fotos e vídeos",
    "Windows 10 ou 11 original e ativado",
    "Drivers de hardware atualizados",
    "Office, navegadores e antivírus instalados",
    "Otimização de inicialização do sistema",
    "Restauração organizada dos seus arquivos",
    "Garantia de 90 dias no serviço",
    "Atendimento a domicílio no mesmo dia",
  ],
  
  processoPasso: [
    { titulo: "Agendamento", descricao: "Entre em contato e confirme seu endereço no Portão" },
    { titulo: "Backup", descricao: "Salvamos todos os seus arquivos importantes" },
    { titulo: "Formatação", descricao: "Instalamos Windows e todos os programas" },
    { titulo: "Entrega", descricao: "PC pronto e funcionando como novo" },
  ],
  
  faq: [
    { 
      pergunta: "Quanto tempo leva para formatar no Portão?", 
      resposta: "Em média 1 a 2 horas. Por ser uma região próxima da nossa base, o tempo de chegada é de 20-40 minutos." 
    },
    { 
      pergunta: "Atendem perto do Shopping Palladium?", 
      resposta: "Sim! Atendemos toda região do Portão, incluindo proximidades do Palladium, Av. República Argentina e arredores." 
    },
    { 
      pergunta: "Podem formatar notebook também?", 
      resposta: "Sim, formatamos tanto desktops quanto notebooks de todas as marcas e modelos." 
    },
    { 
      pergunta: "Instalam programas específicos?", 
      resposta: "Sim! Além dos programas padrão, instalamos softwares específicos que você precisar, como AutoCAD, Photoshop, etc." 
    },
  ],
  
  pontosReferencia: [
    "Shopping Palladium",
    "Av. República Argentina",
    "Rua João Bettega",
    "Terminal do Portão",
    "Rua Padre Anchieta",
    "Mercadorama Portão",
    "Praça do Portão",
  ],
  
  tempoAtendimento: "Atendimento no mesmo dia",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "Batel", slug: "batel" },
    { nome: "CIC", slug: "cic" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
  ],
};

const FormatacaoPortao = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoPortao;
