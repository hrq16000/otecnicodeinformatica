import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Taxiqueira",
  slug: "taxiqueira-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Taxiqueira | Colombo | Técnico Curitiba",
  metaDescription: "Técnico de informática no Taxiqueira, Colombo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Taxiqueira – Colombo",
  subtitulo: "Atendimento profissional a domicílio no Taxiqueira. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Taxiqueira é um bairro em crescimento de Colombo, com perfil residencial. Nosso técnico de informática atende Taxiqueira a domicílio com diagnóstico profissional, serviços de formatação, conserto de notebooks e configuração de redes Wi-Fi.`,
  pontosReferencia: ["Guaraituba (divisa)", "Centro de Colombo (acesso)", "Roça Grande (próximo)", "Estrada da Ribeira"],
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

const TaxiqueiraColomboo = () => <BairroTemplate data={data} />;

export default TaxiqueiraColomboo;
