import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Campo do Tenente",
  slug: "campo-tenente-at",
  cidade: "Almirante Tamandaré",
  metaTitle: "Técnico de Informática no Campo do Tenente | Almirante Tamandaré | Técnico Curitiba",
  metaDescription: "Técnico de informática no Campo do Tenente, Almirante Tamandaré. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Campo do Tenente – Almirante Tamandaré",
  subtitulo: "Atendimento profissional a domicílio no Campo do Tenente. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Campo do Tenente é uma região de Almirante Tamandaré com perfil residencial. Nosso técnico atende a domicílio com equipamento profissional, oferecendo manutenção completa de computadores e notebooks com garantia e transparência.`,
  pontosReferencia: ["Centro de AT (acesso)", "Cachoeira (divisa)", "PR-092", "Jardim Graziela (próximo)"],
  tempoDeslocamento: "Atendimento agendado",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const CampoDoTenenteTamandare = () => <BairroTemplate data={data} />;

export default CampoDoTenenteTamandare;
