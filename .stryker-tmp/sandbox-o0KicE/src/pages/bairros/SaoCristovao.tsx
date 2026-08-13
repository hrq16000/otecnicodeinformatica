// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const SaoCristovao = () => {
  const data = {
    nome: "São Cristóvão",
    slug: "sao-cristovao",
    cidade: "São José dos Pinhais",
    metaTitle: "Técnico de Informática no São Cristóvão SJP | O Técnico de Informática",
    metaDescription: "Técnico de informática no São Cristóvão, São José dos Pinhais. Conserto de PC e notebook, formatação, upgrade. Atendimento domiciliar. a partir de R$ 99,99.",
    h1: "Técnico de Informática no São Cristóvão – São José dos Pinhais",
    subtitulo: "Atendimento técnico especializado no São Cristóvão. Seu computador funcionando perfeitamente.",
    descricaoLonga: `O bairro São Cristóvão em São José dos Pinhais é uma região em constante desenvolvimento, com excelente estrutura residencial e comercial. Nossa equipe de técnicos de informática atende toda a região do São Cristóvão, proporcionando serviços de qualidade com atendimento personalizado.

    Oferecemos soluções completas para manutenção de computadores, notebooks e periféricos. Com técnicos experientes e equipamentos adequados, resolvemos desde problemas simples até situações mais complexas que exigem conhecimento especializado.`,
    pontosReferencia: [
      "Próximo ao Guatupê",
      "Costeira",
      "Centro de SJP",
      "São Domingos",
      "Região Industrial",
      "Avenida Rui Barbosa",
    ],
    tempoDeslocamento: "Atendimento em até 40 minutos",
    servicosDestaque: [
      "Formatação Windows",
      "Limpeza de vírus",
      "Troca de HD por SSD",
      "Aumento de memória",
      "Conserto de fonte",
      "Configuração de impressoras",
      "Backup de dados",
    ],
  };

  return <BairroTemplate data={data} />;
};

export default SaoCristovao;