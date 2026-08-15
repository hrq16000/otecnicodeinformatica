import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sede-campo-magro"];

export const Route = createFileRoute("/bairros_/sede-campo-magro")({
  component: RouteComponent,
});
