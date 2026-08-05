import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook em Araucária | Todas as Marcas | Técnico Curitiba",
  metaDescription: "Conserto de notebook em Araucária. Tela, teclado, placa-mãe, bateria. Todas as marcas. Orçamento grátis e atendimento domiciliar.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "Araucária",
  bairroSlug: "araucaria",
  cidade: "Araucária",
  
  h1: "Conserto de Notebook em Araucária",
  subtitulo: "Notebook quebrado ou com defeito? Consertamos todas as marcas com técnico local em Araucária. Orçamento grátis.",
  
  precoBase: "R$ 149,99",
  precoDescricao: "Orçamento gratuito. Valor varia conforme o reparo necessário.",
  
  descricaoLonga: `Se você está em Araucária e precisa de conserto de notebook, nossa equipe técnica atende 
    toda a cidade com diagnóstico preciso e reparo rápido. Trabalhamos com todas as marcas e modelos, 
    desde problemas simples como troca de teclado e tela até reparos complexos em placa-mãe. 
    Atendemos profissionais, estudantes e empresas do Centro, Capela Velha, Thomaz Coelho e região 
    industrial. Buscamos e entregamos o notebook no seu endereço em Araucária.`,
  
  beneficios: [
    "Orçamento gratuito sem compromisso",
    "Todas as marcas de notebook",
    "Troca de tela, teclado e bateria",
    "Reparo de placa-mãe",
    "Busca e entrega em Araucária",
    "Peças de qualidade garantida",
    "Garantia de 90 dias no reparo",
    "Diagnóstico rápido",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Envie o problema pelo WhatsApp" },
    { titulo: "Diagnóstico", descricao: "Identificamos o defeito" },
    { titulo: "Orçamento", descricao: "Aprovação antes do reparo" },
    { titulo: "Entrega", descricao: "Notebook consertado e entregue" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês buscam o notebook em Araucária?", 
      resposta: "Sim! Buscamos e entregamos o notebook no seu endereço em todos os bairros de Araucária." 
    },
    { 
      pergunta: "Quanto tempo leva o conserto?", 
      resposta: "Reparos simples: Conforme agenda. Reparos em placa-mãe: 3 a 5 dias úteis. Informamos o prazo no orçamento." 
    },
    { 
      pergunta: "Consertam MacBook?", 
      resposta: "Sim! Trabalhamos com MacBook e todas as outras marcas. Peças compatíveis e originais disponíveis." 
    },
    { 
      pergunta: "Atendem empresas com frota de notebooks?", 
      resposta: "Sim! Oferecemos contratos de manutenção para empresas com múltiplos equipamentos em Araucária." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Araucária",
    "Capela Velha",
    "Thomaz Coelho",
    "Prefeitura de Araucária",
    "Parque Cachoeira",
    "Distrito Industrial",
  ],
  
  tempoAtendimento: "Diagnóstico em até 24 horas",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Campo Largo", slug: "campo-largo" },
    { nome: "Portão (Curitiba)", slug: "portao" },
  ],
};

const ConsertoNotebookAraucaria = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookAraucaria;
