import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Ouro Fino",
  slug: "ouro-fino-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Ouro Fino | São José dos Pinhais | O Técnico de Informática",
  metaDescription: "Técnico de informática no Ouro Fino, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Ouro Fino – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Ouro Fino. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Ouro Fino é um bairro residencial de São José dos Pinhais, com comunidade ativa e acesso facilitado pelas principais vias da cidade. Nosso técnico de informática atende Ouro Fino a domicílio, realizando formatação, conserto de notebook, remoção de vírus e configuração de redes com diagnóstico profissional no local.`,
  pontosReferencia: ["Av. Rui Barbosa", "Centro de SJP (próximo)", "Cruzeiro (divisa)", "Rua Barão do Rio Branco"],
  tempoDeslocamento: "Atendimento em até 40 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const OuroFinoSJP = () => <BairroTemplate data={data} />;

export default OuroFinoSJP;
