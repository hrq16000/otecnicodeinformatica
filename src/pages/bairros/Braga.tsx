import { BairroTemplate } from "./BairroTemplate";

const Braga = () => {
  const data = {
    nome: "Braga",
    slug: "braga",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Braga SJP | Conserto e Manutenção | Técnico Curitiba",
    metaDescription: "Técnico de informática no bairro Braga em São José dos Pinhais. Manutenção, conserto de PC e notebook. Atendimento em domicílio. R$ 99,99.",
    h1: "Técnico de Informática no Braga – São José dos Pinhais",
    subtitulo: "Assistência técnica profissional no Braga e bairros vizinhos. Seu computador consertado sem sair de casa.",
    descricaoLonga: `O bairro Braga em São José dos Pinhais é uma região em crescimento, com características residenciais e comerciais. Nossa equipe de técnicos de informática atende toda a região do Braga, proporcionando serviços de qualidade com rapidez e profissionalismo.

    Trabalhamos com manutenção preventiva e corretiva de computadores, notebooks e equipamentos de informática em geral. Nosso objetivo é resolver seu problema técnico no primeiro atendimento, evitando transtornos e perda de tempo.`,
    pontosReferencia: [
      "Região Industrial",
      "Próximo ao Aeroporto Afonso Pena",
      "Avenida das Américas",
      "Bairro Aviação",
      "São Marcos",
      "Distrito Industrial",
    ],
    tempoDeslocamento: "Chegamos em 35-50 minutos",
    servicosDestaque: [
      "Formatação Windows",
      "Remoção de vírus",
      "Upgrade de hardware",
      "Conserto de fonte e placa-mãe",
      "Recuperação de dados",
      "Instalação de programas",
      "Suporte técnico empresarial",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default Braga;