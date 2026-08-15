import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/borda-campo-sjp"];

export const Route = createFileRoute("/bairros_/borda-campo-sjp")({
  component: RouteComponent,
});
