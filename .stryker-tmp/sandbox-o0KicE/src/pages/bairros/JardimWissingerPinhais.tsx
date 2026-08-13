// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Wissinger",
  slug: "jardim-wissinger-pinhais",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Wissinger | Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Wissinger, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Wissinger – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Wissinger. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Wissinger é um bairro residencial de Pinhais. Nosso técnico realiza manutenção preventiva e corretiva com visita a domicílio.`,
  pontosReferencia: [
    "Centro (acesso)",
    "Pineville (divisa)",
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

const JardimWissingerPinhais = () => <BairroTemplate data={data} />;

export default JardimWissingerPinhais;
