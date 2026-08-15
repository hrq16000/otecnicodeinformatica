import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campina-grande-colombo"];

export const Route = createFileRoute("/bairros_/campina-grande-colombo")({
  component: RouteComponent,
});
