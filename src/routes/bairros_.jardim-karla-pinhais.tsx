import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-karla-pinhais"];

export const Route = createFileRoute("/bairros_/jardim-karla-pinhais")({
  component: RouteComponent,
});
