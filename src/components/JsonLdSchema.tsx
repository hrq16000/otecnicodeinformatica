import { useEffect } from 'react';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://tecnicocuritiba.com.br",
  "name": "Técnico Curitiba - Suporte em Informática",
  "alternateName": "Técnico de Informática Curitiba",
  "description": "Serviços de informática em Curitiba: formatação, remoção de vírus, conserto de computadores e notebooks, suporte técnico presencial e remoto.",
  "url": "https://tecnicocuritiba.com.br",
  "telephone": "+55-41-99999-9999",
  "email": "contato@tecnicocuritiba.com.br",
  "image": "https://tecnicocuritiba.com.br/og-image.jpg",
  "logo": "https://tecnicocuritiba.com.br/logo.png",
  "priceRange": "$$",
  "currenciesAccepted": "BRL",
  "paymentAccepted": "Dinheiro, Cartão de Crédito, Cartão de Débito, PIX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Curitiba",
    "addressRegion": "PR",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-25.4284",
    "longitude": "-49.2733"
  },
  "areaServed": {
    "@type": "City",
    "name": "Curitiba",
    "sameAs": "https://pt.wikipedia.org/wiki/Curitiba"
  },
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
          "description": "Formatação completa com instalação de Windows e programas essenciais"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Remoção de Vírus",
          "description": "Remoção completa de vírus, malwares e programas maliciosos"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Conserto de Notebook",
          "description": "Reparo de notebooks de todas as marcas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Atendimento Remoto",
          "description": "Suporte técnico remoto via acesso ao computador"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Suporte para Empresas",
          "description": "Suporte técnico contínuo com SLA personalizado"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://wa.me/5541999999999"
  ]
};

export const JsonLdSchema = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessSchema);
    script.id = 'local-business-schema';
    
    // Remove existing schema if present
    const existing = document.getElementById('local-business-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const schemaScript = document.getElementById('local-business-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);
  
  return null;
};
