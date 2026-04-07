import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Dona Rosa",
  slug: "jardim-dona-rosa-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Dona Rosa | Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Dona Rosa, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Dona Rosa – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Dona Rosa. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Dona Rosa é um bairro residencial de Pinhais. Atendemos com serviços completos de informática: formatação, vírus, upgrade SSD/RAM e redes.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Alto Tarumã (divisa)",
    "Estrada da Graciosa"
  ],
  tempoDeslocamento: "Chegamos em 25-40 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimDonaRosaPinhais = () => <BairroTemplate data={data} />;

export default JardimDonaRosaPinhais;
