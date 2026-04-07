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
  "priceRange": "R$ 99 - R$ 500",
  "currenciesAccepted": "BRL",
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
    {
      "@type": "City",
      "name": "Curitiba",
      "sameAs": "https://pt.wikipedia.org/wiki/Curitiba"
    },
    {
      "@type": "City",
      "name": "São José dos Pinhais",
      "sameAs": "https://pt.wikipedia.org/wiki/S%C3%A3o_Jos%C3%A9_dos_Pinhais"
    },
    {
      "@type": "City",
      "name": "Araucária",
      "sameAs": "https://pt.wikipedia.org/wiki/Arauc%C3%A1ria"
    },
    {
      "@type": "City",
      "name": "Campo Largo",
      "sameAs": "https://pt.wikipedia.org/wiki/Campo_Largo_(Paran%C3%A1)"
    },
    {
      "@type": "City",
      "name": "Pinhais",
      "sameAs": "https://pt.wikipedia.org/wiki/Pinhais"
    }
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
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "347",
    "bestRating": "5",
    "worstRating": "1"
  },
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

export const JsonLdSchema = () => {
  useEffect(() => {
    // Remove existing schemas
    const existingScripts = document.querySelectorAll('script[data-schema="true"]');
    existingScripts.forEach(script => script.remove());

    // Add LocalBusiness schema
    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.setAttribute('data-schema', 'true');
    businessScript.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(businessScript);

    // Add FAQ schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.setAttribute('data-schema', 'true');
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // Add WebSite schema
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.setAttribute('data-schema', 'true');
    websiteScript.text = JSON.stringify(websiteSchema);
    document.head.appendChild(websiteScript);
    
    return () => {
      const scripts = document.querySelectorAll('script[data-schema="true"]');
      scripts.forEach(script => script.remove());
    };
  }, []);
  
  return null;
};
