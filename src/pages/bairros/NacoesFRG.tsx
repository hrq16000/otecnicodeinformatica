import { BairroTemplate } from "./BairroTemplate";

const NacoesFRG = () => {
  const data = {
    nome: "Nações",
    slug: "nacoes-frg",
    cidade: "Fazenda Rio Grande",
    metaTitle: "Técnico de Informática no Nações (Fazenda Rio Grande) | Técnico Curitiba",
    metaDescription: "Técnico de informática no Nações, Fazenda Rio Grande. Formatação, conserto, upgrade SSD e redes Wi-Fi. Atendimento domiciliar. A partir de R$ 69,99.",
    h1: "Técnico de Informática no Nações – Fazenda Rio Grande",
    subtitulo: "Assistência técnica no Nações com atendimento a domicílio, qualidade e garantia.",
    descricaoLonga: `O bairro Nações em Fazenda Rio Grande é uma região residencial em constante crescimento. Moradores que trabalham de casa ou estudam online precisam de computadores funcionando bem.

Atendemos o Nações com serviços profissionais de informática: formatação, remoção de vírus, upgrade de SSD e memória, configuração de rede e conserto de notebooks. Diagnóstico no local com orçamento transparente antes de qualquer execução.`,
    pontosReferencia: ["Região do Nações", "Acesso pela BR-116", "Área residencial", "Bairros próximos (Eucaliptos, Centro)"],
    tempoDeslocamento: "Chegamos em 45-65 minutos",
    servicosDestaque: ["Formatação e otimização", "Remoção de vírus", "Upgrade SSD + migração", "Conserto de PC/notebook", "Configuração de rede", "Backup e recuperação"],
  };
  return <BairroTemplate data={data} />;
};
export default NacoesFRG;
