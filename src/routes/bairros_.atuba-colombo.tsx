import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/atuba-colombo"];

export const Route = createFileRoute("/bairros_/atuba-colombo")({
  component: RouteComponent,
});
