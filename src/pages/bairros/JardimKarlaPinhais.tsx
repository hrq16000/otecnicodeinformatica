import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Karla",
  slug: "jardim-karla-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Karla | Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Karla, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Karla – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Karla. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Karla é um bairro de Pinhais próximo ao centro. Atendemos com manutenção de computadores, notebooks e redes Wi-Fi.`,
  pontosReferencia: [
    "Centro de Pinhais (próximo)",
    "Weissópolis (divisa)",
    "Av. Camilo di Léllis"
  ],
  tempoDeslocamento: "Chegamos em 20-35 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimKarlaPinhais = () => <BairroTemplate data={data} />;

export default JardimKarlaPinhais;
