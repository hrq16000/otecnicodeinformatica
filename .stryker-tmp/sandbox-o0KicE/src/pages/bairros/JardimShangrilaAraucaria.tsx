// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Shangri-lá",
  slug: "jardim-shangrila-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Jardim Shangri-lá | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Shangri-lá, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Shangri-lá – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Jardim Shangri-lá. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Shangri-lá é um bairro de Araucária com perfil residencial. Atendemos com serviços completos de informática: formatação, vírus, upgrade SSD/RAM e redes Wi-Fi.`,
  pontosReferencia: [
    "Centro de Araucária (acesso)",
    "Costeira (divisa)",
    "Tindiquera (próximo)"
  ],
  tempoDeslocamento: "Chegamos em 45-60 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimShangrilaAraucaria = () => <BairroTemplate data={data} />;

export default JardimShangrilaAraucaria;
