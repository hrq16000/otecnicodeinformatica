// @ts-nocheck
import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador em Pinhais | Técnico Local | O Técnico de Informática",
  metaDescription: "Formatação de computador e notebook em Pinhais. Windows 10/11, backup, drivers. Atendimento domiciliar em todos os bairros. A partir de R$ 109,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "Pinhais",
  bairroSlug: "pinhais",
  cidade: "Pinhais",
  
  h1: "Formatação de Computador em Pinhais",
  subtitulo: "Formatação profissional com Windows original e técnico local. Atendemos Centro, Weissópolis, Pineville e toda Pinhais.",
  
  precoBase: "R$ 109,99",
  precoDescricao: "Inclui Windows, drivers, programas e atendimento a domicílio em Pinhais.",
  
  descricaoLonga: `Pinhais é uma das cidades mais próximas de Curitiba e possui forte atividade comercial e 
    residencial. Nossa equipe atende toda a cidade com formatação completa de computadores e notebooks. 
    Do Centro à Weissópolis, do Pineville ao Emiliano Perneta, realizamos backup seguro dos seus 
    arquivos, instalamos Windows original, drivers atualizados e todos os programas essenciais. 
    Atendemos residências e empresas com preço acessível e garantia de qualidade.`,
  
  beneficios: [
    "Backup completo antes da formatação",
    "Windows 10 ou 11 original",
    "Drivers completos e atualizados",
    "Office, antivírus e navegadores",
    "Atendimento em toda Pinhais",
    "Técnico local com chegada rápida",
    "Garantia de 90 dias",
    "Suporte pós-formatação incluso",
  ],
  
  processoPasso: [
    { titulo: "Agendamento", descricao: "Escolha o horário via WhatsApp" },
    { titulo: "Backup", descricao: "Arquivos salvos com segurança" },
    { titulo: "Formatação", descricao: "Sistema reinstalado do zero" },
    { titulo: "Finalização", descricao: "Programas instalados e dados restaurados" },
  ],
  
  faq: [
    { 
      pergunta: "Atendem todos os bairros de Pinhais?", 
      resposta: "Sim! Centro, Weissópolis, Pineville, Emiliano Perneta, Palmital, Maria Antonieta e todos os demais bairros." 
    },
    { 
      pergunta: "Tem taxa extra por ser Pinhais?", 
      resposta: "Não! O valor informado já inclui o deslocamento. Pinhais é bem próxima de Curitiba." 
    },
    { 
      pergunta: "Atendem no fim de semana?", 
      resposta: "Sim! Atendemos de segunda a sábado. Domingos sob consulta para casos urgentes." 
    },
    { 
      pergunta: "Formatam notebook também?", 
      resposta: "Sim! Formatamos computadores desktop e notebooks de todas as marcas." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Pinhais",
    "Prefeitura de Pinhais",
    "Avenida Iraí",
    "Shopping Pinhais",
    "Terminal de Ônibus",
    "Parque das Águas",
  ],
  
  tempoAtendimento: "Agendamento para Conforme agenda ou próximo",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Centro (Curitiba)", slug: "centro" },
    { nome: "Batel (Curitiba)", slug: "batel" },
    { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const FormatacaoPinhais = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoPinhais;
