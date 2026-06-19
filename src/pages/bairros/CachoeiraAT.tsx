import { BairroTemplate } from "./BairroTemplate";

const CachoeiraAT = () => {
  const data = {
    nome: "Cachoeira",
    slug: "cachoeira-at",
    cidade: "Almirante Tamandaré",
    metaTitle: "Técnico de Informática na Cachoeira (Almirante Tamandaré) | Técnico Curitiba",
    metaDescription: "Técnico de informática na Cachoeira, Almirante Tamandaré. Formatação, conserto de notebook, vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática na Cachoeira – Almirante Tamandaré",
    subtitulo: "Assistência técnica na Cachoeira com atendimento domiciliar profissional e garantia.",
    descricaoLonga: `A Cachoeira é uma região importante de Almirante Tamandaré, com acesso pela BR-476 e proximidade com a divisa norte de Curitiba. A região tem forte perfil residencial e demanda constante por serviços de informática.

Atendemos a Cachoeira com serviços completos: formatação, remoção de vírus, upgrade de SSD e memória, conserto de notebook e configuração de redes. Trabalhamos com diagnóstico transparente e orçamento aprovado antes da execução.`,
    pontosReferencia: ["Região da Cachoeira", "Acesso pela BR-476", "Divisa com Curitiba (Santa Cândida)", "Bairros próximos (Centro, Tanguá)"],
    tempoDeslocamento: "Chegamos em 30-45 minutos",
    servicosDestaque: ["Formatação e otimização", "Remoção de vírus e proteção", "Upgrade SSD + migração", "Conserto de notebook/PC", "Configuração de Wi-Fi", "Backup na nuvem"],
  };
  return <BairroTemplate data={data} />;
};
export default CachoeiraAT;
