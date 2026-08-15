import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/embu-colombo"];

export const Route = createFileRoute("/bairros_/embu-colombo")({
  component: RouteComponent,
});
