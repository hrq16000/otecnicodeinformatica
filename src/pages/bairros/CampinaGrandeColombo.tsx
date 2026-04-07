import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Campina Grande do Sul",
  slug: "campina-grande-colombo",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Campina Grande do Sul | Colombo | Técnico Curitiba",
  metaDescription: "Técnico de informática no Campina Grande do Sul, Colombo. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Campina Grande do Sul – Colombo",
  subtitulo: "Atendimento profissional a domicílio no Campina Grande do Sul. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Região entre Colombo e Campina Grande do Sul, atendemos moradores que precisam de suporte técnico profissional para computadores e notebooks. Diagnóstico no local, formatação, conserto e configuração de redes com garantia e transparência.`,
  pontosReferencia: ["Estrada da Ribeira", "Atuba (próximo)", "Centro de Colombo (acesso)", "BR-116 (próxima)"],
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

const CampinaGrandeColombo = () => <BairroTemplate data={data} />;

export default CampinaGrandeColombo;
