/**
 * FONTE ÚNICA — conteúdo localizado das páginas serviço × cidade/bairro
 * (/conserto-{tv,som,videogame,celular}/<local>).
 *
 * Espelha src/lib/categoryLocalContent.ts (mesma copy) e é consumida pelo
 * prerender e pelos gates de CI. Toda a copy é derivada de dados reais da
 * operação (faixas logísticas, preço mínimo, prazos e sintomas por categoria).
 */

export const PRECO_MINIMO_REPARO = 300;
export const PRECO_DIAGNOSTICO = 99.99;
export const GARANTIA_DIAS = 90;

export const CATEGORIES = [
  {
    id: "tv",
    slug: "conserto-tv",
    nome: "TV",
    titlePrefix: "Conserto de TV",
    tituloCurto: "Conserto de TV",
    prazoEntrega: "15 a 60 dias úteis",
    sintomas: [
      "TV não liga",
      "sem imagem (só som)",
      "linhas e manchas na tela",
      "backlight apagando",
      "Smart TV travando",
      "não reconhece HDMI",
    ],
    bancada: "fonte, placa principal, T-CON e backlight",
  },
  {
    id: "som",
    slug: "conserto-som",
    nome: "Som / Áudio",
    titlePrefix: "Conserto de Som e Áudio",
    tituloCurto: "Conserto de Som",
    prazoEntrega: "2 a 10 dias úteis",
    sintomas: [
      "caixa Bluetooth não liga",
      "soundbar sem som",
      "home theater chiando",
      "receiver travando",
      "bateria de caixa portátil viciada",
      "Bluetooth não pareia",
    ],
    bancada: "amplificador, fonte, alto-falante e placas de áudio",
  },
  {
    id: "videogame",
    slug: "conserto-videogame",
    nome: "Videogame",
    titlePrefix: "Conserto de Videogame",
    tituloCurto: "Conserto de Videogame",
    prazoEntrega: "5 a 15 dias úteis",
    sintomas: [
      "console não liga",
      "HDMI sem imagem",
      "superaquecimento",
      "não lê disco",
      "controle com drift",
      "desliga sozinho",
    ],
    bancada: "microsoldagem de HDMI, troca de pasta térmica e reparo de placa",
  },
  {
    id: "celular",
    slug: "conserto-celular",
    nome: "Celular",
    titlePrefix: "Conserto de Celular",
    tituloCurto: "Conserto de Celular",
    prazoEntrega: "2 a 5 dias úteis",
    sintomas: [
      "tela trincada",
      "não carrega",
      "oxidação após queda d'água",
      "bateria acabando rápido",
      "sem som no alto-falante",
      "não liga (placa)",
    ],
    bancada: "display, conector de carga, bateria e microsoldagem de placa",
  },
];

/** Faixas logísticas — espelha src/lib/logisticaColeta.ts. */
export const FAIXAS = {
  f1: { nome: "Faixa 1", raio: "até 8 km", taxa: "sem custo adicional de deslocamento", janelas: "segunda a sexta, sob agendamento", prazoColetaDias: 1 },
  f2: { nome: "Faixa 2", raio: "de 8 a 15 km", taxa: "taxa reduzida informada no aceite", janelas: "terças e quintas", prazoColetaDias: 2 },
  f3: { nome: "Faixa 3", raio: "de 15 a 30 km", taxa: "taxa por distância informada no aceite", janelas: "quartas, em janela única consolidada", prazoColetaDias: 3 },
};

export const LOCAIS = [
  { slug: "curitiba", nome: "Curitiba", kind: "cidade", uf: "PR", faixa: "f1", referencia: "Centro, Batel e Água Verde" },
  { slug: "sao-jose-dos-pinhais", nome: "São José dos Pinhais", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Afonso Pena e Costeira" },
  { slug: "araucaria", nome: "Araucária", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Fazenda Velha e Costeira" },
  { slug: "pinhais", nome: "Pinhais", kind: "cidade", uf: "PR", faixa: "f2", referencia: "Centro, Weissópolis e Emiliano Perneta" },
  { slug: "colombo", nome: "Colombo", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Guaraituba e Maracanã" },
  { slug: "campo-largo", nome: "Campo Largo", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Jardim Itália e Ferraria" },
  { slug: "almirante-tamandare", nome: "Almirante Tamandaré", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Tanguá e Cachoeira" },
  { slug: "fazenda-rio-grande", nome: "Fazenda Rio Grande", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Eucaliptos e Nações" },
  { slug: "piraquara", nome: "Piraquara", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Guarituba e Vila Macedo" },
  { slug: "quatro-barras", nome: "Quatro Barras", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro, Jardim Menino Deus e Borda do Campo" },
  { slug: "campo-magro", nome: "Campo Magro", kind: "cidade", uf: "PR", faixa: "f3", referencia: "Centro e Jardim Cecília" },
  { slug: "batel", nome: "Batel", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f1", referencia: "Praça do Japão e Avenida do Batel" },
  { slug: "centro", nome: "Centro", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f1", referencia: "Praça Osório e Rua XV de Novembro" },
  { slug: "cic", nome: "CIC", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f2", referencia: "Cidade Industrial e Avenida Juscelino Kubitschek" },
  { slug: "portao", nome: "Portão", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f1", referencia: "Avenida República Argentina e Parque do Portão" },
  { slug: "santa-felicidade", nome: "Santa Felicidade", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f2", referencia: "Avenida Manoel Ribas e Bosque do Papa" },
  { slug: "boqueirao", nome: "Boqueirão", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f2", referencia: "Avenida Marechal Floriano e Terminal do Boqueirão" },
  { slug: "cajuru", nome: "Cajuru", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f2", referencia: "Avenida Prefeito Maurício Fruet e Terminal do Cajuru" },
  { slug: "agua-verde", nome: "Água Verde", kind: "bairro", cidadeMae: "Curitiba", uf: "PR", faixa: "f1", referencia: "Avenida República Argentina e Parque da Barigui" },
];

export const findCategory = (slug) => CATEGORIES.find((c) => c.slug === slug || c.id === slug);
export const findLocal = (slug) => LOCAIS.find((l) => l.slug === slug);

export const cityLabel = (local) =>
  local.kind === "bairro" ? `${local.nome}, ${local.cidadeMae}` : local.nome;

/** Rótulo curto usado no <title> (evita estourar o limite de caracteres). */
export const shortLabel = (local) =>
  local.kind === "bairro" ? `${local.nome} (Curitiba)` : local.nome;

export const faixaDe = (local) => FAIXAS[local.faixa];

/** Índice determinístico usado para variar a copy entre locais. */
const idx = (local) => LOCAIS.findIndex((l) => l.slug === local.slug);

export function sintomasDoLocal(cat, local) {
  const i = Math.max(0, idx(local));
  const a = cat.sintomas[i % cat.sintomas.length];
  const b = cat.sintomas[(i + 2) % cat.sintomas.length];
  return [a, b];
}

/** Título e descrição únicos por combinação categoria × local. */
export function categoryLocalMeta(cat, local) {
  const path = `/${cat.slug}/${local.slug}`;
  const faixa = faixaDe(local);
  const [s1, s2] = sintomasDoLocal(cat, local);
  const title = `${cat.tituloCurto} em ${shortLabel(local)} | Coleta e Bancada`;
  const description =
    `${cat.titlePrefix} em ${cityLabel(local)}/PR: coleta ${faixa.raio} (${faixa.janelas}), ` +
    `avaliação em bancada de ${s1} e ${s2}, reparo mínimo de R$ ${PRECO_MINIMO_REPARO} ` +
    `com diagnóstico incluso e ${GARANTIA_DIAS} dias de garantia.`;
  return { path, url: path, title, description, cityLabel: cityLabel(local), faixa };
}

export function categoryHubMeta(cat) {
  return {
    path: `/${cat.slug}-curitiba`,
    title: `${cat.tituloCurto} em Curitiba e Região | Coleta e Bancada`,
    description:
      `${cat.titlePrefix} para Curitiba e Região Metropolitana com coleta programada até 30 km, ` +
      `avaliação de ${cat.bancada} em bancada, reparo mínimo de R$ ${PRECO_MINIMO_REPARO} com diagnóstico ` +
      `incluso e ${GARANTIA_DIAS} dias de garantia sobre o serviço executado.`,
  };
}

/**
 * FAQ localizada — 5 perguntas por combinação categoria × local.
 * Todas as respostas usam dados reais (faixa logística, prazos, preço mínimo).
 */
export function localizedFaqs(cat, local) {
  const label = cityLabel(local);
  const faixa = faixaDe(local);
  const [s1, s2] = sintomasDoLocal(cat, local);
  return [
    {
      q: `Vocês fazem ${cat.titlePrefix.toLowerCase()} em ${label}?`,
      a: `Sim. ${label} está dentro da nossa área de coleta (${faixa.raio}, ${faixa.nome}). Buscamos o equipamento no endereço, avaliamos em bancada e devolvemos no mesmo endereço após a autorização do serviço.`,
    },
    {
      q: `Como funciona a coleta em ${label}?`,
      a: `A coleta em ${label} é agendada em ${faixa.janelas}, com ${faixa.taxa}. O prazo entre o aceite e a retirada é de ${faixa.prazoColetaDias} dia(s) útil(eis), e a região de referência para o roteiro é ${local.referencia}.`,
    },
    {
      q: `Quanto custa o ${cat.titlePrefix.toLowerCase()} em ${label}?`,
      a: `O reparo mínimo é R$ ${PRECO_MINIMO_REPARO}, já com o diagnóstico incluso. Se você não autorizar o serviço após o laudo, paga apenas R$ ${PRECO_DIAGNOSTICO.toFixed(2).replace(".", ",")} referentes ao diagnóstico. Nenhuma execução acontece sem autorização por escrito.`,
    },
    {
      q: `Qual o prazo do serviço para quem é de ${label}?`,
      a: `O prazo de bancada para ${cat.nome.toLowerCase()} é de ${cat.prazoEntrega}, contado a partir da autorização. Peças sob encomenda podem alongar esse prazo, e avisamos por WhatsApp antes de qualquer alteração.`,
    },
    {
      q: `Atendem ${s1} e ${s2} em ${label}?`,
      a: `Sim. ${s1} e ${s2} estão entre os chamados mais frequentes que recebemos de ${label}. A avaliação envolve ${cat.bancada}, e o laudo informa se o reparo compensa antes de qualquer gasto com peça.`,
    },
  ];
}

/** Preço visível na página (usado também no Offer/PriceSpecification). */
export function offerFor(cat, local, site) {
  const url = `${site}/${cat.slug}/${local.slug}`;
  return {
    "@type": "Offer",
    name: `${cat.titlePrefix} em ${cityLabel(local)}`,
    priceCurrency: "BRL",
    price: String(PRECO_MINIMO_REPARO),
    url,
    availability: "https://schema.org/InStock",
    areaServed: { "@type": local.kind === "bairro" ? "Place" : "City", name: cityLabel(local) },
    priceSpecification: [
      {
        "@type": "PriceSpecification",
        name: "Reparo mínimo com diagnóstico incluso",
        priceCurrency: "BRL",
        minPrice: String(PRECO_MINIMO_REPARO),
        price: String(PRECO_MINIMO_REPARO),
        valueAddedTaxIncluded: true,
      },
      {
        "@type": "PriceSpecification",
        name: "Diagnóstico em bancada (caso o serviço não seja autorizado)",
        priceCurrency: "BRL",
        price: PRECO_DIAGNOSTICO.toFixed(2),
        valueAddedTaxIncluded: true,
      },
    ],
  };
}

/** Grafo JSON-LD completo da rota categoria × local. */
export function categoryLocalJsonLd(cat, local, site) {
  const meta = categoryLocalMeta(cat, local);
  const url = `${site}${meta.path}`;
  const label = cityLabel(local);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${cat.titlePrefix} em ${label}`,
        serviceType: cat.titlePrefix,
        description: meta.description,
        url,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${site}/#localbusiness`,
          name: "Técnico em Curitiba",
          url: site,
          telephone: "+5541997086380",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Curitiba",
            addressRegion: "PR",
            addressCountry: "BR",
          },
        },
        areaServed: {
          "@type": local.kind === "bairro" ? "Place" : "City",
          name: label,
          containedInPlace: { "@type": "State", name: "Paraná" },
        },
        offers: offerFor(cat, local, site),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: cat.titlePrefix, item: `${site}/${cat.slug}-curitiba` },
          { "@type": "ListItem", position: 3, name: label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: localizedFaqs(cat, local).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Corpo estático (HTML real, sem JS) da rota categoria × local. */
export function categoryLocalStaticBody(cat, local) {
  const meta = categoryLocalMeta(cat, local);
  const label = cityLabel(local);
  const faixa = faixaDe(local);
  const faqs = localizedFaqs(cat, local);
  const outros = LOCAIS.filter((l) => l.slug !== local.slug)
    .slice(0, 6)
    .map((l) => `<li style="margin:4px 0"><a href="/${cat.slug}/${l.slug}" style="color:#7fd4ec">${esc(cat.tituloCurto)} em ${esc(cityLabel(l))}</a></li>`)
    .join("");
  const faqHtml = faqs
    .map(
      (f) =>
        `<h3 style="font-size:1rem;margin:16px 0 4px">${esc(f.q)}</h3><p style="margin:0;font-size:.95rem;opacity:.94">${esc(f.a)}</p>`,
    )
    .join("");
  const sintomas = cat.sintomas
    .map((s) => `<li style="margin:4px 0">${esc(s)}</li>`)
    .join("");
  return `
        <div style="max-width:880px;margin:0 auto;padding:28px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e8eef2;background:#0f171c">
          <nav aria-label="Trilha de navegação" style="font-size:.85rem;opacity:.85;margin-bottom:12px">
            <a href="/" style="color:#7fd4ec">Início</a> › <a href="/${cat.slug}-curitiba" style="color:#7fd4ec">${esc(cat.titlePrefix)}</a> › <span aria-current="page">${esc(label)}</span>
          </nav>
          <h1 style="font-size:1.7rem;line-height:1.25;margin:0 0 10px">${esc(cat.titlePrefix)} em ${esc(label)}</h1>
          <p style="margin:0 0 14px;font-size:1rem;opacity:.95">${esc(meta.description)}</p>
          <h2 style="font-size:1.1rem;margin:20px 0 6px">Coleta e entrega em ${esc(label)}</h2>
          <p style="margin:0 0 8px;font-size:.95rem;opacity:.94">${esc(label)} está na ${esc(faixa.nome)} (${esc(faixa.raio)}), com ${esc(faixa.taxa)}. As janelas são ${esc(faixa.janelas)} e a retirada acontece em até ${faixa.prazoColetaDias} dia(s) útil(eis) após o aceite. Referência de roteiro: ${esc(local.referencia)}.</p>
          <p style="margin:0 0 8px;font-size:.95rem;opacity:.94">Reparo mínimo de R$ ${PRECO_MINIMO_REPARO} com diagnóstico incluso. Sem autorização do serviço, o valor cobrado é apenas o diagnóstico de R$ ${PRECO_DIAGNOSTICO.toFixed(2).replace(".", ",")}. Garantia de ${GARANTIA_DIAS} dias sobre o serviço executado.</p>
          <p style="margin:0 0 14px"><a href="/contato?origem=${esc(cat.slug)}-${esc(local.slug)}" data-cta-location="${esc(cat.slug)}_${esc(local.slug)}_static" style="color:#7fd4ec;font-weight:600">Agendar coleta em ${esc(label)} (triagem antes do WhatsApp)</a></p>
          <h2 style="font-size:1.1rem;margin:20px 0 6px">Sintomas atendidos</h2>
          <ul style="margin:0 0 8px;padding-left:20px">${sintomas}</ul>
          <h2 style="font-size:1.1rem;margin:20px 0 6px">Perguntas frequentes — ${esc(label)}</h2>
          ${faqHtml}
          <h2 style="font-size:1.1rem;margin:24px 0 6px">Outras localidades atendidas</h2>
          <ul style="margin:0 0 8px;padding-left:20px">${outros}</ul>
          <p style="margin:16px 0 0;font-size:.8rem;opacity:.7">Técnico em Curitiba · atendimento em Curitiba e Região Metropolitana.</p>
        </div>`;
}
