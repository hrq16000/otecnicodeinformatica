import { BairroTemplate } from "./BairroTemplate";

const Cruzeiro = () => {
  const data = {
    nome: "Cruzeiro",
    slug: "cruzeiro",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Cruzeiro SJP | Atendimento Rápido | Técnico Curitiba",
    metaDescription: "Técnico de informática no bairro Cruzeiro em São José dos Pinhais. Formatação, conserto, upgrade SSD. Atendimento em domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Cruzeiro – São José dos Pinhais",
    subtitulo: "Assistência técnica profissional no Cruzeiro e região. Atendimento rápido em domicílio para residências e empresas.",
    descricaoLonga: `O bairro Cruzeiro em São José dos Pinhais é uma região tradicional e bem estruturada, com forte presença comercial e residencial. Nossa equipe de técnicos de informática atende toda a região do Cruzeiro, oferecendo serviços especializados de manutenção, conserto e suporte para computadores e notebooks.

    Estamos estrategicamente posicionados para atender rapidamente moradores e empresas do Cruzeiro e arredores. Seja um problema de lentidão, vírus, tela azul ou necessidade de upgrade, temos a solução técnica que você precisa com atendimento ágil e profissional.`,
    pontosReferencia: [
      "Próximo à Prefeitura SJP",
      "Região Central de SJP",
      "Rua Joinville",
      "Avenida Rui Barbosa",
      "Centro Histórico",
      "Fórum de SJP",
    ],
    tempoDeslocamento: "Chegamos em 30-45 minutos",
    servicosDestaque: [
      "Formatação Windows 10/11",
      "Remoção de vírus e malware",
      "Upgrade SSD e memória RAM",
      "Conserto de notebook",
      "Backup e recuperação de dados",
      "Configuração de redes Wi-Fi",
      "Suporte técnico para empresas",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default Cruzeiro;