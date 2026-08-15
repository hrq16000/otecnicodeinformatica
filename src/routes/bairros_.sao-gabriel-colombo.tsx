import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-gabriel-colombo"];

export const Route = createFileRoute("/bairros_/sao-gabriel-colombo")({
  component: RouteComponent,
});
