import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus no Portão Curitiba | Limpeza Completa | Técnico Curitiba",
  metaDescription: "Remoção de vírus e malware no Portão, Curitiba. Limpeza completa, recuperação de dados, proteção antivírus. Atendimento domiciliar. A partir de R$ 79,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "Portão",
  bairroSlug: "portao",
  cidade: "Curitiba",
  
  h1: "Remoção de Vírus no Portão – Curitiba",
  subtitulo: "Limpeza completa de vírus, malware e programas indesejados. Seu computador seguro e rápido novamente.",
  
  precoBase: "R$ 79,99",
  precoDescricao: "Remoção completa + instalação de antivírus. Atendimento a domicílio no Portão.",
  
  descricaoLonga: `O Portão é um dos bairros mais populosos e movimentados de Curitiba, com grande 
    demanda por serviços de informática. Nossa equipe atende toda a região do Portão com 
    especialidade em remoção de vírus, malware, ransomware e programas indesejados. Utilizamos 
    ferramentas profissionais para garantir a limpeza completa do sistema, sem prejudicar seus 
    arquivos. Após a remoção, instalamos proteção antivírus atualizada para prevenir novas 
    infecções. Atendemos desde residências próximas ao Shopping Palladium até escritórios na 
    região da Avenida Presidente Kennedy.`,
  
  beneficios: [
    "Remoção completa de vírus e malware",
    "Eliminação de ransomware e spyware",
    "Remoção de programas indesejados (bloatware)",
    "Limpeza de pop-ups e propagandas",
    "Recuperação de arquivos sequestrados",
    "Instalação de antivírus profissional",
    "Otimização do sistema pós-limpeza",
    "Garantia de 90 dias sobre o serviço executado",
  ],
  
  processoPasso: [
    { titulo: "Diagnóstico", descricao: "Identificamos todas as ameaças no sistema" },
    { titulo: "Remoção", descricao: "Eliminamos vírus, malware e ameaças" },
    { titulo: "Proteção", descricao: "Instalamos antivírus atualizado" },
    { titulo: "Prevenção", descricao: "Orientamos sobre navegação segura" },
  ],
  
  faq: [
    { 
      pergunta: "Meus arquivos serão perdidos na remoção?", 
      resposta: "Não! Removemos apenas os vírus e arquivos maliciosos. Seus documentos, fotos e arquivos pessoais são preservados." 
    },
    { 
      pergunta: "Como pego vírus no computador?", 
      resposta: "Vírus podem vir de downloads suspeitos, e-mails falsos, pendrives infectados e sites não confiáveis. Orientamos sobre prevenção após o serviço." 
    },
    { 
      pergunta: "Vocês removem ransomware?", 
      resposta: "Sim, removemos ransomware e tentamos recuperar arquivos criptografados quando possível. Em casos severos, recomendamos formatação." 
    },
    { 
      pergunta: "Qual antivírus vocês instalam?", 
      resposta: "Instalamos soluções gratuitas de qualidade (Kaspersky, Bitdefender) ou configuramos antivírus pago se o cliente preferir." 
    },
  ],
  
  pontosReferencia: [
    "Shopping Palladium",
    "Av. Presidente Kennedy",
    "Terminal do Portão",
    "Rua Padre Anchieta",
    "Hospital da Cruz Vermelha",
    "Parque Tingui (proximidades)",
  ],
  
  tempoAtendimento: "Atendimento em até 2 horas",
  
  servicosRelacionados: [
    { nome: "Formatação", slug: "formatacao-computador" },
    { nome: "Backup de Dados", slug: "backup-recuperacao" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
  ],
  
  bairrosProximos: [
    { nome: "Água Verde", slug: "agua-verde" },
    { nome: "Novo Mundo", slug: "novo-mundo" },
    { nome: "Santa Quitéria", slug: "santa-quiteria" },
    { nome: "Fazendinha", slug: "fazendinha" },
  ],
};

const RemocaoVirusPortao = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusPortao;
