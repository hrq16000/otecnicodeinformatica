import { BairroTemplate } from "./BairroTemplate";

const JardimMontoSanto = () => {
  const data = {
    nome: "Jardim Monte Santo",
    slug: "jardim-monte-santo",
    cidade: "Almirante Tamandaré",
    metaTitle: "Técnico de Informática no Jardim Monte Santo (Almirante Tamandaré) | O Técnico de Informática",
    metaDescription: "Técnico de informática no Jardim Monte Santo, Almirante Tamandaré. Conserto, formatação, vírus, upgrade. Atendimento a domicílio. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Jardim Monte Santo – Almirante Tamandaré",
    subtitulo: "Atendimento técnico a domicílio no Jardim Monte Santo com rapidez e garantia.",
    descricaoLonga: `O Jardim Monte Santo é um bairro residencial de Almirante Tamandaré com boa infraestrutura e acesso facilitado. Moradores que precisam do computador para trabalho e estudos contam com nosso atendimento profissional.

Resolvemos problemas comuns como lentidão, travamentos, vírus, Wi-Fi instável e notebooks que superaquecem. Nosso técnico vai até o Jardim Monte Santo com equipamento profissional e resolve na hora sempre que possível.`,
    pontosReferencia: ["Região do Jardim Monte Santo", "Acesso pela Rodovia dos Minérios", "Área residencial", "Bairros próximos (Centro, Cachoeira)"],
    tempoDeslocamento: "Chegamos em 35-50 minutos",
    servicosDestaque: ["Formatação completa", "Remoção de vírus", "Upgrade SSD/RAM", "Conserto de notebook", "Configuração de rede", "Backup e recuperação"],
  };
  return <BairroTemplate data={data} />;
};
export default JardimMontoSanto;
