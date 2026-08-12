// GERADO por scripts/fetch-real-photos.mjs — não editar à mão.
// Fotografias reais com licença comercial (Openverse). Nenhuma imagem de IA.

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
    "alt": "Bancada com computador aberto durante manutenção técnica",
    "autor": "Evil Paul",
    "autorUrl": "https://www.flickr.com/photos/30553515@N00",
    "origem": "https://www.flickr.com/photos/30553515@N00/159877345",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "notebook-manutencao",
    "src": "/fotos/notebook-manutencao.jpg",
    "alt": "Técnico realizando manutenção em notebook",
    "autor": "Georgia National Guard",
    "autorUrl": "https://www.flickr.com/photos/40994485@N04",
    "origem": "https://www.flickr.com/photos/40994485@N04/5693554161",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "rede-cabeamento",
    "src": "/fotos/rede-cabeamento.jpg",
    "alt": "Rack de rede com cabeamento organizado",
    "autor": "one individual",
    "autorUrl": "https://www.flickr.com/photos/44176115@N07",
    "origem": "https://www.flickr.com/photos/44176115@N07/15401776380",
    "licenca": "CC BY-SA 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "roteador-wifi",
    "src": "/fotos/roteador-wifi.jpg",
    "alt": "Roteador Wi-Fi instalado em ambiente residencial",
    "autor": "osde8info",
    "autorUrl": "https://www.flickr.com/photos/8764442@N07",
    "origem": "https://www.flickr.com/photos/8764442@N07/2562812342",
    "licenca": "CC BY-SA 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "escritorio-empresa",
    "src": "/fotos/escritorio-empresa.jpg",
    "alt": "Estações de trabalho em escritório de empresa",
    "autor": "zoetnet",
    "autorUrl": "https://www.flickr.com/photos/13286453@N00",
    "origem": "https://www.flickr.com/photos/13286453@N00/5192943607",
    "licenca": "CC BY 2.0",
    "licencaUrl": "https://creativecommons.org/licenses/by/2.0/",
    "fonte": "flickr"
  },
  {
    "slug": "armazenamento-dados",
    "src": "/fotos/armazenamento-dados.jpg",
    "alt": "Unidades de armazenamento HD e SSD sobre bancada",
    "autor": "markus spiske",
    "autorUrl": "https://www.flickr.com/photos/125167502@N02",
    "origem": "https://www.flickr.com/photos/125167502@N02/48256489697",
    "licenca": "CC CC0 1.0",
    "licencaUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "fonte": "flickr"
  }
];

export const foto = (slug: string): FotoLicenciada | undefined =>
  FOTOS_LICENCIADAS.find((f) => f.slug === slug);
