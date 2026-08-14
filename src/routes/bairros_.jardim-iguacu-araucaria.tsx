import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-iguacu-araucaria"];

export const Route = createFileRoute("/bairros_/jardim-iguacu-araucaria")({
  component: RouteComponent,
});
