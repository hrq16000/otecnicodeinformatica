// @ts-nocheck
import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Rondinha",
  slug: "rondinha",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Rondinha | Campo Largo | Atendimento Domicílio | O Técnico de Informática",
  metaDescription: "Técnico de informática no Rondinha, Campo Largo. Formatação, conserto de notebook, remoção de vírus, upgrade SSD. Atendimento a domicílio. a partir de R$ 99,99.",
  h1: "Técnico de Informática no Rondinha – Campo Largo",
  subtitulo: "Atendimento técnico profissional a domicílio no Rondinha. Diagnóstico no local, valor transparente e garantia.",
  descricaoLonga: `O Rondinha é uma região de Campo Largo, a Capital da Louça, com perfil residencial e comercial. Moradores e empresas locais precisam de suporte técnico rápido e confiável. Nosso técnico de informática atende o Rondinha a domicílio com equipamento profissional, realizando diagnóstico no local e resolvendo a maioria dos problemas na primeira visita. Para casos que exigem bancada, oferecemos coleta e entrega. Trabalhamos com transparência total: Valor antes da execução, sem surpresas.`,
  pontosReferencia: ["Centro de Campo Largo", "Zona residencial", "Comércio local", "Bairros vizinhos de Campo Largo", "Escolas da região", "Terminal de ônibus (próx.)"],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: ["Formatação de computador", "Remoção de vírus e malware", "Conserto de notebook", "Upgrade SSD e memória", "Configuração de rede Wi-Fi", "Backup e recuperação de dados"],
};

const RondinhaCL = () => <BairroTemplate data={data} />;

export default RondinhaCL;
