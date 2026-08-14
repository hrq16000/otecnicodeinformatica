import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-fazenda-rio-grande")({
  component: legacyRouteElements["/bairros/centro-fazenda-rio-grande"],
});
