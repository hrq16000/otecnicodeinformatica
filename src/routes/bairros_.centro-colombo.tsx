import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-colombo"];

export const Route = createFileRoute("/bairros_/centro-colombo")({
  component: RouteComponent,
});
