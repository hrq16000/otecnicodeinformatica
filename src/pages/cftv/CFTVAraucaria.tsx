import CFTVCityTemplate from "./CFTVCityTemplate";

const CFTVAraucaria = () => (
  <CFTVCityTemplate
    city="Araucária"
    slug="araucaria"
    metaTitle="Câmeras de Segurança em Araucária | Kit Intelbras R$ 1.350 | Instalação Inclusa"
    metaDescription="Kit 4 câmeras Intelbras com instalação profissional em Araucária. Acesso remoto pelo celular. R$ 1.350 completo. desde 1998. WhatsApp."
    neighborhoods={["Centro", "Capela Velha", "Thomaz Coelho", "Iguaçu", "Cachoeira", "Costeira", "Vila Nova"]}
    cityDescription="Araucária é um dos maiores pólos industriais do Paraná, com intensa movimentação comercial e residencial. O crescimento acelerado da cidade trouxe desafios de segurança, especialmente em áreas próximas ao distrito industrial e nos bairros residenciais em expansão."
    localStats="Com o grande fluxo de veículos e pessoas gerado pelo polo industrial, imóveis comerciais e residenciais em Araucária precisam de monitoramento constante. Câmeras visíveis reduzem em até 60% as tentativas de furto na região, segundo dados de segurança local."
    testimonial={{ name: "Carlos A.", location: "Centro, Araucária", text: "Tenho um depósito no distrito industrial e as câmeras já me salvaram duas vezes. Identificamos funcionários desviando mercadoria e resolvemos tudo com as gravações. Investimento que se pagou em uma semana." }}
  />
);

export default CFTVAraucaria;
