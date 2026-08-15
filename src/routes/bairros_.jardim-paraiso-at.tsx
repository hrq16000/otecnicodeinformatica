import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-paraiso-at"];

export const Route = createFileRoute("/bairros_/jardim-paraiso-at")({
  component: RouteComponent,
});
