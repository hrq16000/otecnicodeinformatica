import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/guarituba-piraquara"];

export const Route = createFileRoute("/bairros_/guarituba-piraquara")({
  component: RouteComponent,
});
