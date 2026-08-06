// AUTO-CURADO — metadata estática por rota para prerender pré-hidratação.
// Fonte de verdade em runtime: componentes PageSEO/servicosCore/cidadesData (DOM hidratado).
// Este mapa espelha os títulos/descrições curados apenas para crawlers SEM JS
// (canonical/og:url por rota no HTML estático). Se um título de página mudar,
// atualize também esta lista rodando a captura em scripts/prerender-curated.
// NÃO adicionar rotas fora do manifesto curado (scripts/lib/curated-urls.mjs).
import { SERVICO_BAIRRO } from "./lib/curated-urls.mjs";
import { servicoBairroMeta } from "./lib/servico-bairro-meta.mjs";
import { priorityFaq } from "./lib/priority-faq.mjs";
import { priorityOffers } from "./lib/priority-offers.mjs";

const BASE_ROUTES = [
  {
    "path": "/",
    "title": "Técnico em Curitiba | PC, Notebook, Wi-Fi e Suporte Empresarial",
    "description": "Diagnóstico, manutenção e suporte para computadores, notebooks, redes e empresas em Curitiba. Escolha o serviço e continue pelo WhatsApp."
  },
  {
    "path": "/servicos",
    "title": "Serviços de Informática em Curitiba | PC e Notebook",
    "description": "Conheça os serviços de formatação, manutenção de computadores e notebooks, SSD, vírus, recuperação de dados, Wi-Fi e suporte empresarial."
  },
  {
    "path": "/servicos/formatacao",
    "title": "Formatação de PC e Notebook em Curitiba | Windows",
    "description": "Formatação de PC e notebook em Curitiba com backup, Windows original, drivers e programas essenciais. Diagnóstico a partir de R$ 99,99. Atendimento via WhatsApp."
  },
  {
    "path": "/servicos/manutencao-de-notebook",
    "title": "Assistência Técnica de Notebook em Curitiba | Diagnóstico",
    "description": "Assistência técnica de notebook em Curitiba: lentidão, aquecimento, tela, teclado, bateria e limpeza interna. Todas as marcas. Diagnóstico antes de informar o valor via WhatsApp."
  },
  {
    "path": "/servicos/manutencao-de-computador",
    "title": "Assistência Técnica de Computador em Curitiba | PC",
    "description": "Assistência técnica de computador em Curitiba: travamentos, fonte, memória, HD/SSD e placa-mãe. Casa e empresa. Diagnóstico honesto antes de informar o valor via WhatsApp."
  },
  {
    "path": "/servicos/upgrade-ssd-ram",
    "title": "Instalação de SSD e Upgrade de Memória em Curitiba",
    "description": "Instalação de SSD e upgrade de memória RAM em Curitiba com avaliação de compatibilidade, clonagem e backup. Ganho real de desempenho, sem promessa de milagre. Via WhatsApp."
  },
  {
    "path": "/servicos/remocao-de-virus",
    "title": "Remoção de Vírus e Malware em Curitiba | PC e Notebook",
    "description": "Remoção de vírus, malware e sequestro de navegador em Curitiba. Limpeza segura, proteção dos seus dados e reinstalação quando necessário. Atendimento via WhatsApp."
  },
  {
    "path": "/servicos/recuperacao-de-dados",
    "title": "Recuperação de Dados em Curitiba | HD, SSD e Pendrive",
    "description": "Recuperação de dados em Curitiba de HD, SSD, pendrive e cartão. Exclusão acidental, sistema que não inicia e falhas. Avaliação primeiro — recuperação não é garantida."
  },
  {
    "path": "/servicos/redes-e-wifi",
    "title": "Configuração de Redes e Wi-Fi em Curitiba | Roteadores",
    "description": "Configuração de redes e Wi-Fi em Curitiba: internet instável, roteador, repetidor, cabeamento e rede empresarial. Cobertura melhor em casa e no trabalho. Via WhatsApp."
  },
  {
    "path": "/servicos/suporte-tecnico-empresarial",
    "title": "Suporte Técnico para Empresas em Curitiba | Informática",
    "description": "Suporte técnico de informática para empresas em Curitiba, com atendimento para computadores, usuários, redes, impressoras e manutenção preventiva."
  },
  {
    "path": "/sobre",
    "title": "Sobre o Técnico em Curitiba | Informática, PC, Notebook e Suporte",
    "description": "Conheça o Técnico em Curitiba: foco em informática, notebook, PC, redes e suporte empresarial em Curitiba e região, com diagnóstico honesto e valor transparente."
  },
  {
    "path": "/como-funciona",
    "title": "Como Funciona o Atendimento Técnico em Curitiba | Passo a Passo Completo",
    "description": "Entenda como funciona o atendimento técnico de informática em Curitiba e região. Passo a passo completo: solicitação via WhatsApp, diagnóstico, execução e garantia. Técnico a domicílio no mesmo dia."
  },
  {
    "path": "/precos-e-politicas",
    "title": "Preços e Políticas | Técnico em Curitiba",
    "description": "Preços e políticas do atendimento de informática em Curitiba: mão de obra a partir de R$ 99,99, valor após avaliação e regras claras sobre peças, prazos e dados."
  },
  {
    "path": "/faq",
    "title": "FAQ Técnico Curitiba | Preço, Prazo e Garantia",
    "description": "Dúvidas sobre preço, prazo, garantia, formatação, vírus e atendimento técnico em Curitiba. Veja respostas rápidas e chame no WhatsApp."
  },
  {
    "path": "/contato",
    "title": "Contato Técnico Curitiba | WhatsApp Hoje R$ 99,99",
    "description": "Fale com técnico de informática em Curitiba pelo WhatsApp. Atendimento hoje para PC, notebook, vírus, formatação e SSD a partir de R$ 99,99."
  },
  {
    "path": "/tecnico-informatica-curitiba",
    "title": "Técnico de Informática em Curitiba | PC e Notebook",
    "description": "Atendimento técnico em Curitiba para computador, notebook, formatação, SSD, vírus, recuperação de dados, Wi-Fi e suporte para empresas."
  },
  {
    "path": "/tecnico-informatica-sao-jose-pinhais",
    "title": "Técnico em São José dos Pinhais para Notebook e PC | Técnico em Curitiba",
    "description": "Técnico de informática em São José dos Pinhais: formatação, conserto de notebook e PC, upgrade de SSD, redes e suporte a empresas. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-pinhais",
    "title": "Técnico em Pinhais para Notebook, PC e Redes | Técnico em Curitiba",
    "description": "Técnico de informática em Pinhais: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-colombo",
    "title": "Técnico em Colombo para Notebook, PC e Informática | Técnico em Curitiba",
    "description": "Técnico de informática em Colombo: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-araucaria",
    "title": "Técnico em Araucária para Notebook, PC e Empresas | Técnico em Curitiba",
    "description": "Técnico de informática em Araucária: formatação, conserto de notebook e PC, upgrade de SSD, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/tecnico-informatica-campo-largo",
    "title": "Técnico em Campo Largo para Notebook, PC e Redes | Técnico em Curitiba",
    "description": "Técnico de informática em Campo Largo: formatação, conserto de notebook e PC, upgrade de SSD, remoção de vírus, redes e suporte empresarial. Atendimento a domicílio ou coleta via WhatsApp."
  },
  {
    "path": "/empresa-de-ti-curitiba",
    "title": "Empresa de TI em Curitiba | Soluções para Pequenas Empresas",
    "description": "Soluções de informática para empresas em Curitiba: diagnóstico do ambiente, computadores, redes, manutenção e organização do suporte técnico."
  },
  {
    "path": "/bairros/cic",
    "title": "Técnico de Informática no CIC (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no CIC, Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para empresas. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/batel",
    "title": "Técnico de Informática no Batel (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no Batel, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/agua-verde",
    "title": "Técnico de Informática no Água Verde (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no Água Verde, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/centro",
    "title": "Técnico de Informática no Centro de Curitiba | Notebook e PC",
    "description": "Técnico de informática no Centro de Curitiba: conserto de notebook, manutenção de computador, formatação e suporte para escritórios. Diagnóstico a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/bairros/portao",
    "title": "Técnico de Informática no Portão (Curitiba) | Notebook e PC",
    "description": "Técnico de informática no Portão, Curitiba: conserto de notebook, manutenção de computador, formatação e upgrade de SSD. Atendimento a domicílio a partir de R$ 99,99. Via WhatsApp."
  },
  {
    "path": "/atendimento-domicilio",
    "title": "Técnico de Informática em Domicílio em Curitiba | Atendimento",
    "description": "Atendimento técnico de informática em domicílio em Curitiba para computadores, redes e situações que possam ser avaliadas no local."
  },
  {
    "path": "/atendimento-remoto",
    "title": "Suporte Remoto de Informática | Atendimento em Curitiba",
    "description": "Suporte remoto para configurações, sistemas, programas, acesso, orientações e problemas de informática que não exigem intervenção física."
  },
  {
    "path": "/coleta-e-entrega",
    "title": "Coleta e Entrega de Computador e Notebook em Curitiba",
    "description": "Coleta e entrega agendada para computadores e notebooks que precisam de diagnóstico, manutenção ou serviço técnico em bancada."
  },
  {
    "path": "/diagnostico-tecnico",
    "title": "Diagnóstico Técnico de Computador e Notebook em Curitiba",
    "description": "Diagnóstico técnico para identificar falhas em computadores e notebooks, avaliar a viabilidade do serviço e orientar o valor."
  },
  {
    "path": "/equipamentos-atendidos",
    "title": "Equipamentos Atendidos | Assistência Técnica Curitiba - Computadores, Notebooks, TVs",
    "description": "Conheça todos os equipamentos que atendemos em Curitiba: computadores, notebooks, Smart TVs, roteadores, servidores e mais. Diagnóstico profissional e reparo com garantia."
  },
  {
    "path": "/quando-nao-compensa",
    "title": "Quando NÃO Compensa Reparar | Guia Técnico - Curitiba",
    "description": "Guia completo sobre quando compensa e quando NÃO compensa reparar computadores, notebooks, TVs e outros equipamentos. Dicas de um técnico profissional em Curitiba."
  }
];

// Landings serviço × bairro: metadados espelhados de servicoBairroFactory.ts
// (H1 e FAQ reais), garantindo paridade entre HTML estático e hidratação.
const SERVICO_BAIRRO_ROUTES = SERVICO_BAIRRO.map((e) => servicoBairroMeta(e.path)).filter(Boolean);

// P0 comerciais: anexa a FAQ real já exibida na página (sem inventar conteúdo),
// para que FAQPage estático e conteúdo visível fiquem em paridade.
const BASE_ROUTES_WITH_FAQ = BASE_ROUTES.map((r) => {
  const faq = priorityFaq(r.path);
  const offers = priorityOffers(r.path);
  return { ...r, ...(faq ? { faq } : {}), ...(offers ? { offers } : {}) };
});

export const CURATED_ROUTES = [...BASE_ROUTES_WITH_FAQ, ...SERVICO_BAIRRO_ROUTES];
