import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/guaraituba-colombo"];

export const Route = createFileRoute("/bairros_/guaraituba-colombo")({
  component: RouteComponent,
});
