import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Antônio Olívero",
  slug: "antonio-olivero-cm",
  cidade: "Campo Magro",
  metaTitle: "Técnico de Informática no Antônio Olívero | Campo Magro | Técnico Curitiba",
  metaDescription: "Técnico de informática no Antônio Olívero, Campo Magro. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Antônio Olívero – Campo Magro",
  subtitulo: "Atendimento profissional a domicílio no Antônio Olívero. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Antônio Olívero é uma região de Campo Magro. Nosso técnico atende a domicílio com diagnóstico profissional, formatação, conserto de notebooks e configuração de redes Wi-Fi.`,
  pontosReferencia: ["Centro de Campo Magro (acesso)", "Rio Verde (divisa)", "PR-090"],
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

const AntonioOliveraCM = () => <BairroTemplate data={data} />;

export default AntonioOliveraCM;
