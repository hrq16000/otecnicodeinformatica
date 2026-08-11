import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Thomaz Coelho II",
  slug: "thomaz-coelho-ii",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Thomaz Coelho II | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Thomaz Coelho II, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Thomaz Coelho II – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Thomaz Coelho II. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Thomaz Coelho II é uma extensão do bairro Thomaz Coelho em Araucária, com forte presença industrial e residencial. Nosso técnico atende a domicílio com diagnóstico completo.`,
  pontosReferencia: [
    "Thomaz Coelho (divisa)",
    "CIAR",
    "Região industrial"
  ],
  tempoDeslocamento: "Chegamos em 45-65 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const ThomazCoelhoIIAraucaria = () => <BairroTemplate data={data} />;

export default ThomazCoelhoIIAraucaria;
