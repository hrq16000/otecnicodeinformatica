import { BairroTemplate } from "./BairroTemplate";

const Aviacao = () => {
  const data = {
    nome: "Aviação",
    slug: "aviacao",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática na Aviação SJP | Próximo ao Aeroporto | Técnico Curitiba",
    metaDescription: "Técnico de informática no bairro Aviação em São José dos Pinhais. Próximo ao Aeroporto Afonso Pena. Atendimento rápido. Serviços a partir de A partir de R$ 69,99.",
    h1: "Técnico de Informática na Aviação – São José dos Pinhais",
    subtitulo: "Assistência técnica próxima ao Aeroporto Afonso Pena. Atendimento ágil para residências e empresas da região.",
    descricaoLonga: `O bairro Aviação em São José dos Pinhais é estrategicamente localizado próximo ao Aeroporto Internacional Afonso Pena, sendo uma região com intensa atividade comercial e logística. Nossa equipe de técnicos atende toda a região da Aviação, oferecendo serviços especializados para residências e empresas.

    Entendemos a dinâmica acelerada da região e por isso priorizamos atendimentos rápidos e eficientes. Seja para manutenção de equipamentos, suporte técnico ou upgrades, estamos preparados para atender com qualidade e profissionalismo.`,
    pontosReferencia: [
      "Aeroporto Afonso Pena",
      "Av. das Américas",
      "Região Industrial",
      "Braga",
      "São Marcos",
      "Centro Logístico",
    ],
    tempoDeslocamento: "Chegamos em 25-40 minutos",
    servicosDestaque: [
      "Suporte técnico empresarial",
      "Formatação rápida",
      "Remoção de vírus e ransomware",
      "Upgrade de hardware",
      "Configuração de redes",
      "Backup corporativo",
      "Manutenção de servidores",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default Aviacao;