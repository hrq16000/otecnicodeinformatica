import { Route, Navigate } from "react-router-dom";
import { REDIRECT_MATRIX } from "@/lib/redirectMatrix";

/**
 * Rotas de redirect geradas a partir da matriz única.
 *
 * Retorna um array de <Route> para ser espalhado dentro de <Routes>,
 * garantindo que a matriz de CI e o roteamento real nunca divirjam.
 */
export function redirectRoutes() {
  return REDIRECT_MATRIX.map((r) => (
    <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
  ));
}
