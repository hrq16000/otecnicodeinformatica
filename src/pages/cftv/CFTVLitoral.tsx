import CFTVCityTemplate from "./CFTVCityTemplate";

const CFTVLitoral = () => (
  <CFTVCityTemplate
    city="Litoral do Paraná"
    slug="litoral"
    metaTitle="Câmeras de Segurança no Litoral do PR | Itapoá e Guaratuba | Kit Intelbras R$ 1.350"
    metaDescription="Instalação de câmeras de segurança no Litoral do Paraná: Itapoá, Guaratuba e região. Kit 4 câmeras Intelbras com acesso remoto. R$ 1.350. WhatsApp (41) 99745-2053."
    neighborhoods={["Itapoá Centro", "Barra do Saí", "Praia de Itapoá", "Guaratuba Centro", "Praia Central", "Caiobá", "Cohapar", "Brejatuba", "Piçarras"]}
    cityDescription="Casas de praia e imóveis no litoral do Paraná ficam desocupados durante grande parte do ano, tornando-se alvos fáceis para invasores. O monitoramento remoto por câmeras permite que você vigie seu imóvel de qualquer lugar do mundo, diretamente pelo celular."
    localStats="Imóveis de veraneio sem monitoramento são os que mais sofrem com furtos e vandalismo no litoral paranaense. Câmeras com acesso remoto permitem acionar a polícia em tempo real, mesmo estando em Curitiba ou em outra cidade."
    testimonial={{ name: "Ricardo M.", location: "Itapoá, Litoral PR", text: "Tenho casa de praia e ficava meses sem ir. Agora monitoro tudo pelo celular. Já valeu cada centavo quando vi um estranho rondando e acionei a PM na hora." }}
  />
);

export default CFTVLitoral;
