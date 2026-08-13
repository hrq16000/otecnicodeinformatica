// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim das Américas",
  slug: "jardim-das-americas",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Jardim das Américas | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Jardim das Américas, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Jardim das Américas – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Jardim das Américas. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Jardim das Américas é um bairro movimentado de Curitiba, próximo à UFPR Politécnica e ao Terminal do Hauer. Com grande presença de estudantes e famílias, a região tem alta demanda por serviços de informática. Nosso técnico atende o Jardim das Américas a domicílio, realizando formatação de computadores, remoção de vírus, conserto de notebooks, configuração de redes Wi-Fi e upgrade de hardware.`,
  pontosReferencia: ["UFPR Politécnica", "Terminal Hauer (próximo)", "Av. das Américas", "Rua Imaculada Conceição", "Jardim Botânico (próximo)", "BR-277 (próxima)"],
  tempoDeslocamento: "Atendimento em até 40 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const JardimAmericas = () => <BairroTemplate data={data} />;

export default JardimAmericas;
