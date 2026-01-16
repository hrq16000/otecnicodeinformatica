import { BairroTemplate } from "./BairroTemplate";

const SaoMarcos = () => {
  const data = {
    nome: "São Marcos",
    slug: "sao-marcos",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no São Marcos SJP | Assistência Técnica | Técnico Curitiba",
    metaDescription: "Técnico de informática no São Marcos, São José dos Pinhais. Formatação, conserto, upgrade. Visita técnica em domicílio. A partir de R$ 99,99.",
    h1: "Técnico de Informática no São Marcos – São José dos Pinhais",
    subtitulo: "Assistência técnica completa no São Marcos. Técnico especializado vai até sua casa ou empresa.",
    descricaoLonga: `O bairro São Marcos em São José dos Pinhais é uma região bem localizada, com características residenciais e comerciais equilibradas. Nossa equipe de técnicos de informática atende toda a região do São Marcos, oferecendo serviços profissionais com a comodidade do atendimento em domicílio.

    Com foco na qualidade e satisfação do cliente, trabalhamos para resolver problemas de informática de forma rápida e definitiva. Nossos técnicos são treinados para diagnosticar e solucionar os mais diversos tipos de problemas em computadores e notebooks.`,
    pontosReferencia: [
      "Região Industrial",
      "Aviação",
      "Braga",
      "São Domingos",
      "Centro de SJP",
      "BR-376",
    ],
    tempoDeslocamento: "Atendimento em até 45 minutos",
    servicosDestaque: [
      "Formatação Windows 10/11",
      "Limpeza de vírus",
      "Upgrade SSD e RAM",
      "Conserto de placa-mãe",
      "Recuperação de dados",
      "Configuração de servidor",
      "Suporte para empresas",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default SaoMarcos;