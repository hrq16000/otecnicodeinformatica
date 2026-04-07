import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Uberaba",
  slug: "uberaba",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Uberaba | Curitiba | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Uberaba, Curitiba. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Uberaba – Curitiba",
  subtitulo: "Atendimento técnico profissional a domicílio no Uberaba. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Uberaba é um dos bairros mais importantes de Curitiba, com uma comunidade ativa de moradores e empresas que dependem de tecnologia no dia a dia. Seja para trabalho remoto, estudos ou entretenimento, um computador funcionando é essencial. Nosso técnico de informática atende o Uberaba a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Terminal do Capão Raso (próx.)", "Av. Salgado Filho", "Jardim das Américas", "Cajuru (divisa)", "Boqueirão (divisa)", "Alto Boqueirão"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const Uberaba = () => <BairroTemplate data={data} />;

export default Uberaba;
