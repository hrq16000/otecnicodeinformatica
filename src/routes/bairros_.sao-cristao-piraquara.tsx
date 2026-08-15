import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-cristao-piraquara"];

export const Route = createFileRoute("/bairros_/sao-cristao-piraquara")({
  component: RouteComponent,
});
