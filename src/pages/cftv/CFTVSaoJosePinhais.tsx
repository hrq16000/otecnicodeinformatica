import CFTVCityTemplate from "./CFTVCityTemplate";

const CFTVSaoJosePinhais = () => (
  <CFTVCityTemplate
    city="São José dos Pinhais"
    slug="sao-jose-dos-pinhais"
    metaTitle="Câmeras de Segurança em São José dos Pinhais | Kit Intelbras R$ 1.350 | Instalação Inclusa"
    metaDescription="Kit 4 câmeras Intelbras com instalação profissional em São José dos Pinhais. Acesso remoto pelo celular. R$ 1.350 completo. Desde 1998. WhatsApp."
    neighborhoods={["Centro", "Afonso Pena", "Cruzeiro", "Aristocrata", "Braga", "Costeira", "Aviação", "Guatupê", "São Marcos", "São Cristóvão", "Del Rey", "Barro Preto", "Parque da Fonte"]}
    cityDescription="São José dos Pinhais, segunda maior cidade da Região Metropolitana de Curitiba, tem crescido rapidamente — e com esse crescimento, a segurança patrimonial se torna essencial. A proximidade com o Aeroporto Afonso Pena e a intensa movimentação comercial tornam o CFTV indispensável."
    localStats="O aumento populacional e comercial de São José dos Pinhais traz consigo desafios de segurança. Imóveis com câmeras visíveis registram até 65% menos tentativas de invasão na região, segundo levantamentos locais."
    testimonial={{ name: "Fernanda S.", location: "Afonso Pena, SJP", text: "Sempre tive medo de deixar a loja sozinha à noite. Depois das câmeras, já peguei duas tentativas de arrombamento nas gravações. A polícia agiu rápido com as imagens." }}
  />
);

export default CFTVSaoJosePinhais;
