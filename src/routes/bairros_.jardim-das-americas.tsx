import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-das-americas"];

export const Route = createFileRoute("/bairros_/jardim-das-americas")({
  component: RouteComponent,
});
