import { BairroTemplate } from "./BairroTemplate";

const JardimGuilherminaCampoLargo = () => {
  const data = {
    nome: "Jardim Guilhermina",
    slug: "jardim-guilhermina",
    cidade: "Campo Largo",
    metaTitle: "Técnico de Informática no Jardim Guilhermina (Campo Largo) | Técnico Curitiba",
    metaDescription:
      "Técnico de informática no Jardim Guilhermina, Campo Largo. Formatação, vírus, conserto de notebook, upgrade SSD/RAM e Wi‑Fi. Atendimento a domicílio. Visita a partir de R$ 99,99.",
    h1: "Técnico de Informática no Jardim Guilhermina – Campo Largo",
    subtitulo:
      "Assistência técnica no Jardim Guilhermina com atendimento em domicílio, rapidez e qualidade.",
    descricaoLonga: `O Jardim Guilhermina é uma área residencial de Campo Largo onde computador e notebook são fundamentais para trabalho, estudos e tarefas do dia a dia.

Atendemos o bairro com serviços completos: formatação, remoção de vírus, upgrades e correções de hardware. Nosso objetivo é entregar um atendimento profissional, com comunicação clara e foco no que realmente resolve, evitando gastos desnecessários.`,
    pontosReferencia: [
      "Região do Jardim Guilhermina",
      "Acessos ao Centro",
      "Escolas e comércio local",
      "Bairros próximos (Centro, Jardim América)",
    ],
    tempoDeslocamento: "Chegamos em 50-75 minutos",
    servicosDestaque: [
      "Formatação Windows 10/11",
      "Remoção de vírus e malware",
      "Upgrade SSD e RAM",
      "Conserto de notebook",
      "Configuração de Wi‑Fi",
      "Backup na nuvem",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default JardimGuilherminaCampoLargo;
