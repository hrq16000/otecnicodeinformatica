import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Parque Industrial",
  slug: "parque-industrial-frg",
  cidade: "Fazenda Rio Grande",
  metaTitle: "Técnico de Informática no Parque Industrial | Fazenda Rio Grande | Técnico Curitiba",
  metaDescription: "Técnico de informática no Parque Industrial, Fazenda Rio Grande. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Parque Industrial – Fazenda Rio Grande",
  subtitulo: "Atendimento profissional a domicílio no Parque Industrial. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Parque Industrial é uma região de Fazenda Rio Grande com presença de empresas e residências. Nosso técnico de informática atende a domicílio, oferecendo suporte técnico completo para computadores e notebooks.`,
  pontosReferencia: ["Centro de FRG (acesso)", "BR-116 (próxima)", "Eucaliptos (divisa)", "Nações (próximo)"],
  tempoDeslocamento: "Atendimento em até 50 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const EucaliptosFRG2 = () => <BairroTemplate data={data} />;

export default EucaliptosFRG2;
