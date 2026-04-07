import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Graciosa",
  slug: "graciosa-qb",
  cidade: "Quatro Barras",
  metaTitle: "Técnico de Informática no Graciosa | Quatro Barras | Técnico Curitiba",
  metaDescription: "Técnico de informática no Graciosa, Quatro Barras. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Graciosa – Quatro Barras",
  subtitulo: "Atendimento profissional a domicílio no Graciosa. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Graciosa é uma região de Quatro Barras, conhecida pela Estrada da Graciosa. Nosso técnico de informática atende a domicílio, oferecendo manutenção completa de PCs e notebooks com diagnóstico profissional.`,
  pontosReferencia: ["Estrada da Graciosa", "Centro de Quatro Barras (acesso)", "São Lourenço (divisa)"],
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

const GraciosaMirQB = () => <BairroTemplate data={data} />;

export default GraciosaMirQB;
