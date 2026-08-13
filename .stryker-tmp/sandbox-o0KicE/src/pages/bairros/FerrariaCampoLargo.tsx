// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const FerrariaCampoLargo = () => {
  const data = {
    nome: "Ferraria",
    slug: "ferraria",
    cidade: "Campo Largo",
    metaTitle: "Técnico de Informática na Ferraria (Campo Largo) | Atendimento a Domicílio",
    metaDescription:
      "Técnico de informática na Ferraria, Campo Largo. Assistência técnica para computadores e notebooks: formatação, conserto, vírus, upgrade e redes. Atendimento a domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática na Ferraria – Campo Largo",
    subtitulo:
      "Atendimento em domicílio na Ferraria com suporte técnico completo e agendamento flexível.",
    descricaoLonga: `A Ferraria é uma região importante de Campo Largo, com áreas residenciais e de deslocamento frequente para Curitiba.

Se o seu computador está lento, não liga, apresenta tela azul, superaquecimento ou problemas de internet, nosso técnico atende a Ferraria com diagnóstico claro e soluções objetivas. Fazemos desde manutenção e formatação até upgrade de SSD e redes Wi‑Fi bem configuradas para a sua casa ou comércio.`,
    pontosReferencia: [
      "Região da Ferraria",
      "Acessos pela BR-277",
      "Região de comércio local",
      "Bairros próximos (Centro, Bateias)",
    ],
    tempoDeslocamento: "Chegamos em 50-80 minutos",
    servicosDestaque: [
      "Conserto de notebook/PC",
      "Formatação e otimização",
      "Remoção de vírus e proteção",
      "Upgrade SSD + migração",
      "Configuração de rede e Wi‑Fi",
      "Backup/recuperação de arquivos",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default FerrariaCampoLargo;
