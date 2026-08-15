import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-esperanca-cl"];

export const Route = createFileRoute("/bairros_/jardim-esperanca-cl")({
  component: RouteComponent,
});
