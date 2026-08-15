import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/atuba-pinhais"];

export const Route = createFileRoute("/bairros_/atuba-pinhais")({
  component: RouteComponent,
});
