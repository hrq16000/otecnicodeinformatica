import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Paranaguá",
  slug: "jardim-paranagua-at",
  cidade: "Almirante Tamandaré",
  metaTitle: "Técnico de Informática no Jardim Paranaguá | Almirante Tamandaré | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Paranaguá, Almirante Tamandaré. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Paranaguá – Almirante Tamandaré",
  subtitulo: "Atendimento profissional a domicílio no Jardim Paranaguá. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Paranaguá é um bairro residencial de Almirante Tamandaré. Nosso técnico de informática atende a domicílio com diagnóstico no local, formatação, conserto e suporte técnico completo para residências e empresas.`,
  pontosReferencia: ["Centro de AT (próximo)", "Tanguá (divisa)", "PR-092", "São Venâncio (acesso)"],
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

const JardimParanaguaTamandare = () => <BairroTemplate data={data} />;

export default JardimParanaguaTamandare;
