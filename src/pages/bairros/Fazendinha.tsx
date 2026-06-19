import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Fazendinha",
  slug: "fazendinha",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Fazendinha | Curitiba | Técnico Curitiba",
  metaDescription: "Técnico de informática no Fazendinha, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Fazendinha – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Fazendinha. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `A Fazendinha é um bairro movimentado de Curitiba, com forte comércio local e grande quantidade de residências. Próximo ao CIC e ao Portão, a região tem acesso facilitado por diversas linhas de ônibus. Nosso técnico de informática atende a Fazendinha a domicílio, resolvendo problemas como computador lento, vírus, notebook com defeito, rede instável e necessidade de formatação ou upgrade.`,
  pontosReferencia: ["Terminal Fazendinha", "Rua Carlos Klemtz", "CIC (divisa)", "Portão (divisa)", "Rua Democrata"],
  tempoDeslocamento: "Atendimento em até 35 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const Fazendinha = () => <BairroTemplate data={data} />;

export default Fazendinha;
