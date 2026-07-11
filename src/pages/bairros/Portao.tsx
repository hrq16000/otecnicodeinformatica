import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Portão",
  slug: "portao",
  cidade: "Curitiba",
  indexavel: true,
  metaTitle: "Técnico de Informática no Portão (Curitiba) | Notebook e PC",
  metaDescription:
    "Técnico de informática no Portão, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Atendimento a domicílio a partir de R$ 99,99. Via WhatsApp.",
  h1: "Técnico de Informática no Portão – Curitiba",
  subtitulo: "Conserto de notebook, manutenção de computador e formatação com backup no Portão e região",
  descricaoLonga: `O Portão é um dos bairros mais tradicionais e populosos de Curitiba, com uma mistura de 
    residências, comércios e pequenas empresas que precisam de suporte técnico confiável. Nosso técnico de 
    informática atende toda a região do Portão — da Av. República Argentina às proximidades do Shopping 
    Palladium e Hospital do Trabalhador — com conserto de notebook, manutenção de computador de mesa, 
    formatação com backup, remoção de vírus e upgrade de SSD e memória. O atendimento é feito em domicílio 
    ou por coleta e entrega, com horários flexíveis para famílias e profissionais que trabalham de casa.`,
  conteudoExclusivo: `No Portão, o perfil é bem familiar e comercial ao mesmo tempo: casas com um ou mais computadores usados por toda a família e pequenos comércios que dependem de um PC estável para vender e emitir nota. Por isso, os atendimentos que mais aparecem são computador lento e cheio de programas, notebook esquentando e desligando, Wi-Fi que não cobre a casa inteira e a necessidade de formatação com backup dos arquivos.

Para os notebooks do bairro, a combinação limpeza interna com troca de pasta térmica mais upgrade de SSD costuma ser a solução com melhor custo-benefício para quem sente a máquina lenta e quente. Já nos PCs de mesa, travamentos, tela azul e falhas após queda de energia normalmente apontam para fonte, memória ou temperatura — que testamos antes de indicar qualquer troca.

O comércio do Portão também procura bastante suporte pontual: PC do balcão travando, impressora que parou e rede caindo. Nesses casos, resolvemos com foco em reduzir o tempo de parada e sempre com orçamento aprovado antes de executar.`,
  problemasComuns: [
    "Computador de casa lento e cheio de programas",
    "Notebook esquentando e desligando sozinho",
    "Wi-Fi que não cobre a casa toda",
    "PC do comércio travando no balcão",
    "Vírus, pop-ups e programas indesejados",
    "Formatação com backup dos arquivos da família",
  ],
  dicasLocais: `Morador do Portão com computador lento? Antes de trocar de máquina, avalie um upgrade de SSD e memória — é o que mais melhora a velocidade pelo menor custo. Para o comércio do bairro, uma rotina simples de backup evita perder vendas e dados em caso de falha. E, ao ver qualquer mensagem exigindo pagamento urgente para "consertar" o PC, desconfie: quase sempre é golpe. Fale conosco pelo WhatsApp e avaliamos o caso com segurança.`,
  pontosReferencia: [
    "Shopping Palladium",
    "Av. República Argentina",
    "Hospital do Trabalhador",
    "Santa Quitéria",
    "Fazendinha",
    "Novo Mundo",
  ],
  tempoDeslocamento: "Deslocamento rápido - região central",
  servicosDestaque: [
    "Conserto de notebook",
    "Manutenção de computador",
    "Formatação com backup",
    "Remoção de vírus e malware",
    "Upgrade de SSD e memória",
    "Configuração de Wi-Fi",
  ],
};

const Portao = () => <BairroTemplate data={data} />;

export default Portao;
