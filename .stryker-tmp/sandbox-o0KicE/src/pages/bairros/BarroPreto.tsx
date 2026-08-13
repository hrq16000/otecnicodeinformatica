// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const BarroPreto = () => {
  const data = {
    nome: "Barro Preto",
    slug: "barro-preto",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Barro Preto SJP | O Técnico de Informática",
    metaDescription: "Técnico de informática no Barro Preto, São José dos Pinhais. Conserto de PC e notebook, formatação. Visita técnica domiciliar. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Barro Preto – São José dos Pinhais",
    subtitulo: "Serviços de informática profissionais no Barro Preto. Técnico especializado com atendimento rápido.",
    descricaoLonga: `O bairro Barro Preto em São José dos Pinhais é uma região com características mistas, combinando áreas residenciais e industriais. Nossa equipe de técnicos de informática atende toda a região do Barro Preto, oferecendo serviços completos para residências e empresas.

    Temos experiência em atender tanto clientes residenciais quanto corporativos, adaptando nossos serviços às necessidades específicas de cada um. Do computador pessoal ao servidor da empresa, temos a solução técnica adequada.`,
    pontosReferencia: [
      "Região Industrial",
      "Próximo à Renault",
      "Avenida das Américas",
      "Campo Largo da Roseira",
      "Área Empresarial",
      "Contorno Sul",
    ],
    tempoDeslocamento: "Chegamos em 40-50 minutos",
    servicosDestaque: [
      "Suporte técnico empresarial",
      "Formatação de servidores",
      "Manutenção de rede",
      "Upgrade de hardware",
      "Backup corporativo",
      "Remoção de vírus",
      "Configuração de equipamentos",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default BarroPreto;