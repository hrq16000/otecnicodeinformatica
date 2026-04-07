import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Jardim Boa Vista",
  slug: "jardim-boa-vista-cm",
  cidade: "Campo Magro",
  metaTitle: "Técnico de Informática no Jardim Boa Vista | Campo Magro | Atendimento Domicílio | Técnico Curitiba",
  metaDescription: "Técnico de informática no Jardim Boa Vista, Campo Magro. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. A partir de R$ 69,99.",
  h1: "Técnico de Informática no Jardim Boa Vista – Campo Magro",
  subtitulo: "Atendimento técnico profissional a domicílio no Jardim Boa Vista. Diagnóstico no local, orçamento transparente e garantia.",
  descricaoLonga: `O Jardim Boa Vista é uma localidade de Campo Magro, cidade ao noroeste de Curitiba. Com cerca de 30 mil habitantes e perfil misto entre urbano e rural, o bairro conta com nosso atendimento profissional. Nosso técnico de informática atende o Jardim Boa Vista a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: orçamento antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Campo Magro", "Zona residencial", "Comércio local", "Bairros vizinhos de Campo Magro", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const JardimBoaVistaCM = () => <BairroTemplate data={data} />;

export default JardimBoaVistaCM;
