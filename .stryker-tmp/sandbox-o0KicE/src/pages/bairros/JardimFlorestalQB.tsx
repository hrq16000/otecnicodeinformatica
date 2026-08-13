// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Florestal",
  slug: "jardim-florestal-qb",
  cidade: "Quatro Barras",
  metaTitle: "Técnico de Informática no Jardim Florestal | Quatro Barras | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Florestal, Quatro Barras. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Florestal – Quatro Barras",
  subtitulo: "Atendimento profissional a domicílio no Jardim Florestal. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Florestal é um bairro residencial de Quatro Barras. Nosso técnico de informática atende a domicílio com diagnóstico profissional, formatação, conserto de notebooks e configuração de redes Wi-Fi.`,
  pontosReferencia: ["Centro de Quatro Barras (próximo)", "BR-116 (próxima)", "Vila São José (divisa)"],
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

const JardimFlorestalQB = () => <BairroTemplate data={data} />;

export default JardimFlorestalQB;
