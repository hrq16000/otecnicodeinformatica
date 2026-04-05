import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Instalação de Redes Wi-Fi em Campo Largo | Técnico Especializado | Técnico Curitiba",
  metaDescription: "Instalação de redes Wi-Fi em Campo Largo. Cobertura total, redes mesh, configuração profissional. Casas e empresas. A partir de R$ 129,99.",
  
  servico: "Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "Campo Largo",
  bairroSlug: "campo-largo",
  cidade: "Campo Largo",
  
  h1: "Instalação de Redes Wi-Fi em Campo Largo",
  subtitulo: "Wi-Fi com problemas em Campo Largo? Configuramos redes profissionais para casa e empresa com técnico local.",
  
  precoBase: "R$ 139,99",
  precoDescricao: "Inclui configuração completa, otimização de sinal e visita técnica em Campo Largo.",
  
  descricaoLonga: `Uma rede Wi-Fi estável é essencial em Campo Largo, seja para trabalho remoto, estudo ou 
    entretenimento. Nossa equipe instala e configura redes profissionais com cobertura total, 
    incluindo soluções mesh para chácaras e propriedades maiores na região da Ferraria. Resolvemos 
    problemas de sinal fraco, internet lenta e instabilidade. Para comércios do Centro e empresas, 
    oferecemos soluções corporativas com segurança avançada.`,
  
  beneficios: [
    "Configuração profissional completa",
    "Cobertura Wi-Fi em toda a área",
    "Soluções mesh para áreas grandes",
    "Segurança avançada",
    "Rede separada para visitantes",
    "Atendimento em toda Campo Largo",
    "Suporte pós-instalação",
    "Ideal para chácaras e sítios",
  ],
  
  processoPasso: [
    { titulo: "Avaliação", descricao: "Análise do espaço e necessidades" },
    { titulo: "Projeto", descricao: "Melhor solução para seu caso" },
    { titulo: "Instalação", descricao: "Configuração profissional" },
    { titulo: "Teste", descricao: "Validação de cobertura e velocidade" },
  ],
  
  faq: [
    { 
      pergunta: "Vocês instalam Wi-Fi em chácaras na região de Campo Largo?", 
      resposta: "Sim! Temos soluções específicas para áreas rurais e chácaras com repetidores e antenas externas de longo alcance." 
    },
    { 
      pergunta: "Trabalham com qual provedor de internet?", 
      resposta: "Configuramos redes para qualquer provedor de internet disponível em Campo Largo." 
    },
    { 
      pergunta: "Quanto custa uma rede mesh?", 
      resposta: "Depende do tamanho da área. A partir de R$ 399,99 com equipamentos inclusos. Consulte via WhatsApp." 
    },
    { 
      pergunta: "Atendem na Ferraria?", 
      resposta: "Sim! Atendemos todos os bairros e distritos de Campo Largo, incluindo Ferraria e região." 
    },
  ],
  
  pontosReferencia: [
    "Centro de Campo Largo",
    "Ferraria",
    "Jardim Guilhermina",
    "Shopping Campo Largo",
    "Rondinha",
    "São Marcos",
  ],
  
  tempoAtendimento: "Agendamento para mesmo dia ou próximo",
  
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "CFTV e Câmeras", slug: "cftv" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  
  bairrosProximos: [
    { nome: "Araucária", slug: "araucaria" },
    { nome: "CIC (Curitiba)", slug: "cic" },
    { nome: "Santa Felicidade", slug: "santa-felicidade" },
    { nome: "Campo Comprido", slug: "campo-comprido" },
  ],
};

const RedesWifiCampoLargo = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiCampoLargo;
