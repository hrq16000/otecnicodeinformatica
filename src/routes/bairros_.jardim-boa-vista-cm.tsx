import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-boa-vista-cm"];

export const Route = createFileRoute("/bairros_/jardim-boa-vista-cm")({
  component: RouteComponent,
});
