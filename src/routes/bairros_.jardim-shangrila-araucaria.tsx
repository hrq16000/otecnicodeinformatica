import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-shangrila-araucaria"];

export const Route = createFileRoute("/bairros_/jardim-shangrila-araucaria")({
  component: RouteComponent,
});
