import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/lamenha-grande-cl"];

export const Route = createFileRoute("/bairros_/lamenha-grande-cl")({
  component: RouteComponent,
});
