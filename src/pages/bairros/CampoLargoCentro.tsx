import { BairroTemplate } from "./BairroTemplate";

const CampoLargoCentro = () => {
  const data = {
    nome: "Centro (Campo Largo)",
    slug: "centro-campo-largo",
    cidade: "Campo Largo",
    metaTitle: "Técnico de Informática no Centro de Campo Largo | Técnico Curitiba",
    metaDescription:
      "Técnico de informática no Centro de Campo Largo. Conserto de PC e notebook, formatação, vírus, upgrade SSD e configuração de rede. Atendimento a domicílio com agendamento. A partir de A partir de R$ 69,99.",
    h1: "Técnico de Informática no Centro de Campo Largo",
    subtitulo:
      "Assistência técnica no Centro de Campo Largo com atendimento a domicílio e suporte profissional para PC e notebook.",
    descricaoLonga: `O Centro de Campo Largo reúne comércio, serviços e grande circulação de pessoas, o que faz com que computadores e notebooks sejam essenciais no dia a dia.

Nossa assistência técnica atende a região central com foco em rapidez e qualidade: diagnóstico, solução e orientação. Realizamos formatação, remoção de vírus, upgrades e consertos com transparência e garantia, evitando retrabalho e perda de tempo.`,
    pontosReferencia: [
      "Região Central",
      "Comércio e escritórios",
      "Terminal/área de circulação",
      "Acesso pela BR-277",
      "Bairros próximos (Jardim Guilhermina, Ferraria)",
    ],
    tempoDeslocamento: "Chegamos em 45-70 minutos",
    servicosDestaque: [
      "Formatação Windows (com drivers)",
      "Remoção de vírus e limpeza",
      "Upgrade SSD e memória RAM",
      "Conserto de notebook",
      "Configuração de Wi‑Fi e rede",
      "Backup e recuperação",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default CampoLargoCentro;
