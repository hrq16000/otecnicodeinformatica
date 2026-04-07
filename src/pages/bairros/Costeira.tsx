import { BairroTemplate } from "./BairroTemplate";

const Costeira = () => {
  const data = {
    nome: "Costeira",
    slug: "costeira",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática na Costeira SJP | Atendimento Domicílio | Técnico Curitiba",
    metaDescription: "Técnico de informática na Costeira, São José dos Pinhais. Formatação, conserto, upgrade SSD. Visita técnica em domicílio. A partir de A partir de R$ 69,99.",
    h1: "Técnico de Informática na Costeira – São José dos Pinhais",
    subtitulo: "Serviços de informática na Costeira com atendimento rápido e profissional. Técnico vai até você.",
    descricaoLonga: `A Costeira é um dos bairros mais tradicionais de São José dos Pinhais, conhecido por sua forte identidade comunitária e boa estrutura comercial. Nossa equipe de técnicos atende toda a região da Costeira e arredores, oferecendo serviços completos de manutenção e suporte em informática.

    Com anos de experiência no atendimento domiciliar, garantimos diagnóstico preciso e soluções eficientes para qualquer problema no seu computador ou notebook. Trabalhamos com transparência nos preços e qualidade nos serviços.`,
    pontosReferencia: [
      "Centro Comercial Costeira",
      "Próximo ao Parque da Fonte",
      "Aristocrata",
      "Jardim Ipê",
      "São Cristóvão",
      "Região do Guatupê",
    ],
    tempoDeslocamento: "Atendimento em até 40 minutos",
    servicosDestaque: [
      "Formatação com backup completo",
      "Limpeza e remoção de vírus",
      "Upgrade SSD NVMe",
      "Troca de tela de notebook",
      "Configuração de redes",
      "Manutenção preventiva",
      "Suporte para home office",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default Costeira;