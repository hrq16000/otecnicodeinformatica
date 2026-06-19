import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim São Jorge",
  slug: "jardim-sao-jorge-at",
  cidade: "Almirante Tamandaré",
  metaTitle: "Técnico de Informática no Jardim São Jorge | Almirante Tamandaré | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim São Jorge, Almirante Tamandaré. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim São Jorge – Almirante Tamandaré",
  subtitulo: "Atendimento profissional a domicílio no Jardim São Jorge. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim São Jorge é um bairro em crescimento de Almirante Tamandaré. Nosso técnico atende a domicílio com agilidade, oferecendo serviços de formatação, conserto de notebooks, remoção de vírus e configuração de redes.`,
  pontosReferencia: ["Centro de AT (acesso)", "Jardim Roma (divisa)", "Colônia Antônio Prado (próximo)"],
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

const JardimSaoJorgeTamandare = () => <BairroTemplate data={data} />;

export default JardimSaoJorgeTamandare;
