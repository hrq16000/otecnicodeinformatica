import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus em São José dos Pinhais | Técnico Especializado | Técnico Curitiba",
  metaDescription: "Remoção de vírus, malware e ransomware em São José dos Pinhais. Limpeza completa, proteção avançada e atendimento domiciliar. A partir de R$ 89,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "São José dos Pinhais",
  bairroSlug: "sao-jose-dos-pinhais",
  cidade: "São José dos Pinhais",
  
  h1: "Remoção de Vírus em São José dos Pinhais",
  subtitulo: "Seu computador lento ou com comportamento estranho? Removemos vírus, malware e spyware com técnico local em SJP.",
  
  precoBase: "R$ 69,99",
  precoDescricao: "Inclui diagnóstico, remoção completa, instalação de antivírus e atendimento a domicílio.",
  
  descricaoLonga: `Computadores infectados por vírus são um problema cada vez mais comum em São José dos Pinhais, 
    especialmente em empresas do distrito industrial e escritórios do Centro. Nossa equipe especializada 
    realiza a remoção completa de vírus, malware, trojans, ransomware e spyware, restaurando o desempenho 
    original do seu computador. Atendemos desde residências no Afonso Pena até empresas na região do 
    aeroporto, sempre com diagnóstico preciso e solução definitiva. Após a limpeza, instalamos proteção 
    profissional para evitar novas infecções.`,
  
  beneficios: [
    "Diagnóstico completo de ameaças",
    "Remoção de vírus, malware e ransomware",
    "Instalação de antivírus profissional",
    "Recuperação de arquivos quando possível",
    "Atendimento em toda SJP e região",
    "Técnico especializado em segurança",
    "Garantia de 90 dias contra reinfecção",
    "Orientação de segurança digital",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Descreva os sintomas via WhatsApp" },
    { titulo: "Diagnóstico", descricao: "Identificamos todas as ameaças" },
    { titulo: "Remoção", descricao: "Limpeza completa e segura" },
    { titulo: "Proteção", descricao: "Antivírus instalado e configurado" },
  ],
  
  faq: [
    { 
      pergunta: "Como sei se meu computador está com vírus?", 
      resposta: "Sintomas comuns: lentidão excessiva, pop-ups estranhos, programas abrindo sozinhos, arquivos desaparecendo ou sendo criptografados. Se notar qualquer um desses sinais, entre em contato." 
    },
    { 
      pergunta: "Vocês atendem empresas com múltiplos computadores em SJP?", 
      resposta: "Sim! Atendemos empresas de todos os portes. Para múltiplos computadores, oferecemos desconto progressivo e contratos de manutenção preventiva." 
    },
    { 
      pergunta: "É possível recuperar arquivos após vírus ransomware?", 
      resposta: "Em muitos casos sim, dependendo do tipo de ransomware. Fazemos análise detalhada e tentamos todas as técnicas de recuperação disponíveis." 
    },
    { 
      pergunta: "Quanto tempo leva a remoção de vírus?", 
      resposta: "Em média 2 a 4 horas, dependendo da gravidade da infecção. Casos mais complexos podem levar até 24 horas." 
    },
  ],
  
  pontosReferencia: [
    "Centro de São José dos Pinhais",
    "Aeroporto Afonso Pena",
    "Shopping São José",
    "Avenida Rui Barbosa",
    "Distrito Industrial de SJP",
    "Terminal de Ônibus de SJP",
  ],
  
  tempoAtendimento: "Atendimento emergencial conforme a disponibilidade da agenda",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Backup e Recuperação", slug: "backup-recuperacao" },
  ],
  
  bairrosProximos: [
    { nome: "Afonso Pena", slug: "afonso-pena" },
    { nome: "Cruzeiro", slug: "cruzeiro" },
    { nome: "Aristocrata", slug: "aristocrata" },
    { nome: "Costeira", slug: "costeira" },
  ],
};

const RemocaoVirusSaoJosePinhais = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusSaoJosePinhais;
