import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-esplanada-pinhais"];

export const Route = createFileRoute("/bairros_/jardim-esplanada-pinhais")({
  component: RouteComponent,
});
