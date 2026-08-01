import CFTVCityTemplate from "./CFTVCityTemplate";

const CFTVPinhais = () => (
  <CFTVCityTemplate
    city="Pinhais"
    slug="pinhais"
    metaTitle="Câmeras de Segurança em Pinhais | Kit Intelbras R$ 1.350 | Instalação Inclusa"
    metaDescription="Kit 4 câmeras Intelbras com instalação profissional em Pinhais. Acesso remoto pelo celular. R$ 1.350 completo. desde 1998. WhatsApp."
    neighborhoods={["Centro", "Weissópolis", "Pineville", "Emiliano Perneta", "Palmital", "Maria Antonieta"]}
    cityDescription="Pinhais é uma das cidades mais densamente povoadas do Paraná, com forte comércio local e áreas residenciais movimentadas. A proximidade com Curitiba e o alto fluxo de pessoas tornam o monitoramento eletrônico essencial para proteger residências e estabelecimentos comerciais."
    localStats="O comércio de Pinhais cresce a cada ano, mas os furtos a estabelecimentos também preocupam lojistas da região. Câmeras de segurança com gravação contínua e acesso remoto são a solução mais eficaz e econômica para proteger o patrimônio sem depender de rondas."
    testimonial={{ name: "Jorge P.", location: "Weissópolis, Pinhais", text: "Tenho uma loja de materiais e sempre tive problemas com furtos pequenos. Depois das câmeras, os furtos zeraram. Os funcionários e clientes sabem que está tudo sendo gravado. Melhor investimento que fiz." }}
  />
);

export default CFTVPinhais;
