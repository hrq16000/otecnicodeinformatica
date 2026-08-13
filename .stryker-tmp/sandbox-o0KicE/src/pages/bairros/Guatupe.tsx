// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const Guatupe = () => {
  const data = {
    nome: "Guatupê",
    slug: "guatupe",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no Guatupê SJP | Atendimento Rápido | O Técnico de Informática",
    metaDescription: "Técnico de informática no Guatupê, São José dos Pinhais. Formatação, conserto, upgrade de hardware. Visita técnica domiciliar. a partir de R$ 99,99.",
    h1: "Técnico de Informática no Guatupê – São José dos Pinhais",
    subtitulo: "Assistência técnica profissional no Guatupê e região. Soluções rápidas para problemas de informática.",
    descricaoLonga: `O Guatupê é um bairro tradicional e bem estruturado de São José dos Pinhais, com forte presença residencial e comercial. Nossa equipe de técnicos de informática atende toda a região do Guatupê, oferecendo serviços de alta qualidade com foco na satisfação do cliente.

    Seja para residências ou empresas, oferecemos diagnóstico preciso, valor transparente e soluções eficientes. Nosso compromisso é resolver seu problema de informática no primeiro atendimento sempre que possível.`,
    pontosReferencia: [
      "Centro de Convenções",
      "Região Industrial",
      "São Cristóvão",
      "Costeira",
      "Parque da Fonte",
      "BR-376",
    ],
    tempoDeslocamento: "Chegamos em 30-45 minutos",
    servicosDestaque: [
      "Formatação profissional",
      "Remoção de malware",
      "Upgrade SSD NVMe",
      "Conserto de notebook",
      "Recuperação de HD",
      "Configuração de rede Wi-Fi",
      "Suporte técnico contínuo",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default Guatupe;