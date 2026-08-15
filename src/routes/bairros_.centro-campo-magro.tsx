import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-campo-magro"];

export const Route = createFileRoute("/bairros_/centro-campo-magro")({
  component: RouteComponent,
});
