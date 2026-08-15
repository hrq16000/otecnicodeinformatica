import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador em Araucária | Técnico Local | O Técnico de Informática",
  metaDescription: "Formatação de computador e notebook em Araucária. Windows 10/11, backup completo, drivers e programas. Atendimento domiciliar. A partir de R$ 109,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "Araucária",
  bairroSlug: "araucaria",
  cidade: "Araucária",
  
  h1: "Formatação de Computador em Araucária",
  subtitulo: "Reinstalação completa do Windows com técnico local. Atendemos Centro, Capela Velha, Thomaz Coelho e toda Araucária.",
  
  precoBase: "R$ 119,99",
  precoDescricao: "Inclui Windows, drivers, programas essenciais e atendimento a domicílio em Araucária.",
  
  descricaoLonga: `Araucária é um importante polo industrial da região metropolitana de Curitiba e conta com 
    grande demanda por serviços de informática. Nossa equipe de técnicos especializados atende toda a 
    cidade com formatação completa de computadores e notebooks. Do Centro à Capela Velha, do Thomaz 
    Coelho ao Iguaçu, realizamos backup seguro, instalamos Windows original e todos os programas que 
    você precisa. Atendemos tanto residências quanto empresas do distrito industrial de Araucária, 
    sempre com preço justo e garantia de qualidade.`,
  
  beneficios: [
    "Backup completo antes da formatação",
    "Windows 10 ou 11 original",
    "Drivers atualizados para seu hardware",
    "Office, antivírus e navegadores",
    "Atendimento em toda Araucária",
    "Técnico local com chegada rápida",
    "Garantia de 90 dias",
    "Suporte pós-formatação incluso",
  ],
  
  processoPasso: [
    { titulo: "Agendamento", descricao: "Agende pelo WhatsApp o melhor horário" },
    { titulo: "Backup", descricao: "Salvamos todos os seus arquivos" },
    { titulo: "Formatação", descricao: "Windows reinstalado do zero" },
    { titulo: "Finalização", descricao: "Programas instalados e dados restaurados" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês atendem todos os bairros de Araucária?", 
      resposta: "Sim! Atendemos Centro, Capela Velha, Thomaz Coelho, Iguaçu, Cachoeira, Costeira, Vila Nova e todos os demais bairros." 
    },
    { 
      pergunta: "Atendem empresas no distrito industrial?", 
      resposta: "Sim! Atendemos empresas de todos os portes no distrito industrial de Araucária com contratos de manutenção mensal." 
    },
    { 
      pergunta: "Qual o prazo de atendimento em Araucária?", 
      resposta: "Agendamos para o Conforme agenda ou próximo dia útil. Confirmamos disponibilidade via WhatsApp." 
    },
    { 
      pergunta: "Tem taxa extra por ser Araucária?", 
      resposta: "O valor informado já inclui o deslocamento até Araucária. Sem surpresas no preço final." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Araucária",
    "Prefeitura de Araucária",
    "Refinaria Presidente Getúlio Vargas",
    "Parque Cachoeira",
    "Terminal de Ônibus",
    "Distrito Industrial",
  ],
  
  tempoAtendimento: "Agendamento para Conforme agenda ou próximo",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Campo Largo", slug: "campo-largo" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const FormatacaoAraucaria = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoAraucaria;
