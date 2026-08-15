import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/fazenda-velha-araucaria"];

export const Route = createFileRoute("/bairros_/fazenda-velha-araucaria")({
  component: RouteComponent,
});
