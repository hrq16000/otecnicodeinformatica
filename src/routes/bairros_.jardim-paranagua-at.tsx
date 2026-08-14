import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-paranagua-at"];

export const Route = createFileRoute("/bairros_/jardim-paranagua-at")({
  component: RouteComponent,
});
