import { useEffect } from 'react';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://tecnicocuritiba.com.br/#organization",
  "name": "Técnico Curitiba - Suporte em Informática",
  "alternateName": ["Técnico de Informática Curitiba", "Assistência Técnica Curitiba"],
  "description": "Técnico de informática em Curitiba e região metropolitana. Serviços de formatação, conserto de computadores e notebooks, remoção de vírus, upgrade SSD, configuração de redes. Atendimento a domicílio no mesmo dia.",
  "url": "https://tecnicocuritiba.com.br",
  "telephone": "+55-41-99745-2053",
  "email": "contato@tecnicocuritiba.com.br",
  "image": "https://tecnicocuritiba.com.br/og-image.jpg",
  "logo": "https://tecnicocuritiba.com.br/logo.png",
  "priceRange": "R$ 69,99 - R$ 500",
  "currenciesAccepted": "BRL",
  "foundingDate": "1999",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 10 },
  "slogan": "Assistência Técnica Nº1 de Curitiba e Região",
  "paymentAccepted": "Dinheiro, Cartão de Crédito, Cartão de Débito, PIX, Transferência Bancária",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Curitiba",
    "addressRegion": "PR",
    "postalCode": "80000-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-25.4284",
    "longitude": "-49.2733"
  },
  "areaServed": [
    { "@type": "City", "name": "Curitiba", "sameAs": "https://pt.wikipedia.org/wiki/Curitiba" },
    { "@type": "City", "name": "São José dos Pinhais", "sameAs": "https://pt.wikipedia.org/wiki/S%C3%A3o_Jos%C3%A9_dos_Pinhais" },
    { "@type": "City", "name": "Araucária", "sameAs": "https://pt.wikipedia.org/wiki/Arauc%C3%A1ria" },
    { "@type": "City", "name": "Campo Largo", "sameAs": "https://pt.wikipedia.org/wiki/Campo_Largo_(Paran%C3%A1)" },
    { "@type": "City", "name": "Pinhais", "sameAs": "https://pt.wikipedia.org/wiki/Pinhais" },
    { "@type": "City", "name": "Colombo", "sameAs": "https://pt.wikipedia.org/wiki/Colombo_(Paran%C3%A1)" },
    { "@type": "City", "name": "Almirante Tamandaré", "sameAs": "https://pt.wikipedia.org/wiki/Almirante_Tamandar%C3%A9" },
    { "@type": "City", "name": "Fazenda Rio Grande", "sameAs": "https://pt.wikipedia.org/wiki/Fazenda_Rio_Grande" },
    { "@type": "City", "name": "Piraquara", "sameAs": "https://pt.wikipedia.org/wiki/Piraquara" },
    { "@type": "City", "name": "Quatro Barras", "sameAs": "https://pt.wikipedia.org/wiki/Quatro_Barras" },
    { "@type": "City", "name": "Campo Magro", "sameAs": "https://pt.wikipedia.org/wiki/Campo_Magro" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de Informática",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Formatação de Computador",
          "description": "Formatação completa com instalação de Windows 10/11 e programas essenciais. Inclui backup de dados."
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "99.99",
          "priceCurrency": "BRL",
          "minPrice": "99.99"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Remoção de Vírus",
          "description": "Remoção completa de vírus, malwares, ransomware e programas maliciosos. Instalação de antivírus."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Conserto de Notebook",
          "description": "Reparo de notebooks de todas as marcas: Dell, HP, Lenovo, Acer, Asus, Samsung."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Upgrade SSD e Memória",
          "description": "Troca de HD por SSD e aumento de memória RAM para deixar seu computador mais rápido."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Configuração de Redes Wi-Fi",
          "description": "Instalação e configuração de roteadores, repetidores e redes empresariais."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Atendimento Remoto",
          "description": "Suporte técnico remoto via acesso ao computador. Resolução rápida sem sair de casa."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Suporte para Empresas",
          "description": "Suporte técnico contínuo com SLA personalizado para pequenas e médias empresas."
        }
      }
    ]
  },
  "sameAs": [
    "https://wa.me/5541997452053"
  ],
  // aggregateRating removido do LocalBusiness sitewide: será reinjetado
  // dinamicamente a partir da tabela `reviews` (Supabase) quando houver
  // ao menos 5 avaliações verificadas com texto + autor + data. Dados
  // fake violam https://developers.google.com/search/docs/appearance/structured-data/review-snippet
  "knowsAbout": [
    "Manutenção de computadores",
    "Conserto de notebooks",
    "Formatação Windows",
    "Remoção de vírus",
    "Upgrade de hardware",
    "Configuração de redes",
    "Suporte técnico em informática",
    "Instalação de câmeras CFTV",
    "Montagem de computadores",
    "Backup e recuperação de dados"
  ],
  "hasMap": "https://www.google.com/maps?cid=tecnicocuritiba",
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "Visita Técnica",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "69.99",
        "priceCurrency": "BRL",
        "minPrice": "69.99"
      }
    }
  ]
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa o serviço de técnico de informática em Curitiba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O valor da visita técnica começa em R$ 69,99. O orçamento é feito no local e você só paga se aprovar o serviço. Aceitamos PIX, cartão e dinheiro."
      }
    },
    {
      "@type": "Question",
      "name": "O técnico vai até minha casa ou empresa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! Oferecemos atendimento a domicílio em toda Curitiba e região metropolitana, incluindo São José dos Pinhais, Araucária, Campo Largo e Pinhais. O técnico vai até você com todas as ferramentas necessárias."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo demora para o técnico chegar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Na maioria dos casos, conseguimos atender no mesmo dia. O tempo médio de deslocamento varia de 30 a 60 minutos dependendo da localização. Para urgências, temos atendimento prioritário."
      }
    },
    {
      "@type": "Question",
      "name": "Vocês consertam notebook de qualquer marca?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! Trabalhamos com todas as marcas de notebooks: Dell, HP, Lenovo, Acer, Asus, Samsung, LG, Positivo e outras. Fazemos desde limpeza e formatação até troca de tela e placa-mãe."
      }
    },
    {
      "@type": "Question",
      "name": "Os serviços têm garantia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim! Todos os nossos serviços têm garantia. A formatação tem 30 dias de garantia, e serviços de hardware como troca de peças têm de 90 dias a 1 ano dependendo do componente."
      }
    }
  ]
};

// WebSite schema for sitelinks search
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Técnico Curitiba",
  "url": "https://tecnicocuritiba.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://tecnicocuritiba.com.br/servicos?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Organization schema for knowledge panel
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://tecnicocuritiba.com.br/#organization",
  "name": "Técnico Curitiba",
  "alternateName": "Técnico de Informática Curitiba",
  "url": "https://tecnicocuritiba.com.br",
  "logo": "https://tecnicocuritiba.com.br/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-41-99745-2053",
    "contactType": "customer service",
    "availableLanguage": "Portuguese",
    "areaServed": "BR-PR"
  },
  "sameAs": ["https://wa.me/5541997452053"]
};

// SiteNavigationElement for sitelinks
const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "SiteNavigationElement", "position": 1, "name": "Serviços", "url": "https://tecnicocuritiba.com.br/servicos" },
    { "@type": "SiteNavigationElement", "position": 2, "name": "Como Funciona", "url": "https://tecnicocuritiba.com.br/como-funciona" },
    { "@type": "SiteNavigationElement", "position": 3, "name": "Valores", "url": "https://tecnicocuritiba.com.br/valores" },
    { "@type": "SiteNavigationElement", "position": 4, "name": "Contato", "url": "https://tecnicocuritiba.com.br/contato" },
    { "@type": "SiteNavigationElement", "position": 5, "name": "Blog", "url": "https://tecnicocuritiba.com.br/blog" },
    { "@type": "SiteNavigationElement", "position": 6, "name": "FAQ", "url": "https://tecnicocuritiba.com.br/faq" }
  ]
};

export const JsonLdSchema = () => {
  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-schema="true"]');
    existingScripts.forEach(script => script.remove());

    const schemas = [localBusinessSchema, faqSchema, websiteSchema, organizationSchema, navigationSchema];
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'true');
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    
    return () => {
      const scripts = document.querySelectorAll('script[data-schema="true"]');
      scripts.forEach(script => script.remove());
    };
  }, []);
  
  return null;
};
