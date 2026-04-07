import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Osasco",
  slug: "jardim-osasco",
  cidade: "Colombo",
  metaTitle: "Técnico de Informática no Jardim Osasco | Colombo | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Osasco, Colombo. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Osasco – Colombo",
  subtitulo: "Atendimento técnico profissional a domicílio no Jardim Osasco. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Jardim Osasco é uma das regiões de Colombo com grande concentração de residências e comércios locais. A demanda por serviços de informática é constante, especialmente para quem trabalha em home office ou precisa do computador para estudos. Nosso técnico de informática atende o Jardim Osasco a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Zona residencial", "Guaraituba (divisa)", "Centro (próx.)", "Alto Maracanã (divisa)", "Comércio local", "Escolas da região"],
  tempoDeslocamento: "Atendimento em 30-50 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const JardimOsascoColombo = () => <BairroTemplate data={data} />;

export default JardimOsascoColombo;
