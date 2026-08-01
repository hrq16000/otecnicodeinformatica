import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";

const trackFooterWhatsApp = (location: string) =>
  import("@/lib/analytics").then(({ trackCTAClick }) => trackCTAClick("whatsapp", location));

const linkClass = "text-sm text-white/75 transition-colors hover:text-white";

const columns: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: "Serviços",
    links: [
      { label: "Todos os serviços", to: "/servicos" },
      { label: "Formatação", to: "/servicos/formatacao" },
      { label: "Manutenção de notebook", to: "/servicos/manutencao-de-notebook" },
      { label: "Upgrade SSD/RAM", to: "/servicos/upgrade-ssd-ram" },
      { label: "Remoção de vírus", to: "/servicos/remocao-de-virus" },
      { label: "Recuperação de dados", to: "/servicos/recuperacao-de-dados" },
      { label: "Redes e Wi-Fi", to: "/servicos/redes-e-wifi" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Como funciona", to: "/como-funciona" },
      { label: "Preços e políticas", to: "/precos-e-politicas" },
      { label: "Suporte empresarial", to: "/servicos/suporte-tecnico-empresarial" },
      { label: "Atendimento a domicílio", to: "/atendimento-domicilio" },
      { label: "Atendimento remoto", to: "/atendimento-remoto" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Regiões",
    links: [
      { label: "Curitiba", to: "/tecnico-informatica-curitiba" },
      { label: "São José dos Pinhais", to: "/tecnico-informatica-sao-jose-pinhais" },
      { label: "Pinhais", to: "/tecnico-informatica-pinhais" },
      { label: "Colombo", to: "/tecnico-informatica-colombo" },
      { label: "Araucária", to: "/tecnico-informatica-araucaria" },
      { label: "Campo Largo", to: "/tecnico-informatica-campo-largo" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre", to: "/sobre" },
      { label: "Contato", to: "/contato" },
      { label: "Termos e condições", to: "/termos-e-condicoes" },
      { label: "Política de privacidade", to: "/politica-de-privacidade" },
    ],
  },
];

// JSON-LD LocalBusiness — sem aggregateRating/review inventado. Telefone só aqui e em wa.me.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
  "@id": `${siteConfig.baseUrl}/#localbusiness`,
  name: siteConfig.legalName,
  legalName: siteConfig.legalEntityName,
  alternateName: siteConfig.brandName,
  taxID: siteConfig.cnpj,
  foundingDate: siteConfig.foundedYear,
  description: siteConfig.defaultDescription,
  image: `${siteConfig.baseUrl}/logo.webp`,
  logo: `${siteConfig.baseUrl}/logo.webp`,
  url: siteConfig.baseUrl,
  telephone: siteConfig.phoneE164,
  email: siteConfig.email,
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Cash, Credit Card, Debit Card, PIX",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.primaryCity,
    addressRegion: siteConfig.region,
    addressCountry: siteConfig.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
  areaServed: siteConfig.serviceArea
    .filter((c) => c !== "Região Metropolitana de Curitiba")
    .map((c) => ({ "@type": "City", name: c, containedInPlace: { "@type": "State", name: "Paraná" } })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneE164,
      contactType: "customer support",
      areaServed: "BR",
      availableLanguage: ["Portuguese", "pt-BR"],
      url: whatsappLink(),
    },
  ],
  sameAs: siteConfig.sameAs,
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--hero-bg))] text-white">
      <div className="container mx-auto py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="space-y-4">
            <div className="inline-flex w-fit rounded-md bg-white/95 px-2 py-1">
              <img alt="Técnico em Curitiba" className="h-10 w-auto" src="/logo.webp" width="200" height="47" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Assistência técnica em informática em {siteConfig.primaryCity} e Região Metropolitana:
              notebook, PC, formatação, redes e suporte empresarial. Diagnóstico honesto.
            </p>
            <a
              href={whatsappLink("Olá! Encontrei vocês no site e gostaria de saber mais sobre os serviços.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackFooterWhatsApp("footer_primary")}
              data-cta-location="footer_primary"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Iniciar atendimento
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-3 text-sm font-bold text-white">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <a href={l.to} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {siteConfig.brandName} — {siteConfig.primaryCity}, {siteConfig.region}. Todos os direitos reservados.</p>
          <p>{siteConfig.legalEntityName} · desde {siteConfig.foundedYear} · CNPJ {siteConfig.cnpj}</p>
          <p>{siteConfig.serviceArea.filter((c) => c !== "Região Metropolitana de Curitiba").join(" · ")}</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
