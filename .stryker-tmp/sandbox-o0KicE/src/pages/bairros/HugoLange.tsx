// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Hugo Lange",
  slug: "hugo-lange",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Hugo Lange | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Hugo Lange, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Hugo Lange – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Hugo Lange. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Hugo Lange é um bairro nobre e arborizado de Curitiba, próximo ao Jardim Botânico e ao Cabral. Com perfil predominantemente residencial e ruas tranquilas, é um dos bairros mais charmosos da cidade. Nosso técnico de informática atende Hugo Lange a domicílio com discrição e profissionalismo, realizando diagnóstico, formatação, conserto de notebooks, configuração de smart home e suporte premium para residências e home offices.`,
  pontosReferencia: ["Jardim Botânico (próximo)", "Rua Fernando Amaro", "Alto da Rua XV", "Praça da Ucrânia", "Rua Agostinho Merlin"],
  tempoDeslocamento: "Atendimento agendado conforme a disponibilidade da agenda",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const HugoLange = () => <BairroTemplate data={data} />;

export default HugoLange;
