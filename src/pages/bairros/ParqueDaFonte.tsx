import { BairroTemplate } from "./BairroTemplate";

const ParqueDaFonte = () => {
  const data = {
    nome: "Parque da Fonte",
    slug: "parque-da-fonte",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Parque da Fonte SJP | Técnico Curitiba",
    metaDescription: "Técnico de informática no Parque da Fonte, São José dos Pinhais. Conserto, formatação, upgrade. Atendimento domiciliar profissional. A partir de R$ 69,99.",
    h1: "Técnico de Informática no Parque da Fonte – São José dos Pinhais",
    subtitulo: "Serviços de informática de qualidade no Parque da Fonte. Atendimento em domicílio para sua comodidade.",
    descricaoLonga: `O Parque da Fonte é um bairro residencial valorizado em São José dos Pinhais, conhecido pela qualidade de vida e proximidade com áreas verdes. Nossa equipe de técnicos de informática atende toda a região do Parque da Fonte, oferecendo serviços completos com a comodidade do atendimento em domicílio.

    Trabalhamos com diagnóstico preciso e soluções definitivas para problemas de hardware e software. Do computador lento ao notebook que não liga, temos a expertise necessária para resolver seu problema com rapidez e eficiência.`,
    pontosReferencia: [
      "Próximo à Costeira",
      "Aristocrata",
      "Centro de SJP",
      "Jardim Cristal",
      "Boneca do Iguaçu",
      "Região Sul de SJP",
    ],
    tempoDeslocamento: "Atendimento em até 35 minutos",
    servicosDestaque: [
      "Formatação Windows 10/11",
      "Limpeza interna de notebook",
      "Troca de pasta térmica",
      "Upgrade SSD e RAM",
      "Configuração de roteador",
      "Backup na nuvem",
      "Remoção de vírus",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default ParqueDaFonte;