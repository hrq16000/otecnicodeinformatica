import { BairroTemplate } from "./BairroTemplate";

const SaoDomingos = () => {
  const data = {
    nome: "São Domingos",
    slug: "sao-domingos",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no São Domingos SJP | Técnico Curitiba",
    metaDescription: "Técnico de informática no São Domingos, São José dos Pinhais. Manutenção, formatação, conserto. Atendimento em domicílio rápido. a partir de R$ 99,99.",
    h1: "Técnico de Informática no São Domingos – São José dos Pinhais",
    subtitulo: "Serviços de informática profissionais no São Domingos. Atendimento rápido e de qualidade.",
    descricaoLonga: `O bairro São Domingos em São José dos Pinhais é uma região residencial com boa infraestrutura e acesso facilitado. Nossa equipe de técnicos de informática atende toda a região do São Domingos e bairros vizinhos, oferecendo serviços completos de manutenção e suporte.

    Trabalhamos com compromisso e transparência, oferecendo diagnóstico gratuito e valor detalhado antes de qualquer serviço. Nossa missão é entregar soluções que realmente funcionem, evitando que você precise chamar o técnico novamente pelo mesmo problema.`,
    pontosReferencia: [
      "Centro de SJP",
      "São Cristóvão",
      "São Marcos",
      "Afonso Pena",
      "Cruzeiro",
      "Região Residencial",
    ],
    tempoDeslocamento: "Chegamos em 35-45 minutos",
    servicosDestaque: [
      "Formatação com drivers",
      "Remoção de ransomware",
      "Upgrade de hardware",
      "Troca de tela notebook",
      "Configuração de redes",
      "Suporte remoto",
      "Manutenção preventiva",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default SaoDomingos;