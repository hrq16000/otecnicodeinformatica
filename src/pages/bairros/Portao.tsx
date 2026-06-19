import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Portão",
  slug: "portao",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Portão Curitiba | Atendimento Residencial | Técnico Curitiba",
  metaDescription: "Técnico de informática no Portão, Curitiba. Atendimento em domicílio para conserto de PC e notebook. Formatação, vírus e upgrade. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Portão – Curitiba",
  subtitulo: "Atendimento residencial e comercial no Portão e região. Técnico perto de você.",
  descricaoLonga: `O Portão é um dos bairros mais tradicionais e populosos de Curitiba, com uma 
    mistura de residências, comércios e pequenas empresas que precisam de suporte técnico 
    confiável. Nossa equipe de técnicos de informática conhece bem a região do Portão, 
    atendendo desde a Avenida República Argentina até as proximidades do Shopping Palladium 
    e Hospital do Trabalhador. Oferecemos atendimento em domicílio com horários flexíveis, 
    ideal para famílias e profissionais que trabalham de casa. Se você está no Portão ou 
    bairros vizinhos como Santa Quitéria e Fazendinha, conte com nosso atendimento rápido 
    e profissional para resolver qualquer problema de informática.`,
  pontosReferencia: [
    "Shopping Palladium",
    "Av. República Argentina",
    "Hospital do Trabalhador",
    "Santa Quitéria",
    "Fazendinha",
    "Novo Mundo"
  ],
  tempoDeslocamento: "Deslocamento rápido - região central",
  servicosDestaque: [
    "Conserto de notebook",
    "Formatação Windows",
    "Remoção de vírus",
    "Upgrade de memória e SSD",
    "Configuração de Wi-Fi",
    "Backup de fotos e documentos"
  ]
};

const Portao = () => <BairroTemplate data={data} />;

export default Portao;
