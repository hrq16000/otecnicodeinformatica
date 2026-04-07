import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Boqueirão",
  slug: "boqueirao",
  cidade: "Curitiba",
  metaTitle: "Técnico de Informática no Boqueirão | Curitiba | Atendimento a Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Boqueirão, Curitiba. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio rápido. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Boqueirão – Curitiba",
  subtitulo: "Atendimento técnico profissional a domicílio no Boqueirão. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Boqueirão é um dos bairros mais importantes de Curitiba, com uma comunidade ativa de moradores e empresas que dependem de tecnologia no dia a dia. Seja para trabalho remoto, estudos ou entretenimento, um computador funcionando é essencial. Nosso técnico de informática atende o Boqueirão a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada (como reparo de placa-mãe ou troca de tela), oferecemos coleta e entrega para sua comodidade. Trabalhamos com transparência total: você sabe exatamente o que será feito e quanto vai custar antes de aprovar qualquer serviço.`,
  pontosReferencia: ["Terminal do Boqueirão", "Av. Marechal Floriano Peixoto", "Rua Francisco Derosso", "Shopping Total (próximo)", "Hauer (divisa)", "Alto Boqueirão"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const Boqueirao = () => <BairroTemplate data={data} />;

export default Boqueirao;
