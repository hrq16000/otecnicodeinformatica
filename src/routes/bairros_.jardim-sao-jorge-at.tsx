import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-sao-jorge-at"];

export const Route = createFileRoute("/bairros_/jardim-sao-jorge-at")({
  component: RouteComponent,
});
