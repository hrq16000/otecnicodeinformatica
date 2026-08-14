import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/emiliano-perneta"];

export const Route = createFileRoute("/bairros_/emiliano-perneta")({
  component: RouteComponent,
});
