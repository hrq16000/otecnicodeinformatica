/**
 * Espelho TS de scripts/lib/category-local.mjs (bloco de cobertura geográfica,
 * capa fotográfica real e schema local). Mantém o React 1:1 com o HTML
 * estático gerado no build — validado pelos gates de paridade.
 */
import type { CategoryData } from "@/pages/hubs/categories";
import type { LocalData } from "@/pages/hubs/locais";
import { LOCAIS } from "@/pages/hubs/locais";
import { cityLabel, faixaDe, PRECO_DIAGNOSTICO } from "@/lib/categoryLocalContent";
import { creditFor, imageObjectSchema } from "@/lib/imageCredits";
import { BANCADA } from "@/lib/categoryLocalContent";
import { WHATSAPP_PHONE_E164 as WA_PHONE_E164, SITE_BASE_URL } from "@/lib/siteConfig";

export const GEO: Record<string, [number, number]> = {
  curitiba: [-25.4284, -49.2733],
  "sao-jose-dos-pinhais": [-25.5306, -49.2064],
  araucaria: [-25.5936, -49.4103],
  pinhais: [-25.4447, -49.1925],
  colombo: [-25.2917, -49.2242],
  "campo-largo": [-25.459, -49.5279],
  "almirante-tamandare": [-25.3195, -49.3039],
  "fazenda-rio-grande": [-25.6626, -49.3075],
  piraquara: [-25.4419, -49.0629],
  "quatro-barras": [-25.3654, -49.0771],
  "campo-magro": [-25.369, -49.4497],
  batel: [-25.4406, -49.29],
  centro: [-25.4297, -49.2719],
  cic: [-25.493, -49.348],
  portao: [-25.463, -49.296],
  "santa-felicidade": [-25.4045, -49.33],
  boqueirao: [-25.506, -49.24],
  cajuru: [-25.447, -49.211],
  "agua-verde": [-25.452, -49.279],
};

export const geoDe = (l: LocalData): [number, number] => GEO[l.slug] ?? GEO.curitiba;

export const COVERS: Record<string, { url: string; alt: string }> = {
  tv: {
    url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=70",
    alt: "Smart TV em bancada de assistência técnica",
  },
  som: {
    url: "https://images.unsplash.com/photo-1601944177325-f8867652837f?auto=format&fit=crop&w=1200&q=70",
    alt: "Amplificador de áudio aberto para reparo de componentes",
  },
  videogame: {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70",
    alt: "Placa eletrônica de console em diagnóstico técnico",
  },
  celular: {
    url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=70",
    alt: "Bancada com microscópio para microsoldagem de celular",
  },
};

export const coverDe = (cat: CategoryData) => COVERS[cat.id] ?? COVERS.tv;
export const coverCredit = (cat: CategoryData) => creditFor(coverDe(cat).url);

export const coverCaption = (cat: CategoryData, local: LocalData) =>
  `${cat.titlePrefix} em ${cityLabel(local)} — avaliação de ${BANCADA[cat.id]} em bancada.`;

export function coberturaLista() {
  return {
    cidades: LOCAIS.filter((l) => l.kind === "cidade"),
    bairros: LOCAIS.filter((l) => l.kind === "bairro"),
  };
}

export function serviceAreaSchema(local: LocalData) {
  const [lat, lng] = geoDe(local);
  const faixa = faixaDe(local);
  const raioKm = faixa.raio.includes("30") ? 30000 : faixa.raio.includes("15") ? 15000 : 8000;
  return {
    "@type": "GeoCircle",
    name: `Área de coleta — ${faixa.nome} (${faixa.raio})`,
    geoMidpoint: { "@type": "GeoCoordinates", latitude: String(lat), longitude: String(lng) },
    geoRadius: String(raioKm),
  };
}

export function localBusinessNode(cat: CategoryData, local: LocalData, site = SITE_BASE_URL) {
  const url = `${site}/${cat.slug}/${local.slug}`;
  const [lat, lng] = geoDe(local);
  const { cidades, bairros } = coberturaLista();
  return {
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    parentOrganization: { "@id": `${site}/#organization` },
    name: "O Técnico de Informática",
    description: `Assistência técnica com coleta e entrega em ${cityLabel(local)} e Região Metropolitana de Curitiba.`,
    url,
    image: coverDe(cat).url,
    logo: `${site}/logo.png`,
    telephone: WA_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: String(lat), longitude: String(lng) },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    areaServed: [
      ...cidades.map((c) => ({ "@type": "City", name: c.nome })),
      ...bairros.map((b) => ({ "@type": "Place", name: `${b.nome}, ${b.cidadeMae}` })),
    ],
    serviceArea: serviceAreaSchema(local),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
    priceRange: `R$ ${PRECO_DIAGNOSTICO.toFixed(2).replace(".", ",")}+`,
    currenciesAccepted: "BRL",
    paymentAccepted: "PIX, Cartão de Crédito, Cartão de Débito, Dinheiro, Transferência Bancária",
  };
}

export function coverImageNode(cat: CategoryData, local: LocalData, site = SITE_BASE_URL) {
  return imageObjectSchema({
    url: coverDe(cat).url,
    caption: coverCaption(cat, local),
    pageUrl: `${site}/${cat.slug}/${local.slug}`,
  });
}
