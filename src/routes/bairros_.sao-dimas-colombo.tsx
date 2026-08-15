import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-dimas-colombo"];

export const Route = createFileRoute("/bairros_/sao-dimas-colombo")({
  component: RouteComponent,
});
