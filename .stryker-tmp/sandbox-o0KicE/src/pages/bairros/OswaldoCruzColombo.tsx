// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Osvaldo Cruz",
  slug: "osvaldo-cruz-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Osvaldo Cruz | Colombo | O Técnico de Informática",
  metaDescription: "Técnico de informática no Osvaldo Cruz, Colombo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Osvaldo Cruz – Colombo",
  subtitulo: "Atendimento profissional a domicílio no Osvaldo Cruz. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Osvaldo Cruz é um bairro residencial de Colombo com forte comunidade local. Nosso técnico de informática atende Osvaldo Cruz a domicílio, oferecendo serviços de formatação, conserto de notebooks, remoção de vírus e configuração de redes Wi-Fi com diagnóstico profissional no local e preços acessíveis.`,
  pontosReferencia: ["Centro de Colombo (próximo)", "Maracanã (divisa)", "Rua XV de Novembro", "Atuba (próximo)"],
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

const OswaldoCruzColombo = () => <BairroTemplate data={data} />;

export default OswaldoCruzColombo;
