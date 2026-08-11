import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Boa Vista",
  slug: "boa-vista-at",
  cidade: "Almirante Tamandaré",
  metaTitle: "Técnico de Informática no Boa Vista | Almirante Tamandaré | O Técnico de Informática",
  metaDescription: "Técnico de informática no Boa Vista, Almirante Tamandaré. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Boa Vista – Almirante Tamandaré",
  subtitulo: "Atendimento profissional a domicílio no Boa Vista. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Boa Vista é um bairro residencial de Almirante Tamandaré. Nosso técnico de informática atende Boa Vista a domicílio com diagnóstico profissional, formatação, conserto de notebooks e configuração de redes Wi-Fi.`,
  pontosReferencia: ["Centro de Almirante Tamandaré (próximo)", "Jardim Monte Santo (divisa)", "PR-092"],
  tempoDeslocamento: "Atendimento em até 50 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const BoaVistaTamandare = () => <BairroTemplate data={data} />;

export default BoaVistaTamandare;
