import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Centro",
  slug: "centro",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Centro de Curitiba | Atendimento Rápido | Técnico Curitiba",
  metaDescription: "Técnico de informática no Centro de Curitiba. Atendimento em escritórios, lojas e residências. Formatação, remoção de vírus e suporte técnico. A partir de R$99,99.",
  h1: "Técnico de Informática no Centro de Curitiba",
  subtitulo: "Atendimento rápido no coração da cidade. Escritórios, lojas e residências.",
  descricaoLonga: `O Centro de Curitiba concentra uma grande quantidade de escritórios, lojas e 
    estabelecimentos comerciais que dependem de computadores funcionando perfeitamente. 
    Nossa equipe de técnicos em informática oferece atendimento especializado para toda a 
    região central, incluindo a Praça Tiradentes, Rua XV de Novembro, Rua das Flores e 
    imediações do Largo da Ordem. Entendemos a urgência do ambiente comercial e priorizamos 
    atendimentos rápidos para minimizar o impacto no seu negócio. Para residências no Centro, 
    oferecemos a mesma qualidade de serviço com horários flexíveis, incluindo sábados pela manhã.`,
  pontosReferencia: [
    "Praça Tiradentes",
    "Rua XV de Novembro",
    "Largo da Ordem",
    "Rua das Flores",
    "Shopping Mueller",
    "Praça Santos Andrade"
  ],
  tempoDeslocamento: "Atendimento em até 1 hora",
  servicosDestaque: [
    "Suporte para escritórios",
    "Formatação de computadores",
    "Remoção de vírus e malware",
    "Configuração de rede",
    "Backup de dados",
    "Manutenção preventiva"
  ]
};

const Centro = () => <BairroTemplate data={data} />;

export default Centro;
