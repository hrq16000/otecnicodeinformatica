import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus em Pinhais | Técnico Especializado | O Técnico de Informática",
  metaDescription: "Remoção de vírus e malware em Pinhais. Limpeza completa, antivírus profissional. Atendimento domiciliar. A partir de R$ 89,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "Pinhais",
  bairroSlug: "pinhais",
  cidade: "Pinhais",
  
  h1: "Remoção de Vírus em Pinhais",
  subtitulo: "Computador infectado em Pinhais? Removemos vírus, malware e spyware com técnico especializado local.",
  
  precoBase: "R$ 89,99",
  precoDescricao: "Inclui diagnóstico, remoção completa e antivírus profissional.",
  
  descricaoLonga: `Se seu computador em Pinhais está com vírus, lento ou apresentando comportamento estranho, 
    nossa equipe especializada resolve. Realizamos remoção completa de vírus, malware, trojans e 
    spyware, restaurando o desempenho original. Atendemos Centro, Weissópolis, Pineville e toda 
    Pinhais com visita domiciliar. Após a limpeza, instalamos antivírus profissional e configuramos 
    proteção permanente contra futuras ameaças.`,
  
  beneficios: [
    "Diagnóstico completo de ameaças",
    "Remoção total de vírus e malware",
    "Antivírus profissional instalado",
    "Proteção contra ransomware",
    "Atendimento domiciliar em Pinhais",
    "Recuperação de arquivos",
    "Garantia de 90 dias",
    "Orientação de segurança digital",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Descreva os sintomas pelo WhatsApp" },
    { titulo: "Diagnóstico", descricao: "Varredura completa do sistema" },
    { titulo: "Remoção", descricao: "Eliminação de todas as ameaças" },
    { titulo: "Proteção", descricao: "Antivírus configurado e ativo" },
  ],
  
  faq: [
    { 
      pergunta: "Em quanto tempo conseguem atender em Pinhais?", 
      resposta: "Sim! Para casos urgentes temos disponibilidade conforme a disponibilidade da agenda. Consulte via WhatsApp." 
    },
    { 
      pergunta: "Pinhais tem taxa extra?", 
      resposta: "Não! Pinhais é vizinha de Curitiba e não cobramos taxa adicional de deslocamento." 
    },
    { 
      pergunta: "Removem vírus de celular também?", 
      resposta: "Nosso foco é computadores e notebooks, mas podemos orientar sobre segurança em dispositivos móveis." 
    },
    { 
      pergunta: "Quanto tempo leva a remoção?", 
      resposta: "Em média 2 a 3 horas. Casos mais complexos podem levar mais tempo." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Pinhais",
    "Weissópolis",
    "Pineville",
    "Avenida Iraí",
    "Shopping Pinhais",
    "Terminal de Ônibus",
  ],
  
  tempoAtendimento: "Atendimento conforme a agenda disponível",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Backup e Recuperação", slug: "backup-recuperacao" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Centro (Curitiba)", slug: "centro" },
    { nome: "Batel (Curitiba)", slug: "batel" },
    { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const RemocaoVirusPinhais = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusPinhais;
