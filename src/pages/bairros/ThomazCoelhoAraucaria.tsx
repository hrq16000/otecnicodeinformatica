import { BairroTemplate } from "./BairroTemplate";

const ThomazCoelhoAraucaria = () => {
  const data = {
    nome: "Thomaz Coelho",
    slug: "thomaz-coelho",
    cidade: "Araucária",
    metaTitle: "Técnico de Informática no Thomaz Coelho (Araucária) | Atendimento Rápido",
    metaDescription:
      "Técnico de informática no Thomaz Coelho, Araucária. Assistência técnica para PC e notebook: formatação, vírus, conserto, upgrade e redes. Atendimento a domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Thomaz Coelho – Araucária",
    subtitulo:
      "Suporte técnico no Thomaz Coelho com diagnóstico rápido, orçamento transparente e atendimento a domicílio.",
    descricaoLonga: `O bairro Thomaz Coelho em Araucária tem perfil residencial e está próximo de regiões industriais e de grande fluxo.

Atendemos o Thomaz Coelho com serviços completos de informática para residências e comércios: limpeza e remoção de vírus, formatação do Windows, upgrades de SSD/RAM e correção de problemas de hardware. Nossa prioridade é devolver seu equipamento funcionando bem, com orientações para manter o desempenho e a segurança.`,
    pontosReferencia: [
      "Região do CIAR",
      "Acessos pela Av. das Araucárias",
      "Região industrial",
      "Bairros próximos (Chapada, Centro)",
    ],
    tempoDeslocamento: "Chegamos em 45-65 minutos",
    servicosDestaque: [
      "Conserto de notebook e desktop",
      "Formatação e otimização do Windows",
      "Remoção de vírus e proteção",
      "Upgrade SSD e RAM",
      "Configuração de rede cabeada/Wi‑Fi",
      "Suporte remoto (quando possível)",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default ThomazCoelhoAraucaria;
