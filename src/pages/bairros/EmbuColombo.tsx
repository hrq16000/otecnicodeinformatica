import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Embu",
  slug: "embu-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Embu | Colombo | O Técnico de Informática",
  metaDescription: "Técnico de informática no Embu, Colombo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Embu – Colombo",
  subtitulo: "Atendimento profissional a domicílio no Embu. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Embu é uma região de Colombo com perfil residencial e rural. Nosso técnico atende Embu com visita agendada, levando equipamento profissional para diagnóstico e reparo no local. Atendemos computadores, notebooks e redes.`,
  pontosReferencia: ["Centro de Colombo (acesso)", "Palmital (divisa)", "Estrada da Ribeira", "São Gabriel (próximo)"],
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

const EmbuColombo = () => <BairroTemplate data={data} />;

export default EmbuColombo;
