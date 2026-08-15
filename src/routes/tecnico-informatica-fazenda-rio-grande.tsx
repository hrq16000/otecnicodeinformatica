import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-fazenda-rio-grande"];

export const Route = createFileRoute("/tecnico-informatica-fazenda-rio-grande")({
  component: RouteComponent,
});
