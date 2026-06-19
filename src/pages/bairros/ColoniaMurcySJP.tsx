import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Colônia Murici",
  slug: "colonia-murici-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Colônia Murici | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Colônia Murici, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Colônia Murici – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Colônia Murici. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Colônia Murici é uma região tradicional de São José dos Pinhais, com perfil residencial e rural. Nosso técnico de informática atende Colônia Murici com visita agendada, levando equipamento profissional para diagnóstico e reparo no local. Atendemos computadores, notebooks e redes Wi-Fi com transparência e garantia.`,
  pontosReferencia: ["BR-277 (próxima)", "Aeroporto Afonso Pena (próximo)", "Rua da Cidadania", "São Marcos (divisa)"],
  tempoDeslocamento: "Atendimento agendado",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const ColoniaMurcySJP = () => <BairroTemplate data={data} />;

export default ColoniaMurcySJP;
