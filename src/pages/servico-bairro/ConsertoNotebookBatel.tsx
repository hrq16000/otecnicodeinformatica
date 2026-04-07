import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook no Batel Curitiba | Reparo Profissional | Técnico Curitiba",
  metaDescription: "Conserto de notebook no Batel, Curitiba. Reparo de tela, teclado, bateria, placa-mãe e mais. Técnico especializado com atendimento premium. Orçamento grátis.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "Batel",
  bairroSlug: "batel",
  cidade: "Curitiba",
  
  h1: "Conserto de Notebook no Batel – Curitiba",
  subtitulo: "Reparo profissional para notebooks de todas as marcas. Atendimento premium no Batel com orçamento sem compromisso.",
  
  precoBase: "R$ 69,99",
  precoDescricao: "Visita técnica + diagnóstico. Orçamento grátis para moradores do Batel.",
  
  descricaoLonga: `O Batel é um dos bairros mais sofisticados de Curitiba, e nosso serviço de conserto 
    de notebook atende às expectativas de qualidade da região. Reparamos notebooks de todas as 
    marcas (Dell, HP, Lenovo, Asus, Acer, Samsung, Apple e mais) com peças de qualidade e 
    garantia de serviço. Atendemos desde apartamentos na Alameda Dr. Carlos de Carvalho até 
    escritórios executivos próximos ao Shopping Crystal. Para clientes do Batel, oferecemos 
    atendimento discreto, pontualidade e equipamentos de qualidade. Nosso técnico vai identificado 
    e com todos os equipamentos necessários para diagnóstico e reparo no local.`,
  
  beneficios: [
    "Reparo de tela LCD/LED quebrada",
    "Troca de teclado e touchpad",
    "Substituição de bateria",
    "Reparo de dobradiças e carcaça",
    "Diagnóstico de placa-mãe",
    "Limpeza térmica e troca de pasta",
    "Upgrade de memória e SSD",
    "Garantia de até 90 dias",
  ],
  
  processoPasso: [
    { titulo: "Agendamento", descricao: "Confirme via WhatsApp o melhor horário" },
    { titulo: "Diagnóstico", descricao: "Técnico avalia o problema no local" },
    { titulo: "Orçamento", descricao: "Apresentamos opções de reparo e valores" },
    { titulo: "Reparo", descricao: "Conserto rápido com peças de qualidade" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês consertam MacBooks no Batel?", 
      resposta: "Sim! Atendemos MacBooks e notebooks Apple com peças originais e compatíveis. Diagnóstico gratuito para moradores do Batel." 
    },
    { 
      pergunta: "Quanto tempo leva o conserto?", 
      resposta: "Reparos simples (tela, teclado, bateria) são feitos em até 24h. Reparos de placa-mãe podem levar 3-5 dias úteis." 
    },
    { 
      pergunta: "O atendimento é no meu apartamento?", 
      resposta: "Sim! Vamos até você no Batel. Para reparos mais complexos, retiramos o notebook e entregamos após o conserto." 
    },
    { 
      pergunta: "Vocês atendem empresas no Batel?", 
      resposta: "Sim, atendemos escritórios e empresas com contratos de manutenção e atendimento prioritário." 
    },
  ],
  
  pontosReferencia: [
    "Alameda Dr. Carlos de Carvalho",
    "Shopping Crystal",
    "Praça do Japão",
    "Alto da XV",
    "Rua Bispo Dom José",
    "Hospital Pequeno Príncipe",
    "Praça Espanha",
  ],
  
  tempoAtendimento: "Atendimento agendado no mesmo dia",
  
  servicosRelacionados: [
    { nome: "Formatação", slug: "formatacao-computador" },
    { nome: "Upgrade SSD", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Centro", slug: "centro" },
    { nome: "Água Verde", slug: "agua-verde" },
    { nome: "Bigorrilho", slug: "bigorrilho" },
    { nome: "Alto da XV", slug: "alto-da-xv" },
  ],
};

const ConsertoNotebookBatel = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookBatel;
