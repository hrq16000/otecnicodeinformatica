import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Vila Nova",
  slug: "vila-nova-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Vila Nova | Araucária | O Técnico de Informática",
  metaDescription: "Técnico de informática no Vila Nova, Araucária. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Vila Nova – Araucária",
  subtitulo: "Atendimento profissional a domicílio no Vila Nova. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Vila Nova é um bairro consolidado de Araucária, com boa infraestrutura e comércio local. Oferecemos assistência técnica completa a domicílio para computadores e notebooks.`,
  pontosReferencia: [
    "Centro (próximo)",
    "Fazenda Velha (divisa)",
    "Estação (divisa)"
  ],
  tempoDeslocamento: "Chegamos em 35-50 minutos",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const VilaNovaAraucaria = () => <BairroTemplate data={data} />;

export default VilaNovaAraucaria;
