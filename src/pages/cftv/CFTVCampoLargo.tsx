import CFTVCityTemplate from "./CFTVCityTemplate";

const CFTVCampoLargo = () => (
  <CFTVCityTemplate
    city="Campo Largo"
    slug="campo-largo"
    metaTitle="Câmeras de Segurança em Campo Largo | Kit Intelbras R$ 1.350 | Instalação Inclusa"
    metaDescription="Kit 4 câmeras Intelbras com instalação profissional em Campo Largo. Acesso remoto pelo celular. R$ 1.350 completo. desde 1998. WhatsApp."
    neighborhoods={["Centro", "Ferraria", "Jardim Guilhermina", "Vila Pompeia", "São Marcos", "Rondinha"]}
    cityDescription="Campo Largo, conhecida como Capital da Louça, combina áreas urbanas movimentadas com propriedades rurais e chácaras. Essa diversidade de imóveis exige soluções de segurança adaptadas — desde comércios no centro até residências e sítios nas áreas mais afastadas."
    localStats="Proprietários de chácaras e sítios em Campo Largo são alvos frequentes de furtos devido ao isolamento. Sistemas de câmeras com acesso remoto permitem monitorar a propriedade mesmo à distância, com gravação contínua 24h e alerta de movimento."
    testimonial={{ name: "Dona Maria L.", location: "Ferraria, Campo Largo", text: "Moro em chácara e ficava preocupada toda vez que saía. Depois que instalaram as câmeras, vejo tudo pelo celular. Já até flagrei vizinho entrando no terreno sem permissão. Agora durmo tranquila." }}
  />
);

export default CFTVCampoLargo;
