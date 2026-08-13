// @ts-nocheck
import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Notebook na CIC Curitiba | Reparo Industrial | O Técnico de Informática",
  metaDescription: "Conserto de notebook e computador na Cidade Industrial de Curitiba. Atendimento para empresas e residências. Reparo profissional com garantia.",
  
  servico: "Conserto de Notebook",
  servicoSlug: "conserto-pc-notebook",
  bairro: "Cidade Industrial (CIC)",
  bairroSlug: "cic",
  cidade: "Curitiba",
  
  h1: "Conserto de Notebook na CIC – Curitiba",
  subtitulo: "Reparo profissional para notebooks e computadores na Cidade Industrial. Atendimento para empresas e residências.",
  
  precoBase: "R$ 99,99",
  precoDescricao: "Visita técnica + diagnóstico. Atendimento para empresas com nota fiscal.",
  
  descricaoLonga: `A Cidade Industrial de Curitiba (CIC) é uma das maiores áreas industriais da 
    América Latina, com milhares de empresas que dependem de equipamentos de informática 
    funcionando perfeitamente. Nossa equipe oferece serviço de conserto de notebooks e 
    computadores para toda a região da CIC, atendendo desde grandes indústrias até pequenos 
    comércios e residências. Realizamos reparos de tela, teclado, bateria, placa-mãe e muito 
    mais. Para empresas, oferecemos atendimento com nota fiscal e contratos de manutenção 
    preventiva. Conhecemos bem a região e as necessidades específicas do setor industrial.`,
  
  beneficios: [
    "Reparo de notebooks todas as marcas",
    "Atendimento para empresas com NF",
    "Contratos de manutenção disponíveis",
    "Peças de qualidade com garantia",
    "Técnico experiente em ambiente industrial",
    "Diagnóstico rápido no local",
    "Coleta e entrega disponível",
    "Garantia de até 90 dias",
  ],
  
  processoPasso: [
    { titulo: "Contato", descricao: "Solicite atendimento via WhatsApp ou telefone" },
    { titulo: "Visita", descricao: "Técnico vai até sua empresa ou residência" },
    { titulo: "Diagnóstico", descricao: "Identificamos o problema com precisão" },
    { titulo: "Reparo", descricao: "Conserto rápido com peças de qualidade" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês atendem empresas na CIC?", 
      resposta: "Sim! Atendemos indústrias, escritórios e comércios em toda a CIC. Emitimos nota fiscal e oferecemos contratos de manutenção mensal." 
    },
    { 
      pergunta: "Qual o prazo de conserto para empresas?", 
      resposta: "Priorizamos atendimentos empresariais. Reparos simples são feitos conforme a disponibilidade da agenda. Casos complexos em até 48h úteis." 
    },
    { 
      pergunta: "Fazem manutenção preventiva?", 
      resposta: "Sim! Oferecemos contratos de manutenção preventiva com visitas regulares para evitar problemas e aumentar a vida útil dos equipamentos." 
    },
    { 
      pergunta: "Atendem fora do horário comercial?", 
      resposta: "Para contratos empresariais, oferecemos flexibilidade de horário. Consulte disponibilidade para atendimentos fora do expediente." 
    },
  ],
  
  pontosReferencia: [
    "Parque Industrial",
    "Via Lapa",
    "Terminal CIC",
    "Rua João Bettega",
    "Contorno Sul",
    "Parque Barigui (proximidades)",
  ],
  
  tempoAtendimento: "Atendimento prioritário para empresas",
  
  servicosRelacionados: [
    { nome: "Formatação", slug: "formatacao-computador" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Backup Empresarial", slug: "backup-recuperacao" },
  ],
  
  bairrosProximos: [
    { nome: "Portão", slug: "portao" },
    { nome: "Fazendinha", slug: "fazendinha" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
    { nome: "Santa Quitéria", slug: "santa-quiteria" },
  ],
};

const ConsertoNotebookCIC = () => <ServicoBairroTemplate data={data} />;
export default ConsertoNotebookCIC;
