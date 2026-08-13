// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Pedro Demeterco",
  slug: "jardim-pedro-demeterco",
  cidade: "Pinhais",
  metaTitle: "Técnico de Informática no Jardim Pedro Demeterco | Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Pedro Demeterco, Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Pedro Demeterco – Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Jardim Pedro Demeterco. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Pedro Demeterco é um bairro residencial de Pinhais com boa infraestrutura. Nosso técnico atende a domicílio com diagnóstico completo.`,
  pontosReferencia: [
    "Centro de Pinhais (acesso)",
    "Emiliano Perneta (divisa)",
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

const JardimPedroDemeterco = () => <BairroTemplate data={data} />;

export default JardimPedroDemeterco;
