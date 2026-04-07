import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Independência",
  slug: "independencia-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Independência | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Independência, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Independência – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Independência. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O bairro Independência é uma região residencial consolidada de São José dos Pinhais, com boa infraestrutura e acesso rápido ao centro. Nosso técnico de informática atende Independência a domicílio com profissionalismo, realizando diagnóstico, formatação, conserto de notebooks, upgrade SSD e configuração de redes.`,
  pontosReferencia: ["Centro de SJP (próximo)", "Av. Rui Barbosa", "Guatupê (divisa)", "Rua Joinville"],
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

const IndependenciaSJP = () => <BairroTemplate data={data} />;

export default IndependenciaSJP;
