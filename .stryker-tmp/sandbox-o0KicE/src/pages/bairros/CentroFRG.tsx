// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const CentroFRG = () => {
  const data = {
    nome: "Centro (Fazenda Rio Grande)",
    slug: "centro-fazenda-rio-grande",
    cidade: "Fazenda Rio Grande",
    metaTitle: "Técnico de Informática no Centro de Fazenda Rio Grande | O Técnico de Informática",
    metaDescription: "Técnico de informática no Centro de Fazenda Rio Grande. Formatação, conserto, vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Centro de Fazenda Rio Grande",
    subtitulo: "Assistência técnica profissional no Centro de Fazenda Rio Grande com atendimento rápido e garantia.",
    descricaoLonga: `O Centro de Fazenda Rio Grande concentra o comércio e os serviços da cidade. Com fácil acesso pela Contorno Sul e BR-116, nosso técnico chega com agilidade para atender residências e empresas.

Resolvemos problemas comuns como computador lento, notebook que trava, Wi-Fi instável, vírus e necessidade de upgrade. Diagnóstico transparente, valor antes da execução e garantia em todo serviço realizado.`,
    pontosReferencia: ["Prefeitura de Fazenda Rio Grande", "Comércio central", "Acesso pela BR-116", "Terminal de ônibus"],
    tempoDeslocamento: "Chegamos em 40-60 minutos",
    servicosDestaque: ["Formatação completa", "Remoção de vírus", "Upgrade SSD/RAM", "Conserto de notebook", "Configuração de rede", "Backup"],
  };
  return <BairroTemplate data={data} />;
};
export default CentroFRG;
