import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-jose-dos-pinhais"];

export const Route = createFileRoute("/bairros_/sao-jose-dos-pinhais")({
  component: RouteComponent,
});
