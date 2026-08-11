import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Backup e Recuperação de Dados no Centro de Curitiba | O Técnico de Informática",
  metaDescription: "Backup e recuperação de dados no Centro de Curitiba. HD, SSD, pendrive e nuvem. Recuperação de arquivos deletados e HD com defeito. A partir de R$ 89,99.",
  
  servico: "Backup e Recuperação de Dados",
  servicoSlug: "backup-recuperacao",
  bairro: "Centro",
  bairroSlug: "centro",
  cidade: "Curitiba",
  
  h1: "Backup e Recuperação de Dados no Centro de Curitiba",
  subtitulo: "Proteja seus arquivos com backup profissional ou recupere dados perdidos. Atendimento urgente no Centro com técnico especializado.",
  
  precoBase: "R$ 89,99",
  precoDescricao: "Backup completo ou avaliação de recuperação. Valor pode variar conforme complexidade.",
  
  descricaoLonga: `Perdeu arquivos importantes no Centro de Curitiba? Ou precisa de um backup profissional para 
    proteger seus dados? Nossa equipe atende toda a região central com urgência. Realizamos backup 
    em HD externo, nuvem, NAS e pendrive. Para recuperação, trabalhamos com HDs danificados, SSDs 
    com falha, pendrives corrompidos e cartões de memória. Atendemos escritórios de advocacia na 
    Rua XV, contabilidades na Praça Tiradentes e empresas em toda região central que precisam 
    de segurança total nos dados.`,
  
  beneficios: [
    "Backup completo em HD externo ou nuvem",
    "Recuperação de HD com defeito mecânico",
    "Recuperação de SSD e pendrive corrompido",
    "Resgate de arquivos deletados acidentalmente",
    "Configuração de backup automático",
    "Migração segura de dados entre equipamentos",
    "Criptografia de backup para segurança",
    "Atendimento urgente disponível",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Analisamos a situação e chances de recuperação" },
    { titulo: "Valor do atendimento", descricao: "Informamos o valor antes de qualquer procedimento" },
    { titulo: "Execução", descricao: "Realizamos backup ou recuperação com ferramentas profissionais" },
    { titulo: "Entrega", descricao: "Seus dados seguros e organizados de volta" },
  ],
  
  faq: [
    { 
      pergunta: "É possível recuperar dados de HD que não liga?", 
      resposta: "Em muitos casos sim! Utilizamos ferramentas profissionais para acessar discos com falha. Fazemos avaliação gratuita para informar as chances de recuperação." 
    },
    { 
      pergunta: "Quanto custa recuperar dados?", 
      resposta: "O valor varia conforme a complexidade. Recuperações simples (arquivos deletados) a partir de R$ 89,99. Casos de HD com defeito físico têm valor personalizado." 
    },
    { 
      pergunta: "Vocês configuram backup automático?", 
      resposta: "Sim! Configuramos backup automático local e em nuvem para que você nunca mais perca dados importantes." 
    },
    { 
      pergunta: "Atendem empresas com urgência?", 
      resposta: "Sim! Para empresas no Centro oferecemos atendimento emergencial com prioridade máxima para recuperação de dados críticos." 
    },
  ],
  
  pontosReferencia: [
    "Rua XV de Novembro",
    "Praça Tiradentes",
    "Rua Marechal Deodoro",
    "Largo da Ordem",
    "Praça Santos Andrade",
    "Rua Barão do Rio Branco",
    "Shopping Estação",
  ],
  
  tempoAtendimento: "Atendimento urgente disponível",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Batel", slug: "batel" },
    { nome: "Portão", slug: "portao" },
    { nome: "CIC", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
  ],
};

const BackupCentro = () => <ServicoBairroTemplate data={data} />;
export default BackupCentro;
