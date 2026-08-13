// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const DelRey = () => {
  const data = {
    nome: "Del Rey",
    slug: "del-rey",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Del Rey SJP | Atendimento Domicílio | O Técnico de Informática",
    metaDescription: "Técnico de informática no Del Rey, São José dos Pinhais. Formatação, conserto, upgrade SSD. Atendimento rápido em domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Del Rey – São José dos Pinhais",
    subtitulo: "Assistência técnica de qualidade no Del Rey. Atendimento domiciliar para sua comodidade.",
    descricaoLonga: `O bairro Del Rey em São José dos Pinhais é uma região com boa estrutura residencial e comercial. Nossa equipe de técnicos de informática atende toda a região do Del Rey, oferecendo serviços especializados com a praticidade do atendimento em domicílio.

    Seja para resolver um problema urgente ou para fazer manutenção preventiva, estamos prontos para atender. Trabalhamos com equipamentos de qualidade e peças originais, garantindo durabilidade e bom funcionamento do seu computador.`,
    pontosReferencia: [
      "Próximo ao Centro",
      "São Francisco",
      "Afonso Pena",
      "Cruzeiro",
      "Região Comercial",
      "Avenida das Torres",
    ],
    tempoDeslocamento: "Atendimento em até 35 minutos",
    servicosDestaque: [
      "Formatação Windows",
      "Limpeza de sistema",
      "Upgrade de hardware",
      "Conserto de fonte",
      "Troca de HD por SSD",
      "Configuração de rede",
      "Suporte técnico",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default DelRey;