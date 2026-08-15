import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/borda-do-campo-sjp"];

export const Route = createFileRoute("/bairros_/borda-do-campo-sjp")({
  component: RouteComponent,
});
