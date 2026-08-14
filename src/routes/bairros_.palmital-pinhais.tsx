import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/palmital-pinhais"];

export const Route = createFileRoute("/bairros_/palmital-pinhais")({
  component: RouteComponent,
});
