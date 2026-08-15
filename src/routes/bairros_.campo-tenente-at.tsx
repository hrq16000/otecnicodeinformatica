import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campo-tenente-at"];

export const Route = createFileRoute("/bairros_/campo-tenente-at")({
  component: RouteComponent,
});
