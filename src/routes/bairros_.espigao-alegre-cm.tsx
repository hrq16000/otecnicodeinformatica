import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/espigao-alegre-cm"];

export const Route = createFileRoute("/bairros_/espigao-alegre-cm")({
  component: RouteComponent,
});
