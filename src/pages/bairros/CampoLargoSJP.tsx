import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Campo Largo da Roseira",
  slug: "campo-largo-roseira-sjp",
  cidade: "São José dos Pinhais",
  metaTitle: "Técnico de Informática no Campo Largo da Roseira | São José dos Pinhais | Técnico Curitiba",
  metaDescription: "Técnico de informática no Campo Largo da Roseira, São José dos Pinhais. Atendimento a domicílio com diagnóstico no local. Formatação, conserto de notebook, redes Wi-Fi. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Campo Largo da Roseira – São José dos Pinhais",
  subtitulo: "Atendimento profissional a domicílio no Campo Largo da Roseira. Diagnóstico, reparo e suporte técnico com garantia.",
  descricaoLonga: `Campo Largo da Roseira é um bairro de São José dos Pinhais com perfil residencial e forte identidade comunitária. A região tem demanda crescente por serviços de informática. Nosso técnico atende Campo Largo da Roseira a domicílio com equipamento profissional e preços acessíveis.`,
  pontosReferencia: ["Centro de SJP (acesso rápido)", "BR-277 (próxima)", "Aristocrata (divisa)", "Contorno Sul"],
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

const CampoLargoSJP = () => <BairroTemplate data={data} />;

export default CampoLargoSJP;
