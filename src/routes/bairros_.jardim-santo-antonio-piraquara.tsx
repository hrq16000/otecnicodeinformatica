import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-santo-antonio-piraquara"];

export const Route = createFileRoute("/bairros_/jardim-santo-antonio-piraquara")({
  component: RouteComponent,
});
