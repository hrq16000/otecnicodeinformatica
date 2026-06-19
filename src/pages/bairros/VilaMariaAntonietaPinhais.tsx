import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Vila Maria Antonieta",
  slug: "vila-maria-antonieta-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Vila Maria Antonieta | Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Vila Maria Antonieta, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Vila Maria Antonieta – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Vila Maria Antonieta. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Vila Maria Antonieta é um bairro de Pinhais próximo ao centro. Nosso técnico atende com ferramentas profissionais para diagnóstico e reparo.`,
  pontosReferencia: [
    "Maria Antonieta (divisa)",
    "Centro (acesso)",
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

const VilaMariaAntonietaPinhais = () => <BairroTemplate data={data} />;

export default VilaMariaAntonietaPinhais;
