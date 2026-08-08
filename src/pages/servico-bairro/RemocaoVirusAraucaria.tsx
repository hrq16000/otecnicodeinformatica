import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus em Araucária | Técnico Especializado | Técnico Curitiba",
  metaDescription: "Remoção de vírus e malware em Araucária. Limpeza completa, antivírus profissional e proteção avançada. Atendimento domiciliar. A partir de R$ 89,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "Araucária",
  bairroSlug: "araucaria",
  cidade: "Araucária",
  
  h1: "Remoção de Vírus em Araucária",
  subtitulo: "Computador infectado? Removemos vírus, malware e ransomware com técnico especializado em Araucária.",
  
  precoBase: "R$ 99,99",
  precoDescricao: "Inclui diagnóstico, remoção completa, antivírus profissional e visita domiciliar.",
  
  descricaoLonga: `Vírus e malware podem comprometer dados pessoais e empresariais em Araucária. Nossa equipe 
    especializada realiza remoção completa de todas as ameaças digitais, restaurando a segurança e o 
    desempenho do seu computador. Atendemos residências no Centro, Capela Velha e Thomaz Coelho, além 
    de empresas no distrito industrial. Após a limpeza, instalamos proteção profissional e orientamos 
    sobre práticas seguras de navegação para evitar novas infecções.`,
  
  beneficios: [
    "Diagnóstico completo de ameaças",
    "Remoção de vírus e malware",
    "Antivírus profissional instalado",
    "Proteção contra ransomware",
    "Atendimento em toda Araucária",
    "Recuperação de arquivos quando possível",
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
      pergunta: "Vocês atendem emergências em Araucária?", 
      resposta: "Sim! Para casos urgentes como ransomware em empresas, temos atendimento prioritário conforme a disponibilidade da agenda." 
    },
    { 
      pergunta: "Atendem empresas do polo industrial?", 
      resposta: "Sim! Atendemos empresas de todos os portes no distrito industrial com soluções corporativas de segurança." 
    },
    { 
      pergunta: "Meus dados ficam seguros durante a remoção?", 
      resposta: "Sim! Fazemos backup preventivo antes de qualquer procedimento para garantir a segurança dos seus arquivos." 
    },
    { 
      pergunta: "Qual antivírus vocês recomendam?", 
      resposta: "Instalamos antivírus profissionais como Kaspersky, Bitdefender ou ESET, dependendo do perfil de uso." 
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
  
  tempoAtendimento: "Atendimento emergencial disponível",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Backup e Recuperação", slug: "backup-recuperacao" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Campo Largo", slug: "campo-largo" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const RemocaoVirusAraucaria = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusAraucaria;
