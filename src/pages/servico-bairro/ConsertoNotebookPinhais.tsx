import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook em Pinhais | Todas as Marcas | O Técnico de Informática",
  metaDescription: "Conserto de notebook em Pinhais. Tela, teclado, bateria, placa-mãe. atendimento sem compromisso, busca e entrega domiciliar.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "Pinhais",
  bairroSlug: "pinhais",
  cidade: "Pinhais",
  
  h1: "Conserto de Notebook em Pinhais",
  subtitulo: "Notebook com problema em Pinhais? Consertamos todas as marcas com atendimento sem compromisso e busca domiciliar.",
  
  precoBase: "R$ 139,99",
  precoDescricao: "atendimento sem compromisso. Valor conforme o reparo necessário.",
  
  descricaoLonga: `Precisa de conserto de notebook em Pinhais? Nossa equipe técnica atende toda a cidade com 
    diagnóstico rápido e reparo de qualidade. Trabalhamos com todas as marcas: Dell, HP, Lenovo, Acer, 
    Asus, Samsung e Apple. Resolvemos problemas de tela quebrada, teclado com defeito, bateria viciada, 
    dobradiça solta, superaquecimento e falhas na placa-mãe. Buscamos o notebook no seu endereço em 
    Pinhais e devolvemos consertado.`,
  
  beneficios: [
    "Valor do atendimento 100% gratuito",
    "Todas as marcas de notebook",
    "Troca de tela e teclado",
    "Reparo de placa-mãe",
    "Busca e entrega em Pinhais",
    "Peças de qualidade garantida",
    "Garantia de 90 dias",
    "Diagnóstico em 24 horas",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Envie o problema pelo WhatsApp" },
    { titulo: "Busca", descricao: "Retiramos no seu endereço" },
    { titulo: "Reparo", descricao: "Conserto com peças de qualidade" },
    { titulo: "Entrega", descricao: "Devolvemos funcionando" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês buscam o notebook em Pinhais?", 
      resposta: "Sim! Buscamos e entregamos em todos os bairros de Pinhais sem custo adicional." 
    },
    { 
      pergunta: "Consertam MacBook em Pinhais?", 
      resposta: "Sim! Trabalhamos com MacBook Air, MacBook Pro e todas as outras marcas." 
    },
    { 
      pergunta: "Quanto tempo leva?", 
      resposta: "Reparos simples: Conforme agenda. Placa-mãe: 3 a 5 dias úteis." 
    },
    { 
      pergunta: "O valor é realmente grátis?", 
      resposta: "Sim! Diagnóstico e valor são 100% gratuitos. Você só paga se aprovar o serviço." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Pinhais",
    "Weissópolis",
    "Pineville",
    "Avenida Iraí",
    "Emiliano Perneta",
    "Palmital",
  ],
  
  tempoAtendimento: "Diagnóstico em até 24 horas",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Centro (Curitiba)", slug: "centro" },
    { nome: "Batel (Curitiba)", slug: "batel" },
    { nome: "São José dos Pinhais", slug: "sao-jose-dos-pinhais" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const ConsertoNotebookPinhais = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookPinhais;
