import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/borda-do-campo-qb"];

export const Route = createFileRoute("/bairros_/borda-do-campo-qb")({
  component: RouteComponent,
});
