import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus em Campo Largo | Técnico Especializado | Técnico Curitiba",
  metaDescription: "Remoção de vírus e malware em Campo Largo. Limpeza completa, antivírus profissional. Atendimento domiciliar em todos os bairros. A partir de R$ 89,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "Campo Largo",
  bairroSlug: "campo-largo",
  cidade: "Campo Largo",
  
  h1: "Remoção de Vírus em Campo Largo",
  subtitulo: "Computador com vírus em Campo Largo? Removemos todas as ameaças com técnico especializado local.",
  
  precoBase: "R$ 99,99",
  precoDescricao: "Inclui diagnóstico, remoção completa e antivírus profissional.",
  
  descricaoLonga: `Se seu computador em Campo Largo está lento, com pop-ups ou comportamento estranho, pode estar 
    infectado por vírus ou malware. Nossa equipe especializada realiza diagnóstico completo e remoção 
    total de todas as ameaças. Atendemos Centro, Ferraria, Jardim Guilhermina e toda a cidade com 
    visita domiciliar. Após a limpeza, configuramos proteção profissional para manter seu equipamento 
    seguro contra futuras infecções.`,
  
  beneficios: [
    "Diagnóstico completo do sistema",
    "Remoção de vírus e malware",
    "Antivírus profissional configurado",
    "Proteção contra ransomware",
    "Atendimento domiciliar em Campo Largo",
    "Recuperação de arquivos",
    "Garantia de 90 dias",
    "Orientação de segurança",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Descreva os sintomas pelo WhatsApp" },
    { titulo: "Diagnóstico", descricao: "Varredura completa" },
    { titulo: "Remoção", descricao: "Eliminação de todas as ameaças" },
    { titulo: "Proteção", descricao: "Antivírus ativo e configurado" },
  ],
  
  faq: [
    { 
      pergunta: "Atendem emergências em Campo Largo?", 
      resposta: "Sim! Para casos urgentes temos atendimento prioritário no mesmo dia." 
    },
    { 
      pergunta: "Vocês atendem na Ferraria e região rural?", 
      resposta: "Sim! Atendemos todos os bairros e distritos de Campo Largo, incluindo Ferraria e região." 
    },
    { 
      pergunta: "Quanto tempo leva a remoção?", 
      resposta: "Em média 2 a 4 horas, dependendo da gravidade. Casos complexos podem levar mais tempo." 
    },
    { 
      pergunta: "Meus arquivos estão seguros?", 
      resposta: "Fazemos backup preventivo antes de qualquer procedimento para garantir seus dados." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Campo Largo",
    "Prefeitura Municipal",
    "Shopping Campo Largo",
    "Ferraria",
    "Jardim Guilhermina",
    "Rua XV de Novembro",
  ],
  
  tempoAtendimento: "Atendimento emergencial disponível",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Backup e Recuperação", slug: "backup-recuperacao" },
  ],
  
  bairrosProximos: [
    { nome: "Araucária", slug: "araucaria" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
  ],
};

const RemocaoVirusCampoLargo = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusCampoLargo;
