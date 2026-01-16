import { BairroTemplate } from "./BairroTemplate";

const Aristocrata = () => {
  const data = {
    nome: "Aristocrata",
    slug: "aristocrata",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Aristocrata SJP | Assistência Técnica | Técnico Curitiba",
    metaDescription: "Técnico de informática no Aristocrata em São José dos Pinhais. Conserto, formatação, upgrade. Atendimento domiciliar rápido. Serviços a partir de R$ 99,99.",
    h1: "Técnico de Informática no Aristocrata – São José dos Pinhais",
    subtitulo: "Atendimento técnico especializado no Aristocrata. Resolvemos seu problema de informática no conforto da sua casa ou empresa.",
    descricaoLonga: `O bairro Aristocrata em São José dos Pinhais é uma região residencial valorizada, com excelente infraestrutura e qualidade de vida. Nossa equipe atende moradores e empresas do Aristocrata com serviços completos de assistência técnica em informática.

    Com técnicos experientes e equipamentos profissionais, oferecemos soluções rápidas para problemas como computador lento, vírus, formatação, upgrade de hardware e muito mais. Atendemos no conforto da sua casa, sem necessidade de levar o equipamento até uma loja.`,
    pontosReferencia: [
      "Próximo ao Parque da Fonte",
      "Avenida das Torres",
      "Shopping São José",
      "Região do Guatupê",
      "Jardim Cristal",
      "Costeira",
    ],
    tempoDeslocamento: "Atendimento em até 40 minutos",
    servicosDestaque: [
      "Formatação completa com drivers",
      "Limpeza de vírus e malware",
      "Troca de HD por SSD",
      "Aumento de memória RAM",
      "Configuração de impressoras",
      "Suporte remoto imediato",
      "Manutenção preventiva",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default Aristocrata;