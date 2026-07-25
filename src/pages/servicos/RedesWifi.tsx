import { ServicoLandingLayout, type ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { ServiceGallery } from "@/components/gallery/ServiceGallery";
import { IMAGES } from "@/lib/images";

const wifiGalleryImages = [
  {
    src: IMAGES.redesWifi,
    alt: "Site survey de Wi-Fi com identificação de zonas sem sinal em residência",
    caption: "Mapeamento de cobertura e identificação de zonas sem sinal",
  },
  {
    src: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=600&q=70",
    alt: "Roteador Wi-Fi 6 e nós de sistema mesh instalados sobre bancada técnica",
    caption: "Roteador principal e nós mesh — cobertura estável em toda a casa",
  },
  {
    src: "https://images.unsplash.com/photo-1591808216268-ce0b82787efe?auto=format&fit=crop&w=600&q=70",
    alt: "Cabeamento de rede organizado com conectores RJ45 crimpados",
    caption: "Cabeamento estruturado e organizado quando necessário",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=70",
    alt: "Painel administrativo do roteador com configuração de canais e segurança WPA",
    caption: "Configuração de canais 2,4/5 GHz, WPA e priorização de dispositivos",
  },
  {
    src: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=70",
    alt: "Aplicativo de análise de espectro Wi-Fi rodando em smartphone",
    caption: "Análise de espectro e escolha do canal com menos interferência",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=70",
    alt: "Rack de rede empresarial com switch, roteador e organização de cabos",
    caption: "Rede segmentada para trabalho, IoT e visitantes",
  },
];

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
    // ── FAQ de triagem (o que fazer antes da visita, sinais de falha, orçamento)
    {
      question: "O que fazer antes da visita para Wi-Fi lento ou caindo?",
      answer:
        "Antes do técnico chegar: 1) desligue o roteador da tomada por 60 segundos e religue; 2) teste a velocidade contratada com o cabo direto no modem em fast.com ou speedtest.net; 3) anote se a queda ocorre em cômodos específicos ou em dispositivos específicos; 4) verifique se o firmware do roteador está atualizado. Essas informações aceleram o diagnóstico e evitam trocas desnecessárias de equipamento.",
    },
    {
      question: "Quais sinais indicam que o problema é no roteador e não na operadora?",
      answer:
        "Se a velocidade no cabo é alta mas cai muito no Wi-Fi, é rede local. Se o LED de internet do modem pisca em vermelho/laranja, o problema é da operadora. Roteador reiniciando sozinho, esquentando muito ou com mais de 4 anos frequentemente exige troca. Sinal excelente perto do roteador mas zero em 2 cômodos indica necessidade de mesh ou repetidor.",
    },
    {
      question: "Como definem o orçamento de rede/Wi-Fi?",
      answer:
        "A visita técnica tem valor mínimo de R$ 99,99, informado antes do envio do técnico. Serviços simples (configurar roteador novo, alterar senha, ajustar canais) resolvem dentro desse mínimo. Instalação de mesh, cabeamento estruturado ou rede empresarial recebem orçamento específico após avaliação do ambiente. Nada é executado sem sua aprovação por escrito no WhatsApp.",
    },
    {
      question: "Vale a pena trocar o roteador da operadora por um próprio?",
      answer:
        "Na maioria dos casos, sim. Roteadores fornecidos por operadoras costumam ter antenas fracas e firmware limitado. Um roteador Wi-Fi 6 de mercado ou um mesh dual-band resolve quedas, aumenta a cobertura e suporta mais dispositivos simultâneos. Indicamos o modelo certo para o seu ambiente antes da compra.",
    },
  ],
  relacionados: [
    { label: "Suporte para empresas", to: "/suporte-empresas" },
    { label: "Formatação de computador", to: "/servicos/formatacao-computador" },
    { label: "Remoção de vírus", to: "/servicos/remocao-virus" },
  ],
  dateModified: "2026-07-21",
  extra: (
    <ServiceGallery
      id="galeria-wifi"
      title="O que está incluso no atendimento de Wi-Fi"
      subtitle="Da análise do ambiente até a configuração final: veja o que o técnico entrega em cada visita."
      images={wifiGalleryImages}
    />
  ),
};

const RedesWifi = () => <ServicoLandingLayout data={data} />;

export default RedesWifi;
