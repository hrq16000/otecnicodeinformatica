import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Remoção de Vírus no Batel Curitiba | Limpeza Profissional | O Técnico de Informática",
  metaDescription: "Remoção de vírus e malware no Batel, Curitiba. Limpeza completa, proteção avançada e antivírus profissional. Atendimento conforme a agenda. A partir de R$ 79,99.",
  
  servico: "Remoção de Vírus",
  servicoSlug: "remocao-virus",
  bairro: "Batel",
  bairroSlug: "batel",
  cidade: "Curitiba",
  
  h1: "Remoção de Vírus no Batel",
  subtitulo: "Limpeza profissional de vírus, malware e ransomware. Proteção avançada para seu computador no Batel.",
  
  precoBase: "R$ 79,99",
  precoDescricao: "Inclui remoção completa e instalação de antivírus profissional.",
  
  descricaoLonga: `Computador infectado no Batel? Propagandas aparecendo, lentidão extrema ou arquivos 
    criptografados? Nossa equipe de segurança digital atende o Batel com rapidez e eficiência. 
    Utilizamos ferramentas profissionais para identificar e remover todas as ameaças: vírus, 
    trojans, spyware, adware e ransomware. Após a limpeza, instalamos proteção avançada e 
    configuramos o firewall. Atendemos escritórios de advocacia, consultórios médicos, 
    empresas na Rua Comendador Araújo e residências em todo o Batel.`,
  
  beneficios: [
    "Remoção completa de todas as ameaças",
    "Eliminação de ransomware e criptografia",
    "Limpeza de propagandas e pop-ups",
    "Antivírus profissional instalado",
    "Firewall configurado",
    "Verificação de contas comprometidas",
    "Orientação de segurança personalizada",
    "Garantia de 90 dias no serviço",
  ],
  
  processoPasso: [
    { titulo: "Análise", descricao: "Scan completo para mapear todas as ameaças" },
    { titulo: "Remoção", descricao: "Eliminação de vírus e malware com ferramentas profissionais" },
    { titulo: "Proteção", descricao: "Antivírus, firewall e configurações de segurança" },
    { titulo: "Prevenção", descricao: "Orientação para evitar futuras infecções" },
  ],
  
  faq: [
    { 
      pergunta: "Meu computador foi atacado por ransomware, tem solução?", 
      resposta: "Em muitos casos conseguimos descriptografar ou recuperar os arquivos. Fazemos avaliação gratuita da situação antes de qualquer procedimento." 
    },
    { 
      pergunta: "Vocês atendem escritórios no Batel?", 
      resposta: "Sim! Atendemos escritórios, clínicas e empresas com prioridade. Oferecemos também contratos de suporte com monitoramento contínuo." 
    },
    { 
      pergunta: "Quanto tempo leva o serviço?", 
      resposta: "Em média 1 a 3 horas dependendo da gravidade. Infecções simples são resolvidas em 1 hora." 
    },
    { 
      pergunta: "O serviço pode ser feito remotamente?", 
      resposta: "Para muitos casos de vírus e malware, sim! Fazemos remoção remota com acesso seguro ao seu computador." 
    },
  ],
  
  pontosReferencia: [
    "Rua Comendador Araújo",
    "Shopping Crystal",
    "Praça do Japão",
    "Alameda Dom Pedro II",
    "Shopping Curitiba",
    "Rua Visconde de Nácar",
    "Praça Osório",
  ],
  
  tempoAtendimento: "Atendimento conforme a agenda",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Backup e Recuperação", slug: "backup-recuperacao" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "Portão", slug: "portao" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
  ],
};

const RemocaoVirusBatel = () => <ServicoBairroTemplate data={data} />;
export default RemocaoVirusBatel;
