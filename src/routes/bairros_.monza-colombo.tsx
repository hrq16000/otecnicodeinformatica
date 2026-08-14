import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/monza-colombo"];

export const Route = createFileRoute("/bairros_/monza-colombo")({
  component: RouteComponent,
});
