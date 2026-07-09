import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

const data: ServicoLandingData = {
  path: "formatacao-computador",
  trackingKey: "formatacao-computador",
  metaTitle: "Formatação de Computador em Curitiba a partir de R$ 99,99 | Técnico em Curitiba",
  metaDescription:
    "Formatação de PC e notebook em Curitiba a partir de R$ 99,99. Windows 10/11 original, drivers, programas essenciais e backup dos seus arquivos. Atendimento via WhatsApp.",
  serviceName: "Formatação de Computador e Notebook",
  serviceDescription:
    "Formatação completa com Windows 10/11 original, instalação de drivers, programas essenciais e backup dos seus arquivos, com atendimento em Curitiba e região.",
  eyebrow: "Formatação em Curitiba",
  h1: "Formatação de computador e notebook em Curitiba",
  h1Accent: "sem perder seus arquivos",
  intro:
    "Seu computador travando, cheio de erro ou lento demais? Formatamos com Windows 10/11 original, drivers atualizados, programas essenciais e backup dos seus dados antes de qualquer procedimento.",
  whatsappMessage: "Olá! Preciso de formatação de computador. Pode me ajudar?",
  precoNota: undefined,
  incluso: [
    { title: "Backup dos seus dados", desc: "Salvamos documentos, fotos e arquivos importantes antes de formatar." },
    { title: "Windows original", desc: "Instalação limpa do Windows 10 ou 11 ativado e atualizado." },
    { title: "Drivers completos", desc: "Todos os drivers de hardware instalados e funcionando." },
    { title: "Programas essenciais", desc: "Navegador, pacote de produtividade, leitor de PDF e compactador." },
    { title: "Otimização do sistema", desc: "Ajustes de inicialização e desempenho para o dia a dia." },
    { title: "Restauração dos arquivos", desc: "Seus dados de volta, organizados no lugar certo." },
  ],
  sinais: [
    "Computador extremamente lento mesmo após limpeza",
    "Vírus ou pop-ups que voltam sempre",
    "Telas azuis, travamentos e erros constantes do Windows",
    "Sistema corrompido que não inicia direito",
    "Acúmulo de programas e lixo digital",
    "Preparar a máquina para venda ou repasse",
    "Migração de HD para SSD",
  ],
  processo: [
    { step: "1", title: "Diagnóstico", desc: "Você descreve o problema pelo WhatsApp e recebe orientação." },
    { step: "2", title: "Backup", desc: "Salvamos seus arquivos importantes antes de formatar." },
    { step: "3", title: "Formatação", desc: "Instalamos o Windows, drivers e programas essenciais." },
    { step: "4", title: "Entrega", desc: "Máquina pronta, otimizada e com seus dados de volta." },
  ],
  faqs: [
    { question: "Quanto custa formatar um computador em Curitiba?", answer: "A formatação começa em R$ 99,99 e inclui Windows 10/11 original, drivers e programas essenciais. O valor final pode variar conforme o equipamento e a complexidade." },
    { question: "A formatação apaga meus arquivos?", answer: "Formatar reinstala o sistema do zero. Por isso fazemos backup prévio dos seus dados antes do procedimento e restauramos depois." },
    { question: "Em quanto tempo fica pronto?", answer: "Em média de 2 a 4 horas, dependendo do hardware e do volume de dados a copiar." },
    { question: "Vocês instalam Office, antivírus e drivers?", answer: "Sim. Entregamos com Windows ativado, drivers atualizados, navegador, antivírus e pacote de produtividade configurados." },
    { question: "Atendem em domicílio ou por coleta?", answer: "Atendemos em Curitiba e região, com opção de atendimento em domicílio ou coleta e entrega do equipamento." },
  ],
  relacionados: [
    { label: "Remoção de vírus", to: "/servicos/remocao-virus" },
    { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-memoria" },
    { label: "Backup e recuperação", to: "/servicos/backup-recuperacao" },
  ],
  dateModified: "2026-07-09",
};

const FormatacaoComputador = () => <ServicoLandingLayout data={data} />;

export default FormatacaoComputador;
