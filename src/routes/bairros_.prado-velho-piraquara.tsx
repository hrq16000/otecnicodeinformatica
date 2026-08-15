import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/prado-velho-piraquara"];

export const Route = createFileRoute("/bairros_/prado-velho-piraquara")({
  component: RouteComponent,
});
