import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/colonia-malhada-cl"];

export const Route = createFileRoute("/bairros_/colonia-malhada-cl")({
  component: RouteComponent,
});
