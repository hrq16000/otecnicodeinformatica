import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-pinhais"];

export const Route = createFileRoute("/bairros_/centro-pinhais")({
  component: RouteComponent,
});
