import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Rebouças",
  slug: "reboucas",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Rebouças | Curitiba | O Técnico de Informática",
  metaDescription: "Técnico de informática no Rebouças, Curitiba. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Rebouças – Curitiba",
  subtitulo: "Atendimento profissional a domicílio no Rebouças. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `O Rebouças é um bairro estratégico de Curitiba, localizado entre o Centro e o Água Verde, com forte presença comercial e residencial. A região abriga o Terminal do Guadalupe e diversas empresas que dependem de tecnologia. Nosso técnico de informática atende todo o Rebouças com agilidade, oferecendo serviços de formatação, manutenção de PCs e notebooks, configuração de redes e suporte para escritórios. A proximidade com vias principais permite atendimento rápido e eficiente.`,
  pontosReferencia: ["Terminal Guadalupe", "Rua Rockefeller", "Rua Engenheiro Rebouças", "Shopping Estação (próximo)", "Praça do Expedicionário", "Rua Chile"],
  tempoDeslocamento: "Atendimento em até 30 min",
  servicosDestaque: [
    "Formatação de computador",
    "Conserto de notebook",
    "Remoção de vírus e malware",
    "Upgrade SSD e memória",
    "Configuração de rede Wi-Fi",
    "Backup e recuperação de dados"
  ]
};

const Reboucas = () => <BairroTemplate data={data} />;

export default Reboucas;
