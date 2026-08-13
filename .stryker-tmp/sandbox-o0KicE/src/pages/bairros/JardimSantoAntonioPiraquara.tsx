// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Santo Antônio",
  slug: "jardim-santo-antonio-piraquara",
  cidade: "Piraquara",
  metaTitle: "Técnico de Informática no Jardim Santo Antônio | Piraquara | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim Santo Antônio, Piraquara. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim Santo Antônio – Piraquara",
  subtitulo: "Atendimento profissional a domicílio no Jardim Santo Antônio. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Jardim Santo Antônio é um bairro residencial de Piraquara. Nosso técnico atende a domicílio com equipamento profissional, oferecendo serviços de manutenção, formatação, upgrade e configuração de redes com transparência e garantia.`,
  pontosReferencia: ["Centro de Piraquara (próximo)", "Vila Macedo (divisa)", "Rua XV de Novembro"],
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

const JardimSantoAntonioPiraquara = () => <BairroTemplate data={data} />;

export default JardimSantoAntonioPiraquara;
