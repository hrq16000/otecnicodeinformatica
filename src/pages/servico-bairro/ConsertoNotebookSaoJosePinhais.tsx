import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook em São José dos Pinhais | Técnico Especializado | Técnico Curitiba",
  metaDescription: "Conserto de notebook e PC em São José dos Pinhais. Tela, teclado, placa-mãe, fonte. Atendimento domiciliar em todos os bairros. atendimento sem compromisso.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "São José dos Pinhais",
  bairroSlug: "sao-jose-dos-pinhais",
  cidade: "São José dos Pinhais",
  
  h1: "Conserto de Notebook em São José dos Pinhais",
  subtitulo: "Notebook com defeito? Consertamos tela, teclado, bateria, dobradiça e placa-mãe com técnico local em SJP.",
  
  precoBase: "R$ 149,99",
  precoDescricao: "atendimento sem compromisso. Preço varia conforme o tipo de reparo necessário.",
  
  descricaoLonga: `São José dos Pinhais possui milhares de profissionais e estudantes que dependem de notebooks 
    no dia a dia. Quando o equipamento apresenta defeito, a produtividade para. Nossa equipe especializada 
    em conserto de notebooks atende toda SJP com diagnóstico preciso e reparo rápido. Trabalhamos com 
    todas as marcas: Dell, HP, Lenovo, Acer, Asus, Samsung e Apple. Desde problemas simples como troca 
    de teclado até reparos complexos em placa-mãe, temos a solução. Atendemos no Centro, Afonso Pena, 
    Cruzeiro e em toda a cidade.`,
  
  beneficios: [
    "atendimento sem compromisso e sem compromisso",
    "Todas as marcas de notebooks",
    "Troca de tela, teclado e bateria",
    "Reparo de placa-mãe e dobradiça",
    "Peças originais e compatíveis",
    "Atendimento domiciliar em SJP",
    "Garantia de 90 dias no reparo",
    "Diagnóstico em até 24 horas",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Descreva o problema do notebook" },
    { titulo: "Diagnóstico", descricao: "Identificamos o defeito exato" },
    { titulo: "valor do atendimento", descricao: "Aprovação antes de qualquer reparo" },
    { titulo: "Conserto", descricao: "Reparo com peças de qualidade" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês consertam todas as marcas de notebook?", 
      resposta: "Sim! Trabalhamos com Dell, HP, Lenovo, Acer, Asus, Samsung, Apple (MacBook) e todas as outras marcas do mercado." 
    },
    { 
      pergunta: "Quanto tempo leva o conserto de notebook em SJP?", 
      resposta: "Reparos simples (teclado, memória) são feitos conforme a disponibilidade da agenda. Reparos em placa-mãe podem levar 3 a 5 dias úteis dependendo da complexidade." 
    },
    { 
      pergunta: "O valor do atendimento é realmente gratuito?", 
      resposta: "Sim, o diagnóstico e valor do atendimento são 100% gratuitos. Você só paga se aprovar o serviço." 
    },
    { 
      pergunta: "Vocês buscam e entregam o notebook?", 
      resposta: "Sim! Buscamos o notebook no seu endereço em SJP e entregamos após o conserto, sem custo adicional para a maioria dos bairros." 
    },
  ],
  
  pontosReferencia: [
    "Centro de São José dos Pinhais",
    "Afonso Pena",
    "Shopping São José",
    "Avenida das Torres",
    "Parque da Fonte",
    "UFPR - Campus SJP",
  ],
  
  tempoAtendimento: "Diagnóstico em até 24 horas",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Afonso Pena", slug: "afonso-pena" },
    { nome: "Cruzeiro", slug: "cruzeiro" },
    { nome: "Aristocrata", slug: "aristocrata" },
    { nome: "Costeira", slug: "costeira" },
  ],
};

const ConsertoNotebookSaoJosePinhais = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookSaoJosePinhais;
