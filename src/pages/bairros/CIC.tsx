import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "CIC",
  slug: "cic",
  cidade: "Curitiba",
  indexavel: true,
  metaTitle: "Técnico de Informática no CIC (Curitiba) | Notebook e PC",
  metaDescription:
    "Técnico de informática no CIC, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para empresas. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
  h1: "Técnico de Informática no CIC – Curitiba",
  subtitulo: "Conserto de notebook, manutenção de computador e suporte para empresas na Cidade Industrial de Curitiba",
  descricaoLonga: `A Cidade Industrial de Curitiba (CIC) é o maior bairro da capital em extensão, 
    abrigando centenas de indústrias, comércios e milhares de residências. Oferecemos atendimento 
    de técnico de informática em todo o CIC, com o mesmo cuidado para empresas e para moradores: 
    conserto de notebook, manutenção de computador, formatação com backup, remoção de vírus e 
    upgrade de SSD e memória. Conhecemos bem a região, das proximidades da Rua João Bettega até 
    as áreas mais industriais próximas à Linha Verde, com atendimento em domicílio ou por coleta 
    e entrega.`,
  conteudoExclusivo: `No CIC, o perfil de atendimento é bem variado: de um lado, indústrias e comércios que dependem de computadores estáveis e rede funcionando para não parar a operação; de outro, famílias que precisam do notebook para estudo, trabalho e dia a dia. Por isso, o diagnóstico honesto faz toda a diferença — entender o problema real antes de trocar qualquer peça evita gasto desnecessário para os dois públicos.

Para as empresas do CIC, os atendimentos mais comuns envolvem manutenção de estações de trabalho, organização e estabilidade de rede, suporte a impressoras compartilhadas e rotinas de backup. Como a Cidade Industrial concentra muitas operações que rodam o dia inteiro, a manutenção preventiva costuma valer mais a pena do que esperar a máquina falhar no pior momento.

Para as residências do CIC, o que mais aparece é computador lento, notebook esquentando e desligando, vírus e pop-ups, Wi-Fi que não cobre a casa toda e necessidade de formatação com backup. Na maioria desses casos, resolvemos com formatação, limpeza interna, troca de pasta térmica ou upgrade de SSD — sempre explicando com clareza o que precisa e o que não precisa ser feito.`,
  problemasComuns: [
    "Computador de escritório lento travando no meio do expediente",
    "Notebook superaquecendo e desligando sozinho",
    "Rede da empresa instável afetando o trabalho da equipe",
    "Vírus, pop-ups e programas indesejados no PC de casa",
    "Wi-Fi que não cobre toda a residência ou o galpão",
    "Necessidade de formatação com backup dos arquivos",
  ],
  dicasLocais: `Se você é do CIC e o computador está lento, antes de pensar em trocar de máquina vale avaliar um upgrade de SSD e memória — costuma ser a solução com melhor custo-benefício. Para empresas da região, manter uma rotina de backup testada evita prejuízo com perda de dados. E, ao receber qualquer aviso pedindo pagamento urgente para "consertar" o computador, desconfie: normalmente é golpe. Fale conosco pelo WhatsApp e avaliamos o caso com segurança.`,
  pontosReferencia: [
    "Rua João Bettega",
    "Linha Verde",
    "Terminal CIC",
    "Augusta",
    "São Miguel",
    "Tatuquara",
  ],
  tempoDeslocamento: "Atendimento programado - cobertura completa",
  servicosDestaque: [
    "Conserto de notebook",
    "Manutenção de computador",
    "Formatação com backup",
    "Suporte para empresas",
    "Rede corporativa",
    "Upgrade de SSD e memória",
  ],
};

const CIC = () => <BairroTemplate data={data} />;

export default CIC;
