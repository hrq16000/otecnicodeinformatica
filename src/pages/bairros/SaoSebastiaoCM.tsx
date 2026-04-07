import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "São Sebastião",
  slug: "sao-sebastiao-cm",
  cidade: "Campo Magro",
  metaTitle: "Técnico de Informática no São Sebastião | Campo Magro | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no São Sebastião, Campo Magro. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de R$ 69,99.",
  h1: "Técnico de Informática no São Sebastião – Campo Magro",
  subtitulo: "Atendimento técnico profissional a domicílio no São Sebastião. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O São Sebastião é uma localidade de Campo Magro, cidade ao noroeste de Curitiba. Com cerca de 30 mil habitantes e perfil misto entre urbano e rural, o bairro conta com nosso atendimento profissional. Nosso técnico de informática atende o São Sebastião a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Campo Magro", "Zona residencial", "Comércio local", "Bairros vizinhos de Campo Magro", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const SaoSebastiaoCM = () => <BairroTemplate data={data} />;

export default SaoSebastiaoCM;
