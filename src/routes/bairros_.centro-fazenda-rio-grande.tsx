import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-fazenda-rio-grande"];

export const Route = createFileRoute("/bairros_/centro-fazenda-rio-grande")({
  component: RouteComponent,
});
