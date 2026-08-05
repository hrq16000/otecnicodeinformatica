import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus no Centro de Curitiba | Limpeza Completa | Técnico Curitiba",
  metaDescription: "Remoção de vírus e malware no Centro de Curitiba. Limpeza completa, proteção avançada e antivírus profissional. Atendimento conforme a agenda. A partir de R$ 79,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "Centro",
  bairroSlug: "centro",
  cidade: "Curitiba",
  
  h1: "Remoção de Vírus no Centro de Curitiba",
  subtitulo: "Limpeza completa de vírus, malware, ransomware e spyware. Proteção profissional com antivírus atualizado e atendimento rápido no Centro.",
  
  precoBase: "R$ 79,99",
  precoDescricao: "Inclui remoção completa, instalação de antivírus e orientação de segurança.",
  
  descricaoLonga: `Seu computador está lento, abrindo propagandas ou travando no Centro de Curitiba? Nossa equipe 
    especializada em segurança digital atende toda a região central com rapidez. Removemos vírus, 
    trojans, ransomware, adware e spyware utilizando ferramentas profissionais. Após a limpeza, 
    instalamos proteção avançada e orientamos sobre boas práticas de navegação. Atendemos escritórios 
    na Rua Marechal Deodoro, empresas na Praça Generoso Marques e residências próximas ao Passeio Público.`,
  
  beneficios: [
    "Remoção completa de vírus, trojans e malware",
    "Eliminação de ransomware e recuperação de arquivos",
    "Limpeza de adware e propagandas indesejadas",
    "Instalação de antivírus profissional",
    "Verificação de segurança do navegador",
    "Remoção de extensões maliciosas",
    "Otimização pós-limpeza do sistema",
    "Garantia de 90 dias no serviço",
  ],
  
  processoPasso: [
    { titulo: "Diagnóstico", descricao: "Análise completa para identificar todas as ameaças" },
    { titulo: "Remoção", descricao: "Eliminação de todos os vírus e malware encontrados" },
    { titulo: "Proteção", descricao: "Instalação de antivírus e firewall configurado" },
    { titulo: "Orientação", descricao: "Dicas de segurança para evitar futuras infecções" },
  ],
  
  faq: [
    { 
      pergunta: "Meus arquivos serão perdidos na remoção de vírus?", 
      resposta: "Não! Nosso processo preserva todos os seus arquivos. Em casos de ransomware, avaliamos a possibilidade de recuperação dos dados criptografados." 
    },
    { 
      pergunta: "Quanto tempo leva a remoção de vírus?", 
      resposta: "Em média 1 a 3 horas, dependendo da gravidade da infecção. Infecções mais complexas como ransomware podem levar mais tempo." 
    },
    { 
      pergunta: "Vocês atendem empresas no Centro?", 
      resposta: "Sim! Atendemos escritórios e empresas com prioridade. Oferecemos contratos de suporte com monitoramento contínuo de segurança." 
    },
    { 
      pergunta: "O antivírus instalado é gratuito ou pago?", 
      resposta: "Instalamos versões profissionais gratuitas de alta qualidade. Se preferir, também configuramos soluções pagas premium com desconto especial." 
    },
  ],
  
  pontosReferencia: [
    "Rua Marechal Deodoro",
    "Praça Generoso Marques",
    "Passeio Público",
    "Rua XV de Novembro",
    "Shopping Estação",
    "Praça Carlos Gomes",
    "Rodoferroviária",
  ],
  
  tempoAtendimento: "Atendimento conforme a agenda",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Backup e Recuperação", slug: "backup-recuperacao" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Batel", slug: "batel" },
    { nome: "Portão", slug: "portao" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
  ],
};

const RemocaoVirusCentro = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusCentro;
