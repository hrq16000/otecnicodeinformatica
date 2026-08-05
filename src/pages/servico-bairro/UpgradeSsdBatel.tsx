import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Upgrade SSD e Memória no Batel Curitiba | Melhore seu PC | Técnico Curitiba",
  metaDescription: "Upgrade de SSD e memória RAM no Batel, Curitiba. Seu computador até 10x mais rápido. Instalação profissional com garantia. A partir de R$ 149,99.",
  
  servico: "Upgrade SSD e Memória",
  servicoSlug: "upgrade-ssd-memoria",
  bairro: "Batel",
  bairroSlug: "batel",
  cidade: "Curitiba",
  
  h1: "Upgrade de SSD e Memória RAM no Batel",
  subtitulo: "Transforme seu computador com SSD e mais memória RAM. Até 10x mais velocidade com instalação profissional no Batel.",
  
  precoBase: "R$ 149,99",
  precoDescricao: "Serviço de instalação + clonagem do sistema. Peças com valores à parte.",
  
  descricaoLonga: `Seu notebook ou desktop está lento no Batel? O upgrade para SSD é a solução mais eficaz para 
    transformar o desempenho do seu equipamento. Nossa equipe realiza a troca com clonagem completa 
    do sistema — você não perde nada e ganha velocidade imediata. Também realizamos upgrade de memória 
    RAM para multitarefa sem travamentos. Atendemos residências na Alameda Dom Pedro II, escritórios 
    na Rua Comendador Araújo e empresas próximas ao Shopping Crystal.`,
  
  beneficios: [
    "SSD NVMe ou SATA de alta performance",
    "Clonagem completa do sistema operacional",
    "Sem perda de dados ou programas",
    "Upgrade de memória RAM DDR4/DDR5",
    "Boot do Windows em menos de 15 segundos",
    "Programas abrindo instantaneamente",
    "Garantia de 1 ano nas peças",
    "Atendimento a domicílio no Batel",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Verificamos compatibilidade e recomendamos o melhor SSD/RAM" },
    { titulo: "Backup", descricao: "Clonagem completa do sistema atual para o novo SSD" },
    { titulo: "Instalação", descricao: "Troca do HD pelo SSD e/ou adição de memória RAM" },
    { titulo: "Teste", descricao: "Verificação de performance e entrega funcionando" },
  ],
  
  faq: [
    { 
      pergunta: "Preciso reinstalar o Windows após o upgrade?", 
      resposta: "Não! Fazemos a clonagem completa do seu sistema para o SSD. Tudo fica exatamente como estava, só que muito mais rápido." 
    },
    { 
      pergunta: "Qual SSD vocês recomendam?", 
      resposta: "Trabalhamos com marcas confiáveis como Kingston, Samsung e WD. Recomendamos o melhor custo-benefício para cada caso." 
    },
    { 
      pergunta: "Quanto de RAM meu notebook suporta?", 
      resposta: "Verificamos o modelo exato do seu equipamento e informamos a capacidade máxima suportada antes de qualquer serviço." 
    },
    { 
      pergunta: "Vocês vendem as peças também?", 
      resposta: "Sim! Fornecemos SSD e memória RAM com preços competitivos e garantia de fábrica inclusa." 
    },
  ],
  
  pontosReferencia: [
    "Alameda Dom Pedro II",
    "Rua Comendador Araújo",
    "Shopping Crystal",
    "Praça do Japão",
    "Rua Visconde de Nácar",
    "Shopping Curitiba",
    "Praça Osório",
  ],
  
  tempoAtendimento: "Atendimento conforme a agenda",
  
  servicosRelacionados: [
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Montagem de PC", slug: "montagem-pc" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "Portão", slug: "portao" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
  ],
};

const UpgradeSsdBatel = () => <ServicoBairroTemplate data={data} />;
export default UpgradeSsdBatel;
