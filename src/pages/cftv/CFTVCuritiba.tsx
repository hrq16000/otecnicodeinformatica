import CFTVCityTemplate from "./CFTVCityTemplate";

const CFTVCuritiba = () => (
  <CFTVCityTemplate
    city="Curitiba"
    slug="curitiba"
    metaTitle="Câmeras de Segurança em Curitiba | Kit 4 Câmeras Intelbras R$ 1.350 | Instalação Profissional"
    metaDescription="Instalação de câmeras de segurança Intelbras em Curitiba. Kit 4 câmeras com DVR, HD e acesso remoto por R$ 1.350. Desde 1999. WhatsApp."
    neighborhoods={["Centro", "Batel", "Água Verde", "Portão", "Santa Felicidade", "CIC", "Campo Comprido", "Boqueirão", "Cajuru", "Boa Vista", "Pinheirinho", "Uberaba", "Xaxim", "Hauer", "Bacacheri"]}
    cityDescription="Curitiba é uma das capitais mais seguras do Brasil, mas mesmo assim registra milhares de ocorrências de furtos e invasões residenciais por ano. A instalação de câmeras de segurança é a medida mais eficaz para proteger residências, comércios e condomínios na capital paranaense."
    localStats="Segundo dados da Secretaria de Segurança Pública do Paraná, bairros sem monitoramento eletrônico concentram até 70% das ocorrências de furtos a residências em Curitiba. O investimento em CFTV reduz drasticamente esse risco e ainda valoriza o imóvel."
    testimonial={{ name: "Marcos R.", location: "Boqueirão, Curitiba", text: "Instalaram as 4 câmeras em menos de 3 horas. Agora vejo tudo pelo celular, mesmo quando estou no trabalho. Sensação de segurança incomparável!" }}
  />
);

export default CFTVCuritiba;
