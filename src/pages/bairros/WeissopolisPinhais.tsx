import { BairroTemplate } from "./BairroTemplate";

const WeissopolisPinhais = () => {
  const data = {
    nome: "Weissópolis",
    slug: "weissopolis",
    cidade: "Pinhais",
    metaTitle: "Técnico de Informática no Weissópolis (Pinhais) | Conserto e Formatação",
    metaDescription:
      "Técnico de informática no Weissópolis, Pinhais. Conserto de notebook e PC, formatação, vírus, upgrade SSD e redes Wi‑Fi. Atendimento a domicílio rápido. Visita a partir de R$ 99,99.",
    h1: "Técnico de Informática no Weissópolis – Pinhais",
    subtitulo:
      "Atendimento a domicílio no Weissópolis com suporte técnico rápido, confiável e com garantia.",
    descricaoLonga: `Weissópolis é um dos bairros mais conhecidos de Pinhais, com grande concentração residencial e comércio.

Atendemos o Weissópolis com foco em resolver problemas comuns do dia a dia: computador lento, travamentos, vírus, Wi‑Fi instável, notebook superaquecendo e upgrades para melhorar desempenho. Nosso técnico vai até você com orientação clara e soluções práticas.`,
    pontosReferencia: [
      "Região do Weissópolis",
      "Acessos pela Av. Iraí",
      "Comércio local",
      "Bairros próximos (Centro, Pineville)",
    ],
    tempoDeslocamento: "Chegamos em 20-45 minutos",
    servicosDestaque: [
      "Formatação Windows 10/11",
      "Remoção de vírus e malwares",
      "Conserto de notebook",
      "Upgrade SSD e memória",
      "Configuração de roteador/rede",
      "Backup na nuvem",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default WeissopolisPinhais;
