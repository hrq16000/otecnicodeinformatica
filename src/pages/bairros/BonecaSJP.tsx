import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Boneca do Iguaçu",
  slug: "boneca-do-iguacu-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Boneca do Iguaçu | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Boneca do Iguaçu, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Boneca do Iguaçu – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Boneca do Iguaçu. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Boneca do Iguaçu é um bairro residencial de São José dos Pinhais, próximo ao Rio Iguaçu. A região tem crescido com novos empreendimentos e abriga famílias que precisam de suporte técnico confiável. Nosso técnico atende Boneca do Iguaçu a domicílio, resolvendo problemas de informática com agilidade e preço justo.`,
  pontosReferencia: ["Rio Iguaçu (próximo)", "BR-376 (próxima)", "São Marcos (divisa)", "Centro de SJP (acesso rápido)"],
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

const BonecaSJP = () => <BairroTemplate data={data} />;

export default BonecaSJP;
