import { BairroTemplate } from "./BairroTemplate";

const SaoFrancisco = () => {
  const data = {
    nome: "São Francisco",
    slug: "sao-francisco",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no São Francisco SJP | O Técnico de Informática",
    metaDescription: "Técnico de informática no São Francisco, São José dos Pinhais. Manutenção, conserto de PC e notebook. Atendimento domiciliar. a partir de R$ 99,99.",
    h1: "Técnico de Informática no São Francisco – São José dos Pinhais",
    subtitulo: "Serviços de informática no São Francisco com atendimento profissional e preços justos.",
    descricaoLonga: `O bairro São Francisco em São José dos Pinhais é uma região residencial com boa qualidade de vida e acesso a serviços essenciais. Nossa equipe de técnicos de informática atende toda a região do São Francisco, proporcionando serviços de alta qualidade com atendimento humanizado.

    Entendemos que problemas com o computador podem atrapalhar sua rotina, seja no trabalho ou nos estudos. Por isso, priorizamos atendimentos rápidos e soluções eficientes que devolvam sua produtividade o mais rápido possível.`,
    pontosReferencia: [
      "Centro de SJP",
      "Afonso Pena",
      "Del Rey",
      "Cruzeiro",
      "Região Residencial",
      "Terminal de ônibus",
    ],
    tempoDeslocamento: "Chegamos em 30-40 minutos",
    servicosDestaque: [
      "Formatação completa",
      "Remoção de vírus e malware",
      "Upgrade de SSD",
      "Troca de memória RAM",
      "Conserto de notebook",
      "Configuração de Wi-Fi",
      "Backup na nuvem",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default SaoFrancisco;