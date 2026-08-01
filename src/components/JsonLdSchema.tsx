import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from '@/lib/jsonLdSlots';
import { buildLocalBusinessSchema } from '@/lib/localBusinessJsonLd';

const SITE = "https://tecnico.curitiba.br";
const BUILD_DATE = new Date().toISOString();

// NAP, área atendida e horários vêm da fonte única (localBusinessJsonLd.ts)
const localBusinessSchema = {
  ...buildLocalBusinessSchema({
    path: "/",
    description:
      "Técnico de informática em Curitiba e região metropolitana. Formatação, conserto de computadores e notebooks, remoção de vírus, upgrade SSD, redes. Diagnóstico honesto antes do orçamento.",
  }),
  slogan: "Assistência Técnica em Informática em Curitiba",
  knowsAbout: [
    "Manutenção de computadores", "Conserto de notebooks", "Formatação Windows",
    "Remoção de vírus", "Upgrade de hardware", "Configuração de redes",
    "Suporte técnico em informática", "Instalação de câmeras CFTV",
    "Conserto de impressoras", "Assistência de eletrodomésticos inteligentes"
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=T%C3%A9cnico+em+Curitiba",
};


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Quanto custa o serviço de técnico de informática em Curitiba?",
      "acceptedAnswer": { "@type": "Answer", "text": "A visita técnica começa em R$ 69,99. Orçamento no local e você só paga se aprovar. Aceitamos PIX, cartão e dinheiro." } },
    { "@type": "Question", "name": "O técnico vai até minha casa ou empresa?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. Atendimento domiciliar em toda Curitiba e região metropolitana (São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo). O técnico vai com todas as ferramentas." } },
    { "@type": "Question", "name": "Quanto tempo demora para o técnico chegar?",
      "acceptedAnswer": { "@type": "Answer", "text": "Na maioria dos casos atendemos no mesmo dia, com deslocamento médio de 30 a 60 minutos. Para urgências há atendimento prioritário." } },
    { "@type": "Question", "name": "Vocês consertam notebook de qualquer marca?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. Dell, HP, Lenovo, Acer, Asus, Samsung, LG, Positivo e outras. Limpeza, formatação, troca de tela, teclado, bateria e placa-mãe." } },
    { "@type": "Question", "name": "Os serviços têm garantia?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. Formatação tem 30 dias de garantia; hardware de 90 dias a 1 ano dependendo do componente." } }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  "name": "Técnico Curitiba",
  "url": SITE,
  "inLanguage": "pt-BR",
  "publisher": { "@id": `${SITE}/#organization` },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE}/servicos?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  "name": "Técnico Curitiba",
  "alternateName": "Técnico de Informática Curitiba",
  "url": SITE,
  "logo": `${SITE}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Portuguese",
    "areaServed": "BR-PR"
  },
  "sameAs": ["https://wa.me/5541997086380"]
};

// WebPage com Speakable — extração prioritária para Bing Copilot / AI Overviews
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/#webpage-home`,
  "url": SITE,
  "name": "Técnico de Informática em Curitiba — Atendimento no Mesmo Dia",
  "isPartOf": { "@id": `${SITE}/#website` },
  "about": { "@id": `${SITE}/#organization` },
  "inLanguage": "pt-BR",
  "dateModified": BUILD_DATE,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".tldr", "[data-speakable]"]
  }
};

// ItemList — sinaliza serviços de forma consumível por LLMs/Copilot
const serviceItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE}/#services-list`,
  "name": "Serviços de informática em Curitiba",
  "itemListOrder": "https://schema.org/ItemListUnordered",
  "numberOfItems": 8,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Formatação de Computador", "url": `${SITE}/servicos/formatacao-computador` },
    { "@type": "ListItem", "position": 2, "name": "Conserto de Notebook", "url": `${SITE}/servicos/conserto-notebook-curitiba` },
    { "@type": "ListItem", "position": 3, "name": "Remoção de Vírus", "url": `${SITE}/servicos/remocao-virus` },
    { "@type": "ListItem", "position": 4, "name": "Upgrade SSD e Memória", "url": `${SITE}/servicos/upgrade-ssd-memoria` },
    { "@type": "ListItem", "position": 5, "name": "Redes Wi-Fi", "url": `${SITE}/servicos/redes-wifi` },
    { "@type": "ListItem", "position": 6, "name": "Backup e Recuperação", "url": `${SITE}/servicos/backup-recuperacao` },
    { "@type": "ListItem", "position": 7, "name": "Conserto de Impressora", "url": `${SITE}/conserto-impressora-curitiba` },
    { "@type": "ListItem", "position": 8, "name": "Eletrodomésticos Inteligentes", "url": `${SITE}/assistencia-eletrodomesticos-inteligentes-curitiba` }
  ]
};

const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "SiteNavigationElement", "position": 1, "name": "Serviços", "url": `${SITE}/servicos` },
    { "@type": "SiteNavigationElement", "position": 2, "name": "Como Funciona", "url": `${SITE}/como-funciona` },
    { "@type": "SiteNavigationElement", "position": 3, "name": "Valores", "url": `${SITE}/valores` },
    { "@type": "SiteNavigationElement", "position": 4, "name": "Contato", "url": `${SITE}/contato` },
    { "@type": "SiteNavigationElement", "position": 5, "name": "Blog", "url": `${SITE}/blog` },
    { "@type": "SiteNavigationElement", "position": 6, "name": "FAQ", "url": `${SITE}/faq` }
  ]
};

export const JsonLdSchema = () => {
  // Entidades institucionais globais — um slot cada, cedidos a schemas de rota.
  useJsonLdSlot(SCHEMA_SLOTS.localBusiness, localBusinessSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.faq, faqSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.website, websiteSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.organization, organizationSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.itemListServices, serviceItemListSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.siteNavigation, navigationSchema, SLOT_PRIORITY.global);
  // WebPage é ancorado na home (#webpage-home): só vale na própria home.
  const isHome =
    typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '';
  useJsonLdSlot(SCHEMA_SLOTS.webPage, isHome ? webPageSchema : null, SLOT_PRIORITY.global);

  return null;
};
