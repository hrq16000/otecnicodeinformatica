import { BairroTemplate } from "./BairroTemplate";

const data = {
  nome: "Água Verde",
  slug: "agua-verde",
  cidade: "Curitiba",
  indexavel: true,
  metaTitle: "Técnico de Informática no Água Verde (Curitiba) | Notebook e PC",
  metaDescription:
    "Técnico de informática no Água Verde, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99. Via WhatsApp.",
  h1: "Técnico de Informática no Água Verde – Curitiba",
  subtitulo: "Conserto de notebook, manutenção de computador e formatação com backup no Água Verde e região",
  descricaoLonga: `O Água Verde é um dos bairros mais movimentados de Curitiba, com forte presença de 
    escritórios, profissionais liberais e famílias que dependem do computador para trabalho remoto, 
    estudo e o dia a dia. Nosso técnico de informática atende todo o Água Verde a domicílio ou por 
    coleta e entrega, com diagnóstico no local e orçamento transparente: conserto de notebook, 
    manutenção de computador de mesa, formatação com backup, remoção de vírus e upgrade de SSD e 
    memória. Cobrimos das proximidades da Praça do Japão à divisa com o Batel, sempre com o mesmo 
    cuidado para residências e pequenos escritórios.`,
  conteudoExclusivo: `No Água Verde, o perfil que mais aparece é o do profissional que trabalha de casa e não pode ficar com o notebook parado. Por isso, boa parte dos atendimentos envolve notebook lento, aquecimento com desligamento, tela ou teclado com defeito e necessidade de upgrade de SSD para dar sobrevida à máquina. Nesses casos, o diagnóstico honesto faz diferença real: muitas vezes uma limpeza interna com troca de pasta térmica somada a um SSD resolve o que parecia exigir a compra de um equipamento novo.

Para os PCs de mesa do bairro — comuns em escritórios de contabilidade, advocacia e consultórios da região —, os problemas recorrentes são travamentos, tela azul, lentidão ao abrir vários programas e falhas após queda de energia. Testamos fonte, memória, armazenamento e temperatura antes de indicar qualquer troca de peça, evitando gasto desnecessário.

Também é forte no Água Verde a demanda por formatação com backup e remoção de vírus, principalmente em máquinas usadas por vários membros da família. Fazemos o backup dos arquivos antes de reinstalar o Windows e entregamos a máquina com drivers, navegador, antivírus e programas essenciais já configurados.`,
  problemasComuns: [
    "Notebook de home office lento e esquentando",
    "PC de escritório travando ao abrir vários programas",
    "Tela azul e reinícios após queda de energia",
    "Vírus e pop-ups atrapalhando o trabalho",
    "Necessidade de upgrade de SSD para dar velocidade",
    "Formatação com backup dos arquivos da família",
  ],
  dicasLocais: `Se você trabalha de casa no Água Verde e sente o notebook lento, antes de trocar de máquina vale avaliar upgrade de SSD e memória — costuma ser a melhor relação custo-benefício. Para escritórios do bairro, manter uma rotina de backup testada evita prejuízo em caso de falha do disco. E, ao receber qualquer aviso pedindo pagamento urgente para "liberar" o computador, desconfie: normalmente é golpe. Fale conosco pelo WhatsApp e avaliamos o caso com segurança.`,
  pontosReferencia: [
    "Praça do Japão",
    "Rua Presidente Taunay",
    "Shopping Curitiba",
    "Av. República Argentina",
    "Batel (divisa)",
    "Parque Barigui (acesso)",
  ],
  tempoDeslocamento: "Atendimento em 30-60 min",
  servicosDestaque: [
    "Conserto de notebook",
    "Manutenção de computador",
    "Formatação com backup",
    "Remoção de vírus e malware",
    "Upgrade de SSD e memória",
    "Configuração de rede Wi-Fi",
  ],
};

const AguaVerde = () => <BairroTemplate data={data} />;

export default AguaVerde;
