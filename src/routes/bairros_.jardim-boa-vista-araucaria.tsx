import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-boa-vista-araucaria"];

export const Route = createFileRoute("/bairros_/jardim-boa-vista-araucaria")({
  component: RouteComponent,
});
