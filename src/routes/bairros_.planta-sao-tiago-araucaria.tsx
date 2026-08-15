import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/planta-sao-tiago-araucaria"];

export const Route = createFileRoute("/bairros_/planta-sao-tiago-araucaria")({
  component: RouteComponent,
});
