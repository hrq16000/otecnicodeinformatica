import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook no Portão Curitiba | Reparo Rápido | Técnico Curitiba",
  metaDescription: "Conserto de notebook no Portão, Curitiba. Tela, teclado, placa-mãe, bateria e dobradiça. Diagnóstico gratuito e atendimento a domicílio. A partir de R$ 89,99.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "Portão",
  bairroSlug: "portao",
  cidade: "Curitiba",
  
  h1: "Conserto de Notebook no Portão",
  subtitulo: "Reparo profissional de notebooks de todas as marcas. Diagnóstico gratuito e atendimento rápido no Portão.",
  
  precoBase: "R$ 89,99",
  precoDescricao: "Diagnóstico gratuito. Valor do reparo varia conforme o problema.",
  
  descricaoLonga: `Notebook com problemas no Portão? Tela quebrada, teclado com defeito, superaquecimento ou não 
    liga? Nossa equipe realiza consertos profissionais de notebooks de todas as marcas: Dell, HP, 
    Lenovo, Acer, Asus, Samsung e Apple. Atendemos a domicílio em toda região do Portão, incluindo 
    proximidades do Shopping Palladium, Av. República Argentina e Terminal do Portão. Oferecemos 
    diagnóstico gratuito para que você saiba exatamente o problema antes de aprovar o reparo.`,
  
  beneficios: [
    "Troca de tela LCD/LED para todas as marcas",
    "Reparo e substituição de teclado",
    "Conserto de placa-mãe com micro-solda",
    "Troca de bateria e carregador",
    "Reparo de dobradiça e carcaça",
    "Limpeza interna e troca de pasta térmica",
    "Diagnóstico gratuito e sem compromisso",
    "Garantia de 90 dias em peças e serviço",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Descreva o problema pelo WhatsApp" },
    { titulo: "Diagnóstico", descricao: "Avaliação gratuita do notebook" },
    { titulo: "Valor do atendimento", descricao: "Valor aprovado antes de iniciar o reparo" },
    { titulo: "Reparo", descricao: "Conserto profissional com peças de qualidade" },
  ],
  
  faq: [
    { 
      pergunta: "Consertam notebooks Apple no Portão?", 
      resposta: "Sim! Realizamos reparos em MacBook Air e MacBook Pro, incluindo troca de tela, bateria, teclado e SSD." 
    },
    { 
      pergunta: "Quanto custa trocar a tela do notebook?", 
      resposta: "O valor varia conforme o modelo. Telas comuns a partir de R$ 250. Fazemos atendimento sem compromisso e sem compromisso." 
    },
    { 
      pergunta: "Meu notebook não liga, tem conserto?", 
      resposta: "Na maioria dos casos sim! Pode ser problema de fonte, bateria, placa-mãe ou software. O diagnóstico gratuito identifica a causa." 
    },
    { 
      pergunta: "Vocês buscam o notebook no Portão?", 
      resposta: "Sim! Podemos buscar e devolver o notebook no seu endereço no Portão sem custo adicional." 
    },
  ],
  
  pontosReferencia: [
    "Shopping Palladium",
    "Av. República Argentina",
    "Terminal do Portão",
    "Rua João Bettega",
    "Rua Padre Anchieta",
    "Mercadorama Portão",
    "Colégio Medianeira",
  ],
  
  tempoAtendimento: "Diagnóstico conforme a disponibilidade da agenda",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "Batel", slug: "batel" },
    { nome: "CIC", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
  ],
};

const ConsertoNotebookPortao = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookPortao;
