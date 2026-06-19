import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Vila Amélia",
  slug: "vila-amelia-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Vila Amélia | Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Vila Amélia, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Vila Amélia – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Vila Amélia. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Vila Amélia é um bairro consolidado de Pinhais com perfil residencial. Atendemos com formatação, remoção de vírus, upgrade e configuração de redes.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Maria Antonieta (divisa)",
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

const VilaAmeliaPinhais = () => <BairroTemplate data={data} />;

export default VilaAmeliaPinhais;
