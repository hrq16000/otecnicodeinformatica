import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/planta-deodoro-piraquara"];

export const Route = createFileRoute("/bairros_/planta-deodoro-piraquara")({
  component: RouteComponent,
});
