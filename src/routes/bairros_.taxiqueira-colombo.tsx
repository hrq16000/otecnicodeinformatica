import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/taxiqueira-colombo"];

export const Route = createFileRoute("/bairros_/taxiqueira-colombo")({
  component: RouteComponent,
});
