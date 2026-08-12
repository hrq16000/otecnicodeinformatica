// GERADO por scripts/fetch-real-photos.mjs — não editar à mão.
// Fotografias reais com licença Creative Commons comercial. Nenhuma imagem de IA.

export type FotoLicenciada = {
  slug: string;
  src: string;
  alt: string;
  autor: string;
  autorUrl: string;
  origem: string;
  licenca: string;
  licencaUrl: string;
  fonte: string;
};

export const FOTOS_LICENCIADAS: FotoLicenciada[] = [
  {
    "slug": "bancada-tecnica",
    "src": "/fotos/bancada-tecnica.jpg",
    "alt": "Interior de computador desktop aberto durante manutenção",
    "autor": "Bruce Guenter",
    "autorUrl": "https://www.flickr.com/photos/10154402@N03",
    "origem": "https://www.flickr.com/photos/10154402@N03/5325490543",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "rede-cabeamento",
    "src": "/fotos/rede-cabeamento.jpg",
    "alt": "Painel de rede com cabeamento estruturado organizado",
    "autor": "DeclanTM",
    "autorUrl": "https://www.flickr.com/photos/36006949@N00",
    "origem": "https://www.flickr.com/photos/36006949@N00/5465427706",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "infra-empresa",
    "src": "/fotos/infra-empresa.jpg",
    "alt": "Sala de servidores com racks alinhados",
    "autor": "DeclanTM",
    "autorUrl": "https://www.flickr.com/photos/36006949@N00",
    "origem": "https://www.flickr.com/photos/36006949@N00/2508871570",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "estacao-trabalho",
    "src": "/fotos/estacao-trabalho.jpg",
    "alt": "Estação de trabalho com monitor, teclado e periféricos",
    "autor": "Jon Rohan",
    "autorUrl": "https://www.flickr.com/photos/68503235@N00",
    "origem": "https://www.flickr.com/photos/68503235@N00/5081408605",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "roteador-wifi",
    "src": "/fotos/roteador-wifi.jpg",
    "alt": "Roteador Wi-Fi doméstico com antenas",
    "autor": "ccnull.de Bilddatenbank",
    "autorUrl": "https://www.flickr.com/photos/115225894@N07",
    "origem": "https://www.flickr.com/photos/115225894@N07/54385668345",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "placa-eletronica",
    "src": "/fotos/placa-eletronica.jpg",
    "alt": "Detalhe macro de placa eletrônica com componentes",
    "autor": "Steve A Johnson",
    "autorUrl": "https://www.flickr.com/photos/14529257@N03",
    "origem": "https://www.flickr.com/photos/14529257@N03/4778137965",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  }
];

/** Fail-closed: componente só renderiza foto que exista no manifesto. */
export const foto = (slug: string): FotoLicenciada | undefined =>
  FOTOS_LICENCIADAS.find((f) => f.slug === slug);
