import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Formatação de Computador em Campo Largo | Técnico Local | Técnico Curitiba",
  metaDescription: "Formatação de computador em Campo Largo. Windows 10/11, backup, drivers e programas. Atendimento domiciliar. A partir de R$ 109,99.",
  
  servico: "Formatação de Computador",
  servicoSlug: "formatacao-computador",
  bairro: "Campo Largo",
  bairroSlug: "campo-largo",
  cidade: "Campo Largo",
  
  h1: "Formatação de Computador em Campo Largo",
  subtitulo: "Formatação completa com Windows original e técnico local. Atendemos Centro, Ferraria, Jardim Guilhermina e toda Campo Largo.",
  
  precoBase: "R$ 119,99",
  precoDescricao: "Inclui Windows, drivers, programas e atendimento a domicílio em Campo Largo.",
  
  descricaoLonga: `Campo Largo, conhecida como Capital da Louça, também é uma cidade com crescente demanda 
    por serviços de informática. Nossa equipe atende toda a cidade com formatação profissional de 
    computadores e notebooks. Do Centro à Ferraria, do Jardim Guilhermina a São Marcos, realizamos 
    backup seguro, instalação limpa do Windows e configuração completa de drivers e programas. 
    Atendemos residências, comércios e empresas com a mesma qualidade e preço justo.`,
  
  beneficios: [
    "Backup completo dos seus arquivos",
    "Windows 10 ou 11 original",
    "Drivers completos e atualizados",
    "Programas essenciais instalados",
    "Atendimento em toda Campo Largo",
    "Técnico local com chegada rápida",
    "Garantia de 90 dias",
    "Suporte pós-formatação",
  ],
  
  processoPasso: [
    { titulo: "Agendamento", descricao: "Escolha o melhor horário via WhatsApp" },
    { titulo: "Backup", descricao: "Seus arquivos salvos com segurança" },
    { titulo: "Formatação", descricao: "Sistema reinstalado do zero" },
    { titulo: "Entrega", descricao: "Programas instalados e dados restaurados" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês atendem todos os bairros de Campo Largo?", 
      resposta: "Sim! Centro, Ferraria, Jardim Guilhermina, Vila Pompeia, São Marcos, Rondinha e todos os demais bairros." 
    },
    { 
      pergunta: "Tem taxa de deslocamento para Campo Largo?", 
      resposta: "O valor já inclui o deslocamento. Sem custos extras ou surpresas." 
    },
    { 
      pergunta: "Atendem empresas e comércios?", 
      resposta: "Sim! Atendemos desde lojas no Centro até empresas na região industrial com contratos de manutenção." 
    },
    { 
      pergunta: "Qual o prazo para atendimento?", 
      resposta: "Agendamos para o Conforme agenda ou próximo dia útil, dependendo da demanda." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Campo Largo",
    "Prefeitura de Campo Largo",
    "Shopping Campo Largo",
    "Parque Histórico",
    "Rua XV de Novembro",
    "Ferraria",
  ],
  
  tempoAtendimento: "Agendamento para Conforme agenda ou próximo",
  
  servicosRelacionados: [
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
  ],
  
  bairrosProximos: [
    { nome: "Araucária", slug: "araucaria" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
  ],
};

const FormatacaoCampoLargo = () => <ServicoBairroTemplate data={data} />;
export default FormatacaoCampoLargo;
