import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Campo Comprido",
  slug: "campo-comprido",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Campo Comprido Curitiba | Visita Técnica | Técnico Curitiba",
  metaDescription: "Técnico de informática no Campo Comprido, Curitiba. Visita técnica em domicílio para PC e notebook. Formatação, manutenção e suporte. R$99,99/30min.",
  h1: "Técnico de Informática no Campo Comprido",
  subtitulo: "Atendimento técnico no Campo Comprido e região oeste de Curitiba",
  descricaoLonga: `O Campo Comprido é um bairro em crescimento na região oeste de Curitiba, 
    com muitos condomínios residenciais, casas e pequenos comércios. Nossa assistência 
    técnica em informática atende toda a extensão do Campo Comprido, desde as proximidades 
    do Parque Barigui até a divisa com o CIC e Mossunguê. Entendemos as necessidades dos 
    moradores da região: famílias com crianças em idade escolar precisando de computadores 
    funcionando para estudos, profissionais em home office e pequenos empresários locais. 
    Oferecemos atendimento em domicílio com preço justo e transparente, sem surpresas. 
    Nossa equipe está preparada para resolver desde problemas simples de lentidão até 
    reparos mais complexos de hardware.`,
  pontosReferencia: [
    "Parque Barigui",
    "Mossunguê",
    "Rua Eduardo Sprada",
    "Ecoville",
    "CIC",
    "Santo Inácio"
  ],
  tempoDeslocamento: "Atendimento no mesmo dia - região oeste",
  servicosDestaque: [
    "Computador lento",
    "Notebook não liga",
    "Instalação de Windows",
    "Configuração de impressora",
    "Rede doméstica",
    "Suporte para estudantes"
  ]
};

const CampoComprido = () => <BairroTemplate data={data} />;

export default CampoComprido;
