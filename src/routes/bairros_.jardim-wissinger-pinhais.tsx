import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-wissinger-pinhais"];

export const Route = createFileRoute("/bairros_/jardim-wissinger-pinhais")({
  component: RouteComponent,
});
