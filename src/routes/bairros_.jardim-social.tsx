import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-social"];

export const Route = createFileRoute("/bairros_/jardim-social")({
  component: RouteComponent,
});
