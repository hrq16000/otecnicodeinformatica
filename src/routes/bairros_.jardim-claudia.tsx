import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-claudia"];

export const Route = createFileRoute("/bairros_/jardim-claudia")({
  component: RouteComponent,
});
