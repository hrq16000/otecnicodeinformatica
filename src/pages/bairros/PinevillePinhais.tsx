import { BairroTemplate } from "./BairroTemplate";

const PinevillePinhais = () => {
  const data = {
    nome: "Pineville",
    slug: "pineville",
    cidade: "Pinhais",
    metaTitle: "Técnico de Informática no Pineville (Pinhais) | Atendimento a Domicílio",
    metaDescription:
      "Técnico de informática no Pineville, Pinhais. Formatação, conserto, vírus, upgrade e configuração de internet/Wi‑Fi. Atendimento a domicílio rápido. A partir de R$ 99,99.",
    h1: "Técnico de Informática no Pineville – Pinhais",
    subtitulo:
      "Assistência técnica no Pineville com atendimento rápido, diagnóstico preciso e soluções que funcionam.",
    descricaoLonga: `O Pineville é um bairro com perfil residencial e fácil acesso a Curitiba, o que facilita atendimentos rápidos.

Se você precisa de um técnico de informática no Pineville, atendemos com serviços completos para PC e notebook: formatação, remoção de vírus, upgrades (SSD/RAM), consertos e configuração de rede. Trabalhamos com transparência e garantia, com foco em desempenho e segurança.`,
    pontosReferencia: [
      "Região do Pineville",
      "Acesso rápido a Curitiba",
      "Condomínios e comércio",
      "Bairros próximos (Weissópolis, Centro)",
    ],
    tempoDeslocamento: "Chegamos em 20-45 minutos",
    servicosDestaque: [
      "Formatação e otimização",
      "Remoção de vírus e proteção",
      "Upgrade SSD + migração",
      "Troca de memória RAM",
      "Configuração de rede/Wi‑Fi",
      "Backup e recuperação",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default PinevillePinhais;
