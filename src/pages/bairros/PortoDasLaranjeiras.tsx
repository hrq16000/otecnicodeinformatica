import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Porto das Laranjeiras",
  slug: "porto-das-laranjeiras",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Porto das Laranjeiras | Araucária | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Porto das Laranjeiras, Araucária. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Porto das Laranjeiras – Araucária",
  subtitulo: "Atendimento técnico profissional a domicílio no Porto das Laranjeiras. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Porto das Laranjeiras é um bairro de Araucária com forte identidade local e crescimento residencial constante. Moradores e pequenos negócios da região precisam de suporte técnico rápido e confiável para seus equipamentos. Nosso técnico de informática atende o Porto das Laranjeiras a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Zona rural-urbana", "Campina da Barra (divisa)", "Tindiquera (divisa)", "Guajuvira (divisa)", "Rio Passaúna", "BR-476 (acesso)"],
  tempoDeslocamento: "Atendimento em 40-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const PortoDasLaranjeiras = () => <BairroTemplate data={data} />;

export default PortoDasLaranjeiras;
