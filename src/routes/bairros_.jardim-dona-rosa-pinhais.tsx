import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-dona-rosa-pinhais"];

export const Route = createFileRoute("/bairros_/jardim-dona-rosa-pinhais")({
  component: RouteComponent,
});
