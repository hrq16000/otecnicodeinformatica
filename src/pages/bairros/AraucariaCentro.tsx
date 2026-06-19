import { BairroTemplate } from "./BairroTemplate";

const AraucariaCentro = () => {
  const data = {
    nome: "Centro (Araucária)",
    slug: "centro-araucaria",
    cidade: "Araucária",
    metaTitle: "Técnico de Informática no Centro de Araucária | Atendimento a Domicílio | Técnico Curitiba",
    metaDescription:
      "Técnico de informática no Centro de Araucária. Formatação, conserto de notebook/PC, remoção de vírus e upgrade SSD. Atendimento a domicílio com agendamento. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Centro de Araucária",
    subtitulo:
      "Assistência técnica em informática no Centro de Araucária com atendimento a domicílio e soluções rápidas.",
    descricaoLonga: `O Centro de Araucária concentra comércio, serviços e residências, com grande demanda por suporte de informática para computadores e notebooks.

Atendemos a região central com diagnóstico claro, orçamento transparente e foco em resolver o problema na primeira visita. Se o seu PC está lento, travando, com vírus ou com falhas de hardware, nosso técnico vai até você com equipamentos profissionais para executar o serviço com segurança.`,
    pontosReferencia: [
      "Prefeitura de Araucária",
      "Terminal Central",
      "Av. Dr. Victor do Amaral",
      "Região Comercial",
      "Bairros próximos (Estação, Fazenda Velha)",
    ],
    tempoDeslocamento: "Chegamos em 35-55 minutos",
    servicosDestaque: [
      "Formatação Windows 10/11 (com drivers)",
      "Remoção de vírus e malware",
      "Upgrade SSD e memória RAM",
      "Conserto de notebook",
      "Configuração de Wi‑Fi e roteadores",
      "Backup e recuperação de arquivos",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default AraucariaCentro;
