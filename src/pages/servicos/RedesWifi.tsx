import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";

const data: ServicoLandingData = {
  path: "redes-wifi",
  trackingKey: "redes-wifi",
  metaTitle: "Configuração de Redes e Wi-Fi em Curitiba a partir de R$ 99,99 | Técnico em Curitiba",
  metaDescription:
    "Instalação e configuração de Wi-Fi, roteadores, repetidores e sistemas mesh em Curitiba a partir de R$ 99,99. Resolvemos internet lenta e sinal fraco via WhatsApp.",
  serviceName: "Configuração de Redes e Wi-Fi",
  serviceDescription:
    "Instalação e configuração de Wi-Fi, roteadores, repetidores e sistemas mesh, com otimização de canais e cobertura, para casas e empresas em Curitiba e região.",
  eyebrow: "Redes e Wi-Fi em Curitiba",
  h1: "Configuração de redes e Wi-Fi em Curitiba",
  h1Accent: "sinal estável em toda a casa",
  intro:
    "Internet lenta, sinal que cai ou cantos da casa sem Wi-Fi? Configuramos roteadores, repetidores e sistemas mesh, otimizando canais e cobertura para você aproveitar toda a velocidade contratada.",
  whatsappMessage: "Olá! Preciso melhorar a rede/Wi-Fi do meu ambiente. Pode me ajudar?",
  incluso: [
    { title: "Diagnóstico do ambiente", desc: "Avaliamos cobertura, interferências e pontos sem sinal." },
    { title: "Configuração do roteador", desc: "Ajuste de canais, banda 2.4/5 GHz, senha e segurança." },
    { title: "Repetidores e mesh", desc: "Instalação de repetidores ou sistema mesh para cobrir a casa toda." },
    { title: "Rede cabeada", desc: "Organização e configuração de pontos de rede quando necessário." },
    { title: "Otimização de desempenho", desc: "Priorização de dispositivos e redução de quedas de conexão." },
    { title: "Rede de visitantes", desc: "Configuração de rede separada e segura para convidados." },
  ],
  sinais: [
    "Internet lenta mesmo pagando plano rápido",
    "Sinal de Wi-Fi fraco em alguns cômodos",
    "Conexão que cai com frequência",
    "Muitos dispositivos deixando a rede instável",
    "Roteador novo que você não sabe configurar",
    "Necessidade de rede segura para trabalho ou empresa",
  ],
  processo: [
    { step: "1", title: "Diagnóstico", desc: "Você descreve o ambiente pelo WhatsApp e avaliamos a necessidade." },
    { step: "2", title: "Plano", desc: "Indicamos a solução ideal: ajuste, repetidor ou mesh." },
    { step: "3", title: "Instalação", desc: "Configuramos e posicionamos os equipamentos corretamente." },
    { step: "4", title: "Testes", desc: "Medimos a cobertura e a estabilidade em cada ambiente." },
  ],
  faqs: [
    { question: "Quanto custa configurar a rede Wi-Fi em Curitiba?", answer: "O serviço começa em R$ 99,99. O valor final depende do tamanho do ambiente e da quantidade de equipamentos." },
    { question: "Meu Wi-Fi não pega na casa toda. Resolve?", answer: "Sim. Avaliamos o ambiente e indicamos repetidores ou um sistema mesh para levar sinal estável a todos os cômodos." },
    { question: "Vocês configuram roteador de qualquer marca?", answer: "Sim, trabalhamos com as principais marcas de roteadores, repetidores e sistemas mesh do mercado." },
    { question: "Fazem rede para empresas e escritórios?", answer: "Sim. Configuramos redes para escritórios, comércios e pequenas empresas, incluindo rede separada para visitantes." },
    { question: "Atendem em domicílio?", answer: "Sim, atendemos em domicílio em Curitiba e região metropolitana." },
  ],
  relacionados: [
    { label: "Suporte para empresas", to: "/suporte-empresas" },
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
    { label: "Remoção de vírus", to: "/servicos/remocao-virus" },
  ],
  dateModified: "2026-07-09",
};

const RedesWifi = () => <ServicoLandingLayout data={data} />;

export default RedesWifi;
