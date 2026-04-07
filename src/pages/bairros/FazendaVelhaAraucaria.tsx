import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Fazenda Velha",
  slug: "fazenda-velha-araucaria",
  cidade: "Araucária",
  metaTitle: "Técnico de Informática no Fazenda Velha | Araucária | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Fazenda Velha, Araucária. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Fazenda Velha – Araucária",
  subtitulo: "Atendimento técnico profissional a domicílio no Fazenda Velha. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Fazenda Velha é um bairro de Araucária com forte identidade local e crescimento residencial constante. Moradores e pequenos negócios da região precisam de suporte técnico rápido e confiável para seus equipamentos. Nosso técnico de informática atende o Fazenda Velha a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Zona residencial", "Centro (próx.)", "Estação (divisa)", "Costeira (divisa)", "Capela Velha (divisa)", "BR-476"],
  tempoDeslocamento: "Atendimento em 40-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const FazendaVelhaAraucaria = () => <BairroTemplate data={data} />;

export default FazendaVelhaAraucaria;
