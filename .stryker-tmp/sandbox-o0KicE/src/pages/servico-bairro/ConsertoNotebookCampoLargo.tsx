// @ts-nocheck
import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook em Campo Largo | Todas as Marcas | O Técnico de Informática",
  metaDescription: "Conserto de notebook em Campo Largo. Tela, teclado, bateria, placa-mãe. Todas as marcas. atendimento sem compromisso e busca domiciliar.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "Campo Largo",
  bairroSlug: "campo-largo",
  cidade: "Campo Largo",
  
  h1: "Conserto de Notebook em Campo Largo",
  subtitulo: "Notebook com defeito? Consertamos todas as marcas com atendimento sem compromisso e busca em Campo Largo.",
  
  precoBase: "R$ 149,99",
  precoDescricao: "atendimento sem compromisso. Valor conforme o reparo necessário.",
  
  descricaoLonga: `Precisa de conserto de notebook em Campo Largo? Nossa equipe técnica atende toda a cidade com 
    diagnóstico preciso e reparo de qualidade. Trabalhamos com Dell, HP, Lenovo, Acer, Asus, Samsung e 
    Apple. Resolvemos problemas de tela, teclado, bateria, dobradiça, placa-mãe e superaquecimento. 
    Buscamos o notebook no seu endereço em Campo Largo e entregamos após o conserto.`,
  
  beneficios: [
    "atendimento sem compromisso",
    "Todas as marcas atendidas",
    "Troca de tela e teclado",
    "Reparo de placa-mãe",
    "Busca e entrega domiciliar",
    "Peças de qualidade",
    "Garantia de 90 dias",
    "Diagnóstico em 24 horas",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Descreva o problema do notebook" },
    { titulo: "Busca", descricao: "Retiramos no seu endereço" },
    { titulo: "Reparo", descricao: "Conserto com peças de qualidade" },
    { titulo: "Entrega", descricao: "Devolvemos funcionando perfeitamente" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês buscam o notebook em Campo Largo?", 
      resposta: "Sim! Buscamos e entregamos em todos os bairros de Campo Largo sem custo adicional." 
    },
    { 
      pergunta: "Consertam notebook gamer?", 
      resposta: "Sim! Trabalhamos com notebooks gamers de todas as marcas, incluindo limpeza térmica e repaste." 
    },
    { 
      pergunta: "Quanto tempo leva o conserto?", 
      resposta: "Reparos simples conforme a disponibilidade da agenda. Placa-mãe: 3 a 5 dias úteis." 
    },
    { 
      pergunta: "Atendem no sábado?", 
      resposta: "Sim! Atendemos de segunda a sábado. Agende pelo WhatsApp." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Campo Largo",
    "Shopping Campo Largo",
    "Ferraria",
    "Jardim Guilhermina",
    "Prefeitura Municipal",
    "Rua XV de Novembro",
  ],
  
  tempoAtendimento: "Diagnóstico em até 24 horas",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  
  bairrosProximos: [
    { nome: "Araucária", slug: "araucaria" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
  ],
};

const ConsertoNotebookCampoLargo = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookCampoLargo;
