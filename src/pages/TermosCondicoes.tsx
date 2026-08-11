/**
 * /termos-e-condicoes — alias da página fundida.
 * Termos, condições, valores e prazos passaram a viver em um ponto único:
 * /precos-e-politicas. Esta rota permanece viva (nunca removemos URLs) e
 * aponta canonical para a página fundida.
 */
import { useCanonical } from "@/lib/canonicalUrl";
import PrecosEPoliticas from "./PrecosEPoliticas";

const TermosCondicoes = () => {
  useCanonical(`${SITE_BASE_URL}/precos-e-politicas`);
  return <PrecosEPoliticas path="/termos-e-condicoes" />;
};

export default TermosCondicoes;
