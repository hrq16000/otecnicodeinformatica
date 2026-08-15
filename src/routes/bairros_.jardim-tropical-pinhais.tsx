import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-tropical-pinhais"];

export const Route = createFileRoute("/bairros_/jardim-tropical-pinhais")({
  component: RouteComponent,
});
