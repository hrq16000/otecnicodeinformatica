import { BairroTemplate } from "./BairroTemplate";

const PinhaisCentro = () => {
  const data = {
    nome: "Centro (Pinhais)",
    slug: "centro-pinhais",
    cidade: "Pinhais",
    metaTitle: "Técnico de Informática no Centro de Pinhais | Atendimento Rápido | Técnico Curitiba",
    metaDescription:
      "Técnico de informática no Centro de Pinhais. Formatação, conserto de notebook/PC, remoção de vírus e upgrade SSD. Atendimento a domicílio rápido (divisa com Curitiba). a partir de R$ 99,99.",
    h1: "Técnico de Informática no Centro de Pinhais",
    subtitulo:
      "Assistência técnica em Pinhais com atendimento rápido a domicílio e suporte completo para computadores e notebooks.",
    descricaoLonga: `O Centro de Pinhais tem alta movimentação e muitas pessoas dependem do computador para trabalho, estudos e serviços.

Por estar muito próximo a Curitiba, conseguimos atender Pinhais com agilidade. Fazemos diagnóstico e serviços como formatação, remoção de vírus, upgrades e consertos, sempre com orientação clara e foco em evitar que o problema volte.`,
    pontosReferencia: [
      "Região Central de Pinhais",
      "Av. Camilo di Lellis",
      "Comércio e serviços",
      "Divisa com Curitiba",
    ],
    tempoDeslocamento: "Chegamos em 20-40 minutos",
    servicosDestaque: [
      "Formatação e otimização",
      "Remoção de vírus e segurança",
      "Upgrade SSD/RAM",
      "Conserto de notebook",
      "Configuração de Wi‑Fi",
      "Backup e recuperação",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default PinhaisCentro;
