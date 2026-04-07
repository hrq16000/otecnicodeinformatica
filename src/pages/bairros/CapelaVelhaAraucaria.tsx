import { BairroTemplate } from "./BairroTemplate";

const CapelaVelhaAraucaria = () => {
  const data = {
    nome: "Capela Velha",
    slug: "capela-velha",
    cidade: "Araucária",
    metaTitle: "Técnico de Informática na Capela Velha (Araucária) | Técnico Curitiba",
    metaDescription:
      "Técnico de informática na Capela Velha, Araucária. Conserto de notebook e PC, formatação, vírus, rede Wi‑Fi e upgrade. Atendimento em domicílio. A partir de A partir de R$ 69,99.",
    h1: "Técnico de Informática na Capela Velha – Araucária",
    subtitulo:
      "Atendimento a domicílio na Capela Velha com assistência técnica completa e horário agendado.",
    descricaoLonga: `A Capela Velha é um dos bairros mais tradicionais e populosos de Araucária, com grande movimentação residencial e comercial.

Se você precisa de suporte para computador ou notebook, nosso técnico atende a Capela Velha com rapidez e foco em solução definitiva. Trabalhamos com manutenção preventiva, remoção de vírus, upgrades e reparos de hardware, sempre com transparência no orçamento e orientação para evitar novos problemas.`,
    pontosReferencia: [
      "Região da Capela Velha",
      "Av. Archelau de Almeida Torres",
      "Comércio local",
      "Conjunto habitacional",
      "Bairros próximos (Iguaçu, Fazenda Velha)",
    ],
    tempoDeslocamento: "Chegamos em 40-60 minutos",
    servicosDestaque: [
      "Formatação com instalação de programas",
      "Remoção de vírus/ransomware",
      "Upgrade SSD + clonagem do sistema",
      "Troca de memória RAM",
      "Configuração de internet e Wi‑Fi",
      "Backup e recuperação de dados",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default CapelaVelhaAraucaria;
