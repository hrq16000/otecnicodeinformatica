import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-claudia-ii-pinhais"];

export const Route = createFileRoute("/bairros_/jardim-claudia-ii-pinhais")({
  component: RouteComponent,
});
