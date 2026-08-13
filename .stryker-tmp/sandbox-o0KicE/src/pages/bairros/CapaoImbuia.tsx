// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Capão da Imbuia",
  slug: "capao-da-imbuia",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Capão da Imbuia | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Capão da Imbuia, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Capão da Imbuia – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Capão da Imbuia. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Capão da Imbuia é um bairro residencial e comercial de Curitiba, com forte identidade local. Próximo ao Terminal do Capão da Imbuia, a região concentra moradores e pequenos comerciantes que precisam de suporte técnico confiável. Nosso técnico atende todo o Capão da Imbuia a domicílio, resolvendo problemas como computador lento, notebook com defeito, vírus, rede Wi-Fi instável e necessidade de backup urgente.`,
  pontosReferencia: ["Terminal Capão da Imbuia", "Museu de História Natural", "Av. Anita Garibaldi (próxima)", "Rua Lothário Boutin", "BR-116 (próxima)"],
  tempoDeslocamento: "Atendimento em até 45 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const CapaoImbuia = () => <BairroTemplate data={data} />;

export default CapaoImbuia;
